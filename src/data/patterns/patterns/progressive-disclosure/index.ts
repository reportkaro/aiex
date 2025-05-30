import { Pattern } from '../../../../types';

export const progressiveDisclosurePattern: Pattern = {
  id: "progressive-disclosure",
  title: "Progressive Disclosure",
  slug: "progressive-disclosure",
  category: "Progressive Disclosure",
  description: "Reveal information gradually to reduce cognitive load and complexity, showing only what users need at each step.",
  thumbnail: "/images/examples/loom-ai.gif",
  content: {
    problem: "Users can become overwhelmed when presented with too much information or too many options at once. Complex AI interfaces often expose all features simultaneously, leading to decision paralysis and poor user experience.",
    solution: "Present information and functionality in layers, revealing more details as users need them. Start with essential information and provide clear pathways to access additional details. Use progressive disclosure to guide users through complex AI workflows step by step.",
    examples: [
      {
        title: "Loom AI Summary",
        description: "Shows a brief AI-generated summary first, with options to expand for full transcript, key moments, or detailed analysis.",
        image: "/images/examples/loom-ai.gif",
        altText: "Loom AI progressive disclosure in action"
      },
      {
        title: "Gmail Smart Compose",
        description: "Starts with simple text suggestions, then reveals more advanced features like tone adjustment and formatting options as users engage.",
        image: "/images/examples/gmail-smart-compose.gif",
        altText: "Gmail Smart Compose progressive features"
      },
      {
        title: "Notion AI",
        description: "Begins with basic AI writing assistance, progressively revealing advanced features like custom prompts, templates, and workflow automation.",
        image: "/images/examples/notion-ai-progressive.gif",
        altText: "Notion AI progressive feature disclosure"
      }
    ],
    guidelines: [
      "Start with the most essential information or primary action",
      "Use clear visual hierarchy to indicate information layers",
      "Provide obvious entry points to access more detailed information",
      "Maintain context when transitioning between disclosure levels",
      "Use progressive disclosure for complex forms and multi-step processes",
      "Show progress indicators for multi-step AI workflows",
      "Allow users to jump between levels without losing their place",
      "Use expandable sections, tabs, or modal overlays appropriately"
    ],
    considerations: [
      "Balance between simplicity and feature discoverability",
      "Ensure critical information isn't buried too deep",
      "Consider different user expertise levels and provide appropriate entry points",
      "Test with real users to validate the information hierarchy",
      "Avoid creating too many layers that frustrate experienced users",
      "Provide shortcuts for power users to bypass progressive steps",
      "Consider mobile and accessibility implications of disclosure patterns",
      "Monitor analytics to understand where users drop off in progressive flows"
    ],
    relatedPatterns: [
      "Contextual Assistance",
      "Guided Learning",
      "Adaptive Interfaces"
    ]
  }
}; 