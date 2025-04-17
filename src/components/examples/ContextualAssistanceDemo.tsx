'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextualAssistanceDemo = () => {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Predefined suggestions based on what the user types
  const suggestionPatterns = [
    { trigger: 'I want to', suggestion: ' create a responsive layout for my website' },
    { trigger: 'The problem with', suggestion: ' current AI interfaces is that they often lack transparency' },
    { trigger: 'Users need', suggestion: ' contextual assistance that appears at the right time without being intrusive' },
    { trigger: 'In my experience', suggestion: ', the most effective AI tools adapt to user behavior over time' },
    { trigger: 'AI should', suggestion: ' provide explanations for its suggestions to build trust' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newPosition = e.target.selectionStart || 0;
    
    setText(newText);
    setCursorPosition(newPosition);
    setIsTyping(true);

    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      checkForSuggestions(newText, newPosition);
      setIsTyping(false);
    }, 800);

    setTypingTimeout(timeout as any);
  };

  const checkForSuggestions = (currentText: string, position: number) => {
    // Only show suggestions when the user has typed something
    if (currentText.length < 3) {
      setShowSuggestion(false);
      return;
    }

    // Get the text up to the cursor position
    const textUpToCursor = currentText.substring(0, position);
    
    // Check if any of our patterns match the end of the text
    for (const pattern of suggestionPatterns) {
      if (textUpToCursor.endsWith(pattern.trigger)) {
        setSuggestion(pattern.suggestion);
        setShowSuggestion(true);
        return;
      }
    }

    // If no pattern matched, hide suggestions
    setShowSuggestion(false);
  };

  const acceptSuggestion = () => {
    const beforeCursor = text.substring(0, cursorPosition);
    const afterCursor = text.substring(cursorPosition);
    
    setText(beforeCursor + suggestion + afterCursor);
    setCursorPosition(cursorPosition + suggestion.length);
    setShowSuggestion(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Accept suggestion with Tab key
    if (e.key === 'Tab' && showSuggestion) {
      e.preventDefault();
      acceptSuggestion();
    }
  };

  useEffect(() => {
    // Clean up timeout on component unmount
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">AI-Enhanced Text Editor</h3>
        <div className="text-xs text-gray-500">Try typing "I want to", "Users need", or "AI should"</div>
      </div>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[150px] p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          placeholder="Start typing to see contextual assistance..."
        />
        
        {/* Ghost text suggestion */}
        <AnimatePresence>
          {showSuggestion && !isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none text-gray-400"
              style={{
                top: '12px', // Same as textarea padding
                left: `${Math.min(cursorPosition * 8 + 12, 95)}px`, // Approximate character width adjustment
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
              }}
            >
              {suggestion}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Help text */}
      <div className="mt-2 flex items-center text-xs text-gray-500">
        {showSuggestion && (
          <>
            <span className="inline-flex items-center bg-gray-100 rounded px-2 py-1 mr-2">
              <kbd className="font-semibold">Tab</kbd>
              <span className="ml-1">to accept</span>
            </span>
            <button 
              onClick={acceptSuggestion}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Use suggestion
            </button>
          </>
        )}
      </div>
      
      {/* Contextual tip */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: text.length > 30 ? 1 : 0, 
          y: text.length > 30 ? 0 : 10 
        }}
        className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-sm"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-blue-800">Writing Tip</h4>
            <p className="text-blue-700 mt-1">
              Consider breaking longer paragraphs into smaller ones for better readability. Aim for 3-4 sentences per paragraph.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContextualAssistanceDemo; 