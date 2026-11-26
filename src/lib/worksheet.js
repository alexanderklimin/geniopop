// Printable worksheet generator: topic × level × count → problems with answers.
// Seeded, so the same URL (?t=add&d=3&carry=force&n=20&seed=42) always prints the same sheet.

import { createRng } from './rng.js';
import { frac, reduce, add, sub, mul, div } from './fraction.js';
import { toRoman } from './roman.js';
import { gcd, lcm } from './numtheory.js';

const range = (digits) => [digits === 1 ? 0 : 10 ** (digits - 1), 10 ** digits - 1];
const digitsOf = (n) => String(n).split('').reverse().map(Number);

export function hasCarry(a, b) {
  const x = digitsOf(a), y = digitsOf(b);
  for (let i = 0, c = 0; i < Math.max(x.length, y.length); i++) {
    const s = (x[i] ?? 0) + (y[i] ?? 0) + c;
    if (s >= 10) return true;
    c = 0;
  }
  return false;
}

export function hasBorrow(a, b) {
  const x = digitsOf(a), y = digitsOf(b);
  return y.some((d, i) => d > (x[i] ?? 0));
}

const wantFlag = (mode, value) => mode === 'any' || (mode === 'force') === value;

const GENERATORS = {
  // { digits: 1..6, carry: 'any' | 'none' | 'force' }
  add(rng, { digits = 2, carry = 'any', terms = 2 } = {}) {
    const [lo, hi] = range(digits);
    const nums = Array.from({ length: terms }, () => rng.int(lo, hi));
    if (terms === 2 && !wantFlag(carry, hasCarry(nums[0], nums[1]))) return null;
    return { op: '+', operands: nums, answer: nums.reduce((s, n) => s + n, 0) };
  },
  // never negative; borrow: 'any' | 'none' | 'force'
  sub(rng, { digits = 2, borrow = 'any' } = {}) {
    const [lo, hi] = range(digits);
    let a = rng.int(lo, hi), b = rng.int(lo, hi);
    if (b > a) [a, b] = [b, a];
    if (!wantFlag(borrow, hasBorrow(a, b))) return null;
    return { op: '-', operands: [a, b], answer: a - b };
  },
  // tables: [2, 3, 7], up to 10 or 12
  table(rng, { tables = [2, 3, 4, 5], to = 10 } = {}) {
    const a = rng.pick(tables), b = rng.int(1, to);
    return rng.next() < 0.5 ? { op: '*', operands: [a, b], answer: a * b } : { op: '*', operands: [b, a], answer: a * b };
  },
  // inverse: 7 × ? = 56
  missingFactor(rng, { tables = [2, 3, 4, 5], to = 10 } = {}) {
    const a = rng.pick(tables), b = rng.int(1, to);
    return { op: '*', operands: [a, null], result: a * b, answer: b };
  },
  mul(rng, { digitsA = 2, digitsB = 1 } = {}) {
    const [la, ha] = range(digitsA), [lb, hb] = range(digitsB);
    const a = rng.int(Math.max(la, 2), ha), b = rng.int(Math.max(lb, 2), hb);
    return { op: '*', operands: [a, b], answer: a * b };
  },
  // remainder: false = exact division
  div(rng, { divisorDigits = 1, quotientDigits = 2, remainder = false } = {}) {
    const [ld, hd] = range(divisorDigits), [lq, hq] = range(quotientDigits);
    const d = rng.int(Math.max(ld, 2), hd), q = rng.int(Math.max(lq, 1), hq);
    const r = remainder ? rng.int(1, d - 1) : 0;
    return { op: '/', operands: [d * q + r, d], answer: q, remainder: r };
  },
  fraction(rng, { ops = ['+', '-'], maxDen = 10, sameDen = false, proper = true } = {}) {
    const op = rng.pick(ops);
    const d1 = rng.int(2, maxDen), d2 = sameDen ? d1 : rng.int(2, maxDen);
    const n1 = rng.int(1, proper ? d1 - 1 : d1 * 2), n2 = rng.int(1, proper ? d2 - 1 : d2 * 2);
    let a = frac(n1, d1), b = frac(n2, d2);
    if (op === '-' && a.n * b.d < b.n * a.d) [a, b] = [b, a];
    const answer = { '+': add, '-': sub, '*': mul, '/': div }[op](a, b);
    return { op, operands: [a, b], answer };
  },
  simplify(rng, { maxDen = 12, maxFactor = 6 } = {}) {
    const d = rng.int(2, maxDen), n = rng.int(1, d - 1), k = rng.int(2, maxFactor);
    const base = reduce(frac(n, d));
    return { op: 'simplify', operands: [frac(base.n * k, base.d * k)], answer: base };
  },
  roman(rng, { max = 100, direction = 'both' } = {}) {
    const n = rng.int(1, max);
    const toR = direction === 'toRoman' || (direction === 'both' && rng.next() < 0.5);
    return toR ? { op: 'toRoman', operands: [n], answer: toRoman(n) } : { op: 'fromRoman', operands: [toRoman(n)], answer: n };
  },
  percent(rng, { percents = [10, 20, 25, 50, 75], max = 200, step = 10 } = {}) {
    const p = rng.pick(percents);
    // keep answers whole: x is a multiple of 100/gcd(p,100)
    const unit = 100 / gcd(p, 100);
    const x = unit * rng.int(1, Math.max(1, Math.floor(max / unit)));
    return { op: 'percentOf', operands: [p, x], answer: (p * x) / 100, step };
  },
  gcdLcm(rng, { max = 60, which = 'both' } = {}) {
    const k = rng.int(2, 6);
    const a = k * rng.int(2, Math.floor(max / k)), b = k * rng.int(2, Math.floor(max / k));
    if (a === b) return null;
    const w = which === 'both' ? rng.pick(['gcd', 'lcm']) : which;
    return { op: w, operands: [a, b], answer: w === 'gcd' ? gcd(a, b) : lcm(a, b) };
  },
};

