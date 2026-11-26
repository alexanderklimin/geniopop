// Per-language school conventions. The static page renders the language default;
// in the browser resolvePrefs() refines it from navigator.language (es-MX → decimal point,
// Letter paper, bracket division). Never from IP. The user can always switch.
// draft: true = not yet checked by a native speaker / teacher.

// Long-division layouts
//  galera   — dividend left, divisor right under a corner, quotient under the divisor (ES, AR, CL, IT, FR, BR)
//  bracket  — divisor left, dividend under the bracket, quotient on top (MX "casita", US)
//  linear   — 7865 : 5 = 1573, partial steps written underneath (DE, AT, CH)
export const LAYOUTS = ['galera', 'bracket', 'linear'];

const LETTER_REGIONS = new Set(['US', 'CA', 'MX', 'CL', 'CO', 'VE', 'PH', 'CR', 'GT', 'DO', 'PA', 'PR', 'SV', 'NI', 'HN']);

export const LOCALES = {
  es: {
    lang: 'es', dir: 'ltr', intl: 'es',
    mul: '×', div: '÷', layout: 'galera', paper: 'A4', digits: 'latn',
    // regional overrides by navigator.language region
    regions: {
      MX: { div: '÷', layout: 'bracket', intl: 'es-MX' },
      US: { div: '÷', layout: 'bracket', intl: 'es-US' },
      ES: { div: ':', intl: 'es-ES' },
      AR: { intl: 'es-AR' }, CL: { intl: 'es-CL' }, CO: { intl: 'es-CO' }, PE: { intl: 'es-PE' },
      EC: { intl: 'es-EC' }, VE: { intl: 'es-VE' }, UY: { intl: 'es-UY' },
    },
    // Spain: 1.º de primaria; Mexico/Colombia/Peru…: 1.er grado; Chile: 1.º básico
    grades: [
      { id: 1, name: '1.º de primaria', synonyms: ['1.er grado', '1.º básico'], age: '6–7' },
      { id: 2, name: '2.º de primaria', synonyms: ['2.º grado', '2.º básico'], age: '7–8' },
      { id: 3, name: '3.º de primaria', synonyms: ['3.er grado', '3.º básico'], age: '8–9' },
      { id: 4, name: '4.º de primaria', synonyms: ['4.º grado', '4.º básico'], age: '9–10' },
      { id: 5, name: '5.º de primaria', synonyms: ['5.º grado', '5.º básico'], age: '10–11' },
      { id: 6, name: '6.º de primaria', synonyms: ['6.º grado', '6.º básico'], age: '11–12' },
    ],
  },
  de: {
    lang: 'de', dir: 'ltr', intl: 'de',
    mul: '·', div: ':', layout: 'linear', paper: 'A4', digits: 'latn',
    regions: { AT: { intl: 'de-AT' }, CH: { intl: 'de-CH' } },
    grades: [1, 2, 3, 4, 5, 6].map((id) => ({ id, name: `${id}. Klasse`, synonyms: [`${id}. Schuljahr`], age: `${id + 5}–${id + 6}` })),
  },
  it: {
    lang: 'it', dir: 'ltr', intl: 'it',
    mul: '×', div: ':', layout: 'galera', paper: 'A4', digits: 'latn',
    regions: { CH: { intl: 'it-CH' } },
    grades: ['prima', 'seconda', 'terza', 'quarta', 'quinta'].map((w, i) => ({ id: i + 1, name: `${w} elementare`, synonyms: [`classe ${w}`, `${i + 1}ª primaria`], age: `${i + 6}–${i + 7}` }))
      .concat([{ id: 6, name: 'prima media', synonyms: ['1ª secondaria di primo grado'], age: '11–12' }]),
  },
  'pt-BR': {
    lang: 'pt-BR', dir: 'ltr', intl: 'pt-BR', draft: true,
    mul: '×', div: '÷', layout: 'galera', paper: 'A4', digits: 'latn', regions: {},
    grades: [1, 2, 3, 4, 5, 6].map((id) => ({ id, name: `${id}º ano`, synonyms: [`${id}º ano do Ensino Fundamental`], age: `${id + 5}–${id + 6}` })),
  },
  fr: {
    lang: 'fr', dir: 'ltr', intl: 'fr', draft: true,
    mul: '×', div: ':', layout: 'galera', paper: 'A4', digits: 'latn', regions: { CA: { intl: 'fr-CA' }, BE: { intl: 'fr-BE' }, CH: { intl: 'fr-CH' } },
    grades: ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6e'].map((name, i) => ({ id: i + 1, name, synonyms: [], age: `${i + 6}–${i + 7}` })),
  },
  ar: {
    // Eastern Arabic digits (٠١٢٣) are common in Egypt and the Levant, Western digits in the Maghreb and much of the Gulf: offer both.
    lang: 'ar', dir: 'rtl', intl: 'ar', draft: true,
    mul: '×', div: '÷', layout: 'bracket', paper: 'A4', digits: 'arab', regions: { MA: { digits: 'latn' }, DZ: { digits: 'latn' }, TN: { digits: 'latn' } },
    grades: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'].map((w, i) => ({ id: i + 1, name: `الصف ${w} الابتدائي`, synonyms: [], age: `${i + 6}–${i + 7}` })),
  },
};

export const LANGS = Object.keys(LOCALES);

export function getLocale(lang) {
  const loc = LOCALES[lang];
  if (!loc) throw new RangeError(`Unknown language ${lang}`);
  return loc;
}

const regionOf = (tag) => {
  try { return new Intl.Locale(tag).maximize().region ?? null; } catch { return null; }
};

// prefs for a page language; browserLangs = navigator.languages (first one with the same language wins)
export function resolvePrefs(lang, browserLangs = []) {
  const base = getLocale(lang);
  const baseLang = lang.split('-')[0];
  const match = browserLangs.find((t) => typeof t === 'string' && t.toLowerCase().split('-')[0] === baseLang && t.includes('-'));
  const region = match ? regionOf(match) : null;
  const over = (region && base.regions[region]) || {};
  const intl = over.intl ?? (match && region ? `${baseLang}-${region}` : base.intl);
  const anyRegion = region ?? (browserLangs.map(regionOf).find(Boolean) ?? null);
  return {
    lang, dir: base.dir, region,
    intl,
    mul: over.mul ?? base.mul,
    div: over.div ?? base.div,
    layout: over.layout ?? base.layout,
    digits: over.digits ?? base.digits,
    paper: anyRegion && LETTER_REGIONS.has(anyRegion) ? 'Letter' : base.paper,
    decimalSep: decimalSeparator(intl),
  };
}

export function decimalSeparator(intlTag) {
  return new Intl.NumberFormat(intlTag).formatToParts(1.5).find((p) => p.type === 'decimal')?.value ?? '.';
}

export const PAPER = {
  A4: { width: 210, height: 297, unit: 'mm' },
  Letter: { width: 215.9, height: 279.4, unit: 'mm' },
};
