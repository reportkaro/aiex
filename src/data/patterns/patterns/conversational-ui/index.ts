import { Pattern } from '../../../../types';

export const conversationalUIPattern: Pattern = {
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
        title: "ChatGPT Interface",
        description: "Maintains conversation history, understands references to previous messages, and adapts its communication style based on user preferences.",
        image: "/images/examples/chatgpt-conversation.png",
        altText: "ChatGPT conversational interface"
      },
      {
        title: "Voice Assistants (Alexa/Siri)",
        description: "Handle natural speech patterns, interruptions, and follow-up questions while maintaining conversational flow.",
        image: "/images/examples/voice-assistant-ui.png",
        altText: "Voice assistant conversational interface"
      },
      {
        title: "Customer Service Chatbots",
        description: "Guide users through complex support scenarios using natural conversation while seamlessly escalating to human agents when needed.",
        image: "/images/examples/customer-service-chat.png",
        altText: "Customer service conversational interface"
      }
    ],
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