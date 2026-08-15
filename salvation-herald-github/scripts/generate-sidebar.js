const fs = require('fs');
const path = require('path');

const classifieds = [
  "Vendesi pick-up Ford F-150 del '92, gomme appena rifatte. 1500$. Citofonare Howard.",
  "Cercasi ragazzo robusto per spaccare legna nel weekend. Paga oraria o baratto con conserve.",
  "Smarrito gatto tigrato, risponde al nome di Jonathan. Ha un collare rosso. Manca da martedì.",
  "Vendesi set completo dell'Enciclopedia Britannica, ed. 1980. Ottime condizioni. Prezzo trattabile.",
  "Cercasi disperatamente tubo da 15mm in rame. Scambio con attrezzi da lavoro usati.",
  "Regalasi cuccioli di incrocio pastore. Svezzati e abituati all'aperto. Chiamare ore pasti.",
  "Compro rottami metallici e batterie per auto. Ritiro a domicilio gratuito.",
  "Affittasi stanza uso ripostiglio, zona Bright Falls Edge. No finestre, molto spaziosa.",
  "Lezioni di chitarra per principianti. 10$ all'ora. Chiedere di Tom al River's End Diner.",
  "Vendesi falciatrice a spinta, lama da affilare. 20$.",
  "Rammendo vestiti e realizzo coperte patchwork su commissione. Prezzi modici.",
  "Cercasi compagno per battute di pesca la domenica mattina. Requisito: barca propria.",
  "Vendesi divano a fiori anni '70. Condizioni accettabili, qualche graffio di gatto.",
  "Scambio stufa a legna in ghisa con televisore a colori funzionante."
];

const events = [
  "Riunione del Consiglio Cittadino - Martedì ore 20:00 presso il Salvation Town Hall.",
  "Methodist Apple Pie Social - Domenica mattina nel piazzale della First Methodist Church of Salvation.",
  "Gruppo di lettura 'The Ladies of Salvation' - Questo mercoledì, libro: Orgoglio e Pregiudizio.",
  "Corso di cucito e uncinetto per principianti - Tutti i giovedì pomeriggio alla Salvation Public Library.",
  "Bright Falls Edge Swap Meet - Sabato dalle 8:00 alle 13:00 presso la vecchia casa sfitta al 42 di Elm Street (Bright Falls Edge). Solo residenti.",
  "Partita dei Salvation Bucks - Venerdì sera al campo sportivo della Salvation Junior-Senior High School. Sosteniamo i nostri ragazzi!",
  "Incontro di orientamento per gli Young Fawns - Sabato mattina. Ritrovo al limitare del bosco ovest.",
  "Spettacolo teatrale scolastico alla Salvation Junior-Senior High School - I ragazzi mettono in scena 'Il Mago di Oz'. Offerta libera.",
  "Campagna vaccinazione antirabica per cani - Mercoledì pomeriggio alla Clinica Holloway.",
  "Riunione dei veterani - Primo venerdì del mese. Rinfresco offerto dalla signora Higgins (Bright Falls Edge).",
  "Gruppo di preghiera del martedì - Ore 18:00 alla First Methodist Church of Salvation.",
  "Pulizia primaverile delle strade - Volontari cercasi per domenica mattina. Sacchi forniti dal Salvation Town Hall."
];

const movies = [
  "Pride and Prejudice (1940)",
  "The Thing from Another World (1951)",
  "The Wizard of Oz (1939)",
  "Invasion of the Body Snatchers (1956)",
  "The Texas Chain Saw Massacre (1974)",
  "The Cabinet of Dr. Caligari (1920)",
  "Vertigo (1958)",
  "Stagecoach (1939)",
  "The Night of the Hunter (1955)",
  "Rosemary's Baby (1968)",
  "The Shining (1980)",
  "The Birds (1963)",
  "Creature from the Black Lagoon (1954)",
  "Psycho (1960)",
  "Night of the Living Dead (1968)",
  "The Wicker Man (1973)"
];

const sportsRecaps = [
  "Bucks 14 - Parsons 21",
  "Bucks 7 - Blackwater 24",
  "Bucks 21 - Red Creek 14",
  "Bucks 10 - Grafton 10",
  "Bucks 0 - Elkins 28",
  "Bucks 24 - Davis 7"
];

const blotterEntries = [
  "02:14 - Chiamata per disturbo della quiete pubblica in zona boschiva. La pattuglia rinviene una vecchia radio a batteria abbandonata da escursionisti. Oggetto rimosso e smaltito.",
  "15:30 - Segnalazione sparizione animali domestici a The Hollow. Si raccomanda ai residenti di rinforzare i recinti per via dell'aumentata attività di volpi e coyote.",
  "04:00 - Segnalazione di fari abbaglianti nel bosco. La pattuglia intervenuta non ha rintracciato alcun veicolo. Probabile attività di bracconieri di frodo. Intensificati i controlli.",
  "22:15 - Disturbo della quiete pubblica a West Chapel. Segnalati schiamazzi notturni. La pattuglia è intervenuta disperdendo un gruppo di adolescenti in stato di ebrezza.",
  "09:10 - Atto vandalico. Ignoti hanno abbattuto la segnaletica sul sentiero del lago. Il dipartimento forestale provvederà in giornata alla sostituzione.",
  "11:45 - Segnalato grosso cane randagio smarrito nei pressi del Grocery. L'animale si è allontanato autonomamente verso il bosco senza creare disturbo.",
  "20:00 - Foghorn Waterfront. Intervento per tubature rumorose. Il rumore era causato da bolle d'aria nell'impianto per via della pressione irregolare dell'acquedotto cittadino.",
  "14:20 - Veicolo in panne lungo la Route 9. Il conducente, disorientato a causa di un colpo di calore, si era incamminato in cerca di segnale telefonico. Soccorso con successo dal medico condotto.",
  "06:15 - Bright Falls Edge. Intervento dei pompieri per la rottura di un compressore industriale refrigerante. Situazione messa immediatamente in sicurezza senza danni a persone."
];

