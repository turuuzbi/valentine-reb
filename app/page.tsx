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
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#c9184a", "#ff8fa3", "#800f2f"],
    });
  };

  const handleNo = () => {
    setHasDeclined(true);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f172a]">
      {/* --- ANIMATED GRADIENT MESH BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-rose-900/40 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-pink-800/30 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* --- FLOATING HEARTS LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.4, 0],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="text-rose-500/20 text-3xl"
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
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 bg-white/10 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl text-center max-w-lg mx-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-7xl mb-8 cursor-default"
            >
              💌
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
              Will you be my <br />
              <span className="text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.4)]">
                Valentine?
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(244, 63, 94, 0)",
                    "0px 0px 20px rgba(244, 63, 94, 0.4)",
                    "0px 0px 0px rgba(244, 63, 94, 0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={handleYes}
                className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xl transition-colors z-20 w-full sm:w-auto"
              >
                Yes
              </motion.button>

              {/* NO BUTTON (Static and Respectful) */}
              <motion.button
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                onClick={handleNo}
                className="px-10 py-4 bg-transparent text-gray-400 border border-white/10 rounded-2xl font-semibold text-xl backdrop-blur-sm transition-all w-full sm:w-auto"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        ) : hasAccepted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl mb-6"
            >
              💖
            </motion.div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              YIPPPEEE!!
            </h2>
            <p className="text-rose-200 text-xl font-light tracking-widest uppercase">
              I'll reach out to make a plan.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="declined"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center"
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              No worries at all!
            </h2>
            <p className="text-gray-400 text-lg">
              Hope you have a great day anyway.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
