import React from 'react';
import Link from 'next/link';
import patterns from '@/data/patterns';

export default function PatternsPage() {
  // Group patterns by category
  const patternsByCategory = patterns.reduce((acc, pattern) => {
    if (!acc[pattern.category]) {
      acc[pattern.category] = [];
    }
    acc[pattern.category].push(pattern);
    return acc;
  }, {} as Record<string, typeof patterns>);

  // Get unique categories with their colors
  const categories = Object.keys(patternsByCategory).map(category => {
    const pattern = patternsByCategory[category][0];
    return {
      name: category,
      color: pattern.categoryColor
    };
  });

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-gray-700">Patterns</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Design Patterns</h1>
        <p className="text-xl text-gray-600">
          A collection of design patterns for building effective AI-powered user interfaces
        </p>
      </div>

      {/* Categories filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <a 
            key={category.name}
            href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-200 transition-colors`}
          >
            {category.name}
          </a>
        ))}
        <Link 
          href="/"
          className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors ml-auto"
        >
          Back to Home
        </Link>
      </div>
      
      {/* Patterns by category */}
      {categories.map(category => (
        <div key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
          <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 border-${category.color}-300`}>
            {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patternsByCategory[category.name].map((pattern) => (
              <Link key={pattern.id} href={`/patterns/${pattern.slug}`}>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${pattern.categoryColor}-100 text-${pattern.categoryColor}-800 mb-3`}>
                    {pattern.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{pattern.title}</h3>
                  <p className="text-gray-600">{pattern.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
} 