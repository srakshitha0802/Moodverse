import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

export interface GameDefinition {
  id: string;
  number: number;
  title: string;
  category: 'Sensory' | 'Nature' | 'Art' | 'Focus';
  coreInteraction: string;
  satisfactionReason: string;
  icon: keyof typeof Ionicons.glyphMap;
  tagColor: string;
  tagBg: string;
}

export const RELAXING_GAMES: GameDefinition[] = [
  { id: 'bubble_pop', number: 1, title: 'Bubble Pop', category: 'Sensory', coreInteraction: 'Tap bubbles to pop them', satisfactionReason: 'Pop sounds, particles, chain combos', icon: 'ellipse-outline', tagColor: '#0284C7', tagBg: '#E0F2FE' },
  { id: 'balloon_burst', number: 2, title: 'Balloon Burst', category: 'Sensory', coreInteraction: 'Tap/hold balloons until they burst', satisfactionReason: 'Visual explosion & gentle vibration', icon: 'radio-button-on-outline', tagColor: '#E11D48', tagBg: '#FFE4E6' },
  { id: 'zen_garden', number: 3, title: 'Zen Garden', category: 'Nature', coreInteraction: 'Drag sand to create patterns', satisfactionReason: 'Slow, repetitive meditative movements', icon: 'leaf-outline', tagColor: '#0D9488', tagBg: '#DCFCE7' },
  { id: 'grow_plant', number: 4, title: 'Grow a Plant', category: 'Nature', coreInteraction: 'Tap/water/care for a virtual plant', satisfactionReason: 'Nurturing sense of steady progress', icon: 'flower-outline', tagColor: '#16A34A', tagBg: '#DCFCE7' },
  { id: 'color_therapy', number: 5, title: 'Color Therapy', category: 'Art', coreInteraction: 'Fill mandala petals with pastel hues', satisfactionReason: 'Creative expression & mindful calming', icon: 'color-palette-outline', tagColor: '#DB2777', tagBg: '#FCE7F3' },
  { id: 'spiral_draw', number: 6, title: 'Spiral Draw', category: 'Art', coreInteraction: 'Trace along expanding relaxing curves', satisfactionReason: 'Repetitive radial movement calms attention', icon: 'refresh-circle-outline', tagColor: '#6D28D9', tagBg: '#EDE9FE' },
  { id: 'squish_stretch', number: 7, title: 'Squish & Stretch', category: 'Sensory', coreInteraction: 'Press and deform a soft jelly orb', satisfactionReason: 'Tactile, springy playful feedback', icon: 'disc-outline', tagColor: '#D97706', tagBg: '#FEF3C7' },
  { id: 'sparkle_catch', number: 8, title: 'Sparkle Catch', category: 'Focus', coreInteraction: 'Move finger and collect glowing particles', satisfactionReason: 'Calming flow-state interaction', icon: 'sparkles-outline', tagColor: '#D97706', tagBg: '#FEF3C7' },
  { id: 'rain_maker', number: 9, title: 'Rain Maker', category: 'Nature', coreInteraction: 'Move clouds and shower soothing rain', satisfactionReason: 'Ambient rain audio & ripple splashes', icon: 'rainy-outline', tagColor: '#0284C7', tagBg: '#E0F2FE' },
  { id: 'fireplace', number: 10, title: 'Fireplace', category: 'Nature', coreInteraction: 'Touch logs, ignite fire, watch embers', satisfactionReason: 'Warm, crackling ambient comfort', icon: 'flame-outline', tagColor: '#EA580C', tagBg: '#FFEDD5' },
  { id: 'stone_stack', number: 11, title: 'Stone Stack', category: 'Focus', coreInteraction: 'Carefully stack smooth river stones', satisfactionReason: 'Focuses attention on one tranquil task', icon: 'layers-outline', tagColor: '#475569', tagBg: '#F1F5F9' },
  { id: 'ripple_touch', number: 12, title: 'Ripple Touch', category: 'Sensory', coreInteraction: 'Touch screen to create water ripples', satisfactionReason: 'Hypnotic concentric fluid waves', icon: 'water-outline', tagColor: '#0284C7', tagBg: '#E0F2FE' },
  { id: 'leaf_blower', number: 13, title: 'Leaf Blower', category: 'Nature', coreInteraction: 'Swipe to blow leaves into tidy piles', satisfactionReason: 'Satisfying physical sweeping interaction', icon: 'paper-plane-outline', tagColor: '#16A34A', tagBg: '#DCFCE7' },
  { id: 'clean_room', number: 14, title: 'Clean the Room', category: 'Focus', coreInteraction: 'Swipe away dusty clutter spots', satisfactionReason: 'Instant order & squeaky-clean satisfaction', icon: 'brush-outline', tagColor: '#0D9488', tagBg: '#CCFBF1' },
  { id: 'mini_puzzle', number: 15, title: 'Mini Puzzle', category: 'Focus', coreInteraction: 'Solve quick 30-second zen tile swaps', satisfactionReason: 'Gentle distraction & quick accomplishment', icon: 'grid-outline', tagColor: '#6D28D9', tagBg: '#EDE9FE' },
  { id: 'bubble_wrap', number: 16, title: 'Bubble Wrap', category: 'Sensory', coreInteraction: 'Pop an endless bubble-wrap sheet', satisfactionReason: 'Extremely satisfying repetitive pops', icon: 'apps-outline', tagColor: '#0284C7', tagBg: '#E0F2FE' },
  { id: 'paint_splash', number: 17, title: 'Paint Splash', category: 'Art', coreInteraction: 'Tap canvas to splash radiant watercolors', satisfactionReason: 'Zero-pressure creative freedom', icon: 'color-fill-outline', tagColor: '#DB2777', tagBg: '#FCE7F3' },
  { id: 'star_collector', number: 18, title: 'Star Collector', category: 'Focus', coreInteraction: 'Tap night stars to trace constellations', satisfactionReason: 'Serene cosmic exploration & wonder', icon: 'star-outline', tagColor: '#CA8A04', tagBg: '#FEF9C3' },
  { id: 'aquarium_calm', number: 19, title: 'Aquarium Calm', category: 'Nature', coreInteraction: 'Drop food flakes & watch fish swim', satisfactionReason: 'Tranquil aquarium biome flow', icon: 'fish-outline', tagColor: '#0284C7', tagBg: '#E0F2FE' },
  { id: 'cloud_shapes', number: 20, title: 'Cloud Shapes', category: 'Art', coreInteraction: 'Mould fluffy clouds into gentle forms', satisfactionReason: 'Imaginative, low-pressure daydreams', icon: 'cloud-outline', tagColor: '#64748B', tagBg: '#F1F5F9' },
  { id: 'beat_tap', number: 21, title: 'Beat Tap', category: 'Focus', coreInteraction: 'Tap in rhythm with a 60-BPM heart pulse', satisfactionReason: 'Combines musical tempo & concentration', icon: 'pulse-outline', tagColor: '#E11D48', tagBg: '#FFE4E6' },
  { id: 'destroy_blocks', number: 22, title: 'Destroy Blocks', category: 'Sensory', coreInteraction: 'Tap stress blocks to shatter tension', satisfactionReason: 'Controlled, healthy release of frustration', icon: 'hammer-outline', tagColor: '#D97706', tagBg: '#FEF3C7' },
  { id: 'garden_cleanup', number: 23, title: 'Garden Cleanup', category: 'Nature', coreInteraction: 'Pull weeds and bloom golden marigolds', satisfactionReason: 'Repetitive gardening & visual reward', icon: 'cut-outline', tagColor: '#16A34A', tagBg: '#DCFCE7' },
  { id: 'untangle', number: 24, title: 'Untangle', category: 'Focus', coreInteraction: 'Tap tangled lines until they form diamonds', satisfactionReason: 'Strong "problem solved" order feeling', icon: 'git-network-outline', tagColor: '#6366F1', tagBg: '#EDE9FE' },
  { id: 'candle_calm', number: 25, title: 'Candle Calm', category: 'Nature', coreInteraction: 'Ignite candle & swipe gentle flickering flame', satisfactionReason: 'Slow, peaceful contemplative warmth', icon: 'flame-outline', tagColor: '#D97706', tagBg: '#FEF3C7' },
];

