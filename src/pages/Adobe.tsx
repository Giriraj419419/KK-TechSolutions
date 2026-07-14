/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Building2, Factory, CheckCircle, ChevronDown, ArrowRight, ShieldCheck, HardDrive, Cpu, 
  Building, 
  Palette, PenTool, LayoutTemplate, Layers, PlaySquare, Video,
  Type, Monitor, Smartphone, Film, Layout, CheckCircle2, Rocket, Shield, Server,
  Cloud, Globe, Settings, Sparkles, Users, BookOpen, FileText, MonitorSmartphone, FolderOpen, PenLine, FileSignature, Share2, Image, Lock
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

// =========================================================================
// PREMIUM ADOBE CARD ENHANCEMENT (Isolated physics)
// =========================================================================
const AdobePremiumCard = React.memo(function AdobePremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.15)] hover:border-red-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(239,68,68,0.08), transparent 60%)`
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
        <ChevronDown className={`w-5 h-5 text-red-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
  { icon: Sparkles, title: 'Industry-leading Creative Applications', desc: 'Equip your team with the gold standard in design, video, and web software.' },
  { icon: Cloud, title: 'Cloud-Based Collaboration', desc: 'Seamlessly collaborate across teams with shared libraries and cloud documents.' },
  { icon: Lock, title: 'Enterprise Security', desc: 'Protect your creative assets with advanced enterprise-grade security controls.' },
  { icon: Users, title: 'Seamless Team Management', desc: 'Easily manage users, permissions, and billing from a centralized Admin Console.' },
  { icon: ShieldCheck, title: 'Genuine Licensing', desc: 'Ensure 100% compliance with official Adobe licenses tailored for your business.' },
  { icon: Cpu, title: 'AI-Powered Creative Tools', desc: 'Leverage Adobe Sensei AI to automate workflows and accelerate content creation.' },
];

const products = [
  { icon: Image, title: 'Photoshop', desc: 'The industry standard for image editing and compositing.' },
  { icon: PenTool, title: 'Illustrator', desc: 'Create beautiful vector art and illustrations for any scale.' },
  { icon: Video, title: 'Premiere Pro', desc: 'Professional video editing for film, TV, and the web.' },
  { icon: PlaySquare, title: 'After Effects', desc: 'Cinematic visual effects and motion graphics.' },
  { icon: BookOpen, title: 'InDesign', desc: 'Page design and layout for print and digital publishing.' },
  { icon: FileText, title: 'Acrobat Pro', desc: 'The complete PDF solution for working anywhere.' },
  { icon: Image, title: 'Lightroom', desc: 'Cloud-based photo service with powerful editing capabilities.' },
  { icon: MonitorSmartphone, title: 'XD', desc: 'Design, prototype, and share user experiences.' },
  { icon: Sparkles, title: 'Adobe Express', desc: 'Quickly create standout graphics, flyers, logos, and more.' },
  { icon: Cloud, title: 'Creative Cloud', desc: 'Access the entire collection of 20+ creative apps and services.' },
];

const ccForBusiness = [
  { icon: Monitor, title: 'Centralized License Management', desc: 'Manage all software deployments from a single web-based console.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Streamline feedback and reviews with integrated collaboration tools.' },
  { icon: FolderOpen, title: 'Shared Libraries', desc: 'Ensure brand consistency with shared assets and templates across teams.' },
  { icon: Cloud, title: 'Cloud Storage', desc: '1TB of cloud storage per user to sync, share, and collaborate securely.' },
];

const acrobatSolutions = [
  { icon: PenLine, title: 'PDF Editing', desc: 'Edit text and images directly within your PDF documents seamlessly.' },
  { icon: FileSignature, title: 'eSign', desc: 'Request and track secure electronic signatures in real time.' },
  { icon: Share2, title: 'Secure Document Sharing', desc: 'Share documents with advanced tracking, password protection, and controls.' },
  { icon: Layers, title: 'Digital Workflows', desc: 'Transform manual paper processes into fast, digital document workflows.' },
];

const industries = [
  { icon: MonitorSmartphone, name: 'Marketing Agencies' },
  { icon: Video, name: 'Media & Entertainment' },
  { icon: BookOpen, name: 'Education' },
  { icon: Building2, name: 'Corporate Enterprises' },
  { icon: PenTool, name: 'Design Studios' },
  { icon: Building, name: 'Architecture' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: HardDrive, name: 'IT Companies' },
];

const licensingServices = [
  { title: 'Genuine Adobe Licensing', desc: 'Procure official, fully compliant software for your business.' },
  { title: 'New License Procurement', desc: 'Get exactly the apps you need for your growing team.' },
  { title: 'Subscription Management', desc: 'Consolidate multiple subscriptions into a single manageable account.' },
  { title: 'Enterprise Licensing', desc: 'Scale smoothly with volume licensing tailored for large organizations.' },
  { title: 'License Renewals', desc: 'Effortlessly manage upgrades and subscription renewals on time.' },
  { title: 'Deployment & Installation', desc: 'Configure remote or on-premise installations across all offices.' },
];

const whyUs = [
  'Trusted Adobe Licensing Partner',
  'Genuine Software',
  'Expert Consultation',
  'Deployment Assistance',
  'Enterprise Support',
  'Fast License Delivery',
  'Business-Focused Solutions',
  'Dedicated Technical Assistance'
];

