"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useRevealAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal sections
      const sections = container.querySelectorAll(".reveal-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. Stagger cards
      const cardGrids = container.querySelectorAll(".reveal-cards-container");
      cardGrids.forEach((grid) => {
        const cards = grid.querySelectorAll(".reveal-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
