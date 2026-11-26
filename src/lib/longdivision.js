// Long division step by step. Output is layout-free: each step says which column it ends at,
// so the same data can be drawn Spanish-style (divisor on the right), German-style (12345 : 5 =)
// or with the US/Mexican bracket. See LAYOUTS in locale.js.

const MAX_DIGITS = 15;

// longDivision(7865, 5) or longDivision(10, 3, { decimals: 4 })
// dividend: integer ≥ 0 or decimal string ("12,5" / "12.5"); divisor: integer ≥ 1.
export function longDivision(dividend, divisor, { decimals = 0, stopOnRepeat = true } = {}) {
  if (!Number.isSafeInteger(divisor) || divisor < 1) throw new RangeError('Divisor must be an integer ≥ 1');
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) throw new RangeError('decimals 0..20');
  const text = String(dividend).trim().replace(',', '.');
  const m = text.match(/^(\d+)(?:\.(\d+))?$/);
  if (!m) throw new RangeError(`Dividend must be a number ≥ 0: ${dividend}`);
  const intDigits = m[1].replace(/^0+(?=\d)/, '');
  const givenDecimals = m[2] ?? '';
  if (intDigits.length + givenDecimals.length > MAX_DIGITS) throw new RangeError('Dividend too long');
  // decimal places computed after the point = max(given, requested)
  const places = Math.max(givenDecimals.length, decimals);
  const digits = (intDigits + givenDecimals.padEnd(places, '0')).split('').map(Number);
  const pointAfter = intDigits.length; // the decimal point sits after this many digits
  const mandatoryEnd = pointAfter + givenDecimals.length - 1; // last column that is always worked
  const steps = [];
  const qDigits = [];
  const seen = new Map(); // remainder → column, only after the mandatory part
  let rem = 0, started = false, repeating = null;
  for (let i = 0; i < digits.length; i++) {
    const partial = rem * 10 + digits[i];
    if (!Number.isSafeInteger(partial)) throw new RangeError('Number too large');
    const q = Math.floor(partial / divisor);
    rem = partial - q * divisor;
    qDigits.push(q);
    // School method: the first step takes as many digits as needed so that partial ≥ divisor
    if (!started && q === 0 && i < pointAfter - 1) continue;
    steps.push({ col: i, partial, digit: q, product: q * divisor, remainder: rem, broughtDown: started ? digits[i] : null, afterPoint: i >= pointAfter });
    started = true;
    if (i >= mandatoryEnd) {
      if (rem === 0) break;
      if (stopOnRepeat) {
        if (seen.has(rem)) { repeating = { start: seen.get(rem) + 1 - pointAfter, end: i + 1 - pointAfter }; break; }
        seen.set(rem, i);
      }
    }
  }
  const intPart = qDigits.slice(0, pointAfter).join('').replace(/^0+(?=\d)/, '') || '0';
  const decPart = qDigits.slice(pointAfter).join('');
  return {
    dividend: { int: intDigits, dec: givenDecimals, digits, pointAfter },
    divisor,
    quotient: { int: intPart, dec: decPart, repeating },
    remainder: rem,
    exact: rem === 0,
    steps,
  };
}

// Plain integer division with remainder: 17 ÷ 5 = 3 r 2, check 5·3 + 2 = 17
export function divideWithRemainder(a, b) {
  if (!Number.isSafeInteger(a) || a < 0 || !Number.isSafeInteger(b) || b < 1) throw new RangeError('a ≥ 0, b ≥ 1');
  const q = Math.floor(a / b);
  return { quotient: q, remainder: a - q * b, check: { divisor: b, quotient: q, remainder: a - q * b, dividend: a } };
}
