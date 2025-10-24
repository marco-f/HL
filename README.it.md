# HobbyLaser (PWA)

> [![UK Flag](https://flagcdn.com/w20/gb.png) English](README.md) | [![IT Flag](https://flagcdn.com/w20/it.png) Italiano](README.it.md)

![Ottimizzato per Chrome Dark Mode](https://img.shields.io/badge/ottimizzato%20per-Chrome%20Dark%20Mode-black?logo=googlechrome&logoColor=white&style=flat-square)
![PWA Ready](https://img.shields.io/badge/PWA-pronto-green?logo=googlechrome&logoColor=white&style=flat-square)
![Supporto Offline](https://img.shields.io/badge/offline-supporto-blue?style=flat-square)
[![Demo Online](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square&logo=github)](https://marco-f.github.io/HobbyLASER/)
![Versione](https://img.shields.io/badge/versione-1.0.0-informational?style=flat-square)

---

Una **Progressive Web App (PWA)** per controllare **macchine CNC o laser** direttamente dal browser tramite la **Web Serial API**.  
Permette di disegnare, elaborare immagini, generare G-code e comunicare con i controller — tutto direttamente in Google Chrome, con pieno supporto offline.

HobbyLASER è pensato per gli utenti di macchine CNC, incisori e plotter — in particolare modelli autocostruiti o a basso costo. È stato sviluppato per colmare il divario tra il software base fornito dai produttori di macchine economiche e le soluzioni professionali, con un focus sull’uso hobbistico e il prototipaggio rapido.

Semplice ma non banale, utilizza un sistema ibrido di strumenti e script per creare e trasformare disegni vettoriali, elaborare immagini e generare file pronti da inviare ai microcontrollori. HobbyLASER non richiede installazione: funziona interamente nel browser, senza dipendenze né driver, grazie alla Web Serial API per la comunicazione USB.

Il progetto è da considerarsi in costante sviluppo, ma grazie alla sua natura di **Progressive Web App (PWA)**, gli aggiornamenti sono disponibili immediatamente al rilascio.  
Attualmente è possibile importare file di testo con estensioni: `.svg`, `.dxf`, `.gcode`, `.nc`, e immagini raster in formato `.png`, `.jpg` o `.jpeg`.  
Il formato `.svg` è uno standard aperto, ma sono accettati solo disegni a percorso singolo che utilizzano comandi assoluti. Ad esempio, un file esportato da Inkscape verrà rifiutato se contiene percorsi multipli, gruppi o comandi relativi.

> ⚠ **Ottimizzato per Google Chrome in modalità scura**

---

<p align="center">
    <img src="IMG/anim.svg" alt="logo" style="width: 600px; height: auto;">
</p>

<h2 align="center">Disclaimer</h2>
<h3 align="center" color="red">**UNA CNC O UN LASER NON SONO GIOCATTOLI!**</h3>
<h4 align="center"> L’uso di una CNC o di un laser senza un’adeguata formazione e protezione può causare gravi lesioni e cecità. Non ci assumiamo alcuna responsabilità per danni derivanti dall’utilizzo di questo software.</h4>
<h4 align="center"> 🔗 [Leggi di più sulla sicurezza laser](https://www.lasersafetyfacts.com/laserclasses.html) </h4>  
<h4 align="center"> **INDOSSA SEMPRE GLI OCCHIALI DI PROTEZIONE!** </h4>

---

### Demo Online

Provala ora: [https://marco-f.github.io/HL/](https://marco-f.github.io/HL/)

---

### Screenshot

<p align="center">
  <img src="IMG/ss.png" alt="Screenshot 1" width="100%"/>
</p>

---

## Indice

* [Funzionalità](#funzionalità)
* [Manipolazione SVG, G-code e Immagini](#manipolazione-svg-g-code-e-immagini)
* [Web Serial API](#web-serial-api)
* [Come Eseguire in Locale](#come-eseguire-in-locale)
* [Contribuire](#contribuire)
* [Tecnologie Utilizzate](#tecnologie-utilizzate)
* [Changelog](#changelog)
* [Ringraziamenti](#ringraziamenti)
* [Documentazione](#documentazione)

---

### Funzionalità

* **Disegno Interattivo** – Crea disegni vettoriali direttamente nel browser. Supporta polilinee, primitive, operazioni booleane e trasformazioni geometriche.
* **Import/Export** – Supporto per file SVG e DXF.
* **Testo Avanzato** – Genera percorsi di testo con corretta gestione dei fori delle lettere e delle micro-giunzioni.
* **Elaborazione Immagini** – Ridimensiona, ruota, trasla, regola gamma, dithering, retinatura, ritaglio e conversione in vettoriale.
* **Generazione G-code Personalizzata** – Imposta potenza laser, velocità, passate, air assist e altro.
* **Anteprima 3D e Simulazione** – Visualizzazione in tempo reale dei percorsi di taglio.
* **Gestione File e Cache** – Salva file G-code localmente tramite IndexedDB.
* **Controllo GRBL** – Connessione, invio comandi, stop, pausa, ripresa, lettura stato, gestione errori e stima tempi.
* **Offline & PWA** – Funziona offline e può essere installata come un’app nativa.
* **Modalità Scura** – Ottimizzata per ambienti a bassa illuminazione.

---

### Manipolazione SVG, G-code e Immagini

1. **SVG & Vettori**
   * Crea e modifica polilinee, rettangoli, cerchi e altre primitive.
   * Operazioni booleane (unione, differenza, intersezione).
   * Trasformazioni geometriche: scala, rotazione, traslazione, specchiatura, offset.

2. **Testo**
   * Converte il testo in percorsi vettoriali.
   * Gestisce i fori interni delle lettere (es. “o”, “a”, “e”).

3. **Immagini**
   * Trasformazioni: ridimensiona, ruota, trasla.
   * Elaborazione: dithering, retinatura, ritaglio, conversione in vettoriale.

4. **G-code**
   * Parametri personalizzati: potenza, velocità, passate, air assist...
   * Creazione di micro-giunzioni e riempimenti a pattern.
   * Anteprima 3D e simulazione in tempo reale.
   * Salvataggio dei file nella cache locale (IndexedDB).

5. **Controllo GRBL**
   * Connessione e invio comandi tramite Web Serial API.
   * Funzioni di stop, pausa e ripresa.
   * Monitoraggio dello stato macchina, gestione errori e stima dei tempi.

---

### Web Serial API

Questa app utilizza la **Chrome Web Serial API** per comunicare con controller CNC/laser tramite connessione seriale.

* Accesso alle porte seriali dal browser  
* Configurazione di baud rate, data bits, parità, stop bits  
* Lettura/scrittura asincrona tramite Streams API  
* Rilevamento eventi di connessione/disconnessione  
* Richiede **autorizzazione dell’utente**  
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

5. (Opzionale) Installa l’app come PWA tramite il prompt del browser.

---

## Tecnologie Utilizzate

* **HTML/CSS/JS** – Struttura, layout e logica principali  
* **Service Workers** – Abilitano la funzionalità offline  
* **Web Manifest** – Metadati per l’installazione come PWA  
* **Streams API** – Comunicazione seriale asincrona  
* **SVG & Canvas APIs** – Disegno e rendering immagini

---

## Contribuire

1. Effettua un fork del repository  
2. Crea un nuovo branch: `git checkout -b nome-funzione`  
3. Effettua il commit delle modifiche: `git commit -am 'Aggiunta funzione'`  
4. Invia il branch: `git push origin nome-funzione`  
5. Apri una **Pull Request**

Consulta la guida completa: [Contributing Guide](CONTRIBUTING.md)

---

## Changelog

**v1.0.0**

* Prima release stabile con supporto per:
  * Connessione seriale tramite Web Serial API  
  * Supporto offline tramite Service Workers  
  * Generazione G-code da disegni e immagini raster

---

### Sicurezza e Privacy

* Nessun dato personale viene raccolto.  
* Tutte le operazioni vengono eseguite localmente nel browser.  
* La connessione seriale richiede il consenso esplicito dell’utente.

---

### Licenza

Questo progetto è rilasciato sotto licenza [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) – consulta il file `LICENSE` per i dettagli.

---

### Autore

**Marco-F** – Sviluppatore principale  
[GitHub](https://github.com/marco-f)

---

### Ringraziamenti

Grazie alla community open-source, agli sviluppatori dei browser e agli appassionati di CNC.

---

### Crediti

* [clipper.js](https://github.com/junmer/clipper-lib) – Clipping e offset di poligoni  
* [opentype.js](https://github.com/opentypejs/opentype.js) – Parsing e rendering dei font  
* [fabric.js](http://fabricjs.com/) – Libreria Canvas  
* [three.js](https://threejs.org/) – Motore di rendering 3D  
* [Ace Editor](https://ace.c9.io/) – Editor di codice integrato  
* [potrace.js](https://github.com/kilobtye/potrace) – Tracciamento bitmap

---

### Documentazione

Incompleta e in fase di riorganizzazione. [Wiki](https://github.com/marco-f/HobbyLASER/wiki/)
