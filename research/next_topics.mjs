// Next content batch for /es/: specific Roman numerals (ideas) + candidate topics (exact volumes). Worldwide, Spanish.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";
const c = readConfigFromEnv();
const LANG = "languageConstants/1003";
const ideas = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordIdeas", body: { language: LANG, keywordPlanNetwork: "GOOGLE_SEARCH", keywordSeed: { keywords: ["en números romanos", "números romanos del 1 al 100", "como se escribe en numeros romanos"] }, pageSize: 1000 } });
const roman = (ideas.results || []).map((x) => ({ k: x.text, v: +(x.keywordIdeaMetrics?.avgMonthlySearches || 0) })).filter((x) => /roman/.test(x.k)).sort((a, b) => b.v - a.v);
await new Promise((z) => setTimeout(z, 2000));
const topics = ["números decimales", "suma de decimales", "resta de decimales", "multiplicación de decimales", "división de decimales", "decimal a fracción", "fracción a decimal", "números primos", "tabla de números primos", "reglas de divisibilidad", "múltiplos y divisores", "ecuaciones de primer grado", "problemas de matemáticas", "juegos de matemáticas", "juegos matemáticos", "cálculo mental", "sumas para niños", "restas para niños", "sumas y restas", "divisiones de dos cifras", "regla de tres", "calculadora regla de tres", "redondeo de números", "valor posicional", "fracciones para niños", "medidas de longitud", "conversión de unidades", "área y perímetro", "perímetro", "área de un triángulo", "ángulos", "figuras geométricas", "reloj para niños", "aprender la hora", "números ordinales", "números pares e impares", "mayor que menor que", "series numéricas", "acertijos matemáticos", "sudoku para niños", "experimentos caseros", "experimentos para niños", "slime casero", "volcán casero", "media aritmética", "promedio", "porcentaje de descuento", "notación científica", "mínimo común múltiplo", "máximo común divisor"];
const hm = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords: topics, language: LANG, keywordPlanNetwork: "GOOGLE_SEARCH" } });
const map = new Map();
for (const x of hm.results || []) { const m = { v: +(x.keywordMetrics?.avgMonthlySearches || 0), hi: +(+(x.keywordMetrics?.highTopOfPageBidMicros || 0) / 1e6 / 950).toFixed(2) }; map.set(x.text.toLowerCase(), m); for (const y of x.closeVariants || []) if (!map.has(y.toLowerCase())) map.set(y.toLowerCase(), m); }
const tv = topics.map((k) => ({ k, ...(map.get(k.toLowerCase()) || { v: 0, hi: 0 }) })).sort((a, b) => b.v - a.v);
fs.writeFileSync("/opt/math-kids/research/next_topics.json", JSON.stringify({ roman: roman.slice(0, 150), topics: tv }, null, 1));
console.log("ROMAN top 40:"); for (const x of roman.slice(0, 40)) console.log(x.v, x.k);
console.log("\nTOPICS:"); for (const x of tv) console.log(x.v, "$" + x.hi, x.k);
