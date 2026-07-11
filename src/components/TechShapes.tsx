import { motion } from 'framer-motion';

const SHAPES = [
  { size: 120, top: '15%', left: '10%', duration: 25, type: 'circle' },
  { size: 80, top: '40%', left: '85%', duration: 35, type: 'hexagon' },
  { size: 150, top: '65%', left: '15%', duration: 30, type: 'square' },
  { size: 90, top: '25%', left: '75%', duration: 20, type: 'circle' },
];

export default function TechShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/5 backdrop-blur-sm bg-white/[0.01]"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '15%' : '30%',
          }}
          animate={{
            y: [0, -30, 0],
            rotate: shape.type === 'circle' ? 0 : [0, 90, 180],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
