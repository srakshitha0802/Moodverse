import React, { useState } from 'react';
import BreathingVisualizer from '../components/BreathingVisualizer';
import BubblePop from '../components/BubblePop';
import CalmTap from '../components/CalmTap';
import ColorMatch from '../components/ColorMatch';

const BubblePopRelaxing = () => {
  const [bubbles, setBubbles] = useState<{id: number; x: number; y: number; size: number; color: string}[]>([]);
  const [score, setScore] = useState(0);

  const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#06b6d4'];

  const addBubble = () => {
    const id = Date.now();
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 60 + 20;
    const size = Math.random() * 40 + 30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    setBubbles(prev => [...prev, { id, x, y, size, color }]);
  };

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 10);
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)',
      borderRadius: '16px',
      padding: '20px',
      minHeight: '320px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#374151' }}>🫧 Relaxing Bubbles</div>
        <div style={{ backgroundColor: '#6BD3C7', color: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '13px', fontWeight: '600' }}>Score: {score}</div>
      </div>

      <div style={{ position: 'relative', height: '200px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px', overflow: 'hidden' }}>
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, white, ${bubble.color})`,
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              fontSize: `${bubble.size * 0.4}px`
            }}
          />
        ))}
        {bubbles.length === 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '28px' }}>🫧</div>
            <div style={{ fontSize: '13px' }}>Click button to add bubbles!</div>
          </div>
        )}
      </div>

      <button onClick={addBubble} style={{ marginTop: '12px', width: '100%', padding: '10px', background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
        ✨ Add Bubbles
      </button>
    </div>
  );
};

const PeacefulGarden = () => {
  const [flowers, setFlowers] = useState<{id: number; x: number; y: number; emoji: string}[]>([
    { id: 1, x: 25, y: 65, emoji: '🌸' },
    { id: 2, x: 55, y: 75, emoji: '🌺' },
    { id: 3, x: 75, y: 60, emoji: '🌻' },
  ]);

  const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🪻'];

  const plantFlower = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    setFlowers(prev => [...prev, { id: Date.now(), x, y, emoji }]);
  };

  return (
    <div onClick={plantFlower} style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 60%, #7CB342 100%)', borderRadius: '16px', padding: '20px', minHeight: '320px', cursor: 'pointer', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>🌱 Click to plant!</div>
      {flowers.map(flower => (
        <div key={flower.id} style={{ position: 'absolute', left: `${flower.x}%`, top: `${flower.y}%`, fontSize: '28px', transform: 'translate(-50%, -50%)' }}>{flower.emoji}</div>
      ))}
    </div>
  );
};

const CalmPiano = () => {
  const keys = [
    { note: 'C', color: '#fca5a5' },
    { note: 'D', color: '#fdba74' },
    { note: 'E', color: '#fcd34d' },
    { note: 'F', color: '#86efac' },
    { note: 'G', color: '#6ee7b7' },
    { note: 'A', color: '#93c5fd' },
    { note: 'B', color: '#c4b5fd' },
  ];

  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [noteHeights, setNoteHeights] = useState<{[key: string]: number}>({});

  const playNote = (note: string) => {
    setPlayedNotes(prev => [...prev.slice(-5), note]);
    // Generate a stable height for each note
    if (!noteHeights[note]) {
      setNoteHeights(prev => ({
        ...prev,
        [note]: 25 + Math.random() * 35
      }));
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '16px', padding: '20px', minHeight: '320px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#92400e' }}>🎹 Calm Piano</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '16px' }}>
        {keys.map(key => (
          <button key={key.note} onClick={() => playNote(key.note)} style={{ width: '35px', height: '100px', background: `linear-gradient(180deg, white 0%, ${key.color} 100%)`, border: '2px solid #d97706', borderRadius: '0 0 6px 6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#78350f' }}>{key.note}</button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '50px', gap: '3px' }}>
        {playedNotes.map((n, i) => (
          <div key={`${n}-${i}`} style={{ width: '18px', height: `${noteHeights[n] || 30}px`, background: keys.find(k => k.note === n)?.color || '#ccc', borderRadius: '3px 3px 0 0' }} />
        ))}
      </div>
    </div>
  );
};

const MindfulMandalas = () => {
  const [shapes, setShapes] = useState<{id: number; x: number; y: number; color: string; size: number}[]>([]);
  const colors = ['#f472b6', '#c084fc', '#60a5fa', '#34d399', '#fbbf24', '#fb7185'];

  const addShape = () => {
    const newShape = { id: Date.now(), x: Math.random() * 70 + 15, y: Math.random() * 70 + 15, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 25 + 15 };
    setShapes(prev => [...prev, newShape]);
  };

  const clearShapes = () => setShapes([]);

  return (
    <div style={{ background: '#fafafa', borderRadius: '16px', padding: '20px', minHeight: '320px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#374151' }}>🎨 Mandalas</div>
        <button onClick={clearShapes} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', cursor: 'pointer' }}>Clear</button>
      </div>
      <div onClick={addShape} style={{ position: 'relative', height: '200px', background: 'white', borderRadius: '10px', border: '2px dashed #d1d5db', cursor: 'pointer', overflow: 'hidden' }}>
        {shapes.map(shape => (
          <div key={shape.id} style={{ position: 'absolute', left: `${shape.x}%`, top: `${shape.y}%`, width: `${shape.size}px`, height: `${shape.size}px`, borderRadius: '50%', background: shape.color, opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
        ))}
        {shapes.length === 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#9ca3af' }}>
            <div style={{ fontSize: '28px' }}>🎨</div>
            <div style={{ fontSize: '13px' }}>Click to create!</div>
          </div>
        )}
      </div>
    </div>
  );
};

const GratitudeJournal = () => {
  const [entries, setEntries] = useState<string[]>(["Grateful for today ☀️", "Thankful for friends 💚"]);
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries(prev => [newEntry, ...prev]);
      setNewEntry('');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', borderRadius: '16px', padding: '20px', minHeight: '320px' }}>
      <div style={{ fontSize: '15px', fontWeight: '600', color: '#9d174d', marginBottom: '12px' }}>📔 Gratitude</div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input type="text" value={newEntry} onChange={(e) => setNewEntry(e.target.value)} placeholder="What are you grateful for?" style={{ flex: 1, padding: '8px 12px', border: '2px solid #f9a8d4', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
        <button onClick={addEntry} style={{ background: '#db2777', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Add</button>
      </div>
      <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {entries.map((entry, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.8)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#9d174d' }}>💫 {entry}</div>
        ))}
      </div>
    </div>
  );
};

export default function Games(){
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '28px', background: 'linear-gradient(135deg, #6BD3C7 0%, #0ea5e9 100%)', color: 'white', padding: '28px 16px', borderRadius: '16px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎮</div>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Mini Games & Activities</h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Simple calming games for mental wellbeing</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🫁 Breathing Exercise</h3>
          <div className="card card-md"><BreathingVisualizer /></div>
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🫧 Bubble Pop</h3>
          <div className="card card-md"><BubblePop /></div>
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>👆 Calm Tap</h3>
          <CalmTap />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🎨 Color Match</h3>
          <ColorMatch />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🫧 Relaxing Bubbles</h3>
          <BubblePopRelaxing />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🌱 Peaceful Garden</h3>
          <PeacefulGarden />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🎹 Calm Piano</h3>
          <CalmPiano />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>🎨 Mindful Mandalas</h3>
          <MindfulMandalas />
        </div>
        <div>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>📔 Gratitude Journal</h3>
          <GratitudeJournal />
        </div>
      </div>
    </div>
  )
}
