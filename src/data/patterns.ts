import { Pattern } from '../types';

export const patterns: Pattern[] = [
  {
    id: "contextual-assistance",
    title: "Contextual Assistance",
    slug: "contextual-assistance",
    category: "Contextual Assistance",
    description: "Provide timely help and suggestions based on the user's current task, history, and needs without requiring explicit requests.",
    thumbnail: "/images/examples/Smart-compose_Taco_Tuesday.gif",
    content: {
      problem: "Users often need guidance but may not know what to ask for or when to ask. Traditional help systems require users to interrupt their workflow to search for assistance.",
      solution: "Create intelligent assistance that proactively offers relevant help, suggestions, or information based on the user's current context, behavior patterns, and needs. The system should anticipate user requirements rather than waiting for explicit requests.",
      examples: [
        {
          title: "Google Smart Compose",
          description: "Predicts and suggests text completions while typing emails, based on the email context and common phrases.",
          image: "/images/examples/Smart-compose_Taco_Tuesday.gif",
          altText: "Google Smart Compose in action"
        }
      ],
      guidelines: [
        "Make assistance subtle and non-intrusive; don't interrupt the user's flow",
        "Provide clear indications that suggestions are AI-generated"
      ],
      considerations: [
        "Balance between proactive help and avoiding unnecessary interruptions",
        "Consider privacy implications of analyzing user behavior to provide contextual help"
      ],
      relatedPatterns: [
        "Progressive Disclosure",
        "Transparent Feedback"
      ]
    }
  }
];

export default patterns;

