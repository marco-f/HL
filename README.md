# HobbyLaser (PWA)

> [![UK Flag](https://flagcdn.com/w20/gb.png) English](README.md) | ![IT Flag](https://flagcdn.com/w20/it.png) Italiano


![Ottimizzato per Chrome Dark Mode](https://img.shields.io/badge/optimized%20for-Chrome%20Dark%20Mode-black?logo=googlechrome\&logoColor=white\&style=flat-square)
![PWA Ready](https://img.shields.io/badge/PWA-ready-green?logo=googlechrome\&logoColor=white\&style=flat-square)
![Supporto Offline](https://img.shields.io/badge/offline-support-blue?style=flat-square)
[![Demo Online](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square\&logo=github)](https://marco-f.github.io/HobbyLASER/)
![Versione](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)

---

Una **Progressive Web App (PWA)** per controllare **macchine CNC o laser** direttamente dal browser tramite **Web Serial API**. Permette di disegnare, elaborare immagini, generare G-code e comunicare con i controller – tutto da Google Chrome, con pieno supporto offline.

> ⚠ **Ottimizzato per Google Chrome in Modalità Scura**

---

<p align="center">
    <img src="IMG/anim.svg" alt="logo" style="width: 600px; height: auto;">
</p>

<h2 align="center">Disclaimer</h2>
<h3 align="center" color="red">**UNA CNC O UN LASER NON SONO GIOCATTOLI!** </h3>
<h4 align="center"> Usare una CNC o un laser senza la dovuta formazione e protezione può causare gravi lesioni e cecità. Non ci assumiamo alcuna responsabilità per danni derivanti dall’uso di questo software.</h4>
<h4 align="center"> 🔗 [Approfondisci sulla sicurezza laser](https://www.lasersafetyfacts.com/laserclasses.html) </h4>  
<h4 align="center"> **INDOSSA SEMPRE GLI OCCHIALI DI PROTEZIONE!** </h4>

---

### Demo Online

Provalo subito: [https://marco-f.github.io/HL/](https://marco-f.github.io/HL/)

---

### Screenshot

<p align="center">
  <img src="IMG/ss.png" alt="Screenshot 1" width="100%"/>
</p>

---

## Indice

* [Funzionalità](#funzionalità)
* [SVG, G-code e Immagini](#svg-g-code-e-immagini)
* [Web Serial API](#web-serial-api)
* [Come Eseguire in Locale](#come-eseguire-in-locale)
* [Contributi](#contributi)
* [Tecnologie Utilizzate](#tecnologie-utilizzate)
* [Changelog](#changelog)
* [Riconoscimenti](#riconoscimenti)
* [Documentazione](#documentazione)

---

### Funzionalità

* **Disegno Interattivo** – Crea design vettoriali direttamente nel browser. Supporta polilinee, primitive, operazioni booleane e trasformazioni.
* **Import/Export** – Supporto per file SVG e DXF.
* **Percorsi di Testo Avanzati** – Generazione di percorsi di testo con gestione corretta dei fori delle lettere e microgiunzioni.
* **Manipolazione Immagini** – Ridimensionamento, rotazione, traslazione, regolazione gamma, dithering, halftone, ritaglio e conversione in vettoriale.
* **Generazione G-code Personalizzabile** – Imposta potenza, velocità, passate, air assist e altri parametri.
* **Anteprima e Simulazione 3D** – Visualizzazione in tempo reale dei percorsi di taglio.
* **Gestione File e Cache** – Salvataggio dei file G-code in locale tramite IndexedDB.
* **Controllo GRBL** – Connessione, invio comandi, stop, pausa, resume, lettura stato, gestione errori e stima tempi.
* **Offline & PWA** – Funziona senza connessione e installabile come app nativa.
* **Modalità Scura** – Interfaccia ottimizzata per ambienti a bassa luminosità.

---

### SVG, G-code e Immagini

1. **SVG & Vettori**

   * Creazione e modifica di polilinee, rettangoli, cerchi e altre primitive.
   * Operazioni booleane (unione, differenza, intersezione).
   * Trasformazioni geometriche: scala, rotazione, traslazione, specchiatura.

2. **Testo**

   * Conversione del testo in percorsi vettoriali.
   * Gestione dei fori interni nelle lettere (es. “o”, “a”, “e”) e microgiunzioni.

3. **Immagini**

   * Trasformazioni: ridimensionamento, rotazione, traslazione.
   * Elaborazioni: dithering, halftone, ritaglio, conversione in vettoriale.

4. **G-code**

   * Parametri personalizzabili: potenza, velocità, passate, air assist.
   * Anteprima e simulazione in tempo reale.
   * Salvataggio file in cache locale (IndexedDB).

5. **Controllo GRBL**

   * Connessione e invio comandi via Web Serial API.
   * Stop, pausa, resume.
   * Monitoraggio stato macchina, gestione errori e stima tempi.

---

### Web Serial API

Questa app utilizza la **Web Serial API di Chrome** per comunicare con i controller CNC/laser via connessione seriale.

* Accesso alle porte seriali dal browser
* Configurazione baud rate, data bits, parity, stop bits
* Lettura/scrittura asincrona con Streams API
* Rilevamento eventi di connessione/disconnessione
* Richiede **permesso esplicito dell’utente**
* Funziona solo su **browser basati su Chromium**

---

## Come Eseguire in Locale

1. Clona il repository:

   ```bash
   git clone https://github.com/marco-f/HLgit
   ```
2. Vai nella cartella del progetto:

   ```bash
   cd HL
   ```
3. Avvia un server locale (es. con http-server):

   ```bash
   npm install -g http-server
   http-server
   ```
4. Apri il browser:

   ```
   http://localhost:8080
   ```
5. (Opzionale) Installa l’app come PWA dal prompt del browser.

---

## Tecnologie Utilizzate

* **HTML/CSS/JS** – Struttura, layout e logica
* **Service Workers** – Abilitano il funzionamento offline
* **Web Manifest** – Metadati per installazione PWA
* **Streams API** – Comunicazione seriale asincrona
* **SVG & Canvas API** – Disegno ed elaborazione immagini

---

## Contributi

1. Fai un fork del repository
2. Crea un nuovo branch: `git checkout -b feature-nome`
3. Fai commit delle modifiche: `git commit -am 'Aggiunta feature'`
4. Fai push del branch: `git push origin feature-nome`
5. Apri una Pull Request

Consulta la [Guida ai Contributi](CONTRIBUTING.md)

---

## Changelog

**v1.0.0**

* Prima release stabile con supporto a:

  * Connessione seriale via Web Serial API
  * Supporto offline tramite Service Workers
  * Generazione G-code da disegni e immagini raster

---

### Sicurezza e Privacy

* Nessun dato personale viene raccolto.
* Tutte le operazioni avvengono localmente nel browser.
* La connessione seriale richiede consenso esplicito dell’utente.

---

### Licenza

Questo progetto è rilasciato sotto licenza [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) – vedi file `LICENSE`.

---

### Autore

**Marco-F** – Sviluppatore principale
[GitHub](https://github.com/marco-f)

---

### Riconoscimenti

Grazie alla community open-source, agli ingegneri dei browser e agli appassionati di CNC.

---

### Crediti

* [clipper.js](https://github.com/junmer/clipper-lib) – Clipping e offset poligoni
* [opentype.js](https://github.com/opentypejs/opentype.js) – Parsing e rendering font
* [fabric.js](http://fabricjs.com/) – Libreria canvas
* [three.js](https://threejs.org/) – Motore di rendering 3D
* [Ace Editor](https://ace.c9.io/) – Editor di codice con evidenziazione sintassi
* [potrace.js](https://github.com/kilobtye/potrace) – Tracciamento bitmap

---

### Documentazione

Attualmente incompleta e in fase di riorganizzazione. Consulta la [Wiki](https://github.com/marco-f/HobbyLASER/wiki/).
