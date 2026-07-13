/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Cloud, ShieldCheck, Server, Database, Globe, ArrowRight, Activity, Cpu,
  Lock, Network, Monitor, CheckCircle, HelpCircle, ChevronDown,
  HeartPulse, Factory, ShoppingCart, GraduationCap, Building2,
  Briefcase, TerminalSquare, BrainCircuit, LayoutGrid, Shield, HardDrive, Settings, CheckSquare, Wrench
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';

const HP_LIGHTS = Array.from({ length: 3 }).map(() => ({
  height: Math.random() * 16 + 4,
  duration: 0.2 + Math.random() * 0.3,
  delay: Math.random()
}));

const HP_PARTICLES = Array.from({ length: 12 }).map(() => ({
  top: `${20 + Math.random() * 60}%`,
  left: `${20 + Math.random() * 60}%`,
  duration: 6 + Math.random() * 4,
  delay: Math.random() * 2
}));

// =========================================================================
// PREMIUM AZURE CARD ENHANCEMENT (Isolated physics for Azure page only)
// =========================================================================
const HPServersPremiumCard = React.memo(function HPServersPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [floatValues] = useState(() => ({
    duration: 5 + Math.random() * 3,
    yOffset: -4 - Math.random() * 4
  }));

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ y: [0, floatValues.yOffset, 0] }}
      transition={{ repeat: Infinity, duration: floatValues.duration, ease: "easeInOut", delay: delayOffset }}
      className={`relative group rounded-2xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-green-500/30 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(500px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(34,197,94,0.06), transparent 50%)`
          )
        }}
      />
      <div className="relative z-10 h-full w-full" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
});

// =========================================================================
// FAQ ACCORDION COMPONENT
// =========================================================================
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:bg-white/[0.04]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-green-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 

