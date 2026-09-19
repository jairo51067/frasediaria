// ============================================================
// 15 ESTRUCTURAS VERBALES - VERSIÓN COMPLETA Y FUNCIONAL
// Con diccionario de colocaciones y traducciones naturales
// ============================================================
import { IRREGULAR_VERBS, REGULAR_VERBS } from './verbs';
import { translateNoun } from './nouns';

// ============================================================
// DICCIONARIO DE COLOCACIONES VÁLIDAS
// Evita combinaciones sin sentido como "go the house"
// ============================================================
const VALID_COLLOCATIONS = {
  go: {
    nouns: ['home', 'to work', 'to school', 'to the gym', 'abroad', 'away', 'to the house'],
    defaultPrep: 'to'
  },
  need: {
    nouns: ['water', 'food', 'time', 'money', 'help', 'a break', 'an answer', 'English', 'my job'],
    defaultPrep: null
  },
  work: {
    nouns: ['hard', 'at home', 'at the office', 'late', 'in English', 'my job', 'with my family'],
    defaultPrep: null
  },
  speak: {
    nouns: ['English', 'Spanish', 'the language', 'clearly', 'fluently', 'with my friend'],
    defaultPrep: null
  },
  know: {
    nouns: ['the answer', 'the truth', 'English', 'the way', 'my friend', 'a person', 'the name'],
    defaultPrep: null
  },
  take: {
    nouns: ['the bus', 'the car', 'the phone', 'time', 'a break', 'a shower', 'the opportunity'],
    defaultPrep: null
  },
  make: {
    nouns: ['a decision', 'a question', 'coffee', 'money', 'progress', 'the answer', 'sure'],
    defaultPrep: null
  },
  get: {
    nouns: ['the answer', 'a job', 'money', 'the truth', 'the phone', 'up', 'home', 'to work'],
    defaultPrep: null
  },
  think: {
    nouns: ['about it', 'about my life', 'about the future', 'carefully', 'twice', 'about the problem'],
    defaultPrep: 'about'
  },
  live: {
    nouns: ['here', 'there', 'at home', 'abroad', 'in the city', 'in the house', 'with my family'],
    defaultPrep: 'in'
  },
  have: {
    nouns: ['time', 'money', 'a car', 'a job', 'a family', 'a friend', 'a question', 'an idea', 'a problem'],
    defaultPrep: null
  },
  do: {
    nouns: ['my job', 'my work', 'my homework', 'a good job', 'exercise', 'business', 'the answer'],
    defaultPrep: null
  },
  be: {
    nouns: ['happy', 'sad', 'tired', 'busy', 'at home', 'at work', 'in love', 'a teacher', 'a student', 'sure'],
    defaultPrep: null
  },
  want: {
    nouns: ['water', 'food', 'time', 'money', 'help', 'to learn', 'to go', 'to know', 'my family'],
    defaultPrep: null
  },
  like: {
    nouns: ['coffee', 'water', 'my job', 'my family', 'my friend', 'music', 'sports', 'traveling', 'English'],
    defaultPrep: null
  }
};

// Traducciones naturales predefinidas
const NATURAL_TRANSLATIONS = {
  'I will need English tomorrow.': 'Necesitaré inglés mañana.',
  'I will go home tomorrow.': 'Iré a casa mañana.',
  'I will go to work tomorrow.': 'Iré a trabajar mañana.',
  'I will go to school tomorrow.': 'Iré a la escuela mañana.',
  'I had been working at home for hours.': 'Llevaba horas trabajando en casa.',
  'I had been studying for hours.': 'Llevaba horas estudiando.',
  'I speak English.': 'Hablo inglés.',
  'I work at home.': 'Trabajo en casa.',
  'I know the answer.': 'Sé la respuesta.',
  'I take the bus.': 'Tomo el autobús.',
  'I make a decision.': 'Tomo una decisión.',
  'I get the answer.': 'Obtengo la respuesta.',
  'I think about my life.': 'Pienso en mi vida.',
  'I live at home.': 'Vivo en casa.',
  'I need water.': 'Necesito agua.',
  'I have time.': 'Tengo tiempo.',
  'I do my job.': 'Hago mi trabajo.'
};

