# 💰 Cost of Living Compare

**costoflivingcompare.com** — Confronta il costo della vita tra 57+ città nel mondo.

## 🚀 Come Pubblicare (Guida Step-by-Step)

### Passo 1: Crea un account GitHub
1. Vai su **github.com** e clicca "Sign Up"
2. Scegli username, email, password
3. Conferma la mail

### Passo 2: Crea un Repository
1. Una volta loggato, clicca il **+** in alto a destra → "New repository"
2. Nome: `costoflivingcompare`
3. Lascia "Public" selezionato
4. **NON** spuntare "Add a README file" (ce l'abbiamo già)
5. Clicca "Create repository"

### Passo 3: Carica i File
**Opzione A — Dal browser (più semplice):**
1. Nella pagina del repository appena creato, clicca "uploading an existing file"
2. Trascina TUTTA la cartella del progetto (tutti i file e le cartelle `src/` e `public/`)
3. Clicca "Commit changes"

**Opzione B — Da terminale (se hai Git installato):**
```bash
cd costoflivingcompare
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/costoflivingcompare.git
git push -u origin main
```

### Passo 4: Collega a Vercel
1. Vai su **vercel.com**
2. Clicca "Sign Up" → scegli "Continue with GitHub"
3. Autorizza Vercel ad accedere al tuo GitHub
4. Clicca "New Project"
5. Seleziona il repository `costoflivingcompare`
6. Vercel rileva automaticamente che è un progetto Vite — lascia le impostazioni di default
7. Clicca "Deploy"
8. Aspetta 1-2 minuti... **il sito è online!** 🎉

### Passo 5: Collega il Dominio
1. Nel dashboard Vercel, vai su Settings → Domains
2. Scrivi `costoflivingcompare.com` e clicca Add
3. Vercel ti mostrerà i record DNS da configurare
4. Vai nel pannello del tuo registrar (dove hai comprato il dominio)
5. Nella sezione DNS, aggiungi i record che Vercel ti indica
6. Aspetta 5-30 minuti per la propagazione
7. HTTPS viene attivato automaticamente ✅

## 📊 Struttura del Progetto

```
costoflivingcompare/
├── index.html          ← Pagina HTML con SEO meta tags
├── package.json        ← Dipendenze del progetto
├── vite.config.js      ← Configurazione Vite
├── public/
│   ├── favicon.svg     ← Icona del sito
│   ├── robots.txt      ← Per i motori di ricerca
│   └── sitemap.xml     ← Mappa del sito per Google
└── src/
    ├── main.jsx        ← Entry point React
    ├── App.jsx         ← Componente principale (calcolatore)
    └── data.js         ← Database delle 57 città
```

## 💰 Monetizzazione

### Google AdSense
Il sito ha già 2 slot pubblicitari predisposti (`ad-slot-1` e `ad-slot-2`).
Per attivarli:
1. Crea un account su **adsense.google.com**
2. Aggiungi il tuo sito e attendi l'approvazione (di solito 1-3 giorni)
3. Sostituisci i placeholder nel codice con il codice AdSense

### Affiliate
Ottime opportunità per affiliazioni:
- **Wise/Revolut** — servizi bancari per expat
- **HousingAnywhere/Spotahome** — affitti all'estero
- **NordVPN** — sicurezza online per chi si trasferisce
- **Coursera/Udemy** — corsi di lingua

## 🔍 SEO Già Incluso
- Meta tags (title, description, keywords)
- Open Graph tags (per condivisione su social)
- Twitter Cards
- JSON-LD structured data (schema.org)
- Sitemap XML
- Robots.txt
- Contenuto testuale SEO-friendly

## 🛠 Aggiungere Nuove Città
Apri `src/data.js` e aggiungi una riga seguendo il formato esistente:
```javascript
"NomeCittà": { country:"XX", region:"NomeRegione", currency:"XXX", rent1br:000, ... },
```
Ricorda di aggiungere la bandiera in `FLAGS` se è un paese nuovo.

## 📱 Prossimi Sviluppi Suggeriti
- [ ] Versione italiana (i18n)
- [ ] Pagine dedicate per ogni confronto (es. /milano-vs-londra)
- [ ] Blog con articoli SEO
- [ ] Newsletter signup
- [ ] Analytics (Google Analytics o Plausible)
