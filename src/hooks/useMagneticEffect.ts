"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useMagneticEffect(strength = 0.35) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onMouseMove = (e: Event) => {
      const { clientX, clientY } = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return ref;
}
