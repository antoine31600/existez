/*
 * EXISTENCE — JOUR XVII / FAUSSE ÉQUATION UNICODE
 * Révélation le 18 décembre 2026 à 00:00, heure de Paris
 * = 17 décembre 2026 à 23:00 UTC.
 *
 * Les deux exemples sont réels : U+0036 => "6", U+0043 => "C".
 * La notation de l'énigme U+(44+45+53+54+49+4E) n'est pas une
 * expression Unicode standard : chaque bloc hexadécimal doit être
 * compris individuellement comme un code U+00XX.
 * Exemple remplacé par le code choisi par l'auteur. À remplacer par le mot définitif.
 * Aucun décodeur ni validateur n'est intégré au site.
 * Prévisualisation : ?apercu=18decembre
 */
const REVEAL_UNICODE_AT=Date.parse('2026-12-17T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const panel=document.getElementById('unicode-revelation');
 const preview=new URLSearchParams(location.search).get('apercu')==='18decembre';
 if(card)card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(panel)panel.hidden=!(preview||Date.now()>=REVEAL_UNICODE_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
