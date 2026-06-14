import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'השקעות אלטרנטיביות | מידע מקצועי | A.D Finance',
  description: 'מידע על השקעות אלטרנטיביות — מה הן, אילו סיכונים כרוכים בהן ולמי הן מתאימות.',
};

export default function HashkaotAlternativiotPage() {
  return (
    <>
      <PageHeader
        tag="מידע מקצועי"
        title="השקעות אלטרנטיביות"
        subtitle="מכשירי השקעה מחוץ לשוק ההון הסחיר — מידע כללי לבעלי ניסיון"
        breadcrumb={{ href: '/info', label: 'מידע מקצועי' }}
        videoSrc="/videos/info-banner-3.mp4"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Important Notice */}
          <div className="reveal" style={{
            background: 'rgba(200,160,53,0.08)',
            border: '2px solid rgba(200,160,53,0.35)',
            borderRadius: '16px',
            padding: '24px 28px',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px', flexShrink: 0 }}>⚠️</span>
              <div>
                <h3 style={{ color: 'var(--navy)', fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>הערה חשובה</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.7 }}>
                  השקעות אלטרנטיביות כוללות סיכונים גבוהים יותר בהשוואה לשוק ההון הסחיר. המידע בדף זה הוא <strong>כללי ומבואי בלבד</strong> ואינו מהווה המלצה להשקעה. כל החלטת השקעה טעונה ייעוץ פרטני ומותאם אישית.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal delay-100" style={{ marginBottom: '40px' }}>
            <div className="gold-line" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '14px' }}>מה הן השקעות אלטרנטיביות?</h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>
              השקעות אלטרנטיביות הן כל השקעה שאינה מניות, אגרות חוב או מזומן הנסחרים בבורסה. הן כוללות תחומים כמו נדל״ן, קרנות גידור, השקעות בחברות לא ציבוריות (Private Equity), סחורות, קרנות אשראי פרטי ועוד. בשנים האחרונות, ניתן גם לגופים מוסדיים ולמשקיעים כשירים לגשת לחלק מהמכשירים הללו.
            </p>
          </div>

          <div className="reveal delay-200 grid-cards-4" style={{ marginBottom: '40px' }}>
            {[
              { title: 'נדל״ן', desc: 'השקעה ישירה בנכסים, קרנות נדל״ן (REIT) או פלטפורמות מימון המונים לנדל״ן.', icon: '🏢' },
              { title: 'אשראי פרטי', desc: 'הלוואות לחברות ויחידים מחוץ למערכת הבנקאית — לרוב עם תשואה גבוהה יותר.', icon: '💳' },
              { title: 'קרנות גידור', desc: 'אסטרטגיות השקעה מורכבות הנגישות בעיקר לגופים מוסדיים ומשקיעים כשירים.', icon: '🔮' },
              { title: 'Private Equity', desc: 'השקעה בחברות פרטיות לפני הנפקה ציבורית — פוטנציאל גבוה לצד סיכון גבוה.', icon: '🏗' },
            ].map(item => (
              <div key={item.title} className="card-glass" style={{ padding: '22px' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '7px', fontSize: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '13.5px', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal delay-300" style={{ background: 'var(--navy-deep)', borderRadius: '16px', padding: '28px', marginBottom: '28px' }}>
            <h3 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '16px' }}>סיכונים שחשוב להכיר</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'חוסר נזילות — קשה למשוך את הכסף מהר',
                'מורכבות — דורש ידע וניסיון להבנת המוצר',
                'שקיפות נמוכה יחסית לשוק הסחיר',
                'סיכון אשראי — תלות בגורם המנהל את ההשקעה',
                'מינימום השקעה גבוה לרוב',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
                  <span style={{ color: '#c8a035', flexShrink: 0, marginTop: '1px' }}>!</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal delay-400" style={{ background: 'rgba(13,31,60,0.05)', border: '1px solid rgba(13,31,60,0.1)', borderRadius: '10px', padding: '16px 20px' }}>
            <p style={{ color: 'var(--text-light)', fontSize: '12.5px', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--text-mid)' }}>כתב ויתור: </strong>
              מידע זה הינו כללי ומבואי בלבד. אין בו כדי להוות ייעוץ השקעות, שיווק השקעות, המלצה להשקעה, מכירה או רכישה של ניירות ערך. השקעות בנכסים אלטרנטיביים כרוכות בסיכון לאובדן חלק מהשקעה או כולה. לפני כל השקעה יש לקבל ייעוץ מורשה ולקרוא את כל מסמכי ההשקעה.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="מעוניינים לדעת עוד?"
        subtitle="שיחת ייעוץ אישית תעזור להבין האם ואיך השקעות אלטרנטיביות מתאימות לתמהיל שלכם."
      />
    </>
  );
}