/*
 * PROJET EXISTENCE — JOUR XIII / DE SITTER
 *
 * Le 14 décembre 2026 à 00:00, heure de Paris,
 * les phrases sont dévoilées dans le DÉSORDRE.
 *
 * L'auteur fournit le texte exact de De Sitter :
 * chaque phrase doit commencer par une lettre choisie pour le mot secret.
 * La cohérence temporelle doit permettre aux joueurs de reconstruire
 * UN SEUL ordre chronologique ou causal. En lisant les premières lettres
 * dans cet ordre, ils obtiennent le mot de la prochaine URL.
 *
 * Remplacer les six emplacements ci-dessous par les phrases définitives.
 * Le nombre de phrases peut être changé selon la longueur du mot final.
 * Le tableau est déjà mélangé en position, sans affichage d'indices d'ordre.
 *
 * ATTENTION : aucune réponse n'est codée ou vérifiée par le site.
 * Aperçu : ?apercu=14decembre
 */
const SHOW_DE_SITTER_AT = Date.parse('2026-12-13T23:00:00Z');
// IMPORTANT : liste dans l'ordre DÉSORDONNÉ visible par les joueurs.
// Éviter d'inscrire ici une clé révélant l'ordre véritable.
const DE_SITTER_SENTENCES = [
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]',
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]',
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]',
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]',
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]',
 '[PHRASE DE DE SITTER — FRAGMENT À DÉFINIR]'
];
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const mount=document.getElementById('sitter-manuscript');
 const lines=document.getElementById('sitter-sentences');
 const preview=new URLSearchParams(location.search).get('apercu')==='14decembre';
 if(card) card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 if(lines) for(const sentence of DE_SITTER_SENTENCES){
  const p=document.createElement('p');
  p.className='sitter-sentence';
  p.textContent=sentence;
  lines.appendChild(p);
 }
 function refresh(){if(mount)mount.hidden=!(preview||Date.now()>=SHOW_DE_SITTER_AT)}
 refresh();
 setInterval(refresh,1000);
 window.addEventListener('pageshow',refresh);
})();
