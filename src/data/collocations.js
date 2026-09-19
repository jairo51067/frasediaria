// ============================================================
// COLOCACIONES - Traducciones contextuales verbo + objeto
// Maneja las combinaciones que NO se traducen literalmente
// ============================================================

/**
 * Traducción natural de verbo + objeto
 * Retorna null si no hay colocación especial (usar traducción literal)
 */
export function getNaturalTranslation(verb, nounEn, tense) {
  const key = `${verb}::${nounEn}`;
  
  // Diccionario de colocaciones especiales
  const collocations = {
    // === DO ===
    'do::my job': 'hacer mi trabajo',
    'do::my work': 'hacer mi trabajo',
    'do::a question': 'hacer una pregunta',
    'do::the answer': 'dar la respuesta',
    'do::work': 'trabajar',
    
    // === MAKE ===
    'make::a decision': 'tomar una decisión',
    'make::a question': 'formular una pregunta',
    'make::the answer': 'dar la respuesta',
    'make::coffee': 'preparar café',
    'make::food': 'preparar comida',
    'make::money': 'ganar dinero',
    
    // === TAKE ===
    'take::the bus': 'tomar el autobús',
    'take::the car': 'tomar el auto',
    'take::the phone': 'contestar el teléfono',
    'take::the opportunity': 'aprovechar la oportunidad',
    'take::time': 'tomarse el tiempo',
    'take::water': 'tomar agua',
    
    // === GET ===
    'get::the answer': 'obtener la respuesta',
    'get::the phone': 'contestar el teléfono',
    'get::money': 'conseguir dinero',
    'get::a job': 'conseguir trabajo',
    'get::the truth': 'descubrir la verdad',
    
    // === KNOW ===
    'know::the answer': 'saber la respuesta',
    'know::the truth': 'saber la verdad',
    'know::the person': 'conocer a la persona',
    'know::my friend': 'conocer a mi amigo',
    'know::the way': 'saber el camino',
    'know::the name': 'saber el nombre',
    'know::English': 'saber inglés',
    'know::the language': 'conocer el idioma',
    
    // === THINK ===
    'think::a question': 'pensar en una pregunta',
    'think::the answer': 'pensar en la respuesta',
    'think::a problem': 'pensar en un problema',
    'think::an idea': 'pensar en una idea',
    'think::the situation': 'pensar en la situación',
    'think::the experience': 'reflexionar sobre la experiencia',
    'think::my life': 'pensar en mi vida',
    'think::the world': 'pensar en el mundo',
    
    // === SPEAK ===
    'speak::English': 'hablar inglés',
    'speak::the language': 'hablar el idioma',
    'speak::my friend': 'hablar con mi amigo',
    'speak::the person': 'hablar con la persona',
    'speak::my family': 'hablar con mi familia',
    
    // === WORK ===
    'work::my job': 'trabajar en mi empleo',
    'work::work': 'trabajar',
    'work::time': 'trabajar a tiempo',
    'work::the house': 'trabajar en la casa',
    'work::my home': 'trabajar desde casa',
    
    // === WANT ===
    'want::water': 'querer agua',
    'want::food': 'querer comida',
    'want::money': 'querer dinero',
    'want::time': 'querer tiempo',
    'want::the opportunity': 'querer la oportunidad',
    'want::the experience': 'querer la experiencia',
    
    // === LIKE ===
    'like::water': 'me gusta el agua',
    'like::food': 'me gusta la comida',
    'like::my job': 'me gusta mi trabajo',
    'like::my family': 'me gusta mi familia',
    'like::my friend': 'me gusta mi amigo',
    'like::my home': 'me gusta mi hogar',
    'like::the car': 'me gusta el auto',
    'like::the house': 'me gusta la casa',
    'like::the phone': 'me gusta el teléfono',
    'like::the world': 'me gusta el mundo',
    'like::my life': 'me gusta mi vida',
    
    // === NEED ===
    'need::water': 'necesitar agua',
    'need::food': 'necesitar comida',
    'need::money': 'necesitar dinero',
    'need::time': 'necesitar tiempo',
    'need::help': 'necesitar ayuda',
    'need::the answer': 'necesitar la respuesta',
    'need::a decision': 'necesitar tomar una decisión',
    
    // === LIVE ===
    'live::my home': 'vivir en mi hogar',
    'live::the house': 'vivir en la casa',
    'live::the world': 'vivir en el mundo',
    'live::my life': 'vivir mi vida'
  };
  
  return collocations[key] || null;
}

/**
 * Obtiene la preposición necesaria entre verbo y objeto
 */
export function getPreposition(verb, nounEn) {
  const key = `${verb}::${nounEn}`;
  
  const prepositions = {
    'work::my job': 'en',
    'work::work': '',
    'work::the house': 'en',
    'work::my home': 'desde',
    'think::a question': 'en',
    'think::the answer': 'en',
    'think::a problem': 'en',
    'think::an idea': 'en',
    'think::the situation': 'en',
    'think::my life': 'en',
    'think::the world': 'en',
    'speak::my friend': 'con',
    'speak::the person': 'con',
    'speak::my family': 'con',
    'live::my home': 'en',
    'live::the house': 'en',
    'live::the world': 'en'
  };
  
  return prepositions[key] || '';
}