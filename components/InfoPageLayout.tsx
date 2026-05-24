import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';

interface Section {
  title: string;
  content: string;
}

interface InfoPageLayoutProps {
  title: string;
  subtitle: string;
  intro: string;
  sections: Section[];
  suits: string[];
  howHelp: string[];
  disclaimer?: string;
  videoSrc?: string;
}

export default function InfoPageLayout({
  title, subtitle, intro, sections, suits, howHelp, disclaimer,
  videoSrc = '/videos/info-banner.mp4',
}: InfoPageLayoutProps) {
  return (
    <>
      <PageHeader
        tag="מידע מקצועי"
        title={title}
        subtitle={subtitle}
        breadcrumb={{ href: '/info', label: 'מידע מקצועי' }}
        videoSrc={videoSrc}
      />

      <section style={{ padding: 'clamp(48px, 6vw, 80px) 20px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Intro */}
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <div className="gold-line" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '14px' }}>מה זה {title}?</h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>{intro}</p>
          </div>

          {/* Key Sections */}
          <div className="reveal delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {sections.map((s, i) => (
              <div key={i} className="card-glass" style={{ padding: '24px 22px' }}>
                <div style={{ width: '32px', height: '32px', background: 'rgba(200,160,53,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '14px' }}>{i + 1}</span>
                </div>
                <h3 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.7 }}>{s.content}</p>
              </div>
            ))}
          </div>

          {/* Who is it for */}
          <div className="reveal delay-200" style={{ background: 'var(--navy-deep)', borderRadius: '20px', padding: '32px', marginBottom: '28px' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.3rem', marginBottom: '18px' }}>למי זה מתאים?</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {suits.map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                  <span style={{ color: '#c8a035', flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* How we help */}
          <div className="reveal delay-300" style={{ background: 'rgba(200,160,53,0.07)', border: '1px solid rgba(200,160,53,0.22)', borderRadius: '16px', padding: '28px', marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '18px' }}>
              <span style={{ color: 'var(--gold)' }}>איך אברהם דסה עוזר לכם?</span>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {howHelp.map(item => (
                <li key={item} style={{ display: 'flex', gap: '12px', color: 'var(--text-mid)', fontSize: '15px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a035" strokeWidth="3" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {disclaimer && (
            <div style={{ background: 'rgba(13,31,60,0.05)', border: '1px solid rgba(13,31,60,0.1)', borderRadius: '10px', padding: '14px 18px' }}>
              <p style={{ color: 'var(--text-light)', fontSize: '12.5px', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text-mid)' }}>* הערה: </strong>{disclaimer}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}