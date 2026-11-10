# Klotski — Puzzle Challenge (Version 5)

Mobile-first, static Klotski game for phones, tablets, and desktops. Open `index.html` to play offline (keep `game-v5.js` in the same folder). GitHub Pages automatically deploys commits to `main`.

## Levels

- **Easy:** 9 photographed, manually reconstructed puzzles (E01–E09, shortest solutions 10–26 one-cell moves).
- **Medium:** 9 photographed, manually reconstructed puzzles (M01–M09, shortest solutions 87–96 moves).
- **Hard / Expert / Master:** existing 12 classic variants (H01–H12, shortest solutions 60–116 moves).
- A separate level is unlocked within each category. The first level of every category is available immediately, including Hard Mode.
- Switch categories from the level selection buttons. Four hints per level; counters remain exhausted after restart or refresh.

## Controls

Drag or swipe blocks on a phone, tablet, or computer; use arrow keys on desktop after selecting a block. Undo, Restart, and shortest-route Hint are available. Red: goal 2×2; Yellow: small 1×1; Blue: vertical 1×2; Green: horizontal 2×1. Reach the bottom-center exit with the red block.

## Progress compatibility

Version 5 stores progress in `klotski-puzzle-progress-v5`, and imports old Hard Mode V4 data from `klotski-hard-mode-progress-v2` on first use. Old data are not deleted. Best scores, unlocked Hard levels and remaining hints are preserved. Each new level has its own independent hint budget.

## Puzzle validation

The 18 handwritten layouts came from the user's two photographed puzzle sheets (9 Easy and 9 Medium). All passed geometry checks and independent breadth-first-search solving with replayed optimal solutions. Original solution data and diagrams are retained in the source validation package; the game embeds the 18 coordinate layouts.

Note: Medium moves overlap Hard's numerical range. Difficulty labels follow the provided sheets, not a strictly monotonic global move count. Movement is counted in one-cell steps.
