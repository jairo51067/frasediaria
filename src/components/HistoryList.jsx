import { getHistory } from '../utils/storage';
import { useAudio } from '../hooks/useAudio';

export default function HistoryList() {
  const history = getHistory();
  const { speak } = useAudio();

  if (history.length <= 1) {
    return null;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="card mt-6">
      <h3 className="text-lg font-semibold text-dark-200 mb-4">
        📚 Frases anteriores
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {history.slice(1, 8).map((item, index) => (
          <div
            key={`${item.date}-${item.tenseKey}-${index}`}
            onClick={() => speak(item.en)}
            className="p-4 bg-dark-900/30 hover:bg-dark-800/50 rounded-lg cursor-pointer transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-dark-100 font-medium mb-1 group-hover:text-primary-300 transition-colors">
                  {item.en}
                </p>
                <p className="text-sm text-dark-400 italic">
                  {item.es}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-dark-500">
                  <span>📅 {formatDate(item.date)}</span>
                  <span>•</span>
                  <span>{item.tense}</span>
                </div>
              </div>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl"
                aria-label="Escuchar"
              >
                🔊
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}