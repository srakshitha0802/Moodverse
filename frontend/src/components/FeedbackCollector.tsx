import React, { useState, useEffect } from 'react';
import { useSession } from './SessionManager';

interface FeedbackData {
  helpfulness_rating: number; // 1-5 scale
  activity_satisfaction: number; // 1-5 scale
  improvement_suggestions: string;
  would_recommend: boolean;
  emotional_state_after: string;
  timestamp: number;
}

interface TrendData {
  session_count: number;
  avg_helpfulness: number;
  common_moods: string[];
  preferred_activities: string[];
  peak_usage_times: string[];
}

interface FeedbackCollectorProps {
  onFeedbackSubmitted?: (feedback: FeedbackData) => void;
  recommendation?: any;
}

export default function FeedbackCollector({ onFeedbackSubmitted, recommendation }: FeedbackCollectorProps) {
  const { session, preferences } = useSession();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    helpfulness_rating: 0,
    activity_satisfaction: 0,
    improvement_suggestions: '',
    would_recommend: false,
    emotional_state_after: '',
    timestamp: Date.now()
  });
  const [submitted, setSubmitted] = useState(false);
  const [trendData, setTrendData] = useState<TrendData | null>(null);

  // Show feedback form after some interaction time or when user completes activity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) {
        setShowFeedback(true);
      }
    }, 30000); // Show after 30 seconds or on activity completion

    return () => clearTimeout(timer);
  }, [submitted]);

  // Load trend data for context
  useEffect(() => {
    loadTrendData();
  }, []);

  const loadTrendData = () => {
    try {
      const savedTrendData = localStorage.getItem('moodverse_trends');
      if (savedTrendData) {
        setTrendData(JSON.parse(savedTrendData));
      }
    } catch (e) {
      console.warn('Could not load trend data');
    }
  };

  const saveFeedback = (newFeedback: FeedbackData) => {
    try {
      // Save feedback locally for trend analysis
      const existingFeedback = JSON.parse(localStorage.getItem('moodverse_feedback') || '[]');
      existingFeedback.push(newFeedback);
      
      // Keep only last 50 feedback entries for privacy
      if (existingFeedback.length > 50) {
        existingFeedback.splice(0, existingFeedback.length - 50);
      }
      
      localStorage.setItem('moodverse_feedback', JSON.stringify(existingFeedback));
      
      // Update trend data
      updateTrendData(newFeedback);
      
      // Update session
      if (session) {
        const updatedSession = {
          ...session,
          feedback: newFeedback
        };
        localStorage.setItem('moodverse_session_summary', JSON.stringify(updatedSession));
      }
    } catch (e) {
      console.warn('Could not save feedback');
    }
  };

  const updateTrendData = (newFeedback: FeedbackData) => {
    try {
      const existingFeedback = JSON.parse(localStorage.getItem('moodverse_feedback') || '[]');
      const recentFeedback = existingFeedback.slice(-10); // Last 10 sessions
      
      const trendData: TrendData = {
        session_count: recentFeedback.length,
        avg_helpfulness: recentFeedback.reduce((sum: number, f: FeedbackData) => sum + f.helpfulness_rating, 0) / recentFeedback.length || 0,
        common_moods: [], // Would be populated from session data
        preferred_activities: [], // Would be tracked from activity usage
        peak_usage_times: [] // Would be tracked from session timestamps
      };
      
      localStorage.setItem('moodverse_trends', JSON.stringify(trendData));
      setTrendData(trendData);
    } catch (e) {
      console.warn('Could not update trend data');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback.helpfulness_rating === 0) {
      alert('Please rate how helpful this was');
      return;
    }

    saveFeedback(feedback);
    setSubmitted(true);
    
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted(feedback);
    }
  };

  const renderStars = (rating: number, onChange: (rating: number) => void) => (
    <div style={{ display: 'flex', gap: '4px', margin: '8px 0' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: star <= rating ? '#fbbf24' : '#d1d5db'
          }}
        >
          ⭐
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>✅</div>
        <h3 style={{ color: '#059669', margin: '0 0 8px 0' }}>Thank You!</h3>
        <p style={{ color: '#6b7280', margin: '0' }}>
          Your feedback helps improve Moodverse for everyone.
        </p>
      </div>
    );
  }

  if (!showFeedback) {
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <button 
          className="btn secondary"
          onClick={() => setShowFeedback(true)}
        >
          📝 Share Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ 
      maxWidth: '500px', 
      margin: '0 auto',
      padding: '20px'
    }}>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>💭 How was your experience?</h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Your feedback helps us improve Moodverse (anonymous and optional)
      </p>

      <form onSubmit={handleSubmit}>
        {/* Helpfulness Rating */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            How helpful was this recommendation?
          </label>
          {renderStars(feedback.helpfulness_rating, (rating) => 
            setFeedback(prev => ({ ...prev, helpfulness_rating: rating }))
          )}
        </div>

        {/* Activity Satisfaction */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            How satisfied were you with the activity?
          </label>
          {renderStars(feedback.activity_satisfaction, (rating) => 
            setFeedback(prev => ({ ...prev, activity_satisfaction: rating }))
          )}
        </div>

        {/* Emotional State After */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            How do you feel now compared to before?
          </label>
          <select
            value={feedback.emotional_state_after}
            onChange={(e) => setFeedback(prev => ({ ...prev, emotional_state_after: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}
          >
            <option value="">Select how you feel now</option>
            <option value="much_better">Much better</option>
            <option value="somewhat_better">Somewhat better</option>
            <option value="about_same">About the same</option>
            <option value="somewhat_worse">Somewhat worse</option>
            <option value="much_worse">Much worse</option>
          </select>
        </div>

        {/* Would Recommend */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={feedback.would_recommend}
              onChange={(e) => setFeedback(prev => ({ ...prev, would_recommend: e.target.checked }))}
            />
            I would recommend Moodverse to others
          </label>
        </div>

        {/* Improvement Suggestions */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Any suggestions for improvement? (Optional)
          </label>
          <textarea
            value={feedback.improvement_suggestions}
            onChange={(e) => setFeedback(prev => ({ ...prev, improvement_suggestions: e.target.value }))}
            placeholder="Share any ideas for making Moodverse better..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              resize: 'vertical'
            }}
            maxLength={300}
          />
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button 
            type="button"
            className="btn text"
            onClick={() => setShowFeedback(false)}
            style={{ color: '#6b7280' }}
          >
            Skip
          </button>
          <button 
            type="submit"
            className="btn"
            disabled={feedback.helpfulness_rating === 0}
          >
            Submit Feedback
          </button>
        </div>
      </form>

      {/* Trend Context */}
      {trendData && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong style={{ color: '#0c4a6e' }}>📊 Your Stats:</strong>
          <div style={{ color: '#0369a1', marginTop: '4px' }}>
            Sessions: {trendData.session_count} • 
            Avg Rating: {trendData.avg_helpfulness.toFixed(1)}/5
          </div>
        </div>
      )}
    </div>
  );
}