// Helper: obtener sustantivo válido para el verbo
function getRandomValidNoun(verb, level = 'beginner') {
  const config = VALID_COLLOCATIONS[verb];
  
  if (!config || config.nouns.length === 0) {
    // Fallback: sustantivos seguros según nivel
    const fallbacks = {
      beginner: ['home', 'water', 'time', 'my job', 'English'],
      intermediate: ['the answer', 'a question', 'money', 'the truth', 'my life'],
      advanced: ['a decision', 'the situation', 'the opportunity', 'the experience']
    };
    const list = fallbacks[level] || fallbacks.beginner;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  return config.nouns[Math.floor(Math.random() * config.nouns.length)];
}

// Helper: obtener preposición si es necesaria
function getPreposition(verb, noun) {
  const config = VALID_COLLOCATIONS[verb];
  if (!config) return '';
  
  // Si el sustantivo ya incluye preposición (ej: "to work"), retornar vacío
  if (noun.startsWith('to ') || noun.startsWith('at ') || noun.startsWith('in ') || noun.startsWith('about ')) {
    return '';
  }
  
  return config.defaultPrep || '';
}

// Helper: obtener traducción natural
function getNaturalTranslation(englishPhrase) {
  return NATURAL_TRANSLATIONS[englishPhrase] || null;
}

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function getVerbForm(verb, pronoun, form) {
  const v = IRREGULAR_VERBS[verb] || REGULAR_VERBS[verb];
  if (!v) return verb;
  if (form === 1) {
    const forms = v.v1.split('/');
    return (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? forms[1] : forms[0];
  }
  if (form === 2) return v.v2;
  if (form === 3) return v.v3;
  return v.v1.split('/')[0];
}

function translatePronoun(pronoun) {
  const map = {
    I: 'Yo', You: 'Tú', He: 'Él', She: 'Ella',
    We: 'Nosotros', They: 'Ellos', It: 'Eso'
  };
  return map[pronoun] || pronoun;
}

// Diccionario de verbos en español
const VERB_ES = {
  be: 'ser/estar', have: 'tener', do: 'hacer', go: 'ir',
  get: 'obtener', make: 'hacer', know: 'saber', think: 'pensar',
  take: 'tomar', speak: 'hablar', work: 'trabajar', want: 'querer',
  like: 'gustar', need: 'necesitar', live: 'vivir'
};

// Construcción de traducción natural
function buildNaturalTranslation(pronoun, verb, noun, prep, tenseKey) {
  const pronounEs = translatePronoun(pronoun);
  const nounEs = translateNoun(noun);
  const verbEs = VERB_ES[verb] || verb;
  const prepEs = prep === 'to' ? 'a' : prep === 'at' ? 'en' : prep === 'in' ? 'en' : prep === 'about' ? 'en' : prep;
  
  // Caso especial: "like" (gustar funciona al revés)
  if (verb === 'like') {
    const ind = { I:'Me', You:'Te', He:'Le', She:'Le', It:'Le', We:'Nos', They:'Les' }[pronoun];
    return `${ind} gusta ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  // Tiempos simples
  if (tenseKey === 'present_simple') {
    return `${pronounEs} ${verbEs} ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  if (tenseKey === 'past_simple') {
    return `${pronounEs} ${verbEs} (pasado) ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  if (tenseKey === 'future_simple') {
    return `${pronounEs} ${verbEs} (futuro) ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  // Tiempos perfectos
  if (tenseKey.includes('perfect') && !tenseKey.includes('continuous')) {
    const haber = tenseKey === 'present_perfect' ? (['He','She','It'].includes(pronoun) ? 'ha' : 'he') :
                  tenseKey === 'past_perfect' ? 'había' :
                  tenseKey === 'future_perfect' ? 'habré' : 'habría';
    return `${pronounEs} ${haber} ${verbEs} (participio) ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  // Tiempos continuos
  if (tenseKey.includes('continuous')) {
    const estar = tenseKey === 'present_continuous' ? { I:'estoy', You:'estás', He:'está', She:'está', It:'está', We:'estamos', They:'están' }[pronoun] :
                  tenseKey === 'past_continuous' ? (['I','He','She','It'].includes(pronoun) ? 'estaba' : 'estabas') :
                  'estaré';
    return `${pronounEs} ${estar} ${verbEs} (ando/iendo) ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
  }
  
  return `${pronounEs} ${verbEs} ${prepEs ? prepEs + ' ' : ''}${nounEs}.`;
}

// ============================================================
// 15 ESTRUCTURAS VERBALES
// ============================================================

export const PRESENT_SIMPLE = {
  key: 'present_simple',
  name: 'Present Simple',
  level: 'beginner',
  floor: 'present',
  category: 'simple',
  structure: 'Sujeto + Verbo + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${verbForm} ${prep ? prep + ' ' : ''}${noun}.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'present_simple');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + Verbo + Complemento',
      context: {
        use: 'Para hablar de cosas que haces siempre, tus rutinas o hechos reales',
        example: 'I work every day. → Trabajo todos los días. (Es mi rutina)',
        tip: '💡 Piensa: "Yo hago esto siempre". Si hablas de él/ella, añade -s al verbo: "She works"'
      }
    };
  }
};

export const PRESENT_PERFECT = {
  key: 'present_perfect',
  name: 'Present Perfect',
  level: 'intermediate',
  floor: 'present',
  category: 'perfect',
  structure: 'Sujeto + HAVE/HAS + Participio + Complemento',
  build: (pronoun, verb, level = 'intermediate') => {
    const have = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${have} ${verbForm} ${prep ? prep + ' ' : ''}${noun}.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'present_perfect');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + HAVE/HAS + Participio + Complemento',
      context: {
        use: 'Acciones pasadas con relevancia presente o experiencias de vida',
        example: 'I have finished my work. → He terminado mi trabajo.',
        tip: ' Usa HAVE (yo/tú/nosotros) o HAS (él/ella). No importa cuándo ocurrió, sino el resultado.'
      }
    };
  }
};

