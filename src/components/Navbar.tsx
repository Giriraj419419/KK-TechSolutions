/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { isAppLoaded } from './Preloader';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about-us' },
  { 
    label: 'Services', 
    dropdown: [
      { label: 'Microsoft 365', to: '/microsoft-365', desc: 'Cloud Productivity', logo: '/microsoft.svg', colorClass: 'hover:border-blue-500/30 hover:bg-blue-500/10 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]' },
      { label: 'Azure', to: '/azure', desc: 'Cloud Computing Platform', logo: '/azure.svg', colorClass: 'hover:border-sky-500/30 hover:bg-sky-500/10 group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]' },
      { label: 'Adobe Solutions', to: '/adobe', desc: 'Creative Cloud Software', logo: '/adobe.svg', colorClass: 'hover:border-red-500/30 hover:bg-red-500/10 group-hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]' },
      { label: 'Autodesk Solutions', to: '/autodesk', desc: '3D Design & Engineering', logo: '/autodesk.svg', colorClass: 'hover:border-emerald-500/30 hover:bg-emerald-500/10 group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]' },
      { label: 'GstarCAD Solutions', to: '/gstarcad', desc: 'Professional CAD Platform', logo: '/gstarcad.svg', colorClass: 'hover:border-cyan-500/30 hover:bg-cyan-500/10 group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]' },
      { label: 'ZWCAD Solutions', to: '/zwcad', desc: 'Reliable CAD Software', logo: '/zwcad.svg', colorClass: 'hover:border-blue-500/30 hover:bg-blue-500/10 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]' },
      { label: 'CorelDRAW Graphics', to: '/coreldraw', desc: 'Design & Illustration Suite', logo: '/corel.svg', colorClass: 'hover:border-green-500/30 hover:bg-green-500/10 group-hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)]' },
      { label: 'AWS Cloud', to: '/aws', desc: 'Enterprise Cloud Solutions', logo: '/aws.svg', colorClass: 'hover:border-orange-500/30 hover:bg-orange-500/10 group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]' },
    ] 
  },
  {
    label: 'Servers',
    dropdown: [
      { label: 'Dell PowerEdge', to: '/servers/dell', desc: 'Enterprise Rack, Tower & Blade Servers', logo: '/dell.svg', colorClass: 'hover:border-sky-500/30 hover:bg-sky-500/10 group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]' },
      { label: 'HP (HPE ProLiant)', to: '/servers/hp', desc: 'Intelligent Enterprise Compute Solutions', logo: '/hp.svg', colorClass: 'hover:border-green-500/30 hover:bg-green-500/10 group-hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)]' },
      { label: 'Lenovo ThinkSystem', to: '/servers/lenovo', desc: 'Reliable High-Performance Data Center Servers', logo: '/lenovo.svg', colorClass: 'hover:border-red-500/30 hover:bg-red-500/10 group-hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]' },
    ]
  },
  { label: 'Clients', to: '/clients' },
  { label: 'Contact', to: '/contact-us' },
];

function MegaMenuItem({ d, loc, closeNav }: { d: any; loc: any; closeNav: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });
  
  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const active = loc.pathname === d.to;

  // Extract glow color from group-hover shadow class for ambient glow (default to blue if not found)
  let extractedColor = 'rgba(255, 255, 255, 0.1)';
  const match = d.colorClass.match(/rgba\((.*?)\)/);
  if (match) {
    extractedColor = `rgba(${match[1].split(',').slice(0, 3).join(', ')}, 0.25)`;
  }

  return (
    <Link
      to={d.to}
      onClick={closeNav}
      onMouseMove={handleMouseMove}
      className={`group relative flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg ${d.colorClass} overflow-hidden`}
      style={{
        background: active ? 'rgba(255, 255, 255, 0.05)' : '',
        borderColor: active ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
      }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white/20 rounded-r-full transition-all duration-300 group-hover:h-1/2 opacity-0 group-hover:opacity-100 mix-blend-overlay" />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${springX}px ${springY}px,
              ${extractedColor},
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
        <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-[200%] rotate-45 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-out" />
      </div>

      <div className="relative z-10 shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:-rotate-2">
        <img src={d.logo} alt={d.label} className="w-5 h-5 object-contain drop-shadow-sm transition-all duration-300 group-hover:brightness-125" />
      </div>
      
      <div className="relative z-10 flex flex-col transition-transform duration-300 group-hover:translate-x-1">
        <span className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors duration-300">
          {d.label}
        </span>
        <span className="text-[11.5px] text-gray-400 mt-0.5 leading-tight group-hover:text-gray-300 transition-colors duration-300">
          {d.desc}
        </span>
      </div>
    </Link>
  );
}

