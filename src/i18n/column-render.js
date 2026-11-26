// Draws column +, − (borrow / compensate) and × (src/lib/columnops.js) as a digit grid, plus step texts (es).

function grid(rows, width) {
  // rows: [{ cells: Map(col → html), sign?, cls? }], col 0 = units (rightmost)
  return `<div class="cg" style="--w:${width + 1}">${rows.map((r) => {
    const cells = [`<span class="sg">${r.sign ?? ''}</span>`];
    for (let c = width - 1; c >= 0; c--) cells.push(`<span>${r.cells.get(c) ?? ''}</span>`);
    return `<div class="cg-row${r.cls ? ` ${r.cls}` : ''}">${cells.join('')}</div>`;
  }).join('')}</div>`;
}
const digitsMap = (n, shift = 0) => new Map(String(n).split('').reverse().map((d, i) => [i + shift, d]));

export function addHTML(r) {
  const W = Math.max(String(r.result).length, String(r.a).length, String(r.b).length);
  const carries = new Map(r.steps.filter((s) => s.carryIn).map((s) => [s.col, `<small>${s.carryIn}</small>`]));
  return grid([{ cells: carries, cls: 'carry' }, { cells: digitsMap(r.a) }, { cells: digitsMap(r.b), sign: '+', cls: 'under' }, { cells: digitsMap(r.result), cls: 'res' }], W);
}

export function subHTML(r) {
  const W = String(r.a).length;
  const top = digitsMap(r.a), bottom = digitsMap(r.b);
  const marks = new Map();
  if (r.method === 'borrow') {
    const final = r.steps.at(-1).after; // digits after all borrowing (index = col)
    const orig = String(r.a).split('').reverse().map(Number);
    for (let c = 0; c < W; c++) {
      const changed = final[c] !== orig[c] || r.steps[c].plus10;
      if (changed) {
        const shown = r.steps[c].top; // value actually used in that column (with +10)
        marks.set(c, `<small>${shown}</small>`);
        top.set(c, `<s>${orig[c]}</s>`);
      }
    }
  } else {
    const comp = new Map();
    for (const s of r.steps) {
      if (s.plus10) top.set(s.col, `<small class="ten">1</small>${top.get(s.col)}`);
      if (s.carryNext) comp.set(s.col + 1, '+1');
    }
    return grid([{ cells: top }, { cells: comp, cls: 'comp' }, { cells: bottom, sign: '−', cls: 'under' }, { cells: digitsMap(r.result), cls: 'res' }], W);
  }
  return grid([{ cells: marks, cls: 'carry' }, { cells: top }, { cells: bottom, sign: '−', cls: 'under' }, { cells: digitsMap(r.result), cls: 'res' }], W);
}

export function mulHTML(r) {
  const W = Math.max(String(r.result).length, String(r.a).length + 1, String(r.b).length + 1);
  const rows = [{ cells: digitsMap(r.a) }, { cells: digitsMap(r.b), sign: '×', cls: 'under' }];
  if (r.needsSum) {
    r.partials.forEach((p, i) => rows.push({ cells: digitsMap(p.value, p.row), sign: i === r.partials.length - 1 ? '+' : '', cls: i === r.partials.length - 1 ? 'under' : '' }));
  }
  rows.push({ cells: digitsMap(r.result), cls: 'res' });
  return grid(rows, W);
}

const PLACE = ['unidades', 'decenas', 'centenas', 'unidades de millar', 'decenas de millar', 'centenas de millar', 'unidades de millón'];
const place = (c) => PLACE[c] ?? `posición ${c + 1}`;

export const COL_TEXT = {
  es: {
    add(r) {
      const out = r.steps.map((s) => s.final
        ? `Nos queda la llevada: escribimos <strong>${s.write}</strong> delante.`
        : `<strong>${place(s.col)[0].toUpperCase() + place(s.col).slice(1)}:</strong> ${s.a} + ${s.b}${s.carryIn ? ` + ${s.carryIn} (que llevábamos)` : ''} = ${s.sum}. ${s.sum >= 10 ? `Escribimos <strong>${s.write}</strong> y nos llevamos 1.` : `Escribimos <strong>${s.write}</strong>.`}`);
      out.push(`Resultado: ${r.a} + ${r.b} = <strong>${r.result}</strong>.`);
      return out;
    },
    sub(r) {
      const out = r.steps.map((s) => {
        const P = place(s.col)[0].toUpperCase() + place(s.col).slice(1);
        if (!s.plus10) return `<strong>${P}:</strong> ${s.top} − ${s.bottom} = <strong>${s.write}</strong>.`;
        if (r.method === 'borrow') return `<strong>${P}:</strong> a ${s.top - 10} no se le puede quitar ${s.bottom}, así que pedimos prestada una decena a la cifra de la izquierda${s.borrowedFrom > s.col + 1 ? ' (como es 0, pide a su vez a la siguiente, y los ceros se convierten en 9)' : ''}. Ahora tenemos ${s.top}: ${s.top} − ${s.bottom} = <strong>${s.write}</strong>.`;
        return `<strong>${P}:</strong> a ${s.top - 10} no se le puede quitar ${s.bottom}, así que le sumamos 10 (ponemos un 1 pequeño delante): ${s.top} − ${s.bottom} = <strong>${s.write}</strong>. Para compensar, nos llevamos 1, que se suma a la cifra de abajo de la columna siguiente.`;
      });
      out.push(`Resultado: ${r.a} − ${r.b} = <strong>${r.result}</strong>. Comprobación: ${r.result} + ${r.b} = ${r.a}.`);
      return out;
    },
    mul(r) {
      const out = [];
      for (const p of r.partials) {
        const head = r.needsSum ? `<strong>Multiplicamos por el ${p.digit}</strong> (${place(p.row)})${p.row ? `: dejamos ${p.row === 1 ? 'un hueco' : `${p.row} huecos`} a la derecha (o ${p.row === 1 ? 'un 0' : 'ceros'}), porque estamos multiplicando por ${p.digit * 10 ** p.row}` : ''}. ` : '';
        const body = p.steps.map((s) => `${s.b} × ${s.a}${s.carryIn ? ` + ${s.carryIn}` : ''} = ${s.prod}${s.carryOut ? ` → escribimos ${s.write} y llevamos ${s.carryOut}` : ''}`).join('; ');
        out.push(`${head}${body}${p.lastCarry ? `; escribimos la última llevada, ${p.lastCarry}` : ''}. Resultado parcial: <strong>${p.value}</strong>.`);
      }
      if (r.needsSum) out.push(`Sumamos los resultados parciales: ${r.partials.map((p) => p.shifted).join(' + ')} = <strong>${r.result}</strong>.`);
      return out;
    },
  },
};
