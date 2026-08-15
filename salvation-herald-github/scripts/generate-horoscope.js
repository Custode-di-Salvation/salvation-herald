const fs = require('fs');
const path = require('path');

const segni = [
  { nome: "Ariete", simbolo: "♈\uFE0E" },
  { nome: "Toro", simbolo: "♉\uFE0E" },
  { nome: "Gemelli", simbolo: "♊\uFE0E" },
  { nome: "Cancro", simbolo: "♋\uFE0E" },
  { nome: "Leone", simbolo: "♌\uFE0E" },
  { nome: "Vergine", simbolo: "♍\uFE0E" },
  { nome: "Bilancia", simbolo: "♎\uFE0E" },
  { nome: "Scorpione", simbolo: "♏\uFE0E" },
  { nome: "Sagittario", simbolo: "♐\uFE0E" },
  { nome: "Capricorno", simbolo: "♑\uFE0E" },
  { nome: "Acquario", simbolo: "♒\uFE0E" },
  { nome: "Pesci", simbolo: "♓\uFE0E" }
];

// Un mix di oroscopi classici e "Salvation-themed" (mascherati da eventi ordinari)
const previsioni = [
  "Ottimo momento per sistemare il giardino o dedicarsi al fai-da-te. Attenzione alle spese impreviste nel fine settimana, meglio mettere da parte qualche soldo. Se un gatto nero ti attraversa la strada vicino al bosco, invece di disegnare una 'X' per aria per tre volte come suggerisce la vecchia tradizione delle nostre montagne, limitati a guidare con prudenza e lasciarlo passare.",
  "In amore le cose procedono a gonfie vele, ma le stelle ti invitano a imparare ad ascoltare di più il partner. Un'amicizia di vecchia data potrebbe rivelarsi fondamentale nei prossimi giorni per risolvere un piccolo disguido pratico. Se vi incontrate per un caffè, ricorda l'usanza dei nonni: chi fa rovesciare il sale, ne lanci un pizzico dietro la spalla sinistra per scacciare il malocchio.",
  "Le stelle consigliano riposo assoluto. Un po' di stanchezza arretrata si farà sentire pesantemente: stacca la spina e dedicati ad ascoltare un po' di vecchia musica per fiddle (violino tradizionale). Evita però di fischiare da solo in casa dopo il tramonto: i vecchi dicono che attiri gli spiriti irrequieti dei boschi, ma molto più semplicemente disturba il sonno di chi ti vive accanto.",
  "Sul lavoro ci sono nuove opportunità all'orizzonte, ma non saltare a conclusioni affrettate. È fondamentale leggere bene ogni singolo documento prima di firmare. Se ricevi una proposta inaspettata, prenditi del tempo. E ricorda, quando vai a un colloquio in un vecchio edificio della città, esci sempre dalla stessa porta da cui sei entrato per non lasciarti la fortuna alle spalle.",
  "Settimana all'insegna della pura creatività. Hai un'incredibile voglia di rinnovare l'arredamento o magari imparare un mestiere tradizionale come l'intreccio dei cesti in quercia bianca. Asseconda questa energia! È anche il momento perfetto per iscriverti a quel corso serale che continui a rimandare da tempo: fare nuove conoscenze stimolanti gioverà tantissimo al tuo umore.",
  "Un po' di nervosismo generale potrebbe farti scattare per un nonnulla. Le tensioni vanno smaltite in fretta. Cerca di fare lunghe passeggiate per rilassarti, magari sfruttando i sentieri sicuri del fondovalle a caccia di funghi spugnole (morels) o aglio selvatico (ramps), avendo però l'estrema accortezza di non allontanarti dai tracciati principali e di rientrare sempre prima dell'imbrunire.",
  "La fortuna ti assiste nelle piccole cose quotidiane, regalandoti momenti di inaspettata serenità. Un incontro imprevisto in drogheria ti strapperà un sorriso e porterà ottime notizie su un vecchio conoscente. Mantieni un atteggiamento cordiale, e se un uccellino entra in casa per sbaglio, non farti prendere dal panico credendo alle vecchie storie sui presagi: apri semplicemente la finestra.",
  "La comunicazione è indubbiamente il tuo punto forte in questo periodo. Sfrutta questa occasione preziosa per chiarire un vecchio malinteso con un vicino di casa. Una torta di mele fatta in casa o un cestino di pawpaw (banani di montagna) raccolti freschi saranno il perfetto ramoscello d'ulivo per appianare ogni contrasto e ripartire su basi molto più solide di prima.",
  "Prospettive finanziarie in leggero ma costante miglioramento. È il momento ideale per pianificare con largo anticipo le prossime vacanze o per concederti finalmente quel piccolo sfizio che ti negavi da troppi mesi. Tuttavia, mantieni un registro accurato delle tue uscite quotidiane per non rischiare di disperdere inutilmente questo prezioso tesoretto autunnale.",
  "Attenzione ai cali di concentrazione a metà giornata. Le stelle suggeriscono di non strafare con gli straordinari sul lavoro. Se la sera ti senti inspiegabilmente spossato e senti un cane ululare a lungo nella notte, non farti suggestionare dalle vecchie leggende su presagi oscuri: probabilmente ha solo fiutato un cervo o un procione di passaggio. Vai a letto sereno.",
  "Questioni di cuore nettamente in primo piano. I single potrebbero fare un incontro intrigante, ma le stelle raccomandano caldamente di non bruciare le tappe. Coltiva la nuova conoscenza con estrema calma e pazienza, lasciando che il tempo riveli le vere intenzioni dell'altra persona prima di lasciarti andare completamente. La fiducia si costruisce un passo alla volta.",
  "Ottima energia sia fisica che mentale per tutta la settimana. Sfrutta questa potente spinta positiva per riordinare la cantina o sgomberare la soffitta dagli oggetti inutili. Durante le pulizie ritroverai vecchi ricordi, fotografie o oggetti d'infanzia tramandati da generazioni che pensavi perduti per sempre, e che ti scalderanno immensamente il cuore, regalandoti un po' di sana nostalgia.",
  "Un periodo di riflessione si profila all'orizzonte. Senti il bisogno fisiologico di isolarti dal caos e riorganizzare i tuoi pensieri. Asseconda questo desiderio ritagliandoti mezz'ora al giorno tutta per te, magari in veranda. Evita però di rimuginare troppo sul passato e mantieni lo sguardo fiducioso verso il domani. Il vento di montagna porta sempre buoni consigli a chi sa ascoltare.",
  "La diplomazia sarà la tua arma segreta. In famiglia potrebbero sorgere delle piccole incomprensioni legate alla gestione economica o agli spazi comuni. Invece di alzare la voce, usa il tatto e la pazienza per riportare l'armonia. Se il bestiame dei vicini è stranamente irrequieto, non innervosirti e non pensare subito a chissà quale creatura predatrice: è solo l'avvicinarsi di un temporale.",
  "Un'ondata di ottimismo ti travolgerà a metà settimana. Qualsiasi ostacolo lavorativo ti sembrerà improvvisamente sormontabile e i colleghi apprezzeranno molto questo tuo nuovo atteggiamento. Fai solo attenzione a non promettere favori che sai di non poter mantenere: la sincerità tipica della nostra gente paga sempre di più rispetto a un 'sì' detto per puro compiacimento.",
  "L'alimentazione richiede un po' più di attenzione del solito. Se ultimamente hai esagerato con le cene corpose a base di stufato e pane di mais, il tuo corpo ti sta mandando dei segnali chiari. Inizia a introdurre cibi più leggeri e bevi moltissima acqua. Se noti un sapore ferroso nell'acqua del rubinetto, tranquillo: il municipio sta spurgando i vecchi pozzi cittadini.",
  "Le stelle favoriscono i viaggi e gli spostamenti. Anche una breve gita verso le vecchie miniere a nord o ai piedi della montagna potrebbe rivelarsi l'espediente perfetto per scrollarti di dosso l'ansia lavorativa. Prima di partire, però, fai dare una bella controllata ai freni e all'olio della tua auto, specialmente se pensi di percorrere i vecchi sterrati pieni di fango e ghiaia.",
  "Un'illuminazione improvvisa potrebbe sbloccare un progetto fermo da tempo. Hai finalmente capito qual è il pezzo mancante del puzzle! Non esitare a condividere questa intuizione con i tuoi superiori, ti garantirà ottimi punti. Tuttavia, evita di vantarti eccessivamente dei tuoi successi davanti a colleghi che stanno attraversando un momento difficile, mantieni l'umiltà tipica di queste valli.",
  "La tua proverbiale testardaggine potrebbe giocarti un brutto scherzo. Se un amico cerca di darti un consiglio su una questione personale, non ergere un muro difensivo. Chi ti vuole bene vede le cose da una prospettiva più lucida della tua. Accetta le critiche costruttive e prova a modificare il tuo approccio, ricorda che anche la quercia più dura può spezzarsi col vento.",
  "Settimana ideale per prendersi cura dei propri animali o delle proprie piante. Dedicare attenzione a chi dipende da noi ha un fortissimo effetto terapeutico. Se noti che il tuo cane fissa ossessivamente e ringhia verso un angolo buio del fienile, non allarmarti pensando al folklore locale sul 'White Thing': sta solo tenendo d'occhio qualche grosso roditore in cerca di provviste.",
  "Cambiamenti in vista nella tua cerchia di amicizie. Qualcuno potrebbe trasferirsi fuori dallo stato, ma non viverlo come un fallimento personale: le persone cambiano e le strade a volte si dividono. Concentrati su chi sceglie di restare in questa comunità e rafforza quei legami. Una serata passata a cantare sotto il portico con i vecchi amici vale più di cento conoscenze superficiali.",
  "Le questioni burocratiche richiedono la massima priorità. Se hai scartoffie in sospeso per le tasse di proprietà o la legnaia, non rimandare oltre: affrontale questa settimana. Armati di tanta pazienza, prepara tutti i documenti necessari in anticipo e preparati ad aspettare in fila. La soddisfazione di aver tolto questo peso dalla tua mente prima dell'inverno sarà impagabile.",
  "Il bisogno di conferme esterne si farà sentire prepotentemente. Invece di cercare l'approvazione degli altri, inizia ad apprezzare i tuoi stessi traguardi, forgiati con il duro lavoro tipico degli Appalachi. Sei molto più forte di quanto tu creda. Concediti un piccolo premio personale alla fine della settimana lavorativa, te lo sei meritato ampiamente.",
  "Una piccola delusione passeggera potrebbe rattristare la giornata di martedì. Non lasciare che questo episodio influenzi l'umore di tutta la settimana. La resilienza si costruisce proprio superando i piccoli ostacoli che la vita di montagna ci mette davanti. Per ritrovare il buonumore, organizza una cena rustica e invita chi sa sempre come farti ridere di cuore."
];

