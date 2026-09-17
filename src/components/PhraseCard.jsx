import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../utils/storage';
import { useAudio } from '../hooks/useAudio';

export default function PhraseCard({ phrase }) {
  const [saved, setSaved] = useState(false);
  const { speak, isPlaying } = useAudio();

  useEffect(() => {
    if (phrase) {
      setSaved(isFavorite(phrase));
    }
  }, [phrase]);

  if (!phrase) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 bg-dark-700 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-dark-700 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-dark-700 rounded w-1/2 mb-4"></div>
        <div className="h-20 bg-dark-700 rounded"></div>
      </div>
    );
  }

  function handleToggleFavorite() {
    const newState = toggleFavorite(phrase);
    setSaved(newState);
  }

  function handleCopy() {
    const text = `${phrase.en}\n${phrase.es}\n\n[${phrase.tense}]`;
    navigator.clipboard.writeText(text).then(() => {
      // Feedback visual temporal
      const btn = document.getElementById('copy-btn');
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Copiado';
      setTimeout(() => {
        btn.innerHTML = original;
      }, 1500);
    });
  }

  return (
    <div className="card animate-slide-up">
      {/* Tense Tag */}
      <div className="inline-block bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
        {phrase.tense}
      </div>

      {/* English Phrase */}
      <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-3 leading-tight">
        {phrase.en}
      </h2>

      {/* Spanish Translation */}
      <p className="text-lg text-dark-300 italic mb-6">
        {phrase.es}
      </p>

      {/* Structure */}
      <div className="bg-dark-900/50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
        <p className="text-sm text-dark-400 mb-1">📐 Estructura</p>
        <p className="font-mono text-yellow-400">{phrase.structure}</p>
      </div>

      {/* Context (if available) */}
      {phrase.context && (
        <div className="bg-dark-900/30 border border-dark-700 p-4 rounded-lg mb-6">
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-dark-400">💡 Uso: </span>
              <span className="text-dark-200">{phrase.context.use}</span>
            </div>
            <div>
              <span className="text-dark-400">📝 Ejemplo: </span>
              <span className="text-dark-200">{phrase.context.example}</span>
            </div>
            <div>
              <span className="text-dark-400">🎯 Tip: </span>
              <span className="text-dark-200">{phrase.context.tip}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => speak(phrase.en, 0.9)}
          disabled={isPlaying}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <span>{isPlaying ? '⏸️' : '🔊'}</span>
          <span>Escuchar</span>
        </button>

        <button
          onClick={() => speak(phrase.en, 0.7)}
          disabled={isPlaying}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <span>🐢</span>
          <span>Despacio</span>
        </button>

        <button
          onClick={handleToggleFavorite}
          className={`${saved ? 'bg-green-600 hover:bg-green-700' : 'btn-secondary'} flex items-center justify-center gap-2`}
        >
          <span>{saved ? '⭐' : '☆'}</span>
          <span>{saved ? 'Guardada' : 'Guardar'}</span>
        </button>

        <button
          id="copy-btn"
          onClick={handleCopy}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <span>📋</span>
          <span>Copiar</span>
        </button>
      </div>
    </div>
  );
}