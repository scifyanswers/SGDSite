import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import Results from '../components/Results';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    document.title = 'Solid Gear Designs | Manufacturing Engineering Services | GD&T, DFM & CAD Expertise';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Senior manufacturing engineering support for high-mix manufacturers. Expert GD&T review, design for manufacturability (DFM), scrap reduction, and production stabilization. Over 20 years of proven experience.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Solutions />
      <Results />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
