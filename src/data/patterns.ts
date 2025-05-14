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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
        },
      ]
    },
  },
  {
    id: "adaptive-interfaces",
    title: "Adaptive Interfaces",
    slug: "adaptive-interfaces",
    description: "Create UI that dynamically adjusts based on user behavior, context, and preferences to provide personalized experiences.",
    category: "User Interaction",
    categoryColor: "purple",
    featured: true,
    content: {
      problem: "Traditional static interfaces treat all users the same regardless of their experience level, preferences, or current context, resulting in experiences that are either too complex for beginners or too basic for advanced users.",
      solution: "Design interfaces that intelligently adapt to individual users based on their behavior patterns, preferences, and situational context. This creates more personalized, efficient, and satisfying user experiences that evolve alongside user needs.",
      examples: [
        {
          title: "Netflix Recommendations",
          description: "Adapts the entire user interface to show personalized content recommendations based on viewing history and preferences.",
          imagePath: "/images/examples/netflix-adaptive.gif",
          imageCredit: "Image: Netflix"
        },
        {
          title: "Spotify Home Feed",
          description: "Dynamically changes recommended playlists and features based on time of day, listening habits, and discovered preferences.",
          imagePath: "/images/examples/spotify-adaptive.gif",
          imageCredit: "Image: Spotify"
        },
        {
          title: "Duolingo Learning Path",
          description: "Adjusts lesson difficulty and review frequency based on user performance and learning patterns.",
          imagePath: "/images/examples/duolingo-adaptive.gif",
          imageCredit: "Image: Duolingo"
        }
      ],
      guidelines: [
        "Collect meaningful data on user behavior to drive adaptation, but be transparent about what's collected",
        "Make adaptations gradual and predictable to avoid disorienting users",
        "Provide users with control over adaptation settings and the ability to reset preferences",
        "Ensure core functionality remains consistent even as the interface adapts",
        "Test adaptations extensively to ensure they improve rather than hinder the user experience"
      ],
      considerations: [
        "Balance automation with user control—adaptations should feel helpful, not controlling",
        "Consider privacy implications when collecting user data to power adaptations",
        "Ensure the system degrades gracefully when user data is limited or unavailable",
        "Avoid unnecessary or overly frequent changes that could create interface instability",
        "Provide ways for users to understand why changes are happening and how to influence them"
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Progressive Disclosure",
        "Transparent Feedback"
      ],
      codeExamples: [
        {
          title: "Adaptive Language Learning Interface",
          description: "This React component shows how a language learning app can adapt its difficulty based on user performance, automatically increasing difficulty after consecutive correct answers or simplifying content when users struggle.",
          language: "tsx",
          componentId: "adaptive-learning",
          code: `import React, { useState, useEffect } from 'react';

// Define the types for our vocabulary words and questions
interface VocabularyWord {
  id: number;
  word: string;
  translation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
}

interface Question {
  id: number;
  type: 'translation' | 'multiple-choice' | 'fill-in-blank';
  prompt: string;
  correctAnswer: string;
  options?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// Sample vocabulary database
const vocabularyDatabase: VocabularyWord[] = [
  { id: 1, word: 'perro', translation: 'dog', difficulty: 'easy' },
  { id: 2, word: 'gato', translation: 'cat', difficulty: 'easy' },
  { id: 3, word: 'casa', translation: 'house', difficulty: 'easy' },
  { id: 4, word: 'libro', translation: 'book', difficulty: 'easy' },
  { id: 5, word: 'escuela', translation: 'school', difficulty: 'medium' },
  { id: 6, word: 'ventana', translation: 'window', difficulty: 'medium' },
  { id: 7, word: 'ordenador', translation: 'computer', difficulty: 'medium' },
  { id: 8, word: 'amanecer', translation: 'sunrise', difficulty: 'hard' },
  { id: 9, word: 'desarrollador', translation: 'developer', difficulty: 'hard' },
  { id: 10, word: 'biblioteca', translation: 'library', difficulty: 'hard' },
];

// Sample questions based on vocabulary
const generateQuestions = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  const filteredWords = vocabularyDatabase.filter(word => word.difficulty === difficulty);
  
  return filteredWords.map(word => {
    // For simplicity, just create translation questions, but you could add other types
    const question: Question = {
      id: word.id,
      type: 'translation',
      prompt: \`Translate "\${word.word}" to English\`,
      correctAnswer: word.translation,
      difficulty: word.difficulty
    };
    
    return question;
  });
};

export default function AdaptiveLearningDemo() {
  // User progress and state
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  
  // Initialize questions based on difficulty
  useEffect(() => {
    setQuestions(generateQuestions(currentDifficulty));
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
  }, [currentDifficulty]);

  // Current question
  const currentQuestion = questions[currentQuestionIndex] || null;

  // Check user answer
  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      // Adaptive difficulty: adjust based on consecutive correct answers
      if (adaptiveMode && newConsecutive >= 3) {
        if (currentDifficulty === 'easy') {
          setCurrentDifficulty('medium');
          setUserLevel('intermediate');
        } else if (currentDifficulty === 'medium') {
          setCurrentDifficulty('hard');
          setUserLevel('advanced');
        }
        setConsecutiveCorrect(0);
      }
    } else {
      // Reset consecutive correct counter when wrong
      setConsecutiveCorrect(0);
      
      // Adaptive difficulty: drop back down if struggling with harder content
      if (adaptiveMode && feedback === 'incorrect' && (currentQuestionIndex >= questions.length - 1)) {
        if (currentDifficulty === 'hard') {
          setCurrentDifficulty('medium');
          setUserLevel('intermediate');
        } else if (currentDifficulty === 'medium') {
          setCurrentDifficulty('easy');
          setUserLevel('beginner');
        }
      }
    }
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of questions set, reset or generate new questions
      setCurrentQuestionIndex(0);
    }
    
    setUserAnswer('');
    setFeedback(null);
  };

  // Toggle adaptive mode
  const toggleAdaptiveMode = () => {
    setAdaptiveMode(!adaptiveMode);
    
    // Reset to beginner if turning adaptive mode back on
    if (!adaptiveMode) {
      setCurrentDifficulty('easy');
      setUserLevel('beginner');
      setConsecutiveCorrect(0);
    }
  };

  // Manually change difficulty (only available when adaptive mode is off)
  const changeDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCurrentDifficulty(difficulty);
    setUserLevel(
      difficulty === 'easy' ? 'beginner' : 
      difficulty === 'medium' ? 'intermediate' : 'advanced'
    );
    setConsecutiveCorrect(0);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with level and settings */}
      <div className="bg-green-500 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Adaptive Spanish Learning</h2>
          <div className="text-sm flex items-center">
            <span className="mr-2">Level: {userLevel}</span>
            <span className="bg-white text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {currentDifficulty.toUpperCase()}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)} 
          className="rounded-full bg-white bg-opacity-20 p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      {/* Settings panel (toggled) */}
      {showSettings && (
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Learning Settings</h3>
          
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="adaptive-mode" className="text-sm text-gray-600">
              Adaptive Mode (adjusts to your performance)
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                type="checkbox" 
                id="adaptive-mode" 
                className="sr-only"
                checked={adaptiveMode}
                onChange={toggleAdaptiveMode}
              />
              <div className={\`block h-6 rounded-full w-10 \${adaptiveMode ? 'bg-green-400' : 'bg-gray-300'}\`}></div>
              <div className={\`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform \${adaptiveMode ? 'translate-x-4' : ''}\`}></div>
            </div>
          </div>
          
          {!adaptiveMode && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Set difficulty manually:</p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => changeDifficulty('easy')} 
                  className={\`px-3 py-1 rounded text-xs font-medium \${currentDifficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}\`}
                >
                  Easy
                </button>
                <button 
                  onClick={() => changeDifficulty('medium')} 
                  className={\`px-3 py-1 rounded text-xs font-medium \${currentDifficulty === 'medium' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}\`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => changeDifficulty('hard')} 
                  className={\`px-3 py-1 rounded text-xs font-medium \${currentDifficulty === 'hard' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}\`}
                >
                  Hard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current question */}
      {currentQuestion && (
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">Translate to English</p>
            <h3 className="text-xl font-bold text-gray-800">{currentQuestion.prompt}</h3>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={feedback !== null}
            />
          </div>
          
          {/* Feedback */}
          {feedback && (
            <div className={\`p-3 mb-4 rounded-md \${feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>
              {feedback === 'correct' ? (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Correct! Great job.</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p>Incorrect.</p>
                    <p className="text-sm">The correct answer is: {currentQuestion.correctAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex justify-between">
            {!feedback ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className={\`w-full py-3 rounded-md font-medium \${
                  userAnswer.trim() 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }\`}
              >
                Check
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="w-full py-3 rounded-md font-medium bg-green-500 text-white"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="px-6 pb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{currentQuestionIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: \`\${((currentQuestionIndex + 1) / questions.length) * 100}%\` }}
          ></div>
        </div>
        
        {/* Adaptive mode indicator */}
        {adaptiveMode && consecutiveCorrect > 0 && (
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>
              {consecutiveCorrect}/3 correct in a row
              {consecutiveCorrect === 2 && currentDifficulty !== 'hard' && " - one more for next level!"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}`
        }
      ]
    }
  },
  {
    id: "multimodal-interaction",
    title: "Multimodal Interaction",
    slug: "multimodal-interaction",
    description: "Enable interaction through multiple input and output channels",
    category: "Multimodal Interaction",
    categoryColor: "cyan",
    featured: true,
    content: {
      problem: "Users often need to interact with AI using different types of inputs (text, voice, images) depending on their context, abilities, or the nature of their query.",
      solution: "Design interfaces that support multiple modes of interaction, allowing users to seamlessly switch between input types while maintaining context across modalities.",
      examples: [
        {
          title: "Google Lens",
          description: "Allows users to search using camera images, uploaded photos, or text queries, with results displayed in various formats based on content type.",
          imagePath: "/images/examples/google-lens.gif"
        },
        {
          title: "ChatGPT Voice Mode",
          description: "Enables users to have natural conversations through voice while also supporting text input and image sharing within the same interaction flow.",
          imagePath: "/images/examples/chatgpt-voice.gif"
        },
        {
          title: "Microsoft Copilot",
          description: "Integrates text, image, and voice inputs across applications, maintaining context as users switch between modalities.",
          imagePath: "/images/examples/ms-copilot.gif"
        }
      ],
      guidelines: [
        "Ensure seamless transitions between different input modalities",
        "Maintain interaction context when users switch between modes",
        "Provide clear feedback about which modality is currently active",
        "Design for accessibility by ensuring features work across diverse user needs",
        "Allow users to combine modalities when appropriate (e.g., voice + pointing)"
      ],
      considerations: [
        "Balance between offering multiple modalities and keeping the interface simple",
        "Handle potential errors or misinterpretations across different input types",
        "Consider privacy implications of different modalities (especially voice and camera)",
        "Ensure consistent user experience across all interaction modes",
        "Design for different environments where certain modalities might be preferred or limited"
      ],
      relatedPatterns: [
        "Adaptive Interface",
        "Contextual Assistance",
        "Transparent Feedback"
      ],
      codeExamples: [
        {
          title: "Multimodal Search Interface",
          description: "This React component demonstrates a multimodal search interface that allows users to search using text, voice, or image input. It provides a unified experience while supporting different input modalities based on user preference and context.",
          language: "tsx",
          componentId: "multimodal-search",
          code: `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our component
interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'image' | 'voice' | 'combined';
  imageUrl?: string;
  confidence: number;
}

type InputModality = 'text' | 'voice' | 'image' | null;

// Mock API service for demonstration
const searchApi = {
  textSearch: async (query: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock results
    return [
      {
        id: '1',
        title: 'Text Search Result 1',
        description: \`Results for your search: "\${query}"\`,
        type: 'text',
        confidence: 0.92
      },
      {
        id: '2',
        title: 'Text Search Result 2',
        description: \`More information about "\${query}"\`,
        type: 'text',
        confidence: 0.85
      }
    ];
  },
  
  voiceSearch: async (audioBlob: Blob): Promise<{text: string, results: SearchResult[]}> => {
    // In a real app, we would send the audio to a speech-to-text API
    // Here we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockedTranscription = "voice search example";
    
    return {
      text: mockedTranscription,
      results: [
        {
          id: '3',
          title: 'Voice Search Result',
          description: \`Results for your voice query: "\${mockedTranscription}"\`,
          type: 'voice',
          confidence: 0.88
        }
      ]
    };
  },
  
  imageSearch: async (imageFile: File): Promise<SearchResult[]> => {
    // In a real app, we would send the image to an image recognition API
    // Here we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      {
        id: '4',
        title: 'Image Search Result',
        description: 'Results based on your uploaded image',
        type: 'image',
        imageUrl: URL.createObjectURL(imageFile),
        confidence: 0.79
      }
    ];
  }
};

const MultimodalSearch: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeModality, setActiveModality] = useState<InputModality>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<{term: string, modality: InputModality}[]>([]);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Handle text search submission
  const handleTextSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    try {
      setIsSearching(true);
      setActiveModality('text');
      setErrorMessage(null);
      
      const results = await searchApi.textSearch(searchTerm);
      
      setResults(results);
      // Add to recent searches
      addToRecentSearches(searchTerm, 'text');
      
    } catch (error) {
      console.error('Error performing text search:', error);
      setErrorMessage('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle voice search
  const handleVoiceSearch = async () => {
    try {
      setActiveModality('voice');
      setIsSearching(true);
      setErrorMessage(null);
      
      // In a real app, we would record audio here
      // For demo purposes, we'll simulate a voice recording
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock audio blob (in a real app this would be actual recorded audio)
      const mockAudioBlob = new Blob([], { type: 'audio/webm' });
      
      // Process the voice input
      const { text, results } = await searchApi.voiceSearch(mockAudioBlob);
      
      // Update the search term with the transcription
      setSearchTerm(text);
      setResults(results);
      
      // Add to recent searches
      addToRecentSearches(text, 'voice');
      
    } catch (error) {
      console.error('Error performing voice search:', error);
      setErrorMessage('An error occurred during voice recognition. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle image search
  const handleImageSearch = async (file?: File) => {
    try {
      setActiveModality('image');
      setIsSearching(true);
      setErrorMessage(null);
      
      // Get the file either from the parameter or from the file input
      const imageFile = file || (fileInputRef.current?.files?.[0]);
      
      if (!imageFile) {
        throw new Error('No image file selected');
      }
      
      // Process the image
      const results = await searchApi.imageSearch(imageFile);
      
      setResults(results);
      setSearchTerm(\`Image: \${imageFile.name}\`);
      
      // Add to recent searches
      addToRecentSearches(\`Image: \${imageFile.name}\`, 'image');
      
    } catch (error) {
      console.error('Error performing image search:', error);
      setErrorMessage('An error occurred while processing your image. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSearch(file);
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Add search to recent searches
  const addToRecentSearches = (term: string, modality: InputModality) => {
    setRecentSearches(prev => {
      // Add to the beginning and limit to 5 recent searches
      const updated = [{ term, modality }, ...prev.filter(item => item.term !== term)];
      return updated.slice(0, 5);
    });
  };
  
  // Clear search results
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setActiveModality(null);
    setErrorMessage(null);
    
    // Focus back on search input
    searchInputRef.current?.focus();
  };
  
  // Effect to reset active modality when search term is cleared
  useEffect(() => {
    if (!searchTerm) {
      setActiveModality(null);
    }
  }, [searchTerm]);
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Multimodal Search</h1>
        <p className="text-cyan-50 mb-6">Search using text, voice, or images - choose what works best for you</p>
        
        {/* Search form */}
        <form onSubmit={handleTextSearch} className="relative">
          <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            {/* Search input */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search or use voice/image input..."
              className="flex-grow py-3 px-4 focus:outline-none text-gray-700"
              disabled={isSearching}
            />
            
            {/* Clear button */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 px-2"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 mx-1"></div>
            
            {/* Voice search button */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              disabled={isSearching}
              className={\`p-3 transition-colors \${
                activeModality === 'voice' 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'
              }\`}
              aria-label="Search with voice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            
            {/* Image search button */}
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={isSearching}
              className={\`p-3 transition-colors \${
                activeModality === 'image' 
                  ? 'text-green-500 bg-green-50' 
                  : 'text-gray-500 hover:text-green-500 hover:bg-gray-100'
              }\`}
              aria-label="Search with image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={!searchTerm.trim() || isSearching}
              className={\`p-3 px-5 font-medium text-white \${
                !searchTerm.trim() || isSearching 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }\`}
            >
              {isSearching ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Hidden file input for image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
        
        {/* Modality indicator */}
        <div className="mt-4 flex justify-center">
          {activeModality && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={\`inline-flex items-center py-1 px-3 rounded-full text-sm font-medium \${
                activeModality === 'text' ? 'bg-blue-100 text-blue-800' :
                activeModality === 'voice' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }\`}
            >
              {activeModality === 'text' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Text Search
                </>
              )}
              
              {activeModality === 'voice' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Voice Search
                </>
              )}
              
              {activeModality === 'image' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Image Search
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 text-red-700 px-6 py-3 border-b border-red-200"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content area */}
      <div className="p-6">
        {/* Recent searches */}
        {recentSearches.length > 0 && !results.length && (
          <div className="mb-6">
            <h2 className="text-md font-medium text-gray-700 mb-2">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search.term);
                    setActiveModality(search.modality);
                    
                    // If it's a text search, trigger the search
                    if (search.modality === 'text') {
                      handleTextSearch();
                    }
                  }}
                  className={\`inline-flex items-center py-1.5 px-3 rounded-md text-sm \${
                    search.modality === 'text' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' :
                    search.modality === 'voice' ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' :
                    'bg-green-50 text-green-700 hover:bg-green-100'
                  }\`}
                >
                  {search.modality === 'text' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  
                  {search.modality === 'voice' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                  
                  {search.modality === 'image' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  
                  {search.term.length > 30 
                    ? \`\${search.term.substring(0, 30)}...\` 
                    : search.term}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search results */}
        {results.length > 0 ? (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
            
            <div className="space-y-4">
              {results.map(result => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={\`p-4 rounded-lg border \${
                    result.type === 'text' ? 'border-blue-200 bg-blue-50' :
                    result.type === 'voice' ? 'border-purple-200 bg-purple-50' :
                    'border-green-200 bg-green-50'
                  }\`}
                >
                  <div className="flex items-start">
                    {/* Result icon */}
                    <div className={\`rounded-full p-2 mr-3 \${
                      result.type === 'text' ? 'bg-blue-100 text-blue-600' :
                      result.type === 'voice' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }\`}>
                      {result.type === 'text' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      )}
                      
                      {result.type === 'voice' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                      
                      {result.type === 'image' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Result content */}
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{result.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                      
                      {/* Display confidence score */}
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-500 mr-1">Confidence:</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={\`h-full \${
                              result.confidence > 0.8 ? 'bg-green-500' :
                              result.confidence > 0.6 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }\`} 
                            style={{ width: \`\${result.confidence * 100}%\` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{Math.round(result.confidence * 100)}%</span>
                      </div>
                      
                      {/* Image preview for image results */}
                      {result.type === 'image' && result.imageUrl && (
                        <div className="mt-3">
                          <img 
                            src={result.imageUrl} 
                            alt="Search result" 
                            className="h-32 w-auto rounded border border-gray-300 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            {isSearching ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                <p className="mt-4 text-gray-500">Searching across multiple modalities...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="mt-4 text-gray-500">Use the search bar to find information using text, voice, or images</p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => searchInputRef.current?.focus()}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Type a search
                  </button>
                  <button
                    onClick={handleVoiceSearch}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Use voice search
                  </button>
                  <button
                    onClick={triggerFileInput}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload an image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer with user guidance */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="ml-2 text-xs text-gray-600">
              <span className="font-medium">Tip:</span> Write freely, then use AI assistance to refine your content. Remember that you have control - you can apply, modify, or ignore any AI suggestion.
            </p>
          </div>
        </div>
      </div>
      
      {/* Document stats (could be expanded in a real app) */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <div>
          <span className="font-medium">Reading time:</span> {Math.max(1, Math.ceil(state.content.split(' ').length / 200))} min
        </div>
        <div>
          <span className="font-medium">Word count:</span> {state.content.trim() ? state.content.trim().split(/\s+/).length : 0}
        </div>
      </div>
    </div>
  );
};

export default AugmentedEditor;
`
        }
      ]
    }
  },
  {
    id: "explainable-ai",
    title: "Explainable AI (XAI)",
    slug: "explainable-ai",
    description: "Make AI decision-making processes understandable through visualizations and explanations",
    category: "Explainable AI (XAI)",
    categoryColor: "sky",
    featured: true,
    content: {
      problem: "AI systems often function as black boxes, making decisions and recommendations without revealing their reasoning, which reduces user trust and understanding.",
      solution: "Design interfaces that make AI decision-making processes transparent and understandable to users through visualizations, natural language explanations, and interactive explorations of the system's reasoning.",
      examples: [
        {
          title: "Anthropic Claude's 'Show Your Reasoning'",
          description: "Reveals step-by-step thought processes behind answers, allowing users to follow the AI's logical path.",
          imagePath: "/images/examples/claude-reasoning.gif"
        },
        {
          title: "IBM Watson's Decision Transparency",
          description: "Visualizes factors influencing medical diagnosis recommendations, helping healthcare providers understand AI suggestions.",
          imagePath: "/images/examples/ibm-watson.gif"
        },
        {
          title: "Microsoft Bing Attribution",
          description: "Shows sources for generated content with citations and explains how information was synthesized from multiple sources.",
          imagePath: "/images/examples/bing-attribution.gif"
        }
      ],
      guidelines: [
        "Present explanations at appropriate levels of detail for different user needs",
        "Use visualizations to make complex processes more understandable",
        "Enable users to ask follow-up questions about the AI's reasoning",
        "Balance comprehensiveness with clarity in explanations",
        "Provide options to explore underlying data and decision factors"
      ],
      considerations: [
        "Trade-offs between explanation detail and cognitive load on users",
        "Potential exposure of proprietary algorithms or sensitive information",
        "Different explanation needs for technical vs. non-technical users",
        "Balancing transparency with system performance and speed",
        "Ensuring explanations actually improve user understanding"
      ],
      relatedPatterns: [
        "Transparent Feedback",
        "Human-in-the-Loop",
        "Progressive Disclosure"
      ]
    }
  },
  {
    id: "responsible-ai-design",
    title: "Responsible AI Design",
    slug: "responsible-ai-design",
    description: "Address ethical considerations, bias mitigation, and inclusivity in AI systems",
    category: "Responsible AI Design",
    categoryColor: "rose",
    featured: true,
    content: {
      problem: "AI systems can perpetuate or amplify societal biases, exclude certain user groups, or raise ethical concerns around privacy, fairness, and transparency.",
      solution: "Design AI interfaces with ethical considerations at the forefront, including diverse training data, inclusive design practices, transparency about data usage, and governance structures that ensure accountability.",
      examples: [
        {
          title: "Google's People + AI Guidebook",
          description: "Provides frameworks and tools for addressing bias and fairness throughout the AI development lifecycle.",
          imagePath: "/images/examples/people-ai-guidebook.gif"
        },
        {
          title: "Microsoft's Fairlearn",
          description: "Tools that help developers identify and mitigate unfairness in AI models through interactive visualizations.",
          imagePath: "/images/examples/fairlearn.gif"
        },
        {
          title: "Apple's Privacy-Preserving ML",
          description: "On-device processing that maintains user privacy while enabling AI features, minimizing data collection.",
          imagePath: "/images/examples/privacy-ml.gif"
        }
      ],
      guidelines: [
        "Include diverse perspectives in design and development teams",
        "Test with diverse user groups to identify potential biases",
        "Create clear privacy policies and data usage explanations",
        "Design inclusive interfaces that work for users with different abilities",
        "Establish ethical review processes for AI features"
      ],
      considerations: [
        "Balancing innovation with ethical safeguards",
        "Trade-offs between model accuracy and fairness",
        "Geographic and cultural variations in ethical standards",
        "Ongoing monitoring for emerging biases or issues",
        "Communicating complex ethical considerations to users"
      ],
      relatedPatterns: [
        "Transparent Feedback",
        "Human-in-the-Loop",
        "Explainable AI (XAI)"
      ]
    }
  },
  {
    id: "error-recovery",
    title: "Error Recovery & Graceful Degradation",
    slug: "error-recovery",
    description: "Design AI interfaces that fail gracefully and provide meaningful recovery paths",
    category: "Error Recovery & Graceful Degradation",
    categoryColor: "amber",
    featured: true,
    content: {
      problem: "AI systems inevitably encounter limitations or make mistakes, but often fail in ways that frustrate users, damage trust, or provide no clear path to recovery.",
      solution: "Design interfaces that anticipate potential AI failures, communicate limitations clearly, fail gracefully when necessary, and provide meaningful paths to recover or achieve goals through alternative means.",
      examples: [
        {
          title: "Anthropic Claude's Error Boundaries",
          description: "Clearly indicates when it can't complete a task and suggests alternatives or ways to reformulate the request.",
          imagePath: "/images/examples/claude-error.gif"
        },
        {
          title: "Tesla Autopilot Handoff",
          description: "Gradually alerts drivers when approaching situations the AI can't handle, providing time to take control.",
          imagePath: "/images/examples/tesla-handoff.gif"
        },
        {
          title: "Google Search's 'Did you mean?' feature",
          description: "Recovers from potential misunderstandings by suggesting corrections while still providing initial results.",
          imagePath: "/images/examples/did-you-mean.gif"
        }
      ],
      guidelines: [
        "Set appropriate expectations about AI capabilities up front",
        "Signal confidence levels when providing AI-generated outputs",
        "Provide specific error messages that explain what went wrong",
        "Offer alternative paths to complete tasks when AI fails",
        "Design for graceful handoffs between AI and human assistance"
      ],
      considerations: [
        "Balance between admitting limitations and maintaining user confidence",
        "Designing error states that don't feel like dead ends",
        "Providing appropriate fallback options for different types of failures",
        "Learning from patterns of errors to improve the system",
        "Cultural variations in how errors are perceived and communicated"
      ],
      relatedPatterns: [
        "Human-in-the-Loop",
        "Transparent Feedback",
        "Explainable AI (XAI)"
      ]
    }
  },
  {
    id: "collaborative-ai",
    title: "Collaborative AI",
    slug: "collaborative-ai",
    description: "Enable effective collaboration between multiple users and AI within shared workflows",
    category: "Collaborative AI",
    categoryColor: "violet",
    featured: true,
    content: {
      problem: "Digital collaboration often suffers from coordination challenges, uneven participation, and difficulty synthesizing diverse inputs, while most AI tools are designed for individual rather than team use.",
      solution: "Design AI systems that facilitate collaboration between multiple users and the AI itself, supporting shared workflows, content creation, and decision-making by augmenting human collaboration rather than replacing it.",
      examples: [
        {
          title: "Figma's FigJam AI",
          description: "Facilitates brainstorming sessions with multiple participants and AI assistance to organize ideas and generate visual elements.",
          imagePath: "/images/examples/figma-figjam.gif"
        },
        {
          title: "Google Docs Smart Compose",
          description: "Helps multiple collaborators write more efficiently together by suggesting text completions that match the document's style and context.",
          imagePath: "/images/examples/google-docs-collab.gif"
        },
        {
          title: "Miro AI Facilitator",
          description: "Assists teams with organizing and synthesizing collaborative ideation sessions, summarizing discussions and suggesting connections.",
          imagePath: "/images/examples/miro-facilitator.gif"
        }
      ],
      guidelines: [
        "Design AI to enhance rather than replace human collaboration",
        "Make AI contributions clearly distinguishable from human input",
        "Provide mechanisms for teams to collectively review and refine AI suggestions",
        "Support multiple interaction modes for diverse team preferences",
        "Enable customization of AI behavior to match team workflows"
      ],
      considerations: [
        "Balancing AI involvement without disrupting team dynamics",
        "Handling varied levels of AI literacy within collaborative teams",
        "Maintaining privacy and appropriate permission levels for sensitive content",
        "Designing for equitable participation across all team members",
        "Creating attribution mechanisms for collective AI-assisted work"
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Augmented Creation",
        "Human-in-the-Loop"
      ]
    }
  },
  {
    id: "ambient-intelligence",
    title: "Ambient Intelligence",
    slug: "ambient-intelligence",
    description: "Create unobtrusive AI that senses context and provides assistance without explicit interaction",
    category: "Ambient Intelligence",
    categoryColor: "lime",
    featured: true,
    content: {
      problem: "Traditional interfaces require explicit user interaction, creating friction and cognitive load even for routine or context-dependent tasks that could be anticipated and addressed proactively.",
      solution: "Design AI systems that operate unobtrusively in the background, sensing environmental context and user patterns to provide timely assistance without requiring explicit interaction or attention from users.",
      examples: [
        {
          title: "Google Nest Thermostat",
          description: "Learns household patterns and automatically adjusts temperature settings based on occupancy, time of day, and seasonal factors.",
          imagePath: "/images/examples/nest-thermostat.gif"
        },
        {
          title: "Apple's Proactive Suggestions",
          description: "Suggests apps based on time of day, location, and usage patterns, presenting them at opportune moments without explicit requests.",
          imagePath: "/images/examples/apple-suggestions.gif"
        },
        {
          title: "Amazon Halo",
          description: "Monitors health metrics passively and provides insights without constant user attention, operating in the background of daily activities.",
          imagePath: "/images/examples/amazon-halo.gif"
        }
      ],
      guidelines: [
        "Design for minimal interruption to user flow and context",
        "Ensure users can easily understand and control ambient systems",
        "Gradually increase system proactivity as user trust is established",
        "Provide clear signals when ambient systems are active or collecting data",
        "Design graceful fallbacks when contextual understanding fails"
      ],
      considerations: [
        "Balancing proactivity with privacy and user agency",
        "Determining appropriate thresholds for intervention",
        "Creating transparent but non-intrusive feedback mechanisms",
        "Managing battery and resource usage for always-on systems",
        "Designing for diverse living or working environments"
      ],
      relatedPatterns: [
        "Contextual Assistance",
        "Adaptive Interfaces",
        "Transparent Feedback"
      ]
    }
  },
  {
    id: "safe-exploration",
    title: "Safe Exploration",
    slug: "safe-exploration",
    description: "Design controlled environments for experimenting with AI capabilities without risk",
    category: "Safe Exploration",
    categoryColor: "cyan",
    featured: true,
    content: {
      problem: "Users often hesitate to engage with AI features due to uncertainty about capabilities, concerns about making mistakes, or fear of unexpected outcomes affecting their work or data.",
      solution: "Create dedicated environments where users can safely experiment with AI capabilities without risk to production data or workflows, allowing hands-on learning and confidence building through direct experience.",
      examples: [
        {
          title: "Midjourney Sandbox Mode",
          description: "Allows users to experiment with image generation parameters and techniques in a dedicated space before creating final outputs.",
          imagePath: "/images/examples/midjourney-sandbox.gif"
        },
        {
          title: "GitHub Copilot Playground",
          description: "Provides a safe environment to test code generation and suggestions without affecting real projects or repositories.",
          imagePath: "/images/examples/copilot-playground.gif"
        },
        {
          title: "ChatGPT Custom Instructions",
          description: "Lets users experiment with different AI personas and behavior settings to understand capabilities before using in production contexts.",
          imagePath: "/images/examples/chatgpt-custom.gif"
        }
      ],
      guidelines: [
        "Create clearly delineated spaces for experimentation",
        "Provide instant feedback on actions and outcomes",
        "Enable easy transfer of successful experiments to production",
        "Include guided examples that demonstrate capabilities",
        "Allow users to easily reset or undo experimental actions"
      ],
      considerations: [
        "Balancing safety with realistic representation of capabilities",
        "Designing for various learning styles and technical backgrounds",
        "Creating progressive complexity levels for exploration",
        "Providing enough structure without limiting creative exploration",
        "Ensuring sandbox environments don't create false expectations"
      ],
      relatedPatterns: [
        "Guided Learning",
        "Error Recovery & Graceful Degradation",
        "Progressive Disclosure"
      ]
    }
  },
  {
    id: "guided-learning",
    title: "Guided Learning",
    slug: "guided-learning",
    description: "Help users understand AI capabilities through tutorials and contextual examples",
    category: "Guided Learning",
    categoryColor: "emerald",
    featured: true,
    content: {
      problem: "Users often struggle to understand how to effectively use AI features, what capabilities are available, and how to phrase requests to get optimal results.",
      solution: "Create structured learning experiences that help users understand and effectively use AI capabilities through interactive tutorials, contextual examples, and progressive skill building.",
      examples: [
        {
          title: "Duolingo Max",
          description: "Uses AI to provide personalized explanations of language rules based on user mistakes and learning patterns.",
          imagePath: "/images/examples/duolingo-max.gif"
        },
        {
          title: "Khan Academy Khanmigo",
          description: "Offers contextual tutoring that adapts to student questions and provides step-by-step guidance for learning concepts.",
          imagePath: "/images/examples/khanmigo.gif"
        },
        {
          title: "Midjourney's Learn Mode",
          description: "Teaches users how to craft better prompts through interactive examples and real-time feedback on their attempts.",
          imagePath: "/images/examples/midjourney-learn.gif"
        }
      ],
      guidelines: [
        "Start with basic concepts and progressively introduce more advanced features",
        "Provide context-sensitive examples that relate to user's current tasks",
        "Use interactive exercises that allow users to practice with immediate feedback",
        "Celebrate progress and achievements to maintain motivation",
        "Allow users to skip tutorials or learning modules if they prefer"
      ],
      considerations: [
        "Balance between guiding users and letting them explore independently",
        "Avoid overwhelming users with too much information at once",
        "Create learning paths that accommodate different learning styles",
        "Design for both novice and advanced users with appropriate guidance levels",
        "Consider how to update learning content as AI capabilities evolve"
      ],
      relatedPatterns: [
        "Progressive Disclosure",
        "Contextual Assistance",
        "Transparent Feedback"
      ],
      codeExamples: [
        {
          title: "AI Prompt Crafting Tutorial",
          description: "This React component demonstrates an interactive tutorial that helps users learn how to craft effective prompts for AI systems. It provides guided examples, immediate feedback, and tracks user progress throughout the learning experience.",
          language: "tsx",
          componentId: "guided-learning-tutorial",
          code: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for lessons and user progress
interface Lesson {
  id: string;
  title: string;
  description: string;
  steps: LessonStep[];
}

interface LessonStep {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  exercise?: {
    prompt: string;
    goodKeywords: string[];
    badKeywords: string[];
    minLength?: number;
  };
}

interface UserProgress {
  currentLessonId: string;
  currentStepIndex: number;
  completedLessons: string[];
  completedSteps: string[];
}

// Sample lessons data
const lessons: Lesson[] = [
  {
    id: 'basics',
    title: 'Prompt Basics',
    description: 'Learn the fundamentals of crafting clear prompts',
    steps: [
      {
        id: 'basics-intro',
        title: 'Introduction to AI Prompts',
        content: 'An AI prompt is an instruction or question you give to an AI system. The quality of your prompt directly affects the quality of the response you receive. In this lesson, you\'ll learn the basics of crafting effective prompts.',
        examples: [
          'Poor: "Write something."',
          'Better: "Write a short paragraph about renewable energy."',
          'Best: "Write a 150-word paragraph about solar energy benefits for homeowners. Include statistics and practical examples."'
        ]
      },
      {
        id: 'basics-clarity',
        title: 'Be Clear and Specific',
        content: 'Specific prompts get specific responses. Avoid vague instructions and include details about what you want: format, length, tone, audience, and purpose.',
        exercise: {
          prompt: 'Rewrite this vague prompt to be more specific: "Tell me about dogs."',
          goodKeywords: ['breed', 'specific', 'detail', 'length', 'purpose', 'format', 'audience'],
          badKeywords: ['tell me about', 'information'],
          minLength: 15
        }
      },
      {
        id: 'basics-format',
        title: 'Specify Output Format',
        content: 'Tell the AI exactly how you want information to be formatted: as a list, table, essay, story, code snippet, etc. This helps you get results in the most useful format for your needs.',
        examples: [
          'Format as a table: "Create a comparison table of 3 popular smartphones with columns for price, screen size, and battery life."',
          'Format as a list: "List 5 exercises for improving core strength, with a brief description of each."',
          'Format as code: "Write a Python function that calculates the Fibonacci sequence up to n."'
        ],
        exercise: {
          prompt: 'Create a prompt that asks for information about healthy breakfast options in a specific format.',
          goodKeywords: ['table', 'list', 'bullet points', 'format', 'rows', 'columns'],
          badKeywords: ['tell me', 'information about', 'healthy breakfast'],
          minLength: 20
        }
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Techniques',
    description: 'Master specialized techniques for better AI outputs',
    steps: [
      {
        id: 'advanced-roleplay',
        title: 'Role-Based Prompting',
        content: 'You can instruct the AI to adopt a specific role or perspective. This helps get responses with the appropriate expertise and tone.',
        examples: [
          '"As a financial advisor, explain the benefits of index funds vs. actively managed funds."',
          '"Acting as a chef, suggest how I can improve my homemade pizza dough recipe."',
          '"From the perspective of a career counselor, review my resume and suggest improvements."'
        ]
      },
      {
        id: 'advanced-examples',
        title: 'Providing Examples',
        content: 'Including examples in your prompt helps the AI understand your expectations and preferred style or format.',
        exercise: {
          prompt: 'Write a prompt that includes examples to get AI-generated marketing slogans in a specific style.',
          goodKeywords: ['example', 'style', 'like this', 'similar to', 'follow this pattern'],
          badKeywords: ['marketing slogans', 'generate'],
          minLength: 25
        }
      }
    ]
  }
];

const AiPromptTutorial: React.FC = () => {
  // Initialize user progress
  const [progress, setProgress] = useState<UserProgress>({
    currentLessonId: lessons[0].id,
    currentStepIndex: 0,
    completedLessons: [],
    completedSteps: []
  });
  
  // User input for exercises
  const [userInput, setUserInput] = useState('');
  
  // Feedback state
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);
  
  // Current lesson and step
  const currentLesson = lessons.find(lesson => lesson.id === progress.currentLessonId) || lessons[0];
  const currentStep = currentLesson.steps[progress.currentStepIndex];
  
  // Check if current step has been completed
  const isCurrentStepCompleted = progress.completedSteps.includes(currentStep.id);
  
  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
    
    // Clear feedback when user is typing
    if (feedback) {
      setFeedback(null);
    }
  };
  
  // Check user's exercise answer
  const checkExercise = () => {
    if (!currentStep.exercise) return;
    
    const input = userInput.toLowerCase();
    const { goodKeywords, badKeywords, minLength } = currentStep.exercise;
    
    // Check if input contains good keywords
    const hasGoodKeywords = goodKeywords.some(keyword => 
      input.includes(keyword.toLowerCase())
    );
    
    // Check if input contains bad keywords (too many)
    const hasTooManyBadKeywords = badKeywords.filter(keyword => 
      input.includes(keyword.toLowerCase())
    ).length > badKeywords.length / 2;
    
    // Check length
    const hasMinLength = !minLength || input.length >= minLength;
    
    if (hasGoodKeywords && !hasTooManyBadKeywords && hasMinLength) {
      setFeedback({
        isCorrect: true,
        message: 'Great job! Your prompt is specific and well-structured.'
      });
      
      // Mark step as completed
      if (!isCurrentStepCompleted) {
        setProgress(prev => ({
          ...prev,
          completedSteps: [...prev.completedSteps, currentStep.id]
        }));
      }
    } else {
      let message = 'Your prompt could be improved:';
      
      if (!hasGoodKeywords) {
        message += ' Try being more specific about what you want.';
      }
      
      if (hasTooManyBadKeywords) {
        message += ' Avoid vague terms that don\'t give clear direction.';
      }
      
      if (!hasMinLength && minLength) {
        message += \` Your prompt seems too short (minimum \${minLength} characters).\`;
      }
      
      setFeedback({
        isCorrect: false,
        message
      });
    }
  };
  
  // Navigate to next step or lesson
  const goToNextStep = () => {
    // If there are more steps in current lesson
    if (progress.currentStepIndex < currentLesson.steps.length - 1) {
      setProgress(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1
      }));
    } 
    // If there are more lessons
    else {
      const currentLessonIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
      
      if (currentLessonIndex < lessons.length - 1) {
        // Mark current lesson as completed
        if (!progress.completedLessons.includes(currentLesson.id)) {
          setProgress(prev => ({
            ...prev,
            completedLessons: [...prev.completedLessons, currentLesson.id],
            currentLessonId: lessons[currentLessonIndex + 1].id,
            currentStepIndex: 0
          }));
        } else {
          setProgress(prev => ({
            ...prev,
            currentLessonId: lessons[currentLessonIndex + 1].id,
            currentStepIndex: 0
          }));
        }
      }
    }
    
    // Reset user input and feedback
    setUserInput('');
    setFeedback(null);
  };
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalSteps = lessons.reduce((total, lesson) => total + lesson.steps.length, 0);
    const completedSteps = progress.completedSteps.length;
    
    return Math.round((completedSteps / totalSteps) * 100);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header with progress bar */}
      <div className="bg-emerald-50 p-6 border-b border-emerald-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-emerald-800">AI Prompt Crafting Tutorial</h1>
          <div className="text-sm text-emerald-600 font-medium">
            {calculateOverallProgress()}% Complete
          </div>
        </div>
        
        <div className="w-full bg-emerald-100 rounded-full h-2.5">
          <div 
            className="bg-emerald-500 h-2.5 rounded-full" 
            style={{ width: \`\${calculateOverallProgress()}%\` }}
          ></div>
        </div>
      </div>
      
      {/* Lesson navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {lessons.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => {
                  setProgress(prev => ({
                    ...prev,
                    currentLessonId: lesson.id,
                    currentStepIndex: 0
                  }));
                  setUserInput('');
                  setFeedback(null);
                }}
                className={\`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap \${
                  currentLesson.id === lesson.id 
                    ? 'bg-emerald-500 text-white' 
                    : progress.completedLessons.includes(lesson.id)
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100 text-gray-700'
                }\`}
              >
                {lesson.title}
                {progress.completedLessons.includes(lesson.id) && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        {/* Step navigation sidebar */}
        <div className="p-4 bg-gray-50">
          <h2 className="font-medium text-lg text-gray-700 mb-3">{currentLesson.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{currentLesson.description}</p>
          
          <div className="space-y-1">
            {currentLesson.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setProgress(prev => ({
                    ...prev,
                    currentStepIndex: index
                  }));
                  setUserInput('');
                  setFeedback(null);
                }}
                className={\`w-full text-left px-3 py-2 rounded text-sm \${
                  progress.currentStepIndex === index 
                    ? 'bg-emerald-100 text-emerald-800 font-medium' 
                    : progress.completedSteps.includes(step.id)
                    ? 'text-emerald-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }\`}
              >
                <div className="flex items-center">
                  <div className={\`w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs \${
                    progress.completedSteps.includes(step.id)
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }\`}>
                    {progress.completedSteps.includes(step.id) ? '✓' : index + 1}
                  </div>
                  {step.title}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="col-span-2 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{currentStep.title}</h2>
              
              <div className="prose text-gray-600 mb-6">
                <p>{currentStep.content}</p>
              </div>
              
              {/* Examples section */}
              {currentStep.examples && (
                <div className="mb-6 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-700 mb-2">Examples</h3>
                  <ul className="space-y-2 text-sm">
                    {currentStep.examples.map((example, index) => (
                      <li key={index} className="text-blue-800">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Exercise section */}
              {currentStep.exercise && (
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Practice Exercise</h3>
                  <p className="text-gray-600 mb-4">{currentStep.exercise.prompt}</p>
                  
                  <textarea
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Write your prompt here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-32"
                    disabled={isCurrentStepCompleted}
                  ></textarea>
                  
                  {!isCurrentStepCompleted && (
                    <button
                      onClick={checkExercise}
                      disabled={!userInput.trim()}
                      className={\`mt-3 px-4 py-2 rounded-md font-medium \${
                        userInput.trim() 
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }\`}
                    >
                      Check My Prompt
                    </button>
                  )}
                  
                  {/* Feedback for exercise */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={\`mt-4 p-3 rounded-md \${
                          feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
                        }\`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            {feedback.isCorrect ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="ml-2">{feedback.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {
                    if (progress.currentStepIndex > 0) {
                      setProgress(prev => ({
                        ...prev,
                        currentStepIndex: prev.currentStepIndex - 1
                      }));
                      setUserInput('');
                      setFeedback(null);
                    } else {
                      // Go to previous lesson if available
                      const currentLessonIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
                      if (currentLessonIndex > 0) {
                        const prevLesson = lessons[currentLessonIndex - 1];
                        setProgress(prev => ({
                          ...prev,
                          currentLessonId: prevLesson.id,
                          currentStepIndex: prevLesson.steps.length - 1
                        }));
                        setUserInput('');
                        setFeedback(null);
                      }
                    }
                  }}
                  disabled={progress.currentStepIndex === 0 && lessons.findIndex(lesson => lesson.id === currentLesson.id) === 0}
                  className={\`px-4 py-2 rounded-md text-sm font-medium \${
                    progress.currentStepIndex === 0 && lessons.findIndex(lesson => lesson.id === currentLesson.id) === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }\`}
                >
                  Previous
                </button>
                
                <button
                  onClick={goToNextStep}
                  disabled={!isCurrentStepCompleted && currentStep.exercise}
                  className={\`px-4 py-2 rounded-md text-sm font-medium \${
                    isCurrentStepCompleted || !currentStep.exercise
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }\`}
                >
                  {progress.currentStepIndex < currentLesson.steps.length - 1 ? 'Next' : 'Next Lesson'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Tooltips and help section */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            <span className="font-medium text-gray-700">Tip:</span> Complete all steps in a lesson to move on to the next lesson. You can always come back to review previous material.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiPromptTutorial;
`
        }
      ]
    }
  }
];

export default patterns;

