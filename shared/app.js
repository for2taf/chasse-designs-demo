import {createGame,beginQuestion,submitAnswer,secondsLeft,standings,simulateRival,questions,objects,TOTAL} from './engine.js';

const theme = document.body.dataset.theme;
const asset = '../shared/assets/';
const copy = {
  fr: {
    app:'Chasse au trésor', gala:'CCIMN · Gala Reconnaissance 2026', demo:'Démo interactive',
    simulation:'Participants et activité simulés · aucun lien avec la partie réelle',
    compare:'Comparer les designs', player:'Joueur', organizer:'Organisateur', room:'Écran de salle',
    atlas:'Atlas du gala', expedition:'Expédition vivante', mission:'Mission épurée',
    introduction:'Ton carnet d’expédition', intro:'Explore, résous, progresse. Chaque énigme te rapproche du trésor.',
    mapTitle:'La carte au trésor', mapIntro:'Suis ton parcours. Chaque bonne réponse révèle une nouvelle étape.',
    missionTitle:'Le trésor est à ta portée', missionIntro:'Un chemin clair, une énigme à la fois.',
    step:'Étape', progress:'Ta progression', found:'résolues', current:'En cours', locked:'À découvrir', solved:'Résolue',
    next:'La prochaine énigme', continue:'Continuer l’énigme', explore:'Explorer la carte', back:'Revenir au parcours',
    yourRank:'Ta place', points:'points', hunters:'chasseurs', retry:'Réessayer la même énigme',
    wrong:'Ce n’est pas la bonne réponse. Une nouvelle tentative t’attend.', timeout:'Temps écoulé. Réessaie la même énigme.',
    correct:'Bonne réponse ! Le chemin se dévoile.', penalty:'25 % de points en moins par essai raté, minimum 25 points.',
    remaining:'Temps restant', question:'Énigme', choose:'Choisis une image pour répondre.', attempt:'Nouvelle tentative',
    north:'Nord', zoomIn:'Zoomer', zoomOut:'Dézoomer', recenter:'Recentrer', mapHelp:'Glisse la carte ou utilise les flèches. Les repères représentent les étapes du quiz, sans GPS.',
    mapRegion:'Carte du parcours. Flèches pour déplacer, plus et moins pour zoomer, Début pour recentrer.',
    selected:'Repère sélectionné', lockedDetail:'Résous l’énigme actuelle pour révéler cette étape.',
    solvedDetail:'Cette étape est déjà dans ton carnet. Poursuis l’expédition.',
    race:'La course au trésor', activity:'Ça bouge !', overview:'Le fil de l’expédition', live:'Aperçu animé',
    rank:'Rang', name:'Chasseur', score:'Score', steps:'Étapes', you:'Toi', noActivity:'Les réponses apparaîtront ici.',
    eventSolved:'a résolu l’étape', eventFinish:'a trouvé le trésor', time:'À l’instant',
    join:'Jouer avec mon prénom', joinTitle:'À toi de prendre le cap', firstName:'Ton prénom', code:'Code de la démo',
    joinHint:'Code ATLAS. Ton prénom reste dans cette page, le temps de la démonstration.', start:'Commencer la chasse',
    invalidName:'Entre un prénom de 2 à 30 caractères.', invalidCode:'Pour cette démo, utilise le code ATLAS.',
    cancel:'Annuler', close:'Fermer', reset:'Recommencer', resetTitle:'Recommencer cette démo ?',
    resetHint:'Ton parcours et les participants fictifs seront remis à zéro.', confirm:'Oui, recommencer',
    trophy:'Le trésor est retrouvé', bravo:'Bravo pour la victoire', won:'Tu as remporté cette chasse au trésor de démonstration.',
    result:'Ton expédition est terminée', resultText:'Toutes les énigmes sont résolues. Voici le résultat de cette démonstration.',
    finalRank:'Place finale', seeRank:'Voir le classement', again:'Une nouvelle expédition',
    control:'Le poste de commandement', controlIntro:'Prépare la chasse et accompagne les joueurs, depuis un espace organisé.',
    session:'Session de démonstration', quiz:'Les énigmes du parcours', editing:'Modifier une énigme',
    edit:'Modifier', save:'Enregistrer', edited:'L’énigme a été modifiée dans cet aperçu uniquement.',
    prompt:'Question', questionFr:'Question française', questionEn:'Question anglaise',
    deletePlayer:'Retirer ce participant fictif', removed:'Participant fictif retiré.',
    pause:'Suspendre la démo', resume:'Reprendre la démo', paused:'Démo suspendue', active:'Démo en cours',
    invitation:'Invitation de démonstration', invitationText:'Sur l’application réelle, les joueurs rejoignent par URL, code ou QR. Ici, les parties sont indépendantes sur chaque appareil.',
    copyLink:'Copier le lien de cette démo', copied:'Lien copié.', copyFailed:'Copie indisponible : utilise l’adresse de ton navigateur.',
    export:'Exporter le classement fictif', simulate:'Animer les participants fictifs', stopSim:'Arrêter l’animation des participants',
    phone:'Joue sur ton téléphone', roomIntro:'Le classement à l’honneur. Chaque étape compte.',
    footer:'Une expédition au cœur du Gala Reconnaissance', footerDemo:'Étude de design · données fictives · aucun paiement',
    help:'Comprendre la démo', helpTitle:'Comment essayer ce design ?',
    helpText:'Joue avec ton prénom, réponds aux 10 énigmes en images et explore la carte. Une bonne réponse fait avancer automatiquement en 180 ms. Une erreur ou 20 secondes écoulées permet de réessayer. Les vues Organisateur et Écran de salle partagent ce parcours dans cette page. Les autres chasseurs sont simulés ; cette démo ne synchronise pas les téléphones.',
    empty:'Aucun autre participant dans cette démo.', stepDetail:'Détail de l’étape', stages:'Les étapes de l’expédition',
    reason:'Le parcours symbolise le quiz en salle.', sessionCode:'CODE DE LA DÉMO', clear:'Simple. Lisible. À ton rythme.',
    hundred:'100 points par énigme', compactMap:'Carte du gala', finish:'Voir mon résultat',
    progressLabel:'énigmes résolues sur 10', editError:'Complète les deux questions (8 à 200 caractères).',
    pausedHint:'Reprends la démonstration depuis l’espace organisateur.', introductionTag:'LE CARNET DU GALA',
    mapTag:'TON EXPÉDITION', missionTag:'LA PROCHAINE DÉCOUVERTE'
  },
  en: {
    app:'Treasure Hunt', gala:'CCIMN · Recognition Gala 2026', demo:'Interactive demo',
    simulation:'Simulated participants and activity · separate from the real game',
    compare:'Compare designs', player:'Player', organizer:'Organizer', room:'Room screen',
    atlas:'Gala Atlas', expedition:'Living Expedition', mission:'Clean Mission',
    introduction:'Your expedition journal', intro:'Explore, solve, progress. Each riddle brings you closer to the treasure.',
    mapTitle:'The treasure map', mapIntro:'Follow your journey. Each correct answer reveals a new stage.',
    missionTitle:'The treasure is within reach', missionIntro:'A clear path, one riddle at a time.',
    step:'Stage', progress:'Your progress', found:'solved', current:'In progress', locked:'Undiscovered', solved:'Solved',
    next:'The next riddle', continue:'Continue the riddle', explore:'Explore the map', back:'Back to the journey',
    yourRank:'Your place', points:'points', hunters:'hunters', retry:'Retry the same riddle',
    wrong:'That is not the correct answer. Another attempt awaits.', timeout:'Time is up. Try the same riddle again.',
    correct:'Correct answer! The path unfolds.', penalty:'25% fewer points per failed attempt, minimum 25 points.',
    remaining:'Time remaining', question:'Riddle', choose:'Choose an image to answer.', attempt:'Another attempt',
    north:'North', zoomIn:'Zoom in', zoomOut:'Zoom out', recenter:'Recenter', mapHelp:'Drag the map or use the arrow keys. Markers show quiz stages, without GPS.',
    mapRegion:'Journey map. Arrow keys to pan, plus and minus to zoom, Home to recenter.',
    selected:'Selected marker', lockedDetail:'Solve the current riddle to reveal this stage.',
    solvedDetail:'This stage is already in your journal. Continue the expedition.',
    race:'The treasure race', activity:'On the move!', overview:'Expedition activity', live:'Animated preview',
    rank:'Rank', name:'Hunter', score:'Score', steps:'Stages', you:'You', noActivity:'Answers will appear here.',
    eventSolved:'solved stage', eventFinish:'found the treasure', time:'Just now',
    join:'Play with my name', joinTitle:'Set your own course', firstName:'Your first name', code:'Demo code',
    joinHint:'Code ATLAS. Your name stays in this page for this demonstration only.', start:'Start the hunt',
    invalidName:'Enter a name with 2 to 30 characters.', invalidCode:'Use code ATLAS for this demo.',
    cancel:'Cancel', close:'Close', reset:'Start again', resetTitle:'Restart this demo?',
    resetHint:'Your journey and the fictional participants will be reset.', confirm:'Yes, start again',
    trophy:'The treasure has been found', bravo:'Congratulations on your victory', won:'You won this demonstration treasure hunt.',
    result:'Your expedition is complete', resultText:'Every riddle has been solved. Here is the result of this demonstration.',
    finalRank:'Final place', seeRank:'See the leaderboard', again:'A new expedition',
    control:'The command post', controlIntro:'Prepare the hunt and support the players from a clear workspace.',
    session:'Demonstration session', quiz:'The journey’s riddles', editing:'Edit a riddle',
    edit:'Edit', save:'Save', edited:'The riddle has been changed in this preview only.',
    prompt:'Question', questionFr:'French question', questionEn:'English question',
    deletePlayer:'Remove this fictional participant', removed:'Fictional participant removed.',
    pause:'Pause the demo', resume:'Resume the demo', paused:'Demo paused', active:'Demo in progress',
    invitation:'Demonstration invitation', invitationText:'In the real application, players join using a URL, code or QR. Here, each device has an independent game.',
    copyLink:'Copy this demo’s link', copied:'Link copied.', copyFailed:'Copy unavailable: use the address in your browser.',
    export:'Export the fictional leaderboard', simulate:'Animate fictional participants', stopSim:'Stop the participant animation',
    phone:'Play on your phone', roomIntro:'The leaderboard takes center stage. Every stage counts.',
    footer:'An expedition at the heart of the Recognition Gala', footerDemo:'Design study · fictional data · no payment',
    help:'About this demo', helpTitle:'How do I try this design?',
    helpText:'Play using your own name, answer 10 image riddles and explore the map. A correct answer advances automatically after 180 ms. A wrong answer or 20 seconds elapsed allows a retry. Organizer and Room screen views share this journey in this page. Other hunters are simulated; this demo does not synchronize phones.',
    empty:'No other participants in this demo.', stepDetail:'Stage details', stages:'Expedition stages',
    reason:'The journey represents the in-room quiz.', sessionCode:'DEMO CODE', clear:'Simple. Clear. At your pace.',
    hundred:'100 points per riddle', compactMap:'Gala map', finish:'View my result',
    progressLabel:'riddles solved out of 10', editError:'Complete both questions (8 to 200 characters).',
    pausedHint:'Resume the demonstration in the organizer workspace.', introductionTag:'THE GALA JOURNAL',
    mapTag:'YOUR EXPEDITION', missionTag:'THE NEXT DISCOVERY'
  }
};

