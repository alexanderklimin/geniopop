import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, TOPICS, PRESETS, hasCarry, hasBorrow } from './worksheet.js';
import { fromRoman, toRoman } from './roman.js';
import { solveExpression } from './expr.js';

test('carry and borrow detection', () => {
  assert.equal(hasCarry(25, 34), false);
  assert.equal(hasCarry(25, 37), true);
  assert.equal(hasCarry(150, 60), true);
  assert.equal(hasBorrow(53, 21), false);
  assert.equal(hasBorrow(53, 27), true);
  assert.equal(hasBorrow(100, 1), true);
});

test('same seed, same sheet', () => {
  assert.deepEqual(generate('add', { seed: 42, digits: 3 }), generate('add', { seed: 42, digits: 3 }));
  assert.notDeepEqual(generate('add', { seed: 42 }).problems, generate('add', { seed: 43 }).problems);
});

test('constraints are respected', () => {
  const noCarry = generate('add', { digits: 2, carry: 'none', count: 30 }).problems;
  assert.ok(noCarry.every((p) => !hasCarry(...p.operands) && p.answer === p.operands[0] + p.operands[1]));
  const borrow = generate('sub', { digits: 3, borrow: 'force', count: 30 }).problems;
  assert.ok(borrow.every((p) => hasBorrow(...p.operands) && p.answer >= 0));
  const exact = generate('div', { count: 30 }).problems;
  assert.ok(exact.every((p) => p.operands[0] === p.operands[1] * p.answer && p.remainder === 0));
  const rem = generate('div', { remainder: true, count: 30 }).problems;
  assert.ok(rem.every((p) => p.remainder > 0 && p.remainder < p.operands[1]));
  const pct = generate('percent', { count: 30 }).problems;
  assert.ok(pct.every((p) => Number.isInteger(p.answer)));
  const fr = generate('fraction', { ops: ['-'], count: 30 }).problems;
  assert.ok(fr.every((p) => p.answer.n >= 0));
  const rom = generate('roman', { count: 30, max: 3999 }).problems;
  assert.ok(rom.every((p) => (p.op === 'toRoman' ? fromRoman(p.answer).value === p.operands[0] : toRoman(p.answer) === p.operands[0])));
  assert.throws(() => generate('nope'), RangeError);
});

test('every preset builds a sheet', () => {
  for (const [grade, list] of Object.entries(PRESETS)) {
    for (const { topic, ...params } of list) {
      assert.ok(TOPICS.includes(topic), topic);
      assert.equal(generate(topic, { ...params, count: 20, seed: Number(grade) }).problems.length, 20, `${grade} ${topic}`);
    }
  }
});

test('missing-factor problems are not repeated', () => {
  const ps = generate('missingFactor', { tables: [7], count: 6, seed: 8 }).problems;
  assert.equal(new Set(ps.map((p) => p.result)).size, 6);
  assert.ok(ps.every((p) => p.operands[0] * p.answer === p.result));
});

test('combined operations: whole, non-negative answers that match the solver', () => {
  for (const level of [1, 2, 3]) {
    const ps = generate('combined', { level, count: 20, seed: level }).problems;
    for (const p of ps) {
      const r = solveExpression(p.operands[0]);
      assert.equal(r.result.d, 1, p.operands[0]);
      assert.equal(r.result.n, p.answer, p.operands[0]);
      assert.ok(p.answer >= 0);
    }
  }
});

test('powers and roots have whole answers', () => {
  for (const p of generate('power', { count: 30, seed: 9 }).problems) {
    if (p.op === 'sqrt') assert.equal(p.answer * p.answer, p.operands[0]);
    else assert.equal(p.operands[0] ** p.operands[1], p.answer);
  }
});

test('averages are whole numbers', () => {
  for (const p of generate('average', { count: 20, seed: 4 }).problems) assert.equal(p.operands.reduce((a, b) => a + b, 0) / p.operands.length, p.answer);
});

test('prime sheet answers', () => {
  for (const p of generate('prime', { count: 30, seed: 2 }).problems) {
    if (p.answer === 'primo') assert.ok([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(p.operands[0]));
    else assert.equal(p.answer.split(' · ').reduce((acc, t) => { const [b, e = 1] = t.split('^').map(Number); return acc * b ** e; }, 1), p.operands[0]);
  }
});
