# Math Kids — интерактивная математика для школьников на многих языках

**Бренд и домен (решение пользователя 2026-11-26): GenioPop, geniopop.com** (ещё не куплен). Репозиторий `alexanderklimin/geniopop`, воркер `geniopop`, превью https://geniopop.alexander-klimin.workers.dev, deploy key /root/.ssh/geniopop_deploy, алиас `github-geniopop`. Тема шире математики (опыты, логика), поэтому имя без «math/num» и без «kids».

Сайт для органики: тренажёры, калькуляторы с решением по шагам, генератор заданий для печати, мини-игры и задача дня, позже раздел «наука дома» (опыты).
**Решение пользователя (2026-11-26):** не только испанский. Берём языки, где большой спрос и слабая выдача. Один движок, один домен, подпапки по языкам. Приоритет языков и данные — в research/lang_priority.md. Волна A: es, de, it. Волна B: ar, pt-BR, fr. Волна C: tr, ja, nl, ko, pl. Английский и русский не берём.

Отдельный проект (папка была /opt/mates-es, переименована 2026-11-26). Рекламные кабинеты и MCP-серверы (/opt/google-ads-mcp, /opt/apple-ads-mcp, /opt/asa-dashboard, /opt/shopify-mcp и др.) и другие сайты (/opt/astro-es, /opt/pets-es, /opt/plantas-es, /opt/autos-es, /opt/limpieza-es, /opt/uborka-ekb, /opt/ship-radio, /opt/klimin-site) не трогать.

## Правила работы
- Все сообщения пользователю на русском, включая промежуточные. Контент сайта — на языке подпапки, носителем-уровнем (машинный перевод только как черновик, проверять). Для испанского — нейтральный испанский. Региональные различия давать синонимами: «1.º de primaria / 1.er grado / 1.º básico», «mates / matemáticas», «tabla pitagórica / tablas de multiplicar».
- Ничего не публиковать (деплой, DNS, покупка домена, AdSense) без явного «да». Сначала превью на workers.dev с noindex.
- Секреты хранить в /opt/math-kids/.env (chmod 600), не выводить.
- Решения и изменения кратко записывать в /opt/math-kids/CHANGELOG.md.
- На сервере 3,7 ГБ RAM + 4 ГБ swap: сборки запускать последовательно, тяжёлые задачи не распараллеливать. Неиспользуемые окна VS Code закрывать.
- Перед любым вопросом пользователю сначала проверить этот файл и соседние проекты (/opt/plantas-es, /opt/autos-es, /opt/pets-es) — там уже решены типовые вопросы (деплой, GA4, юр. страницы, почта).

## Спрос (Keyword Planner 2026-11-26; по языкам — research/lang_priority.md, кластеры испанского — research/demand.md)
Испанский (ES MX US AR CO CL PE EC VE), запросов в месяц, близкие варианты схлопнуты:
- Таблицы умножения ≈2,1 млн (tablas de multiplicar 1,22 млн, del 1 al 10 165 тыс., tabla del 7 135 тыс.). Ставки низкие ($0,4–0,7).
- Дроби ≈1,2 млн (suma, resta, multiplicación, división, equivalentes по 60–135 тыс.). Ставки $2–2,8, самые дорогие для рекламы.
- Римские цифры ≈700 тыс. (ставка ≈$0,02, деньги дают только объёмом). Процент ≈380 тыс. (calculadora porcentaje 135 тыс.). Деление ≈360 тыс. НОК/НОД ≈200 тыс. Корни и степени ≈200 тыс. Операции с приоритетом ≈156 тыс.
- Задания для печати ≈590 тыс. (fichas, ejercicios, para imprimir). Игры ≈190 тыс. (juegos matemáticos 33 тыс., juegos de multiplicar 18 тыс.).
- Опыты ≈96 тыс. и slime ≈37 тыс. (ставка ≈$0), головоломки и логика ≈40 тыс., устный счёт ≈36 тыс.
- Шум: «resta» 55,6 млн и «resolución de problemas matemáticos» 823 тыс. — артефакты Planner, не учитывать.

