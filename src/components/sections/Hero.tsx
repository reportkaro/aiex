'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Button from '../ui/Button';

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const rotatingWords = ['human-centered', 'intuitive', 'trustworthy', 'collaborative'];
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax effect for the hero background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const followX = useSpring(mouseX, springConfig);
  const followY = useSpring(mouseY, springConfig);
  
  // Floating animation for 3D elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement for interactive elements
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    mouseX.set(x - width / 2);
    mouseY.set(y - height / 2);
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" 
      style={{ y }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="herogradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#herogradient)" />
          </svg>
        </div>
      </div>
      
      {/* 3D decorative elements */}
      <motion.div
        className="absolute left-[15%] top-[20%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-2xl"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute right-[20%] bottom-[30%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-15 blur-3xl"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1.5 }
        }}
      />
      <motion.div
        className="absolute right-[25%] top-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 blur-xl"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.8 }
        }}
      />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center">
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Design Patterns for
            <div className="h-20 md:h-24 mt-2 mb-4 relative">
              <div className="relative h-full flex items-center justify-center overflow-hidden">
                {rotatingWords.map((word, index) => (
                  <motion.span
                    key={word}
                    className="absolute w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ 
                      opacity: currentWordIndex === index ? 1 : 0,
                      y: currentWordIndex === index ? 0 : 40
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              AI Experiences
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A curated collection of design patterns to help you create more effective 
            and innovative human-AI interactions.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/patterns">
              <Button 
                variant="gradient" 
                size="lg"
                className="text-base px-8 py-4 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                Explore Patterns
              </Button>
            </Link>
            
            <Link href="/contribute">
              <Button 
                variant="outline" 
                size="lg"
                className="text-base px-8 py-4 hover:bg-indigo-50 transition-all duration-300"
              >
                Submit a Pattern
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#ffffff"
            opacity=".8"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="#ffffff"
            opacity=".5"
          ></path>
        </svg>
      </div>
    </motion.div>
  );
}
