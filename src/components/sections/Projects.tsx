"use client";

import Image from "next/image";
import { useProjectAnimation } from "@/hooks/useProjectAnimation";

const projects = [
  {
    title: "DigiTools: Premium Design System & UI/UX Showcase",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    desc: "A premium design system showcase displaying reusable components, interactive dashboards, mobile responsive layouts, and modern UI tokens for high-performance web applications.",
    image: "/digitools.jpg",
    github: "https://github.com/kibriya41/Assignment-6",
    live: "https://grand-kitten-d6b8e7.netlify.app/"
  },
  {
    title: "Tile Aesthetic: Premium Marketplace & Interior Design Platform",
    tags: ["React.js", "Node.js", "PostgreSQL"],
    desc: "An e-commerce marketplace and inspiration gallery for premium tiles and interior design. Features visual search, curated collections, and detailed product showcase cards.",
    image: "/tileaesthetic.jpg",
    github: "https://github.com/kibriya41/assignment-8-tiles",
    live: "https://assignment-8-tiles-cgxy.vercel.app/"
  },
  {
    title: "KeenKeeper: Friendship Analytics & Relationship Management",
    tags: ["Next.js", "Recharts", "Prisma"],
    desc: "A personal relationship management platform featuring friendship analytics, touchpoint tracking timeline charts, interaction patterns, and intelligent contact reminders.",
    image: "/keenkeeper.jpg",
    github: "https://github.com/kibriya41/keen-keeper",
    live: "https://keen-keeper-zeta-black.vercel.app/"
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
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            GitHub
          </a>
          <a
            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-label-md text-label-md py-2.5 px-4 rounded-lg transition-all"
            href={project.live}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter w-full reveal-cards-container">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
