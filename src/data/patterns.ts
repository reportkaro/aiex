import { Pattern } from '../types';

const patterns: Pattern[] = [
  {
    id: "contextual-assistance",
    title: "Contextual Assistance",
    slug: "contextual-assistance",
    description: "Provide timely help and suggestions based on the user's current task, history, and needs without requiring explicit requests.",
    category: "Contextual Assistance",
    categoryColor: "blue",
    featured: true,
    content: {
      problem: "Users often need guidance but may not know what to ask for or when to ask. Traditional help systems require users to interrupt their workflow to search for assistance.",
      solution: "Create intelligent assistance that proactively offers relevant help, suggestions, or information based on the user's current context, behavior patterns, and needs. The system should anticipate user requirements rather than waiting for explicit requests.",
      examples: [
        {
          title: "Google Smart Compose",
          description: "Predicts and suggests text completions while typing emails, based on the email context and common phrases.",
          imagePath: "/images/examples/Smart-compose_Taco_Tuesday.gif",
          imageCredit: "Image: Google Gmail"
        },
        {
          title: "GitHub Copilot",
          description: "Suggests code completions as developers type, based on the current file context, project structure, and programming patterns.",
          imagePath: "/images/examples/gitautocode.gif",
          imageCredit: "Image: GitHub Copilot"
        },
        {
          title: "Notion AI",
          description: "Offers writing suggestions, summaries, and editing help based on the document content and user's current focus.",
          imagePath: "/images/examples/notion-ai.gif"
        }
      ],
      guidelines: [
        "Make assistance subtle and non-intrusive; don't interrupt the user's flow",
        "Provide clear indications that suggestions are AI-generated",
        "Allow users to easily accept, modify, or dismiss suggestions",
        "Gradually improve suggestions based on user feedback and acceptance patterns",
        "Offer ways to access more detailed help when contextual assistance isn't sufficient"
      ],
      considerations: [
        "Balance between proactive help and avoiding unnecessary interruptions",
        "Consider privacy implications of analyzing user behavior to provide contextual help",
        "Ensure the system doesn't make assumptions that could frustrate users if incorrect",
        "Provide transparency about why certain suggestions are being made",
        "Include settings to adjust the frequency and type of assistance"
      ],
      relatedPatterns: [
        "Progressive Disclosure",
        "Transparent Feedback",
        "Adaptive Interfaces"
      ],
      codeExamples: [
        {
          title: "Smart Text Editor with Contextual Suggestions",
          description: "This React component implements a text editor that offers contextual suggestions based on what the user is typing. It uses a debounce function to prevent too many API calls and maintains clear user control over accepting suggestions.",
          language: "tsx",
          componentId: "contextual-assistance-editor",
          code: `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface Suggestion {
  text: string;
  confidence: number;
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Mock AI service - in a real app, replace with actual API call
async function getContextualSuggestions(text: string): Promise<Suggestion[]> {
  // Common phrases that might follow certain beginnings
  const suggestions: Record<string, string[]> = {
    "i want to": ["create a new project", "learn more about", "schedule a meeting"],
    "i need": ["more information about", "to finish this by", "help with"],
    "can you": ["provide more details", "explain how this works", "help me understand"],
    "how do i": ["implement this feature", "solve this problem", "get started with"],
  };
  
  // Check if the text ends with any of our trigger phrases
  const lowerText = text.toLowerCase();
  for (const [trigger, options] of Object.entries(suggestions)) {
    if (lowerText.endsWith(trigger)) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return matching suggestions with confidence scores
      return options.map(option => ({
        text: option,
        confidence: Math.random() * 0.4 + 0.6 // Random confidence between 0.6-1.0
      }));
    }
  }
  
  return [];
}

export default function ContextualAssistanceEditor() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Debounce the input to avoid too many API calls
  const debouncedText = useDebounce(text, 500);
  
  // Get contextual suggestions when the debounced text changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedText.length > 5) {
        setLoading(true);
        try {
          const newSuggestions = await getContextualSuggestions(debouncedText);
          setSuggestions(newSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };
    
    fetchSuggestions();
  }, [debouncedText]);
  
  // Handle accepting a suggestion
  const acceptSuggestion = (suggestion: string) => {
    // Find where current input ends
    const currentInput = debouncedText.toLowerCase();
    let triggerPhrase = "";
    
    // Find which trigger phrase was used
    for (const trigger of ["i want to", "i need", "can you", "how do i"]) {
      if (currentInput.endsWith(trigger)) {
        triggerPhrase = trigger;
        break;
      }
    }
    
    if (triggerPhrase) {
      // Replace the text by keeping everything up to the trigger phrase
      // and then appending the suggestion
      const upToTrigger = debouncedText.substring(0, debouncedText.length);
      const newText = upToTrigger + " " + suggestion;
      setText(newText);
    }
    
    // Clear suggestions after accepting one
    setSuggestions([]);
    
    // Focus back on the textarea
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  
  // Handle textarea input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setSelectedSuggestion(null);
  };
  
  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only handle keys if we have suggestions
    if (suggestions.length === 0) return;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0)
        );
        break;
      case "Tab":
      case "Enter":
        // Accept the selected suggestion if one is selected
        if (selectedSuggestion !== null) {
          e.preventDefault();
          acceptSuggestion(suggestions[selectedSuggestion].text);
        }
        break;
      case "Escape":
        e.preventDefault();
        setSuggestions([]);
        setSelectedSuggestion(null);
        break;
    }
  };
  
  return (
    <div className="relative max-w-2xl w-full mx-auto">
      <div className="relative">
        <textarea
          ref={textAreaRef}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] resize-none"
          placeholder="Start typing... (Try phrases like 'I want to' or 'Can you')"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
        
        {loading && (
          <div className="absolute right-3 top-3 text-blue-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {/* Suggestion popup */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10"
          >
            <div className="p-2 bg-blue-50 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-700">AI Suggestions</span>
            </div>
            
            <ul className="py-1 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className={\`px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between \${
                    selectedSuggestion === index ? 'bg-blue-50' : ''
                  }\`}
                  onClick={() => acceptSuggestion(suggestion.text)}
                  onMouseEnter={() => setSelectedSuggestion(index)}
                >
                  <span>{suggestion.text}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {Math.round(suggestion.confidence * 100)}% match
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
              <span>Tab or Enter to accept • Esc to dismiss</span>
              <button 
                onClick={() => setSuggestions([])} 
                className="text-gray-700 hover:text-gray-900"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tips that appear based on context - these would normally be more sophisticated */}
      {debouncedText.length > 100 && !debouncedText.includes('.') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-yellow-800 font-medium">Writing Tip</p>
            <p className="text-xs text-yellow-700 mt-1">
              Consider breaking your text into sentences with periods for better readability.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
`,
        },
      ]
    },
  },
  {
    id: "progressive-disclosure",
    title: "Progressive Disclosure",
    slug: "progressive-disclosure",
    description: "Reveal information, options, or AI-powered features gradually, reducing cognitive load and making complex tasks approachable.",
    category: "Progressive Disclosure",
    categoryColor: "green",
    featured: true,
    content: {
      problem: "AI-powered products often have complex features that can overwhelm users if shown all at once. Novice users may abandon the product, while advanced users may struggle to find advanced options hidden in cluttered UIs.",
      solution: "Use progressive disclosure to reveal information, options, or AI-powered features only as users need them. Start with the essentials, then offer advanced or contextual AI features as users interact or request more, keeping the interface clean and approachable.",
      examples: [
        {
          title: "Loom AI Video Tools",
          description: "When editing a video, only basic options are shown; advanced AI features (like auto-transcription, highlights) are revealed as needed.",
          imagePath: "/images/examples/loom-ai.gif",
          imageCredit: "Image: Loom"
        },
        {
          title: "Google Docs AI Features",
          description: "Basic editing tools are shown by default. Advanced AI features like 'Summarize with AI' or 'Smart Compose' are revealed only when users interact with certain elements or request more.",
          imagePath: "/images/examples/google-docs-ai.gif",
          imageCredit: "Image: Google Docs"
        },
        {
          title: "Superhuman AI Email",
          description: "Shows a 1-line AI summary above each email; users can click 'expand' to reveal a full summary or more AI-powered actions.",
          imagePath: "/images/examples/superhuman-ai.gif",
          imageCredit: "Image: Superhuman"
        },
        {
          title: "Ada Health AI Symptom Checker",
          description: "Starts with a simple question and only reveals more detailed questions or options as the user progresses, keeping the interface simple for new users.",
          imagePath: "/images/examples/ada-health.gif",
          imageCredit: "Image: Ada Health"
        }
      ],
      guidelines: [
        "Start with the most essential information or actions; reveal advanced AI features only as needed.",
        "Use clear triggers (like 'Show more', tooltips, or step-by-step flows) to let users access additional AI-powered options.",
        "Avoid overwhelming users with too many choices or settings at once.",
        "Test with both novice and advanced users to ensure the right balance of simplicity and power.",
        "Provide contextual explanations or AI tips as users progress."
      ],
      considerations: [
        "Too many layers of disclosure can frustrate users—keep it to 2-3 levels where possible.",
        "Make it obvious how to access more options or information.",
        "Ensure accessibility for all users, including keyboard and screen reader support.",
        "Tailor progressive disclosure to user segments (e.g., show more to advanced users).",
        "Monitor usage analytics to refine what is hidden or revealed by default."
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Adaptive Interfaces",
        "Transparent Feedback"
      ],
      codeExamples: [
        {
          title: "Progressive Disclosure in Email Summarization",
          description: "This React component demonstrates progressive disclosure by revealing AI-powered email summaries and actions step by step. It maintains a clean interface by only showing additional options when the user explicitly requests them.",
          language: "tsx",
          componentId: "progressive-disclosure-email",
          code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface EmailData {
  id: string;
  subject: string;
  sender: string;
  content: string;
  date: string;
  attachments: string[];
}

interface EmailSummary {
  shortSummary: string;
  detailedSummary: string;
  suggestedActions: string[];
  keypoints: string[];
}

// Mock email data
const mockEmail: EmailData = {
  id: "email-123",
  subject: "Project Update: Q3 Roadmap and Timeline",
  sender: "Sarah Johnson <sarah.j@example.com>",
  date: "Today, 2:45 PM",
  content: \`Hi Team,

I wanted to share an update on our Q3 roadmap and timelines. We've made significant progress on the feature development for the mobile app redesign, but we're facing some challenges with the API integration that might push our timeline by about a week.

Key updates:
- Mobile app redesign is 70% complete
- Backend API integration is behind schedule (est. 1 week delay)
- User testing is scheduled for June 15-18
- Marketing materials are ready for review

We'll need to decide if we want to push the release date or adjust the scope to meet our original deadline. I've attached the detailed timeline doc and would appreciate your input by Friday.

Also, I'd like to schedule a sync meeting next Monday at 10 AM to discuss options. Please let me know if this works for your schedule.

Thanks,
Sarah\`,
  attachments: ["Q3_Timeline_v2.pdf", "Feature_Priorities.xlsx"]
};

// Mock AI summary service - in a real app, replace with actual API call
const getMockEmailSummary = (): EmailSummary => {
  return {
    shortSummary: "Q3 project update: Mobile redesign on track, API integration delayed by ~1 week.",
    detailedSummary: "Sarah is sharing a Q3 roadmap update. The mobile app redesign is 70% complete, but API integration is delayed by about a week. User testing is scheduled for June 15-18. A decision is needed on whether to delay the release or reduce scope. Input is requested by Friday, and a meeting is proposed for Monday at 10 AM.",
    suggestedActions: [
      "Respond about Monday's meeting availability",
      "Review timeline documents", 
      "Provide input on scope vs. timeline decision"
    ],
    keypoints: [
      "Mobile app: 70% complete",
      "API integration: ~1 week delay",
      "User testing: June 15-18",
      "Decision needed: adjust timeline or scope",
      "Input needed by: Friday",
      "Proposed meeting: Monday, 10 AM"
    ]
  };
};

export default function ProgressiveDisclosureEmailDemo() {
  const [email] = useState<EmailData>(mockEmail);
  const [summary] = useState<EmailSummary>(getMockEmailSummary());
  
  // State for progressive disclosure levels
  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  
  // Handle toggling the summary visibility
  const toggleSummary = () => {
    if (showDetailed) {
      // If detailed view is open, close everything
      setShowDetailed(false);
      setShowSummary(false);
    } else if (showSummary) {
      // If basic summary is shown, show detailed view
      setShowDetailed(true);
    } else {
      // If nothing is shown, show basic summary
      setShowSummary(true);
    }
  };

  // Handle clicking on a suggested action
  const handleOptionClick = (action: string) => {
    // In a real app, this would perform the action
    alert(\`Action selected: \${action}\`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Email header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{email.subject}</h3>
        <div className="flex justify-between mt-1">
          <div className="text-sm text-gray-600">From: {email.sender}</div>
          <div className="text-sm text-gray-500">{email.date}</div>
        </div>
      </div>
      
      {/* AI Summary Toggle Button - First level of disclosure */}
      <div className="px-6 py-3 bg-blue-50 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-blue-700">AI Assistant</span>
        </div>
        <button 
          onClick={toggleSummary}
          className="text-sm px-3 py-1 rounded-full bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {showDetailed ? "Hide AI Summary" : showSummary ? "Show More" : "Show AI Summary"}
        </button>
      </div>
      
      {/* Progressive disclosure content */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Basic summary - First level of content */}
            <div className="px-6 py-3 bg-blue-50/50 border-t border-blue-100">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Summary: </span>
                {summary.shortSummary}
              </p>
            </div>
            
            {/* Detailed summary - Second level of content */}
            <AnimatePresence>
              {showDetailed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Detailed summary */}
                  <div className="px-6 py-3 bg-blue-50/30 border-t border-blue-100">
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-medium">Detailed: </span>
                      {summary.detailedSummary}
                    </p>
                    
                    {/* Key Points */}
                    <div className="mb-3">
                      <h4 className="text-xs uppercase font-semibold text-gray-500 mb-2">Key Points</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {summary.keypoints.map((point, index) => (
                          <li key={index} className="text-xs flex items-start">
                            <svg className="h-3.5 w-3.5 text-blue-500 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Suggested Actions */}
                    <div>
                      <h4 className="text-xs uppercase font-semibold text-gray-500 mb-2">Suggested Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        {summary.suggestedActions.map((action, index) => (
                          <button 
                            key={index}
                            onClick={() => handleOptionClick(action)}
                            className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Email content */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-700 whitespace-pre-line">{email.content}</p>
      </div>
      
      {/* Email footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex gap-2">
          {email.attachments.map((attachment, index) => (
            <div key={index} className="text-xs py-1 px-2 bg-gray-200 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              {attachment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
        },
      ]
    },
  },
  {
    id: "human-in-the-loop",
    title: "Human-in-the-Loop",
    slug: "human-in-the-loop",
    description: "Balance automation with human oversight and intervention for critical decisions.",
    category: "Human-in-the-Loop",
    categoryColor: "amber",
    featured: true,
    content: {
      problem: "Fully automated AI systems can make critical errors, lack transparency, or fail in edge cases. In high-stakes or ambiguous situations, users need the ability to review, override, or guide AI decisions to ensure safety, compliance, and trust.",
      solution: "Design systems where humans can intervene, review, or approve AI outputs—especially for critical decisions. Provide clear handoff points, easy override mechanisms, and transparent explanations so users can confidently collaborate with AI.",
      examples: [
        {
          title: "Grammarly Writing Assistant",
          description: "Grammarly suggests grammar, spelling, and style improvements as users write, but requires human approval before changes are applied, maintaining user control over the final text.",
          imagePath: "/images/examples/grammarly-suggestions.gif",
          imageCredit: "Image: Grammarly Writing Assistant"
        },
        {
          title: "Google Photos Face Detection",
          description: "Google Photos automatically detects faces in images but relies on users to confirm identities, allowing humans to verify AI suggestions before they're applied.",
          imagePath: "/images/examples/google-face-detection.gif",
          imageCredit: "Image: Google Photos Face Detection"
        },
        {
          title: "OpenAI RLHF",
          description: "OpenAI uses Reinforcement Learning from Human Feedback (RLHF) to improve their models, having humans rate AI outputs to train reward models that guide further refinement.",
          imagePath: "/images/examples/openai-human-feedback.png",
          imageCredit: "Image: OpenAI RLHF Process"
        }
      ],
      guidelines: [
        "Clearly indicate when human review is required or possible.",
        "Make it easy to override, correct, or provide feedback on AI outputs.",
        "Log interventions for transparency and improvement.",
        "Provide explanations for AI decisions to support human judgment.",
        "Design workflows that minimize friction in the handoff between AI and human."
      ],
      considerations: [
        "Balance efficiency with safety—too many interventions can slow down workflows.",
        "Ensure humans are not overwhelmed with too many review requests.",
        "Address potential bias in both AI and human decisions.",
        "Provide training and support for users in review roles.",
        "Monitor and refine the threshold for when human-in-the-loop is triggered."
      ],
      relatedPatterns: [
        "Transparent Feedback",
        "Contextual Assistance",
        "Progressive Disclosure"
      ],
      codeExamples: [
        {
          title: "AI Content Moderation with Human Oversight",
          description: "This React component demonstrates a human-in-the-loop AI moderation system. The AI flags potentially problematic content, but human moderators make the final decision on whether to approve, reject, or override the AI's recommendation.",
          language: "tsx",
          componentId: "human-in-the-loop-moderation",
          code: `import React, { useState, useEffect } from 'react';

// Types for content moderation
interface ContentItem {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface AIModeration {
  decision: 'flagged' | 'approved';
  confidence: number;
  reason?: string;
  categories?: string[];
}

interface ModeratedContent extends ContentItem {
  aiModeration: AIModeration;
  humanDecision?: 'approve' | 'reject' | 'escalate';
  moderatedAt?: string;
  moderatedBy?: string;
}

// Mock data - in a real app, this would come from an API
const mockContent: ModeratedContent[] = [
  {
    id: '1',
    user: 'user123',
    content: 'Check out this amazing offer! Click here to get 80% off: bit.ly/notascam',
    timestamp: '2023-06-15T14:23:00Z',
    aiModeration: {
      decision: 'flagged',
      confidence: 0.87,
      reason: 'Potential scam or misleading content',
      categories: ['spam', 'misleading']
    }
  },
  {
    id: '2',
    user: 'jane_doe',
    content: 'I completely disagree with your point. Your argument makes no sense.',
    timestamp: '2023-06-15T15:10:00Z',
    aiModeration: {
      decision: 'approved',
      confidence: 0.92
    }
  },
  {
    id: '3',
    user: 'support_team',
    content: 'Please provide your account password so we can help troubleshoot your issue.',
    timestamp: '2023-06-15T16:05:00Z',
    aiModeration: {
      decision: 'flagged',
      confidence: 0.94,
      reason: 'Requesting sensitive information',
      categories: ['security', 'privacy']
    }
  }
];

// Simulated AI moderation service
const moderateWithAI = async (content: string): Promise<AIModeration> => {
  // In a real app, this would be an API call to an AI service
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  // Simple keyword-based detection (just for demo purposes)
  const suspiciousTerms = ['password', 'click here', 'offer', 'free', 'scam', 'urgent'];
  const hasSuspiciousTerm = suspiciousTerms.some(term => 
    content.toLowerCase().includes(term.toLowerCase())
  );
  
  if (hasSuspiciousTerm) {
    return {
      decision: 'flagged',
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 70-100%
      reason: 'Potentially suspicious content detected',
      categories: ['suspicious']
    };
  }
  
  return {
    decision: 'approved',
    confidence: Math.random() * 0.3 + 0.7
  };
};

export default function HumanInTheLoopModeration() {
  const [queue, setQueue] = useState<ModeratedContent[]>(mockContent);
  const [currentItem, setCurrentItem] = useState<ModeratedContent | null>(null);
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    reviewed: 0,
    approved: 0,
    rejected: 0,
    escalated: 0
  });

  // Set the first item as current when component mounts
  useEffect(() => {
    if (queue.length > 0 && !currentItem) {
      setCurrentItem(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [queue, currentItem]);

  const handleModeration = (decision: 'approve' | 'reject' | 'escalate') => {
    if (!currentItem) return;
    
    // In a real app, this would update a database
    const now = new Date().toISOString();
    const moderated = {
      ...currentItem,
      humanDecision: decision,
      moderatedAt: now,
      moderatedBy: 'current-moderator'
    };
    
    // Update stats
    setStats(prev => ({
      reviewed: prev.reviewed + 1,
      approved: decision === 'approve' ? prev.approved + 1 : prev.approved,
      rejected: decision === 'reject' ? prev.rejected + 1 : prev.rejected,
      escalated: decision === 'escalate' ? prev.escalated + 1 : prev.escalated
    }));
    
    // Move to next item in queue
    if (queue.length > 0) {
      setCurrentItem(queue[0]);
      setQueue(prev => prev.slice(1));
    } else {
      setCurrentItem(null);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Process with AI first
      const aiResult = await moderateWithAI(newContent);
      
      const newItem: ModeratedContent = {
        id: \`temp-\${Date.now()}\`,
        user: 'test-user',
        content: newContent,
        timestamp: new Date().toISOString(),
        aiModeration: aiResult
      };
      
      // If AI approves with high confidence, auto-approve
      if (aiResult.decision === 'approved' && aiResult.confidence > 0.95) {
        setStats(prev => ({
          ...prev,
          reviewed: prev.reviewed + 1,
          approved: prev.approved + 1
        }));
      } else {
        // Otherwise, add to human review queue
        if (currentItem) {
          setQueue(prev => [...prev, newItem]);
        } else {
          setCurrentItem(newItem);
        }
      }
      
      setNewContent('');
    } catch (error) {
      console.error('Error submitting content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left panel - Moderation Queue */}
      <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Content Moderation Queue</h2>
        
        {currentItem ? (
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">{currentItem.user}</span>
              <span className="text-sm text-gray-500">{new Date(currentItem.timestamp).toLocaleString()}</span>
            </div>
            
            <p className="mb-4 p-3 bg-gray-50 rounded border">{currentItem.content}</p>
            
            <div className="flex items-center mb-4">
              <span className={\`px-2 py-1 rounded-full text-xs font-medium \${
                currentItem.aiModeration.decision === 'flagged' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }\`}>
                {currentItem.aiModeration.decision === 'flagged' ? 'AI Flagged' : 'AI Approved'}
              </span>
              
              <span className="ml-2 text-sm text-gray-500">
                {Math.round(currentItem.aiModeration.confidence * 100)}% confidence
              </span>
              
              {currentItem.aiModeration.reason && (
                <span className="ml-2 text-sm text-gray-700">
                  Reason: {currentItem.aiModeration.reason}
                </span>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleModeration('approve')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button 
                onClick={() => handleModeration('reject')}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
              <button 
                onClick={() => handleModeration('escalate')}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
              >
                Escalate
              </button>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-6 mb-4 text-center text-gray-500">
            No content waiting for moderation
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Test with your own content</h3>
          <form onSubmit={handleContentSubmit} className="space-y-3">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="Type content to test moderation system..."
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Submit for Moderation'}
            </button>
            <p className="text-xs text-gray-500">
              Try including words like "password" or "click here" to trigger the AI moderation
            </p>
          </form>
        </div>
      </div>
      
      {/* Right panel - Stats and Info */}
      <div className="bg-white rounded-lg shadow p-4 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Moderation Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Content Reviewed:</span>
              <span className="font-medium">{stats.reviewed}</span>
            </div>
            <div className="flex justify-between">
              <span>Approved:</span>
              <span className="font-medium text-green-600">{stats.approved}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejected:</span>
              <span className="font-medium text-red-600">{stats.rejected}</span>
            </div>
            <div className="flex justify-between">
              <span>Escalated:</span>
              <span className="font-medium text-yellow-600">{stats.escalated}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Content is first processed by AI moderation</li>
            <li>High-confidence safe content may be auto-approved</li>
            <li>Flagged or uncertain content goes to human review</li>
            <li>Human moderators have final decision authority</li>
            <li>The system learns from human decisions over time</li>
          </ol>
        </div>
        
        <div className="p-3 bg-blue-50 rounded border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-1">Key Principle</h3>
          <p className="text-sm text-blue-700">
            Human-in-the-loop systems combine AI efficiency with human judgment 
            to create safer, more reliable content moderation.
          </p>
        </div>
      </div>
    </div>
  );
}
`,
        },
      ]
    }
  },
  {
    id: "conversational-ui",
    title: "Conversational UI",
    slug: "conversational-ui",
    description: "Design interfaces that enable natural, human-like conversations between users and AI systems.",
    category: "User Interaction",
    categoryColor: "indigo",
    featured: true,
    content: {
      problem: "Traditional graphical interfaces can be unintuitive, rigid, and require users to learn specific interaction patterns. For many tasks, especially when working with AI systems, a more natural, conversation-based approach can be more effective and accessible.",
      solution: "Create interfaces that allow users to interact through natural language conversations, enabling fluid, contextual interactions that mimic human dialogue while still providing structure and guidance when needed.",
      examples: [
        {
          title: "Slack AI",
          description: "Slack's conversational assistant helps summarize channels, answer questions about company knowledge, and automate workflows in a familiar chat interface.",
          imagePath: "/images/examples/slack-ai.gif",
          imageCredit: "Image: Slack AI"
        },
        {
          title: "Microsoft Copilot",
          description: "Microsoft's AI assistant provides a conversational interface for answering questions, generating content, and helping with tasks across Microsoft products.",
          imagePath: "/images/examples/microsoft-copilot.gif",
          imageCredit: "Image: Microsoft Copilot"
        },
        {
          title: "Siri",
          description: "Apple's voice assistant provides a conversational interface for tasks like setting reminders, answering questions, and controlling smart home devices.",
          imagePath: "/images/examples/siri-conversation.gif",
          imageCredit: "Image: Apple Siri"
        }
      ],
      guidelines: [
        "Design for natural, conversational flow while providing clear indicators of system capabilities",
        "Balance open-ended conversation with guided options when appropriate",
        "Maintain conversation history and context to create coherent interactions",
        "Provide clear indicators when the system is processing or 'thinking'",
        "Support multimodal inputs (text, voice, images) where appropriate for more natural interaction"
      ],
      considerations: [
        "Consider accessibility needs for users who may not be comfortable with purely conversation-based interfaces",
        "Balance personality in AI responses — friendly but professional, avoiding uncanny valley effects",
        "Provide fallback mechanisms when the conversational interface cannot understand or process requests",
        "Handle conversation repair gracefully (corrections, clarifications, misunderstandings)",
        "Consider privacy implications of storing conversation history and context"
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Human-in-the-Loop",
        "Progressive Disclosure"
      ],
      codeExamples: [
        {
          title: "Simple Conversational Bot Interface",
          description: "This React component implements a conversational UI for a customer support bot that can answer questions, handle escalations to human agents, and maintain conversation context.",
          language: "tsx",
          componentId: "conversational-ui-bot",
          code: `import React, { useState, useRef, useEffect } from 'react';

// Define message types
type MessageRole = 'user' | 'bot' | 'system';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  isLoading?: boolean;
}

// Simple knowledge base for demo purposes
const knowledgeBase = {
  'pricing': 'Our pricing starts at $10/month for the basic plan, $25/month for pro, and $50/month for enterprise.',
  'refund': 'We offer a 30-day money-back guarantee for all our plans. You can request a refund from your account page.',
  'account': 'You can manage your account settings by clicking on your profile picture in the top right corner.',
  'contact': 'You can reach our support team at support@example.com or call us at (555) 123-4567.',
  'hours': 'Our support team is available Monday through Friday, 9am to 5pm Eastern Time.'
};

// Function to get response from knowledge base or handle escalation
const getBotResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const lowercaseMessage = message.toLowerCase();
  
  // Check if user wants to talk to a human
  if (lowercaseMessage.includes('human') || 
      lowercaseMessage.includes('agent') || 
      lowercaseMessage.includes('person') || 
      lowercaseMessage.includes('representative')) {
    return "I'll connect you with a human support agent right away. Please hold while I transfer your chat...";
  }
  
  // Check knowledge base for relevant responses
  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowercaseMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Handle greetings
  if (lowercaseMessage.includes('hello') || 
      lowercaseMessage.includes('hi') || 
      lowercaseMessage.includes('hey')) {
    return "Hello! I'm your AI assistant. How can I help you today?";
  }
  
  // Handle thanks
  if (lowercaseMessage.includes('thank') || 
      lowercaseMessage.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Default response
  return "I'm not sure I understand your question. You can ask me about our pricing, refund policy, account settings, or contact information. If you'd prefer to speak with a human agent, just let me know.";
};

export default function ConversationalUiDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isTransferringToHuman, setIsTransferringToHuman] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isWaitingForResponse) return;
    
    // Generate a unique ID for the message
    const userMessageId = Date.now().toString();
    const botResponseId = (Date.now() + 1).toString();
    
    // Add user message
    const userMessage: Message = {
      id: userMessageId,
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };
    
    // Add temporary bot message with loading state
    const tempBotMessage: Message = {
      id: botResponseId,
      content: '',
      role: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, tempBotMessage]);
    setInputValue('');
    setIsWaitingForResponse(true);
    
    try {
      // Get response from AI
      const responseContent = await getBotResponse(inputValue);
      
      // Check if we need to transfer to human
      if (responseContent.includes("I'll connect you with a human")) {
        setIsTransferringToHuman(true);
        
        // Simulate a human joining after a delay
        setTimeout(() => {
          setMessages(prev => [
            ...prev.filter(m => m.id !== botResponseId),
            {
              id: botResponseId,
              content: responseContent,
              role: 'bot',
              timestamp: new Date()
            },
            {
              id: Date.now().toString(),
              content: "This is Sarah from customer support. I can see your conversation history. How can I help you today?",
              role: 'system',
              timestamp: new Date()
            }
          ]);
          setIsTransferringToHuman(false);
          setIsWaitingForResponse(false);
        }, 3000);
      } else {
        // Update the temporary bot message with the actual response
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botResponseId 
              ? { ...msg, content: responseContent, isLoading: false } 
              : msg
          )
        );
        setIsWaitingForResponse(false);
      }
    } catch (error) {
      // Handle error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botResponseId 
            ? { 
                ...msg, 
                content: "Sorry, I'm having trouble connecting. Please try again in a moment.", 
                isLoading: false 
              } 
            : msg
        )
      );
      setIsWaitingForResponse(false);
    }
  };

  // Render the appropriate message bubble based on role
  const renderMessage = (message: Message) => {
    if (message.isLoading) {
      return (
        <div key={message.id} className="flex items-start mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs sm:max-w-md relative">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      );
    }

    switch (message.role) {
      case 'user':
        return (
          <div key={message.id} className="flex items-start mb-4 justify-end">
            <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs sm:max-w-md">
              {message.content}
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        );
      case 'bot':
        return (
          <div key={message.id} className="flex items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.584 2.568a.75.75 0 01.832 0l7 4a.75.75 0 010 1.312l-7 4a.75.75 0 01-.832 0l-7-4a.75.75 0 010-1.312l7-4z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 6.5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs sm:max-w-md">
              {message.content}
            </div>
          </div>
        );
      case 'system':
        return (
          <div key={message.id} className="flex items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="bg-green-100 rounded-lg py-2 px-4 max-w-xs sm:max-w-md">
              {message.content}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-gray-300 rounded-md bg-white shadow-sm">
      {/* Chat header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Support Assistant</h3>
          <p className="text-sm text-gray-500">
            {isWaitingForResponse && isTransferringToHuman 
              ? "Connecting to a support agent..." 
              : "Online • Usually responds in a few minutes"}
          </p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map(message => renderMessage(message))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isWaitingForResponse && isTransferringToHuman}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!inputValue.trim() || isWaitingForResponse}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 9.414l-1.293 1.293a1 1 0 11-1.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {isWaitingForResponse && isTransferringToHuman 
            ? "Connecting you to a human support agent..."
            : "Ask about pricing, refunds, account settings, or contact information. You can also ask to speak with a human agent."}
        </div>
      </form>
    </div>
  );
}
`,
        },
      ]
    },
  },
  {
    id: "transparent-feedback",
    title: "Transparent Feedback",
    slug: "transparent-feedback",
    description: "Communicate AI system capabilities, limitations, and confidence levels clearly to build user trust and set appropriate expectations.",
    category: "Transparent Feedback",
    categoryColor: "pink",
    featured: true,
    content: {
      problem: "Users often don't understand AI capabilities and limitations, leading to unrealistic expectations, confusion, and mistrust when the system behaves in unexpected ways or makes errors.",
      solution: "Provide clear, honest feedback about what the AI system is doing, how confident it is in its outputs, and what its limitations are. Use visual cues, confidence scores, and explanations to help users understand the system's capabilities and make informed decisions.",
      examples: [
        {
          title: "Perplexity AI Attribution",
          description: "Provides clear source attribution for information, citing references and showing confidence levels to help users verify facts and assess reliability.",
          imagePath: "/images/examples/perplexity-attribution.gif",
          imageCredit: "Image: Perplexity AI"
        },
        {
          title: "GitHub Copilot Highlighting",
          description: "Clearly indicates AI-generated code suggestions with a specific background color and interface elements, showing where the AI's input begins and ends.",
          imagePath: "/images/examples/github-copilot-highlighting.gif",
          imageCredit: "Image: GitHub Copilot"
        },
        {
          title: "ChatGPT Confidence Indicators",
          description: "Shows when it's uncertain about responses, admits limitations, and clarifies when it may not have complete or up-to-date information.",
          imagePath: "/images/examples/chatgpt-limitations.png",
          imageCredit: "Image: OpenAI ChatGPT"
        }
      ],
      guidelines: [
        "Clearly indicate when content is AI-generated versus human-created",
        "Use visual indicators to show confidence levels for predictions and suggestions",
        "Provide explanations for AI decisions when appropriate, especially for critical or unexpected outcomes",
        "Be transparent about system limitations and potential errors",
        "Offer ways for users to provide feedback and correct AI mistakes"
      ],
      considerations: [
        "Balance transparency with overwhelming users with too much technical information",
        "Consider how to communicate uncertainty without undermining user confidence in the system",
        "Design feedback mechanisms that collect useful information without interrupting workflow",
        "Account for varying user expertise levels when explaining AI capabilities",
        "Ensure transparency doesn't compromise user privacy or system security"
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Human-in-the-Loop",
        "Progressive Disclosure"
      ],
      codeExamples: [
        {
          title: "Confidence Indicator Component",
          description: "This React component visualizes AI confidence levels for predictions, helping users understand how much to trust a given output.",
          language: "tsx",
          componentId: "confidence-indicator",
          code: `import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceIndicatorProps {
  // Confidence level between 0 and 1
  confidence: number;
  // Optional label for the confidence
  label?: string;
  // Whether to show the exact percentage
  showPercentage?: boolean;
  // Size of the indicator - 'sm', 'md', or 'lg'
  size?: 'sm' | 'md' | 'lg';
  // Optional className for styling
  className?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  label,
  showPercentage = true,
  size = 'md',
  className = '',
}) => {
  // Ensure confidence is between 0 and 1
  const normalizedConfidence = Math.max(0, Math.min(1, confidence));
  
  // Convert to percentage for display
  const percentage = Math.round(normalizedConfidence * 100);
  
  // Determine color based on confidence level
  const getColor = () => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Determine the size of the indicator
  const getSize = () => {
    switch(size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };
  
  return (
    <div className={\`\${className} w-full\`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-700">{percentage}%</span>
          )}
        </div>
      )}
      
      <div className={\`w-full bg-gray-200 rounded-full overflow-hidden \${getSize()}\`}>
        <motion.div
          className={\`\${getColor()} rounded-full \${getSize()}\`}
          initial={{ width: '0%' }}
          animate={{ width: \`\${percentage}%\` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {!label && showPercentage && (
        <span className="text-xs text-gray-500 mt-1">
          {percentage}% confidence
        </span>
      )}
    </div>
  );
};

// Example usage component that shows various AI predictions with confidence levels
export const AITransparencyDemo: React.FC = () => {
  // Example predictions with confidence levels
  const predictions = [
    { label: 'Content is non-toxic', confidence: 0.92 },
    { label: 'Sentiment is positive', confidence: 0.78 },
    { label: 'Topic is technology', confidence: 0.85 },
    { label: 'Contains personal information', confidence: 0.35 },
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Analysis Results</h3>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <ConfidenceIndicator
            key={index}
            confidence={prediction.confidence}
            label={prediction.label}
            size="md"
          />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Understanding AI Confidence</h4>
        <p className="text-xs text-gray-600">
          Higher confidence scores (80%+) indicate stronger predictions, while lower scores suggest uncertainty. 
          Consider human review for decisions with confidence below 70%.
        </p>
      </div>
    </div>
  );
};

// Default export for the demo
export default function ConfidenceIndicator() {
  return (
    <div className="max-w-xl mx-auto">
      <AITransparencyDemo />
    </div>
  );
}
`,
        }
      ]
    }
  },
];

export default patterns;
