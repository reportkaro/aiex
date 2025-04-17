"use client";
import { useState } from "react";

interface Example {
  imagePath: string;
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
    <div className="relative flex flex-col items-center">
      <div className="relative min-w-[600px] max-w-4xl w-full">
        <img
          src={example.imagePath}
          alt={example.title}
          className="w-full h-[28rem] object-cover rounded-lg border border-gray-200 shadow"
        />
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-1 bg-white/70 hover:bg-white/90 border shadow-md rounded-full disabled:opacity-40 disabled:cursor-not-allowed z-10"
          aria-label="Previous image"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={next}
          disabled={current === images.length - 1}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1 bg-white/70 hover:bg-white/90 border shadow-md rounded-full disabled:opacity-40 disabled:cursor-not-allowed z-10"
          aria-label="Next image"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      <div className="p-4 w-full max-w-2xl">
        <h3 className="font-bold text-lg mb-2 text-blue-800">{example.title}</h3>
        <p className="text-gray-700 text-sm">{example.description}</p>
        {example.imageCredit && (
          <div className="text-right text-xs text-gray-400 mt-2 italic">{example.imageCredit}</div>
        )}
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, i) => (
          <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === current ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
        ))}
      </div>
    </div>
  );
} 