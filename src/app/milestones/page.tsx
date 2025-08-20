import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Milestones | Zura",
  description: "Stay up to date with the latest updates and improvements to our projects.",
};

// Strapi types
interface StrapiArticle {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  blocks?: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: StrapiArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface MilestoneItemProps {
  date: string;
  title: string;
  version: string;
  summary: string;
  features: {
    name: string;
    description: string;
    learnMoreLink?: string;
  }[];
  imageUrl?: string;
  imageAlt?: string;
}

function MilestoneItem({ 
  date, 
  title, 
  version, 
  summary, 
  features, 
  imageUrl, 
  imageAlt 
}: MilestoneItemProps) {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-[200px_750px_1fr] gap-6 lg:gap-12 justify-center">
      {/* Date Column */}
      <div className="order-2 lg:order-1 lg:pt-2">
        <p className="text-sm text-muted-foreground font-medium lg:text-right">
          {date}
        </p>
      </div>
      
      {/* Content Column */}
      <div className="order-1 lg:order-2 space-y-6">
        {/* Milestone Title */}
        <div className="space-y-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {title}
          </h2>
          
          {/* Version Badge */}
          <div className="inline-block">
            <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full">
              {version}
            </span>
          </div>
        </div>
        
        {/* Milestone Summary */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {summary}
        </p>
        
        {/* Features Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            Features
          </h3>
          
          {features.map((feature, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-xl font-bold text-foreground">
                {feature.name}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
                {feature.learnMoreLink && (
                  <>
                    {' '}
                    <a 
                      href={feature.learnMoreLink}
                      className="text-primary hover:text-primary/80 underline underline-offset-[4.2px] transition-colors font-medium"
                    >
                      Learn more
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
        
        {/* Screenshot/Image */}
        {imageUrl && (
          <div className="pt-4">
            <img
              src={imageUrl}
              alt={imageAlt || `${title} screenshot`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
      
      {/* Empty third column for alignment */}
      <div className="hidden lg:block order-3">
        {/* Intentionally empty for grid alignment */}
      </div>
    </div>
  );
}

// Helper function to fetch milestone articles from Strapi
async function getMilestones(): Promise<MilestoneItemProps[]> {
  try {
    const response = await fetch(
      `https://uplifting-champion-8a8387e8ac.strapiapp.com/api/articles?populate=cover&filters[category][name][$eq]=Milestones&sort=publishedAt:desc`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: { revalidate: 60 }, // Revalidate every minute
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch milestones');
    }

    const data: StrapiResponse = await response.json();
    
    return data.data.map((article) => {
      // Extract version from description or title (you can customize this logic)
      const versionMatch = article.description?.match(/v\d+\.\d+\.\w+/) || article.title?.match(/v\d+\.\d+\.\w+/);
      const version = versionMatch ? versionMatch[0] : 'v1.0.0';
      
      // Format date
      const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Extract features from blocks or create default ones
      const features = article.blocks?.filter(block => block.__component === 'shared.rich-text')
        .map((block, index) => ({
          name: `Feature ${index + 1}`,
          description: block.body || 'Feature description',
        })) || [
        {
          name: 'Main Feature',
          description: article.description || 'No description available',
        }
      ];

      return {
        date,
        title: article.title,
        version,
        summary: article.description || '',
        features,
        imageUrl: article.cover?.url ? `https://uplifting-champion-8a8387e8ac.strapiapp.com${article.cover.url}` : undefined,
        imageAlt: article.cover?.alternativeText || `${article.title} image`,
      };
    });
  } catch (error) {
    console.error('Error fetching milestones:', error);
    // Return fallback data
    return [
      {
        date: "July 14, 2025",
        title: "Preview release",
        version: "v0.1.x",
        summary: "Kiro, a new agentic IDE that helps you do your best work with spec-driven development.",
        features: [
          {
            name: "Specs",
            description: "Structured artifacts that formalize the development process for complex features in your application.",
            learnMoreLink: "#"
          }
        ],
        imageUrl: "/images/kiro-preview.png",
        imageAlt: "Kiro IDE preview showing spec-driven development interface"
      },
    ];
  }
}

export default async function MilestonesPage() {
  const milestones = await getMilestones();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-16 max-w-4xl">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            Milestones
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest updates and improvements to our projects.
          </p>
        </div>
        
        {/* Milestone Entries */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <MilestoneItem
              key={index}
              {...milestone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
