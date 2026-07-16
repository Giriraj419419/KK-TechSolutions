import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export let isAppLoaded = false;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  // Phase 0: Network Formation (0-2000ms)
  // Phase 1: Logo Reveal & Orbit (2000ms-10000ms)
  // Phase 2: Energy Transition & Signature Exit (10000ms-12000ms)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 10000);
    const t3 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { isAppLoaded = true; }, 50);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#03070c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Premium Ambient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#03070c] to-[#03070c]" />

          {/* PHASE 1 & 3: Digital Network Formation & Technology Orbit */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 2 ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Subtle rotating network */}
            <motion.div 
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] absolute rounded-full border border-white/[0.02]"
              initial={{ rotate: 0, scale: 0.9 }}
              animate={{ rotate: 90, scale: 1 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute top-0 left-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-[1px] h-16 bg-gradient-to-t from-transparent via-cyan-500/40 to-transparent -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 h-[1px] w-16 bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent -translate-y-1/2" />
              
              {/* Orbiting Particles */}
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] -translate-x-1/2" />
            </motion.div>
          </motion.div>

          {/* PHASE 5: Energy Transition Wave */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-blue-500/20 blur-md"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 50, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 h-full">
            
            {/* PHASE 2: Logo Reveal & PHASE 6: Signature Exit */}
            <motion.div
              className="relative flex justify-center items-center h-24"
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={
                phase === 0 ? { opacity: 0, filter: 'blur(12px)' } :
                phase === 1 ? { opacity: 1, filter: 'blur(0px)', scale: 1 } :
                { opacity: 0, y: -150, scale: 1.05, filter: 'blur(6px) drop-shadow(0 0 30px rgba(59,130,246,1)) brightness(2)' }
              }
              transition={{ 
                duration: phase === 2 ? 1 : 2, 
                ease: phase === 2 ? [0.6, -0.05, 0.01, 0.99] : "easeOut" 
              }}
            >
              {/* Soft glow behind logo */}
              <div className="absolute inset-0 bg-blue-500/15 blur-[40px] rounded-full scale-150" />

              <img
                src="/kk-logo-transparent.png"
                alt="KK Tech Solutions"
                className="h-16 sm:h-20 w-auto object-contain relative z-10 will-change-transform"
              />
              
              {/* Cinematic Light Sweep */}
              {phase === 1 && (
                <motion.div
                  initial={{ x: '-150%', skewX: -20 }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 z-20 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                  style={{ mixBlendMode: 'overlay' }}
                />
              )}
            </motion.div>



          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
