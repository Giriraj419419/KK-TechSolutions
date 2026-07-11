import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global state to sync initial homepage reveal with preloader exit
export let isAppLoaded = false;

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for exit animation to complete (approx 850ms) before marking as fully loaded
      setTimeout(() => { isAppLoaded = true; }, 850);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{
            opacity: [1, 1, 0],
            scale: [1, 0.96, 2.8],
            rotateX: [0, -2, 4],
            rotateZ: [0, -1, 2],
            filter: [
              'brightness(1) blur(0px)',
              'brightness(1.2) blur(1px) drop-shadow(0 0 10px rgba(59,130,246,0.3))',
              'brightness(2.5) blur(12px) drop-shadow(0 0 40px rgba(59,130,246,0))'
            ],
            transition: {
              duration: 0.85,
              times: [0, 0.3, 1], // 0.3 = 255ms (Phase 2 Energy Build-Up)
              ease: [
                [0.25, 0.1, 0.25, 1], // Smooth easeInOut for build-up
                [0.6, -0.05, 0.01, 0.99] // Dramatic cinematic pop-out
              ]
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0B121F' }} // Match the premium dark canvas
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/kk-logo-transparent.png"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md origin-center"
                alt="KK Tech Solutions"
              />
            </motion.div>

            {/* Progress bar */}
            <div
              className="w-48 h-0.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(37,99,235,0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#94A3B8' }}
            >
              Initializing...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
