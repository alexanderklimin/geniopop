// Spanish ordinal numerals 1–1000 (RAE forms). gender 'm' | 'f'. Also apocope (primer/tercer) and abbreviations.
const U = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno'];
const T = ['', 'décimo', 'vigésimo', 'trigésimo', 'cuadragésimo', 'quincuagésimo', 'sexagésimo', 'septuagésimo', 'octogésimo', 'nonagésimo'];
const H = ['', 'centésimo', 'ducentésimo', 'tricentésimo', 'cuadringentésimo', 'quingentésimo', 'sexcentésimo', 'septingentésimo', 'octingentésimo', 'noningentésimo'];
// 13–19 written as one word (RAE: decimotercero…); 11 and 12 have two accepted forms
const TEEN = { 11: ['undécimo', 'decimoprimero'], 12: ['duodécimo', 'decimosegundo'], 13: 'decimotercero', 14: 'decimocuarto', 15: 'decimoquinto', 16: 'decimosexto', 17: 'decimoséptimo', 18: 'decimoctavo', 19: 'decimonoveno' };

const fem = (w) => w.replace(/o$/, 'a');

function below100(n) {
  if (n < 10) return [U[n]];
  if (n === 10) return ['décimo'];
  if (n < 20) { const t = TEEN[n]; return [Array.isArray(t) ? t[0] : t]; }
  const t = Math.floor(n / 10), u = n % 10;
  return u ? [T[t], U[u]] : [T[t]];
}

export function ordinal(n, gender = 'm') {
  if (!Number.isInteger(n) || n < 1 || n > 1000) throw new RangeError('Ordinals 1–1000');
  let words;
  if (n === 1000) words = ['milésimo'];
  else {
    const h = Math.floor(n / 100), rest = n % 100;
    words = [...(h ? [H[h]] : []), ...(rest ? below100(rest) : [])];
  }
  const text = (gender === 'f' ? words.map(fem) : words).join(' ');
  return text;
}

// Alternative accepted spellings (RAE): 11/12 forms, and 21–99 written as one word (vigesimoprimero)
export function alternatives(n, gender = 'm') {
  const out = [];
  const r = n % 100;
  if (r === 11 || r === 12) {
    const h = Math.floor(n / 100);
    const alt = (h ? `${H[h]} ` : '') + TEEN[r][1];
    out.push(gender === 'f' ? alt.split(' ').map(fem).join(' ') : alt);
  }
  if (n >= 21 && n <= 99 && n % 10) {
    const t = Math.floor(n / 10), u = n % 10;
    const head = T[t].replace('é', 'e');
    const one = U[u].startsWith('o') ? head.slice(0, -1) + U[u] : head + U[u]; // vigesimoctavo (o + o fuse)
    out.push(gender === 'f' ? fem(one) : one); // one-word form: only the last element agrees (vigesimoprimera)
  }
  return out;
}

// "primer" / "tercer" before a masculine singular noun (also when they end a compound: vigésimo primer)
export function apocope(n) {
  const m = ordinal(n, 'm');
  return /(primero|tercero)$/.test(m) ? m.replace(/primero$/, 'primer').replace(/tercero$/, 'tercer') : null;
}

export function abbreviation(n, gender = 'm', apoc = false) {
  if (gender === 'f') return `${n}.ª`;
  if (apoc && apocope(n)) return `${n}.er`;
  return `${n}.º`;
}