export const PRESENT_CONTINUOUS = {
  key: 'present_continuous',
  name: 'Present Continuous',
  level: 'intermediate',
  floor: 'present',
  category: 'continuous',
  structure: 'Sujeto + AM/IS/ARE + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const be = { I: 'am', You: 'are', He: 'is', She: 'is', It: 'is', We: 'are', They: 'are' }[pronoun];
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${be} ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} now.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'present_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + AM/IS/ARE + Verbo con -ING + Complemento',
      context: {
        use: 'Acciones que están ocurriendo AHORA MISMO o temporalmente',
        example: 'I am working now. → Estoy trabajando ahora.',
        tip: ' AM (yo), IS (él/ella), ARE (tú/nosotros/ellos). Añade -ING al verbo.'
      }
    };
  }
};

export const PRESENT_PERFECT_CONTINUOUS = {
  key: 'present_perfect_continuous',
  name: 'Present Perfect Continuous',
  level: 'advanced',
  floor: 'present',
  category: 'perfect_continuous',
  structure: 'Sujeto + HAVE/HAS + BEEN + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'advanced') => {
    const have = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${have} been ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} for hours.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'present_perfect_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + HAVE/HAS + BEEN + Verbo con -ING + Complemento',
      context: {
        use: 'Acciones que empezaron en el pasado y CONTINÚAN hasta ahora (énfasis en duración)',
        example: 'I have been working for 3 hours. → Llevo 3 horas trabajando.',
        tip: '💡 "LLEVO [tiempo] HACIENDO algo". HAVE/HAS BEEN + verbo-ING.'
      }
    };
  }
};

export const PAST_SIMPLE = {
  key: 'past_simple',
  name: 'Past Simple',
  level: 'beginner',
  floor: 'past',
  category: 'simple',
  structure: 'Sujeto + Verbo en Pasado + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 2);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${verbForm} ${prep ? prep + ' ' : ''}${noun} yesterday.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'past_simple');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + Verbo en Pasado + Complemento',
      context: {
        use: 'Acciones COMPLETADAS en el pasado en un tiempo específico',
        example: 'I worked yesterday. → Trabajé ayer.',
        tip: '💡 Verbos regulares: añade -ed. Irregulares: usa la forma 2 (was/went/did...).'
      }
    };
  }
};

