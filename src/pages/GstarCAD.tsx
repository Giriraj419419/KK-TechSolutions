/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Building2, Factory, Hammer, Settings, CheckCircle, 
  ChevronDown, ArrowRight, ShieldCheck, HardDrive, Cpu, 
  Building, LayoutTemplate, Box, Server, Smartphone, Monitor,
  Zap, PiggyBank, PenTool, LayoutDashboard, Cloud, Blocks,
  Layers, FileText, Code, Terminal, FastForward, MessageSquare, Printer,
  FileCode2, MonitorSmartphone, Repeat
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';

// =========================================================================
// PREMIUM GSTARCAD CARD ENHANCEMENT (Isolated physics)
// =========================================================================
function GstarCADPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.15)] hover:border-cyan-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(6,182,212,0.08), transparent 60%)`
          )
        }}
      />
      <div className="relative z-10 h-full w-full" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

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
        <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
  { icon: FileCode2, title: 'High DWG Compatibility', desc: 'Flawlessly open, edit, and save DWG/DXF files for seamless collaboration.' },
  { icon: Zap, title: 'Fast Performance', desc: 'Experience superior speeds in file handling, panning, zooming, and processing.' },
  { icon: LayoutDashboard, title: 'Familiar User Interface', desc: 'Zero learning curve with a classic or ribbon interface similar to AutoCAD.' },
  { icon: PiggyBank, title: 'Affordable Licensing', desc: 'Dramatically reduce software costs with budget-friendly permanent or subscription licenses.' },
  { icon: PenTool, title: 'Powerful Drafting Tools', desc: 'Comprehensive 2D and 3D features to fulfill all your design and drafting requirements.' },
  { icon: Server, title: 'Flexible Deployment', desc: 'Choose between standalone or network licenses based on your organizational needs.' },
  { icon: ShieldCheck, title: 'Enterprise Reliability', desc: 'A stable, robust platform trusted by millions of professionals globally.' },
  { icon: MonitorSmartphone, title: 'Cross-Platform Compatibility', desc: 'Work seamlessly across desktop, mobile, and cloud environments.' },
];

const products = [
  { icon: PenTool, title: 'GstarCAD Professional', desc: 'The most comprehensive 2D drafting and 3D modeling CAD software.' },
  { icon: Settings, title: 'GstarCAD Mechanical', desc: 'Specialized CAD software for mechanical design and manufacturing.' },
  { icon: Building2, title: 'GstarCAD Architecture', desc: 'Customized CAD tools for architectural design and drafting.' },
  { icon: Cloud, title: 'GstarCAD Collaboration', desc: 'Cloud-based platform for seamless team collaboration and sharing.' },
  { icon: Smartphone, title: 'GstarCAD Mobile', desc: 'View, edit, and annotate CAD drawings directly on your mobile device.' },
  { icon: Monitor, title: 'GstarCAD Viewer', desc: 'Fast, lightweight viewer to check and print DWG/DXF files for free.' },
];

const features = [
  { icon: PenTool, title: '2D Drafting', desc: 'Create precise and detailed 2D architectural and mechanical layouts quickly.' },
  { icon: Cpu, title: 'Intelligent Design Tools', desc: 'Automate repetitive tasks with smart selection, quick measure, and auto-layering.' },
  { icon: Blocks, title: 'Dynamic Blocks', desc: 'Use dynamic parameters to change the shape and size of blocks interactively.' },
  { icon: Layers, title: 'Layer Management', desc: 'Advanced layer properties manager for organized drawing control.' },
  { icon: FileText, title: 'PDF Import & Export', desc: 'Easily convert PDF geometry, text, and raster images into editable CAD entities.' },
  { icon: Code, title: 'LISP Support', desc: 'Seamlessly migrate and run your existing AutoLISP routines without modification.' },
  { icon: Terminal, title: 'API Customization', desc: 'Extensive support for VBA, .NET, GRX to customize and automate workflows.' },
  { icon: FastForward, title: 'High-Speed Performance', desc: 'Optimized memory handling allows for smooth navigation of massive DWG files.' },
  { icon: MessageSquare, title: 'Smart Annotation', desc: 'Create and edit dimensions, leaders, and text with intelligent scaling.' },
  { icon: Printer, title: 'Batch Printing', desc: 'Print multiple layouts or files at once to save time and improve efficiency.' },
];

const industries = [
  { icon: Building2, name: 'Architecture' },
  { icon: HardDrive, name: 'Engineering' },
  { icon: Hammer, name: 'Construction' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: LayoutTemplate, name: 'Interior Design' },
  { icon: Building, name: 'Infrastructure' },
  { icon: Cpu, name: 'Mechanical Design' },
  { icon: Zap, name: 'Electrical Design' },
  { icon: Box, name: 'Product Development' },
  { icon: Settings, name: 'Industrial Engineering' },
];

const licensingServices = [
  { title: 'Genuine Licensing', desc: 'Procure official, fully compliant GstarCAD software for your business.' },
  { title: 'New License Procurement', desc: 'Get exactly the licenses you need for your growing team.' },
  { title: 'Subscription Management', desc: 'Consolidate multiple licenses into a single manageable account.' },
  { title: 'Enterprise Licensing', desc: 'Scale smoothly with volume and network licensing solutions.' },
  { title: 'License Renewals', desc: 'Effortlessly manage upgrades and subscription renewals on time.' },
  { title: 'Multi-user Licensing', desc: 'Deploy flexible network licenses to maximize software usage across your team.' },
  { title: 'Software Deployment', desc: 'Configure remote or on-premise installations across all offices.' },
  { title: 'Technical Support', desc: 'Get fast, expert troubleshooting directly from certified technicians.' },
];

const migrationBenefits = [
  'Smooth DWG Compatibility',
  'Easy User Transition',
  'Minimal Learning Curve',
  'Lower Licensing Costs',
  'Improved Business ROI',
  'Faster Deployment',
  'Workflow Continuity'
];

const whyUs = [
  'Trusted Software Licensing Partner',
  'Genuine Software Solutions',
  'Enterprise Consultation',
  'Certified Technical Team',
  'Deployment Assistance',
  'Business-Focused Solutions',
  'Dedicated Support',
  'Long-Term Technology Partnership'
];

const faqs = [
  { q: 'What is GstarCAD?', a: 'GstarCAD is a highly compatible, fast, and affordable CAD software used by professionals worldwide for 2D drafting and 3D modeling across various industries.' },
  { q: 'Is GstarCAD compatible with AutoCAD files?', a: 'Yes. GstarCAD offers seamless bi-directional compatibility with DWG and DXF formats, ensuring you can open, edit, and save files natively without data loss.' },
  { q: 'Which GstarCAD version should I choose?', a: 'GstarCAD Professional is ideal for users needing advanced 3D modeling and API support, while the Standard version is perfect for 2D drafting. We provide consultation to help you choose the best fit.' },
  { q: 'Does KK Tech Solutions provide deployment services?', a: 'Yes, we offer comprehensive deployment services. Our technical team can handle remote installations, configure network licensing servers, and ensure seamless integration.' },
  { q: 'Do you offer enterprise licensing?', a: 'Yes. We provide scalable enterprise licensing solutions, including network (floating) licenses, allowing you to maximize software usage while controlling costs.' },
  { q: 'Can you assist with software migration?', a: 'Definitely. We specialize in CAD migrations. Since the interface and commands are highly similar to AutoCAD, the transition is rapid. We also assist with migrating custom LISP routines.' },
  { q: 'Do you provide technical support after purchase?', a: 'Yes, we offer ongoing technical support, training, and maintenance to ensure your team remains productive and your software stays up-to-date.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function GstarCAD() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative min-h-screen bg-[#0B121F] overflow-hidden">
      
      {/* Enhanced Ambient Background with Scroll Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none z-0">
        <CosmosField />
        <GlowingOrbs />
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-36 pb-24 min-h-[90vh] flex items-center">
        <SectionGlow color="teal" position="bottom-right" opacity={0.15} size={700} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Professional CAD Software</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Professional CAD Solutions" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#67E8F9] via-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent font-semibold inline-block">
                    with GstarCAD
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  KK Tech Solutions provides genuine GstarCAD licensing, implementation, deployment, migration, technical consultation, and enterprise support to help businesses achieve professional CAD productivity with cost-effective licensing.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(6,182,212,0.3)] border-[#06B6D4] bg-[#06B6D4] hover:bg-[#0891B2] hover:border-[#0891B2]">
                    Get Authorized Licensing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Animated GstarCAD Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <div className="relative w-full h-full max-w-md mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#06B6D4]/10 blur-xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl premium-glass border border-cyan-500/30 z-20 flex items-center justify-center">
                  <div className="flex items-center justify-center font-bold text-xl tracking-wide text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">GstarCAD</div>
                </div>

                {/* Orbiting Tech Icons */}
                {[
                  { icon: PenTool, label: 'Professional', delay: 0, angle: 0 },
                  { icon: Settings, label: 'Mechanical', delay: 1.5, angle: 60 },
                  { icon: Building2, label: 'Architecture', delay: 3, angle: 120 },
                  { icon: Cloud, label: 'Collaboration', delay: 4.5, angle: 180 },
                  { icon: Smartphone, label: 'Mobile', delay: 6, angle: 240 },
                  { icon: Monitor, label: 'Viewer', delay: 7.5, angle: 300 }
                ].map((item, idx) => {
                  const radius = 160;
                  const radian = (item.angle * Math.PI) / 180;
                  const x = Math.cos(radian) * radius;
                  const y = Math.sin(radian) * radius;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={idx}
                      className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center z-10"
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{ x, y, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 + item.delay * 0.1, ease: 'easeOut' }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: 'easeInOut', delay: item.delay * 0.2 }}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 premium-glass group cursor-default hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#0B121F]/80 px-2 py-0.5 rounded-full">{item.label}</span>
                    </motion.div>
                  );
                })}
                
                {/* Connecting Lines (svg) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" style={{ transform: 'translate(50%, 50%)' }}>
                  <circle cx="0" cy="0" r="160" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE GSTARCAD ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose GstarCAD"
            title="Professional & Affordable CAD"
            sub="Empower your workforce with high-performance drafting tools, enterprise security, and flexible licensing."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <GstarCADPremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[220px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#06B6D4]/10 group-hover:border-[#06B6D4]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-5 h-5 text-[#22D3EE] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-md font-bold text-white mb-2 group-hover:text-[#22D3EE] transition-colors">{f.title}</h3>
                    <p className="text-xs leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </GstarCADPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== GSTARCAD PRODUCTS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Ecosystem"
            title="GstarCAD Products"
            sub="Explore the comprehensive suite of applications for every engineering and architectural need."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6" staggerChildren={0.05}>
            {products.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <GstarCADPremiumCard delayOffset={i * 0.1} className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <s.icon className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </GstarCADPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-right" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Features"
            title="Core CAD Capabilities"
            sub="Empowering designers with an intelligent toolset for comprehensive drafting and modeling."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerChildren={0.05}>
            {features.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <GstarCADPremiumCard delayOffset={i * 0.1} className="p-6 text-left h-full">
                  <f.icon className="w-6 h-6 text-cyan-400 mb-3" />
                  <h4 className="text-sm font-bold text-white mb-2">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </GstarCADPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-left" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="Sectors"
            title="Industry Solutions"
            sub="Tailored CAD workflows designed to boost productivity across engineering, construction, and manufacturing."
          />
          <StaggerContainer className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4" staggerChildren={0.06}>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} direction="up">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group h-32">
                  <ind.icon className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="font-semibold text-xs text-center text-gray-300 group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== GSTARCAD LICENSING & DEPLOYMENT ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Licensing & Deployment Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-4 gap-8 relative z-10" staggerChildren={0.1}>
              {licensingServices.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 mb-4 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 relative z-10">
                      {i + 1}
                    </div>
                    <h4 className="font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== MIGRATION & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="top-right" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Migration to GstarCAD</h3>
              <p className="text-gray-400 mb-6 text-sm">Experience a seamless transition from your legacy CAD platform with minimal disruption to ongoing projects.</p>
              <ul className="space-y-4">
                {migrationBenefits.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors">
                    <Repeat className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300 font-medium text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal direction="right">
              <h3 className="text-3xl font-bold text-white mb-8">Why KK Tech Solutions</h3>
              <p className="text-gray-400 mb-6 text-sm">Your trusted technology partner for enterprise software licensing, deployment, and ongoing support.</p>
              <ul className="space-y-4">
                {whyUs.map((w, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#06B6D4]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#22D3EE] shrink-0" />
                    <span className="text-gray-300 font-medium text-sm">{w}</span>
                  </li>
                ))}
              </ul>
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
        title="Ready to optimize your CAD workflows with GstarCAD?"
        description="Contact KK Tech Solutions for genuine licensing, enterprise deployment, and software implementation."
        primaryButtonText="Request a Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Support Team"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}
