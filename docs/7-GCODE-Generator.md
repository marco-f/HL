````markdown
# G-code Generation & Sending

After creating or importing vector paths or raster images, HobbyLaser allows you to convert any drawable object into G-code directly from the scripting area.

---

## Converting Objects to G-code

1. **Chain the `.gcode()` method** to any path or vector object in your script:
   ```js
   let p = POLYGON(64, 100);
   p.gcode();
````

2. **Execute** the script with **Ctrl + Enter** (⌘+Enter on Mac).
3. **Parameters Dialog** appears:

   * Set laser power (0–100%), speed (mm/min), number of passes, and other options.
   * Preview parameters before generating.

---

## Parameters Window

* **Laser Settings**:

  * **Power (%)**: Laser intensity.
  * **Feed Rate**: Movement speed in mm/min.
  * **Passes**: Number of engraving/cutting passes.
  * **Z Offset**: Adjust focus height.
* **Confirm/Cancel**:

  * **Generate**: Creates the G-code and closes the dialog.
  * **Cancel**: Discards and returns to the script editor.

---

## Sending & Simulation Panels

After generation, two panels slide into view:

### Connection Panel

* **Port Selection**: Choose the COM/serial port for your GRBL controller.
* **Baud Rate**: Defaults to 115200 but can be changed.
* **Buttons**:

  * **Connect**: Opens the serial connection via Web Serial API.
  * **Send**: Streams the generated G-code to the machine.
  * **Disconnect**: Closes the port.

### Simulator Panel

* **Preview**: Animates the toolpath on a 2D canvas.
* **Controls**:

  * **Play/Pause**: Start or pause simulation.
  * **Speed Slider**: Adjust simulation playback speed.
  * **Zoom & Pan**: Inspect specific areas of the toolpath.

---


```
```
