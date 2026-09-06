import React, { useState } from 'react';
import { useSession } from './SessionManager';

interface ConsentData {
  consent: boolean;
  timestamp: number;
  version: string;
}

export default function ConsentManager() {
  const { hasConsent, setConsent } = useSession();
  const [showDetails, setShowDetails] = useState(false);

  if (hasConsent) {
    return null; // Don't show consent if already given
  }

  const handleConsent = (accepted: boolean) => {
    setConsent(accepted);
    if (!accepted) {
      // If user declines, redirect to a simple page or show minimal functionality
      console.log('User declined consent - limited functionality available');
    }
  };

  return (
    <div className="consent-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="card" style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginTop: 0, color: '#1f2937' }}>Welcome to Moodverse</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.5' }}>
            Moodverse uses a black-box AI model to assist with emotional wellbeing by analyzing 
            voluntary inputs and recommending safe, non-clinical wellbeing activities.
          </p>
        </div>

        {!showDetails ? (
          <>
            <button 
              className="btn" 
              style={{ marginRight: '8px' }}
              onClick={() => handleConsent(true)}
            >
              I Accept - Continue
            </button>
            <button 
              className="btn secondary" 
              onClick={() => handleConsent(false)}
            >
              Decline
            </button>
            <button 
              className="btn text" 
              style={{ marginLeft: '8px', color: '#6b7280' }}
              onClick={() => setShowDetails(true)}
            >
              Learn More
            </button>
          </>
        ) : (
          <div>
            <h3>Privacy & Data Usage</h3>
            <div style={{ textAlign: 'left', color: '#4b5563', lineHeight: '1.6' }}>
              <h4>🔒 Data Protection</h4>
              <ul>
                <li>All mood analysis happens locally on your device</li>
                <li>No biometric data is stored permanently</li>
                <li>Session data is automatically deleted after use</li>
                <li>Optional anonymized summaries for trend analysis</li>
              </ul>

              <h4>🛡️ Safety Guarantees</h4>
              <ul>
                <li>No medical advice or diagnosis</li>
                <li>No emotion labeling without your consent</li>
                <li>No autonomous decisions - you remain in control</li>
                <li>Human oversight always enabled</li>
              </ul>

              <h4>⚙️ What We Collect</h4>
              <ul>
                <li>Temporary session data (deleted automatically)</li>
                <li>Optional anonymous usage statistics</li>
                <li>Your preferences (stored locally)</li>
              </ul>

              <h4>🚫 What We Don't Do</h4>
              <ul>
                <li>Store personal emotional data</li>
                <li>Share your information with third parties</li>
                <li>Use your data for advertising</li>
                <li>Make automated mental health decisions</li>
              </ul>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                className="btn" 
                style={{ marginRight: '8px' }}
                onClick={() => handleConsent(true)}
              >
                I Accept - Start My Session
              </button>
              <button 
                className="btn secondary" 
                onClick={() => handleConsent(false)}
              >
                I Don't Accept
              </button>
              <button 
                className="btn text" 
                style={{ marginLeft: '8px', color: '#6b7280' }}
                onClick={() => setShowDetails(false)}
              >
                Back
              </button>
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <strong>About Moodverse:</strong> A privacy-first emotional wellbeing companion designed for 
          safe, non-clinical support. Not a substitute for professional mental health care.
        </div>
      </div>
    </div>
  );
}
