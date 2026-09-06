import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MoodScannerScreen from '../screens/MoodScannerScreen';
import MeditationScreen from '../screens/MeditationScreen';
import YogaScreen from '../screens/YogaScreen';
import VrRoomsScreen from '../screens/VrRoomsScreen';
import JournalScreen from '../screens/JournalScreen';
import GamesScreen from '../screens/GamesScreen';
import MemesScreen from '../screens/MemesScreen';
import BooksScreen from '../screens/BooksScreen';
import MusicScreen from '../screens/MusicScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* Menu Items Definition (100% Emoji-Free, Pure Google/Ionicons) */
interface NavMenuItem {
  screen: string;
  name: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  tag?: string;
  pastelBg: string;
  iconColor: string;
}

interface NavCategory {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: NavMenuItem[];
}

const MENU_CATEGORIES: NavCategory[] = [
  {
    title: 'Core Wellbeing & AI',
    icon: 'sparkles-outline',
    items: [
      { screen: 'HomeMain', name: 'Home', desc: 'Sanctuary overview & check-in', icon: 'home-outline', pastelBg: '#E0F2FE', iconColor: '#0284C7' },
      { screen: 'MoodScanner', name: 'AI Mood Scanner', desc: 'Emotion detector & analysis', icon: 'scan-outline', tag: 'SCAN', pastelBg: '#DCFCE7', iconColor: '#0D9488' },
      { screen: 'Meditation', name: 'Guided Meditation', desc: 'Breathwork & zen timer', icon: 'leaf-outline', pastelBg: '#E0F2FE', iconColor: '#0284C7' },
      { screen: 'Yoga', name: 'Yoga Practice', desc: 'Restorative postures & flows', icon: 'fitness-outline', pastelBg: '#EDE9FE', iconColor: '#6D28D9' },
    ],
  },
  {
    title: 'Immersive & Relaxation',
    icon: 'glasses-outline',
    items: [
      { screen: 'VrRooms', name: '3D VR Sanctuary', desc: 'Peaceful virtual 360 environments', icon: 'glasses-outline', tag: '3D VR', pastelBg: '#E0F2FE', iconColor: '#0284C7' },
      { screen: 'Games', name: 'Mindful Games Studio', desc: 'Bubble popper, piano & zen games', icon: 'game-controller-outline', tag: '5 GAMES', pastelBg: '#FEF3C7', iconColor: '#D97706' },
      { screen: 'Memes', name: 'Wholesome Memes Hub', desc: 'Curated mood boosters & smiles', icon: 'sparkles-outline', tag: 'BOOST', pastelBg: '#FCE7F3', iconColor: '#DB2777' },
      { screen: 'Books', name: 'Wellness Library', desc: 'Mental health curated readings', icon: 'book-outline', pastelBg: '#DCFCE7', iconColor: '#0D9488' },
      { screen: 'Music', name: 'Calming Soundscapes', desc: 'Ambient binaural frequencies', icon: 'musical-notes-outline', pastelBg: '#E0F2FE', iconColor: '#0284C7' },
    ],
  },
  {
    title: 'Support & Care',
    icon: 'shield-checkmark-outline',
    items: [
      { screen: 'Journal', name: 'Emotional Journal', desc: 'Private encrypted daily notes', icon: 'journal-outline', pastelBg: '#EDE9FE', iconColor: '#6366F1' },
      { screen: 'Contact', name: '24/7 Crisis & Support', desc: 'Immediate 988 lifeline & help', icon: 'call-outline', tag: '24/7', pastelBg: '#FFE4E6', iconColor: '#E11D48' },
    ],
  },
];

