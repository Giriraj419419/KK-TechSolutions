/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Cloud, ShieldCheck, Server, Database, Globe, ArrowRight, Activity, Cpu, 
  Lock, Network, CheckCircle, HelpCircle, ChevronDown, 
  HeartPulse, Factory, ShoppingCart, GraduationCap, Building2,
  Briefcase, TerminalSquare, BrainCircuit, LayoutGrid, Zap, Shield, HardDrive, Settings, CheckSquare, Wrench
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

const DELL_PARTICLES = Array.from({ length: 6 }).map(() => ({
  x: (Math.random() - 0.5) * 40,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 3
}));

// =========================================================================
// PREMIUM AZURE CARD ENHANCEMENT (Isolated physics for Azure page only)
// =========================================================================
const DellServersPremiumCard = React.memo(function DellServersPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,120,212,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-[#0078D4]/30 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(500px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,120,212,0.06), transparent 50%)`
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
        <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
  { icon: Activity, title: 'Enterprise Performance', desc: 'Handle the most demanding workloads with exceptional compute power.' },
  { icon: BrainCircuit, title: 'Intelligent Automation', desc: 'Streamline IT management with automated server lifecycle tasks.' },
  { icon: LayoutGrid, title: 'Scalable Infrastructure', desc: 'Easily expand your resources as your business requirements grow.' },
  { icon: Zap, title: 'Energy Efficient', desc: 'Optimize data center cooling and lower your overall power consumption.' },
  { icon: Shield, title: 'Advanced Security', desc: 'Built-in cyber-resilient architecture protecting data from the core.' },
  { icon: Server, title: 'AI & Virtualization', desc: 'Optimized architectures for dense virtualization and AI inference.' }
];

const solutions = [
  { icon: Server, title: 'Sales â€“ New & Refurbished Dell PowerEdge Servers', desc: 'Premium enterprise servers.' },
  { icon: ShieldCheck, title: 'Annual Maintenance Contract (AMC)', desc: 'Comprehensive support contracts.' },
  { icon: Settings, title: 'Installation & Configuration', desc: 'Expert deployment services.' },
  { icon: Activity, title: 'On-site & Remote Technical Support', desc: 'Rapid technical assistance.' },
  { icon: Cpu, title: 'Server Upgrades (RAM, HDD/SSD/NVMe, Processor)', desc: 'Performance enhancements.' },
  { icon: HardDrive, title: 'Genuine Dell Spare Parts', desc: 'Authentic brand components.' },
  { icon: Database, title: 'Data Migration Services', desc: 'Seamless data transition.' },
  { icon: Network, title: 'Server Rack Installation & Networking Setup', desc: 'Complete infrastructure setup.' },
  { icon: Lock, title: 'Warranty Assistance & Extended Warranty', desc: 'Long-term hardware protection.' },
  { icon: HelpCircle, title: '24Ã—7 Helpdesk Support', desc: 'Always-on enterprise assistance.' },
  { icon: CheckSquare, title: 'AMC Renewal & Preventive Maintenance Visits', desc: 'Proactive infrastructure care.' },
  { icon: Briefcase, title: 'Enterprise Server Consultation', desc: 'Strategic infrastructure planning.' }
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
  { title: 'Consultation', desc: 'Understand the client\'s workload, business applications, virtualization requirements, scalability goals, budget, and infrastructure needs to recommend the ideal Dell PowerEdge solution.' },
  { title: 'Quotation & Configuration', desc: 'Design a customized Dell PowerEdge server configuration based on processor, memory, storage, RAID, networking, and performance requirements, then provide a transparent quotation.' },
  { title: 'Delivery & Installation', desc: 'Source, quality-test, deliver, rack, install, configure, and deploy the Dell PowerEdge server either on-site or remotely, ensuring a smooth implementation.' },
  { title: 'Testing & Handover', desc: 'Perform complete diagnostics, validate hardware performance, configure networking, conduct system testing, provide documentation, and complete customer handover with operational guidance.' },
  { title: 'Ongoing Support & AMC', desc: 'Deliver long-term support through warranty coordination, AMC renewals, preventive maintenance, firmware updates, health monitoring, upgrades, and responsive 24Ã—7 technical assistance.' }
];

const whyUs = [
  'Genuine Dell PowerEdge Hardware', 'New & Refurbished Enterprise Servers', 'Certified Technical Engineers', 'Customized Server Configurations', 'Fast Deployment & Installation', 'Enterprise AMC Programs', 'Nationwide Technical Support', 'Long-Term Technology Partnership'
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

// REMOVED Custom Hero Animation in favor of AnimatedEcosystem

// MAIN PAGE
// =========================================================================
export default function DellServers() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative min-h-[auto] lg:min-h-[75vh] bg-[#0B121F] overflow-hidden">
      
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
              backgroundImage: "url('/images/backgrounds/dell_hero_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'auto',
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 bg-[#0078D4]/10 mix-blend-overlay" />
        </motion.div>
        
        {/* Readability Gradients & Vignette Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B121F_100%)] opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B121F] via-[#0B121F]/90 to-transparent w-full md:w-[60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B121F] via-transparent to-[#0B121F]/30" />
        <div className="absolute inset-0 bg-[#0B121F]/10 mix-blend-multiply" />
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-28 pb-12 min-h-[auto] lg:min-h-[75vh] flex items-center">
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={700} />
        
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
                    Dell PowerEdge
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-sm leading-relaxed mt-6 max-w-2xl">
                  Dell PowerEdge Servers deliver enterprise-grade infrastructure designed for businesses of every size. Partner with KK Tech Solutions for genuine new and refurbished hardware, customized configurations, and end-to-end deployment backed by comprehensive warranty and AMC support.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(0,120,212,0.3)] border-[#0078D4] bg-[#0078D4] hover:bg-[#005A9E] hover:border-[#005A9E]">
                    Request a Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Book a Free Consultation
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Premium Animated Hero Illustration */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center items-center w-full min-min-h-[350px] lg:min-h-[450px] h-auto">
              <AnimatedEcosystem 
                centerBrand="dell"
                centerColor="007db8"
                themeColorHex="#0078D4"
                customCenterSvg={<img src="/dell.svg" alt="Dell Logo" className="w-full h-full object-contain drop-shadow-xl" />}
                nodes={[
                  { fallbackIcon: Server, label: 'Compute' },
                  { fallbackIcon: HardDrive, label: 'Storage' },
                  { fallbackIcon: Network, label: 'Networking' },
                  { fallbackIcon: ShieldCheck, label: 'Security' },
                  { fallbackIcon: LayoutGrid, label: 'Virtualization' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FLOATING SPECIFICATIONS BANNER ===== */}
      <section className="relative z-20 -mt-12 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" delay={0.3}>
            <div className="rounded-2xl border border-blue-500/20 bg-black/40 backdrop-blur-xl p-4 shadow-[0_10px_40px_-10px_rgba(0,120,212,0.15)] flex flex-wrap justify-center gap-3">
              {[
                { label: 'INTEL XEON PROCESSORS', icon: Cpu },
                { label: 'AMD EPYC COMPATIBILITY', icon: Cpu },
                { label: 'VIRTUALIZATION READY', icon: Database },
                { label: 'AI INFRASTRUCTURE', icon: BrainCircuit },
                { label: 'RACK / TOWER / BLADE', icon: Server },
                { label: 'HYBRID CLOUD', icon: Cloud },
                { label: 'ENTERPRISE SECURITY', icon: Shield },
                { label: 'HIGH AVAILABILITY', icon: CheckCircle },
                { label: 'DELL OPENMANAGE', icon: Settings },
                { label: 'NVMe STORAGE', icon: HardDrive }
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 cursor-default">
                  <chip.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-[11px] font-semibold text-gray-200 tracking-wider uppercase">{chip.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY CHOOSE DELL POWEREDGE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose This Server Platform"
            title="The Enterprise Standard"
            sub="Discover why 95% of Fortune 500 companies trust Dell PowerEdge for their business-critical applications."
          />
          <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerChildren={0.1}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up" className="h-full">
                <DellServersPremiumCard delayOffset={i * 0.15} className="p-8 h-full min-h-[300px] flex flex-col relative overflow-hidden group/card shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                  {/* Subtle Hover Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0078D4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full items-start">
                    <motion.div 
                      className="flex items-center justify-center mb-6 w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover/card:bg-[#0078D4]/15 group-hover/card:border-[#0078D4]/40 group-hover/card:shadow-[0_0_20px_rgba(0,120,212,0.25)] transition-all duration-300 group-hover/card:-translate-y-1"
                    >
                      <f.icon className="w-6 h-6 text-[#0078D4] group-hover/card:scale-110 transition-transform duration-300" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white/95 group-hover/card:text-[#0078D4] transition-colors duration-300 mb-3 tracking-wide">
                      {f.title}
                    </h3>
                    
                    <p className="text-[15px] leading-relaxed text-gray-400 group-hover/card:text-gray-300 transition-colors duration-300 flex-1">
                      {f.desc}
                    </p>
                  </div>
                </DellServersPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== ENTERPRISE FORM FACTORS (COMPARISON) ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <SectionGlow color="blue" position="top-right" opacity={0.05} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Form Factors"
            title="Enterprise Architecture Portfolio"
            sub="Choose the ideal Dell PowerEdge form factor for your specific workload, spatial, and scalability requirements."
          />
          <StaggerContainer className="mt-16 grid lg:grid-cols-3 gap-8" staggerChildren={0.1}>
            
            {/* RACK */}
            <StaggerItem direction="up">
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-1 border border-white/10 group-hover:bg-blue-500/20 transition-colors">
                    <div className="w-6 h-1.5 bg-blue-400 rounded-sm" />
                    <div className="w-6 h-1.5 bg-blue-400 rounded-sm" />
                    <div className="w-6 h-1.5 bg-blue-400/50 rounded-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">Rack</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Rack Servers</h3>
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
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-end justify-center pb-2 border border-white/10 group-hover:bg-blue-500/20 transition-colors">
                    <div className="w-5 h-8 bg-blue-400 rounded-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">Tower</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Tower Servers</h3>
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
              <div className="rounded-3xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center gap-0.5 border border-white/10 group-hover:bg-blue-500/20 transition-colors px-2">
                    <div className="flex-1 h-6 bg-blue-400 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-blue-400 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-blue-400/50 rounded-[2px]" />
                    <div className="flex-1 h-6 bg-blue-400/30 rounded-[2px]" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">Blade</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Blade Servers</h3>
                <p className="text-sm text-gray-400 mb-8 flex-1">Ultra-dense modular infrastructure. Perfect for virtualization environments, sharing power and cooling.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Density</span>
                    <span className="text-white font-medium">Ultra High</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-500">Management</span>
                    <span className="text-white font-medium">Centralized Enclosure</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Best For</span>
                    <span className="text-white font-medium">Enterprise Clouds</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* ===== SERVER SOLUTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Our Services"
            title="Dell PowerEdge Solutions"
            sub="Comprehensive Dell PowerEdge services designed to deploy, modernize, and scale your infrastructure."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerChildren={0.05}>
            {solutions.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <DellServersPremiumCard delayOffset={i * 0.1} className="p-6 h-full flex flex-col items-start text-left group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#0078D4]/20 group-hover:border-[#0078D4]/40 transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <s.icon className="w-6 h-6 text-[#0078D4] group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#0078D4] transition-colors">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </DellServersPremiumCard>
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
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group h-32">
                  <ind.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
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
            {/* Connecting Line (Vertical) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#0078D4]/50 to-transparent -translate-x-1/2 hidden lg:block" />
            
            <StaggerContainer className="flex flex-col gap-12 relative z-10 max-w-4xl mx-auto" staggerChildren={0.1}>
              {migrationSteps.map((step, i) => (
                <StaggerItem key={step.title} direction={i % 2 === 0 ? "right" : "left"}>
                  <div className={`flex flex-col lg:flex-row items-center gap-8 group cursor-default relative ${i % 2 !== 0 ? 'lg:flex-row-reverse lg:text-right' : 'text-left'}`}>
                    
                    {/* Left Spacer for alignment */}
                    <div className="hidden lg:block flex-1" />
                    
                    {/* Center Icon */}
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0B121F] border border-white/10 flex items-center justify-center font-bold text-gray-400 group-hover:border-[#0078D4]/50 group-hover:text-[#0078D4] group-hover:shadow-[0_0_20px_rgba(0,120,212,0.3)] group-hover:scale-110 transition-all duration-300 relative z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-[#0078D4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    <div className="flex-1 w-full lg:w-auto p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-[#0078D4]/5 group-hover:border-[#0078D4]/20 transition-all duration-300 text-center lg:text-left">
                      <h4 className={`font-bold text-white mb-2 text-lg group-hover:text-[#0078D4] transition-colors ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>{step.title}</h4>
                      <p className={`text-sm text-gray-400 leading-relaxed ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>{step.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== ENTERPRISE TRUST DASHBOARD ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <SectionGlow color="blue" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Narrative content */}
            <div>
              <Reveal direction="right">
                <SectionTitle 
                  eyebrow="Trusted Partner"
                  title="Why KK Tech Solutions"
                  sub="Delivering authentic Dell PowerEdge hardware with enterprise-grade deployment and ongoing support."
                />
                <div className="mt-8 space-y-6">
                  {whyUs.slice(0, 5).map((w, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{w}</h4>
                        <p className="text-sm text-gray-400">Ensuring highest quality standards and compliance for your business infrastructure.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Dashboard Mockup */}
            <Reveal direction="left" delay={0.2} className="relative h-[600px] hidden lg:block">
              <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/[0.01] overflow-hidden premium-glass flex items-center justify-center p-8">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] min-h-[350px] lg:min-h-[450px] h-auto bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                
                <div className="relative z-10 w-full max-w-md space-y-6">
                  {/* Status Card 1 */}
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="p-6 rounded-2xl bg-[#0B121F]/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Genuine Hardware</div>
                      <div className="text-xs text-gray-400">100% Authentic Dell Parts</div>
                    </div>
                  </motion.div>

                  {/* Status Card 2 */}
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="p-6 rounded-2xl bg-[#0B121F]/80 backdrop-blur-md border border-[#0078D4]/20 shadow-[0_0_30px_rgba(0,120,212,0.15)] flex items-center gap-4 ml-8">
                    <div className="w-12 h-12 rounded-full bg-[#0078D4]/20 flex items-center justify-center border border-[#0078D4]/30">
                      <Settings className="w-6 h-6 text-[#0078D4]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Certified Engineers</div>
                      <div className="text-xs text-gray-400">Dell Enterprise Specialists</div>
                    </div>
                  </motion.div>

                  {/* Status Card 3 */}
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }} className="p-6 rounded-2xl bg-[#0B121F]/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <HardDrive className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Nationwide AMC</div>
                      <div className="text-xs text-gray-400">24/7 Technical Support Available</div>
                    </div>
                  </motion.div>
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
        title="Ready to Transform Your Business with Dell PowerEdge?"
        description="Partner with KK Tech Solutions to build a secure, scalable, and future-ready cloud infrastructure."
        primaryButtonText="Request a Server Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Talk to a Server Specialist"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}





