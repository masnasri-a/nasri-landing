"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

const navLinks = [
  { label: "About", labelId: "Tentang", href: "#about" },
  { label: "Experience", labelId: "Pengalaman", href: "#experience" },
  { label: "Projects", labelId: "Proyek", href: "#projects" },
  { label: "Skills", labelId: "Keahlian", href: "#skills" },
  { label: "Contact", labelId: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const { language, toggleLanguage } = usePortfolioStore();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY && currentY > 80) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: scrolled
              ? "rgba(5,10,14,0.9)"
              : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
            transition: "background 0.3s, border 0.3s",
          }}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm font-mono"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-orange), #ff8c5a)",
                    color: "#050a0e",
                  }}
                >
                  NA
                </div>
                <span
                  className="hidden sm:block font-mono text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  nasri adzlani
                </span>
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-200 rounded-lg hover:bg-white/5"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-orange)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {language === "en" ? link.label : link.labelId}
                  </button>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: "rgba(255,107,53,0.18)",
                    border: "1px solid rgba(255,107,53,0.45)",
                    color: "var(--accent-orange)",
                  }}
                >
                  {language === "en" ? "ID" : "EN"}
                </button>

                {/* Mobile menu button */}
                <button
                  className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  <span
                    className="w-5 h-0.5 transition-all duration-300"
                    style={{
                      background: "var(--text-primary)",
                      transform: mobileOpen
                        ? "rotate(45deg) translateY(7px)"
                        : "none",
                    }}
                  />
                  <span
                    className="w-5 h-0.5 transition-all duration-300"
                    style={{
                      background: "var(--text-primary)",
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="w-5 h-0.5 transition-all duration-300"
                    style={{
                      background: "var(--text-primary)",
                      transform: mobileOpen
                        ? "rotate(-45deg) translateY(-7px)"
                        : "none",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
                style={{
                  background: "rgba(5,10,14,0.97)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div className="container-custom py-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3.5 rounded-xl text-sm font-mono uppercase tracking-wider transition-colors w-full"
                      style={{ color: "var(--text-secondary)" }}
                      onTouchStart={(e) =>
                        (e.currentTarget.style.background = "rgba(255,107,53,0.07)")
                      }
                      onTouchEnd={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {language === "en" ? link.label : link.labelId}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
