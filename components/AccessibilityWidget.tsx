'use client';
import { useEffect, useState } from 'react';

/* ── הגדרות התפריט ─────────────────────────────────────────────── */
type ToggleKey = 'contrast' | 'grayscale' | 'links' | 'readable' | 'pause';

const TOGGLES: { key: ToggleKey; label: string; cls: string; icon: React.ReactNode }[] = [
  {
    key: 'contrast', label: 'ניגודיות גבוהה', cls: 'a11y-contrast',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v18" fill="currentColor" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" /></svg>,
  },
  {
    key: 'grayscale', label: 'גווני אפור', cls: 'a11y-grayscale',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z" /></svg>,
  },
  {
    key: 'links', label: 'הדגשת קישורים', cls: 'a11y-links-highlight',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>,
  },
  {
    key: 'readable', label: 'ריווח קריא', cls: 'a11y-readable',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5h16v2" /><path d="M9 20h6" /><path d="M12 5v15" /></svg>,
  },
  {
    key: 'pause', label: 'עצירת אנימציות', cls: 'a11y-pause-anim',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>,
  },
];

const FONT_STEPS = [100, 112, 125, 140]; // אחוזי גודל טקסט

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // הסתרת כפתור הנגישות לצד
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [fontStep, setFontStep] = useState(0);

  // טעינת העדפות שמורות
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ad-a11y') || '{}');
      if (saved.active) setActive(saved.active);
      if (typeof saved.fontStep === 'number') setFontStep(saved.fontStep);
    } catch {}
  }, []);

  // החלת המצב על ה-DOM + שמירה
  useEffect(() => {
    const html = document.documentElement;
    TOGGLES.forEach((t) => html.classList.toggle(t.cls, !!active[t.key]));
    html.style.fontSize = fontStep === 0 ? '' : `${FONT_STEPS[fontStep]}%`;
    localStorage.setItem('ad-a11y', JSON.stringify({ active, fontStep }));
  }, [active, fontStep]);

  // נעילת גלילת רקע + סגירה ב-Esc כשהמגירה פתוחה
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = (key: string) => setActive((a) => ({ ...a, [key]: !a[key] }));
  const reset = () => { setActive({}); setFontStep(0); };

  return (
    <>
      {/* קבוצת הכפתור — מחליקה הצידה כשמסתירים */}
      <div
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 940,
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: hidden ? 'translateX(calc(100% + 40px))' : 'translateX(0)',
        }}
      >
        {/* כפתור עגול */}
        <button
          onClick={() => setOpen(true)}
          aria-label="פתיחת תפריט נגישות"
          title="נגישות"
          style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--navy)', border: '2px solid var(--gold)', color: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(0,0,0,0.28)',
            transition: 'transform 0.25s ease, background 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy-deep)'; e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="3.6" r="1.7" fill="currentColor" stroke="none" />
            <path d="M4.5 8c2.4 1.1 5 1.6 7.5 1.6S17.1 9.1 19.5 8" />
            <path d="M12 9.6V15" />
            <path d="M8.5 21l3.5-6 3.5 6" />
          </svg>
        </button>

        {/* תג X להסתרת הכפתור (פינה פנימית) */}
        <button
          onClick={(e) => { e.stopPropagation(); setHidden(true); }}
          aria-label="הסתר את כפתור הנגישות"
          title="הסתר"
          style={{
            position: 'absolute', top: '-7px', left: '-7px',
            width: '22px', height: '22px', borderRadius: '50%',
            background: 'var(--gold)', border: '2px solid var(--navy)', color: 'var(--navy-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            padding: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {/* ידית להחזרת הכפתור — מופיעה בקצה ימין רק כשהכפתור מוסתר */}
      <button
        onClick={() => setHidden(false)}
        aria-label="הצג את כפתור הנגישות"
        title="נגישות"
        style={{
          position: 'fixed', bottom: '40px', right: 0, zIndex: 939,
          width: '20px', height: '46px',
          background: 'var(--navy)', border: '1px solid var(--gold)', borderRight: 'none',
          borderRadius: '10px 0 0 10px', color: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.2)', padding: 0,
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: hidden ? 'translateX(0)' : 'translateX(100%)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--navy-light)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--navy)')}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      {/* רקע כהה (overlay) — לחיצה סוגרת */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 1050,
          background: 'rgba(7,15,30,0.5)', backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.35s ease, visibility 0.35s ease',
        }}
      />

      {/* מגירה צדדית — נכנסת/יוצאת מצד ימין */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="תפריט נגישות"
        style={{
          position: 'fixed', top: 0, right: 0, zIndex: 1060, height: '100%',
          width: 'min(360px, 88vw)', background: 'var(--white)',
          boxShadow: '-14px 0 44px rgba(7,15,30,0.28)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column', direction: 'rtl',
        }}
      >
        {/* כותרת */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 22px', background: 'var(--navy)', borderBottom: '1px solid rgba(200,160,53,0.3)',
        }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold)', fontSize: '18px', fontWeight: 800 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="3.6" r="1.7" fill="currentColor" stroke="none" />
              <path d="M4.5 8c2.4 1.1 5 1.6 7.5 1.6S17.1 9.1 19.5 8" />
              <path d="M12 9.6V15" />
              <path d="M8.5 21l3.5-6 3.5 6" />
            </svg>
            נגישות
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="סגירת תפריט נגישות"
            style={{
              width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(200,160,53,0.4)',
              background: 'transparent', color: 'var(--gold)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,160,53,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* גוף נגלל */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* גודל טקסט */}
          <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '16px 18px', border: '1px solid rgba(200,160,53,0.18)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>גודל טקסט</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <FontBtn label="−" aria="הקטנת טקסט" onClick={() => setFontStep((s) => Math.max(0, s - 1))} disabled={fontStep === 0} />
              <span style={{ fontSize: '15px', color: 'var(--text-mid)', fontWeight: 700, minWidth: '52px', textAlign: 'center' }}>{FONT_STEPS[fontStep]}%</span>
              <FontBtn label="+" aria="הגדלת טקסט" onClick={() => setFontStep((s) => Math.min(FONT_STEPS.length - 1, s + 1))} disabled={fontStep === FONT_STEPS.length - 1} />
            </div>
          </div>

          {/* כפתורי הפעלה/כיבוי */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TOGGLES.map((t) => {
              const on = !!active[t.key];
              return (
                <button
                  key={t.key}
                  onClick={() => toggle(t.key)}
                  aria-pressed={on}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '13px 15px', borderRadius: '14px', cursor: 'pointer',
                    fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: 600, textAlign: 'right',
                    border: `1.5px solid ${on ? 'var(--gold)' : 'rgba(13,31,60,0.12)'}`,
                    background: on ? 'rgba(200,160,53,0.12)' : 'var(--white)',
                    color: on ? 'var(--gold)' : 'var(--text-mid)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'var(--cream)'; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'var(--white)'; }}
                >
                  <span style={{ display: 'flex', color: on ? 'var(--gold)' : 'var(--navy)' }}>{t.icon}</span>
                  <span style={{ flex: 1 }}>{t.label}</span>
                  {/* מתג */}
                  <span style={{
                    width: '38px', height: '22px', borderRadius: '50px', flexShrink: 0, position: 'relative',
                    background: on ? 'var(--gold)' : 'rgba(13,31,60,0.18)', transition: 'background 0.2s',
                  }}>
                    <span style={{
                      position: 'absolute', top: '2px', right: on ? '2px' : '18px',
                      width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                      transition: 'right 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    }} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* איפוס */}
          <button
            onClick={reset}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '12px', borderRadius: '14px',
              border: '1px solid rgba(13,31,60,0.18)', background: 'transparent',
              color: 'var(--navy)', fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--cream)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
            איפוס הגדרות
          </button>

          <a href="/accessibility" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            להצהרת הנגישות המלאה
          </a>
        </div>
      </aside>
    </>
  );
}

/* כפתור עגול לשינוי גודל טקסט */
function FontBtn({ label, aria, onClick, disabled }: { label: string; aria: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      disabled={disabled}
      style={{
        width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
        border: '1px solid rgba(200,160,53,0.35)',
        background: disabled ? 'rgba(13,31,60,0.04)' : 'var(--white)',
        color: disabled ? 'var(--text-light)' : 'var(--navy)',
        fontSize: '22px', fontWeight: 700, lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy-deep)'; } }}
      onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--navy)'; } }}
    >
      {label}
    </button>
  );
}
