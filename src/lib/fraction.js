// Exact fractions and the step-by-step fraction calculator (+ − × ÷, simplify, mixed numbers).
// Steps are language-neutral objects { k: 'stepKind', ...values }; pages turn them into text per locale.

import { gcd, lcm, assertInt } from './numtheory.js';

function checkResult(n, d) {
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) throw new RangeError('Number too large');
}

// Keeps the fraction as written (3/6 stays 3/6), only moves the sign to the numerator.
export function frac(n, d = 1) {
  assertInt(n, 'numerator'); assertInt(d, 'denominator');
  if (d === 0) throw new RangeError('Denominator cannot be zero');
  if (d < 0) { n = -n; d = -d; }
  return { n: n || 0, d };
}

export function reduce(f) {
  const g = gcd(f.n, f.d) || 1;
  return frac(f.n / g, f.d / g);
}

export const isInteger = (f) => f.n % f.d === 0;
export const equals = (a, b) => a.n * b.d === b.n * a.d;
export const compare = (a, b) => Math.sign(a.n * b.d - b.n * a.d);
export const toNumber = (f) => f.n / f.d;

// Exact arithmetic, always reduced (used by the expression solver and generators).
export function add(a, b) { const n = a.n * b.d + b.n * a.d, d = a.d * b.d; checkResult(n, d); return reduce(frac(n, d)); }
export function sub(a, b) { return add(a, frac(-b.n, b.d)); }
export function mul(a, b) { const n = a.n * b.n, d = a.d * b.d; checkResult(n, d); return reduce(frac(n, d)); }
export function div(a, b) { if (b.n === 0) throw new RangeError('Division by zero'); return mul(a, frac(b.d, b.n)); }
export function pow(a, e) {
  assertInt(e, 'exponent');
  if (e < 0) { if (a.n === 0) throw new RangeError('Division by zero'); return pow(frac(a.d, a.n), -e); }
  let n = 1, d = 1;
  for (let i = 0; i < e; i++) { n *= a.n; d *= a.d; checkResult(n, d); }
  return reduce(frac(n, d));
}

// 7/3 → { sign: 1, whole: 2, n: 1, d: 3 }
export function toMixed(f) {
  const r = reduce(f), sign = r.n < 0 ? -1 : 1, an = Math.abs(r.n);
  return { sign, whole: Math.floor(an / r.d), n: an % r.d, d: r.d };
}

export function fromMixed(whole, n, d, sign = 1) {
  [whole, n, d].forEach((v, i) => { assertInt(v); if (v < 0) throw new RangeError(`Mixed part #${i + 1} must be ≥ 0`); });
  return frac(sign * (whole * d + n), d);
}

// Parses "3/4", "-3/4", "1 1/2", "-2 3/5", "5", "0,25", "0.25". Returns { value, mixed } or throws RangeError.
export function parseFraction(text) {
  const s = String(text).trim().replace(/[−–]/g, '-').replace(/\s+/g, ' ');
  let m;
  if ((m = s.match(/^(-)?(\d+) (\d+)\s?\/\s?(\d+)$/))) {
    const [, minus, w, n, d] = m;
    if (Number(d) === 0) throw new RangeError('Denominator cannot be zero');
    return { value: fromMixed(Number(w), Number(n), Number(d), minus ? -1 : 1), mixed: { whole: Number(w), n: Number(n), d: Number(d), sign: minus ? -1 : 1 } };
  }
  if ((m = s.match(/^(-?\d+)\s?\/\s?(-?\d+)$/))) return { value: frac(Number(m[1]), Number(m[2])), mixed: null };
  if ((m = s.match(/^(-)?(\d+)(?:[.,](\d+))?$/))) {
    const [, minus, int, dec = ''] = m;
    if (dec.length > 12) throw new RangeError('Too many decimals');
    const d = 10 ** dec.length;
    return { value: frac((minus ? -1 : 1) * (Number(int) * d + Number(dec || 0)), d), mixed: null };
  }
  throw new RangeError(`Not a fraction: ${text}`);
}

// Decimal expansion with the repeating part: 1/6 → { int: '0', fixed: '1', repeat: '6' }
export function toDecimal(f, maxDigits = 60) {
  const r = reduce(f), negative = r.n < 0;
  let rem = Math.abs(r.n) % r.d;
  const int = String(Math.floor(Math.abs(r.n) / r.d));
  const seen = new Map(), digits = [];
  while (rem !== 0 && !seen.has(rem) && digits.length < maxDigits) {
    seen.set(rem, digits.length);
    rem *= 10;
    digits.push(Math.floor(rem / r.d));
    rem %= r.d;
  }
  const at = rem !== 0 && seen.has(rem) ? seen.get(rem) : -1;
  return {
    negative: negative && (int !== '0' || digits.length > 0),
    int,
    fixed: (at >= 0 ? digits.slice(0, at) : digits).join(''),
    repeat: at >= 0 ? digits.slice(at).join('') : '',
    truncated: rem !== 0 && at < 0,
  };
}

