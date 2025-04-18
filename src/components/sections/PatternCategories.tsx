'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import categories from '../../data/categories';

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
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categories.map((category, index) => (
          <motion.div key={category.id} className="flex flex-col" variants={item}>
            <Link href={`/patterns/${category.slug}`}>
              <div className={`group relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-br ${getCardBorderStyle(index)}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden relative p-4">
                  {/* Card image container */}
                  <div className="relative w-full h-80 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image 
                      src={category.image} 
                      alt={category.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </Link>
            
            {/* App info section - below the card */}
            <div className="flex items-center mt-4">
              <div className={`h-10 w-10 rounded-xl overflow-hidden flex-shrink-0 mr-3 relative ${getIconBgColor(category.id)}`}>
                {getCategoryIcon(category.id)}
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">{category.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{category.description.split(' ').slice(0, 5).join(' ')}...</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PatternCategories;
