// src/utils/naturalTranslation.js
import { translateNoun } from '../data/nouns';

// 1. Traducción de pronombres (capitalizados)
export function translatePronoun(pronoun) {
  const map = { I: 'Yo', You: 'Tú', He: 'Él', She: 'Ella', We: 'Nosotros', They: 'Ellos', It: 'Eso' };
  return map[pronoun] || pronoun;
}

// 2. Colocaciones naturales (evita "hacer una decisión", usa "tomar una decisión")
function getCollocation(verb, nounEn) {
  const key = `${verb}::${nounEn}`;
  const collocations = {
    'make::a decision': { v: 'tomar', n: 'una decisión' },
    'make::the answer': { v: 'dar', n: 'la respuesta' },
    'do::a question': { v: 'hacer', n: 'una pregunta' },
    'do::my job': { v: 'hacer', n: 'mi trabajo' },
    'work::my job': { v: 'trabajar', n: 'mi empleo', prep: 'en' },
    'work::English': { v: 'trabajar', n: 'inglés', prep: 'en' },
    'speak::English': { v: 'hablar', n: 'inglés' },
    'speak::the language': { v: 'hablar', n: 'el idioma' },
    'know::the truth': { v: 'saber', n: 'la verdad' },
    'know::the answer': { v: 'saber', n: 'la respuesta' },
    'know::my friend': { v: 'conocer', n: 'a mi amigo' },
    'take::the bus': { v: 'tomar', n: 'el autobús' },
    'take::the car': { v: 'tomar', n: 'el auto' },
    'get::the answer': { v: 'obtener', n: 'la respuesta' },
    'get::a job': { v: 'conseguir', n: 'un trabajo' },
    'think::a problem': { v: 'pensar', n: 'en un problema' },
    'think::my life': { v: 'pensar', n: 'en mi vida' },
    'live::my home': { v: 'vivir', n: 'en mi hogar' },
  };
  return collocations[key] || null;
}

