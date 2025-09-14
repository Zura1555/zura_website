import type { BlogPost, Album, StrapiArticle, StrapiAuthor, StrapiCategory } from './types';
import axios from 'axios';

// Strapi API configuration
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://uplifting-champion-8a8387e8ac.strapiapp.com/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Create axios instance with default headers
const strapiApi = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const galleryAlbums: Album[] = [
    {
        name: 'Landscapes',
        photos: [
            { src: 'https://placehold.co/600x400', alt: 'Misty mountains at dawn', aiHint: 'misty mountains' },
            { src: 'https://placehold.co/400x600', alt: 'Golden desert dunes under the sun', aiHint: 'desert dunes' },
            { src: 'https://placehold.co/600x400', alt: 'A serene lake reflecting the blue sky', aiHint: 'serene lake' },
            { src: 'https://placehold.co/600x400', alt: 'A dense forest with sunbeams filtering through', aiHint: 'dense forest' },
            { src: 'https://placehold.co/400x600', alt: 'A dramatic coastal cliffside', aiHint: 'coastal cliffside' },
            { src: 'https://placehold.co/600x400', alt: 'A vibrant field of wildflowers', aiHint: 'wildflower field' },
        ],
    },
    {
        name: 'Projects',
        photos: [
            { src: 'https://placehold.co/600x400', alt: 'A modern architectural design sketch', aiHint: 'architectural sketch' },
            { src: 'https://placehold.co/600x400', alt: 'A screenshot of a web application dashboard', aiHint: 'web dashboard' },
            { src: 'https://placehold.co/400x600', alt: 'A handcrafted wooden chair', aiHint: 'woodworking craft' },
            { src: 'https://placehold.co/600x400', alt: 'A ceramic pot on a pottery wheel', aiHint: 'pottery wheel' },
            { src: 'https://placehold.co/600x400', alt: 'A beautiful logo design presentation', aiHint: 'logo design' },
        ],
    },
    {
        name: 'Portraits',
        photos: [
            { src: 'https://placehold.co/400x600', alt: 'A black and white portrait of a man', aiHint: 'man portrait' },
            { src: 'https://placehold.co/400x600', alt: 'A woman smiling in a sunlit field', aiHint: 'woman smiling' },
            { src: 'https://placehold.co/400x600', alt: 'A candid shot of a child laughing', aiHint: 'child laughing' },
            { src: 'https://placehold.co/400x600', alt: 'An elderly person with expressive eyes', aiHint: 'elderly portrait' },
        ],
    }
];

function fixImageUrl(url: unknown): string {
    const placeholder = 'https://placehold.co/1000x600.png';
    if (typeof url !== 'string' || url.trim() === '') {
        return placeholder;
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl.startsWith('http') || trimmedUrl.startsWith('/')) {
        return trimmedUrl;
    }
    // It's a relative path, like "images/foo.png". Prepend a slash.
    return `/${trimmedUrl}`;
}


