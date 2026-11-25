/*
 * PROJET EXISTENCE — SEUIL ZÉRO
 *
 * Tu rédiges les deux textes ci-dessous. Remplace uniquement leur contenu.
 * Le second est affiché à partir du 2 décembre 2026, 00:00 à Paris
 * (soit le 1er décembre 2026 à 23:00 UTC).
 *
 * IMPORTANT : GitHub Pages est public. Ces textes et cette date sont
 * consultables dans le code source, et l'horloge du visiteur peut être modifiée.
 */
const EXISTENCE_MESSAGES = {
  avant2Decembre: `[MESSAGE INITIAL À RÉDIGER]`,
  depuis2Decembre: `[MESSAGE DU 2 DÉCEMBRE À RÉDIGER]`
};
const BASCULE_PARIS_2_DECEMBRE_2026 = Date.parse('2026-12-01T23:00:00Z');
const STORAGE_KEY = 'existence-seuil-zero-stabilise-v1';

(() => {
  'use strict';
  const text = document.getElementById('transmission');
  const button = document.getElementById('witness');
  const slot = document.getElementById('button-slot');
  const symbols = '∅⌁⟁⊗⌬⌑∴⋈⟐⧖⋇⫷⟡';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const variants = [
    'TÉMOIGNEZ / EXISTEZ',
    'TÉMOIGNEZ / EXISTEZ',
    'TÉMOI▒NEZ / EXISTEZ',
    'TÉM░I▒NEZ / EXI╳TEZ',
    'TÉ░O█GNEZ / E╳I▒TEZ',
    'T▒░█G░E╳ / ▒X█S░EZ',
    '▓╳░█╳▒ / █▒╳░▓▒'
  ];
  let clicks = 0;
  let state = 'symbols';
  let scrambleInterval = null;
  let recoveryTimeout = null;
  let stable = false;
  let lastPeriod = null;

  function messageForNow() {
    return Date.now() >= BASCULE_PARIS_2_DECEMBRE_2026
      ? EXISTENCE_MESSAGES.depuis2Decembre
      : EXISTENCE_MESSAGES.avant2Decembre;
  }
  function drawNoise() {
    const alphabet = state === 'symbols' ? symbols : letters;
    const pick = () => alphabet[Math.floor(Math.random() * alphabet.length)];
    text.textContent = Array.from({ length: 27 }, pick).join(' ');
  }
  function startNoise(kind) {
    state = kind;
    text.className = 'transmission scramble';
    clearInterval(scrambleInterval);
    drawNoise();
    scrambleInterval = setInterval(drawNoise, 95);
  }
  function showWarning() {
    clearInterval(scrambleInterval);
    state = 'warning';
    text.className = 'transmission warning';
    text.textContent = Array(350).fill('PARTEZ').join(' ');
    document.body.classList.add('warning-active');
    /* Aucun mouvement ni effet sur PARTEZ. */
    button.className = 'witness gone';
    button.disabled = true;
    recoveryTimeout = setTimeout(() => {
      if (stable) return;
      button.className = 'witness';
      button.textContent = variants[0];
      button.disabled = false;
      state = 'last-click';
      button.focus({ preventScroll: true });
    }, 4000);
  }
  function showFinal() {
    stable = true;
    state = 'final';
    document.body.classList.remove('warning-active');
    clearInterval(scrambleInterval);
    clearTimeout(recoveryTimeout);
    text.className = 'transmission final';
    text.textContent = messageForNow();
    lastPeriod = Date.now() >= BASCULE_PARIS_2_DECEMBRE_2026;
    button.hidden = true;
    slot.hidden = true;
    document.body.classList.add('stabilized');
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
  }
  button.addEventListener('click', () => {
    if (stable || state === 'warning') return;
    if (state === 'last-click') { showFinal(); return; }
    clicks += 1;
    if (clicks >= 7) { showWarning(); return; }
    if (clicks >= 3 && state !== 'letters') startNoise('letters');
    button.className = 'witness break-' + Math.min(clicks, 5);
    button.textContent = variants[clicks] || variants[variants.length - 1];
  });
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      showFinal();
    } else {
      startNoise('symbols');
    }
  } catch (_) {
    startNoise('symbols');
  }

  // Mise à jour même si la page est déjà ouverte au changement de date.
  // L'horloge est celle de l'appareil : ce n'est pas un verrou de sécurité.
  setInterval(() => {
    if (!stable) return;
    const currentPeriod = Date.now() >= BASCULE_PARIS_2_DECEMBRE_2026;
    if (currentPeriod !== lastPeriod) {
      text.textContent = messageForNow();
      lastPeriod = currentPeriod;
    }
  }, 1000);
  window.addEventListener('pageshow', () => {
    if (stable) {
      text.textContent = messageForNow();
      lastPeriod = Date.now() >= BASCULE_PARIS_2_DECEMBRE_2026;
    }
  });
})();
