import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

export interface MemeItem {
  id: string;
  number: number;
  theme: string;
  quote: string;
  authorNote?: string;
  category: 'Daily Life' | 'Self-Care' | 'Animals & Chill' | 'Tech & Study';
  icon: keyof typeof Ionicons.glyphMap;
  tagColor: string;
  tagBg: string;
  imageUrl?: string;
}

export const WHOLESOME_MEMES: MemeItem[] = [
  {
    id: 'm1',
    number: 1,
    theme: 'Sleep vs Responsibilities',
    quote: '“My bed: Stay.\nMy responsibilities: You have 7 minutes.”',
    category: 'Daily Life',
    icon: 'bed-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm2',
    number: 2,
    theme: 'Coffee Therapy',
    quote: '“Me solving all my problems after one sip of coffee.”',
    category: 'Daily Life',
    icon: 'cafe-outline',
    tagColor: '#D97706',
    tagBg: '#FEF3C7',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm3',
    number: 3,
    theme: '5-Minute Break',
    quote: '“I’ll just scroll for 5 minutes.”\n— 2 hours later',
    category: 'Daily Life',
    icon: 'phone-portrait-outline',
    tagColor: '#6D28D9',
    tagBg: '#EDE9FE',
    imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm4',
    number: 4,
    theme: 'Overthinking',
    quote: '“Me: Don’t overthink it.\nAlso me: Let’s analyze that conversation from 2017.”',
    category: 'Self-Care',
    icon: 'infinite-outline',
    tagColor: '#BE123C',
    tagBg: '#FFE4E6',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm5',
    number: 5,
    theme: 'Productivity',
    quote: '“Today I’m going to be productive.”\n*takes a motivational nap*',
    category: 'Daily Life',
    icon: 'alarm-outline',
    tagColor: '#0D9488',
    tagBg: '#DCFCE7',
    imageUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm6',
    number: 6,
    theme: 'Food = Happiness',
    quote: '“Some problems require therapy. Some require pizza.”',
    category: 'Daily Life',
    icon: 'pizza-outline',
    tagColor: '#EA580C',
    tagBg: '#FFEDD5',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm7',
    number: 7,
    theme: 'Cat Wisdom',
    quote: '“The cat has no deadlines. Be like the cat.”',
    category: 'Animals & Chill',
    icon: 'paw-outline',
    tagColor: '#0D9488',
    tagBg: '#DCFCE7',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm8',
    number: 8,
    theme: 'Dog Energy',
    quote: '“No idea what’s happening. Still excited!”',
    category: 'Animals & Chill',
    icon: 'happy-outline',
    tagColor: '#D97706',
    tagBg: '#FEF3C7',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm9',
    number: 9,
    theme: 'Trying to Meditate',
    quote: '“Me: Empty your mind.\nMy brain: Remember that embarrassing thing from 8 years ago?”',
    category: 'Self-Care',
    icon: 'leaf-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm10',
    number: 10,
    theme: 'Student Life',
    quote: '“I came to college to learn. College taught me how to survive on 4 hours of sleep.”',
    category: 'Tech & Study',
    icon: 'school-outline',
    tagColor: '#6D28D9',
    tagBg: '#EDE9FE',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm11',
    number: 11,
    theme: 'Coding Truth',
    quote: '“Code works perfectly on first run.\nRULE #1: Don’t touch it.”',
    category: 'Tech & Study',
    icon: 'code-slash-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm12',
    number: 12,
    theme: 'Debugging Cycle',
    quote: '“I fixed one small bug and accidentally created three brand new ones.”',
    category: 'Tech & Study',
    icon: 'bug-outline',
    tagColor: '#BE123C',
    tagBg: '#FFE4E6',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm13',
    number: 13,
    theme: 'Rain Mood',
    quote: '“Rain outside. Blanket inside. Responsibilities ignored.”',
    category: 'Self-Care',
    icon: 'rainy-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm14',
    number: 14,
    theme: 'Music Therapy',
    quote: '“One sad song later and suddenly I’m starring in an indie movie.”',
    category: 'Daily Life',
    icon: 'musical-notes-outline',
    tagColor: '#DB2777',
    tagBg: '#FCE7F3',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm15',
    number: 15,
    theme: 'Instant Noodles',
    quote: '“My master culinary skills: boil water successfully without setting off the smoke detector.”',
    category: 'Daily Life',
    icon: 'restaurant-outline',
    tagColor: '#EA580C',
    tagBg: '#FFEDD5',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm16',
    number: 16,
    theme: 'Adulting Reality',
    quote: '“Nobody prepared me for how expensive simply existing would turn out to be.”',
    category: 'Daily Life',
    icon: 'wallet-outline',
    tagColor: '#6D28D9',
    tagBg: '#EDE9FE',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm17',
    number: 17,
    theme: 'Bank Balance',
    quote: '“My bank account and I are currently taking some personal space.”',
    category: 'Daily Life',
    icon: 'card-outline',
    tagColor: '#0D9488',
    tagBg: '#CCFBF1',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm18',
    number: 18,
    theme: 'Brain at Night',
    quote: '“12 PM: I’m exhausted.\n12 AM: Let’s rethink every life decision made since 2010.”',
    category: 'Self-Care',
    icon: 'moon-outline',
    tagColor: '#6366F1',
    tagBg: '#EDE9FE',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm19',
    number: 19,
    theme: 'Exam Motivation',
    quote: '“Opened the textbook. Read the title page. Deserve a 40-minute break.”',
    category: 'Tech & Study',
    icon: 'book-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm20',
    number: 20,
    theme: 'Bubble Wrap Healing',
    quote: '“Therapy is expensive.\nBubble wrap truly understands me.”',
    category: 'Self-Care',
    icon: 'apps-outline',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm21',
    number: 21,
    theme: 'Small Wins',
    quote: '“Drank water today.\nHonestly? I’m basically thriving at this point.”',
    category: 'Self-Care',
    icon: 'water-outline',
    tagColor: '#16A34A',
    tagBg: '#DCFCE7',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm22',
    number: 22,
    theme: 'Cleaning Motivation',
    quote: '“Clean room, clean mind.\nStep 1: Look at the clutter.\nStep 2: Take a nap instead.”',
    category: 'Daily Life',
    icon: 'sparkles-outline',
    tagColor: '#D97706',
    tagBg: '#FEF3C7',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm23',
    number: 23,
    theme: 'Doing Nothing',
    quote: '“Today’s greatest achievement: absolutely nothing, but I executed it with remarkable efficiency.”',
    category: 'Self-Care',
    icon: 'cloud-outline',
    tagColor: '#64748B',
    tagBg: '#F1F5F9',
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm24',
    number: 24,
    theme: 'Social Battery',
    quote: '“My social battery: 100% → 3% after saying a simple hello.”',
    category: 'Self-Care',
    icon: 'battery-charging-outline',
    tagColor: '#E11D48',
    tagBg: '#FFE4E6',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'm25',
    number: 25,
    theme: 'Gentle Self-Care',
    quote: '“Gentle Reminder:\nYou don’t have to have everything figured out today.”',
    category: 'Self-Care',
    icon: 'heart-outline',
    tagColor: '#DB2777',
    tagBg: '#FCE7F3',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  },
];

