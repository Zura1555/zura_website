# Sanity CMS Blog Configuration

## Overview
This document outlines the complete Sanity CMS configuration for the blog section of your website.

## Schema Structure

### Post (Blog Article)
- `title` - Post title
- `slug` - URL slug  
- `content` - Rich text content (blockContent)
- `excerpt` - Short description
- `coverImage` - Featured image with alt text
- `publishedAt` - Publication date
- `date` - Additional date field
- `author` - Reference to person
- `categories` - Array of category references
- `tags` - Array of string tags

### Person (Author)
- `firstName` - Author's first name
- `lastName` - Author's last name  
- `picture` - Profile image with alt text

### Category
- `title` - Category name
- `slug` - URL slug
- `description` - Category description
- `color` - Category color
- `featured` - Featured category flag
- `image` - Category image
- `seo` - SEO settings object
- `parentCategory` - Reference to parent category
- `sortOrder` - Display order

## API Functions

### Main Functions
```typescript
getBlogPosts() - Fetch all published posts
getBlogPostBySlug(slug) - Fetch specific post
getCategories() - Fetch all categories  
getAuthors() - Fetch all authors
getBlogPostsByCategory(categorySlug) - Fetch posts by category
```

### Current Data
- **Posts**: 3 total (2 published, 1 draft)
- **Authors**: 1 (Thuong-Tuan Tran)
- **Categories**: 2 (Development, Learning)

## Content Management

### Via Sanity Studio
Access your content management interface at: `http://localhost:9002/studio`

### Via Sanity MCP
Use the Sanity MCP tools for programmatic content management:
- `mcp_sanity_query_documents` - Query existing content
- `mcp_sanity_create_document` - Create new content
- `mcp_sanity_update_document` - Update existing content
- `mcp_sanity_publish_document` - Publish drafts

## Migration Notes

### Changes from Strapi
1. Document type changed from `article` to `post`
2. Author structure changed from single name to firstName/lastName
3. Categories changed from single reference to array of references
4. Cover image field renamed from `cover` to `coverImage`
5. Rich text processing updated for Sanity's Portable Text format

### Backward Compatibility
The BlogPost interface remains the same, ensuring no breaking changes to your frontend components.

## Troubleshooting

### Common Issues
1. **No posts showing**: Check that posts have `publishedAt` field set
2. **Images not loading**: Verify image assets are properly uploaded to Sanity
3. **Content not formatting**: Check portable text processing in `processBlocks` function

### Debug Queries
```javascript
// Check published posts
*[_type == "post" && defined(publishedAt)]

// Check authors
*[_type == "person"]

// Check categories  
*[_type == "category"]
```

## Environment Variables
Ensure these are set in your `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=w486ji4p
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here
```