/* Custom Header with Menu Button for Native Screens */
export function AppHeader({ navigation, title }: { navigation: any; title?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MENU_CATEGORIES;

    return MENU_CATEGORIES.map((cat) => {
      const items = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      );
      return { ...cat, items };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const handleNavigate = (screenName: string) => {
    setMenuOpen(false);
    const stackScreens = ['Journal', 'Games', 'Memes', 'Books', 'Music', 'Contact', 'HomeMain'];
    if (stackScreens.includes(screenName)) {
      navigation.navigate('Home', { screen: screenName });
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <>
      <View style={headerStyles.container}>
        {/* Brand Logo with Google Ionicons */}
        <TouchableOpacity
          style={headerStyles.brandContainer}
          onPress={() => navigation.navigate('Home', { screen: 'HomeMain' })}
          activeOpacity={0.8}
        >
          <View style={headerStyles.brandIconBox}>
            <Ionicons name="leaf-outline" size={16} color="#FFFFFF" />
          </View>
          <View>
            <Text style={headerStyles.brandText}>{title || 'Moodverse'}</Text>
            <Text style={headerStyles.brandBadge}>AI SANCTUARY</Text>
          </View>
        </TouchableOpacity>

        {/* Right Header Buttons */}
        <View style={headerStyles.rightActions}>
          <TouchableOpacity
            style={headerStyles.crisisPill}
            onPress={() => navigation.navigate('Home', { screen: 'Contact' })}
            activeOpacity={0.8}
          >
            <Ionicons name="call-outline" size={13} color="#BE123C" />
            <Text style={headerStyles.crisisPillText}>988</Text>
          </TouchableOpacity>

          {/* Menu Button */}
          <TouchableOpacity
            style={headerStyles.menuBtn}
            onPress={() => setMenuOpen(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="menu-outline" size={18} color="#0F172A" />
            <Text style={headerStyles.menuBtnText}>Menu</Text>
            <View style={headerStyles.badgePill}>
              <Text style={headerStyles.badgePillText}>11</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide-out / Modal Navigation Menu */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={modalStyles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={modalStyles.drawer} onPress={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <View style={modalStyles.header}>
              <View style={modalStyles.headerTitleRow}>
                <View style={modalStyles.headerIcon}>
                  <Ionicons name="compass-outline" size={20} color="#0284C7" />
                </View>
                <View>
                  <Text style={modalStyles.title}>Navigation Hub</Text>
                  <Text style={modalStyles.subtitle}>11 wellness tools & spaces</Text>
                </View>
              </View>
              <TouchableOpacity
                style={modalStyles.closeBtn}
                onPress={() => setMenuOpen(false)}
              >
                <Ionicons name="close-outline" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Search Box */}
            <View style={modalStyles.searchBox}>
              <Ionicons name="search-outline" size={16} color="#64748B" style={{ marginRight: 8 }} />
              <TextInput
                style={modalStyles.searchInput}
                placeholder="Search tools, rooms, guides..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Scrollable Categories */}
            <ScrollView contentContainerStyle={modalStyles.scrollBody} showsVerticalScrollIndicator={false}>
              {filteredCategories.map((cat) => (
                <View key={cat.title} style={modalStyles.categoryGroup}>
                  <View style={modalStyles.categoryHeader}>
                    <Ionicons name={cat.icon} size={15} color="#0284C7" style={{ marginRight: 6 }} />
                    <Text style={modalStyles.categoryTitle}>{cat.title}</Text>
                  </View>

                  {cat.items.map((item) => (
                    <TouchableOpacity
                      key={item.screen}
                      style={modalStyles.navItem}
                      onPress={() => handleNavigate(item.screen)}
                      activeOpacity={0.7}
                    >
                      <View style={[modalStyles.itemIconBox, { backgroundColor: item.pastelBg }]}>
                        <Ionicons name={item.icon} size={18} color={item.iconColor} />
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text style={modalStyles.itemName}>{item.name}</Text>
                          {item.tag && (
                            <View style={modalStyles.tagPill}>
                              <Text style={modalStyles.tagPillText}>{item.tag}</Text>
                            </View>
                          )}
                        </View>
                        <Text style={modalStyles.itemDesc}>{item.desc}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>

            {/* Drawer Footer */}
            <View style={modalStyles.footer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="shield-checkmark-outline" size={15} color="#0D9488" />
                <Text style={modalStyles.footerText}>Moodverse Native App v1.0</Text>
              </View>
              <TouchableOpacity onPress={() => handleNavigate('Contact')}>
                <Text style={modalStyles.footerLink}>Emergency 988</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      id="HomeStackNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Journal" component={JournalScreen} />
      <Stack.Screen name="Games" component={GamesScreen} />
      <Stack.Screen name="Memes" component={MemesScreen} />
      <Stack.Screen name="Books" component={BooksScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        id="MainTabNavigator"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            height: 62,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#0284C7',
          tabBarInactiveTintColor: '#64748B',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="MoodScanner"
          component={MoodScannerScreen}
          options={{
            tabBarLabel: 'Mood Scan',
            tabBarIcon: ({ color, size }) => <Ionicons name="scan-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Meditation"
          component={MeditationScreen}
          options={{
            tabBarLabel: 'Meditation',
            tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Yoga"
          component={YogaScreen}
          options={{
            tabBarLabel: 'Yoga',
            tabBarIcon: ({ color, size }) => <Ionicons name="fitness-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="VrRooms"
          component={VrRoomsScreen}
          options={{
            tabBarLabel: '3D VR',
            tabBarIcon: ({ color, size }) => <Ionicons name="glasses-outline" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* Header Styles */
const headerStyles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  brandBadge: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0284C7',
    letterSpacing: 0.4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  crisisPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFE4E6',
    borderWidth: 1,
    borderColor: '#FECDD3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  crisisPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#BE123C',
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  menuBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  badgePill: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7',
  },
});

/* Modal Drawer Styles */
const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  drawer: {
    width: '85%',
    maxWidth: 360,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    paddingTop: 48,
    display: 'flex',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  closeBtn: {
    padding: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  categoryGroup: {
    gap: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0284C7',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 12,
    padding: 10,
  },
  itemIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  tagPill: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0284C7',
  },
  footer: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF9F6',
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
  },
  footerLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E11D48',
  },
});
