# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Vuetify 3 + TypeScript frontend application using Vite as the build tool. The project follows a file-based routing convention and uses modern Vue development practices with Composition API.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Server runs on http://localhost:3000

**Build for production:**
```bash
npm run build
```
This runs type-checking and the build process in parallel.

**Type checking only:**
```bash
npm run type-check
```

**Linting (with auto-fix):**
```bash
npm run lint
```

**Preview production build:**
```bash
npm run preview
```

## Architecture

### Vue Component Syntax
All Vue components use **Composition API with `<script setup>`** syntax. Component structure:
```vue
<template>
  <!-- Template first -->
</template>

<script setup lang="ts">
  // Script second
</script>
```

### Auto-Imports
The project uses `unplugin-auto-import` and `unplugin-vue-components` for automatic imports:
- **Vue APIs**: `ref`, `computed`, `onMounted`, etc. are auto-imported (no manual imports needed)
- **Vue Router**: Router composables like `useRouter`, `useRoute` are auto-imported via `VueRouterAutoImports`
- **Pinia**: `defineStore` and `storeToRefs` are auto-imported
- **Components**: All components in `src/components/` are auto-registered globally
- **Vuetify components**: Auto-imported via `vite-plugin-vuetify`

Generated type definition files:
- `src/auto-imports.d.ts` - Auto-imported composables and APIs
- `src/components.d.ts` - Auto-imported components
- `src/typed-router.d.ts` - Type-safe router routes

### File-Based Routing
Routes are automatically generated from `src/pages/` directory using `unplugin-vue-router`:
- `src/pages/index.vue` → `/`
- `src/pages/about.vue` → `/about`
- `src/pages/users/[id].vue` → `/users/:id`

Router configuration is in `src/router/index.ts` with a workaround for Vite dynamic import errors.

### Layouts
Layouts are managed by `vite-plugin-vue-layouts-next`:
- Default layout: `src/layouts/default.vue`
- Routes automatically use layouts via `setupLayouts()` wrapper
- The default layout includes `AppFooter` component and wraps content in `<v-main>`

### State Management
Pinia stores are located in `src/stores/`:
- `src/stores/index.ts` - Pinia instance export
- `src/stores/app.ts` - Example app store using `defineStore`

### Plugin Registration
Plugins are registered in `src/plugins/index.ts` and loaded in `src/main.ts`:
1. Vuetify (`src/plugins/vuetify.ts`)
2. Vue Router
3. Pinia

### Path Aliases
- `@/` resolves to `src/` directory
- Example: `import App from '@/App.vue'`

### Vuetify Configuration
- Custom Vuetify styles: `src/styles/settings.scss`
- Font family: Noto Sans KR (configured in `src/styles/settings.scss`)
- Auto-import enabled for all Vuetify components
- Material Design Icons (`@mdi/font`)

### Fonts
- **Font**: Noto Sans KR (weights: 400, 500, 700)
- **Loading**: Self-hosted via `@fontsource/noto-sans-kr` package with custom CSS in `src/styles/fonts.css`
- **Subset**: Korean only (no Latin, Vietnamese, Cyrillic)
- **Format**: woff2 only (modern browsers, smaller file size)
- **Result**: Only 3 font files instead of 500+ files
- **Important**:
  - Do NOT use `unplugin-fonts` plugin - it bundles all subsets
  - Do NOT import default CSS files like `@fontsource/noto-sans-kr/400.css` - they include all subsets
  - Always use custom `@font-face` declarations pointing to specific Korean subset files
  - File pattern: `@fontsource/noto-sans-kr/files/noto-sans-kr-korean-{weight}-normal.woff2`

## Project Structure
```
src/
├── App.vue              # Root component
├── main.ts              # Application entry point
├── components/          # Auto-imported Vue components
├── layouts/             # Page layouts (default.vue, etc.)
├── pages/               # File-based routes
├── plugins/             # Plugin configurations
│   ├── index.ts         # Plugin registration
│   └── vuetify.ts       # Vuetify setup
├── router/              # Vue Router configuration
├── stores/              # Pinia state stores
├── styles/              # Global styles and Vuetify settings
└── assets/              # Static assets

Generated files (do not edit manually):
├── auto-imports.d.ts    # Auto-import type definitions
├── components.d.ts      # Component type definitions
└── typed-router.d.ts    # Router type definitions
```

## Key Dependencies
- **Vue 3.5+**: Frontend framework
- **Vuetify 3.10+**: Material Design component library
- **Vue Router 4.5+**: File-based routing via unplugin-vue-router
- **Pinia 3.0+**: State management
- **TypeScript 5.9**: Type safety
- **Vite 7.1+**: Build tool and dev server

## Important Notes
- All components should use Composition API `<script setup>` syntax
- Template comes before script in `.vue` files
- Leverage auto-imports - avoid manually importing Vue/Router/Pinia APIs
- Use `@/` path alias for imports from `src/`
- Vuetify components are available globally without imports
