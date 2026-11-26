import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, resolvePrefs, decimalSeparator } from './locale.js';
import { formatNumber, formatFraction, formatDecimal } from './format.js';
import { frac } from './fraction.js';

test('every locale has 6 grades and a known layout', () => {
  for (const [k, l] of Object.entries(LOCALES)) {
    assert.equal(l.grades.length, 6, k);
    assert.ok(['galera', 'bracket', 'linear'].includes(l.layout), k);
  }
  assert.equal(LOCALES.es.grades[0].name, '1.º de primaria');
  assert.ok(LOCALES.es.grades[0].synonyms.includes('1.er grado'));
});

test('regional prefs from the browser language', () => {
  const mx = resolvePrefs('es', ['es-MX']);
  assert.deepEqual([mx.decimalSep, mx.paper, mx.layout, mx.div], ['.', 'Letter', 'bracket', '÷']);
  const es = resolvePrefs('es', ['es-ES', 'en']);
  assert.deepEqual([es.decimalSep, es.paper, es.layout, es.div], [',', 'A4', 'galera', ':']);
  const ar = resolvePrefs('es', ['es-AR']);
  assert.deepEqual([ar.decimalSep, ar.paper], [',', 'A4']);
  const plain = resolvePrefs('es', []);
  assert.deepEqual([plain.decimalSep, plain.paper, plain.layout], [',', 'A4', 'galera']);
  const usEnglish = resolvePrefs('es', ['en-US']);
  assert.equal(usEnglish.paper, 'Letter');
  const de = resolvePrefs('de', ['de-DE']);
  assert.deepEqual([de.mul, de.div, de.layout, de.decimalSep], ['·', ':', 'linear', ',']);
  assert.equal(resolvePrefs('ar', ['ar-EG']).digits, 'arab');
  assert.equal(resolvePrefs('ar', ['ar-MA']).digits, 'latn');
  assert.equal(decimalSeparator('it'), ',');
  assert.throws(() => resolvePrefs('ru'), RangeError);
});

test('formatting', () => {
  const es = resolvePrefs('es', ['es-ES']);
  const mx = resolvePrefs('es', ['es-MX']);
  const eg = resolvePrefs('ar', ['ar-EG']);
  assert.equal(formatNumber(1234.5, mx), '1,234.5');
  assert.equal(formatNumber(-0.75, es), '−0,75');
  assert.equal(formatNumber(12, eg), '١٢');
  assert.equal(formatFraction(frac(-7, 3), es, { mixed: true }), '−2 1/3');
  assert.equal(formatFraction(frac(3, 4), eg), '٣/٤');
  assert.equal(formatDecimal(frac(1, 6), es), '0,1(6)');
  assert.equal(formatDecimal(frac(5, 4), mx), '1.25');
  assert.equal(formatDecimal(frac(3, 1), es), '3');
});