const fishingReports = {
  winter: [
    { temp: "4.0°C (omotermia)", clarity: "Nera (visibilità 0)", bass: "Letargo estremo", trout: "Caccia a 5m", bait: "Jerkbaits sonori" },
    { temp: "3.5°C (ghiaccio)", clarity: "Scura, nebbia fitta", bass: "Inattivo", trout: "Discreto a riva", bait: "Siliconici odorosi" },
    { temp: "4.5°C (flussi attivi)", clarity: "Liquirizia densa", bass: "Assente", trout: "Sospesa a 15m", bait: "Drop-shot con tranci" }
  ],
  spring: [
    { temp: "8.0°C (4.5° a 3m)", clarity: "Torbida (disgelo)", bass: "Isolato in secca", trout: "Attiva a 10m", bait: "Crankbaits metallici" },
    { temp: "9.5°C (turnover)", clarity: "Tè forte, foschia", bass: "Discreto", trout: "Aggressiva", bait: "Minnow scuri" },
    { temp: "7.0°C", clarity: "Nera (vis. <50cm)", bass: "Fermo", trout: "Discreto a 20m", bait: "Jig luminosi, tranci" }
  ],
  summer: [
    { temp: "14°C (termoclino 2m)", clarity: "Nera (buio totale)", bass: "Discreto a galla", trout: "Attive a 15-30m", bait: "Deep crankbaits" },
    { temp: "12.5°C (superficie)", clarity: "Nebbia termica", bass: "Raro tra le erbe", trout: "Sopra i 50m", bait: "Esche naturali" },
    { temp: "15.0°C (picco estivo)", clarity: "Nera profonda", bass: "Lento", trout: "Notturna a 10m", bait: "Spinnerbaits scuri" }
  ],
  autumn: [
    { temp: "9.0°C (inversione)", clarity: "Banchi di nebbia", bass: "In sparizione", trout: "Attiva verso i 5m", bait: "Grosse esche scure" },
    { temp: "7.5°C (misto)", clarity: "Nera, molti detriti", bass: "Fermo", trout: "Ottima", bait: "Cucchiaini pesanti" },
    { temp: "6.0°C", clarity: "Liquirizia", bass: "Letargico", trout: "Discreto a fondo", bait: "Vermi vivi a fondo" }
  ]
};

function getSeason(m) {
  if (m === 11 || m === 0 || m === 1) return 'winter';
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  return 'autumn';
}

// Generatore pseudo-randomico seedato
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffle(array, baseSeed) {
  let seed = baseSeed;
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(seededRandom(seed++) * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
// Seme unico per mese e anno
const seed = (year * 12) + month;

const forestryReports = {
  winter: [
    { inc: "Nullo (neve diffusa)", fauna: "In torpore", trails: "Ghiaccio severo" },
    { inc: "Nullo", fauna: "Rari lupi isolati", trails: "Sentieri chiusi" },
    { inc: "Nullo", fauna: "Scarsa attività", trails: "Rischio slavine" }
  ],
  spring: [
    { inc: "Alto (Allerta)", fauna: "Orsi in risveglio", trails: "Fango e disgelo" },
    { inc: "Critico (secco)", fauna: "Alta attività orsi", trails: "Chiusure parziali" },
    { inc: "Moderato", fauna: "Cani al guinzaglio", trails: "Praticabili i bassi" }
  ],
  summer: [
    { inc: "Basso (temporali)", fauna: "Orsi: svezzamento", trails: "Rischio piene lampo" },
    { inc: "Basso (alta umidità)", fauna: "Allerta orsi neri", trails: "Zanzare e zecche" },
    { inc: "Moderato", fauna: "Vipere attive", trails: "Riserva d'acqua" }
  ],
  autumn: [
    { inc: "Alto (Allerta)", fauna: "Orsi: ricerca cibo", trails: "Foglie scivolose" },
    { inc: "Critico", fauna: "Bramito dei cervi", trails: "Visibilità ridotta" },
    { inc: "Moderato", fauna: "Migrazione uccelli", trails: "Caduta rami" }
  ]
};

const selectedClassifieds = shuffle([...classifieds], seed).slice(0, 3);
const selectedEvents = shuffle([...events], seed + 100).slice(0, 3);
const selectedMovie = shuffle([...movies], seed + 200)[0];
const selectedRecaps = shuffle([...sportsRecaps], seed + 300).slice(0, 2);
const selectedBlotter = shuffle([...blotterEntries], seed + 400).slice(0, 2);
const season = getSeason(month);
const selectedFishing = shuffle([...fishingReports[season]], seed + 500)[0];
const selectedForestry = shuffle([...forestryReports[season]], seed + 600)[0];

const data = {
  annunci: selectedClassifieds,
  eventi: selectedEvents,
  film: selectedMovie,
  recaps: selectedRecaps,
  blotter: selectedBlotter,
  pesca: selectedFishing,
  foresta: selectedForestry
};

const targetDir = path.resolve(__dirname, '../src/_data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
fs.writeFileSync(path.join(targetDir, 'sidebar.json'), JSON.stringify(data, null, 2));

console.log("[Sidebar] Generati gli annunci e gli eventi per " + (month + 1) + "/" + year);
