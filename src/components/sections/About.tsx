"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

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
      
      // Easing out quadratic
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, endValue, duration]);

  return <span ref={ref}>{count}</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={containerRef} className="mt-section-gap flex flex-col items-center w-full reveal-section" id="about">
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">About Me</h2>
      <p className="font-label-md text-label-md text-on-surface-variant mb-stack-lg uppercase tracking-wider">My Introduction</p>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-gutter w-full max-w-4xl mx-auto">
        {/* Portrait container */}
        <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative rounded-2xl overflow-hidden glass-card group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 transition-colors duration-300"></div>
          <Image
            alt="Professional Portrait"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/me.png"
            width={320}
            height={320}
          />
        </div>

        {/* Bio text & interactive counters */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow">
          {/* Bento Stats counters */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-stack-sm mb-stack-lg w-full">
            {/* Stat Box 1 */}
            <motion.div
              className="glass-card rounded-xl p-stack-md flex flex-col items-center justify-center border border-primary/10 hover:border-primary/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="material-symbols-outlined text-primary mb-2 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                <Counter endValue={20} />+
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-semibold">Projects Completed</p>
            </motion.div>

            {/* Stat Box 2 */}
            <motion.div
              className="glass-card rounded-xl p-stack-md flex flex-col items-center justify-center border border-secondary/10 hover:border-secondary/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="material-symbols-outlined text-secondary mb-2 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                support_agent
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                24/7
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 font-semibold">Online Support</p>
            </motion.div>

            
          </div>

          {/* Description biography bio */}
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl">
            Proficient in React.js, Next.js and Node.js, I build scalable,  high-performance applications. Skilled in Prisma, Socket.IO, and Kubernetes, with expertise in MongoDB. I deliver innovative real-time systems and impactful solutions.
          </p>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary/10 transition-colors cursor-pointer group">
            Download Resume
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-y-0.5">download</span>
          </button>
        </div>
      </div>
    </section>
  );
}
