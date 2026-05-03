import { UserRole } from "@/backend";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  CreditCard,
  FileBadge,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      UserRole.SuperAdmin,
      UserRole.CompanyOwner,
      UserRole.HRManager,
      UserRole.Accountant,
      UserRole.BranchManager,
      UserRole.Employee,
    ],
  },
  {
    label: "Employees",
    path: "/employees",
    icon: Users,
    roles: [
      UserRole.SuperAdmin,
      UserRole.CompanyOwner,
      UserRole.HRManager,
      UserRole.BranchManager,
    ],
  },
  {
    label: "Visa Alerts",
    path: "/visa-alerts",
    icon: Shield,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner, UserRole.HRManager],
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner, UserRole.HRManager],
  },
  {
    label: "Payroll",
    path: "/payroll",
    icon: CreditCard,
    roles: [
      UserRole.SuperAdmin,
      UserRole.CompanyOwner,
      UserRole.HRManager,
      UserRole.Accountant,
    ],
  },
  {
    label: "WPS",
    path: "/wps",
    icon: FileBadge,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner, UserRole.Accountant],
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: Clock,
    roles: [
      UserRole.SuperAdmin,
      UserRole.CompanyOwner,
      UserRole.HRManager,
      UserRole.BranchManager,
    ],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    roles: [
      UserRole.SuperAdmin,
      UserRole.CompanyOwner,
      UserRole.HRManager,
      UserRole.Accountant,
    ],
  },
  {
    label: "ROI Dashboard",
    path: "/roi",
    icon: TrendingUp,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner, UserRole.HRManager],
  },
  {
    label: "Billing",
    path: "/billing",
    icon: ClipboardList,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: [UserRole.SuperAdmin, UserRole.CompanyOwner, UserRole.HRManager],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, isMobile } = useUIStore();
  const { currentUser, clearUser } = useAuthStore();
  const userRole = currentUser?.role ?? UserRole.Employee;

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole),
  );

  const collapsed = !sidebarOpen;

  return (
    <aside
      className={cn(
        "flex flex-col h-full transition-all duration-300 bg-sidebar border-r border-sidebar-border z-40",
        isMobile ? "fixed" : "relative",
        collapsed && !isMobile ? "w-16" : "w-60",
        isMobile && !sidebarOpen ? "-translate-x-full w-60" : "translate-x-0",
      )}
      data-ocid="sidebar"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-sidebar-border px-4 shrink-0",
          collapsed && !isMobile ? "justify-center" : "gap-3",
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {(!collapsed || isMobile) && (
          <span className="font-display font-bold text-sidebar-foreground text-lg leading-tight">
            GulfHR
            <span className="text-sidebar-primary"> Shield</span>
          </span>
        )}
        {isMobile && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role label */}
      {(!collapsed || isMobile) && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-widest">
            Role-based
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2" data-ocid="sidebar.nav">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/dashboard" &&
              location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={`sidebar.nav.${item.label.toLowerCase().replace(/\s/g, "_")}.link`}
              className={cn(
                "sidebar-nav-item mb-1",
                collapsed && !isMobile ? "justify-center px-2" : "",
                isActive && "active",
              )}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user + collapse toggle */}
      <div className="border-t border-sidebar-border p-2 space-y-1 shrink-0">
        {(!collapsed || isMobile) && currentUser && (
          <div className="px-3 py-2 rounded-md">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {currentUser.fullName}
            </p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">
              {currentUser.role.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={clearUser}
          data-ocid="sidebar.logout_button"
          className={cn(
            "sidebar-nav-item w-full text-destructive hover:bg-destructive/10",
            collapsed && !isMobile ? "justify-center px-2" : "",
          )}
          title={collapsed && !isMobile ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!collapsed || isMobile) && <span className="text-sm">Logout</span>}
        </button>
        {!isMobile && (
          <button
            type="button"
            onClick={toggleSidebar}
            data-ocid="sidebar.toggle"
            className="sidebar-nav-item w-full justify-center px-2"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
