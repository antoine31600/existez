/*
 * PROJET EXISTENCE — JOUR 2
 *
 * Le propriétaire du site écrira la prophétie directement dans signal/index.html.
 * Pour personnaliser la carte, remplacer les champs entre crochets de la page HTML.
 *
 * FUTUR MOT DE PASSE :
 * Il n'a PAS encore été choisi. Remplacer le texte ci-dessous quand il sera décidé.
 * Le mécanisme ajoute un commentaire au DOM après le 3 décembre 2026,
 * à 00:00 heure de Paris (2026-12-02T23:00:00Z).
 * Le mot sera consultable dans ce fichier public AVANT cette date.
 * Ce n'est donc pas un mécanisme de secret sécurisé.
 */
const JOUR_03_MOT_DE_PASSE = 'lunaire'; // PROVISOIRE : adresse /existez/passage/
const JOUR_03_DATE_PARIS = Date.parse('2026-12-02T23:00:00Z');

(() => {
  'use strict';
  const button = document.getElementById('arcana-button');
  if (button) {
    button.addEventListener('click', () => {
      const revealed = button.classList.toggle('is-revealed');
      document.body.classList.toggle('arcana-awake', revealed);
      button.setAttribute('aria-pressed', String(revealed));
      button.setAttribute('aria-label', revealed ? 'Revoir le dos de la carte de tarot' : 'Retourner la carte de tarot');
    });
  }

  let hintNode = null;
  function showDatedHint() {
    const isUnlocked = Date.now() >= JOUR_03_DATE_PARIS;
    if (isUnlocked && !hintNode) {
      // Pour la lire : ouvrir les outils développeur (F12) et inspecter la fin du DOM.
      hintNode = document.createComment('INDICE DU TROISIÈME SEUIL : ' + JOUR_03_MOT_DE_PASSE);
      document.documentElement.appendChild(hintNode);
    } else if (!isUnlocked && hintNode) {
      hintNode.remove();
      hintNode = null;
    }
  }
  showDatedHint();
  // Permet l'apparition si le joueur garde cette page ouverte à minuit.
  setInterval(showDatedHint, 1000);
  window.addEventListener('pageshow', showDatedHint);
})();
