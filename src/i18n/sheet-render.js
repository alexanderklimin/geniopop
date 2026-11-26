// Renders worksheet problems (src/lib/worksheet.js) as HTML for screen and print, per language.
// Column (vertical) layout for + − ×, as in primary school notebooks; fractions stacked.
import { fr, mixed } from './fraction-steps.js';
import { toMixed } from '../lib/fraction.js';

const M = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function column(op, a, b) {
  const w = Math.max(String(a).length, String(b).length) + 1;
  return `<span class="col" style="--w:${w}"><span class="r">${a}</span><span class="r"><i>${M[op]}</i>${b}</span><span class="r line"></span><span class="r ans"></span></span>`;
}

export const SHEET_TEXT = {
  es: {
    gcd: 'mcd', lcm: 'mcm', rest: 'resto', of: 'de',
    toRoman: 'en romanos', fromRoman: 'en números',
    labels: { name: 'Nombre', date: 'Fecha', answers: 'Soluciones', score: 'Aciertos' },
  },
};

export function problemHTML(lang, p, { vertical = true } = {}) {
  const T = SHEET_TEXT[lang];
  const blank = '<span class="blank"></span>';
  switch (p.topic) {
    case 'add': case 'sub': case 'mul':
      return vertical && p.operands.length === 2 ? column(p.op, p.operands[0], p.operands[1]) : `${p.operands.join(` ${M[p.op]} `)} = ${blank}`;
    case 'table': return `${p.operands[0]} × ${p.operands[1]} = ${blank}`;
    case 'missingFactor': return `${p.operands[0]} × ${blank} = ${p.result}`;
    case 'div': return `<span class="divbox">${p.operands[0]} ÷ ${p.operands[1]} = ${blank}</span>`;
    case 'fraction': return `${fr(p.operands[0])} <span class="op">${M[p.op]}</span> ${fr(p.operands[1])} <span class="op">=</span> ${blank}`;
    case 'simplify': return `${fr(p.operands[0])} <span class="op">=</span> ${blank}`;
    case 'roman': return p.op === 'toRoman' ? `${p.operands[0]} → ${blank} <small>${T.toRoman}</small>` : `${p.operands[0]} → ${blank} <small>${T.fromRoman}</small>`;
    case 'percent': case 'percentOf': return `${p.operands[0]} % ${T.of} ${p.operands[1]} = ${blank}`;
    case 'combined': return `${p.operands[0].replace(/\*/g, '×').replace(/\^(\d)/g, '<sup>$1</sup>').replace(/-/g, '−')} = ${blank}`;
    case 'power': return p.op === 'sqrt' ? `√${p.operands[0]} = ${blank}` : `${p.operands[0]}<sup>${p.operands[1]}</sup> = ${blank}`;
    case 'average': return `Promedio de ${p.operands.join(', ')} = ${blank}`;
    case 'prime': return `${p.operands[0]}: ¿primo o compuesto? ${blank}`;
    case 'gcdLcm': return `${T[p.op]}(${p.operands.join(', ')}) = ${blank}`;
    default: return '';
  }
}

export function answerHTML(lang, p) {
  const T = SHEET_TEXT[lang];
  if (p.topic === 'fraction' || p.topic === 'simplify') {
    const m = toMixed(p.answer);
    return fr(p.answer) + (m.whole > 0 && m.n > 0 ? ` = ${mixed(m)}` : '');
  }
  if (p.topic === 'prime') return p.answer === 'primo' ? 'primo' : `compuesto (${p.answer.replace(/\^(\d+)/g, '<sup>$1</sup>')})`;
  if (p.topic === 'div' && p.remainder) return `${p.answer}, ${T.rest} ${p.remainder}`;
  return String(p.answer);
}

export function sheetHTML(lang, problems, { title, cls = '' } = {}) {
  const L = SHEET_TEXT[lang].labels;
  const vertical = problems.every((p) => ['add', 'sub', 'mul'].includes(p.topic));
  const kind = vertical ? 'is-col' : problems.some((p) => p.topic === 'div') ? 'is-div' : problems.some((p) => ['fraction', 'simplify'].includes(p.topic)) ? 'is-frac' : 'is-line';
  return `<div class="ws ${kind} ${cls}">
  <div class="ws-head"><strong>${title}</strong><span>${L.name}: ____________________</span><span>${L.date}: __________</span><span>${L.score}: ____ / ${problems.length}</span></div>
  <ol class="ws-grid">${problems.map((p) => `<li>${problemHTML(lang, p, { vertical })}</li>`).join('')}</ol>
  <div class="ws-answers"><strong>${L.answers} · ${title}</strong><ol>${problems.map((p) => `<li>${answerHTML(lang, p)}</li>`).join('')}</ol></div>
</div>`;
}
