import React, { useState, useRef, useEffect } from 'react';
import BreathingVisualizer from '../components/BreathingVisualizer';
import BubblePop from '../components/BubblePop';
import CalmTap from '../components/CalmTap';
import ColorMatch from '../components/ColorMatch';
import { zenAudio } from '../utils/zenAudio';

// ============================================================================
// 1. ZEN SAND GARDEN RAKING CANVAS
// ============================================================================
const ZenSandGarden = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRaking, setIsRaking] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sand color base
    ctx.fillStyle = '#E8DFD0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle fine sand grain pattern
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(215, 203, 185, 0.4)' : 'rgba(245, 240, 230, 0.4)';
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Place 3 smooth Zen pebbles
    const stones = [
      { x: 80, y: 70, r: 24 },
      { x: 260, y: 130, r: 32 },
      { x: 170, y: 190, r: 20 }
    ];

    stones.forEach(s => {
      // Stone Shadow
      ctx.beginPath();
      ctx.arc(s.x + 3, s.y + 4, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fill();

      // Stone Body
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = '#4B5563';
      ctx.fill();

      // Stone Highlight
      ctx.beginPath();
      ctx.arc(s.x - s.r * 0.3, s.y - s.r * 0.3, s.r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();
    });
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIsRaking(true);
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    zenAudio.playChime(320, 0.4);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isRaking || !lastPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Draw rake lines (triple parallel groove)
    const offsets = [-8, 0, 8];
    offsets.forEach(off => {
      ctx.beginPath();
      ctx.moveTo(lastPos.x + off, lastPos.y + off);
      ctx.lineTo(currentX + off, currentY + off);
      ctx.strokeStyle = '#D1C4B0';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Highlight groove ridge
      ctx.beginPath();
      ctx.moveTo(lastPos.x + off - 1, lastPos.y + off - 1);
      ctx.lineTo(currentX + off - 1, currentY + off - 1);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    setLastPos({ x: currentX, y: currentY });
  };

  const handlePointerUp = () => {
    setIsRaking(false);
    setLastPos(null);
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
          🪨 Zen Sand Garden (Rake Waves)
        </div>
        <button
          onClick={initCanvas}
          style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
        >
          🧹 Smooth Sand
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={340}
        height={240}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ width: '100%', height: '220px', borderRadius: '12px', cursor: 'crosshair', touchAction: 'none' }}
      />
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
        Drag your cursor/finger across the sand to rake calming mindful grooves.
      </div>
    </div>
  );
};

