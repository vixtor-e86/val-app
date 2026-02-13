"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const target = new Date("February 14, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center font-serif">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-[#9f1239]/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 min-w-[65px] md:min-w-[90px] text-center border border-[#9f1239]/10 shadow-sm">
            <span className="text-3xl md:text-5xl font-bold text-[#9f1239]">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="uppercase text-[9px] md:text-[10px] tracking-[0.25em] mt-3 font-bold text-[#9f1239]/60">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
