import { Pattern } from '../../../../types';

export const humanInTheLoopPattern: Pattern = {
  id: "human-in-the-loop",
  title: "Human-in-the-Loop",
  slug: "human-in-the-loop",
  category: "Human-in-the-Loop",
  description: "Balance automation with human oversight and intervention for critical decisions, ensuring AI augments rather than replaces human judgment.",
  thumbnail: "/images/examples/grammarly-suggestions.gif",
  content: {
    problem: "Fully automated AI systems can make errors, lack context, or produce results that don't align with human values and intentions. Users need control over AI decisions, especially for high-stakes or creative tasks.",
    solution: "Design AI systems that keep humans in the decision-making loop at critical points. Provide clear opportunities for human review, approval, and intervention. Make it easy for users to understand, modify, or override AI suggestions while maintaining the benefits of automation.",
    examples: [
      {
        title: "Grammarly Writing Suggestions",
        description: "AI suggests grammar and style improvements, but users review and choose which suggestions to accept, reject, or modify.",
        image: "/images/examples/grammarly-suggestions.gif",
        altText: "Grammarly human-in-the-loop suggestions"
      },
      {
        title: "GitHub Copilot Code Review",
        description: "AI generates code suggestions that developers can review, edit, and approve before committing to their codebase.",
        image: "/images/examples/github-copilot-review.gif",
        altText: "GitHub Copilot code review process"
      },
      {
        title: "Content Moderation Systems",
        description: "AI flags potentially problematic content for human moderators to review and make final decisions on removal or approval.",
        image: "/images/examples/content-moderation-hitl.png",
        altText: "Human-in-the-loop content moderation"
      },
      {
        title: "Medical Diagnosis AI",
        description: "AI assists doctors by highlighting potential diagnoses and risk factors, but medical professionals make the final diagnostic decisions.",
        image: "/images/examples/medical-ai-assistance.png",
        altText: "Medical AI with human oversight"
      }
    ],
    guidelines: [
      "Clearly indicate when AI is making suggestions vs. taking actions",
      "Provide easy ways to review, modify, or reject AI recommendations",
      "Show confidence levels or uncertainty indicators for AI decisions",
      "Allow users to provide feedback to improve future AI performance",
      "Design clear approval workflows for high-stakes decisions",
      "Maintain audit trails of human interventions and AI actions",
      "Provide undo/redo functionality for AI-assisted actions",
      "Enable batch review and approval for efficiency",
      "Offer different levels of automation based on user preference and context"
    ],
    considerations: [
      "Determine which decisions require human oversight vs. full automation",
      "Balance efficiency gains with the need for human control",
      "Consider the cognitive load of constant review and approval",
      "Design for different expertise levels and trust in AI systems",
      "Account for time-sensitive decisions where human review may not be feasible",
      "Consider legal and regulatory requirements for human oversight",
      "Plan for scenarios where humans and AI disagree",
      "Ensure the system gracefully handles human unavailability",
      "Monitor for automation bias where humans over-rely on AI suggestions"
    ],
    relatedPatterns: [
      "Transparent Feedback",
      "Explainable AI",
      "Error Recovery",
      "Responsible AI Design"
    ]
  }
}; 