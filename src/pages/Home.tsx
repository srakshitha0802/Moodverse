import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../advanced-home.css';

/* Vector SVG Icons for Home Page (100% Emoji-Free) */
const HomeIcons = {
  Sparkle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
  Brain: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Scan: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  VR: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <circle cx="8" cy="12" r="2.5" />
      <circle cx="16" cy="12" r="2.5" />
      <line x1="10.5" y1="12" x2="13.5" y2="12" />
    </svg>
  ),
  Meditation: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Chat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Music: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Yoga: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="m4 17 6-2 2 4 4-2" />
      <path d="m8 12 4-2 4 2" />
      <path d="M12 10v7" />
    </svg>
  ),
  Games: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="11" r="1" />
      <circle cx="17" cy="13" r="1" />
    </svg>
  ),
  Community: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Journal: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Books: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [moodScore, setMoodScore] = useState(74);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    // Mouse tracking for soft parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Time update
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Breathing cycle
    const breathInterval = setInterval(() => {
      setBreathingPhase(prev => (prev === 'inhale' ? 'hold' : prev === 'hold' ? 'exhale' : 'inhale'));
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      clearInterval(breathInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate mood score gently
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodScore(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.min(95, Math.max(65, prev + change));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 60;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 60;

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner-wrapper">
            <HomeIcons.Brain />
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <h2>Preparing Moodverse</h2>
          <p>Calibrating your peaceful mental wellness sanctuary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page" ref={containerRef}>
      {/* Ambient Pastel Background Orbs */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      <div className="home-main">
        {/* Serene Pastel Hero Section */}
        <section className="hero">
          <div className="hero-content" style={{ transform: `translate(${parallaxX * 0.15}px, ${parallaxY * 0.15}px)` }}>
            <div className="hero-badge-wrapper">
              <span className="hero-badge">
                <HomeIcons.Sun />
                <span>{getGreeting()} · Sanctuary Active</span>
              </span>
            </div>

            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Moodverse</span>
            </h1>

            <p className="hero-description">
              A private, clinically-informed AI wellness sanctuary. Experience immersive 3D VR therapy rooms,
              guided breathwork, facial mood detection, and continuous emotional companionship.
            </p>

            {/* Quick Hero Feature Indicators */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-icon-wrapper">
                  <HomeIcons.Brain />
                </span>
                <span>AI Emotion Analysis</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon-wrapper">
                  <HomeIcons.VR />
                </span>
                <span>3D VR Sanctuary</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon-wrapper">
                  <HomeIcons.Meditation />
                </span>
                <span>Zen Meditation</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon-wrapper">
                  <HomeIcons.Chat />
                </span>
                <span>24/7 AI Companion</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <Link to="/mood" className="btn btn-primary">
                <HomeIcons.Search />
                <span>Start Mood Scan</span>
              </Link>
              <Link to="/vr" className="btn btn-secondary">
                <HomeIcons.VR />
                <span>Explore VR Rooms</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div style={{ marginTop: '26px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                <HomeIcons.Check /> Zero Login Required
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                <HomeIcons.Shield /> 100% Privacy Protected
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                <HomeIcons.Sparkle /> Free Clinical AI Tools
              </span>
            </div>
          </div>
        </section>

        {/* Guided Breathing Exercise Section */}
        <section>
          <div className="breathing-box">
            <span className="hero-badge" style={{ marginBottom: '16px' }}>
              <HomeIcons.Meditation />
              <span>Restorative Rhythm</span>
            </span>
            <h2 className="section-title">Mindful Breathing Visualizer</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '24px', fontSize: '14px' }}>
              Synchronize your breath with the expanding rhythm to stimulate parasympathetic relaxation.
            </p>

            <div className={`breathing-circle ${breathingPhase}`}>
              <div className="breathing-text">
                {breathingPhase === 'inhale' ? 'Inhale' : breathingPhase === 'hold' ? 'Hold' : 'Exhale'}
              </div>
            </div>

            <Link to="/meditation" className="btn btn-secondary">
              <span>Open Guided Meditation</span>
              <HomeIcons.ArrowRight />
            </Link>
          </div>
        </section>

        {/* Explore Features Grid */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="section-title">
              <HomeIcons.Sparkle />
              <span>Explore All Sanctuary Tools</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Select a specialized environment tailored to your current emotional state.
            </p>
          </div>

          <div className="features-grid">
            <Link to="/mood" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sky)', color: '#0284C7' }}>
                <HomeIcons.Scan />
              </div>
              <h3 className="feature-title">AI Mood Scanner</h3>
              <p className="feature-desc">Real-time facial micro-expression detector & sentiment insight.</p>
            </Link>

            <Link to="/experience" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-lavender)', color: '#6366F1' }}>
                <HomeIcons.Brain />
              </div>
              <h3 className="feature-title">AI Companion</h3>
              <p className="feature-desc">Intelligent, compassionate dialogue with clinically-grounded empathy.</p>
            </Link>

            <Link to="/meditation" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sage)', color: '#0D9488' }}>
                <HomeIcons.Meditation />
              </div>
              <h3 className="feature-title">Guided Meditation</h3>
              <p className="feature-desc">Interactive breathwork visualizer, zen bells, and calming sessions.</p>
            </Link>

            <Link to="/vr" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sky)', color: '#0284C7' }}>
                <HomeIcons.VR />
              </div>
              <h3 className="feature-title">3D VR Sanctuary</h3>
              <p className="feature-desc">360° immersive peaceful environments for complete mental reset.</p>
            </Link>

            <Link to="/yoga" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sage)', color: '#15803D' }}>
                <HomeIcons.Yoga />
              </div>
              <h3 className="feature-title">Restorative Yoga</h3>
              <p className="feature-desc">Gentle pose guides designed for somatic anxiety relief and posture.</p>
            </Link>

            <Link to="/games" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-amber)', color: '#D97706' }}>
                <HomeIcons.Games />
              </div>
              <h3 className="feature-title">Mindful Games</h3>
              <p className="feature-desc">Sensory bubble poppers and color matchers to distract overstimulated minds.</p>
            </Link>

            <Link to="/music" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sky)', color: '#0284C7' }}>
                <HomeIcons.Music />
              </div>
              <h3 className="feature-title">Calming Audio</h3>
              <p className="feature-desc">Binaural frequencies, rain soundscapes, and theta-wave relaxation tracks.</p>
            </Link>

            <Link to="/community" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-lavender)', color: '#6366F1' }}>
                <HomeIcons.Community />
              </div>
              <h3 className="feature-title">Community Circle</h3>
              <p className="feature-desc">Safe, anonymous peer-supported discussions and shared reflections.</p>
            </Link>

            <Link to="/journal" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-sage)', color: '#0D9488' }}>
                <HomeIcons.Journal />
              </div>
              <h3 className="feature-title">Daily Journal</h3>
              <p className="feature-desc">Encrypted private reflection log with automated emotion tagging.</p>
            </Link>

            <Link to="/books" className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: 'var(--pastel-amber)', color: '#B45309' }}>
                <HomeIcons.Books />
              </div>
              <h3 className="feature-title">Wellness Library</h3>
              <p className="feature-desc">Evidence-based literature and actionable coping summaries.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
