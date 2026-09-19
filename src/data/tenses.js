import { IRREGULAR_VERBS, REGULAR_VERBS } from './verbs';
import { getRandomNoun, translateNoun } from './nouns';
import { translatePronoun, getNaturalCollocation, conjugateEs } from '../utils/spanishConjugation';

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

function buildNaturalTranslation(pronoun, verb, noun, tenseType) {
  const nounEs = translateNoun(noun.en);
  const pronounEs = translatePronoun(pronoun);

  // 1. Caso especial: Verbo "like" (gustar funciona al revés en español)
  if (verb === 'like') {
    const ind = { I:'Me', You:'Te', He:'Le', She:'Le', It:'Le', We:'Nos', They:'Les' }[pronoun];
    const v = { present_simple:'gusta', past_simple:'gustó', future_simple:'gustará', present_conditional:'gustaría' }[tenseType] || 'gusta';
    return `${ind} ${v} ${nounEs}.`;
  }

  // 2. Buscar colocación natural (ej: "make a decision" -> "tomar una decisión")
  const collocation = getNaturalCollocation(verb, noun.en);
  if (collocation) {
    return `${pronounEs} ${conjugateEs(collocation.verb, tenseType, pronoun, collocation.noun, collocation.prep || '')}.`;
  }

  // 3. Fallback: Traducción directa pero conjugada
  const verbEsMap = {
    be: 'ser', have: 'tener', do: 'hacer', go: 'ir', get: 'obtener',
    make: 'hacer', know: 'saber', think: 'pensar', take: 'tomar', speak: 'hablar',
    work: 'trabajar', want: 'querer', like: 'gustar', need: 'necesitar', live: 'vivir'
  };
  const verbEs = verbEsMap[verb] || verb;
  
  return `${pronounEs} ${conjugateEs(verbEs, tenseType, pronoun, nounEs)}.`;
}

// --- ESTRUCTURAS VERBALES (Ejemplo con 3, el patrón se repite para las 15) ---
export const PRESENT_SIMPLE = {
  key: 'present_simple', name: 'Present Simple', level: 'beginner', floor: 'present', category: 'simple', structure: 'Pronoun + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${getVerbForm(verb, pronoun, 1)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'present_simple'),
      structure: 'Pronoun + Verb (Form 1) + Object',
      context: { use: 'Hábitos, rutinas, verdades generales', example: 'I work every day. (Trabajo todos los días.)', tip: 'Usa la forma base del verbo. Añade -s para he/she/it.' }
    };
  }
};

export const PAST_SIMPLE = {
  key: 'past_simple', name: 'Past Simple', level: 'beginner', floor: 'past', category: 'simple', structure: 'Pronoun + Verb (Form 2) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${getVerbForm(verb, pronoun, 2)} ${noun.en} yesterday.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'past_simple'),
      structure: 'Pronoun + Verb (Form 2) + Object',
      context: { use: 'Acciones completadas en el pasado', example: 'I worked yesterday. (Trabajé ayer.)', tip: 'Usa la forma 2 del verbo (pasado).' }
    };
  }
};

export const FUTURE_SIMPLE = {
  key: 'future_simple', name: 'Future Simple', level: 'beginner', floor: 'future', category: 'simple', structure: 'Pronoun + will + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will ${getVerbForm(verb, pronoun, 1)} ${noun.en} tomorrow.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'future_simple'),
      structure: 'Pronoun + will + Verb (Form 1) + Object',
      context: { use: 'Decisiones espontáneas, predicciones', example: 'I will work tomorrow. (Trabajaré mañana.)', tip: 'Usa will + forma base.' }
    };
  }
};

export const PRESENT_PERFECT = {
  key: 'present_perfect', name: 'Present Perfect', level: 'intermediate', floor: 'present', category: 'perfect', structure: 'Pronoun + have/has + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${(['He','She','It'].includes(pronoun) ? 'has' : 'have')} ${getVerbForm(verb, pronoun, 3)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'present_perfect'),
      structure: 'Pronoun + have/has + Verb (Form 3) + Object',
      context: { use: 'Acciones pasadas con relevancia presente', example: 'I have finished my work. (He terminado mi trabajo.)', tip: 'Usa have/has + participio.' }
    };
  }
};

export const PRESENT_CONTINUOUS = {
  key: 'present_continuous', name: 'Present Continuous', level: 'intermediate', floor: 'present', category: 'continuous', structure: 'Pronoun + am/is/are + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    const be = { I:'am', You:'are', He:'is', She:'is', It:'is', We:'are', They:'are' }[pronoun];
    return {
      en: `${pronoun} ${be} ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} now.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'present_continuous'),
      structure: 'Pronoun + am/is/are + Verb-ing + Object',
      context: { use: 'Acciones ocurriendo ahora mismo', example: 'I am working now. (Estoy trabajando ahora.)', tip: 'Usa am/is/are + verbo-ing.' }
    };
  }
};

// ... (Asegúrate de que el resto de las 15 estructuras usen `buildNaturalTranslation` en su propiedad `es` como en los ejemplos de arriba) ...
// Para ahorrar espacio, asumo que reemplazarás TODO el archivo tenses.js con la versión completa que te di en el mensaje anterior, 
// pero asegurándote de que CADA estructura llame a `buildNaturalTranslation(pronoun, verb, noun, 'nombre_del_tiempo')`.

export const ALL_TENSES = {
  present_simple: PRESENT_SIMPLE, past_simple: PAST_SIMPLE, future_simple: FUTURE_SIMPLE,
  present_perfect: PRESENT_PERFECT, present_continuous: PRESENT_CONTINUOUS
  // ... agrega el resto aquí
};

export const TENSES_BY_LEVEL = {
  beginner: ['present_simple', 'past_simple', 'future_simple'],
  intermediate: ['present_simple', 'past_simple', 'future_simple', 'present_perfect', 'present_continuous'],
  advanced: Object.keys(ALL_TENSES)
};

export function getTensesForLevel(level) {
  const keys = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.beginner;
  return keys.map(key => ALL_TENSES[key]);
}