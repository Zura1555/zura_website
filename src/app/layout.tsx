import type { Metadata } from 'next';
import { Sora, Luckiest_Guy } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CSSLoader } from '@/components/css-loader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';

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
        {/* Critical CSS inlined for immediate rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for LCP optimization - minimal essential styles */
            :root, .dark {
              --background: 252 67% 8%;
              --foreground: 0 0% 98%;
              --card: 252 67% 11%;
              --primary: 226 97% 65%;
              --border: 252 67% 30%;
              --muted-foreground: 240 5% 75%;
            }
            
            body {
              background-color: hsl(var(--background));
              color: hsl(var(--foreground));
              margin: 0;
              padding: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.5;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            header {
              position: sticky;
              top: 0;
              z-index: 50;
              width: 100%;
              padding: 1rem 0;
              background-color: hsl(var(--background) / 0.8);
              backdrop-filter: blur(8px);
            }
            
            .container {
              margin: 0 auto;
              padding: 0 1rem;
              max-width: 80rem;
            }
            
            .hero {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-height: 80vh;
              padding: 2rem;
            }
            
            .hero h1 {
              font-size: 3.5rem;
              font-weight: 700;
              margin: 0;
              color: hsl(var(--foreground));
              line-height: 1.1;
            }
            
            .hero p {
              font-size: 1.25rem;
              color: hsl(var(--muted-foreground));
              margin: 1rem 0;
              text-align: center;
              max-width: 600px;
            }
            
            footer {
              width: 100%;
              border-top: 1px solid hsl(var(--border) / 0.4);
              margin-top: 5rem;
              height: 104px;
              contain: layout size style;
            }
            
            footer p {
              font-size: 0.875rem;
              color: hsl(var(--muted-foreground));
              text-align: center;
              margin: 0;
              height: 1.25rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.75rem 1.5rem;
              border-radius: 9999px;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.2s;
              border: none;
              cursor: pointer;
            }

            .btn-primary {
              background-color: hsl(var(--primary));
              color: white;
            }

            .btn-primary:hover {
              opacity: 0.9;
            }
            
            @media (max-width: 768px) {
              .hero h1 { font-size: 2.5rem; }
              .hero p { font-size: 1rem; }
              .container { padding: 0 0.5rem; }
            }
          `
        }} />
        
        {/* Defer full CSS loading to reduce critical path */}
        <CSSLoader href="/_next/static/css/app/layout.css" />
        
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
        <div className="relative flex min-h-screen flex-col" style={{ contain: 'layout size' }}>
          <Header />
          <main id="main-content" className="flex-1" style={{ contain: 'layout size' }}>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
