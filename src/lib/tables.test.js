import test from 'node:test';
import assert from 'node:assert/strict';
import { table, grid, questions, recordAnswer, weight, pickWeighted, mastered, choices } from './tables.js';
import { createRng } from './rng.js';

test('tables and grid', () => {
  assert.equal(table(7).length, 11);
  assert.deepEqual(table(7)[8], { a: 7, b: 8, product: 56 });
  assert.equal(table(12, { from: 1, to: 12 }).at(-1).product, 144);
  assert.equal(grid(10)[6][7], 56);
});

test('questions are seeded and complete', () => {
  const a = questions([7, 8], { seed: 5 }), b = questions([7, 8], { seed: 5 });
  assert.deepEqual(a, b);
  assert.equal(a.length, 20);
  assert.ok(a.every((q) => q.answer === q.a * q.b));
  assert.deepEqual(questions([3], { mode: 'order', to: 3 }).map((q) => q.b), [1, 2, 3]);
  assert.equal(questions([3], { mode: 'mixed', seed: 1 })[0].key.includes('3'), true);
  assert.throws(() => questions([]), RangeError);
});

test('weak facts come back more often', () => {
  let s = {};
  s = recordAnswer(s, '7x8', false, 6000);
  s = recordAnswer(s, '2x2', true, 900);
  assert.ok(weight(s['7x8']) > weight(s['2x2']));
  assert.ok(weight(undefined) > weight(s['2x2']));
  const list = [{ key: '7x8' }, { key: '2x2' }];
  const rng = createRng(3);
  let hard = 0;
  for (let i = 0; i < 1000; i++) if (pickWeighted(list, s, rng).key === '7x8') hard++;
  assert.ok(hard > 700, `hard=${hard}`);
  assert.equal(mastered({ right: 3, wrong: 0, lastMs: 2000 }), true);
  assert.equal(mastered({ right: 3, wrong: 2, lastMs: 2000 }), false);
});

test('choices contain the answer once', () => {
  for (let seed = 1; seed < 50; seed++) {
    const c = choices(7, 8, 4, seed);
    assert.equal(c.length, 4);
    assert.equal(c.filter((x) => x === 56).length, 1);
    assert.equal(new Set(c).size, 4);
  }
});
