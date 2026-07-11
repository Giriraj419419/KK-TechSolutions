import { motion, MotionValue, useTransform } from 'framer-motion';

export default function NetworkConnections({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div style={{ y: yOffset }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Layer 1 routing path */}
        <motion.path 
          d="M-200,300 Q400,200 800,400 T2000,200" 
          fill="none" 
          stroke="url(#net-grad)" 
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
        
        {/* Layer 2 routing path */}
        <motion.path 
          d="M-100,500 Q500,700 1000,300 T2000,500" 
          fill="none" 
          stroke="url(#net-grad)" 
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 8, ease: "easeInOut", delay: 2, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Pulsing Nodes */}
        <motion.circle cx="400" cy="200" r="3" fill="#22d3ee" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="1000" cy="300" r="4" fill="#3b82f6" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 4, delay: 1, repeat: Infinity }} />
      </svg>
    </motion.div>
  );
}
