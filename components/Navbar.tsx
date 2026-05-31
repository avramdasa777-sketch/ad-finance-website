'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const services = [
  { href: '/services/insurance', label: 'צ׳ק אפ ביטוחים' },
  { href: '/services/pension',   label: 'צ׳ק אפ פנסיוני' },
  { href: '/services/financial', label: 'תכנון פיננסי והשקעות' },
];

const infoPages = [
  { href: '/info/keren-pensiya',          label: 'קרן פנסיה' },
  { href: '/info/bituach-menahilim',      label: 'ביטוח מנהלים' },
  { href: '/info/keren-hishtalmut',       label: 'קרן השתלמות' },
  { href: '/info/kupat-gemel',            label: 'קופת גמל — תיקון 190' },
  { href: '/info/kupat-gemel-hashkaa',    label: 'קופת גמל להשקעה' },
  { href: '/info/polisa-hisachon',        label: 'פוליסת חיסכון' },
  { href: '/info/nihul-tikkim',           label: 'ניהול תיקים' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setInfoOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(7, 15, 30, 0.97)'
          : 'rgba(7, 15, 30, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(200, 160, 53, 0.25)'
          : '1px solid rgba(200, 160, 53, 0.08)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        animation: 'navbarSlide 0.5s ease forwards',
      }}
    >
      <nav
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}
        aria-label="ניווט ראשי"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '88px' }}>

          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
            aria-label="A.D Finance — עמוד הבית"
          >
            <img
              src="/images/logo.png"
              alt="A.D Finance"
              style={{ width: '78px', height: '78px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '17px', lineHeight: 1.1, letterSpacing: '-0.3px' }}>
                A.D Finance
              </div>
              <div style={{ color: '#c8a035', fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                ייעוץ פיננסי
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            <NavLink href="/" label="עמוד הבית" active={pathname === '/'} />
            <NavLink href="/about" label="אודות" active={isActive('/about')} />

            {/* Services Dropdown */}
            <div ref={servicesRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setServicesOpen(!servicesOpen); setInfoOpen(false); }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: isActive('/services') ? '#c8a035' : 'rgba(255,255,255,0.85)',
                  fontFamily: 'Heebo, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                שירותינו
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {servicesOpen && (
                <Dropdown items={services} />
              )}
            </div>

            {/* Info Dropdown */}
            <div ref={infoRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setInfoOpen(!infoOpen); setServicesOpen(false); }}
                aria-expanded={infoOpen}
                aria-haspopup="true"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: isActive('/info') ? '#c8a035' : 'rgba(255,255,255,0.85)',
                  fontFamily: 'Heebo, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                מידע מקצועי
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: infoOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {infoOpen && (
                <Dropdown items={infoPages} wide />
              )}
            </div>

            <NavLink href="/calculator" label="מחשבון רווחים" active={isActive('/calculator')} />
            <NavLink href="/contact" label="יצירת קשר" active={isActive('/contact')} />
          </div>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/contact"
              className="hidden-mobile"
              style={{
                background: 'linear-gradient(135deg, #c8a035, #e8c84a)',
                color: '#070f1e',
                fontWeight: 700,
                fontSize: '14px',
                padding: '10px 22px',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                animation: 'goldShimmer 3s linear infinite',
                backgroundSize: '200% auto',
              }}
            >
              פגישת ייעוץ חינם
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={mobileOpen}
              className="show-mobile"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ffffff',
                padding: '8px',
              }}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: '1px solid rgba(200,160,53,0.2)',
              padding: '16px 0 24px',
              animation: 'slideDown 0.2s ease',
            }}
          >
            <MobileNavLink href="/" label="עמוד הבית" />
            <MobileNavLink href="/about" label="אודות" />

            <MobileSection label="שירותינו">
              {services.map(s => <MobileNavLink key={s.href} href={s.href} label={s.label} sub />)}
            </MobileSection>

            <MobileSection label="מידע מקצועי">
              {infoPages.map(p => <MobileNavLink key={p.href} href={p.href} label={p.label} sub />)}
            </MobileSection>

            <MobileNavLink href="/calculator" label="מחשבון רווחים" />
            <MobileNavLink href="/contact" label="יצירת קשר" />
            <div style={{ padding: '12px 0 4px' }}>
              <Link
                href="/contact"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #c8a035, #e8c84a)',
                  color: '#070f1e',
                  fontWeight: 700,
                  padding: '12px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  margin: '0 4px',
                }}
              >
                פגישת ייעוץ חינם
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 901px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        color: active ? '#c8a035' : 'rgba(255,255,255,0.85)',
        fontWeight: active ? 600 : 500,
        fontSize: '15px',
        textDecoration: 'none',
        padding: '8px 14px',
        borderRadius: '8px',
        transition: 'all 0.2s',
        borderBottom: active ? '2px solid #c8a035' : '2px solid transparent',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.color = '#c8a035';
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
          e.currentTarget.style.background = 'none';
        }
      }}
    >
      {label}
    </Link>
  );
}

function Dropdown({ items, wide }: { items: { href: string; label: string }[]; wide?: boolean }) {
  return (
    <div
      className="dropdown-enter"
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        background: 'rgba(10, 20, 40, 0.98)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(200,160,53,0.25)',
        borderRadius: '14px',
        padding: '10px',
        minWidth: wide ? '220px' : '200px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        zIndex: 100,
      }}
    >
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(200,160,53,0.12)';
            e.currentTarget.style.color = '#c8a035';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
          }}
        >
          <span style={{ color: '#c8a035', fontSize: '16px' }}>›</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileNavLink({ href, label, sub }: { href: string; label: string; sub?: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        color: sub ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)',
        textDecoration: 'none',
        padding: sub ? '8px 32px' : '10px 4px',
        fontSize: sub ? '14px' : '15px',
        fontWeight: sub ? 400 : 500,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {sub ? `• ${label}` : label}
    </Link>
  );
}

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#c8a035',
          fontFamily: 'Heebo, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          padding: '10px 4px',
          textAlign: 'right',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transf