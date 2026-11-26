/*
 * PROJET EXISTENCE — JOUR IX
 * Déblocage : 10 décembre 2026 00:00 à Paris = 9 décembre 23:00 UTC.
 * Avant cette date : toutes les étoiles sans chiffres, sans chronologie.
 * Après : TOUTES les étoiles de premier plan sont numérotées,
 * y compris les leurres, sans distinction visuelle.
 *
 * À COMPLÉTER PAR L'AUTEUR :
 * - Remplacer [ÉVÉNEMENT ...] pour les 40 numéros, y compris ceux inventés.
 * - Les événements associés aux étoiles du tracé doivent être ordonnables
 *   chronologiquement ; ceux des leurres ne doivent pas perturber la logique.
 * - Les positions correspondent à six formes de lettres, sans lignes affichées.
 * - AUCUNE interaction de dessin ou de connexion n'est intégrée.
 *
 * Aperçu : ?apercu=10decembre
 * Le dépôt public expose nécessairement ces positions et données.
 */
const REVEAL_SKY_AT = Date.parse('2026-12-09T23:00:00Z');

// Les suites de points constituent six glyphes, séparés par des espaces.
// Les coordonnées (x,y) représentent des pourcentages du ciel.
// Identifiants mélangés : aucun numéro ne reflète l'ordre chronologique.
// L'auteur fournit les événements, le site ne fournit pas leur solution.
const STAR_PATHS = [
  [[16,28],[7,28],[7,48],[16,48],[16,70],[7,70]],
  [[31,28],[22,28],[22,48],[30,48],[22,69],[31,69]],
  [[46,28],[37,28],[37,69],[46,69]],
  [[52,70],[52,28],[61,28],[62,48],[52,48],[63,70]],
  [[78,28],[69,28],[69,48],[77,48],[69,69],[78,69]],
  [[84,28],[96,28],[90,28],[90,69]]
];
const DECO_STARS = [[4,14],[20,15],[35,11],[50,10],[65,13],[82,13],[97,78],[3,82],[35,86],[61,87]];
const STAR_IDS = [2,20,9,39,25,36,17,24,22,14,8,16,4,1,12,28,10,40,6,30,27,37,35,15,31,3,34,33,26,19,18,7,32,42,5,11,38,21,29,41,23,13];

(() => {
  'use strict';
  const body = document.body;
  const sky = document.getElementById('starfield');
  const events = document.getElementById('event-list');
  const chronicle = document.getElementById('chronicle');
  const card = document.getElementById('arcana-button');
  const preview = new URLSearchParams(location.search).get('apercu') === '10decembre';
  if (!sky || !events || !chronicle) return;

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  const starLocations = STAR_PATHS.flat().concat(DECO_STARS);
  // Fixed pseudo-random background: same sky for every visit.
  let seed=129739;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
  const fragment=document.createDocumentFragment();
  for(let i=0;i<170;i++){
    const dot=document.createElement('span');
    dot.className='sky-dust';
    dot.style.left=(random()*100).toFixed(3)+'%';
    dot.style.top=(random()*100).toFixed(3)+'%';
    const size=(.6+random()*1.5).toFixed(2)+'px';
    dot.style.width=size;dot.style.height=size;
    dot.style.opacity=(.2+random()*.6).toFixed(2);
    fragment.appendChild(dot);
  }

  const assigned=starLocations.map(([x,y],i)=>({id:STAR_IDS[i],x,y}));
  for(const star of assigned){
    const dot=document.createElement('span');
    dot.className='constellation-star';
    dot.style.left=star.x+'%';
    dot.style.top=star.y+'%';
    const number=document.createElement('span');
    number.className='star-number';
    number.textContent=star.id;
    dot.appendChild(number);
    fragment.appendChild(dot);
  }
  sky.appendChild(fragment);

  assigned.sort((a,b)=>a.id-b.id).forEach(star=>{
    const li=document.createElement('li');
    const id=document.createElement('span');
    id.className='event-id';
    id.textContent=String(star.id).padStart(2,'0')+' —';
    const event=document.createElement('span');
    event.textContent='[ÉVÉNEMENT '+String(star.id).padStart(2,'0')+' — À REMPLIR]';
    li.append(id,event);
    events.appendChild(li);
  });

  function refresh(){
    const visible = preview || Date.now()>=REVEAL_SKY_AT;
    body.classList.toggle('stars-numbered',visible);
    chronicle.hidden=!visible;
  }
  refresh();
  setInterval(refresh,1000);
  window.addEventListener('pageshow',refresh);
})();
