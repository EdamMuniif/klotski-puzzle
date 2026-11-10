# Klotski — Puzzle Challenge (Version 6)

Responsive, offline-capable 4×5 sliding puzzle game with 30 mathematically verified puzzles. Open `index.html` in a modern browser, keeping `game-v6.js` next to it. This release is **prepared locally**; it has not yet been deployed to GitHub.

## Sequential level-up journey

- Complete **Easy 1–9**, then **Medium 1–9**, then **Hard 1–12**.
- New players start at Easy 1. The next level unlocks only when the preceding level is won, including Easy→Medium and Medium→Hard transitions.
- Revisit completed levels. A previous version's genuinely advanced unlocked levels remain accessible for returning players.
- After the 2×2 red goal reaches the bottom-center exit, it visibly slides out of the board. A victory panel presents **Continue → Next Level**. The transition respects the system's Reduced Motion setting.
- No automatic level jump: the user controls when to continue. At the final level, the game celebrates completion.

## Controls and puzzle rules

Drag or swipe blocks with mouse, touch, or trackpad; on desktop, select a block and use arrow keys. Undo, restart, hint and saved best move counts are available. Yellow = 1×1, blue = vertical 1×2, green = horizontal 2×1, red = goal 2×2. A move is a one-cell shift.

## Hints and persistence

Four hints **per level**, permanently deducted when requested. Restarting, undoing, refreshing, replaying, and advancing do not refill hints. Best scores and hint budgets migrate from V5 (`klotski-puzzle-progress-v5`) or original Hard V4 (`klotski-hard-mode-progress-v2`) into the new V6 key (`klotski-puzzle-progress-v6`). Earlier storage keys are not deleted. Progress is local to the browser/device and not synced online.

## Layouts and verification

9 independently reconstructed Easy boards, 9 Medium boards from the original handwritten sheets, and 12 preserved classic Hard boards. Optimal paths are validated by breadth-first search. The interface is responsive for phones, tablets, and desktops.
