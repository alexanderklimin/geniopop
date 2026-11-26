import test from 'node:test';
import assert from 'node:assert/strict';
import { angleType, complement, supplement, measure } from './geometry.js';

test('angles', () => {
  assert.deepEqual([0, 45, 90, 120, 180, 270, 360].map(angleType), ['nulo', 'agudo', 'recto', 'obtuso', 'llano', 'concavo', 'completo']);
  assert.equal(complement(30), 60);
  assert.equal(complement(120), null);
  assert.equal(supplement(130), 50);
  assert.throws(() => angleType(400), RangeError);
});

test('areas and perimeters', () => {
  assert.deepEqual(measure('cuadrado', { lado: 5 }), { area: 25, areaFormula: 'l × l', perimeter: 20, perimeterFormula: '4 × l' });
  assert.equal(measure('rectangulo', { base: 8, altura: 3 }).perimeter, 22);
  assert.equal(measure('triangulo', { base: 6, altura: 4 }).area, 12);
  assert.equal(measure('triangulo', { base: 6, altura: 4 }).perimeter, null);
  assert.equal(measure('triangulo', { base: 6, altura: 4, lado2: 5, lado3: 5 }).perimeter, 16);
  assert.equal(measure('circulo', { radio: 1 }).area, Math.round(Math.PI * 1e10) / 1e10);
  assert.equal(measure('trapecio', { baseMayor: 10, baseMenor: 6, altura: 4 }).area, 32);
  assert.equal(measure('rombo', { diagonalMayor: 8, diagonalMenor: 6 }).perimeter, 20);
  assert.equal(measure('paralelogramo', { base: 7, altura: 3, lado: 4 }).perimeter, 22);
  assert.throws(() => measure('cuadrado', { lado: 0 }), RangeError);
});
