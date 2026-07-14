import { Link } from 'react-router-dom';
import { Linkedin, ChevronRight, Send, ArrowRight, ChevronUp, MapPin, ArrowUpRight, Clock, MessageCircle, Phone } from 'lucide-react';
import { SectionGlow } from './Atmosphere';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B121F] text-gray-400">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <SectionGlow color="blue" position="bottom-right" opacity={0.08} size={600} />
      
      {/* Top Banner */}
      <div className="border-b border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Talk - Contact Us
          </h2>
          <Link to="/contact-us" className="bg-white text-[#0B121F] hover:bg-gray-100 px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-colors">
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <Link 
              to="/" 
              className="inline-block cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img loading="lazy" decoding="async"
                src="/kk-logo-transparent.png"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 drop-shadow-md"
                alt="KK Tech Solutions"
              />
            </Link>
            
            <div className="space-y-3 mt-4 text-sm text-gray-400 pr-4">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                <span>715, Shilp Arista, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat – 380054</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+917048214373" className="hover:text-white transition-colors">+91 70482 14373</a>
              </p>
              <p className="flex items-center gap-3">
                <Send className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@kktechsolutions.in" className="hover:text-white transition-colors">info@kktechsolutions.in</a>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/kktechsolutions' },
                { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/917048214373' },
                { Icon: Send, label: 'Email', href: 'mailto:info@kktechsolutions.in' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 hover:bg-blue-600 text-gray-400 hover:text-white border border-white/5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'Microsoft 365', to: '/microsoft-365' },
                { label: 'Azure', to: '/azure' },
                { label: 'AWS Cloud', to: '/aws' },
                { label: 'Adobe Solutions', to: '/adobe' },
                { label: 'Autodesk', to: '/autodesk' },
                { label: 'CorelDRAW', to: '/coreldraw' },
                { label: 'GstarCAD', to: '/gstarcad' },
                { label: 'ZWCAD', to: '/zwcad' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    <ChevronRight className="w-3 h-3 text-blue-500 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Servers */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Servers</h3>
            <ul className="space-y-3">
              {[
                { label: 'Dell PowerEdge', to: '/servers/dell' },
                { label: 'HPE ProLiant', to: '/servers/hp' },
                { label: 'Lenovo ThinkSystem', to: '/servers/lenovo' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    <ChevronRight className="w-3 h-3 text-blue-500 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about-us' },
                { label: 'Services', to: '/our-services' },
                { label: 'Servers', to: '/servers/dell' },
                { label: 'Clients', to: '/clients' },
                { label: 'Contact Us', to: '/contact-us' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    <ChevronRight className="w-3 h-3 text-blue-500 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Office Addresses */}
        <div className="mt-16 pt-12 border-t border-white/5 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <a 
            href="https://maps.google.com/?q=715,+Shilp+Arista,+Sindhu+Bhavan+Road,+Bodakdev,+Ahmedabad,+Gujarat+380054"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Head Office â€” Opens Google Maps"
            className="group relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 block cursor-pointer active:scale-95"
          >
            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
                Head Office
              </h4>
              <ArrowUpRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all duration-300" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              715, Shilp Arista<br/>
              Sindhu Bhavan Road, Bodakdev<br/>
              Ahmedabad, Gujarat â€“ 380054
            </p>
          </a>

          <a 
            href="https://maps.google.com/?q=818,+8th+Floor,+Devika+Tower,+Nehru+Place,+New+Delhi+110019"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Branch Office â€” Opens Google Maps"
            className="group relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 block cursor-pointer active:scale-95"
          >
            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
                Branch Office
              </h4>
              <ArrowUpRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all duration-300" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              818, 8th Floor<br/>
              Devika Tower, Nehru Place<br/>
              New Delhi â€“ 110019
            </p>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-sm text-gray-500">
            Â© {new Date().getFullYear()} KK Techsolutions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Use</Link>
          </div>
          
          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="absolute right-4 md:right-8 -top-6 w-12 h-12 bg-[#060A11] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 transition-all z-20 shadow-lg cursor-pointer group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}


