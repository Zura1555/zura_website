
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { slugify } from "@/lib/utils";
import { TableOfContents } from "@/components/table-of-contents";

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

  if (!post) {
    notFound();
  }
  
  const author = post.author || { name: 'Author', avatar: 'https://placehold.co/100x100.png', aiHint: 'person avatar' };
  const authorName = author.name || 'Author';

  // Extract headings for TOC. We are looking for lines starting with '#'
  const headingLines = post.content.match(/^#{1,6}\s.*$/gm) || [];
  const headings = headingLines.map(line => {
    const text = line.replace(/^#+\s*/, '').trim();
    const level = (line.match(/^#+/) || [''])[0].length;
    return {
      text,
      level,
      slug: slugify(text)
    };
  }).filter(h => h.level >= 1 && h.level <= 3); // Only include h1, h2, h3 in TOC

  const renderHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const Tag = `h${level}` as const;
    return ({ children }: { children?: React.ReactNode }) => {
      const text = React.Children.toArray(children).flat().join('');
      const slug = slugify(text);
      return <Tag id={slug}>{children}</Tag>;
    };
  };

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-12">
        <aside className="lg:col-span-1 mb-12 lg:mb-0">
          <TableOfContents headings={headings} />
        </aside>

        <article className="lg:col-span-3">
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
          <div className="my-12 flex justify-center">
            <Image
              src={post.image}
              alt={post.title || 'Blog post image'}
              width={680}
              height={450}
              className="rounded-lg shadow-lg object-cover"
              data-ai-hint={post.aiHint || 'blog post'}
              priority
            />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90 font-light"
          >
            <ReactMarkdown
              components={{
                h1: renderHeading(1),
                h2: renderHeading(2),
                h3: renderHeading(3),
                h4: renderHeading(4),
                h5: renderHeading(5),
                h6: renderHeading(6),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
