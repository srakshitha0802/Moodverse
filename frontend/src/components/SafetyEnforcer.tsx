import React from 'react';

interface StructuredRecommendation {
  emotional_summary: string;
  suggested_activity_type: 'breathing' | 'reflection' | 'audio' | 'visual' | 'yoga' | 'meditation';
  activity_intensity: 'low' | 'medium' | 'high';
  explanation: string;
  follow_up_option: string;
  safety_flag: boolean;
  confidence_score: number;
}

interface SafetyCheckResult {
  safe_recommendation: StructuredRecommendation;
  safety_warnings: string[];
  escalation_needed: boolean;
  supportive_message: string;
}

const DIAGNOSIS_KEYWORDS = [
  'diagnosis', 'diagnose', 'diagnosed', 'medical condition', 'mental illness',
  'disorder', 'syndrome', 'syndrome', 'disease', 'pathology', 'clinical',
  'treatment', 'therapy', 'psychiatrist', 'psychologist', 'medication',
  'prescription', 'mental health disorder', 'anxiety disorder', 'depression',
  'bipolar', 'schizophrenia', 'ocd', 'ptsd', 'adhd', 'autism'
];

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself',
  'self harm', 'cutting', 'overdose', 'no reason to live', 'worthless',
  'better off dead', 'end my life', 'can\'t go on', 'hopeless'
];

const SAFETY_SUPPORT_MESSAGES = {
  low_risk: 'Remember, you\'re not alone. These activities can help you feel better, but if you\'re struggling, consider reaching out to a trusted friend or family member.',
  medium_risk: 'While these wellbeing practices can be helpful, please remember that you deserve support. If things feel overwhelming, consider speaking with a mental health professional or crisis helpline.',
  high_risk: 'Your wellbeing is important. If you\'re having thoughts of self-harm, please contact emergency services (112) or a crisis helpline immediately. You matter and help is available.'
};

export function SafetyEnforcer({ 
  recommendation, 
  originalInput 
}: { 
  recommendation: StructuredRecommendation;
  originalInput: any;
}): SafetyCheckResult {
  let safetyWarnings: string[] = [];
  let escalationNeeded = false;
  let supportiveMessage = SAFETY_SUPPORT_MESSAGES.low_risk;

  // Check for diagnosis language in the recommendation
  const hasDiagnosisLanguage = DIAGNOSIS_KEYWORDS.some(keyword => 
    recommendation.explanation.toLowerCase().includes(keyword) ||
    recommendation.emotional_summary.toLowerCase().includes(keyword)
  );

  if (hasDiagnosisLanguage) {
    safetyWarnings.push('Potential medical language detected - sanitized for safety');
    // Replace with safe generic suggestion
    recommendation.explanation = recommendation.explanation.replace(
      new RegExp(DIAGNOSIS_KEYWORDS.join('|'), 'gi'),
      'wellbeing'
    );
  }

  // Check for crisis indicators in user input
  const userInputText = (originalInput.optional_text || '').toLowerCase();
  const hasCrisisLanguage = CRISIS_KEYWORDS.some(keyword => 
    userInputText.includes(keyword)
  );

  if (hasCrisisLanguage) {
    safetyWarnings.push('Crisis language detected in user input');
    escalationNeeded = true;
    supportiveMessage = SAFETY_SUPPORT_MESSAGES.high_risk;
    recommendation.safety_flag = true;
  }

  // Adjust recommendation based on safety level
  if (recommendation.safety_flag || hasCrisisLanguage) {
    // For safety concerns, suggest calming activities with extra support
    recommendation.suggested_activity_type = 'meditation';
    recommendation.activity_intensity = 'low';
    recommendation.explanation += ' Given your current state, let\'s start with something gentle and grounding.';
    supportiveMessage = SAFETY_SUPPORT_MESSAGES.high_risk;
  } else if (recommendation.activity_intensity === 'high' && originalInput.energy_level < 3) {
    // Adjust high intensity for low energy users
    recommendation.activity_intensity = 'medium';
    supportiveMessage = SAFETY_SUPPORT_MESSAGES.medium_risk;
  }

  // Add external support suggestions for non-emergency situations
  if (recommendation.safety_flag && !escalationNeeded) {
    const supportSuggestions = [
      'National Suicide Prevention Lifeline: 988 (US)',
      'Crisis Text Line: Text HOME to 741741',
      'International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/'
    ];
    
    recommendation.follow_up_option += ` For additional support: ${supportSuggestions.join(', ')}`;
  }

  return {
    safe_recommendation: recommendation,
    safety_warnings: safetyWarnings,
    escalation_needed: escalationNeeded,
    supportive_message: supportiveMessage
  };
}

interface SafetyWarningProps {
  warnings: string[];
  escalationNeeded: boolean;
  supportiveMessage: string;
}

export function SafetyWarnings({ warnings, escalationNeeded, supportiveMessage }: SafetyWarningProps) {
  if (warnings.length === 0) return null;

  return (
    <div style={{ marginTop: '16px' }}>
      {warnings.length > 0 && (
        <div className="card" style={{ 
          backgroundColor: '#fef3c7', 
          borderColor: '#f59e0b',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px' 
          }}>
            <span style={{ fontSize: '16px', marginRight: '8px' }}>⚠️</span>
            <strong style={{ color: '#92400e' }}>Safety Notice</strong>
          </div>
          {warnings.map((warning, index) => (
            <div key={index} style={{ 
              color: '#92400e', 
              fontSize: '14px',
              marginBottom: '4px'
            }}>
              • {warning}
            </div>
          ))}
        </div>
      )}

      {escalationNeeded && (
        <div className="card" style={{ 
          backgroundColor: '#fef2f2', 
          borderColor: '#ef4444',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px' 
          }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>🚨</span>
            <strong style={{ color: '#991b1b' }}>Immediate Support Available</strong>
          </div>
          <p style={{ color: '#991b1b', margin: '0 0 8px 0' }}>
            If you're having thoughts of self-harm or suicide, please reach out for immediate help:
          </p>
          <ul style={{ color: '#991b1b', margin: '0 0 8px 20px' }}>
            <li><strong>Emergency:</strong> 112</li>
            <li><strong>National Suicide Prevention Lifeline:</strong> 988</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
          </ul>
        </div>
      )}

      <div className="card" style={{ 
        backgroundColor: '#f0f9ff', 
        borderColor: '#0ea5e9',
        padding: '12px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px' 
        }}>
          <span style={{ fontSize: '16px', marginRight: '8px' }}>💙</span>
          <strong style={{ color: '#0c4a6e' }}>Supportive Message</strong>
        </div>
        <p style={{ color: '#0c4a6e', margin: '0' }}>{supportiveMessage}</p>
      </div>
    </div>
  );
}
