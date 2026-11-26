// Kids math niche scan (Keyword Planner ideas, read-only). Run from /opt/google-ads-mcp with .env.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const OUT = process.argv[2];
const CLP = 950;
const c = readConfigFromEnv();
const geo = (ids) => ids.map((g) => `geoTargetConstants/${g}`);

const MARKETS = {
  es: { lang: 1003, geos: geo([2724, 2484, 2840, 2032, 2170, 2152, 2604, 2218, 2862]), seeds: [
    ["tablas de multiplicar", "juegos de matematicas", "ejercicios de matematicas", "fichas de matematicas para imprimir", "sumas y restas", "problemas de matematicas"],
    ["calculadora de fracciones", "fracciones", "division", "raiz cuadrada", "minimo comun multiplo", "numeros romanos"],
    ["juegos de matematicas para niños", "matematicas primaria", "calculo mental", "operaciones combinadas", "tabla del 7", "porcentaje"],
  ]},
  en: { lang: 1000, geos: geo([2840, 2826, 2124, 2036, 2356, 2608, 2566]), seeds: [
    ["multiplication table", "math games", "math worksheets", "times tables games", "addition worksheets", "math facts"],
    ["fraction calculator", "long division", "math games for kids", "roman numerals", "lcm calculator", "percentage calculator"],
    ["mental math", "math puzzles", "number line", "place value", "telling time worksheets", "sudoku for kids"],
  ]},
  pt: { lang: 1014, geos: geo([2076, 2620]), seeds: [
    ["tabuada", "jogos de matematica", "atividades de matematica", "exercicios de matematica", "calculadora de fração", "tabuada do 7"],
    ["continhas", "atividades de matematica para imprimir", "jogos educativos", "fracoes", "numeros romanos", "mmc"],
  ]},
  ru: { lang: 1031, geos: geo([2398, 2804, 2860, 2417, 2051, 2268]), seeds: [ // KZ UA UZ KG AM GE (Russia blocked)
    ["таблица умножения", "математика 1 класс", "примеры по математике", "задачи по математике", "игры по математике", "устный счет"],
    ["калькулятор дробей", "столбик деление", "тренажер таблица умножения", "математика для детей", "примеры 2 класс", "римские цифры"],
  ]},
};

const res = {};
for (const [m, cfg] of Object.entries(MARKETS)) {
  const rows = new Map();
  for (const s of cfg.seeds) {
    const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordIdeas", body: { language: `languageConstants/${cfg.lang}`, geoTargetConstants: cfg.geos, keywordPlanNetwork: "GOOGLE_SEARCH", keywordSeed: { keywords: s }, pageSize: 2000 } });
    for (const x of r.results || []) {
      const mm = x.keywordIdeaMetrics || {};
      rows.set(x.text, { k: x.text, v: +(mm.avgMonthlySearches || 0), hi: +(+(mm.highTopOfPageBidMicros || 0) / 1e6 / CLP).toFixed(2), comp: mm.competition || "" });
    }
    await new Promise((z) => setTimeout(z, 2500));
  }
  res[m] = [...rows.values()].sort((a, b) => b.v - a.v);
  const sum = res[m].reduce((s, x) => s + x.v, 0);
  console.log(`\n[${m}] ideas ${res[m].length} sum ${sum}`);
  console.log(res[m].slice(0, 45).map((x) => `${x.k} ${x.v}${x.hi ? " $" + x.hi : ""}`).join("; "));
}
fs.writeFileSync(OUT, JSON.stringify(res));
