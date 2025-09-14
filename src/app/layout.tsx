import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: "Zura",
  description: "You've found my little corner of the internet. By day, I work at Maison RMI. By night, I'm a hobbyist vibe-coder and a content blogger. Think of this as a collection of my findings, from project insights to project experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className={cn('min-h-screen font-body antialiased bg-background')}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
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
