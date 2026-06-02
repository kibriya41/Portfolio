"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Global UI effects
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Spotlight } from "@/components/ui/Spotlight";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  // Scroll reveal trigger initialization
  const revealContainerRef = useRevealAnimation() as React.RefObject<HTMLDivElement | null>;

  // Sync darkMode state with DOM HTML classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Track active section on scroll for Nav scramble/progress sync
  useEffect(() => {
    if (isLoading) return;

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const ids = ["home", "skills", "projects", "about", "timeline", "contact"];
    
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <SmoothScroll>
          {/* Custom Cursor Overlay */}
          <CustomCursor />

          {/* Mouse Spotlight radial overlay */}
          <Spotlight />

          {/* Global Sticky Navigation Header */}
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            activeSection={activeSection}
          />

          {/* Core Interactive Layout Wrapper */}
          <main
            ref={revealContainerRef}
            className="pt-24 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-12"
          >
            {/* Sections */}
            <Hero />
            <Skills />
            <Projects />
            <About />
            <Timeline />
            <Contact />
          </main>

          {/* Site Footer */}
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}
