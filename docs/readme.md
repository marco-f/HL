#  HobbyLaser (PWA)

![Optimized for Chrome Dark Mode](https://img.shields.io/badge/optimized%20for-Chrome%20Dark%20Mode-black?logo=googlechrome&logoColor=white&style=flat-square)
![PWA Ready](https://img.shields.io/badge/PWA-ready-green?logo=googlechrome&logoColor=white&style=flat-square)
![Offline Support](https://img.shields.io/badge/offline-support-blue?style=flat-square)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square&logo=github)](https://marco-f.github.io/HobbyLASER/)
![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)

---

A **Progressive Web App (PWA)** for controlling **CNC or laser machines** from the browser using the **Web Serial API**. It allows users to draw, process images, generate G-code, and communicate with controllers – directly in Google Chrome, with full offline support.

> ⚠ **Optimized for Google Chrome in Dark Mode**

---

<p align="center">
    <img src="IMG/anim.svg" alt="logo" style="width: 600px; height: auto;">
</p>

<h2 align="center">Disclaimer</h2>
<h3 align="center" color="red">**A CNC OR A LASER ARE NOT TOYS!** </h3> 
<h4 align="center"> Using a CNC or laser without proper training and protection can cause serious injury and blindness. We do not accept any liability for damages resulting from the use of this software.</h4> 
<h4 align="center"> 🔗 [Read more about laser safety](https://www.lasersafetyfacts.com/laserclasses.html) </h4>  
<h4 align="center"> **ALWAYS WEAR SAFETY GLASSES!** </h4> 

---

### Screenshots

<p align="center">
  <img src="IMG/SS_1.png" alt="Screenshot 1" width="100%"/>
</p>

<p align="center">
  <img src="IMG/SS_2.png" alt="Screenshot 2" width="100%"/>
</p>

<p align="center">
  <img src="IMG/SS_3.png" alt="Screenshot 3" width="100%"/>
</p>

---

## Table of Contents

- [Features](#features)  
- [Web Serial API](#web-serial-api)  
- [Live Demo](#live-demo)  
- [How to Run Locally](#how-to-run-locally)  
- [Technologies Used](#technologies-used)  
- [Changelog](#changelog)  
- [License](#license)  
- [Author](#author)  
- [Acknowledgments](#acknowledgments)  
- [Documentation](#documentation)  

---

###  Features

-️ **Interactive Drawing** – Create vector designs directly in the browser.
-️ **Raster Image Support** – Load and process PNG/JPG for engraving.
-️ **Custom Fonts** – Import your own fonts for creative control.
-  **Offline Support** – Works without internet via Service Workers.
-  **G-code Generation** – Convert designs into G-code and send it to a microcontroller.
-  **Save Progress Locally** – Work is automatically saved in the browser.
-  **Installable as PWA** – Install on desktop for a native-like experience.
-  **Dark Mode Ready** – Optimized for low-light environments.

---

### Supported Hardware

This application is designed to work with hobby-grade laser cutters and CNC machines that use a **GRBL-compatible controller**.

### Firmware Compatibility
-  **GRBL v1.1f or later** (recommended)
-  GRBL-based boards (Arduino Uno + CNC Shield, Woodpecker, EleksMaker, etc.)

> ℹ GRBL is an open-source firmware that runs on Arduino-based controllers and interprets G-code for motion control. Learn more: [GRBL GitHub](https://github.com/gnea/grbl)

### Communication
- Communicates over USB via the **Web Serial API**
- Requires **Google Chrome** or other Chromium-based browsers with Web Serial support
- No additional drivers or software needed

### Not Supported (Yet)
-  Marlin firmware (used on many 3D printers)
-  Smoothieboard, Duet, or other non-GRBL controllers
-  Proprietary laser systems (e.g., Glowforge, xTool, etc.)

---

> **Note:** Always ensure that your firmware is configured to accept commands from the browser using a standard USB connection. Baud rate defaults to **115200** unless otherwise specified.

---

###  Web Serial API

This app uses the **Chrome Web Serial API** to communicate with CNC/laser controllers via serial connection.

###  Highlights:
- Access to serial ports from the browser
- Configure baud rate, data bits, parity, stop bits
- Asynchronous read/write via Streams API
- Detects connect/disconnect events
- Requires **user permission** for security
- Works in **Chromium-based browsers only**

---

###  Live Demo

Try it now: [https://marco-f.github.io/HobbyLASER/](https://marco-f.github.io/HobbyLASER/)

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/marco-f/PWA-HobbyLASER.git
   ```
2. Navigate to the project folder:
   ```bash
   cd PWA-HobbyLASER
   ```
3. Run a local web server (e.g., with http-server):
   ```bash
   npm install -g http-server
   http-server
   ```
4. Open your browser:
   ```
   http://localhost:8080
   ```
5. (Optional) Install the app as a PWA via the browser install prompt.

---

## Technologies Used

- **HTML/CSS/JS** – Core structure, layout, and logic
- **Service Workers** – Enable offline functionality
- **Web Manifest** – Metadata for PWA installation
- **Streams API** – For async serial communication
- **SVG & Canvas APIs** – Drawing and image rendering

---

### Changelog

**v1.0.0**

- First stable release with support for:
  - Serial connection via Web Serial API  
  - Offline support with Service Workers  
  - G-code generation from drawings and raster images

---

### Security and Privacy

- This app does **not collect any personal data**.  
- All operations are performed **locally in your browser**.  
- Serial connection is initiated **only with explicit user consent**, as required by the Web Serial API.

---

### Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create your branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to your fork: `git push origin feature-name`
5. Open a Pull Request

Please follow the project's coding style and document your code if needed.

---

### License

This project is licensed under the [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) – see the `LICENSE` file for details.

---

###  Author

**Marco-F** – Lead Developer  
[GitHub](https://github.com/marco-f)

---

###  Acknowledgments

Huge thanks to the open-source community, browser engineers, and CNC enthusiasts whose tools, APIs, and shared knowledge made this project possible.

---

### Credits

This project makes use of several outstanding open-source libraries:

- [**clipper.js**](https://github.com/junmer/clipper-lib) – Polygon clipping and offsetting, used for vector boolean operations  
- [**opentype.js**](https://github.com/opentypejs/opentype.js) – Font parsing and rendering, used for custom text-to-path conversion  
- [**fabric.js**](http://fabricjs.com/) – Powerful canvas library for drawing, manipulation, and interaction  
- [**three.js**](https://threejs.org/) – 3D rendering engine, used for optional previews and depth-based operations  
- [**Ace Editor**](https://ace.c9.io/) – Embedded code editor with syntax highlighting, used for G-code editing and inspection  
- [**potrace.js**](https://github.com/kilobtye/potrace) – Bitmap tracing library, used to convert raster images to scalable vector paths  

---


###  Documentation

More detailed usage instructions and developer notes can be found in the [Wiki](https://github.com/marco-f/HobbyLASER/wiki/).

---

###  Legal Notice

This software is provided **"as is"**, without warranty of any kind. Use it **at your own risk**.

By using this software, you agree to:

- Operate machinery **safely** and in accordance with **local laws**
- Ensure proper **ventilation**, **shielding**, and **emergency stops**
- Use it **only if trained** in handling CNC/laser equipment

Improper use may result in **fire**, **injury**, or **property damage**.

---


