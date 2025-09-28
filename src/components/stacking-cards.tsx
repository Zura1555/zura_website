'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'End-to-End Project Delivery',
    description:
      'Managing projects from concept to launch, ensuring clear communication, on-time delivery, and alignment with business goals. I bridge the gap between stakeholders and development teams to deliver successful outcomes.',
    src: 'project-delivery.jpg',
    link: '/placeholder.svg',
    color: '#5196fd',
  },
  {
    title: 'UI/UX Research',
    description:
      'I uncover the "why" behind user behavior to ensure we\'re building the right product for the right people. Using proven methods like in-depth interviews and usability testing, I gather critical data directly from your target audience.',
    src: 'ui-ux-research.jpg',
    link: '/placeholder.svg',
    color: '#8f89ff',
  },
  {
    title: 'MVP & Prototype Development',
    description:
      'Transform your idea into a tangible product, fast. I specialize in building high-fidelity prototypes and Minimum Viable Products (MVPs) that focus on core functionality. This is the most effective way to test your concept with real users.',
    src: 'mvp-prototyping.jpg',
    link: '/placeholder.svg',
    color: '#13006c',
  },
  {
    title: 'Digital Transformation',
    description:
      'Immersing myself in various digital transformation projects, applying AI and automation to streamline business processes and improve efficiency.',
    src: 'digital-transformation.jpg',
    link: '/placeholder.svg',
    color: '#ed649e',
  },
  {
    title: 'Content Creation',
    description:
      'As a hobbyist vibe-coder and content blogger, I create engaging content that helps others learn about technology and digital transformation.',
    src: 'content-creation.jpg',
    link: '/placeholder.svg',
    color: '#fd521a',
  },
];

export default function StackingCards(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <>
          <section className='text-white h-[50vh] w-full bg-slate-950 grid place-content-center'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <h1 className='text-4xl md:text-5xl font-bold text-center'>
              My Specialization
            </h1>
          </section>
        </>

        <section className='text-white w-full bg-slate-950'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
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
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md p-10 origin-top`}
      >
        <h2 className='text-2xl text-center font-semibold'>{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <p className='text-sm'>{description}</p>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={'#'}
                target='_blank'
                className='underline cursor-pointer'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
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
            className={`relative w-[60%] h-full rounded-lg overflow-hidden`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};