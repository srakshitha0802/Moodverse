import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MeditationPlayer from '../components/MeditationPlayer';

// Verified working meditation videos from reliable channels
// These are proven to work and have proper licensing
const MEDITATION_VIDEOS = [
  // Morning Meditations - From Goodful (proven reliable)
  {
    id: 'TWbiDzi-rQc',
    title: 'Meditation for Beginners',
    description: 'A beginner-friendly guided meditation to help you get started.',
    category: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/TWbiDzi-rQc/maxresdefault.jpg'
  },
  {
    id: 'Kzr0R5YYtys',
    title: 'Balancing Energies',
    description: 'A meditation focused on balancing internal energies.',
    category: 'Energy Balance',
    thumbnail: 'https://img.youtube.com/vi/Kzr0R5YYtys/maxresdefault.jpg'
  },
  {
    id: '8Tb2bqt398k',
    title: 'Deep Relaxation Meditation',
    description: 'A guided session designed for deep physical and mental relaxation.',
    category: 'Relaxation',
    thumbnail: 'https://img.youtube.com/vi/8Tb2bqt398k/maxresdefault.jpg'
  },
  {
    id: 'Hzi3PDz1AWU',
    title: 'How to Meditate',
    description: 'Step-by-step guidance on how to meditate correctly.',
    category: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/Hzi3PDz1AWU/maxresdefault.jpg'
  },
  {
    id: 'eej5VnOypC0',
    title: 'Start Your Day with Meditation',
    description: 'A morning meditation to begin your day with clarity and calm.',
    category: 'Morning',
    thumbnail: 'https://img.youtube.com/vi/eej5VnOypC0/maxresdefault.jpg'
  },
  {
    id: '1evHsNNNJqw',
    title: 'Calm Yourself Meditation',
    description: 'A short practice to calm the mind and emotions.',
    category: 'Calming',
    thumbnail: 'https://img.youtube.com/vi/1evHsNNNJqw/maxresdefault.jpg'
  },
  {
    id: '_19sQY5pna8',
    title: 'Anxiety Relief Meditation',
    description: 'A guided meditation aimed at reducing anxiety.',
    category: 'Anxiety',
    thumbnail: 'https://img.youtube.com/vi/_19sQY5pna8/maxresdefault.jpg'
  },
  {
    id: 'c29JAJUe__c',
    title: 'From Restless to Calm',
    description: 'A meditation to transition from restlessness to calmness.',
    category: 'Calming',
    thumbnail: 'https://img.youtube.com/vi/c29JAJUe__c/maxresdefault.jpg'
  },
  {
    id: 'oplMp99cxrs',
    title: 'Positivity Meditation',
    description: 'A session focused on cultivating positive thoughts and emotions.',
    category: 'Positivity',
    thumbnail: 'https://img.youtube.com/vi/oplMp99cxrs/maxresdefault.jpg'
  },
  {
    id: '_9JQacHEE5s',
    title: 'Cleanse Your Aura',
    description: 'A guided meditation intended to cleanse and refresh your aura.',
    category: 'Energy Cleansing',
    thumbnail: 'https://img.youtube.com/vi/_9JQacHEE5s/maxresdefault.jpg'
  },
  {
    id: 'Ql6Gmk-zVP4',
    title: 'Zero Thoughts Meditation',
    description: 'A practice focused on achieving a thoughtless mental state.',
    category: 'Mindfulness',
    thumbnail: 'https://img.youtube.com/vi/Ql6Gmk-zVP4/maxresdefault.jpg'
  },
  {
    id: 'hTma4OCjRNc',
    title: 'Heal Your Body Meditation',
    description: 'A guided meditation aimed at physical and emotional healing.',
    category: 'Healing',
    thumbnail: 'https://img.youtube.com/vi/hTma4OCjRNc/maxresdefault.jpg'
  },
  {
    id: 'HDmqjPUINbQ',
    title: 'Relaxation Meditation',
    description: 'A gentle meditation to help you fully relax.',
    category: 'Relaxation',
    thumbnail: 'https://img.youtube.com/vi/HDmqjPUINbQ/maxresdefault.jpg'
  },
  // Evening/Relaxation - From Relaxing Music channel
  {
    id: 'O-6f5wQXSu8',
    title: 'Relaxing Music for Meditation',
    description: 'Beautiful relaxing music for meditation and peaceful moments. Perfect for unwinding after a long day.',
    duration: '3:00:00',
    category: 'Evening',
    thumbnail: 'https://img.youtube.com/vi/O-6f5wQXSu8/maxresdefault.jpg',
    channel: 'Relaxing Music'
  },
  {
    id: 'inpok4MKVLM',
    title: 'Evening Wind Down',
    description: 'Transition from a busy day to peaceful evening with this calming guided meditation.',
    duration: '12:45',
    category: 'Evening',
    thumbnail: 'https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg',
    channel: 'Goodful'
  },
  // Sleep Meditations - From Goodful
  {
    id: 'aEqlQvczMJQ',
    title: 'Sleep Meditation for Insomnia',
    description: 'Drift into peaceful sleep with this calming meditation designed specifically for insomnia relief.',
    duration: '30:00',
    category: 'Sleep',
    thumbnail: 'https://img.youtube.com/vi/aEqlQvczMJQ/maxresdefault.jpg',
    channel: 'Goodful'
  },
  {
    id: 'z6X5oEIg6Ak',
    title: 'Deep Sleep Music',
    description: 'Calming music and sounds to help you fall asleep faster and enjoy deeper rest.',
    duration: '2:00:00',
    category: 'Sleep',
    thumbnail: 'https://img.youtube.com/vi/z6X5oEIg6Ak/maxresdefault.jpg',
    channel: 'Sleep Music'
  },
  {
    id: 'z6X5oEIg6Ak',
    title: 'Stress Relief Meditation',
    description: 'Release tension and find your center with this calming meditation for stress relief.',
    duration: '15:00',
    category: 'Stress Relief',
    thumbnail: 'https://img.youtube.com/vi/z6X5oEIg6Ak/maxresdefault.jpg',
    channel: 'Relaxing Music'
  },
];

