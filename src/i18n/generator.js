// Worksheet generator UI: topics, their controls and how controls map to worksheet.js params. Per language.
export const GEN = {
  es: {
    topicLabel: 'Tema', countLabel: 'Ejercicios', paperLabel: 'Papel', newSheet: 'Otra ficha', print: 'Imprimir', copy: 'Copiar enlace', copied: '¡Enlace copiado!',
    hint: 'La ficha cambia al instante. Cada ficha tiene su enlace: guárdalo para volver a imprimir exactamente la misma.',
    err: 'Con estas opciones no salen suficientes ejercicios distintos. Prueba con más cifras o menos ejercicios.',
    papers: [['A4', 'A4'], ['Letter', 'Carta']],
    topics: [
      { id: 'add', label: 'Sumas', title: 'Sumas', controls: [
        { k: 'digits', label: 'Cifras', type: 'select', options: [[1, '1 cifra'], [2, '2 cifras'], [3, '3 cifras'], [4, '4 cifras'], [5, '5 cifras']], def: 2 },
        { k: 'carry', label: 'Llevadas', type: 'select', options: [['any', 'Mezcladas'], ['none', 'Sin llevadas'], ['force', 'Con llevadas']], def: 'any' },
      ] },
      { id: 'sub', label: 'Restas', title: 'Restas', controls: [
        { k: 'digits', label: 'Cifras', type: 'select', options: [[1, '1 cifra'], [2, '2 cifras'], [3, '3 cifras'], [4, '4 cifras'], [5, '5 cifras']], def: 2 },
        { k: 'borrow', label: 'Llevadas', type: 'select', options: [['any', 'Mezcladas'], ['none', 'Sin llevadas'], ['force', 'Con llevadas (prestando)']], def: 'any' },
      ] },
      { id: 'table', label: 'Tablas de multiplicar', title: 'Tablas de multiplicar', controls: [
        { k: 'tables', label: 'Tablas', type: 'checks', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], def: [2, 3, 4, 5] },
        { k: 'to', label: 'Hasta', type: 'select', options: [[10, '× 10'], [12, '× 12']], def: 10 },
      ] },
      { id: 'missingFactor', label: 'Tablas: número que falta', title: '¿Qué número falta?', controls: [
        { k: 'tables', label: 'Tablas', type: 'checks', options: [2, 3, 4, 5, 6, 7, 8, 9, 10], def: [6, 7, 8, 9] },
      ] },
      { id: 'mul', label: 'Multiplicaciones', title: 'Multiplicaciones', controls: [
        { k: 'digitsA', label: 'Primer número', type: 'select', options: [[2, '2 cifras'], [3, '3 cifras'], [4, '4 cifras']], def: 2 },
        { k: 'digitsB', label: 'Por', type: 'select', options: [[1, '1 cifra'], [2, '2 cifras'], [3, '3 cifras']], def: 1 },
      ] },
      { id: 'div', label: 'Divisiones', title: 'Divisiones', controls: [
        { k: 'divisorDigits', label: 'Divisor', type: 'select', options: [[1, '1 cifra'], [2, '2 cifras']], def: 1 },
        { k: 'quotientDigits', label: 'Cociente', type: 'select', options: [[1, '1 cifra'], [2, '2 cifras'], [3, '3 cifras']], def: 2 },
        { k: 'remainder', label: 'Tipo', type: 'select', options: [[0, 'Exactas'], [1, 'Con resto']], def: 0 },
      ] },
      { id: 'fraction', label: 'Fracciones', title: 'Operaciones con fracciones', controls: [
        { k: 'ops', label: 'Operación', type: 'select', options: [['+', 'Sumas'], ['-', 'Restas'], ['+-', 'Sumas y restas'], ['*', 'Multiplicaciones'], ['/', 'Divisiones'], ['+-*/', 'Todas']], def: '+-' },
        { k: 'sameDen', label: 'Denominador', type: 'select', options: [[1, 'Igual denominador'], [0, 'Distinto denominador']], def: 0 },
        { k: 'maxDen', label: 'Denominador hasta', type: 'select', options: [[6, '6'], [10, '10'], [12, '12']], def: 10 },
      ] },
      { id: 'simplify', label: 'Simplificar fracciones', title: 'Simplificar fracciones', controls: [
        { k: 'maxDen', label: 'Denominador hasta', type: 'select', options: [[8, '8'], [12, '12'], [20, '20']], def: 12 },
      ] },
      { id: 'roman', label: 'Números romanos', title: 'Números romanos', controls: [
        { k: 'max', label: 'Hasta', type: 'select', options: [[20, '20'], [50, '50'], [100, '100'], [1000, '1000'], [3999, '3999']], def: 100 },
        { k: 'direction', label: 'Sentido', type: 'select', options: [['both', 'Los dos'], ['toRoman', 'A romanos'], ['fromRoman', 'A números']], def: 'both' },
      ] },
      { id: 'percent', label: 'Porcentajes', title: 'Porcentajes', controls: [
        { k: 'level', label: 'Nivel', type: 'select', options: [['easy', '10 %, 25 %, 50 %…'], ['mid', 'Cualquier múltiplo de 5 %']], def: 'easy' },
      ] },
      { id: 'combined', label: 'Operaciones combinadas', title: 'Operaciones combinadas', controls: [
        { k: 'level', label: 'Nivel', type: 'select', options: [[1, 'Sin paréntesis (+ − ×)'], [2, 'Con división y paréntesis'], [3, 'Con potencias y corchetes']], def: 1 },
      ] },
      { id: 'power', label: 'Potencias y raíces', title: 'Potencias y raíces cuadradas', controls: [
        { k: 'kind', label: 'Tipo', type: 'select', options: [['mixed', 'Potencias y raíces'], ['pow', 'Solo potencias'], ['sqrt', 'Solo raíces cuadradas']], def: 'mixed' },
      ] },
      { id: 'gcdLcm', label: 'mcm y mcd', title: 'mcm y mcd', controls: [
        { k: 'which', label: 'Calcular', type: 'select', options: [['both', 'mcm y mcd'], ['lcm', 'Solo mcm'], ['gcd', 'Solo mcd']], def: 'both' },
        { k: 'max', label: 'Números hasta', type: 'select', options: [[30, '30'], [60, '60'], [100, '100']], def: 60 },
      ] },
    ],
  },
};

// UI values → worksheet.js params
export function toParams(topic, v) {
  const n = (x) => Number(x);
  switch (topic) {
    case 'add': return { digits: n(v.digits), carry: v.carry };
    case 'sub': return { digits: n(v.digits), borrow: v.borrow };
    case 'table': return { tables: v.tables.map(n), to: n(v.to) };
    case 'missingFactor': return { tables: v.tables.map(n) };
    case 'mul': return { digitsA: n(v.digitsA), digitsB: n(v.digitsB) };
    case 'div': return { divisorDigits: n(v.divisorDigits), quotientDigits: n(v.quotientDigits), remainder: v.remainder === '1' || v.remainder === 1 };
    case 'fraction': return { ops: String(v.ops).split(''), sameDen: v.sameDen === '1' || v.sameDen === 1, maxDen: n(v.maxDen) };
    case 'simplify': return { maxDen: n(v.maxDen), maxFactor: 6 };
    case 'roman': return { max: n(v.max), direction: v.direction };
    case 'percent': return v.level === 'mid' ? { percents: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90], max: 400 } : { percents: [10, 20, 25, 50, 75], max: 200 };
    case 'combined': return { level: n(v.level) };
    case 'power': return { kind: v.kind };
    case 'gcdLcm': return { which: v.which, max: n(v.max) };
    default: return {};
  }
}
