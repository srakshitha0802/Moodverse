import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../advanced-home.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; size: number; speedX: number; speedY: number; opacity: number}>>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [moodScore, setMoodScore] = useState(72);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    
    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);
    
    // Time update for greeting
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Breathing animation
    const breathInterval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'hold' : prev === 'hold' ? 'exhale' : 'inhale');
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      clearInterval(breathInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100
      })));
    };
    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate mood score
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodScore(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.min(100, Math.max(40, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Calculate parallax offset
  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-emoji">🧠</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <h2>Loading Moodverse...</h2>
          <p>Preparing your wellness experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page" ref={containerRef}>
      {/* Advanced Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        <div className="gradient-orb orb-5"></div>
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              transform: `translate(${parallaxX * p.id * 0.1}px, ${parallaxY * p.id * 0.1}px)`
            }}
          />
        ))}
        <div className="mesh-overlay"></div>
      </div>

      <main className="home-main">
        {/* Enhanced Hero Section */}
        <section className="hero">
          <div className="hero-bg-effects">
            <div className="floating-shape shape-1">✨</div>
            <div className="floating-shape shape-2">🌟</div>
            <div className="floating-shape shape-3">💫</div>
            <div className="floating-shape shape-4">⭐</div>
            <div className="floating-shape shape-5">🌙</div>
            <div className="floating-shape shape-6">☁️</div>
          </div>

          <div className="hero-content" style={{ transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)` }}>
            <div className="hero-badge-wrapper">
              <span className="hero-badge pulse-glow">🌿 {getGreeting()}! Your Mental Wellness Journey Starts Here</span>
            </div>

            <h1 className="hero-title">
              Welcome to <span className="gradient-text gradient-animate">Moodverse</span>
            </h1>

            <p className="hero-description">
              AI-powered mental wellness platform with VR therapy, meditation, music therapy, and 24/7 AI support. 
              Take control of your mental health journey today.
            </p>

            {/* Live Mood Indicator */}
            <div className="live-mood-indicator">
              <div className="mood-thermometer">
                <div className="thermometer-fill" style={{ height: `${moodScore}%` }}>
                  <div className="thermometer-glow"></div>
                </div>
                <div className="thermometer-label">Live Mood Score</div>
                <div className="thermometer-value">{moodScore}%</div>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-item animate-float">
                <span className="stat-icon">🧠</span>
                <span>AI Mood Detection</span>
              </div>
              <div className="stat-item animate-float" style={{animationDelay: '0.1s'}}>
                <span className="stat-icon">🥽</span>
                <span>VR Therapy</span>
              </div>
              <div className="stat-item animate-float" style={{animationDelay: '0.2s'}}>
                <span className="stat-icon">🧘</span>
                <span>Meditation</span>
              </div>
              <div className="stat-item animate-float" style={{animationDelay: '0.3s'}}>
                <span className="stat-icon">💬</span>
                <span>24/7 AI Chat</span>
              </div>
            </div>

            <div className="hero-buttons">
              <Link to="/mood-scanner" className="btn primary btn-lg glow-effect rainbow-border">
                <span className="btn-icon">🔍</span>
                Start Free Scan
              </Link>
              <Link to="/vr-rooms" className="btn secondary btn-lg glow-effect">
                <span className="btn-icon">🥽</span>
                Try VR Therapy
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-badges">
                <span className="trust-badge hover-lift">✓ 100% Free</span>
                <span className="trust-badge hover-lift">✓ No Login Required</span>
                <span className="trust-badge hover-lift">✓ Privacy Protected</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" style={{ transform: `translate(${-parallaxX * 0.3}px, ${-parallaxY * 0.3}px)` }}>
            <div className="visual-container">
              <div className="hero-ring ring-1"></div>
              <div className="hero-ring ring-2"></div>
              <div className="hero-ring ring-3"></div>
              
              {/* 3D Floating Cards */}
              <div className="floating-card card-ai hover-scale tilt-card" data-tilt>
                <span className="ai-emoji">🧠</span>
                <div className="card-content">
                  <span className="card-title">AI Scanner</span>
                  <span className="card-stat">98% Accuracy</span>
                </div>
                <div className="card-sparkle"></div>
              </div>
              
              <div className="floating-card card-vr hover-scale tilt-card" style={{animationDelay: '0.5s'}} data-tilt>
                <span className="ai-emoji">🥽</span>
                <div className="card-content">
                  <span className="card-title">VR Therapy</span>
                  <span className="card-stat">16+ Rooms</span>
                </div>
                <div className="card-sparkle"></div>
              </div>
              
              <div className="floating-card card-meditation hover-scale tilt-card" style={{animationDelay: '1s'}} data-tilt>
                <span className="ai-emoji">🧘</span>
                <div className="card-content">
                  <span className="card-title">Meditation</span>
                  <span className="card-stat">12+ Sessions</span>
                </div>
                <div className="card-sparkle"></div>
              </div>
              
              <div className="floating-card card-music hover-scale tilt-card" style={{animationDelay: '1.5s'}} data-tilt>
                <span className="ai-emoji">🎵</span>
                <div className="card-content">
                  <span className="card-title">Music</span>
                  <span className="card-stat">50+ Tracks</span>
                </div>
                <div className="card-sparkle"></div>
              </div>
              
              {/* Central AI Brain Animation */}
              <div className="central-brain">
                <div className="brain-core"></div>
                <div className="brain-pulse"></div>
                <div className="brain-orb">
                  <span>AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breathing Exercise Preview */}
        <section className="breathing-preview-section">
          <div className="breathing-container">
            <div className="breathing-visual">
              <div className={`breath-circle ${breathingPhase}`}>
                <span className="breath-text">
                  {breathingPhase === 'inhale' ? 'Inhale' : breathingPhase === 'hold' ? 'Hold' : 'Exhale'}
                </span>
              </div>
              <div className="breath-guide">
                <p>Follow the circle to practice mindful breathing</p>
                <Link to="/meditation" className="btn primary">Start Full Session</Link>
              </div>
            </div>
            <div className="breathing-info">
              <span className="section-badge">🧘 Quick Exercise</span>
              <h2>4-7-8 Breathing Technique</h2>
              <p>This calming breathing pattern can help reduce anxiety and promote better sleep.</p>
              <div className="breath-steps">
                <div className="breath-step">
                  <span className="step-number">1</span>
                  <span>Inhale through nose for 4 seconds</span>
                </div>
                <div className="breath-step">
                  <span className="step-number">2</span>
                  <span>Hold breath for 7 seconds</span>
                </div>
                <div className="breath-step">
                  <span className="step-number">3</span>
                  <span>Exhale through mouth for 8 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="quick-actions-section">
          <div className="quick-actions-container">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-grid">
              <Link to="/mood-scanner" className="quick-action-card magnetic">
                <div className="quick-action-icon">📸</div>
                <div className="quick-action-content">
                  <h3>Scan Your Mood</h3>
                  <p>AI-powered emotion detection</p>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
              <Link to="/meditation" className="quick-action-card magnetic">
                <div className="quick-action-icon">🧘</div>
                <div className="quick-action-content">
                  <h3>Start Meditating</h3>
                  <p>Guided sessions for peace</p>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
              <Link to="/vr-rooms" className="quick-action-card magnetic">
                <div className="quick-action-icon">🌍</div>
                <div className="quick-action-content">
                  <h3>Enter VR Room</h3>
                  <p>Immersive 360° experiences</p>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
              <Link to="/chat" className="quick-action-card magnetic">
                <div className="quick-action-icon">💬</div>
                <div className="quick-action-content">
                  <h3>AI Companion</h3>
                  <p>24/7 emotional support</p>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Explore All Features</h2>
          <p className="section-subtitle">Everything you need for your mental wellness journey</p>
          
          <div className="features-grid">
            <Link to="/mood-scanner" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🤖</span>
              </div>
              <span className="feature-label">Mood Scanner</span>
              <span className="feature-desc">AI Emotion Detection</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/meditation" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🧘</span>
              </div>
              <span className="feature-label">Meditation</span>
              <span className="feature-desc">Guided Sessions</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/vr-rooms" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🥽</span>
              </div>
              <span className="feature-label">VR Therapy</span>
              <span className="feature-desc">360° Environments</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/music" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🎵</span>
              </div>
              <span className="feature-label">Music</span>
              <span className="feature-desc">Therapeutic Sounds</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/yoga" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🧎</span>
              </div>
              <span className="feature-label">Yoga</span>
              <span className="feature-desc">AI Recommendations</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/games" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🎮</span>
              </div>
              <span className="feature-label">Games</span>
              <span className="feature-desc">Mood Boosting</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/community" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">👥</span>
              </div>
              <span className="feature-label">Community</span>
              <span className="feature-desc">Support Groups</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/journal" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📔</span>
              </div>
              <span className="feature-label">Journal</span>
              <span className="feature-desc">Mood Tracking</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/chat" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">💬</span>
              </div>
              <span className="feature-label">AI Chat</span>
              <span className="feature-desc">24/7 Support</span>
              <div className="feature-hover-effect"></div>
            </Link>
            <Link to="/books" className="feature-card glow-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📚</span>
              </div>
              <span className="feature-label">Books</span>
              <span className="feature-desc">Mental Health</span>
              <div className="feature-hover-effect"></div>
            </Link>
          </div>
        </section>

        {/* AI Mood Detection Preview */}
        <section className="mood-detector-preview">
          <div className="preview-container">
            <div className="preview-content">
              <span className="preview-badge">✨ AI Powered</span>
              <h2>Smart Mood Detection</h2>
              <p>Our advanced AI analyzes your facial expressions and behavior patterns to understand your emotional state and provide personalized recommendations.</p>
              <div className="preview-features">
                <div className="preview-feature">
                  <span className="feature-check">✓</span>
                  <span>Real-time emotion analysis</span>
                </div>
                <div className="preview-feature">
                  <span className="feature-check">✓</span>
                  <span>Personalized recommendations</span>
                </div>
                <div className="preview-feature">
                  <span className="feature-check">✓</span>
                  <span>Progress tracking over time</span>
                </div>
              </div>
              <Link to="/mood-scanner" className="btn primary">Try It Free</Link>
            </div>
            <div className="preview-visual">
              <div className="ai-face-scanner">
                <div className="scanner-frame">
                  <div className="face-outline">
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                    <div className="smile"></div>
                  </div>
                  <div className="scan-line"></div>
                  <div className="scan-overlay"></div>
                </div>
                <div className="emotion-bars">
                  <div className="emotion-bar" style={{width: '85%'}}>
                    <span>Happy</span>
                    <span>85%</span>
                  </div>
                  <div className="emotion-bar" style={{width: '60%'}}>
                    <span>Calm</span>
                    <span>60%</span>
                  </div>
                  <div className="emotion-bar" style={{width: '45%'}}>
                    <span>Focused</span>
                    <span>45%</span>
                  </div>
                  <div className="emotion-bar" style={{width: '30%'}}>
                    <span>Energetic</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item glass-card">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">👥</span>
              </div>
              <span className="stat-number" data-target="50000">0</span>
              <span className="stat-label">Active Users</span>
              <div className="stat-trend up">↑ 23% this month</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🎯</span>
              </div>
              <span className="stat-number" data-target="98">0</span>
              <span className="stat-label">Accuracy Rate</span>
              <div className="stat-trend up">↑ AI Improved</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🏠</span>
              </div>
              <span className="stat-number" data-target="16">0</span>
              <span className="stat-label">VR Rooms</span>
              <div className="stat-trend new">New: Space VR</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🕐</span>
              </div>
              <span className="stat-number">24/7</span>
              <span className="stat-label">AI Support</span>
              <div className="stat-trend">Always Online</div>
            </div>
          </div>
        </section>

        {/* VR Preview Section */}
        <section className="vr-preview-section">
          <div className="vr-preview-container">
            <div className="vr-preview-content">
              <span className="preview-badge">🥽 Immersive Experience</span>
              <h2>VR Therapy Rooms</h2>
              <p>Escape to peaceful virtual environments designed to reduce stress and anxiety. Explore beaches, forests, mountains, and more - all from your device.</p>
              <div className="vr-features">
                <div className="vr-feature">
                  <span className="vr-feature-icon">🏖️</span>
                  <span>Beach Retreats</span>
                </div>
                <div className="vr-feature">
                  <span className="vr-feature-icon">🌲</span>
                  <span>Forest Meditations</span>
                </div>
                <div className="vr-feature">
                  <span className="vr-feature-icon">🏔️</span>
                  <span>Mountain Views</span>
                </div>
                <div className="vr-feature">
                  <span className="vr-feature-icon">✨</span>
                  <span>Cosmic Journeys</span>
                </div>
              </div>
              <Link to="/vr-rooms" className="btn secondary">Explore VR Rooms</Link>
            </div>
            <div className="vr-preview-visual">
              <div className="vr-showcase">
                <div className="vr-scene-preview">
                  <div className="vr-environment beach">
                    <span className="env-icon">🏖️</span>
                    <span className="env-name">Sechelt Beach</span>
                  </div>
                  <div className="vr-environment forest">
                    <span className="env-icon">🌲</span>
                    <span className="env-name">Zen Park</span>
                  </div>
                  <div className="vr-environment mountains">
                    <span className="env-icon">🏔️</span>
                    <span className="env-name">Alpine Peaks</span>
                  </div>
                  <div className="vr-environment cosmic">
                    <span className="env-icon">✨</span>
                    <span className="env-name">Cosmic Journey</span>
                  </div>
                </div>
                <div className="vr-pulse-ring"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="testimonials-section">
          <h2 className="section-title">What Users Say</h2>
          <p className="section-subtitle">Real stories from real people</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">👩</div>
              <p>"Moodverse helped me manage my anxiety through VR therapy. The beach environments are incredibly relaxing!"</p>
              <span className="testimonial-name">Sarah K.</span>
              <span className="testimonial-role">VR Therapy User</span>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👨</div>
              <p>"The AI mood detection is surprisingly accurate. It helps me understand my emotional patterns better."</p>
              <span className="testimonial-name">Michael R.</span>
              <span className="testimonial-role">Daily User</span>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👩‍🦰</div>
              <p>"Morning meditations have become a essential part of my routine. Highly recommended!"</p>
              <span className="testimonial-name">Emma T.</span>
              <span className="testimonial-role">Meditation User</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🧠</span>
                <span className="logo-text">Moodverse</span>
              </div>
              <p>Your AI-powered mental wellness companion. Start your journey to better mental health today.</p>
              <div className="social-links">
                <a href="#" className="social-link hover-lift" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-link hover-lift" aria-label="Facebook">f</a>
                <a href="#" className="social-link hover-lift" aria-label="Instagram">📷</a>
                <a href="#" className="social-link hover-lift" aria-label="YouTube">▶️</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Features</h4>
                <Link to="/mood-scanner">Mood Scanner</Link>
                <Link to="/meditation">Meditation</Link>
                <Link to="/vr-rooms">VR Therapy</Link>
                <Link to="/music">Music</Link>
                <Link to="/chat">AI Chat</Link>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <Link to="/yoga">Yoga</Link>
                <Link to="/games">Games</Link>
                <Link to="/journal">Journal</Link>
                <Link to="/books">Books</Link>
                <Link to="/community">Community</Link>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <Link to="/resources">Help Center</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/chat">AI Chat</Link>
                <span className="crisis-link">🆘 Crisis Helpline</span>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>2024 Moodverse. All rights reserved. Made with ❤️ for mental wellness.</p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 Secure</span>
              <span className="footer-badge">✓ Verified</span>
              <span className="footer-badge">🌿 Eco-Friendly</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

