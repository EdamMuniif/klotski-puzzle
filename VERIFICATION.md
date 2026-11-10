# Version 7 — Verification

## Scope

Verified using Chromium 144 with Playwright. The browser's environment blocked direct navigation to local files and localhost, so the test harness loaded the exact HTML markup and injected the two checked scripts in the same order as the `defer` tags on the real site. No production GitHub Pages deployment was tested.

## Results

- **Intro board:** 10 pieces occupy 18 of the 20 cells, leaving two empty cells; four yellow 1×1 blocks, two blue vertical blocks, three green horizontal blocks, and one red 2×2 block.
- **Three-move path:** left yellow from (2,5) to (1,5); right yellow from (3,5) to (4,5); red block from (2,3) to (2,4). Each move is legal in the current board state. The red block ends at the bottom-center goal and animates through the exit at 100%.
- **Responsive views:** 320×568, 390×844, 768×1024 and 1440×900; intro, home and game displayed with no horizontal overflow.
- **Transition:** progress reaches 100%; intro hides; home appears; clicking Play opens the current game board (10 pieces).
- **Navigation:** Start Playing, Choose a Level and Home navigation all tested.
- **Skip intro:** immediately opens home and stays stable after the original sequence would have ended.
- **Reduced motion:** skips the sequence and opens home without animation.
- **Persistence:** seeded V6 save with Easy Level 1 complete and three used hints on Easy Level 2. Home displayed Easy 2; gameplay displayed 1/4 remaining hints.
- **Hidden game input:** arrow keys pressed on home did not move game pieces.
- **Victory regression:** solved Easy Level 1 in browser; in-game red exit animation completed; Continue moved to Easy Level 2; home count updated to 1.
- **Engine preserved:** the bundled `game-v6.js` matches the original Version 6 ZIP byte-for-byte.
- **Syntax:** both JavaScript files passed Node.js `--check`.
- **JavaScript errors:** none in the checked flows.

## Limitations

The opening's displayed percentage represents progress through a deliberate three-move animation, not actual downloaded bytes or server request progress. Physical mobile devices were not tested. The Version 7 source has been committed to GitHub `main`; production GitHub Pages operation was not part of these local tests.
