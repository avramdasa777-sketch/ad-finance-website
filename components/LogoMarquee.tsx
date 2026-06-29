'use client';

// הגופים הפיננסיים שאברהם עובד איתם — לוגואים מקוריים (public/logos)
// tall = לוגו אנכי שמקבל גובה מעט גדול יותר כדי להיראות מאוזן בבר
const LOGOS = [
  { src: '/logos/menora.png',    alt: 'מנורה מבטחים' },
  { src: '/logos/migdal.svg',    alt: 'מגדל', tall: true },
  { src: '/logos/harel.svg',     alt: 'הראל' },
  { src: '/logos/phoenix.png',   alt: 'הפניקס' },
  { src: '/logos/clal.svg',      alt: 'כלל ביטוח' },
  { src: '/logos/meitav.png',    alt: 'מיטב' },
  { src: '/logos/mor.svg',       alt: 'מור בית השקעות' },
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
            <div className="logo-cell" key={i} aria-hidden={i >= LOGOS.length}>
              <img
                src={l.src}
                alt={i < LOGOS.length ? l.alt : ''}
                className={l.tall ? 'logo-item tall' : 'logo-item'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
