# Screenshots Guide

This document explains how to take and add screenshots for the Tiny SVG README.

## Required Screenshots

### 1. Home Page (`docs/images/home.png`)

**URL**: http://localhost:3001/

**Instructions**:
1. Open the application in Chrome (or your preferred browser)
2. Navigate to the home page
3. Make sure the page is fully loaded
4. Take a screenshot of the entire viewport
5. Save as `docs/images/home.png`

**Recommended size**: 1920x1080 (or similar 16:9 ratio)

### 2. Optimize Page (`docs/images/optimize.png`)

**URL**: http://localhost:3001/optimize

**Instructions**:
1. Upload or paste a sample SVG (preferably a colorful icon)
2. Wait for optimization to complete
3. Make sure both original and optimized previews are visible
4. Show the config panel on the right side
5. Take a screenshot of the full page
6. Save as `docs/images/optimize.png`

**Recommended size**: 1920x1080 (or similar 16:9 ratio)

**Tips**:
- Use a sample SVG with good visual appeal
- Show the compression rate and file size statistics
- Make sure the UI is in a clean state (no errors or loading states)

### 3. Logo (Optional)

If you have a logo SVG, place it at `docs/images/logo.svg`

## Taking Screenshots

### Using Browser DevTools

1. Open DevTools (F12)
2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "screenshot"
4. Select "Capture full size screenshot" or "Capture screenshot"

### Using macOS

- Cmd+Shift+3: Full screen
- Cmd+Shift+4: Select area
- Cmd+Shift+5: Screenshot tool with more options

### Using Windows

- PrtScn: Full screen (paste in image editor)
- Win+Shift+S: Snipping tool (select area)

## Image Optimization

After taking screenshots, optimize them:

```bash
# Using ImageOptim (macOS)
open -a ImageOptim docs/images/home.png

# Using tinypng.com
# Upload to https://tinypng.com/ and download optimized version
```

## Updating README

Once screenshots are in place, the README will automatically show them:

```markdown
![Home Page](./docs/images/home.png)
![Optimize Page](./docs/images/optimize.png)
```

No code changes needed!
