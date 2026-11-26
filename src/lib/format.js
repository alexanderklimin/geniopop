// Number and fraction display for a resolved prefs object (see locale.js).

import { toDecimal, isInteger, toMixed } from './fraction.js';

const cache = new Map();
function nf(prefs, maxFrac) {
  const key = `${prefs.intl}|${prefs.digits}|${maxFrac}`;
  if (!cache.has(key)) cache.set(key, new Intl.NumberFormat(prefs.intl, { maximumFractionDigits: maxFrac, numberingSystem: prefs.digits }));
  return cache.get(key);
}

export const formatNumber = (x, prefs, maxFrac = 10) => nf(prefs, maxFrac).format(x).replace('-', '−');

// Digits only (for long division columns, where grouping separators would shift columns)
export function digitsOnly(text, prefs) {
  if (prefs.digits !== 'arab') return String(text);
  return String(text).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
}

// Fraction as text: '3/4', '−1 1/2' (mixed), or decimal '0,75'
export function formatFraction(f, prefs, { mixed = false } = {}) {
  const sign = f.n < 0 ? '−' : '';
  if (isInteger(f)) return formatNumber(f.n / f.d, prefs);
  if (mixed) {
    const m = toMixed(f);
    if (m.whole) return `${sign}${digitsOnly(m.whole, prefs)} ${digitsOnly(m.n, prefs)}/${digitsOnly(m.d, prefs)}`;
  }
  return `${sign}${digitsOnly(Math.abs(f.n), prefs)}/${digitsOnly(f.d, prefs)}`;
}

// 0,1(6) style for repeating decimals; overline is drawn by CSS on the <span class="rep">
export function formatDecimal(f, prefs) {
  const d = toDecimal(f);
  const sep = prefs.decimalSep;
  const int = formatNumber(Number(d.int), prefs);
  const sign = d.negative ? '−' : '';
  if (!d.fixed && !d.repeat) return sign + int;
  return `${sign}${int}${sep}${digitsOnly(d.fixed, prefs)}${d.repeat ? `(${digitsOnly(d.repeat, prefs)})` : ''}`;
}
