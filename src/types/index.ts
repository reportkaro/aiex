export interface Pattern {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  featured: boolean;
  content: {
    problem: string;
    solution: string;
    examples: Array<{
      title: string;
      description: string;
      imageUrl?: string;
    }>;
    guidelines: string[];
    considerations: string[];
    relatedPatterns: string[];
  };
}
