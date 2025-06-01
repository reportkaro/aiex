import { Pattern } from '../../../../types';
import { codeExamples } from './code-examples';

export const conversationalui: Pattern = {
  id: "conversational-ui",
  title: "Conversational UI",
  slug: "conversational-ui",
  category: "Conversational UI",
  description: "Design natural, human-like interactions through chat and voice interfaces that feel intuitive and engaging.",
  thumbnail: "/images/examples/slack-ai.gif",
  content: {
    problem: "Traditional interfaces with buttons, forms, and menus can feel rigid and require users to learn specific interaction patterns. Users often prefer natural language communication but struggle with AI that doesn't understand context or conversational nuances.",
    solution: "Create conversational interfaces that understand natural language, maintain context across interactions, and respond in a human-like manner. Design for both text and voice interactions, with appropriate personality and tone that matches your brand and user expectations.",
    examples: [
      {
        title: "Slack AI Assistant",
        description: "Integrates naturally into team conversations, understanding context and providing relevant assistance without disrupting workflow.",
        image: "/images/examples/slack-ai.gif",
        altText: "Slack AI conversational interface"
      },
      {
        title: "Microsoft Copilot",
        description: "Provides intelligent assistance across Microsoft 365 applications, understanding context from documents, emails, and meetings to offer relevant suggestions and automate tasks through natural conversation.",
        image: "/images/examples/microsoft-copilot.gif",
        altText: "Microsoft Copilot conversational interface"
      },
      {
        title: "Siri",
        description: "Apple's voice assistant that handles natural speech patterns, maintains conversation context, and integrates seamlessly with iOS ecosystem to perform tasks through voice commands and follow-up questions.",
        image: "/images/examples/siri-conversation.gif",
        altText: "Siri voice assistant conversational interface"
      }
    ],
    codeExamples,
    guidelines: [
      "Use natural language patterns and avoid overly formal or robotic responses",
      "Maintain conversation context and reference previous interactions appropriately",
      "Provide clear conversation starters and example prompts for new users",
      "Handle misunderstandings gracefully with clarifying questions",
      "Use appropriate personality and tone that matches your brand",
      "Support both structured commands and free-form natural language",
      "Provide visual cues for conversation state (typing indicators, read receipts)",
      "Design for both synchronous and asynchronous conversation patterns",
      "Include conversation history and search functionality",
      "Handle interruptions and topic changes smoothly"
    ],
    considerations: [
      "Balance personality with professionalism based on use case",
      "Consider cultural differences in communication styles and expectations",
      "Plan for multilingual support and language detection",
      "Design appropriate fallback mechanisms when AI doesn't understand",
      "Consider privacy implications of conversation history storage",
      "Account for accessibility needs in both text and voice interfaces",
      "Plan for conversation handoffs between AI and human agents",
      "Consider the cognitive load of extended conversations",
      "Design appropriate boundaries for AI personality and capabilities",
      "Test with diverse user groups to validate conversational patterns"
    ],
    relatedPatterns: [
      "Contextual Assistance",
      "Human-in-the-Loop",
      "Progressive Disclosure",
      "Multimodal Interaction"
    ]
  }
}; 