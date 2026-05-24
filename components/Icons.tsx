type IconProps = { size?: number; color?: string; strokeWidth?: number };
const d = (size = 24, color = 'currentColor', sw = 1.8) => ({
  width: size, height: size, viewBox: '0 0 24 24',
  fill: 'none', stroke: color, strokeWidth: sw,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
});

export function ShieldIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
export function ChartBarIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
export function TrendingUpIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
export function PensionIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0116 0v1"/><path d="M12 14v6"/><path d="M9 20h6"/></svg>;
}
export function BriefcaseIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>;
}
export function GraduationIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
export function PiggyBankIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M19 10c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.39 1.19 4.5 3 5.78V19a1 1 0 001 1h6a1 1 0 001-1v-3.22C18.81 14.5 20 12.39 20 10h-1z"/><path d="M9 10h.01M13 10h.01"/><path d="M12 10v3"/></svg>;
}
export function CoinsIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1110.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>;
}
export function DocumentIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
export function FolderIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
}
export function RefreshIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>;
}
export function CheckCircleIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
export function UsersIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
}
export function ClockIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
export function StarIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
export function LockIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}
export function PhoneIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
}
export function MailIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
export function MessageIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
}
export function ArrowLeftIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
}
export function ChevronLeftIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><polyline points="15 18 9 12 15 6"/></svg>;
}
export function HeartIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}
export function ListIcon({ size, color, strokeWidth }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
}