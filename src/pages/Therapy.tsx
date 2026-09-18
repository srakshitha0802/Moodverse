import React, { useState, useEffect } from 'react';
import VRSelector from '../components/VRSelector';
import { zenAudio } from '../utils/zenAudio';

export default function Therapy() {
  const [activeTab, setActiveTab] = useState<'grounding' | 'cbt' | 'pmr' | 'dissolver' | 'vr'>('grounding');

  // ==========================================
  // 1. 5-4-3-2-1 Grounding State
  // ==========================================
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState<string[][]>([
    ['', '', '', '', ''], // 5 see
    ['', '', '', ''],       // 4 touch
    ['', '', ''],           // 3 hear
    ['', ''],               // 2 smell
    ['']                    // 1 taste
  ]);

  const groundingConfig = [
    { count: 5, label: 'Things you can SEE', desc: 'Look around your space and notice 5 distinct objects, colors, or shapes.', color: '#0284C7', bg: 'var(--pastel-sky)' },
    { count: 4, label: 'Things you can TOUCH / FEEL', desc: 'Notice 4 physical textures (e.g. the fabric of your clothes, feet on the floor, cool air).', color: '#0D9488', bg: 'var(--pastel-sage)' },
    { count: 3, label: 'Things you can HEAR', desc: 'Listen carefully for 3 subtle sounds in your environment or distance.', color: '#6366F1', bg: 'var(--pastel-lavender)' },
    { count: 2, label: 'Things you can SMELL', desc: 'Notice 2 distinct scents around you, or recall 2 comforting soothing aromas.', color: '#D97706', bg: 'var(--pastel-amber)' },
    { count: 1, label: 'Thing you can TASTE or Savor', desc: 'Notice 1 taste in your mouth, or savor a mindful sip of cool water.', color: '#BE123C', bg: 'var(--pastel-rose)' },
  ];

  const handleGroundingInputChange = (index: number, val: string) => {
    const updated = [...groundingInputs];
    updated[groundingStep][index] = val;
    setGroundingInputs(updated);
  };

  const nextGroundingStep = () => {
    zenAudio.playChime(528 + groundingStep * 60, 1.8);
    if (groundingStep < groundingConfig.length - 1) {
      setGroundingStep(s => s + 1);
    } else {
      setGroundingStep(5); // Completed
    }
  };

  // ==========================================
  // 2. CBT Thought Reframer State
  // ==========================================
  const [cbtThought, setCbtThought] = useState('');
  const [cbtDistortion, setCbtDistortion] = useState('Catastrophizing');
  const [cbtEvidenceAgainst, setCbtEvidenceAgainst] = useState('');
  const [cbtReframed, setCbtReframed] = useState('');
  const [savedReframes, setSavedReframes] = useState<{ original: string; distortion: string; reframed: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('moodverse_cbt_reframes');
      return saved ? JSON.parse(saved) : [
        {
          original: "I have so much work, I am going to fail and let everyone down.",
          distortion: "Catastrophizing & Fortune Telling",
          reframed: "I have managed busy periods before. I will take this one single task at a time and do my best.",
          date: "Yesterday"
        }
      ];
    } catch {
      return [];
    }
  });

  const distortions = [
    { name: 'Catastrophizing', desc: 'Assuming the worst possible outcome will happen.' },
    { name: 'All-or-Nothing', desc: 'Thinking in black-and-white extremes with no middle ground.' },
    { name: 'Mind Reading', desc: 'Assuming you know what others negatively think about you.' },
    { name: 'Emotional Reasoning', desc: 'Believing that because you feel anxious, danger is guaranteed.' },
    { name: 'Should Statements', desc: 'Demanding unrealistic standards from yourself.' }
  ];

  const handleSaveReframe = () => {
    if (!cbtThought.trim() || !cbtReframed.trim()) return;
    const newEntry = {
      original: cbtThought,
      distortion: cbtDistortion,
      reframed: cbtReframed,
      date: new Date().toLocaleDateString()
    };
    const updated = [newEntry, ...savedReframes];
    setSavedReframes(updated);
    localStorage.setItem('moodverse_cbt_reframes', JSON.stringify(updated));
    zenAudio.playSingingBowl(288);
    setCbtThought('');
    setCbtEvidenceAgainst('');
    setCbtReframed('');
  };

  // ==========================================
  // 3. Progressive Muscle Relaxation (PMR)
  // ==========================================
  const pmrSteps = [
    { title: 'Forehead & Brow', instruction: 'Gently furrow your brow and squeeze your forehead muscles for 5 seconds... then release and feel all forehead tension melt away.', duration: 15 },
    { title: 'Jaw & Neck', instruction: 'Clench your jaw gently and tilt head back slightly... now relax your tongue, let your jaw drop loose, and breathe.', duration: 15 },
    { title: 'Shoulders & Chest', instruction: 'Lift your shoulders toward your ears. Hold the tightness... and drop them completely down like heavy warm water.', duration: 15 },
    { title: 'Hands & Arms', instruction: 'Clench both fists tightly, tense your biceps... now open your fingers wide and let your hands rest limp in your lap.', duration: 15 },
    { title: 'Stomach & Core', instruction: 'Tighten your abdominal muscles as if bracing... now let your belly expand soft and free with a deep breath.', duration: 15 },
    { title: 'Feet & Toes', instruction: 'Curl your toes and flex your calves tightly... then release all effort. Feel warmth radiating through your whole body.', duration: 15 }
  ];
  const [pmrIndex, setPmrIndex] = useState(0);
  const [pmrRunning, setPmrRunning] = useState(false);
  const [pmrSecsLeft, setPmrSecsLeft] = useState(15);

  useEffect(() => {
    let timer: any;
    if (pmrRunning) {
      timer = setInterval(() => {
        setPmrSecsLeft(s => {
          if (s <= 1) {
            zenAudio.playChime(432, 2.0);
            if (pmrIndex < pmrSteps.length - 1) {
              setPmrIndex(i => i + 1);
              return pmrSteps[pmrIndex + 1]?.duration || 15;
            } else {
              setPmrRunning(false);
              return 0;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [pmrRunning, pmrIndex]);

  // ==========================================
  // 4. Cosmic Stress Dissolver
  // ==========================================
  const [stressText, setStressText] = useState('');
  const [isDissolving, setIsDissolving] = useState(false);
  const [dissolvedCount, setDissolvedCount] = useState(0);

  const handleDissolveStress = () => {
    if (!stressText.trim()) return;
    setIsDissolving(true);
    zenAudio.playSingingBowl(216);
    setTimeout(() => {
      setStressText('');
      setIsDissolving(false);
      setDissolvedCount(c => c + 1);
      zenAudio.playChime(528, 2.5);
    }, 2800);
  };

  return (
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #0D9488 50%, #6366F1 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px 28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          filter: 'blur(30px)'
        }}></div>

        <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '12px' }}>
          🧠 Cognitive & Somatic Self-Care Suite
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(26px, 5vw, 34px)', fontWeight: '800', margin: '0 0 10px 0' }}>
          Therapeutic Sanctuary
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '15px', maxWidth: '680px', lineHeight: 1.6 }}>
          Evidence-based psychological tools to dissolve anxiety, ground your nervous system, challenge cognitive stress, and restore serene mental clarity.
        </p>
      </div>

      {/* Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        {[
          { id: 'grounding', label: '🌿 5-4-3-2-1 Grounding', desc: 'Sensory stabilizer' },
          { id: 'cbt', label: '💡 CBT Thought Reframer', desc: 'Cognitive reset' },
          { id: 'pmr', label: '🧘 Muscle Body Scan (PMR)', desc: 'Tension release' },
          { id: 'dissolver', label: '✨ Stress Dissolver', desc: 'Letting go' },
          { id: 'vr', label: '🕶️ 3D VR Sanctuaries', desc: 'Virtual rooms' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              zenAudio.playChime(660, 0.8);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '14px',
              border: '1px solid',
              borderColor: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--border-subtle)',
              background: activeTab === tab.id ? 'var(--brand-primary)' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-primary)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === tab.id ? '0 4px 14px rgba(2, 132, 199, 0.25)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =======================================================================
          TAB 1: 5-4-3-2-1 GROUNDING
          ======================================================================= */}
      {activeTab === 'grounding' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px 24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          {groundingStep < 5 ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{
                  background: groundingConfig[groundingStep].bg,
                  color: groundingConfig[groundingStep].color,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontWeight: '800',
                  fontSize: '12px'
                }}>
                  STEP {groundingStep + 1} OF 5
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Take a calm breath before typing
                </span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: '800', color: groundingConfig[groundingStep].color, marginBottom: '8px' }}>
                {groundingConfig[groundingStep].label}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
                {groundingConfig[groundingStep].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {groundingInputs[groundingStep].map((val, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: groundingConfig[groundingStep].bg,
                      color: groundingConfig[groundingStep].color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '13px'
                    }}>
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={`e.g. ${i === 0 ? 'The sunlight on the wall' : 'Notice something specific...'}`}
                      value={val}
                      onChange={(e) => handleGroundingInputChange(i, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#F8FAFC'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                {groundingStep > 0 ? (
                  <button
                    onClick={() => setGroundingStep(s => s - 1)}
                    className="btn btn-secondary"
                  >
                    ← Back
                  </button>
                ) : <div />}

                <button
                  onClick={nextGroundingStep}
                  className="btn btn-primary"
                  style={{ background: groundingConfig[groundingStep].color }}
                >
                  {groundingStep === 4 ? 'Complete Grounding ✨' : 'Next Step →'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '54px', marginBottom: '16px' }}>🌿</div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#15803D', marginBottom: '12px' }}>
                You are Grounded & Safe in the Present Moment
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 24px auto', fontSize: '15px' }}>
                Your sensory awareness has re-anchored your mind. Notice the sensation of steady calmness in your chest and shoulders.
              </p>
              <button
                onClick={() => {
                  setGroundingStep(0);
                  setGroundingInputs([['', '', '', '', ''], ['', '', '', ''], ['', '', ''], ['', ''], ['']]);
                }}
                className="btn btn-primary"
              >
                🔄 Repeat Practice Whenever Needed
              </button>
            </div>
          )}
        </div>
      )}

      {/* =======================================================================
          TAB 2: CBT THOUGHT REFRAMER
          ======================================================================= */}
      {activeTab === 'cbt' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Restructure a Stressful Thought
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                1. What is the automatic thought causing distress?
              </label>
              <textarea
                value={cbtThought}
                onChange={(e) => setCbtThought(e.target.value)}
                placeholder="e.g., 'Everything is falling apart and I cannot handle this.'"
                rows={3}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '14px', background: '#F8FAFC' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                2. Identify the Cognitive Distortion:
              </label>
              <select
                value={cbtDistortion}
                onChange={(e) => setCbtDistortion(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '14px', background: '#F8FAFC' }}
              >
                {distortions.map(d => (
                  <option key={d.name} value={d.name}>{d.name} — {d.desc}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                3. Evidence against this thought (Facts vs. Feelings):
              </label>
              <input
                type="text"
                value={cbtEvidenceAgainst}
                onChange={(e) => setCbtEvidenceAgainst(e.target.value)}
                placeholder="e.g., 'I have solved difficult problems before. I am safe right now.'"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '14px', background: '#F8FAFC' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                4. Realistic, compassionate reframed thought:
              </label>
              <textarea
                value={cbtReframed}
                onChange={(e) => setCbtReframed(e.target.value)}
                placeholder="e.g., 'This is challenging, but it is manageable. I will focus only on my immediate next step.'"
                rows={3}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.3)', background: 'var(--pastel-sky)', fontSize: '14px' }}
              />
            </div>

            <button
              onClick={handleSaveReframe}
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!cbtThought.trim() || !cbtReframed.trim()}
            >
              💾 Save Reframed Wisdom
            </button>
          </div>

          {/* Saved Reframes List */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
              📜 Your Grounded Truths Archive
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedReframes.map((item, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '700', color: '#BE123C' }}>Distortion: {item.distortion}</span>
                    <span>{item.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: '8px' }}>
                    "{item.original}"
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0369A1', background: 'var(--pastel-sky)', padding: '10px 14px', borderRadius: '10px' }}>
                    ✨ {item.reframed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 3: PROGRESSIVE MUSCLE RELAXATION (PMR)
          ======================================================================= */}
      {activeTab === 'pmr' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '36px 28px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <span style={{ background: 'var(--pastel-lavender)', color: '#6D28D9', padding: '4px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '12px' }}>
              SOMATIC TENSION DISSOLVER
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginTop: '12px', color: 'var(--text-primary)' }}>
              Guided Progressive Muscle Relaxation
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>
              By systematically tensing and gently releasing major muscle groups, we signal your autonomic nervous system that it is safe to unwind.
            </p>

            {/* Current Step Display */}
            <div style={{
              background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '20px',
              padding: '32px 24px',
              marginBottom: '28px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#7C3AED', marginBottom: '8px' }}>
                Area {pmrIndex + 1} of {pmrSteps.length}: {pmrSteps[pmrIndex].title}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1E1B4B', lineHeight: 1.6, marginBottom: '20px' }}>
                {pmrSteps[pmrIndex].instruction}
              </div>

              {pmrRunning && (
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#7C3AED' }}>
                  ⏱️ {pmrSecsLeft}s
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setPmrRunning(!pmrRunning);
                  if (!pmrRunning) {
                    zenAudio.playSingingBowl(216);
                  }
                }}
                className="btn btn-primary"
                style={{ background: '#7C3AED', padding: '12px 28px', fontSize: '15px' }}
              >
                {pmrRunning ? '⏸️ Pause Session' : '▶️ Start PMR Body Scan'}
              </button>
              <button
                onClick={() => {
                  setPmrRunning(false);
                  setPmrIndex(0);
                  setPmrSecsLeft(15);
                }}
                className="btn btn-secondary"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 4: COSMIC STRESS DISSOLVER
          ======================================================================= */}
      {activeTab === 'dissolver' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '36px 28px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <span style={{ background: 'var(--pastel-amber)', color: '#B45309', padding: '4px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '12px' }}>
              MENTAL DETACHMENT RITUAL
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginTop: '12px', color: 'var(--text-primary)' }}>
              Cosmic Thought Dissolver
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
              Write down whatever is weighing on your spirit. When ready, release it into the cosmos and watch it dissolve into harmless stardust.
            </p>

            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <textarea
                value={stressText}
                onChange={(e) => setStressText(e.target.value)}
                disabled={isDissolving}
                placeholder="What thought, fear, or frustration would you like to let go of right now?"
                rows={5}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '15px',
                  background: isDissolving ? '#F1F5F9' : '#FFFFFF',
                  opacity: isDissolving ? 0.2 : 1,
                  transform: isDissolving ? 'scale(0.85) rotate(2deg)' : 'scale(1)',
                  filter: isDissolving ? 'blur(8px)' : 'none',
                  transition: 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {isDissolving && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: '800',
                  color: 'var(--brand-primary)',
                  letterSpacing: '0.04em'
                }}>
                  ✨ Dissolving into Peace...
                </div>
              )}
            </div>

            <button
              onClick={handleDissolveStress}
              disabled={!stressText.trim() || isDissolving}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #0284C7 0%, #6366F1 100%)',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '700'
              }}
            >
              🌟 Release into the Cosmos
            </button>

            {dissolvedCount > 0 && (
              <div style={{ marginTop: '20px', fontSize: '13px', color: '#15803D', fontWeight: '700' }}>
                🕊️ You have released {dissolvedCount} stressful {dissolvedCount === 1 ? 'thought' : 'thoughts'} into peace today.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 5: 3D VR SANCTUARIES
          ======================================================================= */}
      {activeTab === 'vr' && (
        <div>
          <VRSelector />
        </div>
      )}
    </div>
  );
}
