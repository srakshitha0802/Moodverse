import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';

interface Post {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
  isLiked?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'SereneMind',
    content: 'Box breathing exercises really helped me overcome an afternoon panic spike today. Grateful for this space!',
    time: '2 hours ago',
    likes: 14,
  },
  {
    id: 'p2',
    author: 'GentleBreeze',
    content: 'Remember to drink water and take 5 deep breaths. You are doing much better than you think.',
    time: '4 hours ago',
    likes: 29,
  },
  {
    id: 'p3',
    author: 'QuietSoul',
    content: 'The Sukhasana yoga pose with the 3-minute timer relaxed my tight lower back and racing thoughts completely.',
    time: '8 hours ago',
    likes: 19,
  },
  {
    id: 'p4',
    author: 'HopefulDawn',
    content: 'Sending positive energy to anyone feeling overwhelmed right now. Step by step, breath by breath.',
    time: '1 day ago',
    likes: 38,
  },
];

const QUICK_PROMPTS = [
  'I feel anxious right now',
  'Help me calm down before sleep',
  'I feel overwhelmed by tasks',
  'Give me a 2-minute mindful reset',
];

export default function CommunityScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'board' | 'chat'>('board');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello, I'm your Moodverse mindfulness companion. How are you feeling right now? I'm here to listen, offer calming perspectives, and support your emotional balance.",
      timestamp: 'Now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('moodverse_community_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
      const savedChat = await AsyncStorage.getItem('moodverse_community_chat');
      if (savedChat) {
        setChatMessages(JSON.parse(savedChat));
      }
    } catch {}
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: 'p_' + Date.now(),
      author: 'KindTraveler',
      content: newPostText.trim(),
      time: 'Just now',
      likes: 1,
      isLiked: true,
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    setNewPostText('');
    try {
      await AsyncStorage.setItem('moodverse_community_posts', JSON.stringify(updated));
    } catch {}
  };

  const handleLike = async (id: string) => {
    const updated = posts.map((p) => {
      if (p.id === id) {
        const liked = !p.isLiked;
        return { ...p, isLiked: liked, likes: liked ? p.likes + 1 : p.likes - 1 };
      }
      return p;
    });
    setPosts(updated);
    try {
      await AsyncStorage.setItem('moodverse_community_posts', JSON.stringify(updated));
    } catch {}
  };

  const handleSendMessage = (textToSend?: string) => {
    const msg = (textToSend ?? chatInput).trim();
    if (!msg) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: msg,
      timestamp: 'Just now',
    };

    const newChat = [...chatMessages, userMsg];
    setChatMessages(newChat);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(async () => {
      let reply = "I hear you. Take a slow, gentle breath with me. Inhale for 4 seconds, and release for 6 seconds. You don't have to solve everything all at once.";
      const lower = msg.toLowerCase();
      if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('panic')) {
        reply = "Anxiety is a natural signal, but it is not dangerous. Ground yourself: feel your feet on the floor, unclench your jaw, and try our Guided Box Breathing in the Meditation tab.";
      } else if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('night')) {
        reply = "Rest is gentle. Dim your screen lights, let your shoulders drop away from your ears, and tune into the Calming Music tab for soothing delta binaural frequencies.";
      } else if (lower.includes('overwhelm') || lower.includes('stressed') || lower.includes('stress')) {
        reply = "When everything feels heavy, narrow your world to just the next 5 minutes. What is one small, kind thing you can do for your body right now? A glass of cool water is a wonderful first step.";
      } else if (lower.includes('reset')) {
        reply = "Here is your 2-minute reset: 1) Close your eyes. 2) Roll your shoulders backwards 3 times. 3) Place a hand over your heart and feel 4 slow, full breaths. You are safe in this moment.";
      }

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: reply,
        timestamp: 'Just now',
      };

      const finalChat = [...newChat, aiMsg];
      setChatMessages(finalChat);
      setIsAiTyping(false);
      try {
        await AsyncStorage.setItem('moodverse_community_chat', JSON.stringify(finalChat));
      } catch {}
    }, 700);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader navigation={navigation} title="Community" />

      {/* Segmented Top Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'board' && styles.tabBtnActive]}
          onPress={() => setActiveTab('board')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="people-outline"
            size={16}
            color={activeTab === 'board' ? '#0284C7' : '#64748B'}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.tabBtnText, activeTab === 'board' && styles.tabBtnTextActive]}>
            Peer Circle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'chat' && styles.tabBtnActive]}
          onPress={() => setActiveTab('chat')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={16}
            color={activeTab === 'chat' ? '#0284C7' : '#64748B'}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.tabBtnText, activeTab === 'chat' && styles.tabBtnTextActive]}>
            AI Companion
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab 1: Peer Circle */}
      {activeTab === 'board' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Post Creation Box */}
          <View style={styles.postComposerCard}>
            <Text style={styles.composerHeading}>Share an Uplifting Reflection</Text>
            <TextInput
              style={styles.composerInput}
              placeholder="What helped your calm or gratitude today? (Anonymous)"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={newPostText}
              onChangeText={setNewPostText}
              maxLength={280}
            />
            <View style={styles.composerFooter}>
              <View style={styles.privacyBadge}>
                <Ionicons name="lock-closed-outline" size={13} color="#0D9488" />
                <Text style={styles.privacyBadgeText}>100% Anonymous</Text>
              </View>
              <TouchableOpacity
                style={[styles.postSubmitBtn, !newPostText.trim() && { opacity: 0.5 }]}
                onPress={handleCreatePost}
                disabled={!newPostText.trim()}
                activeOpacity={0.8}
              >
                <Ionicons name="send-outline" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.postSubmitBtnText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Posts Feed */}
          <View style={styles.feedHeader}>
            <Text style={styles.feedTitle}>Shared Reflections</Text>
            <Text style={styles.feedSubtitle}>Encouragement & mindful moments</Text>
          </View>

          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeaderRow}>
                <View style={styles.avatarCircle}>
                  <Ionicons name="person-outline" size={14} color="#0284C7" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.likeButton, post.isLiked && styles.likeButtonActive]}
                  onPress={() => handleLike(post.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={post.isLiked ? 'heart' : 'heart-outline'}
                    size={16}
                    color={post.isLiked ? '#E11D48' : '#64748B'}
                  />
                  <Text style={[styles.likeCount, post.isLiked && { color: '#E11D48', fontWeight: '700' }]}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        /* Tab 2: AI Companion Chat */
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={20}
        >
          <ScrollView
            contentContainerStyle={styles.chatScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Quick Prompts */}
            <View style={styles.promptsContainer}>
              <Text style={styles.promptsHeader}>Suggested Conversation Starters:</Text>
              <View style={styles.promptPillsRow}>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.promptPill}
                    onPress={() => handleSendMessage(prompt)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="sparkles-outline" size={13} color="#0284C7" style={{ marginRight: 4 }} />
                    <Text style={styles.promptPillText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Chat Messages */}
            {chatMessages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.chatBubbleRow,
                  m.sender === 'user' ? styles.chatBubbleRowUser : styles.chatBubbleRowAi,
                ]}
              >
                {m.sender === 'ai' && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles-outline" size={14} color="#0284C7" />
                  </View>
                )}
                <View
                  style={[
                    styles.chatBubble,
                    m.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleAi,
                  ]}
                >
                  <Text
                    style={[
                      styles.chatText,
                      m.sender === 'user' ? styles.chatTextUser : styles.chatTextAi,
                    ]}
                  >
                    {m.text}
                  </Text>
                </View>
              </View>
            ))}

            {isAiTyping && (
              <View style={[styles.chatBubbleRow, styles.chatBubbleRowAi]}>
                <View style={styles.aiAvatar}>
                  <Ionicons name="sparkles-outline" size={14} color="#0284C7" />
                </View>
                <View style={[styles.chatBubble, styles.chatBubbleAi, { paddingVertical: 10, paddingHorizontal: 14 }]}>
                  <Text style={{ fontSize: 13, color: '#64748B', fontStyle: 'italic' }}>Thinking with calm care...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Chat Input Bar */}
          <View style={styles.chatInputBar}>
            <TextInput
              style={styles.chatTextInput}
              placeholder="Share what's on your mind..."
              placeholderTextColor="#94A3B8"
              value={chatInput}
              onChangeText={setChatInput}
              onSubmitEditing={() => handleSendMessage()}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.chatSendBtn, !chatInput.trim() && { opacity: 0.5 }]}
              onPress={() => handleSendMessage()}
              disabled={!chatInput.trim()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtnActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#BAE6FD',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  postComposerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  composerHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  composerInput: {
    backgroundColor: '#FAF9F6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    fontSize: 13,
    color: '#0F172A',
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  composerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  privacyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  postSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  postSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  feedHeader: {
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  feedSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  postHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  postTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  likeButtonActive: {
    backgroundColor: '#FFE4E6',
    borderColor: '#FECDD3',
  },
  likeCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  postContent: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  chatScroll: {
    padding: 16,
    paddingBottom: 24,
  },
  promptsContainer: {
    marginBottom: 16,
  },
  promptsHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  promptPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  promptPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  chatBubbleRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
  },
  chatBubbleRowAi: {
    justifyContent: 'flex-start',
  },
  chatBubbleRowUser: {
    justifyContent: 'flex-end',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 2,
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
  },
  chatBubbleAi: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  chatBubbleUser: {
    backgroundColor: '#0284C7',
    borderBottomRightRadius: 4,
  },
  chatText: {
    fontSize: 13,
    lineHeight: 19,
  },
  chatTextAi: {
    color: '#0F172A',
  },
  chatTextUser: {
    color: '#FFFFFF',
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  chatTextInput: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0F172A',
  },
  chatSendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
