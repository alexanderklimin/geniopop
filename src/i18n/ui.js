// Interface strings per language. Content is written per language at native level, not translated word by word.
// LIVE = languages built into the site now (wave A). Others are added when their content is ready.

// de/it are hidden until they have real content (user 2026-11-26: no placeholder pages). Their strings stay here.
export const LIVE = ['es'];

export const LANG_NAMES = { es: 'Español', de: 'Deutsch', it: 'Italiano' };
export const OG_LOCALE = { es: 'es_ES', de: 'de_DE', it: 'it_IT' };

export const UI = {
  es: {
    skip: 'Saltar al contenido',
    home: 'Inicio',
    language: 'Idioma',
    soon: 'Próximamente',
    notFoundTitle: 'Página no encontrada',
    notFoundText: 'Esta página no existe o ha cambiado de dirección.',
    backHome: 'Volver al inicio',
    footerNote: 'Gratis y sin registro. No pedimos datos a los niños.',
    tagline: 'Matemáticas que se entienden, para niños, familias y profes.',
    footerSections: 'Practicar', footerAbout: 'GenioPop', authorLink: 'Quién revisa los contenidos', menu: 'Menú',
    home_title: 'Tablas de multiplicar, fracciones y fichas para imprimir',
    home_description: 'Tablas de multiplicar para practicar, calculadoras que explican cada paso y fichas de mates para imprimir con soluciones. Gratis y sin registro.',
    home_h1: 'Matemáticas que se entienden',
    kicker: 'Para primaria · gratis · sin registro',
    popularTitle: 'Lo más buscado',
    popular: [['Tabla del 7', '/es/tablas-de-multiplicar/tabla-del-7/'], ['Calculadora de fracciones', '/es/fracciones/calculadora-de-fracciones/'], ['Porcentajes', '/es/calculadora-de-porcentajes/'], ['Números romanos', '/es/numeros-romanos/'], ['División paso a paso', '/es/division/'], ['Tabla pitagórica', '/es/tabla-pitagorica/']],
    sectionsTitle: '¿Qué quieres practicar?',
    open: 'Abrir',
    trust: [['check', 'Explicaciones paso a paso, como en el cuaderno'], ['print', 'Fichas para imprimir con soluciones'], ['heart', 'Sin registro y sin pedir datos a los niños']],
    reviewedBy: 'Contenidos revisados por',
    reviewer: 'profesora y cofundadora de Inana Show, un espectáculo de ciencia para niños',
    home_lead: 'Practica las tablas, resuelve fracciones y divisiones paso a paso e imprime fichas con soluciones. Para niños, familias y profes.',
    sections: [
      { title: 'Tablas de multiplicar', text: 'Del 1 al 12, con práctica en orden, salteada o contrarreloj, y la tabla pitagórica.', href: '/es/tablas-de-multiplicar/' },
      { title: 'Fracciones', text: 'Calculadora de suma, resta, multiplicación y división con el procedimiento completo.', href: '/es/fracciones/' },
      { title: 'Calculadoras', text: 'Porcentajes, números romanos, división paso a paso, mcm y mcd, potencias y raíces.', links: [['Porcentajes', '/es/calculadora-de-porcentajes/'], ['Números romanos', '/es/numeros-romanos/'], ['División', '/es/division/'], ['mcm y mcd', '/es/mcm-mcd/']] },
      { title: 'Fichas para imprimir', text: 'Elige tema, curso y cantidad: la ficha sale lista en A4 o carta, con hoja de soluciones.' },
      { title: 'Juegos y reto del día', text: 'Juegos cortos de cálculo y un acertijo nuevo cada día.' },
      { title: 'Ciencia en casa', text: 'Experimentos seguros con materiales de la cocina.' },
    ],
  },
  de: {
    skip: 'Zum Inhalt springen',
    home: 'Startseite',
    language: 'Sprache',
    soon: 'Demnächst',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundText: 'Diese Seite gibt es nicht oder sie ist umgezogen.',
    backHome: 'Zur Startseite',
    footerNote: 'Kostenlos und ohne Anmeldung. Von Kindern erheben wir keine Daten.',
    tagline: 'Mathe, die man versteht – für Kinder, Eltern und Lehrkräfte.',
    footerSections: 'Üben', footerAbout: 'GenioPop', authorLink: 'Wer die Inhalte prüft', menu: 'Menü',
    home_title: '1x1 üben, Brüche rechnen und Arbeitsblätter',
    home_description: 'Einmaleins üben, Rechner mit Rechenweg und Mathe-Arbeitsblätter mit Lösungen zum Ausdrucken. Kostenlos und ohne Anmeldung.',
    home_h1: 'Mathe, die man versteht',
    kicker: 'Für die Grundschule · kostenlos · ohne Anmeldung',
    popularTitle: 'Beliebt', popular: [],
    sectionsTitle: 'Was möchtest du üben?',
    open: 'Öffnen',
    trust: [['check', 'Rechenwege Schritt für Schritt'], ['print', 'Arbeitsblätter mit Lösungen'], ['heart', 'Ohne Anmeldung, keine Daten von Kindern']],
    reviewedBy: 'Inhalte geprüft von',
    reviewer: 'Lehrerin und Mitgründerin von Inana Show, einer Wissenschaftsshow für Kinder',
    home_lead: 'Das 1x1 üben, Brüche mit Rechenweg lösen und Arbeitsblätter mit Lösungen drucken. Für Kinder, Eltern und Lehrkräfte.',
    sections: [
      { title: 'Einmaleins (1x1)', text: 'Kleines und großes Einmaleins: der Reihe nach, gemischt oder auf Zeit, dazu die 1x1-Tabelle.' },
      { title: 'Brüche', text: 'Bruchrechner für Addition, Subtraktion, Multiplikation und Division mit vollständigem Rechenweg.' },
      { title: 'Rechner', text: 'Prozentrechner, römische Zahlen, schriftliche Division, kgV und ggT, Potenzen und Wurzeln.' },
      { title: 'Arbeitsblätter', text: 'Thema, Klasse und Anzahl wählen: Das Blatt ist sofort druckfertig, mit Lösungsblatt.' },
      { title: 'Spiele und Rätsel des Tages', text: 'Kurze Rechenspiele und jeden Tag ein neues Rätsel.' },
      { title: 'Experimente für zu Hause', text: 'Sichere Versuche mit Dingen aus der Küche.' },
    ],
  },
  it: {
    skip: 'Vai al contenuto',
    home: 'Home',
    language: 'Lingua',
    soon: 'In arrivo',
    notFoundTitle: 'Pagina non trovata',
    notFoundText: 'Questa pagina non esiste o ha cambiato indirizzo.',
    backHome: 'Torna alla home',
    footerNote: 'Gratis e senza registrazione. Non raccogliamo dati dei bambini.',
    tagline: 'La matematica che si capisce, per bambini, famiglie e insegnanti.',
    footerSections: 'Esercitarsi', footerAbout: 'GenioPop', authorLink: 'Chi controlla i contenuti', menu: 'Menu',
    home_title: 'Tabelline, frazioni e schede di matematica da stampare',
    home_description: 'Tabelline da allenare, calcolatrici che spiegano ogni passaggio e schede di matematica da stampare con le soluzioni. Gratis e senza registrazione.',
    home_h1: 'La matematica che si capisce',
    kicker: 'Per la primaria · gratis · senza registrazione',
    popularTitle: 'I più cercati', popular: [],
    sectionsTitle: 'Cosa vuoi esercitare?',
    open: 'Apri',
    trust: [['check', 'Spiegazioni passo dopo passo'], ['print', 'Schede da stampare con soluzioni'], ['heart', 'Senza registrazione, nessun dato dei bambini']],
    reviewedBy: 'Contenuti controllati da',
    reviewer: 'insegnante e cofondatrice di Inana Show, uno spettacolo di scienza per bambini',
    home_lead: 'Allena le tabelline, risolvi le frazioni passo dopo passo e stampa schede con le soluzioni. Per bambini, genitori e insegnanti.',
    sections: [
      { title: 'Tabelline', text: 'Dalla tabellina dell’1 a quella del 12: in ordine, a caso o a tempo, più la tavola pitagorica.' },
      { title: 'Frazioni', text: 'Calcolatrice di addizioni, sottrazioni, moltiplicazioni e divisioni con tutti i passaggi.' },
      { title: 'Calcolatrici', text: 'Percentuali, numeri romani, divisioni in colonna, mcm e MCD, potenze e radici.' },
      { title: 'Schede da stampare', text: 'Scegli argomento, classe e numero di esercizi: la scheda è pronta in A4, con le soluzioni.' },
      { title: 'Giochi e sfida del giorno', text: 'Brevi giochi di calcolo e un nuovo indovinello ogni giorno.' },
      { title: 'Esperimenti a casa', text: 'Esperimenti sicuri con quello che c’è in cucina.' },
    ],
  },
};

