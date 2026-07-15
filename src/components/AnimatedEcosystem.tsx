import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
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

// Magnetic Node Component
function MagneticNode({ 
  node, 
  x, 
  y, 
  themeColorHex, 
  delay 
}: { 
  node: EcosystemNode, 
  x: number, 
  y: number, 
  themeColorHex: string, 
  delay: number 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Limit the magnetic pull distance
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic strength
    mouseX.set(distanceX * 0.2);
    mouseY.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center z-20 pointer-events-none"
      initial={{ x: '-50%', y: '-50%', opacity: 0, scale: 0.8 }}
      animate={{ x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)`, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, type: 'spring', bounce: 0.4 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: smoothX, y: smoothY }}
        className="flex flex-col items-center pointer-events-auto group cursor-pointer relative"
      >
        {/* Subtle hover backdrop */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
          style={{ backgroundColor: `${themeColorHex}40` }}
        />
        
        <div
          className="p-3 md:p-4 rounded-xl bg-[#0B121F]/90 border border-white/10 backdrop-blur-xl transition-all duration-300 transform-gpu will-change-transform shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden group-hover:border-white/20 flex items-center justify-center"
          style={{ 
            boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.5)`
          }}
        >
           <BrandLogo 
            iconName={node.brand || ''} 
            color={node.brand ? 'default' : undefined}
            fallbackIcon={node.fallbackIcon} 
            className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-all duration-300 text-gray-400 group-hover:text-white flex items-center justify-center"
            style={{ color: node.brand ? undefined : 'currentColor' }} 
          />
        </div>
        
        {/* Label */}
        <span 
          className="mt-3 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest bg-[#0B121F]/80 px-3 py-1.5 rounded-full border border-white/5 opacity-80 group-hover:opacity-100 group-hover:text-white group-hover:border-white/20 transition-all shadow-lg backdrop-blur-md whitespace-nowrap"
        >
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function AnimatedEcosystem({ centerBrand, centerColor, centerFallback, customCenterSvg, nodes, themeColorHex, className = '' }: AnimatedEcosystemProps) {
  const [radius, setRadius] = useState(160);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      if (width < 640) {
        setRadius(130); // Mobile
      } else if (width < 768) {
        setRadius(160); // Tablet
      } else if (width < 1024) {
        setRadius(210); // Laptop
      } else if (width < 1280) {
        setRadius(250); // Desktop
      } else {
        setRadius(280); // Large Desktop
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Limit nodes on mobile for clarity
  const activeNodes = isMobile ? nodes.slice(0, 4) : nodes;
  const nodeCount = activeNodes.length;
  
  // Distribute nodes evenly in a circle (or semi-circle if preferred, but circle is solid)
  const distributedNodes = activeNodes.map((node, i) => {
    // Start from top (-90deg) and go clockwise
    const angle = (360 / nodeCount) * i - 90;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { ...node, x, y, angle, delay: i * 0.1 };
  });

  return (
    <div className={`relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] flex items-center justify-center max-w-5xl mx-auto ${className} overflow-visible`}>
      
      {/* Layer 1: Dynamic Energy Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Soft center ambient glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px] md:blur-[120px]"
          style={{ background: `radial-gradient(circle, ${themeColorHex}40 0%, transparent 70%)` }}
        />
        {/* Rotating gradient wave */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] opacity-20"
          style={{ background: `conic-gradient(from 0deg, transparent 0%, ${themeColorHex} 25%, transparent 50%, ${themeColorHex} 75%, transparent 100%)` }}
        />
      </div>

      {/* Layer 2 & 3: Digital Infrastructure Network & Data Streams */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(50%, 50%)', overflow: 'visible' }}>
          <defs>
            {/* Glow filter for data streams */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Gradient for connecting lines */}
            {distributedNodes.map((node, i) => (
              <linearGradient key={`grad-${i}`} id={`line-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={themeColorHex} stopOpacity="0.5" />
                <stop offset="100%" stopColor={themeColorHex} stopOpacity="0.05" />
              </linearGradient>
            ))}
          </defs>

          {distributedNodes.map((node, i) => (
            <g key={`connection-${i}`}>
              {/* Solid Base Connection */}
              <motion.line
                x1="0" y1="0" x2={node.x} y2={node.y}
                stroke={`url(#line-grad-${i})`}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: node.delay, ease: "easeOut" }}
              />
              
              {/* Intelligent Data Streams - Glowing dot moving along line */}
              <motion.circle
                r="3"
                fill="#ffffff"
                filter="url(#glow)"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.delay + ((i * 1.3) % 2) // Stagger data streams deterministically
                }}
                style={{ 
                  offsetPath: `path("M 0 0 L ${node.x} ${node.y}")`,
                  boxShadow: `0 0 10px ${themeColorHex}`
                } as React.CSSProperties}
              />
              {/* Reverse Data Stream */}
              <motion.circle
                r="2"
                fill={themeColorHex}
                filter="url(#glow)"
                initial={{ offsetDistance: "100%", opacity: 0 }}
                animate={{ offsetDistance: "0%", opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: node.delay + 1.5 + ((i * 1.7) % 2)
                }}
                style={{ 
                  offsetPath: `path("M 0 0 L ${node.x} ${node.y}")`
                } as React.CSSProperties}
              />
            </g>
          ))}
          
          {/* Inner Core Rings */}
          <motion.circle
            cx="0" cy="0" r={radius * 0.4}
            fill="none" stroke={themeColorHex} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '0 0' }}
          />
          <motion.circle
            cx="0" cy="0" r={radius * 0.7}
            fill="none" stroke={themeColorHex} strokeWidth="1" strokeOpacity="0.08"
          />
        </svg>

        {/* Nodes Layer */}
        {distributedNodes.map((node, idx) => (
          <MagneticNode 
            key={`node-${idx}`} 
            node={node} 
            x={node.x} 
            y={node.y} 
            themeColorHex={themeColorHex} 
            delay={node.delay + 0.5} 
          />
        ))}
      </div>

      {/* Layer 4: Interactive Brand Core */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.02, 1], opacity: 1 }}
        transition={{ 
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.8, ease: "easeOut" }
        }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center cursor-pointer group"
      >
        {/* Core Base / Pedestal */}
        <div className="absolute inset-0 rounded-3xl bg-[#0B121F] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_40px_rgba(0,0,0,0.5)] transform-gpu transition-all duration-300 group-hover:border-white/20" />
        
        {/* Core Glow */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-40 blur-xl transition-all duration-500 group-hover:opacity-70 group-hover:blur-2xl pointer-events-none"
          style={{ backgroundColor: themeColorHex }}
        />

        <div className="relative p-6 sm:p-8 md:p-10 flex items-center justify-center rounded-3xl backdrop-blur-2xl">
          <BrandLogo 
            iconName={centerBrand} 
            color={centerColor} 
            fallbackIcon={centerFallback}
            customSvg={customCenterSvg}
            className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] object-contain transition-all duration-500 z-10 filter drop-shadow-xl group-hover:drop-shadow-2xl" 
          />
        </div>
      </motion.div>

    </div>
  );
}