Для сравнения:
- **Английский** — самый денежный (ставки $2–4,5), но выдачу держат бренды: Coolmath, Math Playground, Prodigy, ABCya, Khan, Omni, Calculator.net. Позже, точечно, только калькуляторы.
- **Португальский (BR):** задания для печати ≈1,3 млн, tabuada ≈870 тыс., alfabetização ≈590 тыс., jogos ≈400 тыс. Сильный Toda Matéria, но интерактива мало. Это этап 3.
- **Русский:** Google по России данных не даёт, по СНГ спрос мал (таблица умножения 90 тыс.). Пропускаем.

## Почему испанский и в чём окно
- В испанской выдаче по «tablas de multiplicar juegos» стоят приложения App Store, подборки ссылок (Educación 3.0, Guía Infantil) и государственные порталы. Сильных быстрых интерактивных веб-тренажёров мало.
- Калькуляторы с решением по шагам и генератор заданий для печати плохо заменяются ответом ИИ в выдаче: нужен инструмент, а не ответ.
- Учебные годы у стран разные (Испания и Мексика с сентября/августа, Аргентина и Чили с марта), поэтому сезонность сглаживается.

## Деньги и детская аудитория (важно)
- Заработок — реклама (AdSense, позже Ezoic, Mediavine/Raptive при объёме), позже PDF-наборы заданий для учителей и родителей.
- **На страницах, ориентированных на детей** (игры, тренажёры для младших классов), — тег возраста AdSense TFAT (tag for age treatment = 1). Он отключает персонализированную рекламу и ретаргетинг, поэтому RPM на этих страницах ниже. Это требование COPPA для трафика из США и GDPR (в Испании согласие с 14 лет).
- **Страницы для родителей, учителей и школьников постарше** (калькуляторы, генератор заданий, объяснения) — обычная аудитория. На них приходится основная доля денег. Структура сайта специально смешанная: инструменты для взрослых и подростков плюс игры для детей.
- От детей не собираем никаких данных: без регистрации, чатов и рейтингов с никами. Прогресс храним только в localStorage. На детских страницах нет сторонних трекеров. Аналитика — без cookies (Plausible или Cloudflare Web Analytics) или GA4 с отключёнными рекламными функциями.
- Реклама не ставится внутри игрового поля и рядом с кнопками игры: случайные клики нарушают политику AdSense.
- Связь с приложением Tomath (решатель задач). Баннер ставим только на страницах для старших (операции с приоритетом, уравнения, степени). Ожиданий мало: по опыту ASA, люди с запросом «бесплатный ответ» не платят.

## Стек и деплой (как hojapedia.com и ladrimiau.com — повторять один в один)
- **Astro 7** (статическая генерация) + островки JS для инструментов и игр (vanilla или Preact, без тяжёлых движков). Образец каркаса, package.json, wrangler.jsonc, Analytics.astro, юр. страниц, llms.txt.ts — /opt/plantas-es (hojapedia.com, работает в продакшене). Бренд и контент не копировать.
- **Node 22** лежит в /opt/astro-es/.tools/node (системный Node 20 не менять): `PATH=/opt/astro-es/.tools/node/bin:$PATH npm install && PATH=/opt/astro-es/.tools/node/bin:$PATH npm run build`. Тесты: `npm test` (`node --test src/lib/*.test.js`, как в plantas-es).
- **Cloudflare Workers со static assets** (не Pages). wrangler.jsonc как в /opt/plantas-es: `assets.directory ./dist`, `html_handling auto-trailing-slash`, `not_found_handling 404-page`. До запуска `workers_dev: true`, при запуске `routes: [{pattern: "<домен>", custom_domain: true}]`, `workers_dev: false`, `preview_urls: false`.
- **Код — приватный репозиторий GitHub** `alexanderklimin/<проект>`. Отдельный deploy key:
  - `ssh-keygen -t ed25519 -f /root/.ssh/<проект>_deploy -N ""`;
  - в ~/.ssh/config алиас `Host github-<проект>` (HostName github.com, User git, IdentityFile /root/.ssh/<проект>_deploy, IdentitiesOnly yes) — образец в ~/.ssh/config (github-numeroastral, github-klimin-site и др.);
  - публичный ключ пользователь добавляет в репозиторий (Settings → Deploy keys, «Allow write access»); репозиторий создаёт пользователь;
  - `git remote add origin github-<проект>:alexanderklimin/<проект>.git`.
