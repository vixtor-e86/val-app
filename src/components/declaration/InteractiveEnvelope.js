"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveEnvelope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: "1500px" }}
      >
        <div className="absolute -inset-10 bg-[#9f1239]/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <div className="relative w-[320px] sm:w-[450px] h-[200px] sm:h-[280px] bg-[#fdfaf7] rounded-b-lg shadow-[0_40px_100px_-20px_rgba(159,18,57,0.2)] border border-stone-200/50">
          
          <motion.div 
            initial={false}
            animate={{ 
              rotateX: isOpen ? 170 : 0, 
              zIndex: isOpen ? 0 : 40 
            }}
            transition={{ duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95] }}
            style={{ 
              transformOrigin: "top",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden"
            }}
            className="absolute top-0 left-0 w-full h-[120%] bg-[#fcf5f0] border-b border-stone-300/50 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.02)]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20" />
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 0, opacity: 0, scale: 0.95 }}
                animate={{ y: -200, opacity: 1, scale: 1 }}
                exit={{ y: 0, opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="absolute inset-x-2 sm:inset-x-4 top-4 bg-[#fffcf9] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm z-20 border border-stone-100"
                style={{ height: "400px", sm: { height: "550px" }, transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
                
                <div className="font-serif text-[#3a0313] leading-relaxed text-left overflow-y-auto h-full pr-4 select-none">
                  <h4 className="text-2xl sm:text-3xl mb-6 sm:mb-8 italic font-bold text-[#9f1239] border-b border-rose-100 pb-4">My Dearest Bunny,</h4>
                  
                  <div className="space-y-4 sm:space-y-6 text-[15px] sm:text-[17px] leading-[1.8] text-stone-800/90">
                    <p>
                      It’s hard to put into words what you mean to me. The fact that i'm bad in english makes it more difficult.
                    </p>
                    <p>
                      It’s been over a year since we met, and you’ve become the steady rhythm in my heartbeat and the calm in every storm. 
                      Looking back at everything we’ve shared, 
                      I realize how incredibly lucky I am to have you by my side. 
                      (i know all this scope no get lvl for ur side but lemme just be a gentleman)
                    </p>
                    <p className="italic font-semibold text-[#9f1239] text-lg">
                      "Without a shadow of a doubt, meeting you was the single best thing that happened to me last year."
                    </p>
                    <p>
                      "I’ll be honest—sometimes you can be a handful. Latoya can be a bit annoying (especially when she’s chasing me out of her room!), 
                      but Bunny? Bunny is perfect. I actually started writing this yesterday with a heavy heart because of you, 
                      but even when you're being 'Latoya,' I wouldn't trade you for anything. 
                      Thank you for all the love and support; I can’t wait to see what the future holds for us."
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-stone-100 flex flex-col items-end">
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#9f1239]/50">Forever & Always</span>
                    <span className="font-serif italic text-2xl mt-2 text-[#9f1239]">Yours truly</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 z-30 overflow-hidden rounded-b-lg pointer-events-none">
            <div 
              style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }}
              className="absolute inset-0 bg-[#f9f3ef] border-l border-stone-200/40 shadow-[10px_0_30px_rgba(0,0,0,0.03)]"
            />
            <div 
              style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
              className="absolute inset-0 bg-[#fdfaf7] border-r border-stone-200/40 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]"
            />
          </div>

          {!isOpen && (
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-16 sm:w-20 h-16 sm:h-20"
            >
              <div className="absolute inset-0 bg-[#8c1031] rounded-full blur-[1px] shadow-lg transform rotate-12 scale-110 opacity-90" />
              <div className="relative w-full h-full bg-gradient-to-br from-[#9f1239] to-[#7a0d2a] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),0_5px_15px_rgba(0,0,0,0.4)] border border-[#7a0d2a] flex items-center justify-center">
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border-2 border-[#be123c]/30 flex items-center justify-center shadow-inner">
                  <span className="text-2xl sm:text-4xl font-serif text-[#fdf2f8]/90 drop-shadow-md select-none">L</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <motion.p 
        animate={{ opacity: isOpen ? 0 : 0.4 }}
        className="mt-20 text-[#9f1239] font-medium tracking-[0.5em] text-[11px] uppercase animate-pulse"
      >
        Tap the seal to unwrap
      </motion.p>
    </div>
  );
}
