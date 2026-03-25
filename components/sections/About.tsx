"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import type { About as AboutData } from "@/lib/data";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

interface Props {
  data: AboutData;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function About({ data }: Props) {
  const { language } = usePortfolioStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    {
      value: `${data.stats.yearsExperience}+`,
      label: "Years of Experience",
      labelId: "Tahun Pengalaman",
    },
    {
      value: `${data.stats.companies}`,
      label: "Companies",
      labelId: "Perusahaan",
    },
    {
      value: `${data.stats.techStacks}+`,
      label: "Tech Stacks",
      labelId: "Tech Stack",
    },
    {
      value: `${data.stats.openSourceRepos}`,
      label: "Open Source Repos",
      labelId: "Repo Open Source",
    },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-12"
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-orange)" }}
          >
            {language === "en" ? "// about me" : "// tentang saya"}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-display font-extrabold uppercase"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {language === "en" ? "Who I Am" : "Siapa Saya"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Bio */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="card-glass p-8 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent-orange), var(--accent-cyan))",
              }}
            />
            <p
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}
            >
              {language === "en" ? data.bioEn : data.bioId}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all"
                style={{
                  background: "rgba(255,107,53,0.08)",
                  border: "1px solid rgba(255,107,53,0.2)",
                  color: "var(--accent-orange)",
                }}
              >
                <Mail size={14} />
                {data.email}
              </a>
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "var(--accent-cyan)",
                }}
              >
                <GithubIcon size={14} />
                GitHub
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "var(--accent-cyan)",
                }}
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 2}
                className="card-glass p-6 flex flex-col justify-center items-start relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(255,107,53,0.06), transparent 70%)",
                  }}
                />
                <span
                  className="text-3xl lg:text-4xl font-extrabold font-mono mb-1"
                  style={{ color: "var(--accent-orange)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {language === "en" ? stat.label : stat.labelId}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
