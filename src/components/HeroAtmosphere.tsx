import { motion } from 'framer-motion';

export default function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050A15]">
      {/* Deep cinematic fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B121F]/90 via-transparent to-[#050A15] z-10" />
      
      {/* Center soft blue bloom */}
      <motion.div 
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] max-w-[1400px] h-[800px] bg-blue-600/10 rounded-[100%] blur-[140px] z-0"
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
    </div>
  );
}
