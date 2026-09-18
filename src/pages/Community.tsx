import React, { useState } from 'react';
import Chatbot from '../components/Chatbot';
import { zenAudio } from '../utils/zenAudio';

interface CommunityPost {
  id: string;
  author: string;
  category: 'anxiety' | 'gratitude' | 'mindfulness' | 'burnout';
  text: string;
  timestamp: string;
  peaceCount: number;
  hugCount: number;
  breathCount: number;
  sparkleCount: number;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'SereneSoul_42',
    category: 'anxiety',
    text: 'To anyone feeling overwhelmed by tomorrow’s to-do list: Remember you only ever have to experience this single second right now. Take a deep, slow exhale. You are doing so much better than you think.',
    timestamp: '20 mins ago',
    peaceCount: 18,
    hugCount: 14,
    breathCount: 9,
    sparkleCount: 12
  },
  {
    id: 'p2',
    author: 'MindfulMeadow',
    category: 'gratitude',
    text: 'Grateful today for the sound of gentle morning rain and hot herbal tea. Sometimes the smallest moments hold the most profound tranquility.',
    timestamp: '1 hour ago',
    peaceCount: 24,
    hugCount: 8,
    breathCount: 15,
    sparkleCount: 20
  },
  {
    id: 'p3',
    author: 'CalmRivers',
    category: 'burnout',
    text: 'I used to feel guilty for resting. Today I chose to turn off notifications for 3 hours and walk barefoot in the grass. Rest is not a reward; it is an essential human right.',
    timestamp: '3 hours ago',
    peaceCount: 31,
    hugCount: 22,
    breathCount: 19,
    sparkleCount: 27
  },
  {
    id: 'p4',
    author: 'ZenTraveler',
    category: 'mindfulness',
    text: 'Did 15 minutes of 432Hz ambient breathing in the Moodverse VR beach room. My heart rate dropped from 94 to 68 bpm. Incredible how the nervous system responds when you give it permission to soften.',
    timestamp: '5 hours ago',
    peaceCount: 42,
    hugCount: 16,
    breathCount: 28,
    sparkleCount: 35
  }
];

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('moodverse_community_posts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_POSTS;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'anxiety' | 'gratitude' | 'mindfulness' | 'burnout'>('all');
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<CommunityPost['category']>('mindfulness');
  const [isPosting, setIsPosting] = useState(false);
  const [showAICompanion, setShowAICompanion] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: 'GentleGuest_' + Math.floor(Math.random() * 899 + 100),
      category: newPostCategory,
      text: newPostText.trim(),
      timestamp: 'Just now',
      peaceCount: 1,
      hugCount: 1,
      breathCount: 1,
      sparkleCount: 1
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('moodverse_community_posts', JSON.stringify(updated));
    zenAudio.playSingingBowl(288);
    setNewPostText('');
    setIsPosting(false);
  };

  const handleReact = (postId: string, reactionType: 'peace' | 'hug' | 'breath' | 'sparkle') => {
    zenAudio.playChime(600, 0.6);
    const updated = posts.map(p => {
      if (p.id === postId) {
        if (reactionType === 'peace') return { ...p, peaceCount: p.peaceCount + 1 };
        if (reactionType === 'hug') return { ...p, hugCount: p.hugCount + 1 };
        if (reactionType === 'breath') return { ...p, breathCount: p.breathCount + 1 };
        if (reactionType === 'sparkle') return { ...p, sparkleCount: p.sparkleCount + 1 };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem('moodverse_community_posts', JSON.stringify(updated));
  };

  const filteredPosts = activeTab === 'all'
    ? posts
    : posts.filter(p => p.category === activeTab);

  const getCategoryBadge = (cat: CommunityPost['category']) => {
    switch (cat) {
      case 'anxiety': return { bg: 'var(--pastel-sky)', color: '#0369A1', label: '🌿 Anxiety Support' };
      case 'gratitude': return { bg: 'var(--pastel-sage)', color: '#15803D', label: '✨ Gratitude' };
      case 'burnout': return { bg: 'var(--pastel-amber)', color: '#B45309', label: '🌅 Rest & Boundaries' };
      case 'mindfulness': return { bg: 'var(--pastel-lavender)', color: '#6D28D9', label: '🧘 Mindfulness' };
    }
  };

  return (
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #6366F1 0%, #0284C7 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px 28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
            🤝 Safe & Compassionate Circle
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
            Community Care Sanctuary
          </h1>
          <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '600px' }}>
            An anonymous peer haven where kindness is the only metric. Share reflections, send peaceful energies, or chat with our empathetic AI guide.
          </p>
        </div>

        <button
          onClick={() => setShowAICompanion(!showAICompanion)}
          style={{
            background: '#FFFFFF',
            color: '#4F46E5',
            fontWeight: '800',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '14px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {showAICompanion ? '👥 View Community Wall' : '🤖 Open AI Care Companion'}
        </button>
      </div>

      {showAICompanion ? (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>
            AI Emotional Support Guide
          </h2>
          <Chatbot />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Main Feed */}
          <div style={{ flex: 2 }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
              {[
                { id: 'all', label: 'All Reflections' },
                { id: 'anxiety', label: '🌿 Anxiety Support' },
                { id: 'gratitude', label: '✨ Gratitude' },
                { id: 'mindfulness', label: '🧘 Mindfulness' },
                { id: 'burnout', label: '🌅 Rest & Burnout' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    zenAudio.playChime(640, 0.4);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: '1px solid',
                    borderColor: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--border-subtle)',
                    background: activeTab === tab.id ? 'var(--brand-primary)' : '#FFFFFF',
                    color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posts Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPosts.map(post => {
                const badge = getCategoryBadge(post.category);
                return (
                  <div
                    key={post.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '24px',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: badge.bg, color: badge.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px' }}>
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{post.author}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.timestamp}</div>
                        </div>
                      </div>

                      <span style={{ background: badge.bg, color: badge.color, padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
                        {badge.label}
                      </span>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '18px' }}>
                      {post.text}
                    </p>

                    {/* Support Reactions */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handleReact(post.id, 'peace')}
                        className="btn"
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: '#0369A1' }}
                      >
                        🕊️ Send Peace ({post.peaceCount})
                      </button>
                      <button
                        onClick={() => handleReact(post.id, 'hug')}
                        className="btn"
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: '#BE123C' }}
                      >
                        🫂 Warm Hug ({post.hugCount})
                      </button>
                      <button
                        onClick={() => handleReact(post.id, 'breath')}
                        className="btn"
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: '#15803D' }}
                      >
                        🌬️ Deep Breath ({post.breathCount})
                      </button>
                      <button
                        onClick={() => handleReact(post.id, 'sparkle')}
                        className="btn"
                        style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: '#D97706' }}
                      >
                        ✨ Stay Strong ({post.sparkleCount})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Share Reflection & Guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Share Form */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
                💌 Share an Uplifting Reflection
              </h3>

              <form onSubmit={handleCreatePost}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Select Theme:
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as any)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
                  >
                    <option value="mindfulness">🧘 Mindfulness & Insight</option>
                    <option value="anxiety">🌿 Anxiety Support & Encouragement</option>
                    <option value="gratitude">✨ Small Gratitude Moment</option>
                    <option value="burnout">🌅 Rest & Gentle Boundaries</option>
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <textarea
                    rows={4}
                    placeholder="Write comforting words, a realization, or an honest reflection to encourage fellow sanctuary seekers..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC', lineHeight: 1.5 }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={!newPostText.trim()}
                >
                  🌱 Post to Community Circle
                </button>
              </form>
            </div>

            {/* Sanctuary Guidelines */}
            <div style={{ background: 'var(--pastel-sage)', borderRadius: '20px', padding: '22px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <h4 style={{ color: '#15803D', fontSize: '14px', fontWeight: '800', margin: '0 0 10px 0' }}>
                🕊️ Sanctuary Kindness Pledge
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#15803D', fontSize: '12px', lineHeight: 1.6 }}>
                <li>Speak with gentleness and respect.</li>
                <li>Zero toxicity, judgment, or advice unsolicited.</li>
                <li>Every person here is navigating their personal journey.</li>
                <li>In emergency crisis, please call <strong>988</strong> immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
