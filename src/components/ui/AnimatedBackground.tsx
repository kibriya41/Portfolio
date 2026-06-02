"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background transition-colors duration-500">
      {/* Premium Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--outline-theme) 1px, transparent 1px),
            linear-gradient(to bottom, var(--outline-theme) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Aurora Blobs */}
      <div className="absolute inset-0 filter blur-[120px] opacity-40 dark:opacity-[0.35]">
        {/* Blob 1 - Top Left (Primary Theme Color) */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/30 to-tertiary/20"
        />

        {/* Blob 2 - Bottom Right (Secondary/Tertiary Theme Color) */}
        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-tertiary/20 to-secondary/30"
        />

        {/* Blob 3 - Middle (Subtle Accent Color) */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -40, 0],
            scale: [0.9, 1.1, 0.95, 0.9],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-primary/10 via-secondary/15 to-transparent"
        />
      </div>
    </div>
  );
}
