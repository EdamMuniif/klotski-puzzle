'use strict';
/* Home, game navigation, dialogs, themes and level-complete handling.
   Opening animation removed; home menu opens immediately. */
(() => {
  const el = id => document.getElementById(id);
  const home = el('home-screen');
  const game = el('game-screen');
  const complete = el('complete-screen');

  function updateHome() {
    // Reads the V6 game state only; never writes to progress or hint storage.
    const won=LEVELS.filter(level => saved.best[level.id] != null).length;
    const level=LEVELS[Math.min(resolveStartIndex(),LEVELS.length-1)];
    el('home-solved').textContent=String(won);
    el('home-next').textContent=won===LEVELS.length?'30 / 30':`${level.group} ${levelIndexWithinGroup(LEVELS.indexOf(level))+1}`;
    el('home-start').textContent=won===LEVELS.length?'▶ Replay a level':won>0?'▶ Continue playing':'▶ Start playing';
  }

  function displayGame() {
    closeOpenDialog();
    complete.hidden=true;
    home.hidden=true;
    game.hidden=false;
    window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>el('level-name').focus({preventScroll:true}));
  }
  function openGame() {
    // A finished board must not reopen behind the completion screen.
    if(completed && !exitAnimating)initializeLevel(resolveStartIndex());
    displayGame();
  }
  function returnHome() {
    if(exitAnimating)return; // The red exit animation must complete first.
    complete.hidden=true;
    game.hidden=true;
    updateHome();
    home.hidden=false;
    window.scrollTo({top:0,behavior:'instant'});
    el('home-title').focus({preventScroll:true});
  }
  function displayCompletion(detail) {
    if(!completed || exitAnimating || detail.levelId!==LEVELS[index].id)return;
    const last=detail.nextIndex==null;
    el('complete-title').textContent=last?'All Levels Complete!':'Level Complete!';
    el('complete-subtitle').textContent=`${detail.group} · Level ${detail.ordinal} · Challenge ${detail.index+1} of ${detail.total}`;
    el('complete-moves').textContent=String(detail.moves);
    el('complete-optimal').textContent=String(detail.optimal);
    el('complete-best').textContent=String(detail.best);
    el('complete-message').textContent=last?'All 30 puzzles cleared. Every challenge is now complete.':detail.moves===detail.optimal?'Perfect solution! You matched the shortest route.':'Puzzle solved! The red block reached the exit.';
    const next=el('complete-next');
    next.hidden=last;
    if(!last){const l=LEVELS[detail.nextIndex];next.textContent=`Next · ${l.group} ${levelIndexWithinGroup(detail.nextIndex)+1} →`;}
    game.hidden=true;
    home.hidden=true;
    complete.hidden=false;
    window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>el('complete-title').focus({preventScroll:true}));
  }

  function closeOpenDialog() {
    const opened=document.querySelector('dialog[open]');
    if(opened) opened.close();
  }

  function showDialog(id) {
    if (!home.hidden) {
      const dialog=el(id);
      if(!dialog.open)dialog.showModal();
      const focusTarget=dialog.querySelector('.dialog-close');
      focusTarget?.focus({preventScroll:true});
    }
  }

  const themeKey='klotski-interface-theme-v8';
  const themes=['navy','royal','light'];
  function applyTheme(theme) {
    if(!themes.includes(theme))theme='navy';
    document.body.dataset.theme=theme;
    document.querySelectorAll('[data-set-theme]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.setTheme===theme)));
    try {localStorage.setItem(themeKey,theme);} catch {/* Storage unavailable */}
  }
  let preferredTheme='navy';
  try{preferredTheme=localStorage.getItem(themeKey)||'navy';}catch{/* Private mode */}
  applyTheme(preferredTheme);

  el('home-start').addEventListener('click',()=>{
    // Continue the campaign, rather than reopening the already-cleared level.
    initializeLevel(resolveStartIndex());
    displayGame();
  });
  el('home-browse').addEventListener('click',()=>{chooseGroup(saved.activeGroup);showDialog('levels-dialog');});
  el('home-rules').addEventListener('click',()=>showDialog('rules-dialog'));
  el('home-theme').addEventListener('click',()=>showDialog('theme-dialog'));
  el('return-home').addEventListener('click',returnHome);
  window.addEventListener('klotski:level-complete',event=>displayCompletion(event.detail));
  el('complete-next').addEventListener('click',()=>{
    if(!completed||exitAnimating||index>=LEVELS.length-1||!isUnlocked(index+1))return;
    initializeLevel(index+1);
    displayGame();
  });
  el('complete-replay').addEventListener('click',()=>{
    if(!completed||exitAnimating)return;
    initializeLevel(index); // Does not reset hint usage or best score.
    displayGame();
  });
  el('complete-home').addEventListener('click',returnHome);
  document.querySelectorAll('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>el(btn.dataset.closeDialog).close()));
  document.querySelectorAll('[data-set-theme]').forEach(btn=>btn.addEventListener('click',()=>applyTheme(btn.dataset.setTheme)));
  document.querySelectorAll('.menu-dialog').forEach(dialog=>{
    // Clicking the dimmed backdrop dismisses the popup; clicks inside never do.
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const rect=dialog.getBoundingClientRect();
      if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
    });
  });
  window.addEventListener('klotski:level-selected',()=>openGame());
  // Keep the unmodified V6 game behind dialogs from responding to arrow keys.
  document.addEventListener('keydown',event=>{
    if(document.querySelector('dialog[open]') && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))event.stopImmediatePropagation();
  },true);
  updateHome();
})();
