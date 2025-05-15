import { Pattern } from '../types';

// Import all patterns
import { contextualAssistance } from './patterns/contextual-assistance';
import { progressiveDisclosure } from './patterns/progressive-disclosure';
import { humanInTheLoop } from './patterns/human-in-the-loop';
import { conversationalUI } from './patterns/conversational-ui';
import { transparentFeedback } from './patterns/transparent-feedback';
import { adaptiveInterfaces } from './patterns/adaptive-interfaces';
import { multimodalInteraction } from './patterns/multimodal-interaction';
import { explainableAI } from './patterns/explainable-ai';
import { responsibleAIDesign } from './patterns/responsible-ai-design';
import { errorRecovery } from './patterns/error-recovery';
import { collaborativeAI } from './patterns/collaborative-ai';
import { ambientIntelligence } from './patterns/ambient-intelligence';
import { safeExploration } from './patterns/safe-exploration';
import { guidedLearning } from './patterns/guided-learning';

// Export all patterns as an array
export const patterns: Pattern[] = [
  contextualAssistance,
  progressiveDisclosure,
  humanInTheLoop,
  conversationalUI,
  transparentFeedback,
  adaptiveInterfaces,
  multimodalInteraction,
  explainableAI,
  responsibleAIDesign,
  errorRecovery,
  collaborativeAI,
  ambientIntelligence,
  safeExploration,
  guidedLearning
];

// Export individual patterns for direct imports
export {
  contextualAssistance,
  progressiveDisclosure,
  humanInTheLoop,
  conversationalUI,
  transparentFeedback,
  adaptiveInterfaces,
  multimodalInteraction,
  explainableAI,
  responsibleAIDesign,
  errorRecovery,
  collaborativeAI,
  ambientIntelligence,
  safeExploration,
  guidedLearning
};

// Helper functions for pattern management
export const getPatternById = (id: string): Pattern | undefined => {
  return patterns.find(pattern => pattern.id === id);
};

export const getPatternsByCategory = (category: string): Pattern[] => {
  return patterns.filter(pattern => pattern.category === category);
};

export const getFeaturedPatterns = (): Pattern[] => {
  return patterns.filter(pattern => pattern.featured);
};

// Lazy loading for code examples
export const loadCodeExample = async (patternId: string, exampleId: string) => {
  try {
    const module = await import(`./examples/${patternId}/${exampleId}`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load code example for ${patternId}/${exampleId}:`, error);
    return null;
  }
}; 