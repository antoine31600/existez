/*
 * PROJET EXISTENCE — JOUR IV / AUDIO
 *
 * Déposer les deux fichiers dans le dépôt GitHub :
 *   assets/audio/jour-04-avant.wav
 *   assets/audio/jour-04-apres.wav
 *
 * Jusqu'au 4 décembre 2026 inclus à Paris : premier WAV.
 * À partir du 5 décembre 2026, 00:00 à Paris : second WAV.
 * Conversion UTC pour décembre (CET, UTC+1) : 2026-12-04T23:00:00Z.
 *
 * Pour tester sans attendre : /existez/origine/?apercu=5decembre
 * Une page GitHub Pages reste publique, et l'horloge du navigateur est modifiable.
 * Les navigateurs bloquent généralement la lecture avec son avant un clic.
 */
const SWITCH_AUDIO_AT = Date.parse('2026-12-04T23:00:00Z');
const AUDIO_BEFORE = '../assets/audio/jour-04-avant.wav';
const AUDIO_AFTER = '../assets/audio/jour-04-apres.wav';
(() => {
  'use strict';
  const audio = document.getElementById('signal-audio');
  const toggle = document.getElementById('audio-toggle');
  const status = document.getElementById('audio-status');
  const card = document.getElementById('arcana-button');
  const preview = new URLSearchParams(location.search).get('apercu') === '5decembre';
  let currentFile = null;
  let wantsToPlay = false;

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    document.body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  function setPlayingUI(playing) {
    document.body.classList.toggle('is-playing', playing);
    toggle.textContent = playing ? 'INTERROMPRE LA TRANSMISSION' : 'ÉCOUTER LA TRANSMISSION';
    toggle.setAttribute('aria-pressed', String(playing));
  }

  function chooseFile() {
    return preview || Date.now() >= SWITCH_AUDIO_AT ? AUDIO_AFTER : AUDIO_BEFORE;
  }

  function syncFile() {
    const selected = chooseFile();
    if (selected === currentFile) return;
    currentFile = selected;
    const resume = wantsToPlay;
    audio.pause();
    audio.src = selected;
    audio.load();
    setPlayingUI(false);
    status.textContent = 'TRANSMISSION EN ATTENTE';
    if (resume) tryPlay();
  }

  async function tryPlay() {
    wantsToPlay = true;
    syncFile();
    try {
      await audio.play();
      if (!audio.paused) {
        setPlayingUI(true);
        status.textContent = 'TRANSMISSION EN COURS';
      }
    } catch (_) {
      wantsToPlay = false;
      setPlayingUI(false);
      status.textContent = 'AUDIO INDISPONIBLE — VÉRIFIER LE FICHIER';
    }
  }

  toggle.addEventListener('click', () => {
    if (!audio.paused) {
      wantsToPlay = false;
      audio.pause();
      setPlayingUI(false);
      status.textContent = 'TRANSMISSION INTERROMPUE';
    } else {
      tryPlay();
    }
  });
  audio.addEventListener('error', () => {
    wantsToPlay = false;
    setPlayingUI(false);
    status.textContent = 'FICHIER AUDIO ABSENT OU ILLISIBLE';
  });
  audio.addEventListener('pause', () => { if (audio.paused) setPlayingUI(false); });
  syncFile();
  setInterval(syncFile, 1000);
  window.addEventListener('pageshow', syncFile);
})();
