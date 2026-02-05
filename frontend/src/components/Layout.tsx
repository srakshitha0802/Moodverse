import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface LayoutProps {
  userData: any;
  onLogout: () => void;
}

export default function Layout({ userData, onLogout }: LayoutProps){
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container header-inner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px'
        }}>
          <div style={{display:'flex',alignItems:'center',gap:20}}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'white',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🧠 Moodverse
            </div>
            <nav className="site-nav" aria-label="Main navigation" style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <NavLink to="/" end style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/mood" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>Mood Scanner</NavLink>
              <NavLink to="/meditation" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>Meditation</NavLink>
              <NavLink to="/yoga" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>Yoga</NavLink>
              <NavLink to="/vr" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>VR Rooms</NavLink>
              <NavLink to="/experience" style={{
                color: '#fbbf24',
                textDecoration: 'none',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>🧠 AI Experience</NavLink>
              <NavLink to="/games" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>🎮 Games</NavLink>
              <NavLink to="/books" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }} className={({isActive}) => isActive ? 'active' : ''}>📚 Books</NavLink>
            </nav>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:16}}>
            {/* User Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                👤 {userData?.name || 'User'}
                <span style={{fontSize: '12px'}}>▼</span>
              </button>
              
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  zIndex: 1000
                }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{userData?.name}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{userData?.email}</div>
                    {userData?.preferences?.hasAnxiety && (
                      <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>
                        ⚠️ History of anxiety
                      </div>
                    )}
                    {userData?.preferences?.hasDepression && (
                      <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '2px' }}>
                        ⚠️ History of depression
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px' }}>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        padding: '8px 12px',
                        textAlign: 'left',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <a className="cta" href="#contact" style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px 16px',
              textDecoration: 'none',
              borderRadius: '20px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}>📞 Contact</a>
          </div>
        </div>
      </header>

      <main id="main" className="container" style={{paddingTop:20, minHeight: 'calc(100vh - 200px)'}}>
        <Outlet />
      </main>

      <footer className="container" style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '32px 20px',
        marginTop: '40px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {/* About Section */}
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#f3f4f6' }}>🧠 About Moodverse</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: '0 0 12px 0' }}>
              A privacy-first AI companion for emotional wellbeing, designed with safety and care.
            </p>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>
              <div>🔒 Privacy-first design</div>
              <div>🛡️ Safety by default</div>
              <div>🤖 AI-powered insights</div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#f3f4f6' }}>📞 Contact Information</h3>
            <div style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>👤</span>
                <span><strong>Name:</strong> Semala Rakshitha</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>📱</span>
                <span><strong>Phone:</strong> +91 8639975744</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>📧</span>
                <span><strong>Email:</strong> rakshithasemala@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🌐</span>
                <span><strong>Website:</strong> moodverse.com</span>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#f3f4f6' }}>🆘 Emergency Resources</h3>
            <div style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ef4444' }}>🚨 Crisis Helplines:</strong>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                • <strong>National Suicide Prevention Lifeline:</strong> 988
              </div>
              <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                • <strong>Crisis Text Line:</strong> Text HOME to 741741
              </div>
              <div style={{ fontSize: '14px', marginBottom: '12px' }}>
                • <strong>Emergency:</strong> 112
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                If you're in immediate danger, please call emergency services.
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#f3f4f6' }}>🔗 Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/experience" style={{ color: '#60a5fa', textDecoration: 'none' }}>🧠 AI Experience</a>
              <a href="/meditation" style={{ color: '#60a5fa', textDecoration: 'none' }}>🧘 Meditation</a>
              <a href="/yoga" style={{ color: '#60a5fa', textDecoration: 'none' }}>🧘‍♀️ Yoga</a>
              <a href="/vr" style={{ color: '#60a5fa', textDecoration: 'none' }}>🥽 VR Rooms</a>
              <a href="/community" style={{ color: '#60a5fa', textDecoration: 'none' }}>👥 Community</a>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '32px', 
          paddingTop: '24px', 
          borderTop: '1px solid #374151',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <div style={{ marginBottom: '8px' }}>
            © {new Date().getFullYear()} Moodverse · Built with care by Semala Rakshitha
          </div>
          <div style={{ fontSize: '12px' }}>
            Privacy-first emotional wellbeing platform | Not a substitute for professional mental health care
          </div>
        </div>
      </footer>
    </div>
  )
}
