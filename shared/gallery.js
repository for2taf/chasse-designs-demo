// The gallery and demos share local language preferences, never player data.
const content = {
  fr: {
    app:'Chasse au trésor', gala:'CCIMN · Gala Reconnaissance 2026', demo:'Démos interactives',
    kicker:'UNE IDENTITÉ · TROIS EXPÉRIENCES', title:'Trois façons de vivre l’aventure',
    description:'Même bleu nuit, même or. Trois parcours à essayer pour choisir ensemble l’ambiance de la prochaine chasse au trésor.',
    recommended:'Direction recommandée', open:'Essayer ce design',
    names:['Atlas du gala','Expédition vivante','Mission épurée'],
    details:[
      'Un carnet d’expédition élégant. Carte encadrée, boussole et étapes à collectionner : le charme d’un atlas, la clarté d’une application.',
      'Une carte au premier plan. Les repères se dévoilent au fil des bonnes réponses et le mini retour de la course accompagne le joueur.',
      'Un parcours calme et immédiat. Progression segmentée, étapes lisibles et action suivante évidente, pour jouer en toute confiance.'
    ],
    words:['Le carnet d’expédition','La prochaine découverte','Étape résolue','Énigme en cours','Trésor à découvrir'],
    testTitle:'Un parcours complet à essayer',
    test:'Ouvre un design, joue avec ton prénom puis réponds aux énigmes. Explore la carte, change de langue et passe aux vues organisateur ou écran de salle.',
    features:['10 énigmes en images','20 secondes','FR / EN','Carte interactive'],
    limitTitle:'Une démonstration pour choisir',
    limit:'Les joueurs, l’activité et les questions sont fictifs. Chaque appareil conserve son propre aperçu. Ces liens servent à comparer les interfaces ; le vrai jeu collectif reste sur l’application existante.',
    footer:'Étude de design · données fictives · aucun paiement'
  },
  en: {
    app:'Treasure Hunt', gala:'CCIMN · Recognition Gala 2026', demo:'Interactive demos',
    kicker:'ONE IDENTITY · THREE EXPERIENCES', title:'Three ways to experience the adventure',
    description:'The same midnight blue, the same gold. Try three journeys and choose the atmosphere of the next treasure hunt together.',
    recommended:'Recommended direction', open:'Try this design',
    names:['Gala Atlas','Living Expedition','Clean Mission'],
    details:[
      'An elegant expedition journal. A framed map, compass and stages to collect: the charm of an atlas with the clarity of an application.',
      'A map takes center stage. Checkpoints unfold with each correct answer, while a compact race recap keeps the player connected to the adventure.',
      'A calm and direct journey. Segmented progress, readable stages and a clear next action make it easy to play with confidence.'
    ],
    words:['The expedition journal','The next discovery','Stage solved','Riddle in progress','Treasure to discover'],
    testTitle:'A complete journey to try',
    test:'Open a design, play using your name and answer the riddles. Explore the map, change the language and switch to the organizer or room screen view.',
    features:['10 image riddles','20 seconds','FR / EN','Interactive map'],
    limitTitle:'A demonstration to help you choose',
    limit:'Players, activity and questions are fictional. Each device has its own preview. These links compare the interfaces; the actual collective game stays on the existing application.',
    footer:'Design study · fictional data · no payment'
  }
};
let lang='fr';
try {lang=localStorage.getItem('chasse-demo-language')==='en'?'en':'fr';} catch {}
const themes=['atlas','expedition','mission'];
function preview(theme,index,c) {
  const drawing=theme==='mission'
    ? `<div class="preview-steps"><span>01 · ${c.words[2]}</span><span>02 · ${c.words[3]}</span><span>03 · ${c.words[4]}</span></div>`
    : `<svg class="preview-route" viewBox="0 0 200 120" aria-hidden="true"><path d="M20 95 55 55 30 20 115 35 150 10 175 75 110 100"/><circle cx="20" cy="95" r="4"/><circle cx="55" cy="55" r="4"/><circle cx="30" cy="20" r="4"/><circle cx="115" cy="35" r="6"/></svg>`;
  const caption=theme==='atlas'
    ? `<span class="preview-frame"></span><span class="preview-word">${c.words[0]}</span>`
    : theme==='expedition'?`<span class="preview-sheet">${c.words[1]}</span>`:'';
  return `<div class="concept-preview preview-${theme}">
    <img src="./shared/assets/event-map-texture.png" alt="" width="1600" height="1100">
    <span class="preview-number">0${index+1}</span>${drawing}${caption}
  </div>`;
}
function card(theme,index,c) {
  return `<article class="concept">${preview(theme,index,c)}
    <div class="concept-content">
      ${index===1?`<span class="recommendation">${c.recommended}</span>`:''}
      <h2>${c.names[index]}</h2><p>${c.details[index]}</p>
      <a class="button primary" href="./${theme}/">${c.open}
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
      </a>
    </div>
  </article>`;
}
function render() {
  const c=content[lang];
  document.documentElement.lang=lang;
  document.title=c.title+' · '+c.app;
  document.querySelector('.skip-link').textContent=lang==='fr'?'Aller au contenu':'Skip to content';
  document.querySelector('#gallery').innerHTML=`
    <div class="demo-toolbar"><span>${c.gala}</span><span>${c.demo}</span>
      <button type="button" class="language" id="language" aria-label="${lang==='fr'?'Switch to English':'Passer en français'}">${lang==='fr'?'EN':'FR'}</button>
    </div>
    <main class="gallery" id="main">
      <section class="gallery-head"><div><span class="eyebrow">${c.kicker}</span><h1>${c.title}</h1><p>${c.description}</p></div>
        <img src="./shared/assets/event-chest.png" alt="" width="400" height="340">
      </section>
      <div class="concept-grid">${themes.map((theme,i)=>card(theme,i,c)).join('')}</div>
      <div class="gallery-info">
        <section><h2>${c.testTitle}</h2><p>${c.test}</p><ul>${c.features.map(f=>`<li>${f}</li>`).join('')}</ul></section>
        <section><h2>${c.limitTitle}</h2><p>${c.limit}</p></section>
      </div>
    </main>
    <footer class="event-footer"><div class="footer-copy"><img src="./shared/assets/treasure-logo.svg" alt="" width="40" height="40">
      <div><strong>${c.app}</strong><small>${c.footer}</small></div></div>
      <div class="event-partner" role="img" aria-label="Le Capitaine · MTL NORD"><img src="./shared/assets/event-poster.jpeg" alt="" width="1203" height="1600" loading="lazy"></div>
    </footer>`;
  document.querySelector('#language').onclick=()=>{
    lang=lang==='fr'?'en':'fr';
    try {localStorage.setItem('chasse-demo-language',lang);} catch {}
    render();document.querySelector('#language').focus();
  };
}
render();