// =========================================================================
// DATA ARRAYS
// =========================================================================
const reasons = [
  { icon: CheckSquare, title: 'High Reliability', desc: 'Engineered for maximum uptime and continuous enterprise operations.' },
  { icon: Monitor, title: 'Intelligent Management', desc: 'Advanced remote management capabilities with HPE iLO.' },
  { icon: Server, title: 'Flexible Deployment', desc: 'Versatile configurations suitable for edge to cloud environments.' },
  { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Silicon root of trust protecting servers from firmware attacks.' },
  { icon: Cloud, title: 'Hybrid Cloud Ready', desc: 'Seamlessly bridge your on-premises infrastructure with the cloud.' },
  { icon: Globe, title: 'Remote Management', desc: 'Complete server control from anywhere in the world.' }
];

const solutions = [
  { icon: Server, title: 'New HPE Server Sales', desc: 'Premium enterprise servers tailored to your workload requirements.' },
  { icon: Server, title: 'Refurbished HPE Servers', desc: 'Cost-effective, certified refurbished enterprise infrastructure.' },
  { icon: Settings, title: 'Installation & Configuration', desc: 'Expert deployment and OS configuration services.' },
  { icon: ShieldCheck, title: 'Annual Maintenance Contracts (AMC)', desc: 'Comprehensive SLA-backed support contracts.' },
  { icon: Activity, title: 'On-site Technical Support', desc: 'Rapid field engineer deployment for hardware issues.' },
  { icon: Globe, title: 'Remote Technical Support', desc: 'Fast, secure remote troubleshooting and resolution.' },
  { icon: Cpu, title: 'Server Upgrades', desc: 'RAM, Storage, and Processor performance enhancements.' },
  { icon: HardDrive, title: 'Genuine HPE Spare Parts', desc: 'Authentic replacement components for maximum reliability.' },
  { icon: Database, title: 'Data Migration Services', desc: 'Seamless, secure data transition with zero downtime.' },
  { icon: Network, title: 'Rack Installation & Networking', desc: 'Complete physical infrastructure and switch setup.' },
  { icon: Lock, title: 'Warranty Assistance', desc: 'Extended warranty and hardware protection services.' },
  { icon: HelpCircle, title: '24Ã—7 Enterprise Helpdesk', desc: 'Always-on enterprise-grade technical assistance.' },
  { icon: CheckSquare, title: 'Preventive Maintenance Visits', desc: 'Proactive infrastructure health checks.' },
  { icon: Briefcase, title: 'Enterprise Infrastructure Consultation', desc: 'Strategic IT planning and architecture design.' }
];

const industries = [
  { icon: TerminalSquare, name: 'IT & Software' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: HeartPulse, name: 'Healthcare' },
  { icon: Building2, name: 'Banking & Finance' },
  { icon: GraduationCap, name: 'Education' },
  { icon: Globe, name: 'Government' },
  { icon: ShoppingCart, name: 'Retail' },
  { icon: Wrench, name: 'Engineering' },
  { icon: LayoutGrid, name: 'Construction' },
  { icon: Database, name: 'Data Centers' }
];

const migrationSteps = [
  { title: 'Consultation', desc: 'Understand workload requirements, business goals, scalability, and infrastructure planning.' },
  { title: 'Configuration & Proposal', desc: 'Recommend the ideal HPE ProLiant configuration with transparent pricing and enterprise consultation.' },
  { title: 'Delivery & Deployment', desc: 'Source, install, configure, and deploy servers on-site or remotely with professional implementation.' },
  { title: 'Testing & Handover', desc: 'Perform diagnostics, optimize performance, validate infrastructure, and provide complete documentation.' },
  { title: 'AMC & Long-Term Support', desc: 'Provide warranty coordination, preventive maintenance, upgrades, monitoring, and responsive technical assistance.' }
];

const whyUs = [
  'Authorized Technology Partner', 'Genuine Enterprise Hardware', 'Certified Technical Engineers', 'End-to-End Deployment', 'Annual Maintenance Contracts', 'Rapid Technical Support', 'Flexible Upgrade Options', 'Long-Term Partnership'
];

const faqs = [
  { q: 'Which server brand is best for my business?', a: 'The ideal brand depends on your specific workload, budget, and existing infrastructure. We provide tailored recommendations during our free consultation.' },
  { q: 'Do you supply new and refurbished servers?', a: 'Yes, we supply both brand-new and certified refurbished enterprise servers to accommodate different budget requirements.' },
  { q: 'Do you provide installation and migration services?', a: 'Absolutely. Our certified engineers handle everything from physical rack installation to OS configuration and data migration.' },
  { q: 'Can you upgrade existing servers?', a: 'Yes, we provide genuine spare parts and perform RAM, storage, and CPU upgrades for existing server infrastructure.' },
  { q: 'Is AMC available?', a: 'We offer comprehensive Annual Maintenance Contracts (AMC) to ensure your servers operate at peak performance with minimized downtime.' },
  { q: 'Do you provide on-site support?', a: 'Yes, our rapid response technical team provides on-site support for hardware troubleshooting and maintenance.' },
  { q: 'Can you help select the right server configuration?', a: 'Our enterprise specialists will assess your application workloads and business goals to design the perfect server specification.' }
];

// =========================================================================
// MAIN PAGE
// =========================================================================
// =========================================================================
// PREMIUM HP HERO ANIMATION COMPONENT
// =========================================================================
function HPHeroAnimation() {
  const [isBooting, setIsBooting] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [activeModule, setActiveModule] = useState<number>(0);

  useEffect(() => {
    // 2.5 second cinematic boot sequence
    const timer = setTimeout(() => {
      setIsBooting(false);
      setIsReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Infrastructure Synchronization Engine
  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + Math.floor(Math.random() * 2) + 1) % 3);
    }, 3000); // Shift active connection every 3s
    return () => clearTimeout(interval);
  }, [isReady]);

  // 3D Hover mechanics for the central server
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const modules = [
    { brand: 'hewlettpackardenterprise', fallbackIcon: Server, label: 'ProLiant DL', angle: 0 },
    { brand: 'hewlettpackardenterprise', fallbackIcon: Database, label: 'ProLiant ML', angle: 120 },
    { brand: 'hewlettpackardenterprise', fallbackIcon: LayoutGrid, label: 'Synergy', angle: 240 }
  ];

  const radiusPercent = 38; // 38% of container width/height

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto z-10" style={{ perspective: '1000px' }}>

      {/* 1. Intelligent Network Grid Activation */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* SVG Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 197, 94, 0.05)" strokeWidth="1" />
                </pattern>
                <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#hpGrid)" mask="url(#gridMask)" />
              <mask id="gridMask">
                <rect width="100%" height="100%" fill="url(#gridFade)" />
              </mask>
            </svg>

            {/* Ambient Holographic Dots */}
            {HP_PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full blur-[1px]"
                style={{
                  top: particle.top,
                  left: particle.left,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Enterprise Signal Waves & Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="-50 -50 100 100">

        {/* Signal Waves */}
        {isReady && (
          <motion.circle
            cx="0" cy="0" r="0"
            stroke="#22C55E" strokeWidth="0.3" fill="none"
            initial={{ r: 0, opacity: 0.8 }}
            animate={{ r: 60, opacity: 0 }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
          />
        )}

        {/* Connections */}
        {modules.map((item, idx) => {
          const radian = (item.angle * Math.PI) / 180;
          const xPos = Math.cos(radian) * radiusPercent;
          const yPos = Math.sin(radian) * radiusPercent;
          const isActive = idx === activeModule;

          return (
            <g key={`connection-${idx}`}>
              {/* Static Line */}
              <motion.line
                x1="0" y1="0" x2={xPos} y2={yPos}
                stroke={isActive ? "url(#hpActivePulse)" : "rgba(34, 197, 94, 0.15)"}
                strokeWidth={isActive ? "0.4" : "0.2"}
                strokeDasharray="1 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isReady ? 1 : 0, opacity: isReady ? 1 : 0 }}
                transition={{ duration: 1.5, delay: isBooting ? 0 : 0.2 + idx * 0.1 }}
              />

              {/* Data Transmission Pulse */}
              {isReady && isActive && (
                <motion.circle
                  r="0.8" fill="#22C55E"
                  initial={{ cx: 0, cy: 0, opacity: 0 }}
                  animate={{
                    cx: [0, xPos, 0],
                    cy: [0, yPos, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ filter: 'drop-shadow(0 0 1.5px rgba(34, 197, 94, 0.8))' }}
                />
              )}
            </g>
          );
        })}

        <defs>
          <linearGradient id="hpActivePulse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3. Floating Enterprise Modules */}
      {modules.map((item, idx) => {
        const radian = (item.angle * Math.PI) / 180;
        const xPos = Math.cos(radian) * radiusPercent;
        const yPos = Math.sin(radian) * radiusPercent;
        const isActive = idx === activeModule;

        return (
          <motion.div
            key={`module-${idx}`}
            className="absolute pointer-events-auto z-10"
            initial={{ left: "50%", top: "50%", opacity: 0 }}
            animate={{
              left: isReady ? `calc(50% + ${xPos}%)` : "50%",
              top: isReady ? `calc(50% + ${yPos}%)` : "50%",
              opacity: isReady ? 1 : 0
            }}
            transition={{ duration: 1.2, delay: isBooting ? 0 : 0.2 + idx * 0.1, type: "spring", stiffness: 60, damping: 15 }}
          >
            <div className="absolute flex flex-col items-center justify-center w-max" style={{ transform: 'translate(-50%, -50%)' }}>
              <motion.div
                animate={isReady ? { y: [0, -4 - (idx % 3), 0], scale: isActive ? [1, 1.1, 1] : [1, 1.02, 1] } : {}}
                transition={{
                  y: { repeat: Infinity, duration: 4 + (idx % 3), ease: 'easeInOut', delay: idx * 0.2 },
                  scale: { repeat: Infinity, duration: isActive ? 1.5 : 3 + (idx % 2), ease: 'easeInOut' }
                }}
                className={`p-3 rounded-xl border premium-glass group transition-all shadow-lg backdrop-blur-md cursor-default
                  ${isActive
                    ? 'bg-green-500/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'bg-[#0B121F]/80 border-white/10 hover:border-green-500/30 hover:bg-green-500/5'
                  }`}
              >
                <BrandLogo iconName={item.brand} fallbackIcon={item.fallbackIcon} className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300
                  ${isActive
                    ? 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]'
                    : 'text-gray-400 group-hover:text-green-300'
                  }`}
                />
              </motion.div>
              <span className={`mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm whitespace-nowrap transition-colors duration-300
                ${isActive
                  ? 'bg-green-500/20 border-green-500/30 text-green-300'
                  : 'bg-[#0B121F]/90 border-white/10 text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* 4. Enterprise Infrastructure Core (Center HP Server) */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <motion.div
          animate={isBooting ? { scale: [0.9, 1], opacity: [0, 1] } : { y: [0, -4, 0] }}
          transition={isBooting ? { duration: 1.2, ease: "easeOut" } : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative group p-7 rounded-3xl premium-glass border border-green-500/30 bg-[#0B121F]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(34,197,94,0.3)] hover:border-green-400/60 cursor-pointer"
        >
          {/* Glass Reflection */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
            style={{
              background: useTransform(
                () => `radial-gradient(200px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(34,197,94,0.15), transparent 60%)`
              )
            }}
          />

          {/* Central Green Ambient Glow */}
          <motion.div
            animate={{ opacity: isReady ? 1 : 0.1, scale: isReady ? [1, 1.1, 1] : 0.8 }}
            transition={{ opacity: { duration: 1.5 }, scale: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-green-500/15 blur-xl"
          >
            {/* Soft Fog Glow & Midground Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-tr from-green-500/10 to-transparent blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-green-500/15 blur-[60px] pointer-events-none mix-blend-screen" />
          </motion.div>

          <BrandLogo iconName="hewlettpackardenterprise" className={`w-16 h-16 sm:w-20 sm:h-20 relative z-10 transition-colors duration-300 ${isReady ? 'text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'text-gray-600'}`} color="01a982" style={{ transform: 'translateZ(25px)' }} />

          {/* Live Status Indicators */}
          <div className="absolute top-4 right-4 flex gap-1.5 z-10" style={{ transform: 'translateZ(30px)' }}>
            <motion.div
              animate={isBooting ? { opacity: [0, 1, 0] } : { opacity: [1, 0.4, 1] }}
              transition={isBooting ? { duration: 0.15, repeat: Infinity } : { duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-gray-500'}`}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isReady ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"
            />
          </div>

          {/* Activity Lights */}
          <div className="absolute bottom-5 right-5 flex gap-1 z-10" style={{ transform: 'translateZ(30px)' }}>
            {HP_LIGHTS.map((light, i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-500 rounded-sm"
                style={{ filter: 'drop-shadow(0 0 5px rgba(34, 197, 94, 0.8))', height: '12px' }}
                animate={isReady ? { height: [12, light.height, 12] } : { opacity: 0 }}
                transition={{ duration: light.duration, repeat: Infinity, repeatType: "mirror", delay: light.delay }}
              />
            ))}
          </div>

        </motion.div>
      </motion.div>

    </div>
  );
}


export default function HPServers() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative min-h-screen bg-[#0B121F] overflow-hidden">

      {/* Premium Enterprise Background with Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none z-0">
        <CosmosField />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: "url('/images/backgrounds/hp_hero_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'auto',
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 bg-[#22C55E]/10 mix-blend-overlay" />
        </motion.div>

        {/* Readability Gradients & Vignette Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B121F_100%)] opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B121F] via-[#0B121F]/90 to-transparent w-full md:w-[60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B121F] via-transparent to-[#0B121F]/30" />
        <div className="absolute inset-0 bg-[#0B121F]/10 mix-blend-multiply" />
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-36 pb-24 min-h-[90vh] flex items-center">
        <SectionGlow color="green" position="bottom-right" opacity={0.15} size={700} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Enterprise Server Solutions</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Innovate Faster with" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#0078D4] via-[#2B88D8] to-[#00BCF2] bg-clip-text text-transparent font-semibold inline-block">
                    HP (HPE ProLiant)
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed mt-6 max-w-xl">
                  Build, manage, and scale applications on a trusted, global enterprise platform. Accelerate your digital transformation with our certified HPE experts.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(0,120,212,0.3)] border-[#0078D4] bg-[#0078D4] hover:bg-[#005A9E] hover:border-[#005A9E]">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Azure Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column - HP Hero Animation */}
            <Reveal direction='left' delay={0.12} className='relative z-10 flex justify-center items-center w-full min-h-[500px]'>
              <HPHeroAnimation />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FLOATING SPECIFICATIONS BANNER ===== */}
      <section className="relative z-20 -mt-12 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" delay={0.3}>
            <div className="rounded-2xl border border-green-500/20 bg-black/40 backdrop-blur-xl p-4 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.15)] flex flex-wrap justify-center gap-3">
              {[
                { label: 'INTEL XEON PROCESSORS', icon: Cpu },
                { label: 'AMD EPYC COMPATIBILITY', icon: Cpu },
                { label: 'UP TO 4TB MEMORY', icon: Database },
                { label: 'NVMe SSD STORAGE', icon: HardDrive },
                { label: 'RACK / TOWER / BLADE', icon: Server },
                { label: 'HYBRID CLOUD READY', icon: Cloud },
                { label: 'ENTERPRISE SECURITY', icon: Shield },
                { label: 'HIGH AVAILABILITY', icon: CheckCircle },
                { label: 'VIRTUALIZATION READY', icon: Monitor },
                { label: 'iLO REMOTE MANAGEMENT', icon: Globe }
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 cursor-default">
                  <chip.icon className="w-4 h-4 text-green-500" />
                  <span className="text-[11px] font-semibold text-gray-200 tracking-wider uppercase">{chip.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ENTERPRISE METRICS BAR ===== */}
      <section className="relative z-10 py-10 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerChildren={0.05}>
            {[
              { label: '24/7 Support', val: 'Technical Helpdesk', icon: HelpCircle },
              { label: 'Certified', val: 'Infrastructure Engineers', icon: Briefcase },
              { label: 'Genuine', val: 'HPE Hardware', icon: ShieldCheck },
              { label: 'AMC Available', val: 'For All Servers', icon: Settings }
            ].map((stat, i) => (
              <StaggerItem key={i} direction="scale">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-green-500/10 hover:border-green-500/20 transition-all duration-300 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors">{stat.label}</div>
                    <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase mt-0.5">{stat.val}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== WHY CHOOSE THIS SERVER PLATFORM ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose This Server Platform"
            title="The Enterprise Standard"
            sub="Discover why 95% of Fortune 500 companies trust HP (HPE ProLiant) for their business-critical applications."
          />
          <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerChildren={0.1}>
            {reasons.map((b, i) => (
              <StaggerItem key={b.title} direction="up" className="h-full">
                <HPServersPremiumCard delayOffset={i * 0.15} className="p-8 h-full min-h-[300px] flex flex-col relative overflow-hidden group/card shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                  {/* Subtle Hover Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full items-start">
                    <motion.div
                      className="flex items-center justify-center mb-6 w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover/card:bg-green-500/15 group-hover/card:border-green-500/40 group-hover/card:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-300 group-hover/card:-translate-y-1"
                    >
                      <b.icon className="w-6 h-6 text-green-500 group-hover/card:scale-110 transition-transform duration-300" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white/95 group-hover/card:text-green-400 transition-colors duration-300 mb-3 tracking-wide">
                      {b.title}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-gray-400 group-hover/card:text-gray-300 transition-colors duration-300 flex-1">
                      {b.desc}
                    </p>
                  </div>
                </HPServersPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== ENTERPRISE FORM FACTORS (COMPARISON) ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <SectionGlow color="green" position="top-right" opacity={0.05} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Form Factors"
            title="Enterprise Architecture Portfolio"
            sub="Choose the ideal HPE ProLiant form factor for your specific workload, spatial, and scalability requirements."
          />
          <StaggerContainer className="mt-16 grid lg:grid-cols-3 gap-8" staggerChildren={0.1}>

            {/* RACK */}
            <StaggerItem direction="up">
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-green-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-1 border border-white/10 group-hover:bg-green-500/20 transition-colors">
                    <div className="w-6 h-1.5 bg-green-400 rounded-sm" />
                    <div className="w-6 h-1.5 bg-green-400 rounded-sm" />
                    <div className="w-6 h-1.5 bg-green-400/50 rounded-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">DL Series</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Rack Servers</h3>
                <p className="text-sm text-gray-400 mb-8 flex-1">High-density computing for data centers. Ideal for virtualization, databases, and high-performance workloads.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Density</span>
                    <span className="text-white font-medium">Extremely High</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Scalability</span>
                    <span className="text-white font-medium">Vertical (Rack-level)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Best For</span>
                    <span className="text-white font-medium">Data Centers</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* TOWER */}
            <StaggerItem direction="up">
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-green-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-end justify-center pb-2 border border-white/10 group-hover:bg-green-500/20 transition-colors">
                    <div className="w-5 h-8 bg-green-400 rounded-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">ML Series</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Tower Servers</h3>
                <p className="text-sm text-gray-400 mb-8 flex-1">Standalone servers requiring no rack infrastructure. Perfect for remote offices and growing small businesses.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Density</span>
                    <span className="text-white font-medium">Low to Medium</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Scalability</span>
                    <span className="text-white font-medium">Internal Expansion</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Best For</span>
                    <span className="text-white font-medium">Branch Offices</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* BLADE */}
            <StaggerItem direction="up">
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-green-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center gap-0.5 border border-white/10 group-hover:bg-green-500/20 transition-colors px-2">
                    <div className="flex-1 h-6 bg-green-400 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-green-400 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-green-400/50 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-green-400/30 rounded-[2px]" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">Synergy</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Blade Systems</h3>
                <p className="text-sm text-gray-400 mb-8 flex-1">Modular infrastructure sharing power and cooling. Designed for extreme density and rapid provisioning.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Density</span>
                    <span className="text-white font-medium">Ultra High</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Scalability</span>
                    <span className="text-white font-medium">Modular Enclosure</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Best For</span>
                    <span className="text-white font-medium">Enterprise Core</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* ===== AZURE SOLUTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Our Services"
            title="HPE Solutions Matrix"
            sub="Comprehensive enterprise solutions designed to modernize and scale your operations."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerChildren={0.05}>
            {solutions.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <HPServersPremiumCard delayOffset={i * 0.1} className="p-6 h-full flex flex-col items-start text-left group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <s.icon className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </HPServersPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-right" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Sectors"
            title="Industries We Serve"
            sub="Tailored cloud architectures supporting the compliance and scale requirements of major industries."
          />
          <StaggerContainer className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" staggerChildren={0.06}>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} direction="up">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-green-500/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group h-32">
                  <ind.icon className="w-8 h-8 text-gray-400 group-hover:text-green-400 transition-colors" />
                  <span className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== MIGRATION PROCESS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Our Implementation Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            {/* Connecting Line (Vertical) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-green-500/30 to-transparent -translate-x-1/2 hidden lg:block" />

            <StaggerContainer className="flex flex-col gap-12 relative z-10 max-w-4xl mx-auto" staggerChildren={0.1}>
              {migrationSteps.map((step, i) => (
                <StaggerItem key={step.title} direction={i % 2 === 0 ? "right" : "left"}>
                  <div className={`flex flex-col lg:flex-row items-center gap-8 group cursor-default relative ${i % 2 !== 0 ? 'lg:flex-row-reverse lg:text-right' : 'text-left'}`}>

                    {/* Left Spacer for alignment */}
                    <div className="hidden lg:block flex-1" />

                    {/* Center Icon */}
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0B121F] border border-white/10 flex items-center justify-center font-bold text-gray-400 group-hover:border-green-500/50 group-hover:text-green-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-all duration-300 relative z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center">
                        {i === 0 && <Activity className="w-6 h-6" />}
                        {i === 1 && <Settings className="w-6 h-6" />}
                        {i === 2 && <Server className="w-6 h-6" />}
                        {i === 3 && <CheckCircle className="w-6 h-6" />}
                        {i === 4 && <ShieldCheck className="w-6 h-6" />}
                      </span>
                      <div className="absolute top-1 left-2 text-[9px] opacity-40">{i + 1}</div>
                    </div>

                    {/* Right/Left Content Card */}
                    <div className="flex-1 w-full lg:w-auto p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-green-500/5 group-hover:border-green-500/20 transition-all duration-300 text-center lg:text-left">
                      <h4 className={`font-bold text-white mb-2 text-lg group-hover:text-green-400 transition-colors ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>{step.title}</h4>
                      <p className={`text-sm text-gray-400 leading-relaxed ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>{step.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="top-left" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE: Content */}
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Business Benefits</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Industry-leading performance for business-critical workloads",
                  "Silicon root of trust for ultimate firmware protection",
                  "Advanced HPE iLO for seamless remote management",
                  "Energy-efficient designs to lower operational costs",
                  "Flexible configurations for diverse IT environments",
                  "Comprehensive warranty and enterprise-grade support"
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-green-500/5 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT SIDE: Dashboard Mockup / Badges */}
          <div className="relative mt-12 lg:mt-0">
            <Reveal direction="right">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/10 rounded-full blur-[100px] -z-10" />
              <div className="p-8 rounded-3xl border border-white/10 bg-[#0B121F]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0" />

                <div className="grid grid-cols-2 gap-4">
                  {whyUs.map((w, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 cursor-default">
                      <ShieldCheck className="w-6 h-6 text-green-400" />
                      <span className="text-sm font-semibold text-gray-200">{w}</span>
                    </div>
                  ))}
                </div>

                {/* Floating verification badge */}
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#0078D4] border border-blue-400 shadow-[0_10px_30px_rgba(0,120,212,0.4)] flex items-center gap-4 rotate-[-5deg] hover:rotate-0 transition-transform duration-300 cursor-default">
                  <Shield className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-white font-bold text-lg leading-tight">Certified</div>
                    <div className="text-blue-100 text-xs uppercase tracking-wider font-semibold">HPE Partner</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} direction="up" delay={i * 0.05}>
                <FAQItem question={faq.q} answer={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA
        title="Ready to Transform Your Business with HP (HPE ProLiant)?"
        description="Partner with KK Tech Solutions to build a secure, scalable, and future-ready cloud infrastructure."
        primaryButtonText="Schedule a Free Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Azure Specialists"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}





