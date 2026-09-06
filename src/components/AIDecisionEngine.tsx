import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StructuredRecommendation {
  emotional_summary: string;
  suggested_activity_type: 'breathing' | 'reflection' | 'audio' | 'visual' | 'yoga' | 'meditation';
  activity_intensity: 'low' | 'medium' | 'high';
  explanation: string;
  follow_up_option: string;
  safety_flag: boolean;
  confidence_score: number;
}

interface AIInput {
  mood_state: string;
  energy_level: number;
  time_of_day: string;
  preferences?: any;
  recent_sessions?: any[];
  optional_text?: string;
}

interface AIDecisionEngineProps {
  context: AIInput;
  onRecommendation: (recommendation: StructuredRecommendation) => void;
}

const TIME_BASED_SUGGESTIONS = {
  morning: { energy: 'medium', activities: ['meditation', 'yoga', 'breathing'] },
  afternoon: { energy: 'low', activities: ['breathing', 'reflection'] },
  evening: { energy: 'low', activities: ['meditation', 'audio', 'visual'] },
  night: { energy: 'low', activities: ['meditation', 'visual'] }
};

const MOOD_TO_ACTIVITY_MAP = {
  happy: { type: 'meditation', intensity: 'low', explanation: 'Great! Let\'s maintain this positive energy with a mindful practice.' },
  sad: { type: 'breathing', intensity: 'medium', explanation: 'I understand you\'re feeling low. Let\'s start with some gentle breathing to help you feel grounded.' },
  angry: { type: 'breathing', intensity: 'high', explanation: 'Let\'s channel this energy into a powerful breathing exercise to help you cool down.' },
  neutral: { type: 'meditation', intensity: 'low', explanation: 'You seem balanced. A short meditation can help maintain this calm state.' },
  surprised: { type: 'reflection', intensity: 'low', explanation: 'Let\'s take a moment to process this with a gentle reflection exercise.' }
};

export default function AIDecisionEngine({ context, onRecommendation }: AIDecisionEngineProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const processContextWithAI = async (input: AIInput): Promise<StructuredRecommendation> => {
    try {
      // Prepare message for AI with structured context
      const aiMessage = `Based on this context, provide a wellbeing recommendation:
        Mood: ${input.mood_state}
        Energy Level: ${input.energy_level}/10
        Time: ${input.time_of_day}
        User Notes: ${input.optional_text || 'None provided'}
        
        Please suggest one of these activities: breathing, reflection, audio, visual, yoga, meditation
        Use intensity levels: low, medium, high
        Keep response supportive and non-clinical.
        
        Respond in JSON format: {
          "emotional_summary": "brief emotional state analysis",
          "suggested_activity_type": "activity name",
          "activity_intensity": "low|medium|high", 
          "explanation": "supportive explanation",
          "follow_up_option": "what user can do next",
          "safety_flag": false
        }`;

      const response = await axios.post('/api/chat', {
        message: aiMessage,
        structured: true // Flag for structured response
      });

      // Try to parse structured response, fallback to default if fails
      try {
        const structuredResponse = JSON.parse(response.data.reply);
        return {
          ...structuredResponse,
          confidence_score: 0.8 // AI confidence score
        };
      } catch (parseError) {
        // Fallback to rule-based recommendation if AI response is not JSON
        return generateRuleBasedRecommendation(input);
      }
    } catch (aiError) {
      console.warn('AI service unavailable, using rule-based fallback');
      return generateRuleBasedRecommendation(input);
    }
  };

  const generateRuleBasedRecommendation = (input: AIInput): StructuredRecommendation => {
    const moodData = MOOD_TO_ACTIVITY_MAP[input.mood_state] || MOOD_TO_ACTIVITY_MAP.neutral;
    const timeData = TIME_BASED_SUGGESTIONS[input.time_of_day] || TIME_BASED_SUGGESTIONS.afternoon;
    
    // Adjust recommendation based on energy level
    let adjustedIntensity = moodData.intensity;
    if (input.energy_level < 3) adjustedIntensity = 'low';
    if (input.energy_level > 7) adjustedIntensity = 'medium';

    return {
      emotional_summary: `I sense you might be feeling ${input.mood_state} with ${input.energy_level}/10 energy levels.`,
      suggested_activity_type: moodData.type as any,
      activity_intensity: adjustedIntensity,
      explanation: moodData.explanation,
      follow_up_option: 'After this activity, you might want to check in with your feelings again or explore other calming practices.',
      safety_flag: input.mood_state === 'sad' && input.energy_level < 2,
      confidence_score: 0.6 // Lower confidence for rule-based
    };
  };

  const processRecommendation = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const input: AIInput = {
        ...context,
        time_of_day: getCurrentTimeOfDay()
      };

      const recommendation = await processContextWithAI(input);
      onRecommendation(recommendation);
    } catch (err) {
      setError('Unable to generate recommendation. Please try again.');
      console.error('AI Decision Engine error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (context.mood_state && context.energy_level !== undefined) {
      processRecommendation();
    }
  }, [context.mood_state, context.energy_level]);

  if (isProcessing) {
    return (
      <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>🤖 AI is analyzing your input...</div>
        <div style={{ marginTop: '8px', color: '#9ca3af' }}>
          Generating a personalized recommendation based on your mood, energy, and preferences
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ 
        padding: '16px', 
        backgroundColor: '#fef2f2', 
        borderColor: '#fecaca' 
      }}>
        <div style={{ color: '#dc2626', fontWeight: '600' }}>⚠️ Error</div>
        <div style={{ color: '#991b1b', marginTop: '4px' }}>{error}</div>
        <button 
          className="btn" 
          style={{ marginTop: '12px' }}
          onClick={processRecommendation}
        >
          Try Again
        </button>
      </div>
    );
  }

  return null; // Component doesn't render directly, recommendation is passed to parent
}
