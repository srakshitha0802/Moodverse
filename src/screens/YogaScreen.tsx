import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

interface YogaPose {
  id: string;
  title: string;
  sanskrit: string;
  duration: string;
  level: string;
  benefits: string;
  instructions: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const YOGA_POSES: YogaPose[] = [
  {
    id: 'child_pose',
    title: 'Child’s Pose',
    sanskrit: 'Balasana',
    duration: '3 min',
    level: 'Beginner',
    benefits: 'Calms mind, releases tension in back, shoulders & neck',
    instructions: 'Kneel comfortably on your mat with big toes touching. Sit back on your heels, separate knees hip-width apart, and gently fold forward extending your arms straight ahead.',
    icon: 'leaf-outline',
  },
  {
    id: 'cat_cow',
    title: 'Cat-Cow Stretch',
    sanskrit: 'Marjaryasana-Bitilasana',
    duration: '5 min',
    level: 'Beginner',
    benefits: 'Gently flexes the spine, stimulates abdominal organs, and relieves chest stress',
    instructions: 'Start on hands and knees with wrists below shoulders. Inhale as you drop your belly and look slightly up (Cow). Exhale as you draw belly to spine and gently round your back (Cat).',
    icon: 'sync-outline',
  },
  {
    id: 'tree_pose',
    title: 'Tree Pose',
    sanskrit: 'Vrksasana',
    duration: '4 min',
    level: 'Intermediate',
    benefits: 'Improves focus, balance, neuromuscular coordination & mental grounding',
    instructions: 'Stand tall with feet together. Shift weight onto left foot, bend right knee, and place right sole on inner left calf or thigh (avoid the knee). Bring palms together at heart center.',
    icon: 'fitness-outline',
  },
  {
    id: 'corpse_pose',
    title: 'Corpse Pose',
    sanskrit: 'Savasana',
    duration: '10 min',
    level: 'All Levels',
    benefits: 'Deep physical and mental restoration, lowers nervous activation, and soothes headaches',
    instructions: 'Lie flat on your back, legs separated comfortably, arms relaxed by sides with palms facing up. Close your eyes and breathe naturally, releasing all physical effort.',
    icon: 'bed-outline',
  },
  {
    id: 'sukhasana',
    title: 'Easy Pose + Deep Breathing',
    sanskrit: 'Sukhasana',
    duration: '5–10 min',
    level: 'Beginner',
    benefits: 'Calming racing thoughts and improving concentration',
    instructions: 'Sit comfortably with your spine upright. Close your eyes and relax your shoulders. Slowly inhale through your nose and exhale gently.',
    icon: 'flower-outline',
  },
  {
    id: 'viparita_karani',
    title: 'Legs-Up-the-Wall',
    sanskrit: 'Viparita Karani',
    duration: '5–10 min',
    level: 'Restorative',
    benefits: 'Deep relaxation, lymphatic drainage, and releasing physical tension',
    instructions: 'Lie on your back with your legs resting vertically against a wall. Keep your arms relaxed beside you. Breathe slowly.',
    icon: 'body-outline',
  },
  {
    id: 'paschimottanasana',
    title: 'Seated Forward Fold',
    sanskrit: 'Paschimottanasana',
    duration: '30–60 sec',
    level: 'Gentle Stretch',
    benefits: 'Deep physical relaxation, calming the nervous system, and gentle stretching',
    instructions: 'Sit with your legs extended. Slowly fold forward from your hips. Don\'t force yourself to touch your toes.',
    icon: 'fitness-outline',
  },
  {
    id: 'setu_bandhasana',
    title: 'Bridge Pose',
    sanskrit: 'Setu Bandhasana',
    duration: '5–8 reps',
    level: 'Beginner',
    benefits: 'Releasing tension, opening chest & spine, and improving body awareness',
    instructions: 'Lie on your back with knees bent and feet on the floor. Lift your hips gently. Hold for a few breaths and slowly release. Repeat: 5–8 times.',
    icon: 'pulse-outline',
  },
];

export default function YogaScreen({ navigation }: any) {
  const [activePose, setActivePose] = useState<YogaPose>(YOGA_POSES[0]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Yoga Practice" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#EDE9FE', '#FCE7F3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="fitness-outline" size={13} color="#6D28D9" />
              <Text style={styles.badgeText}>Restorative Sequences</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Mindful Yoga Postures</Text>
          <Text style={styles.bannerSubtitle}>
            Restorative yoga postures to release somatic tension, cultivate physical balance, and quiet mental turbulence.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Active Pose Detailed Card */}
          {activePose && (
            <View style={styles.activeCard}>
              <View style={styles.badgeRow}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>{activePose.level}</Text>
                </View>
                <View style={styles.durationBadge}>
                  <Ionicons name="time-outline" size={12} color="#64748B" style={{ marginRight: 4 }} />
                  <Text style={styles.durationText}>{activePose.duration}</Text>
                </View>
              </View>

              <Text style={styles.activeTitle}>{activePose.title}</Text>
              <Text style={styles.activeSanskrit}>{activePose.sanskrit}</Text>

              <View style={styles.benefitBox}>
                <Ionicons name="sparkles-outline" size={15} color="#0D9488" style={{ marginTop: 2, marginRight: 8 }} />
                <Text style={styles.benefitText}>{activePose.benefits}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.instructionsHeaderRow}>
                <Ionicons name="list-outline" size={16} color="#0F172A" style={{ marginRight: 6 }} />
                <Text style={styles.instructionsHeader}>Step-by-Step Guidance</Text>
              </View>
              <Text style={styles.instructionsBody}>{activePose.instructions}</Text>
            </View>
          )}

          {/* Pose Selector List */}
          <Text style={styles.sectionHeading}>Explore Postures</Text>

          {YOGA_POSES.map((pose) => {
            const isSelected = activePose.id === pose.id;
            return (
              <TouchableOpacity
                key={pose.id}
                style={[styles.poseCard, isSelected && styles.poseCardActive]}
                onPress={() => setActivePose(pose)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.poseIconBox,
                    { backgroundColor: isSelected ? '#EDE9FE' : '#FAF9F6' },
                  ]}
                >
                  <Ionicons
                    name={pose.icon}
                    size={22}
                    color={isSelected ? '#6D28D9' : '#64748B'}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.poseItemTitle}>{pose.title}</Text>
                  <View style={styles.poseMetaRow}>
                    <Text style={styles.poseMetaText}>{pose.sanskrit}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.poseMetaText}>{pose.duration}</Text>
                  </View>
                </View>

                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'chevron-forward'}
                  size={20}
                  color={isSelected ? '#6D28D9' : '#CBD5E1'}
                />
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
    paddingBottom: 36,
  },
  banner: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6D28D9',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
  },
  content: {
    padding: 18,
  },
  activeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  levelBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  levelBadgeText: {
    color: '#6D28D9',
    fontSize: 11,
    fontWeight: '700',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  durationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  activeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
  },
  activeSanskrit: {
    fontSize: 13,
    color: '#6D28D9',
    fontWeight: '600',
    marginBottom: 12,
  },
  benefitBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  benefitText: {
    flex: 1,
    fontSize: 12,
    color: '#0D9488',
    lineHeight: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  instructionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  instructionsHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  instructionsBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  poseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  poseCardActive: {
    borderColor: '#6D28D9',
    backgroundColor: '#FBFBFE',
  },
  poseIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poseItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  poseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  poseMetaText: {
    fontSize: 12,
    color: '#64748B',
  },
  metaDot: {
    color: '#94A3B8',
    marginHorizontal: 6,
    fontSize: 10,
  },
});
