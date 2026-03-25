"use client";

import { usePortfolioStore } from "@/lib/store";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export default function Footer() {
  const { language } = usePortfolioStore();

  return (
    <footer
      className="py-8 border-t"
      style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
    >
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs font-mono"
            style={{ color: "var(--text-muted, #4A6480)" }}
          >
            © {new Date().getFullYear()} Nasri Adzlani.{" "}
            {language === "en" ? "Built by" : "Dibuat oleh"} Nasri Adzlani.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/masnasri-a"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted, #4A6480)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted, #4A6480)")
              }
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nasri-adzlani-477620165"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted, #4A6480)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted, #4A6480)")
              }
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:nasriadzlani@live.com"
              className="transition-colors duration-200"
              style={{ color: "var(--text-muted, #4A6480)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted, #4A6480)")
              }
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
