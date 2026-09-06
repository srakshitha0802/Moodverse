import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Check if browser supports Web Speech API (Text-to-Speech)
 */
function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

/**
 * Check if browser supports Speech Recognition
 */
function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Check if device is a touch device
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0 ||
         (navigator as any).msMaxTouchPoints > 0;
}

/**
 * Get responsive dimensions for the breathing circle
 */
function getBreathingDimensions(): { size: number; fontSize: string } {
  if (typeof window === 'undefined') return { size: 150, fontSize: '1.25rem' };
  const width = window.innerWidth;
  if (width <= 360) return { size: 120, fontSize: '1rem' };
  if (width <= 480) return { size: 140, fontSize: '1.1rem' };
  if (width <= 768) return { size: 160, fontSize: '1.25rem' };
  return { size: 180, fontSize: '1.4rem' };
}

/**
 * Format time in MM:SS format
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Meditation presets with different durations and breathing patterns
const MEDITATION_PRESETS = [
  { name: 'Quick Calm', duration: 60, inhale: 4, hold: 4, exhale: 4, pause: 2, description: 'A short breathing exercise for instant relaxation' },
  { name: 'Deep Relax', duration: 180, inhale: 4, hold: 7, exhale: 8, pause: 2, description: 'Classic 4-7-8 breathing technique for deeper calm' },
  { name: 'Focus Boost', duration: 300, inhale: 4, hold: 4, exhale: 4, pause: 4, description: 'Balance breathing to enhance concentration' },
  { name: 'Sleep Ready', duration: 600, inhale: 4, hold: 7, exhale: 8, pause: 4, description: 'Wind down preparation for restful sleep' },
  { name: 'Custom', duration: 120, inhale: 4, hold: 4, exhale: 4, pause: 2, description: 'Set your own pace' },
] as const;

// Pre-recorded meditation scripts
const MEDITATION_SCRIPTS = {
  'bodyScan': {
    title: 'Body Scan Meditation',
    script: `Find a comfortable position. Begin by taking three deep breaths. Inhale through your nose, and exhale through your mouth. Now, bring your attention to the top of your head. Notice any sensations there. Perhaps warmth, tingling, or just pressure. Simply observe without judgment. Now, slowly move your attention down to your forehead. Relax any tension you might be holding there. Your eyebrows soften. Your eyes relax. Your cheeks are relaxed. Now, bring attention to your jaw. Notice if you're clenching. Let your jaw hang loose. Your tongue rests gently behind your lower teeth. Now, move to your neck. Feel the weight of your head releasing. Your shoulders drop. Any tension melts away. Now, bring attention to your chest. Feel your heart beating. Notice your lungs expanding with each breath. Relax your chest. Now, your abdomen rises and falls with each breath. Let go of any tightness in your stomach. Now, move to your arms. Notice your upper arms, elbows, forearms, wrists. Your hands become heavy and relaxed. Now, bring attention to your legs. Your thighs relax. Your knees are loose. Your calves soften. Your feet feel grounded. Now, scan your entire body from head to toe. Notice any remaining tension and breathe into it. Let it dissolve. Rest in this peaceful state for a moment. When you're ready, gently open your eyes. You are calm, relaxed, and present.`
  },
  'lovingKindness': {
    title: 'Loving Kindness Meditation',
    script: `Settle into a comfortable position. Close your eyes if that feels comfortable. Take a deep breath in, and slowly release it. Now, bring to mind someone you care about deeply. See their face clearly. Feel the warmth of your love for them. Silently repeat these words: May you be happy. May you be healthy. May you be safe. May you live with ease. Let these wishes flow from your heart to theirs. Now, expand this feeling to yourself. Repeat: May I be happy. May I be healthy. May I be safe. May I live with ease. Now, bring to mind someone neutral. Someone you neither love nor dislike. Wish them well. May you be happy. May you be healthy. May you be safe. May you live with ease. Now, bring to mind someone you find difficult. This may be challenging. But remember, this practice is for your own peace. May you be happy. May you be healthy. May you be safe. May you live with ease. Now, expand your awareness to all beings everywhere. Every person you know and don't know. All creatures great and small. May all beings be happy. May all beings be healthy. May all beings be safe. May all beings live with ease. Rest in this feeling of boundless love and compassion. When you're ready, gently return to the present moment. Open your eyes. Carry this warmth with you throughout your day.`
  },
  'breathAwareness': {
    title: 'Breath Awareness Meditation',
    script: `Find a comfortable seated position. Your spine tall but not rigid. Hands resting comfortably in your lap. Gently close your eyes, or soften your gaze. Begin to notice your breath. You don't need to change it. Simply observe the natural rhythm of your breathing. Notice the sensation of air entering your nostrils. Feel your chest and abdomen rising. Notice the pause between breaths. The gentle exhale. Stay present with each breath. If your mind wanders, that's okay. Gently guide your attention back to your breath. Each breath anchors you to the present moment. You don't need to do anything special. Just breathe. Just be. The breath becomes your anchor. Your safe harbor. When thoughts arise, let them pass like clouds in the sky. They come and they go. You remain. Present. Calm. Watching your breath. Inhaling peace. Exhaling tension. Continue this practice. Stay with your breath. Here. Now. This moment. All you need to do is breathe. All you need to be is here. Rest in the stillness. When you're ready, take a deep breath in. And slowly open your eyes. You are refreshed. You are present. You are calm.`
  },
  'gratitude': {
    title: 'Gratitude Practice',
    script: `Make yourself comfortable. Take a deep breath in, and exhale fully. Bring to mind three things you're grateful for today. The first one. Perhaps it's a person in your life. Someone who brings you joy. Feel the gratitude in your heart. Let it fill you with warmth. Now, the second thing. Perhaps it's something simple. A warm cup of tea. A comfortable chair. A beautiful sky. Notice how gratitude feels in your body. Now, the third thing. Perhaps it's an opportunity you've had. Or a lesson you've learned. Something that has helped you grow. Feel the appreciation flowing through you. Now, expand your gratitude outward. Think of someone who has helped you. Without expecting anything in return. Send them silent thanks. Now, think of a challenge you've overcome. Thank yourself for your strength and resilience. Notice how gratitude shifts your perspective. How it softens your heart. How it brings peace. Take a moment to feel truly grateful. In this moment. Right now. You have so much to appreciate. Continue breathing into this feeling of gratitude. Let it grow. Let it fill you. When you're ready, gently return. Carrying this gratitude with you.`
  },
  'stressRelease': {
    title: 'Stress Release Visualization',
    script: `Make yourself comfortable. Close your eyes if you wish. Take a deep breath in. Feel yourself becoming lighter. As you exhale, let go of any tension you've been holding. Take another deep breath in. And release. With each breath, you feel more relaxed. Now, imagine yourself at the edge of a beautiful forest. The trees are tall and green. Sunlight filters through the leaves. You feel safe here. You begin walking along a gentle path. With each step, you feel lighter. More peaceful. The path leads to a clearing. There, you see a crystal-clear lake. The water is calm and still. You sit by the shore. The view is breathtaking. Mountains in the distance. A gentle breeze touches your face. You feel completely at peace. The water reflects the blue sky. You are part of this beautiful scene. A sense of deep relaxation washes over you. You are safe. You are calm. You are at peace. Take a moment to absorb the tranquility of this place. This is your sanctuary. You can return here whenever you need peace. When you're ready, slowly return to the present. Feel your body. Feel the surface beneath you. Take a deep breath in. And open your eyes. You are refreshed. You are calm. You are centered.`
  }
} as const;

type PresetName = typeof MEDITATION_PRESETS[number]['name'];
type ScriptKey = keyof typeof MEDITATION_SCRIPTS;

interface MeditationPlayerProps {
  initialPreset?: PresetName;
}

import ErrorBoundary from './ErrorBoundary';
import useGlobalErrorHandler from '../hooks/useGlobalErrorHandler';
import { isDeviceOrientationSupported, requestOrientationPermission } from '../hooks/useCrossBrowserCompatibility';

export default function MeditationPlayer({ initialPreset = 'Quick Calm' }: MeditationPlayerProps) {
  useGlobalErrorHandler();
  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [selectedPreset, setSelectedPreset] = useState<PresetName>(initialPreset);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [selectedScript, setSelectedScript] = useState<ScriptKey>('breathAwareness');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false);
  const [isGrantingPermission, setIsGrantingPermission] = useState(false);
  
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  
  const touchEnabled = isTouchDevice();
  const breathingDims = getBreathingDimensions();

  // Get current preset settings
  const currentPreset = MEDITATION_PRESETS.find(p => p.name === selectedPreset) || MEDITATION_PRESETS[0];

  // Initialize and cleanup
  useEffect(() => {
    // Check browser support
    setSpeechSupported(isSpeechSynthesisSupported());
    setRecognitionSupported(isSpeechRecognitionSupported());
    setWindowWidth(window.innerWidth);
    
    // Set duration from preset
    setDuration(currentPreset.duration);
    
    // Handle resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup speech on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (speechUtteranceRef.current) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
    };
  }, []);

  // Update duration when preset changes
  useEffect(() => {
    setDuration(currentPreset.duration);
  }, [selectedPreset, currentPreset.duration]);

  /**
   * Initialize speech recognition for voice commands
   */
  const initSpeechRecognition = useCallback(() => {
    if (!recognitionSupported) return null;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      console.log('[MeditationPlayer] Voice command:', command);
      
      // Voice command handling
      if (command.includes('pause') || command.includes('stop')) {
        if (isPlaying) togglePlay();
      } else if (command.includes('play') || command.includes('start')) {
        if (!isPlaying) togglePlay();
      } else if (command.includes('reset') || command.includes('restart')) {
        resetMeditation();
      }
    };
    
    recognition.onerror = (event: any) => {
      console.warn('[MeditationPlayer] Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Voice commands will not work.');
      }
    };
    
    recognition.onend = () => {
      if (isListening) {
        // Restart if still supposed to be listening
        try {
          recognition.start();
        } catch (e) {
          // Already started or not allowed
        }
      }
    };
    
    return recognition;
  }, [recognitionSupported, isPlaying]);

  /**
   * Toggle voice commands
   */
  const toggleVoiceCommands = useCallback(() => {
    if (!recognitionSupported) {
      setError('Voice commands are not supported in this browser.');
      return;
    }
    
    if (isListening) {
      // Stop listening
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceCommandsEnabled(false);
    } else {
      // Start listening
      const recognition = initSpeechRecognition();
      if (recognition) {
        speechRecognitionRef.current = recognition;
        try {
          recognition.start();
          setIsListening(true);
          setVoiceCommandsEnabled(true);
          setError(null);
        } catch (e) {
          console.warn('[MeditationPlayer] Failed to start recognition:', e);
          setError('Failed to start voice commands. Please try again.');
        }
      }
    }
  }, [recognitionSupported, isListening, initSpeechRecognition]);

  /**
   * Toggle speech synthesis for guided meditation
   */
  const toggleSpeech = useCallback(() => {
    if (!speechSupported) {
      setError('Text-to-speech is not supported in this browser.');
      return;
    }
    
    if (speechEnabled) {
      // Stop speech
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
    } else {
      // Start speech with selected script
      const script = MEDITATION_SCRIPTS[selectedScript];
      const utterance = new SpeechSynthesisUtterance(script.script);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google'))
      ) || voices.find(v => v.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechUtteranceRef.current = utterance;
      
      utterance.onend = () => {
        setSpeechEnabled(false);
      };
      
      utterance.onerror = (e) => {
        console.warn('[MeditationPlayer] Speech error:', e);
        setSpeechEnabled(false);
        if (e.error === 'not-allowed') {
          setError('Speech synthesis blocked. Please check browser permissions.');
        }
      };
      
      window.speechSynthesis.speak(utterance);
      setSpeechEnabled(true);
      setError(null);
    }
  }, [speechSupported, speechEnabled, selectedScript]);

  /**
   * Animation loop for breathing phase timing
   */
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }
    
    const phases = ['inhale', 'hold', 'exhale', 'pause'] as const;
    let phaseIndex = 0;
    let phaseStartTime = Date.now();
    
    const updatePhase = () => {
      const elapsed = Date.now() - phaseStartTime;
      const phaseDuration = currentPreset[phases[phaseIndex]] * 1000;
      
      if (elapsed >= phaseDuration) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        phaseStartTime = Date.now();
        setBreathPhase(phases[phaseIndex]);
        setPhaseTime(0);
      } else {
        setPhaseTime(elapsed / 1000);
      }
      
      animationFrameRef.current = requestAnimationFrame(updatePhase);
    };
    
    animationFrameRef.current = requestAnimationFrame(updatePhase);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentPreset]);

  /**
   * Timer for meditation duration
   */
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          // Meditation complete
          stopMeditation();
          return duration;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  /**
   * Play/pause toggle
   */
  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false);
      if (speechEnabled) {
        window.speechSynthesis.pause();
      }
    } else {
      // Before starting, ensure device motion permission if on a touch device
      if (touchEnabled && isDeviceOrientationSupported()) {
        try {
          const permission = await requestOrientationPermission();
          if (permission === 'granted') {
            setIsPlaying(true);
          } else {
            // If permission requires gesture or is denied, show overlay to guide user
            setShowPermissionOverlay(true);
            return;
          }
        } catch (e) {
          console.warn('[MeditationPlayer] Permission request failed:', e);
          setError('Unable to obtain device motion permission. Please enable it from your browser settings.');
          return;
        }
      } else {
        setIsPlaying(true);
      }

      if (speechEnabled && speechUtteranceRef.current) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }
  }, [isPlaying, speechEnabled, touchEnabled]);

  /**
   * Stop meditation and reset
   */
  const stopMeditation = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setBreathPhase('inhale');
    setPhaseTime(0);
    
    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
    }
    
    if (isListening) {
      toggleVoiceCommands();
    }
  }, [speechEnabled, isListening, toggleVoiceCommands]);

  /**
   * Reset meditation to beginning
   */
  const resetMeditation = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setBreathPhase('inhale');
    setPhaseTime(0);
  }, []);

  /**
   * Request and handle motion/orientation permissions when user taps the overlay button
   */
  const handleGrantPermissions = useCallback(async () => {
    setIsGrantingPermission(true);
    try {
      const result = await requestOrientationPermission();
      if (result === 'granted') {
        setShowPermissionOverlay(false);
        setIsPlaying(true);
        setError(null);
      } else if (result === 'prompt' || result === 'denied') {
        setError('Motion permission required to use the guided session. Please enable it in browser settings or tap allow when prompted.');
      }
    } catch (e) {
      console.warn('[MeditationPlayer] handleGrantPermissions failed', e);
      setError('Unable to obtain device motion permission.');
    } finally {
      setIsGrantingPermission(false);
    }
  }, []);

  /**
   * Handle preset change
   */
  const handlePresetChange = (presetName: PresetName) => {
    setSelectedPreset(presetName);
    const preset = MEDITATION_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setDuration(preset.duration);
    }
    resetMeditation();
  };

  /**
   * Handle script change
   */
  const handleScriptChange = (scriptKey: ScriptKey) => {
    setSelectedScript(scriptKey);
    if (speechEnabled) {
      // Restart speech with new script
      window.speechSynthesis.cancel();
      toggleSpeech();
    }
  };

  // Get breathing animation scale based on phase
  const getBreathScale = (): number => {
    const phaseDurations = {
      inhale: currentPreset.inhale,
      hold: currentPreset.hold,
      exhale: currentPreset.exhale,
      pause: currentPreset.pause
    };
    
    const totalCycle = phaseDurations.inhale + phaseDurations.hold + 
                       phaseDurations.exhale + phaseDurations.pause;
    
    const progress = phaseTime / phaseDurations[breathPhase];
    
    switch (breathPhase) {
      case 'inhale': return 1 + (0.3 * progress);
      case 'hold': return 1.3;
      case 'exhale': return 1.3 - (0.3 * progress);
      case 'pause': return 1;
      default: return 1;
    }
  };

  // Get breathing instruction text
  const getBreathText = (): string => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Rest';
      default: return 'Breathe';
    }
  };

  return (
    <div 
      className="meditation-player"
      role="region"
      aria-label="Meditation player"
      style={{
        padding: '24px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      {/* Error display */}
      {error && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '13px',
            marginBottom: '16px'
          }}
          role="alert"
        >
          <span>⚠️</span>
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#dc2626'
            }}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: windowWidth <= 480 ? '1.25rem' : '1.5rem',
          color: '#1e293b' 
        }}>
          {MEDITATION_SCRIPTS[selectedScript].title}
        </h3>
        <p style={{ 
          margin: 0, 
          color: '#64748b', 
          fontSize: '0.9rem' 
        }}>
          {currentPreset.description}
        </p>
      </div>

      {/* Breathing Circle */}
      <div 
        className="breath-circle-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px'
        }}
      >
        <div 
          className="breath-circle"
          style={{
            width: `${breathingDims.size}px`,
            height: `${breathingDims.size}px`,
            borderRadius: '50%',
            background: isPlaying 
              ? 'linear-gradient(135deg, #6BD3C7, #9B8EF6)' 
              : 'linear-gradient(135deg, #94a3b8, #64748b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${getBreathScale()})`,
            transition: isPlaying ? 'transform 0.1s linear' : 'transform 0.3s ease',
            animation: isPlaying ? 'none' : 'breathe 4s ease-in-out infinite',
            boxShadow: '0 8px 32px rgba(107, 211, 199, 0.3)'
          }}
          role="img"
          aria-label={`Breathing phase: ${getBreathText()}`}
        >
          <span 
            className="breath-text"
            style={{
              color: 'white',
              fontSize: breathingDims.fontSize,
              fontWeight: '600',
              textAlign: 'center'
            }}
          >
            {isPlaying ? getBreathText() : 'Ready'}
          </span>
        </div>
      </div>

      {/* Timer Display */}
      <div 
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: windowWidth <= 480 ? '1.5rem' : '2rem',
          fontWeight: '700',
          color: '#1e293b',
          fontVariantNumeric: 'tabular-nums'
        }}
        aria-live="polite"
        aria-label={`Time remaining: ${formatTime(duration - currentTime)}`}
      >
        {formatTime(duration - currentTime)}
      </div>

      {/* Progress Bar */}
      <div 
        style={{
          width: '100%',
          height: '6px',
          background: '#e2e8f0',
          borderRadius: '3px',
          marginBottom: '20px',
          overflow: 'hidden'
        }}
        role="progressbar"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-label="Meditation progress"
      >
        <div 
          style={{
            width: `${(currentTime / duration) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6BD3C7, #9B8EF6)',
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Main Controls */}
      <div 
        className="player-controls"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
        role="group"
        aria-label="Meditation playback controls"
      >
        <button 
          className="player-btn secondary"
          onClick={resetMeditation}
          style={{
            width: touchEnabled ? '48px' : '44px',
            height: touchEnabled ? '48px' : '44px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Reset meditation"
        >
          ⏮
        </button>
        
        <button 
          className="player-btn primary"
          onClick={togglePlay}
          style={{
            width: touchEnabled ? '64px' : '56px',
            height: touchEnabled ? '64px' : '56px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #6BD3C7, #9B8EF6)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(107, 211, 199, 0.4)'
          }}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause meditation' : 'Start meditation'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button 
          className="player-btn secondary"
          onClick={stopMeditation}
          style={{
            width: touchEnabled ? '48px' : '44px',
            height: touchEnabled ? '48px' : '44px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Stop meditation"
        >
          ⏹
        </button>
      </div>

      {/* Feature Controls */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        {/* Voice Commands Toggle */}
        {recognitionSupported && (
          <button 
            onClick={toggleVoiceCommands}
            className="btn secondary"
            style={{
              padding: '8px 16px',
              background: isListening ? '#fef2f2' : '#f1f5f9',
              border: isListening ? '1px solid #fecaca' : '1px solid #e2e8f0',
              color: isListening ? '#dc2626' : '#475569',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            aria-pressed={isListening}
          >
            {isListening ? '🎤 Listening...' : '🎤 Voice Commands'}
          </button>
        )}
        
        {/* Guided Meditation Toggle */}
        {speechSupported && (
          <button 
            onClick={toggleSpeech}
            className="btn secondary"
            style={{
              padding: '8px 16px',
              background: speechEnabled ? 'rgba(107, 211, 199, 0.15)' : '#f1f5f9',
              border: speechEnabled ? '1px solid #6BD3C7' : '1px solid #e2e8f0',
              color: speechEnabled ? '#0d9488' : '#475569',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            aria-pressed={speechEnabled}
          >
            {speechEnabled ? '🔊 Guided On' : '🔇 Guided'}
          </button>
        )}
      </div>

      {/* Preset Selection */}
      <div 
        className="preset-buttons"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}
        role="group"
        aria-label="Meditation duration presets"
      >
        {MEDITATION_PRESETS.slice(0, 4).map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePresetChange(preset.name)}
            className={`preset-btn ${selectedPreset === preset.name ? 'active' : ''}`}
            style={{
              padding: '8px 14px',
              border: selectedPreset === preset.name 
                ? '2px solid #6BD3C7' 
                : '1px solid #e2e8f0',
              background: selectedPreset === preset.name 
                ? 'rgba(107, 211, 199, 0.15)' 
                : 'white',
              color: selectedPreset === preset.name 
                ? '#0d9488' 
                : '#475569',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minHeight: '36px',
              transition: 'all 0.2s ease'
            }}
            aria-pressed={selectedPreset === preset.name}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Script Selection */}
      <div 
        style={{
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '12px'
        }}
      >
        <label 
          htmlFor="script-select"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            fontSize: '14px',
            color: '#475569'
          }}
        >
          Guided Meditation Script:
        </label>
        <select
          id="script-select"
          value={selectedScript}
          onChange={(e) => handleScriptChange(e.target.value as ScriptKey)}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white',
            color: '#1e293b',
            cursor: 'pointer',
            minHeight: '44px'
          }}
          disabled={speechEnabled}
        >
          {Object.entries(MEDITATION_SCRIPTS).map(([key, { title }]) => (
            <option key={key} value={key}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Voice Command Help */}
      {isListening && (
        <div 
          style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(107, 211, 199, 0.1)',
            border: '1px solid rgba(107, 211, 199, 0.2)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#0f766e',
            textAlign: 'center'
          }}
        >
          🎤 Voice commands: "Play", "Pause", "Stop", "Reset"
        </div>
      )}

      {/* Permission overlay for device motion */}
      {showPermissionOverlay && (
        <div
          role="dialog"
          aria-modal="true"
          className="permission-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2,6,23,0.6)',
            zIndex: 1200
          }}
        >
          <div
            className="permission-card"
            style={{
              width: '90%',
              maxWidth: '420px',
              padding: '20px',
              background: 'white',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(2,6,23,0.4)'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0' }}>Enable Motion Access</h4>
            <p style={{ margin: '0 0 16px 0', color: '#475569' }}>
              This session uses your device's motion sensors for an immersive guided experience. Please tap Enable and accept the prompt from your browser.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={handleGrantPermissions}
                disabled={isGrantingPermission}
                style={{
                  padding: '10px 18px',
                  background: '#6BD3C7',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {isGrantingPermission ? 'Enabling...' : 'Enable'}
              </button>

              <button
                onClick={() => setShowPermissionOverlay(false)}
                style={{
                  padding: '10px 18px',
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
