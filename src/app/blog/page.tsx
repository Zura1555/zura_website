import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/cms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">From My Desk</h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          A collection of thoughts, tutorials, and reflections on design, technology, and life.
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const author = post.author || { name: 'Author', avatar: 'https://placehold.co/100x100.png', aiHint: 'person avatar' };
          const authorName = author.name || 'Author';

          return (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image || 'https://placehold.co/600x400.png'}
                      alt={post.title || 'Blog post image'}
                      fill
                      className="object-cover"
                      data-ai-hint={post.aiHint || 'blog post'}
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">Development</Badge>
                    <CardTitle className="font-headline text-xl leading-snug">{post.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{post.summary}</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={author.avatar} alt={authorName} data-ai-hint={author.aiHint} />
                      <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{authorName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