- **Сборка и выкладка — Cloudflare Workers Builds** из GitHub (репозиторий подключает пользователь в панели Cloudflare): сборка `npm run build`, деплой `npx wrangler deploy`. Токен Cloudflare на сервере НЕ нужен — выкладка идёт по `git push`.
- **Превью:** https://<проект>.alexander-klimin.workers.dev. До запуска в public/_headers `X-Robots-Tag: noindex` для `/*` (плюс `/_astro/*` Cache-Control immutable, как в plantas-es). noindex снимать только при запуске, после явного «да».
- **Запуск:** домен покупает пользователь (Cloudflare Registrar); свободность — RDAP (`curl -s -o /dev/null -w "%{http_code}" https://rdap.verisign.com/com/v1/domain/<имя>.com`, 404 = свободен); почта hola@/hello@<домен> — Cloudflare Email Routing (настраивает пользователь); Always Use HTTPS — пользователь. После запуска проверить все URL из sitemap (200), canonical, hreflang, отсутствие noindex, 404.
- **Мультиязычность:** подпапки /es/ /de/ /it/…, `hreflang` + `x-default`, отдельный sitemap на язык, корень `/` — выбор языка (без автоматического редиректа по IP — он мешает Googlebot).
- **Юр. страницы** на каждом языке (контакты, приватность и cookies, правовая информация) — по образцу /opt/plantas-es (contacto, privacidad, aviso-legal) + раздел о детской приватности (COPPA/GDPR-K).
- PDF — на клиенте (jsPDF или CSS @media print), A4 и Letter. Математика — отдельный модуль src/lib с юнит-тестами.
- Скорость: Core Web Vitals «зелёные», ≤100 КБ JS на инструмент, слабые Android-телефоны. Лимит Cloudflare Free — 20 000 файлов на сайт (проверить актуальность перед стартом).

## Доступы (уже настроены, искать не нужно)
- **Keyword Planner (Google Ads API, только чтение):** клиент `googleAdsRequest(config, {method, path, body})` из /opt/google-ads-mcp/src/googleAdsClient.js и `readConfigFromEnv()` из /opt/google-ads-mcp/src/googleAuth.js. Запуск: `cd /opt/google-ads-mcp && set -a && . ./.env && set +a && /opt/astro-es/.tools/node/bin/node /opt/math-kids/research/<скрипт>.mjs`. Эндпоинты: `POST /customers/6962355647:generateKeywordIdeas` (`keywordSeed`, `pageSize` до 5000) и `:generateKeywordHistoricalMetrics` (точные объёмы по списку, до 700 слов за запрос, пауза ~1,3–2 с). Примеры: research/kids_math_kw.mjs, research/lang_scan.mjs.
  - Языки: es 1003, en 1000, pt 1014, de 1001, fr 1002, it 1004, ar 1019, tr 1037, ja 1005, ko 1012, nl 1010, pl 1030, id 1025, vi 1040, uk 1036. Без geoTargetConstants = весь мир. Страны: ES 2724, MX 2484, US 2840, AR 2032, CO 2170, CL 2152, PE 2604, BR 2076, DE 2276, AT 2040, CH 2756, IT 2380, FR 2250, TR 2792, SA 2682, EG 2818, AE 2784. **Россия (2643) и её регионы отклоняются (400).**
  - Ставки в CLP (валюта аккаунта): делить на ~950 → USD. Апострофы в запросах дают ошибку. В рекламных кабинетах ничего не менять — только чтение планера.
