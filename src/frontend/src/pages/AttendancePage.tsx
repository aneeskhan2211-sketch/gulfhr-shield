import AttendanceReport from "@/components/attendance/AttendanceReport";
import CheckInPanel from "@/components/attendance/CheckInPanel";
import MonthlySummary from "@/components/attendance/MonthlySummary";
import AppShell from "@/components/layout/AppShell";
import TabsNav from "@/components/ui/TabsNav";
import { useState } from "react";

const TABS = [
  { key: "checkin", label: "Check-In / Check-Out" },
  { key: "report", label: "Attendance Report" },
  { key: "summary", label: "Monthly Summary" },
];

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("checkin");

  return (
    <AppShell pageTitle="Attendance" breadcrumbs={[{ label: "Attendance" }]}>
      <div className="space-y-5" data-ocid="attendance.page">
        <TabsNav
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          data-ocid="attendance.tabs"
        />
        {activeTab === "checkin" && <CheckInPanel />}
        {activeTab === "report" && <AttendanceReport />}
        {activeTab === "summary" && <MonthlySummary />}
      </div>
    </AppShell>
  );
}
