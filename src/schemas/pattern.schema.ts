import { z } from 'zod'

// Example schema - matching existing structure
export const ExampleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image path is required'),
  altText: z.string().min(1, 'Alt text is required'),
  url: z.string().optional(),
})

// Code example schema - matching existing structure
export const CodeExampleSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  language: z.string().min(1, 'Language is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  componentId: z.string().optional(),
})

// Pattern content schema - matching existing structure
export const PatternContentSchema = z.object({
  problem: z.string().min(1, 'Problem description is required'),
  solution: z.string().min(1, 'Solution description is required'),
  examples: z.array(ExampleSchema).min(1, 'At least one example is required'),
  codeExamples: z.array(CodeExampleSchema).optional(),
  guidelines: z.array(z.string()).min(1, 'At least one guideline is required'),
  considerations: z.array(z.string()).min(1, 'At least one consideration is required'),
  relatedPatterns: z.array(z.string()),
})

// Main pattern schema - matching existing structure
export const PatternSchema = z.object({
  id: z.string().min(1, 'ID is required').regex(/^[a-z0-9-]+$/, 'ID must be lowercase with hyphens only'),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required').max(200, 'Description must be under 200 characters'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  content: PatternContentSchema,
})

// Category schema
export const CategorySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required'),
  color: z.string().min(1, 'Color is required'),
  image: z.string().min(1, 'Image is required'),
})

// Array schemas
export const PatternsArraySchema = z.array(PatternSchema)
export const CategoriesArraySchema = z.array(CategorySchema)

// Type exports
export type Example = z.infer<typeof ExampleSchema>
export type CodeExample = z.infer<typeof CodeExampleSchema>
export type PatternContent = z.infer<typeof PatternContentSchema>
export type Pattern = z.infer<typeof PatternSchema>
export type Category = z.infer<typeof CategorySchema>
export type PatternsArray = z.infer<typeof PatternsArraySchema>
export type CategoriesArray = z.infer<typeof CategoriesArraySchema>

// Validation functions
export const validatePattern = (pattern: unknown): Pattern => {
  return PatternSchema.parse(pattern)
}

export const validatePatterns = (patterns: unknown): Pattern[] => {
  return PatternsArraySchema.parse(patterns)
}

export const validateCategory = (category: unknown): Category => {
  return CategorySchema.parse(category)
}

export const validateCategories = (categories: unknown): Category[] => {
  return CategoriesArraySchema.parse(categories)
}

// Safe validation functions that return results instead of throwing
export const safeValidatePattern = (pattern: unknown) => {
  return PatternSchema.safeParse(pattern)
}

export const safeValidatePatterns = (patterns: unknown) => {
  return PatternsArraySchema.safeParse(patterns)
}

export const safeValidateCategory = (category: unknown) => {
  return CategorySchema.safeParse(category)
}

export const safeValidateCategories = (categories: unknown) => {
  return CategoriesArraySchema.safeParse(categories)
} 