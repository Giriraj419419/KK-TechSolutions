/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Building2, Factory, MonitorPlay, Hammer, Box, Lightbulb, 
  Settings, CheckCircle, ChevronDown, RefreshCcw,
  CloudCog, DownloadCloud, Users, ArrowRight, ShieldCheck, HardDrive, Building, LayoutTemplate, Briefcase, Ruler, Compass
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

// =========================================================================
// PREMIUM AUTODESK CARD ENHANCEMENT (Isolated physics for Autodesk page only)
// =========================================================================
const AutodeskPremiumCard = React.memo(function AutodeskPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.15)] hover:border-teal-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(20,184,166,0.08), transparent 60%)`
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
        <ChevronDown className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
  { icon: ShieldCheck, title: 'Genuine Licensing', desc: 'Secure, compliant, and authentic Autodesk software licenses for your entire enterprise.' },
  { icon: RefreshCcw, title: 'Subscription Management', desc: 'Seamlessly manage renewals and upgrades to ensure zero downtime in your workflows.' },
  { icon: Users, title: 'User & License Management', desc: 'Easily assign and track user access, optimizing your software utilization and investment.' },
  { icon: CloudCog, title: 'Deployment & Configuration', desc: 'Expert assistance for rapid, reliable remote deployments across all your office locations.' },
  { icon: DownloadCloud, title: 'Software Migration', desc: 'Transition smoothly to newer versions or cloud-based collections with minimal disruption.' },
  { icon: Settings, title: 'Technical Support', desc: 'Get dedicated assistance for installation, troubleshooting, and system integration.' },
];

const products = [
  { icon: Compass, title: 'AutoCAD', desc: 'Precision 2D and 3D drafting for architects, engineers, and construction professionals.' },
  { icon: Building2, title: 'Revit', desc: 'Comprehensive BIM software for higher-quality, coordinated building designs.' },
  { icon: Factory, title: 'Inventor', desc: 'Professional-grade 3D CAD software for mechanical design and engineering.' },
  { icon: Box, title: 'Fusion', desc: 'Cloud-based CAD, CAM, CAE, and PCB software for integrated product design.' },
  { icon: Ruler, title: 'Civil 3D', desc: 'Civil engineering design software supporting BIM workflows and documentation.' },
  { icon: LayoutTemplate, title: 'Navisworks', desc: 'Project review software to improve BIM coordination and integrate 3D models.' },
  { icon: MonitorPlay, title: 'Maya', desc: 'Powerful 3D animation, modeling, and simulation tools for visual effects.' },
  { icon: Lightbulb, title: '3ds Max', desc: 'Advanced 3D modeling and rendering software for design visualization.' },
  { icon: Factory, title: 'PD&M Collection', desc: 'Product Design & Manufacturing Collection Commercial Single-user Annual Subscription Renewal.' },
  { icon: Building2, title: 'AEC Collection', desc: 'Architecture Engineering & Construction Collection IC Commercial New Single-user ELD Annual Subscription.' },
];

const industries = [
  { icon: Building2, name: 'Architecture' },
  { icon: HardDrive, name: 'Engineering' },
  { icon: Hammer, name: 'Construction' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Box, name: 'Product Design' },
  { icon: Building, name: 'Infrastructure' },
  { icon: MonitorPlay, name: 'Media & Entertainment' },
  { icon: Briefcase, name: 'Consulting' },
];

const serviceSteps = [
  { title: 'Consultation', desc: 'Analyzing your software requirements.' },
  { title: 'Licensing', desc: 'Procuring optimal genuine licenses.' },
  { title: 'Deployment', desc: 'Configuring network or remote installs.' },
  { title: 'Migration', desc: 'Upgrading and transitioning users.' },
  { title: 'Management', desc: 'Tracking usage and active assignments.' },
  { title: 'Support', desc: 'Providing ongoing technical assistance.' },
];

const collections = [
  'Architecture, Engineering & Construction Collection',
  'Product Design & Manufacturing Collection',
  'Media & Entertainment Collection',
  'Enterprise License Agreements',
  'Volume Licensing Solutions',
  'Specialized Toolsets'
];

const whyUs = [
  'Genuine Licensing Experts', 'End-to-End Implementation', 'Dedicated Technical Support', 
  'Remote Deployment Mastery', 'Customized Consultation', 'Seamless Renewals'
];

const faqs = [
  { q: 'What are Autodesk Industry Collections?', a: 'Autodesk Industry Collections provide access to a comprehensive suite of the most essential Autodesk software for your industry (such as AEC, Product Design, or Media) in one package, offering significant value and flexibility.' },
  { q: 'Do you offer assistance with software deployment?', a: 'Yes. We provide complete deployment and configuration services, including remote installation, user assignment, and network environment setups to ensure your team is productive from day one.' },
  { q: 'How do you handle license renewals?', a: 'We manage the entire subscription lifecycle. Our team monitors your renewal dates, advises on the most cost-effective strategies, and handles the transaction to prevent any disruption to your business.' },
  { q: 'Can you help us migrate to newer versions of Autodesk software?', a: 'Absolutely. We offer software migration services to smoothly transition your enterprise to the latest releases or cloud-based platforms while preserving your critical design data.' },
  { q: 'What kind of technical support do you provide?', a: 'We offer dedicated technical support focused on installation, configuration, licensing issues, and deployment troubleshooting to ensure your Autodesk environment runs optimally.' },
  { q: 'Can you assist with volume or enterprise licensing?', a: 'Yes, we specialize in helping businesses structure and procure volume licensing and enterprise agreements to scale cost-effectively across multiple teams and locations.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function Autodesk() {
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
                <Eyebrow>Enterprise Design Software</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Design & Create with" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#14B8A6] via-[#0D9488] to-[#0F766E] bg-clip-text text-transparent font-semibold inline-block">
                    Autodesk Solutions
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Equip your enterprise with genuine Autodesk licenses, expert deployment, and comprehensive subscription management for uninterrupted design workflows.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(20,184,166,0.3)] border-[#0D9488] bg-[#0D9488] hover:bg-[#0F766E] hover:border-[#0F766E]">
                    Get Authorized Licensing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Animated Autodesk Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <AnimatedEcosystem 
                centerBrand="autodesk"
                centerColor="00a89d"
                themeColorHex="#14B8A6"
                nodes={[
                  { brand: 'autocad', fallbackIcon: Compass, label: 'AutoCAD' },
                  { brand: 'autodeskrevit', fallbackIcon: Building2, label: 'Revit' },
                  { brand: 'autodesk', fallbackIcon: Factory, label: 'Inventor' },
                  { brand: 'autodesk', fallbackIcon: Ruler, label: 'Civil 3D' },
                  { brand: 'autodesk', fallbackIcon: Box, label: 'Fusion 360' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE AUTODESK SOLUTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose Autodesk Solutions"
            title="Enterprise Licensing & Management"
            sub="Discover how we streamline your design operations with genuine software and expert deployment."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <AutodeskPremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[240px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#0D9488]/10 group-hover:border-[#0D9488]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-6 h-6 text-[#14B8A6] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#14B8A6] transition-colors">{f.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </AutodeskPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== AUTODESK PRODUCTS & COLLECTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Products"
            title="Autodesk Products & Collections"
            sub="Industry-leading tools for design, engineering, and manufacturing."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerChildren={0.05}>
            {products.map((s, i) => (
              <StaggerItem key={s.title} direction="scale" className={i >= 8 ? 'lg:col-span-2' : ''}>
                <AutodeskPremiumCard delayOffset={i * 0.1} className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <s.icon className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </AutodeskPremiumCard>
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
            title="Industry Focus"
            sub="Delivering specialized Autodesk solutions customized for the unique requirements of your sector."
          />
          <StaggerContainer className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" staggerChildren={0.06}>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} direction="up">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-teal-500/10 hover:border-teal-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group h-32">
                  <ind.icon className="w-8 h-8 text-gray-400 group-hover:text-teal-400 transition-colors" />
                  <span className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== DEPLOYMENT & MANAGEMENT PROCESS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Deployment & Management Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-6 gap-6 relative z-10" staggerChildren={0.1}>
              {serviceSteps.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-teal-500/30 flex items-center justify-center font-bold text-teal-400 mb-4 group-hover:border-teal-400 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all duration-300 relative z-10">
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

      {/* ===== COLLECTIONS & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="top-left" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Autodesk Collections & Licensing</h3>
              <ul className="space-y-4">
                {collections.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-teal-500/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
                    <span className="text-gray-300 font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal direction="right">
              <h3 className="text-3xl font-bold text-white mb-8">Why KK Tech Solutions</h3>
              <ul className="space-y-4">
                {whyUs.map((w, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#0D9488]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#14B8A6] shrink-0" />
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
        title="Ready to optimize your Autodesk Licensing & Deployment?"
        description="Partner with KK Tech Solutions for end-to-end software procurement, installation, and subscription management."
        primaryButtonText="Request a Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Support Team"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}





