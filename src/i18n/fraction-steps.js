// Turns fraction-calculator steps (src/lib/fraction.js solve/simplifySteps) into HTML, per language.
// Used both at build time (worked examples in the page) and in the browser (calculator island).
// All values are numbers from the math module; nothing user-typed is inserted as HTML.

const M = '−';
const num = (n) => (n < 0 ? M + Math.abs(n) : String(n));

export function fr(f) {
  if (f.d === 1) return `<span class="int">${num(f.n)}</span>`;
  const sign = f.n < 0 ? `<span class="sg">${M}</span>` : '';
  return `${sign}<span class="fr"><span class="nu">${Math.abs(f.n)}</span><span class="de">${f.d}</span></span>`;
}
export function frRaw(n, d) {
  return `<span class="fr"><span class="nu">${n}</span><span class="de">${d}</span></span>`;
}
export function mixed(m) {
  if (!m.n) return `<span class="int">${m.sign < 0 ? M : ''}${m.whole}</span>`;
  return `<span class="int">${m.sign < 0 ? M : ''}${m.whole}</span>${frRaw(m.n, m.d)}`;
}
const eq = (...parts) => `<span class="math">${parts.join(' <span class="op">=</span> ')}</span>`;
const OPS = { '+': '+', '-': M, '*': '×', '/': '÷' };
const op = (o) => ` <span class="op">${OPS[o]}</span> `;

export const STEPS = {
  es: {
    ordinal: { first: 'la primera fracción', second: 'la segunda fracción' },
    opName: { '+': 'suma', '-': 'resta', '*': 'multiplicación', '/': 'división' },
    labels: { result: 'Resultado', mixed: 'Número mixto', decimal: 'En decimal', steps: 'Paso a paso', whole: 'entero', num: 'numerador', den: 'denominador', calc: 'Calcular', example: 'Ejemplo', errEmpty: 'Escribe el numerador y el denominador de las dos fracciones.', errZero: 'El denominador no puede ser 0.', errDivZero: 'No se puede dividir entre 0.', errBig: 'Los números son demasiado grandes.' },
    step(s) {
      switch (s.k) {
        case 'toImproper': {
          const { whole, n, d, sign } = s.mixed;
          return `Pasamos ${this.ordinal[s.which]}, que es un número mixto, a fracción: ${eq(mixed({ sign, whole, n, d }), `${sign < 0 ? M : ''}${frRaw(`${whole} × ${d} + ${n}`, d)}`, fr(s.result))}`;
        }
        case 'sameDenominator':
          return `Las dos fracciones tienen el mismo denominador (${s.d}), así que no hay que cambiar nada: trabajamos directamente con los numeradores.`;
        case 'commonDenominator':
          return `Los denominadores son distintos (${s.d1} y ${s.d2}), así que buscamos un denominador común. Usamos el mínimo común múltiplo: mcm(${s.d1}, ${s.d2}) = <strong>${s.lcm}</strong>.${s.lcm !== s.product ? ` También valdría ${s.d1} × ${s.d2} = ${s.product}, pero con el mcm los números quedan más pequeños.` : ''}`;
        case 'amplify':
          return `Amplificamos ${this.ordinal[s.which]}: multiplicamos el numerador y el denominador por ${s.factor} (porque ${s.f.d} × ${s.factor} = ${s.result.d}). ${eq(fr(s.f), frRaw(`${num(s.f.n)} × ${s.factor}`, `${s.f.d} × ${s.factor}`), fr(s.result))}`;
        case 'combine':
          return `${s.op === '+' ? 'Sumamos' : 'Restamos'} los numeradores y dejamos el mismo denominador: ${eq(frRaw(`${num(s.n1)} ${OPS[s.op]} ${s.n2 < 0 ? `(${num(s.n2)})` : s.n2}`, s.d), fr(s.result))}`;
        case 'reciprocal':
          return `Dividir entre una fracción es lo mismo que multiplicar por su inversa. Damos la vuelta a la segunda fracción: ${fr(s.f)} → ${fr(s.result)}`;
        case 'crossSimplify': {
          const parts = [];
          if (s.g1 > 1) parts.push(`el numerador ${Math.abs(s.left.n)} y el denominador ${s.right.d} entre ${s.g1}`);
          if (s.g2 > 1) parts.push(`el numerador ${Math.abs(s.right.n)} y el denominador ${s.left.d} entre ${s.g2}`);
          return `Antes de multiplicar, simplificamos en cruz: dividimos ${parts.join(' y ')}. Así los números quedan más pequeños: ${fr(s.left)}${op('*')}${fr(s.right)} → ${fr(s.leftResult)}${op('*')}${fr(s.rightResult)}`;
        }
        case 'multiply':
          return `Multiplicamos numerador por numerador y denominador por denominador: ${eq(`${fr(s.left)}${op('*')}${fr(s.right)}`, frRaw(`${num(s.left.n)} × ${num(s.right.n)}`, `${s.left.d} × ${s.right.d}`), fr(s.result))}`;
        case 'simplify':
          return `Simplificamos: el máximo común divisor de ${Math.abs(s.f.n)} y ${s.f.d} es ${s.gcd}, así que dividimos los dos entre ${s.gcd}: ${eq(fr(s.f), fr(s.result))}`;
        case 'toMixed':
          return `El numerador es mayor que el denominador, así que también se puede escribir como número mixto: ${Math.abs(s.f.n)} ÷ ${s.f.d} = ${s.mixed.whole} y sobran ${s.mixed.n}. ${eq(fr(s.f), mixed(s.mixed))}`;
        case 'isWhole':
          return `El resultado es un número entero: <strong>${num(s.value)}</strong>.`;
        case 'gcd':
          return `Buscamos el máximo común divisor del numerador y el denominador: mcd(${s.a}, ${s.b}) = <strong>${s.gcd}</strong>.`;
        case 'divideBoth':
          return `Dividimos el numerador y el denominador entre ${s.by}: ${eq(fr(s.f), frRaw(`${num(s.f.n)} ÷ ${s.by}`, `${s.f.d} ÷ ${s.by}`), fr(s.result))}`;
        case 'crossCheck':
          return `Multiplicamos en cruz: ${Math.abs(s.a.n) === s.a.n ? s.a.n : num(s.a.n)} × ${s.b.d} = <strong>${num(s.left)}</strong> y ${s.a.d} × ${num(s.b.n)} = <strong>${num(s.right)}</strong>. ${s.left === s.right ? 'Los productos son iguales, así que las fracciones son <strong>equivalentes</strong>: representan la misma cantidad.' : 'Los productos son distintos, así que las fracciones <strong>no son equivalentes</strong>.'}`;
        case 'equivList':
          return `Fracciones equivalentes a ${fr(s.f)} (multiplicando arriba y abajo por 2, 3, 4…): ${s.list.map(fr).join(', ')}`;
        case 'chain':
          return `Otra forma, paso a paso con divisores pequeños: ${s.chain.map((c, i) => `${i === 0 ? fr(c.from) : ''} <span class="op">→</span><small>÷${c.by}</small> ${fr(c.to)}`).join('')}`;
        case 'alreadySimplest':
          return `${fr(s.f)} ya es irreducible: el numerador y el denominador no tienen ningún divisor común aparte del 1.`;
        default:
          return '';
      }
    },
  },
};

