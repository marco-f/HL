## File Importing via Drag & Drop

The editor supports drag-and-drop file importing directly into the canvas. Users can drop supported files anywhere over the drawing area to trigger contextual actions.

### Supported File Types and Behaviors

| File Type            | Behavior                                                                       |
|----------------------|--------------------------------------------------------------------------------|
| `.png`, `.jpg`, `.jpeg` | Loaded as raster image, inserted via `IMAGE(...)`                           |
| `.svg`               | Parsed to extract `path` data and injected as `POLYLINE(...)`                  |
| `.dxf`               | Converted into path format via internal helper and injected as `POLYLINE(...)` |
| `.gcode`, `.nc`      | GCode parsed and streamed to the backend processor                             |

> Notes:
> - Drag-over adds a visual highlight on the canvas.
> - All imported content is inserted at a default size and position unless modified in the editor.
> - Raster images are automatically assigned `IMAGE(size=100, gamma=0, x=10, y=10, flip='')` and are ready for `.gcode()` export.
> - SVG paths are normalized and merged prior to injection to ensure clean conversion.



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

### Polyline Tool Shortcuts

These shortcuts are active **only while Polyline mode is active**:

| Shortcut             | Action                                        |
|----------------------|-----------------------------------------------|
| `Shift + Escape`     | Exit Polyline mode                            |
| `Shift + Delete`     | Clear the current polyline path               |
| `Shift + U`          | Undo the last point or action                 |
| `Shift + R`          | Redo the last undone action                   |
| `Shift + A`          | Add a copy of the selected point              |
| `Shift + D`          | Delete the currently selected point           |
| `Shift + Q`          | Convert selected quadratic point to cubic     |

> Tip: Redo/Undo operations are managed by an internal history stack specific to Polyline editing.

---

## File Importing via Drag & Drop

The editor supports drag-and-drop file importing directly into the canvas. Users can drop supported files anywhere over the drawing area to trigger contextual actions.

### Supported File Types and Behaviors

| File Type            | Behavior                                                                       |
|----------------------|--------------------------------------------------------------------------------|
| `.png`, `.jpg`, `.jpeg` | Loaded as raster image, inserted via `IMAGE(...)`                           |
| `.svg`               | Parsed to extract `path` data and injected as `POLYLINE(...)`                  |
| `.dxf`               | Converted into path format via internal helper and injected as `POLYLINE(...)` |
| `.gcode`, `.nc`      | GCode parsed and streamed to the backend processor                             |

> Notes:
> - Drag-over adds a visual highlight on the canvas.
> - All imported content is inserted at a default size and position unless modified in the editor.
> - Raster images are automatically assigned `IMAGE(size=100, gamma=0, x=10, y=10, flip='')` and are ready for `.gcode()` export.
> - SVG paths are normalized and merged prior to injection to ensure clean conversion.



## Working with Raster Images

Raster image support in HobbyLaser enables the import, configuration, and GCode generation of bitmap formats such as `.png`, `.jpg`, and `.jpeg`.

### Default Image Insertion

When an image is imported (via `Ctrl + I` or drag & drop), the following default command is injected into the editor:

```js
IMAGE(size=100, gamma=0, x=10, y=10, flip='')
```

#### Default Parameters

| Parameter | Description                                           | Default Value |
|-----------|-------------------------------------------------------|---------------|
| `size`    | Image height in millimeters (preserves aspect ratio)  | `100`         |
| `gamma`   | Gamma correction factor for brightness control        | `0`           |
| `x`, `y`  | Image position on the canvas (top-left corner)        | `10, 10`      |
| `flip`    | Axis flip, can be `'x'`, `'y'`, `'xy'`, or empty      | `''` (none)   |

---

### Extended Image Options

You can manually modify the inserted `IMAGE(...)` command in the editor to configure advanced settings:

## `IMAGE(...)` – Raster Image Options

The `IMAGE(...)` command allows you to import and configure raster images (formats `.png`, `.jpg`, `.jpeg`) within the canvas workspace. Imported images can be used for further graphic processing or vectorization.

