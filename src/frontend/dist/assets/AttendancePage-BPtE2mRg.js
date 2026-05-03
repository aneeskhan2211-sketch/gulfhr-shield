import { c as createLucideIcon, r as reactExports, m as formatDate, j as jsxRuntimeExports, t as timestampToDate, v as useAuthStore, S as Shield } from "./index-DqipwkTD.js";
import { u as useListAttendanceLogs, a as useGetActiveCheckIn, b as useCheckIn, c as useCheckOut, d as useListAttendanceByMonth } from "./attendance-BHJK1AGJ.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { D as DataTable } from "./DataTable-BunDOGnY.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { L as LogOut, C as Clock, A as AppShell } from "./AppShell-CUGPoZlf.js";
import { C as CircleX } from "./circle-x-dVzc6B1W.js";
import { C as CircleCheckBig } from "./circle-check-big-B7EgiPXR.js";
import { I as Info } from "./info-zGkwlnOj.js";
import { C as CircleAlert } from "./circle-alert-CLODWFL3.js";
import { T as TabsNav } from "./TabsNav-DVgEuIM0.js";
import "./chevron-up-0G4ukNk8.js";
import "./index-DzTulS2Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function formatTimeShort(ts) {
  return timestampToDate(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function deriveStatus(log) {
  const checkInDate = timestampToDate(log.checkInTime);
  const lateThreshold = new Date(checkInDate);
  lateThreshold.setHours(9, 15, 0, 0);
  if (checkInDate > lateThreshold) return "Late";
  return "Present";
}
function AttendanceReport() {
  var _a;
  const { data: employees = [], isLoading: empLoading } = useListEmployees();
  const [selectedEmployeeId, setSelectedEmployeeId] = reactExports.useState("");
  const [fromDate, setFromDate] = reactExports.useState("");
  const [toDate, setToDate] = reactExports.useState("");
  const targetId = selectedEmployeeId ? BigInt(selectedEmployeeId) : (_a = employees[0]) == null ? void 0 : _a.id;
  const { data: logs = [], isLoading: logsLoading } = useListAttendanceLogs(targetId);
  const filtered = reactExports.useMemo(() => {
    let result = [...logs];
    if (fromDate) {
      const from = new Date(fromDate).getTime();
      result = result.filter((l) => Number(l.checkInTime / 1000000n) >= from);
    }
    if (toDate) {
      const to = new Date(toDate).getTime() + 864e5;
      result = result.filter((l) => Number(l.checkInTime / 1000000n) <= to);
    }
    return result;
  }, [logs, fromDate, toDate]);
  const rows = reactExports.useMemo(() => {
    const empMap = new Map(employees.map((e) => [String(e.id), e.fullName]));
    return filtered.map((log) => ({
      key: String(log.id),
      employeeName: empMap.get(String(log.employeeId)) ?? `Emp #${log.employeeId}`,
      date: formatDate(log.checkInTime),
      checkIn: formatTimeShort(log.checkInTime),
      checkOut: log.checkOutTime ? formatTimeShort(log.checkOutTime) : "—",
      workHours: log.workHours != null ? `${log.workHours.toFixed(1)}h` : "—",
      status: log.checkOutTime ? deriveStatus(log) : "Active"
    }));
  }, [filtered, employees]);
  const columns = [
    { key: "employeeName", label: "Employee", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "checkIn", label: "Check In", sortable: false },
    { key: "checkOut", label: "Check Out", sortable: false },
    { key: "workHours", label: "Work Hours", sortable: false, align: "right" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (val) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          status: String(val) === "Late" ? "expiring" : String(val) === "Active" ? "active" : "valid",
          label: String(val)
        }
      )
    }
  ];
  function exportCSV() {
    const header = "Employee,Date,Check In,Check Out,Work Hours,Status";
    const csvRows = rows.map(
      (r) => `"${r.employeeName}","${r.date}","${r.checkIn}","${r.checkOut}","${r.workHours}","${r.status}"`
    );
    const blob = new Blob([[header, ...csvRows].join("\n")], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "attendance.report.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardHeader,
      {
        title: "Attendance Report",
        subtitle: "Filter by employee and date range",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: exportCSV,
            "data-ocid": "attendance.report.export_button",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Export CSV"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-5 p-3 bg-muted/30 rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground mr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Filters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: selectedEmployeeId,
          onChange: (e) => setSelectedEmployeeId(e.target.value),
          disabled: empLoading,
          "data-ocid": "attendance.report.employee_select",
          className: "text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Employees" }),
            employees.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(e.id), children: e.fullName }, String(e.id)))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "att-from", className: "text-xs text-muted-foreground", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "att-from",
            type: "date",
            value: fromDate,
            onChange: (e) => setFromDate(e.target.value),
            "data-ocid": "attendance.report.from_input",
            className: "text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "att-to", className: "text-xs text-muted-foreground", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "att-to",
            type: "date",
            value: toDate,
            onChange: (e) => setToDate(e.target.value),
            "data-ocid": "attendance.report.to_input",
            className: "text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      (fromDate || toDate || selectedEmployeeId) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          "data-ocid": "attendance.report.clear_button",
          onClick: () => {
            setFromDate("");
            setToDate("");
            setSelectedEmployeeId("");
          },
          className: "text-xs",
          children: "Clear"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: rows,
        loading: logsLoading || empLoading,
        emptyMessage: "No attendance records match the selected filters.",
        getRowId: (r) => r.key,
        "data-ocid": "attendance.report.table"
      }
    )
  ] });
}
function formatTime(ts) {
  return timestampToDate(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function calcWorkHours(checkIn, checkOut) {
  if (!checkOut) return "—";
  const diffMs = Number((checkOut - checkIn) / 1000000n);
  const h = Math.floor(diffMs / 36e5);
  const m = Math.floor(diffMs % 36e5 / 6e4);
  return `${h}h ${m}m`;
}
function CheckInPanel() {
  var _a;
  const { currentUser } = useAuthStore();
  const employeeId = currentUser ? BigInt(currentUser.id) : void 0;
  const { data: activeLog, isLoading } = useGetActiveCheckIn(employeeId);
  const checkIn = useCheckIn();
  const checkOut = useCheckOut();
  const [locationConsent, setLocationConsent] = reactExports.useState("pending");
  const [selfieModalOpen, setSelfieModalOpen] = reactExports.useState(false);
  const activeRecord = activeLog ?? null;
  const isCheckedIn = activeRecord !== null && !activeRecord.checkOutTime;
  async function handleCheckIn() {
    if (!employeeId) return;
    await checkIn.mutateAsync({
      employeeId,
      consentGiven: locationConsent === "accepted",
      checkInLocation: void 0,
      selfieBlob: void 0
    });
  }
  async function handleCheckOut() {
    if (!activeRecord) return;
    await checkOut.mutateAsync({
      logId: activeRecord.id,
      checkOutLocation: void 0
    });
  }
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const summaryItems = [
    {
      label: "Check In",
      value: activeRecord ? formatTime(activeRecord.checkInTime) : "—",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-3.5 h-3.5" })
    },
    {
      label: "Check Out",
      value: (activeRecord == null ? void 0 : activeRecord.checkOutTime) ? formatTime(activeRecord.checkOutTime) : "—",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" })
    },
    {
      label: "Work Hours",
      value: activeRecord ? calcWorkHours(activeRecord.checkInTime, activeRecord.checkOutTime) : "—",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContainer,
      {
        className: "lg:col-span-2",
        "data-ocid": "attendance.checkin.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              title: "Attendance Check-In",
              subtitle: today,
              action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-2.5 h-2.5 rounded-full ${isCheckedIn ? "bg-chart-3 animate-pulse" : "bg-muted-foreground"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: isCheckedIn ? "Checked In" : "Not Checked In" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-5", children: summaryItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/40 rounded-lg p-3 flex flex-col gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  item.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: item.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: item.value })
              ]
            },
            item.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
            !isCheckedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "attendance.checkin_button",
                onClick: handleCheckIn,
                disabled: isLoading || checkIn.isPending,
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  checkIn.isPending ? "Checking In…" : "Check In"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                "data-ocid": "attendance.checkout_button",
                onClick: handleCheckOut,
                disabled: isLoading || checkOut.isPending,
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                  checkOut.isPending ? "Checking Out…" : "Check Out"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                "data-ocid": "attendance.selfie_button",
                onClick: () => setSelfieModalOpen(true),
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                  "Take Selfie"
                ]
              }
            )
          ] }),
          (checkIn.isError || checkOut.isError) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 flex items-center gap-2 text-sm text-destructive",
              "data-ocid": "attendance.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 shrink-0" }),
                ((_a = checkIn.error ?? checkOut.error) == null ? void 0 : _a.message) ?? "Action failed"
              ]
            }
          ),
          (checkIn.isSuccess || checkOut.isSuccess) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 flex items-center gap-2 text-sm text-chart-3",
              "data-ocid": "attendance.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 shrink-0" }),
                checkIn.isSuccess ? "Checked in successfully" : "Checked out successfully"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "attendance.location_consent.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Location Privacy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: "Location will only be used during check-in/check-out with your consent. No background tracking." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: locationConsent === "accepted" ? "default" : "outline",
              "data-ocid": "attendance.location_consent.accept_button",
              onClick: () => setLocationConsent("accepted"),
              className: "flex-1 gap-1.5 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                "Accept"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: locationConsent === "declined" ? "destructive" : "outline",
              "data-ocid": "attendance.location_consent.decline_button",
              onClick: () => setLocationConsent("declined"),
              className: "flex-1 gap-1.5 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                "Decline"
              ]
            }
          )
        ] }),
        locationConsent !== "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "Status:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: locationConsent === "accepted" ? "text-chart-3" : "text-destructive",
              children: locationConsent === "accepted" ? "Location enabled" : "Location disabled"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "attendance.geofence.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Office Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group ml-auto cursor-help", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-5 w-56 hidden group-hover:block bg-popover border border-border rounded-lg p-2.5 shadow-lg z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Geofence validation is a future feature. Location boundaries will be enforced in a future release." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Dubai Silicon Oasis, Block B, Dubai, UAE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent", children: "Geofence validation — Future Feature" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: selfieModalOpen,
        onClose: () => setSelfieModalOpen(false),
        title: "Selfie Check-In",
        "data-ocid": "attendance.selfie.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center leading-relaxed", children: "Selfie will be stored with your attendance record for verification purposes. This feature is enabled with your consent." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-lg bg-accent/10 border border-accent/20 p-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-medium", children: "Feature Coming Soon" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setSelfieModalOpen(false),
              "data-ocid": "attendance.selfie.cancel_button",
              className: "w-full",
              children: "Cancel"
            }
          )
        ] })
      }
    )
  ] });
}
const WORK_DAYS_PER_MONTH = 22;
const LATE_THRESHOLD_HOUR = 9;
const LATE_THRESHOLD_MIN = 15;
const EARLY_CHECKOUT_HOUR = 17;
function isLate(log) {
  const d = timestampToDate(log.checkInTime);
  return d.getHours() > LATE_THRESHOLD_HOUR || d.getHours() === LATE_THRESHOLD_HOUR && d.getMinutes() > LATE_THRESHOLD_MIN;
}
function isEarlyCheckout(log) {
  if (!log.checkOutTime) return false;
  const d = timestampToDate(log.checkOutTime);
  return d.getHours() < EARLY_CHECKOUT_HOUR;
}
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function MonthlySummary() {
  const now = /* @__PURE__ */ new Date();
  const [month, setMonth] = reactExports.useState(now.getMonth() + 1);
  const [year, setYear] = reactExports.useState(now.getFullYear());
  const { data: logs = [], isLoading: logsLoading } = useListAttendanceByMonth(
    BigInt(month),
    BigInt(year)
  );
  const { data: employees = [], isLoading: empLoading } = useListEmployees();
  const rows = reactExports.useMemo(() => {
    const empMap = new Map(employees.map((e) => [String(e.id), e.fullName]));
    const grouped = /* @__PURE__ */ new Map();
    for (const log of logs) {
      const key = String(log.employeeId);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(log);
    }
    const result = [];
    const seen = /* @__PURE__ */ new Set();
    for (const [empId, empLogs] of grouped) {
      seen.add(empId);
      const completed = empLogs.filter((l) => l.checkOutTime);
      const totalHrs = completed.reduce(
        (sum, l) => sum + (l.workHours ?? 0),
        0
      );
      const present = new Set(
        empLogs.map((l) => timestampToDate(l.checkInTime).toDateString())
      ).size;
      const absent = Math.max(0, WORK_DAYS_PER_MONTH - present);
      result.push({
        employeeId: empId,
        employeeName: empMap.get(empId) ?? `Employee #${empId}`,
        presentDays: present,
        absentDays: absent,
        lateCheckIns: empLogs.filter(isLate).length,
        earlyCheckOuts: completed.filter(isEarlyCheckout).length,
        totalWorkHours: `${totalHrs.toFixed(1)}h`,
        avgHoursPerDay: present > 0 ? `${(totalHrs / present).toFixed(1)}h` : "—"
      });
    }
    for (const emp of employees) {
      const key = String(emp.id);
      if (!seen.has(key)) {
        result.push({
          employeeId: key,
          employeeName: emp.fullName,
          presentDays: 0,
          absentDays: WORK_DAYS_PER_MONTH,
          lateCheckIns: 0,
          earlyCheckOuts: 0,
          totalWorkHours: "0h",
          avgHoursPerDay: "—"
        });
      }
    }
    return result.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  }, [logs, employees]);
  const columns = [
    { key: "employeeName", label: "Employee", sortable: true },
    { key: "presentDays", label: "Present", sortable: true, align: "right" },
    { key: "absentDays", label: "Absent", sortable: true, align: "right" },
    {
      key: "lateCheckIns",
      label: "Late Check-Ins",
      sortable: true,
      align: "right"
    },
    {
      key: "earlyCheckOuts",
      label: "Early Check-Outs",
      sortable: true,
      align: "right"
    },
    {
      key: "totalWorkHours",
      label: "Total Hours",
      sortable: false,
      align: "right"
    },
    {
      key: "avgHoursPerDay",
      label: "Avg/Day",
      sortable: false,
      align: "right"
    }
  ];
  const yearOptions = [year - 1, year, year + 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "attendance.monthly.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardHeader,
      {
        title: "Monthly Attendance Summary",
        subtitle: `${MONTHS[month - 1]} ${year}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: month,
              onChange: (e) => setMonth(Number(e.target.value)),
              "data-ocid": "attendance.monthly.month_select",
              className: "text-sm bg-card border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: m }, m))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: year,
              onChange: (e) => setYear(Number(e.target.value)),
              "data-ocid": "attendance.monthly.year_select",
              className: "text-sm bg-card border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              children: yearOptions.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5", children: [
      { label: "Total Employees", value: rows.length },
      {
        label: "Perfect Attendance",
        value: rows.filter(
          (r) => r.absentDays === 0 && r.lateCheckIns === 0
        ).length
      },
      {
        label: "Avg Present Days",
        value: rows.length > 0 ? `${(rows.reduce((s, r) => s + r.presentDays, 0) / rows.length).toFixed(1)}` : "—"
      },
      {
        label: "Late Check-Ins",
        value: rows.reduce((s, r) => s + r.lateCheckIns, 0)
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/40 rounded-lg p-3 flex flex-col gap-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: stat.value })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: rows,
        loading: logsLoading || empLoading,
        emptyMessage: `No attendance data for ${MONTHS[month - 1]} ${year}.`,
        getRowId: (r) => r.employeeId,
        "data-ocid": "attendance.monthly.table"
      }
    )
  ] });
}
const TABS = [
  { key: "checkin", label: "Check-In / Check-Out" },
  { key: "report", label: "Attendance Report" },
  { key: "summary", label: "Monthly Summary" }
];
function AttendancePage() {
  const [activeTab, setActiveTab] = reactExports.useState("checkin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Attendance", breadcrumbs: [{ label: "Attendance" }], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "attendance.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsNav,
      {
        tabs: TABS,
        activeTab,
        onTabChange: setActiveTab,
        "data-ocid": "attendance.tabs"
      }
    ),
    activeTab === "checkin" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckInPanel, {}),
    activeTab === "report" && /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceReport, {}),
    activeTab === "summary" && /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlySummary, {})
  ] }) });
}
export {
  AttendancePage as default
};
