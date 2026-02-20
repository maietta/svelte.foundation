# Layout Options for SvelteKit Wireframe Boilerplate

## Core Layouts

### 1. Full Width
- Content spans full container
- No sidebars
- Use case: Simple pages, landing variants

### 2. Front Page / Landing
- Hero section with headline, subtext, CTA button
- Feature cards in grid
- Call-to-action sections
- Use case: Homepage, landing pages

### 3. Blog Index
- Grid or list of blog post cards
- Each card: title, excerpt, date, read more link
- Optional pagination
- Use case: /blog listing page

### 4. Blog Post
- Single article layout
- Title, date, author, content
- Optional sidebar (related posts, categories)
- Use case: Individual blog posts

### 5. Services/Features Grid
- Grid of service cards
- Each card: icon, title, description
- Use case: /services, features page

### 6. Contact Page
- Split layout: form + contact info
- Contact info: address, phone, email, map placeholder
- Use case: /contact page

### 7. Two Column (Sidebar + Content)
- Left: navigation sidebar (sticky)
- Right: main content area
- Use case: Documentation, about pages, resources

### 8. Split Hero
- 50% text, 50% image side by side
- Alternating orientation per section
- Use case: About page, feature explanations

---

## Implementation Priority

1. **Front Page** - Most important for demo
2. **Blog Index + Post** - Shows routing capabilities
3. **Two Column** - Common/versatile pattern
4. **Full Width** - Basic building block
5. **Services Grid** - Good for business sites
6. **Contact Page** - Already have form working
7. **Split Hero** - Nice for variety

---

## Components to Create

### Layout Components
- `layouts/FrontPage.svelte`
- `layouts/BlogIndex.svelte`
- `layouts/BlogPost.svelte`
- `layouts/TwoColumn.svelte`
- `layouts/ServicesGrid.svelte`
- `layouts/SplitHero.svelte`

### Common Sections
- `sections/Hero.svelte`
- `sections/FeatureCard.svelte`
- `sections/CtaSection.svelte`
- `sections/Sidebar.svelte`

---

## Next Steps

Pick a layout to start implementing, or we can create them all in parallel.
