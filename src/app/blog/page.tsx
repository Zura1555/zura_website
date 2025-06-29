
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/cms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Globe, 
  Gamepad2, 
  Film, 
  GraduationCap, 
  FlaskConical, 
  Music,
  CheckCircle,
  Dot,
  User,
  CalendarDays
} from "lucide-react";

export const dynamic = 'force-dynamic';

const categories = [
  { name: 'All', icon: <Globe className="h-5 w-5" />, count: 32429 },
  { name: 'Development', icon: <Gamepad2 className="h-5 w-5" />, count: 24464 },
  { name: 'Design', icon: <Film className="h-5 w-5" />, count: 13515 },
  { name: 'Tutorials', icon: <GraduationCap className="h-5 w-5" />, count: 2529 },
  { name: 'Tech', icon: <FlaskConical className="h-5 w-5" />, count: 2408 },
  { name: 'Life', icon: <Music className="h-5 w-5" />, count: 2341 },
];


export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative w-full h-80 bg-primary/10">
        <Image
          src="https://placehold.co/1920x480"
          alt="Abstract background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="abstract community background"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">From My Desk</h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            A collection of thoughts, tutorials, and reflections on design, technology, and life.
          </p>
        </div>
      </section>

      {/* Search and Content Section */}
      <div className="container mx-auto max-w-7xl py-12 px-4 -mt-16">
        {/* Search Bar */}
        <div className="relative mb-12">
            <div className="relative">
                <Input
                placeholder="Explore articles..."
                className="h-14 pl-6 pr-16 text-lg bg-card border-2 border-border focus:border-primary"
                />
                <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10">
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="px-4 mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">Categories</h3>
              <ul className="space-y-1">
                {categories.map((category, index) => (
                  <li key={category.name}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start h-12 px-4 text-md ${
                        index === 0 ? 'bg-muted font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      {category.icon}
                      <span className="flex-grow text-left">{category.name}</span>
                      <Badge variant={index === 0 ? 'default' : 'secondary'} className="rounded-md">{category.count.toLocaleString()}</Badge>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Content - Blog Posts */}
          <main className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-6">{posts.length} Posts Found</h2>
            <div className="space-y-6">
              {posts.map((post) => {
                 const author = post.author || { name: 'Author', avatar: 'https://placehold.co/100x100.png', aiHint: 'person avatar' };
                 const authorName = author.name || 'Author';

                return (
                  <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <Card className="p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
                                <Image
                                src={post.image || 'https://placehold.co/400x300.png'}
                                alt={post.title || 'Blog post image'}
                                fill
                                className="object-cover rounded-lg"
                                data-ai-hint={post.aiHint || 'blog post'}
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="font-headline text-xl font-semibold">{post.title}</h3>
                                <p className="text-muted-foreground mt-1 text-sm flex-grow">{post.summary}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                                    <div className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        <span>{authorName}</span>
                                    </div>
                                    <Dot />
                                    <div className="flex items-center gap-1.5">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Badge variant="secondary" className="py-1 px-2.5">
                                        <CheckCircle className="h-4 w-4 mr-1.5" />
                                        Published
                                    </Badge>
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
