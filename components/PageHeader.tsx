'use client';
import Link from 'next/link';

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
  breadcrumb?: { href: string; label: string };
  imageSrc?: string;
  videoSrc?: string;
}

export default function PageHeader({ tag, title, subtitle, breadcrumb, imageSrc, videoSrc }: PageHeaderProps) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)',
        padding: 'clamp(116px, 14vw, 140px) 20px clamp(52px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background video */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.42,
            zIndex: 0,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Background image (only when no video) */}
      {imageSrc && !videoSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.52,
            zIndex: 0,
          }}
        />
      )}

      {/* Dark overlay when image or video is present */}
      {(imageSrc || videoSrc) && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(7,15,30,0.58) 0%, rgba(13,31,60,0.48) 60%, rgba(7,15,30,0.55) 100%)',
            zIndex: 1,
          }}
        />
      )}

      {/* Gold radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(200,160,53,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          zIndex: 2,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
        {breadcrumb && (
          <div style={{ marginBottom: '16px' }}>
            <Link
              href={breadcrumb.href}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {breadcrumb.label}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px' }}>←</span>
          </div>
        )}
        <div className="section-tag">{tag}</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: '14px' }}>
          {title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '560px', lineHeight: 1.7 }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}