const icons = {
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>',
  arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>', check:'<path d="m5 12 4 4L19 6"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16"/>',
  trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0Zm5 12v6m-4 0h8M7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/>',
  edit:'<path d="m15 4 5 5-11 11-6 1 1-6Zm-9 9 5 5M13 6l5 5"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>', plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
  target:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 1v4m0 14v4M1 12h4m14 0h4"/>',
  spark:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>', trash:'<path d="M4 7h16M9 7V3h6v4M6 7l1 14h10l1-14M10 11v6m4-6v6"/>',
  play:'<path d="m8 4 12 8-12 8Z"/>', pause:'<path d="M8 5v14M16 5v14"/>',
  flag:'<path d="M5 22V3m0 0h13l-3 5 3 5H5"/>', link:'<path d="m10 14 4-4m-6 7-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m4-2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.compass}</svg>`;
const escape = value => String(value).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
let lang = 'fr';
try {lang = localStorage.getItem('chasse-demo-language') === 'en' ? 'en' : 'fr';} catch {}
const t = key => copy[lang][key];
const local = texts => texts[lang === 'en' ? 1 : 0];
let game = createGame();
let view = 'player';
let selectedStage = game.done;
let map = {scale:1,x:0,y:0};
let animating = true;
let pauseStarted = null;
let pendingAdvance = null;
let feedback = null;
const root = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const notice = document.querySelector('#notice');
const coords = [[18,80],[31,65],[21,44],[38,22],[56,36],[75,18],[82,47],[65,64],[82,80],[54,88]];

function action(label, actionName, glyph='arrow', className='primary', extra='') {
  return `<button type="button" class="button ${className}" data-action="${actionName}" ${extra}>${escape(label)}${icon(glyph)}</button>`;
}
function rankOf() {return standings(game).findIndex(p => p.self) + 1;}
function title(index) {return local(questions[Math.min(index, TOTAL-1)].title);}
function eventText(event) {return `${escape(event.name)} ${t(event.finish ? 'eventFinish':'eventSolved')}${event.finish ? '' : ' ' + event.step}`;}
function announce(text) {notice.textContent = ''; requestAnimationFrame(() => {notice.textContent = text;});}
function addEvent(name, step, finish=false) {game.events.unshift({name,step,finish});game.events = game.events.slice(0,5);}

function header() {
  return `<div class="demo-toolbar"><a href="../">${icon('arrow')} ${t('compare')}</a><span>${t(theme)} <span class="demo-pill">${t('demo')}</span></span><button class="language" type="button" data-action="language" aria-label="${lang === 'fr' ? 'Switch the entire demo to English':'Passer toute la démo en français'}">${lang === 'fr' ? 'EN':'FR'}</button></div>
    <header class="app-header"><a class="brand" href="./"><img src="${asset}treasure-logo.svg" alt="" width="44" height="44"><span><strong>${t('app')}</strong><small>${t('gala')}</small></span></a><nav aria-label="${lang==='fr'?'Vues de la démo':'Demo views'}">${['player','organizer','room'].map(item => `<button type="button" data-view="${item}" aria-current="${view===item?'page':'false'}">${t(item)}</button>`).join('')}</nav><button class="icon-button help" type="button" data-action="help" aria-label="${t('help')}">?</button></header>`;
}

function footer() {
  return `<footer class="event-footer"><div class="footer-copy"><img src="${asset}treasure-logo.svg" alt="" width="40" height="40"><div><strong>${t('footer')}</strong><small>${t('footerDemo')}</small></div></div><div class="event-partner" role="img" aria-label="Le Capitaine · MTL NORD"><img src="${asset}event-poster.jpeg" alt="" width="1203" height="1600" loading="lazy"></div></footer>`;
}
function banner() {return `<div class="event-strip"><span>${t('gala')}</span><span>12.11.2026</span></div>`;}
function metrics() {
  return `<div class="metrics"><div><span>${t('progress')}</span><strong>${game.done}<small> / ${TOTAL}</small></strong></div><div><span>${t('yourRank')}</span><strong>${rankOf()}<small>${lang==='fr'?'e':''}</small></strong></div><div><span>${t('score')}</span><strong>${game.score}<small> ${t('points')}</small></strong></div></div>`;
}
function progress(className='') {
  return `<div class="progress-card ${className}"><div class="compass-medallion">${compass()}</div><div class="progress-copy"><span>${t('progress')}</span><strong>${game.done}<small> / ${TOTAL}</small></strong><div class="segments" role="img" aria-label="${game.done} ${t('progressLabel')}">${questions.map((_,i)=>`<span class="${i < game.done ? 'filled': i===game.done?'now':''}"></span>`).join('')}</div></div></div>`;
}
function compass() {
  return `<svg class="compass" viewBox="0 0 100 100" role="img" aria-label="${t('north')} : N"><circle cx="50" cy="52" r="37"/><circle cx="50" cy="52" r="29"/><path d="M50 20v64M18 52h64M27 29l46 46M27 75l46-46"/><path class="compass-needle" d="m50 21 7 25 25 6-25 7-7 25-7-25-25-7 25-6Z"/><text x="50" y="11" text-anchor="middle">N</text></svg>`;
}

function mapView(compact=false) {
  const route = coords.map(([x,y]) => `${x*8},${y*5.6}`).join(' ');
  const doneRoute = coords.slice(0,Math.min(game.done+1,TOTAL)).map(([x,y])=>`${x*8},${y*5.6}`).join(' ');
  return `<div class="map-shell ${compact ? 'compact-map':''}"><div class="map-viewport" tabindex="0" role="region" aria-label="${t('mapRegion')}"><div class="map-world" style="transform:translate(${map.x}px,${map.y}px) scale(${map.scale})"><img class="map-texture" src="${asset}event-map-texture.png" alt="" width="1600" height="1100"><svg class="map-contours" viewBox="0 0 800 560" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="grid" width="64" height="64" patternTransform="rotate(-24)" patternUnits="userSpaceOnUse"><path d="M0 0H64V64H0Z" fill="none" stroke="#425775" stroke-width=".7"/></pattern></defs><rect width="800" height="560" fill="url(#grid)"/><path class="map-river" d="M560-50C140 130 680 100 420 270S450 480 100 660"/><path class="map-contour" d="M-30 400C80 280 90 190 230 160S250 50 410-20M0 450C130 300 170 180 290 210S390 70 460 20M-20 500C190 360 180 260 320 280S400 180 480 100M-20 540C230 470 230 370 370 390S510 310 660 340M490 580C510 400 600 420 700 400S720 150 830 170M540 580C580 480 700 520 750 380S780 250 830 240"/><polyline class="route-future" points="${route}"/><polyline class="route-done" points="${doneRoute}"/></svg>
    ${coords.map(([x,y],i) => `<button class="map-node ${i<game.done?'completed':i===game.done?'current':'locked'} ${i===selectedStage?'selected':''}" style="left:${x}%;top:${y}%" type="button" data-stage="${i}" aria-label="${t('step')} ${i+1} : ${i<game.done?t('solved'):i===game.done?t('current'):t('locked')}" aria-pressed="${i===selectedStage}">${i<game.done?icon('check'):i===game.done?i+1:icon('lock')}<span class="map-node-label">${i+1}</span></button>`).join('')}
    ${game.rivals.slice(0,3).map((p,i)=>{const [x,y]=coords[Math.max(0,p.done-1)];return `<span class="rival-marker" style="left:${x+5+i*2}%;top:${y+8}%" title="${escape(p.name)} · ${p.done}/10">${escape(p.name.slice(0,2).toUpperCase())}</span>`;}).join('')}
    <img class="map-treasure" src="${asset}event-chest.png" alt="" width="160" height="136"></div><div class="map-compass">${compass()}</div><div class="map-controls">${action(t('zoomIn'),'zoom-in','plus','icon-button')}${action(t('zoomOut'),'zoom-out','minus','icon-button')}${action(t('recenter'),'recenter','target','icon-button')}</div><span class="map-coordinate">45°36′ N · 73°37′ O</span></div><div class="map-legend"><span>${icon('check')} ${t('solved')}</span><span><i class="legend-current"></i>${t('current')}</span><span>${icon('lock')} ${t('locked')}</span></div></div>`;
}

function stageCard() {
  const finished = game.done >= TOTAL;
  return `<section class="next-card"><div class="next-object"><img src="${asset}event-chest.png" alt="" width="200" height="200"></div><div class="next-copy"><span class="eyebrow">${finished?t('trophy'):t('next')+' · '+t('step')+' '+(game.done+1)}</span><h2>${finished?t('result'):title(game.done)}</h2><p>${t('reason')}</p><span class="quiet-line">${icon('spark')} ${t('hundred')}</span></div>${action(finished?t('finish'):t('continue'),finished?'result':'question')}</section>`;
}
function stages(limit=TOTAL) {
  return `<ol class="stage-list">${questions.slice(0,limit).map((q,i)=>`<li><button type="button" class="stage-row ${i===game.done?'active-stage':''}" data-stage="${i}"><span class="stage-number">${i<game.done?icon('check'):i+1}</span><span><strong>${local(q.title)}</strong><small>${t('step')} ${i+1} · ${i<game.done?t('solved'):i===game.done?t('current'):t('locked')}</small></span><span class="stage-status">${icon(i<game.done?'check':i===game.done?'arrow':'lock')}</span></button></li>`).join('')}</ol>`;
}
function playerView() {
  if(game.phase === 'question' || game.phase === 'retry' || game.phase === 'success') return questionView();
  if(game.phase === 'finished') return resultView();
  const introTitle = t(theme==='atlas'?'introduction':theme==='expedition'?'mapTitle':'missionTitle');
  return `<main id="main" class="player-layout ${theme}"><div class="page-heading"><div><span class="eyebrow">${t(theme==='atlas'?'introductionTag':theme==='expedition'?'mapTag':'missionTag')}</span><h1>${introTitle}</h1><p>${t(theme==='atlas'?'intro':theme==='expedition'?'mapIntro':'missionIntro')}</p></div>${action(t('join'),'join','flag','secondary')}</div>
    ${theme==='atlas'?`<div class="atlas-grid"><section class="journal-map">${mapView()}<div class="journal-caption"><span>01 — 10</span><strong>${t('app')}</strong><small>${t('gala')}</small></div></section><div class="journal-sidebar">${progress()}${stageCard()}<div class="journal-note">${icon('compass')}<p>${t('mapHelp')}</p></div></div></div><section class="journal-stages"><div class="section-title"><h2>${t('stages')}</h2>${action(t('explore'),'map','map','text-button')}</div>${stages()}</section>`:''}
    ${theme==='expedition'?`<div class="expedition-grid"><section class="expedition-map">${mapView()}<div class="floating-progress"><span>${t('progress')}</span><strong>${game.done}<small> / ${TOTAL}</small></strong></div><div class="map-bottom-sheet">${stageCard()}</div></section><aside class="match-sidebar">${metrics()}${leaderboard(false,4)}${activity()}<p class="subtle-note">${t('mapHelp')}</p></aside></div>`:''}
    ${theme==='mission'?`<div class="mission-grid"><section class="mission-main">${progress('mission-progress')}<h2 class="small-title">${t('stages')}</h2>${stages(Math.min(TOTAL,game.done+2))}${stageCard()}</section><aside class="mission-aside"><div class="mini-map-card"><div class="section-title"><h2>${t('compactMap')}</h2>${icon('map')}</div>${mapView(true)}${action(t('explore'),'map','map','secondary')}</div>${metrics()}${leaderboard(false,3)}</aside></div>`:''}
  </main>`;
}

function questionView() {
  const index = Math.min(game.done,TOTAL-1);
  const q = questions[index];
  const blocked = game.phase !== 'question' || game.paused;
  return `<main id="main" class="question-layout"><div class="question-top">${action(t('back'),'map','map','text-button')}<span>${t('step')} ${index+1} / ${TOTAL}</span></div><section class="question-panel"><div class="question-heading"><div><span class="eyebrow">${title(index)}</span><h1>${local(q.text)}</h1><p>${t('choose')}</p></div><div class="timer" role="timer" aria-label="${t('remaining')}"><strong data-seconds>${secondsLeft(game)}</strong><span>s</span><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="35"/><circle class="timer-track" cx="40" cy="40" r="35"/></svg></div></div>
    <div class="answer-grid">${q.choices.map(id => `<button type="button" class="answer" data-answer="${id}" ${blocked?'disabled':''}><img src="${asset}quiz-images/${id}.png" alt="" width="300" height="300"><span>${escape(local(objects[id]))}</span></button>`).join('')}</div>
    <div class="feedback ${feedback?.kind || ''}" role="status">${game.paused?`${icon('pause')}<p>${t('paused')}<small>${t('pausedHint')}</small></p>`:feedback?`${icon(feedback.kind==='correct'?'check':'clock')}<p>${t(feedback.kind==='correct'?'correct':feedback.kind==='timeout'?'timeout':'wrong')}${feedback.points?`<strong> +${feedback.points} ${t('points')}</strong>`:''}</p>`:''}</div>
    ${game.phase==='retry'?action(t('retry'),'retry','arrow'):''}<p class="subtle-note">${t('penalty')}</p></section><aside class="question-recap">${progress()}${metrics()}${action(t('explore'),'map','map','secondary')}<p class="subtle-note">${t('simulation')}</p></aside></main>`;
}

function mapPage() {
  const state = selectedStage<game.done?'solved':selectedStage===game.done?'current':'locked';
  return `<main id="main"><div class="page-heading"><div><span class="eyebrow">${t('mapTag')}</span><h1>${t('mapTitle')}</h1><p>${t('mapHelp')}</p></div>${action(game.phase==='question'?t('continue'):t('back'),game.phase==='question'?'return-question':'player','arrow','secondary')}</div><div class="explorer-grid"><section>${mapView()}<div class="selected-detail"><span class="eyebrow">${t('selected')} · ${t('step')} ${selectedStage+1}</span><h2>${state==='locked'?t('locked'):title(selectedStage)}</h2><p>${t(state==='locked'?'lockedDetail':state==='solved'?'solvedDetail':'reason')}</p>${state==='current'?action(t('continue'),'question'):''}</div></section><aside class="match-sidebar">${metrics()}${leaderboard(false,5)}${activity()}</aside></div></main>`;
}
function leaderboard(room=false,limit=5) {
  return `<section class="leaderboard ${room?'room-leaderboard':''}"><div class="section-title"><h2>${t('race')}</h2>${icon('trophy')}</div><ol>${standings(game).slice(0,limit).map((p,i)=>`<li class="rank-row ${p.self?'self':''}"><span class="rank-number">${i+1}</span><span class="avatar">${escape(p.name.slice(0,2).toUpperCase())}</span><div class="rank-person"><strong>${escape(p.name)}${p.self?` <small>${t('you')}</small>`:''}</strong><span>${p.done}/10 ${t('found')}</span><div class="rank-track"><span style="transform:scaleX(${p.done/10})"></span></div></div><strong class="rank-score">${p.score}<small>${t('points')}</small></strong></li>`).join('')}</ol></section>`;
}
function activity() {
  return `<section class="activity"><div class="section-title"><h2>${t('activity')}</h2><span class="live-dot" aria-hidden="true"></span></div><ol>${game.events.length?game.events.map(e=>`<li>${icon(e.finish?'trophy':'check')}<div><p>${eventText(e)}</p><small>${t('time')}</small></div></li>`).join(''):`<li class="activity-empty">${t('noActivity')}</li>`}</ol><button type="button" class="text-button" data-action="simulate" aria-pressed="${animating}">${icon(animating?'pause':'play')}${t(animating?'stopSim':'simulate')}</button></section>`;
}
function roomView() {
  return `<main id="main" class="room-layout"><div class="page-heading"><div><span class="eyebrow">${t('gala')}</span><h1>${t('race')}</h1><p>${t('roomIntro')}</p></div><div class="room-code"><span>${t('sessionCode')}</span><strong>ATLAS</strong><small>${game.rivals.length+1} ${t('hunters')}</small></div></div><div class="room-grid">${leaderboard(true)}<aside>${activity()}<div class="room-mini-map">${mapView(true)}</div><p class="subtle-note">${t('simulation')}</p></aside></div></main>`;
}
function organizerView() {
  return `<main id="main"><div class="page-heading"><div><span class="eyebrow">${t('organizer')}</span><h1>${t('control')}</h1><p>${t('controlIntro')}</p></div><span class="status-pill">${icon(game.paused?'pause':'play')}${t(game.paused?'paused':'active')}</span></div><div class="organizer-grid"><section class="panel quiz-editor"><div class="section-title"><h2>${t('quiz')}</h2><span>10 ${t('steps')}</span></div><ol>${questions.map((q,i)=>`<li><span class="editor-number">${String(i+1).padStart(2,'0')}</span><div><strong>${local(q.title)}</strong><p>${local(q.text)}</p><small>100 ${t('points')} · 20 s</small></div><button type="button" class="icon-button" data-edit="${i}" aria-label="${t('edit')} : ${title(i)}">${icon('edit')}</button></li>`).join('')}</ol></section><aside class="control-sidebar"><section class="panel"><span class="eyebrow">${t('session')}</span><h2>ATLAS</h2>${metrics()}${action(t(game.paused?'resume':'pause'),'pause',game.paused?'play':'pause','secondary')}${action(t('reset'),'reset','target','text-button')}</section><section class="panel"><h2>${t('hunters')}</h2><ul class="participant-list">${game.rivals.map((p,i)=>`<li><div><strong>${escape(p.name)}</strong><small>ID ${escape(p.id)} · ${p.score} ${t('points')}</small></div><button class="icon-button" type="button" data-remove="${i}" aria-label="${t('deletePlayer')} : ${escape(p.name)}">${icon('trash')}</button></li>`).join('') || `<li>${t('empty')}</li>`}</ul>${action(t('export'),'export','arrow','secondary')}</section><section class="panel"><h2>${t('invitation')}</h2><p>${t('invitationText')}</p>${action(t('copyLink'),'copy','link','secondary')}</section></aside></div></main>`;
}
function resultView() {
  const winner = standings(game)[0];
  const won = winner.self;
  return `<main id="main" class="result-layout"><section class="result-card"><span class="eyebrow">${t('trophy')}</span><img class="victory-chest" src="${asset}event-chest.png" width="420" height="356" alt=""><h1>${won?t('bravo'):t('result')}${won?', '+escape(game.name)+' !':''}</h1><p>${t(won?'won':'resultText')}</p><div class="result-metrics"><div><strong>${game.score}</strong><span>${t('points')}</span></div><div><strong>10/10</strong><span>${t('found')}</span></div><div><strong>${rankOf()}</strong><span>${t('finalRank')}</span></div></div>${action(t('seeRank'),'room','trophy')}${action(t('again'),'join','compass','secondary')}</section></main>`;
}
function render({focus=false}={}) {
  // Keep keyboard position when only the simulated standings refresh.
  const active=document.activeElement;
  const focusedKey=root.contains(active)?['action','view','stage','answer','edit','remove'].find(key=>active.dataset[key]!==undefined):null;
  const focusedValue=focusedKey?active.dataset[focusedKey]:null;
  const mapFocused=root.contains(active)&&active.classList.contains('map-viewport');
  document.documentElement.lang = lang;
  document.querySelector('.skip-link').textContent = lang==='fr'?'Aller au contenu':'Skip to content';
  document.title = `${t(theme)} · ${t('app')} · ${t('demo')}`;
  document.body.classList.toggle('is-room', view==='room');
  const content = view==='organizer'?organizerView():view==='room'?roomView():view==='map'?mapPage():playerView();
  root.innerHTML = header()+banner()+`<p class="demo-disclaimer">${t('simulation')}</p>`+content+footer();
  bindMap();
  updateTimer();
  if(focus) {const heading = root.querySelector('main h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
  else if(focusedKey){const replacement=[...root.querySelectorAll('button')].find(button=>button.dataset[focusedKey]===focusedValue);replacement?.focus({preventScroll:true});}
  else if(mapFocused)root.querySelector('.map-viewport')?.focus({preventScroll:true});
}

function updateTimer() {
  const remaining = secondsLeft(game,game.paused && pauseStarted!==null ? pauseStarted : Date.now());
  root.querySelectorAll('[data-seconds]').forEach(el=>{el.textContent=remaining;});
  root.querySelectorAll('.timer-track').forEach(el=>{el.style.strokeDashoffset = 220*(1-remaining/20);});
  if(game.phase==='question' && !game.paused && remaining===0) {feedback = submitAnswer(game, null);render();announce(t('timeout'));}
}
function startQuestion() {
  if(game.paused) {announce(t('pausedHint'));return;}
  view='player';
  if(game.phase!=='question') {beginQuestion(game);feedback=null;}
  render({focus:true});
}
function changeView(next) {view=next;render({focus:true});}
function modal(titleText,content) {
  dialog.innerHTML=`<div class="dialog-header"><h2 id="dialog-title">${escape(titleText)}</h2><button type="button" class="icon-button" data-dialog-close aria-label="${t('close')}">${icon('close')}</button></div>${content}`;
  dialog.showModal();
  dialog.querySelector('[data-dialog-close]').addEventListener('click',()=>dialog.close());
}
function joinModal() {
  modal(t('joinTitle'),`<form id="join-form" novalidate><label for="first-name">${t('firstName')}</label><input id="first-name" name="name" autocomplete="given-name" minlength="2" maxlength="30" required value="${game.preview?'':escape(game.name)}"><label for="demo-code">${t('code')}</label><input id="demo-code" name="code" value="ATLAS" maxlength="12" autocapitalize="characters" required><p id="join-hint">${t('joinHint')}</p><p id="form-error" class="form-error" role="alert"></p><button type="submit" class="button primary">${t('start')}${icon('arrow')}</button></form>`);
  dialog.querySelector('#join-form').addEventListener('submit',e=>{
    e.preventDefault();
    const form = new FormData(e.target);
    const name = String(form.get('name')).trim();
    const code = String(form.get('code')).trim().toUpperCase();
    const error = !/^[\p{L}\p{N}][\p{L}\p{N}\s'.’-]{1,29}$/u.test(name)?'invalidName':code!=='ATLAS'?'invalidCode':null;
    if(error) {dialog.querySelector('#form-error').textContent=t(error);return;}
    clearTimeout(pendingAdvance);game=createGame(name,false);selectedStage=0;feedback=null;map={scale:1,x:0,y:0};view='player';dialog.close();render({focus:true});
  });
  dialog.querySelector('#first-name').focus();
}
function editModal(index) {
  modal(t('editing'),`<form id="edit-form" novalidate><label for="edit-fr">${t('questionFr')}</label><textarea id="edit-fr" rows="3" maxlength="200">${escape(questions[index].text[0])}</textarea><label for="edit-en">${t('questionEn')}</label><textarea id="edit-en" rows="3" maxlength="200">${escape(questions[index].text[1])}</textarea><p class="form-error" role="alert" id="edit-error"></p><button class="button primary" type="submit">${t('save')}${icon('check')}</button></form>`);
  dialog.querySelector('#edit-form').addEventListener('submit',e=>{e.preventDefault();const fr=dialog.querySelector('#edit-fr').value.trim();const en=dialog.querySelector('#edit-en').value.trim();if([fr,en].some(s=>s.length<8||s.length>200)){dialog.querySelector('#edit-error').textContent=t('editError');return;}questions[index].text=[fr,en];dialog.close();render();announce(t('edited'));});
}
function resetModal() {
  modal(t('resetTitle'),`<p>${t('resetHint')}</p><div class="dialog-actions">${action(t('confirm'),'confirm-reset','target')}${action(t('cancel'),'cancel-reset','close','secondary')}</div>`);
  dialog.querySelector('[data-action="cancel-reset"]').onclick=()=>dialog.close();
  dialog.querySelector('[data-action="confirm-reset"]').onclick=()=>{clearTimeout(pendingAdvance);game=createGame(game.name,false);feedback=null;selectedStage=0;map={scale:1,x:0,y:0};view='player';dialog.close();render({focus:true});};
}
function transformMap() {root.querySelectorAll('.map-world').forEach(el=>{el.style.transform=`translate(${map.x}px,${map.y}px) scale(${map.scale})`;});}
function zoom(amount) {map.scale=Math.max(1,Math.min(2.2,map.scale+amount));if(map.scale===1){map.x=0;map.y=0;}transformMap();announce(`${Math.round(map.scale*100)} %`);}
function pan(x,y) {map.x=Math.max(-220,Math.min(220,map.x+x));map.y=Math.max(-160,Math.min(160,map.y+y));transformMap();}
function bindMap() {
  root.querySelectorAll('.map-viewport').forEach(el=>{
    let drag=null;
    el.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY};el.setPointerCapture(e.pointerId);});
    el.addEventListener('pointermove',e=>{if(!drag)return;pan(e.clientX-drag.x,e.clientY-drag.y);drag={x:e.clientX,y:e.clientY};});
    el.addEventListener('pointerup',()=>{drag=null;});el.addEventListener('pointercancel',()=>{drag=null;});
    el.addEventListener('keydown',e=>{const moves={ArrowLeft:[32,0],ArrowRight:[-32,0],ArrowUp:[0,32],ArrowDown:[0,-32]};if(moves[e.key]){e.preventDefault();pan(...moves[e.key]);}else if(['+','=','-','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home'){map={scale:1,x:0,y:0};transformMap();}else zoom(e.key==='-'?-.2:.2);}});
  });
}

root.addEventListener('click',async e=>{
  const button=e.target.closest('button');if(!button)return;
  if(button.dataset.view){changeView(button.dataset.view);return;}
  if(button.dataset.stage!==undefined){selectedStage=Number(button.dataset.stage);view='map';render({focus:true});return;}
  if(button.dataset.edit!==undefined){editModal(Number(button.dataset.edit));return;}
  if(button.dataset.remove!==undefined){game.rivals.splice(Number(button.dataset.remove),1);render();announce(t('removed'));return;}
  if(button.dataset.answer){feedback=submitAnswer(game,button.dataset.answer);if(feedback.kind==='correct'){addEvent(game.name,game.done,game.done===TOTAL);selectedStage=Math.min(game.done,TOTAL-1);render();announce(t('correct'));pendingAdvance=setTimeout(()=>{feedback=null;if(game.done<TOTAL)beginQuestion(game);render({focus:true});},180);}else if(feedback.kind!=='ignored'){render();announce(t(feedback.kind==='timeout'?'timeout':'wrong'));}return;}
  const actionName=button.dataset.action;
  if(actionName==='language'){lang=lang==='fr'?'en':'fr';try{localStorage.setItem('chasse-demo-language',lang);}catch{}render();}
  else if(actionName==='question'||actionName==='retry')startQuestion();
  else if(actionName==='return-question')changeView('player');
  else if(['map','player','room'].includes(actionName))changeView(actionName);
  else if(actionName==='result'){game.phase='finished';changeView('player');}
  else if(actionName==='join')joinModal();
  else if(actionName==='reset')resetModal();
  else if(actionName==='help')modal(t('helpTitle'),`<p>${t('helpText')}</p>`);
  else if(actionName==='zoom-in')zoom(.2);
  else if(actionName==='zoom-out')zoom(-.2);
  else if(actionName==='recenter'){map={scale:1,x:0,y:0};transformMap();announce(t('recenter'));}
  else if(actionName==='simulate'){animating=!animating;render();}
  else if(actionName==='pause'){
    game.paused=!game.paused;
    if(game.paused)pauseStarted=Date.now();else if(game.deadline!==null&&pauseStarted!==null)game.deadline+=Date.now()-pauseStarted;
    render();announce(t(game.paused?'paused':'active'));
  }
  else if(actionName==='copy'){
    try{await navigator.clipboard.writeText(location.href);announce(t('copied'));}catch{announce(t('copyFailed'));}
  }
  else if(actionName==='export'){
    const csvCell = value => {
      const text=String(value);
      const safe=/^\s*[=+\-@]/.test(text)?"'"+text:text;
      return `"${safe.replace(/"/g,'""')}"`;
    };
    const rows=[[t('rank'),t('name'),t('score'),t('steps')],...standings(game).map((p,i)=>[i+1,p.name,p.score,p.done])];
    const blob=new Blob(['\uFEFF'+rows.map(r=>r.map(csvCell).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`classement-demo-${theme}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
});
// A slow demo beat keeps changes readable. This is explicitly simulated, not realtime network data.
setInterval(()=>{if(!animating||dialog.open)return;const event=simulateRival(game);if(event){addEvent(event.name,event.step);if(game.phase!=='question'&&game.phase!=='retry')render();else if(view!=='player')render();}},9000);
setInterval(updateTimer,250);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateTimer();});
render();
