import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/cms';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  FileText,
  Camera,
  Clock,
  Mail,
  ExternalLink,
  Calendar,
  Folder,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | Zura',
  description: 'A comprehensive overview of all pages, blog posts, and content on Zura\'s website. Explore the complete site structure.',
  keywords: ['sitemap', 'site structure', 'pages', 'navigation', 'blog posts'],
  openGraph: {
    title: 'Sitemap | Zura',
    description: 'A comprehensive overview of all pages and content on Zura\'s website.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap-page`,
  },
  twitter: {
    card: 'summary',
    title: 'Sitemap | Zura',
    description: 'A comprehensive overview of all pages and content on Zura\'s website.',
    creator: '@yourtwitterhandle',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap-page`,
  },
};

// Static page definitions with icons
const staticPages = [
  {
    title: 'Home',
    description: 'Welcome to my portfolio and blog - the starting point of my digital journey',
    url: '/',
    icon: Home,
    priority: 'High',
  },
  {
    title: 'Blog',
    description: 'Insights, tutorials, and thoughts on web development, AI, and tech',
    url: '/blog',
    icon: BookOpen,
    priority: 'High',
  },
  {
    title: 'Gallery',
    description: 'A visual journey through my projects, travels, and moments of inspiration',
    url: '/gallery',
    icon: Camera,
    priority: 'Medium',
  },
  {
    title: 'Milestones',
    description: 'My professional journey and career milestones',
    url: '/milestones',
    icon: Clock,
    priority: 'Medium',
  },
  {
    title: 'Contact',
    description: 'Get in touch - I\'m always open to interesting conversations',
    url: '/contact',
    icon: Mail,
    priority: 'Low',
  },
  {
    title: 'Studio',
    description: 'Sanity CMS - Content management system',
    url: '/studio',
    icon: Folder,
    priority: 'Internal',
  },
];

// Page type badge colors
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-primary/20 text-primary hover:bg-primary/30';
    case 'Medium':
      return 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/30';
    case 'Low':
      return 'bg-muted/50 text-muted-foreground hover:bg-muted/70';
    default:
      return 'bg-accent/20 text-accent-foreground hover:bg-accent/30';
  }
};

export default async function SitemapPage() {
  const posts = await getBlogPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Sitemap
        </h1>
        <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
          A comprehensive overview of all pages, blog posts, and content on my website.
          Explore the complete site structure and find what you're looking for.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>{staticPages.length} Main Pages</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary"></div>
            <span>{posts.length} Blog Posts</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent"></div>
            <span>{staticPages.length + posts.length} Total Pages</span>
          </div>
        </div>
      </section>

      {/* Static Pages Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Main Pages</h2>
            <p className="text-sm text-muted-foreground">Primary sections of the website</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {staticPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.url} href={page.url}>
                <Card className="h-full transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {page.description}
                    </CardDescription>
                    <div className="mt-4">
                      <Badge variant="secondary" className={getPriorityColor(page.priority)}>
                        {page.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <p className="text-sm text-muted-foreground">
              Latest articles and insights on web development and technology
            </p>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:shadow-secondary/5 hover:border-secondary/50 group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-lg mt-4 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {post.summary && (
                      <CardDescription className="text-sm line-clamp-3 mb-3">
                        {post.summary}
                      </CardDescription>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Read more
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No blog posts published yet.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Footer Stats */}
      <section className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{staticPages.length}</span>
            <span>Main Pages</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{posts.length}</span>
            <span>Blog Posts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{staticPages.length + posts.length}</span>
            <span>Total Pages</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </section>
    </div>
  );
}
