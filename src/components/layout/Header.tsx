"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import Image from "next/image";

/* ─── Ripple Types ───────────────────────────────────────────── */
interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/* ─── useRipple hook ─────────────────────────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  return { ripples, addRipple };
}

/* ─── Ripple overlay component ───────────────────────────────── */
function RippleOverlay({ ripples, color = "rgba(255,255,255,0.25)" }: { ripples: Ripple[]; color?: string }) {
  return (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            backgroundColor: color,
          }}
        />
      ))}
    </>
  );
}

/* ─── Props ──────────────────────────────────────────────────── */
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
}

const navItems = [
  { id: "home",     label: "Home",          icon: "home",        color: "#eab308" },
  { id: "skills",   label: "Tech Stack",    icon: "terminal",    color: "#06b6d4" },
  { id: "projects", label: "Projects",      icon: "folder_open", color: "#f97316" },
  { id: "timeline", label: "Qualification", icon: "school",      color: "#a855f7" },
  { id: "contact",  label: "Contact Me",    icon: "send",        color: "#ec4899" },
];

/* ─── Header ─────────────────────────────────────────────────── */
export function Header({ darkMode, setDarkMode, activeSection }: HeaderProps) {
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [menuOpen,       setMenuOpen]          = useState(false);
  const themeToggleRef = useMagneticEffect(0.3) as React.RefObject<HTMLButtonElement | null>;
  const drawerRef      = useRef<HTMLDivElement>(null);

  /* ripple instances for each interactive area */
  const themeRipple   = useRipple();
  const burgerRipple  = useRipple();
  const drawerClose   = useRipple();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close drawer on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  /* Lock body scroll while drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      {/* ── Ripple keyframe injected once ────────────────────── */}
      <style>{`
        @keyframes ripple-expand {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(1); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple-expand 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* ── Scroll progress bar ───────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-surface-container z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Floating header ───────────────────────────────────── */}
      <header className="fixed top-6 w-full z-50 px-margin-mobile md:px-margin-desktop transition-all duration-300">
        <div className="max-w-container-max mx-auto flex justify-between items-center h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/20 shadow-[0_0_12px_rgba(155,202,255,0.15)] group-hover:scale-105 transition-transform duration-300">
              <Image src="/logo.png" alt="Kibriya Amit Logo" fill priority className="object-cover" />
            </div>
            <span className="text-lg font-bold font-headline-md text-on-surface group-hover:text-primary transition-colors hidden sm:inline-block">
              Kibriya Amit
            </span>
          </a>

          {/* Desktop nav pill */}
          <nav className="hidden md:flex bg-background/60 dark:bg-surface-container-lowest/60 backdrop-blur-xl border border-primary/10 rounded-full px-4 py-1.5 items-center gap-1 md:gap-2 shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative overflow-hidden flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all text-xs md:text-sm font-semibold tracking-wide ${
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

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Theme toggle with ripple */}
            <button
              ref={themeToggleRef}
              onClick={(e) => { themeRipple.addRipple(e); setDarkMode(!darkMode); }}
              className="relative overflow-hidden w-10 h-10 rounded-full border border-primary/10 bg-background/40 dark:bg-surface-container-lowest/40 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-primary/45 hover:bg-primary/5 transition-all shadow-lg scale-95 active:scale-90 duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <RippleOverlay ripples={themeRipple.ripples} color="rgba(155,202,255,0.3)" />
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Hamburger with ripple */}
            <button
              onClick={(e) => { burgerRipple.addRipple(e); setMenuOpen((prev) => !prev); }}
              className="md:hidden relative overflow-hidden w-10 h-10 rounded-full border border-primary/10 bg-background/40 dark:bg-surface-container-lowest/40 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-primary/45 hover:bg-primary/5 transition-all shadow-lg scale-95 active:scale-90 duration-200 cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <RippleOverlay ripples={burgerRipple.ripples} color="rgba(155,202,255,0.3)" />
              <span
                className="material-symbols-outlined text-[22px] transition-transform duration-300"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop ──────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in drawer ────────────────────────────── */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-72 z-[55] md:hidden flex flex-col
          bg-background/95 dark:bg-surface-container-lowest/95 backdrop-blur-2xl
          border-l border-primary/10 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-primary/10">
          <a href="#home" onClick={handleNavClick} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <Image src="/logo.jpg" alt="Kibriya Amit" fill className="object-cover" />
            </div>
            <span className="text-base font-bold font-headline-md text-on-surface">Kibriya Amit</span>
          </a>
          <button
            onClick={(e) => { drawerClose.addRipple(e); setMenuOpen(false); }}
            className="relative overflow-hidden w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-primary/10 transition-all"
            aria-label="Close menu"
          >
            <RippleOverlay ripples={drawerClose.ripples} color="rgba(155,202,255,0.25)" />
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <NavRippleLink
                key={item.id}
                item={item}
                isActive={isActive}
                index={index}
                menuOpen={menuOpen}
                onClick={handleNavClick}
              />
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-6 border-t border-primary/10">
          <p className="text-xs text-on-surface-variant text-center">
            © {new Date().getFullYear()} Kibriya Amit
          </p>
        </div>
      </div>
    </>
  );
}

/* ─── Nav link with individual ripple state ──────────────────── */
function NavRippleLink({
  item,
  isActive,
  index,
  menuOpen,
  onClick,
}: {
  item: { id: string; label: string; icon: string; color: string };
  isActive: boolean;
  index: number;
  menuOpen: boolean;
  onClick: () => void;
}) {
  const { ripples, addRipple } = useRipple();

  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => { addRipple(e); onClick(); }}
      className={`relative overflow-hidden flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold text-sm tracking-wide ${
        isActive
          ? "bg-primary/15 text-primary shadow-sm"
          : "text-on-surface-variant hover:text-on-surface hover:bg-primary/8"
      }`}
      style={{
        transform: menuOpen ? "translateX(0)" : "translateX(20px)",
        opacity: menuOpen ? 1 : 0,
        transitionProperty: "transform, opacity, background-color, color",
        transitionDuration: "300ms, 300ms, 200ms, 200ms",
        transitionTimingFunction: "ease, ease, ease, ease",
        transitionDelay: `${index * 40}ms, ${index * 40}ms, 0ms, 0ms`,
      }}
    >
      <RippleOverlay ripples={ripples} color={`${item.color}55`} />
      <span className="material-symbols-outlined text-[20px]" style={{ color: item.color }}>
        {item.icon}
      </span>
      {item.label}
      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </a>
  );
}