export const PAST_PERFECT = {
  key: 'past_perfect',
  name: 'Past Perfect',
  level: 'intermediate',
  floor: 'past',
  category: 'perfect',
  structure: 'Sujeto + HAD + Participio + Complemento',
  build: (pronoun, verb, level = 'intermediate') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} had ${verbForm} ${prep ? prep + ' ' : ''}${noun} before.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'past_perfect');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + HAD + Participio + Complemento',
      context: {
        use: 'Acción pasada que ocurrió ANTES de otra acción pasada (el "pasado del pasado")',
        example: 'I had finished before you arrived. → Había terminado antes de que llegaras.',
        tip: '💡 HAD es para TODOS los pronombres. "Había hecho" algo antes de otra cosa.'
      }
    };
  }
};

export const PAST_CONTINUOUS = {
  key: 'past_continuous',
  name: 'Past Continuous',
  level: 'intermediate',
  floor: 'past',
  category: 'continuous',
  structure: 'Sujeto + WAS/WERE + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const was = (pronoun === 'I' || pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'was' : 'were';
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} ${was} ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} yesterday.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'past_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WAS/WERE + Verbo con -ING + Complemento',
      context: {
        use: 'Acción que estaba EN PROGRESO en un momento del pasado',
        example: 'I was working when you called. → Estaba trabajando cuando llamaste.',
        tip: '💡 WAS (yo/él/ella), WERE (tú/nosotros/ellos). Acciones interrumpidas o paralelas.'
      }
    };
  }
};

export const PAST_PERFECT_CONTINUOUS = {
  key: 'past_perfect_continuous',
  name: 'Past Perfect Continuous',
  level: 'advanced',
  floor: 'past',
  category: 'perfect_continuous',
  structure: 'Sujeto + HAD + BEEN + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} had been ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} for hours.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'past_perfect_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + HAD + BEEN + Verbo con -ING + Complemento',
      context: {
        use: 'Acción continua que ocurrió ANTES de otro momento pasado (énfasis en duración)',
        example: 'I had been working for 3 hours when you arrived. → Llevaba 3 horas trabajando cuando llegaste.',
        tip: '💡 "LLEVABA [tiempo] HACIENDO algo" antes de que pasara otra cosa.'
      }
    };
  }
};

export const FUTURE_SIMPLE = {
  key: 'future_simple',
  name: 'Future Simple',
  level: 'beginner',
  floor: 'future',
  category: 'simple',
  structure: 'Sujeto + WILL + Verbo (forma normal) + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} will ${verbForm} ${prep ? prep + ' ' : ''}${noun} tomorrow.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'future_simple');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WILL + Verbo (forma normal) + Complemento',
      context: {
        use: 'Decisiones espontáneas, predicciones del futuro o promesas',
        example: 'I will call you later. → Te llamaré más tarde.',
        tip: '💡 WILL es como decir "voy a" o el futuro "-ré" en español. No cambia: I will, You will, He will...'
      }
    };
  }
};

export const FUTURE_PERFECT = {
  key: 'future_perfect',
  name: 'Future Perfect',
  level: 'intermediate',
  floor: 'future',
  category: 'perfect',
  structure: 'Sujeto + WILL + HAVE + Participio + Complemento',
  build: (pronoun, verb, level = 'intermediate') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} will have ${verbForm} ${prep ? prep + ' ' : ''}${noun} by tomorrow.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'future_perfect');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WILL + HAVE + Participio + Complemento',
      context: {
        use: 'Acción que estará COMPLETADA antes de un momento futuro',
        example: 'I will have finished by 5 PM. → Habré terminado para las 5 PM.',
        tip: '💡 "HABRÉ HECHO" algo antes de X momento en el futuro. WILL HAVE + participio.'
      }
    };
  }
};

export const FUTURE_CONTINUOUS = {
  key: 'future_continuous',
  name: 'Future Continuous',
  level: 'intermediate',
  floor: 'future',
  category: 'continuous',
  structure: 'Sujeto + WILL + BE + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} will be ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} tomorrow.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'future_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WILL + BE + Verbo con -ING + Complemento',
      context: {
        use: 'Acción que estará EN PROGRESO en un momento futuro',
        example: 'I will be working at 3 PM. → Estaré trabajando a las 3 PM.',
        tip: '💡 "ESTARÉ HACIENDO" algo en un momento específico. WILL BE + verbo-ING.'
      }
    };
  }
};

