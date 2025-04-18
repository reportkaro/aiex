// Define the Category type directly in this file to avoid import issues
interface Category {
  id: string;
  title: string;
  description: string;
  slug: string;
  color: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "contextual-assistance",
    title: "Contextual Assistance",
    description: "Provide timely help and suggestions based on the user's current task and needs",
    slug: "contextual-assistance",
    color: "blue",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  },
  {
    id: "progressive-disclosure",
    title: "Progressive Disclosure",
    description: "Reveal information gradually to reduce cognitive load and complexity",
    slug: "progressive-disclosure",
    color: "green",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  },
  {
    id: "human-in-the-loop",
    title: "Human-in-the-Loop",
    description: "Balance automation with human oversight and intervention for critical decisions",
    slug: "human-in-the-loop",
    color: "amber",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  },
  {
    id: "conversational-ui",
    title: "Conversational UI",
    description: "Design natural, human-like interactions through chat and voice interfaces",
    slug: "conversational-ui",
    color: "purple",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  },
  {
    id: "transparent-feedback",
    title: "Transparent Feedback",
    description: "Communicate AI system capabilities, limitations, and confidence levels clearly",
    slug: "transparent-feedback",
    color: "pink",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  },
  {
    id: "adaptive-interfaces",
    title: "Adaptive Interfaces",
    description: "Create interfaces that learn from user behavior and adjust accordingly",
    slug: "adaptive-interfaces",
    color: "gray",
    image: "/images/examples/Code-completions-with-GitHub-Copilot-in-VS-Code-04-17-2025_05_05_PM.png"
  }
];

export default categories;
