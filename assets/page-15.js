/*
 * EXISTENCE — JOUR XV
 * Apparition des 6 couches : 16 décembre 2026 00:00 Paris
 * (15 décembre 23:00 UTC).
 * Les calques SVG sont transparents, de même taille : 160 mm x 80 mm.
 * Ils doivent être superposés SANS redimensionnement ni rotation.
 * Chaque image de la grille peut être téléchargée séparément par clic.
 *
 * PROTOTYPE : les calques possèdent des tracés utiles répartis entre les couches et des
 * parasites distincts. Une superposition avec opacité réduite est nécessaire
 * pour distinguer un mot de démonstration (NON définitif).
 * Le mot de la prochaine URL reste à fournir par l'auteur.
 * Ne pas coder le mot secret dans les noms des fichiers ni le texte HTML.
 *
 * Aperçu : ?apercu=16decembre
 */
const FRAGMENT_REVEAL_AT=Date.parse('2026-12-15T23:00:00Z');
const FRAGMENT_FILES=Array.from({length:6},(_,i)=>'../assets/archives/jour-15-calque-'+String(i+1).padStart(2,'0')+'.svg?v=3');
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
