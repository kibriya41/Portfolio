"use client";

import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const socialGithub = useMagneticEffect(0.35) as React.RefObject<HTMLAnchorElement | null>;
  const socialLinkedin = useMagneticEffect(0.35) as React.RefObject<HTMLAnchorElement | null>;
  const socialMail = useMagneticEffect(0.35) as React.RefObject<HTMLAnchorElement | null>;
  const backToTopRef = useMagneticEffect(0.3) as React.RefObject<HTMLButtonElement | null>;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full relative bg-surface-container-lowest text-secondary mt-32 border-t border-primary/10">
      {/* Premium glowing divider line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/45 to-transparent shadow-[0_0_15px_rgba(155,202,255,0.2)]" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Column 1: Branding & Bio */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 text-on-surface font-bold font-headline-md text-2xl group">
              <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform duration-300">
                terminal
              </span>
              <span>DevPortfolio</span>
            </a>
            <p className="text-on-surface-variant font-body-md max-w-sm leading-relaxed text-sm md:text-base">
              Crafting reliable, scalable, and visually stunning web applications. Committed to clean code, performance, and continuous learning.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                ref={socialGithub}
                href="https://github.com/kibriya41"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                ref={socialLinkedin}
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                ref={socialMail}
                href="mailto:kibriyaamit17@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/65 transition-colors"
              >
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-on-surface font-headline-md text-base font-bold tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-label-md text-sm">
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group" href="#home">
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span> Home
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group" href="#skills">
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span> Tech Stack
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group" href="#projects">
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span> Projects
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group" href="#about">
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span> About
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group" href="#timeline">
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">chevron_right</span> Timeline
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Contact Widget */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-on-surface font-headline-md text-base font-bold tracking-wider uppercase">
              Get In Touch
            </h4>
            <div className="space-y-3 font-body-md text-sm text-on-surface-variant">
              <a href="mailto:kibriyaamit17@gmail.com" className="flex items-center gap-2.5 hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                <span>kibriyaamit17@gmail.com</span>
              </a>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-base">location_on</span>
                <span>kishoreganj, Dhaka, Bangladesh</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Available for Hire
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-body-md text-sm text-on-surface-variant font-medium">
            © {new Date().getFullYear()} Kibriya Amit. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-on-surface-variant font-medium">
              Made with Next.js & Tailwind CSS
            </span>
            <button
              ref={backToTopRef}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-primary/15 hover:bg-primary/25 border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg group"
            >
              <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">
                arrow_upward
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