---

### Available Parameters

| Parameter    | Type     | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| `size`       | `Number` | Height of the image in millimeters (width is calculated automatically to maintain the original aspect ratio) |
| `x`, `y`     | `Number` | Position of the top-left corner on the canvas, in millimeters               |
| `flip`       | `String` | Axis flipping: `'x'` (horizontal), `'y'` (vertical), `'xy'`, or empty `''` for none |
| `gamma`      | `Number` | Gamma correction (positive = brighter image, negative = darker)             |
| `rot`        | `Number` | Rotation in degrees (clockwise)                                             |

#### Basic Example

```js
IMAGE(size=100, gamma=0, x=10, y=10, rot=0, flip='')
```

---

###️ Raster Tools

Once an image is loaded with `IMAGE(...)`, you can access various tools via `imageController` to modify or vectorize it:

| Method                | Action                                                                       |
|-----------------------|------------------------------------------------------------------------------|
| `.dit()`              | Applies the specified dithering (useful for halftone effects)               |
| `.half()`             | Applies a **halftone** grid (pattern of variable-sized dots)                |
| `.vector(threshold)`  | Vectorizes the image (black/white) using **Potrace.js** with a `threshold` from 0 to 255 |
| `.cutter()`           | Activates an **interactive cropping** tool on the canvas                    |
| `rstIMG()`            | Restores the original image (undoes any edits)                              |

---

### Notes on `.vector(threshold)`

The `.vector()` function generates a vector path from a bitmap:

- The `threshold` sets the separation point between black and white.
- The resulting SVG paths are inserted into the canvas as `fabric.Path` objects.
- Position and scale match those of the original raster image.

#### Example:

```js
IMAGE(size=100, x=0, y=0).vector(128)
```

---

### Full Workflow Example

```js
IMAGE(size=60, gamma=0.3, x=5, y=5).dit().vector(40)
```

1. Imports image with gamma correction and dithering.
2. Applies Floyd–Steinberg dithering.
3. Vectorizes using threshold 40.

---

### Tips

- Use `.half()` to create decorative patterns with high-contrast images.
- For further operations (e.g., geometric transformations or path editing), convert the image to vectors using `.vector()`.


## Working with Vector Path

- **HobbyLASER natively generates and manipulates SVG vector paths**, making it ideal for precise design workflows.
- It supports the import of:
  - **`.svg` files** (only absolute `path` commands are parsed) and injected as `POLYLINE(...)` entries.
  - **`.dxf` files**, which are converted to SVG-like paths and injected as `POLYLINE(...)` entries.

###️ Interactive Tool: POLYLINE

The **POLYLINE** tool allows users to **draw and edit** an SVG path directly on the canvas. It is designed for creating freeform or geometric shapes composed of straight segments or curves, using both mouse and keyboard input.

### Activation

- **Shortcut:** `Alt + A`
- When activated:
  - Displays a help overlay with usage instructions.
  - Enables drawing mode on the canvas surface.
  - Optionally applies grid snapping (based on the `GRID` value).
  - Initializes the canvas state for path editing.

---

### Mouse Events (while POLYLINE mode is active)

| Event         | Associated Function     | Description                                                                 |
|---------------|--------------------------|-----------------------------------------------------------------------------|
| `mousemove`   | `handleMouseMove`        | Tracks the cursor in real-time, used for segment preview                    |
| `mousedown`   | `handleMouseDown`        | Adds a new point (left-click) or closes the path (right-click)             |
| `mouseup`     | `handleMouseUp`          | Finalizes the addition of a point or curve                                 |
| `keydown`     | `handleKeyDown`          | Handles point editing via keyboard (e.g., `Shift + U`, `Shift + R`)        |
| `keydown`     | `handleCancel`           | Exits the tool with `Escape`, removing all active event listeners          |

---

### Additional Notes

- All editing occurs in real-time, and the constructed path is stored in a `PV` object for future use.
- The finalized result is injected into the editor as a `POLYLINE(...)` command.
- Use **`Ctrl + Enter`** to render and preview the path directly on the canvas.


