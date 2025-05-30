import { Pattern } from '../../types';
import { examples } from './examples';
import { guidelines } from './guidelines';
import { considerations } from './considerations';
import { codeExamples } from './code-examples';

export const contextualassistance: Pattern = {
  id: "contextual-assistance",
  title: "Contextual Assistance",
  slug: "contextual-assistance",
  description: "Provide timely help and suggestions based on the user's current task, history, and needs without requiring explicit requests.",
  category: "User Experience",
  content: {
    problem: "Users often need guidance but may not know what to ask for or when to ask. Traditional help systems require users to interrupt their workflow to search for assistance.",
    solution: "Create intelligent assistance that proactively offers relevant help, suggestions, or information based on the user's current context, behavior patterns, and needs. The system should anticipate user requirements rather than waiting for explicit requests.",
    overview: "Provide timely help and suggestions based on the user's current task, history, and needs without requiring explicit requests. This pattern focuses on creating a more effective and user-friendly experience by addressing specific challenges in the interaction between users and AI systems.",
    whenToUse: ["When users often need guidance but may not know what to ask for or when to ask. traditional help systems require users to interrupt their workflow to search for assistance","When user experience and system effectiveness need improvement","When dealing with complex user interactions","When aiming to enhance user understanding and control"],
    benefits: ["Improved user experience and satisfaction","Enhanced system effectiveness and reliability","Better user understanding and control","More efficient and intuitive interactions"],
    examples,
    guidelines,
    considerations,
    relatedPatterns: [
      "Progressive Disclosure",
      "Transparent Feedback",
      "Adaptive Interfaces"
    ],
    codeExamples
  },
  tags: ["User Experience","Help System","Proactive Assistance","User Guidance"]
};