'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import SkeletonLoader from './SkeletonLoader';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(pathname);
  
  // Handle route changes and loading state
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Start loading state for pattern pages
    if (pathname.startsWith('/patterns/') && pathname !== '/patterns') {
      // Set loading state
      setIsLoading(true);
      
      // Set a short timeout to show loader only if content isn't ready quickly
      timer = setTimeout(() => {
        setIsLoading(false);
        setKey(pathname + (searchParams?.toString() || ''));
      }, 150); // Significantly reduced timeout
    } else {
      // For other routes, just update the key immediately
      setIsLoading(false);
      setKey(pathname + (searchParams?.toString() || ''));
    }
    
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
    
    // Clean up function
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} // Ultra-fast transition
          >
            <SkeletonLoader />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.15, // Ultra-fast transition
              ease: "easeOut" // Simpler easing
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 