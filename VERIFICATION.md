# Version 10 — Local Verification

## Scope

Published source is Version 9's tested completion-game implementation with Version 10 branding and a responsive home-screen CSS adjustment. The underlying `game-v9.js` and `intro-v9.js` files are byte-for-byte identical to the Version 9 release package.

## Checks completed

- Both JavaScript files pass `node --check`.
- Browser-based Chromium checks using the exact HTML/CSS/JavaScript contents loaded into the DOM (localhost and external navigation blocked in the test environment).
- Home viewport fit, without page or home-card scrolling, at 320×568, 360×640, 390×844, 430×932, 768×1024, 1024×768, 1440×900, 844×390, and 667×375.
- Title **The Sliding Kingdom**, subtitle **Escape the Grid**, tagline, creator credit, document title and 30-level dataset verified.
- Intro runs three Klotski moves, reaches 100%, and transitions to home.
- Home navigation and level-selection dialog work.
- How to Play dialog and theme switching work.
- Easy 1 played to completion in the shortest 10 moves using the built-in move solver, followed by the existing red-block exit animation and Level Complete screen.
- Replay preserved the best result and returned to the same level; completing it again allowed Next Level to open Easy 2; Home returned successfully.
- No browser JavaScript errors detected in the exercised paths.

## Compatibility and limitations

- Original progress key: `klotski-puzzle-progress-v6`; theme key: `klotski-interface-theme-v8` (not changed).
- No underlying game rules, puzzles, move solver, hint consumption, or intro timing were changed.
- CSS/JS were injected inline during automated tests; the release references these exact assets as separate files.
- Physical Android and iPhone devices, Safari, Firefox, and production GitHub Pages deployment have **not** been independently tested in this validation.
- The 0–100% intro is a choreographed animation, not network transfer progress.
