import { notFound } from 'next/navigation';
import { loadPattern } from '@/data/patterns/utils/pattern-loader';
import ClientPage from './client-page';

export default async function PatternPage({ params }: { params: { slug: string } }) {
  // Only load the requested pattern
  const pattern = await loadPattern(params.slug);

  if (!pattern) {
    notFound();
  }

  // Previous/next navigation is omitted for now
  return (
    <ClientPage 
      pattern={pattern}
      previousPattern={null}
      nextPattern={null}
    />
  );
} 