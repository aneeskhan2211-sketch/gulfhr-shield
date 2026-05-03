import { useListUnreadAlerts } from "@/api/alerts";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  pageTitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export default function Header({ pageTitle, breadcrumbs }: HeaderProps) {
  const { theme, toggleTheme, toggleSidebar } = useUIStore();
  const { currentUser } = useAuthStore();
  const { data: unreadAlerts } = useListUnreadAlerts();

  const unreadCount = unreadAlerts?.length ?? 0;
  const initials =
    currentUser?.fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <header
      className="h-16 bg-card border-b border-border flex items-center gap-4 px-4 md:px-6 shrink-0"
      data-ocid="header"
    >
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle sidebar"
        data-ocid="header.sidebar_toggle"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title / breadcrumbs */}
      <div className="flex-1 min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            className="flex items-center gap-1.5 text-sm"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-muted-foreground">/</span>}
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <h1
            className={cn(
              "font-display font-semibold text-foreground truncate",
              pageTitle && pageTitle.length > 20 ? "text-lg" : "text-xl",
            )}
          >
            {pageTitle ?? "GulfHR Shield"}
          </h1>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          data-ocid="header.theme_toggle"
          className="w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Notifications */}
        <Link
          to="/dashboard"
          data-ocid="header.notifications_button"
          className="relative w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={`${unreadCount} unread alerts`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold cursor-default"
          title={currentUser?.fullName}
          data-ocid="header.user_avatar"
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
