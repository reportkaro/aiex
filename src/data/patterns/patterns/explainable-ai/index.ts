import { Pattern } from '../../../../types';

export const explainableAIPattern: Pattern = {
  id: "explainable-ai",
  title: "Explainable AI (XAI)",
  slug: "explainable-ai",
  category: "Explainable AI",
  description: "Make AI decision-making processes understandable through visualizations, explanations, and transparent reasoning paths.",
  thumbnail: "/images/examples/openai-human-feedback.png",
  content: {
    problem: "AI systems often operate as 'black boxes' where users cannot understand how decisions are made. This lack of transparency reduces trust, makes debugging difficult, and can lead to biased or incorrect decisions going unnoticed.",
    solution: "Provide clear explanations of how AI systems reach their conclusions. Use visualizations, natural language explanations, and interactive elements to help users understand the reasoning process, data sources, and confidence levels behind AI decisions.",
    examples: [
      {
        title: "OpenAI ChatGPT Reasoning",
        description: "Shows step-by-step reasoning for complex problems, breaking down the thought process and explaining how conclusions are reached.",
        image: "/images/examples/chatgpt-reasoning.png",
        altText: "ChatGPT step-by-step reasoning explanation"
      },
      {
        title: "Google AI Search Results",
        description: "Provides source attribution and explains why certain results are ranked higher, showing the factors that influenced the AI's decision.",
        image: "/images/examples/google-ai-explanation.png",
        altText: "Google AI search result explanations"
      },
      {
        title: "Perplexity AI Citations",
        description: "Shows exactly which sources were used for each part of the answer, allowing users to verify and understand the information basis.",
        image: "/images/examples/perplexity-attribution.gif",
        altText: "Perplexity AI source attribution"
      },
      {
        title: "Medical AI Diagnosis Explanation",
        description: "Highlights which symptoms, test results, and risk factors contributed to a diagnostic recommendation, with confidence scores.",
        image: "/images/examples/medical-ai-explanation.png",
        altText: "Medical AI diagnosis explanation"
      }
    ],
    guidelines: [
      "Provide explanations at appropriate levels of detail for different user types",
      "Use visual aids like heatmaps, charts, and diagrams to illustrate decision factors",
      "Show confidence levels and uncertainty ranges for AI predictions",
      "Explain both what the AI decided and why it made that decision",
      "Provide source attribution and data provenance when applicable",
      "Use natural language explanations that non-experts can understand",
      "Allow users to drill down into more detailed explanations when needed",
      "Show alternative options that were considered but not chosen",
      "Highlight the most important factors that influenced the decision"
    ],
    considerations: [
      "Balance explanation detail with cognitive load and usability",
      "Consider different explanation needs for different user expertise levels",
      "Ensure explanations are accurate and don't oversimplify complex processes",
      "Account for cases where the AI reasoning may be too complex to explain simply",
      "Consider privacy implications of showing detailed decision factors",
      "Plan for scenarios where explanations might reveal system vulnerabilities",
      "Test explanations with real users to ensure they're actually helpful",
      "Consider cultural and linguistic differences in explanation preferences",
      "Balance transparency with intellectual property protection"
    ],
    relatedPatterns: [
      "Transparent Feedback",
      "Human-in-the-Loop",
      "Responsible AI Design",
      "Error Recovery"
    ]
  }
}; 