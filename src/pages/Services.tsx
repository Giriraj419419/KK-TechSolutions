/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Server, Cloud, ShieldCheck, Wifi, Cpu, ArrowRight,
  HardDrive, Network, Database, Shield, Activity, Gauge, Layers,
  CloudCog, Check, Zap, TrendingUp
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, TiltCard, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';

const services = [
  {
    id: 'infra',
    icon: Server,
    title: 'IT Infrastructure',
    desc: 'Servers, storage, and networking design & implementation built for performance and resilience.',
    points: ['Server & storage design', 'Networking implementation', 'Performance & resilience', 'Scalable architecture'],
    color: '#3B82F6',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Leveraging the power of public, private, and hybrid clouds for enhanced flexibility, security, and operational efficiency with providers like AWS and Azure.',
    points: ['Public, private & hybrid cloud', 'AWS & Azure expertise', 'Enhanced flexibility & security', 'Operational efficiency'],
    color: '#06B6D4',
  },
  {
    id: 'managed',
    icon: ShieldCheck,
    title: 'Managed Services',
    desc: '24/7 proactive monitoring, maintenance, and support to keep your business running without interruption.',
    points: ['24/7 proactive monitoring', 'Maintenance & support', 'Uninterrupted operations', 'Expert troubleshooting'],
    color: '#10B981',
  },
  {
    id: 'telecom',
    icon: Wifi,
    title: 'Telecom & Networking',
    desc: 'Structured cabling, Wiâ€‘Fi, and SDâ€‘WAN solutions for seamless, high-speed connectivity.',
    points: ['Structured cabling', 'Wiâ€‘Fi solutions', 'SDâ€‘WAN deployment', 'High-speed connectivity'],
    color: '#7C3AED',
  },
  {
    id: 'iot',
    icon: Cpu,
    title: 'IoT Solutions',
    desc: 'Device connectivity and data/analytics for industrial, logistics, and smartâ€‘city environments.',
    points: ['Device connectivity', 'Data & analytics', 'Industrial & logistics', 'Smartâ€‘city environments'],
    color: '#F97316',
  },
];

