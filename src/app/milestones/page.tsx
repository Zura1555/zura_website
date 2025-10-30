import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milestones | Zura',
  description: 'My professional journey and career milestones. Explore the key moments and achievements in my development career.',
  keywords: ['milestones', 'career', 'achievements', 'journey', 'professional development'],
  openGraph: {
    title: 'Milestones | Zura',
    description: 'My professional journey and career milestones.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/milestones`,
  },
  twitter: {
    card: 'summary',
    title: 'Milestones | Zura',
    description: 'My professional journey and career milestones.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/milestones`,
  },
};

export default function MilestonesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Milestones</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}