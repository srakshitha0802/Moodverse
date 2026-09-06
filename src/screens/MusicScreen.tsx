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

interface Track {
  id: number;
  title: string;
  duration: string;
  mood: string;
  frequency: string;
  color: string;
  bg: string;
}

const PLAYLISTS: Track[] = [
  {
    id: 1,
    title: 'Gentle Rain & Distant Thunder',
    duration: '60 min',
    mood: 'Deep Sleep & Rest',
    frequency: 'Pink Noise',
    color: '#0284C7',
    bg: '#E0F2FE',
  },
  {
    id: 2,
    title: 'Alpha Brainwave Concentration',
    duration: '45 min',
    mood: 'Cognitive Focus & Flow',
    frequency: '10Hz Alpha',
    color: '#6D28D9',
    bg: '#EDE9FE',
  },
  {
    id: 3,
    title: 'Pine Forest Stream & Songbirds',
    duration: '30 min',
    mood: 'Nature Grounding',
    frequency: 'Organic 432Hz',
    color: '#0D9488',
    bg: '#DCFCE7',
  },
  {
    id: 4,
    title: 'Binaural Cellular Harmonic',
    duration: '50 min',
    mood: 'Anxiety Release',
    frequency: '528Hz Miracle Tone',
    color: '#D97706',
    bg: '#FEF3C7',
  },
];

export default function MusicScreen({ navigation }: any) {
  const [playingId, setPlayingId] = useState<number | null>(1);

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Calming Audio" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#E0F2FE', '#EDE9FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="musical-notes-outline" size={13} color="#0284C7" />
              <Text style={styles.badgeText}>Acoustic Therapy</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Calming Soundscapes</Text>
          <Text style={styles.bannerSubtitle}>
            Immersive natural atmospheres, pink noise, and scientific binaural frequencies to restore neurological harmony.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionHeading}>Therapeutic Audio Tracks</Text>

          {PLAYLISTS.map((item) => {
            const isPlaying = playingId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.trackCard,
                  isPlaying && { borderColor: item.color, backgroundColor: '#F8FAFC' },
                ]}
                onPress={() => togglePlay(item.id)}
                activeOpacity={0.75}
              >
                <View style={[styles.playBox, { backgroundColor: item.bg }]}>
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={20}
                    color={item.color}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.trackTitle}>{item.title}</Text>
                  <View style={styles.trackMetaRow}>
                    <Text style={styles.trackMood}>{item.mood}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.trackDuration}>{item.duration}</Text>
                  </View>
                  <Text style={styles.trackFreq}>{item.frequency}</Text>
                </View>

                {isPlaying && (
                  <View style={[styles.playingBadge, { backgroundColor: item.bg }]}>
                    <Ionicons name="pulse-outline" size={12} color={item.color} style={{ marginRight: 3 }} />
                    <Text style={[styles.playingText, { color: item.color }]}>Playing</Text>
                  </View>
                )}
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
    color: '#0284C7',
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
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  playBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  trackMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  trackMood: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  metaDot: {
    color: '#94A3B8',
    marginHorizontal: 5,
    fontSize: 10,
  },
  trackDuration: {
    fontSize: 11,
    color: '#64748B',
  },
  trackFreq: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  playingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  playingText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
