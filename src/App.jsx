import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Index from './pages/Index';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      {/* The Navbar floats at the top of every page */}
      <Navbar />
      
      {/* The Routes control what is shown underneath */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/info" element={<Index />} />
          <Route path="/case-study/:slug" element={<CaseStudy />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;