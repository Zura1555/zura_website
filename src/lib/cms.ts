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

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore returns timestamps, so we convert them to ISO strings for consistency
      const date = data.date?.toDate ? data.date.toDate().toISOString() : data.date;
      return {
        ...data,
        slug: doc.id,
        date,
      } as BlogPost;
    });

    return posts;
  } catch (error) {
    console.error("Error fetching blog posts from Firestore:", error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const docRef = doc(db, 'blogPosts', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const date = data.date?.toDate ? data.date.toDate().toISOString() : data.date;
      return {
        ...data,
        slug: docSnap.id,
        date,
      } as BlogPost;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return undefined;
  }
};

export const getGalleryAlbums = async (): Promise<Album[]> => {
    return new Promise(resolve => setTimeout(() => resolve(galleryAlbums), 500));
};
