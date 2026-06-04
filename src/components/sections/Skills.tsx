"use client";

import {
  FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
  FaGitAlt, FaGithub
} from 'react-icons/fa';
import {
  RiNextjsFill, RiTailwindCssFill
} from 'react-icons/ri';
import {SiExpress, SiMongodb, } from 'react-icons/si';

import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: RiNextjsFill, color: "#ffffff" },
  { name: "Tailwind CSS", icon: RiTailwindCssFill, color: "#38BDF8" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#ffffff" },
];

export function Skills() {
  return (
    <section className="mt-section-gap flex flex-col items-center reveal-section" id="skills">
      <div className="text-center mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Technologies</h2>
        <p className="font-label-md text-on-surface-variant mt-2">My Tech Stack</p>
      </div>

      {/* Grid Tech Stack */}
      <div className="flex flex-wrap justify-center gap-stack-lg w-full max-w-5xl reveal-cards-container">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center gap-3 reveal-card cursor-pointer group"
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div
                className="tech-icon-container relative flex items-center justify-center rounded-full border border-primary/20 bg-surface-container-high/40 p-4 transition-all"
                style={{
                  boxShadow: `0 0 15px rgba(155, 202, 255, 0.05)`,
                }}
              >
                <Icon className="size-9 transition-transform group-hover:rotate-6 group-hover:scale-110" style={{ color: skill.color }} />
              </div>
              <span className="font-label-sm text-on-surface-variant group-hover:text-primary transition-colors">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite scrolling Tech Stack Marquee */}
      <div className="w-full overflow-hidden mt-16 bg-surface-container-low/30 border-y border-primary/10 py-6 relative">
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee whitespace-nowrap gap-12 select-none hover:[animation-play-state:paused]">
          {/* Double list for smooth loop wrap */}
          {[...skills, ...skills, ...skills].map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div key={i} className="flex items-center gap-3 text-on-surface-variant font-medium tracking-wide">
                <Icon className="size-6" style={{ color: skill.color }} />
                <span>{skill.name}</span>
                <span className="text-primary/20 mx-4">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