// Helper function to process Strapi blocks into markdown content
function processBlocks(blocks: any[]): { content: string; summary: string } {
  let markdownContent = '';
  let textContent = '';

  if (!Array.isArray(blocks)) {
    return { content: '', summary: '' };
  }

  blocks.forEach((block) => {
    switch (block.__component) {
      case 'shared.rich-text':
        if (block.body) {
          markdownContent += block.body + '\n\n';
          textContent += block.body.replace(/[#*_~`]/g, '') + ' ';
        }
        break;
      case 'shared.quote':
        if (block.body) {
          markdownContent += `> ${block.body}\n\n`;
          if (block.author) {
            markdownContent += `*— ${block.author}*\n\n`;
          }
          textContent += block.body + ' ';
        }
        break;
      case 'shared.media':
        if (block.file?.url) {
          const imageUrl = block.file.url.startsWith('http') ? block.file.url : `${STRAPI_API_URL.replace('/api', '')}${block.file.url}`;
          markdownContent += `![${block.file.alternativeText || 'Image'}](${imageUrl})\n\n`;
        }
        break;
      case 'shared.slider':
        if (block.files && Array.isArray(block.files)) {
          markdownContent += '\n<div class="slider-gallery">\n\n';
          block.files.forEach((file: any, index: number) => {
            if (file.url) {
              const imageUrl = file.url.startsWith('http') ? file.url : `${STRAPI_API_URL.replace('/api', '')}${file.url}`;
              markdownContent += `![${file.alternativeText || `Slider Image ${index + 1}`}](${imageUrl})\n\n`;
            }
          });
          markdownContent += '</div>\n\n';
        }
        break;
      default:
        // Handle any other block types generically
        if (block.body || block.text) {
          const content = block.body || block.text;
          markdownContent += content + '\n\n';
          textContent += content.replace(/[#*_~`]/g, '') + ' ';
        }
        break;
    }
  });

  const summary = textContent.trim().substring(0, 120) + (textContent.trim().length > 120 ? '...' : '');
  
  return {
    content: markdownContent.trim(),
    summary: summary || 'No summary available.'
  };
}

// Helper function to convert Strapi article to BlogPost
function mapStrapiArticleToBlogPost(article: StrapiArticle): BlogPost {
  const { content, summary } = processBlocks(article.blocks || []);

  // Handle cover image URL
  let coverImageUrl = 'https://placehold.co/1000x600.png';
  if (article.cover?.url) {
    coverImageUrl = article.cover.url.startsWith('http') 
      ? article.cover.url 
      : `${STRAPI_API_URL.replace('/api', '')}${article.cover.url}`;
  }

  // Handle author avatar URL
  let authorAvatar = 'https://placehold.co/100x100.png';
  if (article.author?.avatar?.url) {
    authorAvatar = article.author.avatar.url.startsWith('http')
      ? article.author.avatar.url
      : `${STRAPI_API_URL.replace('/api', '')}${article.author.avatar.url}`;
  }

  return {
    slug: article.slug,
    title: article.title || 'Untitled Post',
    date: article.publishedAt || article.createdAt,
    summary: article.description || summary,
    content: content || 'No content available.',
    category: article.category?.name,
    author: {
      name: article.author?.name || 'Zura',
      avatar: authorAvatar,
      aiHint: 'person avatar'
    },
    image: coverImageUrl,
    aiHint: article.title?.toLowerCase().split(' ').slice(0, 2).join(' ') || 'blog post',
  };
}


export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Attempting to fetch blog posts from Strapi...");
  try {
    const response = await strapiApi.get('/articles', {
      params: {
        populate: {
          cover: true,
          author: {
            populate: ['avatar']
          },
          category: true,
          blocks: {
            populate: '*'
          }
        },
        sort: 'publishedAt:desc',
        'publicationState': 'live'
      }
    });

    const articles: StrapiArticle[] = response.data.data;
    console.log(`Found ${articles.length} blog post(s) from Strapi.`);

    if (articles.length === 0) {
      console.log("No published articles found in Strapi. Check:");
      console.log("1. Your Strapi server is running and accessible.");
      console.log("2. You have published articles in your Strapi admin.");
      console.log("3. The API token has proper permissions.");
    }

    const posts = articles.map(mapStrapiArticleToBlogPost);
    return posts;

  } catch (error) {
    console.error("\n--- ERROR FETCHING BLOG POSTS FROM STRAPI ---");
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(`Status: ${error.response?.status}`);
      console.error(`Response:`, error.response?.data);
    }
    console.error("Check your Strapi server connection and API token.");
    console.error("-------------------------------------------------\n");
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  console.log(`Attempting to fetch blog post with slug: ${slug} from Strapi`);
  try {
    const response = await strapiApi.get('/articles', {
      params: {
        filters: { slug },
        populate: {
          cover: true,
          author: {
            populate: ['avatar']
          },
          category: true,
          blocks: {
            populate: '*'
          }
        },
        'publicationState': 'live'
      }
    });

    const articles: StrapiArticle[] = response.data.data;

    if (articles.length > 0) {
      console.log(`Found blog post with slug: ${slug}`);
      return mapStrapiArticleToBlogPost(articles[0]);
    } else {
      console.log(`No blog post found with slug: ${slug}`);
      return undefined;
    }
  } catch (error) {
    console.error('\n--- ERROR FETCHING BLOG POST from Strapi with slug ' + slug + ' ---');
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(`Status: ${error.response?.status}`);
      console.error(`Response:`, error.response?.data);
    }
    console.error("Check your Strapi server connection and API token.");
    console.error("-----------------------------------------------------\n");
    return undefined;
  }
};

export const getGalleryAlbums = async (): Promise<Album[]> => {
    return new Promise(resolve => setTimeout(() => resolve(galleryAlbums), 500));
};

// Additional Strapi helper functions
export const getCategories = async (): Promise<StrapiCategory[]> => {
  try {
    const response = await strapiApi.get('/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getAuthors = async (): Promise<StrapiAuthor[]> => {
  try {
    const response = await strapiApi.get('/authors', {
      params: {
        populate: ['avatar']
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    const response = await strapiApi.get('/articles', {
      params: {
        filters: { category: { slug: categorySlug } },
        populate: {
          cover: true,
          author: {
            populate: ['avatar']
          },
          category: true,
          blocks: {
            populate: '*'
          }
        },
        sort: 'publishedAt:desc',
        'publicationState': 'live'
      }
    });

    const articles: StrapiArticle[] = response.data.data;
    return articles.map(mapStrapiArticleToBlogPost);
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
};
