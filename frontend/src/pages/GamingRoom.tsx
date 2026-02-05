import React, { useState, useEffect } from 'react';

interface Game {
  id: string;
  name: string;
  description: string;
  category: 'puzzle' | 'mindfulness' | 'breathing' | 'memory' | 'relaxation';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  instructions: string[];
  icon: string;
  color: string;
}

const RELAXING_GAMES: Game[] = [
  {
    id: 'breathing-bubble',
    name: '🫧 Breathing Bubble',
    description: 'Follow the expanding and contracting bubble to practice mindful breathing',
    category: 'breathing',
    difficulty: 'easy',
    duration: '2-5 minutes',
    instructions: [
      'Watch the bubble expand and contract',
      'Breathe in as the bubble grows',
      'Breathe out as the bubble shrinks',
      'Follow the rhythm for deep relaxation'
    ],
    icon: '🫧',
    color: '#60a5fa'
  },
  {
    id: 'color-therapy',
    name: '🎨 Color Harmony',
    description: 'Create beautiful color combinations to reduce stress and anxiety',
    category: 'relaxation',
    difficulty: 'easy',
    duration: '5-15 minutes',
    instructions: [
      'Click on colors to paint the canvas',
      'Experiment with different combinations',
      'Focus on calming color transitions',
      'Enjoy the peaceful creative process'
    ],
    icon: '🎨',
    color: '#a78bfa'
  },
  {
    id: 'memory-garden',
    name: '🌸 Memory Garden',
    description: 'Match flower pairs in this soothing memory game',
    category: 'memory',
    difficulty: 'medium',
    duration: '3-10 minutes',
    instructions: [
      'Click on cards to reveal flowers',
      'Find matching pairs',
      'Completed pairs bloom into the garden',
      'Complete the entire garden to win'
    ],
    icon: '🌸',
    color: '#f472b6'
  },
  {
    id: 'zen-puzzle',
    name: '🧩 Zen Puzzle',
    description: 'Solve gentle puzzles while practicing mindfulness',
    category: 'puzzle',
    difficulty: 'medium',
    duration: '5-20 minutes',
    instructions: [
      'Arrange pieces to create peaceful images',
      'Take your time and enjoy the process',
      'Focus on each piece mindfully',
      'Celebrate the completion'
    ],
    icon: '🧩',
    color: '#34d399'
  },
  {
    id: 'star-constellation',
    name: '⭐ Star Constellation',
    description: 'Connect stars to create beautiful constellations',
    category: 'mindfulness',
    difficulty: 'easy',
    duration: '3-8 minutes',
    instructions: [
      'Click on stars to connect them',
      'Create patterns and shapes',
      'Watch the constellation come to life',
      'Meditate on the beauty you create'
    ],
    icon: '⭐',
    color: '#fbbf24'
  },
  {
    id: 'wave-meditation',
    name: '🌊 Wave Meditation',
    description: 'Watch gentle waves and synchronize your breathing',
    category: 'mindfulness',
    difficulty: 'easy',
    duration: '5-15 minutes',
    instructions: [
      'Observe the gentle wave motion',
      'Breathe in as waves rise',
      'Breathe out as waves fall',
      'Let the rhythm calm your mind'
    ],
    icon: '🌊',
    color: '#06b6d4'
  }
];

