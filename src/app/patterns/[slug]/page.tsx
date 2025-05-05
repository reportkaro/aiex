import { notFound } from 'next/navigation';
import patterns from '@/data/patterns';
import ClientPage from './client-page';

export async function generateStaticParams() {
  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}

export default async function PatternPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  // Find the pattern
  const pattern = patterns.find((p) => p.slug === slug);
  
  if (!pattern) {
    notFound();
  }

  // Find index of current pattern to determine next/previous
  const currentIndex = patterns.findIndex(p => p.slug === slug);
  const previousPattern = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  return (
    <ClientPage 
      pattern={pattern}
      previousPattern={previousPattern}
      nextPattern={nextPattern}
    />
  );
} 