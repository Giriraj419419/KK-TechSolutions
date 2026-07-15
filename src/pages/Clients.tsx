import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, Monitor, Factory, GraduationCap, HeartPulse, 
  ShoppingCart, Landmark, Truck, Signal, Rocket, Briefcase, 
  CheckCircle, ShieldCheck, Zap, Users, Headphones, Star 
} from 'lucide-react';
import { Reveal, Eyebrow, StaggerContainer, StaggerItem, TextReveal } from '../components/Section';
import { CosmosField, GlowingOrbs, TiltCard, SectionGlow } from '../components/Atmosphere';
import InteractivePartnerCard from '../components/InteractivePartnerCard';
import EnterpriseCTA from '../components/EnterpriseCTA';

const industries = [
  { icon: Monitor, name: 'Information Technology', desc: 'Secure, scalable IT infrastructure and cloud migrations.' },
  { icon: Factory, name: 'Manufacturing', desc: 'IoT integrations, automated workflows, and ERP solutions.' },
  { icon: GraduationCap, name: 'Education', desc: 'E-learning platforms, campus networking, and digital labs.' },
  { icon: HeartPulse, name: 'Healthcare', desc: 'HIPAA-compliant data systems and telemedicine tech.' },
  { icon: Landmark, name: 'Banking & Finance', desc: 'High-security transaction networks and fintech apps.' },
  { icon: ShoppingCart, name: 'Retail', desc: 'POS systems, e-commerce platforms, and inventory tech.' },
  { icon: Building2, name: 'Government', desc: 'Public sector digital transformation and data security.' },
  { icon: Truck, name: 'Logistics', desc: 'Supply chain tracking, fleet management, and routing.' },
  { icon: Signal, name: 'Telecommunications', desc: 'Network optimization and high-availability infrastructure.' },
  { icon: Rocket, name: 'Startups', desc: 'Agile MVP development and scalable tech architectures.' },
  { icon: Briefcase, name: 'Corporate Enterprises', desc: 'Enterprise software, remote work solutions, and compliance.' },
];

const metrics = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '100+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '24/7', label: 'Technical Support' },
];

const testimonials = [
  {
    client: 'Rajesh Patel',
    company: 'Nexus Manufacturing',
    industry: 'Manufacturing',
    feedback: 'KK Tech transformed our factory operations with their enterprise IT solutions. Our downtime has dropped by 40% since partnering with them.',
  },
  {
    client: 'Ananya Sharma',
    company: 'FinServe Global',
    industry: 'Banking & Finance',
    feedback: 'Security is our top priority. KK Tech delivered a rock-solid, compliant cloud infrastructure that perfectly matched our strict regulatory needs.',
  },
  {
    client: 'David Miller',
    company: 'EduTech Academy',
    industry: 'Education',
    feedback: 'The team successfully modernized our entire campus network, allowing seamless remote and in-person learning for over 10,000 students.',
  }
];

const whyChooseUs = [
  { icon: ShieldCheck, title: 'Certified Technology Experts', desc: 'Our engineers hold top-tier certifications from Microsoft, AWS, and Cisco.' },
  { icon: Zap, title: 'End-to-End IT Solutions', desc: 'From consulting and procurement to deployment and managed services.' },
  { icon: Users, title: 'Strategic Consulting', desc: 'We align your technology investments directly with your business growth goals.' },
  { icon: Headphones, title: 'Fast Response Support', desc: 'Guaranteed SLAs with our 24/7 proactive monitoring and helpdesk.' },
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
    name: 'Autodesk',
    logo: '/autodesk.svg',
    desc: 'Professional design, engineering, and architecture software for modern businesses.',
    color: 'purple',
    link: '#',
  },
];

// Trusted Clients Showcase Logos
const clientLogos = [
  { name: 'Microsoft', image: '/microsoft.svg' },
  { name: 'AWS', image: '/aws.svg' },
  { name: 'Azure', image: '/azure.svg' },
  { name: 'Dell', image: '/dell.svg' },
  { name: 'Lenovo', image: '/lenovo.svg' },
  { name: 'HPE', image: '/hp.svg' },
  { name: 'Cisco', image: '/cisco.svg' },
  { name: 'IBM', image: '/ibm.svg' },
];

