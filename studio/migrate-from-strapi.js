const { createClient } = require('@sanity/client');
const fetch = require('node-fetch');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2023-05-03'
});

// Strapi configuration
const STRAPI_API_URL = 'https://uplifting-champion-8a8387e8ac.strapiapp.com';
const STRAPI_API_TOKEN = '4fa692b6bedcb63eceafc7b5ab377a4745d5abf424d51b4a57a0e8c21e2786bbb53f0da7a6c1a9a8fa965c236bac779e257d655480a4a5c0eb772ca622768829e43ac854afc67d3645a10e9e664b6f71d5c3e80c63d3c7c33600a11be2f94678b14963ef12ddb32c0dca4a3b1f5b1f7e7984f922d9c2432118c86907f59ad8df';

// Helper function to convert Strapi blocks to Sanity block content
function convertStrapiBlocksToSanity(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  
  return blocks.map(block => {
    switch (block.__component) {
      case 'shared.rich-text':
        // Convert rich text to Sanity block format
        return {
          _type: 'block',
          _key: `block-${block.id}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-${block.id}`,
              text: block.body || '',
              marks: []
            }
          ]
        };
      
      case 'shared.media':
        // Convert media to Sanity image reference
        if (block.file) {
          return {
            _type: 'image',
            _key: `image-${block.id}`,
            asset: {
              _type: 'reference',
              _ref: `image-${block.file.id}` // This would need proper image upload
            },
            alt: block.file.alternativeText || ''
          };
        }
        break;
      
      case 'shared.quote':
        return {
          _type: 'block',
          _key: `quote-${block.id}`,
          style: 'blockquote',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-quote-${block.id}`,
              text: block.body || '',
              marks: []
            }
          ]
        };
      
      default:
        // Fallback for unknown components
        return {
          _type: 'block',
          _key: `block-${block.id}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-${block.id}`,
              text: JSON.stringify(block),
              marks: []
            }
          ]
        };
    }
  }).filter(Boolean);
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: filename
    });
    
    return asset._id;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

// Fetch articles from Strapi
async function fetchStrapiArticles() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/articles?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Strapi articles:', error);
    return [];
  }
}

// Convert Strapi article to Sanity post format
async function convertArticleToPost(article) {
  console.log(`Converting article: ${article.title}`);
  
  // Upload cover image if exists
  let coverImageRef = null;
  if (article.cover && article.cover.url) {
    const imageId = await uploadImageToSanity(article.cover.url, article.cover.name);
    if (imageId) {
      coverImageRef = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId
        },
        alt: article.cover.alternativeText || article.title
      };
    }
  }
  
  // Convert blocks to Sanity block content
  const blockContent = convertStrapiBlocksToSanity(article.blocks);
  
  // Create Sanity post document
  const sanityPost = {
    _type: 'post',
    _id: `migrated-${article.documentId}`,
    title: article.title,
    slug: {
      _type: 'slug',
      current: article.slug
    },
    excerpt: article.description,
    content: blockContent,
    coverImage: coverImageRef,
    date: article.createdAt,
    publishedAt: article.publishedAt,
    // Add default category - you might want to create categories first
    categories: []
  };
  
  return sanityPost;
}

// Main migration function
async function migrateArticles() {
  console.log('Starting migration from Strapi to Sanity...');
  
  try {
    // Fetch articles from Strapi
    const articles = await fetchStrapiArticles();
    console.log(`Found ${articles.length} articles to migrate`);
    
    // Convert and create posts in Sanity
    const results = [];
    
    for (const article of articles) {
      try {
        const sanityPost = await convertArticleToPost(article);
        
        // Create or update the post in Sanity
        const result = await sanityClient.createOrReplace(sanityPost);
        results.push(result);
        
        console.log(`✅ Migrated: ${article.title}`);
      } catch (error) {
        console.error(`❌ Error migrating ${article.title}:`, error);
      }
    }
    
    console.log(`\n🎉 Migration completed! ${results.length} articles migrated.`);
    
    // Save migration log
    fs.writeFileSync('migration-log.json', JSON.stringify({
      timestamp: new Date().toISOString(),
      migratedCount: results.length,
      totalCount: articles.length,
      results: results
    }, null, 2));
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateArticles();
}

module.exports = {
  migrateArticles,
  convertArticleToPost,
  fetchStrapiArticles
};