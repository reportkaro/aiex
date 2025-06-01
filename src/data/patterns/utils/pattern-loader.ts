import { Pattern } from '../../../types';

/**
 * Attempts to load a pattern using the new modular structure first,
 * falling back to the old structure if not found.
 */
export const loadPattern = async (patternId: string): Promise<Pattern | null> => {
  try {
    // First try the new modular structure
    const module = await import(`../patterns/${patternId}/index`);
    return module[patternId.replace(/-/g, '')];
  } catch (error) {
    try {
      // Fall back to the old structure
      const module = await import(`../patterns/${patternId}`);
      return module[patternId.replace(/-/g, '')];
    } catch (error) {
      console.error(`Failed to load pattern ${patternId}:`, error);
      return null;
    }
  }
};

/**
 * Loads all patterns, supporting both old and new structures
 * Only includes patterns that actually exist
 */
export const loadAllPatterns = async (): Promise<Pattern[]> => {
  const patternIds = [
    'contextual-assistance',
    'progressive-disclosure',
    'human-in-the-loop',
    'conversational-ui',
    'explainable-ai'
  ];

  const patterns = await Promise.all(
    patternIds.map(id => loadPattern(id))
  );

  return patterns.filter((pattern): pattern is Pattern => pattern !== null);
}; 