- **Search Console (только чтение):** `cd /opt/shopify-mcp && PATH=/opt/astro-es/.tools/node/bin:$PATH node scripts/gsc.mjs sites | sitemaps <site> | query <site> <start> <end> [page,query] [limit] | inspect <site> <url>…`. Сайт как `sc-domain:домен`. Отчёта «Индексирование страниц» в API нет — проверять URL через inspect (≈2000/день на ресурс, по одному, с повтором при 500). Новый домен пользователь добавляет в Search Console сам.
- **GA4:** коннектор GA4 (run_report) после создания ресурса пользователем. Код счётчика — /opt/plantas-es/src/components/Analytics.astro (gtag.js + Consent Mode v2: в европейских часовых поясах скрипт не грузится до «Принять», вне Европы — без рекламных cookies; только на боевом хосте). **На детских страницах GA4 с отключёнными рекламными функциями** или Cloudflare Web Analytics (без cookies).
- **PageSpeed Insights:** `set -a; . /opt/asa-dashboard/.env; set +a; /opt/astro-es/.tools/node/bin/node scripts/psi.mjs <url>…` — оценки mobile/desktop, LCP, TBT, CLS, полевые CrUX. Ключ PAGESPEED_API_KEY лежит в /opt/asa-dashboard/.env (не выводить).
- **YouTube Data API v3:** ключ YOUTUBE_API_KEY в /opt/asa-dashboard/.env (10 000 единиц/день, поиск = 100) — поиск видео-объяснений и авторов по языкам.
- **Веб-поиск** (инструмент WebSearch) — выдача из США; локальную выдачу языков проверяет пользователь в браузере или через VPN.
- **Apphud / App Store / Google Play / Google Ads / Apple Ads** — есть (коннекторы и /opt/google-ads-mcp, /opt/apple-ads-mcp), понадобятся, если делать своё приложение-тренажёр и вести на него с сайта. Ничего в кабинетах без «да» не менять.
- **AdSense** — пока нет (подключается после 30–50 страниц с трафиком; ads.txt в public/, тег TFAT на детских страницах).

## Против фильтров Google
- Не плодить тысячи страниц «число × операция». Отдельные страницы делаем только там, где есть свой спрос: tabla del 1…12 (13 страниц), ~50 самых искомых чисел для римских цифр. Остальное — внутри конвертера и таблиц.
- У каждой страницы инструмента есть объяснение метода, примеры, типичные ошибки и задания для печати. Голого виджета недостаточно.
- Публиковать партиями и смотреть индексацию в Search Console (CLI: `cd /opt/shopify-mcp && node scripts/gsc.mjs …`).

## Исследование: скрипты
- research/kids_math_kw.mjs, kids_sci_kw.mjs `<out.json>` — идеи по языкам; research/lang_scan.mjs — 9 понятий × 18 языков; кластеры: `python3 -I research/clusters.py`.

## Первые шаги
1. ~~Домен~~ — выбран geniopop.com (покупка после «да» к запуску).
2. Модуль математики с тестами и параметрами локали (запись деления в столбик, десятичный разделитель, названия классов, A4/Letter, арабские/восточноарабские цифры): таблицы, дроби (4 операции + упрощение + смешанные), НОК/НОД, деление в столбик по шагам, проценты, корни, римские цифры, операции с приоритетом.
3. Волна 1 на /es/, затем /de/ и /it/ (research/site_structure.md): таблицы и тренажёр, tabla del 1–12, калькулятор дробей, калькулятор процентов, конвертер римских цифр, деление в столбик, НОК/НОД, генератор заданий.
4. Превью → «да» → публикация, затем Search Console. AdSense подключать после 30–50 страниц с трафиком.
