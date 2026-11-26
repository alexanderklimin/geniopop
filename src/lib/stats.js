// Mean, median, mode, range, weighted mean (grade averages) and "what grade do I need". Rounded to avoid float noise.
const r = (x) => Math.round(x * 1e10) / 1e10;

function nums(list) {
  if (!Array.isArray(list) || !list.length) throw new RangeError('Need at least one number');
  for (const x of list) if (!Number.isFinite(x)) throw new RangeError('Not a number');
  return list;
}

export function parseList(text) {
  // "7; 5,5; 6" or "7 5.5 6" or "7, 5, 6" (comma as separator when followed by a space)
  const s = String(text).trim();
  if (!s) return [];
  const parts = s.split(/;|\s+|,(?=\s)|\n/).map((t) => t.trim()).filter(Boolean);
  // "7,5,6" with no spaces: ambiguous; treat commas as separators if more than one comma and no dots
  const expanded = parts.length === 1 && /^\d+(,\d+){2,}$/.test(parts[0]) ? parts[0].split(',') : parts;
  return expanded.map((t) => Number(t.replace(',', '.')));
}

export function mean(list) {
  nums(list);
  const sum = r(list.reduce((s, x) => s + x, 0));
  return { sum, count: list.length, mean: r(sum / list.length) };
}

export function median(list) {
  const s = [...nums(list)].sort((a, b) => a - b), n = s.length;
  return { sorted: s, median: n % 2 ? s[(n - 1) / 2] : r((s[n / 2 - 1] + s[n / 2]) / 2), middle: n % 2 ? [s[(n - 1) / 2]] : [s[n / 2 - 1], s[n / 2]] };
}

export function mode(list) {
  const c = new Map();
  for (const x of nums(list)) c.set(x, (c.get(x) ?? 0) + 1);
  const max = Math.max(...c.values());
  return { modes: max === 1 ? [] : [...c].filter(([, n]) => n === max).map(([x]) => x).sort((a, b) => a - b), times: max };
}

export const range = (list) => { nums(list); return r(Math.max(...list) - Math.min(...list)); };

// items: [{ grade, weight }]; weights in % or credits (any positive numbers)
export function weightedMean(items) {
  if (!items.length) throw new RangeError('Need at least one grade');
  let sw = 0, swx = 0;
  const rows = items.map(({ grade, weight }) => {
    if (!Number.isFinite(grade) || !Number.isFinite(weight) || weight < 0) throw new RangeError('Bad row');
    sw += weight; swx += grade * weight;
    return { grade, weight, product: r(grade * weight) };
  });
  if (sw === 0) throw new RangeError('Weights add up to 0');
  return { rows, sumWeights: r(sw), sumProducts: r(swx), mean: r(swx / sw) };
}

// Grade needed on the remaining weight to reach `target` (weights in %, total 100).
export function neededGrade(items, target, remainingWeight) {
  const done = items.length ? weightedMean(items) : { sumProducts: 0, sumWeights: 0 };
  if (!(remainingWeight > 0)) throw new RangeError('Remaining weight must be > 0');
  const total = done.sumWeights + remainingWeight;
  return { needed: r((target * total - done.sumProducts) / remainingWeight), doneWeight: done.sumWeights, doneProducts: done.sumProducts, total: r(total) };
}

// Grading scales of Spanish-speaking school systems (min, max, pass mark)
export const SCALES = {
  es: { min: 0, max: 10, pass: 5 },
  mx: { min: 0, max: 10, pass: 6 },
  ar: { min: 1, max: 10, pass: 6 },
  cl: { min: 1, max: 7, pass: 4 },
  co: { min: 0, max: 5, pass: 3 },
  pe: { min: 0, max: 20, pass: 11 },
  ve: { min: 0, max: 20, pass: 10 },
  ec: { min: 0, max: 10, pass: 7 },
};
