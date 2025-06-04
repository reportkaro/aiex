import { Pattern } from '../../../../types';
import { examples } from './examples';
import { guidelines } from './guidelines';
import { considerations } from './considerations';
import { codeExamples } from './code-examples';

export const adaptiveinterfaces: Pattern = {
  id: "adaptive-interfaces",
  title: "Adaptive Interfaces",
  slug: "adaptive-interfaces",
  category: "Adaptive Interfaces",
  description: "Interfaces that learn from user behavior and automatically adjust layout and functionality to match individual usage patterns.",
  thumbnail: "/images/examples/netflix-adaptive.gif",
  content: {
    problem: "Static interfaces treat all users the same, causing inefficient workflows and feature discovery issues.",
    solution: "Create systems that observe user behavior to automatically adapt layout and feature visibility while remaining transparent and user-controllable.",
    examples,
    guidelines,
    considerations,
    relatedPatterns: [
      "Contextual Assistance",
      "Progressive Disclosure",
      "Human-in-the-Loop"
    ],
    codeExamples
  }
}; 