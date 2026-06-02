"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function useHeroAnimation(triggerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      // 1. Name character stagger blur reveal
      const chars = trigger.querySelectorAll(".hero-name-char");
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0, filter: "blur(10px)", y: 20 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      }

      // 2. Floating elements in background
      const blobs = trigger.querySelectorAll(".bg-light-blob");
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          x: "random(-40, 40)",
          y: "random(-40, 40)",
          duration: index === 0 ? 8 : 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 3. Stats cards float
      const cards = trigger.querySelectorAll(".orbit-item");
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: "random(-10, 10)",
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, trigger);

    return () => ctx.revert();
  }, [triggerRef]);
}
