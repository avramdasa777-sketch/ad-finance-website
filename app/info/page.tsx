import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'מידע מקצועי | A.D Finance',
  description: 'מידע פיננסי מקצועי ומהימן על קרן פנסיה, ביטוח מנהלים, קרן השתלמות, קופת גמל ועוד.',
};

const pages = [
  { href: '/info/keren-pensiya',          title: 'קרן פנסיה',               icon: '🏛', desc: 'המכשיר הפנסיוני הנפוץ ביותר — חיסכון לפרישה עם כיסויים ביטוחיים' },
  { href: '/info/bituach-menahilim',      title: 'ביטוח מנהלים',            icon: '👔', desc: 'פוליסת ביטוח וחיסכון לטווח ארוך עם תנאים מובטחים מראש' },
  { href: '/info/keren-hishtalmut',       title: 'קרן השתלמות',             icon: '📚', desc: 'חיסכון לטווח בינוני עם הטבות מס מצוינות — נזיל לאחר 6 שנים' },
  { href: '/info/kupat-gemel',            title: 'קופת גמל — תיקון 190',   icon: '💼', desc: 'כלי הדגל לניהול הון בגיל השלישי עם הטבות מס בין-דוריות חסרות תקדים' },
  { href: '/info/kupat-gemel-hashkaa',    title: 'קופת גמל להשקעה',        icon: '💰', desc: 'חיסכון גמיש לכל מטרה עם הטבות מס ונזילות מלאה' },
  { href: '/info/polisa-hisachon',        title: 'פוליסת חיסכון',           icon: '📋', desc: 'מכשיר חיסכון גמיש המנוהל על ידי חברות ביטוח' },
  { href: '/info/nihul-tikkim',           title: 'ניהול תיקים',             icon: '📁', desc: 'ניהול השקעות אישי מותאם לצרכים ולמטרות הפיננסיות שלכם' },
];

export default function InfoIndexPage() {
  return (
    <>
      <PageHeader
        tag="מידע מקצועי"
        title="מידע מקצועי"
        subtitle="כל מה שצריך לדעת על המכשירים הפיננסיים העומדים לרשותכם"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {pages.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className={`card-glass reveal delay-${Math.min((i + 1) * 100, 600)}`}
                style={{ padding: '28px', textDecoration: 'none', display: 'block' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{p.icon}</span>
                  <h2 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{p.title}</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.65, marginBottom: '16px' }}>{p.desc}</p>
                <span style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  קרא עוד
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}