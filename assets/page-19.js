/*
 * EXISTENCE — JOUR XIX — PROTOTYPE DE FICHIERS CORROMPUS
 * Déverrouillage : 20 décembre 2026 00:00 Paris / 19 décembre 23:00 UTC.
 * Aperçu : ?apercu=20decembre
 *
 * RÉSOLUTION DE DÉMONSTRATION (À REMPLACER PAR LE MOT DÉFINITIF) :
 * 1. Lire /EXISTENCE/journal_systeme.log et /EXISTENCE/catalogue/controle.txt
 * 2. Explorer 7 fichiers *.err, dispersés dans 4 branches des archives.
 * 3. Chaque fichier corrompu a un numéro de séquence et une lettre de résidu.
 * 4. Ordonner les résidus de 01 à 07 => ABSENCE.
 * 5. Le nom manquant dans /EXISTENCE/archives/[EFFACÉ]/ est ABSENCE.
 *
 * Les 7 résidus figurent dans le contenu des fichiers et ne sont pas
 * automatiquement assemblés par le site. Aucun dossier secret n'est créé.
 * Aucune donnée de campagne réelle n'a été inventée : textes de simulation.
 */
const VAULT_REVEAL_AT=Date.parse('2026-12-19T23:00:00Z');
const F=(name,body)=>({name,body});
const D=(name,children)=>({name,children});
const corrupted=(n,c)=>F('secteur-'+n+'.err','ARCHIVE / ÉCHEC DE LECTURE\n--------------------------\nSéquence : '+n+' / 07\nIntégrité : COMPROMISE\nRésidu lisible : « '+c+' »\nAutres octets : IRRÉCUPÉRABLES');
const tree=D('EXISTENCE',[
 F('journal_systeme.log','RAPPORT DE RÉCUPÉRATION / ESSAI\n--------------------------------\nUn répertoire des archives a disparu.\nChemin relevé : /EXISTENCE/archives/[EFFACÉ]/\n\n7 secteurs contiennent encore un résidu lisible.\nLeurs fragments ont été dispersés dans les archives.\nLa récupération complète du répertoire a échoué.'),
 F('a_lire.txt','RÉCUPÉRATION PARTIELLE\n----------------------\nLes fichiers ordinaires ne sont pas touchés.\nLes fichiers .err portent des marques de corruption.\nLes numéros de séquence ont survécu, mais pas leur emplacement initial.'),
 D('catalogue',[
   F('controle.txt','ÉTAT DE L’INDEX\n---------------\nSéquences attendues : 01, 02, 03, 04, 05, 06, 07.\nLe nom du dossier manquant suivait cet ordre.\nNe pas confondre les copies saines et les fragments en erreur.'),
   F('inventaire.csv','id;etat;lot\nA1;OK;archives\nA2;OK;archives\nA3;ERR;archives\nA4;OK;archives'),
   F('notes.txt','Les sauvegardes du catalogue sont intactes.'),
   F('sommaire.md','# Catalogue\n- Archives des échos\n- Archives des traces\n- Archives du seuil\n- Archives du temps')
 ]),
 D('archives',[
   F('index.txt','INDEX DES ARCHIVES\n------------------\nechos/\ntraces/\nseuil/\ntemps/\n[ENTRÉE EFFACÉE]\n\nAucune restauration automatique possible.'),
   D('echos',[
     F('echo_001.log','Synchronisation terminée. Aucun défaut.'),
     corrupted('04','E'),
     F('echo_002.log','Signal stable. Aucun défaut.'),
     F('memoire.wav.txt','Les archives audio ont été recopiées sans altération.'),
     corrupted('01','A'),
     F('readme.txt','Données de simulation : cette branche contient des échos.')
   ]),
   D('traces',[
     F('trace_001.txt','État : OK\nPériode : indéterminée'),
     corrupted('06','C'),
     F('trace_002.txt','État : OK\nTracé confirmé'),
     F('empreinte.dat.txt','Série de contrôle valide.'),
     corrupted('03','S')
   ]),
   D('seuil',[
     F('accueil.txt','Point d’entrée des archives.'),
     F('porte_01.log','Accès journalisé.'),
     corrupted('02','B'),
     F('porte_02.log','Accès journalisé.'),
     F('rappel.txt','Les zones supprimées ne sont pas visibles.')
   ]),
   D('temps',[
     F('horloge.txt','Dernière synchronisation : OK'),
     corrupted('07','E'),
     F('temps_000.log','Séquence valide.'),
     F('temps_001.log','Séquence valide.'),
     corrupted('05','N'),
     F('copie_ancienne.txt','Copie de secours sans erreur.')
   ])
 ]),
 D('outils',[
  F('diagnostic.txt','OUTIL DE DIAGNOSTIC HORS SERVICE\nLecture seule.'),
  F('checksum.log','27 entrées contrôlées.\n7 secteurs corrompus signalés.'),
  F('journal_ancien.log','Aucune donnée exploitable.'),
  F('versions.txt','Archive de démonstration / version provisoire.')
 ])
]);
(() => {
 'use strict';
 const card=document.getElementById('arcana-button');
 const vault=document.getElementById('vault');
 const treeBox=document.getElementById('vault-tree');
 const filePath=document.getElementById('vault-path');
 const fileContent=document.getElementById('vault-content');
 const preview=new URLSearchParams(location.search).get('apercu')==='20decembre';
 if(card)card.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-revealed');
  document.body.classList.toggle('arcana-awake',flipped);
  card.setAttribute('aria-pressed',String(flipped));
  card.setAttribute('aria-label',flipped?'Revoir le dos de la carte':'Retourner la carte de tarot');
 });
 const expanded=new Set(['/EXISTENCE','/EXISTENCE/archives']);
 let currentPath='';
 const base='/EXISTENCE';
 function showFile(file,path){
  currentPath=path;
  filePath.textContent=path;
  fileContent.textContent=file.body;
  renderTree();
 }
 function buildRows(dir,path,depth,frag){
  const isOpen=expanded.has(path);
  const row=document.createElement('button');
  row.type='button';row.className='vault-row';row.style.setProperty('--depth',depth);
  row.setAttribute('aria-expanded',String(isOpen));
  row.setAttribute('aria-label',(isOpen?'Replier ':'Ouvrir ')+dir.name);
  const glyph=document.createElement('span');glyph.className='vault-glyph';glyph.textContent=isOpen?'▾':'▸';
  const name=document.createElement('span');name.textContent=dir.name+'/';
  row.append(glyph,name);
  row.addEventListener('click',()=>{if(expanded.has(path))expanded.delete(path);else expanded.add(path);renderTree()});
  frag.appendChild(row);
  if(!isOpen)return;
  for(const entry of dir.children){
   const target=path+'/'+entry.name;
   if(entry.children){buildRows(entry,target,depth+1,frag);continue}
   const b=document.createElement('button');b.type='button';b.className='vault-row';
   if(currentPath===target)b.classList.add('active');
   b.style.setProperty('--depth',depth+1);
   const g=document.createElement('span');g.className='vault-glyph';g.textContent=entry.name.endsWith('.err')?'⚠':'·';
   const label=document.createElement('span');label.textContent=entry.name;
   b.append(g,label);b.addEventListener('click',()=>showFile(entry,target));
   frag.appendChild(b);
  }
 }
 function renderTree(){
  if(!treeBox)return;
  const frag=document.createDocumentFragment();
  buildRows(tree,base,0,frag);
  treeBox.replaceChildren(frag);
 }
 function refresh(){if(vault)vault.hidden=!(preview||Date.now()>=VAULT_REVEAL_AT)}
 renderTree();refresh();setInterval(refresh,1000);window.addEventListener('pageshow',refresh);
})();
