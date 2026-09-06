import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  userData: any;
  onLogout: () => void;
}

interface MenuItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  desc: string;
  tag?: string;
  tagType?: 'ai' | 'hot' | 'help';
  pastelBg: string;
  iconColor: string;
}

interface MenuCategory {
  title: string;
  icon: React.ReactNode;
  badge: string;
  items: MenuItem[];
}

/* ==========================================================================
   CLEAN VECTOR SVG ICONS (100% EMOJI-FREE)
   ========================================================================== */
const Icons = {
  Logo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Crisis: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  AI: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
  Scan: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Meditation: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Yoga: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="m4 17 6-2 2 4 4-2" />
      <path d="m8 12 4-2 4 2" />
      <path d="M12 10v7" />
    </svg>
  ),
  Therapy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  VR: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <circle cx="8" cy="12" r="2.5" />
      <circle cx="16" cy="12" r="2.5" />
      <line x1="10.5" y1="12" x2="13.5" y2="12" />
    </svg>
  ),
  VRLibrary: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
    </svg>
  ),
  Games: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="11" r="1" />
      <circle cx="17" cy="13" r="1" />
    </svg>
  ),
  Arcade: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="3" />
      <circle cx="12" cy="9" r="4" />
      <circle cx="9" cy="17" r="1.5" />
      <circle cx="15" cy="17" r="1.5" />
    </svg>
  ),
  Music: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Joy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  Books: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Analytics: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Journal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Community: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  VideoCall: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  Helpline: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  ),
  Contact: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Logout: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Compass: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Shield: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
};

const MENU_CATEGORIES: MenuCategory[] = [
  {
    title: 'Core Wellbeing & AI',
    icon: <Icons.AI />,
    badge: 'Core Tools',
    items: [
      {
        path: '/',
        name: 'Home',
        icon: <Icons.Home />,
        desc: 'Sanctuary overview & daily pulse',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/experience',
        name: 'AI Companion',
        icon: <Icons.AI />,
        desc: 'Interactive emotional chat guide',
        tag: 'AI',
        tagType: 'ai',
        pastelBg: 'var(--pastel-lavender)',
        iconColor: '#6366F1',
      },
      {
        path: '/mood',
        name: 'Mood Scanner',
        icon: <Icons.Scan />,
        desc: 'Facial emotion & state detector',
        tag: 'SCAN',
        tagType: 'hot',
        pastelBg: 'var(--pastel-sage)',
        iconColor: '#0D9488',
      },
      {
        path: '/meditation',
        name: 'Meditation',
        icon: <Icons.Meditation />,
        desc: 'Breathing visualizer & zen audio',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/yoga',
        name: 'Yoga Practice',
        icon: <Icons.Yoga />,
        desc: 'Restorative postures & flows',
        pastelBg: 'var(--pastel-sage)',
        iconColor: '#15803D',
      },
      {
        path: '/therapy',
        name: 'Therapy Sessions',
        icon: <Icons.Therapy />,
        desc: 'Cognitive self-care guidance',
        pastelBg: 'var(--pastel-rose)',
        iconColor: '#E11D48',
      },
    ],
  },
  {
    title: 'Immersive & Relaxation',
    icon: <Icons.VR />,
    badge: 'Calm Spaces',
    items: [
      {
        path: '/vr',
        name: '3D VR Sanctuary',
        icon: <Icons.VR />,
        desc: '360° peaceful virtual rooms',
        tag: '3D VR',
        tagType: 'hot',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/vr-library',
        name: 'VR 3D Library',
        icon: <Icons.VRLibrary />,
        desc: 'Interactive wisdom archive',
        pastelBg: 'var(--pastel-lavender)',
        iconColor: '#6D28D9',
      },
      {
        path: '/games',
        name: 'Mindful Games',
        icon: <Icons.Games />,
        desc: 'Bubble popper & sensory puzzles',
        pastelBg: 'var(--pastel-amber)',
        iconColor: '#D97706',
      },
      {
        path: '/gaming-room',
        name: 'Gaming Room',
        icon: <Icons.Arcade />,
        desc: 'Retro relaxation minigames',
        pastelBg: 'var(--pastel-lavender)',
        iconColor: '#6366F1',
      },
      {
        path: '/music',
        name: 'Calming Music',
        icon: <Icons.Music />,
        desc: 'Binaural soundscapes & nature',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/memes',
        name: 'Joy & Uplift',
        icon: <Icons.Joy />,
        desc: 'Positive humor & mental boosts',
        pastelBg: 'var(--pastel-amber)',
        iconColor: '#B45309',
      },
      {
        path: '/books',
        name: 'Wellness Books',
        icon: <Icons.Books />,
        desc: 'Curated mental health literature',
        pastelBg: 'var(--pastel-sage)',
        iconColor: '#0D9488',
      },
    ],
  },
  {
    title: 'Support, Tracking & Connection',
    icon: <Icons.Community />,
    badge: 'Care Network',
    items: [
      {
        path: '/dashboard',
        name: 'Mood Analytics',
        icon: <Icons.Analytics />,
        desc: 'Weekly wellbeing trends & stats',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/journal',
        name: 'Daily Journal',
        icon: <Icons.Journal />,
        desc: 'Private reflections & notes',
        pastelBg: 'var(--pastel-sage)',
        iconColor: '#15803D',
      },
      {
        path: '/community',
        name: 'Community Circle',
        icon: <Icons.Community />,
        desc: 'Safe anonymous peer support',
        pastelBg: 'var(--pastel-lavender)',
        iconColor: '#6366F1',
      },
      {
        path: '/call',
        name: 'Video Care Call',
        icon: <Icons.VideoCall />,
        desc: 'Supportive video session',
        pastelBg: 'var(--pastel-sky)',
        iconColor: '#0284C7',
      },
      {
        path: '/resources',
        name: 'Crisis Helplines',
        icon: <Icons.Helpline />,
        desc: '24/7 confidential safety support',
        tag: '24/7',
        tagType: 'help',
        pastelBg: 'var(--pastel-rose)',
        iconColor: '#E11D48',
      },
      {
        path: '/contact',
        name: 'Contact Us',
        icon: <Icons.Contact />,
        desc: 'Direct developer & care support',
        pastelBg: 'var(--pastel-amber)',
        iconColor: '#D97706',
      },
    ],
  },
];

