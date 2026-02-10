"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Music, Gift } from "lucide-react";

// --- Components ---

const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random positions for the GIFs
  const gifPositions = useMemo(() => {
    if (!isMounted) return [];
    
    // Create multiple instances of each GIF scattered across the page
    const positions = [];
    const gifFiles = [
      '/pic/gif1.gif',
      '/pic/gif2.gif', 
      '/pic/gif3.gif',
      '/pic/gif4.gif',
      '/pic/gif5.gif'
    ];

    // Detect if mobile for different counts
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const gifCount = isMobile ? 10 : 20; // Less GIFs on mobile for performance

    // Create instances spread across the page (4 of each gif on desktop, 2 on mobile)
    for (let i = 0; i < gifCount; i++) {
      positions.push({
        id: `gif-${i}`,
        src: gifFiles[i % 5], // Cycle through the 5 GIFs
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isMobile 
          ? Math.random() * 50 + 40  // Smaller on mobile: 40-90px
          : Math.random() * 80 + 60, // Desktop: 60-140px
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 20 + 15, // 15-35s
      });
    }

    return positions;
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      {gifPositions.map(gif => (
        <div
          key={gif.id}
          className="animated-gif-wrapper absolute"
          style={{
            left: `${gif.left}%`,
            top: `${gif.top}%`,
            width: `${gif.size}px`,
            height: `${gif.size}px`,
            animation: `float ${gif.animationDuration}s linear infinite`,
            animationDelay: `${gif.animationDelay}s`,
          }}
        >
          <img
            src={gif.src}
            alt=""
            className="w-full h-full object-contain gif-transparent"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 1, 14); // Month is 0-indexed, so 1 is Feb

      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 1, 14);
      }

      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Run immediately

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center md:justify-start gap-3 text-pink-900 mt-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-bold bg-white/70 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center shadow-sm border border-pink-100">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase mt-1 font-bold tracking-wider opacity-60">{unit}</div>
        </div>
      ))}
    </div>
  );
};

const LoveTree = () => {
  const [fallingHearts, setFallingHearts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate continuously falling hearts
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100, // Spread across entire width
        size: Math.random() * 12 + 8,
        duration: Math.random() * 6 + 8,
        delay: 0,
        swayAmount: Math.random() * 40 + 30, // More sway
      };

      setFallingHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setFallingHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, (newHeart.duration + 1) * 1000);
    }, 400); // Faster falling rate

    return () => clearInterval(interval);
  }, [isMounted]);

  // Generate static hearts for the tree canopy - FILLED heart shape
  const treeHearts = useMemo(() => {
    const hearts = [];
    const colors = ['#c9184a', '#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffc2d1'];
    
    // Detect mobile for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const outlineCount = isMobile ? 60 : 100;  // Fewer hearts on mobile
    const fillCount = isMobile ? 200 : 400;
    
    // Create multiple layers for a fuller heart
    // Layer 1: Outline hearts (for structure)
    for (let i = 0; i < outlineCount; i++) {
      const t = (i / outlineCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      hearts.push({
        id: `outline-${i}`,
        x: x,
        y: y,
        size: isMobile 
          ? Math.random() * 8 + 6   // Smaller on mobile: 6-14px
          : Math.random() * 12 + 8, // Desktop: 8-20px
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 4,
      });
    }
    
    // Layer 2: Fill the heart interior
    for (let i = 0; i < fillCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15; // Random distance from center
      
      const t = angle;
      const x = radius * Math.pow(Math.sin(t), 3);
      const y = -radius * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
      
      hearts.push({
        id: `fill-${i}`,
        x: x,
        y: y,
        size: isMobile 
          ? Math.random() * 7 + 5   // Smaller on mobile: 5-12px
          : Math.random() * 10 + 7, // Desktop: 7-17px
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 4,
      });
    }
    
    return hearts;
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
       {/* Container for tree - properly centered and responsive */}
       <div className="relative w-full max-w-[90vw] aspect-square md:w-[550px] md:h-[600px] flex items-center justify-center">
          
          {/* Tree canopy - positioned relative to container center */}
          <div className="tree-canopy absolute left-1/2 -translate-x-1/2 w-full max-w-[350px] aspect-square md:w-[500px] md:h-[500px]">
            {treeHearts.map(heart => {
              // Convert parametric coordinates to percentage positions
              // Scale down slightly on mobile to ensure it fits
              const isMobile = window.innerWidth < 768;
              const scale = isMobile ? 2.0 : 2.2;
              const leftPercent = 50 + (heart.x * scale);
              const topPercent = 50 + (heart.y * scale);
              
              return (
                <div
                  key={heart.id}
                  className="tree-heart absolute"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    width: `${heart.size}px`,
                    height: `${heart.size}px`,
                    backgroundColor: heart.color,
                    animationDelay: `${heart.animationDelay}s`,
                  }}
                />
              );
            })}
          </div>

       </div>

       {/* Falling hearts - now covering the whole page */}
       <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {fallingHearts.map(heart => (
            <div
              key={heart.id}
              className="falling-heart absolute top-[-50px] text-red-500"
              style={{
                left: `${heart.left}%`,
                fontSize: `${heart.size}px`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
                '--sway-amount': `${heart.swayAmount}px`,
              }}
            >
              ❤️
            </div>
          ))}
       </div>
    </div>
  );
};

