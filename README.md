# HobbyLaser (PWA)

> [![UK Flag](https://flagcdn.com/w20/gb.png) English](README.md) | [![IT Flag](https://flagcdn.com/w20/it.png) Italiano](README.it.md)

![Optimized for Chrome Dark Mode](https://img.shields.io/badge/optimized%20for-Chrome%20Dark%20Mode-black?logo=googlechrome&logoColor=white&style=flat-square)
![PWA Ready](https://img.shields.io/badge/PWA-ready-green?logo=googlechrome&logoColor=white&style=flat-square)
![Offline Support](https://img.shields.io/badge/offline-support-blue?style=flat-square)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square&logo=github)](https://marco-f.github.io/HobbyLASER/)
![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)

---

A **Progressive Web App (PWA)** for controlling **CNC or laser machines** directly from the browser using the **Web Serial API**.

It allows users to draw, process images, generate G‑code, and communicate with controllers — directly inside Google Chrome, with full offline support.

HobbyLASER is aimed at users of CNC machines, engravers, and plotters — particularly self‑built or low‑cost models. It was created to bridge the gap between the very basic software often provided by low‑cost machines and professional CAD/CAM solutions, focusing on **hobby use, experimentation, and rapid prototyping**.

Simple but not trivial, it combines graphical tools and scriptable functions to create and transform vector drawings, process raster images, and generate files ready to be sent to microcontrollers.

HobbyLASER requires **no installation**: it runs entirely in the browser — no dependencies, no drivers — using the **Web Serial API** for USB communication.

Thanks to its nature as a **Progressive Web App (PWA)**, updates become available immediately after release.

Currently supported imports:

- `.svg`
- `.dxf`
- `.gcode`
- `.nc`
- raster images `.png`, `.jpg`, `.jpeg`

The `.svg` format is an open standard, but **only absolute commands are supported**.  
When importing from **Inkscape**, make sure to:

- Convert objects to **paths**
- Use **absolute commands**
- Set the document scale to **millimeters**
- Adjust the document size correctly

> ⚠ **Optimized for Google Chrome in Dark Mode**

---

<p align="center">
    <img src="IMG/anim.svg" alt="logo" style="width: 600px; height: auto;">
</p>

---

# Disclaimer

## **A CNC OR A LASER ARE NOT TOYS!**

Using a CNC or laser without proper training and protection can cause **serious injury, fire hazards, or blindness**.

The author accepts **no liability** for damages or injuries resulting from the use of this software.

🔗 https://www.lasersafetyfacts.com/laserclasses.html  

**ALWAYS WEAR PROPER LASER SAFETY GLASSES.**

---

# Live Demo

Try it online:

https://marco-f.github.io/HL/

---

# Screenshots

<p align="center">
  <img src="IMG/ss.png" alt="Screenshot 1" width="100%"/>
</p>

---

# Table of Contents

- Features
- SVG, G‑code & Image Manipulation
- Web Serial API
- How to Run Locally
- Project Download
- Contributing
- Technologies Used
- Changelog
- Acknowledgments
- Documentation

---

# Features

### Interactive Drawing
Create vector drawings directly in the browser.

Supported tools include:

- polylines
- rectangles
- circles
- primitives
- boolean operations
- geometric transformations

### Import

Import vector and machine files:

- SVG
- DXF
- G‑code
- NC

### Advanced Text Paths

Generate vector text paths with:

- correct internal letter holes
- micro‑junctions for laser cutting

### Image Manipulation

Raster images can be:

- resized
- rotated
- translated
- cropped
- gamma corrected
- processed with dithering
- processed with halftone algorithms
- converted into vector paths

### Customizable G‑code Generation

Adjust machining parameters such as:

- laser power
- speed
- number of passes
- air assist
- micro‑joints
- fill patterns

### 3D Preview & Simulation

Real‑time visualization of cutting or engraving paths using a 3D simulation environment.

### GRBL Control

Direct machine control via Web Serial:

- connect to controller
- send commands
- pause
- resume
- stop jobs
- read machine status
- handle errors
- estimate job time

### Local Storage

Projects and generated G‑code files can be saved locally using **IndexedDB**.

### Offline & PWA

The application works **fully offline** and can be installed like a native desktop app.

### Dark Mode Optimized

Interface designed for comfortable work in low‑light workshop environments.

---

# Additional Tools

## Dimensioning Tool

HobbyLASER includes a **dimensioning tool** that allows users to measure and annotate geometry directly inside the workspace.

Supported features include:

- linear dimensions
- radial dimensions
- angular measurements
- dynamic updates when geometry changes

This allows the application to function not only as a CAM generator but also as a lightweight technical drawing environment.

---

## Advanced Tooltip System for Ace Editor

A **context‑aware tooltip system** is integrated into the **Ace Editor** to provide quick access to primary drawing and editing functions.

The tooltip system offers:

- contextual hints for commands
- quick shortcuts for drawing tools
- inline help for geometry manipulation
- script snippets for automation

This greatly improves workflow speed when using the scripting environment.

---

## Project Download

- SVG files
- imported images
- generated G‑code
- configuration settings

This allows:

- easy backups
- project sharing
- transferring work between machines

---

# SVG, G‑code & Image Manipulation

## SVG & Vector Tools

- create and edit polylines and primitives
- boolean operations (union, difference, intersection)
- geometric transformations:
  - scale
  - rotate
  - translate
  - mirror
  - offset

## Text

- convert text into vector paths
- manage internal holes and laser micro‑junctions

## Images

Image processing includes:

- resizing
- rotation
- translation
- dithering
- halftone
- cropping
- bitmap‑to‑vector conversion

## G‑code

Features include:

- customizable machining parameters
- micro‑joint creation
- fill patterns
- real‑time preview
- time estimation
- export to `.gcode` or `.nc` files

---

# Web Serial API

This application communicates with CNC/laser controllers using the **Chrome Web Serial API**.

Capabilities include:

- access to serial ports directly from the browser
- configuration of baud rate, parity, stop bits, and data bits
- asynchronous read/write via Streams API
- automatic detection of device connect/disconnect
- explicit user permission required

⚠ Works only in **Chromium‑based browsers**.

---

# How to Run Locally

Clone the repository:

```bash
git clone https://github.com/marco-f/HL
```

Enter the project directory:

```bash
cd HL
```

Run a local web server:

```bash
npm install -g http-server
http-server
```

Open in your browser:

```
http://localhost:8080
```

(Optional) Install the application as a **PWA** using the browser install prompt.

---

# Technologies Used

- HTML / CSS / JavaScript
- Service Workers
- Web Manifest
- Streams API
- SVG & Canvas APIs

External libraries:

- clipper.js — polygon clipping and offsets
- opentype.js — font parsing
- fabric.js — canvas manipulation
- three.js — 3D rendering
- Ace Editor — embedded editor
- potrace.js — bitmap tracing

---

# Changelog

## v1.0.0

First stable release including:

- Web Serial communication
- offline support
- drawing tools
- G‑code generation
- raster image processing

Future versions will expand features and improve the documentation.

---

# Security and Privacy

- No personal data is collected
- All operations run locally in the browser
- Serial communication requires explicit user permission

---

# License

This project is released under the **GNU GPL v3.0** license.

See the `LICENSE` file for details.

---

# Author

**Marco‑F**  
Lead Developer

https://github.com/marco-f

---

# Acknowledgments

Thanks to:

- the open source community
- browser engineers
- CNC enthusiasts and makers

---

# Documentation

Documentation is currently being reorganized.

Wiki:
https://github.com/marco-f/HobbyLASER/wiki
