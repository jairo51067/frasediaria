import { useState } from 'react';
import { useFlashcards } from '../hooks/useFlashcards';

export default function FlashcardDeck({ onClose }) {
  const { dueCards, rateCard } = useFlashcards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (dueCards.length === 0) {
    return (
      <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-dark-50 mb-2">
            ¡No hay tarjetas pendientes!
          </h2>
          <p className="text-dark-300 mb-6">
            Has repasado todas tus flashcards. Vuelve mañana para más práctica.
          </p>
          <button onClick={onClose} className="btn-primary w-full">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleRate(rating) {
    rateCard(currentCard.id, rating);
    
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Terminó el repaso
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark-50">
              Repaso de Flashcards
            </h2>
            <p className="text-sm text-dark-400">
              Tarjeta {currentIndex + 1} de {dueCards.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost text-2xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-700 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-primary-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
          ></div>
        </div>

        {/* Flashcard */}
        <div
          onClick={handleFlip}
          className="relative h-64 cursor-pointer perspective-1000"
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 flex items-center justify-center backface-hidden ${
                isFlipped ? 'invisible' : ''
              }`}
            >
              <div className="text-center">
                <p className="text-sm text-primary-200 mb-2">FRONT</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {currentCard.front}
                </p>
                <p className="text-sm text-primary-200 mt-4">
                  Click para ver traducción
                </p>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 flex items-center justify-center backface-hidden rotate-y-180 ${
                !isFlipped ? 'invisible' : ''
              }`}
            >
              <div className="text-center">
                <p className="text-sm text-green-200 mb-2">BACK</p>
                <p className="text-xl md:text-2xl font-bold text-white whitespace-pre-line">
                  {currentCard.back}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Buttons (only show when flipped) */}
        {isFlipped && (
          <div className="mt-6 animate-fade-in">
            <p className="text-center text-dark-400 mb-3">
              ¿Qué tan difícil fue?
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleRate('hard')}
                className="btn bg-red-600 hover:bg-red-700 text-white"
              >
                😰 Difícil
              </button>
              <button
                onClick={() => handleRate('normal')}
                className="btn bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                😐 Normal
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="btn bg-green-600 hover:bg-green-700 text-white"
              >
                😊 Fácil
              </button>
            </div>
          </div>
        )}

        {/* Card Info */}
        <div className="mt-6 pt-6 border-t border-dark-700">
          <div className="flex items-center justify-between text-sm text-dark-400">
            <span>📦 Caja: {currentCard.box}/5</span>
            <span>🔄 Repases: {currentCard.timesReviewed}</span>
            <span>✅ Aciertos: {currentCard.timesCorrect}</span>
          </div>
        </div>
      </div>
    </div>
  );
}