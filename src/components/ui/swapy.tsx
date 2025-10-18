"use client";
import React from "react";
import { createSwapy } from "swapy";
import { useEffect, useRef } from "react";

interface SwapyLayoutProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  onSwapStart?: () => void;
  onSwapEnd?: (event: any) => void;
}

export const SwapyLayout: React.FC<SwapyLayoutProps> = ({
  id,
  className = "",
  children,
  onSwapStart,
  onSwapEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Initialize swapy with simple configuration
      const swapy = createSwapy(containerRef.current, {
        animation: "dynamic",
      });

      // Add event listeners
      if (onSwapStart) {
        swapy.onSwapStart(onSwapStart);
      }
      
      if (onSwapEnd) {
        swapy.onSwapEnd(onSwapEnd);
      }

      swapyRef.current = swapy;
    } catch (error) {
      console.error('Failed to initialize Swapy:', error);
    }

    return () => {
      if (swapyRef.current) {
        try {
          swapyRef.current.destroy();
        } catch (error) {
          console.error('Failed to destroy Swapy:', error);
        }
      }
    };
  }, [id, onSwapStart, onSwapEnd]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`swapy-container ${className}`}
    >
      {children}
    </div>
  );
};

interface SwapySlotProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const SwapySlot: React.FC<SwapySlotProps> = ({
  id,
  className = "",
  children,
}) => {
  return (
    <div
      data-swapy-slot={id}
      className={`swapy-slot ${className}`}
    >
      {children}
    </div>
  );
};

interface SwapyItemProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  dragHandle?: boolean;
}

export const SwapyItem: React.FC<SwapyItemProps> = ({
  id,
  className = "",
  children,
  dragHandle = true,
}) => {
  return (
    <div
      data-swapy-item={id}
      className={`swapy-item ${className} ${dragHandle ? "cursor-move" : ""}`}
    >
      {children}
    </div>
  );
};

interface DragHandleProps {
  className?: string;
  children?: React.ReactNode;
}

export const DragHandle: React.FC<DragHandleProps> = ({
  className = "",
  children,
}) => {
  return (
    <div
      data-swapy-drag-handle
      className={`swapy-drag-handle ${className}`}
    >
      {children || (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </div>
  );
};
