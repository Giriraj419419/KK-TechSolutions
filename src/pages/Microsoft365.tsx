import { Link } from 'react-router-dom';

import {
  Mail, Calendar, FileText, Users, Shield, Cloud,
  ArrowRight, MessageSquare, Video, HardDrive
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, TiltCard, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { AnimatedEcosystem } from '../components/AnimatedEcosystem';

const features = [
  { icon: Mail, title: 'Business Email', desc: 'Professional email with custom domains, large mailboxes, and advanced security.' },
  { icon: Calendar, title: 'Calendar & Scheduling', desc: 'Shared calendars and smart scheduling to keep teams aligned and productive.' },
  { icon: FileText, title: 'Documents & Files', desc: 'Word, Excel, PowerPoint, and OneDrive storage accessible from anywhere.' },
  { icon: Users, title: 'Collaboration', desc: 'Microsoft Teams for chat, meetings, and seamless teamwork across devices.' },
  { icon: Shield, title: 'Security & Compliance', desc: 'Enterprise-grade protection with advanced threat analytics and compliance tools.' },
  { icon: Cloud, title: 'Cloud Storage', desc: 'OneDrive for Business with scalable, secure cloud storage for your organisation.' },
];

const highlights = [
  { icon: Video, title: 'Meet & Collaborate', desc: 'Teams brings chat, meetings, and file collaboration together in one place.' },
  { icon: HardDrive, title: 'Store & Share', desc: 'OneDrive for Business offers secure, scalable cloud storage for your team.' },
  { icon: MessageSquare, title: 'Communicate', desc: 'Outlook and Exchange for professional, reliable enterprise email.' },
];

export default function Microsoft365() {
  return (
    <div className="relative min-h-screen bg-[#0B121F]">
      <CosmosField />
      <GlowingOrbs />

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-36 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <SectionGlow color="blue" position="bottom-right" opacity={0.15} size={500} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div className="space-y-8 relative z-10 text-left">
              <Reveal direction="down">
                <Eyebrow>Microsoft 365 Suite</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white">
                  <TextReveal text="Productivity &" delay={0.08} />{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                    Collaboration
                  </span>{' '}
                  in the Cloud
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.14}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Empower your organisation with Microsoft 365 â€” the complete productivity cloud
                  for modern enterprise teams.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2">
                    Get Microsoft 365
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/our-services" className="btn-secondary py-3 px-8 text-sm">
                    All Services
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Animated MS365 Ecosystem */}
            <Reveal direction="left" delay={0.12} className="relative z-10 flex justify-center w-full h-[500px]">
              <AnimatedEcosystem 
                centerBrand="microsoft"
                centerColor="00a4ef"
                themeColorHex="#2563EB"
                nodes={[
                  { brand: 'microsoftteams', label: 'Teams' },
                  { brand: 'microsoftoutlook', label: 'Outlook' },
                  { brand: 'microsoftonedrive', label: 'OneDrive' },
                  { brand: 'microsoftword', label: 'Word' },
                  { brand: 'microsoftexcel', label: 'Excel' },
                  { brand: 'microsoftpowerpoint', label: 'PowerPoint' },
                  { brand: 'microsoftsharepoint', label: 'SharePoint' }
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Suite Details"
            title="Everything Your Team Needs to Thrive"
            sub="A complete suite of productivity, communication, and security tools."
          />
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {features.map((feature) => (
              <StaggerItem key={feature.title} direction="up">
                <TiltCard className="p-8 h-full flex flex-col min-h-[240px] relative overflow-hidden group">
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                    <p className="text-sm leading-relaxed flex-1 text-gray-400">{feature.desc}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== HIGHLIGHTS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="purple" position="bottom-right" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Core Benefits"
            title="Why Microsoft 365 for Your Enterprise"
          />
          <StaggerContainer className="mt-12 grid lg:grid-cols-3 gap-6" staggerChildren={0.08}>
            {highlights.map((h, i) => (
              <StaggerItem key={i} direction="up">
                <TiltCard className="p-8 h-full flex gap-5 items-start group relative overflow-hidden">
                  <div className="absolute -inset-px bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex flex-row w-full gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      <h.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{h.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{h.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Ready to Empower Your Team with Microsoft 365?"
        description="Let our Microsoft-certified consultants help you deploy and optimise your M365 environment."
        primaryButtonText="Book Free Consultation"
        primaryButtonLink="/contact-us"
        secondaryButtonText="All Services"
        secondaryButtonLink="/our-services"
      />
    </div>
  );
}




