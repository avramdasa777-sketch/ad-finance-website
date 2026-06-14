'use client';

import { useState, useMemo, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────
interface YearRow {
  year: number;
  age: number;
  startBalance: number;
  contribution: number;
  interest: number;
  mgmtFee: number;
  treasuryFee: number;
  endBalance: number;
}

type Gender = 'male' | 'female';

// ── Option lists (matching the pension questionnaire) ──────────────
const MARITAL = [
  { id: 'single', label: 'רווק/ה' },
  { id: 'married', label: 'יש בן/בת זוג' },
  { id: 'married_kids', label: 'יש בן/בת זוג וילדים' },
];

const MEMBER_TYPES = [
  { id: 'employee', label: 'שכיר' },
  { id: 'self', label: 'עצמאי' },
];

const PLAN_TYPES = [
  { id: 'comprehensive', label: 'קרן פנסיה מקיפה' },
  { id: 'general', label: 'קרן פנסיה כללית' },
];

// מסלולים ביטוחיים — disability = שיעור קצבת נכות, survivors = שיעור שאירים מרבי (מהשכר הקובע)
const TRACKS = [
  { id: 't1', label: 'נכות 75% שאירים 100% (למעט גברים המצטרפים מגיל 41 ומעלה)', disability: 0.75, survivors: 1.00 },
  { id: 't2', label: 'נכות 75% (למעט גברים מגיל 41 ומעלה) שאירים 100% (למעט גברים מגיל 47 ומעלה)', disability: 0.75, survivors: 1.00 },
  { id: 't3', label: 'נכות 75% (למעט גברים מגיל 41) שאירים 100% (למעט גברים מגיל 41)', disability: 0.75, survivors: 1.00 },
  { id: 't4', label: 'נכות 75% (למעט גברים מגיל 41) שאירים 100% (למעט גברים מגיל 49) לגיל 60', disability: 0.75, survivors: 1.00 },
  { id: 't5', label: 'נכות 75% שאירים 40%', disability: 0.75, survivors: 0.40 },
  { id: 't6', label: 'נכות 37.5% שאירים 40%', disability: 0.375, survivors: 0.40 },
  { id: 't7', label: 'נכות 37.5% שאירים 100% (למעט גברים מגיל 45)', disability: 0.375, survivors: 1.00 },
  { id: 't8', label: 'משווה', disability: 0.75, survivors: 1.00 },
  { id: 't9', label: 'עתיר חיסכון', disability: 0.375, survivors: 0.40 },
  { id: 't10', label: 'ביטוח שאירים מוגבר', disability: 0.75, survivors: 1.00 },
  { id: 't11', label: 'כללי 67', disability: 0.75, survivors: 1.00 },
  { id: 't12', label: 'משולב מוטה ביטוח', disability: 0.75, survivors: 1.00 },
  { id: 't13', label: 'משולב מוטה חסכון', disability: 0.375, survivors: 0.60 },
  { id: 't14', label: 'ביטוח שאירים מופחת', disability: 0.75, survivors: 0.40 },
  { id: 't15', label: 'ביטוח נכות מופחת', disability: 0.375, survivors: 1.00 },
  { id: 't16', label: 'כללי 64 (לנשים)', disability: 0.75, survivors: 1.00 },
  { id: 't17', label: 'ביטוח מרבי 60', disability: 0.75, survivors: 1.00 },
  { id: 't18', label: 'חסכון מרבי לפרישה מוקדמת 60', disability: 0.375, survivors: 0.40 },
];

// משך הבטחת קצבה — ככל שההבטחה ארוכה יותר, המקדם גבוה יותר (קצבה חודשית נמוכה יותר)
const GUARANTEES = [
  { id: 'none', label: 'ללא הבטחה', coefAdd: 0 },
  { id: 'g60', label: 'עד 60 חודשים או עד גיל 87', coefAdd: 3 },
  { id: 'g120', label: 'עד 120 חודשים או עד גיל 87', coefAdd: 7 },
  { id: 'g180', label: 'עד 180 חודשים או עד גיל 87', coefAdd: 11 },
  { id: 'g240', label: 'עד 240 חודשים או עד גיל 87', coefAdd: 15 },
];

const CALC_MODES = [
  { id: 'salary', label: 'שכר לתגמולים' },
  { id: 'deposit', label: 'הפקדה חודשית' },
  { id: 'target', label: 'יעד פנסיוני' },
];

// ── Help texts ─────────────────────────────────────────────────────
const HELP = {
  currentAge: 'הגיל שלך כיום. משמש לחישוב מספר שנות החיסכון שנותרו עד הפרישה.',
  retireAge: 'הגיל שבו תתחיל לקבל את קצבת הפנסיה. גיל הפרישה הרשמי הוא 67 לגברים ו-65 לנשים.',
  gender: 'משפיע על מקדם הקצבה. נשים חיות בממוצע שנים רבות יותר, ולכן הקצבה החודשית על אותה צבירה נמוכה מעט יותר.',
  marital: 'קובע אם קיימות קצבאות שאירים (לבן/בת זוג וילדים) במקרה פטירה, ומשפיע על מקדם הקצבה.',
  memberType: 'שכיר — מפריש יחד עם המעסיק. עצמאי — מפריש באופן עצמאי ונהנה מהטבות מס על ההפקדה.',
  planType: 'קרן פנסיה מקיפה כוללת כיסויי נכות ושאירים. קרן פנסיה כללית היא חיסכון בלבד ללא כיסויים ביטוחיים.',
  balance: 'הסכום שכבר נצבר בקרן עד היום. אם זו קרן חדשה לגמרי — השאר 0.',
  track: 'קובע את היקף כיסויי הנכות והשאירים. ככל שהכיסוי הביטוחי גבוה יותר, נשאר פחות כסף לחיסכון לפנסיה.',
  joinDate: 'המועד שבו הצטרפת לקרן הפנסיה. רלוונטי לחישוב הוותק והזכויות בקרן.',
  guarantee: 'תקופה שבה הקרן ממשיכה לשלם את הקצבה ליורשים גם אם נפטרת זמן קצר לאחר הפרישה. הבטחה ארוכה יותר מקטינה מעט את הקצבה.',
  developing: 'כיסוי נכות שגדל אוטומטית עם עליית השכר לאורך השנים, כך שההגנה נשארת מעודכנת.',
  franchise: 'הוזלת עלות הכיסוי בתמורה לתקופת המתנה קצרה לפני שמתחילים לקבל את קצבת הנכות.',
  calcMode: 'בחר כיצד להזין את הנתונים: לפי השכר, לפי סכום ההפקדה החודשית, או לפי קצבת היעד הרצויה.',
  salary: 'השכר החודשי ברוטו שממנו מפרישים לפנסיה.',
  deposit: 'סכום ההפקדה הכולל לחודש — עובד + מעסיק + רכיב פיצויים.',
  target: 'הקצבה החודשית שתרצה לקבל בפרישה. המחשבון יחשב כמה צריך להפקיד כדי להגיע אליה.',
  contrib: 'החלוקה בין הפקדת העובד, המעסיק ורכיב הפיצויים. סך ההפקדה הסטנדרטי בקרן מקיפה הוא 18.5%.',
  rate: 'הרווח השנתי הממוצע הצפוי על החיסכון. ממוצע היסטורי נע בין 4% ל-6%.',
  mgmtFee: 'אחוז שנתי שנגבה מסך הצבירה. ממוצע בשוק כ-0.5%.',
  treasuryFee: 'אחוז שנגבה מכל הפקדה שוטפת. המקסימום בחוק הוא 6%.',
  coefficient: 'המספר שמחלקים בו את הצבירה כדי לקבל קצבה חודשית. מתעדכן אוטומטית לפי מין, גיל, מצב משפחתי והבטחת קצבה — וניתן לעריכה ידנית.',
  // results
  finalBalance: 'הסכום הכולל שיצטבר בקרן עד גיל הפרישה.',
  pension: 'הסכום החודשי שתקבל מהפרישה ועד סוף החיים. מחושב כצבירה חלקי מקדם הקצבה.',
  disability: 'קצבה חודשית שתקבל אם תאבד את כושר העבודה, כאחוז מהשכר הקובע לפי המסלול הביטוחי.',
  nursing: 'במצב נכות מלא או סיעודי הקרן משלמת את שיעור הנכות המרבי (75%) מהשכר הקובע.',
  maxSurvivors: 'הסכום החודשי המרבי שיחולק בין בני המשפחה במקרה פטירה.',
  widow: 'קצבה חודשית לבן/בת הזוג במקרה פטירת העמית.',
  orphan: 'קצבה חודשית לכל ילד עד גיל 21 במקרה פטירת העמית.',
  monthlyDeposit: 'סך ההפקדה החודשית לקרן — עובד, מעסיק ופיצויים.',
  determiningSalary: 'השכר שעליו מבוססים חישובי הכיסויים הביטוחיים (נכות ושאירים).',
  totalContrib: 'סך כל הכספים שהופקדו לאורך השנים, כולל היתרה הקיימת.',
  totalInterest: 'הרווח שנצבר בזכות התשואה לאורך כל תקופת החיסכון.',
  years: 'מספר השנים מהיום ועד גיל הפרישה.',
};

// ── Helpers ────────────────────────────────────────────────────────
function fmt(n: number) {
  if (!isFinite(n)) return '0';
  return Math.round(n).toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtShort(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toFixed(0);
}
function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

function computeCoefficient(gender: Gender, retireAge: number, maritalAdd: number, guaranteeAdd: number) {
  const base = gender === 'female' ? 210 : 200; // בסיס לגיל 67
  const c = base + (67 - retireAge) * 4 + maritalAdd + guaranteeAdd;
  return clamp(c, 170, 260);
}
function maritalCoefAdd(marital: string) {
  if (marital === 'single') return -5;
  if (marital === 'married_kids') return 4;
  return 2; // married
}

function calcPension(
  currentBalance: number,
  monthlyDeposit: number,
  annualRate: number,
  years: number,
  startAge: number,
  mgmtFeeRate: number,
  treasuryFeeRate: number,
): YearRow[] {
  const rows: YearRow[] = [];
  let balance = currentBalance;
  const monthlyRate = annualRate / 100 / 12;
  const depositFeeRate = treasuryFeeRate / 100;
  const accumFeeRate = mgmtFeeRate / 100;

  for (let y = 1; y <= years; y++) {
    const start = balance;
    let b = balance;
    const yearTreasuryFee = monthlyDeposit * 12 * depositFeeRate;

    for (let m = 0; m < 12; m++) {
      b += monthlyDeposit * (1 - depositFeeRate);
      b *= (1 + monthlyRate);
    }
    const grossEnd = b;
    const yearContrib = monthlyDeposit * 12;
    const interest = grossEnd - start - yearContrib * (1 - depositFeeRate);
    const mgmtFee = grossEnd * accumFeeRate;
    const endBalance = grossEnd - mgmtFee;

    rows.push({
      year: y, age: startAge + y, startBalance: start, contribution: yearContrib,
      interest, mgmtFee, treasuryFee: yearTreasuryFee, endBalance,
    });
    balance = endBalance;
  }
  return rows;
}

function finalBalanceOnly(
  currentBalance: number, monthlyDeposit: number, annualRate: number,
  years: number, mgmtFeeRate: number, treasuryFeeRate: number,
) {
  const rows = calcPension(currentBalance, monthlyDeposit, annualRate, years, 0, mgmtFeeRate, treasuryFeeRate);
  return rows.length ? rows[rows.length - 1].endBalance : currentBalance;
}

// ── Help Tip (clickable "?") ───────────────────────────────────────
function HelpTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', verticalAlign: 'middle' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="הסבר"
        style={{
          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
          border: '1px solid rgba(200,160,53,0.5)', background: 'rgba(200,160,53,0.12)',
          color: '#c8a035', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0,
        }}
      >
        ?
      </button>
      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute', top: '24px', right: 0, zIndex: 100, width: '230px',
            background: 'rgba(7,15,30,0.98)', border: '1px solid rgba(200,160,53,0.35)',
            borderRadius: '10px', padding: '10px 12px', color: 'rgba(255,255,255,0.85)',
            fontSize: '12px', lineHeight: 1.6, fontWeight: 400,
            boxShadow: '0 8px 24px rgba(0,0,0,0.45)', textAlign: 'right',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

function FieldLabel({ label, help }: { label: string; help?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
      <label style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '14px' }}>{label}</label>
      {help && <HelpTip text={help} />}
    </div>
  );
}

