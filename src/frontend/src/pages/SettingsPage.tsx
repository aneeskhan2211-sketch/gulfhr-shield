import AppShell from "@/components/layout/AppShell";
import AlertThresholds from "@/components/settings/AlertThresholds";
import CompanyProfileForm from "@/components/settings/CompanyProfileForm";
import UserManagement from "@/components/settings/UserManagement";
import WhatsAppNotificationSettings from "@/components/settings/WhatsAppNotificationSettings";
import CardContainer from "@/components/ui/CardContainer";
import TabsNav from "@/components/ui/TabsNav";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUIStore } from "@/stores/uiStore";
import { Globe, Moon, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SETTINGS_TABS = [
  { key: "company", label: "Company Profile" },
  { key: "users", label: "User Management" },
  { key: "alerts", label: "Alert Thresholds" },
  { key: "wps", label: "WPS Configuration" },
  { key: "whatsapp", label: "WhatsApp Notifications" },
  { key: "preferences", label: "Preferences" },
  { key: "data", label: "Data Management" },
];

const WPS_TEMPLATES = [
  {
    value: "UAE_SIF",
    label: "UAE — SIF Format",
    description:
      "Salary Information File format used by UAE banks and WPS system. Includes IBAN, employee ID, and net salary fields.",
  },
  {
    value: "OMAN_MOL",
    label: "Oman — MOL Format",
    description:
      "Ministry of Manpower format for Oman. Uses civil ID, establishment ID, and basic/gross salary breakdowns.",
  },
  {
    value: "QATAR",
    label: "Qatar — MOCI Format",
    description:
      "Ministry of Commerce format for Qatar. Includes QID, employer registration, and payment details.",
  },
  {
    value: "KSA",
    label: "Saudi Arabia — MUDAD Format",
    description:
      "MUDAD-compatible payroll file for KSA. Maps to IQAMA numbers and Saudi Riyal salary entries.",
  },
  {
    value: "BAHRAIN",
    label: "Bahrain — LMRA Format",
    description:
      "Labour Market Regulatory Authority format for Bahrain. Requires CPR number and employer ID.",
  },
  {
    value: "KUWAIT",
    label: "Kuwait — MOL Format",
    description:
      "Ministry of Labour Kuwait format. Requires civil ID and PIFSS registration number.",
  },
];

function WpsConfiguration() {
  const [selectedTemplate, setSelectedTemplate] = useState("UAE_SIF");
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    toast.success("WPS template preference saved.");
    setTimeout(() => setSaved(false), 3000);
  }
  const desc =
    WPS_TEMPLATES.find((t) => t.value === selectedTemplate)?.description ?? "";
  return (
    <div className="space-y-5" data-ocid="settings.wps_config.section">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">
          Default WPS Country Template
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          Select the country format that matches your primary banking and
          payroll jurisdiction.
        </p>
        <div className="space-y-2">
          <Label htmlFor="wps-template">Country Template</Label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger
              id="wps-template"
              className="w-full max-w-sm"
              data-ocid="settings.wps_template.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WPS_TEMPLATES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {desc && (
            <p className="text-xs text-muted-foreground mt-2 max-w-lg">
              {desc}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={handleSave}
          data-ocid="settings.wps_template.save_button"
        >
          Save Template
        </Button>
        {saved && (
          <span
            className="text-sm text-chart-3 font-medium"
            data-ocid="settings.wps_template.success_state"
          >
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
}

function Preferences() {
  const { theme, toggleTheme } = useUIStore();
  const isDark = theme === "dark";
  return (
    <div className="space-y-6" data-ocid="settings.preferences.section">
      <div className="flex items-center justify-between p-4 rounded-xl border border-border">
        <div className="flex items-center gap-3">
          {isDark ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <Sun className="w-5 h-5 text-accent" />
          )}
          <div>
            <div className="font-medium text-sm text-foreground">Dark Mode</div>
            <div className="text-xs text-muted-foreground">
              Toggle between light and dark themes. Saved automatically.
            </div>
          </div>
        </div>
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          aria-label="Toggle dark mode"
          data-ocid="settings.dark_mode.switch"
        />
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-border">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div>
            <div className="font-medium text-sm text-foreground">Language</div>
            <div className="text-xs text-muted-foreground">
              Display language for the interface
            </div>
          </div>
        </div>
        <Select defaultValue="en">
          <SelectTrigger className="w-36" data-ocid="settings.language.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function DataManagement() {
  const [exportQueued, setExportQueued] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  function handleExport() {
    setExportQueued(true);
    toast.success(
      "Data export queued. You will receive a notification when ready.",
    );
    setTimeout(() => setExportQueued(false), 5000);
  }
  function handleLogout() {
    setLogoutSuccess(true);
    toast.success("All other sessions have been logged out.");
    setTimeout(() => setLogoutSuccess(false), 5000);
  }
  return (
    <div className="space-y-5" data-ocid="settings.data_management.section">
      <div className="rounded-xl border border-border p-5">
        <h4 className="font-semibold text-sm text-foreground mb-1">
          Request Data Export
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          Export all company data including employee records, payroll history,
          and audit logs as a ZIP archive.
        </p>
        {exportQueued && (
          <div
            className="mb-3 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm"
            data-ocid="settings.export.success_state"
          >
            ✓ Export queued. You will be notified when the file is ready.
          </div>
        )}
        <Button
          variant="outline"
          onClick={handleExport}
          data-ocid="settings.export.button"
        >
          Request Data Export
        </Button>
      </div>
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
        <h4 className="font-semibold text-sm text-destructive mb-1 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Logout All Sessions
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          Immediately invalidates all active sessions across all devices. You
          will remain logged in on this device.
        </p>
        {logoutSuccess && (
          <div
            className="mb-3 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm"
            data-ocid="settings.logout_all.success_state"
          >
            ✓ All other sessions logged out.
          </div>
        )}
        <Button
          variant="destructive"
          onClick={handleLogout}
          data-ocid="settings.logout_all.button"
        >
          Logout All Sessions
        </Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  return (
    <AppShell pageTitle="Settings">
      <div className="space-y-6">
        <TabsNav
          tabs={SETTINGS_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="flex-wrap"
          data-ocid="settings.tabs"
        />
        <CardContainer>
          {activeTab === "company" && <CompanyProfileForm />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "alerts" && <AlertThresholds />}
          {activeTab === "wps" && <WpsConfiguration />}
          {activeTab === "whatsapp" && <WhatsAppNotificationSettings />}
          {activeTab === "preferences" && <Preferences />}
          {activeTab === "data" && <DataManagement />}
        </CardContainer>
      </div>
    </AppShell>
  );
}
