import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import { HeartIcon, ShieldIcon, CheckCircleIcon, LockIcon, UsersIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'צ׳ק אפ ביטוחים | שירותי החברה | A.D Finance',
  description: 'בדיקה מקיפה של כל הביטוחים שלך — מצאו כפילויות, מלאו חסכים, והפסיקו לשלם יותר ממה שצריך.',
};

const coverageTypes = [
  {
    Icon: HeartIcon,
    title: 'ביטוח חיים',
    desc: 'בדיקת סכום הכיסוי, התאמתו למצב המשפחתי הנוכחי, ועדכון המוטבים. גם ביטוח החיים שלך מזדקן.',
    color: '#1a3a5c',
  },
  {
    Icon: ShieldIcon,
    title: 'אובדן כושר עבודה',
    desc: 'ניתוח הכיסוי מול ההכנסה הנוכחית, זיהוי פערים, ובחינה אם ההגנה מספיקה במקרה של תאונה או מחלה.',
    color: '#122847',
  },
  {
    Icon: CheckCircleIcon,
    title: 'ביטוח בריאות',
    desc: 'בחינת כיסויי ניתוחים, תרופות, בדיקות ורופאים מומחים — ומוודאים שאתם לא משלמים על מה שכבר כלול בביטוח הלאומי.',
    color: '#0d1f3c',
  },
  {
    Icon: UsersIcon,
    title: 'ביטוח אמבולטורי',
    desc: 'התייעצות עם רופאים מומחים, אשפוז בית, ליווי רפואי ובדיקות — כיסוי לטיפולים שאינם דורשים אשפוז מלא בבית החולים.',
    color: '#16335a',
  },
];

const results = [
  'דוח ברור ומובן של כל הביטוחים הקיימים — מי מכסה מה ועד מתי',
  'זיהוי כפילויות — ביטוחים כפולים שאפשר לחסוך בהם מיד',
  'מיפוי פערים בכיסוי שדורשים תשומת לב לפני שיקרה משהו',
  'המלצות ספציפיות ומותאמות למצב המשפחתי שלכם',
  'תוכנית פעולה ברורה לשיפור הכיסוי הביטוחי',
  'ליווי מלא בכל תהליך שינוי הפוליסות — מא׳ עד ת׳',
];

export default function InsurancePage() {
  return (
    <>
      <PageHeader
        tag="שירותים"
        title="צ׳ק אפ ביטוחים"
        subtitle="בדיקה מקיפה ומעמיקה של כלל הביטוחים שלך — כיסויים, כפילויות, ופערים שעלולים לעלות ביוקר"
        breadcrumb={{ href: '/services', label: 'שירותי החברה' }}
        imageSrc="/images/pension.jpg"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Intro */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <div className="gold-line" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
              האם הביטוחים שלך באמת מגנים עליך?
            </h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem', marginBottom: '16px' }}>
              רוב האנשים אוספים ביטוחים לאורך השנים מסוגים שונים — ומגיעים למצב שבו הם משלמים פי שניים על אותו כיסוי, או לחלופין מחזיקים בביטוחים שכבר לא באמת מתאימים לצרכים שלהם כיום, עם פערים שיתגלו רק כשיצטרכו להגיש תביעה.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              צ׳ק אפ ביטוחי הוא בדיקה יסודית של כל הכיסויים שיש לכם — ביטוח חיים, אובדן כושר עבודה, בריאות ועוד. המטרה: לוודא שאתם מכוסים נכון, לא משלמים כפילויות, ולא נמצאים עם פערים שעלולים לעלות ביוקר.
            </p>
          </div>

          {/* Coverage types */}
          <div
            className="grid-cards-4"
            style={{ marginBottom: '56px' }}
          >
            {coverageTypes.map(({ Icon, title, desc, color }, i) => (
              <div key={title} className={`card-glass reveal delay-${i * 100}`} style={{ padding: '26px' }}>
                <div
                  style={{
                    width: '48px', height: '48px',
                    background: `linear-gradient(135deg, ${color}, var(--navy-light))`,
                    borderRadius: '13px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={22} color="#c8a035" strokeWidth={1.8} />
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', fontSize: '1.02rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* For whom */}
          <div
            className="reveal delay-150"
            style={{
              background: 'rgba(200,160,53,0.07)',
              border: '1px solid rgba(200,160,53,0.25)',
              borderRadius: '16px',
              padding: '28px 32px',
              marginBottom: '40px',
            }}
          >
            <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '14px' }}>
              למי מתאים הצ׳ק אפ הביטוחי?
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'מי שיש לו ביטוחים ממספר חברות ורוצה לסדר ולאחד',
                'זוגות שהתחתנו לאחרונה ורוצים לבדוק שהכיסוי מתאים למצב החדש',
                'הורים לילדים קטנים שרוצים לוודא שהמשפחה מוגנת',
                'עצמאים שרוצים לבדוק שיש להם אובדן כושר עבודה מתאים',
                'כל מי שלא בדק את הביטוחים שלו בשלוש השנים האחרונות',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--text-mid)', fontSize: '15px' }}>
                  <LockIcon size={16} color="#c8a035" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div
            className="reveal delay-200"
            style={{ background: 'var(--navy-deep)', borderRadius: '20px', padding: '36px', marginBottom: '32px' }}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '24px' }}>
              מה תקבלו בסיום הבדיקה?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {results.map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.78)', fontSize: '15px', lineHeight: 1.6 }}>
                  <span style={{ color: '#c8a035', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal delay-300"
            style={{
              background: 'rgba(200,160,53,0.08)',
              border: '1px solid rgba(200,160,53,0.25)',
              borderRadius: '14px',
              padding: '20px 24px',
            }}
          >
            <p style={{ color: 'var(--text-mid)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--navy)' }}>חשוב לדעת: </strong>
              הבדיקה נעשית בצורה אובייקטיבית ומקצועית לחלוטין. אין מטרה למכור מוצר ספציפי — אנחנו כאן לשרת את האינטרסים שלכם בלבד.
            </p>
          </div>

        </div>
      </section>

      <CTASection
        title="רוצים לבדוק את הביטוחים שלכם?"
        subtitle="קבעו פגישה חינמית — נעבור יחד על כל הכיסויים ונוודא שאתם מוגנים נכון."
      />
    </>
  );
}