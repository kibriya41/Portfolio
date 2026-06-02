"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useTimelineAnimation() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Growing line animation
      const line = timeline.querySelector(".timeline-grow-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: timeline,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      // Staggered timeline card entrance from alternating sides
      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        const side = item.getAttribute("data-side");
        const xVal = side === "left" ? -100 : 100;

        gsap.fromTo(
          item,
          { opacity: 0, x: xVal, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Pulse activation on timeline dots
        const dot = item.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.8, backgroundColor: "rgba(155, 202, 255, 0.2)" },
            {
              scale: 1.2,
              backgroundColor: "var(--primary-theme)",
              scrollTrigger: {
                trigger: dot,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return timelineRef;
}
