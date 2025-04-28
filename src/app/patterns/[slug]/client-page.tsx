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

const ProgressiveDisclosureDemo = dynamic(
  () => import('@/components/examples/ProgressiveDisclosureDemo'),
  { ssr: false }
);

const TextModerationDemo = dynamic(
  () => import('@/components/examples/HumanInTheLoopDemo').then(mod => mod.TextModerationDemo),
  { ssr: false }
);

const ImageModerationDemo = dynamic(
  () => import('@/components/examples/HumanInTheLoopDemo').then(mod => mod.ImageModerationDemo),
  { ssr: false }
);

interface ClientPageProps {
  patternSlug: string;
}

export default function ClientPage({ patternSlug }: ClientPageProps) {
  if (patternSlug !== 'contextual-assistance' && patternSlug !== 'progressive-disclosure' && patternSlug !== 'human-in-the-loop') {
    return null;
  }

  if (patternSlug === 'contextual-assistance') {
    return (
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Interactive Examples</h2>
        </div>
        
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <p className="text-gray-700">
            Below are interactive examples that demonstrate contextual assistance in action. Try out these examples to see how AI can provide helpful suggestions based on your current context.
          </p>
        </div>
        
        {/* Side-by-side examples on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example 1: Text Editor */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Text Editor with Smart Suggestions</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  This example demonstrates how contextual assistance can enhance writing by offering real-time suggestions.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Type phrases like <span className="font-medium text-gray-800">"I want to"</span> to see suggestions</li>
                    <li>Write longer text to see writing tips appear</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <ContextualAssistanceDemo />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Subtle suggestions can enhance productivity without disrupting workflow.</p>
            </div>
          </div>
          
          {/* Example 2: Search */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Search with Contextual Help</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  See how contextual assistance enhances search experiences with relevant tips based on what you're searching.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Type <span className="font-medium text-gray-800">"contextual"</span> in the search box</li>
                    <li>Clear the search to see recently searched terms</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <SearchAssistanceDemo />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Context-aware search tips help users craft better queries quickly.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-5 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Points</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Contextual assistance should be subtle and non-intrusive, appearing only when it's likely to be helpful.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Always provide clear ways for users to accept, modify, or dismiss AI-generated suggestions.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Contextual suggestions should be relevant to the user's current task or context to be truly helpful.</span>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  // Progressive Disclosure page
  if (patternSlug === 'progressive-disclosure') {
    return (
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Interactive Examples</h2>
        </div>
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <p className="text-gray-700">
            Below are interactive examples that demonstrate progressive disclosure in action. Try out these examples to see how AI can reveal information and options step by step, reducing cognitive load and making complex features approachable.
          </p>
        </div>
        {/* Side-by-side examples on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example 1: Email Summarizer */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Email Summarizer</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  This example shows how an AI-powered email tool reveals summaries and actions step by step, only when the user requests more detail.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Click "Show AI Summary" to reveal a short summary</li>
                    <li>Click "Show More" to see a detailed summary and AI-powered actions</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <ProgressiveDisclosureDemo example="email" />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Progressive disclosure lets users access AI-powered insights and actions only when they need them, keeping the interface clean and focused.</p>
            </div>
          </div>
          {/* Example 2: Chatbot with Expanding Options */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Chatbot with Expanding Options</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  This example shows how an AI chatbot reveals deeper explanations and related actions only when the user asks for more.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Type a question and click "Ask AI"</li>
                    <li>Click "More Options" to reveal follow-up questions and deeper explanations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <ProgressiveDisclosureDemo example="chatbot" />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Progressive disclosure in chatbots helps users discover advanced AI features and information at their own pace.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 p-5 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Points</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Reveal only the most essential information or actions at first; show advanced AI features as users progress.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Use clear triggers (like "Show more" or step-by-step flows) to let users access additional AI-powered options.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Progressive disclosure reduces cognitive load and helps users feel in control of complex AI features.</span>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  if (patternSlug === 'human-in-the-loop') {
    return (
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Interactive Examples</h2>
        </div>
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <p className="text-gray-700">
            Below are interactive examples that demonstrate human-in-the-loop workflows for both text and image moderation. Try them out to see how human oversight and intervention can be integrated into AI-powered systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Post Moderation Example */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Text Post Moderation</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  Review AI-flagged social media posts and make the final moderation decision. This example simulates an AI system that flags text content for review, allowing a human to approve, reject, or override the AI's decision.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Review the AI's decision and choose to approve, reject, or override it</li>
                    <li>See how the system logs human interventions for transparency</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <TextModerationDemo />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Human-in-the-loop systems combine AI efficiency with human judgment for safer, more reliable outcomes.</p>
            </div>
          </div>
          {/* Image Moderation Example */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
            <div className="bg-gray-50 p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Image Moderation</h3>
              <div className="mt-2">
                <p className="text-gray-700 text-sm mb-2">
                  Review AI-flagged user-uploaded images and make the final moderation decision. This example simulates an AI system that flags images for review, allowing a human to approve, reject, or override the AI's decision.
                </p>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-xs">
                  <p className="font-medium text-gray-700 mb-1">Try it yourself:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Review the AI's decision and choose to approve, reject, or override it</li>
                    <li>See how the system logs human interventions for transparency</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4">
              <ImageModerationDemo />
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
              <p className="font-medium">Key Takeaway: Human-in-the-loop review is crucial for visual content where AI may be less reliable or context is needed.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 p-5 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Points</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Human-in-the-loop systems are essential for high-stakes or ambiguous situations where AI alone may not be sufficient.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Clear handoff points and transparent explanations help users make informed decisions when intervening.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/70 mr-2 mt-1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="12" y1="16" x2="12" y2="16"/>
              </svg>
              <span className="text-gray-700">Logging interventions and feedback enables continuous improvement of both AI and human processes.</span>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return null;
} 