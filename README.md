# The Sliding Kingdom — Escape the Grid (Version 10)

**Tagline:** Slide the Blocks. Solve the Puzzle. Escape the Kingdom.  
**Creator:** by AM

A responsive, static Klotski-style sliding-block game, built for phones, tablets, and desktops.

## What's included

- Opens directly to the home menu, without an animated loading screen or opening puzzle.
- Minimal no-scroll home screen with the new game title, subtitle, tagline, and by AM credit.
- Single-screen gameplay, level selection popup, rules popup and three selectable themes.
- Dedicated Level Complete screen: Next Level, Replay Level, Home, move statistics and a themed miniature board.
- 30 validated puzzles: 9 Easy, 9 Medium and 12 Hard, unlocked sequentially.
- Four hints per level, persistent progress, personal bests, touch/mouse/keyboard controls, undo and restart.

## Files

- `index.html` — title, home, gameplay, completion and dialogs.
- `interface-v10.css` — responsive layouts and branding.
- `game-v9.js` — version 9 gameplay engine (unchanged).
- `intro-v9.js` — home navigation, themes and completion handling (original filename retained for compatibility).

Open `index.html` in a browser or serve all four files from the repository root. Github Pages uses the existing static Pages workflow.

## Compatibility

Player progress remains in `localStorage` under `klotski-puzzle-progress-v6`; theme selection uses `klotski-interface-theme-v8`. These keys are deliberately unchanged so existing players retain data. The GitHub repository name and Pages URL remain `klotski-puzzle`.
