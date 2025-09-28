"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CalendarDays, ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import WaveCard from '@/components/nurui/wave-card';
import { cn } from '@/lib/utils';

interface FlexibleBlogGridProps {
  posts: BlogPost[];
}

// Component for featured blog post (Grid A)
const FeaturedBlogPost = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <div className="h-full">
      <WaveCard 
        tags={post.category || "Blog"}
        title={post.title || "Untitled"}
        description={post.summary || "No description available"}
        buttonText="Read More"
        image={post.image}
        date={post.date}
        aiHint={post.aiHint}
      />
    </div>
  </Link>
);

// Component for compact blog post (Grid B)
const CompactBlogPost = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full h-32 mb-4 flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title || 'Blog post image'}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={post.aiHint || 'blog post'}
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors mb-3 flex-grow">
          {post.title}
        </h3>
        
        {/* Date and Category */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
          <CalendarDays className="h-3 w-3" />
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          {post.category && (
            <>
              <span>•</span>
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                {post.category}
              </Badge>
            </>
          )}
        </div>
      </div>
    </Card>
  </Link>
);

export function FlexibleBlogGrid({ posts }: FlexibleBlogGridProps) {
  const postCount = posts.length;

  // No posts
  if (postCount === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No blog posts found. Check your Strapi connection and ensure you have published articles.
        </p>
      </div>
    );
  }

  // Single post - 1 grid
  if (postCount === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <FeaturedBlogPost post={posts[0]} />
        </div>
      </div>
    );
  }

  // Two posts - 2 grid container
  if (postCount === 2) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {posts.map((post, index) => (
          <div key={post.slug} className="h-full">
            <FeaturedBlogPost post={post} />
          </div>
        ))}
      </div>
    );
  }

  // Three or more posts - Featured + Compact layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
      {/* Grid A - Latest featured post (2/3 width) */}
      <div className="lg:col-span-2 h-full">
        <FeaturedBlogPost post={posts[0]} />
      </div>

      {/* Grid B - Second and third latest posts in vertical layout (1/3 width) */}
      <div className="lg:col-span-1 flex flex-col gap-4 h-full">
        <div className="flex-1">
          <CompactBlogPost post={posts[1]} />
        </div>
        {posts[2] && (
          <div className="flex-1">
            <CompactBlogPost post={posts[2]} />
          </div>
        )}
        
        {/* View All link if there are more than 3 posts */}
        {postCount > 3 && (
          <Link 
            href="/blog" 
            className="group flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground hover:text-primary transition-colors border border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-lg mt-auto"
          >
            <span>View all {postCount} posts</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
