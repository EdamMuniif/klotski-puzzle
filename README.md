# Klotski — Hard Mode (Version 3)

An offline-ready, single-file Klotski game with 12 adult-difficulty puzzles and layouts optimized for phones, tablets, and desktop monitors.

## Run

Open `index.html` in a modern browser. No server, installation, external assets, or internet connection is required.

## Play

- Swipe or drag a block directly on the board using a finger or mouse. On desktop, select a block and use keyboard arrow keys if preferred.
- Each movement is a one-cell translation. Pieces cannot rotate, overlap or leave the board.
- Guide the 2×2 blue target block to the bottom-center exit.
- Undo, restart and shortest-route hints are available.
- Clear each level to unlock the next; best scores and progress are saved in the browser.
- On a phone or tablet, use **Choose level** at the top to jump to the level menu.

## Difficulty and verification

All 12 levels are Hard or above from the beginning; minimum solution lengths: **60, 65, 70, 75, 80, 85, 90, 95, 100, 104, 110, 116** one-cell moves.

- Grid: 4 × 5. Pieces: 1 goal 2×2, 4 vertical 1×2, 1 horizontal 2×1, 4 single 1×1; 2 empty cells.
- All level positions are sampled from a known optimal 116-step solution path for the classic problem.
- The app's hint algorithm runs breadth-first search using symmetric-piece canonicalization to find shortest moves from the current position.
- Version 3 stores progress under a separate key from Version 1 so old easy-mode best scores cannot be incorrectly applied to the new puzzles.

## Version 3 update

- Removed the on-screen direction pad and adjacent instructions to free board space on phones.
- Preserved swipes, mouse dragging, keyboard arrows, undo, restart, hints, levels, and the same local-storage key for progress when replacing the game at its original URL or file path.

## Supported layouts

Responsive styles for phone portrait (320px+), tablet portrait/landscape and wide desktop monitors. Unnecessary on-screen directional buttons have been removed. Level buttons are 58–70px high and actions at least 48px.