export function equivalents(f, count = 5) {
  const r = reduce(f);
  return Array.from({ length: count }, (_, i) => frac(r.n * (i + 1), r.d * (i + 1)));
}

// Simplification steps: 36/48 → gcd 12 → 3/4 (also the "divide by small primes" path schools teach).
export function simplifySteps(f) {
  const steps = [];
  let cur = frac(f.n, f.d);
  const g = gcd(cur.n, cur.d);
  if (g <= 1) return { steps: [{ k: 'alreadySimplest', f: cur }], result: cur, gcd: 1, chain: [] };
  const chain = [];
  for (let p = 2, c = cur; Math.abs(c.n) > 1 && p <= c.d; ) {
    if (c.n % p === 0 && c.d % p === 0) { const next = frac(c.n / p, c.d / p); chain.push({ by: p, from: c, to: next }); c = next; }
    else p++;
  }
  const result = reduce(cur);
  steps.push({ k: 'gcd', a: Math.abs(cur.n), b: cur.d, gcd: g });
  steps.push({ k: 'divideBoth', f: cur, by: g, result });
  return { steps, result, gcd: g, chain };
}

const OPS = ['+', '-', '*', '/'];

// Full calculator: solve(a, '+', b) where a, b come from parseFraction (mixed numbers keep their form for step 1).
export function solve(a, op, b) {
  if (!OPS.includes(op)) throw new RangeError(`Unknown operation ${op}`);
  const steps = [];
  const A = a.value ?? a, B = b.value ?? b;
  for (const [x, which] of [[a, 'first'], [b, 'second']]) {
    if (x.mixed) steps.push({ k: 'toImproper', which, mixed: x.mixed, result: x.value });
  }
  let raw;
  if (op === '+' || op === '-') {
    const bn = op === '-' ? -B.n : B.n;
    if (A.d === B.d) {
      steps.push({ k: 'sameDenominator', d: A.d });
      raw = frac(A.n + bn, A.d);
      steps.push({ k: 'combine', op, n1: A.n, n2: B.n, d: A.d, result: raw });
    } else {
      const m = lcm(A.d, B.d);
      const fa = m / A.d, fb = m / B.d;
      const A2 = frac(A.n * fa, m), B2 = frac(B.n * fb, m);
      steps.push({ k: 'commonDenominator', d1: A.d, d2: B.d, lcm: m, product: A.d * B.d });
      if (fa !== 1) steps.push({ k: 'amplify', which: 'first', f: A, factor: fa, result: A2 });
      if (fb !== 1) steps.push({ k: 'amplify', which: 'second', f: B, factor: fb, result: B2 });
      raw = frac(A2.n + (op === '-' ? -B2.n : B2.n), m);
      checkResult(raw.n, raw.d);
      steps.push({ k: 'combine', op, n1: A2.n, n2: B2.n, d: m, result: raw });
    }
  } else {
    let X = A, Y = B;
    if (op === '/') {
      if (B.n === 0) throw new RangeError('Division by zero');
      Y = frac(B.d, B.n);
      steps.push({ k: 'reciprocal', f: B, result: Y });
    }
    // Cross-simplify before multiplying keeps numbers small, as taught in class.
    const g1 = gcd(X.n, Y.d) || 1, g2 = gcd(Y.n, X.d) || 1;
    if (g1 > 1 || g2 > 1) {
      const X2 = frac(X.n / g1, X.d / g2), Y2 = frac(Y.n / g2, Y.d / g1);
      steps.push({ k: 'crossSimplify', left: X, right: Y, g1, g2, leftResult: X2, rightResult: Y2 });
      X = X2; Y = Y2;
    }
    raw = frac(X.n * Y.n, X.d * Y.d);
    checkResult(raw.n, raw.d);
    steps.push({ k: 'multiply', left: X, right: Y, result: raw });
  }
  const result = reduce(raw);
  if (result.n !== raw.n || result.d !== raw.d) steps.push({ k: 'simplify', f: raw, gcd: Math.abs(raw.n / result.n), result });
  const mixed = toMixed(result);
  if (mixed.whole > 0 && mixed.n > 0) steps.push({ k: 'toMixed', f: result, mixed });
  if (isInteger(result) && result.d === 1 && raw.d !== 1) steps.push({ k: 'isWhole', value: result.n });
  return { steps, result, mixed, decimal: toDecimal(result) };
}
