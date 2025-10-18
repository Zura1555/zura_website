"use client";

import React, { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Globe, 
  Tag,
  CheckCircle,
  Dot,
  User,
  CalendarDays
} from "lucide-react";

interface BlogClientComponentProps {
  initialPosts: BlogPost[];
}

export function BlogClientComponent({ initialPosts }: BlogClientComponentProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    if (selectedCategory === "All") {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      const filtered = posts.filter(
        (post) =>
          (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
          post.category === selectedCategory
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, selectedCategory, posts]);

  const categoryCounts = posts.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count]) => ({
      name,
      icon: <Tag className="h-5 w-5" />, count,
    }));

  const categories = [
    { name: 'All', icon: <Globe className="h-5 w-5" />, count: posts.length },
    ...sortedCategories,
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative w-full h-64 sm:h-80 bg-primary/10">
        <Image
          src="/banner/blog-banner.png"
          alt="Blog banner"
          fill
          className="object-cover opacity-20"
          data-ai-hint="blog banner"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground px-4">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">From My Desk</h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-foreground/80">
            A collection of thoughts, tutorials, and reflections on design, technology, and life.
          </p>
        </div>
      </section>

      {/* Search and Content Section */}
      <div className="container mx-auto max-w-7xl py-8 sm:py-12 px-4 -mt-12 sm:-mt-16">
        {/* Search Bar */}
        <div className="relative mb-8 sm:mb-12">
          <div className="relative">
            <Input
              placeholder="Explore articles..."
              className="h-12 sm:h-14 pl-4 sm:pl-6 pr-14 sm:pr-16 text-base sm:text-lg bg-card border-2 border-border focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button size="icon" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h3 className="px-2 sm:px-4 mb-2 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase">Categories</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1 lg:space-y-1">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start h-10 sm:h-12 px-2 sm:px-4 text-sm sm:text-md ${
                        selectedCategory === category.name ? 'bg-muted font-semibold' : 'text-muted-foreground'
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center gap-2 flex-grow">
                        {category.icon}
                        <span className="flex-grow text-left truncate">{category.name}</span>
                        <Badge variant={selectedCategory === category.name ? 'default' : 'secondary'} className="rounded-md text-xs">{category.count.toLocaleString()}</Badge>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Content - Blog Posts */}
          <main className="lg:col-span-3">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{filteredPosts.length} Posts Found</h2>
            <div className="space-y-4 sm:space-y-6">
              {filteredPosts.map((post) => {
                 const author = post.author || { name: 'Author', avatar: 'https://placehold.co/100x100.png', aiHint: 'person avatar' };
                 const authorName = author.name || 'Author';

                return (
                  <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <Card className="p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="relative w-full sm:w-48 h-40 sm:h-32 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title || 'Blog post image'}
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint={post.aiHint || 'blog post'}
                          />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <h3 className="font-headline text-lg sm:text-xl font-semibold">{post.title}</h3>
                          <p className="text-muted-foreground mt-1 text-xs sm:text-sm flex-grow line-clamp-2 sm:line-clamp-3">{post.summary}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground mt-2 sm:mt-3">
                            <div className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5" />
                              <span>{authorName}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 sm:mt-3">
                            <Badge variant="secondary" className="py-0.5 px-2 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                            {post.category && <Badge variant="outline" className="text-xs">{post.category}</Badge>}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
