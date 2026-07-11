import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(hover: none) and (pointer: coarse)').matches : false
  );

  useEffect(() => {
    // Check if the device has a touch screen and no hover capability
    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Instant tracking for the inner dot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth lagging spring config for the outer ring (Premium Easing)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let clickTimeout: NodeJS.Timeout;
    let rafId: number;

    const moveCursor = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(clientX);
        cursorY.set(clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');
      
      setHovered(prev => prev !== !!isInteractive ? !!isInteractive : prev);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClicked(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600); // Wait for ripple animation to finish

      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => setClicked(false), 150);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      clearTimeout(clickTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide native cursor globally to ensure the custom one is the only one visible */}
      <style>
        {`
          * { cursor: none !important; }
        `}
      </style>
      
      {/* Outer Ring - Smooth Easing */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
          hovered 
            ? 'w-12 h-12 border-[#00C8FF]/50 bg-[#00C8FF]/5 shadow-[0_0_20px_rgba(0,200,255,0.2)]' 
            : 'w-7 h-7 border-white/30 bg-white/[0.01] shadow-[0_0_10px_rgba(255,255,255,0.05)]'
        }`} />
      </motion.div>

      {/* Inner Dot - Instant */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          scale: clicked ? 0.5 : hovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className={`w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
           hovered ? 'bg-[#00C8FF] shadow-[0_0_10px_rgba(0,200,255,0.8)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
        }`} />
      </motion.div>

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{ x: ripple.x, y: ripple.y }}
          >
             <div className="w-10 h-10 border-[1.5px] border-[#00C8FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,200,255,0.5)]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
