# Portless

[Portless](https://port1355.dev/) is a local reverse proxy that replaces raw port numbers with stable, named `.localhost` URLs for local development.

```
Browser → test.localhost:1355 → proxy → your app on random port (e.g. 4693)
```

## Install

Install globally — do not add as a project dependency:

```sh
bun install -g portless
```

## How it works

1. A proxy daemon runs persistently on port **1355**
2. When you run `portless <name> <cmd>`, it:
   - Picks a random port in the **4000–4999** range
   - Sets `PORT=<random>` before running your command
   - Registers a route: `<name>.localhost` → that port
   - Proxies all requests at port 1355 to your app

Most frameworks respect the `PORT` env var automatically — but **Vite/SvelteKit does not**. See the [Usage with Bun + SvelteKit](#usage-with-bun--sveltekit) section for the required `vite.config.ts` changes.

## Usage with Bun + SvelteKit

> **SvelteKit/Vite caveat:** Unlike Next.js, Vite does **not** automatically respect the `PORT` environment variable. You must configure it in `vite.config.ts`, and also set `hmr.clientPort` so that hot reload works through the proxy.

```ts
// vite.config.ts
const port = parseInt(process.env.PORT || '5173');
const hmrClientPort = parseInt(process.env.PORTLESS_PORT || '0') || (process.env.PORT ? 1355 : port);

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      // When running behind portless, HMR websocket must use the proxy port
      clientPort: hmrClientPort
    }
  }
});
```

- `host: '0.0.0.0'` — binds Vite to all interfaces so the portless proxy can reach it (without this, Vite only listens on loopback and the proxy may not be able to connect)
- `strictPort: true` — prevents Vite from silently falling back to a different port if the assigned one is busy, which would break the portless route mapping

```sh
portless test bun dev
# → http://test.localhost:1355
```

Output example:
```
portless
-- test.localhost (auto-resolves to 127.0.0.1)
-- Proxy is running
-- Using port 4693
  -> http://test.localhost:1355
Running: PORT=4693 bun dev
```

### In package.json

```json
{
  "scripts": {
    "dev": "portless test bun dev"
  }
}
```

## Commands

| Command | Description |
|---|---|
| `portless <name> bun dev` | Start app with a named URL |
| `portless list` | Show active routes and their ports |
| `portless proxy start` | Start the proxy daemon manually |
| `portless proxy start --https` | Enable HTTP/2 + TLS |
| `portless proxy stop` | Stop the proxy daemon |
| `sudo portless trust` | Trust the local CA for HTTPS (run once) |
| `PORTLESS=0 bun dev` | Bypass the proxy entirely |

## HTTPS / HTTP2

HTTP/2 multiplexes all requests over a single connection, which is faster than HTTP/1.1's 6-connection-per-host limit — especially for Vite dev servers serving many unbundled files.

```sh
portless proxy start --https
```

To enable HTTPS by default, add to `.bashrc` / `.zshrc`:

```sh
export PORTLESS_HTTPS=1
```

## Subdomains

Organize multiple services with subdomains:

```sh
portless api.myapp bun run start    # → http://api.myapp.localhost:1355
portless docs.myapp bun dev         # → http://docs.myapp.localhost:1355
```

## Configuration

Configured via environment variables — no config files needed.

| Variable | Description | Default |
|---|---|---|
| `PORTLESS_PORT` | Proxy port | `1355` |
| `PORTLESS_HTTPS` | Set to `1` to always use HTTPS | off |
| `PORTLESS_STATE_DIR` | Override the state directory | see below |
| `PORTLESS` | Set to `0` or `skip` to bypass the proxy | enabled |

## State files

Stored in `~/.portless/` (no sudo needed since port 1355 ≥ 1024):

| File | Purpose |
|---|---|
| `routes.json` | Maps hostnames to ports |
| `routes.lock` | Prevents concurrent writes |
| `proxy.pid` | PID of the running proxy |
| `proxy.port` | Port the proxy listens on |
| `proxy.log` | Proxy daemon log output |

## Why use it

- **No port conflicts** — random port assignment per app, no `EADDRINUSE`
- **Stable URLs** — `http://test.localhost:1355` never changes across restarts
- **Cookie/storage isolation** — each `.localhost` subdomain is scoped independently
- **Monorepo friendly** — run any number of services with distinct hostnames
- **Agent friendly** — AI tools can use a predictable URL instead of guessing ports
- **CORS/OAuth stability** — redirect URIs and allowlists don't break on restart