// ── Mini Chart ────────────────────────────────────────────────────
function AreaChart({ rows }: { rows: YearRow[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; row: YearRow } | null>(null);

  const W = 900, H = 320, PL = 70, PR = 24, PT = 24, PB = 48;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;

  const maxVal = Math.max(...rows.map(r => r.endBalance), 1);
  const totalContrib = rows.map((r, i) => rows.slice(0, i + 1).reduce((s, x) => s + x.contribution, 0) + rows[0].startBalance);

  const toX = (i: number) => PL + (i / Math.max(rows.length - 1, 1)) * innerW;
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
          <linearGradient id="gradBalanceP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8a035" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c8a035" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="gradContribP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1a3a5c" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glowP">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

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

        {rows.filter((_, i) => i % Math.ceil(rows.length / 10) === 0 || i === rows.length - 1).map(r => (
          <text key={r.year} x={toX(r.year - 1)} y={PT + innerH + 20}
            textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="Heebo">
            גיל {r.age}
          </text>
        ))}

        <path d={contribArea} fill="url(#gradContribP)" />
        <path d={contribPath} fill="none" stroke="rgba(26,58,92,0.8)" strokeWidth="2" strokeDasharray="5 3" />
        <path d={balanceArea} fill="url(#gradBalanceP)" />
        <path d={balancePath} fill="none" stroke="#c8a035" strokeWidth="2.5" filter="url(#glowP)" />

        {tooltip && (
          <>
            <line x1={tooltip.x} x2={tooltip.x} y1={PT} y2={PT + innerH}
              stroke="rgba(200,160,53,0.4)" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#c8a035" stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>

      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '24px', height: '3px', background: '#c8a035', borderRadius: '2px' }} />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>צבירה כוללת</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '24px', height: '3px', background: 'rgba(26,58,92,0.8)', borderRadius: '2px', borderTop: '2px dashed rgba(26,58,92,0.8)' }} />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>הפקדות בלבד</span>
        </div>
      </div>

      {tooltip && (
        <div style={{
          position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(7,15,30,0.95)', border: '1px solid rgba(200,160,53,0.35)',
          borderRadius: '12px', padding: '10px 18px', pointerEvents: 'none', whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>גיל {tooltip.row.age}</div>
          <div style={{ color: '#fff', fontSize: '13px' }}>צבירה: <b>₪{fmt(tooltip.row.endBalance)}</b></div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>תשואה שנתית: ₪{fmt(tooltip.row.interest)}</div>
        </div>
      )}
    </div>
  );
}

