import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Partner {
  name: string;
  logo: string;
  desc: string;
  color: string;
  link: string;
}

export default function InteractivePartnerCard({ p, idx }: { p: Partner; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  
  // Interaction states
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Spring configurations for smooth, luxurious easing
  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Calculate 3D tilt (max 5 degrees)
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);
  
  // Parallax for inner contents
  const logoX = useTransform(springX, [0, 1], [-6, 6]);
  const logoY = useTransform(springY, [0, 1], [-6, 6]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Ambient motion
  const randomDelay = idx * 0.4;
  const floatY = [0, -6, 0];
  const floatScale = [1, 1.01, 1];
  const floatRotate = [0, 0.4, -0.4, 0];
  
  // Brand color mapping
  let glowStyle = {};
  const borderColor = 'rgba(255, 255, 255, 0.06)';
  let hoverBorderColor = 'rgba(255, 255, 255, 0.2)';
  const shadowColor = 'rgba(0,0,0,0.5)';
  let hoverShadowColor = 'rgba(255,255,255,0.05)';

  if (p.name.includes('Microsoft 365') || p.name === 'Microsoft') {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(0, 120, 212, 0.3) 0%, rgba(16, 124, 16, 0.2) 25%, rgba(255, 185, 0, 0.15) 50%, rgba(226, 56, 56, 0.1) 70%, transparent 85%)` };
    hoverBorderColor = 'rgba(0, 120, 212, 0.3)';
    hoverShadowColor = 'rgba(0, 120, 212, 0.2)';
  } else if (p.name.includes('Azure')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(0, 120, 212, 0.4), transparent 60%)` };
    hoverBorderColor = 'rgba(0, 120, 212, 0.3)';
    hoverShadowColor = 'rgba(0, 120, 212, 0.2)';
  } else if (p.name.includes('AWS')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(255, 153, 0, 0.35), transparent 60%)` };
    hoverBorderColor = 'rgba(255, 153, 0, 0.3)';
    hoverShadowColor = 'rgba(255, 153, 0, 0.2)';
  } else if (p.name.includes('Adobe')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.3), transparent 60%)` };
    hoverBorderColor = 'rgba(255, 0, 0, 0.25)';
    hoverShadowColor = 'rgba(255, 0, 0, 0.2)';
  } else if (p.name.includes('Autodesk')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(6, 150, 137, 0.35), transparent 60%)` };
    hoverBorderColor = 'rgba(6, 150, 137, 0.3)';
    hoverShadowColor = 'rgba(6, 150, 137, 0.2)';
  } else if (p.name.includes('GstarCAD')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(0, 153, 255, 0.35), transparent 60%)` };
    hoverBorderColor = 'rgba(0, 153, 255, 0.3)';
    hoverShadowColor = 'rgba(0, 153, 255, 0.2)';
  } else if (p.name.includes('ZWCAD')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(41, 107, 255, 0.35), transparent 60%)` };
    hoverBorderColor = 'rgba(41, 107, 255, 0.3)';
    hoverShadowColor = 'rgba(41, 107, 255, 0.2)';
  } else if (p.name.includes('Corel')) {
    glowStyle = { background: `radial-gradient(circle at 50% 0%, rgba(105, 105, 105, 0.35), transparent 60%)` };
    hoverBorderColor = 'rgba(150, 150, 150, 0.3)';
    hoverShadowColor = 'rgba(150, 150, 150, 0.2)';
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={handleMouseLeave}
      tabIndex={0}
      
      initial={{ y: 0, scale: 1, rotateZ: 0 }}
      animate={
        isHovered
          ? { y: -6, scale: isClicked ? 0.98 : 1.06, rotateZ: 0 }
          : { 
              y: floatY, 
              scale: floatScale, 
              rotateZ: floatRotate 
            }
      }
      transition={
        isHovered
          ? { type: 'spring', stiffness: 350, damping: 25 }
          : { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: randomDelay }
      }
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex flex-col h-full grow rounded-2xl cursor-pointer will-change-transform ${isHovered ? 'z-20' : 'z-10'}`}
    >
      {/* Dynamic Glass Container */}
      <div 
        className="premium-glass p-8 relative overflow-hidden flex flex-col h-full grow w-full transition-colors duration-500 rounded-2xl"
        style={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 25px -5px ${hoverShadowColor}`
            : `0 10px 30px -10px ${shadowColor}`,
          background: isHovered
            ? 'rgba(255, 255, 255, 0.04)'
            : 'rgba(255, 255, 255, 0.02)',
          border: isHovered
            ? `1px solid ${hoverBorderColor}`
            : `1px solid ${borderColor}`,
        }}
      >
        {/* Brand Glow Background */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{
            ...glowStyle,
            opacity: isHovered ? 0.6 : 0.15,
          }}
        />

        {/* Dynamic Light Reflection (Follows Mouse) */}
        <motion.div
          className="absolute -inset-[150%] z-10 pointer-events-none mix-blend-overlay"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            x: useTransform(springX, [0, 1], ['-35%', '35%']),
            y: useTransform(springY, [0, 1], ['-35%', '35%']),
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Ambient Sweep Reflection (Idle) */}
        {!isHovered && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 12 + randomDelay }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </div>
        )}

        <div className="relative z-20 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Logo with Parallax */}
          <motion.div 
            className="h-10 mb-6 flex items-center"
            style={{ x: isHovered ? logoX : 0, y: isHovered ? logoY : 0 }}
          >
            <img 
              src={p.logo} 
              alt={p.name} 
              className={`h-8 w-auto object-contain transition-all duration-300 ${['Autodesk Solutions', 'Autodesk', 'Adobe Solutions', 'Adobe', 'CorelDRAW Graphics'].includes(p.name) ? 'bg-white px-3 py-1.5 rounded-lg shadow-sm' : ''} ${isHovered ? 'brightness-110 drop-shadow-md' : 'brightness-90'}`} 
            />
          </motion.div>
          <h3 className="text-lg font-bold text-white mb-3 transition-colors duration-300">
            {p.name}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            {p.desc}
          </p>
          <div className="mt-auto pt-4">
            <Link to={p.link} className={`btn-secondary w-full text-center text-xs justify-center py-2.5 inline-block transition-all duration-300 ${isHovered ? 'bg-white/10 text-white' : ''}`}>
              Know More
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