export const TOPICS = Object.keys(GENERATORS);

export function generate(topic, { count = 20, seed = 1, ...params } = {}) {
  const gen = GENERATORS[topic];
  if (!gen) throw new RangeError(`Unknown topic ${topic}`);
  if (!Number.isInteger(count) || count < 1 || count > 100) throw new RangeError('count 1..100');
  const rng = createRng(seed);
  const out = [], seen = new Set();
  for (let tries = 0; out.length < count && tries < count * 200; tries++) {
    const p = gen(rng, params);
    if (!p) continue;
    const key = JSON.stringify(p.operands);
    // allow repeats only when the topic has too few distinct problems
    if (seen.has(key) && tries < count * 50) continue;
    seen.add(key);
    out.push({ topic, ...p });
  }
  if (out.length < count) throw new RangeError('Could not build enough problems with these settings');
  return { topic, seed, params, problems: out };
}

// Grade presets (same ids as locale grades). Pages show them with local grade names.
export const PRESETS = {
  1: [{ topic: 'add', digits: 1 }, { topic: 'sub', digits: 1 }, { topic: 'add', digits: 2, carry: 'none' }],
  2: [{ topic: 'add', digits: 2, carry: 'force' }, { topic: 'sub', digits: 2, borrow: 'force' }, { topic: 'table', tables: [2, 3, 4, 5, 10] }],
  3: [{ topic: 'table', tables: [6, 7, 8, 9] }, { topic: 'add', digits: 3 }, { topic: 'sub', digits: 3 }, { topic: 'div', divisorDigits: 1, quotientDigits: 1 }, { topic: 'missingFactor', tables: [2, 3, 4, 5, 6, 7, 8, 9] }],
  4: [{ topic: 'mul', digitsA: 3, digitsB: 1 }, { topic: 'div', divisorDigits: 1, quotientDigits: 2, remainder: true }, { topic: 'fraction', ops: ['+', '-'], sameDen: true }, { topic: 'roman', max: 100 }],
  5: [{ topic: 'mul', digitsA: 3, digitsB: 2 }, { topic: 'div', divisorDigits: 2, quotientDigits: 2 }, { topic: 'fraction', ops: ['+', '-'] }, { topic: 'simplify' }, { topic: 'percent' }],
  6: [{ topic: 'fraction', ops: ['*', '/'] }, { topic: 'fraction', ops: ['+', '-', '*', '/'], maxDen: 12 }, { topic: 'gcdLcm' }, { topic: 'percent', percents: [5, 15, 30, 40, 60] }, { topic: 'roman', max: 3999 }],
};
