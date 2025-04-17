'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the demo components with no SSR
const ContextualAssistanceDemo = dynamic(
  () => import('@/components/examples/ContextualAssistanceDemo'),
  { ssr: false }
);

const SearchAssistanceDemo = dynamic(
  () => import('@/components/examples/SearchAssistanceDemo'),
  { ssr: false }
);

interface ClientPageProps {
  patternSlug: string;
}

export default function ClientPage({ patternSlug }: ClientPageProps) {
  if (patternSlug !== 'contextual-assistance') {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500 w-1 h-8 mr-3"></div>
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-5 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-blue-800">Text Editor with Smart Suggestions</h3>
            <p className="text-gray-700 mt-2">
              Try typing phrases like <span className="font-medium text-blue-600">"I want to"</span>, 
              <span className="font-medium text-blue-600">"Users need"</span>, or 
              <span className="font-medium text-blue-600">"AI should"</span> to see contextual suggestions appear.
              Write longer text to see a contextual writing tip appear.
            </p>
          </div>
          <div className="p-5">
            <ContextualAssistanceDemo />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-5 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-blue-800">Search with Contextual Help</h3>
            <p className="text-gray-700 mt-2">
              This example shows how contextual assistance can enhance a search experience.
              Try typing <span className="font-medium text-blue-600">"contextual"</span>, 
              <span className="font-medium text-blue-600">"best pract"</span>, or 
              <span className="font-medium text-blue-600">"examples"</span> to see relevant search tips.
            </p>
          </div>
          <div className="p-5">
            <SearchAssistanceDemo />
          </div>
        </div>
      </div>
    </section>
  );
} 