import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion';

// ============================================================
// COSMOS FIELD — Dark atmospheric background
// ============================================================
export function CosmosField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B121F]">
      {/* Subtle brand radial gradient from top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 140% 60% at 50% -10%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
        }}
      />
      {/* Dot grid pattern */}
      <div className="absolute inset-0 grid-bg" />
    </div>
  );
}

// ============================================================
// GLOWING ORBS — Slow drifting ambient lights
// ============================================================
export function GlowingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[55vw] h-[55vw] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 60, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-32 w-[45vw] h-[45vw] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}

// ============================================================
// SECTION GLOW — Configurable section ambient lights with Parallax
// ============================================================
export function SectionGlow({
  color = 'blue',
  position = 'top-right',
  opacity = 0.12,
  size = 400,
}: {
  color?: 'blue' | 'purple' | 'teal' | 'green' | 'orange' | 'red';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  opacity?: number;
  size?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  // Create a subtle parallax effect based on scroll position
  // When reduced motion is preferred, use a flat 0 array to disable movement
  const yOffset = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 150]);

  const colorHex = {
    blue: '#3B82F6',
    purple: '#7C3AED',
    teal: '#06B6D4',
    green: '#10B981',
    orange: '#F97316',
    red: '#EF4444',
  };

  const positionStyles = {
    'top-right': { top: 0, right: 0, x: '20%', y: '-20%' },
    'top-left': { top: 0, left: 0, x: '-20%', y: '-20%' },
    'bottom-right': { bottom: 0, right: 0, x: '20%', y: '20%' },
    'bottom-left': { bottom: 0, left: 0, x: '-20%', y: '20%' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  return (
    <motion.div
      className="absolute pointer-events-none select-none rounded-full blur-[60px] z-0"
      style={{
        width: size,
        height: size,
        backgroundColor: colorHex[color],
        opacity: opacity,
        y: yOffset,
        z: 0,
        willChange: 'transform',
        ...positionStyles[position],
      }}
    />
  );
}

// ============================================================
// FLOATING ELEMENT — Continuous ambient motion for floating UI
// ============================================================
export function FloatingElement({ children, className = '', delay = 0, duration = 6 }: { children: ReactNode, className?: string, delay?: number, duration?: number }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// FLOATING CLOUD — Premium 3D-styled animated cloud SVG visual
// ============================================================
export function FloatingCloud({ className = '' }: { className?: string }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Decorative ambient glows behind cloud */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[40px] z-0" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-[30px] z-0" />
      
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          shapeRendering: 'geometricPrecision',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <defs>
          <linearGradient id="cloudGrad" x1="100" y1="100" x2="700" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Tech network connections */}
        <g opacity="0.3">
          <line x1="200" y1="300" x2="350" y2="150" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" />
          <line x1="350" y1="150" x2="500" y2="250" stroke="#06B6D4" strokeWidth="2" />
          <line x1="500" y1="250" x2="600" y2="400" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="350" cy="150" r="4" fill="#3B82F6" />
          <circle cx="500" cy="250" r="6" fill="#06B6D4" />
        </g>

        {/* Main 3D Styled Cloud Shape */}
        <path
          d="M 550 450 
             A 120 120 0 0 0 630 250 
             A 140 140 0 0 0 420 130 
             A 130 130 0 0 0 200 240 
             A 110 110 0 0 0 150 450 
             Z"
          fill="url(#cloudGrad)"
          style={{ filter: 'drop-shadow(0px 15px 25px rgba(6,182,212,0.25))' }}
        />

        {/* Glassmorphic border overlay */}
        <path
          d="M 540 430 
             A 100 100 0 0 0 610 260 
             A 120 120 0 0 0 420 150 
             A 110 110 0 0 0 220 250 
             A 90 90 0 0 0 170 430 
             Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
        />

        {/* Orbiting glowing data points */}
        <motion.circle
          cx="450"
          cy="280"
          r="8"
          fill="#FFFFFF"
          style={{ filter: 'drop-shadow(0 0 8px #06B6D4)' }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="300"
          cy="340"
          r="6"
          fill="#06B6D4"
          style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }}
          animate={{ scale: [1, 0.7, 1], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="520"
          cy="210"
          r="5"
          fill="#7C3AED"
          style={{ filter: 'drop-shadow(0 0 5px #7C3AED)' }}
          animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.svg>
    </div>
  );
}

// ============================================================
// TILT CARD — 3D parallax hover effect container
// ============================================================
export function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`premium-glass ${className}`}
    >
      <div style={{ transform: 'translateZ(6px)' }}>{children}</div>
    </motion.div>
  );
}
