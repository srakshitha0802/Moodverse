import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';

interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  os: 'ios' | 'android';
  badge: string;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone16pro', name: 'iPhone 16 Pro', width: 393, height: 852, os: 'ios', badge: 'iOS' },
  { id: 'iphone16promax', name: 'iPhone 16 Pro Max', width: 430, height: 932, os: 'ios', badge: 'iOS Max' },
  { id: 'galaxyS24', name: 'Samsung S24', width: 360, height: 780, os: 'android', badge: 'Android Compact' },
  { id: 'pixel8', name: 'Google Pixel 8', width: 412, height: 915, os: 'android', badge: 'Android' },
];

export default function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isDesktop = isWeb && windowWidth > 520;

  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(DEVICE_PRESETS[0]);
  const [fullscreenMobile, setFullscreenMobile] = useState(false);

  // On wide screens (Desktop browser), render inside an authentic smartphone frame with device switcher
  if (isDesktop && !fullscreenMobile) {
    // Calculate auto-scale to ensure the mobile frame fits on any display height
    const availableHeight = windowHeight - 90; // room for top device selector bar
    const scale = Math.min(1, availableHeight / selectedDevice.height);
    const frameWidth = selectedDevice.width * scale;
    const frameHeight = selectedDevice.height * scale;

    return (
      <SafeAreaProvider>
        <View style={styles.webDesktopBackground}>
          <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

          {/* Top Device Switcher Toolbar */}
          <View style={styles.deviceBar}>
            <View style={styles.deviceBarBrand}>
              <View style={styles.deviceBarDot} />
              <Text style={styles.deviceBarTitle}>Moodverse Mobile Simulator</Text>
            </View>

            <View style={styles.presetButtonsRow}>
              {DEVICE_PRESETS.map((device) => {
                const isSelected = selectedDevice.id === device.id;
                return (
                  <TouchableOpacity
                    key={device.id}
                    style={[styles.presetBtn, isSelected && styles.presetBtnActive]}
                    onPress={() => setSelectedDevice(device)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={device.os === 'ios' ? 'logo-apple' : 'logo-android'}
                      size={13}
                      color={isSelected ? '#0284C7' : '#64748B'}
                      style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.presetBtnText, isSelected && styles.presetBtnTextActive]}>
                      {device.name}
                    </Text>
                    <View style={[styles.deviceDimPill, isSelected && styles.deviceDimPillActive]}>
                      <Text style={[styles.deviceDimText, isSelected && styles.deviceDimTextActive]}>
                        {device.width}×{device.height}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={styles.fullscreenToggleBtn}
                onPress={() => setFullscreenMobile(true)}
                activeOpacity={0.8}
                accessibilityLabel="Expand to Fullscreen View"
              >
                <Ionicons name="expand-outline" size={14} color="#0284C7" />
                <Text style={styles.fullscreenToggleText}>Full View</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Smartphone Frame Container */}
          <View
            style={[
              styles.phoneFrame,
              {
                width: frameWidth,
                height: frameHeight,
                borderRadius: selectedDevice.os === 'ios' ? 48 * scale : 36 * scale,
                borderWidth: Math.max(6, 10 * scale),
              },
            ]}
          >
            {/* Phone Top Notch / Dynamic Island */}
            <View style={styles.dynamicIslandContainer}>
              {selectedDevice.os === 'ios' ? (
                <View
                  style={[
                    styles.dynamicIsland,
                    {
                      width: 110 * scale,
                      height: 26 * scale,
                      borderRadius: 16 * scale,
                    },
                  ]}
                >
                  <View style={[styles.islandCamera, { width: 10 * scale, height: 10 * scale }]} />
                  <View style={[styles.islandSensor, { width: 6 * scale, height: 6 * scale }]} />
                </View>
              ) : (
                /* Android Punch Hole Camera */
                <View style={[styles.androidPunchHole, { width: 12 * scale, height: 12 * scale, borderRadius: 6 * scale }]} />
              )}
            </View>

            {/* Inner Phone Screen */}
            <View
              style={[
                styles.phoneScreen,
                {
                  borderTopLeftRadius: (selectedDevice.os === 'ios' ? 38 : 28) * scale,
                  borderTopRightRadius: (selectedDevice.os === 'ios' ? 38 : 28) * scale,
                  borderBottomLeftRadius: (selectedDevice.os === 'ios' ? 38 : 28) * scale,
                  borderBottomRightRadius: (selectedDevice.os === 'ios' ? 38 : 28) * scale,
                  paddingTop: (selectedDevice.os === 'ios' ? 34 : 28) * scale,
                },
              ]}
            >
              <AppNavigator />
            </View>

            {/* Bottom Home Indicator Bar */}
            <View style={[styles.homeIndicatorBar, { height: 18 * scale }]}>
              <View
                style={[
                  styles.homeIndicator,
                  {
                    width: 130 * scale,
                    height: 4 * scale,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }

  // Native mobile device (iOS/Android Expo Go) or small mobile screen viewport - Fits 100% of any screen
  return (
    <SafeAreaProvider>
      <View style={styles.nativeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Floating return button if desktop user switched to Full View */}
        {fullscreenMobile && isDesktop && (
          <TouchableOpacity
            style={styles.floatingFrameReturnBtn}
            onPress={() => setFullscreenMobile(false)}
            activeOpacity={0.8}
          >
            <Ionicons name="phone-portrait-outline" size={15} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.floatingFrameReturnText}>Return to Mobile Frame</Text>
          </TouchableOpacity>
        )}

        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  webDesktopBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  deviceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
    maxWidth: 900,
    width: '95%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  deviceBarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  deviceBarTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  presetButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  presetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetBtnActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0284C7',
  },
  presetBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  presetBtnTextActive: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  deviceDimPill: {
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  deviceDimPillActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  deviceDimText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '600',
  },
  deviceDimTextActive: {
    color: '#38BDF8',
  },
  fullscreenToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
    marginLeft: 4,
  },
  fullscreenToggleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  phoneFrame: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 25,
  },
  dynamicIslandContainer: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  dynamicIsland: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  islandCamera: {
    borderRadius: 5,
    backgroundColor: '#1E293B',
  },
  islandSensor: {
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  androidPunchHole: {
    backgroundColor: '#000000',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    overflow: 'hidden',
  },
  homeIndicatorBar: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    backgroundColor: '#94A3B8',
    borderRadius: 4,
  },
  floatingFrameReturnBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  floatingFrameReturnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
