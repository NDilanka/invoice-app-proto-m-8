export type Line = { amount: number };

function minorUnitDigits(currency: string): number {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
    .maximumFractionDigits;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitDigits(currency);
  const scale = 10 ** digits;
  const minor = lines.reduce((total, line) => total + Math.round(line.amount * scale), 0);
  const abs = String(Math.abs(minor)).padStart(digits + 1, '0');
  const sign = minor < 0 ? '-' : '';
  if (digits === 0) return sign + abs;
  return `${sign}${abs.slice(0, -digits)}.${abs.slice(-digits)}`;
}
