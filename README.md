# 📘 FraseDiaria - Daily English Practice

[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-purple)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)

Aplicación web progresiva (PWA) para practicar inglés con una frase diaria basada en las **15 estructuras verbales esenciales** del idioma.

## 🎯 Características

- ✅ **15 estructuras verbales** - Desde Present Simple hasta Perfect Conditional
- ✅ **3 niveles de dificultad** - Principiante, Intermedio, Avanzado
- ✅ **Generador inteligente** - Frase consistente durante todo el día
- ✅ **Audio nativo** - Text-to-Speech con Web Speech API (sin API key)
- ✅ **Flashcards** - Sistema de repaso espaciado (Leitner)
- ✅ **Offline-first** - Funciona sin conexión después de cargar
- ✅ **PWA instalable** - Instálala en Android como app nativa
- ✅ **Contexto enriquecido** - Uso, ejemplos y tips para cada estructura
- ✅ **Historial** - Últimas 30 frases con acceso rápido

## 🚀 Instalación y Desarrollo

### Prerequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/frasediaria.git
cd frasediaria

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`

### Build para producción

```bash
npm run build
```

Los archivos optimizados estarán en `dist/`

### Preview de producción

```bash
npm run preview
```

## 📱 Instalación como PWA (Android)

1. Abre la app en Chrome para Android
2. Toca el menú (⋮) → "Agregar a pantalla principal"
3. Confirma la instalación
4. ¡Listo! La app se comporta como nativa

## 🏗️ Arquitectura

src/
├── components/          # Componentes React
│   ├── PhraseCard      # Tarjeta de frase del día
│   ├── LevelSelector   # Selector de nivel
│   ├── FlashcardDeck   # Mazo de flashcards
│   └── HistoryList     # Historial de frases
├── hooks/              # Custom hooks (lógica de negocio)
│   ├── usePhraseGenerator  # Generador de frases
│   ├── useFlashcards       # Sistema de flashcards
│   └── useAudio            # Text-to-Speech
├── data/               # Datos estáticos (vocabulario)
│   ├── verbs.js        # 10 irregulares + 5 regulares
│   ├── nouns.js        # 30 sustantivos
│   ├── tenses.js       # 15 estructuras verbales
│   └── pronouns.js     # 7 pronombres
├── utils/              # Utilidades
│   └── storage.js      # localStorage helpers
├── App.jsx             # Componente principal
└── main.jsx            # Entry point

## 📊 Estructuras Verbales

### Piso Superior: PRESENTE

1. **Present Simple** - I work (Trabajo)
2. **Present Perfect** - I have worked (He trabajado)
3. **Present Continuous** - I am working (Estoy trabajando)
4. **Present Perfect Continuous** - I have been working (Llevo trabajando)

### Piso Intermedio: PASADO

1. **Past Simple** - I worked (Trabajé)
2. **Past Perfect** - I had worked (Había trabajado)
3. **Past Continuous** - I was working (Estaba trabajando)
4. **Past Perfect Continuous** - I had been working (Llevaba trabajando)

### Piso Inferior: FUTURO

1. **Future Simple** - I will work (Trabajaré)
2. **Future Perfect** - I will have worked (Habré trabajado)
3. **Future Continuous** - I will be working (Estaré trabajando)
4. **Future Perfect Continuous** - I will have been working (Habré estado trabajando)

### Cajas Adicionales: CONDICIONAL

1. **Present Conditional** - I would work (Trabajaría)
2. **Perfect Conditional** - I would have worked (Habría trabajado)

## 🎮 Cómo usar

### Frase del día

- Selecciona tu nivel (Principiante/Intermedio/Avanzado)
- Lee la frase en inglés y su traducción
- Escucha la pronunciación con el botón 🔊
- Guarda en favoritos con ⭐
- Copia al portapapeles con 📋

### Flashcards

- Las frases se agregan automáticamente a tu mazo
- Toca "Repasar flashcards" cuando tengas pendientes
- Califica cada tarjeta: Difícil 😰 / Normal 😐 / Fácil 😊
- El sistema ajusta automáticamente cuándo repasar

## 🔧 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Utility-first CSS
- **Web Speech API** - Text-to-Speech nativo
- **localStorage** - Persistencia offline
- **Vite PWA Plugin** - Service Worker + Manifest

## 📈 Roadmap

### Fase 3 (Próxima)

- [ ] Backend en Vercel (Supabase)
- [ ] Sincronización multi-dispositivo
- [ ] Estadísticas de progreso
- [ ] Quiz interactivo

### Fase 4

- [ ] Sistema de logros/badges
- [ ] Compartir en redes sociales
- [ ] Modo oscuro/claro toggle
- [ ] Personalización de vocabulario

### Fase 5

- [ ] Soporte iOS (Safari)
- [ ] Push notifications
- [ ] Modo colaborativo

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios grandes, abre primero un issue para discutir lo que te gustaría cambiar.

## 📄 Licencia

MIT © Tu Nombre

## 🙏 Créditos

Basado en los documentos:

- "Estructuras del Inglés" - 15 estructuras verbales esenciales
- "Vocabulario y Guía de Inglés" - Vocabulario base para construcción de frases

---

### **Hecho con ❤️ para aprender inglés de forma estructurada**
