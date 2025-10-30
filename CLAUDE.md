# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and blog website built with Next.js 15, TypeScript, and Sanity CMS. The site features a modern dark-mode design using Tailwind CSS and shadcn/ui components, with content managed through Sanity Studio.

## Development Commands

```bash
# Development server (runs on port 9002 with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint

# Type checking
npm run typecheck
```

## Architecture & Structure

### Next.js App Router Structure
- **`src/app/`** - Main application routes using Next.js 15 App Router
  - `page.tsx` - Homepage with hero section, draggable components, and blog preview
  - `blog/` - Blog listing and individual post pages (`[slug]/page.tsx`)
  - `gallery/` - Photo gallery page
  - `milestones/` - Journey timeline page
  - `contact/` - Contact form page
  - `studio/[[...tool]]/` - Sanity Studio embedded at `/studio` route
  - `api/send-email/` - Email API endpoint using Resend

### Content Management (Sanity CMS)
- **Content Source**: All blog content is fetched from Sanity CMS
- **Sanity Studio**: Accessible at `/studio` route (embedded in the app)
- **Schema Location**: `src/sanity/schemaTypes/`
  - `post.ts` - Blog post schema
  - `author.ts` - Author schema
  - `category.ts` - Category schema
  - `blockContent.ts` - Rich text content blocks

### Data Fetching Layer
- **`src/lib/cms.ts`** - Main CMS integration layer
  - `getBlogPosts()` - Fetches all published blog posts ordered by date
  - `getBlogPostBySlug(slug)` - Fetches single post by slug
  - `getBlogPostsByCategory(categorySlug)` - Filters posts by category
  - `getCategories()` - Fetches all categories
  - `getAuthors()` - Fetches all authors
  - Converts Sanity's Portable Text blocks to markdown format
  - Uses `@sanity/image-url` for image URL building

- **Sanity Client Config**: `src/sanity/lib/client.ts` and `src/lib/cms.ts`
  - Project ID and dataset configured via environment variables
  - CDN enabled for better performance
  - API version: `2024-01-01`

### Component Architecture

**UI Components** (`src/components/ui/`)
- Built with shadcn/ui and Radix UI primitives
- Styled with Tailwind CSS using CSS variables for theming
- Follows the shadcn/ui convention for consistent component patterns

**Custom Components** (`src/components/`)
- `header.tsx` / `footer.tsx` - Site navigation and footer
- `page-transition.tsx` - Page transition animations using Framer Motion
- `flexible-blog-grid.tsx` - Responsive blog post grid layout
- `blog-client-component.tsx` - Client-side blog interactions
- `stacking-cards.tsx` - Animated stacking card component
- `journey-timeline.tsx` - Timeline visualization for milestones
- `swapy-drag.tsx` - Drag-and-drop reorderable sections using Swapy library
- `table-of-contents.tsx` - Auto-generated TOC for blog posts
- `nurui/` - Custom UI components (gradient-bars, wave-card, info-card)

### Styling & Theme
- **Tailwind Config**: `tailwind.config.ts`
  - Dark mode enabled via class strategy
  - Custom fonts: Sora (body/headline), Luckiest Guy (display), Intel One Mono (code)
  - HSL-based color system using CSS variables defined in `src/app/globals.css`
  - Extended with custom animations and keyframes

### Type System
- **`src/lib/types.ts`** - Core type definitions
  - `BlogPost` - Normalized blog post interface used throughout the app
  - `StrapiArticle`, `StrapiAuthor`, `StrapiCategory` - Legacy Strapi types (not currently used)
  - `Album` - Gallery photo album structure

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<your-token>
RESEND_API_KEY=<your-resend-key>
```

## Key Technical Details

### Image Handling
- Next.js Image component configured with multiple remote patterns (see `next.config.ts`)
- Supports: Sanity CDN, ImageKit, Unsplash, LinkedIn, Firebase Storage, Placehold
- SVG support enabled with security headers

### Build Configuration
- TypeScript and ESLint errors ignored during builds (see `next.config.ts`)
- Turbopack enabled for faster development builds
- Node deprecation warnings suppressed via `cross-env`

### Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json`)

### Animation Libraries
- **Framer Motion** - Page transitions and component animations
- **Lenis** - Smooth scrolling
- **Lottie** - JSON-based animations
- **Swapy** - Drag and drop functionality

### Form Handling
- React Hook Form with Zod validation resolvers
- Contact form submits to `/api/send-email` using Resend

## Working with Content

### Accessing Sanity Studio
1. Navigate to `/studio` in development or production
2. Studio is embedded in the Next.js app (configured in `sanity.config.ts`)
3. Uses Vision plugin for GROQ query testing

### Content Flow
1. Content is created/edited in Sanity Studio
2. `getBlogPosts()` fetches published posts via GROQ queries
3. Portable Text content is converted to markdown in `cms.ts`
4. Posts are displayed using `FlexibleBlogGrid` on homepage or individual post pages

### Adding New Content Types
1. Create schema in `src/sanity/schemaTypes/`
2. Export from `index.ts`
3. Add fetch function to `src/lib/cms.ts`
4. Create corresponding TypeScript interface in `src/lib/types.ts`

## SEO Implementation

The site is fully optimized for search engines with:

- **Dynamic Metadata**: Each blog post generates unique meta tags via `generateMetadata()` in `src/app/blog/[slug]/page.tsx`
- **Structured Data**: JSON-LD BlogPosting schema on all blog posts for rich snippets
- **Sitemap**: Auto-generated at `src/app/sitemap.ts` - includes all blog posts and static pages
- **robots.txt**: Located in `public/robots.txt` - allows crawling except `/studio` and `/api`
- **Open Graph & Twitter Cards**: All pages have social media preview metadata
- **Canonical URLs**: Prevent duplicate content issues

**Required Environment Variable:**
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

See `SEO_IMPROVEMENTS.md` for complete documentation and setup instructions.

## Development Notes

- **Port**: Dev server runs on port 9002 (not the default 3000)
- **Force Dynamic**: Homepage uses `export const dynamic = 'force-dynamic'` to ensure fresh data
- **Dark Mode**: Site is hardcoded to dark mode (`<html lang="en" className="dark">`)
- **Type Safety**: TypeScript strict mode enabled, but build errors are currently ignored
