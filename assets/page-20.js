/*
 * EXISTENCE — JOUR XX
 * Dévoilement : 21 décembre 2026 à 00:00 heure de Paris,
 * soit 20 décembre 2026 à 23:00 UTC.
 * Prévisualisation : ?apercu=21decembre
 *
 * À compléter : coller l'URL exacte de la vidéo YouTube dans VIDEO_URL.
 * Aucun lien factice ne sera ouvert tant que l'URL n'est pas fournie.
 * Ne pas inscrire la solution ou les étapes cachées de l'énigme sur la page.
 */
const VIDEO_REVEAL_AT=Date.parse('2026-12-20T23:00:00Z');
const VIDEO_URL='';
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const panel=document.getElementById('video-revelation');
 const anchor=document.getElementById('archive-video-link');
 const pending=document.getElementById('archive-video-pending');
 const preview=new URLSearchParams(location.search).get('apercu')==='21decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 const isYoutubeUrl=()=>{
  try {
   const url=new URL(VIDEO_URL);
   const host=url.hostname.toLowerCase();
   return url.protocol==='https:'&&(host==='youtube.com'||host.endsWith('.youtube.com')||host==='youtu.be');
  } catch {return false;}
 };
 const validLink=isYoutubeUrl();
 if(anchor&&pending){
  anchor.hidden=!validLink;
  pending.hidden=validLink;
  if(validLink)anchor.href=VIDEO_URL;
 }
 function refresh(){if(panel)panel.hidden=!(preview||Date.now()>=VIDEO_REVEAL_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
