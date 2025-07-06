import ReactMarkdown from 'react-markdown';

const markdownContent = `
# Heading 1: The Quick Brown Fox

This is a paragraph of text to see how the body copy looks. It's important for readability and overall aesthetic. The quick brown fox jumps over the lazy dog.

## Heading 2: Jumps Over the Lazy Dog

Here is some more text. This time, we're introducing a list to see how that renders.

- Unordered list item one
- Unordered list item two
  - A nested list item
- Unordered list item three

And now for a numbered list:

1.  Ordered list item one
2.  Ordered list item two
3.  Ordered list item three

> This is a blockquote. It's often used for highlighting a quote or a key piece of information. It should stand out from the rest of the text.

Here is some inline \`code\`. And below is a full code block:

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');
\`\`\`

And finally, a horizontal rule to separate sections.

---

This is the end of the style guide.
`;

export default function StyleGuidePage() {
  return (
    <article className="container mx-auto max-w-3xl py-12 px-3 animate-in fade-in duration-500">
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
