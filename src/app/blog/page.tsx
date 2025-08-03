import { getBlogPosts } from "@/lib/cms";
import { BlogClientComponent } from "@/components/blog-client-component";
import type { BlogPost } from "@/lib/types";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    console.log('🔄 Starting to fetch blog posts...');
    posts = await getBlogPosts();
    console.log('✅ Successfully fetched posts:', posts.length);
  } catch (err) {
    console.error('❌ Error fetching posts:', err);
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
