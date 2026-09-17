import { useState, useEffect } from 'react';
import {
  getFlashcards,
  addFlashcard,
  updateFlashcard,
  getDueFlashcards
} from '../utils/storage';

/**
 * Hook para gestionar el sistema de flashcards
 * @returns {Object} cards, dueCards, addCard, rateCard, refresh
 */
export function useFlashcards() {
  const [cards, setCards] = useState([]);
  const [dueCards, setDueCards] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setCards(getFlashcards());
    setDueCards(getDueFlashcards());
  }

  function addCard(phrase) {
    const newCard = addFlashcard(phrase);
    if (newCard) {
      refresh();
    }
    return newCard;
  }

  function rateCard(cardId, rating) {
    const updated = updateFlashcard(cardId, rating);
    if (updated) {
      refresh();
    }
    return updated;
  }

  return {
    cards,
    dueCards,
    addCard,
    rateCard,
    refresh
  };
}