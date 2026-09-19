// src/data/tenses.js
import { IRREGULAR_VERBS, REGULAR_VERBS } from './verbs';
import { getRandomNoun } from './nouns';
import { buildNaturalTranslation } from '../utils/naturalTranslation';

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

export const PRESENT_SIMPLE = {
  key: 'present_simple', name: 'Present Simple', level: 'beginner', floor: 'present', category: 'simple', structure: 'Pronoun + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${getVerbForm(verb, pronoun, 1)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'present_simple'),
      structure: 'Pronoun + Verb (Form 1) + Object',
      context: { use: 'Hábitos, rutinas, verdades generales', example: 'I work every day. (Trabajo todos los días.)', tip: 'Usa la forma base del verbo. Añade -s para he/she/it.' }
    };
  }
};

export const PRESENT_PERFECT = {
  key: 'present_perfect', name: 'Present Perfect', level: 'intermediate', floor: 'present', category: 'perfect', structure: 'Pronoun + have/has + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const noun = getRandomNoun(level);
    const has = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    return {
      en: `${pronoun} ${has} ${getVerbForm(verb, pronoun, 3)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'present_perfect'),
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
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'present_continuous'),
      structure: 'Pronoun + am/is/are + Verb-ing + Object',
      context: { use: 'Acciones ocurriendo ahora mismo', example: 'I am working now. (Estoy trabajando ahora.)', tip: 'Usa am/is/are + verbo-ing.' }
    };
  }
};

export const PRESENT_PERFECT_CONTINUOUS = {
  key: 'present_perfect_continuous', name: 'Present Perfect Continuous', level: 'advanced', floor: 'present', category: 'perfect_continuous', structure: 'Pronoun + have/has + been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    const has = (pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'has' : 'have';
    return {
      en: `${pronoun} ${has} been ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} for hours.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'present_perfect_continuous'),
      structure: 'Pronoun + have/has + been + Verb-ing + Object',
      context: { use: 'Acciones que empezaron en el pasado y continúan', example: 'I have been working for 3 hours. (Llevo 3 horas trabajando.)', tip: 'Énfasis en la duración.' }
    };
  }
};

export const PAST_SIMPLE = {
  key: 'past_simple', name: 'Past Simple', level: 'beginner', floor: 'past', category: 'simple', structure: 'Pronoun + Verb (Form 2) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${getVerbForm(verb, pronoun, 2)} ${noun.en} yesterday.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'past_simple'),
      structure: 'Pronoun + Verb (Form 2) + Object',
      context: { use: 'Acciones completadas en el pasado', example: 'I worked yesterday. (Trabajé ayer.)', tip: 'Usa la forma 2 del verbo (pasado).' }
    };
  }
};

export const PAST_PERFECT = {
  key: 'past_perfect', name: 'Past Perfect', level: 'intermediate', floor: 'past', category: 'perfect', structure: 'Pronoun + had + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} had ${getVerbForm(verb, pronoun, 3)} ${noun.en} before.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'past_perfect'),
      structure: 'Pronoun + had + Verb (Form 3) + Object',
      context: { use: 'Acción pasada antes de otra acción pasada', example: 'I had finished before you arrived. (Había terminado antes de que llegaras.)', tip: 'Usa had + participio.' }
    };
  }
};

