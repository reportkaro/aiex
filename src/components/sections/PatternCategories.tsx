import React from 'react';
import Link from 'next/link';

const PatternCategories = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Pattern Categories</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5">
      <Link href="/patterns/contextual-assistance">
        <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-blue-100">
          <span className="text-blue-600 font-medium">Contextual Assistance</span>
        </div>
      </Link>
      <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-green-100">
        <span className="text-green-600 font-medium">Progressive Disclosure</span>
      </div>
      <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-amber-100">
        <span className="text-amber-600 font-medium">Human-in-the-Loop</span>
      </div>
      <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-purple-100">
        <span className="text-purple-600 font-medium">Conversational UI</span>
      </div>
      <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-pink-100">
        <span className="text-pink-600 font-medium">Transparent Feedback</span>
      </div>
      <div className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 rounded-xl p-5 text-center flex flex-col items-center justify-center h-28 cursor-pointer border border-gray-100">
        <span className="text-gray-600 font-medium">Adaptive Interfaces</span>
      </div>
    </div>
  </div>
);

export default PatternCategories;
