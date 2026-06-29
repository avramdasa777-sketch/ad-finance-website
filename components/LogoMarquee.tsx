'use client';

// הגופים הפיננסיים שאברהם עובד איתם — לוגואים מקוריים (public/logos)
const LOGOS = [
  { src: '/logos/menora.png',    alt: 'מנורה מבטחים' },
  { src: '/logos/migdal.png',    alt: 'מגדל' },
  { src: '/logos/harel.svg',     alt: 'הראל' },
  { src: '/logos/phoenix.png',   alt: 'הפניקס' },
  { src: '/logos/clal.png',      alt: 'כלל' },
  { src: '/logos/meitav.png',    alt: 'מיטב' },
  { src: '/logos/mor.png',       alt: 'מור' },
  { src: '/logos/analyst.svg',   alt: 'אנליסט' },
  { src: '/logos/ayalon.svg',    alt: 'איילון' },
  { src: '/logos/altshuler.png', alt: 'אלטשולר שחם' },
];

export default function LogoMarquee() {
  // מכפילים את הרשימה כדי לקבל לולאה רציפה וחלקה
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="הגופים הפיננסיים שאיתם אנחנו עובדים"
      style={{
        background: 'var(--white)',
        padding: 'clamp(44px, 5vw, 64px) 0',
        borderBottom: '1px solid rgba(13,31,60,0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '34px', padding: '0 20px' }}>
        <div className="section-tag">שותפים מובילים</div>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.05rem)', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
          עובדים עם הגופים הפיננסיים המובילים בישראל
        </h2>
      </div>

      <div className="logo-marquee" dir="ltr">
        <div className="logo-track">
          {doubled.map((l, i) => (
            <img
              key={i}
              src={l.src}
              alt={i < LOGOS.length ? l.alt : ''}
              aria-hidden={i >= LOGOS.length}
              className="logo-item"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
