'use client';

import React from 'react';
import Link from 'next/link';

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <Link 
      href="#" 
      className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
      onClick={handleCopy}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
      Copy Code
    </Link>
  );
} 