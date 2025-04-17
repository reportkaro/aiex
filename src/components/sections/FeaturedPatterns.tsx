import React from 'react';

const FeaturedPatterns = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Featured Patterns</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Enhanced featured patterns */}
      <div className="glass border border-blue-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
        <h3 className="font-bold text-xl mb-3 gradient-text">Singleton Pattern</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">Ensure a class has only one instance and provide a global point of access to it. Essential for coordinating actions across a system.</p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Design</span>
          <a href="#" className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">Learn more →</a>
        </div>
      </div>
      
      <div className="glass border border-green-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
        <h3 className="font-bold text-xl mb-3 gradient-text">Pipeline Pattern</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">Process data through a sequence of stages, each performing a specific task. Perfect for complex data transformations and workflows.</p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Data Engineering</span>
          <a href="#" className="text-green-600 font-medium text-sm hover:text-green-800 transition-colors">Learn more →</a>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedPatterns;
