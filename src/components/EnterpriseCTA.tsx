import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Cloud, Server, Users, Activity } from 'lucide-react';

interface EnterpriseCTAProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const trustBadges = [
  { icon: ShieldCheck, text: "Microsoft Solutions Partner" },
  { icon: Cloud, text: "AWS Expertise" },
  { icon: Users, text: "Certified Engineers" },
  { icon: Server, text: "Enterprise Support" },
  { icon: Activity, text: "99.9% SLA" }
];

const keywords = [
  'Cloud', 'Infrastructure', 'Enterprise', 'Solutions', 'Digital', 'Transformation', 
  'Business', 'Success', 'Future', 'Workflows', 'CAD', 'Licensing', 'Deployment', 
  'PowerEdge', 'ThinkSystem', 'ProLiant', 'AWS', 'Azure', 'Microsoft', 'Adobe', 
  'CorelDRAW', 'GstarCAD', 'ZWCAD', 'Dell', 'HP', 'Lenovo', 'HPE', '365'
];

export default function EnterpriseCTA({
  title,
  description,
  primaryButtonText = "Start a Project",
  primaryButtonLink = "/contact-us",
  secondaryButtonText,
  secondaryButtonLink
}: EnterpriseCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Intelligent Keyword Highlighter
  const highlightKeywords = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      const cleanWord = part.replace(/[^\w]/g, '');
      if (keywords.some(k => k.toLowerCase() === cleanWord.toLowerCase()) && cleanWord.length > 2) {
        return (
          <span 
            key={i} 
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-extrabold drop-shadow-sm"
            style={{ backgroundSize: '200% auto', animation: 'gradient 4s linear infinite' }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section ref={ref} className="relative z-10 py-24 lg:py-32 bg-transparent overflow-hidden border-t border-b border-white/5">
      {/* 1. Cinematic Layered Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Navy base */}
        <div className="absolute inset-0 bg-[#070b14]" />
        {/* Midnight Blue Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
        
        {/* Azure radial lighting & Center bloom */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/4 w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1),transparent_60%)] blur-[100px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/2 -right-1/4 w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_60%)] blur-[100px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)] blur-[80px]" />
      </div>

      {/* 2. Enterprise Grid & Digital Network */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />
        
        {/* Animated Network Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0 200 Q 300 150, 500 300 T 1000 200 T 1500 400" 
            fill="none" 
            stroke="url(#cta-grad1)" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <motion.path 
            d="M1500 100 Q 1200 300, 900 250 T 400 400 T 0 200" 
            fill="none" 
            stroke="url(#cta-grad2)" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 5, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="cta-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cta-grad2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group perspective-[1200px]"
        >
          {/* 3. Premium Glass Container */}
          <motion.div 
            whileHover={{ rotateX: 1, rotateY: -1, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),0_0_100px_rgba(37,99,235,0.15)] relative overflow-hidden bg-[#0a111a]/70 backdrop-blur-3xl"
          >
            {/* Inner Highlights */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),rgba(37,99,235,0.1),transparent_50%)]" />
            
            <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-16 relative z-10">
              
              {/* Left Content */}
              <div className="flex-1 text-center xl:text-left max-w-3xl">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
                >
                  {highlightKeywords(title)}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed font-light mx-auto xl:mx-0 max-w-2xl"
                >
                  {description}
                </motion.p>

                {/* 4. Enterprise Trust Indicators */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-10 flex flex-wrap items-center justify-center xl:justify-start gap-4 sm:gap-6"
                >
                  {trustBadges.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400 group/badge hover:text-white transition-colors duration-300 cursor-default">
                        <Icon className="w-4 h-4 text-blue-500 group-hover/badge:text-cyan-400 group-hover/badge:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
                        <span className="font-medium tracking-wide">{badge.text}</span>
                      </div>
                    )
                  })}
                </motion.div>
              </div>

              {/* 5. Flagship Button */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="shrink-0 flex flex-col sm:flex-row gap-5"
              >
                <Link 
                  to={primaryButtonLink} 
                  className="relative group/btn inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_40px_rgba(34,211,238,0.3)] transition-shadow duration-500"
                >
                  {/* Animated Border Gradient */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-70 group-hover/btn:opacity-100 transition-all duration-700 ease-linear" style={{ backgroundSize: '200% auto', animation: 'gradient 3s linear infinite' }} />
                  
                  {/* Button Inner */}
                  <span className="relative flex items-center justify-center gap-3 bg-[#0a111a] px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-300 group-hover/btn:bg-opacity-0">
                    <span className="relative z-10 text-white font-bold text-lg sm:text-xl tracking-wide">
                      {primaryButtonText}
                    </span>
                    <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover/btn:text-white group-hover/btn:translate-x-1.5 transition-all duration-300" />
                  </span>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Link>

                {secondaryButtonText && secondaryButtonLink && (
                  <Link 
                    to={secondaryButtonLink}
                    className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full text-white font-bold text-lg sm:text-xl tracking-wide border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all duration-300 shadow-lg"
                  >
                    {secondaryButtonText}
                  </Link>
                )}
              </motion.div>

            </div>

            {/* 6. Decorative Technology Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border border-white/5 rounded-full opacity-50 group-hover:rotate-90 transition-transform duration-[20s] ease-linear pointer-events-none" />
            <div className="absolute top-14 right-14 w-24 h-24 border border-dashed border-white/10 rounded-full opacity-30 group-hover:-rotate-90 transition-transform duration-[15s] ease-linear pointer-events-none" />
            
            <div className="absolute -bottom-10 left-10 w-48 h-48 border border-white/5 rounded-full opacity-30 group-hover:-rotate-90 transition-transform duration-[30s] ease-linear pointer-events-none" />
            
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,1)] animate-ping pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse pointer-events-none delay-700" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
