"use client";
import { motion } from "framer-motion";
import FloatingPetals from "@/components/layout/FloatingPetals";
import InteractiveEnvelope from "@/components/declaration/InteractiveEnvelope";
import MysteryBox from "@/components/gift/MysteryBox";
import YesNoToggle from "@/components/specials/YesNoToggle";
import Link from "next/link";

export default function PresentsPage() {
  return (
    <main className="relative bg-[#fffafb] min-h-screen overflow-x-hidden selection:bg-rose-100">
      <FloatingPetals />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="bg-white/60 backdrop-blur-2xl border border-rose-100 shadow-[0_30px_100px_rgba(159,18,57,0.08)] rounded-[60px] p-8 md:p-12 text-center max-w-2xl w-full"
        >
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 4 }} className="text-rose-300 block mb-4 tracking-[0.5em] text-[10px] uppercase font-bold">Dedicated to my Baby</motion.span>
          
          <h1 className="text-6xl md:text-9xl font-serif text-[#9f1239] mb-4 italic tracking-tighter drop-shadow-sm">
            Bunny
          </h1>
          
          <p className="text-rose-400/80 font-light italic text-sm">
            "In a garden of fluffles, you are the only one worth the hop."
          </p>
        </motion.div>
      </section>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col items-center space-y-24 pb-32">
        
        {/* The Letter */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 w-full flex justify-center"
        >
          <InteractiveEnvelope />
        </motion.section>

        {/* The Gift */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 w-full flex justify-center"
        >
          <MysteryBox />
        </motion.section>

        {/* The Question */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 w-full flex justify-center"
        >
          <YesNoToggle />
        </motion.section>

      </div>

      <footer className="py-20 text-center relative z-10">
        <div className="w-12 h-[1px] bg-rose-200 mx-auto mb-6" />
        <p className="text-[#9f1239] font-serif italic text-lg opacity-80">
          Yours, today & always.
        </p>
        <Link href="/">
          <button className="mt-8 text-rose-400 hover:text-rose-600 text-sm font-medium transition-colors">
            ← Back to Home
          </button>
        </Link>
      </footer>
    </main>
  );
}
