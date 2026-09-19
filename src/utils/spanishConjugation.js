// ============================================================
// CONJUGADOR ESPAÑOL - Conjugación natural de los 15 verbos
// ============================================================

// Conjugaciones completas de los 15 verbos en todos los tiempos
export const SPANISH_CONJUGATIONS = {
  // === IRREGULARES ===
  be: {
    infinitive: 'ser/estar',
    present: { I: 'soy/estoy', You: 'eres/estás', He: 'es/está', She: 'es/está', It: 'es/está', We: 'somos/estamos', They: 'son/están' },
    past: { I: 'fui/estuve', You: 'fuiste/estuviste', He: 'fue/estuvo', She: 'fue/estuvo', It: 'fue/estuvo', We: 'fuimos/estuvimos', They: 'fueron/estuvieron' },
    future: { I: 'seré/estaré', You: 'serás/estarás', He: 'será/estará', She: 'será/estará', It: 'será/estará', We: 'seremos/estaremos', They: 'serán/estarán' },
    conditional: { I: 'sería/estaría', You: 'serías/estarías', He: 'sería/estaría', She: 'sería/estaría', It: 'sería/estaría', We: 'seríamos/estaríamos', They: 'serían/estarían' },
    participle: 'sido/estado'
  },
  have: {
    infinitive: 'tener',
    present: { I: 'tengo', You: 'tienes', He: 'tiene', She: 'tiene', It: 'tiene', We: 'tenemos', They: 'tienen' },
    past: { I: 'tuve', You: 'tuviste', He: 'tuvo', She: 'tuvo', It: 'tuvo', We: 'tuvimos', They: 'tuvieron' },
    future: { I: 'tendré', You: 'tendrás', He: 'tendrá', She: 'tendrá', It: 'tendrá', We: 'tendremos', They: 'tendrán' },
    conditional: { I: 'tendría', You: 'tendrías', He: 'tendría', She: 'tendría', It: 'tendría', We: 'tendríamos', They: 'tendrían' },
    participle: 'tenido'
  },
  do: {
    infinitive: 'hacer',
    present: { I: 'hago', You: 'haces', He: 'hace', She: 'hace', It: 'hace', We: 'hacemos', They: 'hacen' },
    past: { I: 'hice', You: 'hiciste', He: 'hizo', She: 'hizo', It: 'hizo', We: 'hicimos', They: 'hicieron' },
    future: { I: 'haré', You: 'harás', He: 'hará', She: 'hará', It: 'hará', We: 'haremos', They: 'harán' },
    conditional: { I: 'haría', You: 'harías', He: 'haría', She: 'haría', It: 'haría', We: 'haríamos', They: 'harían' },
    participle: 'hecho'
  },
  go: {
    infinitive: 'ir',
    present: { I: 'voy', You: 'vas', He: 'va', She: 'va', It: 'va', We: 'vamos', They: 'van' },
    past: { I: 'fui', You: 'fuiste', He: 'fue', She: 'fue', It: 'fue', We: 'fuimos', They: 'fueron' },
    future: { I: 'iré', You: 'irás', He: 'irá', She: 'irá', It: 'irá', We: 'iremos', They: 'irán' },
    conditional: { I: 'iría', You: 'irías', He: 'iría', She: 'iría', It: 'iría', We: 'iríamos', They: 'irían' },
    participle: 'ido'
  },
  get: {
    infinitive: 'obtener',
    present: { I: 'obtengo', You: 'obtienes', He: 'obtiene', She: 'obtiene', It: 'obtiene', We: 'obtenemos', They: 'obtienen' },
    past: { I: 'obtuve', You: 'obtuviste', He: 'obtuvo', She: 'obtuvo', It: 'obtuvo', We: 'obtuvimos', They: 'obtuvieron' },
    future: { I: 'obtendré', You: 'obtendrás', He: 'obtendrá', She: 'obtendrá', It: 'obtendrá', We: 'obtendremos', They: 'obtendrán' },
    conditional: { I: 'obtendría', You: 'obtendrías', He: 'obtendría', She: 'obtendría', It: 'obtendría', We: 'obtendríamos', They: 'obtendrían' },
    participle: 'obtenido'
  },
  make: {
    infinitive: 'hacer',
    present: { I: 'hago', You: 'haces', He: 'hace', She: 'hace', It: 'hace', We: 'hacemos', They: 'hacen' },
    past: { I: 'hice', You: 'hiciste', He: 'hizo', She: 'hizo', It: 'hizo', We: 'hicimos', They: 'hicieron' },
    future: { I: 'haré', You: 'harás', He: 'hará', She: 'hará', It: 'hará', We: 'haremos', They: 'harán' },
    conditional: { I: 'haría', You: 'harías', He: 'haría', She: 'haría', It: 'haría', We: 'haríamos', They: 'harían' },
    participle: 'hecho'
  },
  know: {
    infinitive: 'saber',
    present: { I: 'sé', You: 'sabes', He: 'sabe', She: 'sabe', It: 'sabe', We: 'sabemos', They: 'saben' },
    past: { I: 'supe', You: 'supiste', He: 'supo', She: 'supo', It: 'supo', We: 'supimos', They: 'supieron' },
    future: { I: 'sabré', You: 'sabrás', He: 'sabrá', She: 'sabrá', It: 'sabrá', We: 'sabremos', They: 'sabrán' },
    conditional: { I: 'sabría', You: 'sabrías', He: 'sabría', She: 'sabría', It: 'sabría', We: 'sabríamos', They: 'sabrían' },
    participle: 'sabido'
  },
  think: {
    infinitive: 'pensar',
    present: { I: 'pienso', You: 'piensas', He: 'piensa', She: 'piensa', It: 'piensa', We: 'pensamos', They: 'piensan' },
    past: { I: 'pensé', You: 'pensaste', He: 'pensó', She: 'pensó', It: 'pensó', We: 'pensamos', They: 'pensaron' },
    future: { I: 'pensaré', You: 'pensarás', He: 'pensará', She: 'pensará', It: 'pensará', We: 'pensaremos', They: 'pensarán' },
    conditional: { I: 'pensaría', You: 'pensarías', He: 'pensaría', She: 'pensaría', It: 'pensaría', We: 'pensaríamos', They: 'pensarían' },
    participle: 'pensado'
  },
  take: {
    infinitive: 'tomar',
    present: { I: 'tomo', You: 'tomas', He: 'toma', She: 'toma', It: 'toma', We: 'tomamos', They: 'toman' },
    past: { I: 'tomé', You: 'tomaste', He: 'tomó', She: 'tomó', It: 'tomó', We: 'tomamos', They: 'tomaron' },
    future: { I: 'tomaré', You: 'tomarás', He: 'tomará', She: 'tomará', It: 'tomará', We: 'tomaremos', They: 'tomarán' },
    conditional: { I: 'tomaría', You: 'tomarías', He: 'tomaría', She: 'tomaría', It: 'tomaría', We: 'tomaríamos', They: 'tomarían' },
    participle: 'tomado'
  },
  speak: {
    infinitive: 'hablar',
    present: { I: 'hablo', You: 'hablas', He: 'habla', She: 'habla', It: 'habla', We: 'hablamos', They: 'hablan' },
    past: { I: 'hablé', You: 'hablaste', He: 'habló', She: 'habló', It: 'habló', We: 'hablamos', They: 'hablaron' },
    future: { I: 'hablaré', You: 'hablarás', He: 'hablará', She: 'hablará', It: 'hablará', We: 'hablaremos', They: 'hablarán' },
    conditional: { I: 'hablaría', You: 'hablarías', He: 'hablaría', She: 'hablaría', It: 'hablaría', We: 'hablaríamos', They: 'hablarían' },
    participle: 'hablado'
  },
  // === REGULARES ===
  work: {
    infinitive: 'trabajar',
    present: { I: 'trabajo', You: 'trabajas', He: 'trabaja', She: 'trabaja', It: 'trabaja', We: 'trabajamos', They: 'trabajan' },
    past: { I: 'trabajé', You: 'trabajaste', He: 'trabajó', She: 'trabajó', It: 'trabajó', We: 'trabajamos', They: 'trabajaron' },
    future: { I: 'trabajaré', You: 'trabajarás', He: 'trabajará', She: 'trabajará', It: 'trabajará', We: 'trabajaremos', They: 'trabajarán' },
    conditional: { I: 'trabajaría', You: 'trabajarías', He: 'trabajaría', She: 'trabajaría', It: 'trabajaría', We: 'trabajaríamos', They: 'trabajarían' },
    participle: 'trabajado'
  },
  want: {
    infinitive: 'querer',
    present: { I: 'quiero', You: 'quieres', He: 'quiere', She: 'quiere', It: 'quiere', We: 'queremos', They: 'quieren' },
    past: { I: 'quise', You: 'quisiste', He: 'quiso', She: 'quiso', It: 'quiso', We: 'quisimos', They: 'quisieron' },
    future: { I: 'querré', You: 'querrás', He: 'querrá', She: 'querrá', It: 'querrá', We: 'querremos', They: 'querrán' },
    conditional: { I: 'querría', You: 'querrías', He: 'querría', She: 'querría', It: 'querría', We: 'querríamos', They: 'querrían' },
    participle: 'querido'
  },
  like: {
    infinitive: 'gustar',
    present: { I: 'me gusta', You: 'te gusta', He: 'le gusta', She: 'le gusta', It: 'le gusta', We: 'nos gusta', They: 'les gusta' },
    past: { I: 'me gustó', You: 'te gustó', He: 'le gustó', She: 'le gustó', It: 'le gustó', We: 'nos gustó', They: 'les gustó' },
    future: { I: 'me gustará', You: 'te gustará', He: 'le gustará', She: 'le gustará', It: 'le gustará', We: 'nos gustará', They: 'les gustará' },
    conditional: { I: 'me gustaría', You: 'te gustaría', He: 'le gustaría', She: 'le gustaría', It: 'le gustaría', We: 'nos gustaría', They: 'les gustaría' },
    participle: 'gustado'
  },
  need: {
    infinitive: 'necesitar',
    present: { I: 'necesito', You: 'necesitas', He: 'necesita', She: 'necesita', It: 'necesita', We: 'necesitamos', They: 'necesitan' },
    past: { I: 'necesité', You: 'necesitaste', He: 'necesitó', She: 'necesitó', It: 'necesitó', We: 'necesitamos', They: 'necesitaron' },
    future: { I: 'necesitaré', You: 'necesitarás', He: 'necesitará', She: 'necesitará', It: 'necesitará', We: 'necesitaremos', They: 'necesitarán' },
    conditional: { I: 'necesitaría', You: 'necesitarías', He: 'necesitaría', She: 'necesitaría', It: 'necesitaría', We: 'necesitaríamos', They: 'necesitarían' },
    participle: 'necesitado'
  },
  live: {
    infinitive: 'vivir',
    present: { I: 'vivo', You: 'vives', He: 'vive', She: 'vive', It: 'vive', We: 'vivimos', They: 'viven' },
    past: { I: 'viví', You: 'viviste', He: 'vivió', She: 'vivió', It: 'vivió', We: 'vivimos', They: 'vivieron' },
    future: { I: 'viviré', You: 'vivirás', He: 'vivirá', She: 'vivirá', It: 'vivirá', We: 'viviremos', They: 'vivirán' },
    conditional: { I: 'viviría', You: 'vivirías', He: 'viviría', She: 'viviría', It: 'viviría', We: 'viviríamos', They: 'vivirían' },
    participle: 'vivido'
  }
};

/**
 * Conjugación en gerundio (-ando/-iendo)
 */
export function getGerund(verb) {
  const irregulars = {
    be: 'siendo/estando', have: 'teniendo', do: 'haciendo', go: 'yendo',
    get: 'obteniendo', make: 'haciendo', know: 'sabiendo', think: 'pensando',
    take: 'tomando', speak: 'hablando', work: 'trabajando', want: 'queriendo',
    like: 'gustando', need: 'necesitando', live: 'viviendo'
  };
  return irregulars[verb] || `${verb}ando`;
}

/**
 * Capitaliza la primera letra
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}