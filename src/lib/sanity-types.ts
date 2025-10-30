/**
 * TypeScript interfaces for Sanity Portable Text and Block Content
 */

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
}

export interface SanitySpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  children: SanitySpan[];
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
  level?: number;
  listItem?: 'bullet' | 'number';
}

export interface SanityCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}

export interface SanityImageBlock {
  _type: 'image';
  _key: string;
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
}

export type SanityBlockContent =
  | SanityBlock
  | SanityCodeBlock
  | SanityImageBlock
  | { _type: string; _key: string; [key: string]: unknown };

export interface SanityAuthor {
  firstName: string;
  lastName: string;
  picture?: SanityImage;
}

export interface SanityCategory {
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
  featured?: boolean;
  image?: SanityImage;
}

export interface SanityPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  date?: string;
  coverImage?: SanityImage;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  content: SanityBlockContent[];
  tags?: string[];
}
