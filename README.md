# SvelteKit Website Template

A production-ready starter for SvelteKit websites with common components, a contact form, blog system, and deployment setup pre-built.

## Getting Started

### Option 1 — Use as a GitHub Template (recommended)

If this repo is set up as a GitHub template, click **"Use this template"** → **"Create a new repository"** on GitHub, then clone your new repo:

```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git my-site
cd my-site
bun install
```

### Option 2 — Clone directly

```sh
git clone https://github.com/maietta/svelte.foundation.git my-site
cd my-site
rm -rf .git
git init
git add .
git commit -m "Initial commit from svelte.foundation template"
bun install
```

### Option 3 — Use degit (no git history)

[degit](https://github.com/Rich-Harris/degit) scaffolds a project from any repo without cloning the full history:

```sh
bunx degit maietta/svelte.foundation my-site
cd my-site
bun install
```

---

After installing, copy the environment file and configure it:

```sh
cp .env.production .env
```

Then start the dev server:

```sh
bun dev
```

## Environment Variables

Edit `.env` with your credentials:

```env
# SendGrid Configuration (required for contact form emails)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
SENDGRID_TO_EMAIL=recipient_email_address

# ALTCHA Configuration (spam protection — local verification, no account needed)
# Generate a secure key: openssl rand -hex 32
ALTCHA_HMAC_KEY=your_hmac_key
```

> **ALTCHA** uses local proof-of-work verification — no third-party account or API key required. Just generate a random HMAC key and set it here.

> **SendGrid** requires your sender email to be verified. Visit [app.sendgrid.com/settings/sender_auth](https://app.sendgrid.com/settings/sender_auth) to verify your sender identity before the contact form will deliver email.

## What's Included

### Layout & Components

- Responsive layout with sticky header
- Mobile navigation
- Multiple pre-built page layouts (front page, blog, contact, portfolio, pricing, team, timeline, and more)
- Reusable section components (Hero, Feature Cards, CTA)

### Pages

- Homepage with common sections
- Contact form with invisible spam protection (ALTCHA proof-of-work)
- Blog system using markdown files (mdsvex)
- Error pages (404, 500)

### Developer Experience

- Tailwind CSS v4 + DaisyUI 5
- ESLint + Prettier configured
- TypeScript throughout
- mdsvex for writing blog posts in Markdown
- [sveltekit-og](https://sveltekit-og.dev) for dynamic Open Graph images (no headless browser — Satori + Resvg/WASM)

### Deployment

- Dockerfile included for containerized deployment

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable UI components (Header, Footer, ContactForm)
│   ├── layouts/       # Page layout wrappers
│   ├── sections/      # Section-level components (Hero, FeatureCards, CTA)
│   └── stores/        # Business info, navigation, blog stores
└── routes/
    ├── +layout.svelte
    ├── +page.svelte
    ├── contact/
    ├── blog/
    └── ...
```

## Customising Business Info

Edit `src/lib/stores/business.ts` to set your business name, address, phone, email, and social links. These values are used automatically across the header, footer, and contact form.

## Writing Blog Posts

Add markdown files to `src/lib/content/blog/` (or configure the path in `src/lib/stores/blog.ts`):

```markdown
---
title: My First Post
date: 2024-01-15
description: A brief summary
categories: [news, updates]
---

Your content here...
```

## Building for Production

```sh
bun run build
```

Or build the Docker image:

```sh
docker build -t my-site .
docker run -p 3000:3000 --env-file .env my-site
```
