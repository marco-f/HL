# Installation Guide

This guide shows two ways to use **PWA HobbyLaser**:

1. **Using the Live Demo**
2. **Running Locally** with a Node.js or Python server

---

## 1. Using the Live Demo

Try the app instantly without installing anything:

* Open: [PWA HobbyLaser Live Demo](https://marco-f.github.io/HobbyLASER/)
* Use **Google Chrome** or another Chromium-based browser.
* **Note:** PWA installation is **not available** on the demo.

>️ Communication with laser/CNC via Web Serial API only works in Chromiun-based browsers.

---

## 2. Running Locally

Clone the repository and serve the files from your machine using Node.js or Python.

### 2.1 Clone the repository

```bash
git clone https://github.com/marco-f/HobbyLASER.git
cd HobbyLASER
```

### 2.2 Start with Node.js

1. If you don’t have a static server, install `http-server` globally:

   ```bash
   npm install -g http-server
   ```
2. From the project folder, launch the server on port 8000:

   ```bash
   http-server -p 8000
   ```
3. Open your browser at:

   ```
   http://localhost:8000
   ```

### 2.3 Start with Python

If you have Python 3 installed, use the built-in module:

```bash
python3 -m http.server 8000
```

Then open:

```bash
http://localhost:8000
```

> You can change the port (e.g., `3000`) by modifying the `-p <port>` flag or the port number in the Python command.

---

## 3. Installing as a PWA

After serving the app locally (`http://localhost:<port>`):

1. Open the app in Chrome or Edge.
2. Click the **Install** icon in the address bar (desktop).
3. The app will be installed as a standalone PWA, with full offline support.

### Offline Capabilities

* On first load, Service Workers cache the necessary assets.
* The app works offline afterward, loading saved assets and data.
* Drawings and settings are stored locally in `localStorage`.

---

## 4. Connecting to Laser/CNC

To use the Web Serial API:

1. Connect your CNC/laser device via USB.
2. Click **Connect** in the app interface.
3. Select the available serial port.
4. Send G-code commands directly from the browser.

> Always use proper safety equipment (e.g., goggles) and trained environments when operating CNC or lasers.

---

For issues or questions, open an issue on GitHub:

[https://github.com/marco-f/PWA-HobbyLASER/issues](https://github.com/marco-f/HobbyLASER/issues)
