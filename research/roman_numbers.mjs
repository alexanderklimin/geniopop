// Exact volumes for "<n> en números romanos" (Spanish, worldwide) to pick individual Roman numeral pages.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";
const c = readConfigFromEnv();
const ns = [...Array.from({ length: 100 }, (_, i) => i + 1), 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000, 5000, 10000, 1000000, ...Array.from({ length: 41 }, (_, i) => 1990 + i)];
const kws = ns.map((n) => `${n} en numeros romanos`);
const out = {};
for (let i = 0; i < kws.length; i += 200) {
  const chunk = kws.slice(i, i + 200);
  const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords: chunk, language: "languageConstants/1003", keywordPlanNetwork: "GOOGLE_SEARCH" } });
  for (const x of r.results || []) { const v = +(x.keywordMetrics?.avgMonthlySearches || 0); for (const t of [x.text, ...(x.closeVariants || [])]) { const m = t.match(/^(\d+)/); if (m && (!out[m[1]] || out[m[1]] < v)) out[m[1]] = v; } }
  await new Promise((z) => setTimeout(z, 2000));
}
const rows = Object.entries(out).map(([n, v]) => [Number(n), v]).sort((a, b) => b[1] - a[1]);
fs.writeFileSync("/opt/math-kids/research/roman_numbers.json", JSON.stringify(rows));
console.log(rows.slice(0, 70).map(([n, v]) => `${n}:${v}`).join(' '));
console.log('total', rows.reduce((s, [, v]) => s + v, 0));
