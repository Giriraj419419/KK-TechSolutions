import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';
import { LucideIcon } from 'lucide-react';

export interface EcosystemNode {
  brand?: string;
  fallbackIcon?: LucideIcon;
  label: string;
}

interface AnimatedEcosystemProps {
  centerBrand: string;
  centerColor: string; // Hex color WITHOUT # (e.g., '00a4ef')
  centerFallback?: LucideIcon;
  customCenterSvg?: React.ReactNode;
  nodes: EcosystemNode[];
  themeColorHex: string; // Full hex with # (e.g., '#2563EB')
  className?: string;
}

export function AnimatedEcosystem({ centerBrand, centerColor, centerFallback, customCenterSvg, nodes, themeColorHex, className = '' }: AnimatedEcosystemProps) {
  const [radius, setRadius] = useState(160);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(120);
      } else if (window.innerWidth < 1024) {
        setRadius(170);
      } else {
        setRadius(220);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const nodeCount = nodes.length;
  
  // Distribute nodes evenly
  const distributedNodes = nodes.map((node, i) => {
    const angle = (360 / nodeCount) * i;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { ...node, x, y, angle, delay: i * (1.5 / nodeCount) };
  });

  return (
    <div className={`relative w-full h-[500px] md:h-[650px] flex items-center justify-center max-w-2xl mx-auto ${className}`}>
      
      {/* Background Pulse Glow for Center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full blur-[3xl] md:blur-[4xl] animate-pulse z-0" 
        style={{ backgroundColor: `${themeColorHex}25` }} 
      />

      {/* SVG Connecting Lines with Pulses */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: 'translate(50%, 50%)', overflow: 'visible' }}>
        {distributedNodes.map((node, i) => (
          <g key={`line-${i}`}>
            {/* Base line */}
            <motion.line
              x1="0"
              y1="0"
              x2={node.x}
              y2={node.y}
              stroke={themeColorHex}
              strokeWidth="1.5"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: node.delay }}
            />
            {/* Data Transmission Pulse */}
            <motion.circle
              r="3"
              fill={themeColorHex}
              className="will-change-transform transform-gpu"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 2.5 + (i * 0.15),
                repeat: Infinity,
                ease: "linear",
                delay: node.delay
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ filter: `drop-shadow(0 0 6px ${themeColorHex})`, offsetPath: `path("M 0 0 L ${node.x} ${node.y}")` } as any}
            />
          </g>
        ))}
      </svg>

      {/* Center Hub */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] premium-glass border z-20 flex items-center justify-center shadow-2xl"
        style={{ borderColor: `${themeColorHex}50` }}
      >
        <BrandLogo 
          iconName={centerBrand} 
          color={centerColor} 
          fallbackIcon={centerFallback}
          customSvg={customCenterSvg}
          className="w-20 h-20 md:w-32 md:h-32 drop-shadow-2xl" 
          style={{ filter: `drop-shadow(0 0 25px ${themeColorHex}80)` }}
        />
      </motion.div>

      {/* Orbital Nodes */}
      {distributedNodes.map((node, idx) => (
        <motion.div
          key={`node-${idx}`}
          className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center z-30 group"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: node.x, y: node.y, opacity: 1 }}
          transition={{ duration: 1.2, delay: node.delay, type: 'spring', bounce: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3 + (idx % 2), ease: 'easeInOut', delay: node.delay }}
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.04] border border-white/10 premium-glass cursor-default transition-all duration-300 transform-gpu will-change-transform shadow-lg"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ '--hover-border': `${themeColorHex}90`, '--hover-bg': `${themeColorHex}20` } as any}
            whileHover={{ scale: 1.15, borderColor: 'var(--hover-border)', backgroundColor: 'var(--hover-bg)' }}
          >
            <BrandLogo 
              iconName={node.brand || ''} 
              fallbackIcon={node.fallbackIcon} 
              className="w-6 h-6 md:w-8 md:h-8 transition-all duration-300"
              style={{ color: themeColorHex }} 
            />
          </motion.div>
          <motion.span 
            className="mt-3 text-[9px] md:text-xs font-bold text-gray-300 uppercase tracking-wider bg-[#0B121F]/90 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 opacity-90 group-hover:opacity-100 group-hover:text-white group-hover:border-white/30 transition-all shadow-xl backdrop-blur-md"
            style={{ borderBottomColor: `${themeColorHex}80` }}
          >
            {node.label}
          </motion.span>
        </motion.div>
      ))}

    </div>
  );
}
