import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | A.D Finance',
  description: 'הצהרת הנגישות של A.D Finance — אברהם דסה. מחויבותנו להנגשת האתר לכלל הציבור, כולל אנשים עם מוגבלות.',
};

export default function AccessibilityPage() {
  const lastUpdated = '12 ביוני 2026';

  return (
    <>
      <PageHeader
        tag="נגישות"
        title="הצהרת נגישות"
        subtitle={`עדכון אחרון: ${lastUpdated}`}
      />

      <section style={{ padding: '60px 24px 80px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', lineHeight: 1.85, color: 'var(--text-mid)', fontSize: '15px' }}>

          <LegalSection title="1. מחויבות להנגשה">
            <p>
              A.D Finance — אברהם דסה רואה חשיבות רבה במתן שירות שוויוני לכלל הלקוחות, ופועלת להנגשת אתר האינטרנט שלה כך שיהיה זמין ונוח לשימוש עבור אנשים עם מוגבלות. הנגשת האתר נעשתה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח–1998, ולתקנותיו, ובהתאם לתקן הישראלי SI 5568 המבוסס על הנחיות WCAG 2.1.
            </p>
          </LegalSection>

          <LegalSection title="2. רמת הנגישות באתר">
            <p>
              האתר הותאם לעמידה ברמת נגישות AA לפי הנחיות WCAG 2.1 ככל הניתן. בין היתר יושמו העקרונות הבאים:
            </p>
            <ul style={{ marginTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>מבנה אתר סמנטי ותקין המאפשר ניווט באמצעות קוראי מסך</li>
              <li>תמיכה מלאה בניווט באמצעות מקלדת (מקש Tab) לכל הרכיבים האינטראקטיביים</li>
              <li>טקסט חלופי (alt) לתמונות נושאות משמעות</li>
              <li>ניגודיות צבעים העומדת בדרישות התקן</li>
              <li>הגדרת שפת האתר לעברית (lang=&quot;he&quot;) וכיווניות מימין לשמאל</li>
              <li>תוויות (labels) ברורות לכל שדות הטפסים</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. תפריט הנגישות באתר">
            <p>
              באתר מוטמע רכיב נגישות הזמין מכל עמוד (הכפתור העגול בפינה השמאלית התחתונה של המסך), המאפשר התאמה אישית של תצוגת האתר:
            </p>
            <ul style={{ marginTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>הגדלת גודל הטקסט (רגיל / גדול / גדול מאוד)</li>
              <li>הגברת ניגודיות הצבעים</li>
              <li>הדגשת קישורים בקו תחתון</li>
              <li>איפוס מהיר של כל ההתאמות</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              חשוב להדגיש: רכיב הנגישות מהווה כלי עזר בלבד ואינו מחליף את ההתאמות שבוצעו במבנה האתר עצמו.
            </p>
          </LegalSection>

          <LegalSection title="4. הסתייגויות">
            <p>
              חרף מאמצינו להנגיש את כלל עמודי האתר, ייתכן שיימצאו חלקים או רכיבים שטרם הונגשו במלואם, או תכנים של צד שלישי שאינם בשליטתנו. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף כחלק ממחויבותנו לאפשר שימוש נוח לכלל האוכלוסייה.
            </p>
          </LegalSection>

          <LegalSection title="5. פנייה בנושא נגישות">
            <p>
              נתקלתם בקושי או בבעית נגישות באתר? נשמח לקבל את פנייתכם ונפעל לתקן זאת בהקדם. ניתן לפנות לרכז הנגישות:
            </p>
            <p style={{ marginTop: '12px' }}>
              <strong>אברהם דסה — A.D Finance</strong><br />
              מייל: <a href="mailto:avramdasa777@gmail.com" style={{ color: 'var(--gold)' }}>avramdasa777@gmail.com</a><br />
              טלפון: <a href="tel:0528796188" style={{ color: 'var(--gold)' }}>052-879-6188</a>
            </p>
            <p style={{ marginTop: '12px' }}>
              בעת הפנייה נודה אם תפרטו את הבעיה שבה נתקלתם, את העמוד שבו אירעה, ואת סוג הדפדפן והמכשיר שבהם נעשה שימוש — פרטים אלה יסייעו לנו לטפל בפנייה במהירות.
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid rgba(200,160,53,0.2)' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  );
}
