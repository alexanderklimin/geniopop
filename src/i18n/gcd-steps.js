// HTML for GCD/LCM solutions (src/lib/numtheory.js gcdLcmSteps / euclidSteps), per language.
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (e) => (e === 1 ? '' : String(e).split('').map((c) => SUP[c]).join(''));
export const powers = (fs, mul = '·') => (fs.length ? fs.map(([p, e]) => `${p}${sup(e)}`).join(` ${mul} `) : '1');

function ladder(f) {
  const rows = f.ladder.map((r) => `<tr><td>${r.value}</td><td>${r.prime ?? ''}</td></tr>`).join('');
  return `<figure class="ladder"><table><tbody>${rows}</tbody></table><figcaption>${f.n} = ${powers(f.factors)}</figcaption></figure>`;
}

export const GCD_TEXT = {
  es: {
    labels: { calc: 'Calcular', placeholder: 'Por ejemplo: 12, 18, 30', err: 'Escribe entre 2 y 6 números enteros del 1 al 1 000 000, separados por comas o espacios.', mcd: 'MCD', mcm: 'MCM', steps: 'Paso a paso', euclid: 'Con el algoritmo de Euclides' },
    html(r, euclid) {
      const list = r.nums.join(', ');
      const out = [];
      out.push(`<li>Descomponemos cada número en factores primos, dividiendo entre el primo más pequeño posible hasta llegar a 1:<div class="ladders">${r.factorizations.map(ladder).join('')}</div></li>`);
      out.push(r.gcdFactors.length
        ? `<li><strong>Máximo común divisor:</strong> tomamos solo los factores <em>comunes</em> a todos los números, con el exponente <em>menor</em>: mcd(${list}) = ${powers(r.gcdFactors)} = <strong>${r.gcd}</strong>.</li>`
        : `<li><strong>Máximo común divisor:</strong> no hay ningún factor primo común a todos, así que mcd(${list}) = <strong>1</strong>. Se dice que son <em>primos entre sí</em>.</li>`);
      out.push(`<li><strong>Mínimo común múltiplo:</strong> tomamos <em>todos</em> los factores que aparecen, comunes y no comunes, con el exponente <em>mayor</em>: mcm(${list}) = ${powers(r.lcmFactors)} = <strong>${r.lcm}</strong>.</li>`);
      if (r.nums.length === 2) out.push(`<li>Comprobación: con dos números, mcd × mcm = ${r.gcd} × ${r.lcm} = ${r.gcd * r.lcm}, igual que ${r.nums[0]} × ${r.nums[1]} = ${r.nums[0] * r.nums[1]}.</li>`);
      let html = `<ol class="fx-steps">${out.join('')}</ol>`;
      if (euclid) html += `<h4>${this.labels.euclid}</h4><p>Se divide el mayor entre el menor y después el divisor entre el resto, hasta que el resto sea 0. El último divisor es el mcd.</p><ul class="euclid">${euclid.rows.map((x) => `<li>${x.a} = ${x.q} × ${x.b} + ${x.r}</li>`).join('')}</ul><p>mcd = <strong>${euclid.gcd}</strong></p>`;
      return html;
    },
  },
};
