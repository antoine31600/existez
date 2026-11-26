/*
 * PROJET EXISTENCE — JOUR IV : CHIFFREMENT NUMÉRIQUE
 *
 * L'auteur remplacera la séquence provisoire ci-dessous par son énigme.
 * RÈGLE CONVENUE : lire deux chiffres par deux chiffres.
 * Chaque paire positive n se transforme en la lettre
 * numéro ((n - 1) % 26) + 1.
 *
 * 01=A ... 26=Z, 27=A, 28=B, ... 52=Z, 53=A, etc.
 * Exemple provisoire 27 54 81 => A B C, soit "275481".
 * 00 n'a pas de lettre et ne doit pas être utilisé.
 *
 * Seuls les chiffres apparaissent à l'écran : pas de décodeur ni d'indice
 * ajouté automatiquement. Attention, 2 chiffres limitent une paire à 99.
 */
const CIPHER_SEQUENCE = '275481'; // À REMPLACER par la véritable suite.
(() => {
 'use strict';
 const node = document.getElementById('cipher-sequence');
 if(node) node.textContent=CIPHER_SEQUENCE;
})();
