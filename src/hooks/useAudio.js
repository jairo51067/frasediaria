import { useState } from 'react';

/**
 * Hook para Text-to-Speech usando Web Speech API
 * @returns {Object} speak, isPlaying, isSupported
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState(() => 'speechSynthesis' in window);

  function speak(text, speed = 0.9) {
    if (!isSupported) {
      alert('Tu navegador no soporta síntesis de voz');
      return;
    }

    // Cancelar cualquier reproducción en curso
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }

  return {
    speak,
    stop,
    isPlaying,
    isSupported
  };
}