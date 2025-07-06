
import type { BlogPost, Album } from './types';
import { db } from './firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';

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
    const placeholder = 'https://placehold.co/800x600.png';
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


function mapDocToBlogPost(doc: any): BlogPost {
    const data = doc.data();
    const slug = doc.id;
    const title = data.name || 'Untitled Post';
    const content = data.content;

    let contentText = ''; // Used for generating a summary
    let markdownContent = '';

    if (Array.isArray(content)) {
        content.forEach((item, index) => {
            const value = item.value || '';
            if (typeof value === 'string' && value) {
                // Avoid adding image URLs to the summary text
                if (item.type !== 'images') {
                    contentText += value + ' ';
                }
            }

            switch (item.type) {
                case 'text':
                    if (typeof value === 'string') {
                        markdownContent += value + '\n\n';
                    }
                    break;
                case 'quote':
                    if (typeof value === 'string') {
                        markdownContent += `> ${value.replace(/\n/g, '\n> ')}\n\n`;
                    }
                    break;
                case 'code':
                    if (typeof value === 'string') {
                        markdownContent += '```\n' + value + '\n```\n\n';
                    }
                    break;
                case 'images':
                    if (Array.isArray(item.value)) {
                        item.value.forEach((img: { url?: string, name?: string }) => {
                            if (img.url) {
                                markdownContent += `![${img.name || ''}](${fixImageUrl(img.url)})\n\n`;
                            }
                        });
                    } else if (typeof item.value === 'string' && item.value) {
                        markdownContent += `![Image from CMS](${fixImageUrl(item.value)})\n\n`;
                    }
                    break;
                case 'bullet_list_item':
                    if (typeof value === 'string') {
                        markdownContent += `* ${value}\n`;
                    }
                    // Add a newline after the last list item
                    if (index === content.length - 1 || content[index + 1]?.type !== 'bullet_list_item') {
                        markdownContent += '\n';
                    }
                    break;
                case 'numbered_list_item':
                    // This is a simplified approach. For proper numbering, we'd need to track the list index.
                    if (typeof value === 'string') {
                        markdownContent += `1. ${value}\n`;
                    }
                     // Add a newline after the last list item
                    if (index === content.length - 1 || content[index + 1]?.type !== 'numbered_list_item') {
                        markdownContent += '\n';
                    }
                    break;
                case 'todo_list_item':
                    if (typeof value === 'string') {
                        markdownContent += `* [${item.checked ? 'x' : ' '}] ${value}\n`;
                    }
                    // Add a newline after the last list item
                    if (index === content.length - 1 || content[index + 1]?.type !== 'todo_list_item') {
                        markdownContent += '\n';
                    }
                    break;
                default:
                    if (typeof value === 'string' && value) {
                        markdownContent += value + '\n\n';
                    }
                    break;
            }
        });
    } else if (typeof content === 'string') {
        // Fallback for plain string content
        markdownContent = content;
        contentText = content;
    }

    const summary = contentText.trim().substring(0, 120) + (contentText.length > 120 ? '...' : '');

    const headerImageData = data.header_image;
    let headerImageUrl = '';
    if (Array.isArray(headerImageData) && headerImageData.length > 0 && typeof headerImageData[0].url === 'string') {
        headerImageUrl = headerImageData[0].url;
    } else if (typeof headerImageData === 'string') {
        headerImageUrl = headerImageData;
    }

    return {
        slug: slug,
        title: title,
        date: data.publish_date?.toDate ? data.publish_date.toDate().toISOString() : new Date().toISOString(),
        summary: summary,
        content: markdownContent.trim(),
        category: data.category,
        author: {
            name: 'Zura',
            avatar: 'https://placehold.co/100x100.png',
            aiHint: 'person avatar'
        },
        image: fixImageUrl(headerImageUrl),
        aiHint: title.toLowerCase().split(' ').slice(0, 2).join(' ') || 'abstract',
    };
}


export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Attempting to fetch blog posts from Firestore...");
  try {
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, orderBy('publish_date', 'desc'));
    const querySnapshot = await getDocs(q);

    console.log(`Found ${querySnapshot.docs.length} blog post(s) matching query.`);

    if (querySnapshot.docs.length === 0) {
      console.log("If you have posts in Firestore, check the following:");
      console.log("1. Your 'blogPosts' collection exists and has documents.");
      console.log("2. Your Firestore security rules allow read access to 'blogPosts'.");
      console.log("3. Each document has a 'publish_date' field of type Timestamp.");
    }

    const posts = querySnapshot.docs.map(mapDocToBlogPost);
    return posts;

  } catch (error) {
    console.error("\n--- ERROR FETCHING BLOG POSTS ---");
    console.error(error);
    console.error("This could be due to incorrect Firebase security rules or a missing Firestore index for 'publish_date' on the 'blogPosts' collection.");
    console.error("Please ensure your rules allow public read access to the 'blogPosts' collection.");
    console.error("-----------------------------------\n");
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  console.log(`Attempting to fetch blog post with slug: ${slug}`);
  try {
    const docRef = doc(db, 'blogPosts', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Found document with slug '${slug}':`, docSnap.data());
      return mapDocToBlogPost(docSnap);
    } else {
        console.log(`No blog post found with slug: ${slug}`);
        return undefined;
    }
  } catch (error) {
    console.error(`\n--- ERROR FETCHING BLOG POST with slug ${slug} ---`);
    console.error(error);
    console.error("Check your Firestore security rules and ensure the document exists.");
    console.error("-----------------------------------------------------\n");
    return undefined;
  }
};

export const getGalleryAlbums = async (): Promise<Album[]> => {
    return new Promise(resolve => setTimeout(() => resolve(galleryAlbums), 500));
};
