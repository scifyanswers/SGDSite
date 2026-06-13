import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QualificationSection from '../sections/qualification/QualificationSection';

export default function Qualify() {
  useEffect(() => {
    document.title = 'Are We a Fit? | Solid Gear Designs';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0F1B27' }}>
      <Navigation />
      <QualificationSection />
      <Footer />
    </div>
  );
}
