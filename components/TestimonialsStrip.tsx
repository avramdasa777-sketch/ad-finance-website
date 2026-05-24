'use client';

const testimonials = [
  {
    name: 'דוד לוי',
    role: 'מהנדס בהייטק',
    text: 'אברהם גילה לי שאני משלם דמי ניהול כפולים כבר 8 שנים. החיסכון שנצטבר לטובתי היה עצום. שירות אישי ומקצועי ברמה הגבוהה ביותר.',
  },
  {
    name: 'מרים שמואלי',
    role: 'מורה בבית ספר',
    text: 'ניגשתי לבדיקה פנסיונית ויצאתי עם תוכנית מלאה לפרישה. אברהם הסביר הכל בסבלנות ובבירור — בלי מונחים מסובכים.',
  },
  {
    name: 'ניר בן דוד',
    role: 'עצמאי, בעל עסק',
    text: 'ייעוץ ביטוחי שחסך לי 500 שקל בחודש. כפילויות שלא ידעתי עליהן שנים. ממליץ בחום לכל עצמאי ובעל עסק.',
  },
  {
    name: 'שירה אביב',
    role: 'רואת חשבון',
    text: 'קיבלתי תוכנית פיננסית מסודרת לראשונה בחיים. אברהם מקשיב, מבין ונותן ייעוץ שבאמת מותאם לך ולא לכולם.',
  },
  {
    name: 'עמי גולדברג',
    role: 'רופא שיניים',
    text: 'הפגישה הראשונה הייתה חינמית ופתחה לי עיניים. מאז אברהם מלווה אותנו כמשפחה בכל ההחלטות הפיננסיות.',
  },
  {
    name: 'רחל כהן',
    role: 'אחות מוסמכת',
    text: 'בת 58 ולא ידעתי מה יהיה לי בפרישה. אברהם בנה תוכנית ברורה ועכשיו אני שקטה לגמרי. מקצועי, אמין ונגיש.',
  },
  {
    name: 'יוסף פרץ',
    role: 'קבלן שיפוצים',
    text: 'מצא לי כספים אבודים מעבודות ישנות שלא ידעתי עליהם בכלל. ממליץ לכולם לעשות בדיקה — שווה את הזמן.',
  },
  {
    name: 'ליאת ברק',
    role: 'עורכת דין',
    text: 'ניהול תיק ההשקעות שלי השתפר דרמטית. אברהם מבין בשוק ויודע להתאים את האסטרטגיה לנסיבות המשתנות.',
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="#c8a035" style={{ width: '15px', height: '15px', flexShrink: 0 }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div
      style={{
        width: '300px',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.96)',
        border: '1px solid rgba(200,160,53,0.18)',
        borderRadius: '20px',
        padding: '26px 22px',
        boxShadow: '0 4px 20px rgba(13,31,60,0.07)',
        direction: 'rtl',
      }}
    >
      <Stars />
      <p style={{ color: 'var(--text-mid)', fontSize: '13.5px', lineHeight: 1.75, marginBottom: '18px', fontStyle: 'italic' }}>
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px', height: '40px',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#c8a035', fontWeight: 800, fontSize: '15px', flexShrink: 0,
          }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '13.5px' }}>{name}</div>
          <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* duplicate once — animation goes 0 to -50% for seamless loop */
const items = [...testimonials, ...testimonials];

export default function TestimonialsStrip() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
        <div className="section-tag reveal">הלקוחות שלנו</div>
        <h2
          className="reveal delay-100"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--navy)', margin: '12px 0 0' }}
        >
          מה אומרים עלינו
        </h2>
      </div>

      {/* Single continuous row — no fade mask so cards are always fully visible */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '18px',
            width: 'max-content',
            animation: 'marquee 70s linear infinite',
            direction: 'ltr',
            paddingBottom: '8px',
          }}
        >
          {items.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}