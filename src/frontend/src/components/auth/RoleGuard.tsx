import type { UserRole } from "@/backend";
import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback = "/dashboard",
}: RoleGuardProps) {
  const { currentUser } = useAuthStore();

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