export default function ValentineApp() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Background hearts
  const backgroundHearts = useMemo(() => {
    if (!isMounted) return [];
    // Detect mobile for different heart counts
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const heartCount = isMobile ? 15 : 30; // Fewer hearts on mobile
    
    return Array.from({ length: heartCount }, (_, i) => ({
      id: `bg-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: isMobile 
        ? Math.random() * 12 + 6  // Smaller on mobile: 6-18px
        : Math.random() * 15 + 8, // Desktop: 8-23px
      animationDelay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
    }));
  }, [isMounted]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = ["No", "Are you sure?", "Think again!", "Last chance!", "Don't break my heart ;("];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 overflow-hidden relative font-serif">
      {/* Animated GIF Background */}
      <AnimatedBackground />

      {/* Background Floating Hearts */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
            {backgroundHearts.map(heart => (
            <div
                key={heart.id}
                className="absolute text-pink-300/40 animate-[float_linear_infinite]"
                style={{
                    left: `${heart.left}%`,
                    top: `${heart.top}%`,
                    animationDelay: `${heart.animationDelay}s`,
                    animationDuration: `${heart.duration}s`,
                    fontSize: `${heart.size}px`
                }}
            >
                ❤️
            </div>
            ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!yesPressed ? (
          // --- QUESTION VIEW (Centered) ---
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4"
          >
             <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 text-center max-w-md w-full"
            >
              <div className="flex justify-center mb-6">
                <Heart className="w-24 h-24 text-pink-500 drop-shadow-md animate-bounce" fill="#ec4899" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
                Will you be my Valentine?
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                I would be the happiest person in the world! 🌹
              </p>
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-xl w-full"
                  onClick={handleYesClick}
                  style={{ fontSize: Math.min(noCount * 2 + 18, 30) }} 
                >
                  Yes! ❤️
                </motion.button>
                <motion.button
                  whileHover={{ x: Math.random() * 10 - 5 }}
                  className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors text-sm"
                  onClick={handleNoClick}
                >
                  {getNoButtonText()}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // --- SUCCESS VIEW (Split Screen) ---
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row w-full min-h-screen relative z-10"
          >
            {/* Left Content (Text & Controls) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:pl-20 md:pr-10 pt-20 md:pt-0 order-2 md:order-1 text-center md:text-left">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                  <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-6 drop-shadow-sm leading-tight">
                    For the Love of My Life ❤️
                  </h1>
                  
                  <div className="space-y-4 text-gray-700 text-lg md:text-xl font-medium mb-8 leading-relaxed">
                    <p>
                        If I could choose a safe place,<br className="hidden md:block"/> it would be by your side.
                    </p>
                    <p>
                        The more time I spend with you,<br className="hidden md:block"/> the more I love you.
                    </p>
                    <p className="font-bold text-pink-600 mt-4 text-2xl">— I Love You!</p>
                  </div>

                  <div className="mt-8 bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-pink-100 inline-block shadow-sm">
                     <p className="text-sm text-pink-800 font-bold uppercase tracking-wider mb-2">Countdown to Valentine's</p>
                     <CountdownTimer />
                  </div>

                  <div className="mt-10">
                     <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all text-lg flex items-center gap-3 mx-auto md:mx-0"
                        onClick={() => {
                            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
                            alert("🎁 Presents coming soon on the 14th! 🎁");
                        }}
                    >
                        <Gift className="w-6 h-6 animate-bounce" />
                        View Presents
                    </motion.button>
                  </div>
              </motion.div>
            </div>

            {/* Right Content (Love Tree) */}
            <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen flex items-center justify-center order-1 md:order-2">
                <LoveTree />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}