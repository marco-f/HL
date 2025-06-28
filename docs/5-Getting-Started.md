## Keyboard Shortcuts

### General Shortcuts

| Shortcut             | Action                                       |
|----------------------|----------------------------------------------|
| `Ctrl + Delete`      | Clear the canvas and remove any loaded image |
| `Ctrl + I`           | Open the file input dialog for importing     |
| `Ctrl + +`           | Zoom in (decrease zoom level)                |
| `Ctrl + -`           | Zoom out (increase zoom level)               |
| `Ctrl + R`           | Reset zoom to 100%                           |
| `Ctrl + M`           | Reset the camera position (3D view)          |
| `Ctrl + G`           | Remove all interactive guides from canvas    |

> `Ctrl + I` triggers a hidden file input, allowing users to import external files into the editor. Supported formats include:
> - `.png`, `.jpg`, `.jpeg`: loaded as raster images via `IMAGE()` command
> - `.svg`: parsed into vector paths and injected as `POLYLINE(...)`
> - `.dxf`: converted to SVG-like paths and injected as `POLYLINE(...)`
> - `.gcode`, `.nc`: processed directly as GCode and streamed to the machine

---

### Drawing Tools

| Shortcut             | Tool/Action                                  |
|----------------------|----------------------------------------------|
| `Alt + A`            | Activate Polyline drawing mode               |
| `Alt + S`            | Insert a default polygon (20 segments)       |
| `Alt + D`            | Insert default text using 'roboto_b' font    |

---



````markdown
## Scripting Area

The scripting area is a collapsible panel on the right side of the workspace, powered by the Ace editor. It 
allows you to write JavaScript-like commands and small functions to generate or manipulate vector paths and 
images directly on the canvas fileciteturn1file12.

### Opening and Closing the Script Panel

- **Open/Close**:  
  - Click the **OpenTA** label in the status bar at the bottom (or call `TAOpen()` / `TAClose()` from your 
script).  
  - When closed, the panel is hidden off-screen (`transform: translateX(100%)`).  
  - When opened, it slides into view and automatically resizes its gutter and editor panes 
    fileciteturn1file12.

### Writing and Editing Code

- **Editor Theme & Mode**:  
  - Uses the “pastel_on_dark” theme and JavaScript mode.  
  - Wraps lines and disables automatic behaviors for precise control fileciteturn1file12.

- **Line Numbers & Gutter**:  
  - A read-only `<textarea id="n_Line">` beside the editor shows a symbol (`↩`) for each line, helping you
 track code length fileciteturn1file12.

- **Preloaded Example**:  
  - On first load, the editor is seeded with a `simpleGear` function. You can modify or extend it to create
 custom shapes fileciteturn1file16.

### Importing Files via Script

- **Raster Images** (`.png`, `.jpg`, `.jpeg`):  
  - Use the `IMAGE(file)` command in your script to load a raster image from the hidden file input.  
  - The file input is triggered by **Ctrl + I** or by calling `document.getElementById('input').click()` 
    fileciteturn1file17.

- **SVG Vectors** (`.svg`):  
  - Dropping an SVG file onto the canvas or selecting it via **Ctrl + I** parses and normalizes all <path>
 elements, then injects them as a `POLYLINE(PV['p_N'])` call in your code fileciteturn1file17.

- **DXF Vectors** (`.dxf`):  
  - Similarly converted to SVG-like paths and injected as `POLYLINE(...)` into the script buffer 
    fileciteturn1file17.

### Executing Your Script

- **Run Script**:  
  - Press **Ctrl + Enter** (or Command + Enter on Mac) to execute the entire editor content.  
  - This invokes `runSCRIPT()`, which:  
    1. Clears the canvas (`clearCNVS()`)  
    2. Closes the script panel (`TAClose()`)  
    3. Transforms your code via `edtContent()` (wrapping calls like `POLYLINE()` into `SVG()` invocations) 
       fileciteturn1file0  
    4. Evaluates the processed content, returning path or image objects you can then send to the machine 
       fileciteturn1file16.

- **Error Logging**:  
  - Any `console.log`, `console.error`, or `console.gcode` calls in your script appear in the bottom console
 panel, complete with timestamps and color-coded tags fileciteturn1file1.

---



## Drawing Tools

### POLYLINE

