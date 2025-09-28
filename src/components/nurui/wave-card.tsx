"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WaveCardProps {
  tags: string;
  title: string;
  description: string;
  buttonText: string;
  image?: string;
  date?: string;
  aiHint?: string;
}

const WaveCard = ({
  tags,
  title,
  description,
  buttonText,
  image,
  date,
  aiHint
}: WaveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Create keyframes for wave animation
  const waveKeyframes = `
    @keyframes waveAnimation {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: waveKeyframes }} />
      <div 
        ref={cardRef}
        className={cn(
          "relative p-6 w-full h-full bg-card dark:bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-border flex flex-col"
        )}
      >
        {/* Wave effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.15) 25%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.15) 75%, transparent 100%)',
            transform: 'translateX(-100%)',
            animation: 'waveAnimation 8s ease-in-out infinite',
            zIndex: 1,
            animationDuration: isHovered ? '3s' : '8s',
          }}
        />
        
        {/* Mouse follow effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Blog Image */}
          {image && (
            <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4 flex-shrink-0">
              <Image
                src={image}
                alt={title || 'Blog post image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint={aiHint}
              />
            </div>
          )}
          
          {/* Tags */}
          <div className="flex items-start space-x-4 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent">
              {tags}
            </Badge>
          </div>
          
          {/* Title and Description */}
          <div className="mb-4 flex-grow">
            <h3 className="text-xl font-semibold text-foreground mb-3 font-headline line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Date and Button */}
          <div className="flex justify-between items-center mt-auto pt-4">
            {date && (
              <time className="block text-xs font-medium text-muted-foreground">
                {new Date(date).toLocaleDateString("en-US", {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            )}
            <button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaveCard;
