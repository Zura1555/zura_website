'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ShinyCardProps {
  title: string;
  description: string;
  width?: number;
  height?: number;
  borderColor?: string;
  borderBgColor?: string;
  borderWidth?: number;
  borderPadding?: number;
  cardBgColor?: string;
  shadowColor?: string;
  patternColor1?: string;
  patternColor2?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontFamily?: string;
  rtlFontFamily?: string;
  effectBgColor?: string;
  contentPadding?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShinyCard = ({ 
  title,
  description,
  width = 388,
  height = 378,
  borderColor = "#80eeb4",
  borderBgColor = "#242424",
  borderWidth = 3,
  borderPadding = 14,
  cardBgColor = "#000",
  shadowColor,
  patternColor1,
  patternColor2,
  textColor = "#f5f5f5",
  hoverTextColor = "#242424",
  fontFamily = "'Roboto Mono', monospace",
  rtlFontFamily = "'Montserrat', sans-serif",
  effectBgColor = "#80eeb4",
  contentPadding = "10px 16px",
  className,
  children
}: ShinyCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRTL] = useState(false); // You can implement RTL detection logic here

  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: cardBgColor,
    color: textColor,
    fontFamily: isRTL ? rtlFontFamily : fontFamily,
    padding: contentPadding,
  };

  const borderStyle = {
    padding: `${borderPadding}px`,
    background: `conic-gradient(from 0deg, ${borderColor}, ${borderBgColor}, ${borderColor})`,
    borderRadius: '16px',
    animation: 'spin 3s linear infinite',
  };

  return (
    <div
      ref={divRef}
      className={cn("relative overflow-hidden transition-all duration-300 ease-in-out shiny-card", className)}
      style={borderStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border effect */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .shiny-card:hover .title-effect {
          background-color: ${effectBgColor};
          color: ${hoverTextColor};
        }
      `}</style>
      
      {/* Inner card content */}
      <div
        className="relative z-10 h-full w-full rounded-xl flex flex-col justify-center items-start"
        style={cardStyle}
      >
        {/* Shiny effect */}
        <div className="absolute inset-0 shine opacity-20" />
        
        {/* Content */}
        <div className="relative z-20 space-y-4">
          <h3 
            className={`text-xl font-bold transition-all duration-300 title-effect px-2 py-1 rounded ${
              isHovered ? 'bg-opacity-100' : 'bg-opacity-0'
            }`}
            style={{
              backgroundColor: isHovered ? effectBgColor : 'transparent',
              color: isHovered ? hoverTextColor : textColor,
            }}
          >
            {title}
          </h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {description}
          </p>
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Backward compatibility component for existing usage
interface SimpleShinyCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SimpleShinyCard = ({ 
  children, 
  className 
}: SimpleShinyCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className={cn("relative overflow-hidden rounded-3xl transition-all duration-300 ease-in-out shiny-card", className)}
    >
      {/* Shiny effect */}
      <div className="absolute inset-0 shine" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