export default function GamingRoom() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentScore, setCurrentScore] = useState(0);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');

  const categories = ['all', 'breathing', 'relaxation', 'memory', 'puzzle', 'mindfulness'];
  
  const filteredGames = selectedCategory === 'all' 
    ? RELAXING_GAMES 
    : RELAXING_GAMES.filter(game => game.category === selectedCategory);

  // Simple breathing game implementation
  const BreathingBubble = () => {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [size, setSize] = useState(50);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setPhase(prev => {
          if (prev === 'inhale') {
            setSize(120);
            return 'hold';
          } else if (prev === 'hold') {
            return 'exhale';
          } else {
            setSize(50);
            return 'inhale';
          }
        });
      }, 4000);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
        borderRadius: '20px',
        padding: '40px'
      }}>
        <div style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${selectedGame?.color}40 0%, ${selectedGame?.color}20 100%)`,
          border: `3px solid ${selectedGame?.color}`,
          transition: 'all 4s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {phase === 'inhale' ? '🫁' : phase === 'hold' ? '⏸️' : '💨'}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
            {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Follow the bubble's rhythm
          </div>
        </div>
      </div>
    );
  };

  // Simple color therapy game
  const ColorTherapy = () => {
    const [colors, setColors] = useState(['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#06b6d4']);
    const [canvas, setCanvas] = useState<string[][]>(Array(8).fill(null).map(() => Array(8).fill('')));
    
    const paint = (row: number, col: number) => {
      const newCanvas = [...canvas];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newCanvas[row][col] = randomColor;
      setCanvas(newCanvas);
    };
    
    return (
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            Paint your canvas with calming colors
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '2px solid #e5e7eb'
                }}
              />
            ))}
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(8, 1fr)', 
          gap: '4px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          {canvas.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => paint(rowIndex, colIndex)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  backgroundColor: cell || '#f9fafb',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!cell) e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseOut={(e) => {
                  if (!cell) e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  const startGame = (game: Game) => {
    setSelectedGame(game);
    setGameState('playing');
    setCurrentScore(0);
  };

  const backToMenu = () => {
    setGameState('menu');
    setSelectedGame(null);
    setCurrentScore(0);
  };

  const completeGame = () => {
    setGameState('completed');
    setCurrentScore(currentScore + 1);
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎮</div>
        <h1 style={{ fontSize: '36px', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          Relaxing Gaming Room
        </h1>
        <p style={{ fontSize: '18px', margin: '0 auto', opacity: 0.9, maxWidth: '600px' }}>
          Play calming games designed to reduce stress and promote mindfulness
        </p>
      </div>

      {gameState === 'menu' && (
        <>
          {/* Category Filter */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1f2937' }}>
              Choose Your Relaxation Game
            </h2>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? '#f59e0b' : '#f3f4f6',
                    color: selectedCategory === category ? 'white' : '#374151',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                >
                  {category === 'all' ? '🎯 All Games' : 
                   category === 'breathing' ? '🫁 Breathing' :
                   category === 'relaxation' ? '🎨 Relaxation' :
                   category === 'memory' ? '🧠 Memory' :
                   category === 'puzzle' ? '🧩 Puzzles' :
                   '🧘 Mindfulness'}
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {filteredGames.map((game) => (
              <div 
                key={game.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = game.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ 
                  backgroundColor: game.color, 
                  padding: '30px', 
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                    {game.icon}
                  </div>
                  <h3 style={{ margin: '0', fontSize: '20px' }}>
                    {game.name}
                  </h3>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <p style={{ margin: '0 0 16px 0', color: '#6b7280', lineHeight: '1.5' }}>
                    {game.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      ⏱️ {game.duration}
                    </div>
                    <div style={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      📊 {game.difficulty}
                    </div>
                  </div>

                  <button
                    onClick={() => startGame(game)}
                    style={{
                      width: '100%',
                      backgroundColor: game.color,
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    🎮 Start Playing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {gameState === 'playing' && selectedGame && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#1f2937' }}>
              {selectedGame.icon} {selectedGame.name}
            </h2>
            <button
              onClick={backToMenu}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              ❌ Exit Game
            </button>
          </div>

          {/* Game Instructions */}
          <div style={{
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c4a6e' }}>
              📋 How to Play
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e' }}>
              {selectedGame.instructions.map((instruction, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Game Component */}
          <div style={{ marginBottom: '20px' }}>
            {selectedGame.id === 'breathing-bubble' && <BreathingBubble />}
            {selectedGame.id === 'color-therapy' && <ColorTherapy />}
            {selectedGame.id === 'memory-garden' && (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                backgroundColor: '#f0fdf4',
                borderRadius: '20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
                <h3 style={{ margin: '0 0 12px 0', color: '#15803d' }}>
                  Memory Garden Coming Soon
                </h3>
                <p style={{ margin: 0, color: '#15803d' }}>
                  This peaceful matching game will be available soon!
                </p>
              </div>
            )}
            {selectedGame.id === 'zen-puzzle' && (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                backgroundColor: '#f0fdf4',
                borderRadius: '20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧩</div>
                <h3 style={{ margin: '0 0 12px 0', color: '#15803d' }}>
                  Zen Puzzle Coming Soon
                </h3>
                <p style={{ margin: 0, color: '#15803d' }}>
                  This mindful puzzle experience will be available soon!
                </p>
              </div>
            )}
            {selectedGame.id === 'star-constellation' && (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                backgroundColor: '#f0fdf4',
                borderRadius: '20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
                <h3 style={{ margin: '0 0 12px 0', color: '#15803d' }}>
                  Star Constellation Coming Soon
                </h3>
                <p style={{ margin: 0, color: '#15803d' }}>
                  This contemplative star game will be available soon!
                </p>
              </div>
            )}
            {selectedGame.id === 'wave-meditation' && (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                backgroundColor: '#f0fdf4',
                borderRadius: '20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌊</div>
                <h3 style={{ margin: '0 0 12px 0', color: '#15803d' }}>
                  Wave Meditation Coming Soon
                </h3>
                <p style={{ margin: 0, color: '#15803d' }}>
                  This wave breathing experience will be available soon!
                </p>
              </div>
            )}
          </div>

          {/* Game Controls */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={completeGame}
              style={{
                backgroundColor: selectedGame.color,
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ✅ Complete Session
            </button>
          </div>
        </div>
      )}

      {gameState === 'completed' && selectedGame && (
        <div style={{
          textAlign: 'center',
          backgroundColor: '#f0fdf4',
          borderRadius: '20px',
          padding: '40px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ margin: '0 0 12px 0', color: '#15803d' }}>
            Session Complete!
          </h2>
          <p style={{ margin: '0 0 20px 0', color: '#15803d' }}>
            Great job! You've completed {selectedGame.name}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setGameState('playing')}
              style={{
                backgroundColor: selectedGame.color,
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Play Again
            </button>
            <button
              onClick={backToMenu}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🏠 Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {gameState === 'menu' && (
        <div style={{
          backgroundColor: '#fef3c7',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #f59e0b'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#92400e' }}>
            🎯 Benefits of Relaxing Games
          </h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🧘‍♀️ Stress Relief</h4>
              <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
                Games help reduce cortisol levels and promote relaxation.
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🧠 Mindfulness</h4>
              <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
                Focus on the present moment and improve concentration.
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>😊 Mood Enhancement</h4>
              <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
                Positive activities release endorphins and boost happiness.
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>⏰ Quick Breaks</h4>
              <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
                Perfect for short mental breaks during busy days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
