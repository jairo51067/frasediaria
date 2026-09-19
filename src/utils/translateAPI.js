// src/utils/translateAPI.js
// Integración con DeepL API para traducciones naturales

const DEEPL_API_KEY = '9f3f7a7f-9329-4f3f-b1d4-e92168c306a4:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Caché en memoria (se limpia al recargar)
const memoryCache = new Map();

// Caché persistente en localStorage
function getCachedTranslation(englishText) {
  try {
    const cached = localStorage.getItem(`deepl_translation_${englishText}`);
    if (cached) {
      const { translation, timestamp } = JSON.parse(cached);
      // Verificar si la caché no es muy vieja (7 días)
      const age = Date.now() - timestamp;
      if (age < 7 * 24 * 60 * 60 * 1000) {
        return translation;
      }
    }
  } catch (error) {
    console.warn('Error reading cache:', error);
  }
  return null;
}

function setCachedTranslation(englishText, translation) {
  try {
    const data = {
      translation,
      timestamp: Date.now()
    };
    localStorage.setItem(`deepl_translation_${englishText}`, JSON.stringify(data));
  } catch (error) {
    console.warn('Error writing cache:', error);
  }
}

/**
 * Traduce texto usando DeepL API
 * @param {string} text - Texto en inglés a traducir
 * @returns {Promise<string>} - Traducción al español
 */
export async function translateWithDeepL(text) {
  // 1. Verificar caché en memoria
  if (memoryCache.has(text)) {
    console.log('[DeepL] Cache hit (memory):', text);
    return memoryCache.get(text);
  }
  
  // 2. Verificar caché en localStorage
  const cached = getCachedTranslation(text);
  if (cached) {
    console.log('[DeepL] Cache hit (localStorage):', text);
    memoryCache.set(text, cached);
    return cached;
  }
  
  // 3. Llamar a API de DeepL
  try {
    console.log('[DeepL] Calling API:', text);
    
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        text: text,
        target_lang: 'ES',
        source_lang: 'EN'
      })
    });
    
    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }
    
    const data = await response.json();
    const translation = data.translations[0].text;
    
    // 4. Guardar en caché
    memoryCache.set(text, translation);
    setCachedTranslation(text, translation);
    
    console.log('[DeepL] Translation:', translation);
    return translation;
    
  } catch (error) {
    console.error('[DeepL] Error:', error);
    
    // Fallback: retornar texto original si falla la API
    return text;
  }
}

/**
 * Traduce múltiples frases en batch (más eficiente)
 * @param {string[]} texts - Array de textos en inglés
 * @returns {Promise<string[]>} - Array de traducciones
 */
export async function translateBatch(texts) {
  const results = [];
  
  for (const text of texts) {
    const translation = await translateWithDeepL(text);
    results.push(translation);
  }
  
  return results;
}

/**
 * Limpia la caché de traducciones
 */
export function clearTranslationCache() {
  memoryCache.clear();
  
  // Limpiar localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('deepl_translation_')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('[DeepL] Cache cleared');
}

/**
 * Obtiene estadísticas de uso de caché
 */
export function getCacheStats() {
  const keys = Object.keys(localStorage);
  const deeplKeys = keys.filter(key => key.startsWith('deepl_translation_'));
  
  return {
    memoryCacheSize: memoryCache.size,
    localStorageSize: deeplKeys.length,
    totalSize: memoryCache.size + deeplKeys.length
  };
}