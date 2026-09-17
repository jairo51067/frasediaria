// ============================================================
// PRONOMBRES - 7 pronombres personales
// ============================================================

export const PRONOUNS = ['I', 'You', 'He', 'She', 'We', 'They', 'It'];

export const PRONOUN_TRANSLATIONS = {
  I: 'yo',
  You: 'tú',
  He: 'él',
  She: 'ella',
  We: 'nosotros',
  They: 'ellos',
  It: 'eso'
};

export function translatePronoun(pronoun) {
  return PRONOUN_TRANSLATIONS[pronoun] || pronoun;
}