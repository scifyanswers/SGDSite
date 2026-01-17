import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import Results from '../components/Results';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
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
