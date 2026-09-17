# 🚀 Quick Start - FraseDiaria

## Instalación local (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
```

## Deploy en Vercel (10 minutos)

```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create frasediaria --public --source=. --push

# 2. Ir a https://vercel.com/new
# 3. Importar repositorio
# 4. Click "Deploy"
# 5. ¡Listo!
```

## Testing PWA en Android

1. Abre tu URL de Vercel en Chrome Android
2. Menú (⋮) → "Agregar a pantalla principal"
3. ¡App instalada!

## Comandos útiles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview producción
npm run test         # Tests (cuando los agregues)
npm run lint         # Linting
```

## Estructura del proyecto

src/
├── components/    # UI components
├── hooks/         # Lógica de negocio
├── data/          # Vocabulario y estructuras
├── utils/         # Helpers
└── App.jsx        # Componente principal

## Próximos pasos

1. ✅ Probar la app localmente
2. ✅ Hacer deploy en Vercel
3. ✅ Instalar en Android
4. 📝 Personalizar vocabulario (src/data/)
5. 🎨 Ajustar colores (tailwind.config.js)
6. 🚀 Añadir features (ver STATUS.md)

---

**¿Problemas?** Revisa DEPLOY.md o abre un issue.
