'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dynamic from 'next/dynamic';

// Dynamically import the ContextualAssistanceDemo component with a more reliable approach
const ContextualAssistanceDemo = dynamic(
  () => import('@/components/examples/ContextualAssistanceDemo'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

// Dynamically import the HumanInTheLoopModeration component
const HumanInTheLoopModeration = dynamic(
  () => import('@/components/examples/HumanInTheLoopModeration'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

// Dynamically import the ProgressiveDisclosureEmailDemo component
const ProgressiveDisclosureEmailDemo = dynamic(
  () => import('@/components/examples/ProgressiveDisclosureEmailDemo'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

// Dynamically import the ConversationalUiDemo component
const ConversationalUiDemo = dynamic(
  () => import('@/components/examples/ConversationalUiDemo'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

// Dynamically import the ConfidenceIndicator component with interactive analysis
const ConfidenceIndicatorDemo = dynamic(
  () => import('@/components/examples/TransparentFeedbackDemo'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

interface CodeExampleBlockProps {
  code: string;
  language: string;
  title: string;
  description: string;
  componentId: string;
}

export default function CodeExampleBlock({
  code,
  language,
  title,
  description,
  componentId,
}: CodeExampleBlockProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    // Mark components as loaded after initial render
    setComponentLoaded(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render the appropriate component based on componentId
  const renderComponent = () => {
    switch (componentId) {
      case 'contextual-assistance-editor':
        return <ContextualAssistanceDemo />;
      case 'human-in-the-loop-moderation':
        return <HumanInTheLoopModeration />;
      case 'progressive-disclosure-email':
        return <ProgressiveDisclosureEmailDemo />;
      case 'conversational-ui-bot':
        return <ConversationalUiDemo />;
      case 'confidence-indicator':
        return <ConfidenceIndicatorDemo />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p>Preview not available for this example: {componentId}</p>
              <p className="text-sm mt-2">Try another example or switch back to code view</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Example header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-3 font-medium text-sm ${
            activeTab === 'code'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Code
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm ${
            activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Live Preview
        </button>
      </div>

      {/* Content area */}
      <div className="relative">
        {activeTab === 'code' ? (
          <>
            <div className="flex items-center justify-between bg-gray-800 text-gray-300 text-xs px-4 py-2">
              <span className="font-mono">{language}</span>
              <button
                onClick={handleCopy}
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={atomDark}
              showLineNumbers={true}
              wrapLongLines={false}
              customStyle={{ margin: 0, borderRadius: 0, maxHeight: '600px' }}
            >
              {code}
            </SyntaxHighlighter>
          </>
        ) : (
          <div className="border-t border-gray-200">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-blue-600 mr-1">Interactive Demo:</span> 
                This is a working implementation of the code example. Try it out to see how it works!
              </p>
            </div>
            <div className="p-6 flex justify-center bg-gray-50">
              <div className={`w-full ${componentId === 'human-in-the-loop-moderation' || componentId === 'confidence-indicator' ? 'max-w-4xl' : 'max-w-lg'}`}>
                {componentLoaded ? renderComponent() : (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-600">
              <p>This preview shows a running implementation of the pattern. You can copy the code from the "Code" tab to use in your own project.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 