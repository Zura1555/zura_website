import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Zura',
  description: 'Get in touch with me. Have a project in mind, a question, or just want to say hello? I\'d love to hear from you.',
  keywords: ['contact', 'get in touch', 'message', 'email', 'collaboration'],
  openGraph: {
    title: 'Contact | Zura',
    description: 'Get in touch with me. Have a project in mind or just want to say hello?',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/contact`,
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Zura',
    description: 'Get in touch with me. Have a project in mind or just want to say hello?',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