The `POLYLINE()` command lets you draw point-to-point or curved paths using mouse events or script shortcuts

- **Activate**:  
  - Press `Alt + A` to enter Polyline mode.  
  - Or call `POLYLINE()` in your script to start interactive drawing.

- **Mouse Controls**:  
  1. **First click**: creates the first vertex.  
  2. **Second click**: completes the first straight segment.  
  3. **Subsequent clicks**: each click adds another straight segment.  
  4. **Click-and-drag**: creates a Bézier curve segment from the last vertex.  
  5. **Right-click**: closes the path, automatically joining the last vertex back to the first.

- **Script Injection**:  
  - When you close the path (right-click), the editor buffer is updated with a line like  
    ```js
    POLYLINE(PV['p_<n>'])
    ```  
    where `<n>` is the new path index.

- **Rendering**:  
  - Press **Ctrl + Enter** (or ⌘+Enter on Mac) to run your script.  
  - This invokes `runSCRIPT()`, causing the new `POLYLINE(PV['p_<n>'])` to be evaluated and rendered on the 
canvas.

- **Undo/Redo While Drawing**:  
  | Shortcut    | Action                        |  
  |-------------|-------------------------------|  
  | `Ctrl + Z`  | Undo last vertex or curve     |  
  | `Ctrl + Y`  | Redo last undone vertex/curve |

- **Editing Shortcuts** (after closing the path):  
  | Key | Action                                                         |  
  |-----|----------------------------------------------------------------|  
  | `e` | **Leave** interactive mode and auto-insert `addPOLYLINE()`     |  
  | `c` | **Clear** current path (reset vertices and history)            |  
  | `u` | **Undo** last edit in path history                             |  
  | `r` | **Redo** last undone edit in path history                      |  
  | `a` | **AddPOINT**: duplicate the selected point                     |  
  | `d` | **DelPOINT**: delete the selected point with smart merge rules |  
  | `q` | **QuadToCubic**: convert a quadratic point to cubic (`C` type) |  

### POLYGON

The `POLYGON(sides, [centerX, centerY], radius)` helper creates regular polygons programmatically or via 
shortcut.

- **Activate**:  
  - Press `Alt + S` to insert a default 20-sided polygon of radius 50 at canvas center.  

- **Parameters**:  
  | Parameter    | Type     | Default       | Description                             |  
  |--------------|----------|---------------|-----------------------------------------|  
  | `sides`      | Integer  | `20`          | Number of edges                         |   
  | `centerX,Y`  | Number   | `0, 0`        | Coordinates of polygon center           |  
  | `radius`     | Number   | `50`          | Distance from center to each vertex     | 

- **Example**:  
  ```js
  // Create a 6-sided hexagon of radius 100
  POLYGON(6, 100, 50, 50, 30)
  ```

### TEXT

The `TEXT(fontName, fontSize, startX, startY, string)` tool converts text into vector outlines.

* **Activate**:

  * Press `Alt + D` to insert the word “Text” in the default `roboto_b` font at size 24, positioned at the 
canvas origin.

* **Parameters**:

  | Parameter  | Type      | Default      | Description           |
  | ---------- | --------- | ------------ | --------------------- |
  | `fontName` | String    | `'roboto_b'` | Name of loaded font   |
  | `fontSize` | Number    | `24`         | Font size in pixels   |
  | `x, y`     | Number    | `0,0`        | Placement coordinates |
  | `string`   | String    | `'Text'`     | The text to render    |

* **Example**:

  ```js
  // Render “Hello” at position (100, 200) with font size 48
  TEXT('roboto_b', 48, 30, 30, 'hello')

---

## Fonts

HobbyLaser includes the following built‑in fonts, which can be referenced by name in the `TEXT()` command:

* **roboto\_b** (Roboto Bold)
* **roboto\_r** (Roboto Regular)
* **open\_sans** (Open Sans)
* **courier\_new** (Courier New)
* **times\_new\_roman** (Times New Roman)

## Cutting Order for Text

When performing cut operations on text outlines, HobbyLaser automatically processes letter holes (interiors)
before cutting the outer contours. This ensures clean results and prevents small islands from falling out 
prematurely.

---

## Transformations & Boolean Operations

HobbyLaser provides powerful geometric transformations and boolean path operations that can be scripted in the 
editor and visualized with **Ctrl + Enter**.

  ```

