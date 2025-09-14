'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
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
}

export const InfoCard = ({ 
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
  rtlFontFamily = "'Sora', sans-serif",
  effectBgColor = "#80eeb4",
  contentPadding = "10px 16px",
  className
}: InfoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRTL] = useState(false);

  const cardStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: cardBgColor,
    color: textColor,
    fontFamily: isRTL ? rtlFontFamily : fontFamily,
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const borderContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    padding: `${borderPadding}px`,
    background: `conic-gradient(from 0deg, ${borderColor}, ${borderBgColor}, ${borderColor})`,
    position: 'relative',
    animation: 'rotate-border 3s linear infinite',
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: cardBgColor,
    borderRadius: '12px',
    padding: contentPadding,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 2,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '12px',
    transition: 'all 0.3s ease',
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: isHovered ? effectBgColor : 'transparent',
    color: isHovered ? hoverTextColor : textColor,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    opacity: 0.9,
    color: textColor,
  };

  return (
    <>
      <style jsx>{`
        @keyframes rotate-border {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .info-card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.5s ease;
          z-index: 1;
        }
        
        .info-card-shine:hover::before {
          left: 100%;
        }
      `}</style>
      
      <div
        ref={cardRef}
        style={cardStyle}
        className={cn("info-card-shine", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={borderContainerStyle}>
          <div style={contentStyle}>
            <h3 style={titleStyle}>
              {title}
            </h3>
            <p style={descriptionStyle}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
