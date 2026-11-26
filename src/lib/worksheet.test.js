import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, TOPICS, PRESETS, hasCarry, hasBorrow } from './worksheet.js';
import { fromRoman, toRoman } from './roman.js';

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
