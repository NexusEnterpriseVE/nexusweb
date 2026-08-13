# Nexus Enterprise Web v1

Sitio corporativo estático, responsive y sin dependencias.

## Páginas
- `index.html` — Landing principal
- `sistema.html` — Sistema y módulos
- `empresa.html` — objetivo, visión, expansión e historia del fundador
- `precios.html` — planes estilo SaaS con toggle mensual/anual
- `descargar.html` — página de descarga Windows inspirada en patrones de producto como Proton
- `cotizacion.html` — solicitud de cotización con resumen y copia

## Configuración central
Edita `assets/js/config.js` para:
- versión
- precio Pro mensual/anual
- nombre del instalador
- email comercial
- WhatsApp

## Logos
`La Cabra Store` usa el activo ya presente en Nexus. Los SVG de Daca Sport, Novaro y Rican2 Sport son **wordmarks provisionales del prototipo**, no logos oficiales. Sustitúyelos por archivos autorizados antes de publicar.

## Testimonios
No se inventaron testimonios atribuidos. La landing muestra temas positivos de implementación y deja el diseño listo para cargar reseñas verificadas.

## Publicación
Se puede servir directamente con Nginx, Apache, GitHub Pages, Netlify, Vercel estático o cualquier hosting convencional. Para probar localmente:

```bash
python -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Pendientes antes de producción
1. Colocar el Setup real en `downloads/`.
2. Configurar canal comercial en `assets/js/config.js`.
3. Sustituir logos provisionales por oficiales.
4. Incorporar testimonios verificables si se desean reseñas atribuidas.
5. Completar textos legales.
6. Definir dominio y analítica/SEO de producción.
