// ============================================================
// TRADUCTOR Y CONJUGADOR NATURAL DE ESPAÑOL
// ============================================================

export function translatePronoun(pronoun) {
  const map = { I: 'Yo', You: 'Tú', He: 'Él', She: 'Ella', We: 'Nosotros', They: 'Ellos', It: 'Eso' };
  return map[pronoun] || pronoun;
}

// Colocaciones naturales (evita traducciones literales absurdas)
export function getNaturalCollocation(verb, nounEn) {
  const key = `${verb}::${nounEn}`;
  const collocations = {
    'make::a decision': { verb: 'tomar', noun: 'una decisión' },
    'make::the answer': { verb: 'dar', noun: 'la respuesta' },
    'do::a question': { verb: 'hacer', noun: 'una pregunta' },
    'do::my job': { verb: 'hacer', noun: 'mi trabajo' },
    'work::my job': { verb: 'trabajar', noun: 'mi empleo', prep: 'en' },
    'work::English': { verb: 'trabajar', noun: 'inglés', prep: 'en' },
    'speak::English': { verb: 'hablar', noun: 'inglés' },
    'speak::the language': { verb: 'hablar', noun: 'el idioma' },
    'know::the truth': { verb: 'saber', noun: 'la verdad' },
    'know::the answer': { verb: 'saber', noun: 'la respuesta' },
    'know::my friend': { verb: 'conocer', noun: 'a mi amigo' },
    'take::the bus': { verb: 'tomar', noun: 'el autobús' },
    'take::the car': { verb: 'tomar', noun: 'el auto' },
    'get::the answer': { verb: 'obtener', noun: 'la respuesta' },
    'get::a job': { verb: 'conseguir', noun: 'un trabajo' },
    'think::a problem': { verb: 'pensar', noun: 'en un problema' },
    'think::my life': { verb: 'pensar', noun: 'en mi vida' },
    'live::my home': { verb: 'vivir', noun: 'en mi hogar' },
  };
  return collocations[key] || null;
}

