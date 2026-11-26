/*
 * EXISTENCE — JOUR XIX — ENQUÊTE À CINQ ÉTAPES (VERSION 2)
 * 20 décembre 2026 à 00:00 Paris = 19 décembre à 23:00 UTC.
 * Aperçu : ?apercu=20decembre
 *
 * SOLUTION DE DÉMONSTRATION (réservée à l'auteur) :
 * 1. Journal système : un dossier manque et une file de restauration subsiste.
 * 2. catalogue/relance.queue donne, DANS LE BON ORDRE, sept identifiants.
 * 3. catalogue/localisation.idx fournit les chemins relatifs depuis /catalogue/.
 * 4. Les données utiles se trouvent dans les fichiers .bin correspondants ;
 *    six autres fichiers .bin sont des leurres, plus les journaux sans intérêt.
 * 5. Lire le caractère de la TRAME indiqué par CURSEUR (index commence à 1)
 *    grâce au protocole situé dans outils/protocole.txt.
 * 6. Respecter l'ordre du registre pour récupérer ABSENCE.
 *    Le nom reconstitué est celui du dossier manquant.
 *
 * Le mot "ABSENCE", tous les identifiants et les contenus sont PROVISOIRES.
 * Le site n'offre ni validation, ni révélateur automatique du résultat.
 */
