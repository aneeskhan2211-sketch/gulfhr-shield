import AppShell from "@/components/layout/AppShell";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense, lazy } from "react";

// Dashboard content loaded separately for organization
const DashboardContent = lazy(() => import("./dashboard/DashboardContent"));

export default function DashboardPage() {
  return (
    <AppShell pageTitle="HR Compliance Dashboard">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner label="Loading dashboard..." />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </AppShell>
  );
}
