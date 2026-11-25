/*
 * PROJET EXISTENCE — JOUR VI
 * 7 décembre 2026 00:00 à Paris = 6 décembre 2026 23:00 UTC.
 * L'auteur remplace les placeholders dans jour-6/index.html.
 * Chaque élément <span data-italic>...</span> devient italique après le seuil.
 * L'indice du mail et la réponse de l'URL ne sont PAS inscrits dans la page.
 * Prévisualisation : ?apercu=7decembre
 * Attention : code HTML public, donc balises consultables avant le jour.
 */
const REVEAL_ITALICS_AT = Date.parse('2026-12-06T23:00:00Z');
(() => {
  'use strict';
  const card = document.getElementById('arcana-button');
  if (card) card.addEventListener('click', () => {
    const revealed = card.classList.toggle('is-revealed');
    document.body.classList.toggle('arcana-awake', revealed);
    card.setAttribute('aria-pressed', String(revealed));
    card.setAttribute('aria-label', revealed ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });
  const preview = new URLSearchParams(location.search).get('apercu') === '7decembre';
  function refresh() {
    document.body.classList.toggle('italics-revealed', preview || Date.now() >= REVEAL_ITALICS_AT);
  }
  refresh();
  setInterval(refresh, 1000);
  window.addEventListener('pageshow', refresh);
})();
