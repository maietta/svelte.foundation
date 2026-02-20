# SvelteKit Website Template

A starter template for basic SvelteKit websites with common components and patterns pre-built.

## Quick Start

Navigate to your Projects directory and create a fresh SvelteKit project:

```sh
PROJECT=domain.com bun x sv create $PROJECT \
    --template minimal \
    --types ts \
    --add "tailwindcss=plugins:typography" eslint prettier mdsvex \
    --install bun
```

Then download and extract this template over your fresh project to get:

- Pre-built layout components
- Fallback error pages
- Contact form
- Sticky header with collapsible area
- Sticky sidebar
- Mobile navigation
- Modal example
- Blog with markdown files
- Dockerfile for deployment

## What's Included

### Layout & Components

- Responsive layout with sticky header and sidebar
- Collapsible header area (useful for breadcrumbs, social links, etc.)
- Mobile navigation with slide-out menu
- Sticky sidebar for content-heavy pages
- Modal component with backdrop and animations

### Pages

- Homepage with common sections
- Contact form with validation
- Blog system using markdown files (mdsvex)
- Error pages (404, 500) with fallback content

### Developer Experience

- Tailwind CSS with typography plugin
- ESLint + Prettier configured
- TypeScript support
- mdsvex for writing blog posts in Markdown

### Deployment

- Dockerfile ready for containerization
- Optimized for production builds

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Layout wrappers
│   └── content/       # Markdown blog posts
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── contact/
│   ├── blog/
│   └── (error pages)
└── app.html
```

## Writing Blog Posts

Add markdown files to `src/lib/content/blog/`:

```markdown
---
title: My First Post
date: 2024-01-15
description: A brief summary
---

# Hello World

Your content here...
```

## Deployment (Production)

Build the Docker image:

```sh
docker build -t my-site .
```

## Environment Variables

Copy `.env.production` to `.env` and configure the following:

```env
# SendGrid Configuration (required for contact form emails)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
SENDGRID_TO_EMAIL=recipient_email_address

# Altcha Configuration (required for contact form spam protection)
# Generate your API key at https://altcha.org/
ALTCHA_API_KEY=your_altcha_api_key
```

### Altcha Setup

1. Visit https://altcha.org/ to create an account
2. Generate an API key from your Altcha dashboard
3. Add the key to your `.env` file

Without `ALTCHA_API_KEY`, the form will still work but with basic challenge-response verification only.
