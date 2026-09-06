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

const MOODS = [
  { id: 'happy', icon: 'sunny-outline' as const, label: 'Happy', color: '#0D9488', bg: '#DCFCE7' },
  { id: 'calm', icon: 'leaf-outline' as const, label: 'Calm', color: '#0284C7', bg: '#E0F2FE' },
  { id: 'anxious', icon: 'pulse-outline' as const, label: 'Anxious', color: '#D97706', bg: '#FEF3C7' },
  { id: 'sad', icon: 'rainy-outline' as const, label: 'Sad', color: '#6366F1', bg: '#EDE9FE' },
  { id: 'energetic', icon: 'flash-outline' as const, label: 'Energetic', color: '#E11D48', bg: '#FFE4E6' },
];

export default function HomeScreen({ navigation }: any) {
  const [selectedMood, setSelectedMood] = useState<string | null>('calm');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header with Organized Menu Button */}
      <AppHeader navigation={navigation} title="Moodverse" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Serene Pastel Hero Header */}
        <LinearGradient
          colors={['#E0F2FE', '#EDE9FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles-outline" size={14} color="#0284C7" />
              <Text style={styles.heroBadgeText}>AI Wellness Sanctuary</Text>
            </View>
            <View style={styles.userBadge}>
              <Ionicons name="person-circle-outline" size={18} color="#0284C7" />
              <Text style={styles.userBadgeText}>Semala</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Your Peaceful AI Wellness Companion</Text>
          <Text style={styles.heroSubtitle}>
            Privacy-first emotional support, interactive meditation, restorative yoga, and 3D VR rooms.
          </Text>

          <TouchableOpacity
            style={styles.heroCta}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MoodScanner')}
          >
            <Ionicons name="scan-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.heroCtaText}>Start AI Mood Scan</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Mood Check-in (Zero Emojis, Pure Google Icons) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodRow}>
            {MOODS.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.moodCard,
                    { backgroundColor: isSelected ? m.bg : '#FFFFFF' },
                    isSelected && { borderColor: m.color, borderWidth: 1.5 },
                  ]}
                  onPress={() => setSelectedMood(m.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.moodIconCircle, { backgroundColor: isSelected ? '#FFFFFF' : m.bg }]}>
                    <Ionicons name={m.icon} size={22} color={m.color} />
                  </View>
                  <Text style={[styles.moodLabel, isSelected && { color: m.color, fontWeight: '700' }]}>
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Explore Wellness Hub */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explore Wellness Hub</Text>

          <View style={styles.grid}>
            {/* Mood Scanner Card */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('MoodScanner')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="scan-outline" size={24} color="#0D9488" />
              </View>
              <Text style={styles.cardTitle}>AI Mood Scanner</Text>
              <Text style={styles.cardDesc}>Instant facial emotion & mood state analysis</Text>
            </TouchableOpacity>

            {/* Meditation Card */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Meditation')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="leaf-outline" size={24} color="#0284C7" />
              </View>
              <Text style={styles.cardTitle}>Meditation</Text>
              <Text style={styles.cardDesc}>Guided sessions & breathing visualizer</Text>
            </TouchableOpacity>

            {/* Yoga Card */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Yoga')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="fitness-outline" size={24} color="#6D28D9" />
              </View>
              <Text style={styles.cardTitle}>Yoga Sessions</Text>
              <Text style={styles.cardDesc}>Mindful restorative poses for body & balance</Text>
            </TouchableOpacity>

            {/* VR Rooms Card */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('VrRooms')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="glasses-outline" size={24} color="#0284C7" />
              </View>
              <Text style={styles.cardTitle}>3D VR Rooms</Text>
              <Text style={styles.cardDesc}>Immersive virtual relaxation environments</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mindful Boosters & Play */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mindful Boosters & Play</Text>

          <View style={styles.grid}>
            {/* Mindful Games Studio */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Games')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="game-controller-outline" size={24} color="#D97706" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={styles.cardTitle}>Games Studio</Text>
                <View style={[styles.pillBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.pillBadgeText, { color: '#B45309' }]}>5 CALM</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>Tension bubble pop, piano, garden & zen match</Text>
            </TouchableOpacity>

            {/* Wholesome Memes */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Memes')}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FCE7F3' }]}>
                <Ionicons name="sparkles-outline" size={24} color="#DB2777" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={styles.cardTitle}>Meme Corner</Text>
                <View style={[styles.pillBadge, { backgroundColor: '#FCE7F3' }]}>
                  <Text style={[styles.pillBadgeText, { color: '#BE185D' }]}>BOOST</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>Curated mood-lifting humor, smiles & positivity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Affirmation Card */}
        <View style={styles.affirmationCard}>
          <View style={styles.affirmationInner}>
            <Ionicons name="sparkles-outline" size={24} color="#0284C7" style={{ marginBottom: 8 }} />
            <Text style={styles.quoteText}>
              "Peace comes from within. You are stronger than your worries, and every breath is a fresh beginning."
            </Text>
            <Text style={styles.quoteAuthor}>— Daily Moodverse Insight</Text>
          </View>
        </View>

        {/* Emergency Helpline Card */}
        <TouchableOpacity
          style={styles.emergencyCard}
          onPress={() => navigation.navigate('Contact')}
          activeOpacity={0.8}
        >
          <View style={styles.emergencyRow}>
            <View style={styles.emergencyIconBox}>
              <Ionicons name="call-outline" size={20} color="#BE123C" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.emergencyTitle}>24/7 Crisis Support Helplines</Text>
              <Text style={styles.emergencySubtitle}>Lifeline 988 • Text HOME to 741741</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </View>
        </TouchableOpacity>
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
    paddingBottom: 28,
  },
  heroBanner: {
    padding: 22,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(2, 132, 199, 0.15)',
  },
  heroBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  heroBadgeText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userBadgeText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 18,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: 'flex-start',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  heroCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
  },
  moodCard: {
    width: 80,
    height: 94,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  moodIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  affirmationCard: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  affirmationInner: {
    padding: 18,
    alignItems: 'center',
    textAlign: 'center',
  },
  quoteText: {
    color: '#0F172A',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
  },
  emergencyCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFE4E6',
    borderWidth: 1,
    borderColor: '#FECDD3',
    borderRadius: 16,
    padding: 14,
  },
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#BE123C',
  },
  emergencySubtitle: {
    fontSize: 11,
    color: '#9F1239',
    marginTop: 2,
  },
  pillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pillBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