function DesktopNavItem({ l, loc }: { l: any, loc: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = l.to ? loc.pathname === l.to : l.dropdown?.some((d: any) => loc.pathname === d.to);
  
  if (l.dropdown) {
    return (
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          aria-haspopup="true"
          aria-expanded={isHovered}
          className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
          style={{
            color: active || isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
            background: active || isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
          }}
        >
          {l.label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? 'rotate-180 text-white' : 'text-white/60'}`} />
          {active && (
            <motion.div
              layoutId="nav-pill"
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            />
          )}
        </button>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 15, scale: 0.96, filter: 'blur(8px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-[calc(100%+0.5rem)] ${l.label === 'Services' ? 'left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] p-5' : l.label === 'Servers' ? 'left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] p-5' : 'left-0 min-w-[200px] max-w-[90vw] p-2'} rounded-2xl overflow-hidden`}
              style={{
                background: 'rgba(11, 18, 31, 0.88)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              }}
            >
              {/* Subtle Ambient Glow inside Panel */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[24px]">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,transparent_50%)] animate-[pulse_8s_ease-in-out_infinite]" />
              </div>

              <div className="relative z-10">
                {['Services', 'Servers'].includes(l.label) ? (
                  <div className={`grid gap-3 ${l.label === 'Servers' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {l.dropdown.map((d: any) => (
                      <MegaMenuItem key={d.label} d={d} loc={loc} closeNav={() => setIsHovered(false)} />
                    ))}
                  </div>
                ) : (
                l.dropdown.map((d: any) => (
                  <Link
                    key={d.label}
                    to={d.to}
                    onClick={() => setIsHovered(false)}
                    className="block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
                    style={{
                      color: loc.pathname === d.to ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      background: loc.pathname === d.to ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (loc.pathname !== d.to) {
                        (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (loc.pathname !== d.to) {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.65)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {d.label}
                  </Link>
                ))
              )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={l.to}
      className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 group"
      style={{
        color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
        background: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
          (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.65)';
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }
      }}
    >
      {l.label}
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        />
      )}
    </Link>
  );
}

function MobileNavItem({ l, loc, closeNav }: { l: any, loc: any, closeNav: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const active = l.to ? loc.pathname === l.to : l.dropdown?.some((d: any) => loc.pathname === d.to);

  if (l.dropdown) {
    return (
      <div className="flex flex-col">
        <button
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-5 py-4 min-h-[48px] rounded-xl text-base font-semibold transition-all w-full text-left"
          style={{
            color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
            background: active && !isOpen ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
          }}
        >
          {l.label}
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-white/60'}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex flex-col gap-1 pl-4 mt-1 border-l-2 border-white/10 ml-6"
            >
              {['Services', 'Servers'].includes(l.label) ? (
                l.dropdown.map((d: any) => {
                  return (
                    <Link
                      key={d.label}
                      to={d.to}
                      onClick={closeNav}
                      className={`group relative flex items-center gap-4 px-4 py-3 min-h-[56px] rounded-xl border border-transparent transition-all mt-1 ${d.colorClass}`}
                      style={{
                        background: loc.pathname === d.to ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        borderColor: loc.pathname === d.to ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      }}
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/10">
                        <img src={d.logo} alt={d.label} className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors">
                          {d.label}
                        </span>
                        <span className="text-[11px] text-gray-400 leading-tight">
                          {d.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                l.dropdown.map((d: any) => (
                  <Link
                    key={d.label}
                    to={d.to}
                    onClick={closeNav}
                    className="px-5 py-3 min-h-[48px] flex items-center rounded-lg text-base font-medium transition-all mt-1"
                    style={{
                      color: loc.pathname === d.to ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                      background: loc.pathname === d.to ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    }}
                  >
                    {d.label}
                  </Link>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={l.to}
      onClick={closeNav}
      className="flex items-center px-5 py-4 min-h-[48px] rounded-xl text-base font-semibold transition-all active:scale-[0.98]"
      style={{
        color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
        background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
      }}
    >
      {l.label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const navDelay = isAppLoaded ? 0 : 2.0;

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        rafId = null;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: navDelay }}
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.06)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 8px 30px rgba(0, 0, 0, 0.25)'
            : 'none',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setOpen(false);
              }}
            >
              <img loading="lazy" decoding="async"
                src="/kk-logo-transparent.png"
                className="h-8 sm:h-10 w-auto object-contain relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-105 origin-left"
                alt="KK Tech Solutions"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((l) => (
                <DesktopNavItem key={l.label} l={l} loc={loc} />
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://wa.me/917048214373"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with KK Tech Solutions on WhatsApp"
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 px-3.5 py-2 rounded-full border border-white/10 hover:border-green-500/50 hover:bg-green-500/10"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                +91 70482 14373
              </a>
              <Link to="/contact-us" className="btn-primary py-2 px-5 text-sm">
                Book Free Consultation
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-In Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#0B121F]/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm flex flex-col backdrop-blur-[40px] transform-gpu"
              style={{
                background: 'rgba(11, 18, 31, 0.75)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.9)',
              }}
            >
              {/* Drawer Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <Link 
                  to="/" 
                  className="inline-block cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setOpen(false);
                  }}
                >
                  <img loading="lazy" decoding="async"
                    src="/kk-logo-transparent.png"
                    className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
                    alt="KK Tech"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col px-4 py-4 gap-1.5 flex-1 overflow-y-auto">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <MobileNavItem l={l} loc={loc} closeNav={() => setOpen(false)} />
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div
                className="px-6 pb-8 pt-4 space-y-3 shrink-0"
                style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <Link
                  to="/contact-us"
                  className="btn-primary w-full justify-center text-sm py-3"
                >
                  Book Free Consultation
                </Link>
                <a
                  href="https://wa.me/917048214373"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with KK Tech Solutions on WhatsApp"
                  className="btn-secondary w-full justify-center text-sm py-3 flex items-center gap-2 border-green-500/30 hover:bg-green-500/10"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  +91 70482 14373
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



