// Kids science experiments + edu fun (Keyword Planner ideas). Run from /opt/google-ads-mcp with .env.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const OUT = process.argv[2];
const CLP = 950;
const c = readConfigFromEnv();
const geo = (ids) => ids.map((g) => `geoTargetConstants/${g}`);
const M = {
  es: { lang: 1003, geos: geo([2724, 2484, 2840, 2032, 2170, 2152, 2604, 2218, 2862]), seeds: [
    ["experimentos para niños", "experimentos caseros", "experimentos de ciencia", "experimentos faciles", "volcan casero", "slime casero"],
    ["acertijos matematicos", "juegos de logica", "sudoku para niños", "adivinanzas para niños", "juegos educativos para niños", "retos matematicos"],
  ]},
  en: { lang: 1000, geos: geo([2840, 2826, 2124, 2036]), seeds: [
    ["science experiments for kids", "easy science experiments", "science fair projects", "stem activities for kids", "baking soda volcano", "how to make slime"],
    ["math riddles", "logic puzzles for kids", "brain teasers for kids", "educational games for kids", "math tricks", "kids puzzles printable"],
  ]},
  pt: { lang: 1014, geos: geo([2076, 2620]), seeds: [
    ["experiencias para crianças", "experimentos de ciencias", "experiencias faceis", "feira de ciencias", "vulcão caseiro", "slime caseiro"],
    ["desafios matematicos", "charadas", "jogos de logica", "enigmas matematicos", "jogos educativos online", "atividades educativas"],
  ]},
};
const res = {};
for (const [m, cfg] of Object.entries(M)) {
  const rows = new Map();
  for (const s of cfg.seeds) {
    const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordIdeas", body: { language: `languageConstants/${cfg.lang}`, geoTargetConstants: cfg.geos, keywordPlanNetwork: "GOOGLE_SEARCH", keywordSeed: { keywords: s }, pageSize: 2000 } });
    for (const x of r.results || []) {
      const mm = x.keywordIdeaMetrics || {};
      rows.set(x.text, { k: x.text, v: +(mm.avgMonthlySearches || 0), hi: +(+(mm.highTopOfPageBidMicros || 0) / 1e6 / CLP).toFixed(2) });
    }
    await new Promise((z) => setTimeout(z, 2500));
  }
  res[m] = [...rows.values()].sort((a, b) => b.v - a.v);
  console.log(`\n[${m}] ideas ${res[m].length}`);
  console.log(res[m].slice(0, 40).map((x) => `${x.k} ${x.v}${x.hi ? " $" + x.hi : ""}`).join("; "));
}
fs.writeFileSync(OUT, JSON.stringify(res));
