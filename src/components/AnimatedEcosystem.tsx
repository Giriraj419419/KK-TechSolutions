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
      setRadius(window.innerWidth < 768 ? 110 : 160);
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
    <div className={`relative w-full h-[500px] flex items-center justify-center max-w-md mx-auto ${className}`}>
      
      {/* Background Pulse Glow for Center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-2xl animate-pulse z-0" 
        style={{ backgroundColor: `${themeColorHex}20` }} 
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
              strokeOpacity="0.2"
              strokeDasharray="4 4"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: node.delay }}
            />
            {/* Data Transmission Pulse */}
            <motion.circle
              r="2.5"
              fill={themeColorHex}
              className="will-change-transform transform-gpu"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 2.5 + Math.random(),
                repeat: Infinity,
                ease: "linear",
                delay: node.delay
              }}
              style={{ filter: `drop-shadow(0 0 5px ${themeColorHex})`, offsetPath: `path("M 0 0 L ${node.x} ${node.y}")` } as any}
            />
          </g>
        ))}
      </svg>

      {/* Center Hub */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl premium-glass border z-20 flex items-center justify-center shadow-2xl"
        style={{ borderColor: `${themeColorHex}40` }}
      >
        <BrandLogo 
          iconName={centerBrand} 
          color={centerColor} 
          fallbackIcon={centerFallback}
          customSvg={customCenterSvg}
          className="w-16 h-16 drop-shadow-lg" 
          style={{ filter: `drop-shadow(0 0 15px ${themeColorHex}60)` }}
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
            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 premium-glass cursor-default transition-all duration-300 transform-gpu will-change-transform"
            style={{ '--hover-border': `${themeColorHex}80`, '--hover-bg': `${themeColorHex}15` } as any}
            whileHover={{ scale: 1.15, borderColor: 'var(--hover-border)', backgroundColor: 'var(--hover-bg)' }}
          >
            <BrandLogo 
              iconName={node.brand || ''} 
              fallbackIcon={node.fallbackIcon} 
              className="w-7 h-7 transition-all duration-300"
              style={{ color: themeColorHex }} 
            />
          </motion.div>
          <motion.span 
            className="mt-2.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider bg-[#0B121F]/90 px-2.5 py-1 rounded-full border border-white/5 opacity-80 group-hover:opacity-100 group-hover:text-white transition-all shadow-lg"
            style={{ borderBottomColor: `${themeColorHex}60` }}
          >
            {node.label}
          </motion.span>
        </motion.div>
      ))}

    </div>
  );
}
