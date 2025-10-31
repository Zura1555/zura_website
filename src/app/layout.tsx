import type { Metadata } from 'next';
import { Sora, Luckiest_Guy } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';
import { CriticalCSS } from '@/components/critical-css';
import { injectCriticalCSS } from '@/lib/critical-css';

// Optimize font loading with next/font
// Using 'optional' display to prevent render blocking
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600'], // Only load weights we actually use
  variable: '--font-sora',
  display: 'optional', // Don't block render, use fallback if font not ready
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Adjust fallback to match web font metrics
});

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest',
  display: 'swap', // Use swap for above-fold font to show faster
  preload: true, // Used in hero section above the fold
  fallback: ['cursive', 'system-ui'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    default: "Zura | Developer & Tech Blogger",
    template: "%s | Zura",
  },
  description: "You've found my little corner of the internet. By day, I work at Maison RMI. By night, I'm a hobbyist vibe-coder and a content blogger. Think of this as a collection of my findings, from project insights to project experiments.",
  keywords: ['Zura', 'developer', 'web development', 'tech blog', 'programming', 'software engineering', 'Maison RMI', 'portfolio'],
  authors: [{ name: 'Zura' }],
  creator: 'Zura',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    title: "Zura | Developer & Tech Blogger",
    description: "You've found my little corner of the internet. A collection of project insights, technical experiments, and learnings from my journey as a developer.",
    siteName: 'Zura',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zura | Developer & Tech Blogger",
    description: "Developer by day, hobbyist vibe-coder by night. Exploring tech, projects, and ideas.",
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", sora.variable, luckiestGuy.variable)}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `/* Critical CSS for above-the-fold content */
*{box-sizing:border-box}:after,:before{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:root{--background:252 67% 8%;--foreground:0 0% 98%;--card:252 67% 11%;--border:252 67% 30%;--primary:226 97% 65%;--muted:252 67% 16%;--muted-foreground:240 5% 75%}html{height:100%}body{min-height:100vh;background-color:hsl(var(--background));color:hsl(var(--foreground));display:flex;antialiased}.container{width:100%;max-width:1200px;margin:0 auto;padding:0 1rem}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.gap-8{gap:2rem}.items-center{align-items:center}.font-bold{font-weight:700}.text-6xl{font-size:3.75rem;line-height:1}.text-4xl{font-size:2.25rem;line-height:1.1}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-foreground{color:hsl(var(--foreground))}.text-primary{color:hsl(var(--primary))}.text-muted-foreground{color:hsl(var(--muted-foreground))}.py-12{padding-top:3rem;padding-bottom:3rem}.py-16{padding-top:4rem;padding-bottom:4rem}.mt-4{margin-top:1rem}.mt-3{margin-top:.75rem}.mb-4{margin-bottom:1rem}.max-w-md{max-width:28rem}.flex{display:flex}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.gap-3{gap:.75rem}.gap-4{gap:1rem}.inline-flex{display:inline-flex}.justify-center{justify-content:center}.rounded-lg{border-radius:.5rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.border{border-width:1px;border-style:solid;border-color:hsl(var(--border))}.bg-background{background-color:hsl(var(--background))}.hover\:text-primary\/80:hover{color:hsl(var(--primary)/.8)}.hover\:bg-background\/80:hover{background-color:hsl(var(--background)/.8)}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms}.relative{position:relative}.w-full{width:100%}.grid{display:grid}@media (min-width:768px){.md\:text-4xl{font-size:2.25rem;line-height:1.1}.md\:text-5xl{font-size:3rem;line-height:1}.md\:text-lg{font-size:1.125rem;line-height:1.75rem}.sm\:flex-row{flex-direction:row}.sm\:gap-4{gap:1rem}.sm\:mt-6{margin-top:1.5rem}.sm\:mt-4{margin-top:1rem}.md\:py-24{padding-top:6rem;padding-bottom:6rem}}@media (min-width:640px){.sm\:text-3xl{font-size:1.875rem;line-height:1.2}.sm\:text-4xl{font-size:2.25rem;line-height:1.1}.sm\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width:1024px){.lg\:text-5xl{font-size:3rem;line-height:1}.lg\:text-6xl{font-size:3.75rem;line-height:1}}.absolute{position:absolute}.inset-0{inset:0}.bg-primary{background-color:hsl(var(--primary))}.rounded-t-3xl{border-top-left-radius:1.5rem;border-top-right-radius:1.5rem}.rounded-bl-3xl{border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}.rounded-br-\[80px\]{border-bottom-right-radius:80px}.rounded-t-2xl{border-top-left-radius:1rem;border-top-right-radius:1rem}.rounded-bl-2xl{border-bottom-left-radius:1rem}.rounded-br-\[60px\]{border-bottom-right-radius:60px}.object-cover{object-fit:cover}.bottom-0{bottom:0}.right-0{right:0}.h-16{height:4rem}.w-16{width:4rem}.rounded-full{border-radius:9999px}.cursor-pointer{cursor:pointer}`,
          }}
        />
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript>
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload LCP image - Most critical visual element */}
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          href="https://ik.imagekit.io/zmblm08qi/Blog%20Header%20Image.png?updatedAt=1754142363015"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={cn('min-h-screen antialiased bg-background', sora.className)}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <div className="relative flex min-h-screen flex-col" style={{ contain: 'layout' }}>
          <Header />
          <main id="main-content" className="flex-1" style={{ contain: 'layout' }}>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
        <Toaster />
        <CriticalCSS />
      </body>
    </html>
  );
}
