// Interface strings per language. Content is written per language at native level, not translated word by word.
// LIVE = languages built into the site now (wave A). Others are added when their content is ready.

export const LIVE = ['es', 'de', 'it'];

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
    home_title: 'Tablas de multiplicar, fracciones y fichas para imprimir',
    home_description: 'Tablas de multiplicar para practicar, calculadoras que explican cada paso y fichas de mates para imprimir con soluciones. Gratis y sin registro.',
    home_h1: 'Matemáticas que se entienden',
    home_lead: 'Practica las tablas, resuelve fracciones paso a paso e imprime fichas con soluciones. Para niños, familias y profes.',
    sections: [
      { title: 'Tablas de multiplicar', text: 'Del 1 al 12, con práctica en orden, salteada o contrarreloj, y la tabla pitagórica.', href: '/es/tablas-de-multiplicar/' },
      { title: 'Fracciones', text: 'Calculadora de suma, resta, multiplicación y división con el procedimiento completo.', href: '/es/fracciones/' },
      { title: 'Calculadoras', text: 'Porcentajes, números romanos, división paso a paso, mcm y mcd, potencias y raíces.' },
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
    home_title: '1x1 üben, Brüche rechnen und Arbeitsblätter',
    home_description: 'Einmaleins üben, Rechner mit Rechenweg und Mathe-Arbeitsblätter mit Lösungen zum Ausdrucken. Kostenlos und ohne Anmeldung.',
    home_h1: 'Mathe, die man versteht',
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
    home_title: 'Tabelline, frazioni e schede di matematica da stampare',
    home_description: 'Tabelline da allenare, calcolatrici che spiegano ogni passaggio e schede di matematica da stampare con le soluzioni. Gratis e senza registrazione.',
    home_h1: 'La matematica che si capisce',
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

export function t(lang) {
  const ui = UI[lang];
  if (!ui) throw new RangeError(`No UI strings for ${lang}`);
  return ui;
}

// Same page in every live language: { es: '/es/', de: '/de/', it: '/it/' }
export const alternatesFor = (pathByLang) => Object.fromEntries(LIVE.filter((l) => pathByLang[l]).map((l) => [l, pathByLang[l]]));
