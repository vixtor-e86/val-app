"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function PresentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 flex flex-col items-center justify-center p-6 text-center font-serif">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full"
      >
        <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" fill="#ec4899" />
        <h1 className="text-4xl font-bold text-pink-700 mb-6">Your Valentine Letter 💌</h1>
        
        <div className="text-gray-800 text-lg leading-relaxed space-y-4 text-left italic">
          <p>Cooking the letter here... 🍳🔥</p>
          {/* This is where you will put the long letter you are cooking! */}
        </div>

        <Link href="/">
          <button className="mt-10 text-pink-500 hover:text-pink-700 font-semibold flex items-center gap-2 mx-auto transition-all">
            ← Go back
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
