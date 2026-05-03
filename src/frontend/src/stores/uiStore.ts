import type { ThemeMode } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  isMobile: boolean;
  dismissedDemoBanner: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setIsMobile: (mobile: boolean) => void;
  dismissDemoBanner: () => void;
}

function applyTheme(theme: ThemeMode) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
    html.setAttribute("data-theme", "dark");
  } else {
    html.classList.remove("dark");
    html.setAttribute("data-theme", "light");
  }
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "light",
      sidebarOpen: true,
      isMobile: false,
      dismissedDemoBanner: false,

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setIsMobile: (mobile) => set({ isMobile: mobile }),
      dismissDemoBanner: () => set({ dismissedDemoBanner: true }),
    }),
    {
      name: "gulfhr-ui",
      partialize: (state) => ({
        theme: state.theme,
        dismissedDemoBanner: state.dismissedDemoBanner,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);
