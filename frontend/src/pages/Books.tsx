import React from 'react';

const BOOKS = [
  { title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', href: 'https://www.penguinrandomhouse.com/books/234356/the-body-keeps-the-score-by-bessel-van-der-kolk-md/' },
  { title: 'Feeling Good', author: 'David D. Burns', href: 'https://www.penguinrandomhouse.com/books/112410/feeling-good-by-david-d-burns-md/' },
  { title: 'Lost Connections', author: 'Johann Hari', href: 'https://www.lostconnections.com/' },
  { title: 'Mind Over Mood', author: 'Dennis Greenberger & Christine Padesky', href: 'https://www.guilford.com/books/Mind-Over-Mood/Dennis-Greenberger/9781462520420' },
  { title: 'The Happiness Trap', author: 'Russ Harris', href: 'https://www.thehappinesstrap.com/' },
  { title: 'Wherever You Go, There You Are', author: 'Jon Kabat-Zinn', href: 'https://www.penguinrandomhouse.com/books/280913/wherever-you-go-there-you-are-by-jon-kabat-zinn/' }
];

export default function Books(){
  return (
    <div className="container">
      <h2>Recommended Books</h2>
      <p className="muted">Curated reads to support mental wellbeing.</p>

      <div style={{marginTop:12}} className="card-grid">
        {BOOKS.map((b,i)=> (
          <div key={i} className="card card-sm">
            <div style={{fontWeight:700}}>{b.title}</div>
            <div className="muted">{b.author}</div>
            <div style={{marginTop:8}}>
              <a className="btn" href={b.href} target="_blank" rel="noreferrer">More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}