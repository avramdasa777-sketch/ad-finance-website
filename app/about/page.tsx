import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { UsersIcon, StarIcon, HeartIcon, LockIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'אודות | A.D Finance — אברהם דסה',
  description: 'הכירו את אברהם דסה — יועץ פיננסי מורשה עם ניסיון רב. שירות אישי, אמין ומקצועי לניהול עתידך הפיננסי.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tag="אודות"
        title="קצת עלינו"
        subtitle="יועץ פיננסי שמאמין שכל אחד ראוי לניהול פיננסי חכם, אישי ואמין."
        videoSrc="/videos/about-banner.mp4"
      />

      {/* Main Content */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 20px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>

            {/* Text */}
            <div className="reveal">
              <img
                src="/images/logo.png"
                alt="A.D Finance"
                style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '24px' }}
              />
              <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.25 }}>
                אברהם דסה —<br />יועץ פיננסי מורשה
              </h2>
              <div className="gold-line" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-mid)', fontSize: '1rem', lineHeight: 1.8 }}>
                <p>
                  אברהם דסה הוא בעל רישיון מטעם רשות שוק ההון, ביטוח וחיסכון, ומתמחה בייעוץ פנסיוני ותכנון פיננסי מקיף. בעל ניסיון רב בסיוע לאנשים ולמשפחות לנהל את עתידם הפיננסי בחכמה, אחריות ושקיפות מלאה.
                </p>
                <p>
                  הגישה שלו ייחודית — הוא מאמין בפגישות אישיות מעמיקות שמתחילות בהבנת הצרכים, המטרות והחלומות של כל לקוח. אין תוכנית אחת לכולם; כל לקוח מקבל תוכנית מותאמת שנבנית בדיוק בשבילו.
                </p>
                <p>
                  מחויבות לרמה הגבוהה ביותר של שירות ומקצועיות, תוך שמירה על עדכון מתמיד בשינויי חקיקה, הטבות מס ואפשרויות חדשות בשוק הפיננסי.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="reveal delay-200">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>הערכים שמובילים אותי</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { Icon: UsersIcon,  title: 'אמינות',      desc: 'שקיפות מלאה בכל תהליך — כי האמון שלכם הוא הבסיס לכל עבודה משותפת.' },
                  { Icon: StarIcon,   title: 'מקצועיות',    desc: 'ידע מעמיק, עדכון שוטף ועמידה בסטנדרטים הגבוהים ביותר של הרגולציה.' },
                  { Icon: HeartIcon,  title: 'שירות אישי',  desc: 'כל לקוח הוא עולם ומלואו — ייעוץ שמתחיל מהקשבה ולא מוצרים.' },
                  { Icon: LockIcon,   title: 'אחריות',       desc: 'לוקח אחריות מלאה על הייעוץ — ועומד מאחורי כל המלצה שניתנת.' },
                ].map((v, i) => (
                  <div key={v.title} className={`card-glass reveal delay-${i * 100}`} style={{ padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <v.Icon size={18} color="#c8a035" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>{v.title}</div>
                      <div style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.6 }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: 'rgba(13,31,60,0.05)', padding: '16px 24px', borderTop: '1px solid rgba(13,31,60,0.08)' }}>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '12px', maxWidth: '800px', margin: '0 auto' }}>
          * התוכן בדף זה הינו מידע כללי בלבד ואינו מהווה ייעוץ פיננסי, משפטי או מס. לקבלת ייעוץ מותאם אישית — צרו קשר.
        </p>
      </div>

      {/* CTA */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 20px', background: 'var(--navy-deep)', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>
            מוכנים להתחיל?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '32px', lineHeight: 1.7 }}>
            הפגישה הראשונה חינמית לחלוטין — שיחה פתוחה, ללא התחייבות.
          </p>
          <Link href="/contact" className="btn-gold" style={{ fontSize: '16px', padding: '15px 36px' }}>
            קבע פגישת ייעוץ
          </Link>
        </div>
      </section>
    </>
  );
}