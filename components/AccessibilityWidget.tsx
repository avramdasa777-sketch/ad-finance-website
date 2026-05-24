'use client';
import { useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';
type Contrast = 'normal' | 'high';

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [linksHighlight, setLinksHighlight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') root.style.fontSize = '18px';
    else if (fontSize === 'xlarge') root.style.fontSize = '20px';
    else root.style.fontSize = '';
  }, [fontSize]);

  useEffect(() => {
    const body = document.body;
    if (contrast === 'high') {
      body.style.filter = 'contrast(1.3)';
    } else {
      body.style.filter = '';
    }
  }, [contrast]);

  useEffect(() => {
    const style = document.getElementById('a11y-links');
    if (linksHighlight) {
      if (!style) {
        const el = document.createElement('style');
        el.id = 'a11y-links';
        el.textContent = 'a { text-decoration: underline !important; text-underline-offset: 3px !important; }';
        document.head.appendChild(el);
      }
    } else {
      style?.remove();
    }
  }, [linksHighlight]);

  const reset = () => {
    setFontSize('normal');
    setContrast('normal');
    setLinksHighlight(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="אפשרויות נגישות"
        aria-expanded={open}
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '28px',
          zIndex: 900,
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
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--gold)';
          e.currentTarget.style.color = 'var(--navy-deep)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--navy)';
          e.currentTarget.style.color = 'var(--gold)';
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
          <path d="M12 11v6M9 13h6"/>
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          style={{
            position: 'fixed',
            bottom: '156px',
            left: '28px',
            zIndex: 900,
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
              onClick={() => setOpen(false)}
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
              <A11yBtn
                key={size}
                label={size === 'normal' ? 'רגיל' : size === 'large' ? 'גדול' : 'גדול מאוד'}
                active={fontSize === size}
                onClick={() => setFontSize(size)}
              />
            ))}
          </A11ySection>

          <A11ySection label="ניגודיות">
            <A11yBtn label="רגילה" active={contrast === 'normal'} onClick={() => setContrast('normal')} />
            <A11yBtn label="גבוהה" active={contrast === 'high'} onClick={() => setContrast('high')} />
          </A11ySection>

          <A11ySection label="קישורים">
            <A11yBtn label={linksHighlight ? 'מסומנים' : 'רגיל'} active={linksHighlight} onClick={() => setLinksHighlight(!linksHighlight)} />
          </A11ySection>

          <button
            onClick={reset}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px',
              background: 'none',
              border: '1px solid rgba(200,160,53,0.35)',
              borderRadius: '8px',
              color: 'var(--gold)',
              fontFamily: 'Heebo, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,160,53,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            אפס הכל
          </button>
        </div>
      )}
    </>
  );
}

function A11ySection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <p style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {children}
      </div>
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