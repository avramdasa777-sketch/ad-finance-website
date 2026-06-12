import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import PageLoader from '@/components/PageLoader';

export const metadata: Metadata = {
  title: 'A.D Finance | ייעוץ פיננסי אישי — אברהם דסה',
  description: 'א.ד פייננס — יועץ פיננסי מורשה אברהם דסה. ניהול פנסיה, ביטוח מנהלים, קרן השתלמות, תכנון פיננסי אישי. פגישת ייעוץ ראשונה ללא עלות.',
  keywords: 'יועץ פיננסי, פנסיה, ביטוח מנהלים, קרן השתלמות, קופת גמל, תכנון פיננסי, השקעות, ישראל, אברהם דסה',
  authors: [{ name: 'אברהם דסה' }],
  metadataBase: new URL('https://ad-finance.co.il'),
  alternates: { canonical: 'https://ad-finance.co.il' },
  openGraph: {
    title: 'A.D Finance | ייעוץ פיננסי אישי',
    description: 'יועץ פיננסי מורשה אברהם דסה — ניהול עתידך הפיננסי באמינות ומקצועיות',
    url: 'https://ad-finance.co.il',
    siteName: 'A.D Finance',
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A.D Finance | ייעוץ פיננסי אישי',
    description: 'יועץ פיננסי מורשה אברהם דסה — ניהול עתידך הפיננסי',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "A.D Finance",
              "url": "https://ad-finance.co.il",
              "description": "ייעוץ פיננסי אישי — פנסיה, ביטוח, השקעות",
              "telephone": "+972528796188",
              "email": "avramdasa777@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IL"
              },
              "founder": {
                "@type": "Person",
                "name": "אברהם דסה",
                "jobTitle": "יועץ פיננסי מורשה"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: 'var(--cream)' }}>
        <PageLoader />
        <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <AccessibilityWidget />
        <ScrollRevealInit />
      </body>
    </html>
  );
}