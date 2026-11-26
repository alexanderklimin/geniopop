import test from 'node:test';
import assert from 'node:assert/strict';
import { gcd, lcm, gcdAll, lcmAll, isPrime, factorLadder, primeFactors, factorList, divisors, gcdLcmSteps, euclidSteps } from './numtheory.js';

test('gcd and lcm', () => {
  assert.equal(gcd(84, 60), 12);
  assert.equal(gcd(-84, 60), 12);
  assert.equal(gcd(0, 7), 7);
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(0, 6), 0);
  assert.equal(gcdAll([12, 18, 30]), 6);
  assert.equal(lcmAll([4, 6, 10]), 60);
  assert.throws(() => gcd(1.5, 2), RangeError);
});

test('primes and factorization ladder', () => {
  assert.deepEqual([2, 3, 4, 97, 1, 0, 91].map(isPrime), [true, true, false, true, false, false, false]);
  assert.deepEqual(factorLadder(360).map((r) => r.prime), [2, 2, 2, 3, 3, 5, null]);
  assert.deepEqual(factorLadder(360).map((r) => r.value), [360, 180, 90, 45, 15, 5, 1]);
  assert.deepEqual(primeFactors(360), { 2: 3, 3: 2, 5: 1 });
  assert.deepEqual(factorList(97), [[97, 1]]);
  assert.deepEqual(divisors(12), [1, 2, 3, 4, 6, 12]);
  assert.deepEqual(divisors(16), [1, 2, 4, 8, 16]);
  assert.throws(() => factorLadder(1), RangeError);
});

test('school gcd/lcm steps', () => {
  const r = gcdLcmSteps([12, 18]);
  assert.equal(r.gcd, 6);
  assert.equal(r.lcm, 36);
  assert.deepEqual(r.gcdFactors, [[2, 1], [3, 1]]);
  assert.deepEqual(r.lcmFactors, [[2, 2], [3, 2]]);
  assert.equal(gcdLcmSteps([8, 15]).coprime, true);
  assert.equal(gcdLcmSteps([1, 5]).lcm, 5);
  assert.equal(gcdLcmSteps([20, 30, 45]).lcm, 180);
  assert.throws(() => gcdLcmSteps([5]), RangeError);
  assert.throws(() => gcdLcmSteps([0, 5]), RangeError);
});

test('euclid', () => {
  const r = euclidSteps(60, 84);
  assert.equal(r.gcd, 12);
  assert.deepEqual(r.rows[0], { a: 84, b: 60, q: 1, r: 24 });
  assert.equal(r.rows.at(-1).r, 0);
});
