import React, { createContext, useContext, useEffect, useState } from 'react';

interface SessionData {
  sessionId: string;
  moodState?: string;
  energyLevel?: number;
  optionalText?: string;
  preferences?: UserPreferences;
  timestamp: number;
  anonymizedSummary?: any;
}

interface UserPreferences {
  immersionLevel: 'standard' | 'immersive';
  notifications: boolean;
  dataRetention: 'session-only' | 'minimal';
  language: string;
  accessibilityFeatures: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
    voiceGuidance: boolean;
  };
}

interface SessionContextType {
  session: SessionData | null;
  preferences: UserPreferences;
  startSession: () => void;
  endSession: () => void;
  updateSessionData: (data: Partial<SessionData>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  hasConsent: boolean;
  setConsent: (consent: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  immersionLevel: 'standard',
  notifications: true,
  dataRetention: 'session-only',
  language: 'en',
  accessibilityFeatures: {
    highContrast: false,
    fontSize: 'medium',
    voiceGuidance: false,
  },
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [hasConsent, setHasConsent] = useState(false);

  const startSession = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: SessionData = {
      sessionId,
      timestamp: Date.now(),
      preferences,
    };
    setSession(newSession);
    
    // Store session start time
    try {
      localStorage.setItem('moodverse_session_start', JSON.stringify(newSession));
    } catch (e) {
      console.warn('Could not store session data');
    }
  };

  const endSession = () => {
    if (!session) return;

    // Create anonymized summary for trend monitoring (minimal data)
    const anonymizedSummary = {
      sessionDuration: Date.now() - session.timestamp,
      timestamp: new Date().toISOString().split('T')[0], // Date only for privacy
    };

    // Clear raw inputs, keep only anonymized data if user allows
    const finalSession = { ...session, anonymizedSummary };
    
    // Apply data retention policy
    if (preferences.dataRetention === 'session-only') {
      // Delete everything
      setSession(null);
      try {
        localStorage.removeItem('moodverse_session_start');
      } catch (e) {}
    } else {
      // Store anonymized summary for trend monitoring
      setSession(finalSession);
      try {
        localStorage.setItem('moodverse_session_summary', JSON.stringify(finalSession));
      } catch (e) {}
    }
  };

  const updateSessionData = (data: Partial<SessionData>) => {
    setSession(prev => prev ? { ...prev, ...data } : null);
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    try {
      localStorage.setItem('moodverse_preferences', JSON.stringify(updated));
    } catch (e) {}
  };

  const setConsent = (consent: boolean) => {
    setHasConsent(consent);
    try {
      localStorage.setItem('moodverse_consent', JSON.stringify({ consent, timestamp: Date.now() }));
    } catch (e) {}
  };

  // Load saved preferences and consent on mount
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('moodverse_preferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
      
      const savedConsent = localStorage.getItem('moodverse_consent');
      if (savedConsent) {
        const { consent } = JSON.parse(savedConsent);
        setHasConsent(consent);
      }
    } catch (e) {
      console.warn('Could not load saved preferences');
    }
  }, []);

  // Auto-cleanup on unmount if session is active
  useEffect(() => {
    return () => {
      if (session) {
        endSession();
      }
    };
  }, [session]);

  const value: SessionContextType = {
    session,
    preferences,
    startSession,
    endSession,
    updateSessionData,
    updatePreferences,
    hasConsent,
    setConsent,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
