"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    in: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
    out: {
      opacity: 0,
      filter: "blur(10px)",
      y: -20,
    },
  };

  const pageTransition = {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  const exitTransition = {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-transition gpu-accelerated"
        style={{
          willChange: "opacity, filter, transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
