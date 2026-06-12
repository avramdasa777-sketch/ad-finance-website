import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import { CoinsIcon, ChartBarIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'צ׳ק אפ פנסיוני | שירותי החברה | A.D Finance',
  description: 'בדיקה פנסיונית מקצועית — דמי ניהול, מסלולי השקעה, תשואות, ותכנון פרישה נכון.',
};

const areas = [
  {
    Icon: CoinsIcon,
    title: 'דמי ניהול',
    desc: 'חשיפת דמי הניהול שאתם משלמים — מהצבירה ומהפרמיה — ומשא ומתן להורדתם מול קרנות הפנסיה.',
    color: '#1a3a5c',
  },
  {
    Icon: ChartBarIcon,
    title: 'מסלולי השקעה',
    desc: 'ניתוח המסלול הנוכחי והתאמתו לגיל, לנטל הסיכון ולאופק ההשקעה שלכם.',
    color: '#122847',
  },
  {
    Icon: TrendingUpIcon,
    title: 'תשואות',
    desc: 'בדיקת ביצועי הקופות לאורך זמן מול הממוצע בשוק — ומעבר לקרן ביצועית יותר בהתאם לאפיון צרכי הלקוח ומטרותיו.',
    color: '#0d1f3c',
  },
  {
    Icon: ClockIcon,
    title: 'תכנון פרישה',
    desc: 'חישוב הפנסיה הצפויה בגיל פרישה ובניית תוכנית שתבטיח רמת חיים נאותה.',
    color: '#1a3a5c',
  },
];

const checklistItems = [
  'פניה למסלקה הפנסיונית — איתור כל התוכניות הפנסיוניות, כולל כספים אבודים ממעסיקים קודמים',
  'ניתוח דמי הניהול מהצבירה ומהפרמיה — ומשא ומתן להורדתם',
  'בדיקת מסלולי ההשקעה ותשואות לאורך זמן מול הממוצע בשוק',
  'בחינת כיסויים ביטוחיים בתוך הפנסיה — נכות, שאירים ועוד',
  'איחוד קופות וכספים לצורך הוזלת עלויות ניהול',
  'עדכון מוטבים בהתאם לשינויים במצב המשפחתי',
  'עדכון התוכניות בהתאם לרפורמות האחרונות',
  'חישוב פנסיה צפויה ובניית תוכנית פרישה אישית',
];

export default function PensionCheckPage() {
  return (
    <>
      <PageHeader
        tag="שירותים"
        title="צ׳ק אפ פנסיוני"
        subtitle="ניתוח מעמיק של המצב הפנסיוני הנוכחי — דמי ניהול, מסלולים ותכנון לפרישה"
        breadcrumb={{ href: '/services', label: 'שירותי החברה' }}
        imageSrc="/images/pension.jpg"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Intro */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <div className="gold-line" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
              איך אתה מנהל את החיסכון הגדול ביותר שלך?
            </h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem', marginBottom: '16px' }}>
              החיסכון הפנסיוני — קרן הפנסיה, ביטוח מנהלים, קופות גמל וקרן השתלמות — הוא החיסכון הגדול והמשמעותי ביותר שצוברים לאורך החיים. ובכל זאת, רוב האנשים לא יודעים בדיוק מה קורה עם הכסף הזה.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              בדיקה פנסיונית מקצועית יכולה לחסוך עשרות ואפילו מאות אלפי שקלים לאורך חיי החיסכון. חוקי המס ותנאי התוכניות משתנים מעת לעת — חשוב לעקוב ולבצע התאמות עם איש מקצוע שמכיר את השוק לעומקו.
            </p>
          </div>

          {/* Areas grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '56px' }}
          >
            {areas.map(({ Icon, title, desc, color }, i) => (
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
                <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{title}</h3>
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
            <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '12px' }}>
              למי מתאים הצ׳ק אפ הפנסיוני?
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'גם שכירים וגם עצמאים שלא בדקו את הפנסיה שלהם מעולם — או שלא בדקו בשנים האחרונות',
                'מתאים מגיל 20 ולכל מי שהתחיל לעבוד בצורה מסודרת',
                'עצמאים שרוצים לדעת אם הם חוסכים מספיק לפרישה',
                'אנשים שעבדו במספר מקומות עבודה ורוצים לאחד ולסדר את הכספים',
                'מי שמתקרב לגיל 50–60 ורוצה לתכנן את הפרישה בצורה אופטימלית',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--text-mid)', fontSize: '15px' }}>
                  <CheckCircleIcon size={18} color="#c8a035" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Checklist */}
          <div
            className="reveal delay-200"
            style={{ background: 'var(--navy-deep)', borderRadius: '20px', padding: '36px', marginBottom: '32px' }}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '24px' }}>
              מה הבדיקה כוללת?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {checklistItems.map(item => (
                <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6 }}>
                  <span style={{ color: '#c8a035', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: '24px',
                padding: '16px 20px',
                background: 'rgba(200,160,53,0.1)',
                border: '1px solid rgba(200,160,53,0.2)',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: '#c8a035' }}>שימו לב: </strong>
              פניה למסלקה הפנסיונית כרוכה בתשלום, אך הפניה תיעשה עבורכם ללא עלות כחלק מהשירות.
            </div>
          </div>

        </div>
      </section>

      <CTASection
        title="בואו נבדוק את הפנסיה שלכם"
        subtitle="ייתכן שאתם מפסידים כסף כל חודש מבלי לדעת. פגישה חינמית — ונגלה יחד מה ניתן לשפר."
      />
    </>
  );
}