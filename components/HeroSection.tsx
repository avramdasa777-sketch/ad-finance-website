'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // אם הסרטון כבר מוכן עוד לפני שה-handler נקשר — נסמן אותו מוכן
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) setVideoReady(true);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--navy-deep)',
      }}
      aria-label="דף הבית של A.D Finance"
    >
      {/* רקע מותגי בסיסי — תמיד נראה, גם לפני/בלי שהסרטון נטען (אף פעם לא ריק) */}
      <div className="media-backdrop" aria-hidden="true" />

      {/* תמונת סטילס מותגית — מופיעה מיד עד שהסרטון מוכן */}
      <img
        src="/images/financial.jpg"
        alt=""
        aria-hidden="true"
        className="media-poster"
        style={{ opacity: videoReady ? 0 : 0.5, transition: 'opacity 0.9s ease' }}
      />

      {/* Video Background — נכנס ברכות (fade-in) רק כשהוא מוכן לנגינה */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`media-video${videoReady ? ' is-ready' : ''}`}
        style={{ ['--media-opacity' as string]: '0.55' }}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/18743334/18743334-hd_1920_1080_60fps.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,30,0.75) 0%, rgba(13,31,60,0.62) 50%, rgba(7,15,30,0.72) 100%)', zIndex: 1 }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(200,160,53,0.07) 0%, transparent 60%)', zIndex: 1 }} aria-hidden="true" />

      {/* Floating blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', right: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(200,160,53,0.06) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 1,
        animation: 'blobFloat 10s ease-in-out infinite',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(200,160,53,0.04) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 1,
        animation: 'blobFloat 13s ease-in-out infinite reverse',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: 'clamp(104px, 12vw, 120px) 20px clamp(56px, 8vw, 80px)', width: '100%' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>

          {/* Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(200,160,53,0.12)',
              border: '1px solid rgba(200,160,53,0.3)',
              borderRadius: '50px',
              padding: '7px 16px',
              marginBottom: '28px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.1s',
            }}
          >
            <span style={{ width: '7px', height: '7px', background: '#c8a035', borderRadius: '50%', animation: 'goldPulse 2s ease-in-out infinite' }} />
            <span style={{ color: '#c8a035', fontSize: '13px', fontWeight: 600, letterSpacing: '1px' }}>יועץ פיננסי מורשה</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.9rem, 6.4vw, 4.8rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              marginBottom: '28px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(50px)',
              transition: 'all 0.9s ease 0.2s',
            }}
          >
            נבנה יחד את
            <br />
            <span style={{ background: 'linear-gradient(135deg, #c8a035 0%, #e8c84a 60%, #c8a035 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              עתידך הפיננסי
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              lineHeight: 1.7,
              marginBottom: '44px',
              maxWidth: '640px',
              marginInline: 'auto',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(40px)',
              transition: 'all 0.9s ease 0.35s',
            }}
          >
            ייעוץ פנסיוני ותכנון פיננסי אישי ומקצועי — פנסיה, ביטוחים, ניהול תיקים והשקעות.
            <br />
            <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>פגישת הייעוץ הראשונה חינם לחלוטין.</strong>
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '56px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(30px)',
              transition: 'all 0.9s ease 0.5s',
            }}
          >
            <Link href="/contact" className="btn-gold" style={{ fontSize: '16px', padding: '15px 36px' }}>
              קבע פגישת ייעוץ חינם
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/services" className="btn-outline">
              הכר את השירותים
            </Link>
          </div>

          {/* Tagline */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '32px',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'all 0.9s ease 0.65s',
            }}
          >
            <div style={{
              width: '40px',
              height: '3px',
              background: '#c8a035',
              margin: '0 auto 16px',
              borderRadius: '2px',
            }} />
            <p
              style={{
                color: '#ffffff',
                fontSize: 'clamp(18px, 1.7vw, 21px)',
                fontWeight: 600,
                lineHeight: 1.85,
                maxWidth: '640px',
                letterSpacing: '0.01em',
                margin: '0 auto',
              }}
            >
              אנחנו לא רק מנהלים מספרים —{' '}
              <span style={{ color: '#c8a035' }}>
                אנחנו בונים עבורכם דרך פיננסית חכמה, יציבה ומדויקת,
              </span>{' '}
              שמעניקה לכם שליטה, ביטחון ושקט נפשי בכל שלב בחיים.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}