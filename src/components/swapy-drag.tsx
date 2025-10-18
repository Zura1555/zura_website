"use client";
import { useEffect, useState } from "react";
import { Heart, PlusCircle } from "lucide-react";
import { SwapyLayout } from "@/components/ui/swapy";
import Lottie from 'lottie-react';
import blueCatAnimation from '../../lottie/Blue Working Cat Animation.json';
import boyRunningAnimation from '../../lottie/Cute Boy Running.json';


export function TeamCard() {
  return (
    <div className="bg-primary rounded-xl p-4 sm:p-6 h-full flex flex-col items-center justify-center shadow-md">
      <Lottie 
        animationData={boyRunningAnimation}
        style={{ width: 120, height: 120 }}
        className="sm:w-180 sm:h-180"
        loop={true}
      />
    </div>
  );
}
export function AgencyCard() {
  return (
    <div className="bg-gradient-to-r from-yellow to-orange-400 rounded-xl h-full p-3 sm:p-4 relative overflow-hidden shadow-md">
      <div className="bg-gray-900 text-yellow text-base sm:text-lg font-medium px-3 sm:px-4 py-2 rounded-lg inline-block mb-3 sm:mb-4 w-full">
        <p>My ongoing</p>
        <p>projects</p>
      </div>
      <div className="flex gap-3 sm:gap-4 h-16 sm:h-20 justify-center">
        <div className="w-full bg-transparent rounded-lg flex items-center justify-center">
          <img 
            src="/n8n.png" 
            alt="n8n" 
            className="max-w-full max-h-full object-contain rounded-lg p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<span class="text-gray-900 text-xs font-bold">n8n</span>';
              }
            }}
          />
        </div>
        <div className="w-full bg-transparent rounded-lg flex items-center justify-center">
          <img 
            src="/directus.png" 
            alt="Directus" 
            className="max-w-full max-h-full object-contain rounded-lg p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<span class="text-gray-900 text-xs font-bold">Directus</span>';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
export function LogoCard() {
  return (
    <div className="bg-yellow rounded-xl h-full p-4 sm:p-6 flex flex-col items-center justify-center shadow-md">
      <Lottie 
        animationData={blueCatAnimation}
        style={{ width: 120, height: 120 }}
        className="sm:w-180 sm:h-180"
        loop={true}
      />
    </div>
  );
}
export function InfluencersCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const influencers = [
    { id: 1, name: "Lenny Newsletter", description: "Newsletter & podcast about tech, AI, and more" },
    { id: 2, name: "Daniel Wirtz", description: "Cool tips about productivity & tools" },
    { id: 3, name: "Tú Bá Khỳm", description: "Keep you up-to-date with latest coding trends" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % influencers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [influencers.length]);

  const currentInfluencer = influencers[currentIndex];

  return (
    <div className="bg-white rounded-xl h-full p-3 sm:p-4 flex flex-col justify-center shadow-md border border-primary">
      <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-center text-gray-900">My Favorite</h3>
      <p className="text-xl sm:text-3xl font-medium mb-4 sm:mb-6 text-center text-gray-900">Tech Influencers</p>

      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Current influencer image */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-transparent">
            <img 
              src={`/influencers/influencer${currentIndex + 1}.png`} 
              alt={currentInfluencer.name} 
              className="max-w-full max-h-full object-contain rounded-lg p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-gray-900 text-xs font-bold">${currentIndex + 1}</span>`;
                }
              }}
            />
          </div>
          
          {/* Current influencer info */}
          <div className="flex flex-col max-w-[50%] sm:max-w-[60%]">
            <p className="text-xs sm:text-sm font-medium mb-1 text-gray-900">{currentInfluencer.name}</p>
            <p className="text-xs text-gray-900 line-clamp-2">{currentInfluencer.description}</p>
          </div>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center space-x-1 sm:space-x-2">
        {influencers.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-4 sm:w-6 bg-gray-900' 
                : 'w-1.5 sm:w-2 bg-gray-900/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
export function CompanyCard() {
  return (
    <div className="bg-white rounded-xl h-full p-4 sm:p-6 col-span-1 shadow-md border border-primary">
      <h2 className="text-xl sm:text-3xl font-bold mb-1 text-gray-900">Company</h2>
      <p className="mb-4 sm:mb-6 text-gray-600">Experience</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2 sm:mt-4 sm:items-center justify-center sm:justify-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md bg-transparent flex items-center justify-center">
          <img 
            src="/cpa.png" 
            alt="CPA Australia" 
            className="max-w-full max-h-full object-contain rounded-lg p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-900 text-xs sm:text-sm font-bold">CPA</div>';
              }
            }}
          />
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md bg-transparent flex items-center justify-center">
          <img 
            src="/oplacrm.png" 
            alt="OplaCRM" 
            className="max-w-full max-w-full max-h-full object-contain rounded-lg p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-900 text-xs sm:text-sm font-bold">Opla</div>';
              }
            }}
          />
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md bg-transparent flex items-center justify-center">
          <img 
            src="/maisonrmi.png" 
            alt="Maison RMI" 
            className="max-w-full max-h-full max-h-full object-contain rounded-lg p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-900 text-xs sm:text-sm font-bold">RMI</div>';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}



type Item = {
  id: string;
  title: string;
  widgets: React.ReactNode;
  className?: string;
};

const initialItems: Item[] = [
  { id: "1", title: "1", widgets: <LogoCard />, className: "lg:col-span-4 sm:col-span-6 col-span-12" },
  { id: "2", title: "2", widgets: <CompanyCard />, className: "lg:col-span-4 sm:col-span-6 col-span-12" },
  {
    id: "3",
    title: "3",
    widgets: <AgencyCard />,
    className: "lg:col-span-4 sm:col-span-6 col-span-12",
  },
  { id: "4", title: "4", widgets: <InfluencersCard />, className: "lg:col-span-6 sm:col-span-6 col-span-12" },
  { id: "5", title: "5", widgets: <TeamCard/>, className: "lg:col-span-6 sm:col-span-6 col-span-12" },
];

function DefaultSwapy() {
  const handleSwapEnd = (event: any) => {
    console.log("Swap completed!", event);
  };

  const handleSwapStart = () => {
    console.log("Swap started!");
  };

  return (
    <section className="bg-background px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-5xl py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-6 sm:mb-8 md:mb-12">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase">
              My playground
            </h2>
            <p className="mt-3 sm:mt-4 font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Some info about me
            </p>
          </div>
        </div>
        
        <SwapyLayout
          id="swapy-dashboard"
          className="w-full"
          onSwapStart={handleSwapStart}
          onSwapEnd={handleSwapEnd}
        >
          <div className="grid w-full grid-cols-12 gap-1.5 sm:gap-2 md:gap-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-none overflow-y-auto sm:overflow-y-visible">
            {initialItems.map((item) => (
              <div
                key={item.id}
                data-swapy-slot={item.id}
                className={`rounded-lg min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:h-64 ${item.className}`}
              >
                <div
                  data-swapy-item={item.id}
                  className="relative rounded-lg w-full h-full 2xl:text-xl text-xs sm:text-sm sm:cursor-move cursor-default transition-transform hover:scale-[1.02] touch-none"
                >
                  {item.widgets}
                </div>
              </div>
            ))}
          </div>
        </SwapyLayout>
      </div>
    </section>
  );
}

export default DefaultSwapy;
