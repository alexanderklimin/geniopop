// Draws an angle as inline SVG: fixed ray to the right, second ray at `deg` (counter-clockwise), filled arc.
export function angleSVG(deg, { size = 120, color = '#2f80ed', label = true, ticks = false } = {}) {
  const c = size / 2, R = size * 0.42, ar = size * 0.17;
  const rad = (d) => (-d * Math.PI) / 180;
  const pt = (d, rr) => [c + rr * Math.cos(rad(d)), c + rr * Math.sin(rad(d))];
  const [x2, y2] = pt(deg, R), [ax, ay] = pt(deg, ar);
  const large = deg > 180 ? 1 : 0;
  const arc = deg >= 360 ? `<circle cx="${c}" cy="${c}" r="${ar}" fill="${color}" opacity=".25"/>` : deg > 0 ? `<path d="M${c} ${c} L${c + ar} ${c} A${ar} ${ar} 0 ${large} 0 ${ax.toFixed(2)} ${ay.toFixed(2)} Z" fill="${color}" opacity=".25"/>` : '';
  const right = deg === 90 ? `<path d="M${c + ar * 0.6} ${c} V${c - ar * 0.6} H${c}" fill="none" stroke="${color}" stroke-width="2"/>` : '';
  const [lx, ly] = pt(deg / 2 || 0, ar + 18);
  let tickMarks = '';
  if (ticks) for (let t = 0; t < 360; t += 30) { const [a1, b1] = pt(t, R + 4), [a2, b2] = pt(t, R + 10); tickMarks += `<line x1="${a1.toFixed(1)}" y1="${b1.toFixed(1)}" x2="${a2.toFixed(1)}" y2="${b2.toFixed(1)}" stroke="#c9c2b6" stroke-width="2"/>`; }
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">${tickMarks}${arc}${right}<line x1="${c}" y1="${c}" x2="${c + R}" y2="${c}" stroke="#1b1f3b" stroke-width="3" stroke-linecap="round"/><line x1="${c}" y1="${c}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#1b1f3b" stroke-width="3" stroke-linecap="round"/><circle cx="${c}" cy="${c}" r="3.5" fill="#1b1f3b"/>${label && deg > 0 && deg < 360 ? `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="middle" font-size="${Math.round(size / 9)}" font-weight="800" fill="${color}">${deg}°</text>` : ''}</svg>`;
}