const faqs = [
  { q: 'What is Adobe Creative Cloud?', a: 'Adobe Creative Cloud is a collection of 20+ desktop and mobile apps and services for photography, design, video, web, UX, and more. It empowers creatives with the tools they need to bring their ideas to life.' },
  { q: 'Which Adobe plan is right for my business?', a: 'Depending on your team size and requirements, you can choose between individual app subscriptions or the All Apps plan. We provide consultation to help you find the most cost-effective and productive solution.' },
  { q: 'Do you provide enterprise licensing?', a: 'Yes. We offer Adobe Creative Cloud for Enterprise, which provides advanced security, single sign-on (SSO), centralized administration, and dedicated enterprise support.' },
  { q: 'Can you migrate our existing Adobe subscriptions?', a: 'Absolutely. We can consolidate and migrate your existing scattered licenses into a centralized team or enterprise account for easier management and better pricing.' },
  { q: 'Do you assist with deployment?', a: 'Yes, we provide end-to-end deployment assistance, ensuring the software is correctly installed, configured, and integrated into your organization\'s IT infrastructure.' },
  { q: 'Can you manage Adobe renewals?', a: 'Yes. We proactively manage your software renewals to ensure zero downtime and continuous compliance with Adobe licensing terms.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function Adobe() {
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
        <SectionGlow color="red" position="bottom-right" opacity={0.15} size={700} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Creative Cloud & Enterprise Solutions</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Empower Creativity & Business" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#FCA5A5] via-[#EF4444] to-[#DC2626] bg-clip-text text-transparent font-semibold inline-block">
                    Productivity with Adobe Solutions
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  KK Tech Solutions helps businesses simplify Adobe licensing, Creative Cloud deployment, enterprise subscriptions, renewals, migration, and ongoing support with genuine Adobe solutions tailored to every organization.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group shadow-[0_0_20px_rgba(239,68,68,0.3)] border-[#EF4444] bg-[#EF4444] hover:bg-[#DC2626] hover:border-[#DC2626]">
                    Get Authorized Licensing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <AnimatedEcosystem 
                centerBrand="adobe"
                centerColor="ff0000"
                themeColorHex="#EF4444"
                customCenterSvg={<img src="/adobe.svg" alt="Adobe Logo" className="w-full h-full object-contain drop-shadow-xl" />}
                nodes={[
                  { brand: 'adobephotoshop', fallbackIcon: Image, label: 'Photoshop' },
                  { brand: 'adobeillustrator', fallbackIcon: PenTool, label: 'Illustrator' },
                  { brand: 'adobepremierepro', fallbackIcon: Video, label: 'Premiere Pro' },
                  { brand: 'adobeacrobatreader', fallbackIcon: FileText, label: 'Acrobat' },
                  { brand: 'adobeaftereffects', fallbackIcon: Film, label: 'After Effects' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ADOBE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="red" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose Adobe"
            title="The Standard for Creativity & Business"
            sub="Empower your workforce with industry-leading tools, enterprise security, and seamless collaboration."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <AdobePremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[240px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#EF4444]/10 group-hover:border-[#EF4444]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-6 h-6 text-[#F87171] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F87171] transition-colors">{f.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </AdobePremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== ADOBE PRODUCTS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Ecosystem"
            title="Adobe Products"
            sub="Explore the comprehensive suite of applications for every creative and business need."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" staggerChildren={0.05}>
            {products.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <AdobePremiumCard delayOffset={i * 0.1} className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <s.icon className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </AdobePremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CREATIVE CLOUD FOR BUSINESS & ACROBAT ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="red" position="bottom-left" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <SectionTitle
              eyebrow="Enterprise Control"
              title="Creative Cloud for Business"
              sub="Tailored solutions for teams and enterprises."
            />
            <StaggerContainer className="mt-8 grid sm:grid-cols-2 gap-4" staggerChildren={0.05}>
              {ccForBusiness.map((c, i) => (
                <StaggerItem key={c.title} direction="up">
                  <AdobePremiumCard delayOffset={i * 0.1} className="p-6 text-left h-full">
                    <c.icon className="w-6 h-6 text-red-400 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-2">{c.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                  </AdobePremiumCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <SectionTitle
              eyebrow="Document Management"
              title="Adobe Acrobat Solutions"
              sub="Secure, digital workflows for the modern enterprise."
            />
            <StaggerContainer className="mt-8 grid sm:grid-cols-2 gap-4" staggerChildren={0.05}>
              {acrobatSolutions.map((a, i) => (
                <StaggerItem key={a.title} direction="up">
                  <AdobePremiumCard delayOffset={i * 0.1} className="p-6 text-left h-full">
                    <a.icon className="w-6 h-6 text-red-400 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-2">{a.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                  </AdobePremiumCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </section>

      {/* ===== ADOBE LICENSING & DEPLOYMENT ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle center eyebrow="Methodology" title="Licensing & Deployment Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-6 gap-6 relative z-10" staggerChildren={0.1}>
              {licensingServices.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-red-500/30 flex items-center justify-center font-bold text-red-400 mb-4 group-hover:border-red-400 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 relative z-10">
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

      {/* ===== INDUSTRIES & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="red" position="top-right" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Industries We Serve</h3>
              <p className="text-gray-400 mb-6 text-sm">Empowering creatives and professionals across a diverse range of sectors.</p>
              <div className="grid grid-cols-2 gap-4">
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                {industries.map((ind, i) => (
                  <div key={ind.name} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-colors">
                    <ind.icon className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-gray-300 font-medium text-sm">{ind.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal direction="right">
              <h3 className="text-3xl font-bold text-white mb-8">Why KK Tech Solutions</h3>
              <p className="text-gray-400 mb-6 text-sm">Your trusted technology partner for enterprise software licensing, deployment, and ongoing support.</p>
              <ul className="space-y-4">
                {whyUs.map((w, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#EF4444]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#F87171] shrink-0" />
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
        title="Ready to optimize your creative workflows with Adobe?"
        description="Contact KK Tech Solutions for genuine licensing, seamless migration, and enterprise deployment support."
        primaryButtonText="Request a Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Support Team"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}





