export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  description?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    aiHint: string;
  };
  image: string;
  aiHint: string;
  category?: string;
}

// Strapi-specific types
export interface StrapiBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
    email: string;
    avatar?: {
      url: string;
    };
  };
  category?: {
    name: string;
    slug: string;
  };
  blocks?: StrapiBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string;
  avatar?: {
    url: string;
    alternativeText?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Album {
  name: string;
  photos: {
    src: string;
    alt: string;
    aiHint: string;
  }[];
}