const capabilities = [
  { icon: HardDrive, t: 'Servers & Storage', color: '#3B82F6' },
  { icon: Network, t: 'Networking', color: '#7C3AED' },
  { icon: Database, t: 'Cloud Platforms', color: '#06B6D4' },
  { icon: Shield, t: 'Security', color: '#EF4444' },
  { icon: Activity, t: 'Monitoring', color: '#10B981' },
  { icon: Gauge, t: 'Performance', color: '#F59E0B' },
  { icon: Layers, t: 'Hybrid Cloud', color: '#3B82F6' },
  { icon: CloudCog, t: 'Cloud Management', color: '#06B6D4' },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState('infra');
  const activeSvc = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="relative min-h-[auto] lg:min-h-[75vh] bg-[#0B121F]">
      <CosmosField />
      <GlowingOrbs />

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-28 pb-12 overflow-hidden min-h-[auto] lg:min-h-[75vh] flex items-center">
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={500} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
          <Reveal direction="down">
            <Eyebrow>Our Services</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white">
              <TextReveal text="Endâ€‘toâ€‘End" delay={0.08} />{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Technology Solutions
              </span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.14}>
            <p className="mt-5 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Comprehensive services designed to simplify operations, enhance connectivity, and drive
              sustainable growth for your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICE EXPLORER ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="purple" position="top-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

            {/* Left â€” Service Selector */}
            <Reveal direction="left">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Service Catalogue
                  </p>
                </div>
                <div className="bg-transparent">
                  {services.map((s, idx) => {
                    const isSel = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className="w-full text-left transition-all duration-300 cursor-pointer focus:outline-none"
                        style={{
                          borderBottom: idx < services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          background: isSel ? 'rgba(255,255,255,0.06)' : 'transparent',
                        }}
                        onMouseEnter={e => {
                          if (!isSel) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                        }}
                        onMouseLeave={e => {
                          if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <div className="flex items-center gap-4 px-6 py-4">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                            style={{ 
                              background: isSel ? `${s.color}20` : 'rgba(255,255,255,0.05)', 
                              border: isSel ? `1px solid ${s.color}40` : '1px solid transparent' 
                            }}
                          >
                            <s.icon className="w-4.5 h-4.5 transition-colors duration-300" style={{ color: isSel ? s.color : '#9CA3AF' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold transition-colors duration-300" style={{ color: isSel ? '#FFFFFF' : '#9CA3AF' }}>
                              {s.title}
                            </div>
                          </div>
                          <div
                            className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                            style={{ 
                              background: isSel ? s.color : 'rgba(255,255,255,0.1)',
                              boxShadow: isSel ? `0 0 10px ${s.color}` : 'none'
                            }}
                          />
                        </div>

                        {/* Expanded points */}
                        {isSel && (
                          <div className="px-6 pb-4 flex flex-wrap gap-2">
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            {s.points.map((pt, i) => (
                              <span
                                key={pt}
                                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium border"
                                style={{ background: `${s.color}10`, color: s.color, borderColor: `${s.color}20` }}
                              >
                                <Check className="w-3 h-3" />
                                {pt}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Right â€” Service Detail */}
            <Reveal direction="right" delay={0.1} className="h-full">
              <TiltCard className="p-8 h-full min-h-[520px] flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" 
                     style={{ background: `linear-gradient(135deg, ${activeSvc.color}10, transparent)` }} />
                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                        style={{ background: `${activeSvc.color}15`, borderColor: `${activeSvc.color}30` }}
                      >
                        <activeSvc.icon className="w-7 h-7" style={{ color: activeSvc.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: activeSvc.color }}>
                          Enterprise Service
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          {activeSvc.title}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base leading-relaxed mb-8 text-gray-400">
                      {activeSvc.desc}
                    </p>

                    {/* Capabilities */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-500">
                        Core Capabilities
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeSvc.points.map((pt) => (
                          <div
                            key={pt}
                            className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]"
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: `${activeSvc.color}20` }}
                            >
                              <Check className="w-3 h-3" style={{ color: activeSvc.color }} />
                            </div>
                            <span className="text-sm font-semibold text-white">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/5">
                    <Link to="/contact-us" className="btn-primary py-2.5 px-6 text-sm">
                      Get This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="flex gap-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedService(s.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all cursor-pointer focus:outline-none"
                          title={s.title}
                          style={{
                            background: selectedService === s.id ? `${s.color}20` : 'rgba(255,255,255,0.05)',
                            borderColor: selectedService === s.id ? `${s.color}50` : 'transparent',
                            color: selectedService === s.id ? '#FFFFFF' : '#9CA3AF',
                          }}
                        >
                          {s.id.substring(0, 2).toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CORE CAPABILITIES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="teal" position="top-right" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Global Competency"
            title="Powered by Deep Technical Expertise"
            sub="Our team brings hands-on experience across all major platforms, technologies, and infrastructure systems."
          />
          <StaggerContainer className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5" staggerChildren={0.08}>
            {capabilities.map((c, i) => (
              <StaggerItem key={i} direction="up">
                <TiltCard className="p-6 text-center cursor-default group relative overflow-hidden">
                  <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                       style={{ background: `linear-gradient(180deg, ${c.color}10, transparent)` }} />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                    >
                      <c.icon className="w-6 h-6" style={{ color: c.color }} />
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-gray-200 transition-colors">
                      {c.t}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="bottom-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="Delivery Framework"
            title="How We Deploy Success"
            sub="Our structured, 4-phase methodology ensures every project is delivered efficiently, securely, and within scope."
          />
          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative" staggerChildren={0.1}>
            <div
              className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5"
              style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(6,182,212,0.3))' }}
            />
            {[
              { step: '01', title: 'Consultation & Strategy', sub: 'Assess & Audit', desc: 'Detailed evaluation of current setups, identifying bottlenecks, security gaps, and expansion needs.', icon: Network, color: '#3B82F6' },
              { step: '02', title: 'Architecture & Design', sub: 'Blueprint Design', desc: 'Custom blueprints balancing performance, cost, and high availability using modern cloud & hardware systems.', icon: TrendingUp, color: '#06B6D4' },
              { step: '03', title: 'Integration & Deployment', sub: 'Deploy & Integrate', desc: 'Agile implementation with minimal downtime, fully tested migration paths, and secure validation.', icon: Zap, color: '#7C3AED' },
              { step: '04', title: 'Continuous Management', sub: 'Optimize & Support', desc: 'Constant telemetry monitoring, patch management, SLA-based resolution, and continuous improvement.', icon: ShieldCheck, color: '#10B981' },
            ].map((step, i) => (
              <StaggerItem key={step.title} direction="up">
                <div className="relative text-center group">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                    style={{ border: `1px solid ${step.color}40`, boxShadow: `0 0 20px ${step.color}15` }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <div className="text-xs font-bold mb-1 tracking-wider" style={{ color: step.color }}>
                    STEP {step.step}
                  </div>
                  <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-gray-500">
                    {step.sub}
                  </div>
                  <h4 className="text-sm font-bold mb-2 text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-400">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Ready to Empower Your Digital Future?"
        description="Let's discuss how our solutions can simplify your operations and drive sustainable growth."
        primaryButtonText="Book Free Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="About Us"
        secondaryButtonLink="/about-us"
      />
    </div>
  );
}



