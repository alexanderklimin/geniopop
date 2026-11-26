// Fraction names in words (es): 3/4 → «tres cuartos», 1/2 → «un medio», 5/12 → «cinco doceavos».
const NUM = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiún', 'veintidós', 'veintitrés', 'veinticuatro'];
const DEN = { 2: 'medio', 3: 'tercio', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo', 8: 'octavo', 9: 'noveno', 10: 'décimo', 11: 'onceavo', 12: 'doceavo' };
export function fractionWords(n, d) {
  if (d === 1) return n === 1 ? 'un entero' : `${NUM[n] ?? n} enteros`;
  const den = DEN[d] ?? `${d}avo`;
  return `${NUM[n] ?? n} ${n === 1 ? den : den + 's'}`;
}
