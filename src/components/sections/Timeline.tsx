"use client";

import { useState } from "react";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";

const experiences = [
  {
    title: "Junior Web Developer",
    company: "Independent Projects & Learning",
    period: "Dec 2025 - Present",
    desc: "Creating responsive web experiences, developing personal projects, and writing clean code daily using HTML, CSS, JavaScript, and Next.js.",
    side: "left"
  }
];

const educations = [
  {
    title: "Intermediate 2nd Year (Business Studies)",
    company: "Higher Secondary College",
    period: "2024 - Present",
    desc: "Studying Business Administration, Accounting, and Finance, while building web design skills in parallel.",
    side: "left"
  },
  {
    title: "Web Development Training",
    company: "Self-Guided Coding Journey",
    period: "Dec 2025 - Present",
    desc: "Dedicated 6 months of intense learning mastering web technologies, modern frameworks, and responsive design systems.",
    side: "right"
  }
];

export function Timeline() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const timelineRef = useTimelineAnimation() as React.RefObject<HTMLDivElement | null>;

  const currentItems = activeTab === "experience" ? experiences : educations;

  return (
    <section ref={timelineRef} className="mt-section-gap flex flex-col items-center w-full reveal-section" id="timeline">
      <div className="text-center mb-8">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Timeline</h2>
        <p className="font-label-md text-on-surface-variant mt-2">Qualifications & Journey</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-16 bg-surface-container/30 border border-primary/10 rounded-full p-1.5 z-10 relative">
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-6 py-2.5 rounded-full font-label-md transition-all cursor-pointer ${
            activeTab === "experience"
              ? "bg-primary text-on-primary shadow-lg"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`px-6 py-2.5 rounded-full font-label-md transition-all cursor-pointer ${
            activeTab === "education"
              ? "bg-primary text-on-primary shadow-lg"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Education Journey
        </button>
      </div>

      {/* Vertical Timeline Path */}
      <div className="relative w-full max-w-4xl min-h-[500px] flex flex-col justify-between items-center gap-12">
        {/* Static Background Guide Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary/10 pointer-events-none z-0" />
        
        {/* Animated growing svg/div line based on ScrollTrigger */}
        <div className="timeline-grow-line absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-primary via-tertiary to-secondary pointer-events-none z-0" />

        {currentItems.map((item, index) => (
          <div
            key={index}
            className={`timeline-item flex w-full relative z-10 ${
              item.side === "left" ? "justify-start md:flex-row" : "justify-end md:flex-row-reverse"
            }`}
            data-side={item.side}
          >
            {/* Timeline dot element */}
            <div className="timeline-dot absolute left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full border-[3px] border-background shadow-md z-20" />

            {/* Timeline card wrapper */}
            <div className={`w-[90%] md:w-[45%] glass-card p-6 rounded-xl border border-primary/10 hover:border-primary/40 transition-colors shadow-sm`}>
              <span className="text-xs font-bold text-primary bg-primary/10 py-1 px-3 rounded-full border border-primary/20">
                {item.period}
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-3 font-bold">
                {item.title}
              </h3>
              <h4 className="text-sm font-semibold text-on-surface-variant mt-1">
                {item.company}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant/80 mt-3 line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
