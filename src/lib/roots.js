// Square/cube roots (exact, simplified radical or decimal) and powers with steps.

import { factorList, assertInt } from './numtheory.js';
import { frac, pow as fracPow, reduce } from './fraction.js';

export function isPerfectPower(n, k = 2) {
  const r = Math.round(n ** (1 / k));
  return [r - 1, r, r + 1].find((c) => c >= 0 && c ** k === n) ?? null;
}

// √72 = √(2³·3²) = 6√2 ; k = 2 (square) or 3 (cube)
export function simplifyRoot(n, k = 2) {
  assertInt(n); assertInt(k);
  if (k < 2 || k > 10) throw new RangeError('Root index 2..10');
  if (n < 0 && k % 2 === 0) throw new RangeError('No real even root of a negative number');
  const sign = n < 0 ? -1 : 1, a = Math.abs(n);
  if (a === 0 || a === 1) return { n, k, outside: sign * a, inside: 1, exact: true, factors: [], decimal: sign * a };
  const factors = factorList(a);
  let outside = 1, inside = 1;
  for (const [p, e] of factors) { outside *= p ** Math.floor(e / k); inside *= p ** (e % k); }
  return { n, k, outside: sign * outside, inside, exact: inside === 1, factors, decimal: sign * a ** (1 / k) };
}

// Babylonian/Heron method steps for estimating √n (shown as "how a calculator does it")
export function heronSteps(n, iterations = 5) {
  if (!(n > 0)) throw new RangeError('n > 0');
  const steps = [];
  let x = Math.max(1, Math.floor(Math.sqrt(n)));
  for (let i = 0; i < iterations; i++) {
    const next = (x + n / x) / 2;
    steps.push({ x, next });
    if (Math.abs(next - x) < 1e-12) break;
    x = next;
  }
  return steps;
}

// 2⁵ = 2·2·2·2·2 = 32 ; 2⁻³ = 1/2³ = 1/8 ; (2/3)² = 4/9 ; a⁰ = 1
export function powerSteps(base, exp) {
  assertInt(exp, 'exponent');
  if (Math.abs(exp) > 64) throw new RangeError('Exponent too large');
  const b = typeof base === 'object' ? reduce(base) : frac(base);
  if (exp === 0) {
    if (b.n === 0) throw new RangeError('0⁰ is undefined');
    return { base: b, exp, result: frac(1), steps: [{ k: 'zeroExponent' }] };
  }
  const steps = [];
  if (exp < 0) steps.push({ k: 'negativeExponent', base: b, exp: -exp });
  const e = Math.abs(exp);
  if (e <= 10) steps.push({ k: 'repeatedProduct', base: b, times: e });
  const result = fracPow(b, exp);
  steps.push({ k: 'result', result });
  return { base: b, exp, result, steps };
}

export const squaresTable = (to = 20) => Array.from({ length: to }, (_, i) => [i + 1, (i + 1) ** 2, (i + 1) ** 3]);
