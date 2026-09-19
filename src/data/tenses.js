import { getRandomNoun } from './nouns';
import { IRREGULAR_VERBS, REGULAR_VERBS } from './verbs';
import { translatePronoun, translateNoun, getNaturalCollocation } from '../utils/spanishConjugation';

// Helper: obtener forma verbal inglesa
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

// Conjugador español inteligente
function conjugateEs(verbEs, tense, pronoun, nounEs, prep = '') {
  const c = {
    tomar: { present: {I:'tomo',You:'tomas',He:'toma',She:'toma',It:'toma',We:'tomamos',They:'toman'}, past: {I:'tomé',You:'tomaste',He:'tomó',She:'tomó',It:'tomó',We:'tomamos',They:'tomaron'}, future: {I:'tomaré',You:'tomarás',He:'tomará',She:'tomará',It:'tomará',We:'tomaremos',They:'tomarán'}, cond: {I:'tomaría',You:'tomarías',He:'tomaría',She:'tomaría',It:'tomaría',We:'tomaríamos',They:'tomarían'}, part: 'tomado', ger: 'tomando' },
    hacer: { present: {I:'hago',You:'haces',He:'hace',She:'hace',It:'hace',We:'hacemos',They:'hacen'}, past: {I:'hice',You:'hiciste',He:'hizo',She:'hizo',It:'hizo',We:'hicimos',They:'hicieron'}, future: {I:'haré',You:'harás',He:'hará',She:'hará',It:'hará',We:'haremos',They:'harán'}, cond: {I:'haría',You:'harías',He:'haría',She:'haría',It:'haría',We:'haríamos',They:'harían'}, part: 'hecho', ger: 'haciendo' },
    trabajar: { present: {I:'trabajo',You:'trabajas',He:'trabaja',She:'trabaja',It:'trabaja',We:'trabajamos',They:'trabajan'}, past: {I:'trabajé',You:'trabajaste',He:'trabajó',She:'trabajó',It:'trabajó',We:'trabajamos',They:'trabajaron'}, future: {I:'trabajaré',You:'trabajarás',He:'trabajará',She:'trabajará',It:'trabajará',We:'trabajaremos',They:'trabajarán'}, cond: {I:'trabajaría',You:'trabajarías',He:'trabajaría',She:'trabajaría',It:'trabajaría',We:'trabajaríamos',They:'trabajarían'}, part: 'trabajado', ger: 'trabajando' },
    hablar: { present: {I:'hablo',You:'hablas',He:'habla',She:'habla',It:'habla',We:'hablamos',They:'hablan'}, past: {I:'hablé',You:'hablaste',He:'habló',She:'habló',It:'habló',We:'hablamos',They:'hablaron'}, future: {I:'hablaré',You:'hablarás',He:'hablará',She:'hablará',It:'hablará',We:'hablaremos',They:'hablarán'}, cond: {I:'hablaría',You:'hablarías',He:'hablaría',She:'hablaría',It:'hablaría',We:'hablaríamos',They:'hablarían'}, part: 'hablado', ger: 'hablando' },
    saber: { present: {I:'sé',You:'sabes',He:'sabe',She:'sabe',It:'sabe',We:'sabemos',They:'saben'}, past: {I:'supe',You:'supiste',He:'supo',She:'supo',It:'supo',We:'supimos',They:'supieron'}, future: {I:'sabré',You:'sabrás',He:'sabrá',She:'sabrá',It:'sabrá',We:'sabremos',They:'sabrán'}, cond: {I:'sabría',You:'sabrías',He:'sabría',She:'sabría',It:'sabría',We:'sabríamos',They:'sabrían'}, part: 'sabido', ger: 'sabiendo' },
    conocer: { present: {I:'conozco',You:'conoces',He:'conoce',She:'conoce',It:'conoce',We:'conocemos',They:'conocen'}, past: {I:'conocí',You:'conociste',He:'conoció',She:'conoció',It:'conoció',We:'conocimos',They:'conocieron'}, future: {I:'conoceré',You:'conocerás',He:'conocerá',She:'conocerá',It:'conocerá',We:'conoceremos',They:'conocerán'}, cond: {I:'conocería',You:'conocerías',He:'conocería',She:'conocería',It:'conocería',We:'conoceríamos',They:'conocerían'}, part: 'conocido', ger: 'conociendo' },
    conseguir: { present: {I:'consigo',You:'consigues',He:'consigue',She:'consigue',It:'consigue',We:'conseguimos',They:'consiguen'}, past: {I:'conseguí',You:'conseguiste',He:'consiguió',She:'consiguió',It:'consiguió',We:'conseguimos',They:'consiguieron'}, future: {I:'conseguiré',You:'conseguirás',He:'conseguirá',She:'conseguirá',It:'conseguirá',We:'conseguiremos',They:'conseguirán'}, cond: {I:'conseguiría',You:'conseguirías',He:'conseguiría',She:'conseguiría',It:'conseguiría',We:'conseguiríamos',They:'conseguirían'}, part: 'conseguido', ger: 'consiguiendo' },
    obtener: { present: {I:'obtengo',You:'obtenes',He:'obtiene',She:'obtiene',It:'obtiene',We:'obtenemos',They:'obtienen'}, past: {I:'obtuve',You:'obtuviste',He:'obtuvo',She:'obtuvo',It:'obtuvo',We:'obtuvimos',They:'obtuvieron'}, future: {I:'obtendré',You:'obtendrás',He:'obtendrá',She:'obtendrá',It:'obtendrá',We:'obtendremos',They:'obtendrán'}, cond: {I:'obtendría',You:'obtendrías',He:'obtendría',She:'obtendría',It:'obtendría',We:'obtendríamos',They:'obtendrían'}, part: 'obtenido', ger: 'obteniendo' },
    pensar: { present: {I:'pienso',You:'piensas',He:'piensa',She:'piensa',It:'piensa',We:'pensamos',They:'piensan'}, past: {I:'pensé',You:'pensaste',He:'pensó',She:'pensó',It:'pensó',We:'pensamos',They:'pensaron'}, future: {I:'pensaré',You:'pensarás',He:'pensará',She:'pensará',It:'pensará',We:'pensaremos',They:'pensarán'}, cond: {I:'pensaría',You:'pensarías',He:'pensaría',She:'pensaría',It:'pensaría',We:'pensaríamos',They:'pensarían'}, part: 'pensado', ger: 'pensando' },
    vivir: { present: {I:'vivo',You:'vives',He:'vive',She:'vive',It:'vive',We:'vivimos',They:'viven'}, past: {I:'viví',You:'viviste',He:'vivió',She:'vivió',It:'vivió',We:'vivimos',They:'vivieron'}, future: {I:'viviré',You:'vivirás',He:'vivirá',She:'vivirá',It:'vivirá',We:'viviremos',They:'vivirán'}, cond: {I:'viviría',You:'vivirías',He:'viviría',She:'viviría',It:'viviría',We:'viviríamos',They:'vivirían'}, part: 'vivido', ger: 'viviendo' },
    querer: { present: {I:'quiero',You:'quieres',He:'quiere',She:'quiere',It:'quiere',We:'queremos',They:'quieren'}, past: {I:'quise',You:'quisiste',He:'quiso',She:'quiso',It:'quiso',We:'quisimos',They:'quisieron'}, future: {I:'querré',You:'querrás',He:'querrá',She:'querrá',It:'querrá',We:'querremos',They:'querrán'}, cond: {I:'querría',You:'querrías',He:'querría',She:'querría',It:'querría',We:'querríamos',They:'querrían'}, part: 'querido', ger: 'queriendo' },
    necesitar: { present: {I:'necesito',You:'necesitas',He:'necesita',She:'necesita',It:'necesita',We:'necesitamos',They:'necesitan'}, past: {I:'necesité',You:'necesitaste',He:'necesitó',She:'necesitó',It:'necesitó',We:'necesitamos',They:'necesitaron'}, future: {I:'necesitaré',You:'necesitarás',He:'necesitará',She:'necesitará',It:'necesitará',We:'necesitaremos',They:'necesitarán'}, cond: {I:'necesitaría',You:'necesitarías',He:'necesitaría',She:'necesitaría',It:'necesitaría',We:'necesitaríamos',They:'necesitarían'}, part: 'necesitado', ger: 'necesitando' }
  };

  const conj = c[verbEs];
  if (!conj) return `${verbEs} ${prep} ${nounEs}`;

  if (tense === 'present_simple') return `${conj.present[pronoun]} ${prep} ${nounEs}`;
  if (tense === 'past_simple') return `${conj.past[pronoun]} ${prep} ${nounEs}`;
  if (tense === 'future_simple') return `${conj.future[pronoun]} ${prep} ${nounEs}`;
  if (tense === 'present_conditional') return `${conj.cond[pronoun]} ${prep} ${nounEs}`;
  
  if (tense.includes('perfect')) {
    const aux = tense.startsWith('present') ? (['He','She','It'].includes(pronoun) ? 'ha' : 'he') :
                tense.startsWith('past') ? 'había' :
                tense.startsWith('future') ? 'habré' : 'habría';
    return `${aux} ${conj.part} ${prep} ${nounEs}`;
  }

  if (tense.includes('continuous')) {
    if (tense === 'present_continuous') {
      const aux = { I:'estoy', You:'estás', He:'está', She:'está', It:'está', We:'estamos', They:'están' }[pronoun];
      return `${aux} ${conj.ger} ${prep} ${nounEs}`;
    }
    if (tense === 'past_continuous') {
      const aux = ['I','He','She','It'].includes(pronoun) ? 'estaba' : 'estabas';
      return `${aux} ${conj.ger} ${prep} ${nounEs}`;
    }
    if (tense === 'future_continuous') return `estaré ${conj.ger} ${prep} ${nounEs}`;
  }

  return `${verbEs} ${prep} ${nounEs}`;
}

