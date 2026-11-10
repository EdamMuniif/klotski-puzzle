'use strict';
const GROUP_ORDER=['Easy','Medium','Hard'];
const SHAPE={goal:{w:2,h:2,type:'goal'},horizontal:{w:2,h:1,type:'horizontal'},vertical:{w:1,h:2,type:'vertical'},small:{w:1,h:1,type:'small'}};
const HANDWRITTEN_LEVELS=[{"id":"E01","group":"Easy","name":"Handwritten E01","difficulty":"Easy","minimum":10,"pieces":[{"type":"goal","x":2,"y":3},{"type":"horizontal","x":0,"y":2},{"type":"horizontal","x":2,"y":2},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":0,"y":3},{"type":"vertical","x":1,"y":3},{"type":"small","x":1,"y":0},{"type":"small","x":2,"y":0},{"type":"small","x":1,"y":1},{"type":"small","x":2,"y":1}]},{"id":"E02","group":"Easy","name":"Handwritten E02","difficulty":"Easy","minimum":14,"pieces":[{"type":"goal","x":2,"y":2},{"type":"horizontal","x":1,"y":0},{"type":"horizontal","x":1,"y":1},{"type":"horizontal","x":0,"y":3},{"type":"vertical","x":3,"y":0},{"type":"vertical","x":0,"y":1},{"type":"small","x":0,"y":0},{"type":"small","x":1,"y":2},{"type":"small","x":2,"y":4},{"type":"small","x":3,"y":4}]},{"id":"E03","group":"Easy","name":"Handwritten E03","difficulty":"Easy","minimum":20,"pieces":[{"type":"goal","x":0,"y":2},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":1,"y":0},{"type":"vertical","x":2,"y":0},{"type":"vertical","x":2,"y":2},{"type":"vertical","x":3,"y":2},{"type":"small","x":3,"y":0},{"type":"small","x":3,"y":1},{"type":"small","x":1,"y":4},{"type":"small","x":3,"y":4}]},{"id":"E04","group":"Easy","name":"Handwritten E04","difficulty":"Easy","minimum":16,"pieces":[{"type":"goal","x":1,"y":1},{"type":"horizontal","x":0,"y":0},{"type":"vertical","x":0,"y":1},{"type":"vertical","x":3,"y":1},{"type":"vertical","x":0,"y":3},{"type":"vertical","x":2,"y":3},{"type":"small","x":2,"y":0},{"type":"small","x":3,"y":0},{"type":"small","x":1,"y":3},{"type":"small","x":1,"y":4}]},{"id":"E05","group":"Easy","name":"Handwritten E05","difficulty":"Easy","minimum":24,"pieces":[{"type":"goal","x":0,"y":0},{"type":"horizontal","x":2,"y":0},{"type":"horizontal","x":2,"y":1},{"type":"vertical","x":0,"y":3},{"type":"vertical","x":1,"y":3},{"type":"vertical","x":3,"y":3},{"type":"small","x":2,"y":2},{"type":"small","x":3,"y":2},{"type":"small","x":2,"y":3},{"type":"small","x":2,"y":4}]},{"id":"E06","group":"Easy","name":"Handwritten E06","difficulty":"Easy","minimum":24,"pieces":[{"type":"goal","x":1,"y":2},{"type":"horizontal","x":1,"y":0},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":0,"y":2},{"type":"vertical","x":3,"y":2},{"type":"small","x":3,"y":0},{"type":"small","x":2,"y":1},{"type":"small","x":0,"y":4},{"type":"small","x":1,"y":4}]},{"id":"E07","group":"Easy","name":"Handwritten E07","difficulty":"Easy","minimum":23,"pieces":[{"type":"goal","x":1,"y":2},{"type":"horizontal","x":2,"y":0},{"type":"horizontal","x":2,"y":1},{"type":"horizontal","x":0,"y":4},{"type":"vertical","x":0,"y":1},{"type":"vertical","x":3,"y":2},{"type":"small","x":1,"y":0},{"type":"small","x":0,"y":3},{"type":"small","x":2,"y":4},{"type":"small","x":3,"y":4}]},{"id":"E08","group":"Easy","name":"Handwritten E08","difficulty":"Easy","minimum":23,"pieces":[{"type":"goal","x":0,"y":2},{"type":"horizontal","x":1,"y":0},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":3,"y":0},{"type":"vertical","x":3,"y":2},{"type":"small","x":1,"y":1},{"type":"small","x":2,"y":1},{"type":"small","x":0,"y":4},{"type":"small","x":1,"y":4}]},{"id":"E09","group":"Easy","name":"Handwritten E09","difficulty":"Easy","minimum":26,"pieces":[{"type":"goal","x":0,"y":2},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":1,"y":0},{"type":"vertical","x":2,"y":1},{"type":"vertical","x":3,"y":1},{"type":"vertical","x":2,"y":3},{"type":"small","x":2,"y":0},{"type":"small","x":3,"y":0},{"type":"small","x":3,"y":3},{"type":"small","x":1,"y":4}]},{"id":"M01","group":"Medium","name":"Handwritten M01","difficulty":"Medium","minimum":87,"pieces":[{"type":"goal","x":2,"y":2},{"type":"horizontal","x":2,"y":1},{"type":"horizontal","x":1,"y":4},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":1,"y":0},{"type":"vertical","x":0,"y":3},{"type":"small","x":2,"y":0},{"type":"small","x":0,"y":2},{"type":"small","x":1,"y":2},{"type":"small","x":1,"y":3}]},{"id":"M02","group":"Medium","name":"Handwritten M02","difficulty":"Medium","minimum":88,"pieces":[{"type":"goal","x":2,"y":0},{"type":"horizontal","x":0,"y":1},{"type":"horizontal","x":1,"y":2},{"type":"horizontal","x":2,"y":3},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":0,"y":2},{"type":"small","x":3,"y":2},{"type":"small","x":1,"y":3},{"type":"small","x":0,"y":4},{"type":"small","x":1,"y":4}]},{"id":"M03","group":"Medium","name":"Handwritten M03","difficulty":"Medium","minimum":93,"pieces":[{"type":"goal","x":0,"y":0},{"type":"horizontal","x":0,"y":3},{"type":"horizontal","x":2,"y":3},{"type":"horizontal","x":0,"y":4},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":3,"y":0},{"type":"small","x":2,"y":0},{"type":"small","x":2,"y":1},{"type":"small","x":0,"y":2},{"type":"small","x":1,"y":2}]},{"id":"M04","group":"Medium","name":"Handwritten M04","difficulty":"Medium","minimum":93,"pieces":[{"type":"goal","x":1,"y":1},{"type":"horizontal","x":2,"y":0},{"type":"horizontal","x":0,"y":3},{"type":"horizontal","x":0,"y":4},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":0,"y":0},{"type":"small","x":1,"y":0},{"type":"small","x":3,"y":2},{"type":"small","x":2,"y":3},{"type":"small","x":3,"y":3}]},{"id":"M05","group":"Medium","name":"Handwritten M05","difficulty":"Medium","minimum":96,"pieces":[{"type":"goal","x":1,"y":0},{"type":"horizontal","x":2,"y":2},{"type":"horizontal","x":0,"y":3},{"type":"horizontal","x":2,"y":3},{"type":"horizontal","x":1,"y":4},{"type":"vertical","x":0,"y":1},{"type":"small","x":0,"y":0},{"type":"small","x":3,"y":0},{"type":"small","x":3,"y":1},{"type":"small","x":1,"y":2}]},{"id":"M06","group":"Medium","name":"Handwritten M06","difficulty":"Medium","minimum":95,"pieces":[{"type":"goal","x":1,"y":2},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":1,"y":0},{"type":"vertical","x":2,"y":0},{"type":"vertical","x":0,"y":1},{"type":"vertical","x":0,"y":3},{"type":"small","x":3,"y":0},{"type":"small","x":3,"y":1},{"type":"small","x":3,"y":2},{"type":"small","x":1,"y":4}]},{"id":"M07","group":"Medium","name":"Handwritten M07","difficulty":"Medium","minimum":90,"pieces":[{"type":"goal","x":2,"y":1},{"type":"horizontal","x":2,"y":0},{"type":"horizontal","x":2,"y":3},{"type":"vertical","x":0,"y":0},{"type":"vertical","x":1,"y":0},{"type":"vertical","x":1,"y":2},{"type":"small","x":0,"y":2},{"type":"small","x":0,"y":3},{"type":"small","x":1,"y":4},{"type":"small","x":2,"y":4}]},{"id":"M08","group":"Medium","name":"Handwritten M08","difficulty":"Medium","minimum":89,"pieces":[{"type":"goal","x":0,"y":0},{"type":"horizontal","x":2,"y":2},{"type":"vertical","x":3,"y":0},{"type":"vertical","x":0,"y":2},{"type":"vertical","x":1,"y":2},{"type":"vertical","x":3,"y":3},{"type":"small","x":2,"y":1},{"type":"small","x":0,"y":4},{"type":"small","x":1,"y":4},{"type":"small","x":2,"y":4}]},{"id":"M09","group":"Medium","name":"Handwritten M09","difficulty":"Medium","minimum":93,"pieces":[{"type":"goal","x":2,"y":1},{"type":"horizontal","x":1,"y":0},{"type":"horizontal","x":0,"y":3},{"type":"horizontal","x":0,"y":4},{"type":"horizontal","x":2,"y":4},{"type":"vertical","x":0,"y":1},{"type":"small","x":0,"y":0},{"type":"small","x":3,"y":0},{"type":"small","x":1,"y":1},{"type":"small","x":2,"y":3}]}];
const ORIGINAL_HARD_LEVELS=[{"name":"The Gauntlet","difficulty":"Hard","minimum":60,"positions":[2,8,0,10,12,13,1,5,15,18]},{"name":"Crosscurrent","difficulty":"Hard","minimum":65,"positions":[2,8,0,12,13,15,1,5,14,18]},{"name":"Narrow Escape","difficulty":"Hard","minimum":70,"positions":[2,10,0,9,12,15,1,8,14,18]},{"name":"Deadlock Breaker","difficulty":"Hard","minimum":75,"positions":[2,10,4,5,13,15,0,12,14,18]},{"name":"Pressure Grid","difficulty":"Expert","minimum":80,"positions":[2,10,1,4,9,15,0,12,16,18]},{"name":"The Switchback","difficulty":"Expert","minimum":85,"positions":[2,9,1,4,11,14,0,12,16,19]},{"name":"The Iron Maze","difficulty":"Expert","minimum":90,"positions":[2,9,1,11,12,14,4,13,17,19]},{"name":"Critical Shift","difficulty":"Expert","minimum":95,"positions":[1,9,0,3,12,14,8,13,17,19]},{"name":"Double Bind","difficulty":"Expert","minimum":100,"positions":[1,10,0,3,8,14,9,16,17,19]},{"name":"Endgame","difficulty":"Master","minimum":104,"positions":[1,9,0,3,8,14,11,13,16,17]},{"name":"Grandmaster","difficulty":"Master","minimum":110,"positions":[1,8,0,3,12,15,10,13,17,18]},{"name":"The Classic","difficulty":"Master","minimum":116,"positions":[1,9,0,3,8,11,13,14,16,19]}];
const OLD_SHAPES=[SHAPE.goal,SHAPE.horizontal,...Array(4).fill(SHAPE.vertical),...Array(4).fill(SHAPE.small)];
const LEVELS=[...HANDWRITTEN_LEVELS,...ORIGINAL_HARD_LEVELS.map((l,i)=>({id:'H'+String(i+1).padStart(2,'0'),group:'Hard',name:l.name,difficulty:l.difficulty,minimum:l.minimum,pieces:l.positions.map((p,j)=>({type:OLD_SHAPES[j].type,x:p%4,y:Math.floor(p/4)}))}))];
const BY_GROUP=Object.fromEntries(GROUP_ORDER.map(group=>[group,LEVELS.filter(l=>l.group===group)]));
const $=id=>document.getElementById(id);
const DIRECTION={up:[0,-1,'↑'],down:[0,1,'↓'],left:[-1,0,'←'],right:[1,0,'→']};
const STORAGE_KEY='klotski-puzzle-progress-v6', PREVIOUS_STORAGE_KEY='klotski-puzzle-progress-v5', OLD_STORAGE_KEY='klotski-hard-mode-progress-v2', MAX_HINTS_PER_LEVEL=4;
const board=$('board');
let saved=loadProgress(), selectedGroup=saved.activeGroup, index=resolveStartIndex();
let blocks=[], selected=0, moves=0, history=[], completed=false, hintId=null;
let exitEpoch=0, exitGhost=null, exitAnimation=null, exitFallback=null, exitAnimating=false;
function clampInt(v,min,max,otherwise=min){return Number.isInteger(v)?Math.max(min,Math.min(max,v)):otherwise;}
function firstIncompleteIndex(){
 let i=0;while(i<LEVELS.length&&saved.best[LEVELS[i].id]!=null)i++;return i;
}
function isUnlocked(n){
 if(n<0||n>=LEVELS.length)return false;
 const level=LEVELS[n],ordinal=BY_GROUP[level.group].indexOf(level);
 return n<=firstIncompleteIndex()||ordinal<(saved.legacyAccess[level.group]||0)||saved.best[level.id]!=null;
}
function loadProgress(){
 const base={version:6,activeGroup:'Easy',currentLevelId:'E01',legacyAccess:{Easy:0,Medium:0,Hard:0},best:{},hintsUsed:{}};
 try{
  const v6=JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(v6&&v6.version===6){
   if(GROUP_ORDER.includes(v6.activeGroup))base.activeGroup=v6.activeGroup;
   if(LEVELS.some(l=>l.id===v6.currentLevelId))base.currentLevelId=v6.currentLevelId;
   for(const g of GROUP_ORDER)base.legacyAccess[g]=clampInt(v6.legacyAccess?.[g],0,BY_GROUP[g].length);
   for(const l of LEVELS){
    const b=v6.best?.[l.id],h=v6.hintsUsed?.[l.id];
    if(Number.isInteger(b)&&b>0)base.best[l.id]=b;
    if(Number.isInteger(h)&&h>0)base.hintsUsed[l.id]=clampInt(h,0,4);
   }
   return base;
  }
  const v5=JSON.parse(localStorage.getItem(PREVIOUS_STORAGE_KEY));
  if(v5&&v5.version===5){
   for(const g of GROUP_ORDER){
    const unlocked=clampInt(v5.unlocked?.[g],1,BY_GROUP[g].length);
    // Keep previously advanced group access without giving brand-new accounts free skips.
    base.legacyAccess[g]=unlocked>1?unlocked:0;
   }
   for(const l of LEVELS){
    const b=v5.best?.[l.id],h=v5.hintsUsed?.[l.id];
    if(Number.isInteger(b)&&b>0)base.best[l.id]=b;
    if(Number.isInteger(h)&&h>0)base.hintsUsed[l.id]=clampInt(h,0,4);
   }
   return base;
  }
  const old=JSON.parse(localStorage.getItem(OLD_STORAGE_KEY));
  if(old&&typeof old==='object'){
   const u=clampInt(Number(old.unlocked),1,12);
   base.legacyAccess.Hard=u>1?u:0;
   for(let i=0;i<12;i++){
    const id='H'+String(i+1).padStart(2,'0');
    if(Number.isInteger(old.best?.[i])&&old.best[i]>0)base.best[id]=old.best[i];
    if(Number.isInteger(old.hintsUsed?.[i])&&old.hintsUsed[i]>0)base.hintsUsed[id]=clampInt(old.hintsUsed[i],0,4);
   }
  }
 }catch{/* Storage may be unavailable or contain invalid data */}
 return base;
}
function storeProgress(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));}catch{/* Private mode */}}
function resolveStartIndex(){
 const preferred=LEVELS.findIndex(l=>l.id===saved.currentLevelId);
 if(preferred>=0&&isUnlocked(preferred)&&saved.best[LEVELS[preferred].id]==null)return preferred;
 const frontier=firstIncompleteIndex();
 if(frontier<LEVELS.length)return frontier;
 if(preferred>=0&&isUnlocked(preferred))return preferred;
 return LEVELS.length-1;
}
function hintsRemaining(level=LEVELS[index]){return Math.max(0,MAX_HINTS_PER_LEVEL-(saved.hintsUsed[level.id]||0));}
function levelIndexWithinGroup(n){return BY_GROUP[LEVELS[n].group].findIndex(l=>l.id===LEVELS[n].id);}
function stopExitAnimation(){
 exitEpoch++;
 if(exitFallback!==null){clearTimeout(exitFallback);exitFallback=null;}
 if(exitAnimation){exitAnimation.cancel();exitAnimation=null;}
 if(exitGhost){exitGhost.remove();exitGhost=null;}
 $('board-outer').classList.remove('escaping');exitAnimating=false;
}
function initializeLevel(n){
 if(n<0||n>=LEVELS.length||!isUnlocked(n))return;
 stopExitAnimation();
 const l=LEVELS[n];index=n;selectedGroup=l.group;
 saved.activeGroup=l.group;saved.currentLevelId=l.id;storeProgress();
 blocks=l.pieces.map((p,id)=>({id,x:p.x,y:p.y,...SHAPE[p.type]}));
 selected=0;moves=0;history=[];completed=false;hintId=null;
 setMessage('Slide blocks to guide the red square through the bottom exit.');render();
}
function chooseGroup(group){
 // V8: browsing a group inside the level popup does not alter the current puzzle.
 if(!BY_GROUP[group])return;
 selectedGroup=group;
 render();
}
function setMessage(message,success=false){const el=$('message');el.innerHTML=message;el.classList.toggle('success',success);}
function render(){
 const lvl=LEVELS[index],ordinal=levelIndexWithinGroup(index),visible=BY_GROUP[selectedGroup];
 $('level-number').textContent=`LEVEL ${index+1} / ${LEVELS.length}  ·  ${selectedGroup.toUpperCase()} ${String(ordinal+1).padStart(2,'0')}`;
 $('level-name').textContent=lvl.name.startsWith('Handwritten')?`${lvl.group} Challenge ${ordinal+1}`:lvl.name;$('difficulty').textContent=lvl.difficulty;
 $('move-count').textContent=moves;$('target-count').textContent=lvl.minimum;$('best-count').textContent=saved.best[lvl.id]??'—';
 $('progress-chip').textContent=`◆ ${Object.keys(saved.best).length} / ${LEVELS.length} completed`;
 $('completed-count').textContent=`${visible.filter(l=>saved.best[l.id]!=null).length} / ${visible.length} solved`;
 document.querySelectorAll('[data-group]').forEach(btn=>{
  const group=btn.dataset.group;btn.classList.toggle('active',group===selectedGroup);
  btn.setAttribute('aria-pressed',String(group===selectedGroup));
  const canEnter=BY_GROUP[group].some(l=>isUnlocked(LEVELS.indexOf(l)));
  btn.disabled=false;
  btn.querySelector('.group-count').textContent=canEnter?`${BY_GROUP[group].filter(l=>saved.best[l.id]!=null).length}/${BY_GROUP[group].length} solved`:'Locked';
 });
 board.innerHTML='';
 blocks.forEach(b=>{
  const tile=document.createElement('button');tile.type='button';
  tile.className=`tile ${b.type}${selected===b.id?' selected':''}${hintId===b.id?' hinted':''}${completed&&b.type==='goal'?' exit-complete':''}`;
  tile.style.left=`calc(${b.x*25}% + var(--gap))`;tile.style.top=`calc(${b.y*20}% + var(--gap))`;
  tile.style.width=`calc(${b.w*25}% - var(--gap) * 2)`;tile.style.height=`calc(${b.h*20}% - var(--gap) * 2)`;
  tile.setAttribute('aria-label',`${b.type==='goal'?'Red target':b.type+' block '+(b.id+1)}, column ${b.x+1}, row ${b.y+1}`);
  tile.setAttribute('aria-pressed',String(selected===b.id));
  tile.innerHTML=b.type==='goal'?'<span class="mark">◆</span><span class="tilelabel">EXIT</span>':b.type==='horizontal'?'<span class="mark">═</span>':b.type==='vertical'?'<span class="mark">▯</span>':'<span class="mark">•</span>';
  let pointerStart=null;
  tile.addEventListener('pointerdown',e=>{if(completed||exitAnimating)return;pointerStart={x:e.clientX,y:e.clientY};try{tile.setPointerCapture(e.pointerId);}catch{}});
  tile.addEventListener('pointerup',e=>{
   if(completed||exitAnimating)return;
   let dx=0,dy=0;if(pointerStart){dx=e.clientX-pointerStart.x;dy=e.clientY-pointerStart.y;pointerStart=null;}
   select(b.id);
   if(Math.max(Math.abs(dx),Math.abs(dy))>19){const dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');moveSelected(dir);}
  });
  tile.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter')select(b.id);});
  board.append(tile);
 });
 const grid=$('levels');grid.innerHTML='';
 visible.forEach((l,j)=>{
  const n=LEVELS.indexOf(l),locked=!isUnlocked(n);
  const btn=document.createElement('button');btn.type='button';
  btn.className=`level-btn${n===index?' active':''}${locked?' locked':''}${saved.best[l.id]!=null?' won':''}`;
  btn.innerHTML=`${locked?'🔒':j+1}<span>${saved.best[l.id]!=null?'✓ Solved':locked?'Locked':l.minimum+' optimal'}</span>`;
  btn.disabled=locked||exitAnimating;btn.setAttribute('aria-label',locked?`${selectedGroup} level ${j+1} locked`:`${selectedGroup} level ${j+1}: ${l.name}`);
  btn.addEventListener('click',()=>{initializeLevel(n);window.dispatchEvent(new CustomEvent('klotski:level-selected',{detail:{index:n}}));});grid.append(btn);
 });
 $('undo').disabled=history.length===0||exitAnimating;
 $('restart').disabled=exitAnimating;
 const left=hintsRemaining();$('hint').textContent=`✧ Hint (${left}/${MAX_HINTS_PER_LEVEL})`;
 $('hint').disabled=completed||left===0||exitAnimating;
 $('hint').setAttribute('aria-label',`Hint: ${left} of ${MAX_HINTS_PER_LEVEL} remaining for this level`);
 // Version 9: completion is shown on a dedicated, responsive screen.
 $('return-home').disabled=exitAnimating;
}
function scrollToBoard(){
 // Full-viewport gameplay has no document scrolling.
 $('level-name').focus({preventScroll:true});
}
function select(id){if(completed||exitAnimating)return;selected=id;hintId=null;board.querySelectorAll('.tile').forEach((tile,i)=>{tile.classList.toggle('selected',i===id);tile.classList.remove('hinted');tile.setAttribute('aria-pressed',String(i===id));});}
function canMove(id,dx,dy){const b=blocks[id],nx=b.x+dx,ny=b.y+dy;if(nx<0||ny<0||nx+b.w>4||ny+b.h>5)return false;return !blocks.some(o=>o.id!==id&&nx<o.x+o.w&&nx+b.w>o.x&&ny<o.y+o.h&&ny+b.h>o.y);}
function finishExit(epoch){
 if(epoch!==exitEpoch)return;
 if(exitFallback!==null){clearTimeout(exitFallback);exitFallback=null;}
 if(exitGhost){exitGhost.remove();exitGhost=null;}
 exitAnimation=null;exitAnimating=false;$('board-outer').classList.remove('escaping');
 const l=LEVELS[index];
 setMessage(`<b>Level complete!</b> The red block escaped in ${moves} moves. ${moves===l.minimum?'Perfect shortest solution!':'Shortest: '+l.minimum+' moves.'}`,true);
 render();
 // Send an immutable snapshot only after the exit animation has finished.
 window.dispatchEvent(new CustomEvent('klotski:level-complete',{detail:{index,levelId:l.id,group:l.group,ordinal:levelIndexWithinGroup(index)+1,total:LEVELS.length,moves,optimal:l.minimum,best:saved.best[l.id],nextIndex:index+1<LEVELS.length?index+1:null}}));
}
function playExitAnimation(previousPosition){
 const epoch=++exitEpoch,outer=$('board-outer'),goal=board.querySelector('.tile.goal');
 if(!goal||window.matchMedia('(prefers-reduced-motion: reduce)').matches){finishExit(epoch);return;}
 const rect=goal.getBoundingClientRect(),outerRect=outer.getBoundingClientRect();
 const ghost=goal.cloneNode(true);ghost.className='tile goal exit-ghost';ghost.disabled=true;
 ghost.setAttribute('aria-hidden','true');ghost.removeAttribute('aria-label');ghost.removeAttribute('aria-pressed');
 ghost.style.left=`${rect.left-outerRect.left}px`;ghost.style.top=`${rect.top-outerRect.top}px`;
 ghost.style.width=`${rect.width}px`;ghost.style.height=`${rect.height}px`;
 outer.append(ghost);exitGhost=ghost;outer.classList.add('escaping');
 // The last legal move first slides into the exit; then the entire red block leaves the board.
 const cellW=board.getBoundingClientRect().width/4,cellH=board.getBoundingClientRect().height/5;
 const fromX=(previousPosition[0]-blocks[0].x)*cellW,fromY=(previousPosition[1]-blocks[0].y)*cellH;
 const travel=rect.height+42;
 if(typeof ghost.animate!=='function'){finishExit(epoch);return;}
 exitAnimation=ghost.animate([
  {transform:`translate(${fromX}px,${fromY}px)`,opacity:1,offset:0},
  {transform:'translate(0px,0px)',opacity:1,offset:.22},
  {transform:'translate(0px,0px)',opacity:1,offset:.3},
  {transform:`translate(0px,${travel*.65}px)`,opacity:1,offset:.75},
  {transform:`translate(0px,${travel}px) scale(.92)`,opacity:0,offset:1}
 ],{duration:1080,easing:'cubic-bezier(.22,.68,.27,1)',fill:'forwards'});
 exitAnimation.finished.then(()=>finishExit(epoch)).catch(()=>{});
 exitFallback=window.setTimeout(()=>finishExit(epoch),1400);
}
function moveSelected(dir){
 if(completed||exitAnimating||selected==null)return;
 const [dx,dy]=DIRECTION[dir];
 if(!canMove(selected,dx,dy)){setMessage('That direction is blocked. Try moving another piece.');return;}
 history.push({positions:blocks.map(b=>[b.x,b.y]),selected,moves});blocks[selected].x+=dx;blocks[selected].y+=dy;moves++;hintId=null;
 if(blocks[0].x===1&&blocks[0].y===3){
  completed=true;exitAnimating=true;
  const l=LEVELS[index];
  if(saved.best[l.id]==null||moves<saved.best[l.id])saved.best[l.id]=moves;
  // Completing a level unlocks precisely the next level, including category boundaries.
  saved.currentLevelId=LEVELS[index+1]?.id??l.id;storeProgress();
  setMessage('<b>Exit reached!</b> Watch the red block slide out…');
  render();
  playExitAnimation(history[history.length-1].positions[0]);
 }else{setMessage(`Keep going. <b>${moves}</b> move${moves===1?'':'s'} made.`);render();}
}
function undo(){if(exitAnimating)return;const prev=history.pop();if(!prev)return;stopExitAnimation();blocks.forEach((b,i)=>{b.x=prev.positions[i][0];b.y=prev.positions[i][1];});selected=prev.selected;moves=prev.moves;completed=false;hintId=null;setMessage('Last move undone.');render();}
function groups(){const out=[];for(const t of ['horizontal','vertical','small']){const ids=blocks.filter(b=>b.type===t).map(b=>b.id);if(ids.length)out.push(ids);}return out;}
function canonicalPositions(){const state=blocks.map(b=>b.y*4+b.x);for(const ids of groups()){const sorted=ids.map(i=>state[i]).sort((a,b)=>a-b);ids.forEach((i,j)=>state[i]=sorted[j]);}return state;}
function findShortestNextMove(initial){
 const start=initial.join(',');if(initial[0]===13)return {remaining:0};
 const masks=blocks.map(shape=>Array.from({length:20},(_,p)=>{
  const x=p%4,y=Math.floor(p/4);if(x+shape.w>4||y+shape.h>5)return 0;
  let mask=0;for(let yy=0;yy<shape.h;yy++)for(let xx=0;xx<shape.w;xx++)mask|=1<<((y+yy)*4+x+xx);return mask;
 }));
 const equalGroups=groups(),seen=new Map([[start,null]]),queue=[initial];let head=0,end=null;
 while(head<queue.length){
  const state=queue[head++];let full=0;
  for(let i=0;i<state.length;i++)full|=masks[i][state[i]];
  for(let i=0;i<state.length;i++){
   const p=state[i],x=p%4,y=Math.floor(p/4),rest=full^masks[i][p];
   for(const [name,[dx,dy]] of Object.entries(DIRECTION)){
    const nx=x+dx,ny=y+dy;if(nx<0||nx>=4||ny<0||ny>=5)continue;
    const np=ny*4+nx,mask=masks[i][np];if(!mask||(mask&rest))continue;
    const next=state.slice();next[i]=np;
    for(const ids of equalGroups){const sorted=ids.map(i=>next[i]).sort((a,b)=>a-b);ids.forEach((i,j)=>next[i]=sorted[j]);}
    const k=next.join(',');if(seen.has(k))continue;
    seen.set(k,{from:state.join(','),move:{pos:p,direction:name,type:blocks[i].type}});
    if(next[0]===13){end=k;break;}queue.push(next);
   }
   if(end)break;
  }
  if(end)break;
 }
 if(!end)return null;
 let steps=0,first=null,k=end;while(k!==start){const info=seen.get(k);first=info.move;k=info.from;steps++;}
 return {...first,remaining:steps};
}
function hint(){
 if(completed)return;if(hintsRemaining()===0){setMessage('No hints left for this level. You can still solve it without hints.');return;}
 const answer=findShortestNextMove(canonicalPositions());if(!answer?.direction){setMessage('No solution could be found from this position.');return;}
 const b=blocks.find(p=>p.y*4+p.x===answer.pos&&p.type===answer.type);if(!b){setMessage('Hint unavailable for this position.');return;}
 const id=LEVELS[index].id;saved.hintsUsed[id]=(saved.hintsUsed[id]||0)+1;storeProgress();
 selected=b.id;hintId=b.id;const dir=DIRECTION[answer.direction][2];
 const friendly=b.type==='goal'?'the large red block':b.type==='horizontal'?'the green block':b.type==='vertical'?'the blue block':'the yellow block';
 setMessage(`<b>Hint:</b> Move ${friendly} ${dir}. <b>${answer.remaining}</b> minimum moves remaining. <b>${hintsRemaining()} of ${MAX_HINTS_PER_LEVEL} hints left.</b>`);render();
}
document.querySelectorAll('[data-group]').forEach(b=>b.addEventListener('click',()=>chooseGroup(b.dataset.group)));
$('undo').addEventListener('click',undo);$('restart').addEventListener('click',()=>{if(!exitAnimating)initializeLevel(index);});$('hint').addEventListener('click',hint);
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||$('game-screen').hidden)return;if(['INPUT','TEXTAREA'].includes(e.target.tagName))return;const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};if(keys[e.key]){e.preventDefault();moveSelected(keys[e.key]);}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo();}});
initializeLevel(index);
