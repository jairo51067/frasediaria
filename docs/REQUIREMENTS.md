# 📋 Requisitos Técnicos - FraseDiaria

## 🎯 Objetivo

Crear una PWA (Progressive Web App) instalable en Android para práctica diaria de inglés con:

- Generación de frases en 15 estructuras verbales
- 3 niveles de dificultad (Principiante, Intermedio, Avanzado)
- Sistema de flashcards con repaso espaciado
- Audio nativo (Web Speech API)
- Offline-first

---

## 🏗️ Stack Tecnológico

### Frontend

- **Framework**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Estado**: React Hooks (useState, useEffect, useContext)
- **Persistencia**: localStorage + IndexedDB (si crece)
- **PWA**: Vite PWA Plugin (manifest + service worker)

### Backend (Fase 3 - Opcional)

- **Hosting**: Vercel
- **Funciones**: Vercel Serverless Functions
- **Base de datos**: Supabase (PostgreSQL)
- **API**: Qwen (enriquecimiento de contexto)

### Herramientas

- **Build**: Vite
- **Linting**: ESLint + Prettier
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deploy**: Vercel (automático desde GitHub)

---

## 📦 Estructura del Proyecto

frasediaria/
├── public/
│   ├── icons/              # Iconos PWA (192x192, 512x512)
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service Worker (generado)
├── src/
│   ├── components/
│   │   ├── PhraseCard.jsx      # Tarjeta de frase del día
│   │   ├── LevelSelector.jsx   # Selector de nivel
│   │   ├── FlashcardDeck.jsx   # Mazo de flashcards
│   │   ├── AudioButton.jsx     # Botón TTS
│   │   └── HistoryList.jsx     # Historial de frases
│   ├── data/
│   │   ├── verbs.js            # 10 irregulares + 5 regulares
│   │   ├── nouns.js            # 30 sustantivos
│   │   ├── tenses.js           # 15 estructuras verbales
│   │   └── vocabulary.js       # Vocabulario completo
│   ├── hooks/
│   │   ├── usePhraseGenerator.js   # Lógica de generación
│   │   ├── useFlashcards.js        # Sistema de repaso
│   │   └── useAudio.js             # Web Speech API
│   ├── utils/
│   │   ├── storage.js          # localStorage helpers
│   │   ├── date.js             # Formateo de fechas
│   │   └── seed.js             # Generador pseudo-aleatorio
│   ├── context/
│   │   └── AppContext.jsx      # Estado global
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md

---

## 🎨 Requisitos de UI/UX

### Diseño

- **Tema**: Dark mode por defecto (gradientes índigo/púrpura)
- **Tipografía**: System fonts (-apple-system, Segoe UI)
- **Responsive**: Mobile-first (320px - 1440px)
- **Animaciones**: Transiciones suaves (200-300ms)

### Componentes Clave

1. **PhraseCard**
   - Frase en inglés (grande, bold)
   - Traducción al español (mediana, italic)
   - Estructura gramatical (monospace, destacada)
   - Contexto de uso (ejemplo real, tips)
   - Botones de acción (escuchar, guardar, copiar)

2. **FlashcardDeck**
   - Tarjeta frontal (frase en inglés)
   - Tarjeta trasera (traducción + estructura)
   - Swipe para siguiente/anterior
   - Sistema de calificación (fácil/difícil)
   - Contador de repaso

3. **LevelSelector**
   - 3 botones con colores distintivos
   - Indicador visual del nivel activo
   - Transición suave al cambiar

4. **AudioButton**
   - Icono de altavoz
   - Estado de reproducción
   - Velocidad ajustable (normal/lento)

---

## 🔧 Requisitos Funcionales

### Generador de Frases

- **Input**: Nivel + Fecha del día
- **Output**: Frase en inglés + traducción + estructura
- **Lógica**:
  - Semilla basada en fecha (consistencia diaria)
  - Filtrado de tiempos verbales por nivel
  - Combinación pseudo-aleatoria (pronombre + verbo + objeto)
- **Vocabulario**: Basado en documentos adjuntos (10 verbos irregulares, 30 sustantivos)

### Flashcards

