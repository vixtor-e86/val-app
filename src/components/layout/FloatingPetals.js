"use client";
import { motion } from "framer-motion";

export default function FloatingPetals() {
  const flowers = ["🌹", "🌸", "🌷", "🌺", "🥀", "✨", "🍃", "🏵️"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(100)].map((_, i) => {
        const flower = flowers[i % flowers.length];
        const size = Math.random() * 20 + 10; 
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 20;
        const depth = Math.random(); 

        return (
          <motion.div
            key={i}
            initial={{ 
              y: -120, 
              x: `${startX}vw`, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{
              y: "115vh",
              x: `${startX + (Math.random() * 30 - 15)}vw`, 
              rotate: depth > 0.5 ? 720 : -720,
              opacity: [0, depth > 0.5 ? 0.5 : 0.2, 0], 
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
            className="absolute select-none"
            style={{ 
              fontSize: `${size}px`,
              zIndex: depth > 0.8 ? 20 : -1,
              filter: depth < 0.3 ? "blur(2px)" : "none",
            }}
          >
            {flower}
          </motion.div>
        );
      })}

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#9f1239]/5 via-transparent to-[#9f1239]/10 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#9f1239]/10 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#fb7185]/15 blur-[180px] rounded-full animate-pulse" />
    </div>
  );
}
