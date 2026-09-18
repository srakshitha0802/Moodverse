import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { zenAudio } from '../utils/zenAudio';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface MoodLog {
  date: string;
  calmScore: number; // 1 to 10
  emotion: 'Peaceful' | 'Joyful' | 'Focused' | 'Anxious' | 'Fatigued' | 'Overwhelmed';
  trigger: string;
  notes: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<MoodLog[]>(() => {
    try {
      const saved = localStorage.getItem('moodverse_mood_logs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { date: 'Mon', calmScore: 8, emotion: 'Peaceful', trigger: 'Morning Meditation', notes: 'Felt very serene after 4-7-8 breathing' },
      { date: 'Tue', calmScore: 7, emotion: 'Focused', trigger: 'Work Project', notes: 'Steady pace throughout the day' },
      { date: 'Wed', calmScore: 5, emotion: 'Anxious', trigger: 'Deadlines', notes: 'Used the Grounding tool to recover' },
      { date: 'Thu', calmScore: 9, emotion: 'Joyful', trigger: 'Walk in Nature', notes: 'Listened to 432Hz binaural audio' },
      { date: 'Fri', calmScore: 8, emotion: 'Peaceful', trigger: 'Restorative Yoga', notes: 'Relaxed deeply during evening flow' },
      { date: 'Sat', calmScore: 9, emotion: 'Peaceful', trigger: 'Weekend Rest', notes: 'Read mindfulness book' },
      { date: 'Sun', calmScore: 8, emotion: 'Focused', trigger: 'Sanctuary Planning', notes: 'Calm mindset for the week' },
    ];
  });

  // Quick Check-in form
  const [quickScore, setQuickScore] = useState(8);
  const [quickEmotion, setQuickEmotion] = useState<MoodLog['emotion']>('Peaceful');
  const [quickTrigger, setQuickTrigger] = useState('Mindful Breath');
  const [quickNotes, setQuickNotes] = useState('');
  const [showLogSuccess, setShowLogSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('moodverse_mood_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    const newEntry: MoodLog = {
      date: today,
      calmScore: quickScore,
      emotion: quickEmotion,
      trigger: quickTrigger,
      notes: quickNotes.trim() || 'Logged daily check-in'
    };
    const updated = [newEntry, ...logs.slice(0, 13)];
    setLogs(updated);
    zenAudio.playSingingBowl(288);
    setQuickNotes('');
    setShowLogSuccess(true);
    setTimeout(() => setShowLogSuccess(false), 3000);
  };

  // Distribution chart data
  const emotionCounts = {
    Peaceful: logs.filter(l => l.emotion === 'Peaceful').length,
    Joyful: logs.filter(l => l.emotion === 'Joyful').length,
    Focused: logs.filter(l => l.emotion === 'Focused').length,
    Anxious: logs.filter(l => l.emotion === 'Anxious').length,
    Fatigued: logs.filter(l => l.emotion === 'Fatigued').length,
    Overwhelmed: logs.filter(l => l.emotion === 'Overwhelmed').length,
  };

  const pieData = {
    labels: ['Peaceful 🌿', 'Joyful ☀️', 'Focused 🎯', 'Anxious 🌧️', 'Fatigued 🌙', 'Overwhelmed ⚡'],
    datasets: [
      {
        data: Object.values(emotionCounts),
        backgroundColor: ['#10B981', '#F59E0B', '#0284C7', '#818CF8', '#94A3B8', '#EF4444'],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }
    ]
  };

  // Weekly Trend Bar Data
  const recent7 = [...logs].reverse().slice(-7);
  const barData = {
    labels: recent7.map(l => l.date),
    datasets: [
      {
        label: 'Calmness Level (1 - 10)',
        data: recent7.map(l => l.calmScore),
        backgroundColor: 'rgba(2, 132, 199, 0.75)',
        borderRadius: 8,
        hoverBackgroundColor: '#0284C7'
      }
    ]
  };

  const avgCalm = (logs.reduce((acc, l) => acc + l.calmScore, 0) / (logs.length || 1)).toFixed(1);
  const totalSessions = logs.length * 15; // est 15 min per checkin activity

  const copyReport = () => {
    const report = `🌿 MOODVERSE WELLNESS & PEACE REPORT 🌿\nDate: ${new Date().toLocaleDateString()}\nAverage Calmness Score: ${avgCalm}/10\nMindfulness Streak: 7 Days\nTotal Sessions Logged: ${logs.length}\nMost Frequent State: Peaceful\nKeep nurturing your inner tranquility!`;
    navigator.clipboard.writeText(report);
    alert('✨ Wellness Report copied to clipboard!');
  };

  return (
    <div className="container" style={{ maxWidth: 1160, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px 28px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
            📊 Emotion & Serenity Telemetry
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
            Mindfulness & Peace Analytics
          </h1>
          <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '580px' }}>
            Track your emotional equilibrium, monitor stress recovery, and observe how your nervous system thrives.
          </p>
        </div>

        <button
          onClick={copyReport}
          className="btn"
          style={{ background: '#FFFFFF', color: '#0369A1', fontWeight: '800', border: 'none', padding: '12px 20px', borderRadius: '12px' }}
        >
          📄 Export Wellness Summary
        </button>
      </div>

      {/* 4 Stat Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>AVERAGE CALMNESS</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#0284C7', margin: '6px 0' }}>{avgCalm} <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>/10</span></div>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>↑ 18% Higher than last week</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>MINDFULNESS STREAK</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10B981', margin: '6px 0' }}>7 <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>Days 🔥</span></div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active daily sanctuary practice</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>ZEN TIME LOGGED</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#6366F1', margin: '6px 0' }}>{totalSessions} <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>Mins</span></div>
          <div style={{ fontSize: '12px', color: '#6366F1', fontWeight: '600' }}>Breathwork, VR & Meditation</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>EQUILIBRIUM INDEX</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#D97706', margin: '6px 0' }}>92 <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>/100</span></div>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>Low Somatic Stress Zone</div>
        </div>
      </div>

      {/* Main Grid: Charts & Quick Logger */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* Weekly Trend Chart */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
            Weekly Serenity Level Trend
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Daily tranquility scores over recent sessions
          </p>
          <div style={{ height: '240px' }}>
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { min: 0, max: 10, ticks: { stepSize: 2 } }
                }
              }}
            />
          </div>
        </div>

        {/* Emotion Distribution Chart */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
            Emotional State Distribution
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Proportion of feelings recorded in your journal & check-ins
          </p>
          <div style={{ height: '240px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Quick Daily Check-In Form & Recent Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Check-In Card */}
        <div style={{ background: '#FFFFFF', padding: '26px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
            📝 Record Today's Serenity Pulse
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                Calmness / Peace Level:
              </label>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#0284C7' }}>{quickScore} / 10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={quickScore}
              onChange={(e) => setQuickScore(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284C7' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Primary Emotion:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['Peaceful', 'Joyful', 'Focused', 'Anxious', 'Fatigued', 'Overwhelmed'] as MoodLog['emotion'][]).map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setQuickEmotion(e)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: '1px solid',
                    borderColor: quickEmotion === e ? 'var(--brand-primary)' : 'var(--border-subtle)',
                    background: quickEmotion === e ? 'var(--pastel-sky)' : '#F8FAFC',
                    color: quickEmotion === e ? '#0369A1' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Main Activity / Trigger:
            </label>
            <input
              type="text"
              value={quickTrigger}
              onChange={(e) => setQuickTrigger(e.target.value)}
              placeholder="e.g. Guided Meditation, Yoga, Deep Work"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Reflection Note (Optional):
            </label>
            <input
              type="text"
              value={quickNotes}
              onChange={(e) => setQuickNotes(e.target.value)}
              placeholder="How does your body feel right now?"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '13px', background: '#F8FAFC' }}
            />
          </div>

          <button
            onClick={handleAddLog}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            ✨ Save Today's Peace Log
          </button>

          {showLogSuccess && (
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '13px', color: '#10B981', fontWeight: '700' }}>
              ✅ Peace log successfully recorded!
            </div>
          )}
        </div>

        {/* Recent History Table */}
        <div style={{ background: '#FFFFFF', padding: '26px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)' }}>
            🗓️ Recent Serenity Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
            {logs.map((log, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '800', fontSize: '13px', color: 'var(--text-primary)' }}>{log.date}</span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: log.emotion === 'Peaceful' ? 'var(--pastel-sage)' : log.emotion === 'Joyful' ? 'var(--pastel-amber)' : 'var(--pastel-sky)',
                      color: log.emotion === 'Peaceful' ? '#15803D' : log.emotion === 'Joyful' ? '#B45309' : '#0369A1'
                    }}>
                      {log.emotion}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                    {log.trigger} — <em>"{log.notes}"</em>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#0284C7' }}>
                    {log.calmScore}/10
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Calm Level</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}