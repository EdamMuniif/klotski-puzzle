# Klotski V6 — Browser verification

Tests were performed in headless Chromium against local files injected into a browser page. These tests do not imply deployment to GitHub Pages or testing on physical phones.

- All 30 level definitions remain present: 9 Easy, 9 Medium, 12 Hard.
- All 18 Easy and Medium puzzles were completed by replaying their full validated optimal move sequences through the game logic, checking legal moves, winning states, minimum moves, unlocks, and Next buttons.
- All 12 Hard puzzle starting states were checked with the in-game shortest-route solver; calculated solutions matched their stored minimum move counts (60–116).
- Red 2×2 exit animation was observed in Chromium; the animation finishes and removes its temporary element, then reveals the victory panel and Continue button.
- Checked Easy 9 → Medium 1 and Medium 9 → Hard 1 transitions.
- Final-level UI tested using a synthetic just-before-win board state, checking `All 30 levels complete!` and absence of Next button; this synthetic test is **not** a full manual Hard 12 playthrough.
- Fresh player sees Easy 1, locked Easy 2, Medium, and Hard; completed levels remain replayable.
- Four hint uses per level stay exhausted across Restart and page reload, while another level receives its own four uses.
- Previous V5 progress, best scores, hints and advanced Hard unlocks are migrated without altering old storage keys.
- Verified actual pointer swipe and Undo behavior in simulated mobile Chrome.
- Tested viewport widths 320, 390, 768, 1024, 1280 and 1920 pixels, with no horizontal page overflow.
- No uncaught JavaScript errors occurred during these test cases.
- Reduced Motion setting avoids the animated exit.

Source files: `index.html` and `game-v6.js`. The ZIP contents are ready for offline browser play or deployment from a static GitHub Pages repository root.
