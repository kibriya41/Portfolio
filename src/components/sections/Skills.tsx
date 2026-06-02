"use client";

import {
  FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
  FaGitAlt, FaGithub
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { SiTypescript, SiExpress, SiMongodb, SiPostgresql } from 'react-icons/si';
import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: FaJs,             color: "#F7DF1E" },
  { name: "HTML5",       icon: FaHtml5,          color: "#E34F26" },
  { name: "CSS3",        icon: FaCss3Alt,        color: "#1572B6" },
  { name: "React",       icon: FaReact,          color: "#61DAFB" },
  { name: "Next.js",     icon: RiNextjsFill,     color: "#ffffff" },
  { name: "Tailwind",    icon: RiTailwindCssFill,color: "#38BDF8" },
  { name: "TypeScript",  icon: SiTypescript,     color: "#3178C6" },
  { name: "Node.js",     icon: FaNodeJs,         color: "#339933" },
  { name: "Express",     icon: SiExpress,        color: "#ffffff" },
  { name: "MongoDB",     icon: SiMongodb,        color: "#47A248" },
  { name: "PostgreSQL",  icon: SiPostgresql,     color: "#4169E1" },
  { name: "Git",         icon: FaGitAlt,         color: "#F05032" },
  { name: "GitHub",      icon: FaGithub,         color: "#ffffff" },
];

export function Skills() {
  return (
    <section className="mt-section-gap flex flex-col items-center reveal-section" id="skills">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface">Technologies</h2>
        <p className="font-label-md text-on-surface-variant mt-2 text-sm sm:text-base">My Tech Stack</p>
      </div>

      {/* Icon grid: 4 cols on mobile → 6 on md → 8 on lg */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-stack-lg w-full max-w-5xl justify-items-center reveal-cards-container">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center gap-2 sm:gap-3 reveal-card cursor-pointer group"
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Icon circle — smaller on mobile */}
              <div
                className="w-14 h-14 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 rounded-full border border-primary/20 bg-surface-container-high/40 flex items-center justify-center transition-all"
                style={{ boxShadow: "0 0 15px rgba(155, 202, 255, 0.05)" }}
              >
                <Icon
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-transform group-hover:rotate-6 group-hover:scale-110"
                  style={{ color: skill.color }}
                />
              </div>
              <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant group-hover:text-primary transition-colors text-center leading-tight">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Marquee ticker */}
      <div className="w-full overflow-hidden mt-12 sm:mt-16 bg-surface-container-low/30 border-y border-primary/10 py-4 sm:py-6 relative">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee whitespace-nowrap gap-8 sm:gap-12 select-none hover:[animation-play-state:paused]">
          {[...skills, ...skills, ...skills].map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div key={i} className="flex items-center gap-2 sm:gap-3 text-on-surface-variant font-medium tracking-wide text-sm sm:text-base">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: skill.color }} />
                <span>{skill.name}</span>
                <span className="text-primary/20 mx-2 sm:mx-4">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
