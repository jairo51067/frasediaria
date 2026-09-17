import { useState, useEffect } from 'react';
import { usePhraseGenerator } from './hooks/usePhraseGenerator';
import { useFlashcards } from './hooks/useFlashcards';
import { getSettings, saveSettings } from './utils/storage';
import PhraseCard from './components/PhraseCard';
import LevelSelector from './components/LevelSelector';
import FlashcardDeck from './components/FlashcardDeck';
import HistoryList from './components/HistoryList';

export default function App() {
  const [level, setLevel] = useState('beginner');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const { phrase, regenerate, loading } = usePhraseGenerator(level);
  const { dueCards, addCard } = useFlashcards();

  // Cargar settings al iniciar
  useEffect(() => {
    const settings = getSettings();
    setLevel(settings.level || 'beginner');
  }, []);

  // Guardar settings cuando cambia el nivel
  useEffect(() => {
    const settings = getSettings();
    saveSettings({ ...settings, level });
  }, [level]);

  // Agregar frase actual a flashcards automáticamente
  useEffect(() => {
    if (phrase) {
      addCard(phrase);
    }
  }, [phrase]);

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
            📘 FraseDiaria
          </h1>
          <p className="text-dark-400 text-sm md:text-base">
            Daily English Practice
          </p>
          {phrase && (
            <div className="inline-block mt-4 bg-primary-600/20 border border-primary-600/30 px-4 py-2 rounded-full text-sm text-primary-300">
              📅 {formatDate(phrase.date)}
            </div>
          )}
        </header>

        {/* Level Selector */}
        <div className="mb-8">
          <LevelSelector currentLevel={level} onLevelChange={setLevel} />
        </div>

        {/* New Theme Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={regenerate}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <span>🎲</span>
            <span>Nuevo tema</span>
          </button>
        </div>

        {/* Phrase Card */}
        {loading ? (
          <div className="card animate-pulse">
            <div className="h-6 bg-dark-700 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-dark-700 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-dark-700 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-dark-700 rounded"></div>
          </div>
        ) : (
          <PhraseCard phrase={phrase} />
        )}

        {/* Flashcards Button */}
        {dueCards.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowFlashcards(true)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>🎴</span>
              <span>Repasar flashcards</span>
              <span className="bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {dueCards.length}
              </span>
            </button>
          </div>
        )}

        {/* History */}
        <HistoryList />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-dark-500">
          <p>
            Practica inglés con las 15 estructuras verbales esenciales
          </p>
          <p className="mt-2">
            🚀 PWA instalable · 🔊 Audio nativo · 💾 Offline-first
          </p>
        </footer>
      </div>

      {/* Flashcard Modal */}
      {showFlashcards && (
        <FlashcardDeck onClose={() => setShowFlashcards(false)} />
      )}
    </div>
  );
}