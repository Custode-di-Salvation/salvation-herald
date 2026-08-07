# The Salvation Herald — guida

Questo è il sito del giornale, costruito con **Eleventy** (uno static site generator).
Il concetto chiave: **non tocchi mai l'HTML**. Scrivi ogni articolo in un file di
testo (Markdown), lo metti nella cartella `src/posts/`, e homepage, archivio e pagina
dell'articolo si generano e si collegano **da sole**.

---

## 1. Mettere il sito online (una volta sola)

Servono due account gratuiti: **GitHub** (dove vivono i file) e **Netlify** (che
pubblica il sito e lo aggiorna da solo). Nessun pagamento, nessuna carta.

1. **Crea un account su github.com.**
2. **Crea un repository nuovo** (bottone "New"), chiamalo per esempio `salvation-herald`.
   Lascialo pubblico o privato, come preferisci.
3. **Carica i file.** Nella pagina del repository vuoto scegli "uploading an existing
   file" e trascina dentro **tutto il contenuto di questa cartella**
   (`package.json`, `.eleventy.js`, `netlify.toml`, la cartella `src/`, ecc.).
   NON serve caricare `node_modules` né `_site` — si generano da soli.
4. **Crea un account su netlify.com** (puoi entrare con GitHub).
5. In Netlify: **"Add new site" → "Import an existing project" → GitHub →** scegli il
   repository `salvation-herald`. Netlify legge da solo il file `netlify.toml` e sa già
   cosa fare. Premi **Deploy**.
6. Dopo circa un minuto avrai un indirizzo tipo `salvation-herald.netlify.app`.
   Il sito è online.

Da questo momento **non torni più su Netlify**: ogni modifica ai file su GitHub
ripubblica il sito automaticamente.

---

## 2. Pubblicare un nuovo articolo

Ogni articolo è un file `.md` dentro `src/posts/`. Per aggiungerne uno:

1. Vai nel repository su GitHub, entra in `src/posts/`.
2. Premi **"Add file" → "Create new file"**.
3. Dai un nome al file con la data davanti, così restano ordinati, per esempio:
   `2026-06-10-town-meeting.md`
4. Incolla dentro questo schema e cambia i valori:

```
---
title: "Il titolo dell'articolo"
date: 2026-06-10
author: E. Marlowe, Staff Correspondent
filed: June 10, 2026
section: Local
deck: "Il sottotitolo/occhiello, una frase che riassume il pezzo."
weather: "Clear, 68°F"
image: "https://.../foto.jpg"
imageAlt: "Descrizione della foto"
imageCaption: "Didascalia — Herald photo"
---

Qui scrivi il corpo dell'articolo. Vai a capo con una riga vuota tra un
paragrafo e l'altro.

## Un sottotitolo dentro l'articolo

Altro testo. Per una citazione in evidenza:

> "Le virgolette a inizio riga creano una citazione grande."
```

5. In fondo alla pagina premi **"Commit changes"**.

Fatto. In circa 30 secondi il sito online si aggiorna: il nuovo articolo va **in cima
alla homepage** come apertura, quello prima scivola tra i secondari, e la riga
compare **nell'archivio**. Tutto automatico.

### Note sui campi
- **Obbligatori:** `title`, `date`, `author`. Il resto è opzionale.
- **`date`** decide l'ordine: la più recente è sempre l'apertura in homepage.
- **`section`** è la rubrica (Local, The Lake, Opinion, ecc.): appare come etichetta.
- **`weather`** compare solo per l'articolo di apertura, nella testata.
- **`image`** può essere un link web oppure, se metti le foto nella cartella
  `src/img/`, un percorso tipo `/img/nomefoto.jpg`.

---

## 3. (Opzionale) Cambiare l'intestazione del giornale

Nome, motto, volume, prezzo, email ecc. stanno in un solo file:
`src/_data/site.json`. Cambi lì e valgono per tutto il sito.

---

## 4. (Opzionale) Lavorare in anteprima sul tuo PC

Non è necessario, ma se un giorno vuoi vedere le modifiche dal vivo prima di
pubblicarle: installa Node.js, poi nella cartella del progetto esegui
`npm install` una volta, e `npm start`. Apri l'indirizzo che compare (di solito
`localhost:8080`): il sito si aggiorna mentre modifichi i file.

---

## Struttura delle cartelle

```
salvation-herald/
├── package.json         → dipendenze (Eleventy)
├── .eleventy.js         → configurazione del generatore
├── netlify.toml         → istruzioni per Netlify
├── LEGGIMI.md           → questa guida
└── src/
    ├── index.njk        → template della homepage (auto-generata)
    ├── _data/
    │   └── site.json    → nome, motto, volume del giornale
    ├── _includes/
    │   ├── base.njk     → scheletro HTML + font
    │   └── article.njk  → template della pagina articolo
    ├── css/
    │   └── herald.css   → tutto lo stile del giornale
    ├── img/             → (metti qui le foto, opzionale)
    └── posts/
        ├── posts.json   → regole comuni a tutti gli articoli
        └── *.md         → un file per ogni articolo
```
