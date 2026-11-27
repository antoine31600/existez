/* Jour XV : six calques transparents, apparition le 16 décembre, apercu=16decembre. Les tracés utiles sont répartis dans les images. */
const FRAGMENT_REVEAL_AT=Date.parse('2026-12-15T23:00:00Z');
const FRAGMENT_FILES=Array.from({length:6},(_,i)=>'../assets/archives/jour-15-calque-'+String(i+1).padStart(2,'0')+'.svg?v=4');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const gallery=document.getElementById('fragment-gallery');
 const grid=document.getElementById('fragment-grid');
 const preview=new URLSearchParams(location.search).get('apercu')==='16decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 if(grid)FRAGMENT_FILES.forEach((src,i)=>{
  const a=document.createElement('a');
  a.className='fragment-tile';
  a.href=src;
  a.download='calque-'+String(i+1).padStart(2,'0')+'.svg';
  a.setAttribute('aria-label','Récupérer le fragment '+(i+1));
  const img=document.createElement('img');
  img.src=src;
  img.alt='Fragment graphique '+(i+1);
  img.loading='lazy';
  a.appendChild(img);
  grid.appendChild(a);
 });
 function refresh(){if(gallery)gallery.hidden=!(preview||Date.now()>=FRAGMENT_REVEAL_AT)}
 refresh();
 setInterval(refresh,1000);
 window.addEventListener('pageshow',refresh);
})();
