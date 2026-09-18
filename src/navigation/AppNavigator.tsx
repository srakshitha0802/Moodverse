import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

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
import CommunityScreen from '../screens/CommunityScreen';

// Export AppHeader for backward compatibility
export { AppHeader } from '../components/AppHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Community" component={CommunityScreen} />
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
