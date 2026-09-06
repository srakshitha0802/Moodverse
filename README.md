# Moodverse — Mindful Wellness Mobile App

> A serene, elegant mental wellness and mood tracking mobile application built with **React Native** and **Expo Go**, designed around a soothing **White Pastel** aesthetic and 100% clean typography with **Google Ionicons**.

---

## Key Features

### 1. Mindful Games Studio (Anti-Stress & Sensory Play)
- **Tension Bubble Pop**: Interactive floating stress bubbles with pop mechanics, haptics, score tracking, and instant refill.
- **Calm Acoustic Piano**: 7-note acoustic tuned keyboard with real-time harmonic soundwave animations.
- **Zen Garden Pattern Rake**: Soothing interactive sand raking canvas with 4 guided rake patterns (Ripples, Spiral, Concentric, Waves).
- **Gratitude Breathing Jar**: Jar of glowing gratitude stars where users capture and store daily thankful moments.
- **Affirmation Match**: Uplifting memory card matching game featuring mindful affirmations.

### 2. Wholesome Memes Hub
- 5 curated wellness categories: *Wholesome*, *Relatable*, *Healing*, *Motivation*, *Cute Animals*.
- **Surprise Me** instant mood booster generator.
- Persistent **Saved Favorites** tab with like and bookmark counters.

### 3. Advanced AI Mood Scanner
- **Dual-Mode Detection**:
  - **Live Facial Expression Biometric Detection**: Analyzes real-time facial indicators (forehead engagement, eye smiles, lip curvature) to identify dominant emotional states.
  - **Interactive Multi-Factor Questionnaire**: Evaluates energy, cognitive clarity, tension, and social drive.
- Comprehensive emotion breakdown charts, confidence scoring, therapeutic advice, and personalized wellness activity recommendations.

### 4. Yoga Postures & Guided Breathwork
- Guided yoga sessions including:
  - *Sukhasana* (Easy Pose + Deep Breathing)
  - *Viparita Karani* (Legs-Up-the-Wall)
  - *Paschimottanasana* (Seated Forward Fold)
  - *Setu Bandhasana* (Bridge Pose)
  - *Savasana* (Corpse Pose)
  - *Balasana* (Child's Pose)
  - *Bhujangasana* (Cobra Pose)
  - *Vrikshasana* (Tree Pose)
  - *Tadasana* (Mountain Pose)
- **Guided Meditation Breathing Timer** with customizable respiratory patterns:
  - *Deep Belly Breathing* (Inhale 4s → Exhale 6s)
  - *Box Breathing* (Inhale 4s → Hold 4s → Exhale 4s → Hold 4s)
  - *4–6 Calming Breath* (Inhale 4s → Exhale 6s)
  - *Diaphragmatic Breathing* (Slow belly inhale → Slow exhale)
  - *Extended Exhale* (Inhale 4s → Exhale 8s)

### 5. 3D VR Sanctuaries
- Immersive 360° virtual environments (Forest Dawn, Ocean Sunset, Mountain Zen, Starry Galaxy) designed for mindfulness and sensory relaxation.

### 6. Mindful Journal & Music Therapy
- Reflection journal with mood tags, search, and daily prompts.
- Ambient soundscapes, binaural beats, and lo-fi calming audio player.

### 7. Unified Header Navigation
- Responsive top header with quick-access navigation drawer categorizing all 11 destinations (*Sanctuary & Immersion*, *Play & Interactive*, *Body & Mind*, *Reflection & Care*).

---

## Design System

- **Color Palette**: Calming White Pastel system (`#FAF9F6` background, `#FFFFFF` rounded cards, gentle borders, soft pastel badge accents in mint, lavender, peach, sky blue).
- **Typography & Icons**: 100% Zero Emojis throughout the app; replaced with clean, modern **Google Ionicons** (`@expo/vector-icons`).
- **Mobile Responsive**: Adapts seamlessly to any iOS, Android, and Web viewport size.

---

## Tech Stack

- **Framework**: React Native (0.86) with Expo SDK 57
- **Navigation**: React Navigation v7 (Native Stack & Bottom Tabs)
- **Icons**: Expo Vector Icons (Ionicons)
- **Storage**: `@react-native-async-storage/async-storage`
- **Audio & Animations**: Expo AV, React Native Animated & LayoutAnimation
- **Web & Mobile Support**: Universal compatibility via `@expo/metro-runtime` and `react-native-web`

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- **Expo Go** app on your iOS or Android device

### Installation
```bash
# Clone repository
git clone https://github.com/srakshitha0802/Moodverse.git
cd Moodverse

# Install dependencies
npm install
```

### Running the App
```bash
# Start the Expo development server
npx expo start

# Start on web directly
npx expo start --web
```

- Scan the generated QR code in your terminal using the **Expo Go** app (Android) or Camera app (iOS).
- Or press `w` to open in your web browser.

---

## License

This project is licensed under the MIT License.
