import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import type React from "react";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export default function AppShell({
  children,
  pageTitle,
  breadcrumbs,
}: AppShellProps) {
  const { sidebarOpen, setSidebarOpen, setIsMobile, isMobile } = useUIStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [setIsMobile, setSidebarOpen]);

  const isDemo = currentUser?.isDemo ?? false;

  return (
    <div
      className="flex h-screen overflow-hidden bg-background"
      data-ocid="appshell"
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300",
          !isMobile && sidebarOpen ? "ml-0" : "ml-0",
        )}
      >
        {/* Demo banner */}
        {isDemo && <DemoBanner />}

        {/* Header */}
        <Header pageTitle={pageTitle} breadcrumbs={breadcrumbs} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function DemoBanner() {
  const { dismissedDemoBanner, dismissDemoBanner } = useUIStore();
  if (dismissedDemoBanner) return null;
  return (
    <div
      className="flex items-center justify-between px-4 py-2 bg-accent/20 border-b border-accent/30 text-sm"
      data-ocid="demo.banner"
    >
      <span className="text-foreground">
        <strong className="text-accent-foreground font-semibold">
          Demo Mode
        </strong>
        {" — "}
        You're viewing sample data. Changes are not persistent across sessions.
      </span>
      <button
        type="button"
        onClick={dismissDemoBanner}
        className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss demo banner"
        data-ocid="demo.close_button"
      >
        ✕
      </button>
    </div>
  );
}
