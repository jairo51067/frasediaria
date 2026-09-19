// ============================================================
// 15 ESTRUCTURAS VERBALES - CON TRADUCCIONES NATURALES
// ============================================================
import { IRREGULAR_VERBS, REGULAR_VERBS } from './verbs';
import { getRandomNoun, translateNoun } from './nouns';
import { SPANISH_CONJUGATIONS, getGerund, capitalize } from '../utils/spanishConjugation';
import { getNaturalTranslation, getPreposition } from './collocations';

// Helper: obtener forma verbal inglesa según pronombre
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

// Helper: pronombre en español (capitalizado)
function translatePronoun(pronoun) {
  const map = {
    I: 'Yo', You: 'Tú', He: 'Él', She: 'Ella',
    We: 'Nosotros', They: 'Ellos', It: 'Eso'
  };
  return map[pronoun] || pronoun;
}

/**
 * NUEVO: Construye traducción natural al español
 * Maneja conjugación, colocaciones y preposiciones
 */
function buildSpanishTranslation(pronoun, verb, noun, tenseType) {
  const conjugation = SPANISH_CONJUGATIONS[verb];
  if (!conjugation) {
    // Fallback: traducción literal
    return `${translatePronoun(pronoun)} ${conjugation?.infinitive || verb} ${translateNoun(noun.en)}`;
  }
  
  // Buscar colocación especial
  const naturalTranslation = getNaturalTranslation(verb, noun.en, tenseType);
  const preposition = getPreposition(verb, noun.en);
  
  // Función para obtener el verbo conjugado según el tiempo
  const getConjugatedVerb = (tense) => {
    const forms = conjugation[tense];
    if (!forms) return conjugation.infinitive;
    return forms[pronoun] || Object.values(forms)[0];
  };
  
  // Objeto con preposición si es necesaria
  const objectWithPrep = preposition ? `${preposition} ${translateNoun(noun.en)}` : translateNoun(noun.en);
  
  // Construir según el tiempo verbal
  switch (tenseType) {
    case 'present_simple': {
      const verbEs = getConjugatedVerb('present');
      // Caso especial: "like" ya incluye el pronombre indirecto
      if (verb === 'like') {
        return capitalize(`${verbEs} ${translateNoun(noun.en)}`);
      }
      if (naturalTranslation) {
        return capitalize(`${translatePronoun(pronoun)} ${naturalTranslation}`);
      }
      return capitalize(`${translatePronoun(pronoun)} ${verbEs} ${objectWithPrep}`);
    }
    
    case 'present_continuous': {
      const gerund = getGerund(verb);
      const be = { I: 'estoy', You: 'estás', He: 'está', She: 'está', It: 'está', We: 'estamos', They: 'están' }[pronoun];
      return capitalize(`${translatePronoun(pronoun)} ${be} ${gerund} ${objectWithPrep} ahora`);
    }
    
    case 'present_perfect': {
      const have = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'ha' : 'he';
      const participle = conjugation.participle;
      if (naturalTranslation) {
        // Para colocaciones con infinitivo, usar el participio
        const pastParticiple = getPastParticipleForCollocation(naturalTranslation);
        return capitalize(`${translatePronoun(pronoun)} ${have} ${pastParticiple} ${objectWithPrep}`);
      }
      return capitalize(`${translatePronoun(pronoun)} ${have} ${participle} ${objectWithPrep}`);
    }
    
    case 'present_perfect_continuous': {
      const llevo = { I: 'llevo', You: 'llevas', He: 'lleva', She: 'lleva', It: 'lleva', We: 'llevamos', They: 'llevan' }[pronoun];
      const gerund = getGerund(verb);
      return capitalize(`${translatePronoun(pronoun)} ${llevo} horas ${gerund} ${objectWithPrep}`);
    }
    
    case 'past_simple': {
      const verbEs = getConjugatedVerb('past');
      if (verb === 'like') {
        return capitalize(`${verbEs} ${translateNoun(noun.en)} ayer`);
      }
      if (naturalTranslation) {
        const pastForm = getSimplePastForCollocation(verb, pronoun, naturalTranslation);
        return capitalize(`${translatePronoun(pronoun)} ${pastForm} ${objectWithPrep} ayer`);
      }
      return capitalize(`${translatePronoun(pronoun)} ${verbEs} ${objectWithPrep} ayer`);
    }
    
    case 'past_continuous': {
      const was = (pronoun === 'I' || pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'estaba' : 'estabas';
      const gerund = getGerund(verb);
      return capitalize(`${translatePronoun(pronoun)} ${was} ${gerund} ${objectWithPrep} ayer`);
    }
    
    case 'past_perfect': {
      const participle = conjugation.participle;
      return capitalize(`${translatePronoun(pronoun)} había ${participle} ${objectWithPrep} antes`);
    }
    
    case 'past_perfect_continuous': {
      const gerund = getGerund(verb);
      return capitalize(`${translatePronoun(pronoun)} llevaba horas ${gerund} ${objectWithPrep}`);
    }
    
    case 'future_simple': {
      const verbEs = getConjugatedVerb('future');
      if (verb === 'like') {
        return capitalize(`${verbEs} ${translateNoun(noun.en)} mañana`);
      }
      if (naturalTranslation) {
        const futureForm = getFutureForCollocation(verb, pronoun, naturalTranslation);
        return capitalize(`${translatePronoun(pronoun)} ${futureForm} ${objectWithPrep} mañana`);
      }
      return capitalize(`${translatePronoun(pronoun)} ${verbEs} ${objectWithPrep} mañana`);
    }
    
    case 'future_continuous': {
      const gerund = getGerund(verb);
      return capitalize(`${translatePronoun(pronoun)} estaré ${gerund} ${objectWithPrep} mañana`);
    }
    
    case 'future_perfect': {
      const participle = conjugation.participle;
      return capitalize(`${translatePronoun(pronoun)} habré ${participle} ${objectWithPrep} para mañana`);
    }
    
    case 'future_perfect_continuous': {
      const gerund = getGerund(verb);
      return capitalize(`${translatePronoun(pronoun)} habré estado ${gerund} ${objectWithPrep} por un año`);
    }
    
    case 'present_conditional': {
      const verbEs = getConjugatedVerb('conditional');
      if (verb === 'like') {
        return capitalize(`${verbEs} ${translateNoun(noun.en)}`);
      }
      if (naturalTranslation) {
        const condForm = getConditionalForCollocation(verb, pronoun, naturalTranslation);
        return capitalize(`${translatePronoun(pronoun)} ${condForm} ${objectWithPrep}`);
      }
      return capitalize(`${translatePronoun(pronoun)} ${verbEs} ${objectWithPrep}`);
    }
    
    case 'perfect_conditional': {
      const participle = conjugation.participle;
      return capitalize(`${translatePronoun(pronoun)} habría ${participle} ${objectWithPrep}`);
    }
    
    default:
      return capitalize(`${translatePronoun(pronoun)} ${conjugation.infinitive} ${translateNoun(noun.en)}`);
  }
}

// Helpers para colocaciones en tiempos compuestos
function getPastParticipleForCollocation(naturalTranslation) {
  // Convertir infinitivo a participio para colocaciones
  const mappings = {
    'hacer': 'hecho', 'tomar': 'tomado', 'preparar': 'preparado',
    'ganar': 'ganado', 'obtener': 'obtenido', 'conseguir': 'conseguido',
    'saber': 'sabido', 'conocer': 'conocido', 'descubrir': 'descubierto',
    'formular': 'formulado', 'dar': 'dado', 'aprovechar': 'aprovechado',
    'reflexionar': 'reflexionado', 'contestar': 'contestado', 'trabajar': 'trabajado'
  };
  const infinitive = naturalTranslation.split(' ')[0];
  return mappings[infinitive] || `${infinitive}do`;
}

function getSimplePastForCollocation(verb, pronoun, naturalTranslation) {
  // Para colocaciones en pasado simple, conjugar el verbo de la colocación
  const conjugation = SPANISH_CONJUGATIONS[verb];
  return conjugation?.past?.[pronoun] || naturalTranslation;
}

function getFutureForCollocation(verb, pronoun, naturalTranslation) {
  const conjugation = SPANISH_CONJUGATIONS[verb];
  return conjugation?.future?.[pronoun] || naturalTranslation;
}

function getConditionalForCollocation(verb, pronoun, naturalTranslation) {
  const conjugation = SPANISH_CONJUGATIONS[verb];
  return conjugation?.conditional?.[pronoun] || naturalTranslation;
}

// ============================================================
// ESTRUCTURAS VERBALES (con traducciones naturales)
// ============================================================

export const PRESENT_SIMPLE = {
  key: 'present_simple',
  name: 'Present Simple',
  level: 'beginner',
  floor: 'present',
  category: 'simple',
  structure: 'Pronoun + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${verbForm} ${noun.en}.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'present_simple') + '.',
      structure: 'Pronoun + Verb (Form 1) + Object',
      context: {
        use: 'Hábitos, rutinas, verdades generales',
        example: 'I work every day. (Trabajo todos los días.)',
        tip: 'Usa la forma base del verbo. Añade -s para he/she/it.'
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
  structure: 'Pronoun + have/has + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const have = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${have} ${verbForm} ${noun.en}.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'present_perfect') + '.',
      structure: 'Pronoun + have/has + Verb (Form 3) + Object',
      context: {
        use: 'Acciones pasadas con relevancia presente, experiencias',
        example: 'I have finished my work. (He terminado mi trabajo.)',
        tip: 'Usa have/has + participio (forma 3). No importa cuándo ocurrió.'
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
  structure: 'Pronoun + am/is/are + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const be = { I: 'am', You: 'are', He: 'is', She: 'is', It: 'is', We: 'are', They: 'are' }[pronoun];
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${be} ${verbForm}ing ${noun.en} now.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'present_continuous') + '.',
      structure: 'Pronoun + am/is/are + Verb-ing + Object',
      context: {
        use: 'Acciones ocurriendo ahora mismo, temporal',
        example: 'I am working now. (Estoy trabajando ahora.)',
        tip: 'Usa am/is/are + verbo-ing. Para acciones en progreso.'
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
  structure: 'Pronoun + have/has + been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const have = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${have} been ${verbForm}ing ${noun.en} for hours.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'present_perfect_continuous') + '.',
      structure: 'Pronoun + have/has + been + Verb-ing + Object',
      context: {
        use: 'Acciones que empezaron en el pasado y continúan',
        example: 'I have been working for 3 hours. (Llevo 3 horas trabajando.)',
        tip: 'Énfasis en la duración. Usa have/has been + verbo-ing.'
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
  structure: 'Pronoun + Verb (Form 2) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 2);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${verbForm} ${noun.en} yesterday.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'past_simple') + '.',
      structure: 'Pronoun + Verb (Form 2) + Object',
      context: {
        use: 'Acciones completadas en el pasado, tiempo específico',
        example: 'I worked yesterday. (Trabajé ayer.)',
        tip: 'Usa la forma 2 del verbo (pasado). Para verbos regulares: -ed.'
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
  structure: 'Pronoun + had + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} had ${verbForm} ${noun.en} before.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'past_perfect') + '.',
      structure: 'Pronoun + had + Verb (Form 3) + Object',
      context: {
        use: 'Acción pasada antes de otra acción pasada',
        example: 'I had finished before you arrived. (Había terminado antes de que llegaras.)',
        tip: 'Usa had + participio (forma 3). Para el "pasado del pasado".'
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
  structure: 'Pronoun + was/were + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const was = (pronoun === 'I' || pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'was' : 'were';
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${was} ${verbForm}ing ${noun.en} yesterday.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'past_continuous') + '.',
      structure: 'Pronoun + was/were + Verb-ing + Object',
      context: {
        use: 'Acción en progreso en un momento del pasado',
        example: 'I was working when you called. (Estaba trabajando cuando llamaste.)',
        tip: 'Usa was/were + verbo-ing. Para acciones interrumpidas o paralelas.'
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
  structure: 'Pronoun + had + been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} had been ${verbForm}ing ${noun.en} for hours.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'past_perfect_continuous') + '.',
      structure: 'Pronoun + had + been + Verb-ing + Object',
      context: {
        use: 'Acción continua antes de otro momento pasado',
        example: 'I had been working for 3 hours when you arrived. (Llevaba 3 horas trabajando cuando llegaste.)',
        tip: 'Énfasis en duración antes de un punto pasado. had been + verbo-ing.'
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
  structure: 'Pronoun + will + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will ${verbForm} ${noun.en} tomorrow.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'future_simple') + '.',
      structure: 'Pronoun + will + Verb (Form 1) + Object',
      context: {
        use: 'Decisiones espontáneas, predicciones, promesas',
        example: 'I will work tomorrow. (Trabajaré mañana.)',
        tip: 'Usa will + forma base. Para futuro simple sin planificación.'
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
  structure: 'Pronoun + will have + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will have ${verbForm} ${noun.en} by tomorrow.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'future_perfect') + '.',
      structure: 'Pronoun + will have + Verb (Form 3) + Object',
      context: {
        use: 'Acción completada antes de un momento futuro',
        example: 'I will have finished by 5 PM. (Habré terminado para las 5 PM.)',
        tip: 'Usa will have + participio. Para "habré hecho" algo antes de X.'
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
  structure: 'Pronoun + will be + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will be ${verbForm}ing ${noun.en} tomorrow.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'future_continuous') + '.',
      structure: 'Pronoun + will be + Verb-ing + Object',
      context: {
        use: 'Acción en progreso en un momento futuro',
        example: 'I will be working at 3 PM. (Estaré trabajando a las 3 PM.)',
        tip: 'Usa will be + verbo-ing. Para acciones en progreso en el futuro.'
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
  structure: 'Pronoun + will have been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will have been ${verbForm}ing ${noun.en} for a year.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'future_perfect_continuous') + '.',
      structure: 'Pronoun + will have been + Verb-ing + Object',
      context: {
        use: 'Duración hasta un punto futuro',
        example: 'I will have been working here for 10 years. (Habré estado trabajando aquí por 10 años.)',
        tip: 'Muy raro en conversación. Énfasis en duración futura. will have been + verbo-ing.'
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
  structure: 'Pronoun + would + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 1);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} would ${verbForm} ${noun.en}.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'present_conditional') + '.',
      structure: 'Pronoun + would + Verb (Form 1) + Object',
      context: {
        use: 'Situaciones hipotéticas, cortesía, deseos',
        example: 'I would help you. (Te ayudaría.)',
        tip: 'Usa would + forma base. Equivale a -ría en español.'
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
  structure: 'Pronoun + would have + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const verbForm = getVerbForm(verb, pronoun, 3);
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} would have ${verbForm} ${noun.en}.`,
      es: buildSpanishTranslation(pronoun, verb, noun, 'perfect_conditional') + '.',
      structure: 'Pronoun + would have + Verb (Form 3) + Object',
      context: {
        use: 'Situaciones hipotéticas pasadas (arrepentimientos)',
        example: 'I would have helped you. (Te habría ayudado.)',
        tip: 'Usa would have + participio. Para "habría hecho" en hipótesis pasadas.'
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