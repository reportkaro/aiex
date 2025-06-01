import { Pattern } from '../../../../types';
import { codeExamples } from './code-examples';

export const humanintheloop: Pattern = {
  id: "human-in-the-loop",
  title: "Human-in-the-Loop",
  slug: "human-in-the-loop",
  category: "Human-in-the-Loop",
  description: "Balance automation with human oversight and intervention for critical decisions, ensuring AI augments rather than replaces human judgment.",
  thumbnail: "/images/examples/grammarly-suggestions.gif",
  content: {
    problem: "Fully automated AI systems can make critical errors, lack transparency, or fail in edge cases. In high-stakes or ambiguous situations, users need the ability to review, override, or guide AI decisions to ensure safety, compliance, and trust.",
    solution: "Design systems where humans can intervene, review, or approve AI outputs—especially for critical decisions. Provide clear handoff points, easy override mechanisms, and transparent explanations so users can confidently collaborate with AI.",
    examples: [
      {
        title: "Grammarly Writing Assistant",
        description: "Grammarly suggests grammar, spelling, and style improvements as users write, but requires human approval before changes are applied, maintaining user control over the final text.",
        image: "/images/examples/grammarly-suggestions.gif",
        altText: "Grammarly human-in-the-loop suggestions"
      },
      {
        title: "Google Photos Face Detection",
        description: "Google Photos automatically detects faces in images but relies on users to confirm identities, allowing humans to verify AI suggestions before they're applied.",
        image: "/images/examples/google-face-detection.gif",
        altText: "Google Photos face detection"
      },
      {
        title: "OpenAI RLHF",
        description: "OpenAI uses Reinforcement Learning from Human Feedback (RLHF) to improve their models, having humans rate AI outputs to train reward models that guide further refinement.",
        image: "/images/examples/openai-human-feedback.png",
        altText: "OpenAI human feedback"
      }
    ],
    codeExamples,
    guidelines: [
      "Clearly indicate when human review is required or possible",
      "Make it easy to override, correct, or provide feedback on AI outputs",
      "Log interventions for transparency and improvement",
      "Provide explanations for AI decisions to support human judgment",
      "Design workflows that minimize friction in the handoff between AI and human"
    ],
    considerations: [
      "Balance efficiency with safety—too many interventions can slow down workflows",
      "Ensure humans are not overwhelmed with too many review requests",
      "Address potential bias in both AI and human decisions",
      "Provide training and support for users in review roles",
      "Monitor and refine the threshold for when human-in-the-loop is triggered"
    ],
    relatedPatterns: [
      "Transparent Feedback",
      "Contextual Assistance",
      "Progressive Disclosure"
    ]
  }
}; 