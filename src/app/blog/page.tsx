import { getBlogPosts } from "@/lib/cms";
import { BlogClientComponent } from "@/components/blog-client-component";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from 'next';
import { logger } from "@/lib/logger";

export const metadata: Metadata = {
  title: 'Blog | Zura',
  description: 'Explore my collection of blog posts covering project insights, technical experiments, and learnings from my journey as a developer. Topics include web development, programming, and tech insights.',
  keywords: ['blog', 'tech', 'programming', 'web development', 'coding', 'software engineering'],
  openGraph: {
    title: 'Blog | Zura',
    description: 'Explore my collection of blog posts covering project insights, technical experiments, and learnings from my journey as a developer.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Zura',
    description: 'Explore my collection of blog posts covering project insights, technical experiments, and learnings.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog`,
  },
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    logger.info('🔄 Starting to fetch blog posts...');
    posts = await getBlogPosts();
    logger.info('✅ Successfully fetched posts:', posts.length);
  } catch (err) {
    logger.error('❌ Error fetching posts:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch posts';
  }

  if (error) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="container mx-auto max-w-7xl py-12 px-4">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">Failed to load blog posts</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return <BlogClientComponent initialPosts={posts} />;
}