// Section colors/icons (same order as UI[lang].sections) and main navigation per language.
export const SECTION_STYLE = [
  { key: 'tablas', icon: 'grid' },
  { key: 'fracciones', icon: 'pizza' },
  { key: 'calc', icon: 'calc' },
  { key: 'fichas', icon: 'sheet' },
  { key: 'juegos', icon: 'game' },
  { key: 'ciencia', icon: 'flask' },
];

export const NAV = {
  es: [
    { label: 'Tablas', href: '/es/tablas-de-multiplicar/', key: 'tablas' },
    { label: 'Fracciones', href: '/es/fracciones/', key: 'fracciones' },
    { label: 'División', href: '/es/division/', key: 'calc' },
    { label: 'Porcentajes', href: '/es/calculadora-de-porcentajes/', key: 'calc' },
    { label: 'Romanos', href: '/es/numeros-romanos/', key: 'calc' },
    { label: 'mcm y mcd', href: '/es/mcm-mcd/', key: 'calc' },
  ],
  de: [],
  it: [],
};

// Which section (color) a path belongs to
export function sectionOf(pathname) {
  if (/\/(tablas-de-multiplicar|tabla-pitagorica)\//.test(pathname)) return 'tablas';
  if (/\/fracciones\//.test(pathname)) return 'fracciones';
  if (/\/(division|calculadora-de-porcentajes|numeros-romanos|mcm-mcd)\//.test(pathname)) return 'calc';
  if (/\/fichas\//.test(pathname)) return 'fichas';
  return 'home';
}

export function t(lang) {
  const ui = UI[lang];
  if (!ui) throw new RangeError(`No UI strings for ${lang}`);
  return ui;
}

// Same page in every live language: { es: '/es/', de: '/de/', it: '/it/' }
export const alternatesFor = (pathByLang) => Object.fromEntries(LIVE.filter((l) => pathByLang[l]).map((l) => [l, pathByLang[l]]));
