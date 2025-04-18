'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSmoothScroll from '@/hooks/useSmoothScroll';

interface ScrollToTopProps {
  threshold?: number;
  right?: number;
  bottom?: number;
}

export default function ScrollToTop({ 
  threshold = 300, 
  right = 20, 
  bottom = 20 
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    // Check scroll position and update visibility
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleClick = () => {
    scrollTo('top');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          style={{ bottom, right }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 