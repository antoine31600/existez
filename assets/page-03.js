/* PROJET EXISTENCE — JOUR 3
 * Le 4 décembre 2026 à 00 h 00 à Paris = 3 décembre 23 h UTC.
 * Test : ?apercu=4decembre (ne change pas la date réelle).
 * Texte, nom et effets de la carte sont à remplir par le créateur.
 * Les fichiers GitHub Pages sont publics, même avant la date.
 */
const REVEAL_COORDINATES_AT = Date.parse('2026-12-03T23:00:00Z');
const COORDINATES = [[2,3],[-3,-1],[4,0],[-1,4],[3,-3],[-2,2],[1,-4]];
const COORDINATE_WORD = 'ORIGINE'; // Réponse provisoire.

(() => {
  'use strict';
  function init() {
    const card = document.getElementById('arcana-button');
    const archive = document.getElementById('archive-content');
    const puzzle = document.getElementById('coordinate-puzzle');
    const grid = document.getElementById('coordinate-grid');
    const sequence = document.getElementById('coordinate-sequence');
    const cardMount = document.getElementById('puzzle-card-center');
    const arcana = document.querySelector('#archive-content .arcana');
    const originalParent = arcana && arcana.parentElement;
    const nav = document.getElementById('view-actions');
    const archiveButton = document.getElementById('view-archive');
    const puzzleButton = document.getElementById('view-puzzle');
    if (!archive || !puzzle || !grid || !sequence || !nav || !archiveButton || !puzzleButton || !cardMount || !arcana || !originalParent) return;

    if (card) {
      card.addEventListener('click', () => {
        const revealed = card.classList.toggle('is-revealed');
        document.body.classList.toggle('arcana-awake', revealed);
        card.setAttribute('aria-pressed', String(revealed));
        card.setAttribute('aria-label', revealed ? 'Revoir le dos de la carte' : 'Retourner la carte de tarot');
      });
    }

    const preview = new URLSearchParams(location.search).get('apercu') === '4decembre';
    let mode = null;
    let wasUnlocked = false;

    // Ne construire la grille qu'une seule fois.
    function buildGrid() {
      if (grid.children.length !== 0) return;
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const target = new Map(COORDINATES.map(([x,y],i) => [x + ',' + y, COORDINATE_WORD[i]]));
      const fragment = document.createDocumentFragment();
      for (let y=4; y>=-4; y--) {
        for (let x=-4; x<=4; x++) {
          const cell = document.createElement('span');
          cell.className = 'coordinate-cell' + (x === 0 && y === 0 ? ' origin' : '');
          const seed = (x+7)*17 + (y+11)*23 + (x*y+50)*7;
          cell.textContent = (x === 0 && y === 0) ? '' : (target.get(x+','+y) || alphabet[((seed%26)+26)%26]);
          cell.title = '';
          fragment.appendChild(cell);
        }
      }
      grid.appendChild(fragment);
      for (const [x,y] of COORDINATES) {
        const item = document.createElement('span');
        item.textContent = '(' + x + ' ; ' + y + ')';
        sequence.appendChild(item);
      }
    }

    function show(modeRequested) {
      mode = modeRequested;
      const showingPuzzle = mode === 'puzzle';
      // Même carte dans les deux états : son retournement et sa face sont conservés.
      if (showingPuzzle && arcana.parentElement !== cardMount) cardMount.appendChild(arcana);
      if (!showingPuzzle && arcana.parentElement !== originalParent) originalParent.appendChild(arcana);
      archive.hidden = showingPuzzle;
      puzzle.hidden = !showingPuzzle;
      document.body.classList.toggle('coordinate-mode', showingPuzzle);
      nav.hidden = !wasUnlocked;
      archiveButton.hidden = !showingPuzzle || !wasUnlocked;
      puzzleButton.hidden = showingPuzzle || !wasUnlocked;
    }

    function refresh() {
      const unlocked = preview || Date.now() >= REVEAL_COORDINATES_AT;
      if (unlocked && !wasUnlocked) {
        buildGrid();
        wasUnlocked = true;
        show('puzzle');
      } else if (!unlocked && wasUnlocked) {
        wasUnlocked = false;
        show('archive');
      } else if (mode === null) {
        show('archive');
      }
    }

    archiveButton.addEventListener('click', () => { show('archive'); scrollTo({top:0,behavior:'smooth'}); });
    puzzleButton.addEventListener('click', () => { show('puzzle'); scrollTo({top:0,behavior:'smooth'}); });
    refresh();
    setInterval(refresh,1000);
    window.addEventListener('pageshow', refresh);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();