export default function GamesScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGameId, setSelectedGameId] = useState<string>('bubble_pop');

  const activeGame = RELAXING_GAMES.find((g) => g.id === selectedGameId) || RELAXING_GAMES[0];

  const filteredGames = activeCategory === 'All'
    ? RELAXING_GAMES
    : RELAXING_GAMES.filter((g) => g.category === activeCategory);

  // 1. Bubble Pop State
  const [bubbles, setBubbles] = useState([
    { id: 1, label: 'Tension', popped: false, bg: '#E0F2FE', color: '#0284C7' },
    { id: 2, label: 'Worry', popped: false, bg: '#DCFCE7', color: '#0D9488' },
    { id: 3, label: 'Fatigue', popped: false, bg: '#EDE9FE', color: '#6D28D9' },
    { id: 4, label: 'Pressure', popped: false, bg: '#FEF3C7', color: '#D97706' },
    { id: 5, label: 'Overthinking', popped: false, bg: '#FFE4E6', color: '#E11D48' },
    { id: 6, label: 'Rush', popped: false, bg: '#CCFBF1', color: '#0F766E' },
  ]);
  const [bubblePopCount, setBubblePopCount] = useState(0);

  const handlePopBubble = (id: number) => {
    setBubbles((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)));
    setBubblePopCount((c) => c + 1);
  };

  const resetBubbles = () => {
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
  };

  // 2. Balloon Burst State
  const [balloonScale, setBalloonScale] = useState(1.0);
  const [balloonBurst, setBalloonBurst] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const pumpBalloon = () => {
    if (balloonBurst) return;
    if (balloonScale >= 1.6) {
      setBalloonBurst(true);
      setBurstCount((c) => c + 1);
    } else {
      setBalloonScale((s) => +(s + 0.18).toFixed(2));
    }
  };

  const resetBalloon = () => {
    setBalloonBurst(false);
    setBalloonScale(1.0);
  };

  // 3. Zen Garden State
  const [sandRakes, setSandRakes] = useState<number[]>([1, 2, 3]);
  const rakeSand = () => {
    setSandRakes((prev) => (prev.length >= 6 ? [1, 2] : [...prev, prev.length + 1]));
  };
  const smoothSand = () => setSandRakes([1, 2, 3]);

  // 4. Grow a Plant State
  const plantStages = ['Seed planted', 'Green sprout', 'Leafy stem', 'Budding', 'Blossomed Flower!'];
  const [plantProgress, setPlantProgress] = useState(1);
  const waterPlant = () => {
    setPlantProgress((p) => Math.min(plantStages.length - 1, p + 1));
  };
  const resetPlant = () => setPlantProgress(0);

  // 5. Color Therapy State
  const pastelPalette = ['#BAE6FD', '#DCFCE7', '#DDD6FE', '#FED7AA', '#FECDD3', '#FEF08A'];
  const [activeColor, setActiveColor] = useState(pastelPalette[0]);
  const [mandalaPetals, setMandalaPetals] = useState<string[]>([
    '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC',
  ]);
  const colorPetal = (idx: number) => {
    setMandalaPetals((prev) => prev.map((c, i) => (i === idx ? activeColor : c)));
  };
  const resetColoring = () => {
    setMandalaPetals(['#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC', '#F8FAFC']);
  };

  // 6. Spiral Draw State
  const [spiralLoops, setSpiralLoops] = useState(4);
  const expandSpiral = () => setSpiralLoops((l) => (l >= 8 ? 3 : l + 1));

  // 7. Squish & Stretch State
  const [squishAxis, setSquishAxis] = useState<'normal' | 'squished' | 'stretched'>('normal');
  const triggerSquish = (type: 'squished' | 'stretched') => {
    setSquishAxis(type);
    setTimeout(() => setSquishAxis('normal'), 600);
  };

  // 8. Sparkle Catch State
  const [sparkles, setSparkles] = useState([
    { id: 1, caught: false, x: 20, y: 30 },
    { id: 2, caught: false, x: 50, y: 70 },
    { id: 3, caught: false, x: 75, y: 25 },
    { id: 4, caught: false, x: 35, y: 110 },
    { id: 5, caught: false, x: 80, y: 100 },
  ]);
  const [sparkleScore, setSparkleScore] = useState(0);
  const catchSparkle = (id: number) => {
    setSparkles((prev) => prev.map((s) => (s.id === id ? { ...s, caught: true } : s)));
    setSparkleScore((s) => s + 10);
  };
  const respawnSparkles = () => {
    setSparkles((prev) => prev.map((s) => ({ ...s, caught: false })));
  };

  // 9. Rain Maker State
  const [rainActive, setRainActive] = useState(true);

  // 10. Fireplace State
  const [fireIntensity, setFireIntensity] = useState(2);
  const stokeFire = () => setFireIntensity((f) => (f >= 4 ? 1 : f + 1));

  // 11. Stone Stack State
  const [stoneCount, setStoneCount] = useState(3);
  const addStone = () => setStoneCount((s) => Math.min(5, s + 1));
  const resetStones = () => setStoneCount(1);

  // 12. Ripple Touch State
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([
    { id: 1, x: 40, y: 50 },
    { id: 2, x: 70, y: 80 },
  ]);
  const addRipple = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    setRipples((prev) => [
      ...prev.slice(-4),
      { id: Date.now(), x: locationX || 60, y: locationY || 60 },
    ]);
  };

  // 13. Leaf Blower State
  const [leavesGathered, setLeavesGathered] = useState(false);

  // 14. Clean Room State
  const [dustSpots, setDustSpots] = useState([true, true, true, true, true]);
  const cleanSpot = (idx: number) => {
    setDustSpots((prev) => prev.map((d, i) => (i === idx ? false : d)));
  };
  const resetDust = () => setDustSpots([true, true, true, true, true]);

  // 15. Mini Puzzle State
  const [puzzleTiles, setPuzzleTiles] = useState(['1', '3', '2', '4']);
  const isPuzzleSolved = puzzleTiles.join('') === '1234';
  const swapTile = (idx: number) => {
    setPuzzleTiles((prev) => {
      const next = [...prev];
      const target = (idx + 1) % 4;
      const temp = next[idx];
      next[idx] = next[target];
      next[target] = temp;
      return next;
    });
  };

  // 16. Bubble Wrap State (16 bubbles)
  const [bubbleWrapGrid, setBubbleWrapGrid] = useState<boolean[]>(new Array(16).fill(false));
  const popWrapCell = (idx: number) => {
    setBubbleWrapGrid((prev) => prev.map((p, i) => (i === idx ? true : p)));
  };
  const resetBubbleWrap = () => setBubbleWrapGrid(new Array(16).fill(false));

  // 17. Paint Splash State
  const [splashes, setSplashes] = useState<{ id: number; color: string; size: number }[]>([
    { id: 1, color: '#BAE6FD', size: 50 },
    { id: 2, color: '#FECDD3', size: 65 },
  ]);
  const addSplash = () => {
    const pick = pastelPalette[Math.floor(Math.random() * pastelPalette.length)];
    setSplashes((prev) => [
      ...prev.slice(-6),
      { id: Date.now(), color: pick, size: Math.floor(Math.random() * 35) + 40 },
    ]);
  };
  const clearPaint = () => setSplashes([]);

  // 18. Star Collector State
  const [starsLinked, setStarsLinked] = useState<number[]>([]);
  const linkStar = (num: number) => {
    if (!starsLinked.includes(num)) {
      setStarsLinked((prev) => [...prev, num]);
    }
  };
  const resetConstellation = () => setStarsLinked([]);

  // 19. Aquarium Calm State
  const [foodPellets, setFoodPellets] = useState<{ id: number; y: number }[]>([]);
  const dropFood = () => {
    setFoodPellets((prev) => [...prev.slice(-4), { id: Date.now(), y: 20 }]);
  };

  // 20. Cloud Shapes State
  const cloudShapesList = ['Fluffy Cloud', 'Heart Shape', 'Swan Crest', 'Star Glow', 'Crescent Moon'];
  const [cloudShapeIdx, setCloudShapeIdx] = useState(0);
  const cycleCloudShape = () => {
    setCloudShapeIdx((idx) => (idx + 1) % cloudShapesList.length);
  };

  // 21. Beat Tap State
  const [beatStreak, setBeatStreak] = useState(0);
  const tapBeat = () => setBeatStreak((s) => s + 1);

  // 22. Destroy Blocks State
  const [blocks, setBlocks] = useState([
    { id: 1, label: 'Doubt', broken: false },
    { id: 2, label: 'Fatigue', broken: false },
    { id: 3, label: 'Panic', broken: false },
    { id: 4, label: 'Stress', broken: false },
  ]);
  const breakBlock = (id: number) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, broken: true } : b)));
  };
  const resetBlocks = () => setBlocks((prev) => prev.map((b) => ({ ...b, broken: false })));

  // 23. Garden Cleanup State
  const [weeds, setWeeds] = useState([false, false, false, false]);
  const weedOut = (idx: number) => {
    setWeeds((prev) => prev.map((w, i) => (i === idx ? true : w)));
  };
  const resetWeeds = () => setWeeds([false, false, false, false]);

  // 24. Untangle State
  const [untangled, setUntangled] = useState(false);

  // 25. Candle Calm State
  const [candleLit, setCandleLit] = useState(true);
  const [flameWiggle, setFlameWiggle] = useState(0);
  const touchCandle = () => {
    setFlameWiggle((w) => (w + 1) % 3);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Relaxing Games" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#FEF3C7', '#FCE7F3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="game-controller-outline" size={13} color="#D97706" />
              <Text style={styles.badgeText}>25 Relaxing Games</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="sparkles-outline" size={13} color="#DB2777" />
              <Text style={[styles.badgeText, { color: '#DB2777' }]}>Anti-Anxiety Arcade</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Satisfying Anti-Stress Games</Text>
          <Text style={styles.bannerSubtitle}>
            Tactile, calming interactions directly engineered to divert anxiety, stimulate positive dopamine, and gently untangle muscle tension.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Category Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {['All', 'Sensory', 'Nature', 'Art', 'Focus'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    activeCategory === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Horizontal Game Selector Bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gameTabRow}>
            {filteredGames.map((game) => {
              const isSelected = selectedGameId === game.id;
              return (
                <TouchableOpacity
                  key={game.id}
                  style={[styles.gameTab, isSelected && styles.gameTabActive]}
                  onPress={() => setSelectedGameId(game.id)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.tabIconCircle,
                      { backgroundColor: isSelected ? game.tagBg : '#FAF9F6' },
                    ]}
                  >
                    <Ionicons
                      name={game.icon}
                      size={15}
                      color={isSelected ? game.tagColor : '#64748B'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.gameTabText,
                      isSelected && { color: '#0F172A', fontWeight: '800' },
                    ]}
                  >
                    {game.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Active Game Card Header */}
          <View style={styles.activeGameHeader}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <View style={[styles.numberBadge, { backgroundColor: activeGame.tagBg }]}>
                  <Text style={[styles.numberBadgeText, { color: activeGame.tagColor }]}>
                    #{activeGame.number}
                  </Text>
                </View>
                <Text style={styles.activeGameCategory}>{activeGame.category}</Text>
              </View>
              <Text style={styles.activeGameTitle}>{activeGame.title}</Text>
              <Text style={styles.activeGameCore}>{activeGame.coreInteraction}</Text>
            </View>

            <View style={styles.satisfactionBox}>
              <Ionicons name="sparkles-outline" size={13} color="#D97706" style={{ marginTop: 1 }} />
              <Text style={styles.satisfactionText}>{activeGame.satisfactionReason}</Text>
            </View>
          </View>

          {/* ========================================================================= */}
          {/* Active Game Canvas Area (All 25 Games Rendered Dynamically) */}
          {/* ========================================================================= */}
          <View style={styles.canvasContainer}>
            {/* 1. Bubble Pop */}
            {activeGame.id === 'bubble_pop' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Popped: {bubblePopCount}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetBubbles}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Refill Bubbles</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.gridWrap}>
                  {bubbles.map((b) => (
                    <TouchableOpacity
                      key={b.id}
                      style={[
                        styles.bubbleCircle,
                        { backgroundColor: b.popped ? '#F8FAFC' : b.bg, borderColor: b.popped ? '#E2E8F0' : b.color },
                      ]}
                      disabled={b.popped}
                      onPress={() => handlePopBubble(b.id)}
                      activeOpacity={0.7}
                    >
                      {b.popped ? (
                        <Ionicons name="sparkles-outline" size={16} color="#CBD5E1" />
                      ) : (
                        <>
                          <Ionicons name="ellipse-outline" size={18} color={b.color} />
                          <Text style={[styles.bubbleLabel, { color: b.color }]}>{b.label}</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 2. Balloon Burst */}
            {activeGame.id === 'balloon_burst' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Bursts: {burstCount}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetBalloon}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>New Balloon</Text>
                  </TouchableOpacity>
                </View>
                {balloonBurst ? (
                  <View style={styles.burstNotice}>
                    <Ionicons name="sparkles-outline" size={32} color="#E11D48" />
                    <Text style={styles.burstTitle}>POP! Tension Released</Text>
                    <Text style={styles.burstSub}>Clean burst recorded. Take a deep breath.</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.balloonShape,
                      { transform: [{ scale: balloonScale }] },
                    ]}
                    onPress={pumpBalloon}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="heart-outline" size={24} color="#BE123C" />
                    <Text style={styles.balloonPumpText}>Tap to Pump</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* 3. Zen Garden */}
            {activeGame.id === 'zen_garden' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Sand Rake Patterns: {sandRakes.length}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={smoothSand}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Smooth Sand</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.zenSandLawn} onPress={rakeSand} activeOpacity={0.85}>
                  {sandRakes.map((_, i) => (
                    <View key={i} style={[styles.sandGroove, { top: (i + 1) * 22 }]} />
                  ))}
                  <View style={[styles.zenStone, { top: 30, left: 40 }]}>
                    <Ionicons name="ellipse" size={22} color="#64748B" />
                  </View>
                  <View style={[styles.zenStone, { top: 80, right: 50 }]}>
                    <Ionicons name="ellipse" size={32} color="#475569" />
                  </View>
                  <Text style={styles.lawnHint}>Tap sand to rake tranquil ripples</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 4. Grow a Plant */}
            {activeGame.id === 'grow_plant' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{plantStages[plantProgress]}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetPlant}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Plant Seed</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.plantDisplayBox}>
                  {plantProgress === 0 && <Ionicons name="ellipse-outline" size={30} color="#78350F" />}
                  {plantProgress === 1 && <Ionicons name="leaf-outline" size={40} color="#16A34A" />}
                  {plantProgress === 2 && <Ionicons name="flower-outline" size={54} color="#15803D" />}
                  {plantProgress === 3 && <Ionicons name="rose-outline" size={68} color="#D97706" />}
                  {plantProgress === 4 && <Ionicons name="sunny-outline" size={80} color="#EA580C" />}
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                  <TouchableOpacity style={styles.actionBtnPill} onPress={waterPlant}>
                    <Ionicons name="water-outline" size={16} color="#0284C7" />
                    <Text style={styles.actionBtnPillText}>Water Droplet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnPill} onPress={waterPlant}>
                    <Ionicons name="sunny-outline" size={16} color="#D97706" />
                    <Text style={styles.actionBtnPillText}>Sunlight</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* 5. Color Therapy */}
            {activeGame.id === 'color_therapy' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Tap petal to fill hue</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetColoring}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.colorPaletteRow}>
                  {pastelPalette.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.paletteSwatch,
                        { backgroundColor: c },
                        activeColor === c && styles.paletteSwatchActive,
                      ]}
                      onPress={() => setActiveColor(c)}
                    />
                  ))}
                </View>
                <View style={styles.mandalaGrid}>
                  {mandalaPetals.map((petalColor, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.mandalaPetal, { backgroundColor: petalColor }]}
                      onPress={() => colorPetal(i)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="flower-outline" size={24} color="#475569" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 6. Spiral Draw */}
            {activeGame.id === 'spiral_draw' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Harmonic Loops: {spiralLoops}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={expandSpiral}>
                    <Ionicons name="add-circle-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Expand</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.spiralCanvas} onPress={expandSpiral} activeOpacity={0.8}>
                  {Array.from({ length: spiralLoops }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.spiralRing,
                        {
                          width: (i + 1) * 26,
                          height: (i + 1) * 26,
                          borderColor: pastelPalette[i % pastelPalette.length],
                        },
                      ]}
                    />
                  ))}
                </TouchableOpacity>
                <Text style={styles.canvasSubText}>Tap spiral to unwind mental clutter</Text>
              </View>
            )}

            {/* 7. Squish & Stretch */}
            {activeGame.id === 'squish_stretch' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Tactile Squishy Orb</Text>
                </View>
                <View
                  style={[
                    styles.squishyOrb,
                    squishAxis === 'squished' && { transform: [{ scaleX: 1.4 }, { scaleY: 0.7 }] },
                    squishAxis === 'stretched' && { transform: [{ scaleX: 0.7 }, { scaleY: 1.4 }] },
                  ]}
                >
                  <Ionicons name="happy-outline" size={36} color="#B45309" />
                </View>
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 18 }}>
                  <TouchableOpacity
                    style={styles.actionBtnPill}
                    onPress={() => triggerSquish('squished')}
                  >
                    <Ionicons name="contract-outline" size={16} color="#D97706" />
                    <Text style={styles.actionBtnPillText}>Squish Down</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtnPill}
                    onPress={() => triggerSquish('stretched')}
                  >
                    <Ionicons name="expand-outline" size={16} color="#D97706" />
                    <Text style={styles.actionBtnPillText}>Stretch Tall</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* 8. Sparkle Catch */}
            {activeGame.id === 'sparkle_catch' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Energy Gathered: {sparkleScore}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={respawnSparkles}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Respawn</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.darkSkyLawn}>
                  {sparkles.map((s) =>
                    s.caught ? null : (
                      <TouchableOpacity
                        key={s.id}
                        style={[styles.sparkleItem, { top: s.y, left: s.x * 2.8 }]}
                        onPress={() => catchSparkle(s.id)}
                        activeOpacity={0.6}
                      >
                        <Ionicons name="sparkles-outline" size={20} color="#FEF08A" />
                      </TouchableOpacity>
                    )
                  )}
                  <Text style={styles.lawnHintDark}>Tap luminous sparks to catch calm</Text>
                </View>
              </View>
            )}

            {/* 9. Rain Maker */}
            {activeGame.id === 'rain_maker' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{rainActive ? 'Gentle Rainfall' : 'Calm Sky'}</Text>
                  <TouchableOpacity
                    style={styles.actionBtnMini}
                    onPress={() => setRainActive((r) => !r)}
                  >
                    <Ionicons name={rainActive ? 'sunny-outline' : 'rainy-outline'} size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>{rainActive ? 'Pause Rain' : 'Make Rain'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.cloudCard}>
                    <Ionicons name="cloud-outline" size={54} color="#0284C7" />
                  </View>
                  {rainActive && (
                    <View style={styles.rainPuddleRow}>
                      <Ionicons name="water-outline" size={20} color="#38BDF8" />
                      <Ionicons name="water-outline" size={24} color="#0284C7" />
                      <Ionicons name="water-outline" size={18} color="#38BDF8" />
                      <Ionicons name="water-outline" size={26} color="#0284C7" />
                      <Ionicons name="water-outline" size={20} color="#38BDF8" />
                    </View>
                  )}
                </View>
                <Text style={styles.canvasSubText}>Listen to the soothing rhythm of rain</Text>
              </View>
            )}

            {/* 10. Fireplace */}
            {activeGame.id === 'fireplace' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Warmth Level: {fireIntensity} / 4</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={stokeFire}>
                    <Ionicons name="flame-outline" size={14} color="#EA580C" />
                    <Text style={styles.actionBtnMiniText}>Stoke Fire</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.fireplaceHearth} onPress={stokeFire} activeOpacity={0.8}>
                  <Ionicons name="flame-outline" size={30 + fireIntensity * 12} color="#EA580C" />
                  <View style={styles.woodLogsRow}>
                    <View style={styles.woodLog} />
                    <View style={styles.woodLog} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.canvasSubText}>Tap the hearth to feed the gentle flames</Text>
              </View>
            )}

            {/* 11. Stone Stack */}
            {activeGame.id === 'stone_stack' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Stones Balanced: {stoneCount} / 5</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetStones}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cairnTower}>
                  {Array.from({ length: stoneCount }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.stoneBlock,
                        { width: 140 - (stoneCount - 1 - i) * 20, height: 26 },
                      ]}
                    >
                      <Ionicons name="ellipse" size={14} color="#CBD5E1" />
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={styles.actionBtnPill} onPress={addStone}>
                  <Ionicons name="layers-outline" size={16} color="#0284C7" />
                  <Text style={styles.actionBtnPillText}>Stack River Stone</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 12. Ripple Touch */}
            {activeGame.id === 'ripple_touch' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Tap water pool for ripples</Text>
                </View>
                <TouchableOpacity style={styles.waterPool} onPress={addRipple} activeOpacity={0.9}>
                  {ripples.map((r) => (
                    <View key={r.id} style={[styles.rippleCircle, { top: r.y - 30, left: r.x - 30 }]} />
                  ))}
                  <Text style={styles.waterPoolHint}>Touch anywhere to create calming liquid waves</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 13. Leaf Blower */}
            {activeGame.id === 'leaf_blower' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{leavesGathered ? 'Leaves Swept Neat' : 'Leaves Fluttering'}</Text>
                  <TouchableOpacity
                    style={styles.actionBtnMini}
                    onPress={() => setLeavesGathered((g) => !g)}
                  >
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Scatter Again</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.leafGarden}
                  onPress={() => setLeavesGathered(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="leaf-outline"
                    size={28}
                    color="#16A34A"
                    style={{ position: 'absolute', top: leavesGathered ? 80 : 25, left: leavesGathered ? 120 : 30 }}
                  />
                  <Ionicons
                    name="leaf-outline"
                    size={24}
                    color="#D97706"
                    style={{ position: 'absolute', top: leavesGathered ? 82 : 40, right: leavesGathered ? 120 : 40 }}
                  />
                  <Ionicons
                    name="leaf-outline"
                    size={30}
                    color="#DC2626"
                    style={{ position: 'absolute', top: leavesGathered ? 85 : 90, left: leavesGathered ? 130 : 60 }}
                  />
                  <Text style={styles.lawnHint}>Tap to blow leaves into a cozy pile</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 14. Clean the Room */}
            {activeGame.id === 'clean_room' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>
                    Remaining Dust: {dustSpots.filter(Boolean).length} / 5
                  </Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetDust}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset Clutter</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roomShelf}>
                  {dustSpots.map((dusty, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.dustSpot, !dusty && styles.dustSpotClean]}
                      onPress={() => cleanSpot(idx)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={dusty ? 'cloudy-outline' : 'sparkles'}
                        size={22}
                        color={dusty ? '#94A3B8' : '#0D9488'}
                      />
                      <Text style={[styles.dustText, !dusty && { color: '#0D9488' }]}>
                        {dusty ? 'Wipe' : 'Clean'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 15. Mini Puzzle */}
            {activeGame.id === 'mini_puzzle' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>
                    {isPuzzleSolved ? 'Puzzle Harmonized!' : 'Align tiles 1 to 4'}
                  </Text>
                </View>
                <View style={styles.puzzleGrid}>
                  {puzzleTiles.map((tile, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.puzzleTile, isPuzzleSolved && styles.puzzleTileSolved]}
                      onPress={() => swapTile(i)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.puzzleTileText}>{tile}</Text>
                      <Ionicons
                        name={tile === '1' ? 'leaf-outline' : tile === '2' ? 'water-outline' : tile === '3' ? 'sunny-outline' : 'flower-outline'}
                        size={18}
                        color="#0284C7"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.canvasSubText}>Tap tiles to cycle and balance geometry</Text>
              </View>
            )}

            {/* 16. Bubble Wrap */}
            {activeGame.id === 'bubble_wrap' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>
                    Popped: {bubbleWrapGrid.filter(Boolean).length} / 16
                  </Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetBubbleWrap}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>New Sheet</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bubbleWrapGrid}>
                  {bubbleWrapGrid.map((popped, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.wrapCell, popped && styles.wrapCellPopped]}
                      onPress={() => popWrapCell(i)}
                      activeOpacity={0.6}
                    >
                      <Ionicons
                        name={popped ? 'checkmark-circle-outline' : 'ellipse-outline'}
                        size={16}
                        color={popped ? '#CBD5E1' : '#0284C7'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 17. Paint Splash */}
            {activeGame.id === 'paint_splash' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Watercolor Splashes: {splashes.length}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={clearPaint}>
                    <Ionicons name="trash-outline" size={14} color="#E11D48" />
                    <Text style={[styles.actionBtnMiniText, { color: '#E11D48' }]}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.paintCanvas} onPress={addSplash} activeOpacity={0.9}>
                  {splashes.map((sp) => (
                    <View
                      key={sp.id}
                      style={[
                        styles.splashBlot,
                        {
                          backgroundColor: sp.color,
                          width: sp.size,
                          height: sp.size,
                          borderRadius: sp.size / 2,
                        },
                      ]}
                    />
                  ))}
                  <Text style={styles.paintCanvasHint}>Tap canvas to splash pastel watercolor</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 18. Star Collector */}
            {activeGame.id === 'star_collector' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Linked: {starsLinked.length} / 4 stars</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetConstellation}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.darkSkyLawn}>
                  {[1, 2, 3, 4].map((starNum) => {
                    const linked = starsLinked.includes(starNum);
                    const coords = [
                      { top: 25, left: 40 },
                      { top: 45, left: 160 },
                      { top: 95, left: 90 },
                      { top: 65, left: 220 },
                    ][starNum - 1];
                    return (
                      <TouchableOpacity
                        key={starNum}
                        style={[styles.constellationStar, coords, linked && styles.starLinked]}
                        onPress={() => linkStar(starNum)}
                      >
                        <Ionicons
                          name={linked ? 'star' : 'star-outline'}
                          size={20}
                          color={linked ? '#FEF08A' : '#94A3B8'}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <Text style={styles.lawnHintDark}>Tap stars to trace peaceful constellation</Text>
                </View>
              </View>
            )}

            {/* 19. Aquarium Calm */}
            {activeGame.id === 'aquarium_calm' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Pellets in water: {foodPellets.length}</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={dropFood}>
                    <Ionicons name="fish-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Feed Fish</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.aquariumBox} onPress={dropFood} activeOpacity={0.9}>
                  <View style={[styles.swimmingFish, { top: 35, left: 40 }]}>
                    <Ionicons name="fish-outline" size={28} color="#EA580C" />
                  </View>
                  <View style={[styles.swimmingFish, { top: 80, right: 50 }]}>
                    <Ionicons name="fish-outline" size={24} color="#0284C7" />
                  </View>
                  {foodPellets.map((p) => (
                    <View key={p.id} style={[styles.foodPellet, { top: p.y, left: 140 }]} />
                  ))}
                  <Text style={styles.aquariumHint}>Tap water to feed serene koi</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 20. Cloud Shapes */}
            {activeGame.id === 'cloud_shapes' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{cloudShapesList[cloudShapeIdx]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.cloudMouldBox}
                  onPress={cycleCloudShape}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={
                      cloudShapeIdx === 0
                        ? 'cloud-outline'
                        : cloudShapeIdx === 1
                        ? 'heart-outline'
                        : cloudShapeIdx === 2
                        ? 'airplane-outline'
                        : cloudShapeIdx === 3
                        ? 'star-outline'
                        : 'moon-outline'
                    }
                    size={64}
                    color="#0284C7"
                  />
                  <Text style={styles.cloudMorphText}>Tap to reshape cloud</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 21. Beat Tap */}
            {activeGame.id === 'beat_tap' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Rhythm Streak: {beatStreak} Flow</Text>
                </View>
                <TouchableOpacity style={styles.beatHalo} onPress={tapBeat} activeOpacity={0.7}>
                  <Ionicons name="pulse-outline" size={40} color="#BE123C" />
                  <Text style={styles.beatHaloText}>Sync Tap (60 BPM)</Text>
                </TouchableOpacity>
                <Text style={styles.canvasSubText}>Gently align breath with the rhythmic pulse</Text>
              </View>
            )}

            {/* 22. Destroy the Blocks */}
            {activeGame.id === 'destroy_blocks' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>
                    Shattered: {blocks.filter((b) => b.broken).length} / 4
                  </Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetBlocks}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocksRow}>
                  {blocks.map((block) => (
                    <TouchableOpacity
                      key={block.id}
                      style={[styles.stressBlock, block.broken && styles.stressBlockBroken]}
                      onPress={() => breakBlock(block.id)}
                      disabled={block.broken}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={block.broken ? 'checkmark-circle' : 'hammer-outline'}
                        size={20}
                        color={block.broken ? '#CBD5E1' : '#D97706'}
                      />
                      <Text
                        style={[
                          styles.stressBlockText,
                          block.broken && { color: '#94A3B8', textDecorationLine: 'line-through' },
                        ]}
                      >
                        {block.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 23. Garden Cleanup */}
            {activeGame.id === 'garden_cleanup' && (
              <View style={styles.gameInner}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>Weeds Cleared: {weeds.filter(Boolean).length} / 4</Text>
                  <TouchableOpacity style={styles.actionBtnMini} onPress={resetWeeds}>
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset Garden</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.gardenRow}>
                  {weeds.map((cleared, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.gardenBedSlot, cleared && styles.gardenBedSlotBloomed]}
                      onPress={() => weedOut(idx)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={cleared ? 'flower-outline' : 'leaf-outline'}
                        size={24}
                        color={cleared ? '#EA580C' : '#15803D'}
                      />
                      <Text style={styles.gardenSlotText}>{cleared ? 'Bloomed' : 'Pluck'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* 24. Untangle */}
            {activeGame.id === 'untangle' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{untangled ? 'Clean Harmony' : 'Tangled Strands'}</Text>
                  <TouchableOpacity
                    style={styles.actionBtnMini}
                    onPress={() => setUntangled((u) => !u)}
                  >
                    <Ionicons name="refresh-outline" size={14} color="#0284C7" />
                    <Text style={styles.actionBtnMiniText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.untangleBoard}
                  onPress={() => setUntangled(true)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.untangleDiamond,
                      untangled && { borderColor: '#10B981', transform: [{ rotate: '45deg' }] },
                    ]}
                  >
                    <Ionicons
                      name={untangled ? 'checkmark-circle-outline' : 'git-network-outline'}
                      size={28}
                      color={untangled ? '#10B981' : '#6366F1'}
                    />
                  </View>
                  <Text style={styles.canvasSubText}>
                    {untangled ? 'Lines are untangled and serene' : 'Tap to untangle intersecting nodes'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 25. Candle Calm */}
            {activeGame.id === 'candle_calm' && (
              <View style={styles.gameInnerCentered}>
                <View style={styles.statusBarRow}>
                  <Text style={styles.statusLabel}>{candleLit ? 'Gentle Flame Lit' : 'Candle Unlit'}</Text>
                  <TouchableOpacity
                    style={styles.actionBtnMini}
                    onPress={() => setCandleLit((c) => !c)}
                  >
                    <Ionicons name="flame-outline" size={14} color="#D97706" />
                    <Text style={styles.actionBtnMiniText}>{candleLit ? 'Blow Out' : 'Kindle'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.candleChamber}
                  onPress={touchCandle}
                  activeOpacity={0.9}
                >
                  {candleLit && (
                    <View style={[styles.candleFlame, { marginLeft: flameWiggle * 4 - 4 }]}>
                      <Ionicons name="flame" size={32} color="#F59E0B" />
                    </View>
                  )}
                  <View style={styles.candlePillar}>
                    <View style={styles.candleWick} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.canvasSubText}>Tap flame to watch it gently dance</Text>
              </View>
            )}
          </View>

          {/* Quick Navigation to Full Library */}
          <View style={styles.footerHelpBox}>
            <Ionicons name="leaf-outline" size={18} color="#0D9488" />
            <Text style={styles.footerHelpText}>
              Mindful play redirects cortisol spikes and fosters neural tranquility.
            </Text>
          </View>
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
    borderColor: 'rgba(217, 119, 6, 0.15)',
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
    borderColor: '#FDE68A',
  },
  badgeText: {
    color: '#D97706',
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
  categoryScroll: {
    marginBottom: 12,
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
  gameTabRow: {
    marginBottom: 16,
  },
  gameTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  gameTabActive: {
    borderColor: '#BAE6FD',
    backgroundColor: '#F0F9FF',
  },
  tabIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  gameTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeGameHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  numberBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  numberBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  activeGameCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  activeGameTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  activeGameCore: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  satisfactionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: 10,
    padding: 8,
    gap: 6,
    marginTop: 10,
  },
  satisfactionText: {
    flex: 1,
    fontSize: 11,
    color: '#B45309',
    fontWeight: '600',
  },
  canvasContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    minHeight: 260,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gameInner: {
    width: '100%',
  },
  gameInnerCentered: {
    width: '100%',
    alignItems: 'center',
  },
  statusBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 14,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionBtnMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  actionBtnMiniText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  actionBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  actionBtnPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  canvasSubText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 14,
    fontStyle: 'italic',
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  bubbleCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  balloonShape: {
    width: 100,
    height: 120,
    backgroundColor: '#FFE4E6',
    borderWidth: 2,
    borderColor: '#FDA4AF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  balloonPumpText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#BE123C',
    marginTop: 4,
  },
  burstNotice: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  burstTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#BE123C',
    marginTop: 6,
  },
  burstSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  zenSandLawn: {
    height: 150,
    backgroundColor: '#FEF9C3',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE047',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sandGroove: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: 'rgba(202, 138, 4, 0.25)',
    borderRadius: 2,
  },
  zenStone: {
    position: 'absolute',
  },
  lawnHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A16207',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  plantDisplayBox: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPaletteRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 14,
  },
  paletteSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  paletteSwatchActive: {
    borderColor: '#0F172A',
  },
  mandalaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  mandalaPetal: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spiralCanvas: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spiralRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
  },
  squishyOrb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FEF3C7',
    borderWidth: 3,
    borderColor: '#FCD34D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkSkyLawn: {
    height: 150,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  sparkleItem: {
    position: 'absolute',
    padding: 6,
  },
  lawnHintDark: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    fontSize: 10,
    color: '#94A3B8',
  },
  cloudCard: {
    padding: 8,
  },
  rainPuddleRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  fireplaceHearth: {
    height: 120,
    width: 160,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  woodLogsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  woodLog: {
    width: 38,
    height: 8,
    backgroundColor: '#78350F',
    borderRadius: 4,
  },
  cairnTower: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  stoneBlock: {
    backgroundColor: '#94A3B8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterPool: {
    height: 150,
    backgroundColor: '#E0F2FE',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#0284C7',
    opacity: 0.6,
  },
  waterPoolHint: {
    fontSize: 11,
    color: '#0369A1',
    fontWeight: '600',
  },
  leafGarden: {
    height: 140,
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomShelf: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  dustSpot: {
    width: 54,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  dustSpotClean: {
    backgroundColor: '#CCFBF1',
    borderColor: '#5EEAD4',
  },
  dustText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  puzzleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 140,
    gap: 8,
  },
  puzzleTile: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  puzzleTileSolved: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  puzzleTileText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  bubbleWrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  wrapCell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapCellPopped: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  paintCanvas: {
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashBlot: {
    position: 'absolute',
    opacity: 0.8,
  },
  paintCanvasHint: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  constellationStar: {
    position: 'absolute',
    padding: 6,
  },
  starLinked: {
    backgroundColor: 'rgba(254, 240, 138, 0.2)',
    borderRadius: 12,
  },
  aquariumBox: {
    height: 140,
    backgroundColor: '#0369A1',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swimmingFish: {
    position: 'absolute',
  },
  foodPellet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEF08A',
  },
  aquariumHint: {
    fontSize: 11,
    color: '#E0F2FE',
    position: 'absolute',
    bottom: 8,
  },
  cloudMouldBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cloudMorphText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
    marginTop: 6,
  },
  beatHalo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FDA4AF',
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beatHaloText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#BE123C',
    marginTop: 4,
  },
  blocksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  stressBlock: {
    width: 90,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stressBlockBroken: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  stressBlockText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 2,
  },
  gardenRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  gardenBedSlot: {
    width: 58,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gardenBedSlotBloomed: {
    backgroundColor: '#FFEDD5',
    borderColor: '#FDBA74',
  },
  gardenSlotText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
    marginTop: 2,
  },
  untangleBoard: {
    height: 130,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  untangleDiamond: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#6366F1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  candleChamber: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candleFlame: {
    marginBottom: -4,
  },
  candlePillar: {
    width: 32,
    height: 60,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 6,
    alignItems: 'center',
  },
  candleWick: {
    width: 2,
    height: 6,
    backgroundColor: '#78350F',
  },
  footerHelpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    borderRadius: 14,
    padding: 12,
    marginTop: 18,
  },
  footerHelpText: {
    flex: 1,
    fontSize: 11,
    color: '#0F766E',
    lineHeight: 16,
  },
});
