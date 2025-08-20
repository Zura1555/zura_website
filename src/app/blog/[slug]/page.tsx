
import React from "react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { slugify } from "@/lib/utils";
import { TableOfContents } from "@/components/table-of-contents";
import BlogBanner from "@/components/ui/banner";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await getBlogPostBySlug(slug);
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
    <div className="animate-in fade-in duration-500">
      {/* Blog Banner */}
      <BlogBanner
        title={post.title}
        description={post.description || post.summary}
        author={author}
        date={post.date}
        category={post.category}
      />
      
      {/* Main Content */}
      <div className="container mx-auto max-w-full py-12 px-4">
        <div className="flex justify-center gap-12">
          {/* Main article content - wider width */}
          <article className="max-w-[900px] w-full">
            <div className="my-12">
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
              className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90 font-light prose-img:rounded-lg prose-img:shadow-md prose-img:w-[80%] prose-img:h-auto prose-img:mx-auto prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: renderHeading(1),
                  h2: renderHeading(2),
                  h3: renderHeading(3),
                  h4: renderHeading(4),
                  h5: renderHeading(5),
                  h6: renderHeading(6),
                  img: ({ src, alt, ...props }) => (
                    <div className="flex justify-center">
                      <Image
                        src={src || ''}
                        alt={alt || 'Blog image'}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-md w-[80%] h-auto"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                      />
                    </div>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className="border-l-4 border-primary bg-muted/50 rounded-r-md text-muted-foreground"
                      style={{ fontSize: '17px', fontStyle: 'normal', padding: '16px 24px', marginBottom: '0' }}
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code
                        className="bg-muted px-1 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children, ...props }) => (
                    <pre
                      className="bg-muted border rounded-lg p-4 overflow-x-auto my-4"
                      {...props}
                    >
                      {children}
                    </pre>
                  ),
                  div: ({ children, className, ...props }) => {
                    if (className === 'slider-gallery') {
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 rounded-lg overflow-hidden" {...props}>
                          {children}
                        </div>
                      );
                    }
                    return <div className={className} {...props}>{children}</div>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
          
          {/* Sticky Table of Contents - positioned to the right of main content */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>
    </div>
  );
}
