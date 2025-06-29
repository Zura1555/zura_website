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
  console.log("Attempting to fetch blog posts from Firestore...");
  try {
    const postsCollection = collection(db, 'blogPosts');
    // Note: Firestore's orderBy requires a matching index. 
    // If your posts don't appear, check the Firestore console for an index creation link in the error logs. 
    // Also, documents without a 'publish_date' field will be excluded from this query.
    const q = query(postsCollection, orderBy('publish_date', 'desc'));
    const querySnapshot = await getDocs(q);

    console.log(`Found ${querySnapshot.docs.length} blog post(s) matching query.`);

    if (querySnapshot.docs.length === 0) {
      console.log("If you have posts in Firestore, check the following:");
      console.log("1. Your 'blogPosts' collection exists and has documents.");
      console.log("2. Your Firestore security rules allow read access to 'blogPosts'.");
      console.log("3. Each document has a 'date' field of type Timestamp.");
    }

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
    console.error("\n--- ERROR FETCHING BLOG POSTS ---");
    console.error(error);
    console.error("This could be due to incorrect Firebase security rules or a missing Firestore index.");
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
      const data = docSnap.data();
      const date = data.date?.toDate ? data.date.toDate().toISOString() : data.date;
      return {
        ...data,
        slug: docSnap.id,
        date,
      } as BlogPost;
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
