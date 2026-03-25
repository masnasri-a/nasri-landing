import { create } from "zustand";

type Language = "en" | "id";

interface PortfolioStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
  toggleLanguage: () =>
    set({ language: get().language === "en" ? "id" : "en" }),
}));

interface CMSAuthStore {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

export const useCMSAuthStore = create<CMSAuthStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (val) => set({ isAuthenticated: val }),
}));
