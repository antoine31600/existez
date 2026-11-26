/*
 * EXISTENCE — JOUR XXIII
 * Le 24 décembre 2026 à 00:00 heure de Paris = 23 décembre 23:00 UTC,
 * Auna adresse aux joueurs la question finale : « Qui l'a tué ? »
 *
 * SOLUTION RÉSERVÉE À L'AUTEUR : « NOUS ».
 * La participation et la connaissance des joueurs font exister les êtres
 * du JDR ; ils ont également donné existence à la mort d'Auna en l'apprenant.
 * Page finale : /existez/nous/ — à atteindre par déduction de l'URL,
 * SANS bouton de réponse ni validation automatique sur cette page.
 * L'auteur écrira personnellement le texte d'Auna.
 * Aperçu : ?apercu=24decembre
 */
const AUNA_QUESTION_AT=Date.parse('2026-12-23T23:00:00Z');
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const question=document.getElementById('auna-question');
 const preview=new URLSearchParams(location.search).get('apercu')==='24decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 function update(){if(question)question.hidden=!(preview||Date.now()>=AUNA_QUESTION_AT)}
 update();setInterval(update,1000);window.addEventListener('pageshow',update);
})();
