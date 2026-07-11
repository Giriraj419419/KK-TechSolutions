import { Link } from 'react-router-dom';
import {
  Users, Target, Award, Shield,
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

const values = [
  { icon: Target, title: 'Excellence', desc: 'We deliver nothing but the best, ensuring every project exceeds expectations.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your success is our priority. We build solutions tailored to your unique needs.' },
  { icon: Shield, title: 'Integrity', desc: 'Transparency, honesty, and ethical practices form the foundation of our work.' },
  { icon: Globe, title: 'Innovation', desc: 'We constantly explore new technologies to keep you ahead of the curve.' },
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <CosmosField />
      <GlowingOrbs />

      {/* ===== HERO ===== */}
      <section className="relative z-10 pt-36 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <SectionGlow color="teal" position="bottom-right" opacity={0.15} size={500} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
          <Reveal direction="down">
            <Eyebrow>About KK Tech</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-white">
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

      {/* ===== STORY ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="blue" position="top-left" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal direction="right" className="order-2 lg:order-1">
                 <TiltCard className="p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none" />
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
                       <p className="text-gray-400 leading-relaxed mb-6">
                         At KK Tech, we believe that technology should be a catalyst for growth, not a barrier. 
                         Our mission is to bridge the gap between complex enterprise IT requirements and 
                         seamless, intuitive solutions.
                       </p>
                       <p className="text-gray-400 leading-relaxed mb-8">
                         We partner with organisations of all sizes to architect, deploy, and manage 
                         infrastructure that drives innovation and secures their competitive edge in a digital-first world.
                       </p>
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-400" />
                         </div>
                         <div>
                            <div className="text-sm font-bold text-white">Dedicated Team</div>
                            <div className="text-xs text-gray-500">Experts at your service</div>
                         </div>
                       </div>
                    </div>
                 </TiltCard>
              </Reveal>
              <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
                 <SectionTitle
                    eyebrow="Our Story"
                    title="Built on Trust and Technical Excellence"
                    sub="Since our inception, we have been driven by a singular focus: delivering measurable value through technology."
                 />
                 <StaggerContainer className="mt-8 space-y-4" staggerChildren={0.1}>
                    {[
                      'Strategic IT consulting and roadmapping',
                      'Enterprise-grade cloud architectures',
                      'Proactive 24/7 managed services',
                      'Commitment to continuous innovation'
                    ].map((pt, i) => (
                      <StaggerItem key={i} direction="left">
                        <div className="flex items-center gap-3 text-gray-300">
                           <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                             <Check className="w-3.5 h-3.5 text-cyan-400" />
                           </div>
                           <span className="text-sm font-medium">{pt}</span>
                        </div>
                      </StaggerItem>
                    ))}
                 </StaggerContainer>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-transparent">
        <SectionGlow color="purple" position="bottom-right" opacity={0.08} size={400} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            center
            eyebrow="Core Values"
            title="What Drives Us Forward"
            sub="The principles that guide our work, our partnerships, and our commitment to you."
          />
          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.08}>
            {values.map((v, i) => (
              <StaggerItem key={i} direction="up">
                <TiltCard className="p-7 text-center h-full flex flex-col items-center group relative overflow-hidden">
                  <div className="absolute -inset-px bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      <v.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">{v.title}</h3>
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
