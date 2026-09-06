import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

export interface BreathworkExercise {
  id: number;
  title: string;
  pattern: string;
  bestFor: string;
  duration: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  holdAfterExhaleSec?: number;
  customGuidance?: {
    inhale?: string;
    hold?: string;
    exhale?: string;
  };
}

export const BREATHWORK_EXERCISES: BreathworkExercise[] = [
  {
    id: 1,
    title: 'Deep Belly Breathing',
    pattern: 'Inhale 4s → Exhale 6s',
    bestFor: 'General stress, relaxation',
    duration: '5 min',
    icon: 'water-outline',
    color: '#0284C7',
    bg: '#E0F2FE',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 6,
    customGuidance: {
      inhale: 'Slow belly inhale through nose',
      exhale: 'Gentle relaxed release',
    },
  },
  {
    id: 2,
    title: 'Box Breathing',
    pattern: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s',
    bestFor: 'Stress relief & laser focus',
    duration: '6 min',
    icon: 'cube-outline',
    color: '#0D9488',
    bg: '#DCFCE7',
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
    holdAfterExhaleSec: 4,
    customGuidance: {
      inhale: 'Smooth controlled inhale',
      hold: 'Stillness and presence',
      exhale: 'Even steady exhale',
    },
  },
  {
    id: 3,
    title: '4–6 Breathing',
    pattern: 'Inhale 4s → Exhale 6s',
    bestFor: 'Anxiety, calming nervous system',
    duration: '5 min',
    icon: 'leaf-outline',
    color: '#16A34A',
    bg: '#DCFCE7',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 6,
    customGuidance: {
      inhale: 'Breathe in tranquility',
      exhale: 'Release somatic worry',
    },
  },
  {
    id: 4,
    title: 'Diaphragmatic Breathing',
    pattern: 'Slow belly inhale → slow exhale',
    bestFor: 'Physical relaxation, muscular tension',
    duration: '7 min',
    icon: 'fitness-outline',
    color: '#6D28D9',
    bg: '#EDE9FE',
    inhaleSec: 5,
    holdSec: 1,
    exhaleSec: 6,
    customGuidance: {
      inhale: 'Expand diaphragm gently',
      exhale: 'Soften belly and neck',
    },
  },
  {
    id: 5,
    title: 'Extended Exhale',
    pattern: 'Inhale 4s → Exhale 8s',
    bestFor: 'Deep relaxation before sleep',
    duration: '10 min',
    icon: 'moon-outline',
    color: '#6366F1',
    bg: '#EDE9FE',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 8,
    customGuidance: {
      inhale: 'Gentle inhale',
      exhale: 'Prolonged restorative exhale',
    },
  },
  {
    id: 6,
    title: 'Equal Breathing (Sama Vritti)',
    pattern: 'Inhale 5s → Exhale 5s',
    bestFor: 'Peacefulness & mental concentration',
    duration: '5 min',
    icon: 'infinite-outline',
    color: '#0284C7',
    bg: '#E0F2FE',
    inhaleSec: 5,
    holdSec: 0,
    exhaleSec: 5,
    customGuidance: {
      inhale: 'Equal balanced breath in',
      exhale: 'Equal balanced breath out',
    },
  },
  {
    id: 7,
    title: 'Humming Bee Breath (Bhramari)',
    pattern: 'Inhale gently → hum while exhaling',
    bestFor: 'Relaxation & mental tension',
    duration: '6 min',
    icon: 'volume-medium-outline',
    color: '#D97706',
    bg: '#FEF3C7',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 7,
    customGuidance: {
      inhale: 'Gentle nasal inhale',
      exhale: 'Create a soft hum sound',
    },
  },
  {
    id: 8,
    title: 'Pursed-Lip Breathing',
    pattern: 'Inhale nose → slow exhale pursed lips',
    bestFor: 'Slow, controlled respiratory recovery',
    duration: '5 min',
    icon: 'sparkles-outline',
    color: '#0D9488',
    bg: '#CCFBF1',
    inhaleSec: 4,
    holdSec: 1,
    exhaleSec: 6,
    customGuidance: {
      inhale: 'Inhale smoothly through nose',
      exhale: 'Breathe out like blowing a candle',
    },
  },
  {
    id: 9,
    title: 'Morning Energizing Breath',
    pattern: 'Comfortable deep inhale → relaxed exhale',
    bestFor: 'Morning calm + refreshed alertness',
    duration: '5 min',
    icon: 'sunny-outline',
    color: '#EA580C',
    bg: '#FFEDD5',
    inhaleSec: 4,
    holdSec: 1,
    exhaleSec: 4,
    customGuidance: {
      inhale: 'Draw in vibrant morning energy',
      exhale: 'Exhale morning sluggishness',
    },
  },
  {
    id: 10,
    title: 'Calming Visualization Breath',
    pattern: 'Inhale calm → exhale tension leaving',
    bestFor: 'Stress relief & peacefulness',
    duration: '8 min',
    icon: 'rainy-outline',
    color: '#0284C7',
    bg: '#E0F2FE',
    inhaleSec: 4,
    holdSec: 2,
    exhaleSec: 6,
    customGuidance: {
      inhale: 'Visualize pure crystalline calm',
      exhale: 'Watch mental strain dissipate',
    },
  },
  {
    id: 11,
    title: 'Heart-Focused Breathing',
    pattern: 'Slow inhale → slow exhale on chest',
    bestFor: 'Emotional calming & self-compassion',
    duration: '7 min',
    icon: 'heart-outline',
    color: '#E11D48',
    bg: '#FFE4E6',
    inhaleSec: 5,
    holdSec: 0,
    exhaleSec: 5,
    customGuidance: {
      inhale: 'Breathe into heart center',
      exhale: 'Radiate warmth and kindness',
    },
  },
  {
    id: 12,
    title: '4-7-8 Breathing (Dr. Weil)',
    pattern: 'Inhale 4s → Hold 7s → Exhale 8s',
    bestFor: 'Deep relaxation & bedtime sleep prep',
    duration: '8 min',
    icon: 'bed-outline',
    color: '#6366F1',
    bg: '#EDE9FE',
    inhaleSec: 4,
    holdSec: 7,
    exhaleSec: 8,
    customGuidance: {
      inhale: 'Quiet inhale through nose',
      hold: 'Retain oxygen peacefully',
      exhale: 'Whoosh exhale through mouth',
    },
  },
];

