/*
 * EXISTENCE — JOUR XVIII
 * 19 décembre 2026 à 00:00 heure de Paris = 18 décembre 23:00 UTC.
 * Le code affiché sera associé à des rediffusions de séances de JDR et à
 * des timecodes précis. Aucun identifiant de vidéo ni timecode n'a encore été
 * fourni : les quatre lignes sont des MAQUETTES et non des indices réels.
 * Les joueurs doivent consulter les rediffusions hors du site.
 * Prévisualisation : ?apercu=19decembre
 */
const ARCHIVE_SIGNAL_AT=Date.parse('2026-12-18T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const panel=document.getElementById('archive-signal');
 const preview=new URLSearchParams(location.search).get('apercu')==='19decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(panel)panel.hidden=!(preview||Date.now()>=ARCHIVE_SIGNAL_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
