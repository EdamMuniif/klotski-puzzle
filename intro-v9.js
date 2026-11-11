'use strict';
/* Ten-move Klotski opening — separate from the 30 playable levels.
   Progress follows validated one-cell slides, not network transfer. */
(() => {
  const el = id => document.getElementById(id);
  const intro = el('intro-screen');
  const home = el('home-screen');
  const game = el('game-screen');
  const complete = el('complete-screen');
  const stage = el('intro-stage');
  const introBoard = el('intro-board');
  const status = el('intro-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  let currentPercent = 0;
  const pause = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  // Ten-move shortest-solution 4×5 Klotski board: 10 blocks, 18 cells.
  // Every move is one orthogonal cell; no blocks jump or overlap.
  const pieces = [
    {id:'green-top',type:'green',x:0,y:0,w:2,h:1},
    {id:'blue-upper-left',type:'blue',x:0,y:1,w:1,h:2},
    {id:'blue-upper-right',type:'blue',x:3,y:1,w:1,h:2},
    {id:'yellow-upper-left',type:'yellow',x:2,y:1,w:1,h:1},
    {id:'yellow-upper-right',type:'yellow',x:2,y:0,w:1,h:1},
    {id:'red-goal',type:'goal',x:1,y:2,w:2,h:2},
    {id:'blue-lower-left',type:'blue',x:0,y:3,w:1,h:2},
    {id:'blue-lower-right',type:'blue',x:3,y:3,w:1,h:2},
    {id:'yellow-lower-left',type:'yellow',x:1,y:4,w:1,h:1},
    {id:'yellow-lower-right',type:'yellow',x:2,y:4,w:1,h:1}
  ];
  const pieceById = Object.fromEntries(pieces.map(piece => [piece.id,piece]));

  for (const piece of pieces) {
    const tile = document.createElement('div');
    tile.className = `intro-piece ${piece.type}`;
    tile.dataset.introPiece = piece.id;
    tile.style.setProperty('--ix', String(piece.x));
    tile.style.setProperty('--iy', String(piece.y));
    tile.style.setProperty('--iw', String(piece.w));
    tile.style.setProperty('--ih', String(piece.h));
    tile.innerHTML = piece.type==='goal' ? '<b>EXIT</b>' : piece.type==='green' ? '◇' : piece.type==='blue' ? '▯' : '◆';
    piece.element = tile;
    introBoard.append(tile);
  }

  function legalMove(id, dx, dy) {
    const moving = pieceById[id];
    const nx=moving.x+dx, ny=moving.y+dy;
    if(Math.abs(dx)+Math.abs(dy)!==1 || nx<0 || ny<0 || nx+moving.w>4 || ny+moving.h>5) return false;
    return pieces.every(other => other===moving || nx>=other.x+other.w || nx+moving.w<=other.x || ny>=other.y+other.h || ny+moving.h<=other.y);
  }

  async function movePiece(id, dx, dy, percentage, description) {
    if (finished) return;
    if (!legalMove(id, dx, dy)) throw new Error(`Invalid intro move: ${id}`);
    status.textContent = description;
    const moving=pieceById[id];
    // Target approx. 6 seconds end-to-end. Each tile and the progress bar
    // use the same time interval; the final steps have a gentle cinematic hold.
    const duration = percentage === 90 ? 470 : percentage === 100 ? 520 : 365;
    moving.element.style.setProperty('--intro-move-duration', `${duration}ms`);
    // Apply the new transition duration before changing the tile position.
    void moving.element.offsetWidth;
    moving.x+=dx;moving.y+=dy;
    moving.element.style.setProperty('--ix', String(moving.x));
    moving.element.style.setProperty('--iy', String(moving.y));
    await Promise.all([pause(duration), animateProgress(percentage, duration)]);
  }

  function setProgress(n) {
    currentPercent=Math.max(currentPercent,Math.min(100,n));
    const percentage=Math.round(currentPercent);
    el('intro-fill').style.width = `${currentPercent}%`;
    el('intro-progress').setAttribute('aria-valuenow',String(percentage));
    // Text steps through the requested milestones, in sync with the sliding tiles.
    const milestones=[0,10,20,30,40,50,60,70,80,90,100];
    const displayed=milestones.filter(step=>step<=currentPercent+0.001).at(-1) ?? 0;
    el('intro-percent').textContent = `${displayed}%`;
  }

  function animateProgress(target, duration) {
    if (finished) return Promise.resolve();
    const from=currentPercent;
    return new Promise(resolve => {
      const start=performance.now();
      const tick=now => {
        if (finished) return resolve();
        const t=Math.min(1,(now-start)/duration);
        const smooth=t*t*(3-2*t);
        setProgress(from+(target-from)*smooth);
        if(t<1) requestAnimationFrame(tick); else resolve();
      };
      requestAnimationFrame(tick);
    });
  }

  function updateHome() {
    // Reads the V6 game state only; never writes to progress or hint storage.
    const won=LEVELS.filter(level => saved.best[level.id] != null).length;
    const level=LEVELS[Math.min(resolveStartIndex(),LEVELS.length-1)];
    el('home-solved').textContent=String(won);
    el('home-next').textContent=won===LEVELS.length?'30 / 30':`${level.group} ${levelIndexWithinGroup(LEVELS.indexOf(level))+1}`;
    el('home-start').textContent=won===LEVELS.length?'▶ Replay a level':won>0?'▶ Continue playing':'▶ Start playing';
  }

  function showHome() {
    if(finished)return;
    finished=true;
    // Clean up the effects immediately if the user taps Skip Intro.
    stage.querySelector('.intro-ghost')?.remove();
    document.querySelector('.intro-home-portal')?.remove();
    updateHome();
    home.hidden=false;
    game.hidden=true;
    complete.hidden=true;
    intro.classList.add('leaving');
    // The cinematic handoff already faded the loader; Skip Intro still fades normally.
    const fadeDelay = reducedMotion || intro.classList.contains('leaving-before-home') ? 0 : 260;
    window.setTimeout(() => {intro.hidden=true;el('home-title').focus({preventScroll:true});}, fadeDelay);
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
    if(intro.hidden===false || !completed || exitAnimating || detail.levelId!==LEVELS[index].id)return;
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
    if (intro.hidden===false || !home.hidden) {
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

  async function exitStage() {
    if (finished) return;
    intro.classList.add('unlocked');
    const goal = pieceById['red-goal'].element;
    if (reducedMotion || typeof goal.animate !== 'function') return;

    const rect = goal.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const gateRect = stage.querySelector('.intro-exit').getBoundingClientRect();

    // First pass: the red block moves BEHIND the luminous exit line, then
    // becomes visible on the other side. It never changes any game state.
    const ghost = goal.cloneNode(true);
    ghost.className = 'intro-piece goal intro-ghost';
    ghost.style.setProperty('--ix','0');
    ghost.style.setProperty('--iy','0');
    ghost.style.left = `${rect.left-stageRect.left}px`;
    ghost.style.top = `${rect.top-stageRect.top}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    stage.append(ghost);
    goal.style.opacity = '0';

    const travel = Math.max(40, gateRect.top-rect.top+Math.min(44,rect.height*0.32));
    const underGate = ghost.animate([
      { transform:'translateY(0px)' },
      { transform:`translateY(${travel}px)` }
    ], {duration:290,easing:'cubic-bezier(.42,0,.58,1)',fill:'forwards'});
    await Promise.race([underGate.finished.catch(()=>{}),pause(350)]);
    if (finished) { ghost.remove(); return; }

    const emerged = ghost.getBoundingClientRect();
    ghost.remove();

    // Second pass: reveal the existing home page beneath the loader and
    // morph the escaped red tile into its matching red Continue Playing button.
    updateHome();
    home.hidden = false;
    game.hidden = true;
    complete.hidden = true;
    const button = el('home-start');
    const destination = button.getBoundingClientRect();
    const portal = document.createElement('div');
    portal.className = 'intro-home-portal';
    const portalLabel = document.createElement('b');
    portalLabel.textContent = 'EXIT';
    portal.append(portalLabel);
    Object.assign(portal.style,{
      left:`${emerged.left}px`,top:`${emerged.top}px`,
      width:`${emerged.width}px`,height:`${emerged.height}px`
    });
    document.body.append(portal);

    intro.classList.add('leaving','leaving-before-home');
    const morph = portal.animate([
      { left:`${emerged.left}px`,top:`${emerged.top}px`,
        width:`${emerged.width}px`,height:`${emerged.height}px`,
        opacity:1,offset:0 },
      { left:`${destination.left}px`,top:`${destination.top}px`,
        width:`${destination.width}px`,height:`${destination.height}px`,
        opacity:1,offset:.82 },
      { left:`${destination.left}px`,top:`${destination.top}px`,
        width:`${destination.width}px`,height:`${destination.height}px`,
        opacity:0,offset:1 }
    ],{duration:650,easing:'cubic-bezier(.33,0,.18,1)',fill:'forwards'});
    portalLabel.animate([{opacity:1,offset:0},{opacity:0,offset:.65},{opacity:0,offset:1}],
      {duration:650,fill:'forwards'});
    await Promise.race([morph.finished.catch(()=>{}),pause(720)]);
    portal.remove();
    if (!finished) {
      button.classList.add('intro-arrived');
      window.setTimeout(()=>button.classList.remove('intro-arrived'),450);
    }
  }

  async function runIntro() {
    if(reducedMotion){setProgress(100);showHome();return;}
    try {
      await pause(40);
      // Ten verified one-cell moves, synchronized with the progress display.
      await movePiece('blue-upper-right',0,-1,10,'Move 1 / 10 · Upper-right blue UP');
      await movePiece('blue-lower-right',0,-1,20,'Move 2 / 10 · Lower-right blue UP');
      await movePiece('yellow-lower-right',1,0,30,'Move 3 / 10 · Bottom-right yellow RIGHT');
      await movePiece('yellow-upper-left',-1,0,40,'Move 4 / 10 · Upper yellow LEFT');
      await movePiece('yellow-upper-right',0,1,50,'Move 5 / 10 · Top yellow DOWN');
      await movePiece('green-top',1,0,60,'Move 6 / 10 · Green block RIGHT');
      await movePiece('blue-upper-left',0,-1,70,'Move 7 / 10 · Upper-left blue UP');
      await movePiece('blue-lower-left',0,-1,80,'Move 8 / 10 · Lower-left blue UP');
      await movePiece('yellow-lower-left',-1,0,90,'Move 9 / 10 · Bottom-left yellow LEFT');
      if(finished)return;
      if(finished)return;
      await movePiece('red-goal',0,1,100,'Move 10 / 10 · Red block DOWN');
      if(finished)return;
      if(pieceById['red-goal'].x!==1||pieceById['red-goal'].y!==3) throw new Error('Intro goal did not reach exit');
      await exitStage();
    } catch(e) {
      console.error('Intro animation failed; opening game home safely.',e);
    }
    showHome();
  }

  // Game's document-level arrow-key shortcuts should not act behind intro/home.
  document.addEventListener('keydown',event=>{
    if(game.hidden && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){
      event.preventDefault();event.stopImmediatePropagation();
    }
  },true);
  el('intro-skip').addEventListener('click',showHome);
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
  runIntro();
})();
