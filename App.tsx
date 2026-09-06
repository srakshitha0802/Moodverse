import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isWideWeb = isWeb && windowWidth > 540;

  // On wide web screens, present the app inside an authentic mobile device frame
  if (isWideWeb) {
    return (
      <SafeAreaProvider>
        <View style={styles.webDesktopBackground}>
          <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

          {/* Smartphone Frame Container */}
          <View
            style={[
              styles.phoneFrame,
              {
                width: Math.min(414, windowWidth - 24),
                height: Math.min(880, windowHeight - 24),
              },
            ]}
          >
            {/* Phone Top Notch / Dynamic Island */}
            <View style={styles.dynamicIslandContainer}>
              <View style={styles.dynamicIsland}>
                <View style={styles.islandCamera} />
                <View style={styles.islandSensor} />
              </View>
            </View>

            {/* Inner Phone Screen */}
            <View style={styles.phoneScreen}>
              <AppNavigator />
            </View>

            {/* Bottom Home Indicator Bar */}
            <View style={styles.homeIndicatorBar}>
              <View style={styles.homeIndicator} />
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }

  // Native mobile device (iOS/Android Expo Go) - Fits 100% of any screen size
  return (
    <SafeAreaProvider>
      <View style={styles.nativeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  phoneFrame: {
    backgroundColor: '#0F172A',
    borderRadius: 48,
    borderWidth: 10,
    borderColor: '#1E293B',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 20,
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
    width: 110,
    height: 26,
    backgroundColor: '#000000',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  islandCamera: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E293B',
  },
  islandSensor: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
    paddingTop: 32,
  },
  homeIndicatorBar: {
    height: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    width: 130,
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 4,
  },
});