// 3. Diccionario de conjugación de los 15 verbos esenciales
const VERBS = {
  be: { pres: {I:'soy/estoy',You:'eres/estás',He:'es/está',She:'es/está',It:'es/está',We:'somos/estamos',They:'son/están'}, past: {I:'fui/estuve',You:'fuiste/estuviste',He:'fue/estuvo',She:'fue/estuvo',It:'fue/estuvo',We:'fuimos/estuvimos',They:'fueron/estuvieron'}, fut: {I:'seré/estaré',You:'serás/estarás',He:'será/estará',She:'será/estará',It:'será/estará',We:'seremos/estaremos',They:'serán/estarán'}, cond: {I:'sería/estaría',You:'serías/estarías',He:'sería/estaría',She:'sería/estaría',It:'sería/estaría',We:'seríamos/estaríamos',They:'serían/estarían'}, part: 'sido/estado', ger: 'siendo/estando' },
  have: { pres: {I:'tengo',You:'tienes',He:'tiene',She:'tiene',It:'tiene',We:'tenemos',They:'tienen'}, past: {I:'tuve',You:'tuviste',He:'tuvo',She:'tuvo',It:'tuvo',We:'tuvimos',They:'tuvieron'}, fut: {I:'tendré',You:'tendrás',He:'tendrá',She:'tendrá',It:'tendrá',We:'tendremos',They:'tendrán'}, cond: {I:'tendría',You:'tendrías',He:'tendría',She:'tendría',It:'tendría',We:'tendríamos',They:'tendrían'}, part: 'tenido', ger: 'teniendo' },
  do: { pres: {I:'hago',You:'haces',He:'hace',She:'hace',It:'hace',We:'hacemos',They:'hacen'}, past: {I:'hice',You:'hiciste',He:'hizo',She:'hizo',It:'hizo',We:'hicimos',They:'hicieron'}, fut: {I:'haré',You:'harás',He:'hará',She:'hará',It:'hará',We:'haremos',They:'harán'}, cond: {I:'haría',You:'harías',He:'haría',She:'haría',It:'haría',We:'haríamos',They:'harían'}, part: 'hecho', ger: 'haciendo' },
  go: { pres: {I:'voy',You:'vas',He:'va',She:'va',It:'va',We:'vamos',They:'van'}, past: {I:'fui',You:'fuiste',He:'fue',She:'fue',It:'fue',We:'fuimos',They:'fueron'}, fut: {I:'iré',You:'irás',He:'irá',She:'irá',It:'irá',We:'iremos',They:'irán'}, cond: {I:'iría',You:'irías',He:'iría',She:'iría',It:'iría',We:'iríamos',They:'irían'}, part: 'ido', ger: 'yendo' },
  get: { pres: {I:'obtengo',You:'obtienes',He:'obtiene',She:'obtiene',It:'obtiene',We:'obtenemos',They:'obtienen'}, past: {I:'obtuve',You:'obtuviste',He:'obtuvo',She:'obtuvo',It:'obtuvo',We:'obtuvimos',They:'obtuvieron'}, fut: {I:'obtendré',You:'obtendrás',He:'obtendrá',She:'obtendrá',It:'obtendrá',We:'obtendremos',They:'obtendrán'}, cond: {I:'obtendría',You:'obtendrías',He:'obtendría',She:'obtendría',It:'obtendría',We:'obtendríamos',They:'obtendrían'}, part: 'obtenido', ger: 'obteniendo' },
  make: { pres: {I:'hago',You:'haces',He:'hace',She:'hace',It:'hace',We:'hacemos',They:'hacen'}, past: {I:'hice',You:'hiciste',He:'hizo',She:'hizo',It:'hizo',We:'hicimos',They:'hicieron'}, fut: {I:'haré',You:'harás',He:'hará',She:'hará',It:'hará',We:'haremos',They:'harán'}, cond: {I:'haría',You:'harías',He:'haría',She:'haría',It:'haría',We:'haríamos',They:'harían'}, part: 'hecho', ger: 'haciendo' },
  know: { pres: {I:'sé',You:'sabes',He:'sabe',She:'sabe',It:'sabe',We:'sabemos',They:'saben'}, past: {I:'supe',You:'supiste',He:'supo',She:'supo',It:'supo',We:'supimos',They:'supieron'}, fut: {I:'sabré',You:'sabrás',He:'sabrá',She:'sabrá',It:'sabrá',We:'sabremos',They:'sabrán'}, cond: {I:'sabría',You:'sabrías',He:'sabría',She:'sabría',It:'sabría',We:'sabríamos',They:'sabrían'}, part: 'sabido', ger: 'sabiendo' },
  think: { pres: {I:'pienso',You:'piensas',He:'piensa',She:'piensa',It:'piensa',We:'pensamos',They:'piensan'}, past: {I:'pensé',You:'pensaste',He:'pensó',She:'pensó',It:'pensó',We:'pensamos',They:'pensaron'}, fut: {I:'pensaré',You:'pensarás',He:'pensará',She:'pensará',It:'pensará',We:'pensaremos',They:'pensarán'}, cond: {I:'pensaría',You:'pensarías',He:'pensaría',She:'pensaría',It:'pensaría',We:'pensaríamos',They:'pensarían'}, part: 'pensado', ger: 'pensando' },
  take: { pres: {I:'tomo',You:'tomas',He:'toma',She:'toma',It:'toma',We:'tomamos',They:'toman'}, past: {I:'tomé',You:'tomaste',He:'tomó',She:'tomó',It:'tomó',We:'tomamos',They:'tomaron'}, fut: {I:'tomaré',You:'tomarás',He:'tomará',She:'tomará',It:'tomará',We:'tomaremos',They:'tomarán'}, cond: {I:'tomaría',You:'tomarías',He:'tomaría',She:'tomaría',It:'tomaría',We:'tomaríamos',They:'tomarían'}, part: 'tomado', ger: 'tomando' },
  speak: { pres: {I:'hablo',You:'hablas',He:'habla',She:'habla',It:'habla',We:'hablamos',They:'hablan'}, past: {I:'hablé',You:'hablaste',He:'habló',She:'habló',It:'habló',We:'hablamos',They:'hablaron'}, fut: {I:'hablaré',You:'hablarás',He:'hablará',She:'hablará',It:'hablará',We:'hablaremos',They:'hablarán'}, cond: {I:'hablaría',You:'hablarías',He:'hablaría',She:'hablaría',It:'hablaría',We:'hablaríamos',They:'hablarían'}, part: 'hablado', ger: 'hablando' },
  work: { pres: {I:'trabajo',You:'trabajas',He:'trabaja',She:'trabaja',It:'trabaja',We:'trabajamos',They:'trabajan'}, past: {I:'trabajé',You:'trabajaste',He:'trabajó',She:'trabajó',It:'trabajó',We:'trabajamos',They:'trabajaron'}, fut: {I:'trabajaré',You:'trabajarás',He:'trabajará',She:'trabajará',It:'trabajará',We:'trabajaremos',They:'trabajarán'}, cond: {I:'trabajaría',You:'trabajarías',He:'trabajaría',She:'trabajaría',It:'trabajaría',We:'trabajaríamos',They:'trabajarían'}, part: 'trabajado', ger: 'trabajando' },
  want: { pres: {I:'quiero',You:'quieres',He:'quiere',She:'quiere',It:'quiere',We:'queremos',They:'quieren'}, past: {I:'quise',You:'quisiste',He:'quiso',She:'quiso',It:'quiso',We:'quisimos',They:'quisieron'}, fut: {I:'querré',You:'querrás',He:'querrá',She:'querrá',It:'querrá',We:'querremos',They:'querrán'}, cond: {I:'querría',You:'querrías',He:'querría',She:'querría',It:'querría',We:'querríamos',They:'querrían'}, part: 'querido', ger: 'queriendo' },
  like: { pres: {I:'me gusta',You:'te gusta',He:'le gusta',She:'le gusta',It:'le gusta',We:'nos gusta',They:'les gusta'}, past: {I:'me gustó',You:'te gustó',He:'le gustó',She:'le gustó',It:'le gustó',We:'nos gustó',They:'les gustó'}, fut: {I:'me gustará',You:'te gustará',He:'le gustará',She:'le gustará',It:'le gustará',We:'nos gustará',They:'les gustará'}, cond: {I:'me gustaría',You:'te gustaría',He:'le gustaría',She:'le gustaría',It:'le gustaría',We:'nos gustaría',They:'les gustaría'}, part: 'gustado', ger: 'gustando' },
  need: { pres: {I:'necesito',You:'necesitas',He:'necesita',She:'necesita',It:'necesita',We:'necesitamos',They:'necesitan'}, past: {I:'necesité',You:'necesitaste',He:'necesitó',She:'necesitó',It:'necesitó',We:'necesitamos',They:'necesitaron'}, fut: {I:'necesitaré',You:'necesitarás',He:'necesitará',She:'necesitará',It:'necesitará',We:'necesitaremos',They:'necesitarán'}, cond: {I:'necesitaría',You:'necesitarías',He:'necesitaría',She:'necesitaría',It:'necesitaría',We:'necesitaríamos',They:'necesitarían'}, part: 'necesitado', ger: 'necesitando' },
  live: { pres: {I:'vivo',You:'vives',He:'vive',She:'vive',It:'vive',We:'vivimos',They:'viven'}, past: {I:'viví',You:'viviste',He:'vivió',She:'vivió',It:'vivió',We:'vivimos',They:'vivieron'}, fut: {I:'viviré',You:'vivirás',He:'vivirá',She:'vivirá',It:'vivirá',We:'viviremos',They:'vivirán'}, cond: {I:'viviría',You:'vivirías',He:'viviría',She:'viviría',It:'viviría',We:'viviríamos',They:'vivirían'}, part: 'vivido', ger: 'viviendo' }
};

