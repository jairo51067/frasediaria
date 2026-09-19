// ============================================================
// CONJUGADOR Y TRADUCTOR NATURAL DE ESPAÑOL
// ============================================================

export function translatePronoun(pronoun) {
  const map = {
    I: 'Yo', You: 'Tú', He: 'Él', She: 'Ella',
    We: 'Nosotros', They: 'Ellos', It: 'Eso'
  };
  return map[pronoun] || pronoun;
}

export function translateNoun(nounEn) {
  // Mapeo directo de los sustantivos del archivo nouns.js
  const dictionary = {
    'English': 'inglés', 'my job': 'mi empleo', 'my family': 'mi familia',
    'my friend': 'mi amigo', 'my home': 'mi hogar', 'water': 'agua',
    'food': 'comida', 'time': 'tiempo', 'day': 'día', 'work': 'trabajo',
    'a question': 'una pregunta', 'the answer': 'la respuesta',
    'a problem': 'un problema', 'an idea': 'una idea', 'the world': 'el mundo',
    'my life': 'mi vida', 'the phone': 'el teléfono', 'the car': 'el auto',
    'money': 'dinero', 'the house': 'la casa', 'the truth': 'la verdad',
    'a decision': 'una decisión', 'the situation': 'la situación',
    'the experience': 'la experiencia', 'the opportunity': 'la oportunidad',
    'the language': 'el idioma', 'the person': 'la persona',
    'the number': 'el número', 'the name': 'el nombre', 'the way': 'la manera'
  };
  return dictionary[nounEn] || nounEn;
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