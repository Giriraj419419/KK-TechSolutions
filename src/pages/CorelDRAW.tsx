/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Building2, Factory, CheckCircle, 
  ChevronDown, ArrowRight, ShieldCheck, Cpu, 
  Building, LayoutTemplate, Server, PenTool, FileText, Printer, MonitorSmartphone, Repeat, Image, Type, Users, Globe, Camera,
  Sparkles, Compass, Palette, Layout, Download, Brush, Megaphone, Presentation,
  GraduationCap, Store, UserCheck
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';

// =========================================================================
// PREMIUM CORELDRAW CARD ENHANCEMENT (Isolated physics)
// =========================================================================
function CorelPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.15)] hover:border-green-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(34,197,94,0.08), transparent 60%)`
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
  { icon: PenTool, title: 'Professional Vector Illustration', desc: 'Create intricate designs, logos, and vector graphics with powerful drawing tools.' },
  { icon: LayoutTemplate, title: 'Advanced Page Layout', desc: 'Design brochures, multi-page documents, and layouts with unmatched precision.' },
  { icon: Image, title: 'Powerful Photo Editing', desc: 'Retouch and enhance photos with layer-based editing in Corel PHOTO-PAINT.' },
  { icon: Type, title: 'Complete Typography Tools', desc: 'Manage and utilize flawless typography with advanced font management tools.' },
  { icon: ShieldCheck, title: 'Flexible Licensing', desc: 'Choose from subscriptions or perpetual enterprise licensing options.' },
  { icon: MonitorSmartphone, title: 'Cross-Platform Productivity', desc: 'Work seamlessly across Windows, Mac, iPad, web, and mobile devices.' },
  { icon: Users, title: 'Business Collaboration', desc: 'Streamline team feedback and approval processes securely in the cloud.' },
  { icon: Server, title: 'Enterprise Reliability', desc: 'Robust performance and deployment options tailored for enterprise environments.' },
];

const products = [
  { icon: PenTool, title: 'CorelDRAW', desc: 'The core vector illustration and page layout application.' },
  { icon: Image, title: 'Corel PHOTO-PAINT', desc: 'Image editing and pixel-based design program.' },
  { icon: Type, title: 'Corel Font Manager', desc: 'Font exploration and management tool.' },
  { icon: Globe, title: 'CorelDRAW Web', desc: 'Browser-based vector illustration and graphic design.' },
  { icon: Camera, title: 'Corel CAPTURE', desc: 'One-click screen capture utility.' },
  { icon: Sparkles, title: 'Corel Vector', desc: 'Cloud-based vector graphics editor.' },
];

const features = [
  { icon: PenTool, title: 'Vector Illustration', desc: 'Turn basic lines and shapes into complex works of art.' },
  { icon: Compass, title: 'Logo Design', desc: 'Create memorable brand identities and logos with precision tools.' },
  { icon: Palette, title: 'Branding & Identity Design', desc: 'Ensure brand consistency across all marketing assets.' },
  { icon: Image, title: 'Image Editing', desc: 'Adjust color, remove imperfections, and create composite images.' },
  { icon: Layout, title: 'Multi-Page Layout', desc: 'Easily manage multi-page documents and complex layouts.' },
  { icon: Type, title: 'Typography & Font Management', desc: 'Access comprehensive text handling and font organization capabilities.' },
  { icon: Printer, title: 'Print & Prepress Tools', desc: 'Prepare documents for flawless commercial printing output.' },
  { icon: Cpu, title: 'AI-Assisted Design', desc: 'Accelerate your workflow with machine-learning-powered tools.' },
  { icon: FileText, title: 'PDF Publishing', desc: 'Create secure and universally compatible PDF documents.' },
  { icon: Download, title: 'Professional Export Options', desc: 'Export in a variety of industry-standard file formats.' },
];

const industries = [
  { icon: Brush, name: 'Graphic Design Studios' },
  { icon: Printer, name: 'Printing & Publishing' },
  { icon: Megaphone, name: 'Marketing Agencies' },
  { icon: Presentation, name: 'Advertising Companies' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Building2, name: 'Architecture' },
  { icon: GraduationCap, name: 'Education' },
  { icon: Building, name: 'Corporate Enterprises' },
  { icon: Store, name: 'Small & Medium Businesses' },
  { icon: UserCheck, name: 'Creative Professionals' },
];

const licensingServices = [
  { title: 'Genuine Licensing', desc: 'Procure official, fully compliant Corel software for your business.' },
  { title: 'Enterprise Licensing', desc: 'Scale smoothly with volume licensing solutions for growing teams.' },
  { title: 'New License Procurement', desc: 'Get exactly the licenses you need for your creative workforce.' },
  { title: 'Subscription Management', desc: 'Consolidate multiple licenses into a single manageable account.' },
  { title: 'License Renewals', desc: 'Effortlessly manage upgrades and subscription renewals on time.' },
  { title: 'Software Deployment', desc: 'Configure remote or on-premise installations across all offices.' },
  { title: 'Multi-user Management', desc: 'Deploy flexible network licenses to maximize software usage across your team.' },
  { title: 'Technical Support', desc: 'Get fast, expert troubleshooting directly from certified technicians.' },
];

const creativeWorkflows = [
  'Professional Branding',
  'Marketing Material Design',
  'Packaging Design',
  'Illustration & Artwork',
  'Print Production',
  'Digital Publishing',
  'Team Collaboration',
  'Business Productivity'
];

const whyUs = [
  'Trusted Software Licensing Partner',
  'Genuine Software Solutions',
  'Enterprise Consultation',
  'Certified Technical Experts',
  'Fast License Delivery',
  'End-to-End Deployment',
  'Dedicated Technical Support',
  'Long-Term Technology Partnership'
];

const faqs = [
  { q: 'What is CorelDRAW Graphics Suite?', a: 'CorelDRAW Graphics Suite is a comprehensive software collection for vector illustration, layout, photo editing, and typography, used by professionals worldwide.' },
  { q: 'Which CorelDRAW plan is suitable for my business?', a: 'We offer various plans including subscriptions and enterprise licenses. We provide consultation to help you choose the best fit based on your team size and requirements.' },
  { q: 'Do you provide enterprise licensing?', a: 'Yes. We provide scalable enterprise licensing solutions, allowing you to maximize software usage while controlling costs across large teams.' },
  { q: 'Can KK Tech Solutions help with installation?', a: 'Yes, we offer comprehensive deployment services. Our technical team can handle remote installations and ensure seamless integration into your systems.' },
  { q: 'Do you offer deployment and technical support?', a: 'Definitely. We specialize in software deployments and offer ongoing technical support to ensure your team remains productive.' },
  { q: 'Can you manage software renewals?', a: 'Yes, we handle all aspects of subscription management and renewals so you never experience an interruption in service.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function CorelDRAW() {
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
        <SectionGlow color="green" position="bottom-right" opacity={0.15} size={700} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Professional Design Solutions</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Professional Graphic Design" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#86EFAC] via-[#22C55E] to-[#16A34A] bg-clip-text text-transparent font-semibold inline-block">
                    with CorelDRAW
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  KK Tech Solutions provides genuine CorelDRAW licensing, deployment, subscription management, enterprise consultation, installation, and technical support to help businesses create professional graphics, branding, marketing materials, and digital content.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(34,197,94,0.3)] border-[#22C55E] bg-[#22C55E] hover:bg-[#16A34A] hover:border-[#16A34A]">
                    Get Authorized Licensing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Animated Corel Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <div className="relative w-full h-full max-w-md mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#22C55E]/10 blur-xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl premium-glass border border-green-500/30 z-20 flex items-center justify-center">
                  <div className="flex items-center justify-center font-bold text-xl tracking-wide text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">CorelDRAW</div>
                </div>

                {/* Orbiting Tech Icons */}
                {[
                  { icon: PenTool, label: 'CorelDRAW', delay: 0, angle: 0 },
                  { icon: Image, label: 'PHOTO-PAINT', delay: 1.5, angle: 60 },
                  { icon: Type, label: 'Font Manager', delay: 3, angle: 120 },
                  { icon: Globe, label: 'Web', delay: 4.5, angle: 180 },
                  { icon: Camera, label: 'CAPTURE', delay: 6, angle: 240 },
                  { icon: Sparkles, label: 'Vector', delay: 7.5, angle: 300 }
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
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 premium-glass group cursor-default hover:border-green-500/40 hover:bg-green-500/10 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#0B121F]/80 px-2 py-0.5 rounded-full">{item.label}</span>
                    </motion.div>
                  );
                })}
                
                {/* Connecting Lines (svg) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" style={{ transform: 'translate(50%, 50%)' }}>
                  <circle cx="0" cy="0" r="160" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE CORELDRAW ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose CorelDRAW"
            title="Comprehensive Creative Solutions"
            sub="Empower your creative workforce with high-performance design tools and enterprise reliability."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <CorelPremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[220px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#22C55E]/10 group-hover:border-[#22C55E]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-5 h-5 text-[#4ADE80] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-md font-bold text-white mb-2 group-hover:text-[#4ADE80] transition-colors">{f.title}</h3>
                    <p className="text-xs leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </CorelPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CORELDRAW PRODUCTS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Ecosystem"
            title="CorelDRAW Products"
            sub="Explore the comprehensive suite of applications for every creative requirement."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6" staggerChildren={0.05}>
            {products.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <CorelPremiumCard delayOffset={i * 0.1} className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <s.icon className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </CorelPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="bottom-right" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Features"
            title="Core Creative Capabilities"
            sub="Empowering designers with an intelligent toolset for comprehensive illustration and layout."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerChildren={0.05}>
            {features.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <CorelPremiumCard delayOffset={i * 0.1} className="p-6 text-left h-full">
                  <f.icon className="w-6 h-6 text-green-400 mb-3" />
                  <h4 className="text-sm font-bold text-white mb-2">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </CorelPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="bottom-left" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="Sectors"
            title="Business & Industry Solutions"
            sub="Tailored graphic workflows designed to boost productivity across creative and corporate environments."
          />
          <StaggerContainer className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4" staggerChildren={0.06}>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} direction="up">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group h-32">
                  <ind.icon className="w-8 h-8 text-gray-400 group-hover:text-green-400 transition-colors" />
                  <span className="font-semibold text-xs text-center text-gray-300 group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CORELDRAW LICENSING & DEPLOYMENT ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Licensing & Deployment Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-4 gap-8 relative z-10" staggerChildren={0.1}>
              {licensingServices.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-green-500/30 flex items-center justify-center font-bold text-green-400 mb-4 group-hover:border-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 relative z-10">
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

      {/* ===== CREATIVE WORKFLOWS & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="green" position="top-right" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Creative Workflow Solutions</h3>
              <p className="text-gray-400 mb-6 text-sm">Experience a seamless creative transition and enhance your professional workflows with CorelDRAW.</p>
              <ul className="space-y-4">
                {creativeWorkflows.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/20 transition-colors">
                    <Repeat className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-300 font-medium text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal direction="right">
              <h3 className="text-3xl font-bold text-white mb-8">Why Choose KK Tech Solutions</h3>
              <p className="text-gray-400 mb-6 text-sm">Your trusted technology partner for enterprise software licensing, deployment, and ongoing support.</p>
              <ul className="space-y-4">
                {whyUs.map((w, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#22C55E]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#4ADE80] shrink-0" />
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
        title="Ready to optimize your creative workflows with CorelDRAW?"
        description="Contact KK Tech Solutions for genuine licensing, enterprise deployment, and software implementation."
        primaryButtonText="Request a Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Support Team"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}
