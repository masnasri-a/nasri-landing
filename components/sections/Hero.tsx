"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin, Briefcase, Code2, Building2, ArrowDown } from "lucide-react";
import { usePortfolioStore } from "@/lib/store";

const HeroBackground = dynamic(() => import("@/components/3d/HeroBackground"), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  "Full-stack Engineer",
  "Blockchain Developer",
  "Data Engineer",
  "R&D Lead",
  "AI Integrator",
];

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timerRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60
      );
    } else if (!deleting && displayed.length === current.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        35
      );
    } else if (deleting && displayed.length === 0) {
      timerRef.current = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, 0);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayed, deleting, roleIndex]);

  return (
    <span
      className="typing-cursor"
      style={{ color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}
    >
      {displayed}
    </span>
  );
}

const statCards = [
  { value: "5+", label: "Years", labelId: "Tahun", icon: <Code2 size={14} /> },
  { value: "6", label: "Companies", labelId: "Perusahaan", icon: <Building2 size={14} /> },
  { value: "10+", label: "Stacks", labelId: "Stack", icon: <Code2 size={14} /> },
];

export default function Hero() {
  const { language } = usePortfolioStore();

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* 3D Background */}
      <HeroBackground />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />

      <div className="container-custom relative z-10 pt-20 pb-12 w-full">
        <div className="flex flex-col gap-4">

          {/* Main headline card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="card-glass p-6 sm:p-8 lg:p-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-5"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "var(--accent-cyan)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: "var(--accent-cyan)" }}
              />
              {language === "en"
                ? "Available for new opportunities"
                : "Terbuka untuk peluang baru"}
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display font-extrabold uppercase leading-none mb-4"
              style={{
                fontSize: "clamp(1.75rem, 7vw, 4rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {language === "en" ? (
                <>
                  I Build What Others
                  <br />
                  <span className="gradient-text-orange">Can&apos;t Categorize</span>
                </>
              ) : (
                <>
                  Saya Membangun
                  <br />
                  <span className="gradient-text-orange">Yang Tak Terkategori</span>
                </>
              )}
            </h1>

            {/* Typing role */}
            <div
              className="text-base sm:text-lg lg:text-xl mb-7 font-mono min-h-[1.75rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              <TypingEffect />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-orange), #ff8c5a)",
                  color: "#050a0e",
                  boxShadow: "0 0 24px rgba(255,107,53,0.3)",
                }}
              >
                {language === "en" ? "View My Work" : "Lihat Karya Saya"}
              </motion.button>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,107,53,0.4)",
                  color: "var(--accent-orange)",
                }}
              >
                {language === "en" ? "Let's Talk" : "Hubungi Saya"}
              </motion.button>
            </div>
          </motion.div>

          {/* Info bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="card-glass p-4 sm:p-5"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin size={13} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                <span
                  className="text-xs sm:text-sm font-mono truncate"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Remote / Flexible
                </span>
              </div>

              {/* Current company */}
              <div className="flex items-center gap-2">
                <Briefcase size={13} style={{ color: "var(--accent-orange)", flexShrink: 0 }} />
                <span
                  className="text-xs sm:text-sm font-mono truncate"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Affinity Digital Asia
                </span>
              </div>

              {/* Stats — hidden on very small, shown from sm */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-start sm:justify-end gap-4 pt-2 sm:pt-0"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {statCards.map((s) => (
                  <div key={s.value} className="flex items-center gap-1.5">
                    <span
                      className="font-extrabold font-mono text-sm"
                      style={{ color: "var(--accent-orange)" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "var(--text-muted, #4A6480)" }}
                    >
                      {language === "en" ? s.label : s.labelId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-1.5"
            style={{ color: "var(--text-muted, #4A6480)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
