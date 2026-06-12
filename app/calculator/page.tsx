'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import type { Metadata } from 'next';

// ── Types ──────────────────────────────────────────────────────────
interface YearRow {
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  mgmtFee: number;
  treasuryFee: number;
  endBalance: number;
}

// ── Helpers ────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtShort(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toFixed(0);
}

function calcCompound(
  initial: number,
  monthly: number,
  annualRate: number,
  years: number,
  mgmtFeeRate: number,
  treasuryFeeRate: number,
): YearRow[] {
  const rows: YearRow[] = [];
  let balance = initial;
  const monthlyRate = annualRate / 100 / 12;
  const depositFeeRate = treasuryFeeRate / 100; // דמי ניהול מהפקדה — נגבים מכל הפקדה
  const accumFeeRate = mgmtFeeRate / 100;        // דמי ניהול מהצבירה — נגבים מהיתרה השנתית

  for (let y = 1; y <= years; y++) {
    const start = balance;
    let b = balance;
    const yearTreasuryFee = monthly * 12 * depositFeeRate; // % מסך ההפקדות השנתיות

    // הפקדה חודשית נטו (אחרי ניכוי דמי ניהול מהפקדה) + ריבית חודשית
    for (let m = 0; m < 12; m++) {
      b += monthly * (1 - depositFeeRate);
      b *= (1 + monthlyRate);
    }
    const grossEnd = b;
    const yearContrib = monthly * 12;
    const interest = grossEnd - start - yearContrib * (1 - depositFeeRate);
    const mgmtFee = grossEnd * accumFeeRate; // דמי ניהול מהצבירה — % מהיתרה בסוף השנה
    const endBalance = grossEnd - mgmtFee;

    rows.push({ year: y, startBalance: start, contribution: yearContrib, interest, mgmtFee, treasuryFee: yearTreasuryFee, endBalance });
    balance = endBalance;
  }
  return rows;
}

