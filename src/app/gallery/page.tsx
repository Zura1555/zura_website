import { getGalleryAlbums } from "@/lib/cms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Zura',
  description: 'A visual journey through my projects, travels, and moments of inspiration. Explore my collection of landscapes, projects, and portraits.',
  keywords: ['gallery', 'portfolio', 'photography', 'projects', 'visual'],
  openGraph: {
    title: 'Gallery | Zura',
    description: 'A visual journey through my projects, travels, and moments of inspiration.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/gallery`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Zura',
    description: 'A visual journey through my projects, travels, and moments of inspiration.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/gallery`,
  },
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Gallery</h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          A visual journey through my projects, travels, and moments of inspiration.
        </p>
      </section>

      <section className="mt-16">
        <Tabs defaultValue={albums[0]?.name || ''} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            {albums.map((album) => (
              <TabsTrigger key={album.name} value={album.name} className="font-headline data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                {album.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {albums.map((album) => (
            <TabsContent key={album.name} value={album.name}>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {album.photos.map((photo, index) => (
                  <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={photo.aiHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
