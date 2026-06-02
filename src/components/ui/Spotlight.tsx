"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function Spotlight() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Define the background transform at the top of the component so hooks always run in the same order
  const radialBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(155, 202, 255, 0.08), transparent 80%)`
  );

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-20 dark:opacity-30"
      style={{
        background: radialBackground,
      }}
      animate={{
        background: `radial-gradient(600px circle at var(--x, 0)px var(--y, 0)px, rgba(155, 202, 255, 0.08), transparent 80%)`,
      }}
      onUpdate={() => {
        // Set styling dynamically
        const el = document.documentElement;
        el.style.setProperty("--x", `${mouseX.get()}`);
        el.style.setProperty("--y", `${mouseY.get()}`);
      }}
    />
  );
}
