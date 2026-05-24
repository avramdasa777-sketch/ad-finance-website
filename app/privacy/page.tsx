import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | A.D Finance',
  description: 'מדיניות הפרטיות של A.D Finance — אברהם דסה. כיצד אנו מגנים על המידע האישי שלך.',
};

export default function PrivacyPage() {
  const lastUpdated = '21 במאי 2025';

  return (
    <>
      <PageHeader
        tag="משפטי"
        title="מדיניות פרטיות"
        subtitle={`עדכון אחרון: ${lastUpdated}`}
      />

      <section style={{ padding: '60px 24px 80px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', lineHeight: 1.85, color: 'var(--text-mid)', fontSize: '15px' }}>

          <LegalSection title="1. כללי">
            <p>
              מדיניות פרטיות זו מסבירה כיצד A.D Finance — אברהם דסה (להלן: &quot;אנחנו&quot; / &quot;החברה&quot;) אוספים, משתמשים ושומרים על המידע האישי שאתה מוסר לנו, בהתאם לחוק הגנת הפרטיות, תשמ&quot;א–1981 ותקנותיו, וכן בהתאם לתקנות הגנת הפרטיות (אבטחת מידע), תשע&quot;ז–2017.
            </p>
          </LegalSection>

          <LegalSection title="2. המידע שאנחנו אוספים">
            <p>אנחנו אוספים את המידע הבא בעת מילוי טופס יצירת קשר:</p>
            <ul style={{ marginTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>שם מלא</li>
              <li>כתובת דוא&quot;ל</li>
              <li>מספר טלפון</li>
              <li>טווח הנכסים הפיננסיים (כפי שנבחר בטופס)</li>
              <li>תוכן ההודעה (אופציונלי)</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              אנחנו גם אוספים מידע טכני כמו כתובת IP לצורכי אבטחה ומניעת ספאם.
            </p>
          </LegalSection>

          <LegalSection title="3. מטרות השימוש במידע">
            <p>המידע שנאסף ישמש אך ורק לצרכים הבאים:</p>
            <ul style={{ marginTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>יצירת קשר חוזרת לצורך תיאום פגישת ייעוץ</li>
              <li>מתן שירות ייעוץ פיננסי</li>
              <li>שליחת מידע רלוונטי שביקשתם</li>
              <li>מניעת שימוש לרעה באתר</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              לא נשתמש במידע לשום מטרת שיווק ישיר ולא נמכור / נעביר אותו לצדדים שלישיים, למעט כנדרש על פי חוק.
            </p>
          </LegalSection>

          <LegalSection title="4. אחסון המידע">
            <p>
              המידע נשמר בשרתים מאובטחים. נטפל במידע האישי שלך בסודיות ובאחריות. אנחנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע מפני גישה בלתי מורשית, שינוי, גילוי או מחיקה.
            </p>
            <p style={{ marginTop: '10px' }}>
              לא נשמור את המידע יותר זמן ממה שנחוץ למטרה שלשמה נאסף.
            </p>
          </LegalSection>

          <LegalSection title="5. עוגיות (Cookies)">
            <p>
              האתר עשוי להשתמש בעוגיות טכניות הנחוצות לתפקוד תקין. לא נשתמש בעוגיות לצורכי מעקב פרסומי או שיווקי ללא הסכמתך המפורשת.
            </p>
          </LegalSection>

          <LegalSection title="6. זכויות המשתמש">
            <p>בהתאם לחוק הגנת הפרטיות הישראלי, יש לך הזכות:</p>
            <ul style={{ marginTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>לעיין במידע שנאסף עליך</li>
              <li>לתקן מידע שגוי</li>
              <li>לבקש מחיקת המידע</li>
              <li>להתנגד לעיבוד המידע</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              לממש זכויות אלה, פנה אלינו בכתב: <a href="mailto:avramdasa@gmail.com" style={{ color: 'var(--gold)' }}>avramdasa@gmail.com</a>
            </p>
          </LegalSection>

          <LegalSection title="7. קישורים לאתרים חיצוניים">
            <p>
              האתר עשוי להכיל קישורים לאתרים חיצוניים. איננו אחראים למדיניות הפרטיות של אתרים אלה.
            </p>
          </LegalSection>

          <LegalSection title="8. שינויים במדיניות">
            <p>
              אנחנו שומרים לעצמנו את הזכות לשנות מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לשינויים.
            </p>
          </LegalSection>

          <LegalSection title="9. יצירת קשר">
            <p>
              לכל שאלה בעניין מדיניות הפרטיות, פנו אלינו:<br />
              <strong>אברהם דסה — A.D Finance</strong><br />
              מייל: <a href="mailto:avramdasa@gmail.com" style={{ color: 'var(--gold)' }}>avramdasa@gmail.com</a><br />
              טלפון: <a href="tel:0528796188" style={{ color: 'var(--gold)' }}>052-879-6188</a>
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