* **Editing & Operations**:

    * After generating, text outlines behave like any other path: apply booleans, transformations, strokes, and fills.

    ```js
    var t = TEXT('roboto_b', 36, 25, 35, 'hi')
    var circ = POLYGON(32, 40, 40, 40)
    difference(circ, t)
    ```


### Transformations

| Function               | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `translate(dx, dy)`    | Moves a path by `dx` along X and `dy` along Y axes.                         |
| `rotate(angle)`        | Rotates `path` by `angle` radians around point `[cx, cy]` (default origin). |
| `scale(sx, sy)`        | Scales `path` by factors `sx`, `sy` relative to `[cx, cy]`.                 |
| `mirror(axis)`         | Mirrors `path` across `axis`: `'x'`, `'y'`, or `'xy'`.                      |
| `skew(axis,angle)`     | skew the 'path' with `'X'`, `'Y'` axis by the given angle.                  |
| `offset(dist)`         | Creates a parallel offset path at distance `dist`.                          |
| `tab(size, n)`         | Create `n` microjunctions with width `size`.                                |


### Boolean Path Operations

| Function                      | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| `union(pathA, pathB, ...)`    | Merges multiple paths into one continuous shape. |
| `intersection(pathA, pathB)`  | Extracts the overlapping region of paths.        |
| `difference(pathA, pathB)`    | Subtracts `pathB` from `pathA`.                  |
| `xor(pathA, pathB)`           | Creates the symmetric difference of paths.       |
| `cente(pathA, pathB, ...)`    | Center `pathA` relative to `pathB`.              |

### Example Script

```js
// Draw two overlapping circles, then subtract one from the other
let a = POLYGON(20, 30, 30, 20)
let b = POLYGON( 8, 50, 50, 20)
union(a,b)
```

Press **Ctrl + Enter** to execute the script and render the transformed and boolean-processed paths on the canvas.
````


````markdown
## Raster Image Processing

HobbyLaser enables advanced raster image manipulation directly in the scripting area. Use the `IMAGE()` command to import an image and chain built-in filters and transformations before rendering or vectorizing.

---

### Importing a Raster Image

Use the hidden file input (triggered by **Ctrl + I** or `document.getElementById('input').click()`) and then in your script:

```js
// Import a 200 (preserve aspect ratio) image at position (50, 50)
IMAGE(size=200, gamma=0, x=50, y=50, rot=0, flip='')
```


* **size**: Desired max dimension (width or height) in pixels.
* **gamma**: Contrast/brightness adjustment (default `1`).
* **x, y**: Top-left positioning coordinates.
* **rot**: Rotation angle in degrees.
* **flip**: `'x'` or `'y'` to mirror horizontally/vertically.

---

### Built-in Image Filters & Transformations

After importing, `img` supports these chainable methods within the script:

| Method                | Description                                | Example          |
| --------------------- | ------------------------------------------ | ---------------- |
| `img.vector(level)`   | Binarize image at level `0–255`.           | `img.vector(35)` |
| `img.dit(method)`     | Apply dithering (`'floyd atkinson'`).      | `img.dit()`      |
| `img.half(method)`    | Apply haltone mode.                        | `img.half()`     |
| `img.cutter(method)`  | Crop to draggable and resizable rectangle. | `img.crop()`     |

Chaining example:

```js
IMAGE(150,1,0,0,0,'')
i.grayscale().contrast(0.3).threshold(100).dither('atkinson');
```

---

## Vectorizing Raster Images

Convert a processed raster to vector paths for engraving or cutting:

```js
// Trace at 0.5 px threshold
let vec = TRACE(img, threshold=0.5);
STROKE(vec);
```

* `TRACE(img, threshold)`: Performs edge detection and path tracing.
* Returns a path array (`PV['p_<n>']`) that can be transformed or boolean-operated.

---

## Rendering to Canvas

After applying filters or vectorizing, press **Ctrl + Enter** (⌘+Enter) to execute the script. All operations are run in sequence, and the final image or paths are rendered on the canvas.

```js
// Full workflow:
IMAGE(200, 1, 0, 0, '').vector(40)
```

> Note: All scripts are written in JavaScript syntax (';' terminal). For a quicker learning curve, see the Examples section of the Cheat Sheet..
````

```
```
