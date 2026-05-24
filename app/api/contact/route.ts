import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_MAP = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;

function getRateLimitKey(req: NextRequest) {
  return req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(key);
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW) {
    RATE_LIMIT_MAP.set(key, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'יותר מדי בקשות. נסה שוב בעוד דקה.' }, { status: 429 });
  }

  let body: { name?: string; email?: string; phone?: string; assets?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, phone, assets, message } = body;

  if (!name?.trim() || name.trim().length < 2) return NextResponse.json({ error: 'שם לא תקין' }, { status: 400 });
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'מייל לא תקין' }, { status: 400 });
  if (!phone?.trim() || !/^[\d\s\-\+]{9,15}$/.test(phone)) return NextResponse.json({ error: 'טלפון לא תקין' }, { status: 400 });
  if (!assets) return NextResponse.json({ error: 'יש לבחור גודל נכסים' }, { status: 400 });

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          assets,
          message: message?.trim() ?? '',
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  console.log('New contact form submission:', {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    assets,
    message: message?.trim() ?? '',
    ip,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}