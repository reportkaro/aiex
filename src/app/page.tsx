import Hero from '../components/sections/Hero';
import PatternCategories from '../components/sections/PatternCategories';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16">
        <section id="categories" className="py-12 md:py-16">
          <PatternCategories />
        </section>
      </div>
    </main>
  );
}