// Shuffle array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const monthName = now.toLocaleDateString('it-IT', { month: 'long' }).toLowerCase();
const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

const fileName = `${year}-${month}-01-oroscopo-madame-z.md`;
const postsDir = path.join(__dirname, '..', 'src', 'posts');
const filePath = path.join(postsDir, fileName);

if (!fs.existsSync(filePath)) {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const shuffledPrevisioni = shuffle([...previsioni]);
  
  let content = `---
title: "L'oroscopo di Madame Z - ${capitalizedMonth} ${year}"
deck: "Le stelle di Salvation: consigli pratici, previsioni e un pizzico di buonsenso per affrontare il mese."
author: "Madame Z"
section: "Costume"
tags: ["article"]
hideFromHome: true
date: ${year}-${month}-01
---

Benritrovati, cari concittadini. Le configurazioni astrali di questo mese ci invitano alla prudenza e alla razionalità. Come sempre, ricordo a tutti che l'astrologia è una guida, ma il vero artefice del proprio destino è chi sa tenere i piedi ben piantati a terra, lontano da sterili superstizioni.

Ecco cosa dicono le stelle per le prossime settimane:

<div class="horoscope-grid">
`;

  segni.forEach((segno, index) => {
    content += `
  <div class="horoscope-item">
    <div class="horoscope-header">
      <h3 class="horoscope-sign"><span class="horoscope-symbol">${segno.simbolo}</span> ${segno.nome}</h3>
    </div>
    <div class="horoscope-text">${shuffledPrevisioni[index]}</div>
  </div>
`;
  });

  content += `</div>\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[Oroscopo] Generato con successo l'oroscopo per ${capitalizedMonth} ${year} in ${fileName}`);
} else {
  console.log(`[Oroscopo] Il file per ${capitalizedMonth} ${year} esiste già. Nessuna operazione necessaria.`);
}
