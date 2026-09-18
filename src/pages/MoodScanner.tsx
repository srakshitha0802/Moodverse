import React from "react";
import AdvancedMoodDetector from "../components/AdvancedMoodDetector";

export default function MoodScanner() {
  return (
    <div className="container" style={{ maxWidth: 1140, margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #0D9488 50%, #6366F1 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px 28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
          🔒 On-Device Privacy-First AI
        </span>
        <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', margin: '10px 0 6px 0' }}>
          Facial Emotion & State Detector
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '14px', maxWidth: '620px' }}>
          Client-side computer vision models analyze subtle micro-expressions and emotional resonance in real-time, providing immediate personalized stress relief suggestions.
        </p>
      </div>

      {/* Main Scanner Component */}
      <AdvancedMoodDetector />

      {/* 4 Feature Highlights */}
      <div style={{
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '22px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--pastel-sky)', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '12px' }}>
            🔒
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>100% On-Device Privacy</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
            No video frames or biometric data leave your browser. All neural networks run entirely locally in WebGL/Wasm.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '22px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--pastel-sage)', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '12px' }}>
            🧠
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>Micro-Expression Tracking</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
            Detects subtle brow furrowing, eye fatigue, tension markers, and authentic smiles to calculate emotional valence.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '22px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--pastel-lavender)', color: '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '12px' }}>
            💡
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>Instant Stress Rescue</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
            Immediately connects detected stress or tension with recommended 4-7-8 breathwork, binaural waves, or restorative yoga.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '22px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--pastel-amber)', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '12px' }}>
            ⚡
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>Continuous Calibration</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
            Confidence scores and emotional equilibrium indicators update continuously without straining your hardware.
          </p>
        </div>
      </div>

      {/* Gentle Clinical Disclaimer */}
      <div style={{
        marginTop: '28px',
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: '16px',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{ fontSize: '24px' }}>🛡️</div>
        <div>
          <div style={{ fontWeight: '800', fontSize: '13px', color: '#92400E', marginBottom: '2px' }}>
            Sanctuary Wellness Notice
          </div>
          <div style={{ color: '#B45309', fontSize: '12px', lineHeight: 1.5 }}>
            This AI mood detection feature is an educational biofeedback tool to support mindfulness. It does not provide clinical diagnostic or psychiatric assessments. In urgent mental distress, please dial <strong>988</strong> immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
