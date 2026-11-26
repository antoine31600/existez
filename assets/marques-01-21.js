/*
 * EXISTENCE — marques de la grande énigme, JOURS 01 À 21.
 * Les coordonnées (x%, y%) sont relatives à la fenêtre visible (viewport),
 * PAS à la longueur des pages ni à la position du scroll.
 * Pour reconstituer la composition, reporter chaque symbole à la même
 * position sur un support commun au format 100 x 100.
 * Maquette de vérification : les traces, reliées 1–8, 9–16, 17–21,
 * dessinent « MOT ». Ce n'est PAS la solution définitive.
 * Les symboles sont non interactifs, sans lien avec les autres indices.
 */
(() => {
 'use strict';
 const src=document.currentScript;
 const day=Number(src&&src.dataset.markDay);
 const positions=[[10,78,"◇"],[10,25,"△"],[14,38,"○"],[19,51,"□"],[24,38,"✦"],[28,25,"✧"],[28,49,"✶"],[28,78,"✷"],[48,23,"✹"],[41,29,"✺"],[39,42,"✻"],[39,62,"✼"],[43,76,"✽"],[55,76,"✾"],[60,62,"✿"],[60,29,"❀"],[72,24,"❖"],[81,24,"◈"],[90,24,"◉"],[81,29,"⊕"],[81,78,"⊗"]];
 if(!Number.isInteger(day)||day<1||day>positions.length)return;
 const [x,y,glyph]=positions[day-1];
 const mark=document.createElement('span');
 mark.className='existence-constellation-mark';
 mark.textContent=glyph;
 mark.setAttribute('aria-hidden','true');
 mark.style.left=x+'%';
 mark.style.top=y+'%';
 const style=document.createElement('style');
 style.textContent='.existence-constellation-mark{position:fixed;z-index:2147483000;display:block;width:18px;height:18px;line-height:18px;text-align:center;transform:translate(-50%,-50%);font-family:Georgia,serif;font-size:14px;font-weight:400;letter-spacing:0;color:#e4d2ab;opacity:.69;text-shadow:0 1px 3px #050408,0 0 5px #000,0 0 10px #dfc49588;pointer-events:none;user-select:none;-webkit-user-select:none;contain:layout style paint}@media(max-width:600px){.existence-constellation-mark{font-size:13px;opacity:.76}}';
 document.head.appendChild(style);
 document.body.appendChild(mark);
})();
