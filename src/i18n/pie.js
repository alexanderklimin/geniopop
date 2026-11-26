// Fraction pictures as inline SVG strings (pies), shared by pages and islands.
export function pie(n, d, { size = 120, color = '#ff6b35' } = {}) {
  const r = size / 2 - 4, c = size / 2;
  if (d === 1 || n >= d) return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${c}" cy="${c}" r="${r}" fill="${n >= d ? color : '#fff'}" stroke="#1b1f3b" stroke-width="3"/></svg>`;
  const parts = Array.from({ length: d }, (_, i) => {
    const a0 = (i / d) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2;
    const p = (a) => `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
    return `<path d="M${c} ${c} L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z" fill="${i < n ? color : '#fff'}" stroke="#1b1f3b" stroke-width="2.5" stroke-linejoin="round"/>`;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">${parts.join('')}</svg>`;
}
