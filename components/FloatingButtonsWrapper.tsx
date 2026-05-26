'use client';
import { useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';
type Contrast = 'normal' | 'high';

export default function FloatingButtonsWrapper() {
  const [hidden, setHidden] = useState(false);
  const [waVisible, setWaVisible] = useState(false);

  // Accessibility state
  const [a11yOpen, setA11yOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [linksHighlight, setLinksHighlight] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWaVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') root.style.fontSize = '18px';
    else if (fontSize === 'xlarge') root.style.fontSize = '20px';
    else root.style.fontSize = '';
  }, [fontSize]);

  useEffect(() => {
    document.body.style.filter = contrast === 'high' ? 'contrast(1.3)' : '';
  }, [contrast]);

  useEffect(() => {
    const existing = document.getElementById('a11y-links');
    if (linksHighlight) {
      if (!existing) {
        const el = document.createElement('style');
        el.id = 'a11y-links';
        el.textContent = 'a { text-decoration: underline !important; text-underline-offset: 3px !important; }';
        document.head.appendChild(el);
      }
    } else {
      existing?.remove();
    }
  }, [linksHighlight]);

  const resetA11y = () => {
    setFontSize('normal');
    setContrast('normal');
    setLinksHighlight(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'flex-end',
        transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
        transform: hidden ? 'translateX(-96px)' : 'translateX(0)',
      }}
    >
      {/* Buttons column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          paddingLeft: '28px',
          paddingBottom: '4px',
          position: 'relative',
        }}
      >
        {/* Accessibility panel — opens above the button */}
        {a11yOpen && (
          <div
            role="dialog"
            aria-label="תפריט נגישות"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '28px',
              background: 'var(--white)',
              border: '1px solid rgba(200,160,53,0.3)',
              borderRadius: '16px',
              padding: '20px',
              width: '220px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              animation: 'slideDown 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '15px', margin: 0 }}>נגישות</h2>
              <button
                onClick={() => setA11yOpen(false)}
                aria-label="סגור תפריט נגישות"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '2px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <A11ySection label="גודל טקסט">
              {(['normal', 'large', 'xlarge'] as FontSize[]).map(size => (
                <A11yBtn key={size} label={size === 'normal' ? 'רגיל' : size === 'large' ? 'גדול' : 'גדול מאוד'} active={fontSize === size} onClick={() => setFontSize(size)} />
              ))}
            </A11ySection>

            <A11ySection label="ניגודיות">
              <A11yBtn label="רגילה" active={contrast === 'normal'} onClick={() => setContrast('normal')} />
              <A11yBtn label="גבוהה" active={contrast === 'high'} onClick={() => setContrast('high')} />
            </A11ySection>

            <A11ySection label="קישורים">
              <A11yBtn label={linksHighlight ? 'מסומנים' : 'רגיל'} active={linksHighlight} onClick={() => setLinksHighlight(l => !l)} />
            </A11ySection>

            <button
              onClick={resetA11y}
              style={{ marginTop: '12px', width: '100%', padding: '8px', background: 'none', border: '1px solid rgba(200,160,53,0.35)', borderRadius: '8px', color: 'var(--gold)', fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,160,53,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              אפס הכל
            </button>
          </div>
        )}

        {/* WhatsApp button */}
        <a
          href="https://wa.me/972528796188?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%A4%D7%99%D7%A0%D7%A0%D7%A1%D7%99"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="שלח הודעה בוואטסאפ לאברהם דסה"
          title="שלח הודעה בוואטסאפ"
          style={{
            width: '58px',
            height: '58px',
            background: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            animation: waVisible ? 'whatsappPulse 2.5s ease-in-out infinite' : 'none',
            opacity: waVisible ? 1 : 0,
            transform: waVisible ? 'scale(1)' : 'scale(0)',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Accessibility toggle button */}
        <button
          onClick={() => setA11yOpen(o => !o)}
          aria-label="אפשרויות נגישות"
          aria-expanded={a11yOpen}
          style={{
            width: '48px',
            height: '48px',
            background: 'var(--navy)',
            border: '2px solid var(--gold)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--gold)',
            transition: 'all 0.3s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy-deep)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold)'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
            <path d="M12 11v6M9 13h6"/>
          </svg>
        </button>
      </div>

      {/* Collapse/expand tab */}
      <button
        onClick={() => setHidden(h => !h)}
        aria-label={hidden ? 'הצג כפתורים' : 'הסתר כפתורים'}
        title={hidden ? 'הצג כפתורים' : 'הסתר כפתורים'}
        style={{
          width: '20px',
          height: '52px',
          background: 'var(--navy)',
          border: '1px solid rgba(200,160,53,0.35)',
          borderLeft: 'none',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--gold)',
          flexShrink: 0,
          marginBottom: '3px',
          boxShadow: '2px 0 12px rgba(0,0,0,0.18)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transition: 'transform 0.35s ease',
            transform: hidden ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}

function A11ySection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <p style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function A11yBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 10px',
        borderRadius: '6px',
        border: `1.5px solid ${active ? 'var(--gold)' : 'rgba(0,0,0,0.12)'}`,
        background: active ? 'rgba(200,160,53,0.1)' : 'transparent',
        color: active ? 'var(--gold)' : 'var(--text-mid)',
        fontFamily: 'Heebo, sans-serif',
        fontSize: '12px',
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  );
}