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
          imagePath: "/images/examples/gitautocode.gif",
          imageCredit: "Image: GitHub Copilot"
        },
        {
          title: "Google Smart Compose",
          description: "Predicts and suggests text completions while typing emails, based on the email context and common phrases.",
          imagePath: "/images/examples/Smart-compose_Taco_Tuesday.gif",
          imageCredit: "Image: Google Gmail"
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
      ]
    }
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
        },
        {
          title: "Loom AI Video Tools",
          description: "When editing a video, only basic options are shown; advanced AI features (like auto-transcription, highlights) are revealed as needed.",
          imagePath: "/images/examples/loom-ai.gif",
          imageCredit: "Image: Loom"
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
      ]
    }
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
          title: "Google Photos Face Tagging",
          description: "Users review and approve suggested tags before they're applied.",
          imagePath: "/images/examples/google-photos-face-tagging.gif",
          imageCredit: "Image: Google Photos"
        },
        {
          title: "Medical Diagnosis Tools",
          description: "AI suggests diagnoses, but doctors review and make the final call.",
          imagePath: "/images/examples/medical-diagnosis.gif",
          imageCredit: "Image: Example Medical Tool"
        },
        {
          title: "Content Moderation Platforms",
          description: "AI flags content, but human moderators review edge cases.",
          imagePath: "/images/examples/content-moderation.gif",
          imageCredit: "Image: Example Moderation Platform"
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
      ]
    }
  }
];

export default patterns;