// ── Input Field ───────────────────────────────────────────────────
function CalcInput({
  label, help, value, onChange, suffix = '', prefix = '', type = 'number', compact = false,
}: {
  label?: string; help?: string; value: string;
  onChange: (v: string) => void; suffix?: string; prefix?: string; type?: string; compact?: boolean;
}) {
  return (
    <div>
      {label && <FieldLabel label={label} help={help} />}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(200,160,53,0.25)',
        borderRadius: '10px', overflow: 'hidden',
      }}>
        {prefix && (
          <span style={{ padding: '0 12px', color: '#c8a035', fontWeight: 700, fontSize: '15px', borderLeft: '1px solid rgba(200,160,53,0.2)' }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            flex: 1, width: '100%', minWidth: 0, background: 'none', border: 'none', outline: 'none',
            color: '#ffffff', fontFamily: 'Heebo, sans-serif',
            fontSize: compact ? '14px' : '16px', fontWeight: 500, padding: compact ? '10px 10px' : '12px 14px',
            textAlign: 'right', direction: 'ltr', colorScheme: 'dark',
          }}
        />
        {suffix && (
          <span style={{ padding: compact ? '0 7px' : '0 12px', color: 'rgba(255,255,255,0.45)', fontSize: compact ? '13px' : '14px' }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

// ── Select Field ──────────────────────────────────────────────────
function CalcSelect({
  label, help, value, onChange, options,
}: {
  label: string; help?: string; value: string;
  onChange: (v: string) => void; options: { id: string; label: string }[];
}) {
  return (
    <div>
      <FieldLabel label={label} help={help} />
      <div style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(200,160,53,0.25)',
        borderRadius: '10px',
      }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: '#ffffff', fontFamily: 'Heebo, sans-serif', fontSize: '14px', fontWeight: 500,
            padding: '12px 14px', cursor: 'pointer', appearance: 'none', direction: 'rtl', textAlign: 'right',
          }}
        >
          {options.map(o => (
            <option key={o.id} value={o.id} style={{ background: '#0d1b30', color: '#ffffff' }}>{o.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#c8a035', pointerEvents: 'none', fontSize: '11px' }}>▼</span>
      </div>
    </div>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────
function CalcCheckbox({ label, help, checked, onChange }: {
  label: string; help?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '6px 0' }}>
      <input
        type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        id={`cb-${label}`}
        style={{ width: '16px', height: '16px', accentColor: '#c8a035', flexShrink: 0, cursor: 'pointer' }}
      />
      <label htmlFor={`cb-${label}`} style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{label}</label>
      {help && <HelpTip text={help} />}
    </div>
  );
}

// ── Gender Toggle ─────────────────────────────────────────────────
function GenderToggle({ value, onChange }: { value: Gender; onChange: (v: Gender) => void }) {
  return (
    <div>
      <FieldLabel label="מין" help={HELP.gender} />
      <div style={{ display: 'flex', gap: '8px' }}>
        {([['male', 'זכר'], ['female', 'נקבה']] as const).map(([key, lbl]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              flex: 1, padding: '11px', borderRadius: '10px', cursor: 'pointer',
              fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
              border: value === key ? '1px solid rgba(200,160,53,0.6)' : '1px solid rgba(255,255,255,0.12)',
              background: value === key ? 'rgba(200,160,53,0.15)' : 'rgba(255,255,255,0.04)',
              color: value === key ? '#c8a035' : 'rgba(255,255,255,0.6)',
            }}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Result Card ───────────────────────────────────────────────────
function ResultCard({ label, value, help, highlight, plain }: {
  label: string; value: string; help?: string; highlight?: boolean; plain?: boolean;
}) {
  return (
    <div style={{
      padding: '16px 18px',
      background: highlight ? 'rgba(200,160,53,0.1)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${highlight ? 'rgba(200,160,53,0.4)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>{label}</span>
        {help && <HelpTip text={help} />}
      </div>
      <div style={{ color: highlight ? '#c8a035' : '#ffffff', fontWeight: 700, fontSize: '18px', direction: 'ltr', textAlign: 'right' }}>
        {plain ? value : `₪${value}`}
      </div>
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(200,160,53,0.2)',
      borderRadius: '20px',
      padding: '24px 26px',
    }}>
      <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', alignItems: 'start' } as const;

// ── Main Page ─────────────────────────────────────────────────────
export default function PensionCalculatorPage() {
  // פרטי העמית
  const [currentAge, setCurrentAge] = useState('30');
  const [retireAge, setRetireAge] = useState('67');
  const [gender, setGender] = useState<Gender>('male');
  const [marital, setMarital] = useState('married_kids');
  const [memberType, setMemberType] = useState('employee');

  // פרטי התוכנית
  const [planType, setPlanType] = useState('comprehensive');
  const [balance, setBalance] = useState('0');
  const [track, setTrack] = useState('t1');
  const [joinDate, setJoinDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [guarantee, setGuarantee] = useState('none');
  const [developingDisability, setDevelopingDisability] = useState(false);
  const [franchiseDisability, setFranchiseDisability] = useState(false);

  // אופן החישוב
  const [calcMode, setCalcMode] = useState('salary');
  const [salary, setSalary] = useState('12000');
  const [depositInput, setDepositInput] = useState('2220');
  const [targetPension, setTargetPension] = useState('8000');

  // אחוזי הפקדה
  const [employeeRate, setEmployeeRate] = useState('6');
  const [employerRate, setEmployerRate] = useState('6.5');
  const [severanceRate, setSeveranceRate] = useState('6');

  // פרמטרים פיננסיים
  const [rate, setRate] = useState('4');
  const [mgmtFee, setMgmtFee] = useState('0.5');
  const [treasuryFee, setTreasuryFee] = useState('2');

  const [coefficient, setCoefficient] = useState(String(computeCoefficient('male', 67, maritalCoefAdd('married_kids'), 0)));
  const [coefTouched, setCoefTouched] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // ── Derived ──
  const cAge = clamp(Number(currentAge) || 18, 18, 70);
  const rAge = clamp(Number(retireAge) || 67, cAge + 1, 85);
  const years = rAge - cAge;
  const coefNum = Math.max(Number(coefficient) || 1, 1);

  const totalContribRate = (Number(employeeRate) || 0) + (Number(employerRate) || 0) + (Number(severanceRate) || 0);
  const rateNum = Number(rate) || 0;
  const mgmtNum = Number(mgmtFee) || 0;
  const treasuryNum = Number(treasuryFee) || 0;
  const balanceNum = Number(balance) || 0;

  let monthlyDeposit = 0;
  let determiningSalary = 0;
  if (calcMode === 'salary') {
    determiningSalary = Number(salary) || 0;
    monthlyDeposit = determiningSalary * totalContribRate / 100;
  } else if (calcMode === 'deposit') {
    monthlyDeposit = Number(depositInput) || 0;
    determiningSalary = totalContribRate > 0 ? monthlyDeposit / (totalContribRate / 100) : 0;
  } else {
    const requiredFinal = (Number(targetPension) || 0) * coefNum;
    const fvBalanceOnly = finalBalanceOnly(balanceNum, 0, rateNum, years, mgmtNum, treasuryNum);
    const fvPerUnit = finalBalanceOnly(0, 1, rateNum, years, mgmtNum, treasuryNum);
    monthlyDeposit = fvPerUnit > 0 ? Math.max((requiredFinal - fvBalanceOnly) / fvPerUnit, 0) : 0;
    determiningSalary = totalContribRate > 0 ? monthlyDeposit / (totalContribRate / 100) : 0;
  }

  const rows = useMemo(() =>
    calcPension(balanceNum, monthlyDeposit, rateNum, years, cAge, mgmtNum, treasuryNum),
    [balanceNum, monthlyDeposit, rateNum, years, cAge, mgmtNum, treasuryNum]
  );

  const lastRow = rows[rows.length - 1];
  const finalBalance = lastRow ? lastRow.endBalance : balanceNum;
  const totalContrib = rows.reduce((s, r) => s + r.contribution, 0) + balanceNum;
  const totalInterest = rows.reduce((s, r) => s + r.interest, 0);
  const monthlyPension = finalBalance / coefNum;
  const replacementRate = determiningSalary > 0 ? (monthlyPension / determiningSalary) * 100 : 0;

  const trackObj = TRACKS.find(t => t.id === track)!;
  const isComprehensive = planType === 'comprehensive';
  const disabilityPension = isComprehensive ? trackObj.disability * determiningSalary : 0;
  const nursingPension = isComprehensive ? 0.75 * determiningSalary : 0;
  const hasSpouse = marital !== 'single';
  const hasKids = marital === 'married_kids';
  const maxSurvivors = isComprehensive ? trackObj.survivors * determiningSalary : 0;
  const widowPension = isComprehensive && hasSpouse ? trackObj.survivors * 0.6 * determiningSalary : 0;
  const orphanPension = isComprehensive && hasKids ? trackObj.survivors * 0.3 * determiningSalary : 0;

  // ── Handlers ──
  const refreshCoef = (g: Gender, rA: number, m: string, gu: string) => {
    if (coefTouched) return;
    const guObj = GUARANTEES.find(x => x.id === gu)!;
    setCoefficient(String(computeCoefficient(g, rA, maritalCoefAdd(m), guObj.coefAdd)));
  };
  const applyGender = (g: Gender) => { setGender(g); refreshCoef(g, rAge, marital, guarantee); };
  const applyRetireAge = (v: string) => {
    setRetireAge(v);
    const n = clamp(Number(v) || 67, cAge + 1, 85);
    refreshCoef(gender, n, marital, guarantee);
  };
  const applyMarital = (v: string) => { setMarital(v); refreshCoef(gender, rAge, v, guarantee); };
  const applyGuarantee = (v: string) => { setGuarantee(v); refreshCoef(gender, rAge, marital, v); };

  const handleReset = () => {
    setCurrentAge('30'); setRetireAge('67'); setGender('male'); setMarital('married_kids'); setMemberType('employee');
    setPlanType('comprehensive'); setBalance('0'); setTrack('t1');
    setJoinDate(new Date().toISOString().slice(0, 10)); setGuarantee('none');
    setDevelopingDisability(false); setFranchiseDisability(false);
    setCalcMode('salary'); setSalary('12000'); setDepositInput('2220'); setTargetPension('8000');
    setEmployeeRate('6'); setEmployerRate('6.5'); setSeveranceRate('6');
    setRate('4'); setMgmtFee('0.5'); setTreasuryFee('2');
    setCoefficient(String(computeCoefficient('male', 67, maritalCoefAdd('married_kids'), 0)));
    setCoefTouched(false);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy-deep)', paddingTop: '108px', direction: 'rtl' }}>
      {/* Header */}
      <section style={{ padding: '48px 20px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <img src="/images/logo.png" alt="A.D Finance"
            style={{ width: '72px', height: '72px', objectFit: 'contain', margin: '0 auto 12px', display: 'block' }} />
          <div className="section-tag">כלים פיננסיים</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
            מחשבון <span className="text-gradient-gold">פנסיה</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto' }}>
            הזינו את פרטי העמית והתוכנית, וקבלו תמונה מלאה — צבירה צפויה, קצבת פרישה, קצבת נכות וכיסוי שאירים
          </p>
        </div>
      </section>

      {/* Calculator — full-width stacked layout */}
      <section style={{ padding: '40px clamp(16px, 4vw, 48px) 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* פרטי העמית */}
          <Card title="פרטי העמית">
            <div style={GRID}>
              <CalcInput label="גיל נוכחי" help={HELP.currentAge} value={currentAge} onChange={setCurrentAge} suffix="שנים" />
              <CalcInput label="גיל קבלת פנסיה" help={HELP.retireAge} value={retireAge} onChange={applyRetireAge} suffix="שנים" />
              <GenderToggle value={gender} onChange={applyGender} />
              <CalcSelect label="מצב משפחתי" help={HELP.marital} value={marital} onChange={applyMarital} options={MARITAL} />
              <CalcSelect label="סוג העמית" help={HELP.memberType} value={memberType} onChange={setMemberType} options={MEMBER_TYPES} />
            </div>
          </Card>

          {/* פרטי התוכנית */}
          <Card title="פרטי התוכנית">
            <div style={GRID}>
              <CalcSelect label="סוג התוכנית" help={HELP.planType} value={planType} onChange={setPlanType} options={PLAN_TYPES} />
              <CalcInput label="יתרה צבורה" help={HELP.balance} value={balance} onChange={setBalance} prefix="₪" />
              <CalcSelect label="מסלול ביטוחי" help={HELP.track} value={track} onChange={setTrack} options={TRACKS} />
              <CalcInput label="תאריך הצטרפות" help={HELP.joinDate} type="date" value={joinDate} onChange={setJoinDate} />
              <CalcSelect label="משך הבטחת קצבה" help={HELP.guarantee} value={guarantee} onChange={applyGuarantee} options={GUARANTEES} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <CalcCheckbox label="נכות מתפתחת" help={HELP.developing} checked={developingDisability} onChange={setDevelopingDisability} />
              <CalcCheckbox label="נכות עם פרנצ׳יזה" help={HELP.franchise} checked={franchiseDisability} onChange={setFranchiseDisability} />
            </div>
          </Card>

          {/* אופן החישוב */}
          <Card title="אופן החישוב">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {CALC_MODES.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setCalcMode(m.id)}
                    style={{
                      padding: '10px 16px', borderRadius: '9px', cursor: 'pointer',
                      fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '13px', transition: 'all 0.2s',
                      border: calcMode === m.id ? '1px solid rgba(200,160,53,0.6)' : '1px solid rgba(255,255,255,0.12)',
                      background: calcMode === m.id ? 'rgba(200,160,53,0.15)' : 'rgba(255,255,255,0.04)',
                      color: calcMode === m.id ? '#c8a035' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <HelpTip text={HELP.calcMode} />
            </div>

            <div style={GRID}>
              {calcMode === 'salary' && <CalcInput label="שכר לתגמולים" help={HELP.salary} value={salary} onChange={setSalary} prefix="₪" />}
              {calcMode === 'deposit' && <CalcInput label="הפקדה חודשית" help={HELP.deposit} value={depositInput} onChange={setDepositInput} prefix="₪" />}
              {calcMode === 'target' && <CalcInput label="יעד פנסיוני" help={HELP.target} value={targetPension} onChange={setTargetPension} prefix="₪" />}

              {/* אחוזי הפקדה */}
              <div>
                <FieldLabel label="פירוט אחוזי הפקדה" help={HELP.contrib} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <CalcInput label="עובד" value={employeeRate} onChange={setEmployeeRate} suffix="%" compact />
                  <CalcInput label="מעסיק" value={employerRate} onChange={setEmployerRate} suffix="%" compact />
                  <CalcInput label="פיצויים" value={severanceRate} onChange={setSeveranceRate} suffix="%" compact />
                </div>
                <div style={{ marginTop: '6px', textAlign: 'left', color: '#c8a035', fontSize: '12px', fontWeight: 700 }}>
                  סה״כ: {totalContribRate.toFixed(2)}%
                </div>
              </div>

              <CalcInput label="תשואה שנתית צפויה" help={HELP.rate} value={rate} onChange={setRate} suffix="%" />
              <CalcInput label="דמי ניהול מהצבירה" help={HELP.mgmtFee} value={mgmtFee} onChange={setMgmtFee} suffix="%" />
              <CalcInput label="דמי ניהול מהפקדה" help={HELP.treasuryFee} value={treasuryFee} onChange={setTreasuryFee} suffix="%" />
              <CalcInput label="מקדם קצבה (המרה)" help={HELP.coefficient} value={coefficient} onChange={v => { setCoefficient(v); setCoefTouched(true); }} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '11px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(255,255,255,0.7)', fontFamily: 'Heebo, sans-serif',
                  fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                }}
              >
                איפוס
              </button>
              <button
                onClick={() => setShowTable(!showTable)}
                style={{
                  padding: '11px 26px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #c8a035, #e8c84a)',
                  color: '#070f1e', fontFamily: 'Heebo, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                }}
              >
                {showTable ? 'הסתר טבלה' : 'טבלת צבירה שנתית'}
              </button>
            </div>
          </Card>

          {/* Highlight pension */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(200,160,53,0.16), rgba(200,160,53,0.04))',
            border: '1px solid rgba(200,160,53,0.4)', borderRadius: '20px', padding: '28px 26px',
            display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '6px' }}>
                קצבת הפרישה החודשית הצפויה בגיל {rAge}
              </div>
              <div style={{ color: '#c8a035', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 2.8rem)', direction: 'ltr', textAlign: 'right', lineHeight: 1.1 }}>
                ₪{fmt(monthlyPension)}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(7,15,30,0.4)', borderRadius: '14px', border: '1px solid rgba(200,160,53,0.2)' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>שיעור תחלופה</div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.5rem', direction: 'ltr' }}>{replacementRate.toFixed(0)}%</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', marginTop: '2px' }}>מהשכר הקובע</div>
            </div>
          </div>

          {/* Results grid */}
          <Card title="תוצאות חישוב לגיל פרישה">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
              <ResultCard label="סה״כ צבירה צפויה" help={HELP.finalBalance} value={fmt(finalBalance)} highlight />
              <ResultCard label="פנסיית פרישה" help={HELP.pension} value={fmt(monthlyPension)} highlight />
              <ResultCard label="קצבת נכות" help={HELP.disability} value={fmt(disabilityPension)} />
              <ResultCard label="נכות סיעודית" help={HELP.nursing} value={fmt(nursingPension)} />
              <ResultCard label="מקסימום שאירים" help={HELP.maxSurvivors} value={fmt(maxSurvivors)} />
              <ResultCard label="קצבת אלמן/ה" help={HELP.widow} value={fmt(widowPension)} />
              <ResultCard label="קצבת יתום/ה" help={HELP.orphan} value={fmt(orphanPension)} />
              <ResultCard label="הפקדה חודשית" help={HELP.monthlyDeposit} value={fmt(monthlyDeposit)} />
              <ResultCard label="שכר קובע עמית" help={HELP.determiningSalary} value={fmt(determiningSalary)} />
              <ResultCard label="סך כל ההפקדות" help={HELP.totalContrib} value={fmt(totalContrib)} />
              <ResultCard label="סך התשואה הצפויה" help={HELP.totalInterest} value={fmt(totalInterest)} />
              <ResultCard label="שנות חיסכון שנותרו" help={HELP.years} value={`${years} שנים`} plain />
            </div>
          </Card>

          {/* Chart */}
          <Card title="צמיחת הצבירה עד הפרישה">
            {rows.length > 0 ? <AreaChart rows={rows} /> : (
              <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px' }}>
                הזינו גיל פרישה גדול מהגיל הנוכחי כדי לראות את הגרף
              </div>
            )}
          </Card>

          {/* Annual Table */}
          {showTable && rows.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,160,53,0.2)',
              borderRadius: '20px', padding: '24px 26px', overflowX: 'auto',
            }}>
              <div style={{ color: '#c8a035', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', borderBottom: '1px solid rgba(200,160,53,0.15)', paddingBottom: '12px', marginBottom: '20px' }}>
                טבלת צבירה שנתית
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', direction: 'rtl' }}>
                <thead>
                  <tr>
                    {['גיל', 'יתרת פתיחה', 'הפקדות', 'תשואה', 'דמי ניהול צבירה', 'דמי ניהול הפקדה', 'יתרת סגירה'].map(h => (
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
                      <td style={{ padding: '9px 14px', color: '#c8a035', fontWeight: 700 }}>{r.age}</td>
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

          {/* Disclaimer */}
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.7, maxWidth: '900px', margin: '8px auto 0', textAlign: 'center' }}>
            * החישוב הוא הערכה כללית בלבד המבוססת על הנתונים שהוזנו ועל הנחות תשואה קבועות, ואינו מהווה ייעוץ פנסיוני.
            קצבאות הנכות והשאירים מחושבות כאחוז מהשכר הקובע בהתאם למסלול הביטוחי שנבחר, והקצבה בפועל נקבעת על ידי הקרן
            בהתאם לתקנונה ולמקדם המעודכן. לתכנון אישי ומדויק פנו לייעוץ מקצועי.
          </p>
        </div>
      </section>

      {/* הסתרת חצי ה-spinner של שדות מספר — כדי שהמספרים שמקלידים ייראו במלואם */}
      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; appearance: textfield; }
      `}</style>
    </main>
  );
}
