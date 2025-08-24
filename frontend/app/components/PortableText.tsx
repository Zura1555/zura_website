/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
    h1: ({children, value}) => (
      <h1 id={value._key} className="text-4xl font-bold mb-4">
        <a href={`#${value._key}`} className="hover:underline">
          {children}
        </a>
      </h1>
    ),
    h2: ({children, value}) => (
      <h2 id={value._key} className="text-3xl font-semibold mb-3">
        <a href={`#${value._key}`} className="hover:underline">
          {children}
        </a>
      </h2>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 bg-gray-50 my-4 py-2">
        {children}
      </blockquote>
    ),
  },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div className={['prose prose-a:text-brand', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}
