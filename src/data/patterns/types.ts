export interface Example {
  title: string;
  description: string;
  imagePath: string;
  imageCredit?: string;
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
  componentId?: string;
}

export interface PatternContent {
  problem: string;
  solution: string;
  examples: Example[];
  guidelines: string[];
  considerations: string[];
  relatedPatterns: string[];
  codeExamples: CodeExample[];
}

export interface Pattern {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: {
    problem: string;
    solution: string;
    overview: string;
    whenToUse: string[];
    benefits: string[];
    considerations: string[];
    guidelines: string[];
    examples: Example[];
    codeExamples: CodeExample[];
    relatedPatterns: string[];
  };
  tags: string[];
} 