import test from 'node:test';
import assert from 'node:assert/strict';
import { longDivision, divideWithRemainder } from './longdivision.js';

test('exact integer division', () => {
  const r = longDivision(7865, 5);
  assert.equal(r.quotient.int, '1573');
  assert.equal(r.remainder, 0);
  assert.deepEqual(r.steps.map((s) => s.partial), [7, 28, 36, 15]);
  assert.deepEqual(r.steps.map((s) => s.digit), [1, 5, 7, 3]);
  assert.equal(r.steps[0].broughtDown, null);
  assert.equal(r.steps[1].broughtDown, 8);
});

test('first step takes enough digits', () => {
  const r = longDivision(125, 5);
  assert.equal(r.quotient.int, '25');
  assert.deepEqual(r.steps.map((s) => [s.col, s.partial]), [[1, 12], [2, 25]]);
  const z = longDivision(408, 4);
  assert.equal(z.quotient.int, '102');
  assert.deepEqual(z.steps.map((s) => s.digit), [1, 0, 2]);
});

test('remainder and dividend smaller than divisor', () => {
  const r = longDivision(17, 5);
  assert.equal(r.quotient.int, '3');
  assert.equal(r.remainder, 2);
  const s = longDivision(3, 5);
  assert.equal(s.quotient.int, '0');
  assert.equal(s.remainder, 3);
  assert.deepEqual(divideWithRemainder(17, 5), { quotient: 3, remainder: 2, check: { divisor: 5, quotient: 3, remainder: 2, dividend: 17 } });
});

test('decimals, repeating and decimal dividend', () => {
  const r = longDivision(10, 3, { decimals: 4 });
  assert.equal(r.quotient.int, '3');
  assert.equal(r.quotient.dec, '3');
  assert.deepEqual(r.quotient.repeating, { start: 0, end: 1 });
  const h = longDivision(1, 4, { decimals: 5 });
  assert.equal(h.quotient.dec, '25');
  assert.equal(h.exact, true);
  const s = longDivision(1, 6, { decimals: 6 });
  assert.equal(s.quotient.dec, '16');
  assert.deepEqual(s.quotient.repeating, { start: 1, end: 2 });
  const n = longDivision(1, 7, { decimals: 10 });
  assert.equal(n.quotient.dec, '142857');
  const t = longDivision(2, 3, { decimals: 3, stopOnRepeat: false });
  assert.equal(t.quotient.dec, '666');
  const d = longDivision('12,5', 5);
  assert.equal(`${d.quotient.int}.${d.quotient.dec}`, '2.5');
  const e = longDivision('7.50', 3);
  assert.equal(`${e.quotient.int}.${e.quotient.dec}`, '2.50');
  assert.throws(() => longDivision(10, 0), RangeError);
  assert.throws(() => longDivision(-4, 2), RangeError);
});
