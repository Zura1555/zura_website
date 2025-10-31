// thanks to oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';

const projects = [
  {
    title: 'CPA Australia',
    description:
      'My six-month tenure as a Business Support Assistant at CPA Australia was an invaluable first experience in a multinational corporation. I felt truly appreciated working alongside mature advisors and international colleagues. This role was crucial for developing my interpersonal skills, understanding corporate procedures, and helping me identify my own areas for professional growth.',
    src: 'cpa-australia.jpg',
    link: 'https://media.licdn.com/dms/image/v2/D562DAQE3ig1b0ED5cQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1719234168838?e=1759669200&v=beta&t=LqpghSG2hIvvHvVAIzYv8ajIfpP7UBNhdktw9EFDQro',
    color: 'hsl(226 97% 64%)', // Primary blue
  },
  {
    title: 'OplaCRM',
    description:
      'I used to be wary of startups due to their reputation for lacking standardized procedures and assigning work beyond one\'s core role. While that was true to an extent, my former line manager, Iris Pham, and CEO, Stephen Nguyen, provided me with diverse opportunities to utilize my potential. This experience ignited my passion for the tech industry and is the reason why a person with business background like me is working in a tech field.',
    src: 'oplacrm.jpg',
    link: 'https://media.licdn.com/dms/image/v2/D562DAQEoINdgqF6cRw/profile-treasury-image-shrink_800_800/B56ZmQTiTTJkAY-/0/1759062665866?e=1759669200&v=beta&t=rLWSjIRZ3H7FcvI2RHPESv0g96mdRNrgiGzjAXnjrUo',
    color: 'hsl(252 67% 16%)', // Secondary/accent color
  },
  {
    title: 'Maison Retail Management International',
    description:
      'At my current company, I have the opportunity to work under Mr. Thomas Guillemaud and take a deep dive into the technology world, especially the evolution of AI. My work is currently focused on Headless CMS and n8n automation topics. I welcome any discussion on these subjects, so please feel free to reach out to me!',
    src: 'maison-rmi.jpg',
    link: 'https://media.licdn.com/dms/image/v2/D562DAQEocwtz9zNC9Q/profile-treasury-image-shrink_800_800/B56ZmQWCNkI8AY-/0/1759063321324?e=1759669200&v=beta&t=4Z3E_wYC-VvPLqN4VIhZwbgGPrHSeDl-2gb5JWomIUs',
    color: 'hsl(252 67% 21%)', // Border/muted color variant
  },
];

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className={`${isMobile ? 'h-[80vh]' : 'h-screen'} flex items-center justify-center sticky top-0`}
      style={{ contain: 'layout' }} // Prevent layout shifts from child animations
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * (isMobile ? 15 : 25)}px)`,
        }}
        className={`flex ${isMobile ? 'flex-col' : 'flex-col'} relative ${isMobile ? '-top-[15%]' : '-top-[25%]'} ${isMobile ? 'h-[500px] w-[90%] p-4' : 'h-[450px] w-[70%] p-10'} rounded-md origin-top`}
        layout // Prevent layout shifts during animations
      >
        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} text-center font-semibold ${isMobile ? 'mb-3' : ''}`}>{title}</h2>
        <div className={`flex ${isMobile ? 'flex-col' : ''} h-full ${isMobile ? 'gap-4' : 'mt-5 gap-10'}`}>
          <div className={`${isMobile ? 'w-full' : 'w-[40%] relative top-[10%]'}`}>
            <p className={`${isMobile ? 'text-xs leading-relaxed' : 'text-sm'}`}>{description}</p>
            <span className={`flex items-center gap-2 ${isMobile ? 'pt-3' : 'pt-2'}`}>
              <a
                href={'#'}
                target='_blank'
                className={`underline cursor-pointer ${isMobile ? 'text-xs' : ''}`}
              >
                See more
              </a>
              <svg
                width={isMobile ? '18' : '22'}
                height={isMobile ? '10' : '12'}
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative ${isMobile ? 'w-full h-[200px]' : 'w-[60%] h-full'} rounded-lg overflow-hidden`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: isMobile ? 1 : imageScale }}
            >
              <Image fill src={url} alt='image' className='object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function StackingCards(): JSX.Element {
  const container = useRef(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  
  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <section className='text-white w-full bg-slate-950'>
          {projects.map((project, i) => {
            // Reduce scaling effect on mobile for better performance and usability
            const targetScale = isMobile ? 
              1 - (projects.length - i) * 0.02 : 
              1 - (projects.length - i) * 0.05;
            
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * (isMobile ? 0.3 : 0.25), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}