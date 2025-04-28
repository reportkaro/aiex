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

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params to get the slug
  const { slug } = await params;
  
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
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span>/</span>
        <Link href="/patterns" className="hover:text-gray-800">Patterns</Link>
        <span>/</span>
        <span className="text-gray-700">{pattern.title}</span>
      </nav>

      {/* Pattern Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold mt-3 mb-6 text-gray-900">{pattern.title}</h1>
        <div className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          {pattern.description}
        </div>
      </div>
      
      {/* Main Content - Full Width */}
      <div className="space-y-12">
        {/* Problem and Solution Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Problem</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{pattern.content.problem}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Solution</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{pattern.content.solution}</p>
            </div>
          </section>
        </div>
        
        {/* Image Carousel for Examples */}
        {pattern.content.examples && pattern.content.examples.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Examples in the Wild</h2>
            </div>
            <div className="bg-white rounded-lg p-2 overflow-hidden border border-gray-200 shadow-sm">
              <Carousel examples={pattern.content.examples} />
            </div>
          </section>
        )}
        
        {/* Interactive Examples */}
        <ClientPage patternSlug={slug} />
        
        {/* Implementation Guidelines and Design Considerations */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Implementation & Considerations</h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
                  Implementation Guidelines
                </h3>
                <div className="space-y-4">
                  {pattern.content.guidelines.map((guideline, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-6 w-6 flex-shrink-0 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-medium text-gray-700 mr-3 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{guideline}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 p-6 md:p-8 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
                  Design Considerations
                </h3>
                <div className="space-y-4">
                  {pattern.content.considerations.map((consideration, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-6 w-6 flex-shrink-0 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-medium text-gray-700 mr-3 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{consideration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Patterns */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-b from-pink-500 to-violet-500 w-1 h-8 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Related Patterns</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pattern.content.relatedPatterns.map((related, i) => (
              <Link 
                key={i} 
                href={`/patterns/${related.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                  <span className="text-lg font-medium text-gray-700">{related}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Previous/Next Pattern Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-8 mt-12">
          {previousPattern ? (
            <Link 
              href={`/patterns/${previousPattern.slug}`}
              className="flex items-center text-gray-600 hover:text-gray-800 group mb-4 sm:mb-0"
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
          
          <Link href="/patterns" className="px-5 py-2 bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-gray-700 rounded-full hover:from-pink-500/20 hover:to-violet-500/20 transition-colors font-medium border border-gray-200">
            View All Patterns
          </Link>
          
          {nextPattern ? (
            <Link 
              href={`/patterns/${nextPattern.slug}`}
              className="flex items-center text-gray-600 hover:text-gray-800 text-right group mt-4 sm:mt-0"
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
    </main>
  );
} 