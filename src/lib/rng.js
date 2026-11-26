// Seeded random numbers, so a worksheet or quiz can be rebuilt from its URL (?seed=123).

export function createRng(seed = Date.now()) {
  let s = (Number(seed) >>> 0) || 1;
  const next = () => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min, max) => {
    if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) throw new RangeError(`Bad range ${min}..${max}`);
    return min + Math.floor(next() * (max - min + 1));
  };
  const pick = (list) => {
    if (!list.length) throw new RangeError('Empty list');
    return list[Math.floor(next() * list.length)];
  };
  const shuffle = (list) => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  return { next, int, pick, shuffle };
}
