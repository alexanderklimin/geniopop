import test from 'node:test';
import assert from 'node:assert/strict';
import { percentOf, whatPercent, wholeFromPart, percentChange, increase, decrease, removeIncrease, clean } from './percent.js';

test('percent modes', () => {
  assert.equal(percentOf(15, 80).result, 12);
  assert.equal(percentOf('12,5', 40).result, 5);
  assert.equal(whatPercent(12, 80).result, 15);
  assert.equal(wholeFromPart(12, 15).result, 80);
  assert.equal(percentChange(80, 100).result, 25);
  assert.equal(percentChange(100, 80).result, -20);
  assert.equal(increase(100, 21).result, 121);
  assert.equal(decrease(80, 25).result, 60);
  assert.equal(removeIncrease(121, 21).result, 100);
  assert.equal(clean(0.1 + 0.2), 0.3);
  assert.equal(percentOf(7, 3).result, 0.21);
  assert.throws(() => whatPercent(1, 0), RangeError);
  assert.throws(() => percentOf('x', 3), RangeError);
});
