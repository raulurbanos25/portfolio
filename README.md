# Portfolio personal — Raúl Urbanos Esteban

Portfolio web personal de Raúl Urbanos Esteban, desarrollador Full Stack Junior. Reúne información profesional, formación, proyectos, experiencia laboral y vías de contacto en una web adaptable a móvil y escritorio.

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y desarrollo](#instalación-y-desarrollo)
- [Comandos](#comandos)
- [Estructura](#estructura)
- [Personalizar el contenido](#personalizar-el-contenido)
- [Métricas](#métricas)
- [Contacto desde el formulario](#contacto-desde-el-formulario)
- [Compilación y publicación](#compilación-y-publicación)

## Características

- Inicio con presentación animada, navegación y panel de datos en directo.
- Secciones de perfil, proyectos, experiencia, formación académica, contacto y currículum.
- Ficha de proyecto con carrusel, galería de imágenes, visor ampliado y contadores de visitas e imágenes.
- Calendarios de actividad y comparación visual de empresas en la experiencia laboral.
- Certificado de inglés y carta de recomendación consultables desde ventanas emergentes.
- Selector de tema claro, oscuro o del sistema, colores de acento, zoom y tamaño de letra.
- Idiomas y formación presentados con sus imágenes y banderas.
- Diseño adaptable, animaciones y compatibilidad con la preferencia de movimiento reducido.

## Tecnologías

- **React 19** para la interfaz.
- **Vite 8** para desarrollo y compilación.
- **React Router** para la navegación entre páginas.
- **Tailwind CSS** para estilos.
- **Framer Motion** para animaciones y transiciones.
- **Lucide React** para iconos.
- Servicio de contadores externo para visitas y «Me gusta».

## Requisitos

- Node.js y npm instalados.
- Conexión a internet para descargar dependencias y consultar las métricas remotas.

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir el portfolio. El servidor de desarrollo actualiza la web al guardar cambios.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run build` | Compila el sitio optimizado en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/`. |
| `npm run lint` | Analiza el código con ESLint. |
| `npm run metrics` | Consulta las métricas remotas, las muestra en terminal y actualiza `portfolio-metrics.json`. |

## Estructura

```text
.
├── public/                   # Archivos estáticos servidos tal cual
│   ├── academico/            # Imágenes de los centros de formación
│   ├── banderas/             # Banderas de idiomas
│   ├── certificaciones/      # Certificados
│   ├── empresas/             # Logos de empresas
│   ├── logo/                 # Logos del portfolio
│   └── proyectos/indigodle/  # Capturas 1.png a 12.png del proyecto
├── scripts/
│   └── portfolio-metrics.mjs # Exporta las métricas a JSON
├── src/
│   ├── components/           # Secciones y componentes visuales
│   ├── context/              # Contextos de tema y animación de entrada
│   ├── data/                 # Contenido del portfolio
│   ├── hooks/                # Lógica reutilizable y métricas
│   ├── pages/                # Páginas asociadas a las rutas
│   ├── App.jsx               # Rutas y estructura general
│   └── main.jsx              # Punto de entrada de React
├── index.html
└── package.json
```

## Personalizar el contenido

La información principal está en [`src/data/portfolioData.js`](src/data/portfolioData.js): perfil, tecnologías, proyectos, experiencia, formación e idiomas. Actualiza ahí el contenido en vez de modificar los textos repetidos dentro de cada componente.

Los archivos de `public/` se usan mediante rutas desde la raíz del sitio. Por ejemplo, `public/proyectos/indigodle/1.png` se referencia como `/proyectos/indigodle/1.png`. Para las capturas de Indigodle, las imágenes `1.png` a `6.png` forman el carrusel y `7.png` a `12.png` la galería.

Antes de publicar, revisa en `portfolioData.js` los enlaces de código y demo del proyecto y sustitúyelos por las direcciones reales.

## Métricas

Las visitas generales, los «Me gusta», las entradas al proyecto y las vistas de cada captura se guardan en el servicio remoto configurado en los hooks de `src/hooks/`. No dependen de que el panel de métricas esté visible. Las visitas y los «Me gusta» usan contadores nuevos (`visitas-v2` y `me-gusta-v2`) para empezar una serie visible desde cero.

- Cambiar de sección, volver a Inicio o recargar mantiene la visita actual y su cronómetro.
- Salir del sitio y volver a entrar inicia una visita nueva.
- Se puede registrar un «Me gusta» por visita.
- La marca local de visita y de «Me gusta» se conserva si se recarga o navega dentro del portfolio. En una respuesta de red incierta no se reintenta el incremento, para evitar duplicados; en ese caso el contador puede tardar en reflejar el registro hasta la siguiente lectura.
- Abrir la ficha de un proyecto registra una entrada; mostrar una captura en el carrusel o ampliarla registra una vista de esa imagen.
- Los contadores son totales agregados; no identifican a personas concretas ni deduplican visitantes entre dispositivos.

Para guardar una copia local actualizada de los totales:

```bash
npm run metrics
```

El comando consulta el servicio y sobrescribe `portfolio-metrics.json` con la fecha de actualización, el total de visitas y los «Me gusta». Ese JSON es una instantánea; el servicio remoto sigue siendo la fuente de los contadores.

## Contacto desde el formulario

Al enviar el formulario se abre Gmail en una pestaña nueva con el correo de destino, el asunto y el contenido rellenados. La persona debe confirmar el envío desde Gmail. No se necesita configurar un servidor de correo para esta función.

## Compilación y publicación

```bash
npm run build
npm run preview
```

Publica el contenido de `dist/` en Vercel. El archivo `vercel.json` configura la alternativa a `index.html` que necesita React Router para que las rutas funcionen al actualizarlas o abrirlas directamente, por ejemplo `/experiencia` o `/contacto`. Conserva los archivos de `public/` y sus rutas para que se carguen imágenes, documentos y currículum.
