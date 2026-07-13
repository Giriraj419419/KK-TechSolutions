import React, { useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Layer 9: Multi-Depth Parallax (depth property added)
// Layer 1: Organic Floating (motion property added)
const PARTNERS = [
  { id: 'aws', name: 'AWS Cloud', icon: '/aws.svg', link: '/aws', color: 'rgba(255, 153, 0, 0.4)', size: '18%', x: 22, y: 22, motion: 'circular', depth: 1.2 },
  { id: 'microsoft', name: 'Microsoft', icon: '/microsoft.svg', link: '/microsoft-365', color: 'rgba(0, 120, 212, 0.4)', size: '24%', x: 50, y: 50, motion: 'vertical', depth: 1.5 },
  { id: 'azure', name: 'Microsoft Azure', icon: '/azure.svg', link: '/azure', color: 'rgba(0, 120, 212, 0.4)', size: '15%', x: 78, y: 22, motion: 'diagonal', depth: 0.8 },
  { id: 'adobe', name: 'Adobe', icon: '/adobe.svg', link: '/adobe', color: 'rgba(255, 0, 0, 0.4)', size: '15%', x: 26, y: 78, motion: 'circular', depth: 0.9 },
  { id: 'autodesk', name: 'Autodesk', icon: '/autodesk.svg', link: '/autodesk', color: 'rgba(6, 150, 137, 0.4)', size: '16%', x: 72, y: 78, motion: 'horizontal', depth: 1.1 },
  { id: 'corel', name: 'CorelDRAW Graphics', icon: '/corel.svg', link: '/coreldraw', color: 'rgba(150, 150, 150, 0.4)', size: '14%', x: 50, y: 15, motion: 'circular-reverse', depth: 1.0 },
  { id: 'gstarcad', name: 'GstarCAD Solutions', icon: '/gstarcad.svg', link: '/gstarcad', color: 'rgba(0, 153, 255, 0.4)', size: '14%', x: 12, y: 50, motion: 'diagonal-reverse', depth: 0.7 },
  { id: 'zwcad', name: 'ZWCAD Solutions', icon: '/zwcad.svg', link: '/zwcad', color: 'rgba(41, 107, 255, 0.4)', size: '14%', x: 88, y: 50, motion: 'vertical', depth: 1.3 }
];

const CONNECTIONS = [
  ['aws', 'microsoft'],
  ['azure', 'microsoft'],
  ['adobe', 'microsoft'],
  ['autodesk', 'microsoft'],
  ['aws', 'azure'],
  ['adobe', 'autodesk'],
  ['aws', 'adobe'],
  ['azure', 'autodesk'],
  ['corel', 'microsoft'],
  ['gstarcad', 'microsoft'],
  ['zwcad', 'microsoft'],
  ['aws', 'corel'],
  ['corel', 'azure'],
  ['aws', 'gstarcad'],
  ['gstarcad', 'adobe'],
  ['azure', 'zwcad'],
  ['zwcad', 'autodesk']
];

// Generates Layer 1 (Float), Layer 2 (Rotation), Layer 3 (Breathing), Layer 4 (Drift), and Layer 12 (Randomization)
function getIdleAnimation(motionType: string, index: number) {
  const baseOffset = 20 + (index % 3) * 15; // Increased: 20 to 50px movement for eye-catchy effect
  const r = 3 + (index % 2) * 2; // Increased: 3 to 5 deg rotation
  
  // Layer 3: Breathing Scale
  const scale = [1.0, 1.05, 1.0, 0.97, 1.0]; // Increased breathing amplitude
  
  // Layer 4: Intelligent Position Drift
  const driftX = (index % 2 === 0 ? 12 : -12); // Increased drift
  const driftY = (index % 3 === 0 ? 12 : -12);

  switch (motionType) {
    case 'circular':
      return {
        x: [0, baseOffset, baseOffset + driftX, -baseOffset, -(baseOffset - driftX), 0],
        y: [0, -baseOffset, baseOffset + driftY, baseOffset, -(baseOffset - driftY), 0],
        rotate: [0, r, 0, -r, 0],
        scale
      };
    case 'circular-reverse':
       return {
        x: [0, -baseOffset, -(baseOffset + driftX), baseOffset, baseOffset - driftX, 0],
        y: [0, -baseOffset, baseOffset + driftY, baseOffset, -(baseOffset - driftY), 0],
        rotate: [0, -r, 0, r, 0],
        scale
      };
    case 'diagonal':
      return {
        x: [0, baseOffset + driftX, 0, -baseOffset, 0],
        y: [0, baseOffset + driftY, 0, -baseOffset, 0],
        rotate: [0, r, 0, -r, 0],
        scale
      };
    case 'diagonal-reverse':
      return {
        x: [0, -baseOffset, 0, baseOffset + driftX, 0],
        y: [0, baseOffset, 0, -(baseOffset + driftY), 0],
        rotate: [0, -r, 0, r, 0],
        scale
      };
    case 'vertical':
      return {
        x: [0, driftX, 0, -driftX, 0],
        y: [0, -(baseOffset * 1.5), driftY, baseOffset * 1.5, 0],
        rotate: [0, r, -r, 0, 0],
        scale
      };
    case 'horizontal':
      return {
        x: [0, baseOffset * 1.5, driftX, -(baseOffset * 1.5), 0],
        y: [0, driftY, 0, -driftY, 0],
        rotate: [0, -r, r, 0, 0],
        scale
      };
    default:
      return {
        x: [0, baseOffset, -baseOffset, 0],
        y: [0, baseOffset, -baseOffset, 0],
        rotate: [0, r, -r, 0],
        scale
      };
  }
}

const TechConstellation = React.memo(({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  
  // Layer 9: Scroll Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div 
      ref={containerRef}
      className={`relative ${className} flex items-center justify-center perspective-[1000px]`}
      style={{ y: shouldReduceMotion ? 0 : scrollParallaxY }}
    >
      {/* Layer 8: Ambient Background Glow (expanding/contracting) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-4 sm:inset-10 rounded-full blur-[90px] bg-blue-500/15 transform-gpu will-change-transform"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-10 sm:inset-20 rounded-full blur-[70px] bg-purple-500/15 transform-gpu will-change-transform"
          animate={shouldReduceMotion ? {} : { scale: [1.15, 0.95, 1.15], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-20 sm:inset-32 rounded-full blur-[50px] bg-cyan-500/10 transform-gpu will-change-transform"
          animate={shouldReduceMotion ? {} : { scale: [0.9, 1.2, 0.9], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Layer 7: Dynamic Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
        </defs>
        {CONNECTIONS.map(([id1, id2], i) => {
          const p1 = PARTNERS.find(p => p.id === id1)!;
          const p2 = PARTNERS.find(p => p.id === id2)!;
          
          return (
            <motion.line
              key={i}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={shouldReduceMotion ? { opacity: 0.1, pathLength: 1 } : { 
                opacity: [0.05, 0.3, 0.05], 
                pathLength: 1,
                strokeDashoffset: [0, -100] // Flowing energy particles
              }}
              transition={{ 
                opacity: { duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" },
                strokeDashoffset: { duration: 25 + i * 2, repeat: Infinity, ease: "linear" }
              }}
            />
          )
        })}
      </svg>

      {/* Logos */}
      {PARTNERS.map((partner, i) => {
        const isOtherHovered = hoveredId !== null && hoveredId !== partner.id;
        
        // Push logic when another node is focused
        let pushX = 0;
        let pushY = 0;
        if (isOtherHovered && !shouldReduceMotion) {
          const hoveredPartner = PARTNERS.find(p => p.id === hoveredId);
          if (hoveredPartner) {
            const dx = partner.x - hoveredPartner.x;
            const dy = partner.y - hoveredPartner.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
              pushX = (dx / dist) * 20; 
              pushY = (dy / dist) * 20;
            }
          }
        }

        // Layer 12: Unique duration/delay randomization (Sped up for eye-catchy effect)
        const durationX = 12 + (i % 3) * 3; 
        const durationY = 14 + (i % 2) * 4;
        const durationRot = 10 + i * 2;
        const delay = i * -1.5; // Negative delay to desync immediately

        return (
          <TechPartnerItem
            key={partner.id}
            partner={partner}
            i={i}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            shouldReduceMotion={shouldReduceMotion}
            pushX={pushX}
            pushY={pushY}
            durationX={durationX}
            durationY={durationY}
            durationRot={durationRot}
            delay={delay}
            navigate={navigate}
          />
        );
      })}
    </motion.div>
  );
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TechPartnerItem = React.memo(({ partner, i, hoveredId, setHoveredId, shouldReduceMotion, pushX, pushY, durationX, durationY, durationRot, delay, navigate }: any) => {
  const idleAnim = useMemo(() => getIdleAnimation(partner.motion, i), [partner.motion, i]);
  const isHovered = hoveredId === partner.id;

        return (
          <motion.div
            key={partner.id}
            className="absolute z-10 flex items-center justify-center cursor-pointer will-change-transform transform-gpu focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
            style={{
              left: `${partner.x}%`,
              top: `${partner.y}%`,
              width: partner.size,
              height: partner.size,
              x: '-50%',
              y: '-50%',
            }}
            onMouseEnter={() => setHoveredId(partner.id)}
            onFocus={() => setHoveredId(partner.id)}
            onMouseLeave={() => setHoveredId(null)}
            onBlur={() => setHoveredId(null)}
            onClick={(e) => { e.stopPropagation(); navigate(partner.link); }}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${partner.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(partner.link);
              }
            }}
          >
            <motion.div
               className="relative w-full h-full flex items-center justify-center transform-gpu"
               initial={{ scale: 0, opacity: 0 }}
               animate={
                 shouldReduceMotion
                   ? {
                       scale: 1,
                       opacity: 1,
                       x: 0,
                       y: 0,
                       rotate: 0,
                       zIndex: isHovered ? 50 : 10,
                     }
                   : hoveredId
                   ? {
                       // Layer 6: Hover Focus Mode
                       scale: isHovered ? 1.25 : 0.94,
                       opacity: isHovered ? 1 : 0.4,
                       filter: isHovered ? 'blur(0px)' : 'blur(2px)',
                       x: isHovered ? 0 : pushX,
                       y: isHovered ? 0 : pushY,
                       zIndex: isHovered ? 50 : 10,
                       rotate: 0,
                       boxShadow: isHovered ? `0 25px 50px -12px ${partner.color}` : '0 4px 6px -1px rgba(0,0,0,0.1)',
                     }
                   : {
                       scale: idleAnim.scale,
                       opacity: 1,
                       filter: 'blur(0px)',
                       x: idleAnim.x,
                       y: idleAnim.y,
                       rotate: idleAnim.rotate,
                       zIndex: 10,
                       // Layer 11: Dynamic shadows (framer motion handles interpolation automatically)
                       boxShadow: ['0 10px 30px -10px rgba(0,0,0,0.2)', '0 15px 40px -5px rgba(0,0,0,0.4)', '0 10px 30px -10px rgba(0,0,0,0.2)'],
                     }
               }
               transition={
                 shouldReduceMotion
                   ? { duration: 0.3 }
                   : hoveredId 
                   ? { type: 'spring', damping: 25, stiffness: 200 }
                   : {
                       x: { duration: durationX, repeat: Infinity, ease: 'easeInOut', delay },
                       y: { duration: durationY, repeat: Infinity, ease: 'easeInOut', delay },
                       rotate: { duration: durationRot, repeat: Infinity, ease: 'easeInOut', delay },
                       scale: { duration: 10 + i, repeat: Infinity, ease: 'easeInOut', delay },
                       filter: { duration: 0.4 },
                       boxShadow: { duration: 8 + (i%3)*2, repeat: Infinity, ease: 'easeInOut' } 
                     }
               }
            >
              <div className={`relative w-full h-full rounded-[18px] flex items-center justify-center p-3 sm:p-4 lg:p-5
                 backdrop-blur-[16px] border overflow-hidden transition-colors duration-300
                 ${isHovered && !shouldReduceMotion ? 'bg-white/20 border-white/30' : 'bg-white/[0.04] border-white/[0.08]'}
              `}>
                 <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none" />
                 
                 {/* Layer 10: Glass Reflection */}
                 {!shouldReduceMotion && (
                   <motion.div 
                     className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-[0.08] mix-blend-overlay w-[200%] pointer-events-none"
                     animate={{ x: ['-100%', '100%'] }}
                     transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 15 + i * 3 }}
                   />
                 )}

                 <img loading="lazy" decoding="async" 
                   src={partner.icon} 
                   alt={partner.name}
                   className={`w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ${['Adobe', 'CorelDRAW Graphics'].includes(partner.name) ? 'bg-white/95 rounded-lg px-1.5 py-1.5' : ''}`}
                 />
              </div>
              
              <AnimatePresence>
                {isHovered && !shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute -bottom-12 whitespace-nowrap bg-black/90 backdrop-blur-xl border border-white/20 text-white text-[11px] px-4 py-2 rounded-full shadow-2xl pointer-events-none font-semibold tracking-wide z-50"
                  >
                    {partner.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
});

export default TechConstellation;

