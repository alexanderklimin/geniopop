// Roman numerals 1–3999 (standard subtractive form), both directions, with the breakdown kids learn.
// Bigger numbers with a bar (vinculum) are explained on the page, not converted.

const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
const VALUE = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
export const MIN = 1, MAX = 3999;

export function toRoman(n) {
  if (!Number.isInteger(n) || n < MIN || n > MAX) throw new RangeError(`Roman numerals: ${MIN}–${MAX}`);
  let out = '';
  for (const [v, s] of TABLE) while (n >= v) { out += s; n -= v; }
  return out;
}

// 1987 → [{ place: 1000, value: 1000, roman: 'M' }, { place: 100, value: 900, roman: 'CM' }, …]
export function toRomanSteps(n) {
  const roman = toRoman(n);
  const parts = [];
  for (const place of [1000, 100, 10, 1]) {
    const value = Math.floor(n / place) % 10 * place;
    if (value) parts.push({ place, value, roman: toRoman(value) });
  }
  return { roman, parts };
}

// Strict parser: rejects IIII, VX, IC, MMMM… and explains why (code for the page's message).
export function fromRoman(text) {
  const s = String(text).trim().toUpperCase();
  if (!s) throw romanError('empty');
  const bad = s.match(/[^IVXLCDM]/);
  if (bad) throw romanError('badSymbol', bad[0]);
  const symbols = [...s].map((c) => ({ c, v: VALUE[c] }));
  let total = 0;
  const steps = [];
  for (let i = 0; i < symbols.length; i++) {
    const cur = symbols[i], next = symbols[i + 1];
    if (next && cur.v < next.v) {
      steps.push({ k: 'subtract', symbols: cur.c + next.c, value: next.v - cur.v });
      total += next.v - cur.v; i++;
    } else {
      steps.push({ k: 'add', symbols: cur.c, value: cur.v });
      total += cur.v;
    }
  }
  if (total > MAX) throw romanError('tooBig');
  const canonical = toRoman(total);
  if (canonical !== s) throw romanError('notStandard', canonical, total);
  return { value: total, steps };
}

function romanError(code, detail, value) {
  const e = new RangeError(`Roman: ${code}${detail ? ` (${detail})` : ''}`);
  e.code = code; e.detail = detail; e.value = value;
  return e;
}

// Year/table helper: 1..n with Roman form, for printable tables 1–100 and 1–1000
export const romanTable = (from, to, step = 1) => {
  const rows = [];
  for (let n = from; n <= to; n += step) rows.push([n, toRoman(n)]);
  return rows;
};
