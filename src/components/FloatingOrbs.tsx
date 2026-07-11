import { motion } from 'framer-motion';

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ y: [0, -60, 0], x: [0, 40, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-400/5 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 80, 0], x: [0, -50, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[5%] w-[50vw] max-w-[700px] h-[50vw] max-h-[700px] bg-gradient-to-bl from-indigo-500/10 to-blue-500/5 rounded-full blur-[140px]"
      />
    </div>
  );
}
