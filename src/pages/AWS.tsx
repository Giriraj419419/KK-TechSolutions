import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import {
  Cloud, ShieldCheck, Gauge, Server, Database, Lock,
  ArrowRight, Globe
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { BrandLogo } from '../components/BrandLogo';

// =========================================================================
// PREMIUM AWS CARD ENHANCEMENT (Isolated physics for AWS page only)
// =========================================================================
const AWSPremiumCard = React.memo(function AWSPremiumCard({ children, className, delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
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
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Subtle ambient floating animation
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
      className={`relative group rounded-2xl border border-white/5 bg-white/[0.02] premium-glass will-change-transform transform-gpu transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.12)] hover:border-orange-500/20 hover:bg-white/[0.03] ${className}`}
    >
      {/* Subtle hover spotlight tracking mouse */}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(249,115,22,0.06), transparent 60%)`
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
// DATA ARRAYS
// =========================================================================
const features = [
  { icon: Cloud, title: 'Cloud Migration', desc: 'Seamless migration of workloads to AWS with minimal disruption and maximum efficiency.' },
  { icon: ShieldCheck, title: 'Security & Compliance', desc: 'Robust security architectures and compliance frameworks tailored to your industry.' },
  { icon: Gauge, title: 'Performance Optimization', desc: 'Fine-tuned infrastructure for speed, reliability, and cost efficiency on AWS.' },
  { icon: Server, title: 'Compute & Storage', desc: 'Scalable EC2, Lambda, and S3 solutions designed for your workload demands.' },
  { icon: Database, title: 'Databases & Analytics', desc: 'Managed databases and analytics services to turn data into actionable insight.' },
  { icon: Lock, title: 'Identity & Access', desc: 'IAM and governance strategies that keep your cloud environment secure and controlled.' },
];

// =========================================================================
// MAIN PAGE
// =========================================================================
export default function AWS() {
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
        <SectionGlow color="orange" position="bottom-right" opacity={0.12} size={600} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>AWS Cloud Solutions</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white flex flex-col items-start gap-1">
                  <TextReveal text="Leveraging the Power of" delay={0.08} className="!justify-start" />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent font-semibold inline-block">
                    AWS Cloud
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Enhanced flexibility, security, and operational efficiency with public, private,
                  and hybrid cloud architectures on AWS.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2 group">
                    Get Started with AWS
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/our-services" className="btn-secondary py-3 px-8 text-sm">
                    All Services
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column â€” Animated AWS Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <div className="relative w-full h-full max-w-md mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl premium-glass border border-orange-500/30 z-20">
                  <BrandLogo iconName="amazonaws" color="ff9900" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                </div>

                {/* Orbiting Tech Icons */}
                {[
                  { brand: 'amazonec2', fallbackIcon: Server, label: 'EC2 Compute', delay: 0, angle: 0 },
                  { brand: 'amazons3', fallbackIcon: Database, label: 'S3 Storage', delay: 1.5, angle: 60 },
                  { brand: 'awslambda', fallbackIcon: Cloud, label: 'Lambda', delay: 3, angle: 120 },
                  { brand: 'amazoncloudfront', fallbackIcon: Globe, label: 'CloudFront', delay: 4.5, angle: 180 },
                  { brand: 'awsiam', fallbackIcon: ShieldCheck, label: 'IAM Security', delay: 6, angle: 240 },
                  { brand: 'amazonrds', fallbackIcon: Gauge, label: 'RDS Database', delay: 7.5, angle: 300 }
                ].map((item, idx) => {
                  const radius = 160;
                  const radian = (item.angle * Math.PI) / 180;
                  const x = Math.cos(radian) * radius;
                  const y = Math.sin(radian) * radius;

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
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 premium-glass group cursor-default hover:border-orange-500/40 hover:bg-orange-500/10 transition-colors"
                      >
                        <BrandLogo iconName={item.brand} fallbackIcon={item.fallbackIcon} className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <span className="mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-[#0B121F]/80 px-2 py-0.5 rounded-full">{item.label}</span>
                    </motion.div>
                  );
                })}
                
                {/* Connecting Lines (svg) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" style={{ transform: 'translate(50%, 50%)' }}>
                  <circle cx="0" cy="0" r="160" stroke="#F97316" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="orange" position="top-left" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            accent="orange"
            eyebrow="AWS Capabilities"
            title="Comprehensive AWS Expertise"
            sub="From migration to optimization, we cover every layer of your AWS cloud journey."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {features.map((f, i) => (
              <StaggerItem key={f.title} direction="up">
                <AWSPremiumCard delayOffset={i * 0.2} className="p-8 h-full flex flex-col min-h-[240px]">
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors duration-300"
                    >
                      <f.icon className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{f.desc}</p>
                  </div>
                </AWSPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-right" opacity={0.06} size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            center
            accent="orange"
            eyebrow="Value Proposition"
            title="Why Choose AWS with KK Tech"
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.08}>
            {features.map((b, i) => (
              <StaggerItem key={i} direction="up">
                <AWSPremiumCard delayOffset={i * 0.15} className="p-8 text-center h-full flex flex-col items-center min-h-[240px]">
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.2 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/10 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors duration-300"
                    >
                      <b.icon className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="text-sm font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-400">{b.desc}</p>
                  </div>
                </AWSPremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Ready to Harness the Power of AWS?"
        description="Let our AWS-certified consultants design your cloud strategy, tailored for scale, security, and savings."
        primaryButtonText="Get Free AWS Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="All Services"
        secondaryButtonLink="/our-services"
      />
    </div>
  );
}






