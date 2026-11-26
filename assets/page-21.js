/*
 * EXISTENCE — JOUR XXI
 * Révélation de la phrase : 22 décembre 2026 à 00:00 Paris
 * = 21 décembre 2026 à 23:00 UTC.
 * Maquette : les 21 symboles fixés dans chaque page au même système de
 * coordonnées, reliés dans l'ordre chronologique 01–08 / 09–16 / 17–21,
 * composent « MOT ». Remplacer les positions et la phrase avant la finale.
 * Prévisualisation : ?apercu=22decembre
 */
const MARK_ORDER_AT=Date.parse('2026-12-21T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const reveal=document.getElementById('mark-order-revelation');
 const preview=new URLSearchParams(location.search).get('apercu')==='22decembre';
 if(card)card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function update(){if(reveal)reveal.hidden=!(preview||Date.now()>=MARK_ORDER_AT)}
 update();setInterval(update,1000);window.addEventListener('pageshow',update);
})();
