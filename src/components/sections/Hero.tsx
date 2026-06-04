"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { motion } from "framer-motion";
import gsap from "gsap";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const profileContainerRef = useRef<HTMLDivElement | null>(null);
  const contactBtnRef = useMagneticEffect(0.3) as React.RefObject<HTMLAnchorElement | null>;

  const roles = ["Problem Solver", "Web Developer", "Web Designer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleTransitioning, setIsRoleTransitioning] = useState(false);

  // Rotate roles in the sub-headline
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRoleTransitioning(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsRoleTransitioning(false);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Trigger GSAP hero animations
  useHeroAnimation(sectionRef);

  useEffect(() => {
    const profile = profileContainerRef.current;
    if (!profile) return;

    // Interactive 3D tilt effect on profile image
    const onMouseMove = (e: MouseEvent) => {
      const rect = profile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
      const rotateY = ((x - centerX) / centerX) * 15;

      gsap.to(profile.querySelector(".profile-image-wrapper"), {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(profile.querySelector(".profile-image-wrapper"), {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    profile.addEventListener("mousemove", onMouseMove);
    profile.addEventListener("mouseleave", onMouseLeave);

    return () => {
      profile.removeEventListener("mousemove", onMouseMove);
      profile.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Split name characters for the blur-to-sharp GSAP anim
  const name = "Kibriya Amit";
  const nameChars = name.split("");

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row items-center justify-between gap-stack-lg min-h-[85vh] bg-radial-gradient rounded-3xl p-8 md:p-12 relative overflow-hidden reveal-section"
      id="home"
    >
      {/* Premium Floating Particles / Aurora Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/20 blur-[90px] bg-light-blob" />
        <div className="absolute bottom-[30%] right-[15%] w-96 h-96 rounded-full bg-tertiary/20 blur-[120px] bg-light-blob" />
        <div className="absolute bottom-[10%] left-[30%] w-80 h-80 rounded-full bg-secondary/15 blur-[100px] bg-light-blob" />
      </div>

      {/* Left Vertical Social Handle Sidebar (Desktop View) */}
      <div className="hidden md:flex flex-col items-center gap-5 mr-8 z-10 relative">
        <a
          href="https://github.com/kibriya41"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/kibriya-amit"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaLinkedin size={18} />
        </a>
        <a
          href="mailto:kibriyaamit17@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaEnvelope size={16} />
        </a>
        {/* Vertical glow divider connector */}
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-primary/50 to-transparent mt-2 shadow-[0_0_8px_var(--primary-theme)]" />
      </div>

      {/* Hero content details */}
      <div className="flex-1 flex flex-col items-start gap-stack-md z-10 relative">
        <p className="font-label-md text-primary tracking-widest uppercase">Hey, I'm</p>

        {/* Dynamic Name Reveal Animation */}
        <h1 className="font-headline-xl text-4xl md:text-6xl text-on-surface font-bold flex flex-wrap items-center">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="hero-name-char inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
          <motion.span
            className="inline-block cursor-pointer ml-3 text-3xl md:text-5xl"
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: [0, 45, -20, 45, 0] }}
          >
            👋
          </motion.span>
        </h1>

        <h2 className="font-headline-md text-headline-md text-on-surface-variant h-[36px] flex items-center">
          I am a&nbsp;
          <span
            className={`inline-block transition-all duration-500 transform ${
              isRoleTransitioning
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
            } text-primary font-semibold`}
          >
            {roles[roleIndex]}
          </span>
        </h2>

        {/* Staggered description line */}
        <div className="mt-4 flex flex-col gap-3 text-on-surface-variant font-body-lg">
          <p className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">rocket_launch</span>
            <span>Turning complex systems into beautiful, optimized user interfaces.</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-lg">bolt</span>
            <span>Always learning, constantly building, completely committed.</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-stack-lg flex gap-4">
          <a
            href="#contact"
            ref={contactBtnRef}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(155,202,255,0.4)] hover:shadow-[0_0_30px_rgba(155,202,255,0.6)] z-20 relative overflow-hidden group"
          >
            {/* Hover shine effect */}
            <span className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            Say Hello <span className="material-symbols-outlined text-sm">send</span>
          </a>
        </div>
      </div>

      {/* ── Orbital Animation Keyframes ─────────────────────── */}
      <style>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit-pulse { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.08); } }
        @keyframes particle-glow { 0%, 100% { opacity: 0.6; box-shadow: 0 0 6px 2px currentColor; } 50% { opacity: 1; box-shadow: 0 0 14px 5px currentColor; } }
        @keyframes aura-breathe { 0%, 100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.06); } }
        @keyframes dash-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .orbit-ring { animation: orbit-spin var(--orbit-duration, 20s) linear infinite; }
        .orbit-ring-reverse { animation: orbit-spin-reverse var(--orbit-duration, 25s) linear infinite; }
        .orbit-particle {
          position: absolute;
          width: var(--particle-size, 6px);
          height: var(--particle-size, 6px);
          border-radius: 50%;
          animation: particle-glow 2.5s ease-in-out infinite;
          animation-delay: var(--particle-delay, 0s);
        }
        .hero-aura {
          animation: aura-breathe 4s ease-in-out infinite;
        }
      `}</style>

      {/* Portrait Profile Area & Stats cards */}
      <div
        ref={profileContainerRef}
        className="flex-1 flex justify-center items-center relative z-10 mt-12 md:mt-0"
      >
        <div className="profile-image-wrapper relative flex items-center justify-center p-4">

          {/* ── Layer 1: Radial Aura Glow ───────────────────── */}
          <div
            className="hero-aura absolute rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              background: "radial-gradient(circle, rgba(155,202,255,0.18) 0%, rgba(155,202,255,0.05) 45%, transparent 70%)",
            }}
          />

          {/* ── Layer 2: Orbit Ring 1 — slow, large, dashed ── */}
          <div
            className="orbit-ring absolute pointer-events-none"
            style={{ "--orbit-duration": "28s", width: 380, height: 380 } as React.CSSProperties}
          >
            <svg viewBox="0 0 380 380" className="w-full h-full">
              <circle
                cx="190" cy="190" r="186"
                fill="none"
                stroke="rgba(155,202,255,0.12)"
                strokeWidth="1.5"
                strokeDasharray="12 18"
              />
            </svg>
          </div>

          {/* ── Layer 3: Orbit Ring 2 — medium, reverse ────── */}
          <div
            className="orbit-ring-reverse absolute pointer-events-none"
            style={{ "--orbit-duration": "22s", width: 340, height: 340 } as React.CSSProperties}
          >
            <svg viewBox="0 0 340 340" className="w-full h-full">
              <circle
                cx="170" cy="170" r="166"
                fill="none"
                stroke="rgba(163,205,218,0.10)"
                strokeWidth="1"
                strokeDasharray="8 24"
              />
            </svg>
          </div>

          {/* ── Layer 4: Orbit Ring 3 — fast, inner, solid ─── */}
          <div
            className="orbit-ring absolute pointer-events-none"
            style={{ "--orbit-duration": "16s", width: 310, height: 310 } as React.CSSProperties}
          >
            <svg viewBox="0 0 310 310" className="w-full h-full">
              <circle
                cx="155" cy="155" r="152"
                fill="none"
                stroke="rgba(155,202,255,0.07)"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* ── Layer 5: Gradient Arc Ring (conic gradient) ── */}
          <div
            className="orbit-ring absolute rounded-full pointer-events-none"
            style={{
              "--orbit-duration": "10s",
              width: 320,
              height: 320,
              background: "conic-gradient(from 0deg, transparent 0%, rgba(155,202,255,0.25) 15%, transparent 30%, transparent 100%)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
            } as React.CSSProperties}
          />

          {/* ── Layer 6: Orbiting Particles ─────────────────── */}
          {/* Each particle container spins; the dot is positioned at the edge */}
          {[
            { size: 380, dur: "28s", color: "#9bcaff", dotSize: 5, delay: "0s" },
            { size: 380, dur: "28s", color: "#a3cdda", dotSize: 4, delay: "1.2s" },
            { size: 340, dur: "22s", color: "#9bcaff", dotSize: 6, delay: "0.5s" },
            { size: 340, dur: "22s", color: "#eab308", dotSize: 4, delay: "2s" },
            { size: 310, dur: "16s", color: "#a855f7", dotSize: 5, delay: "0.8s" },
            { size: 310, dur: "16s", color: "#06b6d4", dotSize: 4, delay: "1.5s" },
            { size: 320, dur: "10s", color: "#ec4899", dotSize: 5, delay: "0.3s" },
            { size: 320, dur: "10s", color: "#f97316", dotSize: 3, delay: "2.5s" },
          ].map((p, i) => (
            <div
              key={`particle-${i}`}
              className={i % 2 === 0 ? "orbit-ring" : "orbit-ring-reverse"}
              style={{
                "--orbit-duration": p.dur,
                width: p.size,
                height: p.size,
                position: "absolute",
                pointerEvents: "none",
              } as React.CSSProperties}
            >
              <div
                className="orbit-particle"
                style={{
                  "--particle-size": `${p.dotSize}px`,
                  "--particle-delay": p.delay,
                  color: p.color,
                  backgroundColor: p.color,
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                } as React.CSSProperties}
              />
            </div>
          ))}

          {/* ── Layer 7: Subtle pulsing border ring ─────────── */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 296,
              height: 296,
              border: "2px solid rgba(155,202,255,0.08)",
              animation: "orbit-pulse 3s ease-in-out infinite",
            }}
          />

          {/* ── Profile Portrait ────────────────────────────── */}
          <Image
            alt="Professional portrait of Kibriya Amit"
            className="w-80 h-80 rounded-full object-cover z-10 border-4 border-primary/40 shadow-[0_0_40px_rgba(155,202,255,0.35)] transition-transform duration-300"
            src="/me1.png"
            width={288}
            height={288}
            priority
          />

          {/* Orbit glass bento items */}
          {/* Card 1: Problems Solved */}
          <div className="orbit-item absolute top-[-30px] right-[-20px] glass-card flex items-center gap-3 py-2 px-4 rounded-xl border border-primary/20 hover:scale-105 transition-all">
           
          </div>

          {/* Card 2: Finished Projects */}
          <div className="orbit-item absolute bottom-[30px] left-[-60px] glass-card flex items-center gap-3 py-2 px-4 rounded-xl border border-secondary/20 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-on-surface">20+</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Projects Done</span>
            </div>
          </div>

          {/* Card 3: Experience */}
          <div className="orbit-item absolute bottom-[-40px] right-[10px] glass-card flex items-center gap-3 py-2 px-4 rounded-xl border border-tertiary/20 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-on-surface">6 Months</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
