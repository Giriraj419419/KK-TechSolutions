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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      if (width < 640) {
        setRadius(110); // Mobile
      } else if (width < 768) {
        setRadius(130); // Tablet
      } else if (width < 1024) {
        setRadius(160); // Laptop
      } else if (width < 1280) {
        setRadius(190); // Desktop
      } else {
        setRadius(210); // Large Desktop
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Limit to 5 nodes on mobile to avoid overcrowding
  const activeNodes = isMobile ? nodes.slice(0, 5) : nodes;
  const nodeCount = activeNodes.length;
  
  // Distribute nodes evenly
  const distributedNodes = activeNodes.map((node, i) => {
    const angle = (360 / nodeCount) * i;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { ...node, x, y, angle, delay: i * (1.5 / nodeCount) };
  });

  return (
    <div className={`relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center max-w-4xl mx-auto ${className}`}>
      
      {/* Background Pulse Glow for Center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-[3xl] md:blur-[4xl] animate-pulse z-0 pointer-events-none" 
        style={{ backgroundColor: `${themeColorHex}25` }} 
      />

      {/* Rotating Orbit Container (Layer 2 & 3) */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {/* SVG Connecting Lines with Pulses */}
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(50%, 50%)', overflow: 'visible' }}>
          {distributedNodes.map((node, i) => (
            <g key={`line-${i}`}>
              {/* Solid Base Track */}
              <motion.line
                x1="0" y1="0" x2={node.x} y2={node.y}
                stroke={themeColorHex}
                strokeWidth="1"
                strokeOpacity="0.15"
              />
              {/* Glowing Dashed overlay */}
              <motion.line
                x1="0" y1="0" x2={node.x} y2={node.y}
                stroke={themeColorHex}
                strokeWidth="2"
                strokeOpacity="0.4"
                strokeDasharray="4 8"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1.5, delay: node.delay }}
                style={{ filter: `drop-shadow(0 0 4px ${themeColorHex})` }}
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
                style={{ filter: `drop-shadow(0 0 8px ${themeColorHex}) drop-shadow(0 0 12px ${themeColorHex})`, offsetPath: `path("M 0 0 L ${node.x} ${node.y}")` } as any}
              />
            </g>
          ))}
        </svg>

        {/* Orbital Nodes */}
        {distributedNodes.map((node, idx) => (
          <motion.div
            key={`node-${idx}`}
            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none"
            initial={{ x: '-50%', y: '-50%', opacity: 0, scale: 0 }}
            animate={{ x: `calc(-50% + ${node.x}px)`, y: `calc(-50% + ${node.y}px)`, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: node.delay, type: 'spring', bounce: 0.3 }}
          >
            {/* Counter-Rotate to keep content upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="flex flex-col items-center pointer-events-auto group"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 + (idx % 2), ease: 'easeInOut', delay: node.delay }}
                className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-[#0B121F]/80 border border-white/10 backdrop-blur-md cursor-pointer transition-all duration-300 transform-gpu will-change-transform shadow-lg relative overflow-hidden"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={{ '--hover-border': `${themeColorHex}90`, '--hover-bg': `${themeColorHex}20` } as any}
                whileHover={{ scale: 1.15, borderColor: 'var(--hover-border)', backgroundColor: 'var(--hover-bg)', boxShadow: `0 0 20px ${themeColorHex}40` }}
              >
                <BrandLogo 
                  iconName={node.brand || ''} 
                  fallbackIcon={node.fallbackIcon} 
                  className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 transition-all duration-300"
                  style={{ color: themeColorHex }} 
                />
              </motion.div>
              <motion.span 
                className="mt-3 text-[10px] md:text-sm font-bold text-gray-300 uppercase tracking-wider bg-[#0B121F]/90 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 opacity-90 group-hover:opacity-100 group-hover:text-white group-hover:border-white/30 transition-all shadow-xl backdrop-blur-md whitespace-nowrap"
                style={{ borderBottomColor: `${themeColorHex}80` }}
              >
                {node.label}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Center Hub (Dominant Brand Anchor - Layer 4) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.03, 1], opacity: 1 }}
        transition={{ 
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.8 }
        }}
        whileHover={{ scale: 1.08 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
      >
        <BrandLogo 
          iconName={centerBrand} 
          color={centerColor} 
          fallbackIcon={centerFallback}
          customSvg={customCenterSvg}
          className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] xl:w-[210px] xl:h-[210px] object-contain drop-shadow-2xl transition-all duration-500" 
          style={{ filter: `drop-shadow(0 0 30px ${themeColorHex}60)` }}
        />
      </motion.div>

    </div>
  );
}
