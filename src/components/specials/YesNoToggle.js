"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function YesNoToggle() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNoInteraction = (e) => {
    // Prevent default to avoid double-triggering on mobile
    if (e) e.preventDefault();

    // Calculate a random jump range based on screen size
    const range = isMobile ? 150 : 300;
    const randomX = Math.random() * (range * 2) - range;
    const randomY = Math.random() * (range * 2) - range;
    
    setNoPos({ x: randomX, y: randomY });
    
    // Shrink the NO button
    setNoScale((prev) => Math.max(prev - 0.15, 0.2));
    
    // Make the YES button grow aggressively
    setYesScale((prev) => prev + 0.3);
  };

  if (accepted) {
    return (
      <motion.div 
        initial={{ scale: 0, rotate: -10 }} 
        animate={{ scale: 1, rotate: 0 }} 
        className="text-center px-4"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-[#9f1239] italic font-bold leading-tight">Excellent Choice! ❤️</h2>
        <p className="text-rose-500 mt-4 text-lg md:text-xl tracking-widest uppercase">Latoya + Bunny = Fluffle</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12 md:gap-16 py-10 md:py-20 w-full overflow-visible">
      <h2 className="text-3xl md:text-5xl font-serif text-[#9f1239] italic text-center px-6 leading-snug">
        You're officially stuck with Victor, right? 🙂
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative min-h-[350px] w-full items-center justify-center">
        {/* YES: The Growing Giant */}
        <motion.button 
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => setAccepted(true)}
          className="px-10 md:px-16 py-4 md:py-6 bg-[#9f1239] text-white rounded-full font-black shadow-[0_20px_60px_rgba(159,18,57,0.3)] hover:bg-rose-700 z-50 whitespace-nowrap text-lg md:text-xl relative"
        >
          YES, ABSOLUTELY
        </motion.button>
        
        {/* NO: The Shrinking Runner */}
        <motion.button
          animate={{ 
            x: noPos.x, 
            y: noPos.y, 
            scale: noScale,
            opacity: noScale < 0.3 ? 0.5 : 1 
          }}
          transition={{ type: "spring", stiffness: 600, damping: 12 }}
          onMouseEnter={!isMobile ? handleNoInteraction : undefined}
          onTouchStart={isMobile ? handleNoInteraction : undefined}
          onClick={handleNoInteraction}
          className="px-6 md:px-8 py-2 md:py-3 bg-white text-rose-300 rounded-full font-medium border border-rose-100 shadow-sm whitespace-nowrap text-sm md:text-base z-40 touch-none"
          style={{ 
            position: noPos.x === 0 && noPos.y === 0 ? 'relative' : 'absolute',
            pointerEvents: noScale < 0.25 ? 'none' : 'auto'
          }}
        >
          No {noScale < 0.6 ? "?" : ""}
        </motion.button>
      </div>

      {yesScale > 1.8 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#9f1239] font-bold animate-bounce tracking-tighter text-center px-4"
        >
          The "YES" is getting hard to miss, just get over with it BUNNY! 🥱
        </motion.p>
      )}
    </div>
  );
}
