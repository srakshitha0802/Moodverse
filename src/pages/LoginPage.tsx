import React, { useState } from 'react';
import { useSession } from '../components/SessionManager';

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { updatePreferences } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    hasAnxiety: false,
    hasDepression: false,
    hasMedicalHistory: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Store user data in session
    const userData = {
      ...formData,
      loginTime: new Date().toISOString(),
      preferences: {
        hasAnxiety: formData.hasAnxiety,
        hasDepression: formData.hasDepression,
        medicalHistory: formData.hasMedicalHistory
      }
    };

    updatePreferences({
      language: 'en',
      immersionLevel: 'standard',
      notifications: true,
      dataRetention: 'minimal',
      accessibilityFeatures: {
        highContrast: false,
        fontSize: 'medium',
        voiceGuidance: false
      }
    });

    onLogin(userData);
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="login-card" style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #8b9be2ff 0%, #7375fbff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🧠
          </div>
          <h1 style={{ 
            margin: '0 0 10px 0', 
            color: '#1f2937',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            Moodverse
          </h1>
          <p style={{ 
            margin: '0', 
            color: '#6b7280',
            fontSize: '16px'
          }}>
            {isSignUp ? 'Create your account' : 'Welcome back! Please sign in'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'border-color 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Age
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select your age range</option>
                  <option value="13-17">13-17 years</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-35">26-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-55">46-55 years</option>
                  <option value="56+">56+ years</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="Confirm your password"
                />
              </div>

              {/* Medical History Section */}
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '20px', 
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  margin: '0 0 15px 0', 
                  color: '#1f2937',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  🏥 Medical History (Optional)
                </h3>
                <p style={{ 
                  margin: '0 0 15px 0', 
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  This information helps us provide better, safer recommendations. It's completely optional and kept private.
                </p>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      name="hasAnxiety"
                      checked={formData.hasAnxiety}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                    />
                    <span style={{ color: '#374151' }}>History of anxiety</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      name="hasDepression"
                      checked={formData.hasDepression}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                    />
                    <span style={{ color: '#374151' }}>History of depression</span>
                  </label>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Other relevant medical history
                  </label>
                  <textarea
                    name="hasMedicalHistory"
                    value={formData.hasMedicalHistory}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                    placeholder="Any other relevant medical conditions or concerns (optional)"
                  />
                </div>

                <div style={{ marginTop: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Name of emergency contact"
                  />

                  <label style={{ display: 'block', marginBottom: '8px', marginTop: '10px', fontWeight: '600', color: '#374151' }}>
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Emergency contact phone number"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#6b7280' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '5px'
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '8px',
          fontSize: '12px',
          color: '#0369a1',
          textAlign: 'center'
        }}>
          <strong>🔒 Privacy First:</strong> Your data is encrypted and never shared. 
          Medical history helps us provide safer recommendations.
        </div>
      </div>
    </div>
  );
}
