'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--navy-deep)', color: '#ffffff', borderTop: '1px solid rgba(200,160,53,0.2)' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img
                src="/images/logo.png"
                alt="A.D Finance"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <div>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', lineHeight: 1.1 }}>A.D Finance</div>
                <div style={{ color: '#c8a035', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>ייעוץ פיננסי</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px', maxWidth: '240px' }}>
              יועץ פיננסי מורשה אברהם דסה — ליווי אישי, מקצועי ואמין לניהול עתידך הפיננסי.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="tel:0528796188" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                <PhoneIcon /> 052-879-6188
              </a>
              <a href="mailto:avramdasa777@gmail.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                <MailIcon /> avramdasa777@gmail.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: '#c8a035', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>שירותינו</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/services/insurance', label: 'צ׳ק אפ ביטוחים' },
                { href: '/services/pension',   label: 'צ׳ק אפ פנסיוני' },
                { href: '/services/financial', label: 'תכנון פיננסי' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 style={{ color: '#c8a035', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>מידע מקצועי</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/info/keren-pensiya',       label: 'קרן פנסיה' },
                { href: '/info/bituach-menahilim',   label: 'ביטוח מנהלים' },
                { href: '/info/keren-hishtalmut',    label: 'קרן השתלמות' },
                { href: '/info/kupat-gemel',         label: 'קופת גמל' },
                { href: '/info/polisa-hisachon',     label: 'פוליסת חיסכון' },
                { href: '/info/nihul-tikkim',        label: 'ניהול תיקים' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#c8a035', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>ניווט מהיר</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/',         label: 'עמוד הבית' },
                { href: '/about',    label: 'אודות' },
                { href: '/contact',       label: 'יצירת קשר' },
                { href: '/privacy',       label: 'מדיניות פרטיות' },
                { href: '/accessibility', label: 'הצהרת נגישות' },
                { href: '/terms',         label: 'תקנון שימוש' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(200,160,53,0.08)', borderRadius: '12px', border: '1px solid rgba(200,160,53,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', lineHeight: 1.6 }}>
                A.D Finance — מורשה כיועץ פיננסי. הפגישה הראשונה ללא עלות וללא התחייבות.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            © {currentYear} A.D Finance — כל הזכויות שמורות לאברהם דסה
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              פרטיות
            </Link>
            <Link href="/accessibility" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              נגישות
            </Link>
            <Link href="/terms" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8a035')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              תקנון
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}