/* EXISTENCE — Retarde uniquement les URL publiques /jour-XX/.
 * Le parcours par les codes reste disponible par les alias du calendrier.
 * GitHub Pages est statique : le code source et les fichiers restent publics.
 */
(() => {
  'use strict';
  const tag=document.currentScript;
  const day=Number(tag && tag.dataset.jour);
  if(!Number.isInteger(day)||day<6||day>23)return;
  const codes={
    6:['coupable'],7:['gardien'],8:['archiviste'],9:['etoile'],
    10:['veille'],11:['viens-a-nous-basile','viensanousbasile'],
    12:['chouette'],13:['opilion'],14:['martyr'],15:['destructeur'],
    16:['porte'],17:['prophetie'],18:['destin'],
    20:['justice'],21:['messie'],22:['patamon'],23:['passage']
  };
  const keys=codes[day]||[];
  let hasCode=false;
  try {hasCode=keys.includes(sessionStorage.getItem('existence-route-'+day));}catch(_){}
  const params=new URLSearchParams(location.search);
  const preview=params.get('apercu')===(day+1)+'decembre';
  // Deux jours après le jour XX : ex. /jour-7/ le 9 décembre 00:00 Paris.
  const release=Date.UTC(2026,11,day+1,23,0,0);
  const allowed=Date.now()>=release||hasCode||preview;
  if(allowed){
    document.documentElement.style.visibility='visible';
    return;
  }
  const onReady=()=>{
    document.body.replaceChildren();
    document.body.className='existence-route-locked';
    document.body.style.cssText='margin:0;min-height:100dvh;background:#030305;color:#cfc0a7;display:grid;place-items:center;text-align:center;font-family:Georgia,serif';
    const section=document.createElement('main');
    section.style.cssText='padding:36px 24px;max-width:600px';
    const small=document.createElement('p');
    small.textContent='EXISTENCE — TRANSMISSION INACCESSIBLE';
    small.style.cssText='font:12px/1.8 monospace;letter-spacing:.18em;color:#ac9475';
    const message=document.createElement('p');
    message.textContent='Ce chemin ne s’ouvrira qu’une fois son heure venue.';
    message.style.cssText='font:italic clamp(18px,3vw,27px)/1.6 Georgia,serif';
    section.append(small,message);
    document.body.append(section);
    document.documentElement.style.visibility='visible';
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});
  else onReady();
})();