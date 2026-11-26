import test from 'node:test';
import assert from 'node:assert/strict';
import { frac, reduce, add, sub, mul, div, pow, toMixed, fromMixed, parseFraction, toDecimal, simplifySteps, solve, equivalents, compare } from './fraction.js';

const f = (s) => parseFraction(s);
const kinds = (r) => r.steps.map((s) => s.k);

test('basic fractions', () => {
  assert.deepEqual(frac(3, -6), { n: -3, d: 6 });
  assert.deepEqual(reduce(frac(36, 48)), { n: 3, d: 4 });
  assert.deepEqual(add(frac(1, 2), frac(1, 3)), { n: 5, d: 6 });
  assert.deepEqual(sub(frac(1, 2), frac(3, 4)), { n: -1, d: 4 });
  assert.deepEqual(mul(frac(2, 3), frac(3, 4)), { n: 1, d: 2 });
  assert.deepEqual(div(frac(1, 2), frac(1, 4)), { n: 2, d: 1 });
  assert.deepEqual(pow(frac(2, 3), -2), { n: 9, d: 4 });
  assert.equal(compare(frac(2, 3), frac(3, 5)), 1);
  assert.throws(() => frac(1, 0), RangeError);
  assert.throws(() => div(frac(1, 2), frac(0, 1)), RangeError);
  assert.deepEqual(equivalents(frac(2, 4), 3), [frac(1, 2), frac(2, 4), frac(3, 6)]);
});

test('mixed numbers and parsing', () => {
  assert.deepEqual(toMixed(frac(7, 3)), { sign: 1, whole: 2, n: 1, d: 3 });
  assert.deepEqual(toMixed(frac(-7, 3)), { sign: -1, whole: 2, n: 1, d: 3 });
  assert.deepEqual(fromMixed(1, 1, 2), { n: 3, d: 2 });
  assert.deepEqual(f('1 1/2').value, { n: 3, d: 2 });
  assert.deepEqual(f('-2 3/5').value, { n: -13, d: 5 });
  assert.deepEqual(f(' 3 / 4 ').value, { n: 3, d: 4 });
  assert.deepEqual(f('−3/4').value, { n: -3, d: 4 });
  assert.deepEqual(f('0,25').value, { n: 25, d: 100 });
  assert.deepEqual(f('5').value, { n: 5, d: 1 });
  assert.throws(() => f('3/0'), RangeError);
  assert.throws(() => f('abc'), RangeError);
});

test('decimal expansion finds repeating part', () => {
  assert.deepEqual(toDecimal(frac(1, 6)), { negative: false, int: '0', fixed: '1', repeat: '6', truncated: false });
  assert.deepEqual(toDecimal(frac(1, 7)).repeat, '142857');
  assert.deepEqual(toDecimal(frac(-5, 4)), { negative: true, int: '1', fixed: '25', repeat: '', truncated: false });
  assert.deepEqual(toDecimal(frac(22, 7)).int, '3');
});

test('simplify steps', () => {
  const r = simplifySteps(frac(36, 48));
  assert.deepEqual(r.result, { n: 3, d: 4 });
  assert.equal(r.gcd, 12);
  assert.deepEqual(r.chain.map((c) => c.by), [2, 2, 3]);
  assert.equal(simplifySteps(frac(3, 4)).steps[0].k, 'alreadySimplest');
});

test('calculator: add/sub with different denominators', () => {
  const r = solve(f('1/4'), '+', f('1/6'));
  assert.deepEqual(r.result, { n: 5, d: 12 });
  assert.deepEqual(kinds(r), ['commonDenominator', 'amplify', 'amplify', 'combine']);
  assert.equal(r.steps[0].lcm, 12);
  const s = solve(f('1 1/2'), '-', f('3/4'));
  assert.deepEqual(s.result, { n: 3, d: 4 });
  assert.equal(s.steps[0].k, 'toImproper');
  const same = solve(f('3/8'), '+', f('7/8'));
  assert.deepEqual(kinds(same), ['sameDenominator', 'combine', 'simplify', 'toMixed']);
  assert.deepEqual(same.mixed, { sign: 1, whole: 1, n: 1, d: 4 });
  const whole = solve(f('1/2'), '+', f('1/2'));
  assert.deepEqual(whole.result, { n: 1, d: 1 });
  assert.ok(kinds(whole).includes('isWhole'));
});

test('calculator: multiply/divide with cross simplification', () => {
  const r = solve(f('4/9'), '*', f('3/8'));
  assert.deepEqual(r.result, { n: 1, d: 6 });
  assert.equal(r.steps[0].k, 'crossSimplify');
  const d = solve(f('2/3'), '/', f('4/5'));
  assert.deepEqual(d.result, { n: 5, d: 6 });
  assert.deepEqual(kinds(d).slice(0, 1), ['reciprocal']);
  assert.throws(() => solve(f('1/2'), '/', f('0')), RangeError);
  assert.throws(() => solve(f('1/2'), '%', f('1/3')), RangeError);
  assert.equal(solve(f('-1/2'), '*', f('1/3')).result.n, -1);
});
