// Percent calculator modes: sentence with inputs + step text, per language. Values go through formatNumber.
import { percentOf, whatPercent, wholeFromPart, percentChange, increase, decrease, removeIncrease } from '../lib/percent.js';
import { formatNumber } from '../lib/format.js';

export const PERCENT = {
  es: {
    calc: 'Calcular',
    err: 'Escribe dos números (puedes usar coma o punto para los decimales).',
    modes: [
      { id: 'of', sentence: ['¿Cuánto es el', '% de', '?'], ex: [15, 80], fn: (a, b) => percentOf(a, b),
        steps: (a, b, r, f) => [`Multiplicamos el porcentaje por la cantidad y dividimos entre 100: ${f(a)} × ${f(b)} ÷ 100 = ${f(a * b)} ÷ 100 = <strong>${f(r.result)}</strong>.`, `Atajo: el ${f(a)} % es lo mismo que multiplicar por ${f(a / 100)}.`] },
      { id: 'what', sentence: ['¿Qué porcentaje es', 'de', '?'], ex: [12, 80], fn: (a, b) => whatPercent(a, b), unit: '%',
        steps: (a, b, r, f) => [`Dividimos la parte entre el total: ${f(a)} ÷ ${f(b)} = ${f(a / b)}.`, `Multiplicamos por 100: ${f(a / b)} × 100 = <strong>${f(r.result)} %</strong>.`] },
      { id: 'whole', sentence: ['', 'es el', '% de ¿cuánto?'], ex: [12, 15], fn: (a, b) => wholeFromPart(a, b),
        steps: (a, b, r, f) => [`Si el ${f(b)} % son ${f(a)}, el 1 % es ${f(a)} ÷ ${f(b)} = ${f(a / b)}.`, `El 100 % es ${f(a / b)} × 100 = <strong>${f(r.result)}</strong>.`] },
      { id: 'up', sentence: ['Aumentar', 'en un', '%'], ex: [80, 21], fn: (a, b) => increase(a, b),
        steps: (a, b, r, f) => [`El ${f(b)} % de ${f(a)} es ${f(r.amount)}.`, `Lo sumamos: ${f(a)} + ${f(r.amount)} = <strong>${f(r.result)}</strong>.`, `Atajo: multiplicar por ${f(r.factor)}.`] },
      { id: 'down', sentence: ['Descontar a', 'un', '%'], ex: [80, 25], fn: (a, b) => decrease(a, b),
        steps: (a, b, r, f) => [`El ${f(b)} % de ${f(a)} es ${f(r.amount)}.`, `Lo restamos: ${f(a)} − ${f(r.amount)} = <strong>${f(r.result)}</strong>.`, `Atajo: multiplicar por ${f(r.factor)}.`] },
      { id: 'change', sentence: ['Pasó de', 'a', ': ¿qué % cambió?'], ex: [80, 100], fn: (a, b) => percentChange(a, b), unit: '%', signed: true,
        steps: (a, b, r, f) => [`Diferencia: ${f(b)} − ${f(a)} = ${f(b - a)}.`, `La dividimos entre el valor inicial y multiplicamos por 100: ${f(b - a)} ÷ ${f(a)} × 100 = <strong>${r.result > 0 ? '+' : ''}${f(r.result)} %</strong> (${r.result >= 0 ? 'aumento' : 'disminución'}).`] },
      { id: 'net', sentence: ['Precio con impuesto', ', tasa', '%: ¿precio sin impuesto?'], ex: [121, 21], fn: (a, b) => removeIncrease(a, b),
        steps: (a, b, r, f) => [`Con el impuesto, el precio es el ${f(100 + b)} % del original, es decir, se multiplicó por ${f(r.factor)}.`, `Deshacemos la multiplicación: ${f(a)} ÷ ${f(r.factor)} = <strong>${f(r.result)}</strong>. El impuesto era ${f(r.amount)}.`, `Ojo: no se resta el ${f(b)} % del precio final; eso daría ${f(a * (1 - b / 100))}, un resultado incorrecto.`] },
    ],
  },
};

export function runMode(lang, id, a, b, prefs) {
  const m = PERCENT[lang].modes.find((x) => x.id === id);
  const r = m.fn(a, b);
  const f = (x) => formatNumber(Math.round(x * 1e10) / 1e10, prefs, 6);
  const sign = m.signed && r.result > 0 ? '+' : '';
  return { result: `${sign}${f(r.result)}${m.unit ? ' %' : ''}`, steps: m.steps(a, b, r, f) };
}
