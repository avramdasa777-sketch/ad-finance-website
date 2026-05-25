import type { Metadata } from 'next';
import React from 'react';
import ContactForm from '@/components/ContactForm';
import PageHeader from '@/components/PageHeader';
import { PhoneIcon, MailIcon, MessageIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'יצירת קשר | A.D Finance',
  description: 'צרו קשר עם אברהם דסה לפגישת ייעוץ פיננסי ראשונה חינמית. נשמח לענות על כל שאלה.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        tag="יצירת קשר"
        title="נשמח לשמוע מכם"
        subtitle="מלאו את הטופס ונחזור אליכם תוך יום עסקים — הפגישה הראשונה חינמית וללא התחייבות"
        videoSrc="/videos/info-banner-3.mp4"
      />

      <section style={{ padding: 'clamp(48px, 6vw, 80px) 20px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* Contact Info */}
          <div className="reveal">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>פרטי יצירת קשר</h2>
            <div className="gold-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <ContactCard icon={<PhoneIcon size={22} color="#c8a035" strokeWidth={1.8} />} title="טלפון" value="052-879-6188" href="tel:0528796188" />
              <ContactCard icon={<MailIcon size={22} color="#c8a035" strokeWidth={1.8} />} title="מייל" value="avramdasa777@gmail.com" href="mailto:avramdasa777@gmail.com" />
              <ContactCard icon={<MessageIcon size={22} color="#c8a035" strokeWidth={1.8} />} title="וואטסאפ" value="שלח הודעה" href="https://wa.me/972528796188" />
            </div>

            <div style={{ background: 'var(--navy-deep)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>שעות פעילות</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { day: 'ראשון — חמישי', hours: '09:00 — 18:00' },
                  { day: 'שישי', hours: '09:00 — 13:00' },
                  { day: 'שבת', hours: 'סגור' },
                ].map(item => (
                  <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.75)', fontSize: '14px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span>{item.day}</span>
                    <span style={{ color: '#c8a035', fontWeight: 600 }}>{item.hours}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginTop: '14px' }}>
                * לפגישות דחופות — זמין גם מחוץ לשעות הפעילות
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal delay-200">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        textDecoration: 'none',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(200,160,53,0.15)',
        borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(13,31,60,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ width: '46px', height: '46px', flexShrink: 0, background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div>
        <div style={{ color: 'var(--text-light)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' as const, marginBottom: '3px' }}>{title}</div>
        <div style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '15px' }}>{value}</div>
      </div>
    </a>
  );
}