"use client";

import { useEffect, useState } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import Image from "next/image";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", icon: "home", color: "#eab308" },
  { id: "skills", label: "Tech Stack", icon: "terminal", color: "#06b6d4" },
  { id: "projects", label: "Projects", icon: "folder_open", color: "#f97316" },
  { id: "timeline", label: "Qualification", icon: "school", color: "#a855f7" },
  { id: "contact", label: "Contact Me", icon: "send", color: "#ec4899" },
];

export function Header({ darkMode, setDarkMode, activeSection }: HeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const themeToggleRef = useMagneticEffect(0.3) as React.RefObject<HTMLButtonElement | null>;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic top scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-surface-container z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating capsule header */}
      <header className="fixed top-6 w-full z-50 px-margin-mobile md:px-margin-desktop transition-all duration-300">
        <div className="max-w-container-max mx-auto flex justify-between items-center h-16">
          {/* Logo brand left */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/20 shadow-[0_0_12px_rgba(155,202,255,0.15)] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.jpg"
                alt="Kibriya Amit Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold font-headline-md text-on-surface group-hover:text-primary transition-colors hidden sm:inline-block">
              Kibriya Amit
            </span>
          </a>

          {/* Centered navigation capsule pill */}
          <nav className="bg-background/60 dark:bg-surface-container-lowest/60 backdrop-blur-xl border border-primary/10 rounded-full px-4 py-1.5 flex items-center gap-1 md:gap-2 shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all text-xs md:text-sm font-semibold tracking-wide ${
                    isActive
                       ? "bg-primary/15 text-primary shadow-sm"
                       : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px] md:text-[18px]"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
 
          {/* Theme toggle circle right */}
          <button
            ref={themeToggleRef}
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full border border-primary/10 bg-background/40 dark:bg-surface-container-lowest/40 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-primary/45 hover:bg-primary/5 transition-all shadow-lg scale-95 active:scale-90 duration-200 cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
