import { useCheckIn, useCheckOut, useGetActiveCheckIn } from "@/api/attendance";
import { timestampToDate } from "@/api/backend";
import type { AttendanceLog } from "@/backend";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  Clock,
  Info,
  LogIn,
  LogOut,
  MapPin,
  Shield,
  XCircle,
} from "lucide-react";
import { useState } from "react";

function formatTime(ts: bigint): string {
  return timestampToDate(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calcWorkHours(checkIn: bigint, checkOut: bigint | undefined): string {
  if (!checkOut) return "—";
  const diffMs = Number((checkOut - checkIn) / 1_000_000n);
  const h = Math.floor(diffMs / 3_600_000);
  const m = Math.floor((diffMs % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

export default function CheckInPanel() {
  const { currentUser } = useAuthStore();
  const employeeId = currentUser ? BigInt(currentUser.id) : undefined;

  const { data: activeLog, isLoading } = useGetActiveCheckIn(employeeId);
  const checkIn = useCheckIn();
  const checkOut = useCheckOut();

  const [locationConsent, setLocationConsent] = useState<
    "pending" | "accepted" | "declined"
  >("pending");
  const [selfieModalOpen, setSelfieModalOpen] = useState(false);

  // activeLog is AttendanceLog | null
  const activeRecord: AttendanceLog | null = activeLog ?? null;
  const isCheckedIn = activeRecord !== null && !activeRecord.checkOutTime;

  async function handleCheckIn() {
    if (!employeeId) return;
    await checkIn.mutateAsync({
      employeeId,
      consentGiven: locationConsent === "accepted",
      checkInLocation: undefined,
      selfieBlob: undefined,
    });
  }

  async function handleCheckOut() {
    if (!activeRecord) return;
    await checkOut.mutateAsync({
      logId: activeRecord.id,
      checkOutLocation: undefined,
    });
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const summaryItems = [
    {
      label: "Check In",
      value: activeRecord ? formatTime(activeRecord.checkInTime) : "—",
      icon: <LogIn className="w-3.5 h-3.5" />,
    },
    {
      label: "Check Out",
      value: activeRecord?.checkOutTime
        ? formatTime(activeRecord.checkOutTime)
        : "—",
      icon: <LogOut className="w-3.5 h-3.5" />,
    },
    {
      label: "Work Hours",
      value: activeRecord
        ? calcWorkHours(activeRecord.checkInTime, activeRecord.checkOutTime)
        : "—",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Check-In/Out Control */}
      <CardContainer
        className="lg:col-span-2"
        data-ocid="attendance.checkin.panel"
      >
        <CardHeader
          title="Attendance Check-In"
          subtitle={today}
          action={
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isCheckedIn
                    ? "bg-chart-3 animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {isCheckedIn ? "Checked In" : "Not Checked In"}
              </span>
            </div>
          }
        />

        <div className="grid grid-cols-3 gap-3 mb-5">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="bg-muted/40 rounded-lg p-3 flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          {!isCheckedIn ? (
            <Button
              data-ocid="attendance.checkin_button"
              onClick={handleCheckIn}
              disabled={isLoading || checkIn.isPending}
              className="gap-2"
            >
              <LogIn className="w-4 h-4" />
              {checkIn.isPending ? "Checking In…" : "Check In"}
            </Button>
          ) : (
            <Button
              variant="destructive"
              data-ocid="attendance.checkout_button"
              onClick={handleCheckOut}
              disabled={isLoading || checkOut.isPending}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              {checkOut.isPending ? "Checking Out…" : "Check Out"}
            </Button>
          )}
          <Button
            variant="outline"
            data-ocid="attendance.selfie_button"
            onClick={() => setSelfieModalOpen(true)}
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            Take Selfie
          </Button>
        </div>

        {(checkIn.isError || checkOut.isError) && (
          <div
            className="mt-3 flex items-center gap-2 text-sm text-destructive"
            data-ocid="attendance.error_state"
          >
            <XCircle className="w-4 h-4 shrink-0" />
            {(checkIn.error ?? checkOut.error)?.message ?? "Action failed"}
          </div>
        )}
        {(checkIn.isSuccess || checkOut.isSuccess) && (
          <div
            className="mt-3 flex items-center gap-2 text-sm text-chart-3"
            data-ocid="attendance.success_state"
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            {checkIn.isSuccess
              ? "Checked in successfully"
              : "Checked out successfully"}
          </div>
        )}
      </CardContainer>

      {/* Side panel */}
      <div className="flex flex-col gap-4">
        {/* Location consent */}
        <CardContainer data-ocid="attendance.location_consent.panel">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Location Privacy
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Location will only be used during check-in/check-out with your
                consent. No background tracking.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={locationConsent === "accepted" ? "default" : "outline"}
              data-ocid="attendance.location_consent.accept_button"
              onClick={() => setLocationConsent("accepted")}
              className="flex-1 gap-1.5 text-xs"
            >
              <CheckCircle className="w-3 h-3" />
              Accept
            </Button>
            <Button
              size="sm"
              variant={
                locationConsent === "declined" ? "destructive" : "outline"
              }
              data-ocid="attendance.location_consent.decline_button"
              onClick={() => setLocationConsent("declined")}
              className="flex-1 gap-1.5 text-xs"
            >
              <XCircle className="w-3 h-3" />
              Decline
            </Button>
          </div>
          {locationConsent !== "pending" && (
            <p className="mt-2 text-xs text-muted-foreground">
              Status:{" "}
              <span
                className={
                  locationConsent === "accepted"
                    ? "text-chart-3"
                    : "text-destructive"
                }
              >
                {locationConsent === "accepted"
                  ? "Location enabled"
                  : "Location disabled"}
              </span>
            </p>
          )}
        </CardContainer>

        {/* Geofence placeholder */}
        <CardContainer data-ocid="attendance.geofence.panel">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              Office Location
            </span>
            <div className="relative group ml-auto cursor-help">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="absolute right-0 bottom-5 w-56 hidden group-hover:block bg-popover border border-border rounded-lg p-2.5 shadow-lg z-10">
                <p className="text-xs text-muted-foreground">
                  Geofence validation is a future feature. Location boundaries
                  will be enforced in a future release.
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Dubai Silicon Oasis, Block B, Dubai, UAE
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent">
              Geofence validation — Future Feature
            </span>
          </div>
        </CardContainer>
      </div>

      {/* Selfie consent modal */}
      <Modal
        open={selfieModalOpen}
        onClose={() => setSelfieModalOpen(false)}
        title="Selfie Check-In"
        data-ocid="attendance.selfie.dialog"
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Selfie will be stored with your attendance record for verification
            purposes. This feature is enabled with your consent.
          </p>
          <div className="w-full rounded-lg bg-accent/10 border border-accent/20 p-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-accent shrink-0" />
            <span className="text-xs text-accent font-medium">
              Feature Coming Soon
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => setSelfieModalOpen(false)}
            data-ocid="attendance.selfie.cancel_button"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
