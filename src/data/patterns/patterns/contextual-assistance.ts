import { Pattern } from '../../types';

export const contextualAssistance: Pattern = {
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
        code: null // Code will be loaded dynamically
      }
    ]
  }
}; 