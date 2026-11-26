// Printable worksheet generator: topic × level × count → problems with answers.
// Seeded, so the same URL (?t=add&d=3&carry=force&n=20&seed=42) always prints the same sheet.

import { createRng } from './rng.js';
import { frac, reduce, add, sub, mul, div } from './fraction.js';
import { toRoman } from './roman.js';
import { gcd, lcm, isPrime, factorList } from './numtheory.js';
import { solveExpression } from './expr.js';

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
  // Combined operations with whole, non-negative results. level 1: + − ×, 2: with ÷ and brackets, 3: with powers and [ ]
  combined(rng, { level = 1 } = {}) {
    const n = (lo, hi) => rng.int(lo, hi);
    const L1 = [
      () => `${n(2, 20)} + ${n(2, 9)} × ${n(2, 9)}`,
      () => `${n(20, 60)} − ${n(2, 5)} × ${n(2, 6)}`,
      () => `${n(2, 9)} × ${n(2, 9)} + ${n(2, 9)} × ${n(2, 9)}`,
      () => `${n(2, 9)} × ${n(2, 9)} − ${n(2, 9)}`,
    ];
    const L2 = [
      () => { const b = n(2, 9); return `${n(2, 30)} + ${b * n(2, 9)} : ${b}`; },
      () => `(${n(2, 15)} + ${n(2, 15)}) × ${n(2, 6)}`,
      () => { const c = n(2, 6); return `${c * n(2, 9)} : ${c} + ${n(2, 9)} × ${n(2, 5)}`; },
      () => `${n(30, 80)} − (${n(2, 9)} + ${n(2, 9)}) × ${n(2, 3)}`,
      () => { const b = n(2, 9); return `(${n(10, 40)} − ${n(2, 9)}) + ${b * n(2, 6)} : ${b}`; },
    ];
    const L3 = [
      () => `${n(2, 5)}^2 + ${n(2, 9)} × ${n(2, 5)}`,
      () => `[${n(2, 9)} + (${n(2, 9)} − ${n(1, 2)})] × ${n(2, 4)}`,
      () => `${n(2, 3)}^3 − ${n(2, 4)} × ${n(1, 2)}`,
      () => { const b = n(2, 5); return `${b * b * n(1, 4)} : ${b}^2 + (${n(2, 9)} − ${n(1, 2)})`; },
    ];
    const pool = level === 1 ? L1 : level === 2 ? [...L1, ...L2] : [...L2, ...L3];
    const text = rng.pick(pool)();
    const r = solveExpression(text, { mul: '×', div: ':' });
    if (r.result.d !== 1 || r.result.n < 0) return null;
    return { op: 'combined', operands: [text.replace(/:/g, '÷')], answer: r.result.n };
  },
  // Powers and square roots with whole answers
  power(rng, { kind = 'mixed', maxBase = 10 } = {}) {
    const k = kind === 'mixed' ? rng.pick(['pow', 'pow', 'sqrt']) : kind;
    if (k === 'sqrt') { const r = rng.int(2, 15); return { op: 'sqrt', operands: [r * r], answer: r }; }
    const e = rng.int(2, 4), b = rng.int(2, e === 2 ? Math.max(maxBase, 12) : e === 3 ? Math.min(maxBase, 10) : Math.min(maxBase, 5));
    return { op: 'pow', operands: [b, e], answer: b ** e };
  },
  // Average of 3–6 numbers with a whole answer
  average(rng, { maxN = 6, max = 20 } = {}) {
    const n = rng.int(3, maxN), m = rng.int(2, max - 2);
    const xs = Array.from({ length: n - 1 }, () => rng.int(Math.max(0, m - 6), m + 6));
    const last = m * n - xs.reduce((a, b) => a + b, 0);
    if (last < 0 || last > max + 10) return null;
    return { op: 'average', operands: rng.shuffle([...xs, last]), answer: m };
  },
  // Prime or composite? (answer: 'primo' or the factorization)
  prime(rng, { max = 100 } = {}) {
    const n = rng.int(2, max);
    return { op: 'prime', operands: [n], answer: isPrime(n) ? 'primo' : factorList(n).map(([p, e]) => (e > 1 ? `${p}^${e}` : String(p))).join(' · ') };
  },
  // Rule of three with whole answers: kind 'direct' (a→b, c→x = b·c/a) or 'inverse' (x = a·b/c)
  rule3(rng, { kind = 'mixed' } = {}) {
    const k = kind === 'mixed' ? rng.pick(['direct', 'inverse']) : kind;
    if (k === 'direct') { const unit = rng.int(2, 12), a = rng.int(2, 8), c = rng.int(2, 12); if (a === c) return null; return { op: 'rule3', kind: k, operands: [a, a * unit, c], answer: c * unit }; }
    const total = rng.pick([12, 24, 36, 48, 60, 72, 120]), divs = [2, 3, 4, 6, 8, 12].filter((d) => total % d === 0);
    const a = rng.pick(divs), c = rng.pick(divs); if (a === c) return null;
    return { op: 'rule3', kind: k, operands: [a, total / a, c], answer: total / c };
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
    const key = JSON.stringify([p.operands, p.result ?? null]); // missingFactor: same operands, different result
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
  6: [{ topic: 'combined', level: 2 }, { topic: 'fraction', ops: ['*', '/'] }, { topic: 'fraction', ops: ['+', '-', '*', '/'], maxDen: 12 }, { topic: 'gcdLcm' }, { topic: 'percent', percents: [5, 15, 30, 40, 60] }, { topic: 'roman', max: 3999 }],
};
