import Hero from '../components/sections/Hero';
import PatternCategories from '../components/sections/PatternCategories';
import FeaturedPatterns from '../components/sections/FeaturedPatterns';
import ContributeSection from '../components/sections/ContributeSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero />
      <section className="max-w-4xl mx-auto py-8 px-4">
        <PatternCategories />
      </section>
      <section className="max-w-4xl mx-auto py-8 px-4">
        <FeaturedPatterns />
      </section>
      <section className="max-w-4xl mx-auto py-8 px-4">
        <ContributeSection />
      </section>
    </main>
  );
}
