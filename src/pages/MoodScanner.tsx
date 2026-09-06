import React from "react";
import AdvancedMoodDetector from "../components/AdvancedMoodDetector";

export default function MoodScanner(){
  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🤖</div>
        <h1 style={{ 
          fontSize: '36px', 
          margin: '0 0 16px 0',
          fontWeight: 'bold'
        }}>
          Advanced AI Mood Scanner
        </h1>
        <p style={{ 
          fontSize: '18px', 
          margin: '0 auto',
          opacity: 0.9,
          maxWidth: '600px'
        }}>
          State-of-the-art facial emotion recognition with personalized wellness recommendations powered by artificial intelligence
        </p>
      </div>

      {/* Main Scanner */}
      <AdvancedMoodDetector />

      {/* Features Section */}
      <div style={{ 
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔒</div>
          <h3 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Privacy-First Design</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
            All analysis happens locally on your device. No video frames or personal data are uploaded to external servers.
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🧠</div>
          <h3 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>AI-Powered Insights</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
            Advanced machine learning models analyze facial expressions, behavioral patterns, and emotional states with high accuracy.
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>💡</div>
          <h3 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Personalized Recommendations</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
            Receive tailored yoga sequences, breathing exercises, and wellness activities based on your emotional state.
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
          <h3 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Real-Time Analysis</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
            Get instant feedback with confidence scores and detailed emotional intelligence analysis updated every few seconds.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ 
        marginTop: '40px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '32px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          margin: '0 0 32px 0', 
          color: '#1f2937',
          fontSize: '28px'
        }}>
          How Advanced AI Mood Scanning Works
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#667eea',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 auto 16px'
            }}>
              1
            </div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Camera Access</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Secure camera access captures your facial expressions for analysis
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#764ba2',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 auto 16px'
            }}>
              2
            </div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>AI Analysis</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Advanced algorithms analyze micro-expressions and emotional indicators
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 auto 16px'
            }}>
              3
            </div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Personalized Insights</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Receive tailored recommendations for yoga, meditation, and wellness activities
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: '32px',
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
        <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Important Disclaimer</h4>
        <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
          This AI mood scanner is for wellness and educational purposes only. It is not intended to diagnose, treat, cure, or prevent any medical condition. 
          For professional mental health support, please consult with qualified healthcare providers.
        </p>
      </div>
    </div>
  )
}
