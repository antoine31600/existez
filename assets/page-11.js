/* PROJET EXISTENCE — JOUR XI
 * Le masque est visible le 12 décembre 2026 à 00:00, heure de Paris.
 * Grille de l'invitation : 25 mots sur 5 × 5 cases de 24 mm.
 * Quatre ouvertures confirmées dans la grille communiquée par l'auteur :
 * SPECTRE (1,5) ; TEMPEL (2,1) ; ANIMAL (2,3) ; CORLAN (4,4).
 * Le cinquième mot demandé, DIRIGEANT, n'est pas présent dans les 25 mots.
 * Compléter le masque uniquement lorsque l'auteur aura corrigé la grille.
 * Le masque doit être imprimé à 100 %, sans ajustement.
 * Aperçu : ?apercu=12decembre
 */
const MASK_REVEAL_AT=Date.parse('2026-12-11T23:00:00Z');
(() => {
 'use strict';
 const node=document.getElementById('mask-discovery');
 const card=document.getElementById('arcana-button');
 const preview=new URLSearchParams(location.search).get('apercu')==='12decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(node)node.hidden=!(preview||Date.now()>=MASK_REVEAL_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
