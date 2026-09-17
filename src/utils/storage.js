// ============================================================
// STORAGE - localStorage helpers
// ============================================================

const STORAGE_KEYS = {
  HISTORY: 'frasediaria_history',
  FAVORITES: 'frasediaria_favorites',
  FLASHCARDS: 'frasediaria_flashcards',
  SETTINGS: 'frasediaria_settings'
};

// ============================================================
// HISTORIAL
// ============================================================

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

export function saveToHistory(phrase) {
  try {
    const history = getHistory();
    
    // Evitar duplicados del mismo día y tiempo
    const exists = history.find(
      h => h.date === phrase.date && h.tenseKey === phrase.tenseKey
    );
    
    if (!exists) {
      history.unshift(phrase);
      
      // Mantener solo últimas 30 frases
      if (history.length > 30) {
        history.pop();
      }
      
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

// ============================================================
// FAVORITOS
// ============================================================

export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}

export function toggleFavorite(phrase) {
  try {
    const favorites = getFavorites();
    const index = favorites.findIndex(
      f => f.date === phrase.date && f.tenseKey === phrase.tenseKey
    );
    
    if (index >= 0) {
      // Remover de favoritos
      favorites.splice(index, 1);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return false;
    } else {
      // Agregar a favoritos
      favorites.unshift(phrase);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}

export function isFavorite(phrase) {
  const favorites = getFavorites();
  return favorites.some(
    f => f.date === phrase.date && f.tenseKey === phrase.tenseKey
  );
}

// ============================================================
// FLASHCARDS
// ============================================================

export function getFlashcards() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading flashcards:', error);
    return [];
  }
}

export function addFlashcard(phrase) {
  try {
    const flashcards = getFlashcards();
    
    // No agregar si ya existe
    const exists = flashcards.find(
      fc => fc.date === phrase.date && fc.tenseKey === phrase.tenseKey
    );
    
    if (!exists) {
      const newCard = {
        id: `${phrase.date}-${phrase.tenseKey}`,
        date: phrase.date,
        tenseKey: phrase.tenseKey,
        front: phrase.en,
        back: `${phrase.es}\n\n[${phrase.structure}]`,
        box: 1, // Sistema Leitner: 5 cajas
        nextReview: phrase.date, // Disponible inmediatamente
        lastReviewed: null,
        timesReviewed: 0,
        timesCorrect: 0
      };
      
      flashcards.push(newCard);
      localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(flashcards));
      return newCard;
    }
    
    return exists;
  } catch (error) {
    console.error('Error adding flashcard:', error);
    return null;
  }
}

export function updateFlashcard(cardId, rating) {
  try {
    const flashcards = getFlashcards();
    const card = flashcards.find(fc => fc.id === cardId);
    
    if (!card) return null;
    
    // Sistema de repaso espaciado simplificado (Leitner)
    const today = new Date();
    const nextReview = new Date(today);
    
    switch (rating) {
      case 'hard':
        card.box = 1;
        nextReview.setDate(today.getDate() + 1);
        break;
      case 'normal':
        card.box = Math.min(card.box + 1, 5);
        nextReview.setDate(today.getDate() + card.box);
        break;
      case 'easy':
        card.box = Math.min(card.box + 2, 5);
        nextReview.setDate(today.getDate() + card.box * 2);
        break;
    }
    
    card.nextReview = nextReview.toISOString().split('T')[0];
    card.lastReviewed = today.toISOString().split('T')[0];
    card.timesReviewed += 1;
    if (rating !== 'hard') {
      card.timesCorrect += 1;
    }
    
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(flashcards));
    return card;
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return null;
  }
}

export function getDueFlashcards(limit = 20) {
  try {
    const flashcards = getFlashcards();
    const today = new Date().toISOString().split('T')[0];
    
    return flashcards
      .filter(fc => fc.nextReview <= today)
      .sort((a, b) => a.box - b.box) // Priorizar cajas bajas
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting due flashcards:', error);
    return [];
  }
}

// ============================================================
// SETTINGS
// ============================================================

export function getSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      level: 'beginner',
      audioSpeed: 0.9,
      theme: 'dark'
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      level: 'beginner',
      audioSpeed: 0.9,
      theme: 'dark'
    };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}