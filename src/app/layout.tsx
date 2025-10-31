import type { Metadata } from 'next';
import './globals.css';
import { Sora, Luckiest_Guy } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
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
  display: 'optional', // Don't block render
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
      <body className={cn('min-h-screen antialiased bg-background', sora.className)}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
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
