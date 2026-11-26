// Percentage calculator: every mode returns { result, steps } with plain numbers.
// Rounding removes float noise (0.1 + 0.2) but keeps up to 10 significant digits.

export function clean(x) {
  if (!Number.isFinite(x)) throw new RangeError('Result is not a finite number');
  return Number.parseFloat(x.toPrecision(12)) || 0;
}

function num(x, name) {
  if (typeof x === 'string') x = Number(x.trim().replace(',', '.'));
  if (!Number.isFinite(x)) throw new RangeError(`${name} must be a number`);
  return x;
}

// 15 % de 80 = 12
export function percentOf(p, x) {
  p = num(p, 'p'); x = num(x, 'x');
  const result = clean((p * x) / 100);
  return { result, steps: [{ k: 'multiply', p, x, product: clean(p * x) }, { k: 'divide100', value: clean(p * x), result }] };
}

// 12 es el ? % de 80 → 15
export function whatPercent(part, whole) {
  part = num(part, 'part'); whole = num(whole, 'whole');
  if (whole === 0) throw new RangeError('Whole cannot be zero');
  const ratio = clean(part / whole), result = clean((part / whole) * 100);
  return { result, steps: [{ k: 'ratio', part, whole, ratio }, { k: 'times100', ratio, result }] };
}

// 12 es el 15 % de ? → 80
export function wholeFromPart(part, p) {
  part = num(part, 'part'); p = num(p, 'p');
  if (p === 0) throw new RangeError('Percent cannot be zero');
  const result = clean((part * 100) / p);
  return { result, steps: [{ k: 'times100', value: part, product: clean(part * 100) }, { k: 'divideP', value: clean(part * 100), p, result }] };
}

// Change from a to b: +25 % / −20 %
export function percentChange(from, to) {
  from = num(from, 'from'); to = num(to, 'to');
  if (from === 0) throw new RangeError('Start value cannot be zero');
  const diff = clean(to - from), result = clean((diff / Math.abs(from)) * 100);
  return { result, direction: Math.sign(diff), steps: [{ k: 'difference', from, to, diff }, { k: 'ratio', part: diff, whole: Math.abs(from), ratio: clean(diff / Math.abs(from)) }, { k: 'times100', result }] };
}

// Price + IVA / aumento: x · (1 + p/100)
export function increase(x, p) {
  x = num(x, 'x'); p = num(p, 'p');
  const amount = clean((x * p) / 100), result = clean(x + amount);
  return { result, amount, factor: clean(1 + p / 100), steps: [{ k: 'percentOf', p, x, amount }, { k: 'add', x, amount, result }] };
}

// Descuento / rebaja: x · (1 − p/100)
export function decrease(x, p) {
  x = num(x, 'x'); p = num(p, 'p');
  const amount = clean((x * p) / 100), result = clean(x - amount);
  return { result, amount, factor: clean(1 - p / 100), steps: [{ k: 'percentOf', p, x, amount }, { k: 'subtract', x, amount, result }] };
}

// Price was raised by p % (e.g. includes IVA 21 %) → original price = x / (1 + p/100)
export function removeIncrease(x, p) {
  x = num(x, 'x'); p = num(p, 'p');
  if (p === -100) throw new RangeError('p cannot be −100');
  const factor = clean(1 + p / 100), result = clean(x / factor);
  return { result, amount: clean(x - result), factor, steps: [{ k: 'factor', p, factor }, { k: 'divideFactor', x, factor, result }] };
}
