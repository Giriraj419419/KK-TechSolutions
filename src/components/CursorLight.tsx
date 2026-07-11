import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';

export default function CursorLight({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Transform mouse values (-0.5 to 0.5) to pixel/percent values based on window width/height could be complex.
  // Instead, assuming mouseX/Y are standardized or we can just translate a small percentage based on them.
  const xOffset = useTransform(smoothX, [-0.5, 0.5], ['-20%', '20%']);
  const yOffset = useTransform(smoothY, [-0.5, 0.5], ['-20%', '20%']);

  return (
    <motion.div
      style={{ x: xOffset, y: yOffset }}
      className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-400/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"
    />
  );
}
