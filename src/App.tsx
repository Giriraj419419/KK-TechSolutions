import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import Preloader from './components/Preloader';
// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const AWS = lazy(() => import('./pages/AWS'));
const Microsoft365 = lazy(() => import('./pages/Microsoft365'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const ZWCAD = lazy(() => import('./pages/ZWCAD'));
const Adobe = lazy(() => import('./pages/Adobe'));
const GstarCAD = lazy(() => import('./pages/GstarCAD'));
const CorelDRAW = lazy(() => import('./pages/CorelDRAW'));
const Azure = lazy(() => import('./pages/Azure'));
const Autodesk = lazy(() => import('./pages/Autodesk'));
const DellServers = lazy(() => import('./pages/DellServers'));
const HPServers = lazy(() => import('./pages/HPServers'));
const LenovoServers = lazy(() => import('./pages/LenovoServers'));
const Clients = lazy(() => import('./pages/Clients'));

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <WhatsAppButton />
      <ScrollToTop />
      {/* Noise texture overlay */}
      <div className="noise" />
      <Navbar />
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Suspense fallback={<div className="min-h-screen w-full bg-[#0B121F]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/our-services" element={<Services />} />
            <Route path="/aws" element={<AWS />} />
            <Route path="/azure" element={<Azure />} />
            <Route path="/autodesk" element={<Autodesk />} />
            <Route path="/servers/dell" element={<DellServers />} />
            <Route path="/servers/hp" element={<HPServers />} />
            <Route path="/servers/lenovo" element={<LenovoServers />} />
            <Route path="/zwcad" element={<ZWCAD />} />
            <Route path="/adobe" element={<Adobe />} />
            <Route path="/gstarcad" element={<GstarCAD />} />
            <Route path="/coreldraw" element={<CorelDRAW />} />
            <Route path="/microsoft-365" element={<Microsoft365 />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </BrowserRouter>
  );
}
