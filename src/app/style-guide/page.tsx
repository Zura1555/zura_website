import ReactMarkdown from 'react-markdown';

const markdownContent = `
# Heading 1
This is a paragraph of text. It's designed to give you a feel for the body copy. **This part is bold**, and *this part is emphasized (italic)*. The quick brown fox jumps over the lazy dog.

## Heading 2
Here's a bit more content under a level two heading.

### Heading 3
Now we're getting into the smaller headings.

#### Heading 4
This is a level four heading.

##### Heading 5
And a level five.

###### Heading 6
Finally, a level six heading, which is often the smallest.

---

> This is a blockquote. It's perfect for highlighting a key piece of information or a quote from a source. It should stand out visually from the rest of the content.

Here are some lists.

**Unordered List:**
- Item one
- Item two
- Item three

**Ordered List:**
1. First item
2. Second item
3. Third item
`;

export default function StyleGuidePage() {
  return (
    <article className="container mx-auto max-w-5xl py-12 px-2 animate-in fade-in duration-500">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Rich Text Style Guide</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page demonstrates how different rich text elements from the CMS will be styled.
        </p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90 font-light">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </article>
  );
}
