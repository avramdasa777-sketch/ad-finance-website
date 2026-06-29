'use client';

import { useState, useMemo, useRef, useEffect } from 'react';

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
function fmt0(n: number) {
  return Math.round(n).toLocaleString('he-IL');
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

// ── Goal-seek engine (מנוע "משחק הנעלם") ──────────────────────────
// חישוב צבירה עתידית חודש-אחר-חודש (תומך בשנים לא-שלמות עבור הפותר)
function futureValue(
  initial: number, monthly: number, annualRate: number, years: number,
  mgmtFeeRate: number, treasuryFeeRate: number,
): number {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 100 / 12;
  const depositFeeRate = treasuryFeeRate / 100;
  const accumFeeRate = mgmtFeeRate / 100;
  let b = initial;
  for (let m = 1; m <= months; m++) {
    b += monthly * (1 - depositFeeRate);
    b *= (1 + monthlyRate);
    if (m % 12 === 0) b *= (1 - accumFeeRate); // דמי ניהול מהצבירה בסוף כל שנה
  }
  return b;
}

// פתרון: כמה להפקיד כל חודש כדי להגיע ליעד (חיפוש בינארי — מונוטוני בהפקדה)
function solveMonthly(target: number, initial: number, rate: number, years: number, mgmt: number, treas: number): number {
  if (years <= 0 || target <= 0) return 0;
  if (futureValue(initial, 0, rate, years, mgmt, treas) >= target) return 0; // ההפקדה ההתחלתית כבר מספיקה
  let lo = 0, hi = 1000, guard = 0;
  while (futureValue(initial, hi, rate, years, mgmt, treas) < target && guard < 60) { hi *= 2; guard++; }
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (futureValue(initial, mid, rate, years, mgmt, treas) < target) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// פתרון: כמה הפקדה חד-פעמית היום כדי להגיע ליעד
function solveInitial(target: number, monthly: number, rate: number, years: number, mgmt: number, treas: number): number {
  if (years <= 0 || target <= 0) return Math.max(0, target);
  if (futureValue(0, monthly, rate, years, mgmt, treas) >= target) return 0; // ההפקדה החודשית כבר מספיקה
  let lo = 0, hi = target, guard = 0;
  while (futureValue(hi, monthly, rate, years, mgmt, treas) < target && guard < 60) { hi *= 2; guard++; }
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (futureValue(mid, monthly, rate, years, mgmt, treas) < target) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// פתרון: כמה שנים צריך (כדי לגזור "באיזה גיל להתחיל") — null אם בלתי-אפשרי בטווח
function solveYears(target: number, initial: number, monthly: number, rate: number, maxYears: number, mgmt: number, treas: number): number | null {
  if (target <= 0) return 0;
  if (maxYears <= 0) return null;
  if (futureValue(initial, monthly, rate, maxYears, mgmt, treas) < target) return null; // לא ניתן להגיע גם אם מתחילים היום
  let lo = 0, hi = maxYears;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (futureValue(initial, monthly, rate, mid, mgmt, treas) < target) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
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
        {rows.filter((_, i) => i % Math.ceil(rows.length / 10) === 0 || i === rows.length - 1).map((r) => (
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
            flex: 1, minWidth: 0, background: 'none', border: 'none', outline: 'none',
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

// Card panel wrapper (כותרת + מסגרת זהובה)
function Panel({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(200,160,53,0.2)',
      borderRadius: '20px',
      padding: '28px 24px',
      ...style,
    }}>
      <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ── FORWARD MODE — "כמה אצבור?" (המחשבון המקורי) ─────────────────
function ForwardCalc() {
  const [initial, setInitial] = useState('1500');
  const [monthly, setMonthly] = useState('1500');
  const [rate, setRate] = useState('9');
  const [years, setYears] = useState('30');
  const [mgmtFee, setMgmtFee] = useState('0');
  const [treasuryFee, setTreasuryFee] = useState('0');
  const [showTable, setShowTable] = useState(false);

  const yearsNum = Math.min(Math.max(Number(years) || 1, 1), 50);

  const rows = useMemo(() =>
    calcCompound(Number(initial) || 0, Number(monthly) || 0, Number(rate) || 0, yearsNum, Number(mgmtFee) || 0, Number(treasuryFee) || 0),
    [initial, monthly, rate, yearsNum, mgmtFee, treasuryFee]
  );

  const rowsNoFees = useMemo(() =>
    calcCompound(Number(initial) || 0, Number(monthly) || 0, Number(rate) || 0, yearsNum, 0, 0),
    [initial, monthly, rate, yearsNum]
  );

  const lastRow = rows[rows.length - 1];
  const lastRowNoFees = rowsNoFees[rowsNoFees.length - 1];
  const totalContrib = rows.reduce((s, r) => s + r.contribution, 0) + (Number(initial) || 0);
  const totalInterest = rows.reduce((s, r) => s + r.interest, 0);
  const totalMgmt = rows.reduce((s, r) => s + r.mgmtFee, 0);
  const totalTreasury = rows.reduce((s, r) => s + r.treasuryFee, 0);
  const lostProfit = (lastRowNoFees.endBalance - lastRow.endBalance) - (totalMgmt + totalTreasury);

  const handleReset = () => {
    setInitial('1500'); setMonthly('1500'); setRate('9');
    setYears('30'); setMgmtFee('0'); setTreasuryFee('0');
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '28px', alignItems: 'start' }} className="calc-grid">
        {/* Inputs */}
        <Panel title="נתוני החישוב" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <CalcInput label="סכום הפקדה ראשוני" sublabel="סכום ההתחלתי שאנו שמים בהפקדה" value={initial} onChange={setInitial} prefix="₪" />
          <CalcInput label="סכום הפקדה חודשי" sublabel="הסכום שיופקד בכל חודש" value={monthly} onChange={setMonthly} prefix="₪" />
          <CalcInput label="ריבית שנתית" sublabel="הריבית שאנו מקבלים בממוצע לשנה (באחוזים)" value={rate} onChange={setRate} suffix="%" />
          <CalcInput label="מספר שנות ההפקדה" sublabel="מספר השנים שנפקיד בתדירות החודשית" value={years} onChange={setYears} suffix="שנים" />

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '14px', letterSpacing: '0.5px' }}>
              דמי ניהול (אופציונלי)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <CalcInput label="דמי ניהול מהצבירה" sublabel="אחוז דמי ניהול שנלקח מהצבירה שנגבים" value={mgmtFee} onChange={setMgmtFee} suffix="%" />
              <CalcInput label="דמי ניהול מהפקדה" sublabel="אחוז דמי ניהול שנלקח מהפקדה שנגבים" value={treasuryFee} onChange={setTreasuryFee} suffix="%" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              onClick={handleReset}
              style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              איפוס
            </button>
            <button
              onClick={() => setShowTable(!showTable)}
              style={{ flex: 2, padding: '11px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #c8a035, #e8c84a)', color: '#070f1e', fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              {showTable ? 'הסתר טבלה' : 'טבלת חישוב שנתית'}
            </button>
          </div>
        </Panel>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Panel title="תוצאות החישוב">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <ResultCard label="סכום ההשקעה הכולל" sublabel="סך הסכום שהוזרם לתוך ההפקדה" value={fmt(totalContrib)} />
              <ResultCard label="רווח" sublabel="הרווח שהרווחנו בזכות הריבית דריבית" value={fmt(totalInterest)} />
              <ResultCard label="דמי ניהול מהצבירה" sublabel="סך כל דמי ניהול מהצבירה שנגבו" value={fmt(totalMgmt)} />
              <ResultCard label="דמי ניהול מהפקדה" sublabel="סך כל דמי ניהול מהפקדה שנגבו" value={fmt(totalTreasury)} />
              <ResultCard label="אבדן רווח עקב דמי ניהול" sublabel="הרווח שהלך לאיבוד בגלל אפקט הריבית דריבית על הדמי ניהול" value={fmt(lostProfit)} />
              <ResultCard label="סכום חיסכון עתידי ללא דמי ניהול" sublabel="סכום החיסכון בסוף ההפקדה אילו לא היו דמי ניהול" value={fmt(lastRowNoFees.endBalance)} />
              <ResultCard label="סכום חיסכון עתידי בניכוי הוצאות" sublabel="סכום החיסכון בסוף ההפקדה בניכוי הוצאות" value={fmt(lastRow.endBalance)} highlight />
            </div>
          </Panel>

          <Panel title="ריבית דריבית לאורך השנים">
            <AreaChart rows={rows} />
          </Panel>
        </div>
      </div>

      {showTable && (
        <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,160,53,0.2)', borderRadius: '20px', padding: '28px 24px', overflowX: 'auto' }}>
          <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
            טבלת חישוב שנתית
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', direction: 'rtl' }}>
            <thead>
              <tr>
                {['שנה', 'יתרת פתיחה', 'הפקדות', 'ריבית', 'דמי ניהול צבירה', 'דמי ניהול הפקדה', 'יתרת סגירה'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'right', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{h}</th>
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
    </>
  );
}

// ── GOAL MODE — "כמה להפקיד?" (משחק הנעלם) ───────────────────────
type Unknown = 'monthly' | 'lump' | 'startAge';

function GoalCalc() {
  const [target, setTarget] = useState('1000000');
  const [currentAge, setCurrentAge] = useState('30');
  const [retireAge, setRetireAge] = useState('67');
  const [rate, setRate] = useState('9');
  const [monthly, setMonthly] = useState('1500');
  const [initial, setInitial] = useState('0');
  const [mgmtFee, setMgmtFee] = useState('0');
  const [treasuryFee, setTreasuryFee] = useState('0');
  const [unknown, setUnknown] = useState<Unknown>('monthly');

  const targetN = Math.max(0, Number(target) || 0);
  const cAge = Math.min(Math.max(Number(currentAge) || 0, 0), 99);
  const rAge = Math.min(Math.max(Number(retireAge) || 0, 0), 100);
  const years = rAge - cAge;
  const rateN = Number(rate) || 0;
  const mgmt = Number(mgmtFee) || 0;
  const treas = Number(treasuryFee) || 0;
  const monthlyN = Math.max(0, Number(monthly) || 0);
  const initialN = Math.max(0, Number(initial) || 0);

  const result = useMemo(() => {
    if (targetN <= 0) return { error: 'הזינו סכום יעד כדי שנחשב.' };
    if (years <= 0) return { error: 'גיל הפרישה צריך להיות גדול מהגיל הנוכחי.' };

    if (unknown === 'monthly') {
      const solved = solveMonthly(targetN, initialN, rateN, years, mgmt, treas);
      const rows = calcCompound(initialN, solved, rateN, years, mgmt, treas);
      const totalDeposited = initialN + solved * 12 * years;
      return {
        headline: 'כדי להגיע ליעד צריך להפקיד',
        big: `₪${fmt0(solved)}`, bigUnit: 'בחודש',
        sentence: `כדי לצבור ₪${fmt0(targetN)} בגיל ${rAge} — בהפקדה חודשית קבועה לאורך ${years} שנים${initialN > 0 ? ` (לצד הפקדה ראשונית של ₪${fmt0(initialN)})` : ''}.`,
        rows, years, totalDeposited, projected: rows.length ? rows[rows.length - 1].endBalance : initialN,
      };
    }
    if (unknown === 'lump') {
      const solved = solveInitial(targetN, monthlyN, rateN, years, mgmt, treas);
      const rows = calcCompound(solved, monthlyN, rateN, years, mgmt, treas);
      const totalDeposited = solved + monthlyN * 12 * years;
      return {
        headline: 'מספיק להפקיד היום סכום חד-פעמי של',
        big: `₪${fmt0(solved)}`, bigUnit: 'חד-פעמי',
        sentence: `כדי לצבור ₪${fmt0(targetN)} בגיל ${rAge} — בהפקדה חד-פעמית היום${monthlyN > 0 ? ` (לצד הפקדה חודשית של ₪${fmt0(monthlyN)})` : ', ללא הפקדה חודשית'}.`,
        rows, years, totalDeposited, projected: rows.length ? rows[rows.length - 1].endBalance : solved,
      };
    }
    // startAge
    if (monthlyN <= 0) return { error: 'הזינו הפקדה חודשית כדי לחשב באיזה גיל להתחיל.' };
    const yearsNeeded = solveYears(targetN, initialN, monthlyN, rateN, years, mgmt, treas);
    if (yearsNeeded === null) {
      return { error: `עם ₪${fmt0(monthlyN)} בחודש לא ניתן להגיע ל-₪${fmt0(targetN)} עד גיל ${rAge} — גם אם מתחילים היום. נסו להגדיל את ההפקדה החודשית או את היעד.` };
    }
    const yearsR = Math.max(1, Math.ceil(yearsNeeded));
    const startAge = Math.max(cAge, rAge - yearsR);
    const rows = calcCompound(initialN, monthlyN, rateN, yearsR, mgmt, treas);
    const totalDeposited = initialN + monthlyN * 12 * yearsR;
    return {
      headline: 'עליכם להתחיל לא יאוחר מ',
      big: `גיל ${startAge}`, bigUnit: '',
      sentence: `עם הפקדה של ₪${fmt0(monthlyN)} בחודש — צריך כ-${yearsR} שנות חיסכון כדי להגיע ל-₪${fmt0(targetN)} בגיל ${rAge}.`,
      rows, years: yearsR, totalDeposited, projected: rows.length ? rows[rows.length - 1].endBalance : initialN,
    };
  }, [targetN, cAge, rAge, years, rateN, mgmt, treas, monthlyN, initialN, unknown]);

  const handleReset = () => {
    setTarget('1000000'); setCurrentAge('30'); setRetireAge('67'); setRate('9');
    setMonthly('1500'); setInitial('0'); setMgmtFee('0'); setTreasuryFee('0'); setUnknown('monthly');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '28px', alignItems: 'start' }} className="calc-grid">
      {/* Inputs */}
      <Panel title="נתוני היעד" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <CalcInput label="🎯 סכום היעד" sublabel="כמה אתם רוצים לצבור בסך הכל" value={target} onChange={setTarget} prefix="₪" />

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px' }}>
          <CalcInput label="גיל נוכחי" value={currentAge} onChange={setCurrentAge} suffix="שנים" />
          <CalcInput label="גיל פרישה / יעד" value={retireAge} onChange={setRetireAge} suffix="שנים" />
        </div>

        <CalcInput label="ריבית שנתית משוערת" sublabel="תשואה ממוצעת לשנה (באחוזים)" value={rate} onChange={setRate} suffix="%" />

        {/* בורר הנעלם */}
        <div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '14px', marginBottom: '10px' }}>מה לחשב לי?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {([
              { k: 'monthly', label: 'כמה להפקיד בחודש' },
              { k: 'lump', label: 'כמה הפקדה חד-פעמית היום' },
              { k: 'startAge', label: 'באיזה גיל להתחיל' },
            ] as { k: Unknown; label: string }[]).map(opt => {
              const on = unknown === opt.k;
              return (
                <button
                  key={opt.k}
                  onClick={() => setUnknown(opt.k)}
                  aria-pressed={on}
                  style={{
                    padding: '11px 14px', borderRadius: '10px', cursor: 'pointer', textAlign: 'right',
                    fontFamily: 'Heebo, sans-serif', fontSize: '14px', fontWeight: on ? 700 : 500,
                    border: `1.5px solid ${on ? '#c8a035' : 'rgba(255,255,255,0.12)'}`,
                    background: on ? 'rgba(200,160,53,0.14)' : 'rgba(255,255,255,0.03)',
                    color: on ? '#e8c84a' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s',
                  }}
                >
                  {on ? '◉ ' : '○ '}{opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* שדה תומך לפי הנעלם הנבחר */}
        {unknown === 'monthly' && (
          <CalcInput label="הפקדה ראשונית (אופציונלי)" sublabel="סכום חד-פעמי שכבר יש בהתחלה" value={initial} onChange={setInitial} prefix="₪" />
        )}
        {unknown === 'lump' && (
          <CalcInput label="הפקדה חודשית (אופציונלי)" sublabel="אם מתכננים גם להפקיד כל חודש" value={monthly} onChange={setMonthly} prefix="₪" />
        )}
        {unknown === 'startAge' && (
          <CalcInput label="הפקדה חודשית" sublabel="הסכום שתפקידו כל חודש" value={monthly} onChange={setMonthly} prefix="₪" />
        )}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '14px', letterSpacing: '0.5px' }}>
            דמי ניהול (אופציונלי)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <CalcInput label="דמי ניהול מהצבירה" value={mgmtFee} onChange={setMgmtFee} suffix="%" />
            <CalcInput label="דמי ניהול מהפקדה" value={treasuryFee} onChange={setTreasuryFee} suffix="%" />
          </div>
        </div>

        <button
          onClick={handleReset}
          style={{ padding: '11px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          איפוס
        </button>
      </Panel>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {'error' in result ? (
          <Panel title="התוצאה">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: 'rgba(200,160,53,0.06)', border: '1px solid rgba(200,160,53,0.25)', borderRadius: '14px', color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7 }}>
              <span style={{ fontSize: '22px' }}>💡</span>
              <span>{result.error}</span>
            </div>
          </Panel>
        ) : (
          <>
            {/* כרטיסיית התשובה הגדולה */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(200,160,53,0.16), rgba(200,160,53,0.05))',
              border: '1px solid rgba(200,160,53,0.4)', borderRadius: '20px', padding: '32px 28px', textAlign: 'center',
            }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>{result.headline}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ color: '#e8c84a', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', direction: 'ltr' }}>{result.big}</span>
                {result.bigUnit && <span style={{ color: '#c8a035', fontWeight: 700, fontSize: '1.1rem' }}>{result.bigUnit}</span>}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7, maxWidth: '520px', margin: '14px auto 0' }}>
                {result.sentence}
              </p>
            </div>

            {/* פירוט */}
            <Panel title="פירוט התכנית">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                <ResultCard label="סכום היעד" value={fmt0(targetN)} highlight />
                <ResultCard label="מספר שנות חיסכון" sublabel="עד גיל הפרישה/היעד" value={String(result.years)} />
                <ResultCard label="סך ההפקדות הכולל" sublabel="כמה כסף תפקידו בפועל לאורך הדרך" value={fmt0(result.totalDeposited)} />
                <ResultCard label="צבירה צפויה בסוף" sublabel="כולל אפקט הריבית דריבית" value={fmt0(result.projected)} />
              </div>
            </Panel>

            {/* גרף */}
            {result.rows.length >= 2 && (
              <Panel title="מסלול הצמיחה ליעד">
                <AreaChart rows={result.rows} />
              </Panel>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [mode, setMode] = useState<'forward' | 'goal'>('forward');

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
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
            מחשבון <span className="text-gradient-gold">רווחים</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto' }}>
            {mode === 'forward'
              ? 'חשבו כמה יצמח ההון שלכם לאורך הזמן עם כוח הריבית דריבית'
              : 'קבעו יעד — והמחשבון ימצא עבורכם את הדרך להגיע אליו'}
          </p>

          {/* מתג מצב */}
          <div style={{ display: 'inline-flex', gap: '4px', marginTop: '26px', padding: '5px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,160,53,0.22)', borderRadius: '50px' }}>
            {([
              { k: 'forward', label: 'כמה אצבור?' },
              { k: 'goal', label: 'כמה להפקיד?' },
            ] as { k: 'forward' | 'goal'; label: string }[]).map(opt => {
              const on = mode === opt.k;
              return (
                <button
                  key={opt.k}
                  onClick={() => setMode(opt.k)}
                  style={{
                    padding: '10px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                    fontFamily: 'Heebo, sans-serif', fontSize: '14px', fontWeight: 700, transition: 'all 0.25s',
                    background: on ? 'linear-gradient(135deg, #c8a035, #e8c84a)' : 'transparent',
                    color: on ? '#070f1e' : 'rgba(255,255,255,0.65)',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {mode === 'forward' ? <ForwardCalc /> : <GoalCalc />}
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
