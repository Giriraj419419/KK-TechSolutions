import { Link } from 'react-router-dom';
import {
  Target, Award, Shield,
  ArrowRight, CheckCircle2, Globe, Heart, Check, Building
} from 'lucide-react';
import { Reveal, SectionTitle, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, TiltCard, SectionGlow } from '../components/Atmosphere';
import EnterpriseCTA from '../components/EnterpriseCTA';

const stats = [
  { val: '10+', label: 'Years Experience', icon: Award },
  { val: '500+', label: 'Projects Delivered', icon: CheckCircle2 },
  { val: '50+', label: 'Enterprise Clients', icon: Building },
  { val: '24/7', label: 'Support Available', icon: Shield },
];


export default function About() {
  return (
    <div className="relative w-full max-w-full min-h-[auto] lg:min-h-[75vh] bg-transparent overflow-x-clip">
      <CosmosField />
      <GlowingOrbs />

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-12 overflow-hidden min-h-[80vh] sm:min-h-[85vh] lg:min-h-[75vh] flex items-center">
        <SectionGlow color="teal" position="bottom-right" opacity={0.15} size={500} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
          <Reveal direction="down">
            <Eyebrow>About KK Tech</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-5 text-2xl xs:text-3xl sm:text-4xl lg:text-[4rem] font-medium leading-[1.18] lg:leading-[1.08] tracking-tight text-white break-words">
              <TextReveal text="Innovating Your" delay={0.08} />{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                Digital Tomorrow
              </span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.14}>
            <p className="mt-5 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              We are a team of passionate technologists dedicated to empowering businesses
              through innovative, scalable, and secure IT solutions.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2} className="mt-8 flex flex-wrap justify-center gap-4">
             <Link to="/contact-us" className="btn-primary py-3 px-8 text-sm inline-flex items-center gap-2">
                Work With Us
                <ArrowRight className="w-4 h-4" />
             </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 py-16 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8" staggerChildren={0.08}>
            {stats.map((s, i) => (
              <StaggerItem key={i} direction="scale" className="text-center">
                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <div className="flex justify-center mb-4 text-cyan-400">
                     <s.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                    {s.val}
                  </div>
                  <div className="text-sm font-medium text-gray-400 tracking-wide">
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== WHAT IS KK TECH & WHY DOES IT MATTER ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-start">
              <Reveal direction="right">
                 <SectionTitle
                    eyebrow="What is KK Tech Solutions?"
                    title="An Enterprise Technology Integrator"
                    sub="We architect, deploy, and manage complex IT infrastructures for scaling businesses."
                 />
                 <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                   KK Tech Solutions is an Ahmedabad-based specialized technology consultancy. We don't just sell software; we design comprehensive technology ecosystems using products from Microsoft, AWS, and leading hardware vendors. 
                 </p>
                 <p className="mt-4 text-gray-400 leading-relaxed text-lg">
                   We act as an extension of your own IT department, ensuring your network, servers, and cloud environments operate securely and without interruption.
                 </p>
              </Reveal>
              
              <Reveal direction="left" delay={0.1}>
                 <TiltCard className="p-8 md:p-10 h-full flex flex-col justify-center relative overflow-hidden group border border-blue-500/20 bg-blue-500/[0.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-colors duration-300" />
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                           <Target className="w-5 h-5 text-blue-400" />
                         </div>
                         Why Does It Matter?
                       </h3>
                       <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                         In modern business, technology downtime directly equals lost revenue. Relying on fragmented systems or under-resourced IT staff exposes your company to critical security risks and operational bottlenecks.
                       </p>
                       <p className="text-gray-400 leading-relaxed">
                         By partnering with KK Tech Solutions, you transform your IT infrastructure from a high-risk liability into a reliable engine for business growth, ensuring you can scale rapidly without technical debt.
                       </p>
                    </div>
                 </TiltCard>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ===== BENEFITS & FEATURES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-[#060A11]">
        <SectionGlow color="teal" position="bottom-right" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Benefits */}
            <div>
              <SectionTitle
                eyebrow="Business Outcomes"
                title="The Benefits You Experience"
                sub="How our solutions directly impact your bottom line and daily operations."
              />
              <StaggerContainer className="mt-10 space-y-4" staggerChildren={0.1}>
                {[
                  { title: 'Zero Unexpected Downtime', desc: 'Proactive monitoring catches critical issues before your team even notices them.' },
                  { title: 'Predictable IT Costs', desc: 'Eliminate surprise repair bills with structured, scalable infrastructure planning.' },
                  { title: 'Bulletproof Data Security', desc: 'Bank-grade compliance and automated backups protect you from ransomware and data loss.' },
                  { title: 'Frictionless Scaling', desc: 'Add new employees, offices, or software tools instantly without network overhauls.' }
                ].map((b, i) => (
                   <StaggerItem key={i} direction="left">
                     <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 flex items-center justify-center border border-teal-500/20 shrink-0">
                          <Check className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white mb-1">{b.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                        </div>
                     </div>
                   </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Features */}
            <div>
              <SectionTitle
                eyebrow="Technical Capabilities"
                title="Enterprise-Grade Features"
                sub="The robust technical foundations powering your new IT environment."
              />
              <StaggerContainer className="mt-10 space-y-4" staggerChildren={0.1}>
                {[
                  { title: 'Automated CI/CD Pipelines', desc: 'Streamline your development deployments with zero downtime.' },
                  { title: 'High-Availability Server Clusters', desc: 'Redundant local and cloud servers ensuring 99.99% uptime SLAs.' },
                  { title: 'Identity & Access Management (IAM)', desc: 'Granular security controls using Microsoft Entra ID (Azure AD).' },
                  { title: 'Advanced Threat Protection (ATP)', desc: 'Real-time AI-driven monitoring for immediate threat isolation.' }
                ].map((f, i) => (
                   <StaggerItem key={i} direction="right">
                     <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                          <Globe className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white mb-1">{f.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                        </div>
                     </div>
                   </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
            
          </div>
        </div>
      </section>

      {/* ===== WHY KK TECH SOLUTIONS ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="purple" position="top-right" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="The Differentiator"
            title="Why Choose KK Tech Solutions?"
            sub="We don't just fix computers; we architect scalable enterprise systems."
          />
          <StaggerContainer className="mt-14 grid sm:grid-cols-3 gap-6" staggerChildren={0.08}>
            {[
              { icon: Shield, title: 'Certified Expertise', desc: 'Our architects hold advanced certifications from Microsoft, AWS, and Dell.' },
              { icon: Building, title: 'Vendor Agnostic', desc: 'We recommend the best technology for your specific use case, not just what earns the highest margin.' },
              { icon: Heart, title: 'Long-Term Partnership', desc: 'We invest time in understanding your business roadmap so your IT infrastructure scales with you.' },
            ].map((v, i) => (
              <StaggerItem key={i} direction="up">
                <TiltCard className="p-8 text-center h-full flex flex-col items-center group relative overflow-hidden bg-white/[0.02] border border-white/5">
                  <div className="absolute -inset-px bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                      <v.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{v.desc}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Ready to Transform Your Business?"
        description="Let's build something exceptional together. Reach out to our team of experts today."
        primaryButtonText="Get in Touch"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Our Services"
        secondaryButtonLink="/our-services"
      />
    </div>
  );
}