## Interactive Tool: POLYGON

The **POLYGON** tool enables users to **generate regular polygons** directly on the canvas by specifying the number of segments, center coordinates, and radius. It automatically creates a closed SVG `path` representing the shape.

### Activation

- **Shortcut:** `Alt + S`
- When activated:
  - Displays an overlay with configuration instructions.
  - Injects the following default command into the editor:
    ```js
    POLYGON(seg=20, centerX=10, centerY=10, r=5)
    ```
    - `seg=20` → number of sides  
    - `centerX=10`, `centerY=10` → position of the polygon center (in mm)  
    - `r=5` → radius of the polygon (in mm)
  - Zoom is reset and the editor is focused for further editing.

---

### How It Works

- The tool calculates equally spaced vertices around a circle using trigonometry.
- A closed SVG path is constructed starting from the first vertex, using `M` and `L` commands, and finalized with `Z`.
- The path is:
  1. Parsed into point data (`svgPathToPoints`)
  2. Converted to internal geometry using `svgPathToClipperPaths`
  3. Rendered via the `use(...)` function for visualization and export

---

### Additional Notes

- Input values are validated to ensure numeric input for `centerX`, `centerY`, and `r`.
- The polygon is treated as a vector object and can be processed like any `POLYGON(...)`.
- Use **`Ctrl + Enter`** to visualize the polygon directly on the canvas.



## Interactive Tool: TEXT

The **TEXT** tool enables the creation of vector-based text using preloaded fonts. Text is rendered as **SVG paths**, allowing precise control for laser operations or vector export.

### Activation

- **Shortcut:** `Alt + T`
- When activated:
  - Injects the following default command into the editor:
    ```js
    TEXT('digit', 30, 30, 30, 'Marco')
    ```
    - `'digit'` → font name  
    - `30` → font size (mm)  
    - `30, 30` → start X/Y coordinates (mm)  
    - `'Marco'` → text string
  - Zoom is reset and the editor is focused.
  - Instructional overlay is displayed for configuration help.

---

### How It Works

- **Fonts:**  
  Fonts are preloaded at runtime from a variety of `.ttf` files (e.g. Arial, Times, Roboto, CNC fonts, etc.), accessible via keyword (e.g. `'digit'`, `'gilroy'`, `'wildwest'`, `'ruler'`, `'cnc_1'`, etc.).

- **Rendering Modes:**
  - **Normal Mode**:  
    Text is rendered in a straight line based on start coordinates.
  - **Path Mode**:  
    Call `.onPATH(pathSTR)` on the result to render text following a custom SVG path.

