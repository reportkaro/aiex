'use client';

import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-4 w-10 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-14 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Title and description skeleton */}
      <div className="mb-10">
        <div className="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
        <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
      </div>
      
      {/* Problem and Solution skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 w-1 h-8 mr-3 rounded-full"></div>
            <div className="h-7 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 w-1 h-8 mr-3 rounded-full"></div>
            <div className="h-7 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Examples skeleton */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-gray-200 w-1 h-8 mr-3 rounded-full"></div>
          <div className="h-7 w-44 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm h-64"></div>
      </div>
      
      {/* Implementation & Considerations skeleton */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-gray-200 w-1 h-8 mr-3 rounded-full"></div>
          <div className="h-7 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="h-7 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-6 w-6 bg-gray-100 border border-gray-300 rounded-full mr-3"></div>
                    <div className="h-5 w-full bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 p-6 md:p-8 bg-gray-50">
              <div className="h-7 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-6 w-6 bg-gray-100 border border-gray-300 rounded-full mr-3"></div>
                    <div className="h-5 w-full bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Patterns skeleton */}
      <div>
        <div className="flex items-center mb-6">
          <div className="bg-gray-200 w-1 h-8 mr-3 rounded-full"></div>
          <div className="h-7 w-44 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="h-5 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 