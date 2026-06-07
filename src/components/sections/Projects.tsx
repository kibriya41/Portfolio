"use client";

import { useState } from "react";
import Image from "next/image";
import { useProjectAnimation } from "@/hooks/useProjectAnimation";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "DigiTools: Premium Design System & UI/UX Showcase",
    tags: ["React.js", "Tailwind CSS", "Hero Ui"],
    desc: "A premium design system showcase displaying reusable components, interactive dashboards, mobile responsive layouts, and modern UI tokens for high-performance web applications.",
    image: "/digitools.jpg",
    github: "https://github.com/kibriya41/Assignment-6",
    live: "https://grand-kitten-d6b8e7.netlify.app/"
  },
   {
    title: "TutorFlux: Smart Tutor Booking & EdTech Platform",
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
    desc: "A full-stack EdTech platform connecting students with verified expert tutors. Features smart conflict-free booking, tutor profiles, session management dashboard, digital tokens, and personalized learning experiences.",
    image: "/tutorflux-1.png",
    github: "https://github.com/kibriya41/TutorFlux",
    live: "https://tutorflux.onrender.com/"
  },
  {
    title: "Tile Aesthetic: Premium Marketplace & Interior Design Platform",
    tags: ["Next.js", "Node.js", "Express", "Better Auth"],
    desc: "An e-commerce marketplace and inspiration gallery for premium tiles and interior design. Features visual search, curated collections, and detailed product showcase cards.",
    image: "/tileaesthetic.jpg",
    github: "https://github.com/kibriya41/assignment-8-tiles",
    live: "https://tiles-tu4d.onrender.com"
  },
  {
    title: "KeenKeeper: Friendship Analytics & Relationship Management",
    tags: ["React.js", "Tailwind CSS", "Daisy Ui"],
    desc: "A personal relationship management platform featuring friendship analytics, touchpoint tracking timeline charts, interaction patterns, and intelligent contact reminders.",
    image: "/keenkeeper.jpg",
    github: "https://github.com/kibriya41/keen-keeper",
    live: "https://keen-keeper.onrender.com"
  },
  {
    title: "Knowledge Vault: Structured Thinking & Second Brain Platform",
    tags: ["HTML5", "Tailwind CSS", "Daisy Ui"],
    desc: "A personal knowledge management system for storing notes, links, and learning summaries. Features structured thinking tools, semantic search, automatic concept connections, and reflection prompts.",
    image: "/knowledge-vault.png",
    github: "https://github.com/kibriya41/Assignment-1",
    live: "https://polite-beijinho-83ec17.netlify.app/"
  },
  {
    title: "English Easy: Interactive Vocabulary & Language Learning Platform",
    tags: ["HTML5", "JS", "Tailwind CSS"],
    desc: "An interactive English learning platform with lesson-based vocabulary modules, pronunciation guides with audio playback, search & explore functionality, and progress tracking to build language skills.",
    image: "/english-easy.png",
    github: "https://github.com/kibriya41/english-janala-code-2",
    live: "https://cosmic-taiyaki-502d17.netlify.app/"
  },

  {
    title: "Payoo: Mobile Financial Services & Digital Wallet",
    tags: ["HTML5", "JS"],
    desc: "A sleek mobile-first fintech application offering secure digital payments, cashout, money transfers, bill payments, bonus rewards, and real-time transaction history with a seamless user experience.",
    image: "/payoo.png",
    github: "https://github.com/kibriya41/payoo-project",
    live: "https://vocal-syrniki-51a74f.netlify.app/"
  },
  {
    title: "GitHub Issue Tracker: Project Issue Management System",
    tags: ["JavaScript", "Tailwind CSS", "Daisy Ui"],
    desc: "A full-featured issue tracking system inspired by GitHub Issues. Supports creating, filtering, and managing issues by priority and status with authentication, team collaboration, and real-time updates.",
    image: "/issue-tracker.png",
    github: "https://github.com/kibriya41/Assignment__5",
    live: "https://teal-bienenstitch-04af8d.netlify.app/"
  },
  {
    title: "Job Application Tracker: Career Management Dashboard",
    tags: ["JavaScript", "Tailwind CSS", "Daisy Ui"],
    desc: "A career management dashboard to track job applications, filter by status (interview, rejected, applied), monitor statistics, and stay organized throughout the job search process.",
    image: "/job-tracker.png",
    github: "https://github.com/kibriya41/-Assignment4-2",
    live: "https://thunderous-duckanoo-90c199.netlify.app/"
  }, {
    title: "Birthday Celebration: Interactive Greeting & Celebration Platform",
    tags: ["Tailwind CSS", "CSS Animations"],
    desc: "An interactive, personalized birthday greeting card platform featuring dynamic candle lighting, colorful confetti physics, custom greetings, and immersive celebratory sound effects.",
    image: "/birthday.png",
    github: "https://github.com/kibriya41/birthday-wish",
    live: "https://birthday-wish-by-amit.netlify.app/"
  }
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  // Use our specialized project card animation hook
  const cardRef = useProjectAnimation() as React.RefObject<HTMLDivElement | null>;

  return (
    <div
      ref={cardRef}
      className="reveal-card group relative glass-card rounded-xl overflow-hidden hover:border-primary/40 flex flex-col cursor-pointer transition-transform duration-300 ease-out"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Spotlight highlight background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(155, 202, 255, 0.12), transparent 80%)",
        }}
      />

      {/* Project Image and Parallax zoom */}
      <div className="w-full aspect-video bg-surface-dim relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
        <Image
          alt={project.title}
          className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          src={project.image}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/40 to-transparent"></div>
      </div>

      {/* Description details */}
      <div className="p-stack-md flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-wrap gap-2 mb-stack-sm">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container-highest border border-outline-variant/50 text-primary font-label-sm text-label-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-headline-md text-headline-md text-on-surface mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg flex-grow line-clamp-3">
          {project.desc}
        </p>

        {/* Action button links */}
        <div className="flex items-center gap-3 mt-auto">
          <a
            className="flex-1 flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant text-on-surface font-label-md text-label-md py-2.5 px-4 rounded-lg transition-colors"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            GitHub
          </a>
          <a
            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-label-md text-label-md py-2.5 px-4 rounded-lg transition-all"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("projects");
    if (element) {
      // Find its position and scroll to it with some offset
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-section-gap flex flex-col items-center w-full reveal-section" id="projects">
      <header className="text-center mb-stack-lg flex flex-col items-center">
        <h2 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface mb-stack-sm">
          Projects
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Recent Works & Case Studies
        </p>
      </header>

      {/* Projects Grid Container with ScrollTrigger class */}
      <div className="w-full min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter w-full reveal-cards-container"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 select-none">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 cursor-pointer"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${currentPage === pageNumber
                  ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(155,202,255,0.3)] scale-105"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40"
                  }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
