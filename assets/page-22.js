/*
 * EXISTENCE — JOUR XXII
 * Texte révélé le 23 décembre 2026 à 00:00 heure de Paris :
 * 22 décembre 2026 à 23:00 UTC.
 * Prévisualisation : ?apercu=23decembre
 *
 * MÉCANIQUE (ne pas écrire les réponses dans le HTML public) :
 * - identifier les personnages évoqués dans le texte et les cartes associées
 *   au Deck of Many Things / tarot, selon le jeu défini par l'auteur ;
 * - convertir le numéro de l'arcane majeur en lettre (A=1 ... Z=26) ;
 * - concaténer les lettres dans l'ordre de lecture du texte.
 *
 * ATTENTION : les arcanes majeurs classiques sont numérotés 0 à 21,
 * ce qui ne couvre pas toutes les lettres et fait intervenir le 0.
 * Ne retenir que des arcanes numérotés 1 à 21 pour A1Z26, ou définir
 * explicitement une autre convention avant de rédiger le mot final.
 * L'association Deck of Many Things <-> tarot dépend du deck du JDR :
 * elle DOIT être confirmée par l'auteur pour chaque personnage.
 * Les sept passages sont des placeholders, pas des indices réels.
 */
const ARCANA_TEXT_REVEAL_AT=Date.parse('2026-12-22T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const panel=document.getElementById('arcana-text-revelation');
 const preview=new URLSearchParams(location.search).get('apercu')==='23decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function refresh(){if(panel)panel.hidden=!(preview||Date.now()>=ARCANA_TEXT_REVEAL_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
