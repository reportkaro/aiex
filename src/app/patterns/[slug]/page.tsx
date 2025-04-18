import { notFound } from 'next/navigation';
import patterns from '@/data/patterns';
import ClientPage from './client-page';
import Link from 'next/link';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Carousel from '@/components/ui/Carousel';

export async function generateStaticParams() {
  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}

export default async function PatternPage({ params }: { params: { slug: string } }) {
  // Extract the slug - we've made the function async now so params.slug is safe to use
  const { slug } = params;
  
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
    <main className="max-w-6xl mx-auto py-8 px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/patterns" className="hover:text-blue-600">Patterns</Link>
        <span>/</span>
        <span className="text-gray-700">{pattern.title}</span>
      </nav>

      <div className="mb-10">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${pattern.categoryColor}-100 text-${pattern.categoryColor}-800`}>
          {pattern.category}
        </span>
        <h1 className="text-5xl font-bold mt-3 mb-6 text-gray-900">{pattern.title}</h1>
        <div className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          {pattern.description}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <div>
          {/* Image Carousel for Contextual Assistance Examples */}
          {pattern.content.examples && pattern.content.examples.length > 0 && (
            <section className="mb-12">
              <Carousel examples={pattern.content.examples} />
            </section>
          )}
          
          {/* Interactive Examples - Moved to top */}
          {pattern.slug === 'contextual-assistance' && <ClientPage patternSlug={slug} />}
          
          <section className="mb-12">
            <div className="flex items-center mb-5">
              <div className="bg-red-500 w-1 h-8 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Problem</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{pattern.content.problem}</p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center mb-5">
              <div className="bg-green-500 w-1 h-8 mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Solution</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{pattern.content.solution}</p>
            </div>
          </section>

          {/* Guidelines and Considerations - paired per row */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Guidelines</h3>
                  <ul>
                    {pattern.content.guidelines.map((guideline, i) => (
                      <li key={i} className="flex items-center bg-white rounded-md px-4 py-3 mb-3 shadow-sm border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span className="text-gray-700">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Considerations</h3>
                  <ul>
                    {pattern.content.considerations.map((consideration, i) => (
                      <li key={i} className="flex items-center bg-white rounded-md px-4 py-3 mb-3 shadow-sm border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 flex-shrink-0">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span className="text-gray-700">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Related Patterns - horizontal tile */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Related Patterns</h3>
              <ul className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0 justify-between items-stretch">
                {pattern.content.relatedPatterns.map((related, i) => (
                  <li key={i} className="flex items-center bg-white rounded-md px-4 py-3 mb-2 md:mb-0 shadow-sm border border-gray-100 flex-1 mr-0 md:mr-0 overflow-hidden">
                    <Link href={`/patterns/${related.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-3">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                      <span className="text-blue-600 font-medium">{related}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Previous/Next Pattern Navigation */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-8 mt-12">
            {previousPattern ? (
              <Link 
                href={`/patterns/${previousPattern.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>
                  <span className="block text-sm text-gray-500">Previous Pattern</span>
                  <span className="font-medium">{previousPattern.title}</span>
                </span>
              </Link>
            ) : <div />}
            
            <Link href="/patterns" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium">
              View All Patterns
            </Link>
            
            {nextPattern ? (
              <Link 
                href={`/patterns/${nextPattern.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 text-right group"
              >
                <span>
                  <span className="block text-sm text-gray-500">Next Pattern</span>
                  <span className="font-medium">{nextPattern.title}</span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </main>
  );
} 