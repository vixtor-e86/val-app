"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function MysteryBox() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ["#9f1239", "#fb7185"] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ["#9f1239", "#fff1f2"] });
    }, 250);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="closed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
            onClick={handleOpen}
            className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group perspective-1000"
          >
            <div className="absolute -inset-8 bg-[#9f1239]/10 blur-[60px] rounded-full animate-pulse group-hover:bg-[#9f1239]/20 transition-colors" />

            <div className="relative w-full h-full bg-gradient-to-br from-[#9f1239] to-[#4c0519] rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-b-[12px] border-[#4c0519] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-y-0 w-12 bg-gradient-to-b from-[#fb7185] to-[#be123c] shadow-md" />
              <div className="absolute inset-x-0 h-12 bg-gradient-to-r from-[#fb7185] to-[#be123c] shadow-md" />
              
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="z-10 w-24 h-24 bg-[#fffafb] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#fb7185]"
              >
                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">🎁</span>
              </motion.div>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>

            <p className="absolute -bottom-16 w-full text-center text-[#9f1239] font-serif italic text-lg tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
              Tap to unwrap your surprise
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white/80 backdrop-blur-2xl p-12 rounded-[50px] border border-rose-100 text-center shadow-[0_40px_80px_rgba(159,18,57,0.15)] max-w-lg mx-auto"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.3, type: "spring" }}
              className="text-6xl mb-6"
            >
              🌹
            </motion.div>
            <h3 className="text-4xl font-serif text-[#9f1239] italic mb-4">A Special Present Awaits!</h3>
            <p className="text-rose-800/70 text-lg leading-relaxed font-light">
              I've planned something as beautiful as you are. 
              <br />
              <span className="font-semibold text-[#9f1239]">You won't be able to get it today.</span> Your Peanut ruined the surprise.
            </p>
            <div className="mt-8 w-20 h-[1px] bg-rose-200 mx-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
