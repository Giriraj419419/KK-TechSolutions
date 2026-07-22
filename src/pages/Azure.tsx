/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
  Cloud, ShieldCheck, Server, Database, Globe, ArrowRight, Activity, Cpu, 
  Lock, Network, Monitor, Code, CheckCircle, ChevronDown, 
  HeartPulse, LineChart, Factory, ShoppingCart, GraduationCap, Building2,
  Briefcase, TerminalSquare, BrainCircuit, LayoutGrid, Users, HardDrive
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import SEO from '../components/SEO';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

// =========================================================================
// PREMIUM AZURE CARD ENHANCEMENT (Isolated physics for Azure page only)
// =========================================================================
const AzurePremiumCard = React.memo(function AzurePremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,120,212,0.15)] hover:border-blue-500/20 hover:bg-white/[0.04] ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(0,120,212,0.08), transparent 60%)`
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
  { icon: Globe, title: 'Global Infrastructure', desc: 'Deploy applications across a vast network of highly secure global datacenters.' },
  { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Multi-layered security provided across datacenters, infrastructure, and operations.' },
  { icon: Server, title: 'Hybrid Cloud', desc: 'Seamlessly integrate and manage environments across on-premises, multi-cloud, and edge.' },
  { icon: Cpu, title: 'AI & Machine Learning', desc: 'Build intelligent applications using industry-leading AI models and services.' },
  { icon: Activity, title: 'High Availability', desc: 'Ensure business continuity with built-in redundancy and disaster recovery features.' },
  { icon: LineChart, title: 'Cost Optimization', desc: 'Pay only for what you use with flexible pricing models tailored to your workload.' },
];

const solutions = [
  { icon: Cloud, title: 'Azure Migration', desc: 'Secure, zero-downtime transition to the cloud.' },
  { icon: Monitor, title: 'Azure Virtual Desktop', desc: 'Secure remote work experiences.' },
  { icon: Database, title: 'Azure Backup', desc: 'Reliable data protection and recovery.' },
  { icon: Activity, title: 'Site Recovery', desc: 'Built-in disaster recovery services.' },
  { icon: Lock, title: 'Active Directory', desc: 'Enterprise identity and access management.' },
  { icon: Network, title: 'Azure Networking', desc: 'Connect cloud and on-premises seamlessly.' },
  { icon: ShieldCheck, title: 'Security Center', desc: 'Advanced threat protection across workloads.' },
  { icon: Server, title: 'Kubernetes Service', desc: 'Simplify deployment and operations of Kubernetes.' },
  { icon: Code, title: 'Azure DevOps', desc: 'Accelerate delivery with agile tools and CI/CD.' },
  { icon: Activity, title: 'Azure Monitoring', desc: 'Full observability across your applications.' },
];

const industries = [
  { icon: HeartPulse, name: 'Healthcare' },
  { icon: Building2, name: 'Finance' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: ShoppingCart, name: 'Retail' },
  { icon: GraduationCap, name: 'Education' },
  { icon: TerminalSquare, name: 'IT Services' },
  { icon: Globe, name: 'Government' },
  { icon: Briefcase, name: 'Startups' },
];

const migrationSteps = [
  { title: 'Assessment', desc: 'Evaluating your current infrastructure.' },
  { title: 'Planning', desc: 'Designing the optimal cloud architecture.' },
  { title: 'Migration', desc: 'Executing zero-downtime data transfer.' },
  { title: 'Optimization', desc: 'Fine-tuning performance and costs.' },
  { title: 'Monitoring', desc: 'Implementing observability tools.' },
  { title: 'Support', desc: '24/7 ongoing management.' },
];

const whyUs = [
  'Certified Experts', 'End-to-End Implementation', '24/7 Support', 
  'Microsoft Best Practices', 'Customized Solutions', 'Fast Deployment'
];

const faqs = [
  { q: 'What is Microsoft Azure?', a: 'Microsoft Azure is a comprehensive set of cloud computing services spanning compute, analytics, storage, and networking. It empowers organizations to build, run, and manage applications across multiple clouds, on-premises, and at the edge.' },
  { q: 'Why should I migrate to Azure?', a: 'Migrating to Azure reduces capital expenditure on physical hardware, improves scalability, enhances security, and provides access to cutting-edge AI and data analytics tools.' },
  { q: 'How long does Azure migration take?', a: 'The timeline varies depending on the complexity of your current infrastructure, amount of data, and specific requirements. A simple lift-and-shift can take weeks, while a full enterprise transformation may take several months.' },
  { q: 'Is Azure secure?', a: 'Yes. Azure invests over $1 billion annually in cybersecurity research and employs thousands of security experts. It offers more than 100 compliance certifications, ensuring multi-layered security.' },
  { q: 'Do you provide managed Azure services?', a: 'Absolutely. We provide end-to-end managed services, including 24/7 monitoring, security patching, cost optimization, and proactive performance tuning.' },
  { q: 'Can you migrate existing servers?', a: 'Yes, we specialize in migrating physical and virtual servers (VMware, Hyper-V) to Azure with near-zero downtime, ensuring business continuity throughout the transition.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function Azure() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);

  const azureFaqs = faqs.map(f => ({ question: f.q, answer: f.a }));

  return (
    <div className="relative w-full max-w-full min-h-[auto] lg:min-h-[75vh] bg-[#0B121F] overflow-x-clip">
      <SEO 
        title="Microsoft Azure Cloud Solutions | KK Tech Solutions"
        description="Transform your business with Microsoft Azure cloud infrastructure, migration, hybrid cloud architecture, and managed services by KK Tech Solutions."
        canonicalUrl="https://kktechsolutions.in/azure"
        faq={azureFaqs}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Azure", item: "/azure" }
        ]}
      />
      
      {/* Enhanced Ambient Background with Scroll Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none z-0">
        <CosmosField />
        <GlowingOrbs />
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-12 min-h-[80vh] sm:min-h-[85vh] lg:min-h-[75vh] flex items-center">
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={700} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Microsoft Cloud Services</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[4rem] font-medium leading-[1.18] lg:leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1 break-words">
                  <TextReveal text="Innovate Faster with" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-[#0078D4] via-[#2B88D8] to-[#00BCF2] bg-clip-text text-transparent font-semibold inline-block">
                    Microsoft Azure
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Build, manage, and scale applications on a trusted, global enterprise cloud platform. Accelerate your digital transformation with our Azure-certified experts.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,120,212,0.3)] border-[#0078D4] bg-[#0078D4] hover:bg-[#005A9E] hover:border-[#005A9E] w-full sm:w-auto">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact-us" className="btn-secondary py-3 px-8 text-sm text-center w-full sm:w-auto">
                    Talk to an Azure Expert
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full min-h-[280px] xs:min-h-[320px] lg:min-h-[450px] h-auto">
              <AnimatedEcosystem 
                centerBrand="microsoftazure"
                centerColor="0089d6"
                themeColorHex="#0078D4"
                customCenterSvg={<img src="/azure.svg" alt="Microsoft Azure Logo" className="w-full h-full object-contain drop-shadow-xl" />}
                nodes={[
                  { iconify: 'logos:microsoft-azure', label: 'Azure Cloud' },
                  { iconify: 'devicon:azuredevops', label: 'Azure DevOps' },
                  { iconify: 'vscode-icons:file-type-azure', label: 'Azure Functions' },
                  { iconify: 'vscode-icons:file-type-azurepipelines', label: 'Azure Pipelines' },
                  { iconify: 'selfhst:microsoft-sql-server', label: 'SQL Server' },
                  { brand: 'docker', label: 'Docker' },
                  { brand: 'kubernetes', label: 'Kubernetes' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE AZURE ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Choose Azure"
            title="The Enterprise Standard"
            sub="Discover why 95% of Fortune 500 companies trust Microsoft Azure for their business-critical applications."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {reasons.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <AzurePremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[240px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-[#0078D4]/10 group-hover:border-[#0078D4]/30 transition-colors duration-300"
                    >
                      <f.icon className="w-6 h-6 text-[#0078D4] group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0078D4] transition-colors">{f.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </AzurePremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== AZURE SOLUTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            eyebrow="Our Services"
            title="Azure Solutions Matrix"
            sub="Comprehensive Azure cloud services designed to modernize and scale your operations."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerChildren={0.05}>
            {solutions.map((s, i) => (
              <StaggerItem key={s.title} direction="scale">
                <AzurePremiumCard delayOffset={i * 0.1} className="p-6 text-center h-full flex flex-col items-center">
                  <s.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </AzurePremiumCard>
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
          <SectionTitle center eyebrow="Methodology" title="Azure Migration Process" />
          <div className="mt-16 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <StaggerContainer className="grid lg:grid-cols-6 gap-6 relative z-10" staggerChildren={0.1}>
              {migrationSteps.map((step, i) => (
                <StaggerItem key={step.title} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#0B121F] border-2 border-blue-500/30 flex items-center justify-center font-bold text-blue-400 mb-4 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(0,120,212,0.4)] transition-all duration-300 relative z-10">
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

      {/* ===== BENEFITS & WHY US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.1} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          
          <div>
            <Reveal direction="left">
              <h3 className="text-3xl font-bold text-white mb-8">Business Benefits</h3>
              <ul className="space-y-4">
                {[
                  "Seamless integration with existing Microsoft infrastructure",
                  "High availability with 99.95% SLA guarantees",
                  "Enterprise-grade security and compliance certifications",
                  "Scalable pay-as-you-go pricing model",
                  "Comprehensive disaster recovery and backup solutions",
                  "Global network of highly secure datacenters"
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-gray-300 font-medium">{b}</span>
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
                  <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#0078D4]/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#0078D4] shrink-0" />
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
        title="Ready to Transform Your Business with Microsoft Azure?"
        description="Partner with KK Tech Solutions to build a secure, scalable, and future-ready cloud infrastructure."
        primaryButtonText="Schedule a Free Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Contact Azure Specialists"
        secondaryButtonLink="/contact-us"
      />
    </div>
  );
}






