// Combined operations (orden de las operaciones / Punkt vor Strich / ordine delle operazioni)
// solved one operation per step, exactly (fractions, never floats).
// Order: innermost brackets → powers → × ÷ left to right → + − left to right.

import { frac, add, sub, mul, div, pow, isInteger, toDecimal } from './fraction.js';

const MAX_LEN = 200;
const OPEN = { '(': ')', '[': ']', '{': '}' };
const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

export function tokenize(text) {
  const s = String(text);
  if (s.length > MAX_LEN) throw exprError('tooLong');
  const out = [];
  for (let i = 0; i < s.length; ) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    // 3/4 written without spaces is a fraction literal (as kids type it); "6 / 3", 6 ÷ 3, 6 : 3 are divisions
    const fm = s.slice(i).match(/^(\d+)\/(\d+)(?![.,\d])/);
    if (fm) {
      if (fm[1].length + fm[2].length > 12) throw exprError('numberTooLong', i);
      if (Number(fm[2]) === 0) throw exprError('divisionByZero', i);
      out.push({ t: 'num', value: frac(Number(fm[1]), Number(fm[2])), decimal: false, pos: i });
      i += fm[0].length; continue;
    }
    const m = s.slice(i).match(/^\d+(?:[.,]\d+)?/);
    if (m) {
      const [int, dec = ''] = m[0].split(/[.,]/);
      if (int.length + dec.length > 12) throw exprError('numberTooLong', i);
      out.push({ t: 'num', value: frac(Number(int + dec), 10 ** dec.length), decimal: dec.length > 0, pos: i });
      i += m[0].length; continue;
    }
    const op = { '+': '+', '-': '-', '−': '-', '–': '-', '*': '*', '×': '*', '·': '*', 'x': '*', '/': '/', '÷': '/', ':': '/', '^': '^' }[c];
    if (op) { out.push({ t: 'op', op, pos: i }); i++; continue; }
    if (OPEN[c]) { out.push({ t: 'open', c, pos: i }); i++; continue; }
    if (')]}'.includes(c)) { out.push({ t: 'close', c, pos: i }); i++; continue; }
    throw exprError('badChar', i, c);
  }
  return out;
}

function exprError(code, pos, detail) {
  const e = new RangeError(`Expression: ${code}${pos !== undefined ? ` at ${pos}` : ''}`);
  e.code = code; e.pos = pos; e.detail = detail;
  return e;
}

// AST nodes: { type: 'num', value } | { type: 'bin', op, left, right } | { type: 'neg', arg } | { type: 'group', bracket, inner }
export function parse(text) {
  const tokens = tokenize(text);
  if (!tokens.length) throw exprError('empty');
  let i = 0;
  const peek = () => tokens[i];
  const implicitMul = () => {
    const t = peek();
    return t && (t.t === 'open') && i > 0 && ['num', 'close'].includes(tokens[i - 1].t);
  };
  function primary() {
    const t = tokens[i];
    if (!t) throw exprError('unexpectedEnd');
    if (t.t === 'num') { i++; return { type: 'num', value: t.value, decimal: t.decimal }; }
    if (t.t === 'open') {
      i++;
      const inner = expression(0);
      const close = tokens[i];
      if (!close || close.t !== 'close') throw exprError('missingClose', t.pos, OPEN[t.c]);
      if (close.c !== OPEN[t.c]) throw exprError('wrongClose', close.pos, OPEN[t.c]);
      i++;
      return { type: 'group', bracket: t.c, inner };
    }
    if (t.t === 'op' && t.op === '-') { i++; return { type: 'neg', arg: unary() }; }
    if (t.t === 'op' && t.op === '+') { i++; return unary(); }
    throw exprError('unexpected', t.pos, t.op ?? t.c);
  }
  // -3^2 = -(3^2) as in school; 2^-1 allowed
  function unary() {
    const base = primary();
    if (peek()?.t === 'op' && peek().op === '^') {
      i++;
      return { type: 'bin', op: '^', left: base, right: unary() };
    }
    return base;
  }
  function expression(minPrec) {
    let left = unary();
    for (;;) {
      const t = peek();
      let op;
      if (implicitMul()) op = '*';
      else if (t?.t === 'op' && t.op !== '^') op = t.op;
      else break;
      if (PREC[op] < minPrec) break;
      if (!implicitMul()) i++;
      const right = expression(PREC[op] + 1);
      left = { type: 'bin', op, left, right };
    }
    return left;
  }
  const ast = expression(0);
  if (i < tokens.length) {
    const t = tokens[i];
    throw exprError(t.t === 'close' ? 'extraClose' : 'unexpected', t.pos, t.c ?? t.op);
  }
  return ast;
}

function apply(op, a, b) {
  if (op === '+') return add(a, b);
  if (op === '-') return sub(a, b);
  if (op === '*') return mul(a, b);
  if (op === '/') { if (b.n === 0) throw exprError('divisionByZero'); return div(a, b); }
  if (!isInteger(b)) throw exprError('fractionalExponent');
  if (Math.abs(b.n) > 64) throw exprError('exponentTooLarge');
  if (a.n === 0 && b.n <= 0) throw exprError(b.n === 0 ? 'zeroToZero' : 'divisionByZero');
  return pow(a, b.n);
}

