// Draws a long division (src/lib/longdivision.js result) as HTML in a school layout, plus step texts.
// Layouts: 'galera' (divisor on the right, quotient under it: ES, AR, CL, CO…), 'bracket' (MX "casita", US).
// Every cell is one digit wide, so columns line up like on squared paper.

function placeDigits(str, endCol) {
  const out = new Map();
  [...str].forEach((ch, i) => out.set(endCol - str.length + 1 + i, ch));
  return out;
}

function rowHTML(cells, n, { minusAt = null, underlineFrom = null, underlineTo = null, cls = '', pointAfter = null } = {}) {
  const spans = [];
  for (let c = -1; c < n; c++) {
    let ch = c === -1 ? '' : cells.get(c) ?? '';
    const classes = [];
    if (minusAt !== null && c === minusAt) { ch = '−'; classes.push('mi'); }
    if (underlineFrom !== null && c >= underlineFrom && c <= underlineTo) classes.push('ul');
    if (pointAfter !== null && c === pointAfter - 1 && cells.has(c)) classes.push('pt');
    spans.push(`<span${classes.length ? ` class="${classes.join(' ')}"` : ''}>${ch}</span>`);
  }
  return `<div class="ld-row${cls ? ` ${cls}` : ''}">${spans.join('')}</div>`;
}

export function quotientText(res, sep) {
  const { int, dec, repeating } = res.quotient;
  if (!dec) return int;
  if (!repeating) return `${int}${sep}${dec}`;
  return `${int}${sep}${dec.slice(0, repeating.start)}<span class="rep">${dec.slice(repeating.start, repeating.end)}</span>`;
}

export function divisionHTML(res, { layout = 'galera', showProducts = true, sep = ',' } = {}) {
  const D = res.dividend.digits, P = res.dividend.pointAfter;
  const shownDividend = res.dividend.int.length + res.dividend.dec.length;
  const last = res.steps.at(-1);
  const n = Math.max(shownDividend, last.col + 1);
  const hasDecInDividend = res.dividend.dec.length > 0;
  const rows = [];
  // dividend
  const divCells = new Map(D.slice(0, shownDividend).map((d, i) => [i, String(d)]));
  const dividendRow = rowHTML(divCells, n, { cls: layout === 'bracket' ? 'brk' : 'top', pointAfter: hasDecInDividend ? P : null });
  res.steps.forEach((s, i) => {
    if (showProducts && !(s.digit === 0 && i > 0)) { // a 0 in the quotient: nothing to subtract, school skips the row
      const p = String(s.product);
      const start = s.col - p.length + 1;
      rows.push(rowHTML(placeDigits(p, s.col), n, { minusAt: start - 1, underlineFrom: start - 1, underlineTo: s.col }));
    }
    const next = res.steps[i + 1];
    if (next) rows.push(rowHTML(placeDigits(`${s.remainder}${D[next.col]}`, next.col), n));
    else rows.push(rowHTML(placeDigits(String(s.remainder), s.col), n, { cls: 'rest' }));
  });
  const q = quotientText(res, sep);
  if (layout === 'bracket') {
    const qCells = new Map(res.steps.map((s) => [s.col, String(s.digit)]));
    // leading zeros of the quotient are not written above the dividend
    const firstNonZero = res.steps.findIndex((s) => s.digit !== 0 || s.col >= P - 1);
    for (let i = 0; i < firstNonZero; i++) qCells.delete(res.steps[i].col);
    const qRow = rowHTML(qCells, n, { cls: 'quot', pointAfter: res.quotient.dec ? P : null });
    return `<div class="ld ld-bracket" style="--n:${n + 1}"><div class="ld-left"><span class="ld-dv">${res.divisor}</span></div><div class="ld-grid">${qRow}${dividendRow}${rows.join('')}</div></div>`;
  }
  return `<div class="ld ld-galera" style="--n:${n + 1}"><div class="ld-grid">${dividendRow}${rows.join('')}</div><div class="ld-side"><span class="ld-dv">${res.divisor}</span><span class="ld-q">${q}</span></div></div>`;
}

export const DIV_TEXT = {
  es: {
    times: (q) => (q === 1 ? 'vez' : 'veces'),
    steps(res, sep) {
      const d = res.divisor, out = [];
      let pointSaid = false;
      res.steps.forEach((s, i) => {
        let t = '';
        if (i === 0) t += `Tomamos <strong>${s.partial}</strong>${String(s.partial).length > 1 && s.col > 0 ? `: con menos cifras no alcanza para dividir entre ${d}` : ''}. `;
        else {
          if (s.afterPoint && !pointSaid && res.dividend.dec.length <= s.col - res.dividend.pointAfter) {
            t += `Ya no quedan cifras: ponemos una coma en el cociente y bajamos un 0. `;
            pointSaid = true;
          } else t += `Bajamos el ${s.broughtDown}: queda <strong>${s.partial}</strong>. `;
        }
        t += s.digit === 0
          ? `${d} no cabe en ${s.partial}, así que escribimos un <strong>0</strong> en el cociente.`
          : `${d} cabe <strong>${s.digit}</strong> ${this.times(s.digit)} en ${s.partial}: ${s.digit} × ${d} = ${s.product}. Restamos: ${s.partial} − ${s.product} = ${s.remainder}.`;
        out.push(t);
      });
      const q = quotientText(res, sep).replace(/<[^>]+>/g, '');
      const period = res.quotient.repeating ? res.quotient.dec.slice(res.quotient.repeating.start, res.quotient.repeating.end) : '';
      const rep = period ? (period.length === 1 ? ` El ${period} se repite sin fin: es un decimal periódico (se marca con una raya encima).` : ` El grupo ${period} se repite sin fin: es un decimal periódico (se marca con una raya encima).`) : '';
      const qHtml = quotientText(res, sep);
      if (res.quotient.dec || res.remainder === 0) out.push(`Resultado: <strong>${qHtml}</strong>.${res.remainder !== 0 && !period ? ' La división todavía no ha terminado: el resto aún no es 0. Si necesitas más precisión, saca más decimales; si no, redondea.' : ''}${rep}`);
      else out.push(`Cociente: <strong>${q}</strong>, resto: <strong>${res.remainder}</strong>.`);
      if (!res.quotient.dec) out.push(`Comprobación: divisor × cociente + resto = ${d} × ${res.quotient.int} + ${res.remainder} = ${d * Number(res.quotient.int) + res.remainder}.`);
      return out;
    },
  },
};
