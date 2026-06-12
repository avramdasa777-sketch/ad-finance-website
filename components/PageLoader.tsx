'use client';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // מציגים את מסך הטעינה רק פעם אחת לכל ביקור (session)
    if (typeof window !== 'undefined' && sessionStorage.getItem('ad-loaded')) {
      setDone(true);
      return;
    }

    // נועלים גלילה כל עוד מסך הטעינה פעיל
    document.body.style.overflow = 'hidden';

    let hideTimer: ReturnType<typeof setTimeout>;
    const hide = () => {
      setFadeOut(true);
      hideTimer = setTimeout(() => {
        setDone(true);
        document.body.style.overflow = '';
        sessionStorage.setItem('ad-loaded', '1');
      }, 600); // משך אנימציית ההיעלמות
    };

    // מחכים שכל התמונות והמשאבים ייטענו (אירוע load), עם מנגנון ביטחון של זמן מקסימלי
    const minDelay = setTimeout(() => {
      if (document.readyState === 'complete') hide();
      else window.addEventListener('load', hide, { once: true });
    }, 700); // זמן מינימלי כדי שהמסך לא "יקפוץ"

    const safety = setTimeout(hide, 4500); // לעולם לא נתקע יותר מ-4.5 שניות

    return () => {
      clearTimeout(minDelay);
      clearTimeout(safety);
      clearTimeout(hideTimer);
      window.removeEventListener('load', hide);
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--navy-deep, #070f1e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
      }}
    >
      {/* לוגו עם פעימה */}
      <img
        src="/images/logo.png"
        alt="A.D Finance"
        style={{
          width: '110px',
          height: '110px',
          objectFit: 'contain',
          animation: 'adLoaderPulse 1.6s ease-in-out infinite',
        }}
      />

      {/* שם המותג */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.3px' }}>
          A.D Finance
        </div>
        <div style={{ color: '#c8a035', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>
          ייעוץ פיננסי
        </div>
      </div>

      {/* פס התקדמות זהוב */}
      <div style={{ width: '180px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: '40%',
          background: 'linear-gradient(90deg, transparent, #c8a035, #e8c84a, transparent)',
          borderRadius: '4px',
          animation: 'adLoaderBar 1.2s ease-in-out infinite',
        }} />
      </div>

      {/* שלד (סקלטון) — רמז למבנה האתר שנטען */}
      <div style={{ width: 'min(420px, 80vw)', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px', opacity: 0.5 }}>
        <div className="ad-skel" style={{ height: '14px', width: '70%', alignSelf: 'center' }} />
        <div className="ad-skel" style={{ height: '14px', width: '90%', alignSelf: 'center' }} />
        <div className="ad-skel" style={{ height: '40px', width: '50%', alignSelf: 'center', borderRadius: '50px', marginTop: '6px' }} />
      </div>

      <style>{`
        @keyframes adLoaderPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.07); opacity: 0.85; }
        }
        @keyframes adLoaderBar {
          0% { transform: translateX(-180%); }
          100% { transform: translateX(420%); }
        }
        @keyframes adSkelShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ad-skel {
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(200,160,53,0.18) 50%, rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: adSkelShimmer 1.4s linear infinite;
        }
      `}</style>
    </div>
  );
}
