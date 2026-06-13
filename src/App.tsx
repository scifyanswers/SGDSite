import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Qualify from './pages/Qualify';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/qualify" element={<Qualify />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
