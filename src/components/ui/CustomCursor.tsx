"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredType, setHoveredType] = useState<"link" | "button" | "card" | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], .tech-icon-container, .reveal-card");
      if (clickable) {
        if (clickable.tagName === "A" || clickable.classList.contains("tech-icon-container")) {
          setHoveredType("link");
        } else if (clickable.classList.contains("reveal-card")) {
          setHoveredType("card");
        } else {
          setHoveredType("button");
        }
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-primary/60 rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoveredType === "link" ? 52 : hoveredType === "button" ? 48 : hoveredType === "card" ? 64 : 26,
          height: hoveredType === "link" ? 52 : hoveredType === "button" ? 48 : hoveredType === "card" ? 64 : 26,
          backgroundColor: hoveredType ? "rgba(155, 202, 255, 0.1)" : "rgba(155, 202, 255, 0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {hoveredType === "card" && (
          <span className="text-[8px] font-bold text-primary tracking-widest uppercase">View</span>
        )}
      </motion.div>
    </>
  );
}
