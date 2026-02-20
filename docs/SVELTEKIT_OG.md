# SvelteKit OG

[sveltekit-og](https://sveltekit-og.dev) is a high-performance utility for generating dynamic Open Graph images inside SvelteKit. It renders Svelte components or raw HTML/CSS to PNG/JPEG server-side — **no headless browser** required.

## How it works

1. **Satori** (Vercel) — converts HTML + CSS (Flexbox/Tailwind) into SVG
2. **Resvg** (Rust/WASM) — converts the SVG into the final PNG or JPEG

This runs entirely in-process, making it fast enough for serverless and edge environments.

## Install

```sh
bun add @ethercorps/sveltekit-og
```

## Vite plugin (required)

The package uses WASM internally. You must add the Vite plugin so the WASM is loaded correctly. For the **Node adapter** (which this project uses), pass `{ esmImport: false }`:

```ts
// vite.config.ts
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';

export default defineConfig({
  plugins: [sveltekit(), sveltekitOG({ esmImport: false })]
});
```

> If you add the plugin while the dev server is running, stop and restart it.

## Implementation in this project

A single `/og` route handles all OG images via query params. No per-page server routes needed.

### The OG card component

`src/lib/components/og/OgCard.svelte` — dark tech-style card accepting `title`, `description`, `label`, and `site` props. Uses only inline styles (Satori's requirement).

### The server route

`src/routes/og/+server.ts` — reads `?title`, `?description`, `?label`, `?site` from the URL, falls back to business info defaults. Font is read from disk once at module load (not per-request).

```ts
// src/routes/og/+server.ts
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { readFileSync } from 'fs';
import { dev } from '$app/environment';
import { get } from 'svelte/store';
import { businessInfo } from '$lib/stores/business';
import OgCard from '$lib/components/og/OgCard.svelte';

// Cached at module load — not re-read on every request
const fontData = readFileSync(
  dev ? 'static/fonts/geist-latin.woff2' : 'build/client/fonts/geist-latin.woff2'
).buffer as ArrayBuffer;

export const GET: RequestHandler = async ({ url }) => {
  const info = get(businessInfo);
  return new ImageResponse(
    OgCard,
    { width: 1200, height: 630, fonts: [{ name: 'Geist', data: fontData, weight: 400, style: 'normal' }] },
    {
      title: url.searchParams.get('title') || info.name,
      description: url.searchParams.get('description') || info.tagline ?? '',
      label: url.searchParams.get('label') || '',
      site: url.searchParams.get('site') || info.name
    }
  );
};
```

### Adding OG tags to a page

Use `$page.url.origin` to construct the image URL — this works during SSR and on the client:

```svelte
<script lang="ts">
  import { page } from '$app/stores';

  // Build the OG image URL with URLSearchParams for correct encoding
  const ogImage = `${$page.url.origin}/og?${new URLSearchParams({
    title: 'My Page Title',
    description: 'Page description here',
    label: 'Blog'   // optional badge label
  })}`;
</script>

<svelte:head>
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content="My Page Title" />
  <meta property="og:description" content="Page description here" />
  <meta property="og:image" content={ogImage} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>
```

### Layout defaults

`+layout.svelte` sets common tags that apply to every page (og:type, og:site_name, twitter:card, og:image fallback). Individual pages override `og:image` with their specific URL.

### Preview the OG image

During development, visit:
```
http://test.localhost:1355/og
http://test.localhost:1355/og?title=Hello&description=World&label=Blog
```

## Tailwind support

Use Tailwind utility classes directly in your OG component — Satori supports the standard subset of Tailwind. No extra configuration needed if the Vite plugin is already set up.

## Custom fonts

This project uses Geist loaded from `static/fonts/geist-latin.woff2` (see the implementation section above). The font is read once at module level and reused for every request.

The path differs between environments:
- **Dev**: `static/fonts/geist-latin.woff2` (relative to project root / CWD)
- **Production** (adapter-node): `build/client/fonts/geist-latin.woff2`

Pass font data to `ImageResponse` via the `fonts` option:

```ts
fonts: [{ name: 'Geist', data: fontData, weight: 400, style: 'normal' }]
```

Use the same `name` in your component's `font-family` inline style so Satori resolves it correctly.

## Prerendering

Set `export const prerender = true` on the server route to generate images at build time instead of on-demand. Useful for static deployments.

## Node adapter notes

This project uses `@sveltejs/adapter-node`. The key difference from other runtimes is the **`esmImport: false`** option on the Vite plugin, which ensures WASM is loaded via Node's standard module system rather than ESM dynamic imports.

## Further reading

- [Getting Started](https://sveltekit-og.dev/docs/getting-started)
- [Svelte Component usage](https://sveltekit-og.dev/docs/usage/svelte)
- [Raw HTML usage](https://sveltekit-og.dev/docs/usage/html)
- [Fonts](https://sveltekit-og.dev/docs/utilities/fonts)
- [Local assets](https://sveltekit-og.dev/docs/advanced-usage/local-assets)
- [Prerendering OG images](https://sveltekit-og.dev/docs/advanced-usage/pre-rendering)
- [Node runtime setup](https://sveltekit-og.dev/docs/runtime/node)
- [ImageResponse API](https://sveltekit-og.dev/docs/utilities/types)
