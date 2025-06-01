import { Pattern } from '../types';
import { contextualassistance } from './patterns/patterns/contextual-assistance';
import { progressivedisclosure } from './patterns/patterns/progressive-disclosure';
import { humanintheloop } from './patterns/patterns/human-in-the-loop';
import { explainableai } from './patterns/patterns/explainable-ai';
import { conversationalui } from './patterns/patterns/conversational-ui';

export const patterns: Pattern[] = [
  contextualassistance,
  progressivedisclosure,
  humanintheloop,
  explainableai,
  conversationalui
];

export default patterns;

