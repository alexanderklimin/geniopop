// Order-of-operations solver texts (src/lib/expr.js), per language.
import { solveExpression } from '../lib/expr.js';
import { fr } from './fraction-steps.js';
import { toDecimal } from '../lib/fraction.js';

const SYM = { '+': '+', '-': '−', '*': '×', '/': '÷', '^': '^' };

export const EXPR = {
  es: {
    kinds: { bracket: 'Primero lo de dentro del paréntesis', power: 'Potencias', mulDiv: 'Multiplicaciones y divisiones, de izquierda a derecha', addSub: 'Sumas y restas, de izquierda a derecha' },
    errors: {
      empty: 'Escribe una operación, por ejemplo 2 + 3 × (8 − 2).', badChar: 'Hay un símbolo que no entiendo. Usa números, + − × ÷ : ^ y paréntesis.',
      missingClose: 'Falta cerrar un paréntesis.', extraClose: 'Sobra un paréntesis de cierre.', wrongClose: 'Los paréntesis no coinciden: si abres con [ cierra con ].',
      unexpected: 'Hay dos signos seguidos o falta un número.', unexpectedEnd: 'La operación termina en un signo: falta un número.', divisionByZero: 'No se puede dividir entre 0.',
      zeroToZero: '0 elevado a 0 no está definido.', fractionalExponent: 'Solo se admiten exponentes enteros.', exponentTooLarge: 'El exponente es demasiado grande.',
      numberTooLong: 'Hay un número demasiado largo.', tooLong: 'La operación es demasiado larga.', default: 'No he podido resolver esta operación.',
    },
    result: 'Resultado',
    decimal: 'En decimal',
  },
};

const val = (v, sep) => {
  if (v.d === 1) return String(v.n).replace('-', '−');
  const d = toDecimal(v, 12);
  return !d.repeat && !d.truncated ? `${d.negative ? '−' : ''}${d.int}${sep}${d.fixed}` : fr(v);
};

const sup = (t) => t.replace(/\^(\(?−?[\d/,.]+\)?)/g, '<sup>$1</sup>');

export function exprHTML(lang, text, sep = ',') {
  const T = EXPR[lang];
  const r = solveExpression(text, { mul: '×', div: '÷', decimalSep: sep });
  const rows = r.steps.map((s, i) => `<li><span class="ex-kind">${T.kinds[s.kind]}</span><span class="ex-op">${s.op === '^' ? `${val(s.a, sep)}<sup>${val(s.b, sep)}</sup>` : `${val(s.a, sep)} ${SYM[s.op]} ${val(s.b, sep)}`} = <b>${val(s.result, sep)}</b></span><span class="ex-line">${sup(s.after)}</span></li>`).join('');
  const dec = r.result.d !== 1 ? toDecimal(r.result, 10) : null;
  const decText = dec ? `${dec.negative ? '−' : ''}${dec.int}${sep}${dec.fixed}${dec.repeat ? `<span class="rep">${dec.repeat}</span>` : ''}${dec.truncated ? '…' : ''}` : '';
  return {
    result: val(r.result, sep),
    html: `<p class="ex-start">${sup(r.start)}</p><ol class="ex-steps">${rows}</ol>`,
    decimal: decText,
  };
}

export function exprError(lang, e) {
  const E = EXPR[lang].errors;
  return E[e?.code] ?? E.default;
}