- **Path Processing:**  
  The text is converted to an SVG path using [Opentype.js](https://opentype.js.org/), transformed with kerning, bounding box, and matrix rotation logic.  
  Paths are then converted into internal geometry for further use.

---

### Additional Notes

- Fonts are preloaded only once at initialization.
- Only valid font names can be used (errors are logged otherwise).
- Glyph transformation includes matrix-based rotation when mapping to curves.
- Output is always in **absolute SVG path format**.
- The result is compatible with `.onPATH(...)` for advanced layout.
- **HobbyLASER** natively supports vector SVG path creation and manipulation, and allows importing SVG files (absolute path only) and `DXF` files.
- Use **`Ctrl + Enter`** to render the text on the canvas.



# EXAMPLE:️ Involute Gear, Star, and Path Modules

## Support Functions

```javascript
const pi = Math.PI

function degrees_to_radians(theta) {
    return theta / 180 * pi
}

function polar(r, theta) {
    return [r * Math.sin(theta), r * Math.cos(theta)]
}

function iang(r1, r2) {
    return Math.sqrt((r2 / r1) ** 2 - 1) - Math.acos(r1 / r2)
}

function rotate(points_array, angle) {
    const result = []
    for (let i = 0; i < points_array.length; i++) {
        const [x, y] = points_array[i];
        const xr = x * Math.cos(angle) - y * Math.sin(angle)
        const yr = y * Math.cos(angle) + x * Math.sin(angle)
        result.push([xr, yr])
    }
    return result
}
```

---

## Involute Gear Generation

```javascript
function involuteGear(numberOfTeeth, mmPerTooth, clearance, backlash, pressureAngle) {
    const paths = [[]]
    const centerX = 50
    const centerY = 60

    const p = mmPerTooth * numberOfTeeth / pi / 2
    const c = p + mmPerTooth / pi - clearance
    const b = p * Math.cos(pressureAngle)
    const r = p - (c - p) - clearance
    const t = mmPerTooth / 2 - backlash / 2
    const k = -iang(b, p) - t / 2 / p

    const points = [
        polar(r, -pi / numberOfTeeth),
        polar(r, r < b ? k : -pi / numberOfTeeth),
        q7(0/5, r, b, c, k,  1), q7(1/5, r, b, c, k,  1),
        q7(2/5, r, b, c, k,  1), q7(3/5, r, b, c, k,  1),
        q7(4/5, r, b, c, k,  1), q7(5/5, r, b, c, k,  1),
        q7(5/5, r, b, c, k, -1), q7(4/5, r, b, c, k, -1),
        q7(3/5, r, b, c, k, -1), q7(2/5, r, b, c, k, -1),
        q7(1/5, r, b, c, k, -1), q7(0/5, r, b, c, k, -1),
        polar(r, r < b ? -k : pi / numberOfTeeth),
        polar(r, pi / numberOfTeeth)
    ]

    for (let i = 0; i < numberOfTeeth; i++) {
        const rotatedPoints = rotate(points, -i * 2 * pi / numberOfTeeth)
        for (const [x, y] of rotatedPoints) {
            const drawPosX = centerX + x
            const drawPosY = centerY + y
            paths[0].push({ X: drawPosX, Y: drawPosY })
        }
    }

    return use(paths)
}

// Usage example:
const numberOfTeeth = 14
const mmPerTooth    = 5 * pi
const clearance     = 2;\const backlash  = 2
const pressureAngle = degrees_to_radians(30);

involuteGear(numberOfTeeth, mmPerTooth, clearance, backlash, pressureAngle)
```

---

##️ Star Shape Function

```javascript
function star(numberOfPoints, outerRadius, innerRadius) {
    const paths    = [[]];
    const centerX  = 30;
    const centerY  = 30;

    const radii            = [outerRadius, innerRadius];
    const verticesPerSpike = radii.length;
    const totalVertices    = numberOfPoints * verticesPerSpike;

    for (let i = 0; i < totalVertices; i++) {
        const angle = (2 * pi * i) / totalVertices;
        const radius = radii[i % verticesPerSpike];

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        paths[0].push({ X: x, Y: y });
    }

    // Close the path
    paths[0].push(paths[0][0]);
    return use(paths);
}

// Usage example:
star(5, 20, 10);
```

---

## Grid Arrangement

```javascript
// Base polyline definition
const baseShape = POLYLINE('M 15 10 L 30 10 L 30 25 L 15 25 L 15 10 Z');

// Grid parameters
const columns   = 5;
const rows      = 3;
const spacingX  = 15;
const spacingY  = 15;

function gridModule(path) {
    let svgOutput = '';

    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            const placed = use(path)
                .translate(spacingX * col, spacingY * row);
            svgOutput += SVG(placed);
        }
    }

    return svgOutput;
}

// Usage example:
gridModule(baseShape);
```

---

## Circular Arrangement

```javascript
// Base polyline definition
const baseShape = POLYLINE('M 15 10 L 30 10 L 30 25 L 15 25 L 15 10 Z');

function circularModule(path, radius, count) {
    let svgOutput = '';
    const centerX = 30;
    const centerY = 30;

    for (let i = 0; i < count; i++) {
        const angle = (2 * Math.PI / count) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const placed = use(path)
            .translate(x, y);
        svgOutput += SVG(placed);
    }

    return svgOutput;
}

// Usage example:
circularModule(baseShape, 20, 20);
