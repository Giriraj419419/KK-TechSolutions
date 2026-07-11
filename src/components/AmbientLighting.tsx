
export default function AmbientLighting() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top Left Azure Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen" />
      
      {/* Top Right Cyan Glow */}
      <div className="absolute top-[-5%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen" />
      
      {/* Bottom Ambient Fade */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[180px] mix-blend-screen" />

      {/* Light Beams */}
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-blue-400/[0.02] to-transparent origin-top skew-y-12 transform-gpu" />
      <div className="absolute top-0 right-0 w-full h-[70vh] bg-gradient-to-b from-cyan-400/[0.02] to-transparent origin-top -skew-y-12 transform-gpu" />
    </div>
  );
}
