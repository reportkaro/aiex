export interface Pattern {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  categoryColor: string;
  featured?: boolean;
  content: {
    problem: string;
    solution: string;
    examples: {
      title: string;
      description: string;
      imagePath?: string;
      imageCredit?: string;
    }[];
    guidelines: string[];
    considerations: string[];
    relatedPatterns: string[];
  };
} 