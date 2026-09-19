// Diccionario de combinaciones válidas verbo + sustantivo + preposición

export const VALID_COLLOCATIONS = {
  // Verbos que NO llevan objeto directo (necesitan preposición)
  go: {
    nouns: ['home', 'to work', 'to school', 'to the gym', 'abroad', 'away'],
    defaultPrep: 'to'
  },
  
  // Verbos que SÍ llevan objeto directo
  need: {
    nouns: ['water', 'food', 'time', 'money', 'help', 'a break', 'an answer', 'English'],
    defaultPrep: null
  },
  
  work: {
    nouns: ['hard', 'at home', 'at the office', 'late', 'in English', 'my job'],
    defaultPrep: null
  },
  
  speak: {
    nouns: ['English', 'Spanish', 'the language', 'clearly', 'fluently'],
    defaultPrep: null
  },
  
  know: {
    nouns: ['the answer', 'the truth', 'English', 'the way', 'my friend', 'a person'],
    defaultPrep: null
  },
  
  take: {
    nouns: ['the bus', 'the car', 'the phone', 'time', 'a break', 'a shower'],
    defaultPrep: null
  },
  
  make: {
    nouns: ['a decision', 'a question', 'coffee', 'money', 'progress'],
    defaultPrep: null
  },
  
  get: {
    nouns: ['the answer', 'a job', 'money', 'the truth', 'the phone', 'up'],
    defaultPrep: null
  },
  
  think: {
    nouns: ['about it', 'about my life', 'about the future', 'carefully', 'twice'],
    defaultPrep: 'about'
  },
  
  live: {
    nouns: ['here', 'there', 'at home', 'abroad', 'in the city'],
    defaultPrep: 'in'
  },
  
  // ... agregar más verbos
};

// Traducciones naturales predefinidas (para evitar literales)
export const NATURAL_TRANSLATIONS = {
  'I will need English tomorrow.': 'Necesitaré inglés mañana.',
  'I will go home tomorrow.': 'Iré a casa mañana.',
  'I will go to work tomorrow.': 'Iré a trabajar mañana.',
  'I had been working at home for hours.': 'Llevaba horas trabajando en casa.',
  'I had been studying for hours.': 'Llevaba horas estudiando.',
  'I speak English.': 'Hablo inglés.',
  'I work at home.': 'Trabajo en casa.',
  'I know the answer.': 'Sé la respuesta.',
  'I take the bus.': 'Tomo el autobús.',
  'I make a decision.': 'Tomo una decisión.',
  'I get the answer.': 'Obtengo la respuesta.',
  'I think about my life.': 'Pienso en mi vida.',
  'I live at home.': 'Vivo en casa.'
};

export function isValidCollocation(verb, noun) {
  const config = VALID_COLLOCATIONS[verb];
  if (!config) return true; // Si no hay config, permitir (fallback)
  return config.nouns.includes(noun);
}

export function getPreposition(verb, noun) {
  const config = VALID_COLLOCATIONS[verb];
  if (!config) return '';
  
  // Si el sustantivo ya incluye preposición (ej: "to work"), retornar vacío
  if (noun.startsWith('to ') || noun.startsWith('at ') || noun.startsWith('in ')) {
    return '';
  }
  
  return config.defaultPrep || '';
}

export function getRandomValidNoun(verb, level = 'beginner') {
  const config = VALID_COLLOCATIONS[verb];
  
  if (!config || config.nouns.length === 0) {
    // Fallback: sustantivos seguros
    const fallbacks = {
      beginner: ['home', 'water', 'time'],
      intermediate: ['the answer', 'a question', 'money'],
      advanced: ['the truth', 'a decision', 'the situation']
    };
    const list = fallbacks[level] || fallbacks.beginner;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  return config.nouns[Math.floor(Math.random() * config.nouns.length)];
}

export function getNaturalTranslation(englishPhrase) {
  return NATURAL_TRANSLATIONS[englishPhrase] || null;
}