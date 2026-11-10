# Klotski Puzzle Quest — Version 7

A mobile-first, offline-ready Klotski web game with 30 puzzles and a cinematic startup sequence.

## New in V7: three-move opening

On page load, an illustrated **real 4 × 5 Klotski board** animates exactly three legal one-cell slides:

1. Yellow block at (2,5) slides **left** into the empty space (1,5).
2. Yellow block at (3,5) slides **right** into the empty space (4,5).
3. Red 2 × 2 target slides **down** into the bottom-center winning position.

The visual progress meter rises **0 → 33 → 66 → 93 → 100%**, synchronized with the moves. At 100%, the gate glows, the red target **slides completely out** of the board, and the **new Home screen** appears. Players can start/continue the last unlocked puzzle or browse unlocked levels. The intro can be skipped and respects reduced-motion accessibility settings.

> The percentage reports the cinematic opening sequence, not bytes downloaded over the network. The game itself is a static offline-capable HTML/CSS/JS site.

## Preserved gameplay

- 30 levels: 9 Easy → 9 Medium → 12 Hard/Expert/Master.
- Existing 4 hints per level (persisted on device).
- Unlocking the next level when the red 2 × 2 block reaches the bottom exit.
- In-game red-block exit animation and victory panel.
- Existing game saves and best scores (same `klotski-puzzle-progress-v6` localStorage key).
- Swipe/drag, keyboard arrows, undo, restart, hint, level selection.
- Responsive phone, tablet, and desktop presentation.

## Files

- `index.html` — game UI, new intro and home-screen UI.
- `intro-v7.js` — isolated three-move animation and navigation controller.
- `game-v6.js` — existing, unchanged puzzle engine and saved progression.

Open `index.html` in a modern browser; no dependencies or build tools are required. For GitHub Pages, place all three files in the repository root.

**Deployment:** Version 7 is published to the `main` branch. GitHub Pages deployment runs through the existing GitHub Actions workflow; verify the live status in the Actions tab.
