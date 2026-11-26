import test from 'node:test';
import assert from 'node:assert/strict';
import { addColumns, subColumns, mulColumns } from './columnops.js';

test('column addition with carries', () => {
  const r = addColumns(478, 356);
  assert.equal(r.result, 834);
  assert.deepEqual(r.steps.map((s) => [s.write, s.carryOut]), [[4, 1], [3, 1], [8, 0]]);
  const f = addColumns(999, 1);
  assert.deepEqual(f.steps.map((s) => s.write), [0, 0, 0, 1]);
  assert.equal(f.steps.at(-1).final, true);
});

test('subtraction: borrowing across zeros (LatAm)', () => {
  const r = subColumns(503, 178, 'borrow');
  assert.equal(r.result, 325);
  assert.deepEqual(r.steps.map((s) => s.write), [5, 2, 3]);
  assert.equal(r.steps[0].plus10, true);
  assert.equal(r.steps[0].borrowedFrom, 2); // the 0 becomes 9, the 5 becomes 4
  assert.deepEqual(r.steps[0].after, [13 - 10, 9, 4]);
});

test('subtraction: compensation (Spain, llevando)', () => {
  const r = subColumns(503, 178, 'compensate');
  assert.deepEqual(r.steps.map((s) => [s.top, s.bottom, s.write]), [[13, 8, 5], [10, 8, 2], [5, 2, 3]]);
  assert.deepEqual(r.steps.map((s) => s.carryNext), [1, 1, 0]);
  for (let i = 0; i < 300; i++) {
    const a = Math.floor(Math.random() * 100000), b = Math.floor(Math.random() * (a + 1));
    for (const m of ['borrow', 'compensate']) {
      const s = subColumns(a, b, m);
      assert.equal(Number(s.steps.map((x) => x.write).reverse().join('')), a - b, `${a}-${b} ${m}`);
    }
  }
  assert.throws(() => subColumns(3, 5), RangeError);
});

test('column multiplication', () => {
  const r = mulColumns(234, 56);
  assert.equal(r.result, 13104);
  assert.deepEqual(r.partials.map((p) => p.value), [1404, 1170]);
  assert.deepEqual(r.partials[0].steps.map((s) => [s.write, s.carryOut]), [[4, 2], [0, 2], [4, 1]]);
  assert.equal(r.partials[0].lastCarry, 1);
  assert.equal(mulColumns(7, 8).needsSum, false);
  for (let i = 0; i < 200; i++) {
    const a = Math.floor(Math.random() * 10000), b = Math.floor(Math.random() * 1000);
    assert.equal(mulColumns(a, b).partials.reduce((s, p) => s + p.shifted, 0), a * b);
  }
});
