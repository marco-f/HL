
# 2D interactive rendering module 

## Purpose

- SVG canvas rendering
- Drawing and editing vector objects
- Boolean geometry operations
- Font/text handling and image tools
- Live interaction, snapping, guideLines and grid overlays

---

## Key Features

### 1. Canvas and Grid System

- Uses **Fabric.js** for object management.
- Renders a zoom-aware, DPI-calibrated grid.
- Includes horizontal and vertical rulers.

### 2. Drawing Tools

- **POLYLINE**: Manual path creation with curve support, undo/redo, right-click to close path.
- **POLYGON**: Generates regular polygons using center and radius.
- **TEXT**: Places vector text using TrueType fonts with optional path-following.
- **IMAGE**: Loads and prepares raster images for engraving with filters (grayscale, brightness, contrast).

### 3. Boolean Geometry Operations

- Functions: `union()`, `difference()`, `intersection()`, `xor()`
- Built on **ClipperLib**.
- Supports path manipulation: `translate()`, `rotate()`, `mirror()`, `skew()`, `offset()`, `scale()`, `resize()`

### 4. Interactive Guides, Snapping, WorkArea

- Real-time mouse tracking and snapping to a metric grid.
- Interactive draggable guides (horizontal and vertical) for alignment assistance.
- Guides can be toggled on by clicking a hidden button located at the intersection of the top and left rulers.
- Each guide consists of:
  - horizontal and vertical line
  - draggable at the intersection point

#### Guide Management

- To activate a new guide:
  - Click the invisible area at the top-left corner where the two rulers meet.
- To remove all guides:
  - Use the keyboard shortcut `Ctrl + G` (clears all guide objects from the canvas).

#### WorkArea Resizing

- The work area is outlined with dashed lines.
- Draggable at the intersection of the lines.
- Position snapping ensures clean alignment to the underlying grid.

### 5. SVG Path Conversion and Parsing

- Converts raw SVG `path` data into:
  - `svgPathToPoints()` for Fabric rendering.
  - `svgPathToClipperPaths()` for boolean ops.
- Supports complex commands: `M`, `L`, `Q`, `C`, `A`, `Z`

### 6. Font Handling and Text Rendering

- Loads multiple `.ttf` fonts using **OpenType.js**.
- Glyph contour extraction for vector rendering.
- Optional curved text on path using trigonometric alignment.
- Kerning and aspect ratio adjustments per character.

### 7. Export and Utility Functions

- Dynamic resizing of canvas based on viewport.
- WorkArea size configuration and visual boundaries.
- Path rendering to canvas via `SVG(path)` call.
- Utility functions like `clearCNVS()`, `setWorkArea()`, etc.

---

##️ Technologies Used

- **JavaScript (vanilla)**
- **jQuery** for dynamic DOM handling
- **Fabric.js** for HTML5 canvas interaction
- **ClipperLib** for computational geometry
- **OpenType.js** for font parsing and manipulation
- Inline **SVG** for real-time drawing and markers

---
