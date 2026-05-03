import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DemoPage from "@/pages/DemoPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Lazy-load all pages for code splitting
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EmployeesPage = lazy(() => import("@/pages/EmployeesPage"));
const EmployeeDetailPage = lazy(() => import("@/pages/EmployeeDetailPage"));
const DocumentsPage = lazy(() => import("@/pages/DocumentsPage"));
const VisaAlertsPage = lazy(() => import("@/pages/VisaAlertsPage"));
const PayrollPage = lazy(() => import("@/pages/PayrollPage"));
const PayrollDetailPage = lazy(() => import("@/pages/PayrollDetailPage"));
const WpsPage = lazy(() => import("@/pages/WpsPage"));
const AttendancePage = lazy(() => import("@/pages/AttendancePage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const BillingPage = lazy(() => import("@/pages/BillingPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const ROIDashboardPage = lazy(() => import("@/pages/ROIDashboardPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <ProtectedRoute>
                <EmployeeDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visa-alerts"
            element={
              <ProtectedRoute>
                <VisaAlertsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <PayrollPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll/:id"
            element={
              <ProtectedRoute>
                <PayrollDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wps"
            element={
              <ProtectedRoute>
                <WpsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roi"
            element={
              <ProtectedRoute>
                <ROIDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
