import test from 'node:test';
import assert from 'node:assert/strict';
import { solveExpression, parse } from './expr.js';

const after = (s, o) => solveExpression(s, o).steps.map((x) => x.after);
const value = (s) => { const r = solveExpression(s).result; return r.d === 1 ? r.n : `${r.n}/${r.d}`; };

test('precedence', () => {
  assert.equal(value('2 + 3 × 4'), 14);
  assert.equal(value('(2 + 3) × 4'), 20);
  assert.equal(value('10 - 2 - 3'), 5);
  assert.equal(value('48 : 6 : 2'), 4);
  assert.equal(value('2^3^2'), 512);
  assert.equal(value('-3^2'), -9);
  assert.equal(value('(-3)^2'), 9);
  assert.equal(value('2(3+4)'), 14);
  assert.equal(value('[2 + (3 - 1)] × {4 ÷ 2}'), 8);
  assert.equal(value('1/2 + 1/3'), '5/6');
  assert.equal(value('5 - -3'), 8);
  assert.equal(value('2 ^ -1'), '1/2');
});

test('one operation per step, school order', () => {
  assert.deepEqual(after('2 + 3 × (8 − 2)^2'), ['2 + 3 × 6^2', '2 + 3 × 36', '2 + 108', '110']);
  assert.deepEqual(after('12 : 3 × 2 + 1'), ['4 × 2 + 1', '8 + 1', '9']);
  assert.deepEqual(after('7 · 2 : 7', { mul: '·', div: ':' }), ['14 : 7', '2']);
  assert.deepEqual(after('[5 − (1 + 2)] × 3'), ['[5 − 3] × 3', '2 × 3', '6']);
  assert.deepEqual(solveExpression('3 + 4 × 2').steps.map((s) => s.kind), ['mulDiv', 'addSub']);
  assert.equal(solveExpression('5 − (−3)').start, '5 − (−3)');
});

test('decimals stay decimals', () => {
  assert.deepEqual(after('0,5 + 0,25 × 2', { decimalSep: ',' }), ['0,5 + 0,5', '1']);
  assert.equal(value('1.5 * 2'), 3);
});

test('errors carry a code', () => {
  const code = (s) => { try { solveExpression(s); } catch (e) { return e.code; } return null; };
  assert.equal(code('5 ÷ 0'), 'divisionByZero');
  assert.equal(code('(2 + 3'), 'missingClose');
  assert.equal(code('2 + 3)'), 'extraClose');
  assert.equal(code('(2 + 3]'), 'wrongClose');
  assert.equal(code('2 + a'), 'badChar');
  assert.equal(code(''), 'empty');
  assert.equal(code('2 +'), 'unexpectedEnd');
  assert.equal(code('0^0'), 'zeroToZero');
  assert.equal(code('2^(1/2)'), 'fractionalExponent');
  assert.doesNotThrow(() => parse('1+'.repeat(50) + '1'));
});

test('brackets around negatives and fraction literals', () => {
  assert.equal(solveExpression('3 - (-2) * (-4)').start, '3 − (−2) × (−4)');
  assert.equal(solveExpression('-2 * 3').start, '−2 × 3');
  assert.equal(solveExpression('(-2)^2').start, '(−2)^2');
  assert.equal(solveExpression('10 - (2 - 3)').start, '10 − (2 − 3)');
  assert.deepEqual(after('1/2 × 2/3 + 1/6'), ['1/3 + 1/6', '1/2']);
  assert.equal(value('6 / 3'), 2);
  assert.equal(value('1/2 : 1/4'), 2);
});