export const FUTURE_PERFECT_CONTINUOUS = {
  key: 'future_perfect_continuous',
  name: 'Future Perfect Continuous',
  level: 'advanced',
  floor: 'future',
  category: 'perfect_continuous',
  structure: 'Sujeto + WILL + HAVE + BEEN + Verbo con -ING + Complemento',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} will have been ${verbForm}ing ${prep ? prep + ' ' : ''}${noun} for a year.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'future_perfect_continuous');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WILL + HAVE + BEEN + Verbo con -ING + Complemento',
      context: {
        use: 'Duración de una acción hasta un punto futuro (muy raro en conversación)',
        example: 'I will have been working here for 10 years. → Habré estado trabajando aquí por 10 años.',
        tip: '💡 "HABRÉ ESTADO HACIENDO" algo por X tiempo. Énfasis en duración futura.'
      }
    };
  }
};

export const PRESENT_CONDITIONAL = {
  key: 'present_conditional',
  name: 'Present Conditional',
  level: 'advanced',
  floor: 'additional',
  category: 'conditional',
  structure: 'Sujeto + WOULD + Verbo (forma normal) + Complemento',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} would ${verbForm} ${prep ? prep + ' ' : ''}${noun}.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'present_conditional');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WOULD + Verbo (forma normal) + Complemento',
      context: {
        use: 'Situaciones hipotéticas, cortesía o deseos',
        example: 'I would help you. → Te ayudaría.',
        tip: '💡 WOULD es como el "-ría" en español: ayudaría, trabajaría, iría...'
      }
    };
  }
};

export const PERFECT_CONDITIONAL = {
  key: 'perfect_conditional',
  name: 'Perfect Conditional',
  level: 'advanced',
  floor: 'additional',
  category: 'conditional',
  structure: 'Sujeto + WOULD + HAVE + Participio + Complemento',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomValidNoun(verb, level);
    const prep = getPreposition(verb, noun);
    const english = `${pronoun} would have ${verbForm} ${prep ? prep + ' ' : ''}${noun}.`;
    
    let spanish = getNaturalTranslation(english);
    if (!spanish) {
      spanish = buildNaturalTranslation(pronoun, verb, noun, prep, 'perfect_conditional');
    }
    
    return {
      en: english,
      es: spanish,
      structure: 'Sujeto + WOULD + HAVE + Participio + Complemento',
      context: {
        use: 'Situaciones hipotéticas pasadas (arrepentimientos o "qué habría pasado si...")',
        example: 'I would have helped you. → Te habría ayudado.',
        tip: '💡 "HABRÍA HECHO" algo si... WOULD HAVE + participio.'
      }
    };
  }
};

// ============================================================
// EXPORTAR TODAS LAS ESTRUCTURAS
// ============================================================
export const ALL_TENSES = {
  present_simple: PRESENT_SIMPLE,
  present_perfect: PRESENT_PERFECT,
  present_continuous: PRESENT_CONTINUOUS,
  present_perfect_continuous: PRESENT_PERFECT_CONTINUOUS,
  past_simple: PAST_SIMPLE,
  past_perfect: PAST_PERFECT,
  past_continuous: PAST_CONTINUOUS,
  past_perfect_continuous: PAST_PERFECT_CONTINUOUS,
  future_simple: FUTURE_SIMPLE,
  future_perfect: FUTURE_PERFECT,
  future_continuous: FUTURE_CONTINUOUS,
  future_perfect_continuous: FUTURE_PERFECT_CONTINUOUS,
  present_conditional: PRESENT_CONDITIONAL,
  perfect_conditional: PERFECT_CONDITIONAL
};

export const TENSES_BY_LEVEL = {
  beginner: ['present_simple', 'past_simple', 'future_simple'],
  intermediate: [
    'present_simple', 'past_simple', 'future_simple',
    'present_perfect', 'past_perfect', 'future_perfect',
    'present_continuous', 'past_continuous', 'future_continuous'
  ],
  advanced: Object.keys(ALL_TENSES)
};

export function getTensesForLevel(level) {
  const keys = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.beginner;
  return keys.map(key => ALL_TENSES[key]);
}