// ============================================================================
// 2. TACTILE HARMONIC BUBBLE POPPER
// ============================================================================
const HarmonicBubblePop = () => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; color: string; freq: number }[]>([]);
  const [score, setScore] = useState(0);

  const bubblePenta = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  const colors = ['#38BDF8', '#818CF8', '#34D399', '#F472B6', '#FBBF24', '#2DD4BF'];

  const addBubble = () => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 60 + 20;
    const size = Math.random() * 30 + 35;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const freq = bubblePenta[Math.floor(Math.random() * bubblePenta.length)];
    setBubbles(prev => [...prev, { id, x, y, size, color, freq }]);
    zenAudio.playBubblePop(freq * 0.5);
  };

  const popBubble = (id: number, freq: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
    zenAudio.playBubblePop(freq);
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
          🫧 Harmonic Bubble Sanctuary
        </div>
        <span style={{ background: 'var(--pastel-sky)', color: '#0369A1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
          Popped: {score}
        </span>
      </div>

      <div style={{ position: 'relative', height: '220px', background: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)', borderRadius: '12px', overflow: 'hidden' }}>
        {bubbles.map(b => (
          <div
            key={b.id}
            onClick={() => popBubble(b.id, b.freq)}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), ${b.color})`,
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.1s ease',
              animation: 'floatBubble 3s ease-in-out infinite alternate'
            }}
          />
        ))}

        {bubbles.length === 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            🫧 Click "Spawn Bubbles" below to fill your space!
          </div>
        )}
      </div>

      <button
        onClick={addBubble}
        style={{
          marginTop: '12px',
          width: '100%',
          padding: '10px',
          background: 'var(--brand-primary)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '700',
          fontSize: '13px',
          cursor: 'pointer'
        }}
      >
        ✨ Spawn Floating Bubble
      </button>
    </div>
  );
};

// ============================================================================
// 3. PEACEFUL BLOOM GARDEN
// ============================================================================
const PeacefulGarden = () => {
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number; emoji: string }[]>([
    { id: 1, x: 25, y: 65, emoji: '🌸' },
    { id: 2, x: 55, y: 75, emoji: '🌺' },
    { id: 3, x: 75, y: 60, emoji: '🪷' }
  ]);

  const flowerEmojis = ['🌸', '🌺', '🪷', '🌻', '🌷', '🌹', '🌼', '🪻'];

  const plantFlower = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    setFlowers(prev => [...prev, { id: Date.now(), x, y, emoji }]);
    zenAudio.playWaterDrop();
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
          🌱 Mindful Meadow (Tap to Bloom)
        </div>
        <button
          onClick={() => setFlowers([])}
          style={{ background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
        >
          🧹 Clear Meadow
        </button>
      </div>

      <div
        onClick={plantFlower}
        style={{
          background: 'linear-gradient(180deg, #BAE6FD 0%, #BBF7D0 60%, #86EFAC 100%)',
          borderRadius: '12px',
          height: '220px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', color: '#15803D' }}>
          💧 Tap anywhere to plant soothing blooms
        </div>
        {flowers.map(flower => (
          <div
            key={flower.id}
            style={{
              position: 'absolute',
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              fontSize: '28px',
              transform: 'translate(-50%, -50%)',
              animation: 'scaleUp 0.3s ease'
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 4. RESONANT CALM PIANO / CHIME KEYS
// ============================================================================
const CalmPiano = () => {
  const keys = [
    { note: 'C', freq: 261.63, color: '#BAE6FD' },
    { note: 'D', freq: 293.66, color: '#C7D2FE' },
    { note: 'E', freq: 329.63, color: '#E9D5FF' },
    { note: 'F', freq: 349.23, color: '#FBCFE8' },
    { note: 'G', freq: 392.00, color: '#FED7AA' },
    { note: 'A', freq: 440.00, color: '#FEF08A' },
    { note: 'B', freq: 493.88, color: '#BBF7D0' },
    { note: 'C2', freq: 523.25, color: '#99F6E4' }
  ];

  const playNote = (freq: number) => {
    zenAudio.playChime(freq, 2.0);
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
        🎹 Crystal Resonance Keys
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', height: '160px', padding: '10px 0' }}>
        {keys.map(k => (
          <button
            key={k.note}
            onClick={() => playNote(k.freq)}
            style={{
              flex: 1,
              height: '100%',
              background: `linear-gradient(180deg, #FFFFFF 0%, ${k.color} 100%)`,
              border: '1px solid var(--border-subtle)',
              borderRadius: '0 0 10px 10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingBottom: '10px',
              alignItems: 'center',
              fontWeight: '800',
              fontSize: '13px',
              color: 'var(--text-primary)',
              transition: 'all 0.15s ease'
            }}
          >
            {k.note}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>
        Pure sine audio harmonics calibrated for therapeutic calmness.
      </div>
    </div>
  );
};

export default function Games() {
  return (
    <div className="container" style={{ maxWidth: 1140, margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0284C7 50%, #6366F1 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '34px 28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
          🎮 Mindful Sensory Play
        </span>
        <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
          Sensory Rest & Play Sanctuary
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '600px' }}>
          Low-stimulation, tactile minigames engineered to ease racing thoughts and provide restorative micro-breaks.
        </p>
      </div>

      {/* Grid of Minigames */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <ZenSandGarden />
        <HarmonicBubblePop />
        <PeacefulGarden />
        <CalmPiano />
        
        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>🫁 Guided Breathing Visualizer</h3>
          <BreathingVisualizer />
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>👆 Gentle Rhythm Tap</h3>
          <CalmTap />
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>🎨 Mindful Color Harmonizer</h3>
          <ColorMatch />
        </div>
      </div>
    </div>
  );
}
