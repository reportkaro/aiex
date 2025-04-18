'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import Button from '../ui/Button';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
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

  // Pulse animation
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.7, 0.5],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  // Rotate animation
  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    }
  };

  // Handle mouse movement for interactive elements
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    mouseX.set(x - width / 2);
    mouseY.set(y - height / 2);
  };

  // Handle scroll to Discover section
  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('categories');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate particles
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; color: string }[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const colors = [
        'rgba(99, 102, 241, 0.4)', // indigo-500
        'rgba(126, 34, 206, 0.4)',  // purple-700
        'rgba(219, 39, 119, 0.4)',  // pink-600
        'rgba(79, 70, 229, 0.3)',   // indigo-600
        'rgba(147, 51, 234, 0.3)'   // purple-600
      ];
      
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 50 + 10,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'linear-gradient(120deg, rgba(219, 39, 119, 0.1), rgba(124, 58, 237, 0.05))',
              'linear-gradient(240deg, rgba(219, 39, 119, 0.05), rgba(124, 58, 237, 0.1))',
              'linear-gradient(360deg, rgba(219, 39, 119, 0.1), rgba(124, 58, 237, 0.05))'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="herogradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <motion.stop 
                  offset="0%" 
                  stopColor="rgba(244, 114, 182, 0.2)"
                  animate={{
                    stopColor: [
                      "rgba(244, 114, 182, 0.2)",
                      "rgba(168, 85, 247, 0.2)",
                      "rgba(99, 102, 241, 0.2)",
                      "rgba(244, 114, 182, 0.2)"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.stop 
                  offset="100%" 
                  stopColor="rgba(168, 85, 247, 0.1)"
                  animate={{
                    stopColor: [
                      "rgba(168, 85, 247, 0.1)",
                      "rgba(99, 102, 241, 0.1)",
                      "rgba(244, 114, 182, 0.1)",
                      "rgba(168, 85, 247, 0.1)"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#herogradient)" />
          </svg>
        </motion.div>
        
        {/* Particles */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-xl"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.color
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* 3D decorative elements */}
      <motion.div
        className="absolute left-[15%] top-[20%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 opacity-20 blur-2xl"
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
        className="absolute right-[25%] top-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-300 opacity-20 blur-xl"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.8 }
        }}
      />
      
      {/* New decorative elements */}
      <motion.div
        className="absolute left-[25%] bottom-[15%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-20 blur-2xl"
        animate={pulseAnimation}
      />
      <motion.div
        className="absolute left-[65%] top-[30%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-10 blur-3xl"
        animate={pulseAnimation}
      />
      
      {/* Rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-[1px] border-indigo-300 opacity-20"
        animate={rotateAnimation}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full border-[1px] border-purple-300 opacity-10"
        animate={{
          ...rotateAnimation,
          transition: { ...rotateAnimation.transition, duration: 50 }
        }}
      />
      
      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16 py-16 md:py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Discover AI Design<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Inspiration & Patterns
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore real-world examples of effective AI interfaces and learn from the best implementations
          </motion.p>
          
          <div className="mt-10 flex justify-center">
            <Button 
              variant="gradient" 
              size="lg"
              className="text-base px-8 py-4"
              onClick={scrollToDiscover}
            >
              Explore Patterns
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
