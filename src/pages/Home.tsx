/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, animate } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, GraduationCap, Package, Building2, Truck, Globe, MessageCircle, Mail, Phone, Shield, Rocket } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal, Eyebrow, SectionTitle } from '../components/Section';
import { CosmosField, GlowingOrbs, SectionGlow, FloatingElement, TiltCard } from '../components/Atmosphere';
import TechConstellation from '../components/TechConstellation';
import InteractivePartnerCard from '../components/InteractivePartnerCard';
import { isAppLoaded } from '../components/Preloader';
import EnterpriseCTA from '../components/EnterpriseCTA';

const MemoizedCosmosField = React.memo(CosmosField);
const MemoizedGlowingOrbs = React.memo(GlowingOrbs);
const MemoizedTechConstellation = React.memo(TechConstellation);

// ============================================================
// DATA & CONFIG
// ============================================================
const partners = ['Microsoft', 'AWS', 'Azure', 'Corel', 'Autodesk', 'Dell', 'HP'];

// Custom Service SVG Icon components for premium 3D design look
function CloudManagedIcon() {
  return (
    <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  );
}

function DevOpsIcon() {
  return (
    <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  );
}

function CloudMigrationIcon() {
  return (
    <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  );
}

function TechAugmentationIcon() {
  return (
    <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IoTSolutionsIcon() {
  return (
    <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M9 21h6" />
    </svg>
  );
}

function InfrastructureIcon() {
  return (
    <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01M18 6h.01M18 18h.01" />
    </svg>
  );
}

const servicesList = [
  {
    Icon: CloudManagedIcon,
    title: 'Cloud Managed Services',
    desc: 'Comprehensive monitoring, security governance, and operational optimization of public, private, and hybrid cloud environments.'
  },
  {
    Icon: DevOpsIcon,
    title: 'DevOps Services',
    desc: 'Accelerate your software delivery life cycle with automated CI/CD implementation, Infrastructure as Code (IaC), and secure containerization.'
  },
  {
    Icon: CloudMigrationIcon,
    title: 'Cloud Migration & Strategy',
    desc: 'Seamless architectural assessment, cloud migration strategy design, and zero-downtime databases & servers migration to AWS or Azure.'
  },
  {
    Icon: TechAugmentationIcon,
    title: 'Tech Augmentation',
    desc: 'Extend your in-house team with our certified IT developers, database administrators, and veteran cloud solutions architects.'
  },
  {
    Icon: IoTSolutionsIcon,
    title: 'IoT Solutions',
    desc: 'Scalable device connectivity, sensor telemetry architecture, and real-time operations dashboards for industrial and warehouse environments.'
  },
  {
    Icon: InfrastructureIcon,
    title: 'IT Infrastructure Design',
    desc: 'Resilient corporate network planning, local rack setup, structured fiber cabling, enterprise Wi-Fi systems, and disaster recovery strategy.'
  }
];

const partnersList = [
  {
    name: 'AWS Cloud',
    logo: '/aws.svg',
    desc: 'Deploy secure, scalable, and high-performance cloud infrastructure with AWS solutions.',
    color: 'orange',
    link: '#',
  },
  {
    name: 'Microsoft Azure',
    logo: '/azure.svg',
    desc: 'Build, manage, and modernize applications with Microsoft\'s intelligent cloud platform.',
    color: 'blue',
    link: '#',
  },
  {
    name: 'Microsoft 365',
    logo: '/microsoft.svg',
    desc: 'Boost productivity with secure collaboration, email, Teams, and Office applications.',
    color: 'teal',
    link: '#',
  },
  {
    name: 'Adobe Solutions',
    logo: '/adobe.svg',
    desc: 'Create, manage, and deliver engaging digital experiences with Adobe technologies.',
    color: 'red',
    link: '#',
  },
  {
    name: 'Autodesk Solutions',
    logo: '/autodesk.svg',
    desc: '3D Design & Engineering',
    color: 'purple',
    link: '#',
  },
  {
    name: 'GstarCAD Solutions',
    logo: '/gstarcad.svg',
    desc: 'Professional CAD Platform',
    color: 'blue',
    link: '#',
  },
  {
    name: 'ZWCAD Solutions',
    logo: '/zwcad.svg',
    desc: 'Reliable CAD Software',
    color: 'blue',
    link: '#',
  },
  {
    name: 'CorelDRAW Graphics',
    logo: '/corel.svg',
    desc: 'Design & Illustration Suite',
    color: 'purple',
    link: '#',
  },
];

const industries = [
  { icon: HeartPulse, label: 'Healthcare', desc: 'Secure, HIPAA-compliant IT systems.' },
  { icon: GraduationCap, label: 'Education', desc: 'Connected campus infrastructure.' },
  { icon: Package, label: 'Manufacturing', desc: 'Smart factory & IoT solutions.' },
  { icon: Building2, label: 'Finance & Banking', desc: 'Secure, compliant financial IT.' },
  { icon: Truck, label: 'Logistics', desc: 'Supply chain connectivity & tracking.' },
  { icon: Globe, label: 'Government', desc: 'Mission-critical public sector IT.' },
];

// ============================================================
// ANIMATED COUNTER
// ============================================================
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(0, value, {
            duration: 1.8,
            ease: 'easeOut',
            onUpdate: (v) => {
              if (el) el.innerText = `${Math.floor(v)}${suffix}`;
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <div ref={ref} className="stat-number">
      0{suffix}
    </div>
  );
}

// ============================================================
// MAIN HOME PAGE
// ============================================================
export default function Home() {
  const baseDelay = isAppLoaded ? 0 : 2.0;

  return (
    <div className="relative min-h-[auto] lg:min-h-[75vh] bg-transparent">
      <MemoizedCosmosField />
      <MemoizedGlowingOrbs />

      {/* ===== 1. HERO SECTION ===== */}
      <motion.section 
        initial={{ opacity: isAppLoaded ? 1 : 0, scale: isAppLoaded ? 1 : 0.98, y: isAppLoaded ? 0 : 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: baseDelay, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pt-24 pb-8 lg:pt-28 lg:pb-12 overflow-hidden min-h-[auto] lg:min-h-[75vh] flex items-center"
      >
        {/* Subtle hero glow on bottom right */}
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={500} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left side text */}
            <div className="relative z-10 text-left flex flex-col">
              <Reveal delay={baseDelay}>
                <span className="badge-blue">
                  <span className="pulse-dot shrink-0" />
                  Enterprise IT Solutions · Ahmedabad, India
                </span>
              </Reveal>

              <Reveal direction="up" delay={baseDelay + 0.08} className="mt-5 lg:mt-8">
                <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl lg:text-[4rem] font-medium lg:leading-[1.08] tracking-tight text-white break-words">
                  <TextReveal text="Empowering Your" delay={baseDelay + 0.08} />{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    Digital Future
                  </span>
                  {' '}<TextReveal text="with Innovation" delay={baseDelay + 0.16} />
                </h1>
              </Reveal>

              <Reveal delay={baseDelay + 0.14} className="mt-6 lg:mt-8">
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Innovative, reliable, and scalable IT solutions for SMEs, enterprises, and government projects. From cloud migrations to infrastructure setups, we deliver end-to-end digital transformation.
                </p>
              </Reveal>


              {/* Social Proof separator bar */}
              <Reveal delay={baseDelay + 0.2} className="mt-4 lg:mt-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-gray-500 border-l-2 border-blue-500/50 pl-4 py-1">
                  <span>15+ Years Experience</span>
                  <span className="text-gray-700">|</span>
                  <span>500+ Projects Delivered</span>
                  <span className="text-gray-700">|</span>
                  <span>100% Client Satisfaction</span>
                  <span className="text-gray-700">|</span>
                  <span>24/7/365 Monitoring</span>
                </div>
              </Reveal>

              {/* Action CTAs */}
              <Reveal delay={baseDelay + 0.26} className="mt-6 lg:mt-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/our-services" className="btn-secondary py-3 px-8 text-sm text-center w-full sm:w-auto">
                    View Our Services
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right side floating constellation graphic */}
            <Reveal direction="left" delay={baseDelay + 0.12} className="relative z-10 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <MemoizedTechConstellation className="w-full max-w-[500px] aspect-square" />
            </Reveal>
          </div>
        </div>
      </motion.section>

      {/* ===== 2. SERVICES SECTION (Sticky Layout) ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="purple" position="top-left" opacity={0.1} size={400} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky column */}
            <Reveal direction="right" className="lg:sticky lg:top-24 space-y-6">
              <span className="badge-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                Our Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                <TextReveal text="End-to-End Technology Solutions" />
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Comprehensive IT services designed to simplify operations, enhance connectivity, and drive sustainable growth for your business.
              </p>

              {/* Expert Engineering Team Visual */}
              <div className="relative mt-8 rounded-2xl overflow-hidden border border-white/5 aspect-video bg-gradient-to-br from-blue-900/10 to-purple-900/10 flex flex-col justify-end p-6 group">
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10">
                  <div className="flex -space-x-2.5 mb-3">
                    {['JD', 'AS', 'RK', 'MP'].map((initial, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                        {initial}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-blue-600 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      +20
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">KK Tech Expert Engineering Group</div>
                  <div className="text-xs text-gray-400 mt-0.5">SLA-guaranteed 24/7/365 technical monitoring</div>
                </div>
              </div>
            </Reveal>

            {/* Right stacked scroll services list */}
            <StaggerContainer className="space-y-6" staggerChildren={0.08}>
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              {servicesList.map((service, i) => (
                <StaggerItem key={service.title} direction="left">
                  <div className="enterprise-card p-6 sm:p-8 relative overflow-hidden group hardware-accelerated">
                    <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <service.Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>
        </div>
      </section>

      {/* ===== 3. PARTNERS SECTION ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="bottom-right" opacity={0.1} size={400} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-blue mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              Strategic Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Our Authorized Partners
            </h2>
            <p className="text-gray-400 mt-4">
              We collaborate with globally recognized technology leaders to deliver secure, scalable, and enterprise-grade digital solutions for businesses of every size.
            </p>
          </Reveal>

          <StaggerContainer>
            <div className="overflow-hidden relative w-full py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
              <div className="flex gap-6 w-max animate-marquee pause-on-hover motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center will-change-transform transform-gpu">
                {[...partnersList, ...partnersList].map((p, idx) => (
                  <div key={idx} className="w-[85vw] max-w-[320px] sm:w-[320px] shrink-0 h-auto pb-8">
                    <InteractivePartnerCard p={p} idx={idx} />
                  </div>
                ))}
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Supercharge Your Cloud Infrastructure Today"
        description="Get in touch with our certified Solution Architects to design a highly scalable, secure, and cost-effective cloud system."
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact-us"
      />

      {/* ===== 5. CLIENT LOGO BAR ===== */}
      <section className="relative z-10 py-24 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex justify-center mb-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-gray-400 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full">
              Trusted Cloud Providers & Enterprise Hardware
            </span>
          </div>
          <div className="relative overflow-hidden"
               style={{ maskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)' }}>
            <div className="flex gap-6 animate-marquee pause-on-hover w-max select-none py-4 will-change-transform transform-gpu">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-3 px-8 py-5 rounded-2xl border border-white/10 bg-white hover:bg-gray-50 transition-all duration-300 group shadow-sm hover:shadow-md" style={{ minWidth: 200, height: 80 }}>
                  <img 
                    src={`/${p.toLowerCase()}.svg`} 
                    className={`w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 transform-gpu ${p === 'Corel' ? 'h-4 sm:h-5' : 'h-8 sm:h-9'}`} 
                    alt={p} 
                    loading="lazy"
                    decoding="async"
                  />
                  {p !== 'Corel' && (
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-800 transition-colors hidden sm:block">
                      {p}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. INDUSTRIES GRID ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-right" opacity={0.08} size={400} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-blue mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              Sector Experience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Expertise Across Every Sector
            </h2>
            <p className="text-gray-400 mt-4">
              From healthcare to government systems, we deliver specialized IT configurations tailored to your domain regulatory compliance rules.
            </p>
          </div>

          {/* Moving Marquee Container */}
          <div className="relative overflow-hidden w-full flex py-4">
            {/* Edge Gradients for smooth fade in/out */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0B121F] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0B121F] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-4 shrink-0 px-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...industries, ...industries, ...industries, ...industries].map((ind, idx) => (
                <div key={`${ind.label}-${idx}`} className="w-[85vw] max-w-[240px] sm:w-[240px] p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ind.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{ind.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{ind.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. "WHO WE ARE" SECTION ===== */}
      <section className="relative z-10 py-24 bg-transparent border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Image graphic */}
            <Reveal direction="right" className="flex justify-center lg:justify-start">
              <FloatingElement duration={7}>
                <div className="relative w-full max-w-[480px] aspect-square rounded-[2rem] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                    alt="KK Tech Engineering Team"
                    className="w-full h-full object-cover transform-gpu"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </FloatingElement>
            </Reveal>

            {/* Right text + counter stats */}
            <Reveal direction="left" className="space-y-8 relative z-10 text-left">
              <div>
                <span className="badge-blue mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Certified Engineers, Dedicated Administrators
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  KK Tech Solutions is an Ahmedabad-based enterprise technology advisory. Over the last 15 years, we have migrated legacy data centers, configured mission-critical networks, and structured IT departments for scaling companies across India.
                </p>
              </div>


            </Reveal>

          </div>
        </div>
      </section>

      {/* ===== ENTERPRISE TRUST SECTION ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent" id="trust-section">
        <SectionGlow color="teal" position="top-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="Why Businesses Trust KK Tech Solutions"
            title="Enterprise-Grade Reliability"
            sub="We combine industry-leading expertise with uncompromising security to deliver technology that scales with your business."
          />
          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {[
              { icon: Globe, title: 'Microsoft Expertise', desc: 'Enterprise productivity and cloud solutions.' },
              { icon: Building2, title: 'Cloud Infrastructure', desc: 'Azure and AWS deployment expertise.' },
              { icon: HeartPulse, title: 'Enterprise Support', desc: 'Reliable consultation and technical assistance.' },
              { icon: Shield, title: 'Security & Compliance', desc: 'Secure and scalable technology implementations.' },
              { icon: Rocket, title: 'Fast Deployment', desc: 'Rapid project delivery and onboarding.' },
            ].map((feature, i) => (
              <StaggerItem key={i} direction="up" className={i === 3 ? "lg:col-start-1 lg:ml-auto lg:w-[110%]" : i === 4 ? "lg:col-start-2 lg:mr-auto lg:w-[110%]" : ""}>
                <TiltCard className="p-7 h-full flex flex-col group relative overflow-hidden text-left bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== LIVE STATISTICS SECTION ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-[#060A11] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12" staggerChildren={0.08}>
            {[
              { value: 500, suffix: '+', label: 'Projects Delivered' },
              { value: 50, suffix: '+', label: 'Clients Served' },
              { value: 15, suffix: '+', label: 'Years of Experience' },
              { value: 200, suffix: '+', label: 'Cloud Deployments' },
              { value: 15, suffix: 'm', label: 'Avg Response Time' }
            ].map((stat, idx) => (
              <StaggerItem key={idx} direction="scale" className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 8. CONTACT STRIP (DARK MOTION CARDS) ===== */}
      <section className="relative z-10 py-24 bg-transparent border-t border-white/5 overflow-hidden">
        <SectionGlow color="teal" position="top-right" opacity={0.1} size={500} />
        <SectionGlow color="blue" position="bottom-left" opacity={0.1} size={500} />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="text-left relative z-10">
              <Reveal direction="right">
                <Eyebrow>Connect With Us</Eyebrow>
              </Reveal>
              <Reveal direction="right" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-medium leading-[1.1] text-white tracking-tight mt-4">
                  <TextReveal text="Ready to scale up your systems?" />{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    Let's talk.
                  </span>
                </h2>
              </Reveal>
              <Reveal direction="right" delay={0.2}>
                <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-lg">
                  Reach our engineers directly via phone, email, or a quick WhatsApp chat. We usually respond within 15 minutes during standard operational hours.
                </p>
              </Reveal>
              <Reveal direction="right" delay={0.3}>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {/* Fake avatars for social proof */}
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B121F] bg-white/10 flex items-center justify-center overflow-hidden">
                         <div className="w-full h-full bg-gradient-to-tr from-blue-500/40 to-teal-500/40" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Join <span className="text-white">500+</span> enterprises
                  </div>
                </div>
              </Reveal>
            </div>

            <StaggerContainer className="space-y-4 relative z-10" staggerChildren={0.15}>
              <StaggerItem direction="left">
                <TiltCard className="h-full cursor-pointer group">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-green-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500/20 group-hover:border-green-500/50">
                      <MessageCircle className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 group-hover:text-green-400/70 transition-colors">WhatsApp Chat</div>
                      <a href="https://wa.me/917048214373" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                        +91 70482 14373
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>

              <StaggerItem direction="left">
                <TiltCard className="h-full cursor-pointer group">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-blue-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-500/50">
                      <Mail className="w-7 h-7 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 group-hover:text-blue-400/70 transition-colors">Email Us</div>
                      <a href="mailto:info@kktechsolutions.in" className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        info@kktechsolutions.in
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>

              <StaggerItem direction="left">
                <TiltCard className="h-full cursor-pointer group">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-purple-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-500/20 group-hover:border-purple-500/50">
                      <Phone className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 group-hover:text-purple-400/70 transition-colors">Call Support</div>
                      <a href="tel:+917048214373" className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        +91 70482 14373
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            </StaggerContainer>

          </div>
        </div>
      </section>
    </div>
  );
}




