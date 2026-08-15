---
description: Genera y despliega en vivo un catálogo digital completo para una marca ficticia, reutilizando el sistema de diseño de Flower Miel (skill design-system-extraction) con paleta, tipografía y contenido nuevos.
---

# Generar catálogo en vivo

Uso durante la demo: `/generar-catalogo tienda de velas artesanales aromáticas`

El argumento es la idea del negocio ficticio. Ejecuta estos pasos en orden,
sin pedir confirmación intermedia (esto corre en vivo frente a público):

1. Lee `.claude/skills/design-system-extraction/SKILL.md` para el patrón de
   layout, jerarquía y componentes a reutilizar (hero, grid de catálogo,
   sección de info, footer, forma, tipografía, elevación).

2. A partir del argumento, define: nombre de marca, tagline corto, una
   paleta de color nueva y coherente con la idea de negocio (1 color
   primario + 1 secundario + fondo, buen contraste — si tienes la skill
   `dataviz` disponible, usa su metodología de paleta), y dos fuentes
   (heading + body) distintas a las de Flower Miel (Poppins/Quicksand ya
   están tomadas por esa marca, no las reutilices).

3. Escribe una página de una sola vista, sin build step:
   - `index.html`
   - `assets/css/styles.css`
   siguiendo el esqueleto de la skill: header sticky → hero → grid de
   catálogo (4 productos) → una sección de info → footer. No copies
   colores, fuentes ni copy de Flower Miel — solo la estructura y las
   proporciones.

4. Las fotos de producto las provee el usuario manualmente en
   `assets/img/` (no se generan por IA). Antes de escribir el HTML, revisa
   qué archivos de imagen existen ya en `assets/img/` (glob `assets/img/*`)
   y úsalos tal cual están nombrados en los `<img src="...">` del catálogo,
   en el orden en que aparezcan. Si `assets/img/` no existe o está vacía,
   créala, usa placeholders de color sólido con texto (vía CSS, sin pedir
   nada al usuario) para no bloquear el resto del flujo, y avisa al final
   del reporte qué nombres de archivo espera cada `<img>` para que el
   usuario los reemplace luego.

5. Publica los cambios:
   ```
   git add -A
   git commit -m "Catálogo generado en vivo: <idea de negocio>"
   git push
   ```

6. Reporta en 2-3 líneas: el nombre de marca elegido y la URL pública del
   Static Site de Render conectado a este repo (Render la republica sola
   con el push, normalmente en 20-60 segundos).

Mantén el proceso ágil: no expliques cada paso en el chat mientras corre,
ejecuta y al final da el resumen corto con el link.
