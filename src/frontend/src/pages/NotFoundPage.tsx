import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-6"
      data-ocid="notfound.page"
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-sidebar mx-auto flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-chart-2" />
        </div>
        <p className="text-7xl font-display font-bold text-primary/20 mb-4">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or you don't have permission
          to access it.
        </p>
        <Link
          to="/dashboard"
          data-ocid="notfound.dashboard_link"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