export default function Layout({ userData, onLogout }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Automatically close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Total features count
  const totalItemsCount = useMemo(() => {
    return MENU_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MENU_CATEGORIES;

    return MENU_CATEGORIES.map((cat) => {
      const filteredItems = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      );
      return { ...cat, items: filteredItems };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main">Skip to main content</a>
      
      {/* Serene White Pastel Header */}
      <header className="site-header">
        <div className="container header-inner">
          {/* Brand Logo with Clean Vector Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link to="/" className="brand-logo" title="Moodverse Sanctuary">
              <span className="brand-icon-wrapper">
                <Icons.Logo />
              </span>
              <span>Moodverse</span>
            </Link>
            <span className="brand-badge">AI Sanctuary</span>
          </div>

          {/* Right Actions */}
          <div className="header-right-actions">
            {/* Quick 24/7 Crisis Support Pill */}
            <Link to="/resources" className="header-crisis-pill" title="Emergency 24/7 Lifelines">
              <Icons.Crisis />
              <span>24/7 Crisis: 988</span>
            </Link>

            {/* Menu Button */}
            <button
              className={`main-menu-btn ${menuOpen ? 'active' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="main-menu-drawer"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="menu-icon-bars" aria-hidden="true">
                <span className="menu-icon-bar" />
                <span className="menu-icon-bar" />
                <span className="menu-icon-bar" />
              </span>
              <span>Menu</span>
              <span className="menu-badge-pill">{totalItemsCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Over Menu Backdrop */}
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-Over White Pastel Menu Drawer */}
      {menuOpen && (
        <aside
          id="main-menu-drawer"
          className="menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Moodverse Navigation Menu"
        >
          {/* Drawer Top Header */}
          <div className="menu-drawer-header">
            <div className="menu-drawer-title-group">
              <div className="menu-drawer-header-icon">
                <Icons.Compass />
              </div>
              <div>
                <h2 className="menu-drawer-title">Navigation Hub</h2>
                <div className="menu-drawer-subtitle">
                  {totalItemsCount} wellness tools & sanctuary spaces
                </div>
              </div>
            </div>

            <button
              className="menu-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              title="Close menu (Esc)"
            >
              <Icons.Close />
            </button>
          </div>

          {/* Live Search Input */}
          <div className="menu-search-wrapper">
            <span className="menu-search-icon" aria-hidden="true">
              <Icons.Search />
            </span>
            <input
              type="text"
              className="menu-search-input"
              placeholder="Search features, rooms, or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                className="menu-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                title="Clear"
              >
                <Icons.Close />
              </button>
            )}
          </div>

          {/* Scrollable Drawer Body */}
          <div className="menu-drawer-body">
            {/* User Profile Card */}
            <div className="menu-user-card">
              <div className="menu-user-info">
                <div className="menu-user-avatar">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="menu-user-name">{userData?.name || 'Guest User'}</div>
                  <div className="menu-user-email">{userData?.email || 'user@moodverse.ai'}</div>
                  {userData?.preferences?.hasAnxiety && (
                    <div style={{ fontSize: '11px', color: '#D97706', marginTop: '2px', fontWeight: '600' }}>
                      Anxiety Support Active
                    </div>
                  )}
                </div>
              </div>

              {userData && (
                <button
                  className="menu-logout-btn"
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  title="Sign out of account"
                >
                  <Icons.Logout />
                  <span>Sign Out</span>
                </button>
              )}
            </div>

            {/* Categorized Menu Sections */}
            {filteredCategories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', color: 'var(--border-medium)' }}>
                  <Icons.Search />
                </div>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '15px' }}>
                  No features found
                </div>
                <div style={{ fontSize: '13px', marginTop: '4px' }}>
                  No match for "{searchQuery}". Try "yoga", "games", or "vr".
                </div>
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '16px', fontSize: '12px', padding: '7px 16px' }}
                  onClick={() => setSearchQuery('')}
                >
                  Reset Search
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.title} className="menu-category-group">
                  <div className="menu-category-header">
                    <h3 className="menu-category-title">
                      <span style={{ color: 'var(--brand-primary)' }}>{category.icon}</span>
                      <span>{category.title}</span>
                    </h3>
                    <span className="menu-category-badge">
                      {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="menu-items-grid">
                    {category.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          'menu-nav-item' + (isActive ? ' active' : '')
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <div
                          className="menu-item-icon-box"
                          style={{
                            background: item.pastelBg,
                            color: item.iconColor,
                          }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </div>
                        <div className="menu-item-text">
                          <div className="menu-item-name-row">
                            <span className="menu-item-name">{item.name}</span>
                            {item.tag && (
                              <span className={`menu-item-tag tag-${item.tagType || 'ai'}`}>
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <div className="menu-item-desc">{item.desc}</div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="menu-drawer-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.Logo />
              <span>Moodverse Sanctuary v1.0</span>
            </div>
            <Link
              to="/resources"
              style={{ color: '#E11D48', textDecoration: 'none', fontWeight: '700' }}
              onClick={() => setMenuOpen(false)}
            >
              Emergency 988
            </Link>
          </div>
        </aside>
      )}

      {/* Main Viewport Content */}
      <main id="main" className="container" style={{ flex: 1, paddingTop: 24, paddingBottom: 40 }}>
        <Outlet />
      </main>

      {/* Clean White Pastel Footer (Emoji-Free) */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>
                <Icons.Logo />
                <span>About Moodverse</span>
              </h3>
              <p>
                A privacy-first AI companion for emotional wellbeing, designed with safety and care.
              </p>
              <div style={{ fontSize: '13px', marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Shield />
                  <span>Privacy-first architecture</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Check />
                  <span>Safety by default</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Sparkle />
                  <span>AI-powered wellness insights</span>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h3>
                <Icons.Contact />
                <span>Contact Information</span>
              </h3>
              <div>
                <div><strong>Lead:</strong> Semala Rakshitha</div>
                <div><strong>Phone:</strong> +91 8639975744</div>
                <div><strong>Email:</strong> rakshithasemala@gmail.com</div>
                <div><strong>Website:</strong> moodverse.com</div>
              </div>
            </div>

            <div className="footer-col">
              <h3>
                <Icons.Helpline />
                <span>Emergency Resources</span>
              </h3>
              <div>
                <div style={{ color: '#E11D48', fontWeight: '700', marginBottom: '6px' }}>
                  Crisis Helplines:
                </div>
                <div>• <strong>Lifeline:</strong> 988 (Toll Free 24/7)</div>
                <div>• <strong>Crisis Text:</strong> Text HOME to 741741</div>
                <div>• <strong>Emergency:</strong> 112 / 911</div>
              </div>
            </div>

            <div className="footer-col">
              <h3>
                <Icons.Compass />
                <span>Quick Links</span>
              </h3>
              <div className="footer-links">
                <Link to="/experience">AI Experience</Link>
                <Link to="/meditation">Meditation</Link>
                <Link to="/yoga">Yoga Practice</Link>
                <Link to="/vr">3D VR Sanctuary</Link>
                <Link to="/community">Community Circle</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Moodverse · Built with care by Semala Rakshitha</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              Privacy-first emotional wellbeing platform · Not a substitute for professional clinical care
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
