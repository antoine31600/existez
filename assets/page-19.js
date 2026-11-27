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
 * 5. Trois trames importantes ont perdu le caractère utile :
 *    - F2: conversation / discussions/canal_veille.chat fournit deux moitiés.
 *    - R4: cache/lecteur/paquet_4a.part1 et part2, noms sans lien direct,
 *      à reconnaître en comparant les motifs à l'original lacunaire.
 *    - T1: outils/trace_ancienne.hex ligne [81C] : 43 en hex = C ;
 *      relier par la signature XPTRJVQ ? MKLZ.
 * 6. Lire le caractère de la TRAME au CURSEUR (index à partir de 1)
 *    puis suivre l'ordre du registre pour récupérer JUSTICE.
 *    Le nom reconstitué est celui du dossier manquant.
 *
 * Le mot "JUSTICE", tous les identifiants et les contenus sont PROVISOIRES.
 * Le site n'offre ni validation, ni révélateur automatique du résultat.
 */
const VAULT_REVEAL_AT=Date.parse('2026-12-19T23:00:00Z');
const F=(name,body)=>({name,body});
const D=(name,children)=>({name,children});
const damaged={F2:8,R4:10,T1:7};
const record=(id,body,index)=>{
 const cut=damaged[id];
 const trame=cut===undefined?body.noise:body.noise.slice(0,cut)+'?' +body.noise.slice(cut+1);
 return F(body.name,'UNITÉ SCELLÉE / ARCHIVE BINAIRE\n------------------------------\nIDENTIFIANT : '+id+'\nSTATUT : '+(cut===undefined?'RECONSTRUCTION PARTIELLE':'DONNÉE LACUNAIRE')+'\nTRAME : '+trame+'\nCURSEUR : '+String(body.pos).padStart(2,'0')+'\nDIAGNOSTIC : '+(cut!==undefined?'OCTET PERDU — SOURCE SECONDAIRE REQUISE':(index?'LECTURE INTERROMPUE':'ANCIENNE COPIE')));
};
const records={"Q7":{"name":"echo_034.bin","noise":"RMLTJVQPXZKD","pos":5},"F2":{"name":"porte_basse.bin","noise":"VQZTRHLPUMXN","pos":9},"M9":{"name":"empreinte_07.bin","noise":"NFSQXJPVMLRD","pos":3},"R4":{"name":"echo_089.bin","noise":"JKMNQVRTYPTX","pos":11},"A6":{"name":"horloge_13.bin","noise":"ZPVQAIJLMRTX","pos":6},"T1":{"name":"trace_noire.bin","noise":"XPTRJVQCMKLZ","pos":8},"L8":{"name":"horloge_04.bin","noise":"VEQTMZPJRKLX","pos":2},"U5":{"name":"echo_copie.bin","noise":"VQMTHJPZRKLD","pos":3},"Z0":{"name":"porte_veille.bin","noise":"ZRTWXLMPJKQD","pos":9},"X3":{"name":"empreinte_ancienne.bin","noise":"MBQTRVXNPZLH","pos":2},"P8":{"name":"horloge_test.bin","noise":"KLMVRTWQNZPX","pos":7},"N4":{"name":"seuil_012.bin","noise":"PXLMKQTRNVZW","pos":5},"B1":{"name":"murmure.bin","noise":"JXQPRNTVZKLM","pos":4}}; 
const tree=D('EXISTENCE',[
 F('journal_systeme.log','ÉTAT DES ARCHIVES\n----------------\nUne entrée du répertoire /EXISTENCE/archives/ a été effacée.\nLe nom du répertoire a disparu des sauvegardes ordinaires.\nLe service de reprise a laissé une file d\u2019attente dans le catalogue.\nLa restauration a été interrompue avant l\u2019assemblage.'),
 F('etat.txt','Mode : consultation seule.\nRépertoire indisponible : /EXISTENCE/archives/[SUPPRIMÉ]/\nNote : aucune fonction de réparation n\u2019est disponible.'),
 D('catalogue',[
  F('relance.queue','FILE DE RESTAURATION / SIGNATURE : ORPHEE\n-----------------------------------------\nOrdre de traitement :\n01 > Q7\n02 > F2\n03 > M9\n04 > R4\n05 > A6\n06 > T1\n07 > L8\n\nLes identifiants ne correspondent pas aux noms des fichiers.\nConsulter les localisations sauvegardées.'),
  F('localisation.idx', 'TABLE DES EMPLACEMENTS\nLes chemins indiqués sont relatifs au dossier /EXISTENCE/catalogue/.\n\nQ7 = ../archives/echos/echo_034.bin\nF2 = ../archives/seuil/porte_basse.bin\nM9 = ../archives/traces/empreinte_07.bin\nR4 = ../archives/echos/echo_089.bin\nA6 = ../archives/temps/horloge_13.bin\nT1 = ../archives/traces/trace_noire.bin\nL8 = ../archives/temps/horloge_04.bin\n\nU5 = ../archives/echos/echo_copie.bin\nZ0 = ../archives/seuil/porte_veille.bin\nX3 = ../archives/traces/empreinte_ancienne.bin\nP8 = ../archives/temps/horloge_test.bin\nN4 = ../archives/seuil/seuil_012.bin\nB1 = ../archives/echos/murmure.bin'),
  F('inventaire.csv','uid;état;zone\nQ7;partiel;E\nF2;partiel;S\nM9;partiel;T\nR4;partiel;E\nA6;partiel;H\nT1;partiel;T\nL8;partiel;H\nU5;partiel;E\nX3;partiel;T\nZ0;partiel;S\nP8;partiel;H\nN4;partiel;S\nB1;partiel;E'),
  F('transmissions.ref','TRACE DE RÉPLICATION\n---------------------\nUn original a disparu. Ses ombres ne sont pas au même endroit.\nCertaines ont été dites, d\u2019autres oubliées par la machine.\nLe dernier témoin ne sait compter qu\u2019en seize signes.'),
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
 D('discussions',[
  F('canal_veille.chat','CANAL DE VEILLE / COPIE DÉCLASSÉE\n--------------------------------\n[18:43] L. : La mémoire revient toujours par morceaux.\n[18:47] N. : J\u2019ai noté ce que la console murmurait avant le noir : VQZTRH.\n[18:49] L. : Tu es certain de ce début ?\n[18:51] N. : Le reste était sur le papier plié : LPUMXN.\n[18:58] L. : Ne recopie pas tout au même endroit. Une seule version suffit pour attirer l\u2019attention.'),
  F('canal_general.chat','CANAL GÉNÉRAL\n--------------\n[09:10] Archiviste : Un lot complet a été classé en attente.\n[09:24] Opérateur : Certains fichiers semblent vides, mais les anciennes conversations restent lisibles.\n[09:38] Archiviste : Les copies ne sont pas toutes fiables.'),
  F('journal_equipe.chat','DISCUSSION / RELÈVE\n------------------\n[07:02] Archiviste : Le registre comporte plusieurs unités différentes.\n[07:12] Opérateur : Ne prenez pas les identifiants pour des mots.\n[07:17] Archiviste : La synchronisation reprendra après le contrôle.'),
  F('brouillon_prive.chat','BROUILLON DE DISCUSSION\n---------------------\n[22:08] Opérateur : Une archive peut survivre dans un message que personne n\u2019avait pensé à supprimer.')
 ]),
 D('cache',[
  D('lecteur',[
   F('paquet_4a.part1','BUFFER PARTIEL / 4A\nDATA : JKMNQV'),
   F('paquet_4a.part2','BUFFER PARTIEL / 4A\nDATA : RTYPTX'),
   F('paquet_7c.part1','BUFFER PARTIEL / 7C\nDATA : MNPXQZ'),
   F('paquet_7c.part2','BUFFER PARTIEL / 7C\nDATA : LQMWER'),
   F('paquet_9f.part1','BUFFER PARTIEL / 9F\nDATA : XPTRJV'),
   F('paquet_9f.part2','BUFFER PARTIEL / 9F\nDATA : BZKTLM'),
   F('statut.log','LE CACHE N\u2019EST PAS UN INVENTAIRE\n--------------------------------\nLes noms temporaires sont attribués au hasard.\nUne paire reste une paire, même quand son origine a disparu.\nNe conserver que ce qui peut recouper une trace déjà connue.')
  ]),
  F('readme.txt','Le cache du lecteur peut contenir des trames segmentées.\nCertaines copies n\u2019ont jamais été écrites dans les archives.')
 ]),
 D('outils',[
  F('trace_ancienne.hex','RÉSIDUS DU SCANNER / LOT DÉCLASSÉ\n--------------------------------\n[77A]  LQMRTY  |  4B  |  ZPAX\n[81C]  XPTRJVQ |  43  |  MKLZ\n[82F]  JNXQLT  |  36  |  VMRP\n\nFin du bloc. La légende du format n\u2019a pas été conservée.'),
  F('historique_lecteur.txt','RAPPORT DES SUPPORTS DISPARUS\n----------------------------\nLes voix ont parfois gardé la première moitié d\u2019une phrase.\nLes tampons temporaires ont parfois gardé la seconde.\nLes vieux scanners, eux, ne parlaient qu\u2019en seize signes.\nAucun de ces témoins ne sait ce qu\u2019il a sauvegardé.'),
  F('diagnostic.log','DIAGNOSTIC\n----------\nUne file de reprise existe dans /EXISTENCE/catalogue/.\nLes chemins de /catalogue/localisation.idx sont relatifs à /catalogue/.\nLes caractères de la trame restent accessibles ; aucun restaurateur exécutable.'),
  F('protocole.txt','PROTOCOLE DE LECTURE / VERS. 03\n--------------------------------\nChaque unité ne livre qu\u2019un signe.\nLa TRAME se parcourt de gauche à droite.\nCURSEUR : la première case porte le numéro 01.\nUne case manquante ne vaut pas zéro.\nLes témoins incomplets peuvent se contredire ; seuls les fragments qui se recoupent méritent confiance.\nL\u2019ordre final appartient à la file de restauration.'),
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
