"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Music, Gift, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Components ---

const NoOverlay = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (!isOpen) setStage(1);
  }, [isOpen]);

  const handleOkay = () => {
    if (stage === 1) {
      setStage(2);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-pink-100 max-w-sm w-full text-center relative"
          >
            <p className="text-gray-800 text-xl font-medium mb-8 leading-relaxed">
              {stage === 1 
                ? "So you dont want to be my valentine. I won't buy carrots for you 😒"
                : "Don't worry self i will ask mummy to be my valentine 🙂‍↔️️"}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOkay}
              className="bg-pink-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-colors text-lg"
            >
              Okay
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EarlyAccessOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-pink-100 max-w-sm w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-4 flex justify-center">
              <div className="bg-pink-100 p-4 rounded-full">
                <Gift className="w-10 h-10 text-pink-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-pink-700 mb-2">Nothing for you! 😂.</h2>
            <p className="text-gray-700 text-lg mb-6">
             Wait till 14th!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-pink-500 text-white font-bold py-2 px-8 rounded-full shadow-lg"
            >
              Okay, I'll wait
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const gifPositions = useMemo(() => {
    if (!isMounted) return [];
    
    const positions = [];
    const gifFiles = [
      '/pic/gif1.gif',
      '/pic/gif2.gif', 
      '/pic/gif3.gif',
      '/pic/gif4.gif',
      '/pic/gif5.gif'
    ];

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const gifCount = isMobile ? 10 : 20;

    for (let i = 0; i < gifCount; i++) {
      positions.push({
        id: `gif-${i}`,
        src: gifFiles[i % 5],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isMobile 
          ? Math.random() * 50 + 40
          : Math.random() * 80 + 60,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 20 + 15,
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
      let targetDate = new Date(currentYear, 1, 14);

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
    calculateTimeLeft();

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

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 6 + 8,
        delay: 0,
        swayAmount: Math.random() * 40 + 30,
      };

      setFallingHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setFallingHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, (newHeart.duration + 1) * 1000);
    }, 400);

    return () => clearInterval(interval);
  }, [isMounted]);

  const treeHearts = useMemo(() => {
    const hearts = [];
    const colors = ['#c9184a', '#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffc2d1'];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const outlineCount = isMobile ? 60 : 100;
    const fillCount = isMobile ? 200 : 400;
    
    for (let i = 0; i < outlineCount; i++) {
      const t = (i / outlineCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      hearts.push({
        id: `outline-${i}`,
        x: x,
        y: y,
        size: isMobile ? Math.random() * 8 + 6 : Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 4,
      });
    }
    
    for (let i = 0; i < fillCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15;
      const t = angle;
      const x = radius * Math.pow(Math.sin(t), 3);
      const y = -radius * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
      
      hearts.push({
        id: `fill-${i}`,
        x: x,
        y: y,
        size: isMobile ? Math.random() * 7 + 5 : Math.random() * 10 + 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 4,
      });
    }
    
    return hearts;
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
       <div className="relative w-full max-w-[90vw] aspect-square md:w-[550px] md:h-[600px] flex items-center justify-center">
          <div className="tree-canopy absolute left-1/2 -translate-x-1/2 w-full max-w-[350px] aspect-square md:w-[500px] md:h-[500px]">
            {treeHearts.map(heart => {
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

const BunnyQuoteCard = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const quotes = [
    "If lost, return to the nearest carrot patch. 🥕",
    "I came, I saw, I hopped away. 🐰",
    "Bunnies: proof that eating all day can still look cute.",
    "Hoppin’ through life one carrot at a time. ✨",
    "Latoya runs this house… I just pay the carrot bills.",
    "All hail Queen Latoya, ruler of the fluff kingdom. 👑",
    "Latoya’s daily routine: eat, hop, cause problems, nap.",
    "Latoya: small body, big attitude. 💪",
    "Respect the fluff. Her name is Latoya. 🐰",
    "Latoya’s cheeks enter the room before she does.",
    "Latoya doesn’t carry snacks—her cheeks do. 🍪",
    "Big cheeks, bigger personality. ✨",
    "Latoya’s cheeks got their own zip code. 📍",
    "Those cheeks? Fully loaded. 🥕",
    "No pockets needed when you’ve got cheeks like Latoya.",
    "Latoya didn’t gain weight… her cheeks just leveled up.",
    "If cuteness were currency, Latoya’s cheeks would make her a billionaire. 💰"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isMounted, quotes.length]);

  const nextQuote = () => setIndex((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-40 w-[95vw] sm:w-[90vw] max-w-md pointer-events-auto"
    >
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-pink-100 flex items-center justify-between gap-2 sm:gap-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            prevQuote();
          }}
          className="p-2 hover:bg-pink-100 rounded-full transition-colors text-pink-500 cursor-pointer active:scale-90"
        >
          <span className="block text-xl font-bold">←</span>
        </button>
        
        <div className="flex-1 text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-pink-800 font-medium italic text-xs sm:text-base leading-snug select-none"
            >
              {quotes[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            nextQuote();
          }}
          className="p-2 hover:bg-pink-100 rounded-full transition-colors text-pink-500 cursor-pointer active:scale-90"
        >
          <span className="block text-xl font-bold">→</span >
        </button>
      </div>
    </motion.div>
  );
};

export default function ValentineApp() {
  const router = useRouter();
  const [yesPressed, setYesPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNoOverlay, setShowNoOverlay] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundHearts = useMemo(() => {
    if (!isMounted) return [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const heartCount = isMobile ? 15 : 30;
    
    return Array.from({ length: heartCount }, (_, i) => ({
      id: `bg-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: isMobile 
        ? Math.random() * 12 + 6
        : Math.random() * 15 + 8,
      animationDelay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
    }));
  }, [isMounted]);

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });
  };

  const handleViewPresents = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 1, 14);
    if (now < target) {
      setShowOverlay(true);
    } else {
      router.push("/presents");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 overflow-hidden relative font-serif">
      <AnimatedBackground />
      <EarlyAccessOverlay isOpen={showOverlay} onClose={() => setShowOverlay(false)} />
      <NoOverlay isOpen={showNoOverlay} onClose={() => setShowNoOverlay(false)} />

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
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                  className="text-6xl mb-2"
                >
                  ❤️
                </motion.div>
                <div className="flex items-center justify-center">
                  <h2 className="text-5xl md:text-7xl font-black text-pink-600 drop-shadow-sm">Hi Bunny</h2>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-2 leading-tight">
                Will you be my valentine?
              </h1>
              
              <p className="text-gray-600 mb-8 text-sm sm:text-base italic px-2">
                Remember Bunnies don't break peoples heart, so... can i borrow you as my Valentine? 🥲
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all text-xl w-full sm:w-auto"
                  onClick={handleYesClick}
                >
                  Yes! ❤️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 text-gray-700 font-semibold py-3 px-10 rounded-full hover:bg-gray-300 transition-colors text-lg w-full sm:w-auto"
                  onClick={() => setShowNoOverlay(true)}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row w-full min-h-screen relative z-10"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:pl-20 md:pr-10 pt-20 md:pt-0 pb-28 md:pb-0 order-2 md:order-1 text-center md:text-left">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                  <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-6 drop-shadow-sm leading-tight">
                    For My Lovely Bunny ❤️
                  </h1>
                  
                  <div className="space-y-4 text-gray-700 text-lg md:text-xl font-medium mb-8 leading-relaxed">
                    <p>Valentine messages are still in the oven… 🥧</p>
                    <p>Please do not open before February 14 <br className="hidden md:block"/> (Even if i know you can't open it 🤭).</p>
                    <p>I know bunnies are not patient but you have to wait.</p>
                    <p>Good things (and sweet messages) are worth the wait. <br className="hidden md:block"/> Trust me. ✨</p>
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
                        onClick={handleViewPresents}
                    >
                        <Gift className="w-6 h-6 animate-bounce" />
                        View Presents
                    </motion.button>
                  </div>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen flex items-center justify-center order-1 md:order-2">
                <LoveTree />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BunnyQuoteCard />
    </div>
  );
}