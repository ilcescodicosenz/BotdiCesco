export const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75; 

export function xpRange(level, multiplier = global.multiplier || 1) { 
  if (level < 0) { 
    throw new TypeError('level cannot be negative value'); 
  } 
  level = Math.floor(level); 
  const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1; 
  const max = Math.round(Math.pow(++level, growth) * multiplier); 
  return { 
    min, 
    max, 
    xp: max - min, 
  }; 
} 

export function findLevel(xp, multiplier = global.multiplier || 1) { 
  if (xp === Infinity) { 
    return Infinity; 
  } 
  if (isNaN(xp)) { 
    return NaN; 
  } 
  if (xp <= 0) { 
    return -1; 
  } 
  let level = 0; 
  do { 
    level++; 
  } 
  while (xpRange(level, multiplier).min <= xp); 
  return --level; 
} 

export function canLevelUp(level, xp, multiplier = global.multiplier || 1) { 
  if (level < 0) { 
    return false; 
  } 
  if (xp === Infinity) { 
    return true; 
  } 
  if (isNaN(xp)) { 
    return false; 
  } 
  if (xp <= 0) { 
    return false; 
  } 
  return level < findLevel(xp, multiplier); 
} 

// Nuova funzione: Assegnazione di ricompense per ogni livello
export function getReward(level) {
  const rewards = {
    1: '10 coins',
    5: '50 coins',
    10: '100 coins',
    20: '500 coins',
    50: '1000 coins',
    // Puoi aggiungere altre ricompense per livelli più alti
  };
  return rewards[level] || 'No reward';
}

// Nuova funzione: Verifica se un utente può prestigiare
export function canPrestige(level, xp) {
  const prestigeLevel = 50; // Livello necessario per il prestigio
  return level >= prestigeLevel;
}

// Nuova funzione: Prestigio
export function prestige(level, xp) {
  if (canPrestige(level, xp)) {
    return {
      newLevel: 1,
      newXp: 0,
      badge: 'Prestigio I', // Badge o titolo guadagnato dopo il prestigio
    };
  }
  return null; // L'utente non ha ancora raggiunto il livello necessario
}

// Nuova funzione: Applicazione di un moltiplicatore temporaneo
export function applyTemporaryMultiplier(baseMultiplier, temporaryMultiplier, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(baseMultiplier); // Dopo la durata, ritorna al moltiplicatore base
    }, duration);
    return baseMultiplier * temporaryMultiplier;
  });
}