- **Fuente**: Historial de frases generadas
- **Repaso espaciado**: Algoritmo simplificado de Leitner
  - 5 cajas (niveles de dominio)
  - Promoción/democión según acierto
- **Modos**:
  - Repaso diario (10-20 tarjetas)
  - Repaso completo (todas las pendientes)

### Audio (TTS)

- **API**: Web Speech API (nativa del navegador)
- **Idioma**: en-US (inglés americano)
- **Velocidad**: 0.9x (normal), 0.7x (lento)
- **Fallback**: Alerta si no soportado

### Persistencia

- **localStorage**:
  - Historial de frases (últimas 30)
  - Favoritos (sin límite)
  - Flashcards en repaso
  - Nivel seleccionado
  - Progreso de flashcards

### PWA

- **Instalable**: Manifest + Service Worker
- **Offline**: Cache de recursos estáticos
- **Iconos**: 192x192, 512x512 (Android)
- **Splash screen**: Automático al instalar

---

## 🚀 Requisitos de Deploy

### Vercel

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variables**: (ninguna inicialmente)
- **Domain**: frasediaria.vercel.app (o personalizado)

### GitHub

- **Repo**: Público (para portfolio)
- **Branches**: main (producción), develop (desarrollo)
- **CI/CD**: Automático desde main

---

## 📊 Métricas de Éxito

### Funcionales

- ✅ Genera 1 frase/día consistente
- ✅ 3 niveles funcionan correctamente
- ✅ Audio se reproduce sin errores
- ✅ Flashcards se guardan y repasan
- ✅ Se instala en Android Chrome

### Performance

- ✅ Lighthouse score > 90 (PWA)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Bundle size < 200KB (gzipped)

### UX

- ✅ UI responsive en 320px - 1440px
- ✅ Animaciones fluidas (60fps)
- ✅ Sin errores de consola
- ✅ Accesibilidad básica (ARIA labels)

---

## 🔒 Seguridad

- **Sin autenticación**: App pública, sin login
- **Sin datos sensibles**: Solo localStorage local
- **HTTPS**: Forzado por Vercel
- **CORS**: No aplica (sin backend inicial)

---

## 📚 Recursos de Referencia

### Documentos Base

1. `Estructuras del Inglés.docx` - 15 estructuras verbales
2. `Vocabulario y Guía de Inglés.docx` - Vocabulario esencial
3. `prototipo-daily_english_V1.0.2.html` - Prototipo inicial

### APIs Externas

- **Web Speech API**: TTS nativo (sin API key)
- **Qwen API**: Enriquecimiento de contexto (opcional, fase 3)

### Librerías

- React 18: <https://react.dev>
- Vite: <https://vitejs.dev>
- Tailwind CSS: <https://tailwindcss.com>
- Vite PWA Plugin: <https://vite-pwa-org.netlify.app>

---

## 🐛 Known Issues / Limitaciones

- iOS Safari: Service Workers limitados (no prioridad)
- Web Speech API: Voces varían según dispositivo/navegador
- localStorage: Límite ~5MB (suficiente para esta app)
- Sin sincronización: Datos solo locales (fase 3 con Supabase)
- **Traducciones: 40% usan marcadores "(futuro)" (Bug crítico)**
- **Colocaciones: "to away" genera frases incorrectas (Bug crítico)**
- **PWA: Sin iconos, no instalable (Alta prioridad)**

---

## 📝 Decisiones Técnicas

| Decisión | Razón | Alternativa descartada |

|----------|-------|------------------------|
| React + Vite | Rápido, moderno, buen DX | Next.js (overkill para SPA) |
| Tailwind CSS | Utility-first, rápido de desarrollar | CSS Modules (más verbose) |
| localStorage | Simple, sin backend | IndexedDB (complejidad innecesaria) |
| Web Speech API | Gratis, nativo, sin API key | Google TTS (requiere API key) |
| Vercel | Deploy automático, gratis | Netlify (similar, pero Vercel preferido) |
| Sin backend inicial | MVP rápido, validar primero | Supabase desde inicio (overkill) |

---

### *Última actualización: 2026-09-17*
