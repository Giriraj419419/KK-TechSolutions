import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * 5
}));

export default function DigitalParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            y: -150,
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
