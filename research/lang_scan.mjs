// Same concept set across languages (worldwide, no geo): volume + top bid. Run from /opt/google-ads-mcp with .env.
// Output: research/lang_scan.json / lang_scan.csv
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const DIR = "/opt/math-kids/research/";
const CLP = 950;
const c = readConfigFromEnv();
// concept order: table, table game, fraction calc, math games, worksheets, roman, long division, percent, grade-2 math
const L = {
  es: [1003, ["tablas de multiplicar", "juegos de tablas de multiplicar", "calculadora de fracciones", "juegos de matematicas", "fichas de matematicas para imprimir", "numeros romanos", "division", "calculadora de porcentajes", "matematicas segundo grado"]],
  pt: [1014, ["tabuada", "jogo da tabuada", "calculadora de fração", "jogos de matematica", "atividades de matematica para imprimir", "numeros romanos", "continhas de dividir", "calculadora de porcentagem", "atividades de matemática 2 ano"]],
  en: [1000, ["multiplication table", "times tables games", "fraction calculator", "math games", "math worksheets", "roman numerals", "long division", "percentage calculator", "2nd grade math"]],
  de: [1001, ["einmaleins", "einmaleins spiele", "bruchrechner", "mathe spiele", "mathe arbeitsblätter", "römische zahlen", "schriftliche division", "prozentrechner", "mathe 2 klasse"]],
  fr: [1002, ["table de multiplication", "jeux table de multiplication", "calculatrice fraction", "jeux de maths", "fiches maths à imprimer", "chiffres romains", "division posée", "calcul pourcentage", "maths ce1"]],
  it: [1004, ["tabelline", "giochi tabelline", "calcolatrice frazioni", "giochi di matematica", "schede matematica", "numeri romani", "divisioni in colonna", "calcolo percentuale", "matematica seconda elementare"]],
  pl: [1030, ["tabliczka mnożenia", "tabliczka mnożenia gra", "kalkulator ułamków", "gry matematyczne", "karty pracy matematyka", "liczby rzymskie", "dzielenie pisemne", "kalkulator procentów", "matematyka klasa 2"]],
  nl: [1010, ["tafels", "tafels oefenen", "breuken rekenmachine", "rekenspelletjes", "rekenen werkbladen", "romeinse cijfers", "staartdeling", "procenten berekenen", "rekenen groep 4"]],
  tr: [1037, ["çarpım tablosu", "çarpım tablosu oyunu", "kesir hesaplama", "matematik oyunları", "matematik çalışma kağıdı", "romen rakamları", "bölme işlemi", "yüzde hesaplama", "2. sınıf matematik"]],
  id: [1025, ["tabel perkalian", "permainan perkalian", "kalkulator pecahan", "permainan matematika", "soal matematika kelas 2", "angka romawi", "pembagian bersusun", "kalkulator persen", "latihan matematika sd"]],
  vi: [1040, ["bảng cửu chương", "trò chơi bảng cửu chương", "tính phân số", "trò chơi toán", "bài tập toán lớp 2", "số la mã", "phép chia", "tính phần trăm", "toán lớp 2"]],
  ar: [1019, ["جدول الضرب", "لعبة جدول الضرب", "حاسبة الكسور", "العاب رياضيات", "اوراق عمل رياضيات", "الارقام الرومانية", "القسمة المطولة", "حساب النسبة المئوية", "رياضيات الصف الثاني"]],
  ja: [1005, ["九九", "九九 ゲーム", "分数 計算機", "算数 ゲーム", "算数 プリント", "ローマ数字", "割り算 筆算", "パーセント 計算", "小学2年 算数"]],
  ko: [1012, ["구구단", "구구단 게임", "분수 계산기", "수학 게임", "수학 학습지", "로마 숫자", "나눗셈", "퍼센트 계산기", "초등 2학년 수학"]],
  uk: [1036, ["таблиця множення", "таблиця множення гра", "калькулятор дробів", "математичні ігри", "математика 2 клас завдання", "римські цифри", "ділення в стовпчик", "калькулятор відсотків", "математика 2 клас"]],
  ro: [1032, ["tabla inmultirii", "jocuri tabla inmultirii", "calculator fractii", "jocuri matematice", "fise matematica", "cifre romane", "impartirea", "calculator procente", "matematica clasa 2"]],
  cs: [1021, ["násobilka", "násobilka procvičování", "kalkulačka zlomky", "matematické hry", "pracovní listy matematika", "římské číslice", "písemné dělení", "výpočet procent", "matematika 2 třída"]],
  hu: [1024, ["szorzótábla", "szorzótábla játék", "törtek számológép", "matematikai játékok", "matek feladatlapok", "római számok", "írásbeli osztás", "százalékszámítás", "matek 2 osztály"]],
};
const CONCEPTS = ["table", "table_game", "fraction_calc", "math_games", "worksheets", "roman", "division", "percent", "grade2"];
const res = {};
for (const [lang, [id, kws]] of Object.entries(L)) {
  try {
    const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords: kws, language: `languageConstants/${id}`, keywordPlanNetwork: "GOOGLE_SEARCH" } });
    const map = new Map();
    for (const x of r.results || []) {
      const m = { v: +(x.keywordMetrics?.avgMonthlySearches || 0), hi: +(+(x.keywordMetrics?.highTopOfPageBidMicros || 0) / 1e6 / CLP).toFixed(2) };
      map.set(x.text.toLowerCase(), m);
      for (const y of x.closeVariants || []) map.set(y.toLowerCase(), m);
    }
    res[lang] = kws.map((k, i) => ({ concept: CONCEPTS[i], k, ...(map.get(k.toLowerCase()) || { v: 0, hi: 0 }) }));
  } catch (e) {
    res[lang] = { error: e.message };
  }
  await new Promise((z) => setTimeout(z, 2200));
}
fs.writeFileSync(DIR + "lang_scan.json", JSON.stringify(res, null, 1));
const lines = ["lang,total," + CONCEPTS.join(",") + ",avg_bid_high_usd"];
for (const [lang, rows] of Object.entries(res)) {
  if (!Array.isArray(rows)) { console.log(lang, rows.error); continue; }
  const tot = rows.reduce((s, x) => s + x.v, 0);
  const bids = rows.filter((x) => x.hi > 0);
  const avg = bids.length ? (bids.reduce((s, x) => s + x.hi, 0) / bids.length).toFixed(2) : "0";
  lines.push(`${lang},${tot},${rows.map((x) => x.v).join(",")},${avg}`);
}
fs.writeFileSync(DIR + "lang_scan.csv", lines.join("\n"));
console.log(lines.join("\n"));
