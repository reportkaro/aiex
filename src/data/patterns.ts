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
          title: "GitHub Copilot",
          description: "Suggests code completions as developers type, based on the current file context, project structure, and programming patterns.",
          imagePath: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png",
          imageCredit: "Image: GitHub Copilot"
        },
        {
          title: "Google Smart Compose",
          description: "Predicts and suggests text completions while typing emails, based on the email context and common phrases.",
          imagePath: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/smart_compose_with_suggested_text_1.width-1000.png"
        },
        {
          title: "Notion AI",
          description: "Offers writing suggestions, summaries, and editing help based on the document content and user's current focus.",
          imagePath: "https://prod-files-secure.s3.us-west-2.amazonaws.com/40406767-6d76-4458-ad14-c63543926923/d9ebcbea-44ef-4a2f-83c7-a05761b4d486/Untitled.png"
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
      ]
    }
  }
];

export default patterns;
