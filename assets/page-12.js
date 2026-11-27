/*
 * PROJET EXISTENCE — JOUR XII
 * Une mélodie joue dès l'ouverture, si la politique du navigateur l'autorise.
 * Fichier audio à fournir : assets/audio/jour-12-melodie.wav
 * Au 13 décembre 2026 00:00 à Paris (12 décembre 23:00 UTC),
 * cinq lignes apparaissent, avec une lettre associée à chaque hauteur musicale.
 *
 * Une mélodie instrumentale provisoire et la portée correspondante sont fournies.
 * L'auteur peut remplacer le morceau par sa propre composition.
 * Les lettres A à I ci-dessous ne sont qu'un exemple à remplacer.
 *
 * La portée suit la clef de sol standard (sans la dessiner) :
 * lignes de bas en haut E4 G4 B4 D5 F5 ; espaces F4 A4 C5 E5.
 * Les notes choisies pour la mélodie doivent donc correspondre aux hauteurs
 * du tableau LETTERS_BY_PITCH. Éviter deux lettres pour une même hauteur
 * sauf si un deuxième indice permet de les distinguer.
 *
 * Test : ?apercu=13decembre
 * Aucun décodeur, tracé ou note visible avant la date.
 */
const REVEAL_STAFF_AT = Date.parse('2026-12-12T23:00:00Z');
const MELODY_FILE = '../assets/audio/jour-12-melodie.wav';
const LETTERS_BY_PITCH = [
  {pitch:'F5',letter:'O',x:130,y:64},
  {pitch:'E5',letter:'P',x:217,y:80},
  {pitch:'D5',letter:'I',x:304,y:96},
  {pitch:'C5',letter:'L',x:391,y:112},
  {pitch:'B4',letter:'N',x:478,y:128},
  {pitch:'A4',letter:'Q',x:565,y:144},
  {pitch:'G4',letter:'S',x:652,y:160},
  {pitch:'F4',letter:'T',x:739,y:176},
  {pitch:'E4',letter:'U',x:826,y:192}
];
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const mount=document.getElementById('staff-mount');
 const svg=document.getElementById('staff-svg');
 const audio=document.getElementById('melody-audio');
 const preview=new URLSearchParams(location.search).get('apercu')==='13decembre';
 if(card)card.addEventListener('click',()=>{
  const shown=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 if(svg){
  const NS='http://www.w3.org/2000/svg';
  for(const y of [64,96,128,160,192]){
   const line=document.createElementNS(NS,'line');
   line.setAttribute('x1','55');line.setAttribute('x2','905');
   line.setAttribute('y1',y);line.setAttribute('y2',y);
   line.setAttribute('class','staff-line');svg.appendChild(line);
  }
  for(const item of LETTERS_BY_PITCH){
   const text=document.createElementNS(NS,'text');
   text.setAttribute('x',item.x);text.setAttribute('y',item.y);
   text.setAttribute('class','staff-letter');text.textContent=item.letter;
   svg.appendChild(text);
  }
 }
 function refresh(){if(mount)mount.hidden=!(preview||Date.now()>=REVEAL_STAFF_AT)}
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
 if(audio){
  audio.src=MELODY_FILE;
  let trying=false;
  async function play(){
   if(trying||!audio.paused)return;
   trying=true;
   try{await audio.play()}catch(e){/* Autoplay interdit ou fichier pas encore fourni. */}
   finally{trying=false}
  }
  play();
  document.addEventListener('pointerdown',play,{passive:true});
  document.addEventListener('keydown',play);
  window.addEventListener('pageshow',play);
 }
})();
