// Angles and plane figures: classification, area, perimeter (with formula steps). Lengths in any unit.
const r = (x) => Math.round(x * 1e10) / 1e10;

export function angleType(deg) {
  if (!Number.isFinite(deg) || deg < 0 || deg > 360) throw new RangeError('0–360');
  if (deg === 0) return 'nulo';
  if (deg < 90) return 'agudo';
  if (deg === 90) return 'recto';
  if (deg < 180) return 'obtuso';
  if (deg === 180) return 'llano';
  if (deg < 360) return 'concavo';
  return 'completo';
}
export const complement = (d) => (d >= 0 && d <= 90 ? r(90 - d) : null);
export const supplement = (d) => (d >= 0 && d <= 180 ? r(180 - d) : null);

// figure → { area, perimeter, steps } ; dims are positive numbers
export const FIGURES = {
  cuadrado: { dims: ['lado'], area: ({ lado: l }) => [l * l, 'l × l'], perim: ({ lado: l }) => [4 * l, '4 × l'] },
  rectangulo: { dims: ['base', 'altura'], area: ({ base: b, altura: h }) => [b * h, 'b × h'], perim: ({ base: b, altura: h }) => [2 * (b + h), '2 × (b + h)'] },
  triangulo: { dims: ['base', 'altura', 'lado2', 'lado3'], optional: ['lado2', 'lado3'], area: ({ base: b, altura: h }) => [(b * h) / 2, '(b × h) ÷ 2'], perim: ({ base: b, lado2: a, lado3: c }) => (a && c ? [b + a + c, 'a + b + c'] : null) },
  circulo: { dims: ['radio'], area: ({ radio: R }) => [Math.PI * R * R, 'π × r²'], perim: ({ radio: R }) => [2 * Math.PI * R, '2 × π × r'] },
  trapecio: { dims: ['baseMayor', 'baseMenor', 'altura', 'lado1', 'lado2'], optional: ['lado1', 'lado2'], area: ({ baseMayor: B, baseMenor: b, altura: h }) => [((B + b) * h) / 2, '(B + b) × h ÷ 2'], perim: ({ baseMayor: B, baseMenor: b, lado1: c, lado2: d }) => (c && d ? [B + b + c + d, 'B + b + c + d'] : null) },
  rombo: { dims: ['diagonalMayor', 'diagonalMenor', 'lado'], optional: ['lado'], area: ({ diagonalMayor: D, diagonalMenor: d }) => [(D * d) / 2, '(D × d) ÷ 2'], perim: ({ lado: l, diagonalMayor: D, diagonalMenor: d }) => [4 * (l || Math.hypot(D / 2, d / 2)), l ? '4 × l' : '4 × √((D/2)² + (d/2)²)'] },
  paralelogramo: { dims: ['base', 'altura', 'lado'], optional: ['lado'], area: ({ base: b, altura: h }) => [b * h, 'b × h'], perim: ({ base: b, lado: l }) => (l ? [2 * (b + l), '2 × (b + l)'] : null) },
};

export function measure(fig, dims) {
  const F = FIGURES[fig];
  if (!F) throw new RangeError('Unknown figure');
  for (const k of F.dims) {
    const v = dims[k];
    if (F.optional?.includes(k) && (v === undefined || v === null || v === '' || Number.isNaN(v))) { dims[k] = 0; continue; }
    if (!(v > 0)) throw new RangeError(`Missing ${k}`);
  }
  const [a, af] = F.area(dims);
  const p = F.perim(dims);
  return { area: r(a), areaFormula: af, perimeter: p ? r(p[0]) : null, perimeterFormula: p ? p[1] : null };
}
