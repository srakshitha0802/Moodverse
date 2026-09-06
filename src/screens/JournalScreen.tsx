import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

interface JournalMoodOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

const MOOD_TAGS: JournalMoodOption[] = [
  { id: 'calm', label: 'Calm', icon: 'leaf-outline', color: '#0284C7', bg: '#E0F2FE' },
  { id: 'grateful', label: 'Grateful', icon: 'sunny-outline', color: '#0D9488', bg: '#DCFCE7' },
  { id: 'reflective', label: 'Reflective', icon: 'water-outline', color: '#6366F1', bg: '#EDE9FE' },
  { id: 'anxious', label: 'Unsettled', icon: 'pulse-outline', color: '#D97706', bg: '#FEF3C7' },
];

export default function JournalScreen({ navigation }: any) {
  const [entries, setEntries] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalMoodOption>(MOOD_TAGS[0]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem('moodverse_journal');
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveEntry = async () => {
    if (!content.trim()) {
      Alert.alert('Empty Reflection', 'Please write your thoughts before saving.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      title: title.trim() || 'Daily Reflection',
      content: content.trim(),
      moodLabel: selectedMood.label,
      moodIcon: selectedMood.icon,
      moodColor: selectedMood.color,
      moodBg: selectedMood.bg,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    setTitle('');
    setContent('');

    try {
      await AsyncStorage.setItem('moodverse_journal', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEntry = async (id: string) => {
    const updated = entries.filter((item) => item.id !== id);
    setEntries(updated);
    try {
      await AsyncStorage.setItem('moodverse_journal', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Emotional Journal" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#EDE9FE', '#E0F2FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="journal-outline" size={13} color="#6366F1" />
              <Text style={styles.badgeText}>Private Local Vault</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Emotional Journal</Text>
          <Text style={styles.bannerSubtitle}>
            Express your innermost thoughts, log mental state reflections, and track your wellbeing progress safely.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* New Entry Card */}
          <View style={styles.inputCard}>
            <Text style={styles.inputCardTitle}>Write a Reflection</Text>

            {/* Mood selector pills */}
            <View style={styles.moodSelectorRow}>
              {MOOD_TAGS.map((m) => {
                const isSelected = selectedMood.id === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[
                      styles.moodPill,
                      isSelected && { backgroundColor: m.bg, borderColor: m.color },
                    ]}
                    onPress={() => setSelectedMood(m)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={m.icon}
                      size={14}
                      color={isSelected ? m.color : '#64748B'}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.moodPillText,
                        isSelected && { color: m.color, fontWeight: '700' },
                      ]}
                    >
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="Title (e.g., Evening Gratitude...)"
              placeholderTextColor="#94A3B8"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="How are you feeling today? Write your honest thoughts..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={content}
              onChangeText={setContent}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveEntry} activeOpacity={0.85}>
              <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.saveBtnText}>Save Reflection</Text>
            </TouchableOpacity>
          </View>

          {/* Past Entries */}
          <Text style={styles.sectionHeading}>
            Saved Reflections ({entries.length})
          </Text>

          {entries.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconBox}>
                <Ionicons name="document-text-outline" size={26} color="#6366F1" />
              </View>
              <Text style={styles.emptyTitle}>No Entries Recorded Yet</Text>
              <Text style={styles.emptySub}>
                Your thoughts stay safely stored on this device. Create your first reflection above.
              </Text>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <View style={styles.entryMetaRow}>
                      <Text style={styles.entryDate}>{entry.date}</Text>
                      {entry.moodLabel && (
                        <View
                          style={[
                            styles.entryMoodBadge,
                            { backgroundColor: entry.moodBg || '#EDE9FE' },
                          ]}
                        >
                          <Ionicons
                            name={entry.moodIcon || 'leaf-outline'}
                            size={11}
                            color={entry.moodColor || '#6366F1'}
                            style={{ marginRight: 3 }}
                          />
                          <Text
                            style={[
                              styles.entryMoodText,
                              { color: entry.moodColor || '#6366F1' },
                            ]}
                          >
                            {entry.moodLabel}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteEntry(entry.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color="#E11D48" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.entryBody}>{entry.content}</Text>
              </View>
            ))
          )}
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
    color: '#6366F1',
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
  inputCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  inputCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  moodSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  moodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  moodPillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  titleInput: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 10,
  },
  contentInput: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 14,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 17,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  entryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  entryDate: {
    fontSize: 11,
    color: '#64748B',
  },
  entryMoodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  entryMoodText: {
    fontSize: 10,
    fontWeight: '700',
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FFF1F2',
  },
  entryBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
});