export default function MemesScreen({ navigation }: any) {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spotlightMeme, setSpotlightMeme] = useState<MemeItem | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedLikes = await AsyncStorage.getItem('moodverse_meme_likes');
      const savedBookmarks = await AsyncStorage.getItem('moodverse_saved_memes');
      if (savedLikes) setLikes(JSON.parse(savedLikes));
      if (savedBookmarks) setSaved(JSON.parse(savedBookmarks));
    } catch (e) {
      console.warn('Failed to load meme storage', e);
    }
  };

  const toggleLike = async (id: string) => {
    const current = likes[id] || 0;
    const updated = { ...likes, [id]: current + 1 };
    setLikes(updated);
    try {
      await AsyncStorage.setItem('moodverse_meme_likes', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleBookmark = async (id: string) => {
    const updated = { ...saved, [id]: !saved[id] };
    setSaved(updated);
    try {
      await AsyncStorage.setItem('moodverse_saved_memes', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const shareMeme = async (meme: MemeItem) => {
    try {
      await Share.share({
        message: `${meme.theme}: ${meme.quote} — Shared from Moodverse Wholesome Corner`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSurpriseMe = () => {
    const randomPick = WHOLESOME_MEMES[Math.floor(Math.random() * WHOLESOME_MEMES.length)];
    setSpotlightMeme(randomPick);
  };

  const categories = ['All', 'Saved', 'Daily Life', 'Self-Care', 'Animals & Chill', 'Tech & Study'];

  const filteredMemes = useMemo(() => {
    let list = WHOLESOME_MEMES;

    if (selectedCategory === 'Saved') {
      list = list.filter((m) => saved[m.id]);
    } else if (selectedCategory !== 'All') {
      list = list.filter((m) => m.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.theme.toLowerCase().includes(q) ||
          m.quote.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery, saved]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Wholesome Memes" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#FCE7F3', '#FEF3C7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={13} color="#DB2777" />
              <Text style={styles.badgeText}>25 Wholesome Memes</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="heart-outline" size={13} color="#E11D48" />
              <Text style={[styles.badgeText, { color: '#E11D48' }]}>Dopamine Boosters</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Wholesome Meme Corner</Text>
          <Text style={styles.bannerSubtitle}>
            Gentle humor, relatable truths, and uplifting reminders to soften life's pressures and spark genuine smiles.
          </Text>

          {/* Surprise Me Generator */}
          <TouchableOpacity
            style={styles.surpriseBtn}
            onPress={handleSurpriseMe}
            activeOpacity={0.85}
          >
            <Ionicons name="shuffle-outline" size={16} color="#FFFFFF" />
            <Text style={styles.surpriseBtnText}>Surprise Me with a Smile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.content}>
          {/* Spotlight Modal / Box if triggered */}
          {spotlightMeme && (
            <View style={styles.spotlightCard}>
              <View style={styles.spotlightHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="sunny-outline" size={16} color="#D97706" />
                  <Text style={styles.spotlightBadge}>SURPRISE SMILE OF THE MOMENT</Text>
                </View>
                <TouchableOpacity onPress={() => setSpotlightMeme(null)}>
                  <Ionicons name="close-circle-outline" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <Text style={styles.spotlightTheme}>
                #{spotlightMeme.number} {spotlightMeme.theme}
              </Text>
              <Text style={styles.spotlightQuote}>{spotlightMeme.quote}</Text>

              <View style={styles.memeActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => toggleLike(spotlightMeme.id)}
                >
                  <Ionicons name="heart" size={16} color="#E11D48" />
                  <Text style={styles.actionText}>{likes[spotlightMeme.id] || 0} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => shareMeme(spotlightMeme)}
                >
                  <Ionicons name="share-social-outline" size={16} color="#0284C7" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Search Box */}
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search memes by theme or quote..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Memes Feed */}
          {filteredMemes.map((meme) => {
            const isLiked = (likes[meme.id] || 0) > 0;
            const isBookmarked = !!saved[meme.id];

            return (
              <View key={meme.id} style={styles.memeCard}>
                {/* Header Tag */}
                <View style={styles.memeCardHeader}>
                  <View style={[styles.themeBadge, { backgroundColor: meme.tagBg }]}>
                    <Ionicons name={meme.icon} size={14} color={meme.tagColor} style={{ marginRight: 4 }} />
                    <Text style={[styles.themeBadgeText, { color: meme.tagColor }]}>
                      #{meme.number} {meme.theme}
                    </Text>
                  </View>
                  <View style={styles.categoryPill}>
                    <Text style={styles.categoryPillText}>{meme.category}</Text>
                  </View>
                </View>

                {/* Optional Image */}
                {meme.imageUrl && (
                  <Image
                    source={{ uri: meme.imageUrl }}
                    style={styles.memeImage}
                    resizeMode="cover"
                  />
                )}

                {/* Quote Punchline */}
                <View style={styles.quoteBox}>
                  <Text style={styles.memeQuoteText}>{meme.quote}</Text>
                </View>

                {/* Bottom Actions Bar */}
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={[styles.actionBtn, isLiked && styles.actionBtnActive]}
                    onPress={() => toggleLike(meme.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={18}
                      color={isLiked ? '#E11D48' : '#64748B'}
                    />
                    <Text style={[styles.actionText, isLiked && { color: '#E11D48', fontWeight: '700' }]}>
                      {likes[meme.id] || 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, isBookmarked && styles.actionBtnActive]}
                    onPress={() => toggleBookmark(meme.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                      size={17}
                      color={isBookmarked ? '#0284C7' : '#64748B'}
                    />
                    <Text style={[styles.actionText, isBookmarked && { color: '#0284C7', fontWeight: '700' }]}>
                      {isBookmarked ? 'Saved' : 'Save'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => shareMeme(meme)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="share-social-outline" size={17} color="#64748B" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {filteredMemes.length === 0 && (
            <View style={styles.emptyBox}>
              <Ionicons name="sparkles-outline" size={40} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No memes in this view</Text>
              <Text style={styles.emptySub}>
                {selectedCategory === 'Saved'
                  ? 'Tap the bookmark icon on any meme to save it here.'
                  : 'Try selecting another category or clearing search.'}
              </Text>
            </View>
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
    paddingBottom: 32,
  },
  banner: {
    padding: 22,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(219, 39, 119, 0.15)',
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
    borderColor: '#FBCFE8',
  },
  badgeText: {
    color: '#DB2777',
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
    marginBottom: 16,
  },
  surpriseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DB2777',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 14,
    shadowColor: '#DB2777',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: 'flex-start',
  },
  surpriseBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  spotlightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: 16,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  spotlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spotlightBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  spotlightTheme: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  spotlightQuote: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  memeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  categoryScroll: {
    marginBottom: 14,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#DB2777',
    borderColor: '#DB2777',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  memeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  memeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  themeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  themeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  categoryPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  memeImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#FAF9F6',
  },
  quoteBox: {
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  memeQuoteText: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 21,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  actionBtnActive: {
    backgroundColor: '#F8FAFC',
  },
  actionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
