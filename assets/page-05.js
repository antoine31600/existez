/*
 * PROJET EXISTENCE — JOUR V
 * Le 6 décembre 2026 à 00:00 à Paris = 5 décembre 23:00 UTC.
 *
 * Déposer dans le dépôt GitHub les deux PDF :
 *   assets/pdf/jour-05-a.pdf
 *   assets/pdf/jour-05-b.pdf
 *
 * Un des deux documents est choisi de manière équiprobable et le choix est
 * sauvegardé dans localStorage pour rester stable lors des actualisations.
 * Un seul téléchargement automatique est tenté par navigateur.
 * Le lien de secours permet de récupérer le document si le navigateur le bloque.
 * Prévisualisation : /existez/basile/?apercu=6decembre
 *
 * Attention : GitHub Pages ne protège pas les deux documents : ils restent
 * récupérables via leurs URL. Le tirage est local au navigateur, non à l'identité.
 */
const DOCUMENT_DATE = Date.parse('2026-12-05T23:00:00Z');
const PDF_FILES = ['../assets/pdf/jour-05-a.pdf', '../assets/pdf/jour-05-b.pdf'];
const PDF_CHOICE_KEY = 'existence-v-pdf-choice-v1';
const PDF_DOWNLOADED_KEY = 'existence-v-pdf-downloaded-v1';

(() => {
  'use strict';
  const card = document.getElementById('arcana-button');
  const section = document.getElementById('document-arrival');
  const link = document.getElementById('document-download');
  const message = document.getElementById('document-message');
  const preview = new URLSearchParams(location.search).get('apercu') === '6decembre';
  let activated = false;
  const canStore = (() => { try { localStorage.setItem('existence-storage-test','1');localStorage.removeItem('existence-storage-test');return true; } catch (_) { return false; }})();
  let fallbackChoice = null;
  let fallbackDownloaded = false;

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    document.body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  function getChoice() {
    let index = canStore ? localStorage.getItem(PDF_CHOICE_KEY) : fallbackChoice;
    if (index !== '0' && index !== '1') {
      const random = new Uint32Array(1);
      if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(random);
      else random[0] = Math.floor(Math.random() * 4294967296);
      index = String(random[0] % 2);
      if (canStore) localStorage.setItem(PDF_CHOICE_KEY, index);
      else fallbackChoice = index;
    }
    return Number(index);
  }

  function alreadyDownloaded() {
    return canStore ? localStorage.getItem(PDF_DOWNLOADED_KEY) === '1' : fallbackDownloaded;
  }
  function rememberDownload() {
    if (canStore) localStorage.setItem(PDF_DOWNLOADED_KEY, '1');
    else fallbackDownloaded = true;
  }

  async function deliver() {
    if (activated) return;
    activated = true;
    section.hidden = false;
    const file = PDF_FILES[getChoice()];
    link.href = file;
    link.setAttribute('download', file.split('/').pop());
    link.hidden = false;
    message.textContent = 'UN DOCUMENT VOUS EST DESTINÉ.';

    // Vérifier l'existence du fichier avant de déclencher un faux téléchargement.
    try {
      const check = await fetch(file, {method:'HEAD', cache:'no-store'});
      if (!check.ok) throw new Error('Document absent');
      const type = check.headers.get('content-type') || '';
      if (type.includes('text/html')) throw new Error('Le serveur a retourné une page HTML');
      if (!alreadyDownloaded()) {
        rememberDownload();
        // Téléchargement initié sans interaction; certains navigateurs le bloquent.
        link.click();
      }
    } catch (_) {
      message.textContent = '[DOCUMENT PDF À AJOUTER]';
      link.hidden = true;
    }
  }

  function refresh() {
    if (preview || Date.now() >= DOCUMENT_DATE) deliver();
  }
  refresh();
  setInterval(refresh, 1000);
  window.addEventListener('pageshow', refresh);
})();
