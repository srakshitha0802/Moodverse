import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: 'Anxiety' | 'Stress' | 'Peace' | 'Happiness' | 'Low Mood' | 'Self-Love' | 'Growth';
  isFeatured?: boolean;
  rating: string;
  summary: string;
  tagBg: string;
  tagColor: string;
}

export const WELLNESS_BOOKS: BookItem[] = [
  // Top 10 Featured & Core Collection
  {
    id: 'b1',
    title: 'Why Has Nobody Told Me This Before?',
    author: 'Dr. Julie Smith',
    category: 'Anxiety',
    isFeatured: true,
    rating: '4.9',
    summary: 'Essential psychological toolkits for calming anxiety, emotional regulation, and sustainable resilience.',
    tagBg: '#FFE4E6',
    tagColor: '#BE123C',
  },
  {
    id: 'b2',
    title: 'The Anxiety and Phobia Workbook',
    author: 'Edmund J. Bourne',
    category: 'Anxiety',
    isFeatured: true,
    rating: '4.8',
    summary: 'The gold-standard clinical workbook for overcoming panic, catastrophic thoughts, and somatic worry.',
    tagBg: '#FFE4E6',
    tagColor: '#BE123C',
  },
  {
    id: 'b3',
    title: 'The Miracle of Mindfulness',
    author: 'Thich Nhat Hanh',
    category: 'Peace',
    isFeatured: true,
    rating: '4.9',
    summary: 'A warm, poetic guide on practicing present-moment awareness, gentle breathing, and zen living.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b4',
    title: 'Peace Is Every Step',
    author: 'Thich Nhat Hanh',
    category: 'Peace',
    isFeatured: true,
    rating: '4.9',
    summary: 'Transforming everyday stress into peace through mindful walking, conscious breathing, and inner balance.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b5',
    title: 'The Happiness Trap',
    author: 'Russ Harris',
    category: 'Happiness',
    isFeatured: true,
    rating: '4.8',
    summary: 'Acceptance and Commitment Therapy (ACT) to stop struggling with difficult thoughts and build genuine joy.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },
  {
    id: 'b6',
    title: 'Feeling Good: The New Mood Therapy',
    author: 'David D. Burns',
    category: 'Low Mood',
    isFeatured: true,
    rating: '4.8',
    summary: 'The landmark CBT guide that scientifically teaches how to rewire cognitive distortions and self-criticism.',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
  },
  {
    id: 'b7',
    title: 'The Mindful Way Through Depression',
    author: 'Mark Williams, John Teasdale, Zindel Segal & Jon Kabat-Zinn',
    category: 'Low Mood',
    isFeatured: true,
    rating: '4.7',
    summary: 'Mindfulness-based cognitive therapy to break chronic depressive rumination cycles and restore vitality.',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
  },
  {
    id: 'b8',
    title: 'The Book of Joy',
    author: 'Dalai Lama, Desmond Tutu & Douglas Abrams',
    category: 'Happiness',
    isFeatured: true,
    rating: '4.9',
    summary: 'Two Nobel Peace Prize laureates share lasting joy, deep humor, and emotional courage amid adversity.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },
  {
    id: 'b9',
    title: 'Self-Compassion',
    author: 'Dr. Kristin Neff',
    category: 'Self-Love',
    isFeatured: true,
    rating: '4.9',
    summary: 'The proven power of being kind to yourself, dissolving harsh internal judgment and shame.',
    tagBg: '#FCE7F3',
    tagColor: '#DB2777',
  },
  {
    id: 'b10',
    title: 'The Upward Spiral',
    author: 'Alex Korb, PhD',
    category: 'Low Mood',
    isFeatured: true,
    rating: '4.8',
    summary: 'Using neuroscience to reverse the course of depression one small daily neurochemical shift at a time.',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
  },

  // Additional Stress & Anxiety
  {
    id: 'b11',
    title: 'Hope and Help for Your Nerves',
    author: 'Dr. Claire Weekes',
    category: 'Stress',
    rating: '4.8',
    summary: 'Pioneering calm techniques on facing, accepting, floating past, and letting time pass during nervous episodes.',
    tagBg: '#FFE4E6',
    tagColor: '#BE123C',
  },
  {
    id: 'b12',
    title: 'Unwinding Anxiety',
    author: 'Dr. Judson Brewer',
    category: 'Anxiety',
    rating: '4.7',
    summary: 'New science showing how to break the habit loops of worry, overthinking, and fear-based avoidance.',
    tagBg: '#FFE4E6',
    tagColor: '#BE123C',
  },
  {
    id: 'b13',
    title: 'The Relaxation and Stress Reduction Workbook',
    author: 'Martha Davis, Matthew McKay & Elizabeth Eshelman',
    category: 'Stress',
    rating: '4.7',
    summary: 'Comprehensive step-by-step techniques for diaphragmatic breathing, progressive relaxation, and biofeedback.',
    tagBg: '#E0F2FE',
    tagColor: '#0284C7',
  },
  {
    id: 'b14',
    title: 'The Worry Trick',
    author: 'David A. Carbonell',
    category: 'Anxiety',
    rating: '4.7',
    summary: 'How your brain tricks you into expecting the worst, and how CBT can free you from the endless worry spiral.',
    tagBg: '#FFE4E6',
    tagColor: '#BE123C',
  },

  // Peace & Mindfulness
  {
    id: 'b15',
    title: 'Wherever You Go, There You Are',
    author: 'Jon Kabat-Zinn',
    category: 'Peace',
    rating: '4.8',
    summary: 'Warm, accessible daily mindfulness meditation practices from the founder of MBSR.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b16',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    category: 'Peace',
    rating: '4.8',
    summary: 'A spiritual guide to shedding mental clutter, stepping out of anxiety over past and future into the present.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b17',
    title: 'A New Earth',
    author: 'Eckhart Tolle',
    category: 'Peace',
    rating: '4.8',
    summary: 'Transcending ego-based states of consciousness to experience profound inner stillness and unity.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b18',
    title: 'Radical Acceptance',
    author: 'Tara Brach',
    category: 'Self-Love',
    rating: '4.8',
    summary: 'Embracing your life and imperfections with the heart of a Buddha, healing feelings of unworthiness.',
    tagBg: '#FCE7F3',
    tagColor: '#DB2777',
  },
  {
    id: 'b19',
    title: 'Real Happiness',
    author: 'Sharon Salzberg',
    category: 'Happiness',
    rating: '4.7',
    summary: 'A 28-day meditation program to cultivate loving-kindness, concentration, and emotional resilience.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },

  // Happiness & Positive Thinking
  {
    id: 'b20',
    title: 'The How of Happiness',
    author: 'Sonja Lyubomirsky',
    category: 'Happiness',
    rating: '4.7',
    summary: 'A scientific approach to getting the life you want, detailing evidence-based strategies for lasting joy.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },
  {
    id: 'b21',
    title: 'The Happiness Project',
    author: 'Gretchen Rubin',
    category: 'Happiness',
    rating: '4.6',
    summary: 'A year-long journey testing wisdom of the ages and current scientific research on how to be happier.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },
  {
    id: 'b22',
    title: 'The Gifts of Imperfection',
    author: 'Brené Brown',
    category: 'Self-Love',
    rating: '4.9',
    summary: 'Let go of who you think you are supposed to be and embrace who you truly are with wholehearted courage.',
    tagBg: '#FCE7F3',
    tagColor: '#DB2777',
  },
  {
    id: 'b23',
    title: 'The Art of Happiness',
    author: 'Dalai Lama & Howard C. Cutler',
    category: 'Happiness',
    rating: '4.8',
    summary: 'Practical handbook exploring the purpose of life, overcoming anger, and nurturing compassion.',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
  },

  // Depression & Difficulties
  {
    id: 'b24',
    title: 'Reasons to Stay Alive',
    author: 'Matt Haig',
    category: 'Low Mood',
    rating: '4.8',
    summary: 'A moving, hopeful personal memoir on surviving depression and anxiety, and finding joy in existence.',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
  },
  {
    id: 'b25',
    title: 'The Noonday Demon',
    author: 'Andrew Solomon',
    category: 'Low Mood',
    rating: '4.7',
    summary: 'An acclaimed, deeply compassionate investigation into the clinical, cultural, and personal anatomy of depression.',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
  },

  // Self-Growth & Inner Calm
  {
    id: 'b26',
    title: 'Man’s Search for Meaning',
    author: 'Viktor E. Frankl',
    category: 'Growth',
    rating: '4.9',
    summary: 'Logotherapy and the profound triumph of the human spirit: finding purpose even in the darkest circumstances.',
    tagBg: '#E0F2FE',
    tagColor: '#0284C7',
  },
  {
    id: 'b27',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    category: 'Growth',
    rating: '4.8',
    summary: 'Timeless Stoic reflections on equanimity, duty, emotional self-mastery, and perspective.',
    tagBg: '#E0F2FE',
    tagColor: '#0284C7',
  },
  {
    id: 'b28',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Growth',
    rating: '4.9',
    summary: 'Small incremental habit shifts that compound into transformative mental wellness and emotional health.',
    tagBg: '#DCFCE7',
    tagColor: '#0D9488',
  },
  {
    id: 'b29',
    title: 'The Untethered Soul',
    author: 'Michael A. Singer',
    category: 'Growth',
    rating: '4.8',
    summary: 'Journey beyond yourself to release habitual thoughts, stored emotional blockages, and live in freedom.',
    tagBg: '#E0F2FE',
    tagColor: '#0284C7',
  },
];

export default function BooksScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedBooks, setSavedBooks] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setSavedBooks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    'All',
    '⭐ Top 10 Featured',
    'Anxiety',
    'Stress',
    'Low Mood',
    'Peace',
    'Happiness',
    'Self-Love',
    'Growth',
  ];

  const filteredBooks = useMemo(() => {
    let list = WELLNESS_BOOKS;

    if (selectedCategory === '⭐ Top 10 Featured') {
      list = list.filter((b) => b.isFeatured);
    } else if (selectedCategory !== 'All') {
      list = list.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Wellness Library" />

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
              <Ionicons name="book-outline" size={13} color="#0D9488" />
              <Text style={styles.badgeText}>Psychological Reading Sanctuary</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="star-outline" size={13} color="#D97706" />
              <Text style={[styles.badgeText, { color: '#D97706' }]}>29 Curated Books</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Wellness Reading Library</Text>
          <Text style={styles.bannerSubtitle}>
            Evidence-based cognitive behavioral therapy, mindfulness teachings, and emotional self-compassion literature.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Search Box */}
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title, author, or keyword..."
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

          {/* Category Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => {
              const cleanName = cat.replace('⭐ ', '');
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
                    {cleanName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Section Header */}
          <View style={styles.listHeaderRow}>
            <Text style={styles.sectionHeading}>
              {selectedCategory === '⭐ Top 10 Featured'
                ? '⭐ Top 10 Recommended Books'
                : `${selectedCategory} Books (${filteredBooks.length})`}
            </Text>
          </View>

          {/* Books List */}
          {filteredBooks.map((book) => {
            const isBookmarked = !!savedBooks[book.id];
            return (
              <View key={book.id} style={styles.bookCard}>
                <View style={[styles.bookIconBox, { backgroundColor: book.tagBg }]}>
                  <Ionicons name="book-outline" size={24} color={book.tagColor} />
                </View>

                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.metaRow}>
                    <View style={[styles.categoryBadge, { backgroundColor: book.tagBg }]}>
                      <Text style={[styles.categoryText, { color: book.tagColor }]}>
                        {book.category}
                      </Text>
                    </View>
                    {book.isFeatured && (
                      <View style={styles.featuredBadge}>
                        <Ionicons name="star" size={10} color="#D97706" style={{ marginRight: 3 }} />
                        <Text style={styles.featuredText}>TOP 10</Text>
                      </View>
                    )}
                    <View style={styles.ratingBox}>
                      <Ionicons name="star" size={11} color="#F59E0B" style={{ marginRight: 3 }} />
                      <Text style={styles.ratingText}>{book.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>by {book.author}</Text>
                  <Text style={styles.bookSummary}>{book.summary}</Text>

                  <View style={styles.cardActionsRow}>
                    <TouchableOpacity
                      style={[styles.bookmarkBtn, isBookmarked && styles.bookmarkBtnActive]}
                      onPress={() => toggleBookmark(book.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={14}
                        color={isBookmarked ? '#0284C7' : '#64748B'}
                      />
                      <Text
                        style={[
                          styles.bookmarkBtnText,
                          isBookmarked && { color: '#0284C7', fontWeight: '700' },
                        ]}
                      >
                        {isBookmarked ? 'Saved to Reading List' : 'Save to List'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          {filteredBooks.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={42} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No matching books found</Text>
              <Text style={styles.emptySub}>Try searching another keyword or clearing filters</Text>
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
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bookIconBox: {
    width: 46,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 20,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 6,
  },
  bookSummary: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 10,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  bookmarkBtnActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#BAE6FD',
  },
  bookmarkBtnText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyState: {
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
  },
});
