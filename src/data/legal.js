// Legal pages per language: privacy + children's privacy, legal notice, contact.
// Owner: Anna Ryabova (Chile). Facts must match the site: GA4 with consent (EU) and Google signals/ad
// personalization off, no ads yet, localStorage keys gp_consent and gp_tables_v1, Cloudflare hosting.

export const LEGAL = {
  es: {
    slugs: { privacy: 'privacidad', legal: 'aviso-legal', contact: 'contacto' },
    names: { privacy: 'Privacidad y cookies', legal: 'Aviso legal', contact: 'Contacto', cookies: 'Cookies' },
    date: '26 de noviembre de 2026',
    updated: 'Última actualización',
    privacy: {
      title: 'Política de privacidad y cookies',
      description: 'Qué datos trata GenioPop, cómo protegemos a los niños, qué cookies de análisis usamos con tu consentimiento y qué derechos tienes.',
      lead: 'GenioPop está pensado para que niños, familias y profes lo usen sin dar ningún dato personal.',
      sections: (o) => [
        ['Resumen', [`No hay registro, cuentas, chats ni rankings con nombres. Las calculadoras, el entrenador y las fichas funcionan dentro de tu navegador y no envían lo que escribes a ningún servidor. Usamos Google Analytics, con las funciones publicitarias desactivadas, para saber qué páginas son útiles; en Europa solo después de que lo aceptes.`]],
        ['Responsable', [`El responsable del tratamiento es ${o.owner}, con residencia en ${o.country}. Puedes escribir a <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Niños y niñas', [
          'Muchas páginas de GenioPop (el entrenador de tablas, los juegos) están pensadas para que las usen niños. Por eso:',
          '<ul><li>No pedimos ni guardamos nombre, correo, edad, fotos ni ningún otro dato personal de los niños.</li><li>No hay registro, mensajes entre usuarios ni perfiles públicos.</li><li>El progreso del entrenador (qué multiplicaciones se aciertan o se fallan) se guarda solo en el propio dispositivo, en el almacenamiento local del navegador. No lo recibimos. Se borra con el botón «Borrar mi progreso» o borrando los datos del navegador.</li><li>La analítica funciona sin señales de Google ni personalización de anuncios. No mostramos publicidad personalizada.</li></ul>',
          'Si en el futuro mostramos publicidad, en las páginas para niños solo será publicidad no personalizada, marcada como dirigida a menores según la normativa de protección de la infancia (COPPA en Estados Unidos y el RGPD en Europa).',
          `Si eres madre, padre o tutor y crees que un niño nos ha enviado datos personales (por ejemplo, en un correo), escríbenos a <a href="mailto:${o.email}">${o.email}</a> y los borraremos.`,
        ]],
        ['Datos que tratamos', [
          '<strong>Datos técnicos de la conexión.</strong> Nuestro proveedor de alojamiento, Cloudflare, Inc., trata datos técnicos como la dirección IP y el tipo de navegador para entregar las páginas y proteger el servicio. La base legal es nuestro interés legítimo en mantener el sitio seguro. Cloudflare puede tratar estos datos fuera de tu país, incluido Estados Unidos, con sus propias garantías.',
          '<strong>Mensajes que nos envías.</strong> Si nos escribes, usamos tu dirección y tu mensaje solo para responderte y los conservamos mientras haga falta para atender la consulta.',
          '<strong>Fuentes y archivos.</strong> La tipografía y las imágenes se sirven desde nuestro propio dominio. El único servicio de terceros que puede cargarse es Google Analytics, como se explica abajo.',
        ]],
        ['Cookies y almacenamiento local', [
          'Usamos Google Analytics 4, un servicio de Google Ireland Limited, para conocer de forma agregada qué páginas se visitan. Tenemos desactivadas las señales de Google y la personalización de anuncios. La base legal es tu consentimiento. Si nos visitas desde Europa, Google Analytics no se carga hasta que pulsas «Aceptar». Google puede tratar estos datos fuera de tu país, incluido Estados Unidos.',
          '<table><thead><tr><th>Nombre</th><th>Para qué</th><th>Duración</th></tr></thead><tbody><tr><td><code>_ga</code>, <code>_ga_*</code></td><td>Google Analytics: distinguir visitas de forma estadística</td><td>Hasta 2 años</td></tr><tr><td><code>gp_consent</code></td><td>Recordar tu elección sobre las cookies (almacenamiento local)</td><td>Hasta que la borres</td></tr><tr><td><code>gp_tables_v1</code></td><td>Progreso del entrenador de tablas, solo en tu dispositivo (almacenamiento local)</td><td>Hasta que lo borres</td></tr></tbody></table>',
          'Puedes cambiar tu elección en cualquier momento con el botón «Cookies» al pie de cada página.',
        ]],
        ['Tus derechos', [`Puedes pedir el acceso, la rectificación, la supresión, la limitación o la portabilidad de tus datos y oponerte a su tratamiento escribiendo a <a href="mailto:${o.email}">${o.email}</a>. También puedes reclamar ante la autoridad de protección de datos de tu país (en España, la Agencia Española de Protección de Datos). En España, los menores de 14 años necesitan el consentimiento de sus padres para que se traten sus datos; por eso no pedimos ninguno.`]],
      ],
    },
    legal: {
      title: 'Aviso legal',
      description: 'Titular de GenioPop, condiciones de uso, uso de las fichas en clase, propiedad intelectual y responsabilidad.',
      sections: (o) => [
        ['Titular', [`GenioPop (geniopop.com) es un sitio web de ${o.owner}, con residencia en ${o.country}. Contacto: <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Uso del sitio', ['GenioPop es gratuito. Las explicaciones y calculadoras son material de apoyo para aprender y practicar; no sustituyen al profesor ni al programa oficial de cada país. Comprobamos los cálculos con pruebas automáticas, pero si encuentras un error, escríbenos y lo corregiremos.']],
        ['Fichas para imprimir', ['Puedes imprimir y fotocopiar las fichas para uso personal, familiar o en clase, sin coste. No está permitido venderlas ni publicarlas en otros sitios web como si fueran propias.']],
        ['Propiedad intelectual', ['Los textos, ejercicios, ilustraciones y el diseño de GenioPop pertenecen a su titular. La tipografía Nunito se usa bajo la licencia SIL Open Font.']],
        ['Enlaces', ['Si enlazamos a otros sitios, no controlamos su contenido. Si en el futuro incluimos publicidad o enlaces patrocinados, los señalaremos claramente.']],
      ],
    },
    contact: {
      title: 'Contacto',
      description: 'Escríbenos para corregir un error, proponer un tema o una ficha, o preguntar por GenioPop.',
      lead: '¿Has encontrado un error, echas de menos un tema o tienes una idea para una ficha? Escríbenos.',
      tips: ['Si ves un error, dinos en qué página está y qué números usaste.', 'Si eres profe, cuéntanos qué fichas te vendrían bien para tu clase.', 'Por favor, que los niños no nos escriban sin un adulto: no necesitamos ningún dato suyo.'],
      tipsTitle: 'Antes de escribir',
    },
  },
  de: {
    slugs: { privacy: 'datenschutz', legal: 'impressum', contact: 'kontakt' },
    names: { privacy: 'Datenschutz', legal: 'Impressum', contact: 'Kontakt', cookies: 'Cookies' },
    date: '26. November 2026',
    updated: 'Stand',
    privacy: {
      title: 'Datenschutzerklärung',
      description: 'Welche Daten GenioPop verarbeitet, wie wir Kinder schützen, welche Analyse-Cookies wir mit deiner Einwilligung nutzen und welche Rechte du hast.',
      lead: 'GenioPop ist so gebaut, dass Kinder, Eltern und Lehrkräfte es nutzen können, ohne persönliche Daten anzugeben.',
      sections: (o) => [
        ['Kurz gesagt', ['Es gibt keine Anmeldung, keine Konten, keine Chats und keine Ranglisten mit Namen. Rechner, Trainer und Arbeitsblätter laufen in deinem Browser; was du eingibst, wird nicht an einen Server geschickt. Wir nutzen Google Analytics ohne Werbefunktionen, um zu sehen, welche Seiten hilfreich sind – in Europa erst, nachdem du zugestimmt hast.']],
        ['Verantwortliche', [`Verantwortlich für die Datenverarbeitung ist ${o.owner}, wohnhaft in ${o.country}. E-Mail: <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Kinder', [
          'Viele Seiten von GenioPop (der Einmaleins-Trainer, die Spiele) sind für Kinder gedacht. Deshalb gilt:',
          '<ul><li>Wir fragen keine Namen, E-Mail-Adressen, Altersangaben, Fotos oder andere persönliche Daten von Kindern ab und speichern sie nicht.</li><li>Es gibt keine Anmeldung, keine Nachrichten zwischen Nutzern und keine öffentlichen Profile.</li><li>Der Lernstand im Trainer (welche Aufgaben richtig oder falsch waren) wird nur auf dem Gerät im lokalen Speicher des Browsers gespeichert. Wir erhalten ihn nicht. Er lässt sich mit „Fortschritt löschen“ oder über die Browserdaten entfernen.</li><li>Die Analyse läuft ohne Google-Signale und ohne personalisierte Werbung. Wir zeigen keine personalisierte Werbung.</li></ul>',
          'Falls wir künftig Werbung zeigen, gibt es auf Kinderseiten nur nicht personalisierte Werbung, die als an Kinder gerichtet gekennzeichnet ist (DSGVO, in den USA COPPA).',
          `Wenn du als Elternteil glaubst, dass uns ein Kind persönliche Daten geschickt hat (zum Beispiel per E-Mail), schreib an <a href="mailto:${o.email}">${o.email}</a> – wir löschen sie.`,
        ]],
        ['Welche Daten wir verarbeiten', [
          '<strong>Technische Verbindungsdaten.</strong> Unser Hoster Cloudflare, Inc. verarbeitet technische Daten wie IP-Adresse und Browsertyp, um die Seiten auszuliefern und den Dienst zu schützen (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO). Cloudflare kann diese Daten auch außerhalb der EU, etwa in den USA, verarbeiten.',
          '<strong>Nachrichten an uns.</strong> Wenn du uns schreibst, nutzen wir deine Adresse und Nachricht nur, um zu antworten, und bewahren sie nur so lange auf, wie es dafür nötig ist.',
          '<strong>Schriften und Dateien.</strong> Schrift und Bilder kommen von unserer eigenen Domain. Der einzige Drittdienst, der geladen werden kann, ist Google Analytics, wie unten beschrieben.',
        ]],
        ['Cookies und lokaler Speicher', [
          'Wir nutzen Google Analytics 4, einen Dienst der Google Ireland Limited, um zusammengefasst zu sehen, welche Seiten besucht werden. Google-Signale und personalisierte Werbung sind deaktiviert. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 TDDDG). Aus Europa wird Google Analytics erst geladen, wenn du auf „Akzeptieren“ tippst. Google kann die Daten auch in den USA verarbeiten.',
          '<table><thead><tr><th>Name</th><th>Zweck</th><th>Dauer</th></tr></thead><tbody><tr><td><code>_ga</code>, <code>_ga_*</code></td><td>Google Analytics: Besuche statistisch unterscheiden</td><td>bis zu 2 Jahre</td></tr><tr><td><code>gp_consent</code></td><td>Deine Cookie-Entscheidung merken (lokaler Speicher)</td><td>bis du sie löschst</td></tr><tr><td><code>gp_tables_v1</code></td><td>Lernstand im Einmaleins-Trainer, nur auf deinem Gerät (lokaler Speicher)</td><td>bis du ihn löschst</td></tr></tbody></table>',
          'Deine Entscheidung kannst du jederzeit über „Cookies“ unten auf jeder Seite ändern.',
        ]],
        ['Deine Rechte', [`Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Schreib dazu an <a href="mailto:${o.email}">${o.email}</a>. Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren. In Deutschland können Kinder unter 16 Jahren nur mit Zustimmung der Eltern in eine Datenverarbeitung einwilligen – deshalb fragen wir sie nach keinen Daten.`]],
      ],
    },
    legal: {
      title: 'Impressum',
      description: 'Anbieterin von GenioPop, Kontakt, Nutzung der Arbeitsblätter, Urheberrecht und Haftung.',
      sections: (o) => [
        ['Anbieterin', [`GenioPop (geniopop.com) ist ein Angebot von ${o.owner}, ${o.country}. E-Mail: <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Nutzung', ['GenioPop ist kostenlos. Erklärungen und Rechner sind Lernhilfen; sie ersetzen weder den Unterricht noch den Lehrplan. Wir prüfen die Rechnungen mit automatischen Tests. Wenn du trotzdem einen Fehler findest, schreib uns.']],
        ['Arbeitsblätter', ['Du darfst die Arbeitsblätter kostenlos für dich, deine Familie oder deine Klasse ausdrucken und kopieren. Verkaufen oder auf anderen Websites als eigene veröffentlichen ist nicht erlaubt.']],
        ['Urheberrecht', ['Texte, Aufgaben, Illustrationen und Gestaltung von GenioPop gehören der Anbieterin. Die Schrift Nunito steht unter der SIL Open Font License.']],
        ['Links', ['Für Inhalte verlinkter Seiten sind deren Betreiber verantwortlich. Werbung oder gesponserte Links würden wir deutlich kennzeichnen.']],
      ],
    },
    contact: {
      title: 'Kontakt',
      description: 'Schreib uns, um einen Fehler zu melden, ein Thema oder Arbeitsblatt vorzuschlagen oder eine Frage zu GenioPop zu stellen.',
      lead: 'Du hast einen Fehler gefunden, vermisst ein Thema oder hast eine Idee für ein Arbeitsblatt? Schreib uns.',
      tips: ['Bei einem Fehler: Auf welcher Seite war er und mit welchen Zahlen?', 'Lehrkräfte: Welche Arbeitsblätter würden euch im Unterricht helfen?', 'Bitte lasst Kinder nur zusammen mit einem Erwachsenen schreiben – wir brauchen keine Daten von ihnen.'],
      tipsTitle: 'Bevor du schreibst',
    },
  },
  it: {
    slugs: { privacy: 'privacy', legal: 'note-legali', contact: 'contatti' },
    names: { privacy: 'Privacy e cookie', legal: 'Note legali', contact: 'Contatti', cookies: 'Cookie' },
    date: '26 novembre 2026',
    updated: 'Ultimo aggiornamento',
    privacy: {
      title: 'Informativa su privacy e cookie',
      description: 'Quali dati tratta GenioPop, come proteggiamo i bambini, quali cookie di analisi usiamo con il tuo consenso e quali diritti hai.',
      lead: 'GenioPop è pensato perché bambini, famiglie e insegnanti lo usino senza dare alcun dato personale.',
      sections: (o) => [
        ['In breve', ['Non ci sono registrazione, account, chat né classifiche con nomi. Calcolatrici, allenamento e schede funzionano nel tuo browser e non inviano quello che scrivi a nessun server. Usiamo Google Analytics, con le funzioni pubblicitarie disattivate, per capire quali pagine sono utili; in Europa solo dopo che hai accettato.']],
        ['Titolare', [`Titolare del trattamento è ${o.owner}, residente in ${o.country}. Puoi scrivere a <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Bambini', [
          'Molte pagine di GenioPop (l’allenamento delle tabelline, i giochi) sono pensate per i bambini. Per questo:',
          '<ul><li>Non chiediamo né conserviamo nomi, email, età, foto o altri dati personali dei bambini.</li><li>Non ci sono registrazione, messaggi tra utenti né profili pubblici.</li><li>I progressi dell’allenamento (quali moltiplicazioni sono giuste o sbagliate) restano solo sul dispositivo, nella memoria locale del browser. Noi non li riceviamo. Si cancellano con «Cancella i miei progressi» o eliminando i dati del browser.</li><li>L’analisi funziona senza indicatori Google e senza personalizzazione degli annunci. Non mostriamo pubblicità personalizzata.</li></ul>',
          'Se in futuro mostreremo pubblicità, nelle pagine per bambini sarà solo non personalizzata e contrassegnata come rivolta a minori (GDPR e, negli Stati Uniti, COPPA).',
          `Se sei un genitore e pensi che un bambino ci abbia inviato dati personali (per esempio via email), scrivi a <a href="mailto:${o.email}">${o.email}</a> e li cancelleremo.`,
        ]],
        ['Dati che trattiamo', [
          '<strong>Dati tecnici di connessione.</strong> Il nostro fornitore di hosting, Cloudflare, Inc., tratta dati tecnici come l’indirizzo IP e il tipo di browser per mostrare le pagine e proteggere il servizio (legittimo interesse). Cloudflare può trattare questi dati anche fuori dall’UE, per esempio negli Stati Uniti.',
          '<strong>Messaggi che ci invii.</strong> Se ci scrivi, usiamo il tuo indirizzo e il messaggio solo per risponderti e li conserviamo per il tempo necessario.',
          '<strong>Caratteri e file.</strong> Il carattere tipografico e le immagini arrivano dal nostro dominio. L’unico servizio di terze parti che può essere caricato è Google Analytics, come spiegato sotto.',
        ]],
        ['Cookie e memoria locale', [
          'Usiamo Google Analytics 4, un servizio di Google Ireland Limited, per sapere in forma aggregata quali pagine vengono visitate. Gli indicatori Google e la personalizzazione degli annunci sono disattivati. La base giuridica è il tuo consenso. Dall’Europa Google Analytics si carica solo dopo che premi «Accetta». Google può trattare i dati anche negli Stati Uniti.',
          '<table><thead><tr><th>Nome</th><th>A cosa serve</th><th>Durata</th></tr></thead><tbody><tr><td><code>_ga</code>, <code>_ga_*</code></td><td>Google Analytics: distinguere le visite a fini statistici</td><td>fino a 2 anni</td></tr><tr><td><code>gp_consent</code></td><td>Ricordare la tua scelta sui cookie (memoria locale)</td><td>finché non la cancelli</td></tr><tr><td><code>gp_tables_v1</code></td><td>Progressi nell’allenamento delle tabelline, solo sul tuo dispositivo (memoria locale)</td><td>finché non li cancelli</td></tr></tbody></table>',
          'Puoi cambiare la tua scelta in qualsiasi momento con «Cookie» in fondo a ogni pagina.',
        ]],
        ['I tuoi diritti', [`Puoi chiedere accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati e opporti al trattamento scrivendo a <a href="mailto:${o.email}">${o.email}</a>. Puoi anche presentare reclamo al Garante per la protezione dei dati personali. In Italia i minori di 14 anni possono dare il consenso al trattamento dei dati solo tramite i genitori: per questo non chiediamo loro alcun dato.`]],
      ],
    },
    legal: {
      title: 'Note legali',
      description: 'Titolare di GenioPop, condizioni d’uso, uso delle schede in classe, proprietà intellettuale e responsabilità.',
      sections: (o) => [
        ['Titolare', [`GenioPop (geniopop.com) è un sito di ${o.owner}, residente in ${o.country}. Contatto: <a href="mailto:${o.email}">${o.email}</a>.`]],
        ['Uso del sito', ['GenioPop è gratuito. Spiegazioni e calcolatrici sono materiale di supporto per imparare ed esercitarsi; non sostituiscono l’insegnante né il programma scolastico. Controlliamo i calcoli con test automatici, ma se trovi un errore scrivici.']],
        ['Schede da stampare', ['Puoi stampare e fotocopiare le schede gratuitamente per uso personale, familiare o in classe. Non è consentito venderle o pubblicarle su altri siti come proprie.']],
        ['Proprietà intellettuale', ['Testi, esercizi, illustrazioni e grafica di GenioPop appartengono alla titolare. Il carattere Nunito è usato con licenza SIL Open Font.']],
        ['Link', ['Non controlliamo il contenuto dei siti che colleghiamo. Eventuale pubblicità o link sponsorizzati saranno indicati chiaramente.']],
      ],
    },
    contact: {
      title: 'Contatti',
      description: 'Scrivici per segnalare un errore, proporre un argomento o una scheda, o fare una domanda su GenioPop.',
      lead: 'Hai trovato un errore, ti manca un argomento o hai un’idea per una scheda? Scrivici.',
      tips: ['Se trovi un errore, dicci in quale pagina e con quali numeri.', 'Se sei insegnante, raccontaci quali schede ti servirebbero in classe.', 'Per favore, i bambini ci scrivano solo con un adulto: non ci servono dati su di loro.'],
      tipsTitle: 'Prima di scrivere',
    },
  },
};

export const legalPath = (lang, key) => `/${lang}/${LEGAL[lang].slugs[key]}/`;
