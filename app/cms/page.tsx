"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, FolderOpen, Briefcase, User, Code, Plus, Edit2, Trash2, X, Check } from "lucide-react";
import type { Project, Experience, About, Skills } from "@/lib/data";

type Tab = "projects" | "experience" | "about" | "skills";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, var(--accent-orange), #ff8c5a)", color: "#050a0e" }}
          >
            NA
          </div>
          <h1 className="text-xl font-display font-bold uppercase" style={{ color: "var(--text-primary)" }}>
            CMS Login
          </h1>
          <p className="text-sm font-mono mt-1" style={{ color: "var(--text-secondary)" }}>
            Portfolio Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
              Username
            </label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm font-mono"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm font-mono"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p className="text-xs font-mono text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest"
            style={{
              background: "linear-gradient(135deg, var(--accent-orange), #ff8c5a)",
              color: "#050a0e",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  const empty: Project = {
    id: "",
    title: "",
    description: "",
    descriptionId: "",
    category: "fullstack",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    company: "",
    featured: false,
  };
  const [form, setForm] = useState<Project>(empty);

  useEffect(() => {
    fetch("/api/cms/projects").then((r) => r.json()).then(setProjects);
  }, []);

  const save = async () => {
    const method = adding ? "POST" : "PUT";
    const res = await fetch("/api/cms/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const saved = await res.json();
    if (adding) {
      setProjects((p) => [...p, saved]);
    } else {
      setProjects((p) => p.map((x) => (x.id === saved.id ? saved : x)));
    }
    setEditing(null);
    setAdding(false);
    setForm(empty);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/cms/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((p) => p.filter((x) => x.id !== id));
  };

  const startEdit = (p: Project) => {
    setForm(p);
    setEditing(p);
    setAdding(false);
  };

  const startAdd = () => {
    setForm(empty);
    setAdding(true);
    setEditing(null);
  };

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm font-mono";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    outline: "none",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-bold uppercase" style={{ color: "var(--text-primary)" }}>
          Projects
        </h2>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase"
          style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", color: "var(--accent-orange)" }}
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {(editing || adding) && (
        <div className="card-glass p-6 mb-6 space-y-4">
          <h3 className="text-sm font-mono font-semibold uppercase" style={{ color: "var(--accent-orange)" }}>
            {adding ? "New Project" : "Edit Project"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Title</label>
              <input className={inputCls} style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Category</label>
              <select className={inputCls} style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="fullstack">Full-stack</option>
                <option value="blockchain">Blockchain</option>
                <option value="data">Data</option>
                <option value="ai">AI</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Description (EN)</label>
              <textarea className={inputCls} style={{ ...inputStyle, resize: "none" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Description (ID)</label>
              <textarea className={inputCls} style={{ ...inputStyle, resize: "none" }} rows={3} value={form.descriptionId} onChange={(e) => setForm({ ...form, descriptionId: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Tech Stack (comma-separated)</label>
              <input className={inputCls} style={inputStyle} value={form.techStack.join(", ")} onChange={(e) => setForm({ ...form, techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Company</label>
              <input className={inputCls} style={inputStyle} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>GitHub URL</label>
              <input className={inputCls} style={inputStyle} value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Live URL</label>
              <input className={inputCls} style={inputStyle} value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer" style={{ color: "var(--text-secondary)" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
              <Check size={13} /> Save
            </button>
            <button onClick={() => { setEditing(null); setAdding(false); }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
              <X size={13} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="card-glass p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-display font-bold" style={{ color: "var(--text-primary)" }}>{p.title}</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: "rgba(255,107,53,0.1)", color: "var(--accent-orange)", border: "1px solid rgba(255,107,53,0.2)" }}>{p.category}</span>
                {p.featured && <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: "rgba(0,212,255,0.1)", color: "var(--accent-cyan)", border: "1px solid rgba(0,212,255,0.2)" }}>featured</span>}
              </div>
              <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{p.techStack.join(", ")}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="p-2 rounded-lg" style={{ color: "var(--accent-cyan)", background: "rgba(0,212,255,0.08)" }}>
                <Edit2 size={13} />
              </button>
              <button onClick={() => del(p.id)} className="p-2 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)" }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab() {
  const [data, setData] = useState<About | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/about").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    await fetch("/api/cms/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!data) return <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>Loading...</p>;

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm font-mono";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-primary)", outline: "none" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-bold uppercase" style={{ color: "var(--text-primary)" }}>About</h2>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase" style={{ background: saved ? "rgba(52,211,153,0.15)" : "rgba(255,107,53,0.15)", border: `1px solid ${saved ? "rgba(52,211,153,0.3)" : "rgba(255,107,53,0.3)"}`, color: saved ? "#34d399" : "var(--accent-orange)" }}>
          {saved ? <><Check size={13} /> Saved!</> : <><Check size={13} /> Save</>}
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Bio (EN)</label>
          <textarea className={inputCls} style={{ ...inputStyle, resize: "none" }} rows={4} value={data.bioEn} onChange={(e) => setData({ ...data, bioEn: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Bio (ID)</label>
          <textarea className={inputCls} style={{ ...inputStyle, resize: "none" }} rows={4} value={data.bioId} onChange={(e) => setData({ ...data, bioId: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Years Exp</label>
            <input type="number" className={inputCls} style={inputStyle} value={data.stats.yearsExperience} onChange={(e) => setData({ ...data, stats: { ...data.stats, yearsExperience: +e.target.value } })} />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Companies</label>
            <input type="number" className={inputCls} style={inputStyle} value={data.stats.companies} onChange={(e) => setData({ ...data, stats: { ...data.stats, companies: +e.target.value } })} />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Tech Stacks</label>
            <input type="number" className={inputCls} style={inputStyle} value={data.stats.techStacks} onChange={(e) => setData({ ...data, stats: { ...data.stats, techStacks: +e.target.value } })} />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>OSS Repos</label>
            <input type="number" className={inputCls} style={inputStyle} value={data.stats.openSourceRepos} onChange={(e) => setData({ ...data, stats: { ...data.stats, openSourceRepos: +e.target.value } })} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsTab() {
  const [data, setData] = useState<Skills | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/skills").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    await fetch("/api/cms/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!data) return <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>Loading...</p>;

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm font-mono";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-primary)", outline: "none" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-bold uppercase" style={{ color: "var(--text-primary)" }}>Skills</h2>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase" style={{ background: saved ? "rgba(52,211,153,0.15)" : "rgba(255,107,53,0.15)", border: `1px solid ${saved ? "rgba(52,211,153,0.3)" : "rgba(255,107,53,0.3)"}`, color: saved ? "#34d399" : "var(--accent-orange)" }}>
          {saved ? <><Check size={13} /> Saved!</> : <><Check size={13} /> Save</>}
        </button>
      </div>
      <div className="space-y-4">
        {data.categories.map((cat, i) => (
          <div key={cat.name} className="card-glass p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-mono font-semibold" style={{ color: "var(--accent-cyan)" }}>{cat.name}</span>
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: "var(--text-secondary)" }}>Skills (comma-separated)</label>
              <input
                className={inputCls}
                style={inputStyle}
                value={cat.skills.join(", ")}
                onChange={(e) => {
                  const updated = { ...data };
                  updated.categories[i] = { ...cat, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                  setData(updated);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CMSPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("projects");

  useEffect(() => {
    fetch("/api/cms/projects")
      .then((r) => {
        if (r.ok) setAuthed(true);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  const logout = async () => {
    await fetch("/api/cms/auth", { method: "DELETE" });
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onLogin={() => setAuthed(true)} />;
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "projects", label: "Projects", icon: <FolderOpen size={15} /> },
    { key: "experience", label: "Experience", icon: <Briefcase size={15} /> },
    { key: "about", label: "About", icon: <User size={15} /> },
    { key: "skills", label: "Skills", icon: <Code size={15} /> },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-custom h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono" style={{ background: "linear-gradient(135deg, var(--accent-orange), #ff8c5a)", color: "#050a0e" }}>
              NA
            </div>
            <span className="text-sm font-mono font-semibold" style={{ color: "var(--text-primary)" }}>CMS Dashboard</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ color: "var(--text-secondary)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b" style={{ borderColor: "var(--border)" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all border-b-2 -mb-px"
              style={{
                color: tab === t.key ? "var(--accent-orange)" : "var(--text-secondary)",
                borderColor: tab === t.key ? "var(--accent-orange)" : "transparent",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === "projects" && <ProjectsTab />}
        {tab === "experience" && (
          <div className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
            Experience editor — edit experience.json directly or extend this tab.
          </div>
        )}
        {tab === "about" && <AboutTab />}
        {tab === "skills" && <SkillsTab />}
      </div>
    </div>
  );
}
