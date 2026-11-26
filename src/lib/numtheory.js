// GCD, LCM and prime factorization, with the steps a school uses (division ladder and factor method).
// Numbers stay within Number.MAX_SAFE_INTEGER; inputs are checked, never silently rounded.

export const MAX_FACTOR = 1e12; // trial division stays fast on weak phones up to here

export function assertInt(n, name = 'n') {
  if (!Number.isSafeInteger(n)) throw new RangeError(`${name} must be a safe integer: ${n}`);
  return n;
}

export function gcd(a, b) {
  assertInt(a, 'a'); assertInt(b, 'b');
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a, b) {
  assertInt(a, 'a'); assertInt(b, 'b');
  if (a === 0 || b === 0) return 0;
  const r = Math.abs(a / gcd(a, b) * b);
  if (!Number.isSafeInteger(r)) throw new RangeError('LCM too large');
  return r;
}

export const gcdAll = (nums) => nums.reduce((g, n) => gcd(g, n), 0);
export const lcmAll = (nums) => nums.reduce((l, n) => lcm(l, n), 1);

export function isPrime(n) {
  assertInt(n);
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;
  for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false;
  return true;
}

// Division ladder: 360 | 2 → 180 | 2 → 90 | 2 → 45 | 3 → 15 | 3 → 5 | 5 → 1
export function factorLadder(n) {
  assertInt(n);
  if (n < 2) throw new RangeError('Factorization needs n ≥ 2');
  if (n > MAX_FACTOR) throw new RangeError(`n > ${MAX_FACTOR}`);
  const rows = [];
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    while (m % p === 0) { rows.push({ value: m, prime: p }); m /= p; }
  }
  if (m > 1) rows.push({ value: m, prime: m });
  rows.push({ value: 1, prime: null });
  return rows;
}

// { 2: 3, 3: 2, 5: 1 } for 360
export function primeFactors(n) {
  const out = {};
  for (const { prime } of factorLadder(n)) if (prime) out[prime] = (out[prime] ?? 0) + 1;
  return out;
}

// Ordered [[2,3],[3,2],[5,1]] — for display "2³ · 3² · 5"
export const factorList = (n) => Object.entries(primeFactors(n)).map(([p, e]) => [Number(p), e]).sort((a, b) => a[0] - b[0]);

export function divisors(n) {
  assertInt(n);
  if (n < 1) throw new RangeError('n ≥ 1');
  const small = [], large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) { small.push(i); if (i !== n / i) large.unshift(n / i); }
  }
  return [...small, ...large];
}

function checkList(nums) {
  if (!Array.isArray(nums) || nums.length < 2) throw new RangeError('Need at least two numbers');
  nums.forEach((n, i) => { assertInt(n, `#${i + 1}`); if (n < 1) throw new RangeError('Numbers must be ≥ 1'); });
}

// School method: factor each number, GCD = common primes with lowest exponent, LCM = all primes with highest.
export function gcdLcmSteps(nums) {
  checkList(nums);
  const factorizations = nums.map((n) => ({ n, ladder: n > 1 ? factorLadder(n) : [{ value: 1, prime: null }], factors: n > 1 ? factorList(n) : [] }));
  const primes = [...new Set(factorizations.flatMap((f) => f.factors.map(([p]) => p)))].sort((a, b) => a - b);
  const exp = (f, p) => f.factors.find(([q]) => q === p)?.[1] ?? 0;
  const gcdFactors = primes.map((p) => [p, Math.min(...factorizations.map((f) => exp(f, p)))]).filter(([, e]) => e > 0);
  const lcmFactors = primes.map((p) => [p, Math.max(...factorizations.map((f) => exp(f, p)))]);
  const product = (fs) => fs.reduce((acc, [p, e]) => acc * p ** e, 1);
  const g = product(gcdFactors), l = product(lcmFactors);
  if (g !== gcdAll(nums) || l !== lcmAll(nums)) throw new Error('Internal check failed');
  return { nums, factorizations, gcd: g, lcm: l, gcdFactors, lcmFactors, coprime: g === 1 };
}

// Euclid for two numbers: 84 = 1·60 + 24, 60 = 2·24 + 12, 24 = 2·12 + 0
export function euclidSteps(a, b) {
  checkList([a, b]);
  if (a < b) [a, b] = [b, a];
  const rows = [];
  while (b) { const q = Math.floor(a / b), r = a % b; rows.push({ a, b, q, r }); [a, b] = [b, r]; }
  return { rows, gcd: a };
}
