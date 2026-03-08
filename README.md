
# HobbyLaser (PWA)

A **Progressive Web App (PWA)** for controlling **CNC or laser machines** from the browser using the **Web Serial API**.

It allows users to draw, process images, generate G-code, and communicate with controllers – directly in Google Chrome, with full offline support.

HobbyLASER is aimed at users of CNC machines, engravers, and plotters—particularly self-built or budget models. It was developed to fill the gap between the basic software offered by low-cost machine manufacturers and professional software solutions, with a focus on hobby use and rapid prototyping.

Simple but not trivial, it uses a hybrid system of tools and scripts to create and transform vector drawings, process images, and generate files ready to be sent to microcontrollers. HobbyLASER requires no installation, as it runs entirely in the browser—no dependencies, no drivers—using the Web Serial API for USB communication.

---

## Features

* **Interactive Drawing** – Create vector designs directly in the browser. Supports polyline, primitives, boolean and transformation operations.
* **Import** – Support for SVG and DXF files.
* **Advanced Text Paths** – Generate text paths with proper handling of letter holes and micro-junctions.
* **Image Manipulation** – Resize, rotate, translate, adjust gamma, dithering, halftone, crop, and convert to vector.
* **Customizable G-code Generation** – Set laser power, speed, passes, air assist, and more.
* **3D Preview & Simulation** – Real-time visualization of cutting paths.

* **Precision Dimensioning Tool** – Accurate measurement and annotation system for verifying real-world dimensions before machining.
* **Material Nesting Tool** – Automatic layout optimization to minimize material waste and improve cutting efficiency.
* **Ace Editor Smart Tooltips** – Contextual tooltips that provide quick access to drawing, transformation, editing and G‑code conversion tools.

* **File & Cache Management** – Save G-code files locally with IndexedDB.
* **GRBL Control** – Connect, send commands, stop, pause, resume, read status, handle errors, and estimate job time.
* **Offline & PWA** – Work offline and install the app like a native app.
* **Dark Mode Ready** – Optimized for low-light environments.

---

## Additional Tools

### Dimensioning

* Accurate measurement and dimension annotation
* Real‑time dimension updates during editing
* Millimeter precision for fabrication workflows

### Nesting

* Automatic arrangement of parts to minimize material waste
* Rotation and positioning optimization
* Ideal for batch cutting and sheet material usage

---

## Technologies Used

* **HTML/CSS/JS**
* **Service Workers**
* **Web Serial API**
* **SVG & Canvas APIs**
* **Ace Editor** – Embedded code editor with contextual tooltips
