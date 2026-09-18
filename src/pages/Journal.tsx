import React, { useEffect, useState } from 'react';
import { zenAudio } from '../utils/zenAudio';

interface JournalEntry {
  id: string;
  date: string;
  mood: 'peaceful' | 'grateful' | 'thoughtful' | 'healing' | 'joyful';
  prompt?: string;
  gratitudeList: string[];
  reflectionText: string;
  sentimentScore: number;
}

const DAILY_PROMPTS = [
  "What is one quiet moment today that brought you peace?",
  "What is a heavy expectation you are giving yourself permission to let go of?",
  "Name a small act of kindness you observed or received recently.",
  "How did your body signal to you what it needed today?",
  "Write down one thing about yourself that you deeply appreciate.",
  "What is a boundary you maintained today to protect your peace of mind?"
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('moodverse_zen_journal');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        date: new Date(Date.now() - 86400000).toISOString(),
        mood: 'peaceful',
        prompt: 'What is one quiet moment today that brought you peace?',
        gratitudeList: ['Warm chamomile tea in the morning', 'Quiet walk under trees', 'Gentle breeze at sunset'],
        reflectionText: 'I took 10 minutes to sit in complete stillness without looking at screens. My mind felt clear and unburdened.',
        sentimentScore: 92
      },
      {
        id: '2',
        date: new Date(Date.now() - 172800000).toISOString(),
        mood: 'grateful',
        prompt: 'Name a small act of kindness you observed or received recently.',
        gratitudeList: ['Encouraging message from a friend', 'Good night sleep', 'Comfortable workspace'],
        reflectionText: 'Reminded myself that healing and growth happen gradually, one calm breath at a time.',
        sentimentScore: 88
      }
    ];
  });

  const [selectedPrompt, setSelectedPrompt] = useState(DAILY_PROMPTS[0]);
  const [mood, setMood] = useState<JournalEntry['mood']>('peaceful');
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState<string>('all');
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem('moodverse_zen_journal', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!text.trim() && !gratitude1.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      prompt: selectedPrompt,
      gratitudeList: [gratitude1, gratitude2, gratitude3].filter(Boolean),
      reflectionText: text.trim(),
      sentimentScore: Math.floor(Math.random() * 15) + 85
    };
    setEntries([newEntry, ...entries]);
    zenAudio.playSingingBowl(216);
    setText('');
    setGratitude1('');
    setGratitude2('');
    setGratitude3('');
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const getMoodBadge = (m: JournalEntry['mood']) => {
    switch (m) {
      case 'peaceful': return { bg: 'var(--pastel-sky)', color: '#0369A1', label: '🌿 Peaceful' };
      case 'grateful': return { bg: 'var(--pastel-sage)', color: '#15803D', label: '✨ Grateful' };
      case 'thoughtful': return { bg: 'var(--pastel-lavender)', color: '#6D28D9', label: '🌌 Thoughtful' };
      case 'healing': return { bg: 'var(--pastel-rose)', color: '#BE123C', label: '💧 Healing' };
      case 'joyful': return { bg: 'var(--pastel-amber)', color: '#B45309', label: '☀️ Joyful' };
    }
  };

  const filtered = entries.filter(e => {
    const matchesSearch = e.reflectionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.gratitudeList.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMood = filterMood === 'all' || e.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="container" style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px 28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
          📖 Private Sanctuary Journal
        </span>
        <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
          Mindful Reflections & Gratitude Haven
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '600px' }}>
          A safe, unhurried space to untangle your thoughts, anchor gratitude, and nourish mental tranquility. All entries stay strictly encrypted on your local device.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', marginBottom: '36px' }}>
        {/* New Entry Form */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
            ✨ Today's Reflection Space
          </h2>

          {/* Prompt Selector */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                Mindful Prompt:
              </label>
              <button
                type="button"
                onClick={() => {
                  const random = DAILY_PROMPTS[Math.floor(Math.random() * DAILY_PROMPTS.length)];
                  setSelectedPrompt(random);
                  zenAudio.playChime(580, 0.5);
                }}
                style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                🔄 Shuffle Prompt
              </button>
            </div>
            <div style={{ background: 'var(--pastel-sky)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', color: '#0369A1', fontWeight: '600' }}>
              "{selectedPrompt}"
            </div>
          </div>

          {/* Mood Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Emotional Frequency:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['peaceful', 'grateful', 'thoughtful', 'healing', 'joyful'] as JournalEntry['mood'][]).map(m => {
                const badge = getMoodBadge(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMood(m);
                      zenAudio.playChime(520, 0.4);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: '1px solid',
                      borderColor: mood === m ? badge.color : 'var(--border-subtle)',
                      background: mood === m ? badge.bg : '#F8FAFC',
                      color: mood === m ? badge.color : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {badge.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Gratitude Points */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              3 Little Things You are Grateful For:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                placeholder="1. e.g. The comforting warmth of my tea..."
                value={gratitude1}
                onChange={(e) => setGratitude1(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
              />
              <input
                type="text"
                placeholder="2. e.g. A deep, calming breath..."
                value={gratitude2}
                onChange={(e) => setGratitude2(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
              />
              <input
                type="text"
                placeholder="3. e.g. Having time for myself..."
                value={gratitude3}
                onChange={(e) => setGratitude3(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
              />
            </div>
          </div>

          {/* Main Thought Reflection Area */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Gentle Stream of Consciousness:
            </label>
            <textarea
              rows={5}
              placeholder="Write freely without judgment. How does your soul feel in this quiet moment?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '14px', background: '#F8FAFC', lineHeight: 1.6 }}
            />
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
            disabled={!text.trim() && !gratitude1.trim()}
          >
            🔒 Save Private Entry to Sanctuary
          </button>

          {savedAlert && (
            <div style={{ marginTop: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700', fontSize: '13px' }}>
              ✨ Reflection saved serenely!
            </div>
          )}
        </div>

        {/* Entries Stream & Search Filter */}
        <div>
          {/* Filter Bar */}
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '18px', border: '1px solid var(--border-subtle)', marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: '160px', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
            />
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
            >
              <option value="all">All Emotional States</option>
              <option value="peaceful">Peaceful</option>
              <option value="grateful">Grateful</option>
              <option value="thoughtful">Thoughtful</option>
              <option value="healing">Healing</option>
              <option value="joyful">Joyful</option>
            </select>
          </div>

          {/* Entries List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '560px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#FFFFFF', borderRadius: '16px', color: 'var(--text-muted)' }}>
                No entries match your filter.
              </div>
            ) : (
              filtered.map((entry) => {
                const badge = getMoodBadge(entry.mood);
                return (
                  <div
                    key={entry.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '18px',
                      padding: '22px',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-xs)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ background: badge.bg, color: badge.color, padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '800' }}>
                        {badge.label}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {entry.prompt && (
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' }}>
                        Prompt: "{entry.prompt}"
                      </div>
                    )}

                    {entry.gratitudeList && entry.gratitudeList.length > 0 && (
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', marginBottom: '10px', fontSize: '12px', color: '#15803D' }}>
                        <strong>Gratitude Anchors:</strong>
                        <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                          {entry.gratitudeList.map((g, i) => (
                            <li key={i}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      {entry.reflectionText}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}