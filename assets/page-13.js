/*
 * EXISTENCE — JOUR XIII : AUDIO À DEUX NIVEAUX
 * Fichier : ../assets/audio/jour-13-spectrogramme-morse.wav
 * Prototype : instruction lisible au spectrogramme, pauses Morse à écouter.
 * Les navigateurs peuvent empêcher l'autoplay sonore jusqu'à interaction.
 * Le mot de test et l'instruction NE SONT PAS affichés sur la page.
 * L'audio ne comporte volontairement aucun contrôle visible.
 */
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const audio=document.getElementById('de-sitter-audio');
 if(card)card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 if(!audio)return;
 let attempting=false;
 async function play(){
  if(attempting||!audio.paused)return;
  attempting=true;
  try{await audio.play()}catch(error){/* Lecture bloquée avant interaction, ou fichier manquant. */}
  finally{attempting=false}
 }
 play();
 document.addEventListener('pointerdown',play,{passive:true});
 document.addEventListener('keydown',play);
 window.addEventListener('pageshow',play);
})();
