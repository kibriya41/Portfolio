"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function Counter({ endValue, duration = 2 }: { endValue: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, endValue, duration]);

  return <span ref={ref}>{count}</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={containerRef} className="mt-section-gap flex flex-col items-center w-full reveal-section" id="about">
      {/* Section heading */}
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface mb-2 text-center">
        About Me
      </h2>
      <p className="font-label-md text-label-md text-on-surface-variant mb-stack-lg uppercase tracking-wider text-center">
        My Introduction
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-gutter w-full max-w-4xl mx-auto">
        {/* Portrait */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 shrink-0 relative rounded-2xl overflow-hidden glass-card group mx-auto md:mx-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 transition-colors duration-300" />
          <Image
            alt="Professional Portrait"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/me.png"
            width={320}
            height={320}
          />
        </div>

        {/* Bio + stats */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow w-full">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-stack-sm mb-stack-lg w-full">
            <motion.div
              className="glass-card rounded-xl p-4 sm:p-stack-md flex flex-col items-center justify-center border border-primary/10 hover:border-primary/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="material-symbols-outlined text-primary mb-2 text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
              <h3 className="font-headline-md text-xl sm:text-headline-md text-on-surface">
                <Counter endValue={20} />+
              </h3>
              <p className="font-label-sm text-xs sm:text-label-sm text-on-surface-variant mt-1 font-semibold">Projects Completed</p>
            </motion.div>

            <motion.div
              className="glass-card rounded-xl p-4 sm:p-stack-md flex flex-col items-center justify-center border border-secondary/10 hover:border-secondary/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="material-symbols-outlined text-secondary mb-2 text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                support_agent
              </span>
              <h3 className="font-headline-md text-xl sm:text-headline-md text-on-surface">24/7</h3>
              <p className="font-label-sm text-xs sm:text-label-sm text-on-surface-variant mt-1 font-semibold">Online Support</p>
            </motion.div>
          </div>

          {/* Bio */}
          <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl">
            Proficient in React.js, Next.js and Node.js, I build scalable, high-performance applications. Skilled in Prisma, Socket.IO, and Kubernetes, with expertise in MongoDB. I deliver innovative real-time systems and impactful solutions.
          </p>

          <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-primary text-primary rounded-lg font-label-md text-sm sm:text-label-md hover:bg-primary/10 transition-colors cursor-pointer group">
            Download Resume
            <span className="material-symbols-outlined text-[18px] sm:text-[20px] transition-transform group-hover:translate-y-0.5">download</span>
          </button>
        </div>
      </div>
    </section>
  );
}
