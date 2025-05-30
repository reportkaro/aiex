import { Pattern } from '../types';
import { contextualassistance } from './patterns/patterns/contextual-assistance';
import { progressiveDisclosurePattern } from './patterns/patterns/progressive-disclosure';
import { humanInTheLoopPattern } from './patterns/patterns/human-in-the-loop';
import { explainableAIPattern } from './patterns/patterns/explainable-ai';
import { conversationalUIPattern } from './patterns/patterns/conversational-ui';

export const patterns: Pattern[] = [
  contextualassistance,
  progressiveDisclosurePattern,
  humanInTheLoopPattern,
  explainableAIPattern,
  conversationalUIPattern
];

export default patterns;

