import { useGetMyCompany, useUpdateAlertThresholds } from "@/api/company";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const THRESHOLDS = [
  {
    value: 7,
    label: "7 days",
    description: "Alert when document/visa expires within 7 days",
  },
  {
    value: 30,
    label: "30 days",
    description: "Alert when document/visa expires within 30 days",
  },
  {
    value: 60,
    label: "60 days",
    description: "Alert when document/visa expires within 60 days",
  },
];

export default function AlertThresholds() {
  const { data: company } = useGetMyCompany();
  const updateMutation = useUpdateAlertThresholds();

  const currentThreshold = company?.alertThresholdDays?.[0]
    ? Number(company.alertThresholdDays[0])
    : 30;

  const [selected, setSelected] = useState<number>(currentThreshold);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    try {
      await updateMutation.mutateAsync([BigInt(selected)]);
      setSaved(true);
      toast.success(`Alert threshold updated to ${selected} days.`);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Failed to update threshold.");
    }
  }

  return (
    <div className="space-y-5" data-ocid="settings.alert_thresholds.section">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">
          Expiry Alert Window
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          Set how far in advance you want to receive alerts for expiring visas,
          passports, and documents.
        </p>
        <div className="flex flex-col gap-3">
          {THRESHOLDS.map((threshold) => (
            <label
              key={threshold.value}
              className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth
                hover:bg-muted/40 has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
              data-ocid={`settings.threshold_${threshold.value}.radio`}
            >
              <input
                type="radio"
                name="alertThreshold"
                value={threshold.value}
                checked={selected === threshold.value}
                onChange={() => setSelected(threshold.value)}
                className="mt-0.5 accent-primary"
              />
              <div>
                <div className="font-semibold text-sm text-foreground">
                  {threshold.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {threshold.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={handleSave}
          disabled={updateMutation.isPending}
          data-ocid="settings.alert_thresholds.save_button"
        >
          {updateMutation.isPending ? "Saving…" : "Save Threshold"}
        </Button>
        {saved && (
          <span
            className="text-sm text-chart-3 font-medium"
            data-ocid="settings.threshold.success_state"
          >
            ✓ Saved successfully
          </span>
        )}
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="text-xs text-muted-foreground">
          <strong className="text-foreground">Current setting:</strong> Alerts
          trigger <strong className="text-primary">{selected} days</strong>{" "}
          before expiry.
        </div>
      </div>
    </div>
  );
}
