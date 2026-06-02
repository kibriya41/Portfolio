"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Simulating cinematic loading sequence
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete();
        }, 300);
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050C1A] z-[9999] flex flex-col items-center justify-center">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />

      <div className="flex flex-col items-center gap-6 z-10">
        {/* Animated logo reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold font-headline-md tracking-wider text-primary flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-5xl">terminal</span>
          <span>DevPortfolio</span>
        </motion.div>

        {/* Cinematic progress text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          className="font-label-sm text-on-surface-variant uppercase tracking-widest text-sm"
        >
          Initializing Experience... {progress}%
        </motion.div>

        {/* Animated progress line container */}
        <div className="w-64 h-1 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
