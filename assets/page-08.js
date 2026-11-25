/*
 * PROJET EXISTENCE — JOUR VIII
 * Activation le 9 décembre 2026 à 00:00 à Paris = 8 décembre 23:00 UTC.
 * Un fragment discret apparaît et permet de télécharger un fichier SVG.
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
 function refresh(){
  if (!mount || !(preview || Date.now()>=REVEAL_ARTIFACT_AT)) return;
  if (mount.childElementCount) return;
  const link=document.createElement('a');
  link.href=ARTIFACT_FILE;
  link.download='fragment-08.svg';
  link.className='artifact-fragment';
  link.setAttribute('aria-label','Récupérer le fragment');
  link.title='Fragment';
  const glyph=document.createElement('span');
  glyph.className='artifact-glyph';
  glyph.setAttribute('aria-hidden','true');
  glyph.textContent='◇';
  const corner=document.createElement('span');
  corner.className='artifact-corner';
  corner.setAttribute('aria-hidden','true');
  corner.textContent='VIII';
  link.append(glyph,corner);
  mount.append(link);
  mount.hidden=false;
 }
 refresh();
 setInterval(refresh,1000);
 window.addEventListener('pageshow',refresh);
})();
