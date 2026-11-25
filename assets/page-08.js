/*
 * PROJET EXISTENCE — JOUR VIII
 * Activation le 9 décembre 2026 à 00:00 à Paris = 8 décembre 23:00 UTC.
 * Une zone totalement invisible permet de télécharger un fichier SVG.
 * Le mot de l'URL suivante doit être inscrit dans la métadonnée XMP
 * dc:description du fichier assets/archives/fragment-08.svg.
 * Le mot n'a pas été décidé : [MOT_SECRET_A_DEFINIR] est provisoire.
 *
 * Test : ?apercu=9decembre
 * Note : fichiers GitHub Pages publiquement accessibles par URL.
 */
const REVEAL_ARTIFACT_AT = Date.parse('2026-12-08T23:00:00Z');
const ARTIFACT_FILE = '../assets/archives/fragment-08.svg';
(() => {
 'use strict';
 const card = document.getElementById('arcana-button');
 const mount = document.getElementById('artifact-mount');
 const preview = new URLSearchParams(location.search).get('apercu') === '9decembre';
 if (card) card.addEventListener('click', () => {
  const shown = card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',shown);
  card.setAttribute('aria-pressed',String(shown));
  card.setAttribute('aria-label',shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
 });
 function installDiscoveryCursor(link) {
  // The ring follows the actual pointer, and never intercepts clicks.
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const ring = document.createElement('div');
  ring.className = 'artifact-cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  link.addEventListener('pointerenter', event => {
    ring.style.left = event.clientX + 'px';
    ring.style.top = event.clientY + 'px';
    ring.classList.add('is-visible');
  });
  link.addEventListener('pointermove', event => {
    ring.style.left = event.clientX + 'px';
    ring.style.top = event.clientY + 'px';
  });
  const hide = () => ring.classList.remove('is-visible');
  link.addEventListener('pointerleave', hide);
  link.addEventListener('pointercancel', hide);
  window.addEventListener('blur', hide);
 }
 function refresh(){
  if (!mount || !(preview || Date.now()>=REVEAL_ARTIFACT_AT)) return;
  if (mount.childElementCount) return;
  const link=document.createElement('a');
  link.href=ARTIFACT_FILE;
  link.download='fragment-08.svg';
  link.className='artifact-fragment';
  link.setAttribute('aria-label','Récupérer le fragment');
  installDiscoveryCursor(link);
  mount.append(link);
  mount.hidden=false;
 }
 refresh();
 setInterval(refresh,1000);
 window.addEventListener('pageshow',refresh);
})();
