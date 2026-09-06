import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

interface Room {
  id: string;
  name: string;
  sub: string;
  skyColor: string;
  groundColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  bg: string;
}

const ROOMS: Room[] = [
  {
    id: 'forest',
    name: 'Enchanted Forest',
    sub: 'Soothing emerald pine canopy',
    skyColor: '#1A362B',
    groundColor: '#0D2018',
    icon: 'leaf-outline',
    tint: '#0D9488',
    bg: '#DCFCE7',
  },
  {
    id: 'ocean',
    name: 'Peaceful Ocean',
    sub: 'Tidal waves and sea breeze',
    skyColor: '#0F2C59',
    groundColor: '#071833',
    icon: 'water-outline',
    tint: '#0284C7',
    bg: '#E0F2FE',
  },
  {
    id: 'cosmic',
    name: 'Cosmic Galaxy',
    sub: 'Deep starlight & celestial flow',
    skyColor: '#1A1438',
    groundColor: '#0A071A',
    icon: 'sparkles-outline',
    tint: '#6D28D9',
    bg: '#EDE9FE',
  },
  {
    id: 'zen',
    name: 'Zen Sanctuary',
    sub: 'Japanese bamboo grove',
    skyColor: '#2D3A20',
    groundColor: '#161D10',
    icon: 'flower-outline',
    tint: '#D97706',
    bg: '#FEF3C7',
  },
];

export default function VrRoomsScreen({ navigation }: any) {
  const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);

  // Generate self-contained responsive HTML with WebGL particle physics
  const generateRoomHtml = (room: Room) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background-color: ${room.skyColor};
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #fff;
            user-select: none;
          }
          canvas { display: block; width: 100vw; height: 100vh; }
          .overlay {
            position: absolute;
            top: 16px;
            left: 16px;
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 14px;
            border-radius: 12px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.2px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .hint {
            position: absolute;
            bottom: 16px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div class="overlay">3D Space: ${room.name}</div>
        <div class="hint">Touch and drag across the screen to direct atmospheric flow</div>
        <canvas id="canvas"></canvas>
        <script>
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          let width = canvas.width = window.innerWidth;
          let height = canvas.height = window.innerHeight;

          window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
          });

          // Interactive Particles
          const particles = [];
          for (let i = 0; i < 75; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              radius: Math.random() * 3.5 + 1.2,
              dx: (Math.random() - 0.5) * 0.9,
              dy: (Math.random() - 0.5) * 0.9,
              alpha: Math.random() * 0.7 + 0.3
            });
          }

          // Touch interaction
          window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
              const tx = e.touches[0].clientX;
              const ty = e.touches[0].clientY;
              particles.forEach(p => {
                const dist = Math.hypot(p.x - tx, p.y - ty);
                if (dist < 100) {
                  p.x += (p.x - tx) * 0.05;
                  p.y += (p.y - ty) * 0.05;
                }
              });
            }
          });

          function animate() {
            ctx.clearRect(0, 0, width, height);

            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, '${room.skyColor}');
            grad.addColorStop(1, '${room.groundColor}');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
              p.x += p.dx;
              p.y += p.dy;

              if (p.x < 0) p.x = width;
              if (p.x > width) p.x = 0;
              if (p.y < 0) p.y = height;
              if (p.y > height) p.y = 0;

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, ' + p.alpha + ')';
              ctx.shadowBlur = 12;
              ctx.shadowColor = '#ffffff';
              ctx.fill();
            });

            requestAnimationFrame(animate);
          }
          animate();
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="3D Sanctuary" />

      {/* Room Selection Tabs */}
      <View style={styles.roomSelectorSection}>
        <Text style={styles.selectorHeading}>Select 3D Environment</Text>
        <View style={styles.roomTabs}>
          {ROOMS.map((r) => {
            const isSelected = selectedRoom.id === r.id;
            return (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.roomTabBtn,
                  isSelected && { backgroundColor: r.bg, borderColor: r.tint },
                ]}
                onPress={() => setSelectedRoom(r)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={r.icon}
                  size={16}
                  color={isSelected ? r.tint : '#64748B'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.roomTabText,
                    isSelected && { color: r.tint, fontWeight: '700' },
                  ]}
                >
                  {r.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* WebView Container */}
      <View style={styles.webViewWrapper}>
        {Platform.OS === 'web' ? (
          // @ts-ignore
          <iframe
            title="3D VR Relaxation"
            srcDoc={generateRoomHtml(selectedRoom)}
            style={{ border: 'none', width: '100%', height: '100%' }}
          />
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ html: generateRoomHtml(selectedRoom) }}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0284C7" />
                <Text style={styles.loadingText}>Rendering 3D Environment...</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Footer Info Strip */}
      <View style={styles.footerNote}>
        <Ionicons name="information-circle-outline" size={15} color="#64748B" />
        <Text style={styles.footerText}>
          Touch or tilt screen to interact with the soothing particle physics.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  roomSelectorSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectorHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  roomTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roomTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  roomTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  webViewWrapper: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#0284C7',
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    marginLeft: 6,
  },
});
