import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export let isAppLoaded = false;

const LOADING_MESSAGES = [
  "Initializing Enterprise Solutions",
  "Connecting Cloud Infrastructure",
  "Preparing Technology Ecosystem",
  "Launching Digital Innovation"
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  const [isReturningVisitor] = useState(() => {
    try {
      const lastVisitStr = localStorage.getItem('kktech_last_visit_v2');
      const todayStr = new Date().toDateString();
      if (lastVisitStr === todayStr) return true;
      localStorage.setItem('kktech_last_visit_v2', todayStr);
      return false;
    } catch {
      return false;
    }
  });

  // Timings
  const FULL_DURATION = 3800;
  const RETURNING_DURATION = 1000;
  const EXIT_DURATION = 600;

  useEffect(() => {
    const totalDuration = isReturningVisitor ? RETURNING_DURATION : FULL_DURATION;
    
    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, totalDuration - EXIT_DURATION);

    // Completely unmount
    const unmountTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { isAppLoaded = true; }, 100);
    }, totalDuration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [isReturningVisitor]);

  // Message Rotation
  useEffect(() => {
    if (isReturningVisitor || isExiting) return;

    const intervalTime = (FULL_DURATION - EXIT_DURATION - 500) / LOADING_MESSAGES.length;
    
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) return prev + 1;
        return prev;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isReturningVisitor, isExiting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="premium-preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#03070c]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* SCENE 1 & 4: Dark Premium Environment & Technology Activation */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 1 }}
          >
            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-blue-600/5 rounded-full blur-[100px] transform-gpu" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-cyan-500/5 rounded-full blur-[80px] transform-gpu" />
            
            {/* Subtle Network Grid */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                transform: 'perspective(1000px) rotateX(60deg) scale(2) translateY(-100px)',
                transformOrigin: 'top center'
              }}
            />

            {/* Subtle Particles / Nodes */}
            <motion.div 
              className="absolute inset-0 mix-blend-screen opacity-30"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
            
            {/* SCENE 2: KK Tech Logo Reveal & SCENE 7: Completion Animation */}
            <motion.div
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={isExiting ? {
                scale: 1.1,
                y: -window.innerHeight,
                opacity: 0,
                filter: 'blur(5px)',
                transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } // Cinematic fast exit upward
              } : {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
              }}
            >
              {/* Logo Glow Behind */}
              <motion.div 
                className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full"
                animate={isExiting ? { opacity: 1, scale: 1.5 } : { opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              <img
                src="/kk-logo-transparent.png"
                alt="KK Tech Solutions"
                className="h-16 sm:h-24 w-auto object-contain relative z-10 will-change-transform"
              />
              
              {/* SCENE 3: Cinematic Light Sweep */}
              {!isExiting && (
                <motion.div
                  initial={{ x: '-150%', skewX: -20 }}
                  animate={{ x: '150%' }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut", 
                    delay: 0.5
                  }}
                  className="absolute inset-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                  style={{ mixBlendMode: 'overlay' }}
                />
              )}
            </motion.div>

            {/* SCENE 5 & 6 Container (Only show for first time visitors) */}
            {!isReturningVisitor && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="mt-12 flex flex-col items-center h-24"
              >
                {/* SCENE 5: Loading Text */}
                <div className="h-6 relative w-full flex justify-center items-center mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMessageIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute text-cyan-400/90 font-mono text-[10px] sm:text-xs tracking-widest uppercase"
                    >
                      {LOADING_MESSAGES[activeMessageIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* SCENE 6: Brand Statement */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                  className="text-center"
                >
                  <h1 className="text-white/60 font-light tracking-[0.2em] text-[10px] sm:text-[11px] uppercase">
                    Empowering Businesses Through Technology
                  </h1>
                </motion.div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
