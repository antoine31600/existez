/* Homepage only. No unreleased content is included here. */
(()=>{'use strict';
const dateEl=document.getElementById('current-date');
if(dateEl){dateEl.textContent=new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'long',year:'numeric',timeZone:'America/Toronto'}).format(new Date()).toUpperCase();}
const status=document.getElementById('archive-status');
if(status){const now=new Date();const parts=new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'America/Toronto'}).formatToParts(now);const fields=Object.fromEntries(parts.map(p=>[p.type,p.value]));const month=Number(fields.month),day=Number(fields.day),year=Number(fields.year);
if(year===2026&&month===12&&day>=1&&day<=24){status.textContent='Archive active — jour '+String(day).padStart(2,'0');}
else if(year===2026&&month<12){status.textContent='Transmission en attente';}
else if(year===2026&&month===12&&day>24){status.textContent='Cycle terminé';}
}}
})();