export const PAST_CONTINUOUS = {
  key: 'past_continuous', name: 'Past Continuous', level: 'intermediate', floor: 'past', category: 'continuous', structure: 'Pronoun + was/were + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    const was = (pronoun === 'I' || pronoun === 'He' || pronoun === 'She' || pronoun === 'It') ? 'was' : 'were';
    return {
      en: `${pronoun} ${was} ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} yesterday.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'past_continuous'),
      structure: 'Pronoun + was/were + Verb-ing + Object',
      context: { use: 'Acción en progreso en un momento del pasado', example: 'I was working when you called. (Estaba trabajando cuando llamaste.)', tip: 'Usa was/were + verbo-ing.' }
    };
  }
};

export const PAST_PERFECT_CONTINUOUS = {
  key: 'past_perfect_continuous', name: 'Past Perfect Continuous', level: 'advanced', floor: 'past', category: 'perfect_continuous', structure: 'Pronoun + had + been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} had been ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} for hours.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'past_perfect_continuous'),
      structure: 'Pronoun + had + been + Verb-ing + Object',
      context: { use: 'Acción continua antes de otro momento pasado', example: 'I had been working for 3 hours when you arrived. (Llevaba 3 horas trabajando cuando llegaste.)', tip: 'Énfasis en duración pasada.' }
    };
  }
};

export const FUTURE_SIMPLE = {
  key: 'future_simple', name: 'Future Simple', level: 'beginner', floor: 'future', category: 'simple', structure: 'Pronoun + will + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will ${getVerbForm(verb, pronoun, 1)} ${noun.en} tomorrow.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'future_simple'),
      structure: 'Pronoun + will + Verb (Form 1) + Object',
      context: { use: 'Decisiones espontáneas, predicciones', example: 'I will work tomorrow. (Trabajaré mañana.)', tip: 'Usa will + forma base.' }
    };
  }
};

export const FUTURE_PERFECT = {
  key: 'future_perfect', name: 'Future Perfect', level: 'intermediate', floor: 'future', category: 'perfect', structure: 'Pronoun + will have + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'intermediate') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will have ${getVerbForm(verb, pronoun, 3)} ${noun.en} by tomorrow.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'future_perfect'),
      structure: 'Pronoun + will have + Verb (Form 3) + Object',
      context: { use: 'Acción completada antes de un momento futuro', example: 'I will have finished by 5 PM. (Habré terminado para las 5 PM.)', tip: 'Usa will have + participio.' }
    };
  }
};

export const FUTURE_CONTINUOUS = {
  key: 'future_continuous', name: 'Future Continuous', level: 'intermediate', floor: 'future', category: 'continuous', structure: 'Pronoun + will be + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will be ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} tomorrow.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'future_continuous'),
      structure: 'Pronoun + will be + Verb-ing + Object',
      context: { use: 'Acción en progreso en un momento futuro', example: 'I will be working at 3 PM. (Estaré trabajando a las 3 PM.)', tip: 'Usa will be + verbo-ing.' }
    };
  }
};

export const FUTURE_PERFECT_CONTINUOUS = {
  key: 'future_perfect_continuous', name: 'Future Perfect Continuous', level: 'advanced', floor: 'future', category: 'perfect_continuous', structure: 'Pronoun + will have been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} will have been ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} for a year.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'future_perfect_continuous'),
      structure: 'Pronoun + will have been + Verb-ing + Object',
      context: { use: 'Duración hasta un punto futuro', example: 'I will have been working here for 10 years. (Habré estado trabajando aquí por 10 años.)', tip: 'Muy raro en conversación.' }
    };
  }
};

export const PRESENT_CONDITIONAL = {
  key: 'present_conditional', name: 'Present Conditional', level: 'advanced', floor: 'additional', category: 'conditional', structure: 'Pronoun + would + Verb (Form 1) + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} would ${getVerbForm(verb, pronoun, 1)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'present_conditional'),
      structure: 'Pronoun + would + Verb (Form 1) + Object',
      context: { use: 'Situaciones hipotéticas, cortesía', example: 'I would help you. (Te ayudaría.)', tip: 'Usa would + forma base. Equivale a -ría.' }
    };
  }
};

export const PERFECT_CONDITIONAL = {
  key: 'perfect_conditional', name: 'Perfect Conditional', level: 'advanced', floor: 'additional', category: 'conditional', structure: 'Pronoun + would have + Verb (Form 3) + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} would have ${getVerbForm(verb, pronoun, 3)} ${noun.en}.`,
      es: buildNaturalTranslation(pronoun, verb, noun.en, 'perfect_conditional'),
      structure: 'Pronoun + would have + Verb (Form 3) + Object',
      context: { use: 'Situaciones hipotéticas pasadas', example: 'I would have helped you. (Te habría ayudado.)', tip: 'Usa would have + participio.' }
    };
  }
};

export const ALL_TENSES = {
  present_simple: PRESENT_SIMPLE, present_perfect: PRESENT_PERFECT, present_continuous: PRESENT_CONTINUOUS, present_perfect_continuous: PRESENT_PERFECT_CONTINUOUS,
  past_simple: PAST_SIMPLE, past_perfect: PAST_PERFECT, past_continuous: PAST_CONTINUOUS, past_perfect_continuous: PAST_PERFECT_CONTINUOUS,
  future_simple: FUTURE_SIMPLE, future_perfect: FUTURE_PERFECT, future_continuous: FUTURE_CONTINUOUS, future_perfect_continuous: FUTURE_PERFECT_CONTINUOUS,
  present_conditional: PRESENT_CONDITIONAL, perfect_conditional: PERFECT_CONDITIONAL
};

export const TENSES_BY_LEVEL = {
  beginner: ['present_simple', 'past_simple', 'future_simple'],
  intermediate: ['present_simple', 'past_simple', 'future_simple', 'present_perfect', 'past_perfect', 'future_perfect', 'present_continuous', 'past_continuous', 'future_continuous'],
  advanced: Object.keys(ALL_TENSES)
};

export function getTensesForLevel(level) {
  const keys = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.beginner;
  return keys.map(key => ALL_TENSES[key]);
}