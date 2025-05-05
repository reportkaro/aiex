export interface Example {
  title: string;
  description: string;
  image: string;
  altText: string;
  url?: string;
}

export interface CodeExample {
  code: string;
  language: string;
  title: string;
  description: string;
  componentId?: string;
}

export interface PatternContent {
  problem: string;
  solution: string;
  examples: Example[];
  codeExamples?: CodeExample[];
  guidelines: string[];
  considerations: string[];
  relatedPatterns: string[];
}

export interface Pattern {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  content: PatternContent;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  slug: string;
  color: string;
  image: string;
}
