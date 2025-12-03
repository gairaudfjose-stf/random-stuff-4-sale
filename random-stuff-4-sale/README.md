# Random Stuff 4 Sale - Website

Sitio estático generado para GitHub Pages usando HTML5, TailwindCSS y JavaScript Vanilla. Incluye integración con Snipcart (e-commerce) y WhatsApp.

## 🚀 Cómo publicar en GitHub Pages

1. **Crear Repositorio:**
   - Ve a GitHub y crea un nuevo repo llamado `randomstuff4sale-site`.
   - Asegúrate de que sea "Public".

2. **Subir Archivos:**
   - Sube todos los archivos y carpetas (`index.html`, `assets/`, `products.json`, etc.) al repositorio.

3. **Configurar Pages:**
   - Ve a la pestaña **Settings** del repositorio.
   - En el menú lateral, haz clic en **Pages**.
   - En "Source", selecciona `Deploy from a branch`.
   - En "Branch", selecciona `main` (o `master`) y carpeta `/ (root)`.
   - Guarda. En unos minutos tendrás tu URL (ej: `https://usuario.github.io/randomstuff4sale-site/`).

## ⚙️ Configuración Obligatoria

### 1. Snipcart (Carrito de Compras)
1. Crea una cuenta en [Snipcart.com](https://snipcart.com).
2. Copia tu **Public API Key**.
3. Abre `index.html`, `tienda.html`, `producto.html`, `blog.html`, `about.html`.
4. Busca la línea: `data-api-key="REPLACE_SNIPCART_PUBLIC_KEY"` al final del archivo.
5. Pega tu API Key real.
6. **Importante:** En el panel de Snipcart, ve a *Store Settings > Domains* y añade tu URL de GitHub Pages.

### 2. WhatsApp
1. Abre `assets/js/app.js`.
2. Busca la constante `WHATSAPP_PHONE`.
3. Reemplaza con tu número (código país + número, sin símbolos +). Ej: `50688888888`.

### 3. Imágenes de Productos
1. Reemplaza las URLs en `products.json` con enlaces a tus imágenes reales (puedes alojarlas en la carpeta `assets/img/` y usar rutas relativas `assets/img/foto1.jpg`).

## ✅ SEO Checklist
- [ ] **Meta Description:** Personalizar en el `<head>` de cada HTML.
- [ ] **Sitemap:** Editar `sitemap.xml` con la URL final de GitHub Pages.
- [ ] **Robots:** Verificar `robots.txt`.
- [ ] **Open Graph:** Añadir etiquetas `og:image` en el head para que se vea bonito al compartir en redes (actualmente hay placeholders).

## 🛠️ Cómo agregar productos
No necesitas tocar el HTML.
1. Abre `products.json`.
2. Copia un bloque `{...}` y pégalo al final (dentro de los corchetes `[]`).
3. Cambia ID, nombre, precio, imagen, etc.
4. **Importante:** El campo `slug` debe ser único y sin espacios (ej: `mi-producto-nuevo`).