# HobbyLaser (PWA)

> [🇬🇧 English](README.md) | 🇮🇹 Italiano

![Ottimizzato per Chrome Dark Mode](https://img.shields.io/badge/optimized%20for-Chrome%20Dark%20Mode-black?logo=googlechrome\&logoColor=white\&style=flat-square)
![PWA Pronto](https://img.shields.io/badge/PWA-ready-green?logo=googlechrome\&logoColor=white\&style=flat-square)
![Supporto Offline](https://img.shields.io/badge/offline-support-blue?style=flat-square)
[![Demo Live](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square\&logo=github)](https://marco-f.github.io/HobbyLASER/)
![Versione](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)

---

Una **Progressive Web App (PWA)** per controllare **macchine CNC o laser** direttamente dal browser usando la **Web Serial API**. Permette agli utenti di disegnare, elaborare immagini, generare G-code e comunicare con i controller – tutto direttamente su Google Chrome, con pieno supporto offline.

> ⚠ **Ottimizzato per Google Chrome in Modalità Scura**

---

<p align="center">
    <img src="IMG/anim.svg" alt="logo" style="width: 600px; height: auto;">
</p>

<h2 align="center">Avvertenza</h2>
<h3 align="center" color="red">**UNA CNC O UN LASER NON SONO GIOCATTOLI!**</h3>
<h4 align="center"> Usare una CNC o un laser senza formazione e protezioni adeguate può causare gravi infortuni e cecità. Non ci assumiamo alcuna responsabilità per danni derivanti dall'uso di questo software.</h4>
<h4 align="center"> 🔗 [Leggi di più sulla sicurezza laser](https://www.lasersafetyfacts.com/laserclasses.html) </h4>  
<h4 align="center"> **USA SEMPRE OCCHIALI PROTETTIVI!** </h4>

---

### Demo Live

Provalo ora: [https://marco-f.github.io/HL/](https://marco-f.github.io/HL/)

---

### Screenshot

<p align="center">
  <img src="IMG/ss.png" alt="Screenshot 1" width="100%"/>
</p>

---

## Indice

* [Funzionalità](#funzionalità)
* [Web Serial API](#web-serial-api)
* [Come eseguirlo in locale](#come-eseguirlo-in-locale)
* [Contribuire](#contribuire)
* [Tecnologie Utilizzate](#tecnologie-utilizzate)
* [Changelog](#changelog)
* [Ringraziamenti](#ringraziamenti)
* [Documentazione](#documentazione)

---

### Funzionalità

-️ **Disegno Interattivo** – Crea disegni vettoriali direttamente nel browser.
-️ **Supporto Immagini Raster** – Carica ed elabora PNG/JPG per incisioni.
-️ **Font Personalizzati** – Importa i tuoi font per un controllo creativo.

* **Supporto Offline** – Funziona senza connessione grazie ai Service Worker.
* **Generazione G-code** – Converti i disegni in G-code e inviali a un microcontrollore.
* **Salvataggio Locale** – Il lavoro viene salvato automaticamente nel browser.
* **Installabile come PWA** – Installabile su desktop per un'esperienza simile a un'app nativa.
* **Modalità Scura** – Ottimizzato per ambienti con poca luce.

---

### Hardware Supportato

Questa applicazione è progettata per funzionare con incisori laser e macchine CNC per hobbisti che usano un **controller compatibile GRBL**.

### Compatibilità Firmware

* **GRBL v1.1f o superiore** (consigliato)
* Schede basate su GRBL (Arduino Uno + CNC Shield, Woodpecker, EleksMaker, ecc.)

> ℹ GRBL è un firmware open-source che gira su controller basati su Arduino e interpreta G-code per il controllo del movimento. Scopri di più: [GRBL GitHub](https://github.com/gnea/grbl)

### Comunicazione

* Comunica via USB usando la **Web Serial API**
* Richiede **Google Chrome** o un browser basato su Chromium con supporto Serial
* Non necessita di driver o software aggiuntivo

### Non Ancora Supportati

* Firmware Marlin (usato da molte stampanti 3D)
* Smoothieboard, Duet o altri controller non-GRBL
* Sistemi laser proprietari (es. Glowforge, xTool, ecc.)

> **Nota:** assicurati sempre che il firmware sia configurato per accettare comandi dal browser tramite connessione USB standard. Il baud rate predefinito è **115200**, salvo diversa specifica.

---

### Web Serial API

Questa app utilizza la **Chrome Web Serial API** per comunicare con controller CNC/laser tramite connessione seriale.

### Caratteristiche:

* Accesso alle porte seriali dal browser
* Configurazione baud rate, bit di dati, parità, bit di stop
* Lettura/scrittura asincrona tramite Streams API
* Rileva eventi di connessione/disconnessione
* Richiede **permesso utente** per sicurezza
* Funziona solo su **browser basati su Chromium**

---

## Come eseguirlo in locale

1. Clona il repository:

   ```bash
   git clone https://github.com/marco-f/PWA-HobbyLASER.git
   ```
2. Vai nella cartella del progetto:

   ```bash
   cd PWA-HobbyLASER
   ```
3. Avvia un server web locale (es. con http-server):

   ```bash
   npm install -g http-server
   http-server
   ```
4. Apri il browser:

   ```
   http://localhost:8080
   ```
5. (Opzionale) Installa l'app come PWA tramite il prompt del browser.

---

## Tecnologie Utilizzate

* **HTML/CSS/JS** – Struttura, layout e logica principale
* **Service Worker** – Funzionalità offline
* **Web Manifest** – Metadati per l'installazione PWA
* **Streams API** – Comunicazione seriale asincrona
* **SVG & Canvas API** – Disegno ed elaborazione immagini

---

## Contribuire

Contribuzioni dalla community sono benvenute!

1. Fai un fork del repository
2. Crea un nuovo branch: `git checkout -b nome-funzione`
3. Fai il commit delle modifiche: `git commit -am 'Aggiunta funzione'`
4. Fai il push del branch: `git push origin nome-funzione`
5. Apri una Pull Request

Consulta la guida completa: [Guida al contributo](CONTRIBUTING.md)

Grazie per aiutare a migliorare HobbyLaser!

---

## Changelog

**v1.0.0**

* Prima versione stabile con supporto a:

  * Connessione seriale tramite Web Serial API
  * Supporto offline tramite Service Worker
  * Generazione G-code da disegni e immagini raster

---

### Sicurezza e Privacy

* Questa app **non raccoglie dati personali**.
* Tutte le operazioni vengono eseguite **localmente nel browser**.
* La connessione seriale avviene **solo con il consenso esplicito dell'utente**, come richiesto dalla Web Serial API.

---

### Licenza

Questo progetto è distribuito sotto licenza [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) – vedi il file `LICENSE` per i dettagli.

---

### Autore

**Marco-F** – Sviluppatore principale
[GitHub](https://github.com/marco-f)

---

### Ringraziamenti

Un grande grazie alla community open-source, agli ingegneri dei browser e agli appassionati di CNC i cui strumenti, API e conoscenze condivise hanno reso possibile questo progetto.

---

### Lavori in corso

Questo progetto è ancora in evoluzione.
Pur essendo pienamente funzionante, alcune funzionalità possono cambiare o migliorare nel tempo.
La documentazione è attualmente disorganizzata e insufficiente, ma sono in corso aggiornamenti continui.

Grazie per la pazienza e il supporto!

---

### Crediti

Questo progetto utilizza alcune straordinarie librerie open-source:

* [**clipper.js**](https://github.com/junmer/clipper-lib) – Operazioni booleane su vettori
* [**opentype.js**](https://github.com/opentypejs/opentype.js) – Analisi e rendering font
* [**fabric.js**](http://fabricjs.com/) – Canvas library per disegno e interazione
* [**three.js**](https://threejs.org/) – Motore 3D per anteprime e operazioni su profondità
* [**Ace Editor**](https://ace.c9.io/) – Editor embedded con evidenziazione sintattica per G-code
* [**potrace.js**](https://github.com/kilobtye/potrace) – Tracciamento bitmap in vettoriale

---

### Documentazione

La documentazione è attualmente incompleta e in fase di riorganizzazione, ma viene aggiornata regolarmente.

Per istruzioni più dettagliate e note per sviluppatori, visita la [Wiki](https://github.com/marco-f/HobbyLASER/wiki/).

---
