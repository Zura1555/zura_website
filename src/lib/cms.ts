import type { BlogPost, Album } from './types';

const blogPosts: BlogPost[] = [
  {
    slug: 'the-art-of-minimalism',
    title: 'The Art of Minimalism in Web Design',
    date: '2024-07-15',
    summary: 'Exploring how less can be more in creating beautiful and functional websites. This post delves into the principles of minimalist design.',
    content: '<p>Minimalism is not about lacking something. It is about the perfection of what is there. In web design, this translates to a clean, uncluttered interface that focuses on the user\'s journey. We\'ll look at examples from pioneers in the industry and break down what makes their designs so effective. Key takeaways include the use of white space, typography, and a limited color palette.</p><p>By stripping away unnecessary elements, we allow the core message to shine. This approach not only improves aesthetics but also enhances usability and performance. A minimalist site is often faster to load and easier to navigate, providing a superior user experience.</p>',
    author: {
      name: 'Jane Doe',
      avatar: 'https://placehold.co/100x100',
      aiHint: 'woman portrait',
    },
    image: 'https://placehold.co/1200x630',
    aiHint: 'minimalist design',
  },
  {
    slug: 'journey-into-react',
    title: 'A Developer\'s Journey into React',
    date: '2024-06-28',
    summary: 'A personal reflection on learning React, the challenges faced, and the rewarding moments of building complex applications.',
    content: '<p>My journey into React started with a simple "Hello, World!" and quickly escalated into a deep dive into hooks, state management, and the virtual DOM. It was challenging, but every solved bug and successfully implemented feature felt like a major victory.</p><p>This post is for anyone starting their own journey. I\'ll share resources that I found helpful, common pitfalls to avoid, and the mindset that helped me persevere. Remember, the key is consistent practice and building projects, no matter how small.</p>',
    author: {
      name: 'Jane Doe',
      avatar: 'https://placehold.co/100x100',
      aiHint: 'woman portrait',
    },
    image: 'https://placehold.co/1200x630',
    aiHint: 'code screen',
  },
  {
    slug: 'sustainable-living-tips',
    title: 'Small Changes for a More Sustainable Lifestyle',
    date: '2024-05-10',
    summary: 'Discover practical and easy-to-implement tips for living a more eco-friendly life, one small step at a time.',
    content: '<p>Sustainability can feel like an overwhelming goal, but it doesn\'t have to be. This post breaks it down into manageable steps. From reducing plastic use in the kitchen to making conscious fashion choices, every small change contributes to a larger impact.</p><p>We\'ll cover topics like composting, creating a zero-waste kit, and supporting local, sustainable businesses. It\'s about progress, not perfection. Join me in making a positive impact on our planet.</p>',
    author: {
      name: 'Jane Doe',
      avatar: 'https://placehold.co/100x100',
      aiHint: 'woman portrait',
    },
    image: 'https://placehold.co/1200x630',
    aiHint: 'nature green',
  },
];

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

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return new Promise(resolve => setTimeout(() => resolve(blogPosts), 500));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(blogPosts.find(p => p.slug === slug)), 500));
};

export const getGalleryAlbums = async (): Promise<Album[]> => {
    return new Promise(resolve => setTimeout(() => resolve(galleryAlbums), 500));
};
