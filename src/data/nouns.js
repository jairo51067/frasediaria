// ============================================================
// SUSTANTIVOS - Basado en "Vocabulario y Guía de Inglés.docx"
// 30 sustantivos esenciales organizados por nivel
// ============================================================

export const NOUNS_BEGINNER = [
  { en: 'English', es: 'inglés', category: 'language' },
  { en: 'my job', es: 'mi trabajo', category: 'work' },
  { en: 'my family', es: 'mi familia', category: 'people' },
  { en: 'my friend', es: 'mi amigo', category: 'people' },
  { en: 'my home', es: 'mi hogar', category: 'place' },
  { en: 'water', es: 'agua', category: 'food' },
  { en: 'food', es: 'comida', category: 'food' },
  { en: 'time', es: 'tiempo', category: 'abstract' },
  { en: 'day', es: 'día', category: 'time' },
  { en: 'work', es: 'trabajo', category: 'work' }
];

export const NOUNS_INTERMEDIATE = [
  { en: 'a question', es: 'una pregunta', category: 'abstract' },
  { en: 'the answer', es: 'la respuesta', category: 'abstract' },
  { en: 'a problem', es: 'un problema', category: 'abstract' },
  { en: 'an idea', es: 'una idea', category: 'abstract' },
  { en: 'the world', es: 'el mundo', category: 'place' },
  { en: 'my life', es: 'mi vida', category: 'abstract' },
  { en: 'the phone', es: 'el teléfono', category: 'object' },
  { en: 'the car', es: 'el auto', category: 'object' },
  { en: 'money', es: 'dinero', category: 'abstract' },
  { en: 'the house', es: 'la casa', category: 'place' }
];

export const NOUNS_ADVANCED = [
  { en: 'the truth', es: 'la verdad', category: 'abstract' },
  { en: 'a decision', es: 'una decisión', category: 'abstract' },
  { en: 'the situation', es: 'la situación', category: 'abstract' },
  { en: 'the experience', es: 'la experiencia', category: 'abstract' },
  { en: 'the opportunity', es: 'la oportunidad', category: 'abstract' },
  { en: 'the language', es: 'el idioma', category: 'abstract' },
  { en: 'the person', es: 'la persona', category: 'people' },
  { en: 'the number', es: 'el número', category: 'abstract' },
  { en: 'the name', es: 'el nombre', category: 'abstract' },
  { en: 'the way', es: 'la manera', category: 'abstract' }
];

export const NOUNS_BY_LEVEL = {
  beginner: NOUNS_BEGINNER,
  intermediate: [...NOUNS_BEGINNER, ...NOUNS_INTERMEDIATE],
  advanced: [...NOUNS_BEGINNER, ...NOUNS_INTERMEDIATE, ...NOUNS_ADVANCED]
};

export function getRandomNoun(level) {
  const nouns = NOUNS_BY_LEVEL[level] || NOUNS_BEGINNER;
  return nouns[Math.floor(Math.random() * nouns.length)];
}

export function translateNoun(nounEn) {
  const allNouns = [...NOUNS_BEGINNER, ...NOUNS_INTERMEDIATE, ...NOUNS_ADVANCED];
  const found = allNouns.find(n => n.en === nounEn);
  return found ? found.es : nounEn;
}