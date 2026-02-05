import React, { useState, useEffect } from 'react';
import { useSession } from '../components/SessionManager';
import AIDecisionEngine from '../components/AIDecisionEngine';
import { SafetyEnforcer, SafetyWarnings } from '../components/SafetyEnforcer';
import MoodCheckIn from '../components/MoodCheckIn';
import ActivityRecommender from '../components/ActivityRecommender';
import FeedbackCollector from '../components/FeedbackCollector';

interface StructuredRecommendation {
  emotional_summary: string;
  suggested_activity_type: 'breathing' | 'reflection' | 'audio' | 'visual' | 'yoga' | 'meditation';
  activity_intensity: 'low' | 'medium' | 'high';
  explanation: string;
  follow_up_option: string;
  safety_flag: boolean;
  confidence_score: number;
}

interface AIInput {
  mood_state: string;
  energy_level: number;
  time_of_day: string;
  preferences?: any;
  recent_sessions?: any[];
  optional_text?: string;
}

export default function MainExperience() {
  const { session, startSession, endSession, hasConsent } = useSession();
  const [currentStep, setCurrentStep] = useState<'mood-checkin' | 'ai-processing' | 'recommendation' | 'feedback'>('mood-checkin');
  const [aiInput, setAiInput] = useState<AIInput | null>(null);
  const [recommendation, setRecommendation] = useState<StructuredRecommendation | null>(null);
  const [safetyResult, setSafetyResult] = useState<any>(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Start session when user starts the experience
  useEffect(() => {
    if (hasConsent && !sessionStarted) {
      startSession();
      setSessionStarted(true);
    }
  }, [hasConsent, sessionStarted, startSession]);

  // Clean up session when component unmounts
  useEffect(() => {
    return () => {
      if (session) {
        endSession();
      }
    };
  }, [session, endSession]);

  const handleMoodCheckInComplete = (data: any) => {
    // Step 3: Send context to AI Decision Engine
    const aiContext: AIInput = {
      mood_state: data.mood_state,
      energy_level: data.energy_level,
      time_of_day: getCurrentTimeOfDay(),
      preferences: data.preferences,
      optional_text: data.optional_text
    };
    
    setAiInput(aiContext);
    setCurrentStep('ai-processing');
  };

  const handleAIRecommendation = (rec: StructuredRecommendation) => {
    // Step 6: Safety & Policy Enforcement Layer
    const safetyCheck = SafetyEnforcer({ recommendation: rec, originalInput: aiInput });
    setSafetyResult(safetyCheck);
    setRecommendation(safetyCheck.safe_recommendation);
    setCurrentStep('recommendation');
  };

  const handleActivityComplete = () => {
    // Move to feedback collection
    setCurrentStep('feedback');
  };

  const handleTryDifferent = () => {
    // Reset to mood check-in for a new recommendation
    setCurrentStep('mood-checkin');
    setRecommendation(null);
    setSafetyResult(null);
  };

  const handleFeedbackSubmitted = () => {
    // End session after feedback
    endSession();
    // Could redirect to home or show completion message
  };

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'mood-checkin': return 'Mood Check-In';
      case 'ai-processing': return 'AI Analysis';
      case 'recommendation': return 'Your Recommendation';
      case 'feedback': return 'Feedback';
      default: return 'Experience';
    }
  };

  if (!hasConsent) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2>Consent Required</h2>
        <p style={{ color: '#6b7280' }}>
          Please accept the privacy notice to begin your Moodverse experience.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
          🧠 Moodverse AI Experience
        </h1>
        <p style={{ color: '#6b7280', margin: '0' }}>
          A safe, black-box AI guided wellbeing session
        </p>
        
        {/* Progress indicator */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px',
            marginBottom: '8px'
          }}>
            {['mood-checkin', 'ai-processing', 'recommendation', 'feedback'].map((step, index) => (
              <div
                key={step}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step ? '#3b82f6' : 
                                  index < ['mood-checkin', 'ai-processing', 'recommendation', 'feedback'].indexOf(currentStep) ? '#10b981' : '#e5e7eb'
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Step {['mood-checkin', 'ai-processing', 'recommendation', 'feedback'].indexOf(currentStep) + 1} of 4: {getStepTitle()}
          </div>
        </div>
      </div>

      {/* Session Status */}
      {session && (
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          padding: '12px', 
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#0369a1'
        }}>
          🔗 Session ID: {session.sessionId.split('_')[2]} • 
          Started: {new Date(session.timestamp).toLocaleTimeString()}
        </div>
      )}

      {/* Step Content */}
      <div style={{ marginBottom: '32px' }}>
        {currentStep === 'mood-checkin' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#1f2937', margin: '0 0 8px 0' }}>
                Let's start with a mood check-in
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Help our AI understand how you're feeling to provide personalized recommendations
              </p>
            </div>
            <MoodCheckIn 
              onComplete={handleMoodCheckInComplete}
              onSkip={() => setCurrentStep('ai-processing')}
            />
          </div>
        )}

        {currentStep === 'ai-processing' && aiInput && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#1f2937', margin: '0 0 8px 0' }}>
                AI Decision Engine Processing
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Analyzing your input with our black-box AI model...
              </p>
            </div>
            <AIDecisionEngine 
              context={aiInput}
              onRecommendation={handleAIRecommendation}
            />
            
            {/* Show the AI input for transparency */}
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              backgroundColor: '#f9fafb', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🔍 AI Context</h4>
              <div style={{ color: '#6b7280', lineHeight: '1.4' }}>
                <div><strong>Mood:</strong> {aiInput.mood_state}</div>
                <div><strong>Energy:</strong> {aiInput.energy_level}/10</div>
                <div><strong>Time:</strong> {aiInput.time_of_day}</div>
                {aiInput.optional_text && <div><strong>Notes:</strong> {aiInput.optional_text.slice(0, 100)}...</div>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 'recommendation' && recommendation && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#1f2937', margin: '0 0 8px 0' }}>
                Your Personalized Recommendation
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Safe, non-clinical wellbeing activities tailored to your current state
              </p>
            </div>
            
            {/* Safety Warnings */}
            {safetyResult && (
              <SafetyWarnings 
                warnings={safetyResult.safety_warnings}
                escalationNeeded={safetyResult.escalation_needed}
                supportiveMessage={safetyResult.supportive_message}
              />
            )}
            
            {/* Activity Recommendation */}
            <ActivityRecommender 
              recommendation={recommendation}
              onActivityComplete={handleActivityComplete}
              onTryDifferent={handleTryDifferent}
            />
          </div>
        )}

        {currentStep === 'feedback' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#1f2937', margin: '0 0 8px 0' }}>
                How was your experience?
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Your feedback helps improve Moodverse for everyone
              </p>
            </div>
            <FeedbackCollector 
              onFeedbackSubmitted={handleFeedbackSubmitted}
              recommendation={recommendation}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb'
      }}>
        {currentStep !== 'mood-checkin' && currentStep !== 'feedback' && (
          <button 
            className="btn secondary"
            onClick={() => {
              if (currentStep === 'ai-processing') setCurrentStep('mood-checkin');
              if (currentStep === 'recommendation') setCurrentStep('ai-processing');
            }}
          >
            ← Back
          </button>
        )}
        
        {currentStep === 'mood-checkin' && (
          <button 
            className="btn text"
            onClick={() => setCurrentStep('feedback')}
            style={{ color: '#6b7280' }}
          >
            Skip to Feedback
          </button>
        )}
        
        <button 
          className="btn text"
          onClick={() => {
            endSession();
            window.location.href = '/';
          }}
          style={{ color: '#6b7280' }}
        >
          End Session
        </button>
      </div>

      {/* Explore Other Features */}
      {currentStep === 'feedback' && (
        <div style={{ 
          marginTop: '32px', 
          padding: '24px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '12px',
          border: '2px solid #0ea5e9'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#0c4a6e', textAlign: 'center' }}>
            🌟 Explore More Wellness Features
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#0c4a6e', textAlign: 'center' }}>
            Continue your wellness journey with these additional tools
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <a
              href="/games"
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1f2937',
                textAlign: 'center',
                transition: 'all 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎮</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Gaming Room</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Relaxing games for stress relief</div>
            </a>
            
            <a
              href="/books"
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1f2937',
                textAlign: 'center',
                transition: 'all 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Peaceful Books</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Curated reading for mindfulness</div>
            </a>
            
            <a
              href="/vr"
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1f2937',
                textAlign: 'center',
                transition: 'all 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥽</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>VR Rooms</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Immersive relaxation experiences</div>
            </a>
            
            <a
              href="/yoga"
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1f2937',
                textAlign: 'center',
                transition: 'all 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧘‍♀️</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Yoga Studio</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Guided yoga and stretching</div>
            </a>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div style={{ 
        marginTop: '32px', 
        padding: '16px', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#166534'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ marginRight: '8px' }}>🔐</span>
          <strong>Privacy & Safety</strong>
        </div>
        <div style={{ lineHeight: '1.4' }}>
          • All data processed locally when possible<br/>
          • No medical advice or diagnosis<br/>
          • Session data automatically deleted<br/>
          • Anonymous feedback for improvement
        </div>
      </div>
    </div>
  );
}
