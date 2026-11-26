/*
 * PROJET EXISTENCE — JOUR X / AUDIO AUTOMATIQUE
 * Remplacer ces deux fichiers lorsque tu les auras fournis :
 *    assets/audio/jour-10-avant.wav
 *    assets/audio/jour-10-apres.wav
 *
 * Le 11 décembre 2026 à 00:00 à Paris = 10 décembre 23:00 UTC.
 * Le second fichier produit un bref éclair lumineux à chaque fin de lecture.
 * Test du second état : ?apercu=11decembre
 *
 * Les navigateurs peuvent interdire l'autoplay avec son avant interaction.
 * Dans ce cas, le son est tenté au premier clic/toucher/touche, sans bouton audio.
 */
const SWITCH_AUDIO_AT = Date.parse('2026-12-10T23:00:00Z');
const AUDIO_BEFORE = '../assets/audio/jour-10-avant.wav';
const AUDIO_AFTER = '../assets/audio/jour-10-apres.wav';

(() => {
  'use strict';
  const audio = document.getElementById('signal-audio');
  const card = document.getElementById('arcana-button');
  if (!audio) return;
  const preview = new URLSearchParams(location.search).get('apercu') === '11decembre';
  let currentFile = '';
  let loadingError = false;
  let attempting = false;
  let blocked = false;

  if (card) card.addEventListener('click', () => {
    const shown = card.classList.toggle('is-revealed');
    document.body.classList.toggle('arcana-awake', shown);
    card.setAttribute('aria-pressed', String(shown));
    card.setAttribute('aria-label', shown ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
  });

  const afterSwitch = () => preview || Date.now() >= SWITCH_AUDIO_AT;
  const desiredFile = () => afterSwitch() ? AUDIO_AFTER : AUDIO_BEFORE;

  function flash() {
    if (!afterSwitch()) return;
    document.body.classList.remove('loop-flash');
    // Restart CSS animation for every completed loop.
    void document.body.offsetWidth;
    document.body.classList.add('loop-flash');
  }

  function selectFile() {
    const next = desiredFile();
    if (currentFile === next) return false;
    currentFile = next;
    loadingError = false;
    audio.pause();
    audio.src = next;
    audio.load();
    document.body.classList.remove('loop-flash');
    return true;
  }

  async function play() {
    if (attempting || loadingError || !audio.paused) return;
    attempting = true;
    try {
      await audio.play();
      blocked = false;
      document.body.classList.add('is-playing');
    } catch (error) {
      document.body.classList.remove('is-playing');
      blocked = error && error.name === 'NotAllowedError';
    } finally {
      attempting = false;
    }
  }

  // Contrairement à audio.loop, l'événement ended permet de repérer
  // précisément la fin de chaque répétition.
  audio.addEventListener('ended', () => {
    flash();
    selectFile();
    audio.currentTime = 0;
    play();
  });

  audio.addEventListener('playing', () => {
    document.body.classList.add('is-playing');
  });
  audio.addEventListener('pause', () => document.body.classList.remove('is-playing'));
  audio.addEventListener('error', () => {
    loadingError = true;
    document.body.classList.remove('is-playing');
  });
  document.body.addEventListener('animationend', event => {
    if (event.animationName === 'loop-flicker') document.body.classList.remove('loop-flash');
  });

  // Si la politique du navigateur bloque l'autoplay, un geste quelconque
  // (y compris retourner la carte) tente de débloquer le son.
  const unlock = () => { if (blocked || audio.paused) play(); };
  document.addEventListener('pointerdown', unlock, {passive:true});
  document.addEventListener('keydown', unlock);

  selectFile();
  play();
  setInterval(() => { if (selectFile()) play(); }, 1000);
  window.addEventListener('pageshow', () => { selectFile(); if (audio.paused) play(); });
})();
