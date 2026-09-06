import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../navigation/AppNavigator';

export default function ContactScreen({ navigation }: any) {
  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const sendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with Navigation Menu */}
      <AppHeader navigation={navigation} title="Crisis & Support" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pastel Banner */}
        <LinearGradient
          colors={['#FFE4E6', '#EDE9FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark-outline" size={13} color="#E11D48" />
              <Text style={styles.badgeText}>24/7 Immediate Help</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Crisis Lifeline & Care</Text>
          <Text style={styles.bannerSubtitle}>
            If you or a loved one is experiencing acute emotional crisis, confidential help is available 24/7.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Emergency Crisis Helplines */}
          <Text style={styles.sectionHeading}>Immediate Emergency Helplines</Text>

          {/* 988 Lifeline */}
          <TouchableOpacity
            style={styles.crisisCard}
            onPress={() => callNumber('988')}
            activeOpacity={0.8}
          >
            <View style={styles.crisisIconBox}>
              <Ionicons name="call" size={22} color="#BE123C" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.crisisTitle}>Suicide & Crisis Lifeline</Text>
                <View style={styles.emergencyTag}>
                  <Text style={styles.emergencyTagText}>24/7 TOLL-FREE</Text>
                </View>
              </View>
              <Text style={styles.crisisNumber}>Dial 988</Text>
              <Text style={styles.crisisSub}>Free, confidential support across the US & Canada</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#BE123C" />
          </TouchableOpacity>

          {/* Crisis Text Line */}
          <TouchableOpacity
            style={styles.crisisCardAlt}
            onPress={() => Linking.openURL('sms:741741?body=HOME')}
            activeOpacity={0.8}
          >
            <View style={styles.crisisIconBoxAlt}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#D97706" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.crisisTitleAlt}>Crisis Text Line</Text>
              <Text style={styles.crisisNumberAlt}>Text HOME to 741741</Text>
              <Text style={styles.crisisSubAlt}>Connect with a volunteer crisis counselor via text</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D97706" />
          </TouchableOpacity>

          {/* Platform & Developer Contact */}
          <Text style={[styles.sectionHeading, { marginTop: 18 }]}>Platform & Developer Info</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconBox}>
                <Ionicons name="person-outline" size={16} color="#0284C7" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Developer</Text>
                <Text style={styles.infoValue}>Semala Rakshitha</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => callNumber('+918639975744')}
              activeOpacity={0.7}
            >
              <View style={styles.infoIconBox}>
                <Ionicons name="call-outline" size={16} color="#0284C7" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Phone Support</Text>
                <Text style={[styles.infoValue, { color: '#0284C7' }]}>+91 8639975744</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => sendEmail('rakshithasemala@gmail.com')}
              activeOpacity={0.7}
            >
              <View style={styles.infoIconBox}>
                <Ionicons name="mail-outline" size={16} color="#0284C7" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Email Support</Text>
                <Text style={[styles.infoValue, { color: '#0284C7' }]}>rakshithasemala@gmail.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
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
    color: '#E11D48',
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
  crisisCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    padding: 16,
    borderRadius: 18,
    marginBottom: 10,
  },
  crisisIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crisisTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  emergencyTag: {
    backgroundColor: '#BE123C',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  emergencyTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  crisisNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: '#BE123C',
    marginVertical: 2,
  },
  crisisSub: {
    fontSize: 11,
    color: '#64748B',
  },
  crisisCardAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    padding: 16,
    borderRadius: 18,
    marginBottom: 10,
  },
  crisisIconBoxAlt: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crisisTitleAlt: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  crisisNumberAlt: {
    fontSize: 15,
    fontWeight: '800',
    color: '#D97706',
    marginVertical: 2,
  },
  crisisSubAlt: {
    fontSize: 11,
    color: '#64748B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
});
