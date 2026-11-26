// Multiplication tables and the trainer logic (order, shuffled, timed, weak facts first).
// Progress lives only in the browser (localStorage) — this module is pure and does not store anything.

import { createRng } from './rng.js';

export function table(n, { from = 0, to = 10 } = {}) {
  if (!Number.isInteger(n) || n < 0 || n > 100) throw new RangeError('Table 0..100');
  return Array.from({ length: to - from + 1 }, (_, i) => ({ a: n, b: from + i, product: n * (from + i) }));
}

// Pythagorean grid (tabla pitagórica / Einmaleins-Tafel / tavola pitagorica)
export const grid = (size = 10) => Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => (r + 1) * (c + 1)));

export const factKey = (a, b) => `${a}x${b}`;

// Questions for chosen tables. mode: 'order' | 'shuffle' | 'mixed' (both a×b and b×a)
export function questions(tables, { mode = 'shuffle', from = 1, to = 10, seed } = {}) {
  if (!tables.length) throw new RangeError('Pick at least one table');
  const rng = createRng(seed);
  let list = [];
  for (const t of tables) for (let b = from; b <= to; b++) list.push(mode === 'mixed' && rng.next() < 0.5 ? { a: b, b: t } : { a: t, b });
  if (mode !== 'order') list = rng.shuffle(list);
  return list.map((q) => ({ ...q, answer: q.a * q.b, key: factKey(Math.min(q.a, q.b), Math.max(q.a, q.b)) }));
}

// Stats shape: { '3x7': { right: 4, wrong: 2, lastMs: 2300 } }. Pure update, returns a new object.
export function recordAnswer(stats, key, correct, ms) {
  const cur = stats[key] ?? { right: 0, wrong: 0, lastMs: null };
  return { ...stats, [key]: { right: cur.right + (correct ? 1 : 0), wrong: cur.wrong + (correct ? 0 : 1), lastMs: Number.isFinite(ms) ? Math.round(ms) : cur.lastMs } };
}

// Weight: unseen facts and mistakes come back more often; slow answers count as half a mistake.
export function weight(stat) {
  if (!stat) return 3;
  const slow = stat.lastMs && stat.lastMs > 5000 ? 0.5 : 0;
  return Math.max(0.3, 1 + 2 * stat.wrong + slow - 0.5 * stat.right);
}

export function pickWeighted(list, stats, rng) {
  const ws = list.map((q) => weight(stats[q.key]));
  let x = rng.next() * ws.reduce((s, w) => s + w, 0);
  for (let i = 0; i < list.length; i++) { x -= ws[i]; if (x <= 0) return list[i]; }
  return list[list.length - 1];
}

// "Mastered" = at least 3 right, no more than 1 wrong, answer under 5 s
export const mastered = (stat) => !!stat && stat.right >= 3 && stat.wrong <= 1 && (stat.lastMs ?? 0) <= 5000;

// Multiple-choice answers for games: plausible distractors (neighbouring facts, ±a, ±b)
export function choices(a, b, count = 4, seed) {
  const rng = createRng(seed);
  const right = a * b;
  const pool = new Set([right + a, right - a, right + b, right - b, (a + 1) * (b + 1), a * (b + 2), right + 10, right - 10, right + 1, right - 1].filter((x) => x >= 0 && x !== right));
  const wrong = rng.shuffle([...pool]).slice(0, count - 1);
  return rng.shuffle([right, ...wrong]);
}
