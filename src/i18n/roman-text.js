// Roman numeral converter texts (HTML from src/lib/roman.js results), per language.
import { toRomanSteps, fromRoman } from '../lib/roman.js';

const esc = (c) => String(c).replace(/[&<>"']/g, (x) => `&#${x.charCodeAt(0)};`);

export const ROMAN = {
  es: {
    errors: {
      empty: 'Escribe un número (1–3999) o un número romano.',
      badSymbol: (d) => `«${esc(d)}» no es un símbolo romano. Solo se usan I, V, X, L, C, D y M.`,
      notStandard: (d, v) => `Esa escritura no es correcta. Ese valor (${v}) se escribe <strong>${d}</strong>.`,
      tooBig: 'Con los siete símbolos normales solo se escribe hasta 3999 (MMMCMXCIX).',
      range: 'Los números romanos van del 1 al 3999 (no existe el cero).',
    },
    toRoman(n) {
      const { roman, parts } = toRomanSteps(n);
      return { result: roman, html: `<p>Separamos ${n} por posiciones (millares, centenas, decenas, unidades) y escribimos cada parte:</p><ul class="rm-parts">${parts.map((p) => `<li><span>${p.value}</span><b>${p.roman}</b></li>`).join('')}</ul><p>${parts.map((p) => p.roman).join(' + ')} = <strong>${roman}</strong></p>` };
    },
    fromRoman(s) {
      const { value, steps } = fromRoman(s);
      const items = steps.map((x) => x.k === 'subtract' ? `<li><b>${x.symbols}</b><span>${x.value} (resta: el símbolo menor va delante)</span></li>` : `<li><b>${x.symbols}</b><span>${x.value}</span></li>`).join('');
      return { result: String(value), html: `<p>Leemos de izquierda a derecha. Si un símbolo es menor que el siguiente, se resta; si no, se suma:</p><ul class="rm-parts">${items}</ul><p>${steps.map((x) => x.value).join(' + ')} = <strong>${value}</strong></p>` };
    },
  },
};

// Detects direction: digits → to Roman, letters → to Arabic
export function convert(lang, input) {
  const T = ROMAN[lang];
  const s = String(input).trim();
  if (!s) throw Object.assign(new Error(T.errors.empty), { html: T.errors.empty });
  if (/^\d+$/.test(s)) {
    const n = Number(s);
    if (n < 1 || n > 3999) throw Object.assign(new Error('range'), { html: T.errors.range });
    return { dir: 'to', ...T.toRoman(n) };
  }
  try {
    return { dir: 'from', ...T.fromRoman(s) };
  } catch (e) {
    const msg = typeof T.errors[e.code] === 'function' ? T.errors[e.code](e.detail, e.value) : T.errors[e.code] ?? T.errors.empty;
    throw Object.assign(new Error(e.code), { html: msg });
  }
}
