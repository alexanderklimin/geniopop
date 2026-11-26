import test from 'node:test';
import assert from 'node:assert/strict';
import { ordinal, alternatives, apocope, abbreviation } from './ordinal-es.js';

test('Spanish ordinals', () => {
  assert.equal(ordinal(1), 'primero');
  assert.equal(ordinal(1, 'f'), 'primera');
  assert.equal(ordinal(10), 'décimo');
  assert.equal(ordinal(11), 'undécimo');
  assert.equal(ordinal(12, 'f'), 'duodécima');
  assert.equal(ordinal(13), 'decimotercero');
  assert.equal(ordinal(18), 'decimoctavo');
  assert.equal(ordinal(20), 'vigésimo');
  assert.equal(ordinal(21), 'vigésimo primero');
  assert.equal(ordinal(21, 'f'), 'vigésima primera');
  assert.equal(ordinal(45), 'cuadragésimo quinto');
  assert.equal(ordinal(100), 'centésimo');
  assert.equal(ordinal(101), 'centésimo primero');
  assert.equal(ordinal(111), 'centésimo undécimo');
  assert.equal(ordinal(250), 'ducentésimo quincuagésimo');
  assert.equal(ordinal(999), 'noningentésimo nonagésimo noveno');
  assert.equal(ordinal(1000), 'milésimo');
  assert.throws(() => ordinal(0), RangeError);
});

test('alternatives, apocope, abbreviations', () => {
  assert.deepEqual(alternatives(11), ['decimoprimero']);
  assert.deepEqual(alternatives(12, 'f'), ['decimosegunda']);
  assert.deepEqual(alternatives(21), ['vigesimoprimero']);
  assert.deepEqual(alternatives(21, 'f'), ['vigesimoprimera']);
  assert.deepEqual(alternatives(33), ['trigesimotercero']);
  assert.deepEqual(alternatives(20), []);
  assert.deepEqual(alternatives(28), ['vigesimoctavo']);
  assert.equal(ordinal(18), 'decimoctavo');
  assert.equal(apocope(3), 'tercer');
  assert.equal(apocope(21), 'vigésimo primer');
  assert.equal(apocope(5), null);
  assert.equal(abbreviation(1, 'm'), '1.º');
  assert.equal(abbreviation(1, 'f'), '1.ª');
  assert.equal(abbreviation(3, 'm', true), '3.er');
});
