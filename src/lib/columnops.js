// Column addition, subtraction (two school methods) and multiplication, step by step.
// Columns are counted from the right: col 0 = units. Output is layout-free; renderers draw the grid.

const digitsR = (n) => String(n).split('').reverse().map(Number);
function check(...ns) {
  for (const n of ns) if (!Number.isSafeInteger(n) || n < 0 || n > 1e12) throw new RangeError('Whole numbers from 0 to 10^12');
}

// 478 + 356: units 8+6=14 → write 4 carry 1, …
export function addColumns(a, b) {
  check(a, b);
  const x = digitsR(a), y = digitsR(b);
  const steps = [];
  let carry = 0;
  const width = Math.max(x.length, y.length);
  for (let c = 0; c < width; c++) {
    const da = x[c] ?? 0, db = y[c] ?? 0, cin = carry;
    const sum = da + db + cin;
    carry = sum >= 10 ? 1 : 0;
    steps.push({ col: c, a: da, b: db, carryIn: cin, sum, write: sum % 10, carryOut: carry });
  }
  if (carry) steps.push({ col: width, a: 0, b: 0, carryIn: carry, sum: carry, write: carry, carryOut: 0, final: true });
  return { a, b, result: a + b, steps };
}

// method 'borrow' (LatAm/US: pedir prestado — the next minuend digit goes down by 1)
// method 'compensate' (Spain: llevando — +10 to this minuend digit, +1 to the next subtrahend digit)
export function subColumns(a, b, method = 'borrow') {
  check(a, b);
  if (b > a) throw new RangeError('Subtrahend larger than minuend');
  const x = digitsR(a), y = digitsR(b);
  const steps = [];
  const top = [...x];
  let extra = 0; // compensate: carried +1 on the subtrahend
  for (let c = 0; c < x.length; c++) {
    const db = (y[c] ?? 0) + (method === 'compensate' ? extra : 0);
    extra = 0;
    let da = top[c], borrowedFrom = null, plus10 = false;
    if (da < db) {
      plus10 = true;
      if (method === 'borrow') {
        // find the next non-zero digit to borrow from (zeros become 9)
        let k = c + 1;
        while (top[k] === 0) { top[k] = 9; k++; }
        top[k] -= 1;
        borrowedFrom = k;
      } else extra = 1;
      da += 10;
    }
    steps.push({ col: c, top: da, bottom: db, subtrahendDigit: y[c] ?? 0, plus10, borrowedFrom, carryNext: method === 'compensate' && plus10 ? 1 : 0, write: da - db, after: [...top] });
  }
  return { a, b, result: a - b, method, steps };
}

// 234 × 56: one partial product per digit of b (right to left), then their sum.
export function mulColumns(a, b) {
  check(a, b);
  if (a > 1e8 || b > 1e5) throw new RangeError('Numbers too large');
  const x = digitsR(a), y = digitsR(b);
  const partials = y.map((db, row) => {
    const steps = [];
    let carry = 0;
    for (let c = 0; c < x.length; c++) {
      const prod = x[c] * db + carry;
      steps.push({ col: c, a: x[c], b: db, carryIn: carry, prod, write: prod % 10, carryOut: Math.floor(prod / 10) });
      carry = Math.floor(prod / 10);
    }
    return { digit: db, row, value: a * db, shifted: a * db * 10 ** row, steps, lastCarry: carry };
  });
  return { a, b, result: a * b, partials, needsSum: y.length > 1 };
}