// Función principal de traducción natural
function buildNaturalTranslation(pronoun, verb, noun, tenseType) {
  const nounEs = translateNoun(noun.en);
  const pronounEs = translatePronoun(pronoun);

  // 1. Caso especial: Verbo "like" (gustar)
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

  // 3. Fallback: Traducción directa pero conjugada (para verbos regulares/irregulares mapeados)
  const verbEsMap = {
    be: 'ser/estar', have: 'tener', do: 'hacer', go: 'ir', get: 'obtener',
    make: 'hacer', know: 'saber', think: 'pensar', take: 'tomar', speak: 'hablar',
    work: 'trabajar', want: 'querer', like: 'gustar', need: 'necesitar', live: 'vivir'
  };
  const verbEs = verbEsMap[verb] || verb;
  
  return `${pronounEs} ${conjugateEs(verbEs, tenseType, pronoun, nounEs)}.`;
}

// ============================================================
// 15 ESTRUCTURAS VERBALES (Actualizadas)
// ============================================================

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

export const PRESENT_PERFECT_CONTINUOUS = {
  key: 'present_perfect_continuous', name: 'Present Perfect Continuous', level: 'advanced', floor: 'present', category: 'perfect_continuous', structure: 'Pronoun + have/has + been + Verb-ing + Object',
  build: (pronoun, verb, level = 'advanced') => {
    const noun = getRandomNoun(level);
    return {
      en: `${pronoun} ${(['He','She','It'].includes(pronoun) ? 'has' : 'have')} been ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} for hours.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'present_perfect_continuous'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'past_simple'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'past_perfect'),
      structure: 'Pronoun + had + Verb (Form 3) + Object',
      context: { use: 'Acción pasada antes de otra acción pasada', example: 'I had finished before you arrived. (Había terminado antes de que llegaras.)', tip: 'Usa had + participio.' }
    };
  }
};

export const PAST_CONTINUOUS = {
  key: 'past_continuous', name: 'Past Continuous', level: 'intermediate', floor: 'past', category: 'continuous', structure: 'Pronoun + was/were + Verb-ing + Object',
  build: (pronoun, verb, level = 'beginner') => {
    const noun = getRandomNoun(level);
    const was = ['I','He','She','It'].includes(pronoun) ? 'was' : 'were';
    return {
      en: `${pronoun} ${was} ${getVerbForm(verb, pronoun, 1)}ing ${noun.en} yesterday.`,
      es: buildNaturalTranslation(pronoun, verb, noun, 'past_continuous'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'past_perfect_continuous'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'future_simple'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'future_perfect'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'future_continuous'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'future_perfect_continuous'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'present_conditional'),
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
      es: buildNaturalTranslation(pronoun, verb, noun, 'perfect_conditional'),
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