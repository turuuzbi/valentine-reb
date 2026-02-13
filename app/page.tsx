"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ValentinePage() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasDeclined, setHasDeclined] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleYes = () => {
    setHasAccepted(true);
    confetti({
      particleCount: 80, // Reduced for mobile performance
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff4d6d", "#ff8fa3", "#ffffff"],
    });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f172a]">
      {/* OPTIMIZED BACKGROUND: Static radial gradients are much faster than blurred moving divs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-rose-900/20 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-pink-900/10 blur-[80px]" />
      </div>

      {/* OPTIMIZED HEARTS: Reduced count and simplified animations */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${i * 20}%` }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            className="text-rose-500/30 text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!hasAccepted && !hasDeclined ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            /* Removed backdrop-blur-2xl to fix mobile lag */
            className="z-10 bg-slate-900/60 border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl text-center max-w-[90%] mx-4"
          >
            <div className="text-6xl mb-6">💌</div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
              Will you be my <br />
              <span className="text-rose-400">Valentine?</span>
            </h1>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleYes}
                className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-xl active:scale-95 transition-transform shadow-lg shadow-rose-500/20"
              >
                Yes, I'd love to!
              </button>

              <button
                onClick={() => setHasDeclined(true)}
                className="w-full py-4 bg-white/5 text-gray-400 border border-white/10 rounded-2xl font-semibold text-lg"
              >
                No, thank you
              </button>
            </div>
          </motion.div>
        ) : hasAccepted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center p-6"
          >
            <div className="text-7xl mb-6 animate-bounce">💖</div>
            <h2 className="text-4xl font-black text-white mb-2 uppercase">
              YIPPEEE!
            </h2>
            <p className="text-rose-200 text-lg uppercase tracking-widest">
              Lemme know, kaay
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="no"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center"
          >
            <div className="text-5xl mb-4">✨</div>
            <p className="text-white text-xl">No worries! Have a great day.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
