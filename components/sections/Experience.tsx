"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import type { Experience as ExperienceData } from "@/lib/data";
import { ChevronDown, MapPin, CalendarDays } from "lucide-react";

interface Props {
  data: ExperienceData[];
}

function ExperienceCard({
  item,
  index,
  inView,
  language,
  isLast,
}: {
  item: ExperienceData;
  index: number;
  inView: boolean;
  language: "en" | "id";
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center" style={{ width: 20, flexShrink: 0 }}>
        {/* Dot */}
        <div
          className="relative z-10 rounded-full border-2 shrink-0"
          style={{
            width: 14,
            height: 14,
            marginTop: 22,
            background: item.current ? "var(--accent-orange)" : "#0d1b2a",
            borderColor: item.current
              ? "var(--accent-orange)"
              : "rgba(42, 64, 96, 0.9)",
            boxShadow: item.current
              ? "0 0 0 4px rgba(255,107,53,0.15)"
              : "none",
          }}
        />
        {/* Line below dot */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-1"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,107,53,0.35), rgba(0,212,255,0.15))",
              minHeight: 24,
            }}
          />
        )}
      </div>

      {/* Card column */}
      <div className="flex-1 pb-6">
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
          style={{
            background: "rgba(13, 27, 42, 0.7)",
            border: `1px solid ${expanded ? "rgba(255,107,53,0.28)" : "rgba(26, 45, 64, 0.8)"}`,
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Card header */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              {/* Left: company + role + meta */}
              <div className="flex-1 min-w-0">
                {/* Company + badge */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3
                    className="font-display font-bold leading-tight"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                    }}
                  >
                    {item.company}
                  </h3>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium"
                      style={{
                        background: "rgba(255,107,53,0.1)",
                        border: "1px solid rgba(255,107,53,0.3)",
                        color: "var(--accent-orange)",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent-orange)" }}
                      />
                      {language === "en" ? "Current" : "Sekarang"}
                    </span>
                  )}
                </div>

                {/* Role */}
                <p
                  className="font-mono text-sm font-medium mb-3"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {item.role}
                </p>

                {/* Period + Location */}
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono"
                  style={{ fontSize: "0.72rem", color: "#4A6480" }}
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={11} />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 mt-1"
                style={{ color: "#4A6480" }}
              >
                <ChevronDown size={17} />
              </motion.div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(26,45,64,0.7)" }}>
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg font-mono"
                  style={{
                    fontSize: "0.7rem",
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.14)",
                    color: "var(--accent-cyan)",
                    lineHeight: 1.4,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable bullet points */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="bullets"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid rgba(26,45,64,0.7)" }}
                >
                  <ul className="mt-4 space-y-2.5">
                    {(language === "en" ? item.bullets : item.bulletsId).map(
                      (bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 shrink-0 rounded-full"
                            style={{
                              width: 5,
                              height: 5,
                              background: "var(--accent-orange)",
                            }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "#8BA3BC" }}
                          >
                            {bullet}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience({ data }: Props) {
  const { language } = usePortfolioStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-padding"
      ref={ref}
      style={{ background: "#0a1520" }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-orange)" }}
          >
            {language === "en" ? "// work experience" : "// pengalaman kerja"}
          </p>
          <h2
            className="font-display font-extrabold uppercase"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {language === "en" ? "Where I've Worked" : "Tempat Saya Bekerja"}
          </h2>
        </motion.div>

        {/* Cards */}
        <div>
          {data.map((item, i) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
              language={language}
              isLast={i === data.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
