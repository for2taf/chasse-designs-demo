// This presentation engine is intentionally isolated from the real event server.
// Scoring mirrors its baseline: 100 points, -25% per retry, minimum 25 points.
export const TOTAL = 10;
export const ANSWER_SECONDS = 20;

export const objects = {
  'velo': ['Vélo', 'Bicycle'], 'avion': ['Avion', 'Airplane'],
  'boussole': ['Boussole', 'Compass'], 'cle-ancienne': ['Clé ancienne', 'Old key'],
  'ancre': ['Ancre', 'Anchor'], 'sablier': ['Sablier', 'Hourglass'],
  'lanterne': ['Lanterne', 'Lantern'], 'coffre-ferme': ['Coffre', 'Chest']
};

export const questions = [
  { title: ['Le premier cap', 'The first bearing'], text: ['Quel objet indique le nord ?', 'Which object points north?'], choices: ['velo','boussole','avion','ancre'], answer: 'boussole' },
  { title: ['La porte secrète', 'The secret door'], text: ['Quel objet permet d’ouvrir une serrure ?', 'Which object opens a lock?'], choices: ['lanterne','sablier','cle-ancienne','coffre-ferme'], answer: 'cle-ancienne' },
  { title: ['Prendre le large', 'Setting sail'], text: ['Quel objet maintient un bateau à sa place ?', 'Which object holds a boat in place?'], choices: ['ancre','avion','boussole','velo'], answer: 'ancre' },
  { title: ['La course au temps', 'A race against time'], text: ['Quel objet mesure le temps avec du sable ?', 'Which object measures time with sand?'], choices: ['cle-ancienne','lanterne','sablier','boussole'], answer: 'sablier' },
  { title: ['La lumière du chemin', 'Lighting the way'], text: ['Quel objet éclaire le chemin dans la nuit ?', 'Which object lights the path at night?'], choices: ['coffre-ferme','lanterne','velo','ancre'], answer: 'lanterne' },
  { title: ['Sur deux roues', 'On two wheels'], text: ['Quel véhicule avance grâce à des pédales ?', 'Which vehicle moves using pedals?'], choices: ['avion','ancre','velo','sablier'], answer: 'velo' },
  { title: ['Au-delà des nuages', 'Beyond the clouds'], text: ['Quel véhicule vole grâce à ses ailes ?', 'Which vehicle flies with wings?'], choices: ['velo','avion','coffre-ferme','cle-ancienne'], answer: 'avion' },
  { title: ['Le bon équipement', 'The right equipment'], text: ['Pour retrouver le nord, quel objet choisis-tu ?', 'Which object would you choose to find north?'], choices: ['sablier','lanterne','boussole','avion'], answer: 'boussole' },
  { title: ['Le dernier passage', 'The final passage'], text: ['Quel objet emportes-tu pour déverrouiller le trésor ?', 'Which object do you take to unlock the treasure?'], choices: ['cle-ancienne','ancre','velo','sablier'], answer: 'cle-ancienne' },
  { title: ['Le trésor retrouvé', 'The treasure found'], text: ['Quel objet peut abriter le trésor ?', 'Which object could hold the treasure?'], choices: ['avion','lanterne','coffre-ferme','boussole'], answer: 'coffre-ferme' }
];

export function createGame(name = 'Camille', preview = true) {
  return {
    name, done: preview ? 3 : 0, score: preview ? 300 : 0,
    attempts: 0, deadline: null, phase: 'map', paused: false,
    rivals: [
      { name: 'Sarah', done: preview ? 5 : 0, score: preview ? 500 : 0 },
      { name: 'Alex', done: preview ? 4 : 0, score: preview ? 375 : 0 },
      { name: 'Léa', done: preview ? 2 : 0, score: preview ? 200 : 0 },
      { name: 'Noah', done: preview ? 1 : 0, score: preview ? 100 : 0 }
    ], events: [], tick: 0, preview
  };
}

export function beginQuestion(game, now = Date.now()) {
  if (game.done >= TOTAL || game.paused) return false;
  game.phase = 'question';
  game.deadline = now + ANSWER_SECONDS * 1000;
  return true;
}

export function secondsLeft(game, now = Date.now()) {
  return game.deadline === null ? ANSWER_SECONDS : Math.max(0, Math.ceil((game.deadline - now) / 1000));
}

// Deadline is authoritative even if the browser throttles a background tab.
export function submitAnswer(game, choice, now = Date.now()) {
  if (game.phase !== 'question' || game.paused) return { kind: 'ignored' };
  const timedOut = game.deadline !== null && now >= game.deadline;
  const correct = !timedOut && choice === questions[game.done].answer;
  game.deadline = null;
  if (!correct) {
    game.attempts += 1;
    game.phase = 'retry';
    return { kind: timedOut ? 'timeout' : 'wrong' };
  }
  const points = Math.max(25, Math.round(100 * (1 - 0.25 * game.attempts)));
  game.score += points;
  game.done += 1;
  game.attempts = 0;
  game.phase = game.done === TOTAL ? 'finished' : 'success';
  return { kind: 'correct', points };
}

export function standings(game) {
  return [{ name: game.name, done: game.done, score: game.score, self: true }, ...game.rivals]
    .sort((a,b) => b.score - a.score || b.done - a.done || Number(Boolean(b.self)) - Number(Boolean(a.self)));
}

export function simulateRival(game) {
  if (game.paused || game.phase === 'finished' || game.rivals.length === 0) return null;
  game.tick += 1;
  const rival = game.rivals[(game.tick - 1) % game.rivals.length];
  // Rivals stay short of finishing so the demonstration has a real player finale.
  if (rival.done >= 9) return null;
  rival.done += 1;
  rival.score += 75;
  return { name: rival.name, step: rival.done };
}
