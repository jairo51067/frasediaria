// src/components/PhraseCard.jsx
export default function PhraseCard({ phrase, loading, onRegenerate }) {
  if (loading || !phrase) {
    return (
      <div className="animate-pulse bg-slate-800 rounded-2xl p-8">
        <div className="h-8 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2 mb-8"></div>
        <div className="h-20 bg-slate-700 rounded mb-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
      {/* Tense Tag */}
      <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full mb-4">
        {phrase.tense}
      </span>

      {/* English Phrase */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {phrase.en}
      </h2>

      {/* Spanish Translation */}
      <p className="text-lg md:text-xl text-slate-300 italic mb-6">
        {phrase.es}
      </p>

      {/* Structure Box */}
      <div className="bg-slate-900 border-l-4 border-yellow-500 p-4 mb-6 rounded">
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-slate-400 text-sm font-semibold">Estructura</span>
        </div>
        <code className="text-yellow-400 text-sm md:text-base font-mono">
          {phrase.structure}
        </code>
      </div>

      {/* Context Box */}
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-yellow-400 mr-2">💡</span>
            <div>
              <span className="text-slate-300 font-semibold text-sm">Uso:</span>
              <p className="text-slate-400 text-sm mt-1">{phrase.context.use}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-green-400 mr-2">📝</span>
            <div>
              <span className="text-slate-300 font-semibold text-sm">Ejemplo:</span>
              <p className="text-slate-400 text-sm mt-1">{phrase.context.example}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-pink-400 mr-2"></span>
            <div>
              <span className="text-slate-300 font-semibold text-sm">Tip:</span>
              <p className="text-slate-400 text-sm mt-1">{phrase.context.tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* ... botones existentes ... */}
      </div>
    </div>
  );
}