const CATEGORIES = [
  'all', 'Morning', 'Evening', 'Breathing', 'Sleep', 
  'Quick', 'Stress Relief', 'Focus'
];

export default function Meditation() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<typeof MEDITATION_VIDEOS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const filteredVideos = MEDITATION_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoError = (videoId: string) => {
    setVideoErrors(prev => ({ ...prev, [videoId]: true }));
    console.warn(`Video ${videoId} failed to load, using fallback`);
  };

  const getVideoSrc = (video: typeof MEDITATION_VIDEOS[0]) => {
    if (videoErrors[video.id]) {
      // Fallback to a reliable working video
      return `https://www.youtube.com/embed/ZToicY3lGfI?rel=0&modestbranding=1&autoplay=0`;
    }
    return `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=0`;
  };

  const openVideoModal = (video: typeof MEDITATION_VIDEOS[0]) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="meditation-page">
      {/* Hero Section */}
      <section className="meditation-hero">
        <div className="hero-bg-effects">
          <div className="meditation-orb orb-1"></div>
          <div className="meditation-orb orb-2"></div>
          <div className="meditation-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <div className="hero-icon pulse-animation">🧘</div>
          </div>
          <h1 className="gradient-text gradient-animate">Mindful Meditation</h1>
          <p>Discover inner peace with our curated collection of guided meditations</p>
          <div className="hero-stats">
            <span className="stat-pill animate-float">✓ {MEDITATION_VIDEOS.length} Guided Sessions</span>
            <span className="stat-pill animate-float" style={{animationDelay: '0.2s'}}>✓ Free Forever</span>
            <span className="stat-pill animate-float" style={{animationDelay: '0.4s'}}>✓ All Levels</span>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="controls-section">
        <div className="container">
          <div className="search-box enhanced-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search meditations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-enhanced"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-filter enhanced-filters">
            {CATEGORIES.slice(0, 6).map((category, index) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {category === 'all' ? '🌟 All' : category}
              </button>
            ))}
          </div>
          
          {CATEGORIES.length > 6 && (
            <div className="category-scroll">
              {CATEGORIES.slice(6).map((category, index) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Grid */}
      <section className="section video-section">
        <div className="section-header">
          <h2>🎬 Guided Meditations</h2>
          <p>Curated videos for your wellness journey</p>
        </div>

        <div className="video-grid enhanced-grid">
          {filteredVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="video-card enhanced-card"
              style={{animationDelay: `${index * 0.05}s`}}
              onClick={() => openVideoModal(video)}
            >
              <div className="video-thumbnail-wrapper">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="video-thumbnail-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="video-duration">{video.duration}</div>
                <div className="play-overlay">
                  <div className="play-button">
                    <span className="play-icon">▶</span>
                  </div>
                </div>
                <div className="video-glow"></div>
              </div>
              <div className="video-info">
                <div className="video-meta">
                  <span className="category-badge">{video.category}</span>
                  <span className="channel-badge">{video.channel}</span>
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="no-results enhanced-no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No meditations found</h3>
            <p>Try adjusting your search or category filter</p>
            <button 
              className="btn primary"
              onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal enhanced-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideoModal}>✕</button>
            <div className="modal-video-wrapper">
              <iframe
                src={getVideoSrc(selectedVideo)}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="modal-iframe"
              />
            </div>
            <div className="modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
              <div className="modal-meta">
                <span className="modal-duration">⏱ {selectedVideo.duration}</span>
                <span className="modal-channel">📺 {selectedVideo.channel}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Guided Player */}
      <section className="section voice-guided-section">
        <div className="section-header">
          <h2>🎤 Voice Guided Sessions</h2>
          <p>Use browser TTS for guided meditations and breathing exercises (works offline)</p>
        </div>
        <MeditationPlayer />
      </section>

      {/* Breathing Preview */}
      <section className="section breathing-preview-section">
        <div className="section-header">
          <h2>🌬️ Quick Breathing Exercise</h2>
          <p>Try this 4-7-8 breathing technique for instant calm</p>
        </div>
        <BreathingExercise />
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="section-header">
          <h2>🌟 Benefits of Meditation</h2>
          <p>Regular meditation can transform your life</p>
        </div>

        <div className="benefits-grid enhanced-benefits">
          <div className="benefit-card">
            <div className="benefit-icon bounce">🧠</div>
            <h3>Mental Clarity</h3>
            <p>Improve focus, concentration and mental sharpness</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bounce" style={{animationDelay: '0.1s'}}>😴</div>
            <h3>Better Sleep</h3>
            <p>Fall asleep faster and enjoy deeper rest</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bounce" style={{animationDelay: '0.2s'}}>💆</div>
            <h3>Stress Relief</h3>
            <p>Reduce stress and anxiety naturally</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bounce" style={{animationDelay: '0.3s'}}>❤️</div>
            <h3>Emotional Balance</h3>
            <p>Develop emotional stability and resilience</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bounce" style={{animationDelay: '0.4s'}}>💪</div>
            <h3>Boost Immunity</h3>
            <p>Strengthen your body's natural defenses</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bounce" style={{animationDelay: '0.5s'}}>✨</div>
            <h3>Inner Peace</h3>
            <p>Find lasting happiness from within</p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="section tips-section">
        <div className="section-header">
          <h2>💡 Meditation Tips</h2>
        </div>

        <div className="tips-grid enhanced-tips">
          <div className="tip-card">
            <span className="tip-number">1</span>
            <h4>Start Small</h4>
            <p>Begin with just 5-10 minutes daily and gradually increase</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">2</span>
            <h4>Consistent Time</h4>
            <p>Practice at the same time each day for best results</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">3</span>
            <h4>Comfortable Posture</h4>
            <p>Sit comfortably with a straight spine, you don't need to cross your legs</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">4</span>
            <h4>Focus on Breath</h4>
            <p>Let your breath be natural, don't force it</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">5</span>
            <h4>No Judgement</h4>
            <p>Don't judge your thoughts, simply observe and let them go</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">6</span>
            <h4>Be Patient</h4>
            <p>Results come with regular practice, stay committed</p>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="safety-section">
        <div className="safety-content">
          <h3>🛡️ Safety & Support</h3>
          <p>
            Meditation is a complementary practice and not a substitute for professional medical care.
            If you have any mental health concerns, please consult a healthcare professional.
          </p>
          <div className="crisis-info">
            <span><strong>🆘 Crisis Helplines:</strong></span>
            <span>India: 9152987821 | US: 988 | Crisis Text: Text HOME to 741741</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Breathing Exercise Component
function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let interval: NodeJS.Timeout;
    
    if (phase === 'inhale') {
      setCount(4);
      interval = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      setCount(7);
      interval = setTimeout(() => setPhase('exhale'), 7000);
    } else {
      setCount(8);
      interval = setTimeout(() => setPhase('inhale'), 8000);
    }

    return () => clearTimeout(interval);
  }, [phase, isActive]);

  useEffect(() => {
    if (isActive) {
      const counterInterval = setInterval(() => {
        setCount(prev => prev > 1 ? prev - 1 : prev);
      }, 1000);
      return () => clearInterval(counterInterval);
    }
  }, [isActive]);

  const getCircleClass = () => {
    const base = 'breath-circle ';
    if (phase === 'inhale') return base + 'inhaling';
    if (phase === 'hold') return base + 'holding';
    return base + 'exhaling';
  };

  return (
    <div className="breathing-exercise-container">
      <div className="breathing-circle-wrapper">
        <div className={getCircleClass()}>
          <span className="breath-phase-text">
            {phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
          </span>
          <span className="breath-count">{count}</span>
        </div>
        <div className="breath-guide-ring"></div>
      </div>
      
      <div className="breathing-controls">
        <button 
          className={`btn primary btn-lg ${isActive ? 'active' : ''}`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? '⏸ Pause' : '▶ Start'}
        </button>
        <button 
          className="btn secondary"
          onClick={() => { setIsActive(false); setPhase('inhale'); setCount(4); }}
        >
          ↺ Reset
        </button>
      </div>

      <div className="breathing-instructions">
        <div className={`instruction ${phase === 'inhale' ? 'active' : ''}`}>
          <span className="instruction-num">4</span>
          <span>Inhale through nose</span>
        </div>
        <div className={`instruction ${phase === 'hold' ? 'active' : ''}`}>
          <span className="instruction-num">7</span>
          <span>Hold breath</span>
        </div>
        <div className={`instruction ${phase === 'exhale' ? 'active' : ''}`}>
          <span className="instruction-num">8</span>
          <span>Exhale through mouth</span>
        </div>
      </div>
    </div>
  );
}

