'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
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
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          zIndex: 0,
        }}
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
        <div style={{ maxWidth: '680px' }}>

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
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '24px',
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
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.75,
              marginBottom: '40px',
              maxWidth: '540px',
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
              marginBottom: '16px',
              borderRadius: '2px',
            }} />
            <p
              style={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: 1.9,
                maxWidth: '540px',
                letterSpacing: '0.01em',
                margin: 0,
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