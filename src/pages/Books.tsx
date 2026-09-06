import React, { useState } from 'react';

interface Book {
  title: string;
  author: string;
  href: string;
  category: string;
  description?: string;
}

const BOOKS: Book[] = [
  // Trauma & Healing
  { 
    title: 'The Body Keeps the Score', 
    author: 'Bessel van der Kolk', 
    href: 'https://www.penguinrandomhouse.com/books/234356/the-body-keeps-the-score-by-bessel-van-der-kolk-md/',
    category: 'Trauma & Healing',
    description: 'How trauma shapes our bodies and minds'
  },
  { 
    title: 'Waking the Tiger', 
    author: 'Peter Levine', 
    href: 'https://www.penguinrandomhouse.com/books/135920/waking-the-tiger-by-peter-a-levine/',
    category: 'Trauma & Healing',
    description: 'Healing trauma through somatic experiencing'
  },
  { 
    title: 'Complex PTSD', 
    author: 'Pete Walker', 
    href: 'https://www.pete-cptsd.com/',
    category: 'Trauma & Healing',
    description: 'From surviving to thriving'
  },
  
  // Anxiety & Depression
  { 
    title: 'Feeling Good', 
    author: 'David D. Burns', 
    href: 'https://www.penguinrandomhouse.com/books/112410/feeling-good-by-david-d-burns-md/',
    category: 'Anxiety & Depression',
    description: 'The new mood therapy for depression'
  },
  { 
    title: 'The Anxiety and Worry Workbook', 
    author: 'David A. Clark & Aaron T. Beck', 
    href: 'https://www.guilford.com/books/The-Anxiety-and-Worry-Workbook/David-A-Clark/9781462544181',
    category: 'Anxiety & Depression',
    description: 'Cognitive behavioral therapy exercises'
  },
  { 
    title: 'Reasons to Stay Alive', 
    author: 'Matt Haig', 
    href: 'https://www.penguinrandomhouse.com/books/560655/reasons-to-stay-alive-by-matt-haig/',
    category: 'Anxiety & Depression',
    description: 'A memoir about overcoming depression'
  },
  
  // Mindfulness & Meditation
  { 
    title: 'Wherever You Go, There You Are', 
    author: 'Jon Kabat-Zinn', 
    href: 'https://www.penguinrandomhouse.com/books/280913/wherever-you-go-there-you-are-by-jon-kabat-zinn/',
    category: 'Mindfulness & Meditation',
    description: 'Mindfulness meditation in everyday life'
  },
  { 
    title: 'The Miracle of Mindfulness', 
    author: 'Thich Nhat Hanh', 
    href: 'https://www.beaconpress.org/products/the-miracle-of-mindfulness-9780807012329',
    category: 'Mindfulness & Meditation',
    description: 'A guide to meditation in daily life'
  },
  { 
    title: 'Peace is Every Step', 
    author: 'Thich Nhat Hanh', 
    href: 'https://www.bantambooks.com/title/9780553351396/peace-is-every-step',
    category: 'Mindfulness & Meditation',
    description: 'The path of mindfulness in daily life'
  },
  
  // Positive Psychology
  { 
    title: 'The Happiness Trap', 
    author: 'Russ Harris', 
    href: 'https://www.thehappinesstrap.com/',
    category: 'Positive Psychology',
    description: 'Stop struggling, start living with ACT'
  },
  { 
    title: 'Authentic Happiness', 
    author: 'Martin Seligman', 
    href: 'https://www.simonandschuster.com/books/Authentic-Happiness/Martin-E-P-Seligman/9780743222982',
    category: 'Positive Psychology',
    description: 'Using the new positive psychology'
  },
  { 
    title: 'Flow', 
    author: 'Mihaly Csikszentmihalyi', 
    href: 'https://www.harpercollins.com/products/flow-mihaly-csikszentmihalyi',
    category: 'Positive Psychology',
    description: 'The psychology of optimal experience'
  },
  
  // Connection & Purpose
  { 
    title: 'Lost Connections', 
    author: 'Johann Hari', 
    href: 'https://www.lostconnections.com/',
    category: 'Connection & Purpose',
    description: 'Uncovering the real causes of depression'
  },
  { 
    title: 'Man\'s Search for Meaning', 
    author: 'Viktor Frankl', 
    href: 'https://www.beaconpress.org/products/man-s-search-for-meaning-9780807014271',
    category: 'Connection & Purpose',
    description: 'An introduction to logotherapy'
  },
  { 
    title: 'The Power of Now', 
    author: 'Eckhart Tolle', 
    href: 'https://www.penguinrandomhouse.com/books/140669/the-power-of-now-by-eckhart-tolle/',
    category: 'Connection & Purpose',
    description: 'A guide to spiritual enlightenment'
  },
  
  // CBT & Self-Help
  { 
    title: 'Mind Over Mood', 
    author: 'Dennis Greenberger & Christine Padesky', 
    href: 'https://www.guilford.com/books/Mind-Over-Mood/Dennis-Greenberger/9781462520420',
    category: 'CBT & Self-Help',
    description: 'Change how you feel by changing how you think'
  },
  { 
    title: 'Feeling Great', 
    author: 'David D. Burns', 
    href: 'https://www.penguinrandomhouse.com/books/709227/feeling-great-by-david-d-burns/',
    category: 'CBT & Self-Help',
    description: 'Revolutionary new treatment for depression'
  },
  { 
    title: 'The CBT Workbook', 
    author: 'Miriam Chachamu', 
    href: 'https://www.amazon.com/CBT-Workbook-Practical-Exercises-Transform/',
    category: 'CBT & Self-Help',
    description: 'Practical exercises for CBT'
  }
];

