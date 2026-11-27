/*
 * PROJET EXISTENCE — JOUR VII
 * Début : 8 décembre 2026, 00:00, heure de Paris (07/12 à 23:00 UTC).
 *
 * MÉTHODE CHOISIE : HEX + CANAL RGB.
 * Chaque couleur #RRGGBB porte un caractère ASCII dans UN seul canal.
 * L'indice de l'énigme doit communiquer l'ordre des canaux :
 * Rouge, Vert, Bleu, puis recommencer (R, V, B, R, V, B...).
 *
 * EXEMPLES PROVISOIRES, À REMPLACER QUAND LE MOT EST CHOISI :
 * #41D92A -> R = 41 (hex) -> A
 * #D442F0 -> V = 42 (hex) -> B
 * #12F543 -> B = 43 (hex) -> C
 *
 * Mettre une couleur par lettre dans COLOR_CODES. Chaque couleur reste
 * affichée 3 secondes, dans un ordre constant et en boucle.
 * La page publique laisse les couleurs consultables dans le JavaScript.
 * Aperçu : ?apercu=8decembre
 */
const REVEAL_COLORS_AT = Date.parse('2026-12-07T23:00:00Z');
const COLOR_CODES = ["#411E37","#38527E","#5D8843","#48BD44","#A7498B","#CC5F56","#499451","#4E5398","#733654","#456B5E"];
const COLOR_DURATION_MS = 3000;

(() => {
  'use strict';
  const body = document.body;
  const card = document.getElementById('arcana-button');
  const preview = new URLSearchParams(location.search).get('apercu') === '8decembre';
  const previewStart = Date.now();
  let displayedIndex = -1;

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  function refresh() {
    const now = Date.now();
    const revealed = preview || now >= REVEAL_COLORS_AT;
    body.classList.toggle('colors-revealed', revealed);
    if (!revealed) { displayedIndex = -1; return; }
    const elapsed = Math.max(0, now - (preview ? previewStart : REVEAL_COLORS_AT));
    const index = Math.floor(elapsed / COLOR_DURATION_MS) % COLOR_CODES.length;
    if (index !== displayedIndex) {
      body.style.setProperty('--active-color', COLOR_CODES[index]);
      displayedIndex = index;
    }
  }
  refresh();
  setInterval(refresh, 100);
  window.addEventListener('pageshow', refresh);
})();
