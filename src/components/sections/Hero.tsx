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

  useHeroAnimation(sectionRef);

  useEffect(() => {
    const profile = profileContainerRef.current;
    if (!profile) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = profile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      gsap.to(profile.querySelector(".profile-image-wrapper"), {
        rotateX,
        rotateY,
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

  const name = "Kibriya Amit";
  const nameChars = name.split("");

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-stack-lg min-h-[85vh] bg-radial-gradient rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden reveal-section"
      id="home"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <div className="absolute top-[20%] left-[10%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="absolute bottom-[30%] right-[15%] w-64 md:w-96 h-64 md:h-96 rounded-full bg-tertiary/20 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[30%] w-56 md:w-80 h-56 md:h-80 rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      {/* Mobile social row — shown only on small screens above content */}
      <div className="flex md:hidden items-center gap-3 z-10 relative self-start">
        <a
          href="https://github.com/kibriya41"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-9 h-9 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaGithub size={16} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-9 h-9 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href="mailto:kibriyaamit17@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="w-9 h-9 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 hover:scale-110 transition-all duration-300"
        >
          <FaEnvelope size={14} />
        </a>
      </div>

      {/* Desktop vertical social sidebar */}
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
          href="#"
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
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-primary/50 to-transparent mt-2 shadow-[0_0_8px_var(--primary-theme)]" />
      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-start gap-stack-md z-10 relative w-full">
        <p className="font-label-md text-primary tracking-widest uppercase text-xs sm:text-sm">Hey, I&apos;m</p>

        {/* Name */}
        <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface font-bold flex flex-wrap items-center leading-tight">
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
            className="inline-block cursor-pointer ml-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: [0, 45, -20, 45, 0] }}
          >
            👋
          </motion.span>
        </h1>

        {/* Role rotator */}
        <h2 className="font-headline-md text-base sm:text-lg md:text-headline-md text-on-surface-variant h-[32px] sm:h-[36px] flex items-center">
          I am a&nbsp;
          <span
            className={`inline-block transition-all duration-500 transform ${
              isRoleTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            } text-primary font-semibold`}
          >
            {roles[roleIndex]}
          </span>
        </h2>

        {/* Description */}
        <div className="mt-2 flex flex-col gap-2 text-on-surface-variant text-sm sm:text-base font-body-lg">
          <p className="flex items-start sm:items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base sm:text-lg shrink-0">rocket_launch</span>
            <span>Turning complex systems into beautiful, optimized user interfaces.</span>
          </p>
          <p className="flex items-start sm:items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-base sm:text-lg shrink-0">bolt</span>
            <span>Always learning, constantly building, completely committed.</span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-stack-lg flex gap-4">
          <a
            href="#contact"
            ref={contactBtnRef}
            className="bg-primary text-on-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-label-md text-sm sm:text-base flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(155,202,255,0.4)] hover:shadow-[0_0_30px_rgba(155,202,255,0.6)] z-20 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            Say Hello <span className="material-symbols-outlined text-sm">send</span>
          </a>
        </div>
      </div>

      {/* Profile image + orbit cards */}
      <div
        ref={profileContainerRef}
        className="flex-1 flex justify-center items-center relative z-10 mt-6 md:mt-0 w-full"
      >
        <div className="profile-image-wrapper relative flex items-center justify-center p-4">
          {/* Rings */}
          <div className="absolute w-[180px] sm:w-[240px] h-[180px] sm:h-[240px] border border-primary/20 rounded-full animate-ping opacity-25" />
          <div className="absolute w-[210px] sm:w-[280px] h-[210px] sm:h-[280px] border border-tertiary/10 rounded-full animate-pulse" />

          {/* Portrait */}
          <Image
            alt="Professional portrait of Kibriya Amit"
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full object-cover z-10 border-4 border-primary/40 shadow-[0_0_40px_rgba(155,202,255,0.35)] transition-transform duration-300"
            src="/me.png"
            width={224}
            height={224}
            priority
          />

          {/* Orbit card — Projects Done */}
          <div className="orbit-item absolute bottom-[10px] left-[-50px] sm:left-[-60px] glass-card flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl border border-secondary/20 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-secondary text-base sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold text-on-surface">20+</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium">Projects Done</span>
            </div>
          </div>

          {/* Orbit card — Experience */}
          <div className="orbit-item absolute bottom-[-30px] sm:bottom-[-40px] right-[5px] sm:right-[10px] glass-card flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl border border-tertiary/20 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-tertiary text-base sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold text-on-surface">6 Months</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium">Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