// Removes groups around single numbers and folds −number, without counting a step.
function tidy(node) {
  if (node.type === 'group') {
    const inner = tidy(node.inner);
    return inner.type === 'num' ? inner : { ...node, inner };
  }
  if (node.type === 'neg') {
    const arg = tidy(node.arg);
    return arg.type === 'num' ? { type: 'num', value: frac(-arg.value.n, arg.value.d), decimal: arg.decimal } : { ...node, arg };
  }
  if (node.type === 'bin') return { ...node, left: tidy(node.left), right: tidy(node.right) };
  return node;
}

// Pick the operation to do next: deepest bracket, then highest precedence, then leftmost.
function findNext(node, depth = 0, path = [], acc = { best: null, order: 0 }) {
  if (node.type === 'group') findNext(node.inner, depth + 1, [...path, 'inner'], acc);
  else if (node.type === 'neg') findNext(node.arg, depth, [...path, 'arg'], acc);
  else if (node.type === 'bin') {
    findNext(node.left, depth, [...path, 'left'], acc);
    const order = acc.order++;
    if (node.left.type === 'num' && node.right.type === 'num') {
      const score = [depth, PREC[node.op]];
      const b = acc.best;
      if (!b || score[0] > b.score[0] || (score[0] === b.score[0] && score[1] > b.score[1])) acc.best = { path, score, order, node };
    }
    findNext(node.right, depth, [...path, 'right'], acc);
  }
  return acc.best;
}

function replaceAt(node, path, value) {
  if (!path.length) return value;
  const [head, ...rest] = path;
  return { ...node, [head]: replaceAt(node[head], rest, value) };
}

// Format helpers (locale-aware rendering happens in format.js; this is the canonical ASCII-ish form)
export function render(node, { mul = '×', div = '÷', decimalSep = ',', decimals = false, minus = '−' } = {}) {
  const numText = (v, isDecimal) => {
    const neg = v.n < 0;
    let body;
    if (isInteger(v)) body = String(Math.abs(v.n / v.d));
    else if (decimals || isDecimal) {
      const d = toDecimal(v, 12);
      body = !d.repeat && !d.truncated ? `${d.int}${decimalSep}${d.fixed}` : `${Math.abs(v.n)}/${v.d}`;
    } else body = `${Math.abs(v.n)}/${v.d}`;
    return { text: (neg ? minus : '') + body, neg, compound: body.includes('/') };
  };
  const sym = { '+': '+', '-': minus, '*': mul, '/': div, '^': '^' };
  // isRight: right operand (needs brackets for same precedence: 10 − (2 − 3));
  // leading: starts the whole expression or a bracket, so a minus sign needs no brackets.
  function r(n, parentPrec = 0, isRight = false, leading = true, isBase = false) {
    if (n.type === 'num') {
      const { text, neg, compound } = numText(n.value, n.decimal);
      const wrap = (neg && (!leading || isBase)) || (compound && parentPrec >= 2);
      return wrap ? `(${text})` : text;
    }
    if (n.type === 'group') return `${n.bracket}${r(n.inner)}${OPEN[n.bracket]}`;
    if (n.type === 'neg') return `${minus}${r(n.arg, 3, false, false)}`;
    const p = PREC[n.op];
    const needs = p < parentPrec || (p === parentPrec && isRight && n.op !== '^') || (isBase && n.op === '^');
    const left = r(n.left, p, false, (leading || needs) && !isBase, n.op === '^');
    const right = r(n.right, p, n.op !== '^', false);
    const s = n.op === '^' ? `${left}^${right}` : `${left} ${sym[n.op]} ${right}`;
    return needs ? `(${s})` : s;
  }
  return r(node);
}

// solveExpression('2 + 3 × (8 − 2)^2') → { steps: [{ before, op, a, b, result, after }], result }
export function solveExpression(text, renderOptions = {}) {
  let ast = tidy(parse(text));
  const usesDecimals = String(text).match(/\d[.,]\d/) !== null;
  const opts = { decimals: usesDecimals, ...renderOptions };
  const steps = [];
  const start = render(ast, opts);
  for (let guard = 0; ast.type !== 'num'; guard++) {
    if (guard > 100) throw exprError('tooManySteps');
    const next = findNext(ast);
    if (!next) throw exprError('internal');
    const { node, path } = next;
    const value = apply(node.op, node.left.value, node.right.value);
    const decimal = node.left.decimal || node.right.decimal;
    ast = tidy(replaceAt(ast, path, { type: 'num', value, decimal }));
    steps.push({ op: node.op, a: node.left.value, b: node.right.value, result: value, kind: next.score[0] > 0 ? 'bracket' : ({ 1: 'addSub', 2: 'mulDiv', 3: 'power' })[next.score[1]], after: render(ast, opts) });
  }
  return { start, steps, result: ast.value, decimal: toDecimal(ast.value) };
}