// Conjugador español inteligente
export function conjugateEs(verbEs, tense, pronoun, nounEs, prep = '') {
  const c = {
    tomar: { present: {I:'tomo',You:'tomas',He:'toma',She:'toma',It:'toma',We:'tomamos',They:'toman'}, past: {I:'tomé',You:'tomaste',He:'tomó',She:'tomó',It:'tomó',We:'tomamos',They:'tomaron'}, future: {I:'tomaré',You:'tomarás',He:'tomará',She:'tomará',It:'tomará',We:'tomaremos',They:'tomarán'}, cond: {I:'tomaría',You:'tomarías',He:'tomaría',She:'tomaría',It:'tomaría',We:'tomaríamos',They:'tomarían'}, part: 'tomado', ger: 'tomando' },
    hacer: { present: {I:'hago',You:'haces',He:'hace',She:'hace',It:'hace',We:'hacemos',They:'hacen'}, past: {I:'hice',You:'hiciste',He:'hizo',She:'hizo',It:'hizo',We:'hicimos',They:'hicieron'}, future: {I:'haré',You:'harás',He:'hará',She:'hará',It:'hará',We:'haremos',They:'harán'}, cond: {I:'haría',You:'harías',He:'haría',She:'haría',It:'haría',We:'haríamos',They:'harían'}, part: 'hecho', ger: 'haciendo' },
    trabajar: { present: {I:'trabajo',You:'trabajas',He:'trabaja',She:'trabaja',It:'trabaja',We:'trabajamos',They:'trabajan'}, past: {I:'trabajé',You:'trabajaste',He:'trabajó',She:'trabajó',It:'trabajó',We:'trabajamos',They:'trabajaron'}, future: {I:'trabajaré',You:'trabajarás',He:'trabajará',She:'trabajará',It:'trabajará',We:'trabajaremos',They:'trabajarán'}, cond: {I:'trabajaría',You:'trabajarías',He:'trabajaría',She:'trabajaría',It:'trabajaría',We:'trabajaríamos',They:'trabajarían'}, part: 'trabajado', ger: 'trabajando' },
    hablar: { present: {I:'hablo',You:'hablas',He:'habla',She:'habla',It:'habla',We:'hablamos',They:'hablan'}, past: {I:'hablé',You:'hablaste',He:'habló',She:'habló',It:'habló',We:'hablamos',They:'hablaron'}, future: {I:'hablaré',You:'hablarás',He:'hablará',She:'hablará',It:'hablará',We:'hablaremos',They:'hablarán'}, cond: {I:'hablaría',You:'hablarías',He:'hablaría',She:'hablaría',It:'hablaría',We:'hablaríamos',They:'hablarían'}, part: 'hablado', ger: 'hablando' },
    saber: { present: {I:'sé',You:'sabes',He:'sabe',She:'sabe',It:'sabe',We:'sabemos',They:'saben'}, past: {I:'supe',You:'supiste',He:'supo',She:'supo',It:'supo',We:'supimos',They:'supieron'}, future: {I:'sabré',You:'sabrás',He:'sabrá',She:'sabrá',It:'sabrá',We:'sabremos',They:'sabrán'}, cond: {I:'sabría',You:'sabrías',He:'sabría',She:'sabría',It:'sabría',We:'sabríamos',They:'sabrían'}, part: 'sabido', ger: 'sabiendo' },
    conocer: { present: {I:'conozco',You:'conoces',He:'conoce',She:'conoce',It:'conoce',We:'conocemos',They:'conocen'}, past: {I:'conocí',You:'conociste',He:'conoció',She:'conoció',It:'conoció',We:'conocimos',They:'conocieron'}, future: {I:'conoceré',You:'conocerás',He:'conocerá',She:'conocerá',It:'conocerá',We:'conoceremos',They:'conocerán'}, cond: {I:'conocería',You:'conocerías',He:'conocería',She:'conocería',It:'conocería',We:'conoceríamos',They:'conocerían'}, part: 'conocido', ger: 'conociendo' },
    conseguir: { present: {I:'consigo',You:'consigues',He:'consigue',She:'consigue',It:'consigue',We:'conseguimos',They:'consiguen'}, past: {I:'conseguí',You:'conseguiste',He:'consiguió',She:'consiguió',It:'consiguió',We:'conseguimos',They:'consiguieron'}, future: {I:'conseguiré',You:'conseguirás',He:'conseguirá',She:'conseguirá',It:'conseguirá',We:'conseguiremos',They:'conseguirán'}, cond: {I:'conseguiría',You:'conseguirías',He:'conseguiría',She:'conseguiría',It:'conseguiría',We:'conseguiríamos',They:'conseguirían'}, part: 'conseguido', ger: 'consiguiendo' },
    obtener: { present: {I:'obtengo',You:'obtienes',He:'obtiene',She:'obtiene',It:'obtiene',We:'obtenemos',They:'obtienen'}, past: {I:'obtuve',You:'obtuviste',He:'obtuvo',She:'obtuvo',It:'obtuvo',We:'obtuvimos',They:'obtuvieron'}, future: {I:'obtendré',You:'obtendrás',He:'obtendrá',She:'obtendrá',It:'obtendrá',We:'obtendremos',They:'obtendrán'}, cond: {I:'obtendría',You:'obtendrías',He:'obtendría',She:'obtendría',It:'obtendría',We:'obtendríamos',They:'obtendrían'}, part: 'obtenido', ger: 'obteniendo' },
    pensar: { present: {I:'pienso',You:'piensas',He:'piensa',She:'piensa',It:'piensa',We:'pensamos',They:'piensan'}, past: {I:'pensé',You:'pensaste',He:'pensó',She:'pensó',It:'pensó',We:'pensamos',They:'pensaron'}, future: {I:'pensaré',You:'pensarás',He:'pensará',She:'pensará',It:'pensará',We:'pensaremos',They:'pensarán'}, cond: {I:'pensaría',You:'pensarías',He:'pensaría',She:'pensaría',It:'pensaría',We:'pensaríamos',They:'pensarían'}, part: 'pensado', ger: 'pensando' },
    vivir: { present: {I:'vivo',You:'vives',He:'vive',She:'vive',It:'vive',We:'vivimos',They:'viven'}, past: {I:'viví',You:'viviste',He:'vivió',She:'vivió',It:'vivió',We:'vivimos',They:'vivieron'}, future: {I:'viviré',You:'vivirás',He:'vivirá',She:'vivirá',It:'vivirá',We:'viviremos',They:'vivirán'}, cond: {I:'viviría',You:'vivirías',He:'viviría',She:'viviría',It:'viviría',We:'viviríamos',They:'vivirían'}, part: 'vivido', ger: 'viviendo' },
    querer: { present: {I:'quiero',You:'quieres',He:'quiere',She:'quiere',It:'quiere',We:'queremos',They:'quieren'}, past: {I:'quise',You:'quisiste',He:'quiso',She:'quiso',It:'quiso',We:'quisimos',They:'quisieron'}, future: {I:'querré',You:'querrás',He:'querrá',She:'querrá',It:'querrá',We:'querremos',They:'querrán'}, cond: {I:'querría',You:'querrías',He:'querría',She:'querría',It:'querría',We:'querríamos',They:'querrían'}, part: 'querido', ger: 'queriendo' },
    necesitar: { present: {I:'necesito',You:'necesitas',He:'necesita',She:'necesita',It:'necesita',We:'necesitamos',They:'necesitan'}, past: {I:'necesité',You:'necesitaste',He:'necesitó',She:'necesitó',It:'necesitó',We:'necesitamos',They:'necesitaron'}, future: {I:'necesitaré',You:'necesitarás',He:'necesitará',She:'necesitará',It:'necesitará',We:'necesitaremos',They:'necesitarán'}, cond: {I:'necesitaría',You:'necesitarías',He:'necesitaría',She:'necesitaría',It:'necesitaría',We:'necesitaríamos',They:'necesitarían'}, part: 'necesitado', ger: 'necesitando' },
    tener: { present: {I:'tengo',You:'tienes',He:'tiene',She:'tiene',It:'tiene',We:'tenemos',They:'tienen'}, past: {I:'tuve',You:'tuviste',He:'tuvo',She:'tuvo',It:'tuvo',We:'tuvimos',They:'tuvieron'}, future: {I:'tendré',You:'tendrás',He:'tendrá',She:'tendrá',It:'tendrá',We:'tendremos',They:'tendrán'}, cond: {I:'tendría',You:'tendrías',He:'tendría',She:'tendría',It:'tendría',We:'tendríamos',They:'tendrían'}, part: 'tenido', ger: 'teniendo' },
    ir: { present: {I:'voy',You:'vas',He:'va',She:'va',It:'va',We:'vamos',They:'van'}, past: {I:'fui',You:'fuiste',He:'fue',She:'fue',It:'fue',We:'fuimos',They:'fueron'}, future: {I:'iré',You:'irás',He:'irá',She:'irá',It:'irá',We:'iremos',They:'irán'}, cond: {I:'iría',You:'irías',He:'iría',She:'iría',It:'iría',We:'iríamos',They:'irían'}, part: 'ido', ger: 'yendo' },
    ser: { present: {I:'soy',You:'eres',He:'es',She:'es',It:'es',We:'somos',They:'son'}, past: {I:'fui',You:'fuiste',He:'fue',She:'fue',It:'fue',We:'fuimos',They:'fueron'}, future: {I:'seré',You:'serás',He:'será',She:'será',It:'será',We:'seremos',They:'serán'}, cond: {I:'sería',You:'serías',He:'sería',She:'sería',It:'sería',We:'seríamos',They:'serían'}, part: 'sido', ger: 'siendo' }
  };

  const conj = c[verbEs];
  if (!conj) return `${verbEs} ${prep} ${nounEs}`.trim();

  if (tense === 'present_simple') return `${conj.present[pronoun]} ${prep} ${nounEs}`.trim();
  if (tense === 'past_simple') return `${conj.past[pronoun]} ${prep} ${nounEs}`.trim();
  if (tense === 'future_simple') return `${conj.future[pronoun]} ${prep} ${nounEs}`.trim();
  if (tense === 'present_conditional') return `${conj.cond[pronoun]} ${prep} ${nounEs}`.trim();
  
  if (tense.includes('perfect')) {
    const aux = tense.startsWith('present') ? (['He','She','It'].includes(pronoun) ? 'ha' : 'he') :
                tense.startsWith('past') ? 'había' :
                tense.startsWith('future') ? 'habré' : 'habría';
    return `${aux} ${conj.part} ${prep} ${nounEs}`.trim();
  }

  if (tense.includes('continuous')) {
    if (tense === 'present_continuous') {
      const aux = { I:'estoy', You:'estás', He:'está', She:'está', It:'está', We:'estamos', They:'están' }[pronoun];
      return `${aux} ${conj.ger} ${prep} ${nounEs}`.trim();
    }
    if (tense === 'past_continuous') {
      const aux = ['I','He','She','It'].includes(pronoun) ? 'estaba' : 'estabas';
      return `${aux} ${conj.ger} ${prep} ${nounEs}`.trim();
    }
    if (tense === 'future_continuous') return `estaré ${conj.ger} ${prep} ${nounEs}`.trim();
  }

  return `${verbEs} ${prep} ${nounEs}`.trim();
}