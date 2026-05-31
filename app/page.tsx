import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import {
  UsersIcon, ListIcon, ClockIcon, CheckCircleIcon,
  PensionIcon, BriefcaseIcon, GraduationIcon,
  PiggyBankIcon, CoinsIcon, DocumentIcon, FolderIcon,
  ChevronLeftIcon, PhoneIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'A.D Finance | ייעוץ פיננסי אישי — אברהם דסה',
  description: 'יועץ פיננסי מורשה אברהם דסה. ניהול פנסיה, ביטוח, קרן השתלמות, תכנון פיננסי. פגישת ייעוץ ראשונה ללא עלות.',
};

const services = [
  {
    href: '/services/insurance',
    image: '/images/insurance.jpg',
    title: 'צ׳ק אפ ביטוחים',
    desc: 'בדיקה מקיפה של כלל הביטוחים שלך — כיסויים, כפילויות, ואזורים שדורשים שיפור.',
    bullets: ['ביטוח חיים', 'אובדן כושר עבודה', 'ביטוח בריאות', 'ביטוח סיעודי'],
  },
  {
    href: '/services/pension',
    image: '/images/pension.jpg',
    title: 'צ׳ק אפ פנסיוני',
    desc: 'ניתוח מצב הפנסיה הנוכחי שלך, מסלולי השקעה, דמי ניהול ואופטימיזציה לעתיד.',
    bullets: ['דמי ניהול', 'מסלולי השקעה', 'תשואות היסטוריות', 'תכנון פרישה'],
  },
  {
    href: '/services/financial',
    image: '/images/financial.jpg',
    title: 'תכנון פיננסי',
    desc: 'בניית תוכנית פיננסית אישית מותאמת למטרות שלך — חיסכון, השקעות וצמיחה.',
    bullets: ['תכנון תקציב', 'חיסכון חכם', 'תיק השקעות', 'יעדים ארוכי טווח'],
  },
];

const uniqueFeatures = [
  {
    Icon: UsersIcon,
    title: 'פגישה אישית מותאמת',
    desc: 'כל לקוח מקבל ייעוץ מותאם אישית בהתאם לצרכיו, מטרותיו וחלומותיו הפיננסיים.',
  },
  {
    Icon: ListIcon,
    title: 'פגישות תקופתיות',
    desc: 'מעקב שוטף ועדכון התוכנית הפיננסית בהתאם לשינויים בחיים ובשוק.',
  },
  {
    Icon: ClockIcon,
    title: 'זמינות 24/7',
    desc: 'תמיד ניתן להגיע — שאלה, בעיה או הזדמנות לא מחכות לשעות עבודה.',
  },
  {
    Icon: CheckCircleIcon,
    title: 'עדכון מקצועי שוטף',
    desc: 'תמיד תהיו מעודכנים בשינויי חקיקה, הטבות מס ואפשרויות חדשות בשוק.',
  },
];

const infoLinks = [
  { href: '/info/keren-pensiya',          title: 'קרן פנסיה',             Icon: PensionIcon,    desc: 'הכספים שצוברים לפרישה' },
  { href: '/info/bituach-menahilim',      title: 'ביטוח מנהלים',          Icon: BriefcaseIcon,  desc: 'פוליסת ביטוח פנסיוני' },
  { href: '/info/keren-hishtalmut',       title: 'קרן השתלמות',           Icon: GraduationIcon, desc: 'חיסכון עם הטבות מס' },
  { href: '/info/kupat-gemel',            title: 'קופת גמל',              Icon: PiggyBankIcon,  desc: 'חיסכון לטווח ארוך' },
  { href: '/info/kupat-gemel-hashkaa',    title: 'קופת גמל להשקעה',      Icon: CoinsIcon,      desc: 'גמישות ומסלולי השקעה' },
  { href: '/info/polisa-hisachon',        title: 'פוליסת חיסכון',         Icon: DocumentIcon,   desc: 'חיסכון בביטוח חיים' },
  { href: '/info/nihul-tikkim',           title: 'ניהול תיקים',           Icon: FolderIcon,     desc: 'ניהול תיק השקעות אישי' },
];

