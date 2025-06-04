import { Pattern } from '../types';
import { contextualassistance } from './patterns/patterns/contextual-assistance';
import { progressivedisclosure } from './patterns/patterns/progressive-disclosure';
import { humanintheloop } from './patterns/patterns/human-in-the-loop';
import { explainableai } from './patterns/patterns/explainable-ai';
import { conversationalui } from './patterns/patterns/conversational-ui';
import { adaptiveinterfaces } from './patterns/patterns/adaptive-interfaces';

export const patterns: Pattern[] = [
  contextualassistance,
  progressivedisclosure,
  humanintheloop,
  explainableai,
  conversationalui,
  adaptiveinterfaces
];

export default patterns;

