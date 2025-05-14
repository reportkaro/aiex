"use client";
import { useState } from "react";
import OptimizedMedia from "./OptimizedMedia";

interface Example {
  imagePath?: string;
  title: string;
  description: string;
  imageCredit?: string;
}

export default function Carousel({ examples }: { examples: Example[] }) {
  const images = examples.filter(e => e.imagePath);
  const [current, setCurrent] = useState(0);
  if (images.length === 0) return null;
  const prev = () => setCurrent(i => Math.max(i - 1, 0));
  const next = () => setCurrent(i => Math.min(i + 1, images.length - 1));
  const example = images[current];
  return (
    <div className="flex flex-col items-center">
      {/* Side-by-side layout container - 70/30 split */}
      <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-6 bg-white rounded-lg overflow-hidden">
        {/* Left side: Image with navigation (takes 7/10 width on desktop) */}
        <div className="md:col-span-7 relative">
          {example.imagePath && (
            <div className="w-full h-64 md:h-[30rem] bg-gray-50 p-2">
              <OptimizedMedia
                src={example.imagePath}
                alt={example.title}
                className="w-full h-full"
                width={800}
                height={600}
                priority={current === 0} // Only prioritize the first image
              />
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="p-2 bg-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-violet-500/10 border border-gray-200 shadow-sm rounded-full disabled:opacity-40 disabled:cursor-not-allowed z-10 transition-colors"
              aria-label="Previous image"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={next}
              disabled={current === images.length - 1}
              className="p-2 bg-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-violet-500/10 border border-gray-200 shadow-sm rounded-full disabled:opacity-40 disabled:cursor-not-allowed z-10 transition-colors"
              aria-label="Next image"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Right side: Description content (takes 3/10 width on desktop) */}
        <div className="md:col-span-3 p-6 flex flex-col justify-center bg-gray-50 border-l border-gray-200">
          <div className="mb-4">
            <h3 className="font-bold text-xl mb-4 text-gray-800">{example.title}</h3>
            <p className="text-gray-700 leading-relaxed">{example.description}</p>
          </div>
          
          {/* Image indicators */}
          <div className="flex gap-2 mt-auto">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all ${
                  i === current 
                    ? 'bg-gradient-to-r from-pink-500 to-violet-500 w-8' 
                    : 'bg-gray-300 w-3 hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-violet-500/30'
                }`}
                aria-label={`View example ${i + 1}`}
              />
            ))}
          </div>
          
          {example.imageCredit && (
            <div className="text-right text-xs text-gray-400 mt-4 italic">{example.imageCredit}</div>
          )}
        </div>
      </div>
    </div>
  );
} 