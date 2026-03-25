import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filePath = join(dataDir, filename);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = join(dataDir, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export interface Project {
  id: string;
  title: string;
  description: string;
  descriptionId: string;
  category: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  company: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  techStack: string[];
  bullets: string[];
  bulletsId: string[];
  current: boolean;
}

export interface About {
  bioEn: string;
  bioId: string;
  stats: {
    yearsExperience: number;
    companies: number;
    techStacks: number;
    openSourceRepos: number;
  };
  currentCompany: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Skills {
  categories: Array<{
    name: string;
    nameId: string;
    skills: string[];
  }>;
}

export const getProjects = () => readJSON<Project[]>("projects.json");
export const getExperience = () => readJSON<Experience[]>("experience.json");
export const getAbout = () => readJSON<About>("about.json");
export const getSkills = () => readJSON<Skills>("skills.json");

export const saveProjects = (data: Project[]) => writeJSON("projects.json", data);
export const saveExperience = (data: Experience[]) => writeJSON("experience.json", data);
export const saveAbout = (data: About) => writeJSON("about.json", data);
export const saveSkills = (data: Skills) => writeJSON("skills.json", data);
