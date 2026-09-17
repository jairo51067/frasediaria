export default function LevelSelector({ currentLevel, onLevelChange }) {
  const levels = [
    {
      key: 'beginner',
      label: '🌱 Principiante',
      description: 'Tiempos simples',
      activeClass: 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-600/40'
    },
    {
      key: 'intermediate',
      label: '⚡ Intermedio',
      description: 'Perfectos y continuos',
      activeClass: 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/40'
    },
    {
      key: 'advanced',
      label: '🔥 Avanzado',
      description: 'Todos los tiempos',
      activeClass: 'bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-600/40'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {levels.map((level) => {
        const isActive = currentLevel === level.key;
        return (
          <button
            key={level.key}
            onClick={() => onLevelChange(level.key)}
            className={`
              relative px-6 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                ? `${level.activeClass} text-white scale-105`
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900
              ${isActive ? 'focus:ring-primary-500' : 'focus:ring-dark-600'}
            `}
          >
            <div className="text-lg font-semibold">{level.label}</div>
            <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-dark-400'}`}>
              {level.description}
            </div>
            {isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}