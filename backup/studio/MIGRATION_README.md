# Strapi to Sanity Migration Guide

This guide will help you migrate your articles from Strapi CMS to your Sanity Studio.

## Prerequisites

1. **Sanity API Token**: You need a Sanity API token with Editor permissions
2. **Environment Variables**: Set up your environment variables
3. **Dependencies**: All required packages are already installed

## Setup Instructions

### 1. Get Your Sanity API Token

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project
3. Navigate to the **API** tab
4. Click **Add API token**
5. Give it a name (e.g., "Migration Token")
6. Set permissions to **Editor**
7. Copy the generated token

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and fill in your values:
   ```env
   SANITY_STUDIO_PROJECT_ID="your-actual-project-id"
   SANITY_STUDIO_DATASET="production"
   SANITY_API_TOKEN="your-sanity-api-token-here"
   ```

### 3. Run the Migration

Execute the migration script:

```bash
npm run migrate
```

## What the Migration Does

The migration script will:

1. **Fetch Articles**: Connects to your Strapi CMS and retrieves all articles
2. **Convert Structure**: Transforms Strapi's content structure to match Sanity's post schema
3. **Upload Images**: Downloads and uploads cover images to Sanity
4. **Create Posts**: Creates new post documents in your Sanity dataset
5. **Generate Log**: Creates a `migration-log.json` file with details

## Content Mapping

| Strapi Field | Sanity Field | Notes |
|--------------|--------------|-------|
| `title` | `title` | Direct mapping |
| `description` | `excerpt` | Used as post excerpt |
| `slug` | `slug.current` | Converted to Sanity slug format |
| `blocks` | `content` | Converted to Sanity block content |
| `cover` | `coverImage` | Image uploaded to Sanity assets |
| `createdAt` | `date` | Publication date |
| `publishedAt` | `publishedAt` | Published timestamp |

## Block Content Conversion

The script handles these Strapi block types:

- **Rich Text** (`shared.rich-text`) → Sanity text blocks
- **Media** (`shared.media`) → Sanity image blocks
- **Quote** (`shared.quote`) → Sanity blockquote blocks
- **Unknown Components** → Fallback text blocks

## After Migration

1. **Verify Content**: Check your Sanity Studio to ensure articles were imported correctly
2. **Review Images**: Confirm that cover images were uploaded properly
3. **Check Categories**: You may need to manually assign categories to posts
4. **Publish**: If needed, publish the migrated posts

## Troubleshooting

### Common Issues

1. **Authentication Error**: Ensure your `SANITY_API_TOKEN` is correct and has Editor permissions
2. **Project ID Error**: Verify your `SANITY_STUDIO_PROJECT_ID` matches your actual project
3. **Network Issues**: Check your internet connection and Strapi API availability

### Migration Log

After migration, check `migration-log.json` for:
- Number of articles processed
- Success/failure status
- Detailed results for each article

## Files Created

- `migrate-from-strapi.js` - Main migration script
- `migration-log.json` - Migration results (created after running)
- `MIGRATION_README.md` - This documentation

## Support

If you encounter issues:
1. Check the migration log for specific error messages
2. Verify your environment variables are correct
3. Ensure your Sanity project schema includes the `post` document type