const CATEGORIES = ['all', 'Trauma & Healing', 'Anxiety & Depression', 'Mindfulness & Meditation', 'Positive Psychology', 'Connection & Purpose', 'CBT & Self-Help'];

export default function Books(){
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredBooks = selectedCategory === 'all' 
    ? BOOKS 
    : BOOKS.filter(book => book.category === selectedCategory);

  return (
    <div className="container">
      <h2>📚 Recommended Books</h2>
      <p className="muted">Curated reads to support mental wellbeing and personal growth.</p>
      
      {/* Category Filter */}
      <div style={{ marginBottom: '24px', marginTop: '16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px', 
          flexWrap: 'wrap' 
        }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor: selectedCategory === category ? '#6BD3C7' : '#f3f4f6',
                color: selectedCategory === category ? 'white' : '#374151',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {category === 'all' ? '📖 All Books' : category}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '12px' }} className="card-grid">
        {filteredBooks.map((b, i) => (
          <div key={i} className="card card-sm">
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>{b.title}</div>
            <div className="muted" style={{ fontSize: '13px' }}>{b.author}</div>
            {b.description && (
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>{b.description}</div>
            )}
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                backgroundColor: '#e0f2fe', 
                color: '#0369a1', 
                padding: '2px 8px', 
                borderRadius: '10px', 
                fontSize: '11px' 
              }}>
                {b.category}
              </span>
              <a className="btn" href={b.href} target="_blank" rel="noreferrer" style={{ fontSize: '12px', padding: '4px 12px' }}>
                More Info →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Reading Tips */}
      <div style={{ 
        marginTop: '32px', 
        padding: '20px', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '12px',
        border: '1px solid #86efac'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#166534' }}>📖 Reading Tips for Mental Wellness</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px' }}>
          <li>Start with one book at a time to fully absorb the content</li>
          <li>Take notes and reflect on key insights</li>
          <li>Join a book club or discussion group for support</li>
          <li>Practice the exercises mentioned in workbooks</li>
          <li>Be patient with yourself - healing is a journey</li>
        </ul>
      </div>
    </div>
  )
}
