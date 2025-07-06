
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return <div>Error loading post.</div>;
  }

  console.log("Fetched Post:", post); 

  if (!post) {
    notFound();
  }
  
  const author = post.author || { name: 'Author', avatar: 'https://placehold.co/100x100.png', aiHint: 'person avatar' };
  const authorName = author.name || 'Author';

  return (
    <article className="container mx-auto max-w-6xl py-12 px-2 animate-in fade-in duration-500">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
        <div className="mt-6 flex justify-center items-center gap-4 text-muted-foreground">
          {post.category && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted-foreground/10">
              {post.category}
            </span>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar} alt={authorName} data-ai-hint={author.aiHint} />
                <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{authorName}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </div>
      </header>
      <div className="relative my-12 h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={post.image}
          alt={post.title || 'Blog post image'}
          fill
          className="object-cover"
          data-ai-hint={post.aiHint || 'blog post'}
          priority
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90 font-light"
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
