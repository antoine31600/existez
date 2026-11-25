/*
 * PROJET EXISTENCE — JOUR 3
 * Prophétie et arcane sont des emplacements à compléter par le créateur.
 * Le repère apparaît le 4 décembre 2026 à 00:00 HEURE DE PARIS
 * (soit le 3 décembre 2026 à 23:00 UTC).
 *
 * RÉPONSE PROVISOIRE : ORIGINE.
 * Les joueurs lisent les coordonnées (x,y) : x augmente vers la droite,
 * y augmente vers le haut, et la croix est en (0,0).
 *
 * GitHub Pages est public : le puzzle et la solution sont visibles dans ce code
 * avant la date. L'horloge du navigateur n'est pas une sécurité.
 */
const REVEAL_COORDINATES_AT = Date.parse('2026-11-03T23:00:00Z');
const COORDINATES = [[2,3],[-3,-1],[4,0],[-1,4],[3,-3],[-2,2],[1,-4]];
const COORDINATE_WORD = 'ORIGINE';
(() => {
  'use strict';
  const button=document.getElementById('arcana-button');
  if(button){
    button.addEventListener('click',()=>{
      const revealed=button.classList.toggle('is-revealed');
      document.body.classList.toggle('arcana-awake',revealed);
      button.setAttribute('aria-pressed',String(revealed));
      button.setAttribute('aria-label',revealed?'Revoir le dos de la carte':'Retourner la carte de tarot');
    });
  }
  const puzzle=document.getElementById('coordinate-puzzle');
  const grid=document.getElementById('coordinate-grid');
  const sequence=document.getElementById('coordinate-sequence');
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const picks=new Map(COORDINATES.map(([x,y],i)=>[x+','+y,COORDINATE_WORD[i]]));
  function randomLetter(x,y){const index=(((x+7)*17+(y+11)*23+(x*y+50)*7)%alphabet.length+alphabet.length)%alphabet.length;return alphabet[index];}
  function build(){
    if(grid.childElementCount)return;
    const fragment=document.createDocumentFragment();
    for(let y=4;y>=-4;y--){
      for(let x=-4;x<=4;x++){
        const cell=document.createElement('span');
        cell.className='coordinate-cell'+(x===0&&y===0?' origin':'');
        cell.textContent=x===0&&y===0?'✕':(picks.get(x+','+y)||randomLetter(x,y));
        cell.setAttribute('aria-label',x===0&&y===0?'Origine (0,0)':undefined||'');
        fragment.appendChild(cell);
      }
    }
    grid.appendChild(fragment);
    for(const [x,y] of COORDINATES){const s=document.createElement('span');s.textContent='('+x+' ; '+y+')';sequence.appendChild(s);}
  }
  function update(){
    if(Date.now()>=REVEAL_COORDINATES_AT){build();puzzle.hidden=false;}
    else{puzzle.hidden=true;}
  }
  update();
  setInterval(update,1000);
  window.addEventListener('pageshow',update);
})();
