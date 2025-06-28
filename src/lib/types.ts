export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    aiHint: string;
  };
  image: string;
  aiHint: string;
}

export interface Album {
  name: string;
  photos: {
    src: string;
    alt: string;
    aiHint: string;
  }[];
}
