import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// Global state to sync initial homepage reveal with preloader exit
export let isAppLoaded = false;

const STATUS_MESSAGES = [
  "Verifying Cloud Infrastructure",
  "Connecting Microsoft Services",
  "Establishing Azure Environment",
  "Synchronizing AWS Resources",
  "Loading Enterprise Solutions",
  "Preparing Digital Workspace",
  "Activating Technology Platform"
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [isReturningVisitor] = useState(() => {
    const lastVisitStr = localStorage.getItem('kktech_last_visit');
    const todayStr = new Date().toDateString();
    return lastVisitStr === todayStr;
  });
  const [progress, setProgress] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(-1);
  const [showLogo, setShowLogo] = useState(() => isReturningVisitor);

  useEffect(() => {
    const todayStr = new Date().toDateString();
    let duration = 6500; 
    
    if (isReturningVisitor) {
      duration = 1000; // 1 second shortened experience
    } else {
      localStorage.setItem('kktech_last_visit', todayStr);
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { isAppLoaded = true; }, 850);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isReturningVisitor]);

  // Progress and Message sequencing for full experience
  useEffect(() => {
    if (isReturningVisitor || !visible) return;

    const startTime = performance.now();
    const duration = 3500; // 3.5 seconds to fill ring and show messages
    let animationFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart)
      const easedProgress = 1 - Math.pow(1 - progressRatio, 4);
      setProgress(Math.round(easedProgress * 100));

      // Calculate which message should be active based on elapsed time
      const messageInterval = duration / STATUS_MESSAGES.length;
      const currentMessageIdx = Math.floor(elapsed / messageInterval);
      if (currentMessageIdx !== activeMessageIndex && currentMessageIdx < STATUS_MESSAGES.length) {
        setActiveMessageIndex(currentMessageIdx);
      }

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Show logo shortly after progress completes
        setTimeout(() => setShowLogo(true), 400);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReturningVisitor, visible, activeMessageIndex]);

  // Circle properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#070B14' }}
          exit={{
            opacity: 0,
            background: 'transparent',
            transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
          }}
        >
          {/* Phase 6: Enterprise Network Reveal */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: isReturningVisitor ? 0.3 : 2 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-600/10 rounded-full blur-[100px] transform-gpu" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-cyan-500/5 rounded-full blur-[80px] transform-gpu" />
            
            {/* Grid */}
            <motion.div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                transform: 'perspective(1000px) rotateX(60deg) scale(2) translateY(-100px)',
                transformOrigin: 'top center'
              }}
            />

            {/* Cloud Nodes */}
            <motion.div 
              className="absolute inset-0 opacity-40 mix-blend-screen"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent rotate-45" />
              <div className="absolute bottom-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent -rotate-45" />
              <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-2xl mx-auto px-4">
            
            <AnimatePresence mode="wait">
              {!showLogo && !isReturningVisitor ? (
                // Scene 1, 2, 3: Boot Sequence
                <motion.div
                  key="boot-sequence"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Scene 1: Header */}
                  <div className="text-center mb-10 space-y-2">
                    <motion.h1 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white font-bold tracking-[0.2em] text-sm uppercase"
                    >
                      KK TECH SOLUTIONS
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-blue-400/80 font-mono text-[10px] tracking-widest uppercase"
                    >
                      INITIALIZING ENTERPRISE ECOSYSTEM
                    </motion.p>
                  </div>

                  {/* Scene 3: Dynamic Progress Ring */}
                  <div className="relative flex items-center justify-center mb-12">
                    <svg width="140" height="140" className="transform -rotate-90">
                      {/* Background Track */}
                      <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                      />
                      {/* Progress Stroke */}
                      <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-100 ease-out"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.5))' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Percentage Text */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-white font-light text-2xl tracking-tighter">
                        {progress}
                        <span className="text-xs text-white/50 ml-0.5">%</span>
                      </span>
                    </div>
                  </div>

                  {/* Scene 2: Live Status Sequence */}
                  <div className="h-32 w-full max-w-sm relative flex flex-col items-start justify-start space-y-3 overflow-hidden mask-image-bottom">
                    {STATUS_MESSAGES.map((msg, idx) => {
                      const isActive = idx <= activeMessageIndex;
                      if (!isActive) return null;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-3 text-[11px] font-mono w-full"
                        >
                          <span className="text-green-400 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-gray-300 tracking-wider truncate">
                            {msg}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Scene 4 & 5: Logo Power-Up & Brand Statement
                <motion.div
                  key="logo-sequence"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  // Phase 7: Hero Transition
                  exit={{
                    y: -window.innerHeight / 2 + 32, // Navbar height offset
                    x: -window.innerWidth / 2 + 100, // Navbar margin offset
                    scale: 0.5,
                    opacity: 0,
                    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
                  }}
                  className="flex flex-col items-center w-full"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15, filter: 'blur(8px)' }}
                    animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden group w-full flex justify-center"
                  >
                    <img
                      src="/kk-logo-transparent.png"
                      alt="KK Tech Solutions"
                      className="h-20 sm:h-28 w-auto object-contain relative z-10 opacity-90 will-change-transform"
                    />
                    
                    {/* Cinematic Light Sweep */}
                    <motion.div
                      initial={{ x: '-150%', skewX: -20 }}
                      animate={{ x: '150%' }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeInOut", 
                        delay: isReturningVisitor ? 0.2 : 0.6 
                      }}
                      className="absolute inset-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: isReturningVisitor ? 0.4 : 1.2, ease: "easeOut" }}
                    className="mt-12 text-center"
                  >
                    <h1 className="text-white/80 font-light tracking-[0.25em] text-[10px] sm:text-xs uppercase">
                      Empowering Businesses Through Technology
                    </h1>
                    <h2 className="text-blue-400/90 font-medium tracking-[0.15em] text-[10px] sm:text-[11px] mt-2.5 uppercase">
                      Cloud <span className="mx-2 text-white/30">•</span> Infrastructure <span className="mx-2 text-white/30">•</span> Innovation
                    </h2>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

