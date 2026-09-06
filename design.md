# Moodverse Design System & UI Architecture (DESIGN.md)

This document establishes the authoritative Design System, UI guidelines, typography hierarchy, component specifications, and color palette for the **Moodverse** application.

---

## 🎨 Design Principles

1. **Calm & Emotionally Grounding**: Soothing, dark-mode-first aesthetic with deep slate midnight blues (`#0B0F19`), subtle cyan highlights (`#38BDF8`), and soft mint green accents (`#34D399`).
2. **Generous Whitespace & Alignment**: Clean visual rhythm with strict 8px grid alignment, balanced padding, and zero visual clutter.
3. **Structured Visual Hierarchy**: Clear heading contrast, legible text scales, refined subtle borders, and intentional shadow elevations.
4. **Accessible & Responsive**: Accessible text contrast ratios (WCAG AA compliant), responsive desktop/tablet/mobile layouts, and smooth micro-interactions.
5. **Functionality Preservation**: 100% feature preservation with clean visual categorization and progressive disclosure.

---

## 🖌️ Color Palette (Design Tokens)

| Role | Token Name | Hex / Value | Description |
| :--- | :--- | :--- | :--- |
| **Background** | `--bg-primary` | `#0B0F19` | Main page deep midnight background |
| **Surface/Card** | `--bg-surface` | `#151C2C` | Card and modal container surface |
| **Surface Elev.** | `--bg-surface-hover` | `#1E293B` | Interactive hover and active state surface |
| **Border** | `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Refined thin container border |
| **Border Highlight**| `--border-accent` | `#2563EB` | Active/Focused input and card border |
| **Primary Brand** | `--brand-primary` | `#38BDF8` | Primary CTA, links, and active badges |
| **Secondary Brand**| `--brand-indigo` | `#818CF8` | Supporting ambient highlights |
| **Wellness Accent** | `--accent-mint` | `#34D399` | Positive mood indicators, meditation status |
| **Warning/Notice** | `--status-warn` | `#F59E0B` | Gentle notice and anxiety alert badges |
| **Error/Crisis** | `--status-danger` | `#EF4444` | Helpline buttons and error states |
| **Text Primary** | `--text-primary` | `#F8FAFC` | Main headings, body text, primary labels |
| **Text Muted** | `--text-secondary` | `#94A3B8` | Subtitles, metadata, form helper text |

---

## 📐 Typography Hierarchy

Font Family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

- **Display Heading**: `32px / 1.2` • Bold (`700`) • Letter spacing `-0.02em`
- **H1 Heading**: `24px / 1.3` • Bold (`700`) • Letter spacing `-0.01em`
- **H2 Heading**: `20px / 1.4` • SemiBold (`600`)
- **H3 Heading**: `16px / 1.4` • SemiBold (`600`)
- **Body Regular**: `14px / 1.5` • Regular (`400`)
- **Body Small**: `13px / 1.5` • Regular (`400`)
- **Captions / Meta**: `12px / 1.4` • Medium (`500`)
- **Button Text**: `14px / 1.0` • SemiBold (`600`) • Letter spacing `0.01em`

---

## 🧩 Component Standards

### 1. Buttons (`.btn`)
- **Primary Button (`.btn-primary`)**: Solid `#38BDF8` background with `#0B0F19` text, 10px radius, 12px 20px padding.
- **Secondary Button (`.btn-secondary`)**: Translucent `#1E293B` background with subtle border, `#F8FAFC` text.
- **Ghost/Outline Button (`.btn-outline`)**: Transparent background with 1px `rgba(255,255,255,0.15)` border.
- **Danger Button (`.btn-danger`)**: Soft red container for crisis call actions (`#EF4444`).

### 2. Cards (`.card`)
- Background: `#151C2C`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Border Radius: `16px`
- Padding: `20px` (Desktop) / `16px` (Mobile)
- Hover Effect: Subtle upward shift (`translateY(-2px)`) and border glow (`#38BDF8`).

### 3. Header & Navigation (`.site-header`)
- Clean glassmorphism header (`backdrop-filter: blur(12px)`).
- Clear brand logo with brain icon 🧠.
- Active navigation link indicator with bottom pill highlight.
- Responsive mobile menu drawer with smooth toggle animation.

---

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` (Single column layout, vertical stacked navigation, compact padding)
- **Tablet**: `640px - 1024px` (2-column grids, collapsible sidebar/header)
- **Desktop**: `> 1024px` (Full grid layouts, fixed sticky headers, spacious multi-column cards)

---

## 🔍 Functionality Audit Checklist

- [x] Home Page (Hero overview, mood quick check, feature grid, quotes)
- [x] Mood Scanner & Detector (Interactive facial/emotion scan & questionnaire)
- [x] Guided Meditation & Breathing Visualizer
- [x] Restorative Yoga Sessions & Poses
- [x] 3D VR Relaxation Rooms & WebGL Environments
- [x] Interactive Calming Games (Bubble Popper, Color Match, Calm Tap)
- [x] Books & Reading Library
- [x] Ambient Music & Soundscapes Player
- [x] Emotional Journal & Reflection Tracker (LocalStorage)
- [x] Wellness Dashboard & Analytics Charts
- [x] Supportive Community Forum & Discussion Board
- [x] Video Call / Therapy Session Interface
- [x] Emergency Crisis Helplines & Contact Details
