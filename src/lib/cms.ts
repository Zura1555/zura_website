import type { BlogPost, Album } from './types';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w486ji4p',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published'
});

// Legacy client for admin operations
const sanityClientAdmin = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w486ji4p',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClientAdmin);

function urlFor(source: any) {
  return builder.image(source);
}

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


// Helper function to process Sanity blocks into markdown content
function processBlocks(blocks: any[]): { content: string; summary: string } {
  let markdownContent = '';
  let textContent = '';

  if (!Array.isArray(blocks)) {
    return { content: '', summary: '' };
  }

  blocks.forEach((block) => {
    switch (block._type) {
      case 'block':
        // Handle Sanity's portable text blocks
        if (block.children) {
          let blockText = block.children.map((child: any) => {
            let text = child.text || '';
            
            // Handle marks (bold, italic, etc.)
            if (child.marks && child.marks.length > 0) {
              child.marks.forEach((mark: string) => {
                switch (mark) {
                  case 'strong':
                    text = `**${text}**`;
                    break;
                  case 'em':
                    text = `*${text}*`;
                    break;
                  case 'code':
                    text = `\`${text}\``;
                    break;
                }
              });
            }
            return text;
          }).join('');

          // Handle block styles (headings, paragraphs, etc.)
          switch (block.style) {
            case 'h1':
              markdownContent += `# ${blockText}\n\n`;
              break;
            case 'h2':
              markdownContent += `## ${blockText}\n\n`;
              break;
            case 'h3':
              markdownContent += `### ${blockText}\n\n`;
              break;
            case 'h4':
              markdownContent += `#### ${blockText}\n\n`;
              break;
            case 'h5':
              markdownContent += `##### ${blockText}\n\n`;
              break;
            case 'h6':
              markdownContent += `###### ${blockText}\n\n`;
              break;
            case 'blockquote':
              markdownContent += `> ${blockText}\n\n`;
              break;
            default:
              markdownContent += `${blockText}\n\n`;
              break;
          }
          textContent += blockText.replace(/[#*_~`]/g, '') + ' ';
        }
        break;
      case 'image':
        if (block.asset) {
          const imageUrl = urlFor(block.asset).url();
          markdownContent += `![${block.alt || 'Image'}](${imageUrl})\n\n`;
        }
        break;
      case 'code':
        if (block.code) {
          const language = block.language || '';
          markdownContent += `\`\`\`${language}\n${block.code}\n\`\`\`\n\n`;
        }
        break;
      default:
        // Handle any other block types generically
        if (block.text || block.content) {
          const content = block.text || block.content;
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

// Helper function to convert Sanity post to BlogPost
function mapSanityPostToBlogPost(post: any): BlogPost {
  const { content, summary } = processBlocks(post.content || []);

  // Handle cover image URL
  let coverImageUrl = 'https://placehold.co/1000x600.png';
  if (post.coverImage?.asset) {
    coverImageUrl = urlFor(post.coverImage.asset).url();
  }

  // Handle author avatar URL
  let authorAvatar = 'https://placehold.co/100x100.png';
  if (post.author?.picture?.asset) {
    authorAvatar = urlFor(post.author.picture.asset).url();
  }

  // Handle author name - combine firstName and lastName
  const authorName = post.author 
    ? `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim()
    : 'Zura';

  // Handle categories - get the first category or default
  const categoryName = post.categories && post.categories.length > 0 
    ? post.categories[0].title 
    : undefined;

  return {
    slug: post.slug?.current || post.slug,
    title: post.title || 'Untitled Post',
    date: post.publishedAt || post.date || post._createdAt,
    summary: post.excerpt || summary,
    content: content || 'No content available.',
    category: categoryName,
    author: {
      name: authorName,
      avatar: authorAvatar,
      aiHint: 'person avatar'
    },
    image: coverImageUrl,
    aiHint: post.title?.toLowerCase().split(' ').slice(0, 2).join(' ') || 'blog post',
  };
}


export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Attempting to fetch blog posts from Sanity...");
  try {
    const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      publishedAt,
      date,
      coverImage {
        asset->,
        alt
      },
      author-> {
        firstName,
        lastName,
        picture {
          asset->,
          alt
        }
      },
      categories[]-> {
        title,
        slug
      },
      content,
      tags
    }`;

    const posts = await sanityClient.fetch(query);
    console.log(`Found ${posts.length} blog post(s) from Sanity.`);

    if (posts.length === 0) {
      console.log("No published posts found in Sanity. Check:");
      console.log("1. Your Sanity project is properly configured.");
      console.log("2. You have published posts in your Sanity studio.");
      console.log("3. The schema is properly deployed.");
    }

    const blogPosts = posts.map(mapSanityPostToBlogPost);
    return blogPosts;

  } catch (error) {
    console.error("\n--- ERROR FETCHING BLOG POSTS FROM SANITY ---");
    console.error(error);
    console.error("Check your Sanity client configuration and project setup.");
    console.error("-------------------------------------------------\n");
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  console.log(`Attempting to fetch blog post with slug: ${slug} from Sanity`);
  try {
    const query = `*[_type == "post" && slug.current == $slug && defined(publishedAt) && !startsWith(_id, "drafts.")][0] {
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      publishedAt,
      date,
      coverImage {
        asset->,
        alt
      },
      author-> {
        firstName,
        lastName,
        picture {
          asset->,
          alt
        }
      },
      categories[]-> {
        title,
        slug
      },
      content,
      tags
    }`;

    const post = await sanityClient.fetch(query, { slug });

    if (post) {
      console.log(`Found blog post with slug: ${slug}`);
      return mapSanityPostToBlogPost(post);
    } else {
      console.log(`No blog post found with slug: ${slug}`);
      return undefined;
    }
  } catch (error) {
    console.error('\n--- ERROR FETCHING BLOG POST from Sanity with slug ' + slug + ' ---');
    console.error(error);
    console.error("Check your Sanity client configuration and project setup.");
    console.error("-----------------------------------------------------\n");
    return undefined;
  }
};

export const getGalleryAlbums = async (): Promise<Album[]> => {
    return new Promise(resolve => setTimeout(() => resolve(galleryAlbums), 500));
};

// Additional Sanity helper functions
export const getCategories = async (): Promise<any[]> => {
  try {
    const query = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      featured,
      image {
        asset->,
        alt
      }
    }`;
    const categories = await sanityClient.fetch(query);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getAuthors = async (): Promise<any[]> => {
  try {
    const query = `*[_type == "person"] | order(firstName asc) {
      _id,
      firstName,
      lastName,
      picture {
        asset->,
        alt
      }
    }`;
    const authors = await sanityClient.fetch(query);
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    const query = `*[_type == "post" && $categorySlug in categories[]->slug.current && defined(publishedAt) && !startsWith(_id, "drafts.")] | order(publishedAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      publishedAt,
      date,
      coverImage {
        asset->,
        alt
      },
      author-> {
        firstName,
        lastName,
        picture {
          asset->,
          alt
        }
      },
      categories[]-> {
        title,
        slug
      },
      content,
      tags
    }`;

    const posts = await sanityClient.fetch(query, { categorySlug });
    return posts.map(mapSanityPostToBlogPost);
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
};
