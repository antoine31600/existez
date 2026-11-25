/*
 * PROJET EXISTENCE — JOUR VII
 * Activation : 8 décembre 2026 à 00:00, heure de Paris
 * (7 décembre 2026 à 23:00 UTC).
 *
 * IMPORTANT : les 4 couleurs ci-dessous sont DES EXEMPLES, pas l'énigme finale.
 * Chaque couleur est un triplet d'octets hexadécimaux (RRGGBB).
 * Exemple : #414243 -> 41 42 43 -> ABC en ASCII.
 * Exemples actuels : ABC / DEF / GHI / JKL.
 * Remplacer les quatre codes par ceux correspondant au mot choisi.
 * L'ordre de leur apparition détermine l'ordre des caractères.
 * Les codes seront consultables dans le JavaScript public du site.
 *
 * Tester le 8 décembre : ?apercu=8decembre
 */
const REVEAL_COLORS_AT = Date.parse('2026-12-07T23:00:00Z');
const COLOR_CODES = ['#414243', '#444546', '#474849', '#4A4B4C'];
(() => {
  'use strict';
  const body = document.body;
  const card = document.getElementById('arcana-button');
  const preview = new URLSearchParams(location.search).get('apercu') === '8decembre';
  COLOR_CODES.forEach((color, i) => body.style.setProperty('--color-' + (i + 1), color));

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  function refresh() {
    body.classList.toggle('colors-revealed', preview || Date.now() >= REVEAL_COLORS_AT);
  }
  refresh();
  setInterval(refresh, 1000);
  window.addEventListener('pageshow', refresh);
})();
