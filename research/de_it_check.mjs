// Spot check of main DE/IT/ES queries (worldwide, by language): volume + top bid USD.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";
const c = readConfigFromEnv();
const L = {
  de: [1001, ["1x1", "1x1 üben", "einmaleins", "einmaleins üben", "kleines einmaleins", "1x1 spiele", "einmaleins tabelle", "bruchrechnen", "brüche kürzen", "prozentrechnung", "prozentrechner", "römische zahlen", "römische zahlen umrechnen", "schriftlich dividieren", "schriftliche division", "kgv berechnen", "ggt berechnen", "arbeitsblätter mathe", "mathe arbeitsblätter grundschule", "mathe spiele", "kopfrechnen", "punkt vor strich", "wurzel ziehen"]],
  it: [1004, ["tabelline", "tabelline da stampare", "tabellina del 7", "giochi tabelline", "tavola pitagorica", "frazioni", "calcolatrice frazioni", "frazioni equivalenti", "numeri romani", "convertitore numeri romani", "divisioni in colonna", "divisioni a due cifre", "mcm e mcd", "minimo comune multiplo", "calcolo percentuale", "percentuale", "schede matematica", "schede didattiche matematica", "esercizi matematica prima elementare", "giochi matematica", "espressioni", "radice quadrata"]],
};
const out = {};
for (const [lang, [id, kws]] of Object.entries(L)) {
  const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords: kws, language: `languageConstants/${id}`, keywordPlanNetwork: "GOOGLE_SEARCH" } });
  const map = new Map();
  for (const x of r.results || []) {
    const m = { v: +(x.keywordMetrics?.avgMonthlySearches || 0), hi: +(+(x.keywordMetrics?.highTopOfPageBidMicros || 0) / 1e6 / 950).toFixed(2) };
    map.set(x.text.toLowerCase(), m);
    for (const y of x.closeVariants || []) if (!map.has(y.toLowerCase())) map.set(y.toLowerCase(), m);
  }
  out[lang] = kws.map((k) => ({ k, ...(map.get(k.toLowerCase()) || { v: 0, hi: 0 }) }));
  for (const x of out[lang]) console.log(lang, x.k, x.v, "$" + x.hi);
  await new Promise((z) => setTimeout(z, 2000));
}
fs.writeFileSync("/opt/math-kids/research/de_it_check.json", JSON.stringify(out, null, 1));