// ── Mini Chart ────────────────────────────────────────────────────
function AreaChart({ rows }: { rows: YearRow[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; row: YearRow } | null>(null);

  const W = 900, H = 320, PL = 70, PR = 24, PT = 24, PB = 48;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;

  const maxVal = Math.max(...rows.map(r => r.endBalance));
  const totalContrib = rows.map((r, i) => rows.slice(0, i + 1).reduce((s, x) => s + x.contribution, 0) + rows[0].startBalance);

  const toX = (i: number) => PL + (i / (rows.length - 1)) * innerW;
  const toY = (v: number) => PT + innerH - (v / maxVal) * innerH;

  const balancePath = rows.map((r, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(r.endBalance)}`).join(' ');
  const contribPath = rows.map((r, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(totalContrib[i])}`).join(' ');
  const balanceArea = `${balancePath} L${toX(rows.length - 1)},${PT + innerH} L${PL},${PT + innerH} Z`;
  const contribArea = `${contribPath} L${toX(rows.length - 1)},${PT + innerH} L${PL},${PT + innerH} Z`;

  const yTicks = 5;
  const tickVals = Array.from({ length: yTicks + 1 }, (_, i) => (maxVal / yTicks) * i);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
        onMouseMove={e => {
          const rect = svgRef.current!.getBoundingClientRect();
          const ratio = W / rect.width;
          const mx = (e.clientX - rect.left) * ratio;
          const idx = Math.round(((mx - PL) / innerW) * (rows.length - 1));
          if (idx >= 0 && idx < rows.length) {
            setTooltip({ x: toX(idx), y: toY(rows[idx].endBalance), row: rows[idx] });
          }
        }}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8a035" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c8a035" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="gradContrib" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1a3a5c" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {tickVals.map((v, i) => (
          <g key={i}>
            <line x1={PL} x2={W - PR} y1={toY(v)} y2={toY(v)}
              stroke="rgba(200,160,53,0.1)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={PL - 8} y={toY(v) + 4} textAnchor="end"
              fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Heebo">
              {fmtShort(v)}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {rows.filter((_, i) => i % Math.ceil(rows.length / 10) === 0 || i === rows.length - 1).map((r, _, arr) => (
          <text key={r.year} x={toX(r.year - 1)} y={PT + innerH + 20}
            textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="Heebo">
            שנה {r.year}
          </text>
        ))}

        {/* Contrib area */}
        <path d={contribArea} fill="url(#gradContrib)" />
        <path d={contribPath} fill="none" stroke="rgba(26,58,92,0.8)" strokeWidth="2" strokeDasharray="5 3" />

        {/* Balance area */}
        <path d={balanceArea} fill="url(#gradBalance)" />
        <path d={balancePath} fill="none" stroke="#c8a035" strokeWidth="2.5" filter="url(#glow)" />

        {/* Tooltip line + dot */}
        {tooltip && (
          <>
            <line x1={tooltip.x} x2={tooltip.x} y1={PT} y2={PT + innerH}
              stroke="rgba(200,160,53,0.4)" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#c8a035" stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '24px', height: '3px', background: '#c8a035', borderRadius: '2px' }} />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>יתרה כוללת</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '24px', height: '3px', background: 'rgba(26,58,92,0.8)', borderRadius: '2px', borderTop: '2px dashed rgba(26,58,92,0.8)' }} />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>הפקדות בלבד</span>
        </div>
      </div>

      {/* Tooltip box */}
      {tooltip && (
        <div style={{
          position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(7,15,30,0.95)', border: '1px solid rgba(200,160,53,0.35)',
          borderRadius: '12px', padding: '10px 18px', pointerEvents: 'none', whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>שנה {tooltip.row.year}</div>
          <div style={{ color: '#fff', fontSize: '13px' }}>יתרה: <b>₪{fmt(tooltip.row.endBalance)}</b></div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>ריבית: ₪{fmt(tooltip.row.interest)}</div>
        </div>
      )}
    </div>
  );
}

// ── Input Field ───────────────────────────────────────────────────
function CalcInput({
  label, sublabel, value, onChange, suffix = '', prefix = '',
}: {
  label: string; sublabel?: string; value: string;
  onChange: (v: string) => void; suffix?: string; prefix?: string;
}) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
        {label}
      </label>
      {sublabel && (
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '6px', lineHeight: 1.4 }}>{sublabel}</div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(200,160,53,0.25)',
        borderRadius: '10px', overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}>
        {prefix && (
          <span style={{ padding: '0 12px', color: '#c8a035', fontWeight: 700, fontSize: '15px', borderLeft: '1px solid rgba(200,160,53,0.2)' }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: '#ffffff', fontFamily: 'Heebo, sans-serif',
            fontSize: '16px', fontWeight: 500, padding: '12px 14px',
            textAlign: 'right', direction: 'ltr',
          }}
        />
        {suffix && (
          <span style={{ padding: '0 12px', color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

// ── Result Card ───────────────────────────────────────────────────
function ResultCard({ label, value, highlight, sublabel }: {
  label: string; value: string; highlight?: boolean; sublabel?: string;
}) {
  return (
    <div style={{
      padding: '16px 20px',
      background: highlight ? 'rgba(200,160,53,0.1)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${highlight ? 'rgba(200,160,53,0.4)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '12px',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginBottom: '4px' }}>{label}</div>
      {sublabel && <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', marginBottom: '6px', lineHeight: 1.4 }}>{sublabel}</div>}
      <div style={{ color: highlight ? '#c8a035' : '#ffffff', fontWeight: 700, fontSize: '18px', direction: 'ltr', textAlign: 'right' }}>
        ₪{value}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [initial, setInitial] = useState('1500');
  const [monthly, setMonthly] = useState('1500');
  const [rate, setRate] = useState('9');
  const [years, setYears] = useState('30');
  const [mgmtFee, setMgmtFee] = useState('0');
  const [treasuryFee, setTreasuryFee] = useState('0');
  const [showTable, setShowTable] = useState(false);

  const yearsNum = Math.min(Math.max(Number(years) || 1, 1), 50);

  const rows = useMemo(() =>
    calcCompound(
      Number(initial) || 0,
      Number(monthly) || 0,
      Number(rate) || 0,
      yearsNum,
      Number(mgmtFee) || 0,
      Number(treasuryFee) || 0,
    ),
    [initial, monthly, rate, yearsNum, mgmtFee, treasuryFee]
  );

  // חישוב ללא דמי ניהול בכלל — להשוואה
  const rowsNoFees = useMemo(() =>
    calcCompound(
      Number(initial) || 0,
      Number(monthly) || 0,
      Number(rate) || 0,
      yearsNum,
      0,
      0,
    ),
    [initial, monthly, rate, yearsNum]
  );

  const lastRow = rows[rows.length - 1];
  const lastRowNoFees = rowsNoFees[rowsNoFees.length - 1];
  const totalContrib = rows.reduce((s, r) => s + r.contribution, 0) + (Number(initial) || 0);
  const totalInterest = rows.reduce((s, r) => s + r.interest, 0);
  const totalMgmt = rows.reduce((s, r) => s + r.mgmtFee, 0);
  const totalTreasury = rows.reduce((s, r) => s + r.treasuryFee, 0);
  // אבדן רווח = ההפרש האמיתי בין חיסכון ללא דמי ניהול לבין עם, פחות הדמי ניהול ששולמו
  const lostProfit = (lastRowNoFees.endBalance - lastRow.endBalance) - (totalMgmt + totalTreasury);

  const handleReset = () => {
    setInitial('1500'); setMonthly('1500'); setRate('9');
    setYears('30'); setMgmtFee('0'); setTreasuryFee('0');
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy-deep)', paddingTop: '108px', direction: 'rtl' }}>
      {/* Header */}
      <section style={{ padding: '48px 20px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <img
            src="/images/logo.png"
            alt="A.D Finance"
            style={{ width: '72px', height: '72px', objectFit: 'contain', margin: '0 auto 12px', display: 'block' }}
          />
          <div className="section-tag">כלים פיננסיים</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff',
            marginBottom: '16px', lineHeight: 1.2,
          }}>
            מחשבון <span className="text-gradient-gold">רווחים</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
            חשבו כמה יצמח ההון שלכם לאורך הזמן עם כוח הריבית דריבית
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '28px',
            alignItems: 'start',
          }}
          className="calc-grid"
          >
            {/* Inputs */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(200,160,53,0.2)',
              borderRadius: '20px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}>
              <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px' }}>
                נתוני החישוב
              </div>

              <CalcInput
                label="סכום הפקדה ראשוני"
                sublabel="סכום ההתחלתי שאנו שמים בהפקדה"
                value={initial} onChange={setInitial} prefix="₪"
              />
              <CalcInput
                label="סכום הפקדה חודשי"
                sublabel="הסכום שיופקד בכל חודש"
                value={monthly} onChange={setMonthly} prefix="₪"
              />
              <CalcInput
                label="ריבית שנתית"
                sublabel="הריבית שאנו מקבלים בממוצע לשנה (באחוזים)"
                value={rate} onChange={setRate} suffix="%"
              />
              <CalcInput
                label="מספר שנות ההפקדה"
                sublabel="מספר השנים שנפקיד בתדירות החודשית"
                value={years} onChange={setYears} suffix="שנים"
              />

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '14px', letterSpacing: '0.5px' }}>
                  דמי ניהול (אופציונלי)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <CalcInput
                    label="דמי ניהול מהצבירה"
                    sublabel="אחוז דמי ניהול שנלקח מהצבירה שנגבים"
                    value={mgmtFee} onChange={setMgmtFee} suffix="%"
                  />
                  <CalcInput
                    label="דמי ניהול מהפקדה"
                    sublabel="אחוז דמי ניהול שנלקח מהפקדה שנגבים"
                    value={treasuryFee} onChange={setTreasuryFee} suffix="%"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  onClick={handleReset}
                  style={{
                    flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)',
                    background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'Heebo, sans-serif',
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  איפוס
                </button>
                <button
                  onClick={() => setShowTable(!showTable)}
                  style={{
                    flex: 2, padding: '11px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #c8a035, #e8c84a)',
                    color: '#070f1e', fontFamily: 'Heebo, sans-serif',
                    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  }}
                >
                  {showTable ? 'הסתר טבלה' : 'טבלת חישוב שנתית'}
                </button>
              </div>
            </div>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Summary cards */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,160,53,0.2)',
                borderRadius: '20px',
                padding: '28px 24px',
              }}>
                <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
                  תוצאות החישוב
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <ResultCard label="סכום ההשקעה הכולל" sublabel="סך הסכום שהוזרם לתוך ההפקדה" value={fmt(totalContrib)} />
                  <ResultCard label="רווח" sublabel="הרווח שהרווחנו בזכות הריבית דריבית" value={fmt(totalInterest)} />
                  <ResultCard label="דמי ניהול מהצבירה" sublabel="סך כל דמי ניהול מהצבירה שנגבו" value={fmt(totalMgmt)} />
                  <ResultCard label="דמי ניהול מהפקדה" sublabel="סך כל דמי ניהול מהפקדה שנגבו" value={fmt(totalTreasury)} />
                  <ResultCard label="אבדן רווח עקב דמי ניהול" sublabel="הרווח שהלך לאיבוד בגלל אפקט הריבית דריבית על הדמי ניהול" value={fmt(lostProfit)} />
                  <ResultCard
                    label="סכום חיסכון עתידי ללא דמי ניהול"
                    sublabel="סכום החיסכון בסוף ההפקדה אילו לא היו דמי ניהול"
                    value={fmt(lastRowNoFees.endBalance)}
                  />
                  <ResultCard
                    label="סכום חיסכון עתידי בניכוי הוצאות"
                    sublabel="סכום החיסכון בסוף ההפקדה בניכוי הוצאות"
                    value={fmt(lastRow.endBalance)}
                    highlight
                  />
                </div>
              </div>

              {/* Chart */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,160,53,0.2)',
                borderRadius: '20px',
                padding: '28px 24px',
              }}>
                <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
                  ריבית דריבית לאורך השנים
                </div>
                <AreaChart rows={rows} />
              </div>
            </div>
          </div>

          {/* Annual Table */}
          {showTable && (
            <div style={{
              marginTop: '24px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(200,160,53,0.2)',
              borderRadius: '20px',
              padding: '28px 24px',
              overflowX: 'auto',
            }}>
              <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
                טבלת חישוב שנתית
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', direction: 'rtl' }}>
                <thead>
                  <tr>
                    {['שנה', 'יתרת פתיחה', 'הפקדות', 'ריבית', 'דמי ניהול צבירה', 'דמי ניהול הפקדה', 'יתרת סגירה'].map(h => (
                      <th key={h} style={{
                        padding: '10px 14px', textAlign: 'right',
                        color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '12px',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.year}
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,160,53,0.06)')}
                      onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)')}
                    >
                      <td style={{ padding: '9px 14px', color: '#c8a035', fontWeight: 700 }}>{r.year}</td>
                      <td style={{ padding: '9px 14px', color: 'rgba(255,255,255,0.7)', direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.startBalance)}</td>
                      <td style={{ padding: '9px 14px', color: 'rgba(255,255,255,0.7)', direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.contribution)}</td>
                      <td style={{ padding: '9px 14px', color: '#4ade80', direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.interest)}</td>
                      <td style={{ padding: '9px 14px', color: 'rgba(255,100,100,0.8)', direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.mgmtFee)}</td>
                      <td style={{ padding: '9px 14px', color: 'rgba(255,100,100,0.8)', direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.treasuryFee)}</td>
                      <td style={{ padding: '9px 14px', color: '#ffffff', fontWeight: 700, direction: 'ltr', textAlign: 'right' }}>₪{fmt(r.endBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
