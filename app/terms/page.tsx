import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'תקנון שימוש | A.D Finance',
  description: 'תקנון שימוש באתר A.D Finance — תנאים והגבלות.',
};

export default function TermsPage() {
  const lastUpdated = '21 במאי 2025';

  return (
    <>
      <PageHeader
        tag="משפטי"
        title="תקנון שימוש"
        subtitle={`עדכון אחרון: ${lastUpdated}`}
      />

      <section style={{ padding: '60px 24px 80px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', lineHeight: 1.85, color: 'var(--text-mid)', fontSize: '15px' }}>

          <LegalSection title="1. כללי">
            <p>
              ברוכים הבאים לאתר A.D Finance. השימוש באתר מהווה הסכמה לתנאי השימוש המפורטים להלן. אם אינך מסכים לתנאים אלה, אנא הפסק את השימוש באתר.
            </p>
            <p>
              האתר מנוהל על ידי אברהם דסה — יועץ פיננסי מורשה (להלן: &quot;בעל האתר&quot;).
            </p>
          </LegalSection>

          <LegalSection title="2. המידע באתר">
            <p>
              המידע המוצג באתר הינו <strong>לצורכי מידע כללי בלבד</strong> ואינו מהווה ייעוץ פיננסי, משפטי, מס, השקעות, שיווק השקעות, ביטוח או כל ייעוץ מקצועי אחר. כל פרסום כזה אינו תחליף לייעוץ מקצועי מותאם אישית.
            </p>
            <p>
              בעל האתר אינו אחראי לנזק כלשהו שייגרם כתוצאה משימוש במידע המופיע באתר ללא ייעוץ אישי מוסמך.
            </p>
          </LegalSection>

          <LegalSection title="3. ייעוץ פיננסי">
            <p>
              אברהם דסה הוא יועץ פיננסי מורשה בהתאם לחוק הפיקוח על שירותים פיננסיים (עיסוק בייעוץ השקעות, בשיווק השקעות ובניהול תיקי השקעות), תשס&quot;ה–2005. הייעוץ ניתן בהתאם לרישיון ולכפוף לחקיקה הרלוונטית.
            </p>
            <p>
              הייעוץ הפיננסי האישי ניתן בפגישות ייעוץ אישיות בלבד ואינו כלול בתוכן האתר.
            </p>
          </LegalSection>

          <LegalSection title="4. קניין רוחני">
            <p>
              כל זכויות הקניין הרוחני בתוכן האתר — לרבות טקסטים, עיצוב, לוגו וגרפיקה — שמורות לבעל האתר. אין לעשות שימוש כלשהו בתכנים ללא אישור בכתב מראש.
            </p>
          </LegalSection>

          <LegalSection title="5. אחריות מוגבלת">
            <p>
              בעל האתר אינו אחראי לנזקים ישירים, עקיפים, מקריים, עונשיים או תוצאתיים הנובעים משימוש באתר או מאי-יכולת להשתמש בו, לרבות אובדן רווחים, אובדן נתונים או פגיעה במוניטין.
            </p>
          </LegalSection>

          <LegalSection title="6. קישורים חיצוניים">
            <p>
              האתר עשוי להכיל קישורים לאתרים של צדדים שלישיים. קישורים אלה ניתנים לנוחות המשתמש בלבד, ואין בהם משום המלצה או אחריות לתוכן האתרים המקושרים.
            </p>
          </LegalSection>

          <LegalSection title="7. שינויים בתנאים">
            <p>
              בעל האתר שומר לעצמו את הזכות לשנות תנאים אלה בכל עת. תנאים מעודכנים יפורסמו באתר עם ציון תאריך העדכון. המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים.
            </p>
          </LegalSection>

          <LegalSection title="8. דין ושיפוט">
            <p>
              תנאים אלה כפופים לדין הישראלי. כל מחלוקת הנוגעת לאתר תהיה בסמכות בתי המשפט המוסמכים בישראל.
            </p>
          </LegalSection>

          <LegalSection title="9. יצירת קשר">
            <p>
              לכל שאלה או פנייה:<br />
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