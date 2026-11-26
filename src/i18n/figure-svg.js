// Draws plane figures to scale (fits a 280×200 box) with labelled dimensions.
const W = 280, Hh = 200, PAD = 28;
const txt = (x, y, t, a = 'middle') => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${a}" font-size="14" font-weight="800" fill="#1b1f3b">${t}</text>`;
const shape = (d, c) => `<path d="${d}" fill="${c}" fill-opacity=".22" stroke="#1b1f3b" stroke-width="3" stroke-linejoin="round"/>`;
const dash = (x1, y1, x2, y2) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#1b1f3b" stroke-width="2" stroke-dasharray="5 4"/>`;

export function figureSVG(fig, d, color = '#2f80ed', fmt = String) {
  const fit = (w, h) => { const s = Math.min((W - 2 * PAD) / w, (Hh - 2 * PAD) / h); return { s, ox: (W - w * s) / 2, oy: (Hh - h * s) / 2 }; };
  let body = '';
  if (fig === 'cuadrado' || fig === 'rectangulo') {
    const b = fig === 'cuadrado' ? d.lado : d.base, h = fig === 'cuadrado' ? d.lado : d.altura;
    const { s, ox, oy } = fit(b, h);
    body = shape(`M${ox} ${oy}h${b * s}v${h * s}h${-b * s}Z`, color) + txt(ox + (b * s) / 2, oy + h * s + 20, fmt(b)) + txt(ox + b * s + 8, oy + (h * s) / 2 + 5, fmt(h), 'start');
  } else if (fig === 'triangulo') {
    const b = d.base, h = d.altura, apex = b * 0.35;
    const { s, ox, oy } = fit(b, h);
    body = shape(`M${ox} ${oy + h * s}h${b * s}L${ox + apex * s} ${oy}Z`, color) + dash(ox + apex * s, oy, ox + apex * s, oy + h * s) + txt(ox + (b * s) / 2, oy + h * s + 20, `b = ${fmt(b)}`) + txt(ox + apex * s + 6, oy + (h * s) / 2, `h = ${fmt(h)}`, 'start');
  } else if (fig === 'circulo') {
    const cx = W / 2, cy = Hh / 2, R = (Hh - 2 * PAD) / 2;
    body = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${color}" fill-opacity=".22" stroke="#1b1f3b" stroke-width="3"/>` + `<line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="#1b1f3b" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="3" fill="#1b1f3b"/>` + txt(cx + R / 2, cy - 8, `r = ${fmt(d.radio)}`);
  } else if (fig === 'trapecio') {
    const B = d.baseMayor, b = Math.min(d.baseMenor, B), h = d.altura, off = (B - b) / 2;
    const { s, ox, oy } = fit(B, h);
    body = shape(`M${ox} ${oy + h * s}h${B * s}L${ox + (off + b) * s} ${oy}h${-b * s}Z`, color) + dash(ox + off * s, oy, ox + off * s, oy + h * s) + txt(ox + (B * s) / 2, oy + h * s + 20, `B = ${fmt(B)}`) + txt(ox + (B * s) / 2, oy - 8, `b = ${fmt(d.baseMenor)}`) + txt(ox + off * s + 6, oy + (h * s) / 2 + 5, `h = ${fmt(h)}`, 'start');
  } else if (fig === 'rombo') {
    const D = d.diagonalMayor, dd = d.diagonalMenor;
    const { s, ox, oy } = fit(D, dd);
    const cx = ox + (D * s) / 2, cy = oy + (dd * s) / 2;
    body = shape(`M${ox} ${cy}L${cx} ${oy}L${ox + D * s} ${cy}L${cx} ${oy + dd * s}Z`, color) + dash(ox, cy, ox + D * s, cy) + dash(cx, oy, cx, oy + dd * s) + txt(cx + (D * s) / 4, cy - 6, `D = ${fmt(D)}`) + txt(cx + 6, cy + (dd * s) / 4 + 5, `d = ${fmt(dd)}`, 'start');
  } else if (fig === 'paralelogramo') {
    const b = d.base, h = d.altura, sl = b * 0.3;
    const { s, ox, oy } = fit(b + sl, h);
    body = shape(`M${ox} ${oy + h * s}h${b * s}l${sl * s} ${-h * s}h${-b * s}Z`, color) + dash(ox + sl * s, oy, ox + sl * s, oy + h * s) + txt(ox + (b * s) / 2, oy + h * s + 20, `b = ${fmt(b)}`) + txt(ox + sl * s + 6, oy + (h * s) / 2 + 5, `h = ${fmt(h)}`, 'start');
  }
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" aria-hidden="true" style="overflow:visible">${body}</svg>`;
}
