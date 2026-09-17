# 🚀 Deploy en Vercel

## Opción 1: Deploy Automático desde GitHub (Recomendado)

### Paso 1: Crear repositorio en GitHub

## Inicializar git (si no lo has hecho)

git init
git add .
git commit -m "Initial commit: FraseDiaria v2.0"

## Crear repositorio en GitHub

gh repo create frasediaria --public --source=. --push

O manualmente:

1. Ve a <https://github.com/new>
2. Nombre: `frasediaria`
3. Público
4. No inicializar con README
5. Crear repositorio
6. Ejecutar los comandos que GitHub te muestra

### Paso 2: Conectar con Vercel

1. Ve a <https://vercel.com/new>
2. Importa tu repositorio `frasediaria`
3. Vercel detecta automáticamente que es Vite
4. Click en "Deploy"
5. ¡Listo! Tu app estará en `https://frasediaria.vercel.app`

### Paso 3: Configurar dominio personalizado (opcional)

1. En Vercel Dashboard → tu proyecto → Settings → Domains
2. Agrega tu dominio (ej: `frasediaria.com`)
3. Configura los DNS según las instrucciones de Vercel

---

## Opción 2: Deploy Manual desde CLI

### Instalar Vercel CLI

```bash
npm install -g vercel
```

### Login en Vercel

```bash
vercel login
```

### Deploy a producción

```bash
# Deploy preview (desarrollo)
vercel

# Deploy producción
vercel --prod
```

---

## Configuración de Vercel

### vercel.json (opcional)

Crea este archivo en la raíz si necesitas configuración avanzada:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

---

## Testing PWA en Android

### Antes del deploy

1. Build local:

```bash
npm run build
npm run preview
```

2.Abre <`http://localhost:4173`> en Chrome Android (usa ngrok o similar para exponer local)

3.Verifica:

- ✅ Se puede instalar
- ✅ Funciona offline
- ✅ Iconos se muestran correctamente
- ✅ Splash screen aparece

### Después del deploy

1. Abre tu URL en Chrome Android
2. Toca menú (⋮) → "Agregar a pantalla principal"
3. Verifica que:
   - ✅ Icono se ve bien
   - ✅ App abre en modo standalone
   - ✅ No hay barra de navegador
   - ✅ Funciona sin conexión

---

## Troubleshooting

### La PWA no se instala

**Problema**: Chrome no muestra el prompt de instalación

**Soluciones**:

1. Verifica que `manifest.json` sea válido: https://manifest-validator.appspot.com/
2. Asegúrate de servir sobre HTTPS (Vercel lo hace automáticamente)
3. Verifica que el Service Worker esté registrado:

   ```javascript
   // En consola del navegador
   navigator.serviceWorker.getRegistrations().then(console.log)
   ```

4. Limpia cache y recarga:

   ```javascript
   // En consola
   caches.keys().then(names => names.forEach(name => caches.delete(name)))
   ```

### Los iconos no se muestran

**Problema**: Iconos pixelados o no aparecen

**Solución**:

1. Genera iconos de alta calidad:
   - 192x192 px (PNG)
   - 512x512 px (PNG)
   - Usa <https://www.pwabuilder.com/imageGenerator>
2. Colócalos en `public/`
3. Actualiza `manifest.json` con las rutas correctas

### El audio no funciona

**Problema**: Web Speech API no reproduce audio

**Soluciones**:

1. Verifica soporte:

   ```javascript
   console.log('speechSynthesis' in window)
   ```

2. Algunas voces requieren interacción del usuario primero
3. Prueba con otro navegador (Chrome tiene mejor soporte)
4. En Android, verifica que el motor TTS esté instalado:
   - Configuración → Accesibilidad → Texto a voz

---

## Monitoreo y Analytics (opcional)

### Vercel Analytics

Vercel ofrece analytics gratuitos:

1. En Vercel Dashboard → tu proyecto → Analytics
2. Activa "Vercel Analytics"
3. Métricas disponibles:
   - Page views
   - Unique visitors
   - Performance metrics (Core Web Vitals)

### Google Analytics (alternativa)

```javascript
// En index.html, antes de </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Actualizaciones

### Deploy de nueva versión

```bash
# Hacer cambios
git add .
git commit -m "feat: add new feature"
git push
```

Vercel detecta el push y hace deploy automáticamente.

### Forzar actualización de PWA

Si los usuarios tienen cache antigua:

1.Incrementa versión en `manifest.json`:
```json

{
  "version": "2.0.1"
}
```

2.El Service Worker detecta el cambio y actualiza automáticamente

---

## Costos

**Vercel Hobby (gratis)**:

- ✅ 100 GB bandwidth/mes
- ✅ 100 GB-hours de serverless functions
- ✅ SSL automático
- ✅ CDN global
- ✅ Deploy desde GitHub
- ❌ Sin dominio personalizado (usa `tu-proyecto.vercel.app`)
- ❌ Sin analytics avanzados

**Vercel Pro ($20/mes)**:

- ✅ Todo lo anterior
- ✅ Dominio personalizado
- ✅ Analytics avanzados
- ✅ 1 TB bandwidth
- ✅ Soporte prioritario

Para este proyecto, el plan **Hobby** es más que suficiente.

---

## Checklist pre-deploy

- [ ] `npm run build` funciona sin errores
- [ ] `npm run preview` muestra la app correctamente
- [ ] PWA se instala en Android
- [ ] Audio funciona en Chrome
- [ ] Flashcards se guardan en localStorage
- [ ] Historial muestra frases anteriores
- [ ] Responsive en móvil (320px - 1440px)
- [ ] No hay errores en consola
- [ ] Lighthouse score > 90 (PWA)
- [ ] README.md actualizado
- [ ] .gitignore configurado
- [ ] Repositorio creado en GitHub

---

## Soporte

Si tienes problemas con el deploy:

1. Revisa la documentación de Vercel: <https://vercel.com/docs>
2. Consulta el foro: <https://github.com/vercel/vercel/discussions>
3. Abre un issue en este repositorio

---

**¡Buena suerte con tu deploy! 🚀**
