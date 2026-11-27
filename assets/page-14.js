/*
 * EXISTENCE — JOUR XIV : AUDIO À DEUX NIVEAUX
 * Fichier : ../assets/audio/jour-14-spectrogramme-morse.wav
 * Prototype : instruction lisible au spectrogramme, pauses Morse à écouter.
 * Pour l'audio FINAL : sons répétitifs musicaux, silence court/long très net,
 * séparation entre lettres évidente, Morse décodable à l'oreille,
 * sans devoir mesurer chaque pause avec un logiciel.
 * Les navigateurs peuvent empêcher l'autoplay sonore jusqu'à interaction.
 * Le mot de test et l'instruction NE SONT PAS affichés sur la page.
 * L'audio ne comporte volontairement aucun contrôle visible.
 */
const MORSE_REVEAL_AT=Date.parse('2026-12-14T23:00:00Z'); // 15 décembre minuit, Paris.
const MORSE_AUDIO='../assets/audio/jour-14-spectrogramme-morse.wav';
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
 const preview=new URLSearchParams(location.search).get('apercu')==='15decembre';
 let started=false;
 let attempting=false;
 function unlocked(){return preview||Date.now()>=MORSE_REVEAL_AT}
 function refresh(){
  if(!unlocked()){
   if(started){audio.pause();audio.removeAttribute('src');audio.load();started=false}
   return;
  }
  if(!started){started=true;audio.src=MORSE_AUDIO;audio.load();play()}
 }
 async function play(){
  if(!unlocked()||!started||attempting||!audio.paused)return;
  attempting=true;
  try{await audio.play()}catch(error){/* Lecture bloquée avant interaction, ou fichier manquant. */}
  finally{attempting=false}
 }
 refresh();setInterval(refresh,1000);
 document.addEventListener('pointerdown',play,{passive:true});
 document.addEventListener('keydown',play);
 window.addEventListener('pageshow',()=>{refresh();play()});
})();
