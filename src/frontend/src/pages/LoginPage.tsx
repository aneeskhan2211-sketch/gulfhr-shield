import { useGetMyProfile, useRegisterCompany } from "@/api/company";
import { UserRole } from "@/backend";
import type { CompanyInput } from "@/backend";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Loader2,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TRUST_BADGES = [
  { icon: Lock, label: "Bank-grade Encryption", sub: "AES-256 & IC Native" },
  { icon: Globe2, label: "Gulf Compliance Ready", sub: "UAE · SA · OM · QA" },
  {
    icon: Users,
    label: "Trusted by 500+ Companies",
    sub: "Across 6 GCC Countries",
  },
];

const DEMO_TOOLTIPS = [
  { id: "t1", text: "📊 Live compliance score — see 3 critical alerts" },
  { id: "t2", text: "⚡ 4 visas expiring in 5 days — click Fix Now" },
  { id: "t3", text: "💰 AED 45,000 penalty exposure — see full breakdown" },
];

export default function LoginPage() {
  const { login, loginStatus, identity, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useAuthStore();
  const [showRegistration, setShowRegistration] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [showDemoTooltip, setShowDemoTooltip] = useState(false);
  const [form, setForm] = useState<CompanyInput>({
    name: "",
    country: "UAE",
    registrationNumber: "",
    vatNumber: "",
    address: "",
    billingEmail: "",
    phone: "",
  });

  const profileQuery = useGetMyProfile();
  const registerCompany = useRegisterCompany();

  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!identity || !profileQuery.data) return;
    const profile = profileQuery.data;
    setUser({
      id: profile.id,
      fullName: profile.fullName,
      email: profile.email,
      role: profile.role,
      companyId: profile.companyId,
      companyName: "Demo Company",
      isDemo: true,
    });
    navigate("/dashboard", { replace: true });
  }, [identity, profileQuery.data, setUser, navigate]);

  useEffect(() => {
    if (identity && profileQuery.isError) {
      setShowRegistration(true);
    }
  }, [identity, profileQuery.isError]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError(null);
    try {
      const company = await registerCompany.mutateAsync(form);
      setUser({
        id: 1n,
        fullName: "Company Owner",
        email: form.billingEmail,
        role: UserRole.CompanyOwner,
        companyId: company.id,
        companyName: company.name,
        isDemo: false,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setRegError(err instanceof Error ? err.message : "Registration failed");
    }
  }

  function handleDemoLogin() {
    setShowDemoTooltip(true);
    setTimeout(() => navigate("/demo"), 600);
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-4"
      data-ocid="login.page"
    >
      {/* Background gradient pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-chart-3/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Hero headline */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-sidebar mx-auto flex items-center justify-center mb-4 shadow-xl ring-2 ring-sidebar-border">
            <Shield className="w-8 h-8 text-chart-2" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            GulfHR
            <span className="text-chart-2"> Shield</span>
          </h1>
          {/* Platform headline — conversion focused */}
          <div className="mt-3 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 inline-block">
            <p className="text-xs font-semibold text-destructive tracking-wide uppercase">
              Gulf's #1 Compliance Safety System
            </p>
          </div>
          <p className="text-muted-foreground mt-2 text-sm font-medium">
            Avoid Fines. Stay Compliant. Save Time.
          </p>
        </div>

        {!showRegistration ? (
          /* Login Card */
          <div
            className="bg-card border border-border rounded-2xl p-8 shadow-xl"
            data-ocid="login.card"
          >
            <h2 className="font-display font-semibold text-xl text-foreground mb-1">
              Sign in to your account
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Use Internet Identity to securely access your Gulf compliance
              dashboard.
            </p>

            {/* Primary login button */}
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="login.primary_button"
              className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 text-base mb-3"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" /> Sign in with Internet Identity
                </>
              )}
            </button>

            {/* Try Demo CTA — prominent */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoggingIn}
              data-ocid="login.demo_button"
              className={cn(
                "w-full flex items-center justify-center gap-3 py-3.5 text-base rounded-md font-bold border-2 transition-smooth",
                "border-accent text-accent bg-accent/10 hover:bg-accent/20 active:scale-95 disabled:opacity-50",
              )}
            >
              <Zap className="w-5 h-5" />
              Try Demo — No Sign Up Required
            </button>

            {/* Demo tooltips - appear after clicking Try Demo */}
            {showDemoTooltip && (
              <div
                className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-2"
                data-ocid="login.demo_tooltip"
              >
                <p className="text-xs font-semibold text-accent mb-2">
                  ✨ Demo includes 20 employees. Explore:
                </p>
                {DEMO_TOOLTIPS.map((tip) => (
                  <div key={tip.id} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    <p className="text-xs text-foreground">{tip.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Alert: penalty preview */}
            <div className="mt-4 p-3 bg-destructive/8 border border-destructive/20 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-xs text-foreground">
                <span className="font-semibold text-destructive">
                  ⚠️ Gulf companies face up to AED 50,000/year
                </span>{" "}
                in HR compliance fines. GulfHR Shield prevents them.
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Protected by Internet Computer cryptographic identity.
                <br />
                No password. No email. Just your secure keys.
              </p>
            </div>
          </div>
        ) : (
          /* Registration Card */
          <div
            className="bg-card border border-border rounded-2xl p-8 shadow-xl"
            data-ocid="register.card"
          >
            <h2 className="font-display font-semibold text-xl text-foreground mb-1">
              Register Your Company
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Welcome! Set up your company to activate Gulf compliance
              protection.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {regError && (
                <div
                  className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive"
                  data-ocid="register.error_state"
                >
                  {regError}
                </div>
              )}

              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                  htmlFor="reg-name"
                >
                  Company Name *
                </label>
                <input
                  id="reg-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-ocid="register.company_name.input"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Acme Gulf Trading LLC"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="reg-country"
                  >
                    Country *
                  </label>
                  <select
                    id="reg-country"
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    data-ocid="register.country.select"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {[
                      "UAE",
                      "Oman",
                      "Saudi Arabia",
                      "Qatar",
                      "Bahrain",
                      "Kuwait",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="reg-reg-no"
                  >
                    Reg. Number
                  </label>
                  <input
                    id="reg-reg-no"
                    value={form.registrationNumber}
                    onChange={(e) =>
                      setForm({ ...form, registrationNumber: e.target.value })
                    }
                    data-ocid="register.reg_number.input"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="CN-123456"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                  htmlFor="reg-email"
                >
                  Billing Email *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={form.billingEmail}
                  onChange={(e) =>
                    setForm({ ...form, billingEmail: e.target.value })
                  }
                  data-ocid="register.billing_email.input"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="hr@company.ae"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="reg-phone"
                  >
                    Phone
                  </label>
                  <input
                    id="reg-phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    data-ocid="register.phone.input"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="reg-vat"
                  >
                    VAT Number
                  </label>
                  <input
                    id="reg-vat"
                    value={form.vatNumber}
                    onChange={(e) =>
                      setForm({ ...form, vatNumber: e.target.value })
                    }
                    data-ocid="register.vat_number.input"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="TRN123456"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                  htmlFor="reg-address"
                >
                  Address
                </label>
                <input
                  id="reg-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  data-ocid="register.address.input"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Dubai, UAE"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegistration(false);
                    clear();
                  }}
                  data-ocid="register.cancel_button"
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={registerCompany.isPending}
                  data-ocid="register.submit_button"
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {registerCompany.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />{" "}
                      Registering...
                    </>
                  ) : (
                    <>
                      Register Company <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Trust badges */}
        <div
          className="mt-6 grid grid-cols-3 gap-3"
          data-ocid="login.trust_badges"
        >
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-1.5 bg-card/60 border border-border rounded-xl p-3 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-chart-3/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-chart-3" />
                </div>
                <p className="text-[10px] font-semibold text-foreground leading-tight">
                  {badge.label}
                </p>
                <p className="text-[9px] text-muted-foreground leading-tight">
                  {badge.sub}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          For UAE, Oman, Saudi Arabia, Qatar, Bahrain &amp; Kuwait
        </p>
      </div>
    </div>
  );
}