const processSteps = [
  {
    num: '01',
    title: 'פגישת היכרות חינמית',
    desc: 'נפגש, נכיר ונבין את המצב הפיננסי הנוכחי שלכם — ללא עלות וללא התחייבות.',
  },
  {
    num: '02',
    title: 'ניתוח מקצועי מעמיק',
    desc: 'אנחנו בוחנים את כל המסמכים, הפוליסות וההסכמים ומזהים הזדמנויות לשיפור.',
  },
  {
    num: '03',
    title: 'תוכנית פעולה אישית',
    desc: 'מקבלים המלצות ברורות, תוכנית מפורטת ויישום מלא בצד שלנו.',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-tag">שירותינו</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
              מה אנחנו מציעים
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              שירותי ייעוץ פיננסי מקיפים — מבדיקה ראשונית ועד ליווי ארוך טווח
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {services.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`service-card reveal delay-${(i + 1) * 100}`}
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  borderRadius: '18px 18px 0 0',
                  position: 'relative',
                }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="service-card-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(13,31,60,0.6) 0%, transparent 60%)',
                  }} />
                </div>
                <div style={{ padding: '28px 28px 24px' }}>
                <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '10px' }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '20px' }}>
                  {s.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {s.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-mid)', fontSize: '13px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold)', fontSize: '14px', fontWeight: 600 }}>
                  קרא עוד
                  <ChevronLeftIcon size={14} color="var(--gold)" strokeWidth={2.5} />
                </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: 'var(--navy-deep)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,160,53,0.07) 0%, transparent 70%)', borderRadius: '50%', transform: 'translateY(-50%)' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-tag">תהליך העבודה</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>
              איך זה עובד?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              תהליך פשוט, ברור ומחייב — מהפגישה הראשונה ועד לתוכנית המלאה
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {processSteps.map((step, i) => (
              <div key={step.num} className={`reveal delay-${(i + 1) * 150}`} style={{ position: 'relative' }}>
                <div className="process-step-card" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(200,160,53,0.15)',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  height: '100%',
                }}>
                  <div className="step-num" style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, rgba(200,160,53,0.25), rgba(200,160,53,0.08))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.93rem', lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div aria-hidden="true" style={{
                    display: 'none',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: 'var(--navy-deep)', position: 'relative', overflow: 'hidden' }}>
        {/* Video background */}
        <video
          autoPlay muted loop playsInline preload="auto" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28, zIndex: 0 }}
        >
          <source src="/videos/crypto-trading.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,30,0.88) 0%, rgba(13,31,60,0.82) 100%)', zIndex: 1 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-tag">למה לבחור בנו</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>
              מה מייחד אותנו
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              ייעוץ שמתחיל מהקשבה — ולא עוצר עד שתגיעו ליעד
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {uniqueFeatures.map((f, i) => (
              <div key={f.title} className={`reveal delay-${(i + 1) * 100}`} style={{
                padding: '32px 28px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(200,160,53,0.18)',
                borderRadius: '20px',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  width: '52px', height: '52px',
                  background: 'rgba(200,160,53,0.12)',
                  border: '1px solid rgba(200,160,53,0.25)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px',
                }}>
                  <f.Icon size={22} color="#c8a035" strokeWidth={1.8} />
                </div>
                <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.92rem', lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Info */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-tag">מידע מקצועי</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>
              הכירו את המכשירים הפיננסיים
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              מידע אמין ונגיש על כלל המכשירים הפיננסיים שעומדים לרשותכם
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {infoLinks.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`info-link-card-dark reveal delay-${Math.min((i + 1) * 80, 600)}`}
                style={{ flex: '1 1 calc(25% - 16px)', minWidth: '220px', maxWidth: 'calc(25% - 12px)' }}
              >
                <div style={{
                  width: '42px', height: '42px', flexShrink: 0,
                  background: 'rgba(200,160,53,0.12)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.Icon size={20} color="#c8a035" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '3px' }}>{item.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(200,160,53,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="reveal">
            <div className="section-tag">בואו נתחיל</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: '20px' }}>
              מוכנים לקחת שליטה על
              <br />
              <span className="text-gradient-gold">העתיד הפיננסי שלכם?</span>
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', marginBottom: '40px', lineHeight: 1.75 }}>
              פגישת הייעוץ הראשונה היא חינמית לחלוטין — ללא התחייבות וללא לחץ.
              <br />
              רק שיחה כנה על המצב שלכם ואיך ניתן לשפר אותו.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
              <Link href="/contact" className="btn-gold" style={{ fontSize: '16px', padding: '16px 40px' }}>
                קבע פגישה עכשיו
              </Link>
              <a href="tel:0528796188" className="btn-navy" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneIcon size={16} color="currentColor" strokeWidth={2} />
                052-879-6188
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}                                                                                          