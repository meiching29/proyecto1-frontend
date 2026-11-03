# Proyecto 01 · Explorador de Rick and Morty

SPA hecha con **Vite + React + TypeScript**, **React Router** y **Tailwind CSS**.
Los datos vienen de la [Rick and Morty API](https://rickandmortyapi.com).

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (carpeta dist/)
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Inicio (hero) + modal con dark pattern intencional |
| `/explorar` | Grid de personajes, búsqueda y filtro por estado en tiempo real (fetch de lista) |
| `/explorar/:id` | Detalle del personaje (fetch por ID) |
| `/favoritos` | Favoritos guardados en estado global (Context) |
| `/contacto` | Formulario controlado con validación |
| `*` | Página 404 |

## Dónde está cada requisito

- **Fetch lista / detalle:** `src/pages/ExplorePage.tsx`, `src/pages/DetailPage.tsx`, hook `src/hooks/useFetch.ts`
- **Loading / Error / Empty:** `Loader.tsx`, `ErrorMessage.tsx`, `EmptyState.tsx`
- **Favoritos entre rutas:** `src/context/FavoritesContext.tsx` (vive por encima del Router)
- **Toasts con auto-dismiss:** `src/context/ToastContext.tsx` + `ToastContainer.tsx` (useState + setTimeout)
- **Modal de confirmación `<dialog>` + useRef + showModal():** `src/components/ConfirmDialog.tsx`
- **Dark pattern explicado:** `src/components/DarkPatternModal.tsx`
- **Componentes:** 12 componentes en `src/components/` + 6 páginas en `src/pages/`

## Despliegue en Vercel

`vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar.
