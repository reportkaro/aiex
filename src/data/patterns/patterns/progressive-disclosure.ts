import { Pattern } from '../../types';

export const progressiveDisclosure: Pattern = {
  id: "progressive-disclosure",
  title: "Progressive Disclosure",
  slug: "progressive-disclosure",
  description: "Gradually reveal complex features and information to users, showing only what's necessary at each step to reduce cognitive load and improve usability.",
  category: "Information Architecture",
  categoryColor: "green",
  featured: true,
  content: {
    problem: "Complex interfaces can overwhelm users with too many options and information at once, leading to decision paralysis and poor user experience.",
    solution: "Implement a progressive disclosure pattern that reveals features and information gradually, showing only what's necessary at each step. This helps users focus on their current task while maintaining access to advanced features when needed.",
    examples: [
      {
        title: "Gmail's Advanced Settings",
        description: "Shows basic email settings by default, with an 'Advanced' section that reveals more complex options when needed.",
        imagePath: "/images/examples/gmail-settings.gif",
        imageCredit: "Image: Google Gmail"
      },
      {
        title: "Adobe Photoshop",
        description: "Presents basic tools in the main interface, with advanced features accessible through menus and panels that can be revealed as users become more proficient.",
        imagePath: "/images/examples/photoshop-interface.gif",
        imageCredit: "Image: Adobe Photoshop"
      },
      {
        title: "Microsoft Word",
        description: "Shows a simplified ribbon by default, with options to expand and reveal more advanced formatting and editing tools.",
        imagePath: "/images/examples/word-ribbon.gif",
        imageCredit: "Image: Microsoft Word"
      }
    ],
    guidelines: [
      "Start with the most common and essential features",
      "Use clear indicators for additional content (e.g., 'Show more', 'Advanced options')",
      "Maintain consistency in how and where additional features are revealed",
      "Provide clear paths back to simpler views",
      "Consider user expertise levels when determining what to show by default"
    ],
    considerations: [
      "Balance between simplicity and functionality",
      "Ensure advanced features remain discoverable",
      "Consider the learning curve for new users",
      "Maintain context when revealing additional information",
      "Provide clear visual hierarchy for different levels of complexity"
    ],
    relatedPatterns: [
      "Contextual Assistance",
      "Adaptive Interfaces",
      "Guided Learning"
    ],
    codeExamples: [
      {
        title: "Progressive Disclosure Email Form",
        description: "A React component that implements progressive disclosure in an email form, showing basic fields by default and revealing advanced options when needed.",
        language: "tsx",
        componentId: "progressive-disclosure-email",
        code: null // Code will be loaded dynamically
      }
    ]
  }
}; 