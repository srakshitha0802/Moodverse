import React, { useState, useEffect } from 'react';
import { zenAudio } from '../utils/zenAudio';

interface SoundLayer {
  id: string;
  name: string;
  icon: string;
  category: 'nature' | 'frequency' | 'instrument';
  volume: number;
  active: boolean;
  type: '432hz' | 'rain' | 'ocean' | 'bowls';
}

const CURATED_PLAYLISTS = [
  {
    title: 'Peaceful Piano & Strings',
    category: 'Meditation',
    embed: 'https://www.youtube.com/embed/2OEL4P1Rz04',
    desc: 'Gentle classical piano compositions designed to soothe sympathetic nervous activation.'
  },
  {
    title: 'Deep Ambient Ocean Waves',
    category: 'Sleep & Rest',
    embed: 'https://www.youtube.com/embed/lE6vYIf5dCI',
    desc: 'Continuous ocean swell recordings with binaural delta frequencies for restorative sleep.'
  },
  {
    title: 'Tibetan 7 Chakra Bowls',
    category: 'Deep Healing',
    embed: 'https://www.youtube.com/embed/Y6qA7d2g9cM',
    desc: 'Resonant bronze singing bowls aligned with restorative harmonic solfeggio overtones.'
  },
  {
    title: '432Hz Miracle Forest Zen',
    category: 'Anxiety Relief',
    embed: 'https://www.youtube.com/embed/1ZYbU82GVz4',
    desc: 'Subtle woodland streams mixed with 432Hz alpha waves for deep focus and calmness.'
  }
];

export default function Music() {
  const [layers, setLayers] = useState<SoundLayer[]>([
    { id: '1', name: '432Hz Alpha Drone', icon: '🎵', category: 'frequency', volume: 60, active: false, type: '432hz' },
    { id: '2', name: 'Gentle Rain on Leaves', icon: '🌧️', category: 'nature', volume: 50, active: false, type: 'rain' },
    { id: '3', name: 'Ocean Tide & Mist', icon: '🌊', category: 'nature', volume: 50, active: false, type: 'ocean' },
    { id: '4', name: 'Tibetan Singing Bowls', icon: '🥣', category: 'instrument', volume: 40, active: false, type: 'bowls' }
  ]);

  const [activeFrequency, setActiveFrequency] = useState<number | null>(432);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  // Sleep Timer countdown
  useEffect(() => {
    let interval: any;
    if (secondsRemaining && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(s => {
          if (s && s <= 1) {
            zenAudio.stopAmbient();
            setLayers(prev => prev.map(l => ({ ...l, active: false })));
            return null;
          }
          return s ? s - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(l => {
      if (l.id === id) {
        const nextActive = !l.active;
        if (nextActive) {
          zenAudio.startAmbient(l.type, l.volume / 100);
        } else {
          zenAudio.stopAmbient();
        }
        return { ...l, active: nextActive };
      }
      return { ...l, active: false }; // Single ambient generator at a time
    }));
  };

  const handleVolumeChange = (id: string, vol: number) => {
    setLayers(prev => prev.map(l => {
      if (l.id === id) {
        if (l.active) {
          zenAudio.setAmbientVolume(vol / 100);
        }
        return { ...l, volume: vol };
      }
      return l;
    }));
  };

  const playFrequencyChime = (freq: number) => {
    setActiveFrequency(freq);
    zenAudio.playChime(freq, 4.0);
  };

  const startTimer = (mins: number) => {
    setTimerMinutes(mins);
    setSecondsRemaining(mins * 60);
    zenAudio.playChime(528, 1.2);
  };

  return (
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #6366F1 50%, #8B5CF6 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px 28px',
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
            🎧 Binaural & Ambient Acoustics
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
            Soundscape & Frequency Sanctuary
          </h1>
          <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '600px' }}>
            Scientifically curated Solfeggio frequencies and procedural ambient acoustics engineered to slow brain waves into alpha and theta relaxation states.
          </p>
        </div>

        {/* Timer Box */}
        <div style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', padding: '14px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
            ⏱️ Zen Sleep & Meditation Timer
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[10, 20, 30, 45].map(m => (
              <button
                key={m}
                onClick={() => startTimer(m)}
                style={{
                  background: timerMinutes === m && secondsRemaining ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                  color: timerMinutes === m && secondsRemaining ? '#4F46E5' : '#FFFFFF',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {m}m
              </button>
            ))}
          </div>
          {secondsRemaining && (
            <div style={{ fontSize: '12px', marginTop: '6px', fontWeight: '800', color: '#A7F3D0' }}>
              Auto-fade in: {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </div>

      {/* Solfeggio Resonant Frequencies Bar */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
          ✨ Solfeggio Healing Frequency Resonators
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          Click any tone below to strike a synthesized pure harmonic crystal resonance:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { freq: 432, name: '432 Hz', desc: 'Cellular Calm & Miracle Nature' },
            { freq: 528, name: '528 Hz', desc: 'Heart Harmony & DNA Clarity' },
            { freq: 639, name: '639 Hz', desc: 'Empathy & Connection' },
            { freq: 741, name: '741 Hz', desc: 'Intuition & Cleanse' },
            { freq: 852, name: '852 Hz', desc: 'Spiritual Order & Flow' },
            { freq: 963, name: '963 Hz', desc: 'Pure Oneness & Light' }
          ].map(f => (
            <button
              key={f.freq}
              onClick={() => playFrequencyChime(f.freq)}
              style={{
                background: activeFrequency === f.freq ? 'var(--pastel-sky)' : '#F8FAFC',
                border: '1px solid',
                borderColor: activeFrequency === f.freq ? 'var(--brand-primary)' : 'var(--border-subtle)',
                borderRadius: '14px',
                padding: '14px 10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#0284C7' }}>{f.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Ambient Soundscapes Layer Panel */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '26px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
          🌿 Ambient Multi-Layer Generator
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Toggle procedural soothing soundscapes synthesized directly in your browser without loading heavy files:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {layers.map(layer => (
            <div
              key={layer.id}
              style={{
                background: layer.active ? 'var(--pastel-sky)' : '#F8FAFC',
                border: '1px solid',
                borderColor: layer.active ? 'var(--brand-primary)' : 'var(--border-subtle)',
                borderRadius: '16px',
                padding: '18px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{layer.icon}</span>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{layer.name}</span>
                </div>
                <button
                  onClick={() => toggleLayer(layer.id)}
                  style={{
                    background: layer.active ? 'var(--brand-primary)' : '#E2E8F0',
                    color: layer.active ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {layer.active ? 'Playing 🔊' : 'Play ▶️'}
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Volume</span>
                  <span>{layer.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={layer.volume}
                  onChange={(e) => handleVolumeChange(layer.id, Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curated YouTube Meditations */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
          📻 Curated Meditative Sound Streams
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {CURATED_PLAYLISTS.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ height: '200px' }}>
                <iframe
                  title={item.title}
                  src={item.embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#0369A1', background: 'var(--pastel-sky)', padding: '2px 8px', borderRadius: '10px' }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}