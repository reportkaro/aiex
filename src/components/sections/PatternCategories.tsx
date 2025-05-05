'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import categories from '../../data/categories';
import { useRouter } from 'next/navigation';

// Create icons for each category
const getCategoryIcon = (categoryId: string) => {
  switch(categoryId) {
    case 'contextual-assistance':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
      );
    case 'progressive-disclosure':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>
      );
    case 'human-in-the-loop':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
      );
    case 'conversational-ui':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
      );
    case 'transparent-feedback':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
      );
    case 'adaptive-interfaces':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {categoryId.charAt(0).toUpperCase()}
        </div>
      );
  }
};

// Get background color based on category - updated with brand colors
const getIconBgColor = (categoryId: string) => {
  switch(categoryId) {
    case 'contextual-assistance':
      return 'bg-indigo-100 text-indigo-600';
    case 'progressive-disclosure':
      return 'bg-violet-100 text-violet-600';
    case 'human-in-the-loop':
      return 'bg-purple-100 text-purple-600';
    case 'conversational-ui':
      return 'bg-fuchsia-100 text-fuchsia-600';
    case 'transparent-feedback':
      return 'bg-pink-100 text-pink-600';
    case 'adaptive-interfaces':
      return 'bg-indigo-50 text-indigo-500';
    default:
      return 'bg-indigo-100 text-indigo-600';
  }
};

// Get card border gradient colors
const getCardBorderStyle = (index: number) => {
  const gradients = [
    'from-indigo-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-indigo-500',
    'from-indigo-400 to-fuchsia-500',
    'from-fuchsia-500 to-purple-500',
    'from-purple-400 to-indigo-500',
  ];
  
  return gradients[index % gradients.length];
};

const PatternCategories = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (e: React.MouseEvent, slug: string, index: number) => {
    e.preventDefault();
    setIsNavigating(true);
    setActiveIndex(index);
    
    // Delay navigation to allow for animation
    setTimeout(() => {
      router.push(`/patterns/${slug}`);
    }, 300);
  };

  return (
    <div id="categories" className="pt-4 pb-16">
      <motion.h2 
        className="text-3xl sm:text-4xl font-extrabold mb-10 text-center md:text-left tracking-tight relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Discover
        </span>
        <motion.div 
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.h2>
      
      {/* Card grid with improved spacing */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {categories.map((category, index) => (
          <div key={category.id} className="flex flex-col">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: isNavigating ? (activeIndex === index ? 1 : 0.6) : 1,
                scale: isNavigating ? (activeIndex === index ? 1.03 : 0.98) : 1,
                y: isNavigating ? (activeIndex === index ? -10 : 0) : 0
              }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href={`/patterns/${category.slug}`}
                onClick={(e) => handleCardClick(e, category.slug, index)}
                className="block"
              >
                <div className={`group relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-br ${getCardBorderStyle(index)}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden relative p-4 flex flex-col h-full">
                    {/* Card image at the top */}
                    <div className="relative w-full h-56 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.02] mb-4">
                      <Image 
                        src={category.image} 
                        alt={category.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={category.image.endsWith('.gif')}
                      />
                    </div>
                    {/* Icon inside the card, above heading/description */}
                    <div className={`h-10 w-10 rounded-xl overflow-hidden flex-shrink-0 mx-auto mb-3 relative ${getIconBgColor(category.id)}`}> 
                      {getCategoryIcon(category.id)}
                    </div>
                    {/* Card heading and description below the icon */}
                    <div>
                      <h3 className="font-medium text-lg text-gray-900 mb-1 text-center">{category.title}</h3>
                      <p className="text-gray-500 text-sm text-center">{category.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternCategories;
