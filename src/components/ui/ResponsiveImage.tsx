'use client';

import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function ResponsiveImage({ 
  src, 
  alt, 
  className = "object-cover rounded shadow-sm", 
  fallbackSrc = "/images/placeholder-image.png"
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
} 