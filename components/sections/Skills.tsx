"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import type { Skills as SkillsData } from "@/lib/data";

interface Props {
  data: SkillsData;
}

const categoryColors: Record<string, string> = {
  Backend: "var(--accent-orange)",
  Frontend: "var(--accent-cyan)",
  Blockchain: "#a78bfa",
  "Data & Infra": "#34d399",
  Database: "#f59e0b",
};

export default function Skills({ data }: Props) {
  const { language } = usePortfolioStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-padding"
      ref={ref}
      style={{ background: "var(--bg-secondary, #0a1520)" }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-orange)" }}
          >
            {language === "en" ? "// tech stack" : "// teknologi"}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-display font-extrabold uppercase"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {language === "en" ? "Skills & Tech" : "Keahlian & Teknologi"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((cat, catIndex) => {
            const accent = categoryColors[cat.name] || "var(--accent-orange)";
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: catIndex * 0.1 }}
                className="card-glass p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: accent }}
                  />
                  <h3
                    className="text-sm font-mono font-semibold uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    {language === "en" ? cat.name : cat.nameId}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.1 + si * 0.04,
                      }}
                      className="skill-badge px-3 py-1.5 rounded-lg text-xs font-mono cursor-default transition-all duration-200"
                      style={{
                        background: `${accent}0d`,
                        border: `1px solid ${accent}25`,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
