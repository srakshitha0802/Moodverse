import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from './SessionManager';

interface StructuredRecommendation {
  emotional_summary: string;
  suggested_activity_type: 'breathing' | 'reflection' | 'audio' | 'visual' | 'yoga' | 'meditation';
  activity_intensity: 'low' | 'medium' | 'high';
  explanation: string;
  follow_up_option: string;
  safety_flag: boolean;
  confidence_score: number;
}

interface ActivityRecommenderProps {
  recommendation: StructuredRecommendation;
  onActivityComplete?: () => void;
  onTryDifferent?: () => void;
}

const ACTIVITY_ROUTES = {
  breathing: '/meditation',
  reflection: '/journal',
  audio: '/music',
  visual: '/vr',
  yoga: '/yoga',
  meditation: '/meditation'
};

const ACTIVITY_ICONS = {
  breathing: '🫁',
  reflection: '💭',
  audio: '🎵',
  visual: '🌅',
  yoga: '🧘',
  meditation: '🧘‍♀️'
};

const INTENSITY_DESCRIPTIONS = {
  low: 'Gentle and calming - perfect for when you need to unwind',
  medium: 'Moderate engagement - good for gradual mood improvement',
  high: 'Active and engaging - for when you want to actively shift your state'
};

export default function ActivityRecommender({ 
  recommendation, 
  onActivityComplete,
  onTryDifferent 
}: ActivityRecommenderProps) {
  const { preferences } = useSession();
  const [isStarted, setIsStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const handleStartActivity = () => {
    setIsStarted(true);
  };

  const handleCompleteActivity = () => {
    setIsStarted(false);
    if (onActivityComplete) {
      onActivityComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActivityRoute = () => {
    return ACTIVITY_ROUTES[recommendation.suggested_activity_type] || '/meditation';
  };

  const getActivityDescription = () => {
    const baseDescriptions = {
      breathing: 'Guided breathing exercises to help calm your nervous system',
      reflection: 'Mindful journaling prompts to help process your thoughts',
      audio: 'Curated calming music and soundscapes',
      visual: 'Immersive visual experiences for relaxation',
      yoga: 'Gentle yoga sequences tailored to your current state',
      meditation: 'Guided meditation sessions for mindfulness and peace'
    };
    return baseDescriptions[recommendation.suggested_activity_type] || 'Wellbeing activity';
  };

  return (
    <div className="card" style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>
          {ACTIVITY_ICONS[recommendation.suggested_activity_type]}
        </div>
        <h2 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
          Recommended: {recommendation.suggested_activity_type.charAt(0).toUpperCase() + recommendation.suggested_activity_type.slice(1)}
        </h2>
        <div style={{ 
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: '#f3f4f6',
          borderRadius: '16px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {recommendation.activity_intensity} intensity • {INTENSITY_DESCRIPTIONS[recommendation.activity_intensity]}
        </div>
      </div>

      {/* AI Analysis */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🤖 AI Analysis</h4>
        <p style={{ margin: '0', color: '#6b7280', lineHeight: '1.5' }}>
          {recommendation.emotional_summary}
        </p>
      </div>

      {/* Explanation */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>💡 Why This Activity</h4>
        <p style={{ margin: '0', color: '#4b5563', lineHeight: '1.6' }}>
          {recommendation.explanation}
        </p>
      </div>

      {/* Activity Timer (when started) */}
      {isStarted && (
        <div style={{ 
          backgroundColor: '#ecfdf5', 
          border: '1px solid #a7f3d0',
          padding: '16px', 
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46' }}>
            🕐 {formatTime(timeSpent)}
          </div>
          <div style={{ color: '#047857', fontSize: '14px' }}>
            Activity in progress
          </div>
        </div>
      )}

      {/* Follow-up suggestion */}
      <div style={{ 
        backgroundColor: '#fef3c7', 
        padding: '12px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 4px 0', color: '#92400e' }}>🔄 Next Steps</h4>
        <p style={{ margin: '0', color: '#b45309', fontSize: '14px' }}>
          {recommendation.follow_up_option}
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {!isStarted ? (
          <>
            <button 
              className="btn"
              onClick={handleStartActivity}
              style={{ flex: '1 1 auto' }}
            >
              ▶️ Start Activity
            </button>
            
            <Link 
              to={getActivityRoute()}
              className="btn secondary"
              style={{ flex: '1 1 auto', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
            >
              📖 View Details
            </Link>
            
            {onTryDifferent && (
              <button 
                className="btn text"
                onClick={onTryDifferent}
                style={{ flex: '1 1 auto', color: '#6b7280' }}
              >
                🔄 Try Different
              </button>
            )}
          </>
        ) : (
          <>
            <button 
              className="btn"
              onClick={handleCompleteActivity}
              style={{ flex: '1 1 auto' }}
            >
              ✅ Complete Activity
            </button>
            
            <button 
              className="btn secondary"
              onClick={() => setIsStarted(false)}
              style={{ flex: '1 1 auto' }}
            >
              ⏸️ Pause
            </button>
          </>
        )}
      </div>

      {/* Activity details */}
      <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#374151', fontSize: '14px' }}>
          📋 Activity Details
        </h4>
        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.4' }}>
          <div><strong>Type:</strong> {getActivityDescription()}</div>
          <div><strong>Confidence:</strong> {Math.round(recommendation.confidence_score * 100)}%</div>
          <div><strong>Safety Check:</strong> {recommendation.safety_flag ? '⚠️ Additional support available' : '✅ Safe for general use'}</div>
        </div>
      </div>

      {/* Skip option */}
      <div style={{ 
        marginTop: '16px', 
        textAlign: 'center',
        fontSize: '14px',
        color: '#9ca3af'
      }}>
        💡 You can skip this activity or try a different recommendation anytime
      </div>
    </div>
  );
}
