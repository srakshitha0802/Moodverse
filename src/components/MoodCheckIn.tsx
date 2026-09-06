import React, { useState, useEffect } from 'react';
import { useSession } from './SessionManager';

interface MoodCheckInData {
  mood_state: string;
  energy_level: number;
  optional_text: string;
  preferences: any;
}

interface MoodCheckInProps {
  onComplete: (data: MoodCheckInData) => void;
  onSkip?: () => void;
}

const MOOD_OPTIONS = [
  { value: 'happy', label: '😊 Happy', color: '#fbbf24' },
  { value: 'calm', label: '😌 Calm', color: '#60a5fa' },
  { value: 'sad', label: '😢 Sad', color: '#94a3b8' },
  { value: 'angry', label: '😠 Angry', color: '#fb7185' },
  { value: 'anxious', label: '😰 Anxious', color: '#fbbf24' },
  { value: 'tired', label: '😴 Tired', color: '#cbd5e1' },
  { value: 'excited', label: '🤩 Excited', color: '#34d399' },
  { value: 'confused', label: '😕 Confused', color: '#a78bfa' }
];

const ENERGY_LEVELS = [
  { value: 1, label: 'Very Low', description: 'Hard to get going' },
  { value: 2, label: 'Low', description: 'Minimal energy' },
  { value: 3, label: 'Below Average', description: 'Somewhat drained' },
  { value: 4, label: 'Moderate', description: 'Okay energy level' },
  { value: 5, label: 'Average', description: 'Normal energy' },
  { value: 6, label: 'Good', description: 'Feeling energized' },
  { value: 7, label: 'High', description: 'Quite energetic' },
  { value: 8, label: 'Very High', description: 'Full of energy' },
  { value: 9, label: 'Excellent', description: 'Very energetic' },
  { value: 10, label: 'Maximum', description: 'Peak energy' }
];

export default function MoodCheckIn({ onComplete, onSkip }: MoodCheckInProps) {
  const { updateSessionData, preferences } = useSession();
  const [step, setStep] = useState(1);
  const [moodState, setMoodState] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [optionalText, setOptionalText] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    // Determine time of day for context
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete the check-in
      const data: MoodCheckInData = {
        mood_state: moodState,
        energy_level: energyLevel,
        optional_text: optionalText,
        preferences
      };
      
      // Update session data
      updateSessionData({
        moodState: moodState,
        energyLevel: energyLevel,
        optionalText: optionalText
      });
      
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return moodState !== '';
      case 2: return energyLevel !== null;
      case 3: return true; // Optional text is... optional
      default: return false;
    }
  };

  const renderStep1 = () => (
    <div>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>
        How are you feeling right now?
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Choose the emotion that best matches your current mood
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '12px',
        marginBottom: '20px'
      }}>
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.value}
            className={`mood-option ${moodState === mood.value ? 'selected' : ''}`}
            onClick={() => setMoodState(mood.value)}
            style={{
              padding: '16px',
              border: `2px solid ${moodState === mood.value ? mood.color : '#e5e7eb'}`,
              backgroundColor: moodState === mood.value ? `${mood.color}20` : 'white',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '16px',
              textAlign: 'center'
            }}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>
        What's your energy level?
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Rate your current energy from 1 (very low) to 10 (maximum)
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>Very Low</span>
          <span>Very High</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: `linear-gradient(to right, #ef4444 0%, #f59e0b 20%, #eab308 40%, #84cc16 60%, #22c55e 80%, #10b981 100%)`,
            outline: 'none',
            WebkitAppearance: 'none'
          }}
        />
        
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1f2937' 
          }}>
            {energyLevel}
          </div>
          <div style={{ 
            color: '#6b7280',
            fontSize: '14px'
          }}>
            {ENERGY_LEVELS[energyLevel - 1]?.description}
          </div>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: '12px', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <strong>💡 Context:</strong> It's {timeOfDay}, which helps me suggest appropriate activities for this time.
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>
        Anything else you'd like to share? (Optional)
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        You can share what's on your mind, or just click "Continue" to proceed
      </p>
      
      <textarea
        value={optionalText}
        onChange={(e) => setOptionalText(e.target.value)}
        placeholder="I'm feeling this way because... or any specific concerns you'd like me to consider..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '16px',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
        maxLength={500}
      />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '8px',
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        <span>Optional - helps personalize your experience</span>
        <span>{optionalText.length}/500</span>
      </div>
    </div>
  );

  return (
    <div className="card" style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '24px'
    }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <div style={{ 
          height: '4px', 
          backgroundColor: '#e5e7eb', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '100%', 
            backgroundColor: '#3b82f6',
            width: `${(step / 3) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Step content */}
      <div style={{ marginBottom: '32px', minHeight: '200px' }}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Navigation buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {step > 1 && (
            <button 
              className="btn secondary"
              onClick={handleBack}
            >
              ← Back
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {onSkip && step === 1 && (
            <button 
              className="btn text"
              onClick={onSkip}
              style={{ color: '#6b7280' }}
            >
              Skip
            </button>
          )}
          
          <button 
            className="btn"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              opacity: canProceed() ? 1 : 0.5,
              cursor: canProceed() ? 'pointer' : 'not-allowed'
            }}
          >
            {step === 3 ? 'Get Recommendation' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
