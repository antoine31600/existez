/*
 * EXISTENCE — CONCLUSION
 * URL attendue : /existez/nous/ (solution du jour XXIII).
 * Dévoilement : 24 décembre 2026 00:00 Paris, soit 23 décembre 23:00 UTC.
 * Cette restriction en JS n'est PAS une protection d'accès : dépôt GitHub public.
 * Aperçu auteur : ?apercu=24decembre
 *
 * L'auteur seul fournit le message d'adieu et le prototype à télécharger.
 * Remplacer PROTOTYPE_URL par un fichier valide déposé sur GitHub Pages,
 * ou par une URL HTTPS de publication autorisée, puis vérifier le téléchargement.
 * Exemple de format : '../assets/jeux/NOM-DU-FICHIER.zip'
 * Ne pas laisser un bouton actif vers un fichier fictif.
 */
const FINAL_UNLOCK_AT=Date.parse('2026-12-23T23:00:00Z');
const PROTOTYPE_URL='';
(() => {
 'use strict';
 const preview=new URLSearchParams(location.search).get('apercu')==='24decembre';
 const page=document.getElementById('last-page');
 const locked=document.getElementById('last-locked');
 const download=document.getElementById('gift-download');
 const pending=document.getElementById('gift-pending');
 const file=PROTOTYPE_URL.trim();
 const allowed=Boolean(file)&&!file.startsWith('#')&&!/^(javascript|data):/i.test(file);
 if(download&&pending){
  download.hidden=!allowed;
  pending.hidden=allowed;
  if(allowed){download.href=file;if(/^https?:/i.test(file))download.removeAttribute('download')}
 }
 function refresh(){
  const ready=preview||Date.now()>=FINAL_UNLOCK_AT;
  if(page)page.hidden=!ready;
  if(locked)locked.hidden=ready;
 }
 refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
