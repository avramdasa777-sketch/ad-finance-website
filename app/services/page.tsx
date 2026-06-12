import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'שירותי החברה | A.D Finance',
  description: 'שירותי ייעוץ פיננסי מקצועיים — צ׳ק אפ ביטוחים, צ׳ק אפ פנסיוני ותכנון פיננסי והשקעות.',
};

const services = [
  {
    href: '/services/insurance',
    title: 'צ׳ק אפ ביטוחים',
    desc: 'בדיקה מקיפה של כלל הביטוחים שלך — כיסויים, כפילויות, ואזורים שדורשים שיפור. נוודא שאתה מכוסה נכון ולא משלם יותר ממה שצריך.',
    items: ['ביטוח חיים', 'ביטוח אובדן כושר עבודה', 'ביטוח בריאות', 'ביטוח נסיעות'],
    icon: '🛡',
    color: 'var(--navy)',
  },
  {
    href: '/services/pension',
    title: 'צ׳ק אפ פנסיוני',
    desc: 'ניתוח מלא של המצב הפנסיוני הנוכחי — קרן פנסיה, ביטוח מנהלים, מסלולי השקעה, דמי ניהול ואופטימיזציה לתשואה מקסימלית.',
    items: ['בדיקת דמי ניהול', 'ניתוח מסלולי השקעה', 'תיאום בין קרנות', 'תכנון פרישה', 'הטבות מס'],
    icon: '📊',
    color: 'var(--navy-mid)',
  },
  {
    href: '/services/financial',
    title: 'תכנון פיננסי והשקעות',
    desc: 'בניית תוכנית פיננסית אישית ומקיפה שמתאימה למטרות שלך — חיסכון לטווח קצר ורחוק, השקעות מגוונות וניהול נכסים.',
    items: ['תכנון תקציב אישי', 'קופות גמל', 'פוליסות חיסכון', 'ניהול תיקי השקעות', 'תכנון ירושה'],
    icon: '📈',
    color: 'var(--navy-deep)',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        tag="שירותים"
        title="שירותי החברה"
        subtitle="פתרונות פיננסיים מקיפים — מבדיקה ראשונית ועד ליווי ארוך טווח"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map((s, i) => (
            <div key={s.href} className={`card-glass ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${(i + 1) * 100}`} style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', background: `linear-gradient(135deg, ${s.color}, var(--navy-light))`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 16px rgba(13,31,60,0.15)' }}>
                    {s.icon}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>{s.title}</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: '24px' }}>{s.desc}</p>
                <Link href={s.href} className="btn-navy">
                  פרטים נוספים
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>כולל:</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-mid)', fontSize: '14px' }}>
                      <span style={{ width: '20px', height: '20px', background: 'rgba(200,160,53,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c8a035" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="מעוניינים בבדיקה?" subtitle="צרו קשר לפגישת ייעוץ ראשונה חינמית — נבחן יחד את המצב הפיננסי שלכם." />
    </>
  );
}