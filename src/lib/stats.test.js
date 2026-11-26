import test from 'node:test';
import assert from 'node:assert/strict';
import { parseList, mean, median, mode, range, weightedMean, neededGrade } from './stats.js';

test('parse lists in Spanish formats', () => {
  assert.deepEqual(parseList('7; 5,5; 6'), [7, 5.5, 6]);
  assert.deepEqual(parseList('7 5.5 6'), [7, 5.5, 6]);
  assert.deepEqual(parseList('7, 5, 6'), [7, 5, 6]);
  assert.deepEqual(parseList('4,5'), [4.5]);
  assert.deepEqual(parseList('7,5,6'), [7, 5, 6]);
  assert.deepEqual(parseList(''), []);
});

test('mean, median, mode, range', () => {
  assert.deepEqual(mean([7, 8, 6, 9]), { sum: 30, count: 4, mean: 7.5 });
  assert.equal(mean([0.1, 0.2]).mean, 0.15);
  assert.equal(median([5, 1, 3]).median, 3);
  assert.equal(median([4, 1, 3, 2]).median, 2.5);
  assert.deepEqual(mode([1, 2, 2, 3, 3]).modes, [2, 3]);
  assert.deepEqual(mode([1, 2, 3]).modes, []);
  assert.equal(range([3, 9, 4]), 6);
  assert.throws(() => mean([]), RangeError);
});

test('weighted grade average and needed grade', () => {
  const w = weightedMean([{ grade: 6, weight: 30 }, { grade: 5, weight: 30 }, { grade: 4, weight: 40 }]);
  assert.equal(w.mean, 4.9);
  // Chile: 5.0 (30 %) and 4.0 (30 %) done, final exam 40 %, want 4.0
  const n = neededGrade([{ grade: 5, weight: 30 }, { grade: 4, weight: 30 }], 4, 40);
  assert.equal(n.needed, 3.25);
  assert.equal(neededGrade([], 6, 100).needed, 6);
  assert.throws(() => weightedMean([{ grade: 5, weight: 0 }]), RangeError);
});
