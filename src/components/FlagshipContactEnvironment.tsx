import { useScroll } from 'framer-motion';

import HeroAtmosphere from './HeroAtmosphere';
import BackgroundGrid from './BackgroundGrid';
import NetworkConnections from './NetworkConnections';
import TechShapes from './TechShapes';
import DigitalParticles from './DigitalParticles';
import FloatingOrbs from './FloatingOrbs';
import AmbientLighting from './AmbientLighting';
import GlassReflection from './GlassReflection';

export default function FlagshipContactEnvironment() {
  const { scrollYProgress } = useScroll();

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
    </div>
  );
}
