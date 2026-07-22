import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// ============================================================
// REVEAL — Directional Scroll-triggered animation
// ============================================================
type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.6,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion || direction === 'fade') return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: isSmallScreen ? 0 : -30, y: isSmallScreen ? 20 : 0 }, visible: { opacity: 1, x: 0, y: 0 } };
      case 'right': return { hidden: { opacity: 0, x: isSmallScreen ? 0 : 30, y: isSmallScreen ? 20 : 0 }, visible: { opacity: 1, x: 0, y: 0 } };
      case 'scale': return { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } };
      default: return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1], delay }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// STAGGER CONTAINER & ITEM — For lists and grids
// ============================================================
export function StaggerContainer({ children, className = '', delayChildren = 0, staggerChildren = 0.1 }: { children: ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      }
    }
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up' }: { children: ReactNode, className?: string, direction?: Direction }) {
  const shouldReduceMotion = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVariants = (): any => {
    if (shouldReduceMotion || direction === 'fade') return { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } } };
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
      case 'left': return { hidden: { opacity: 0, x: isSmallScreen ? 0 : -20, y: isSmallScreen ? 15 : 0 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
      case 'right': return { hidden: { opacity: 0, x: isSmallScreen ? 0 : 20, y: isSmallScreen ? 15 : 0 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
      case 'scale': return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };
      default: return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
    }
  };
  
  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// TEXT REVEAL — Word-by-word fade up for headings
// ============================================================
export function TextReveal({ text, className = '', delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.04, delayChildren: delay }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.5, ease: 'easeOut' } as any
    }
  };

  if (shouldReduceMotion) {
    return (
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className={className}>
        {text}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`inline-flex flex-wrap justify-start text-left ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="mr-2 inline-block transform-gpu will-change-transform">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}


// ============================================================
// EYEBROW — Pill badge label above section headings
// ============================================================
export function Eyebrow({ children, accent = 'blue' }: { children: ReactNode, accent?: 'blue' | 'orange' | 'teal' | 'purple' | 'green' }) {
  const badgeClass = `badge-${accent}`;
  
  const dotColor = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    teal: 'bg-teal-500',
    purple: 'bg-purple-500',
    green: 'bg-emerald-500',
  }[accent] || 'bg-blue-500';

  const dotShadow = {
    blue: 'rgba(59,130,246,0.5)',
    orange: 'rgba(249,115,22,0.5)',
    teal: 'rgba(20,184,166,0.5)',
    purple: 'rgba(168,85,247,0.5)',
    green: 'rgba(16,185,129,0.5)',
  }[accent] || 'rgba(59,130,246,0.5)';

  return (
    <span className={badgeClass}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} inline-block`}
        style={{ boxShadow: `0 0 5px ${dotShadow}` }}
      />
      {children}
    </span>
  );
}

// ============================================================
// SECTION TITLE — Standard section heading block
// ============================================================
export function SectionTitle({
  eyebrow,
  title,
  sub,
  center = false,
  delay = 0,
  accent = 'blue',
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
  delay?: number;
  accent?: 'blue' | 'orange' | 'teal' | 'purple' | 'green';
}) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal direction={center ? 'up' : 'left'} delay={delay}>
          <div className="mb-4">
            <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
          </div>
        </Reveal>
      )}
      <Reveal direction={center ? 'up' : 'left'} delay={delay + 0.05}>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.18] tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal direction={center ? 'up' : 'left'} delay={delay + 0.12}>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
