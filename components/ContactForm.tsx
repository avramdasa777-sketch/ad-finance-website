'use client';
import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', assets: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'נא להזין שם מלא (לפחות 2 תווים)';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'נא להזין כתובת מייל תקינה';
    if (!form.phone.trim() || !/^[\d\s\-\+]{9,15}$/.test(form.phone)) errs.phone = 'נא להזין מספר טלפון תקין';
    if (!form.assets) errs.assets = 'נא לבחור את גודל הנכסים הפיננסיים';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = document.querySelector('[data-field-error]');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', assets: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 32px', background: '#ffffff', borderRadius: '20px', border: '1px solid rgba(200,160,53,0.2)', boxShadow: '0 4px 24px rgba(13,31,60,0.06)' }}>
        <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #c8a035, #e8c84a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#070f1e" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '10px' }}>ההודעה נשלחה בהצלחה!</h3>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.7 }}>
          תודה על פנייתכם. אברהם יחזור אליכם תוך יום עסקים.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-navy"
          style={{ marginTop: '24px', cursor: 'pointer' }}
        >
          שלח הודעה נוספת
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="טופס יצירת קשר"
      style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', border: '1px solid rgba(200,160,53,0.15)', boxShadow: '0 4px 24px rgba(13,31,60,0.06)' }}
    >
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
        קבעו פגישת ייעוץ חינמית
      </h2>
      <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '28px' }}>
        כל השדות המסומנים ב-<span style={{ color: '#c8a035' }}>*</span> הם חובה
      </p>

      {/* Name */}
      <FieldWrapper label="שם מלא" required error={errors.name}>
        <input
          type="text"
          className="form-input"
          placeholder="ישראל ישראלי"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          aria-required="true"
          aria-invalid={!!errors.name}
          autoComplete="name"
        />
      </FieldWrapper>

      {/* Email */}
      <FieldWrapper label="כתובת מייל" required error={errors.email}>
        <input
          type="email"
          className="form-input"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          aria-required="true"
          aria-invalid={!!errors.email}
          autoComplete="email"
          inputMode="email"
        />
      </FieldWrapper>

      {/* Phone */}
      <FieldWrapper label="מספר טלפון" required error={errors.phone}>
        <input
          type="tel"
          className="form-input"
          placeholder="050-000-0000"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          aria-required="true"
          aria-invalid={!!errors.phone}
          autoComplete="tel"
          inputMode="tel"
          dir="ltr"
        />
      </FieldWrapper>

      {/* Assets */}
      <FieldWrapper label="סך הנכסים הפיננסיים שברשותכם" required error={errors.assets}>
        <select
          className="form-input"
          value={form.assets}
          onChange={e => setForm(f => ({ ...f, assets: e.target.value }))}
          aria-required="true"
          aria-invalid={!!errors.assets}
          style={{ appearance: 'auto' }}
        >
          <option value="">בחר/י סכום...</option>
          <option value="100k-300k">100,000 ₪ — 300,000 ₪</option>
          <option value="300k-500k">300,000 ₪ — 500,000 ₪</option>
          <option value="500k-1m">500,000 ₪ — 1,000,000 ₪</option>
          <option value="1m+">מעל 1,000,000 ₪</option>
        </select>
      </FieldWrapper>

      {/* Message */}
      <FieldWrapper label="הודעה (אופציונלי)">
        <textarea
          className="form-input"
          placeholder="שאלה, נושא שרוצים לדון, מידע נוסף..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={4}
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
      </FieldWrapper>

      {/* Error banner */}
      {status === 'error' && (
        <div role="alert" style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#991b1b', fontSize: '14px' }}>
          אירעה שגיאה בשליחה. אנא נסו שנית או צרו קשר ישירות.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold"
        style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '15px', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            שולח...
          </>
        ) : (
          <>
            שלח ופגוש אותנו
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '12px', marginTop: '14px' }}>
        המידע שתמסרו ישמש לצורך יצירת קשר בלבד. ר׳{' '}
        <a href="/privacy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>מדיניות הפרטיות</a>
      </p>
    </form>
  );
}

function FieldWrapper({ label, required, error, children }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: '20px' }} data-field-error={error ? true : undefined}>
      <label className="form-label">
        {label}
        {required && <span style={{ color: '#c8a035', marginRight: '4px' }}>*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" style={{ color: '#dc2626', fontSize: '13px', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}