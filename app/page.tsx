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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#c9184a", "#ff8fa3", "#ffffff"],
    });
  };

  if (!isMounted) return null;

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        // Static gradient background: High performance, zero lag.
        background: `radial-gradient(circle at 20% 20%, #1e1b4b 0%, #0f172a 100%)`,
      }}
    >
      {/* Subtle non-animated decorative glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!hasAccepted && !hasDeclined ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 bg-white/10 border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl text-center max-w-lg w-full"
          >
            <div className="text-7xl mb-8">💌</div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
              Will you be my <br />
              <span className="text-rose-400">Valentine?</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleYes}
                className="w-full sm:w-auto px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-lg shadow-rose-500/20"
              >
                Yes
              </button>

              <button
                onClick={() => setHasDeclined(true)}
                className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-2xl font-semibold text-lg transition-all active:scale-95"
              >
                No
              </button>
            </div>
          </motion.div>
        ) : hasAccepted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center"
          >
            <div className="text-8xl mb-6">💖</div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              YIIPPEEEE!
            </h2>
            <p className="text-rose-300 text-xl font-light tracking-widest uppercase">
              Lemme know, okey
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="declined"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center px-4"
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              No worries at all!
            </h2>
            <p className="text-gray-400 text-lg">
              Hope you have a great day regardless.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
