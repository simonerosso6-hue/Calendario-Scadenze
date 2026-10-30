# Scadenzario

Un posto solo per le scadenze: documenti, auto, abbonamenti, tasse.
App web (PWA) statica: HTML, CSS e JavaScript, senza server né dipendenze. I dati restano sul telefono di chi la usa.

## I file

| File | A cosa serve |
| --- | --- |
| `index.html` | L'app |
| `sw.js` | Funzionamento senza connessione e aggiornamenti. Contiene il numero di versione |
| `manifest.webmanifest` | Nome e icone quando l'app è sulla Home |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | Icone |

## Pubblicare su GitHub Pages dall'iPhone

1. Apri github.com in Safari e accedi. Tocca **+** → **New repository**. Chiamalo `scadenzario` e scegli **Public**. Con l'account gratuito GitHub Pages funziona solo con repository pubblici.
2. Nel repository tocca **Add file** → **Upload files**, scegli tutti i file della tabella, poi **Commit changes**. I file devono stare nella radice, non dentro una cartella.
3. Vai su **Settings** → **Pages**. In "Build and deployment" scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi **Save**.
4. Dopo uno o due minuti in cima alla pagina compare l'indirizzo, di solito `https://TUO-UTENTE.github.io/scadenzario/`. Aprilo in Safari.
5. Per averla come app: **Condividi** → **Aggiungi alla schermata Home** → **Aggiungi**.

## Aggiornare

1. Nel repository tocca **Add file** → **Upload files** e carica i file cambiati con lo stesso nome: sostituiscono quelli vecchi.
2. Apri `sw.js`, tocca la matita e aumenta il numero nella riga `var CACHE = 'scadenzario-v10';` (per esempio `v11`). Poi **Commit changes**. Senza questo passaggio l'app non vede la novità.
3. Aspetta uno o due minuti e apri l'app. In basso compare **Nuova versione disponibile**: tocca **Aggiorna**. Finché non lo fai, l'app continua a usare la versione che hai.
4. Se l'avviso non compare, tocca **Controlla aggiornamenti** in fondo alla pagina.

Le scadenze salvate non si perdono con gli aggiornamenti.

## Tornare alla versione precedente

1. Nel repository apri il file da ripristinare (per esempio `index.html`) e tocca **History**.
2. Scegli il commit con la versione che vuoi riavere. Tocca i tre puntini del file, poi **View file**. Poi **Raw**, seleziona tutto e copia.
3. Torna al file attuale, tocca la matita, cancella tutto, incolla e tocca **Commit changes**.
4. Importante: in `sw.js` scrivi un numero **più alto** di quello attuale, anche se il codice è vecchio (se ora è `v12`, scrivi `v13`). Altrimenti l'app non si accorge del cambio.

## Come funziona

- **Istruzioni illustrate**: si aprono da sole al primo utilizzo e dal link **Come si usa** in fondo alla pagina.
- **Usala come una vera app**: riquadro in alto per chi apre il sito dal browser. Su Android ha il pulsante **Installa**, su iPhone e iPad i passaggi scritti. Nei browser interni di Instagram, WhatsApp e simili chiede di aprire il link in Safari o Chrome. Si chiude con la **X** e torna dopo 14 giorni. Non compare se l'app è già installata.
- **Calendario**: **Aggiungi al Calendario** scarica un file `.ics` con gli avvisi. La pagina non può sapere se l'hai importato, quindi chiede conferma con **Sì, aggiunto**. Su Android c'è anche **Google Calendar**.
- **Copie**: **Copia dati** e **Ripristina da testo** servono per spostare le scadenze su un altro telefono.
