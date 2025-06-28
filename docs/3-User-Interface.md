
# HobbyLaser UI 

## 1. Header Bar

- Fixed at the top of the page.
- Height: 40px.
- Elements:
  - Logo.
  - Buttons:
    - `refresh`: reloads the page (`window.location.reload(true)`).
  - Hidden `<input type="file">` for file selection.
  - Progress bar displayed underneath.

## 2. Main Drawing Area 

- Full-screen canvas interface.
- Positioned absolutely below the header.

## 3. Editor Panel 

- Hidden by default (off-screen to the right).
- Slide-in/out behavior for script editing using **Ace Editor**.
- Components:
  - Line numbers on the left.
  - Editable code area on the right.
  - Syntax highlighting and live change detection.
- Resizeable horizontally.

## 4. Console Log and Footer 

- Fixed at the bottom of the viewport.
- Height: default 80px (resizable).
- Displays runtime logs using a custom logging mechanism:
  - Colored timestamped entries.
  - Max 200 lines buffered with periodic trimming.
- Buttons:
  - `Clear Log`: clears console output.
  - `OpenTA`: reveals the code editor.
- Mouse and cursor position info shown in real-time.

## 5. GCode Generator Panel 

- Hidden modal for GCode configuration and export.
- Modes:
  - Cutter
  - Engrave
- Parameter inputs:
  - Power (min/max)
  - Travel/Laser speed
  - Passes
  - Z-axis offsets
  - Raster engraving settings
  - Output filename
- Buttons:
  - `create`: triggers GCode generation.
- Additional options for file download and air assist.

## 6. 3D Viewer Panel 

- Embedded WebGL view using **three.js**.
- Visualizes GCode paths.
- Synchronized with left and right control panels.
- Dynamic camera and resize-aware layout.

## 7. Side Panels

- **Left Panel**
  - Contains GRBL connection and control buttons:
    - `Connect`, `Stop`, `Send`, `Pause`, `Resume`, `setGRBL`.

## 8. Console Bottom Bar

- Fixed bar below the footer.
- Displays:
  - Mouse position 
  - Cursor position
  - WorkArea dimensions 
  - FPS counter
  - Access buttons 

## 9. Alert Dialogs

- Custom modal (`.alert-box`) for system messages and user confirmation.
- Includes confirm buttons styled with `btAlert`.
