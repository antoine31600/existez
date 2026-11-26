/*
 * PROJET EXISTENCE — JOUR XI
 * Le masque devient visible le 12 décembre 2026 à 00:00, heure de Paris
 * soit le 11 décembre à 23:00 UTC.
 * Aperçu : ?apercu=12decembre
 *
 * À synchroniser avec le mail d'invitation :
 * - grille 5 x 5 (25 mots), dimensions physiques 120mm x 120mm
 * - un mot centré par case de 24mm x 24mm
 * - masque SVG imprimé à 100%, sans ajustement automatique
 * - sept fenêtres provisoires, coordonnées (ligne,colonne) à partir de 1 :
 *   (1,2) (2,4) (3,1) (3,5) (4,3) (5,2) (5,5).
 * - ordre de lecture des ouvertures : haut vers bas, gauche vers droite.
 *
 * Les mots et la phrase définitive ne sont pas encore connus.
 * Attention : le SVG est public dans GitHub Pages avant la date.
 */
const MASK_REVEAL_AT=Date.parse('2026-12-11T23:00:00Z');
(() => {
 'use strict';
 const node=document.getElementById('mask-discovery');
 const card=document.getElementById('arcana-button');
 const preview=new URLSearchParams(location.search).get('apercu')==='12decembre';
 if(card) card.addEventListener('click',()=>{
  const revealed=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',revealed);
  card.setAttribute('aria-pressed',String(revealed));
  card.setAttribute('aria-label',revealed?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(node)node.hidden=!(preview||Date.now()>=MASK_REVEAL_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
