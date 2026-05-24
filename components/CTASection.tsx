import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = 'רוצים לדעת יותר?',
  subtitle = 'פגישת ייעוץ ראשונה חינמית וללא התחייבות — נשמח לענות על כל שאלה.',
}: CTASectionProps) {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--navy-deep)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,160,53,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div className="reveal" style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#ffffff', marginBottom: '14px' }}>
          {title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.75 }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" className="btn-gold" style={{ fontSize: '15px' }}>
            קבע פגישת ייעוץ חינם
          </Link>
          <a href="tel:0528796188" className="btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            התקשר: 052-879-6188
          </a>
        </div>
      </div>
    </section>
  );
}