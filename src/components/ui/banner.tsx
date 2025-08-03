import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogBannerProps {
  title: string;
  description: string;
  author: { name: string; avatar: string; aiHint: string };
  date: string;
  category?: string;
  readTime?: string;
}

const BlogBanner: React.FC<BlogBannerProps> = ({ 
  title, 
  description, 
  author, 
  date, 
  category,
  readTime = "5 min read"
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="bg-background text-foreground py-16 px-4">
      <div className="mx-auto text-center" style={{ maxWidth: '866px' }}>
        {/* Breadcrumbs */}
        <nav className="text-sm text-yellow-500 mb-6 font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">»</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">»</span>
          <span className="text-yellow-400">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="font-luckiest text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Author and Meta Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={author.avatar} alt={author.name} data-ai-hint={author.aiHint} />
              <AvatarFallback className="text-lg">{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="text-muted-foreground">Authored by</div>
              <div className="font-semibold text-foreground text-base">{author.name}</div>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden sm:block w-px h-12 bg-border"></div>

          {/* Date and Read Time */}
          <div className="text-center">
            <div className="text-muted-foreground mb-1">Last updated: {formatDate(date)}</div>
            <div className="text-yellow-500 font-medium">{readTime}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;

