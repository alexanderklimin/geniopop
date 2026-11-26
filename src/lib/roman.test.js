import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman, toRomanSteps, romanTable } from './roman.js';

test('to roman', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(4), 'IV');
  assert.equal(toRoman(9), 'IX');
  assert.equal(toRoman(14), 'XIV');
  assert.equal(toRoman(40), 'XL');
  assert.equal(toRoman(1987), 'MCMLXXXVII');
  assert.equal(toRoman(2026), 'MMXXVI');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
  assert.throws(() => toRoman(0), RangeError);
  assert.throws(() => toRoman(4000), RangeError);
  assert.deepEqual(toRomanSteps(1987).parts.map((p) => p.roman), ['M', 'CM', 'LXXX', 'VII']);
});

test('from roman, strict', () => {
  assert.equal(fromRoman('mcmlxxxvii').value, 1987);
  assert.deepEqual(fromRoman('XIV').steps.map((s) => s.k), ['add', 'subtract']);
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)).value, n);
  assert.equal(catchCode(() => fromRoman('IIII')), 'notStandard');
  assert.equal(catchCode(() => fromRoman('IC')), 'notStandard');
  assert.equal(catchCode(() => fromRoman('XA')), 'badSymbol');
  assert.equal(catchCode(() => fromRoman('')), 'empty');
  assert.equal(catchCode(() => fromRoman('MMMM')), 'tooBig');
  assert.equal(romanTable(1, 100).length, 100);
});

function catchCode(fn) {
  try { fn(); } catch (e) { return e.code; }
  return null;
}
