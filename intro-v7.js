'use strict';
/* V7 opening: three legal Klotski moves, then the red target exits. This
   animation is separate from (and never modifies) the 30 real game levels. */
(() => {
  const el = id => document.getElementById(id);
  const intro = el('intro-screen');
  const home = el('home-screen');
  const game = el('game-screen');
  const stage = el('intro-stage');
  const introBoard = el('intro-board');
  const status = el('intro-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  let currentPercent = 0;
  const pause = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  // This board is deliberately three legal one-cell moves away from the exit.
  // Four yellow cells and two empty spaces are retained at every step.
  const pieces = [
    {id:'green-left',type:'green',x:0,y:0,w:2,h:1},
    {id:'green-right',type:'green',x:2,y:0,w:2,h:1},
    {id:'green-middle',type:'green',x:1,y:1,w:2,h:1},
    {id:'blue-left',type:'blue',x:0,y:1,w:1,h:2},
    {id:'blue-right',type:'blue',x:3,y:1,w:1,h:2},
    {id:'red-goal',type:'goal',x:1,y:2,w:2,h:2},
    {id:'yellow-left-upper',type:'yellow',x:0,y:3,w:1,h:1},
    {id:'yellow-right-upper',type:'yellow',x:3,y:3,w:1,h:1},
    {id:'yellow-left',type:'yellow',x:1,y:4,w:1,h:1},
    {id:'yellow-right',type:'yellow',x:2,y:4,w:1,h:1}
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
    tile.innerHTML = piece.type==='goal' ? '<b>EXIT</b>' : piece.type==='green' ? '═' : piece.type==='blue' ? '▯' : '•';
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
    moving.x+=dx;moving.y+=dy;
    moving.element.style.setProperty('--ix', String(moving.x));
    moving.element.style.setProperty('--iy', String(moving.y));
    await Promise.all([pause(610), animateProgress(percentage, 610)]);
    await pause(100);
  }

  function setProgress(n) {
    currentPercent=Math.max(currentPercent,Math.min(100,n));
    const percentage=Math.round(currentPercent);
    el('intro-percent').textContent = `${percentage}%`;
    el('intro-fill').style.width = `${currentPercent}%`;
    el('intro-progress').setAttribute('aria-valuenow',String(percentage));
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
    const level=LEVELS[index];
    el('home-solved').textContent=String(won);
    el('home-next').textContent=won===LEVELS.length?'30 / 30':`${level.group} ${levelIndexWithinGroup(index)+1}`;
    el('home-start').textContent=won===LEVELS.length?'▶ Replay a level':won>0?'▶ Continue playing':'▶ Start playing';
  }

  function showHome() {
    if(finished)return;
    finished=true;
    updateHome();
    home.hidden=false;
    game.hidden=true;
    intro.classList.add('leaving');
    window.setTimeout(() => {intro.hidden=true;el('home-title').focus({preventScroll:true});}, reducedMotion?0:560);
  }

  function openGame(browse=false) {
    home.hidden=true;
    game.hidden=false;
    window.scrollTo({top:0,behavior:'instant'});
    if(browse){
      requestAnimationFrame(()=>{
        el('level-selection').scrollIntoView({block:'start',behavior:reducedMotion?'instant':'smooth'});
        const first=el('levels').querySelector('button:not(:disabled)');
        first?.focus({preventScroll:true});
      });
    } else {
      requestAnimationFrame(()=>el('level-name').focus({preventScroll:true}));
    }
  }

  async function exitStage() {
    if(finished)return;
    status.textContent='100% · Exit unlocked!';
    intro.classList.add('unlocked');
    const goal=pieceById['red-goal'].element;
    if(reducedMotion || typeof goal.animate!=='function') {await pause(100);return;}
    const rect=goal.getBoundingClientRect(), parent=stage.getBoundingClientRect();
    const ghost=goal.cloneNode(true);
    ghost.className='intro-piece goal intro-ghost';
    ghost.style.setProperty('--ix','0');ghost.style.setProperty('--iy','0');
    ghost.style.left=`${rect.left-parent.left}px`;
    ghost.style.top=`${rect.top-parent.top}px`;
    ghost.style.width=`${rect.width}px`;ghost.style.height=`${rect.height}px`;
    stage.append(ghost);
    goal.style.opacity='0';
    const travel=parent.bottom-rect.top+25;
    const effect=ghost.animate([
      {transform:'translateY(0px)',opacity:1,offset:0},
      {transform:`translateY(${travel*.7}px)`,opacity:1,offset:.78},
      {transform:`translateY(${travel}px) scale(.87)`,opacity:0,offset:1}
    ],{duration:840,easing:'cubic-bezier(.21,.68,.3,1)',fill:'forwards'});
    await Promise.race([effect.finished.catch(()=>{}),pause(1050)]);
    ghost.remove();
  }

  async function runIntro() {
    if(reducedMotion){setProgress(100);showHome();return;}
    try {
      await pause(270);
      await movePiece('yellow-left',-1,0,33,'Move 1 / 3 · Clear the left lane');
      await movePiece('yellow-right',1,0,66,'Move 2 / 3 · Clear the right lane');
      await movePiece('red-goal',0,1,93,'Move 3 / 3 · Guide the red block down');
      if(finished)return;
      if(pieceById['red-goal'].x!==1||pieceById['red-goal'].y!==3) throw new Error('Intro goal did not reach exit');
      await animateProgress(100,230);
      await exitStage();
      await pause(160);
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
  el('home-start').addEventListener('click',()=>openGame(false));
  el('home-browse').addEventListener('click',()=>openGame(true));
  el('return-home').addEventListener('click',()=>{updateHome();game.hidden=true;home.hidden=false;window.scrollTo({top:0,behavior:'instant'});el('home-title').focus({preventScroll:true});});
  runIntro();
})();