export default function MeditationScreen({ navigation }: any) {
  const [activeExercise, setActiveExercise] = useState<BreathworkExercise>(BREATHWORK_EXERCISES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timerSeconds]);

  // Breathwork cycle engine
  useEffect(() => {
    let cycleTimer: any = null;
    if (isPlaying) {
      cycleTimer = setInterval(() => {
        setPhaseSecondsLeft((currentSeconds) => {
          if (currentSeconds > 1) {
            return currentSeconds - 1;
          }

          // Advance to next phase
          let nextPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Pause' = 'Inhale';
          let nextDuration = activeExercise.inhaleSec;

          if (breathPhase === 'Inhale') {
            if (activeExercise.holdSec > 0) {
              nextPhase = 'Hold';
              nextDuration = activeExercise.holdSec;
            } else {
              nextPhase = 'Exhale';
              nextDuration = activeExercise.exhaleSec;
            }
          } else if (breathPhase === 'Hold') {
            nextPhase = 'Exhale';
            nextDuration = activeExercise.exhaleSec;
          } else if (breathPhase === 'Exhale') {
            if (activeExercise.holdAfterExhaleSec && activeExercise.holdAfterExhaleSec > 0) {
              nextPhase = 'Pause';
              nextDuration = activeExercise.holdAfterExhaleSec;
            } else {
              nextPhase = 'Inhale';
              nextDuration = activeExercise.inhaleSec;
            }
          } else if (breathPhase === 'Pause') {
            nextPhase = 'Inhale';
            nextDuration = activeExercise.inhaleSec;
          }

          setBreathPhase(nextPhase);

          // Animate circle scale
          if (nextPhase === 'Inhale') {
            Animated.timing(scaleAnim, {
              toValue: 1.35,
              duration: nextDuration * 1000,
              useNativeDriver: true,
            }).start();
          } else if (nextPhase === 'Exhale') {
            Animated.timing(scaleAnim, {
              toValue: 1.0,
              duration: nextDuration * 1000,
              useNativeDriver: true,
            }).start();
          }

          return nextDuration;
        });
      }, 1000);
    } else {
      scaleAnim.setValue(1.0);
    }

    return () => clearInterval(cycleTimer);
  }, [isPlaying, breathPhase, activeExercise]);

  const selectExercise = (exercise: BreathworkExercise) => {
    setActiveExercise(exercise);
    const mins = parseInt(exercise.duration, 10) || 5;
    setTimerSeconds(mins * 60);
    setBreathPhase('Inhale');
    setPhaseSecondsLeft(exercise.inhaleSec);
    setIsPlaying(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getPhaseInstruction = () => {
    if (!isPlaying) return 'Tap Play to Begin';
    if (breathPhase === 'Inhale') {
      return activeExercise.customGuidance?.inhale || 'Inhale slowly through your nose';
    }
    if (breathPhase === 'Hold') {
      return activeExercise.customGuidance?.hold || 'Hold gently with relaxed shoulders';
    }
    if (breathPhase === 'Exhale') {
      return activeExercise.customGuidance?.exhale || 'Smooth, continuous exhale';
    }
    return 'Rest peacefully before the next breath';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Guided Meditation" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#DCFCE7', '#E0F2FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="leaf-outline" size={13} color="#0D9488" />
              <Text style={styles.badgeText}>12 Guided Exercises</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="sparkles-outline" size={13} color="#0284C7" />
              <Text style={[styles.badgeText, { color: '#0284C7' }]}>Real-Time Pacing</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Breathwork & Mindfulness</Text>
          <Text style={styles.bannerSubtitle}>
            Clinically verified breathing patterns to down-regulate nervous activation, restore cognitive clarity, and foster deep peace.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Active Visualizer Card */}
          <View style={styles.playerCard}>
            <View style={styles.playerHeader}>
              <View style={[styles.playerIconBox, { backgroundColor: activeExercise.bg }]}>
                <Ionicons name={activeExercise.icon} size={22} color={activeExercise.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.playerSessionTitle}>{activeExercise.title}</Text>
                <Text style={styles.playerSessionMeta}>
                  {activeExercise.bestFor}
                </Text>
              </View>
              <View style={styles.patternBadge}>
                <Text style={styles.patternBadgeText}>{activeExercise.duration}</Text>
              </View>
            </View>

            {/* Pattern Formula */}
            <View style={styles.formulaPill}>
              <Ionicons name="infinite-outline" size={14} color="#0284C7" />
              <Text style={styles.formulaText}>{activeExercise.pattern}</Text>
            </View>

            {/* Breathing Animated Circle */}
            <View style={styles.circleWrapper}>
              <Animated.View
                style={[
                  styles.breathCircle,
                  { transform: [{ scale: isPlaying ? scaleAnim : 1.0 }] },
                  breathPhase === 'Inhale' && isPlaying && styles.circleInhale,
                  breathPhase === 'Hold' && isPlaying && styles.circleHold,
                  breathPhase === 'Exhale' && isPlaying && styles.circleExhale,
                  breathPhase === 'Pause' && isPlaying && styles.circlePause,
                ]}
              >
                <Text style={styles.timerText}>{formatTime(timerSeconds)}</Text>
                <Text style={styles.breathPhaseText}>
                  {isPlaying ? `${breathPhase} (${phaseSecondsLeft}s)` : 'Ready'}
                </Text>
              </Animated.View>
            </View>

            {/* Guidance Text */}
            <View style={styles.guidanceBox}>
              <Text style={styles.guidanceText}>{getPhaseInstruction()}</Text>
            </View>

            {/* Player Controls */}
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.controlSecondaryBtn}
                onPress={() => {
                  const mins = parseInt(activeExercise.duration, 10) || 5;
                  setTimerSeconds(mins * 60);
                  setBreathPhase('Inhale');
                  setPhaseSecondsLeft(activeExercise.inhaleSec);
                  setIsPlaying(false);
                }}
              >
                <Ionicons name="refresh-outline" size={20} color="#64748B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.85}
              >
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlSecondaryBtn}
                onPress={() => {
                  setTimerSeconds((prev) => Math.min(prev + 60, 3600));
                }}
              >
                <Ionicons name="add-outline" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Catalog of 12 Exercises */}
          <Text style={styles.sectionHeading}>All 12 Breathing Exercises</Text>

          {BREATHWORK_EXERCISES.map((ex) => {
            const isSelected = activeExercise.id === ex.id;
            return (
              <TouchableOpacity
                key={ex.id}
                style={[styles.exerciseCard, isSelected && styles.exerciseCardActive]}
                onPress={() => selectExercise(ex)}
                activeOpacity={0.75}
              >
                <View style={[styles.exerciseIconBox, { backgroundColor: ex.bg }]}>
                  <Ionicons name={ex.icon} size={22} color={ex.color} />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[styles.exerciseTitle, isSelected && { color: '#0284C7' }]}>
                      #{ex.id} {ex.title}
                    </Text>
                    <View style={styles.timePill}>
                      <Text style={styles.timePillText}>{ex.duration}</Text>
                    </View>
                  </View>
                  <Text style={styles.exercisePattern}>{ex.pattern}</Text>
                  <View style={styles.bestForRow}>
                    <Ionicons name="checkmark-circle-outline" size={12} color="#0D9488" />
                    <Text style={styles.bestForText}>Best for: {ex.bestFor}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  banner: {
    padding: 22,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.15)',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  badgeText: {
    color: '#0D9488',
    fontSize: 11,
    fontWeight: '700',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerSessionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  playerSessionMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  patternBadge: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  patternBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  formulaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
  formulaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginVertical: 10,
  },
  breathCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0F9FF',
    borderWidth: 3,
    borderColor: '#BAE6FD',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  circleInhale: {
    borderColor: '#0284C7',
    backgroundColor: '#E0F2FE',
  },
  circleHold: {
    borderColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
  },
  circleExhale: {
    borderColor: '#0D9488',
    backgroundColor: '#DCFCE7',
  },
  circlePause: {
    borderColor: '#8B5CF6',
    backgroundColor: '#EDE9FE',
  },
  timerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  breathPhaseText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
    marginTop: 4,
  },
  guidanceBox: {
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  guidanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  controlSecondaryBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  exerciseCardActive: {
    borderColor: '#BAE6FD',
    backgroundColor: '#F8FAFC',
  },
  exerciseIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  timePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  exercisePattern: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  bestForRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  bestForText: {
    fontSize: 11,
    color: '#64748B',
  },
});