const VAULT_REVEAL_AT=Date.parse('2026-12-19T23:00:00Z');
const F=(name,body)=>({name,body});
const D=(name,children)=>({name,children});
const record=(id,body,index)=>F(body.name,'UNITÉ SCELLÉE / ARCHIVE BINAIRE\n------------------------------\nIDENTIFIANT : '+id+'\nSTATUT : RECONSTRUCTION PARTIELLE\nTRAME : '+body.noise+'\nCURSEUR : '+String(body.pos).padStart(2,'0')+'\nDIAGNOSTIC : '+(index?'LECTURE INTERROMPUE':'ANCIENNE COPIE'));
const records={"Q7":{"name":"echo_034.bin","noise":"RMLTAVQPXZKD","pos":5},"F2":{"name":"porte_basse.bin","noise":"VQZTRHLPBMXN","pos":9},"M9":{"name":"empreinte_07.bin","noise":"NFSQXJPVMLRD","pos":3},"R4":{"name":"echo_089.bin","noise":"JKMNQVRTYPEX","pos":11},"A6":{"name":"horloge_13.bin","noise":"ZPVQANJLMRTX","pos":6},"T1":{"name":"trace_noire.bin","noise":"XPTRJVQCMKLZ","pos":8},"L8":{"name":"horloge_04.bin","noise":"VEQTMZPJRKLX","pos":2},"U5":{"name":"echo_copie.bin","noise":"VQMTHJPZRKLD","pos":3},"Z0":{"name":"porte_veille.bin","noise":"ZRTWXLMPJKQD","pos":9},"X3":{"name":"empreinte_ancienne.bin","noise":"MBQTRVXNPZLH","pos":2},"P8":{"name":"horloge_test.bin","noise":"KLMVRTWQNZPX","pos":7},"N4":{"name":"seuil_012.bin","noise":"PXLMKQTRNVZW","pos":5},"B1":{"name":"murmure.bin","noise":"JXQPRNTVZKLM","pos":4}}; 
const tree=D('EXISTENCE',[
 F('journal_systeme.log','ÉTAT DES ARCHIVES\n----------------\nUne entrée du répertoire /EXISTENCE/archives/ a été effacée.\nLe nom du répertoire a disparu des sauvegardes ordinaires.\nLe service de reprise a laissé une file d\u2019attente dans le catalogue.\nLa restauration a été interrompue avant l\u2019assemblage.'),
 F('etat.txt','Mode : consultation seule.\nRépertoire indisponible : /EXISTENCE/archives/[SUPPRIMÉ]/\nNote : aucune fonction de réparation n\u2019est disponible.'),
 D('catalogue',[
  F('relance.queue','FILE DE RESTAURATION / SIGNATURE : ORPHEE\n-----------------------------------------\nOrdre de traitement :\n01 > Q7\n02 > F2\n03 > M9\n04 > R4\n05 > A6\n06 > T1\n07 > L8\n\nLes identifiants ne correspondent pas aux noms des fichiers.\nConsulter les localisations sauvegardées.'),
  F('localisation.idx', 'TABLE DES EMPLACEMENTS\nLes chemins indiqués sont relatifs au dossier /EXISTENCE/catalogue/.\n\nQ7 = ../archives/echos/echo_034.bin\nF2 = ../archives/seuil/porte_basse.bin\nM9 = ../archives/traces/empreinte_07.bin\nR4 = ../archives/echos/echo_089.bin\nA6 = ../archives/temps/horloge_13.bin\nT1 = ../archives/traces/trace_noire.bin\nL8 = ../archives/temps/horloge_04.bin\n\nU5 = ../archives/echos/echo_copie.bin\nZ0 = ../archives/seuil/porte_veille.bin\nX3 = ../archives/traces/empreinte_ancienne.bin\nP8 = ../archives/temps/horloge_test.bin\nN4 = ../archives/seuil/seuil_012.bin\nB1 = ../archives/echos/murmure.bin'),
  F('inventaire.csv','uid;état;zone\nQ7;partiel;E\nF2;partiel;S\nM9;partiel;T\nR4;partiel;E\nA6;partiel;H\nT1;partiel;T\nL8;partiel;H\nU5;partiel;E\nX3;partiel;T\nZ0;partiel;S\nP8;partiel;H\nN4;partiel;S\nB1;partiel;E'),
  F('ancien_index.txt','INDEX PRÉCÉDENT\n----------------\nLa file de restauration a remplacé la copie de cet index.\nHistorique incomplet ; aucune récupération ici.'),
  F('readme.txt','Catalogue des entrées connues et des copies partielles.\nLes chemins relatifs commencent à partir de ce dossier.')
 ]),
 D('archives',[
  F('index.txt','SYSTÈME D\u2019ARCHIVAGE\nechos/\ntraces/\nseuil/\ntemps/\n[ENTRÉE SUPPRIMÉE]\n\nLes fichiers ne sont pas présentés dans leur ordre de restauration.'),
  D('echos',[
   F('etat.log','Échos : deux synchronisations anciennes, trois copies partielles.'),
   record('U5',records.U5,false),
   record('R4',records.R4,true),
   F('memoire.txt','Copie ordinaire. Aucun incident.'),
   record('B1',records.B1,false),
   record('Q7',records.Q7,true),
   F('echo_001.txt','La mémoire des archives paraît stable.')
  ]),
  D('traces',[
   record('X3',records.X3,false),
   F('trace_ok.log','Trace enregistrée sans incident.'),
   record('T1',records.T1,true),
   F('donnees.txt','Contrôle du contenu : stable.'),
   record('M9',records.M9,true)
  ]),
  D('seuil',[
   F('porte.log','Aucune anomalie sur les portes principales.'),
   record('N4',records.N4,false),
   record('F2',records.F2,true),
   F('notes.txt','Il existe de nombreux enregistrements périmés.'),
   record('Z0',records.Z0,false)
  ]),
  D('temps',[
   record('P8',records.P8,false),
   F('cycle.txt','Horodatage de référence illisible.'),
   record('A6',records.A6,true),
   F('temps.log','Opérations interrompues puis reprises.'),
   record('L8',records.L8,true)
  ])
 ]),
 D('outils',[
  F('diagnostic.log','DIAGNOSTIC\n----------\nUne file de reprise existe dans /EXISTENCE/catalogue/.\nLes chemins de /catalogue/localisation.idx sont relatifs à /catalogue/.\nLes caractères de la trame restent accessibles ; aucun restaurateur exécutable.'),
  F('protocole.txt','PROTOCOLE DE LECTURE / VERS. 03\n--------------------------------\nUne unité comporte une TRAME de caractères et un CURSEUR.\nLe curseur désigne la position d\u2019un unique caractère dans cette trame.\nPremière position = 01 (comptage à partir de 1).\nNe récupérer qu\u2019un caractère par unité.\nL\u2019ordre final est défini par la file de restauration.'),
  F('versions.txt','Anciennes règles de lecture abandonnées.\nNe pas utiliser les numéros de fichiers comme index.'),
  F('checksum.log','Quelques sauvegardes partielles ont été conservées.\nLes copies périmées se trouvent mêlées aux enregistrements utiles.')
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
   const g=document.createElement('span');g.className='vault-glyph';g.textContent='·';
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
