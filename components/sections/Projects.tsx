"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import type { Project } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface Props {
  data: Project[];
}

const FILTERS = [
  { key: "all", label: "All", labelId: "Semua" },
  { key: "blockchain", label: "Blockchain", labelId: "Blockchain" },
  { key: "data", label: "Data", labelId: "Data" },
  { key: "fullstack", label: "Full-stack", labelId: "Full-stack" },
  { key: "ai", label: "AI", labelId: "AI" },
];

function ProjectCard({
  project,
  index,
  inView,
  language,
}: {
  project: Project;
  index: number;
  inView: boolean;
  language: "en" | "id";
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const categoryColors: Record<string, string> = {
    blockchain: "var(--accent-orange)",
    data: "var(--accent-cyan)",
    fullstack: "#a78bfa",
    ai: "#34d399",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease",
      }}
      className="card-glass p-6 flex flex-col h-full group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="px-2 py-0.5 rounded-md text-xs font-mono uppercase"
          style={{
            background: `${categoryColors[project.category] || "var(--accent-orange)"}15`,
            border: `1px solid ${categoryColors[project.category] || "var(--accent-orange)"}30`,
            color: categoryColors[project.category] || "var(--accent-orange)",
          }}
        >
          {project.category}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <GithubIcon size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <h3
        className="text-base font-display font-bold mb-2 group-hover:text-orange-400 transition-colors"
        style={{ color: "var(--text-primary)" }}
      >
        {project.title}
      </h3>
      <p
        className="text-sm flex-1 mb-4"
        style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
      >
        {language === "en" ? project.description : project.descriptionId}
      </p>

      {/* Company */}
      {project.company && (
        <p
          className="text-xs font-mono mb-3"
          style={{ color: "var(--text-muted, #4A6480)" }}
        >
          @ {project.company}
        </p>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: Props) {
  const { language } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "all"
      ? data
      : data.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-orange)" }}
          >
            {language === "en" ? "// selected work" : "// karya pilihan"}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-display font-extrabold uppercase"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {language === "en" ? "Projects" : "Proyek"}
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200"
              style={{
                background:
                  activeFilter === f.key
                    ? "rgba(255,107,53,0.15)"
                    : "transparent",
                border:
                  activeFilter === f.key
                    ? "1px solid rgba(255,107,53,0.4)"
                    : "1px solid var(--border)",
                color:
                  activeFilter === f.key
                    ? "var(--accent-orange)"
                    : "var(--text-secondary)",
              }}
            >
              {language === "en" ? f.label : f.labelId}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
