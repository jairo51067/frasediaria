import { useState, useEffect } from 'react';
import { ALL_TENSES, TENSES_BY_LEVEL } from '../data/tenses';
import { VERB_KEYS_IRREGULAR, VERB_KEYS_REGULAR } from '../data/verbs';
import { PRONOUNS } from '../data/pronouns';
import { saveToHistory } from '../utils/storage';

/**
 * Hook para generar la frase del día
 * @param {string} level - Nivel del usuario (beginner|intermediate|advanced)
 * @returns {Object} phrase, regenerate, loading
 */
export function usePhraseGenerator(level) {
  const [phrase, setPhrase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePhrase();
  }, [level]);

  function generatePhrase() {
    setLoading(true);
    
    // Semilla basada en la fecha para consistencia diaria
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Filtrar tiempos por nivel
    const availableTenseKeys = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.beginner;
    
    // Selección pseudo-aleatoria determinista
    const tenseIdx = seed % availableTenseKeys.length;
    const tenseKey = availableTenseKeys[tenseIdx];
    const tense = ALL_TENSES[tenseKey];
    
    // Seleccionar verbo según nivel
    const verbKeys = level === 'beginner' ? VERB_KEYS_REGULAR : VERB_KEYS_IRREGULAR;
    const verbIdx = (seed * 7) % verbKeys.length;
    const verb = verbKeys[verbIdx];
    
    // Seleccionar pronombre
    const pronIdx = (seed * 13) % PRONOUNS.length;
    const pronoun = PRONOUNS[pronIdx];
    
    // Construir frase
    const builtPhrase = tense.build(pronoun, verb, level);
    
    const finalPhrase = {
      ...builtPhrase,
      tense: tense.name,
      tenseKey: tense.key,
      verb: verb,
      pronoun: pronoun,
      date: today.toISOString().split('T')[0],
      level: level
    };
    
    setPhrase(finalPhrase);
    saveToHistory(finalPhrase);
    setLoading(false);
  }

  function regenerate() {
    // Generar con nueva combinación (no basada en fecha)
    const availableTenseKeys = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.beginner;
    const tenseKey = availableTenseKeys[Math.floor(Math.random() * availableTenseKeys.length)];
    const tense = ALL_TENSES[tenseKey];
    
    const verbKeys = level === 'beginner' ? VERB_KEYS_REGULAR : VERB_KEYS_IRREGULAR;
    const verb = verbKeys[Math.floor(Math.random() * verbKeys.length)];
    const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
    
    const builtPhrase = tense.build(pronoun, verb, level);
    
    const finalPhrase = {
      ...builtPhrase,
      tense: tense.name,
      tenseKey: tense.key,
      verb: verb,
      pronoun: pronoun,
      date: new Date().toISOString().split('T')[0],
      level: level
    };
    
    setPhrase(finalPhrase);
  }

  return { phrase, regenerate, loading };
}