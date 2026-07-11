import { motion, MotionValue, useTransform } from 'framer-motion';

export default function BackgroundGrid({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.div style={{ y: yOffset }} className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_10%,#000_20%,transparent_100%)] transform-gpu" />
    </motion.div>
  );
}