export default function Clients() {
  return (
    <div className="relative min-h-[auto] lg:min-h-[75vh] bg-transparent">
      <CosmosField />
      <GlowingOrbs />

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 pt-32 pb-24 overflow-hidden min-h-[70vh] flex flex-col justify-center border-b border-white/5">
        <SectionGlow color="blue" position="top-left" opacity={0.15} size={600} />
        <SectionGlow color="teal" position="bottom-right" opacity={0.1} size={500} />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side content */}
            <div>
              <Reveal direction="down">
                <Eyebrow>Our Clients</Eyebrow>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.1] tracking-tight text-white mb-6">
                  <TextReveal text="Empowering Businesses Through" delay={0.15} />{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold block mt-2">
                    Trusted Technology
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  We partner with startups, SMEs, enterprises, educational institutions, healthcare organizations, and government sectors to deliver secure, scalable, and future-ready technology solutions.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.3} className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact-us" className="btn-primary">Partner With Us</Link>
              </Reveal>
            </div>

            {/* Right side floating graphics - Circular Orbit */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[350px] lg:min-h-[450px] h-auto">
              
              {/* Central glowing core */}
              <div className="absolute w-64 h-64 rounded-full border border-blue-500/20 bg-blue-500/5 animate-pulse" />
              <div className="absolute w-48 h-48 rounded-full border border-cyan-500/30 bg-cyan-500/10" style={{ animation: 'spin 20s linear infinite' }} />
              
              {/* KK Tech Logo in the center */}
              <div className="absolute z-10 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 premium-glass shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <img loading="lazy" decoding="async" src="/kk-logo-transparent.png" alt="KK Tech Solutions" className="h-8 sm:h-10 w-auto object-contain drop-shadow-md" />
              </div>

              {/* Orbiting Ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[380px] h-[380px] rounded-full border border-white/5"
              >
                {/* Enterprise Solutions Card (Top Left Orbit) */}
                <motion.div 
                  className="absolute top-[5%] left-[10%] -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="premium-glass p-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-2xl w-48 hover:border-blue-500/40 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Enterprise</div>
                      <div className="text-sm font-bold text-white">Solutions</div>
                    </div>
                  </div>
                </motion.div>

                {/* 100% Success Card (Bottom Left Orbit) */}
                <motion.div 
                  className="absolute bottom-[5%] left-[20%] -translate-x-1/2 translate-y-1/2"
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="premium-glass p-4 rounded-2xl flex items-center gap-3 border border-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] w-56 hover:border-green-500/40 hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] transition-all duration-300 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">100% Success</div>
                      <div className="text-sm font-bold text-white">Project Delivery</div>
                    </div>
                  </div>
                </motion.div>

                {/* Trusted By Card (Right Orbit) */}
                <motion.div 
                  className="absolute top-[40%] right-[-10%] translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="premium-glass p-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-2xl w-48 hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Trusted By</div>
                      <div className="text-sm font-bold text-white">100+ Clients</div>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SUCCESS METRICS ===== */}
      <section className="relative z-10 py-16 border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/5">
            {metrics.map((metric, idx) => (
              <StaggerItem key={idx} direction="up" className="text-center px-4">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                  {metric.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== TRUSTED CLIENTS SHOWCASE ===== */}
      <section className="relative z-10 py-24 overflow-hidden">
        <SectionGlow color="blue" position="center" opacity={0.05} size={800} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <Eyebrow>Our Partners</Eyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-400">We take pride in our long-term partnerships with some of the most innovative companies across various sectors.</p>
            </Reveal>
          </div>

          <div className="relative overflow-hidden w-full flex py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
            <div className="flex gap-4 shrink-0 px-2 w-max animate-marquee pause-on-hover will-change-transform transform-gpu motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <div key={idx} className="w-[180px] shrink-0">
                  <TiltCard className="p-6 h-32 flex flex-col items-center justify-center text-center premium-glass group cursor-pointer hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-2 shadow-lg">
                      <img loading="lazy" decoding="async" src={client.image} alt={client.name} className="w-6 h-6 object-contain" />
                    </div>
                    <div className="text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors">{client.name}</div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="relative z-10 py-24 bg-transparent border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Reveal direction="right">
                <Eyebrow>Industries</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-4">Tailored Solutions for Every Sector</h2>
                <p className="text-gray-400">Our deep domain expertise allows us to engineer specialized technology solutions that address the unique challenges of your specific industry.</p>
              </Reveal>
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <StaggerItem key={idx} direction="up">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{ind.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{ind.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CLIENT SUCCESS STORIES ===== */}
      <section className="relative z-10 py-24 overflow-hidden">
        <SectionGlow color="purple" position="top-right" opacity={0.08} size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <Eyebrow>Success Stories</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-6">Hear From Our Partners</h2>
            </Reveal>
          </div>

          <StaggerContainer className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <StaggerItem key={idx} direction="up">
                <TiltCard className="p-8 h-full flex flex-col premium-glass border border-white/5">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                    "{test.feedback}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {test.client.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{test.client}</div>
                      <div className="text-xs text-gray-400">{test.company} &bull; {test.industry}</div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative z-10 py-24 bg-transparent border-y border-white/5">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Reveal direction="up">
                <Eyebrow>Why KK Tech</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-6">The Enterprise Choice</h2>
              </Reveal>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {whyChooseUs.map((feature, idx) => (
                 <StaggerItem key={idx} direction="up">
                    <TiltCard className="p-6 h-full premium-glass group hover:border-blue-500/30 transition-all duration-300">
                       <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
                         <feature.icon className="w-6 h-6" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                       <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                    </TiltCard>
                 </StaggerItem>
               ))}
            </StaggerContainer>
         </div>
      </section>

      {/* ===== TRUSTED TECHNOLOGY ECOSYSTEM ===== */}
      <section className="relative z-10 py-24 overflow-hidden">
        <SectionGlow color="teal" position="center" opacity={0.05} size={800} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <Eyebrow>Technology Partners</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white mb-6">Our Technology Ecosystem</h2>
              <p className="text-gray-400">We leverage world-class platforms to build secure, scalable, and innovative solutions.</p>
            </Reveal>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {partnersList.map((p, idx) => (
              <div key={idx} className="w-[300px] sm:w-[320px] shrink-0 h-auto pb-8">
                <InteractivePartnerCard p={p} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="Let's Build Your Next Success Story Together."
        description="Partner with KK Tech Solutions for digital transformation, cloud migration, enterprise software, cybersecurity, and managed IT services."
        primaryButtonText="Contact Us"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Book Free Consultation"
        secondaryButtonLink="/contact-us"
      />

    </div>
  );
}