// Auxiliares para tiempos compuestos
const HABER = {
  pres: {I:'he',You:'has',He:'ha',She:'ha',It:'ha',We:'hemos',They:'han'},
  past_imp: {I:'había',You:'habías',He:'había',She:'había',It:'había',We:'habíamos',They:'habían'},
  fut: {I:'habré',You:'habrás',He:'habrá',She:'habrá',It:'habrá',We:'habremos',They:'habrán'},
  cond: {I:'habría',You:'habrías',He:'habría',She:'habría',It:'habría',We:'habríamos',They:'habrían'}
};
const ESTAR = {
  pres: {I:'estoy',You:'estás',He:'está',She:'está',It:'está',We:'estamos',They:'están'},
  past_imp: {I:'estaba',You:'estabas',He:'estaba',She:'estaba',It:'estaba',We:'estábamos',They:'estaban'},
  fut: {I:'estaré',You:'estarás',He:'estará',She:'estará',It:'estará',We:'estaremos',They:'estarán'}
};

// 4. Función principal de traducción natural
export function buildNaturalTranslation(pronoun, verb, nounEn, tenseKey) {
  const nounEs = translateNoun(nounEn);
  const pronounEs = translatePronoun(pronoun);
  const v = VERBS[verb];
  
  if (!v) return `${pronounEs} [verbo] ${nounEs}.`; // Fallback de seguridad

  // CASO ESPECIAL: Verbo "like" (gustar) ya viene conjugado con pronombre indirecto en el diccionario
  if (verb === 'like') {
    const verbForm = v[tenseKey.includes('perfect') ? 'part' : tenseKey.includes('continuous') ? 'ger' : tenseKey.replace('_simple','').replace('present_','').replace('past_','').replace('future_','').replace('perfect_','') || 'pres'] || v.pres[pronoun];
    // Simplificación para like: usamos el mapa directo
    const tenseMap = { present_simple: 'pres', past_simple: 'past', future_simple: 'fut', present_conditional: 'cond' };
    const form = v[tenseMap[tenseKey] || 'pres'][pronoun];
    return `${form} ${nounEs}.`;
  }

  // Buscar si hay una colocación especial (ej: make + a decision)
  const collocation = getCollocation(verb, nounEn);
  const targetVerb = collocation ? collocation.v : verb;
  const targetNoun = collocation ? collocation.n : nounEs;
  const prep = collocation?.prep ? `${collocation.prep} ` : '';
  
  // Obtener conjugación del verbo objetivo (si es colocación, usamos diccionario genérico o fallback)
  const targetV = VERBS[targetVerb] || v;
  
  // Lógica de construcción por tipo de tiempo verbal
  if (tenseKey.includes('perfect') && !tenseKey.includes('continuous')) {
    // Tiempos perfectos: haber + participio
    let haberTense = 'pres';
    if (tenseKey.startsWith('past')) haberTense = 'past_imp';
    if (tenseKey.startsWith('future')) haberTense = 'fut';
    if (tenseKey.includes('conditional')) haberTense = 'cond';
    
    const aux = HABER[haberTense][pronoun];
    return `${pronounEs} ${aux} ${targetV.part} ${prep}${targetNoun}.`;
  }
  
  if (tenseKey.includes('continuous')) {
    // Tiempos continuos: estar + gerundio
    let estarTense = 'pres';
    if (tenseKey.startsWith('past')) estarTense = 'past_imp';
    if (tenseKey.startsWith('future')) estarTense = 'fut';
    
    const aux = ESTAR[estarTense][pronoun];
    return `${pronounEs} ${aux} ${targetV.ger} ${prep}${targetNoun}.`;
  }

  // Tiempos simples (present, past, future, conditional)
  const tenseMap = { present_simple: 'pres', past_simple: 'past', future_simple: 'fut', present_conditional: 'cond' };
  const formKey = tenseMap[tenseKey] || 'pres';
  
  return `${pronounEs} ${targetV[formKey][pronoun]} ${prep}${targetNoun}.`;
}