/*
 * EXISTENCE — JOUR XVI
 * 17 décembre 2026 à 00:00, heure de Paris = 16 décembre 23:00 UTC.
 * Affichage de la formule de dés 1d8+4 sous la prophétie et le tarot.
 * Pas de lancer automatique ou manuel sur la page ; les joueurs utilisent
 * leurs propres dés pour poursuivre l'enquête dans les fiches personnages.
 * L'auteur n'a pas encore fixé la fiche spéciale ni le mot secret.
 * Aperçu : ?apercu=17decembre
 */
const SHOW_DICE_AT=Date.parse('2026-12-16T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const result=document.getElementById('dice-revelation');
 const preview=new URLSearchParams(location.search).get('apercu')==='17decembre';
 if(card)card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(result)result.hidden=!(preview||Date.now()>=SHOW_DICE_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
