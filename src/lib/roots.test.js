import test from 'node:test';
import assert from 'node:assert/strict';
import { simplifyRoot, isPerfectPower, powerSteps, heronSteps } from './roots.js';
import { frac } from './fraction.js';

test('roots', () => {
  assert.deepEqual([simplifyRoot(72).outside, simplifyRoot(72).inside], [6, 2]);
  assert.equal(simplifyRoot(144).exact, true);
  assert.equal(simplifyRoot(144).outside, 12);
  assert.deepEqual([simplifyRoot(54, 3).outside, simplifyRoot(54, 3).inside], [3, 2]);
  assert.equal(simplifyRoot(-27, 3).outside, -3);
  assert.equal(simplifyRoot(0).outside, 0);
  assert.throws(() => simplifyRoot(-4), RangeError);
  assert.equal(isPerfectPower(1000000, 2), 1000);
  assert.equal(isPerfectPower(50, 2), null);
  assert.ok(Math.abs(heronSteps(2).at(-1).next - Math.SQRT2) < 1e-9);
});

test('powers', () => {
  assert.deepEqual(powerSteps(2, 5).result, frac(32));
  assert.deepEqual(powerSteps(2, -3).result, frac(1, 8));
  assert.deepEqual(powerSteps(frac(2, 3), 2).result, frac(4, 9));
  assert.deepEqual(powerSteps(-2, 3).result, frac(-8));
  assert.deepEqual(powerSteps(7, 0).steps.map((s) => s.k), ['zeroExponent']);
  assert.throws(() => powerSteps(0, 0), RangeError);
});
