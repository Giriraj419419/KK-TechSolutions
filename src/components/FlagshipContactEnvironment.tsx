import { useEffect } from 'react';
import { useScroll, useMotionValue } from 'framer-motion';

import HeroAtmosphere from './HeroAtmosphere';
import BackgroundGrid from './BackgroundGrid';
import NetworkConnections from './NetworkConnections';
import TechShapes from './TechShapes';
import DigitalParticles from './DigitalParticles';
import FloatingOrbs from './FloatingOrbs';
import AmbientLighting from './AmbientLighting';
import CursorLight from './CursorLight';
import GlassReflection from './GlassReflection';

export default function FlagshipContactEnvironment() {
  const { scrollYProgress } = useScroll();
  
  // Interactive Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050A15]">
      <HeroAtmosphere />
      <BackgroundGrid scrollYProgress={scrollYProgress} />
      <NetworkConnections scrollYProgress={scrollYProgress} />
      <FloatingOrbs />
      <AmbientLighting />
      <TechShapes />
      <DigitalParticles />
      <GlassReflection />
      <CursorLight mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
}
