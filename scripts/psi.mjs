// PageSpeed Insights check. Run: set -a; . /opt/asa-dashboard/.env; set +a; node research/psi.mjs <url>...
// Prints lab scores (performance, accessibility, best practices, SEO) and key metrics for mobile and desktop.
const key = process.env.PAGESPEED_API_KEY;
if (!key) throw new Error('PAGESPEED_API_KEY missing');
const urls = process.argv.slice(2);
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];

for (const url of urls) {
  for (const strategy of ['mobile', 'desktop']) {
    const q = new URLSearchParams({ url, strategy, key });
    for (const c of cats) q.append('category', c);
    let data;
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`);
      data = await r.json();
      if (r.ok) break;
      await new Promise((res) => setTimeout(res, 3000));
    }
    if (data.error) { console.log(url, strategy, 'ERROR', data.error.message); continue; }
    const lh = data.lighthouseResult;
    const score = (c) => Math.round((lh.categories[c]?.score ?? 0) * 100);
    const a = lh.audits;
    const fails = Object.values(a)
      .filter((x) => x.score !== null && x.score < 0.9 && ['binary', 'numeric'].includes(x.scoreDisplayMode) && !x.id.startsWith('largest-contentful-paint-element'))
      .map((x) => x.id);
    console.log(`${strategy.padEnd(7)} ${url}`);
    console.log(`  perf ${score('performance')}  a11y ${score('accessibility')}  bp ${score('best-practices')}  seo ${score('seo')}`);
    console.log(`  FCP ${a['first-contentful-paint'].displayValue}  LCP ${a['largest-contentful-paint'].displayValue}  TBT ${a['total-blocking-time'].displayValue}  CLS ${a['cumulative-layout-shift'].displayValue}  weight ${a['total-byte-weight'].displayValue}`);
    if (fails.length) console.log(`  below 90: ${fails.join(', ')}`);
  }
}