// Whole solution as an ordered list (HTML string)
const show = (x) => (x.mixed ? mixed(x.mixed) : fr(x.value ?? x));

export function solutionHTML(lang, a, o, b, res) {
  const L = STEPS[lang];
  const head = `<p class="fx-problem">${show(a)}${op(o)}${show(b)} <span class="op">=</span> <strong>${fr(res.result)}</strong></p>`;
  const steps = res.steps.map((s) => `<li>${L.step(s)}</li>`).join('');
  return `${head}<ol class="fx-steps">${steps}</ol>`;
}

export function simplifyHTML(lang, a, res) {
  const L = STEPS[lang];
  const steps = [...res.steps];
  if (res.chain.length > 1) steps.push({ k: 'chain', chain: res.chain });
  return `<p class="fx-problem">${show(a)} <span class="op">=</span> <strong>${fr(res.result)}</strong></p><ol class="fx-steps">${steps.map((s) => `<li>${L.step(s)}</li>`).join('')}</ol>`;
}

export function equivHTML(lang, a, b) {
  const L = STEPS[lang];
  const A = a.value ?? a, B = b.value ?? b;
  const left = A.n * B.d, right = A.d * B.n;
  const steps = [{ k: 'crossCheck', a: A, b: B, left, right }];
  const g = Math.abs(gcdLocal(A.n, A.d)) || 1;
  const base = { n: A.n / g, d: A.d / g };
  steps.push({ k: 'equivList', f: base, list: [2, 3, 4, 5, 10].map((k) => ({ n: base.n * k, d: base.d * k })) });
  const same = left === right;
  return { same, html: `<p class="fx-problem">${show(a)} <span class="op">${same ? '=' : '≠'}</span> ${show(b)}</p><ol class="fx-steps">${steps.map((s) => `<li>${L.step(s)}</li>`).join('')}</ol>` };
}
function gcdLocal(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
