import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import { DocumentIcon, PiggyBankIcon, TrendingUpIcon, LockIcon, CheckCircleIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'תכנון פיננסי והשקעות | שירותי החברה | A.D Finance',
  description: 'תכנון פיננסי אישי מקיף — בניית תוכנית חיסכון, ניהול נכסים והגדלת הון לטווח ארוך.',
};

const pillars = [
  {
    Icon: DocumentIcon,
    title: 'תכנון תקציב',
    desc: 'מיפוי הכנסות והוצאות ויצירת תוכנית תקציב ריאלית — כדי שהכסף יעבוד בשבילכם ולא להפך.',
    color: '#1a3a5c',
  },
  {
    Icon: PiggyBankIcon,
    title: 'חיסכון ממוקד',
    desc: 'קופות גמל להשקעה, פוליסות חיסכון וכלים נוספים לחיסכון חכם עם הטבות מס מקסימליות.',
    color: '#122847',
  },
  {
    Icon: TrendingUpIcon,
    title: 'ניהול השקעות',
    desc: 'פיזור השקעות מתאים לנטל הסיכון ולאופק ההשקעה — ניהול אקטיבי שמגיב לשינויים בשוק.',
    color: '#0d1f3c',
  },
  {
    Icon: LockIcon,
    title: 'תכנון ירושה',
    desc: 'הגנה על הנכסים ודאגה למשפחה — צוואה, ייפוי כוח מתמשך, מינוי מוטבים ועוד.',
    color: '#1a3a5c',
  },
];

const process = [
  { num: '01', title: 'מיפוי המצב הנוכחי', desc: 'נבחן יחד את כל הנכסים, ההתחייבויות, ההכנסות וההוצאות — תמונת מצב מלאה.' },
  { num: '02', title: 'הגדרת מטרות', desc: 'מה אתם רוצים להשיג? בית, חינוך לילדים, פרישה מוקדמת, חופש כלכלי — כל מטרה מקבלת תוכנית.' },
  { num: '03', title: 'בניית התוכנית', desc: 'תוכנית פיננסית מסודרת עם יעדים ברורים, כלים מתאימים ולוח זמנים ריאלי.' },
  { num: '04', title: 'מעקב ועדכון', desc: 'החיים משתנים — התוכנית מתעדכנת בהתאם. מעקב שוטף ושמירה על המסלול.' },
];

export default function FinancialPlanningPage() {
  return (
    <>
      <PageHeader
        tag="שירותים"
        title="תכנון פיננסי והשקעות"
        subtitle="בניית תוכנית פיננסית אישית ומקיפה — מחיסכון ראשוני ועד ניהול נכסים לטווח ארוך"
        breadcrumb={{ href: '/services', label: 'שירותי החברה' }}
        imageSrc="/images/financial.jpg"
      />

      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Intro */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <div className="gold-line" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
              תכנון פיננסי — הבסיס לחיים יציבים
            </h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem', marginBottom: '16px' }}>
              אנשים רבים מרוויחים טוב אבל מרגישים שהכסף &ldquo;נעלם&rdquo; בסוף החודש. הסיבה בדרך כלל אינה ההכנסה — אלא היעדר תכנון. תכנון פיננסי מקצועי הוא הכלי שמאפשר לכם לקחת שליטה אמיתית על העתיד הכלכלי שלכם.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              אברהם בונה יחד איתכם תוכנית מותאמת אישית שלוקחת בחשבון את ההכנסות, ההוצאות, המטרות לטווח קצר וארוך — ויוצרת מסלול ברור לצמיחה פיננסית ולחופש כלכלי.
            </p>
          </div>

          {/* Pillars */}
          <div
            className="reveal delay-100"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '56px' }}
          >
            {pillars.map(({ Icon, title, desc, color }) => (
              <div key={title} className="card-glass" style={{ padding: '26px' }}>
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

          {/* Process */}
          <div className="reveal delay-150" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '28px' }}>
              כך עובד התהליך
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {process.map(({ num, title, desc }, idx) => (
                <div
                  key={num}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    paddingBottom: idx < process.length - 1 ? '28px' : 0,
                    borderRight: idx < process.length - 1 ? '2px solid rgba(200,160,53,0.25)' : '2px solid transparent',
                    marginRight: '22px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#c8a035',
                      fontWeight: 800,
                      fontSize: '13px',
                      flexShrink: 0,
                      marginRight: '-24px',
                      border: '2px solid rgba(200,160,53,0.3)',
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ paddingRight: '12px', paddingBottom: '8px' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', fontSize: '1.05rem' }}>{title}</h3>
                    <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who is it for */}
          <div
            className="reveal delay-200"
            style={{ background: 'var(--navy-deep)', borderRadius: '20px', padding: '36px' }}
          >
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              למי מתאים תכנון פיננסי?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {[
                'צעירים שרוצים להתחיל לחסוך ולהשקיע נכון',
                'זוגות שמתכננים לקנות דירה ורוצים להבין מה הם יכולים להרשות לעצמם',
                'הורים שרוצים לחסוך לחינוך ילדיהם',
                'עצמאים שרוצים להפריד בין כספי העסק לאישי',
                'אנשים שקיבלו ירושה ורוצים להשקיע נכון',
                'מי שמרוויח טוב אבל מרגיש שהכסף &ldquo;נעלם&rdquo;',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6 }}>
                  <CheckCircleIcon size={16} color="#c8a035" strokeWidth={2} />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CTASection
        title="בואו נבנה יחד את התוכנית שלכם"
        subtitle="פגישת תכנון פיננסי ראשונה — חינם וללא התחייבות. נסמן יחד את הדרך לחופש כלכלי."
      />
    </>
  );
}