"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import type { About } from "@/lib/data";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import dynamic from "next/dynamic";

const FloatingShape = dynamic(() => import("@/components/3d/FloatingShape"), {
  ssr: false,
  loading: () => null,
});

interface Props {
  data: About;
}

export default function Contact({ data }: Props) {
  const { language } = usePortfolioStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contacts = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: <Phone size={16} />,
      label: "WhatsApp",
      value: data.phone,
      href: `https://wa.me/${data.phone.replace(/\D/g, "")}`,
    },
    {
      icon: <LinkedinIcon size={16} />,
      label: "LinkedIn",
      value: "nasri-adzlani",
      href: data.linkedin,
    },
    {
      icon: <GithubIcon size={16} />,
      label: "GitHub",
      value: "masnasri-a",
      href: data.github,
    },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    color: "var(--text-primary)",
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.875rem",
    fontFamily: "var(--font-mono)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Floating 3D bg */}
      <div className="absolute right-0 top-0 w-72 h-72 opacity-30 pointer-events-none">
        <FloatingShape />
      </div>

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
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
            {language === "en" ? "// get in touch" : "// hubungi saya"}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-display font-extrabold uppercase"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {language === "en"
              ? "Let's Build Something Together"
              : "Mari Berkolaborasi"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: CTA + contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-base mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {language === "en"
                ? "Have a project in mind, want to collaborate, or just want to say hi? I'm always open to new opportunities and conversations."
                : "Punya proyek yang ingin dibangun, ingin berkolaborasi, atau sekadar menyapa? Saya selalu terbuka untuk peluang dan percakapan baru."}
            </p>

            <div className="space-y-3">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,107,53,0.35)";
                    e.currentTarget.style.background = "rgba(255,107,53,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg-card)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(255,107,53,0.1)",
                      color: "var(--accent-orange)",
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-mono uppercase tracking-wider mb-0.5"
                      style={{ color: "var(--text-muted, #4A6480)" }}
                    >
                      {c.label}
                    </p>
                    <p
                      className="text-sm font-mono"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-xs font-mono uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {language === "en" ? "Name" : "Nama"}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={language === "en" ? "Your name" : "Nama Anda"}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(255,107,53,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs font-mono uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(255,107,53,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs font-mono uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {language === "en" ? "Message" : "Pesan"}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={
                    language === "en"
                      ? "Tell me about your project..."
                      : "Ceritakan proyek Anda..."
                  }
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(255,107,53,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
              </div>

              {status === "success" && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-mono"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.3)",
                    color: "#34d399",
                  }}
                >
                  <CheckCircle size={15} />
                  {language === "en"
                    ? "Message sent! I'll get back to you soon."
                    : "Pesan terkirim! Saya akan segera membalas."}
                </div>
              )}
              {status === "error" && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-mono"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={15} />
                  {language === "en"
                    ? "Something went wrong. Please try again."
                    : "Terjadi kesalahan. Silakan coba lagi."}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                style={{
                  background:
                    status === "loading"
                      ? "rgba(255,107,53,0.5)"
                      : "linear-gradient(135deg, var(--accent-orange), #ff8c5a)",
                  color: "#050a0e",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                <Send size={15} />
                {status === "loading"
                  ? language === "en"
                    ? "Sending..."
                    : "Mengirim..."
                  : language === "en"
                  ? "Send Message"
                  : "Kirim Pesan"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
