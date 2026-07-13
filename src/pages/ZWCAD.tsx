/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Building2, Factory, Hammer, LayoutTemplate, CheckCircle, ChevronDown, ArrowRight, HardDrive, Cpu, 
  Building, FileCode2, LayoutDashboard, Zap, 
  PenTool, Box, Layers, AppWindow, 
  Code, Repeat, Cloud, Globe, Settings
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

// =========================================================================
// PREMIUM ZWCAD CARD ENHANCEMENT (Isolated physics)
// =========================================================================
const ZWCADPremiumCard = React.memo(function ZWCADPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)] hover:border-blue-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(59,130,246,0.08), transparent 60%)`
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
  { icon: FileCode2, title: 'High DWG Compatibility', desc: 'Seamlessly read, write, and save DWG/DXF files with zero data loss or conversion issues.' },
  { icon: LayoutDashboard, title: 'Familiar Interface', desc: 'Enjoy an AutoCAD-like interface with familiar commands and aliases, eliminating learning curves.' },
  { icon: Zap, title: 'Fast Performance', desc: 'Experience lightning-fast opening and processing speeds, even for large and complex drawings.' },
];
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';

const industries = [
  { icon: Building2, name: 'Architecture' },
  { icon: HardDrive, name: 'Engineering' },
  { icon: Hammer, name: 'Construction' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Cpu, name: 'Mechanical Design' },
  { icon: Zap, name: 'Electrical Design' },
  { icon: LayoutTemplate, name: 'Interior Design' },
  { icon: Building, name: 'Infrastructure' },
];

const licensingServices = [
  { title: 'Genuine Licensing', desc: 'Procure official, fully compliant ZWCAD software for your business.' },
  { title: 'License Renewals', desc: 'Effortlessly manage upgrades and subscription renewals on time.' },
  { title: 'Enterprise Setup', desc: 'Scale smoothly with volume and network (multi-user) licensing.' },
  { title: 'Software Deployment', desc: 'Configure remote or on-premise installations across all offices.' },
  { title: 'Technical Assistance', desc: 'Get fast, expert troubleshooting directly from certified technicians.' },
  { title: 'Migration Support', desc: 'Seamlessly transition legacy files and settings to ZWCAD.' },
];

const migrationBenefits = [
  '100% DWG/DXF Compatibility',
  'Familiar Classic & Ribbon Interfaces',
  'Zero Retraining Required',
  'Lower Total Cost of Ownership',
  'Preserve Existing LISP Scripts',
  'Business Continuity Guaranteed'
];

const whyUs = [
  'Authorized Technology Partner',
  'End-to-End Deployment Services',
  'Experienced Technical Team',
  'Enterprise License Management',
  'Customized Business Consultation',
  'Long-Term Technology Partnership'
];

const faqs = [
  { q: 'What is ZWCAD?', a: 'ZWCAD is a powerful, reliable, and DWG-compatible CAD solution developed by ZWSOFT for worldwide users in the MCAD and AEC industries. It provides highly efficient 2D drafting and 3D modeling capabilities.' },
  { q: 'Is ZWCAD compatible with AutoCAD?', a: 'Yes. ZWCAD offers seamless DWG compatibility. You can open, edit, and save DWG/DXF files directly without any data loss or conversion, making collaboration with AutoCAD users effortless.' },
  { q: 'Can existing DWG files be opened in ZWCAD?', a: 'Absolutely. ZWCAD natively reads and writes DWG files from version R14 up to the latest formats, ensuring you can access all your legacy drawings.' },
  { q: 'Does KK Tech Solutions provide deployment services for ZWCAD?', a: 'Yes, we offer comprehensive deployment services. Our technical team can handle remote installations, configure network licensing servers, and ensure ZWCAD is perfectly integrated into your IT environment.' },
  { q: 'Do you offer enterprise licensing for ZWCAD?', a: 'Yes. We provide scalable enterprise licensing solutions, including both standalone and network (floating) licenses, allowing you to maximize software usage while controlling costs.' },
  { q: 'Can you help us migrate from AutoCAD to ZWCAD?', a: 'Definitely. We specialize in AutoCAD-to-ZWCAD migrations. Since the interface and commands are highly similar, the transition is rapid. We also assist with migrating custom LISP routines, tool palettes, and plot styles to ensure business continuity.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function ZWCAD() {
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
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={700} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Professional CAD Software</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Draft & Design with" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent font-semibold inline-block">
                    ZWCAD Solutions
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Equip your business with a powerful, DWG-compatible, and highly cost-effective CAD solution. Expertly deployed and managed by our enterprise technical team.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(59,130,246,0.3)] border-[#3B82F6] bg-[#3B82F6] hover:bg-[#2563EB] hover:border-[#2563EB]">
                    Get Authorized Licensing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Animated ZWCAD Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center items-center w-full min-h-[500px]">
              <AnimatedEcosystem 
                centerBrand="zwcad"
                centerColor="3B82F6"
                themeColorHex="#3B82F6"
                customCenterSvg={<svg viewBox="0 0 40 40" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] fill-blue-400"><path d="M10,10 L30,10 L10,30 L30,30" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                nodes={[
                  { brand: 'zwcad', fallbackIcon: Building2, label: 'Architecture' },
                  { brand: 'zwcad', fallbackIcon: Settings, label: 'Mechanical' },
                  { brand: 'zwcad', fallbackIcon: Factory, label: 'MFG' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ZWCAD ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose ZWCAD"
            title="The Smart CAD Alternative"
            sub="Discover the high-performance, cost-effective CAD software that businesses trust worldwide."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <ZWCADPremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[240px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#3B82F6]/10 group-hover:border-[#3B82F6]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-6 h-6 text-[#60A5FA] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#60A5FA] transition-colors">{f.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </ZWCADPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== ZWCAD FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Features"
            title="ZWCAD Core Capabilities"
            sub="Empowering designers with a rich toolset for comprehensive 2D drafting and 3D modeling."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerChildren={0.05}>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {reasons.map((feature, i) => (
              <StaggerItem key={feature.title} direction="scale">
                <ZWCADPremiumCard className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                </ZWCADPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="bottom-right" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Sectors"
            title="Industry Solutions"
            sub="Tailored CAD workflows designed to boost productivity across engineering, construction, and manufacturing."
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

      {/* ===== ZWCAD LICENSING & DEPLOYMENT ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Licensing & Deployment Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-6 gap-6 relative z-10" staggerChildren={0.1}>
              {licensingServices.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-blue-500/30 flex items-center justify-center font-bold text-blue-400 mb-4 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 relative z-10">
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

      {/* ===== AUTOCAD MIGRATION & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">AutoCAD Migration Benefits</h3>
              <p className="text-gray-400 mb-6 text-sm">Experience a seamless transition from AutoCAD with minimal disruption to your ongoing projects.</p>
              <ul className="space-y-4">
                {migrationBenefits.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                    <Repeat className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-gray-300 font-medium">{c}</span>
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
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#3B82F6]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#60A5FA] shrink-0" />
                    <span className="text-gray-300 font-medium">{w}</span>
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
        title="Ready to optimize your CAD workflows with ZWCAD?"
        description="Contact KK Tech Solutions for genuine licensing, seamless migration, and enterprise deployment support."
        primaryButtonText="Request a Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Support Team"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}





