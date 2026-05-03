import { c as createLucideIcon, F as useGetMyCompany, G as useUpdateAlertThresholds, r as reactExports, j as jsxRuntimeExports, a0 as useUpdateCompanyProfile, a1 as useListUsers, a2 as useInviteUser, a3 as useDeactivateUser, a4 as useUpdateUserRole, a5 as UserStatus, w as UserRole, u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor, a as cn, a6 as Variant_Salary_VisaAlert_PayrollApproval, a7 as Variant_Failed_Sent_Pending, h as CircleCheck } from "./index-DqipwkTD.js";
import { C as Clock, A as AppShell, u as useUIStore, M as Moon, b as Sun } from "./AppShell-CUGPoZlf.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { u as ue } from "./index-C86RAjSP.js";
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, u as usePrevious, e as useSize } from "./select-2niFz9CV.js";
import { L as Label, S as Search } from "./label-D1bf6s9f.js";
import { S as StatusBadge$1 } from "./StatusBadge-BbDJ5iJT.js";
import { U as UserPlus } from "./user-plus-CVlGN4Bl.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { S as SkeletonTable } from "./SkeletonLoader-BW78e9tY.js";
import { B as Badge } from "./badge-DL2xA-t4.js";
import { a as useControllableState, P as Primitive, c as composeEventHandlers, e as createContextScope } from "./Combination-DaLoBBr6.js";
import { u as useComposedRefs } from "./index-DzTulS2Y.js";
import { I as Info } from "./info-zGkwlnOj.js";
import { C as CircleX } from "./circle-x-dVzc6B1W.js";
import { C as CardContainer } from "./CardContainer-BlAWtbPm.js";
import { T as TabsNav } from "./TabsNav-DVgEuIM0.js";
import { T as Trash2 } from "./trash-2-zR8XdvHL.js";
import "./chevron-up-0G4ukNk8.js";
import "./index-BzDdetvs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const THRESHOLDS = [
  {
    value: 7,
    label: "7 days",
    description: "Alert when document/visa expires within 7 days"
  },
  {
    value: 30,
    label: "30 days",
    description: "Alert when document/visa expires within 30 days"
  },
  {
    value: 60,
    label: "60 days",
    description: "Alert when document/visa expires within 60 days"
  }
];
function AlertThresholds() {
  var _a;
  const { data: company } = useGetMyCompany();
  const updateMutation = useUpdateAlertThresholds();
  const currentThreshold = ((_a = company == null ? void 0 : company.alertThresholdDays) == null ? void 0 : _a[0]) ? Number(company.alertThresholdDays[0]) : 30;
  const [selected, setSelected] = reactExports.useState(currentThreshold);
  const [saved, setSaved] = reactExports.useState(false);
  async function handleSave() {
    try {
      await updateMutation.mutateAsync([BigInt(selected)]);
      setSaved(true);
      ue.success(`Alert threshold updated to ${selected} days.`);
      setTimeout(() => setSaved(false), 3e3);
    } catch {
      ue.error("Failed to update threshold.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "settings.alert_thresholds.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-1", children: "Expiry Alert Window" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Set how far in advance you want to receive alerts for expiring visas, passports, and documents." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: THRESHOLDS.map((threshold) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth\n                hover:bg-muted/40 has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5",
          "data-ocid": `settings.threshold_${threshold.value}.radio`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "alertThreshold",
                value: threshold.value,
                checked: selected === threshold.value,
                onChange: () => setSelected(threshold.value),
                className: "mt-0.5 accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: threshold.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: threshold.description })
            ] })
          ]
        },
        threshold.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleSave,
          disabled: updateMutation.isPending,
          "data-ocid": "settings.alert_thresholds.save_button",
          children: updateMutation.isPending ? "Saving…" : "Save Threshold"
        }
      ),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-sm text-chart-3 font-medium",
          "data-ocid": "settings.threshold.success_state",
          children: "✓ Saved successfully"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Current setting:" }),
      " Alerts trigger ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-primary", children: [
        selected,
        " days"
      ] }),
      " ",
      "before expiry."
    ] }) })
  ] });
}
const COUNTRIES = [
  { value: "AE", label: "United Arab Emirates" },
  { value: "OM", label: "Oman" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "QA", label: "Qatar" },
  { value: "BH", label: "Bahrain" },
  { value: "KW", label: "Kuwait" }
];
function CompanyProfileForm() {
  const { data: company, isLoading } = useGetMyCompany();
  const updateMutation = useUpdateCompanyProfile();
  const [form, setForm] = reactExports.useState({
    name: (company == null ? void 0 : company.name) ?? "Gulf Tech Solutions LLC",
    registrationNumber: (company == null ? void 0 : company.registrationNumber) ?? "CN-2021-UAE-00492",
    vatNumber: (company == null ? void 0 : company.vatNumber) ?? "100245678900003",
    address: (company == null ? void 0 : company.address) ?? "Business Bay, Dubai, UAE",
    country: (company == null ? void 0 : company.country) ?? "AE",
    phone: (company == null ? void 0 : company.phone) ?? "+971 4 234 5678",
    billingEmail: (company == null ? void 0 : company.billingEmail) ?? "billing@gulftech.ae"
  });
  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        name: form.name,
        registrationNumber: form.registrationNumber,
        vatNumber: form.vatNumber,
        address: form.address,
        country: form.country,
        phone: form.phone,
        billingEmail: form.billingEmail
      });
      ue.success("Company profile updated successfully.");
    } catch {
      ue.error("Failed to update profile. Please try again.");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 animate-pulse", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted rounded-lg" }, n)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-5",
      "data-ocid": "settings.company_profile.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-name", children: "Company Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-name",
                value: form.name,
                onChange: (e) => handleChange("name", e.target.value),
                "data-ocid": "settings.company_name.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-reg", children: "Registration Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-reg",
                value: form.registrationNumber,
                onChange: (e) => handleChange("registrationNumber", e.target.value),
                "data-ocid": "settings.reg_number.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-vat", children: "VAT Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-vat",
                value: form.vatNumber,
                onChange: (e) => handleChange("vatNumber", e.target.value),
                "data-ocid": "settings.vat_number.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-phone", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-phone",
                value: form.phone,
                onChange: (e) => handleChange("phone", e.target.value),
                "data-ocid": "settings.phone.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-address", children: "Office Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-address",
                value: form.address,
                onChange: (e) => handleChange("address", e.target.value),
                "data-ocid": "settings.address.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-country", children: "Country" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.country,
                onValueChange: (v) => handleChange("country", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "cp-country", "data-ocid": "settings.country.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select country" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: c.label }, c.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-billing-email", children: "Billing Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-billing-email",
                type: "email",
                value: form.billingEmail,
                onChange: (e) => handleChange("billingEmail", e.target.value),
                "data-ocid": "settings.billing_email.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: updateMutation.isPending,
            "data-ocid": "settings.company_profile.submit_button",
            children: updateMutation.isPending ? "Saving…" : "Save Changes"
          }
        ) })
      ]
    }
  );
}
const ROLES = [
  { value: UserRole.SuperAdmin, label: "Super Admin" },
  { value: UserRole.CompanyOwner, label: "Company Owner" },
  { value: UserRole.HRManager, label: "HR Manager" },
  { value: UserRole.Accountant, label: "Accountant" },
  { value: UserRole.BranchManager, label: "Branch Manager" },
  { value: UserRole.Employee, label: "Employee" }
];
const DEMO_USERS = [
  {
    id: 1n,
    fullName: "Ahmed Al-Farsi",
    email: "ahmed@gulftech.ae",
    role: UserRole.CompanyOwner,
    status: UserStatus.Active
  },
  {
    id: 2n,
    fullName: "Sarah Johnson",
    email: "sarah.hr@gulftech.ae",
    role: UserRole.HRManager,
    status: UserStatus.Active
  },
  {
    id: 3n,
    fullName: "Rajan Mehta",
    email: "rajan.acct@gulftech.ae",
    role: UserRole.Accountant,
    status: UserStatus.Active
  },
  {
    id: 4n,
    fullName: "Fatima Rashid",
    email: "fatima@gulftech.ae",
    role: UserRole.BranchManager,
    status: UserStatus.Active
  },
  {
    id: 5n,
    fullName: "John Smith",
    email: "john.s@gulftech.ae",
    role: UserRole.Employee,
    status: UserStatus.Inactive
  }
];
function UserManagement() {
  const { data: users, isLoading } = useListUsers();
  const inviteMutation = useInviteUser();
  const deactivateMutation = useDeactivateUser();
  const updateRoleMutation = useUpdateUserRole();
  const [inviteEmail, setInviteEmail] = reactExports.useState("");
  const [inviteRole, setInviteRole] = reactExports.useState("Employee");
  const [inviteSent, setInviteSent] = reactExports.useState(false);
  const displayUsers = (users == null ? void 0 : users.length) ? users : DEMO_USERS;
  async function handleInvite(e) {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      await inviteMutation.mutateAsync({
        fullName: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole
      });
      setInviteSent(true);
      setInviteEmail("");
      setTimeout(() => setInviteSent(false), 4e3);
    } catch {
      ue.error("Failed to send invite.");
    }
  }
  async function handleDeactivate(userId) {
    try {
      await deactivateMutation.mutateAsync(userId);
      ue.success("User deactivated.");
    } catch {
      ue.error("Failed to deactivate user.");
    }
  }
  async function handleRoleChange(userId, role) {
    try {
      await updateRoleMutation.mutateAsync({
        userId,
        role
      });
      ue.success("Role updated.");
    } catch {
      ue.error("Failed to update role.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.user_management.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-3", children: [
        "Team Members (",
        displayUsers.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [1, 2, 3, 4, 5].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded animate-pulse" }) }, c)) }, n)) : displayUsers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `settings.user.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-medium", children: user.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  defaultValue: user.role,
                  onValueChange: (v) => handleRoleChange(user.id, v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-7 text-xs w-40",
                        "data-ocid": `settings.user_role_${i + 1}.select`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.value, children: r.label }, r.value)) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge$1, { status: user.status, size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs h-7 text-muted-foreground hover:text-destructive",
                  onClick: () => handleDeactivate(user.id),
                  "data-ocid": `settings.deactivate_user.button.${i + 1}`,
                  children: "Deactivate"
                }
              ) })
            ]
          },
          String(user.id)
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
        " Invite New User"
      ] }),
      inviteSent && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-4 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm",
          "data-ocid": "settings.invite.success_state",
          children: "✓ Invitation sent successfully!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleInvite,
          className: "flex flex-col sm:flex-row gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invite-email", className: "sr-only", children: "Email address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "invite-email",
                  type: "email",
                  placeholder: "colleague@company.ae",
                  value: inviteEmail,
                  onChange: (e) => setInviteEmail(e.target.value),
                  required: true,
                  "data-ocid": "settings.invite_email.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: inviteRole, onValueChange: setInviteRole, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-44",
                  "data-ocid": "settings.invite_role.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.value, children: r.label }, r.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: inviteMutation.isPending,
                "data-ocid": "settings.invite.submit_button",
                children: inviteMutation.isPending ? "Sending…" : "Send Invite"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function useUpdateWhatsAppSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateWhatsAppSettings(settings));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["whatsappSettings", vars.employeeId.toString()]
      });
    }
  });
}
function useListNotificationLogs(limit = 50) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notificationLogs", limit],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listNotificationLogs(BigInt(limit)));
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useCreateNotificationLog() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.createNotificationLog(entry));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notificationLogs"] })
  });
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function CompanyToggles() {
  const [cfg, setCfg] = reactExports.useState({
    salary: true,
    visa: true,
    payroll: false
  });
  const rows = [
    {
      key: "salary",
      label: "Salary Confirmations",
      desc: "Notify employees when salary is processed"
    },
    {
      key: "visa",
      label: "Visa Expiry Alerts",
      desc: "Warn employees 30 days before visa expiry"
    },
    {
      key: "payroll",
      label: "Payroll Approval Notifications",
      desc: "Alert owners when payroll awaits approval"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "whatsapp.company_toggles.section", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-4 rounded-xl border border-border bg-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: r.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: cfg[r.key],
            onCheckedChange: (v) => setCfg((c) => ({ ...c, [r.key]: v })),
            "aria-label": r.label,
            "data-ocid": `whatsapp.company.${r.key}.switch`
          }
        )
      ]
    },
    r.key
  )) });
}
function EmployeeRow({ emp, idx }) {
  const [phone, setPhone] = reactExports.useState("");
  const [settings, setSettings] = reactExports.useState({
    salaryEnabled: false,
    visaAlertEnabled: false,
    payrollApprovalEnabled: false,
    phoneNumber: ""
  });
  const update = useUpdateWhatsAppSettings();
  function toggle(field) {
    const next = { ...settings, [field]: !settings[field] };
    setSettings(next);
    update.mutate({
      employeeId: emp.id,
      phoneNumber: phone,
      salaryEnabled: next.salaryEnabled,
      visaAlertEnabled: next.visaAlertEnabled,
      payrollApprovalEnabled: next.payrollApprovalEnabled
    });
  }
  function savePhone() {
    update.mutate({
      employeeId: emp.id,
      phoneNumber: phone,
      salaryEnabled: settings.salaryEnabled,
      visaAlertEnabled: settings.visaAlertEnabled,
      payrollApprovalEnabled: settings.payrollApprovalEnabled
    });
    ue.success(`Phone number saved for ${emp.fullName}`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 border-b border-border last:border-0",
      "data-ocid": `whatsapp.employee.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 sm:w-52 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: emp.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: emp.jobTitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:w-48 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "+971 50 000 0000",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              className: "h-8 text-xs",
              "data-ocid": `whatsapp.employee.phone.${idx}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "h-8 px-2 text-xs shrink-0",
              onClick: savePhone,
              "data-ocid": `whatsapp.employee.save_button.${idx}`,
              children: "Save"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `salary-switch-${idx}`,
              className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: `salary-switch-${idx}`,
                    checked: settings.salaryEnabled,
                    onCheckedChange: () => toggle("salaryEnabled"),
                    "data-ocid": `whatsapp.employee.salary.${idx}`
                  }
                ),
                "Salary"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `visa-switch-${idx}`,
              className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: `visa-switch-${idx}`,
                    checked: settings.visaAlertEnabled,
                    onCheckedChange: () => toggle("visaAlertEnabled"),
                    "data-ocid": `whatsapp.employee.visa.${idx}`
                  }
                ),
                "Visa"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `payroll-switch-${idx}`,
              className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: `payroll-switch-${idx}`,
                    checked: settings.payrollApprovalEnabled,
                    onCheckedChange: () => toggle("payrollApprovalEnabled"),
                    "data-ocid": `whatsapp.employee.payroll.${idx}`
                  }
                ),
                "Payroll"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function StatusBadge({ status }) {
  const map = {
    [Variant_Failed_Sent_Pending.Sent]: {
      label: "Sent",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    },
    [Variant_Failed_Sent_Pending.Pending]: {
      label: "Pending",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    [Variant_Failed_Sent_Pending.Failed]: {
      label: "Failed",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
      cls: "bg-destructive/10 text-destructive border-destructive/20"
    }
  };
  const { label, icon, cls } = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium",
        cls
      ),
      children: [
        icon,
        label
      ]
    }
  );
}
function typeLabel(t) {
  return {
    [Variant_Salary_VisaAlert_PayrollApproval.Salary]: "Salary",
    [Variant_Salary_VisaAlert_PayrollApproval.VisaAlert]: "Visa Alert",
    [Variant_Salary_VisaAlert_PayrollApproval.PayrollApproval]: "Payroll Approval"
  }[t];
}
function formatTs(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString();
}
function WhatsAppNotificationSettings() {
  const [search, setSearch] = reactExports.useState("");
  const { data: employees, isLoading: loadingEmp } = useListEmployees();
  const { data: logs, isLoading: loadingLogs } = useListNotificationLogs(50);
  const createLog = useCreateNotificationLog();
  const filtered = reactExports.useMemo(() => {
    if (!employees) return [];
    const q = search.toLowerCase();
    return employees.filter(
      (e) => e.fullName.toLowerCase().includes(q) || e.jobTitle.toLowerCase().includes(q)
    );
  }, [employees, search]);
  function sendTestNotification() {
    createLog.mutate(
      {
        notificationType: Variant_Salary_VisaAlert_PayrollApproval.Salary,
        message: "[Test] GulfHR Shield: Salary has been processed for this month."
      },
      {
        onSuccess: () => ue.success("Test notification queued (Pending)"),
        onError: () => ue.error("Failed to queue test notification")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", "data-ocid": "whatsapp.settings.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "WhatsApp Notification System" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Notifications are logged in-system. WhatsApp delivery requires a valid phone number — manage employee contacts in their profile or below. Delivery is queued and shown as Pending until dispatched." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "whatsapp.company.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-3", children: "Company Notification Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyToggles, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "whatsapp.employees.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Per-Employee Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search employees…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9 h-9 text-sm",
              "data-ocid": "whatsapp.employees.search_input"
            }
          )
        ] })
      ] }),
      loadingEmp ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTable, { rows: 5, cols: 4 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-sm text-muted-foreground py-8 text-center",
          "data-ocid": "whatsapp.employees.empty_state",
          children: "No employees found."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2 bg-muted/30 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground sm:w-52", children: "Employee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground hidden sm:block sm:w-48", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: "Notification Types" })
        ] }),
        filtered.slice(0, 20).map((emp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeRow, { emp, idx: i + 1 }, String(emp.id)))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "WhatsApp delivery requires phone number — manage contacts in employee profiles." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "whatsapp.log.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Recent Notification Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: sendTestNotification,
            disabled: createLog.isPending,
            "data-ocid": "whatsapp.test.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-1.5" }),
              "Send Test Notification"
            ]
          }
        )
      ] }),
      loadingLogs ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTable, { rows: 4, cols: 5 }) : !(logs == null ? void 0 : logs.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-sm text-muted-foreground py-8 text-center",
          "data-ocid": "whatsapp.log.empty_state",
          children: "No notifications sent yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "min-w-full text-sm",
          "data-ocid": "whatsapp.log.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-muted-foreground whitespace-nowrap", children: "Timestamp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-muted-foreground", children: "Employee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-muted-foreground", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-muted-foreground", children: "Message Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-muted-foreground", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: logs.slice(0, 20).map((log, i) => {
              const emp = employees == null ? void 0 : employees.find(
                (e) => log.employeeId && e.id === log.employeeId
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                  "data-ocid": `whatsapp.log.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap", children: formatTs(log.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-foreground", children: (emp == null ? void 0 : emp.fullName) ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: typeLabel(log.notificationType) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground max-w-xs truncate", children: log.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: log.status }) })
                  ]
                },
                String(log.id)
              );
            }) })
          ]
        }
      ) })
    ] })
  ] });
}
const SETTINGS_TABS = [
  { key: "company", label: "Company Profile" },
  { key: "users", label: "User Management" },
  { key: "alerts", label: "Alert Thresholds" },
  { key: "wps", label: "WPS Configuration" },
  { key: "whatsapp", label: "WhatsApp Notifications" },
  { key: "preferences", label: "Preferences" },
  { key: "data", label: "Data Management" }
];
const WPS_TEMPLATES = [
  {
    value: "UAE_SIF",
    label: "UAE — SIF Format",
    description: "Salary Information File format used by UAE banks and WPS system. Includes IBAN, employee ID, and net salary fields."
  },
  {
    value: "OMAN_MOL",
    label: "Oman — MOL Format",
    description: "Ministry of Manpower format for Oman. Uses civil ID, establishment ID, and basic/gross salary breakdowns."
  },
  {
    value: "QATAR",
    label: "Qatar — MOCI Format",
    description: "Ministry of Commerce format for Qatar. Includes QID, employer registration, and payment details."
  },
  {
    value: "KSA",
    label: "Saudi Arabia — MUDAD Format",
    description: "MUDAD-compatible payroll file for KSA. Maps to IQAMA numbers and Saudi Riyal salary entries."
  },
  {
    value: "BAHRAIN",
    label: "Bahrain — LMRA Format",
    description: "Labour Market Regulatory Authority format for Bahrain. Requires CPR number and employer ID."
  },
  {
    value: "KUWAIT",
    label: "Kuwait — MOL Format",
    description: "Ministry of Labour Kuwait format. Requires civil ID and PIFSS registration number."
  }
];
function WpsConfiguration() {
  var _a;
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState("UAE_SIF");
  const [saved, setSaved] = reactExports.useState(false);
  function handleSave() {
    setSaved(true);
    ue.success("WPS template preference saved.");
    setTimeout(() => setSaved(false), 3e3);
  }
  const desc = ((_a = WPS_TEMPLATES.find((t) => t.value === selectedTemplate)) == null ? void 0 : _a.description) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "settings.wps_config.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-1", children: "Default WPS Country Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Select the country format that matches your primary banking and payroll jurisdiction." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wps-template", children: "Country Template" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTemplate, onValueChange: setSelectedTemplate, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              id: "wps-template",
              className: "w-full max-w-sm",
              "data-ocid": "settings.wps_template.select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WPS_TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
        ] }),
        desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 max-w-lg", children: desc })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleSave,
          "data-ocid": "settings.wps_template.save_button",
          children: "Save Template"
        }
      ),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-sm text-chart-3 font-medium",
          "data-ocid": "settings.wps_template.success_state",
          children: "✓ Saved"
        }
      )
    ] })
  ] });
}
function Preferences() {
  const { theme, toggleTheme } = useUIStore();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.preferences.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: "Dark Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Toggle between light and dark themes. Saved automatically." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          checked: isDark,
          onCheckedChange: toggleTheme,
          "aria-label": "Toggle dark mode",
          "data-ocid": "settings.dark_mode.switch"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Display language for the interface" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "en", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", "data-ocid": "settings.language.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en", children: "English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ar", children: "Arabic" })
        ] })
      ] })
    ] })
  ] });
}
function DataManagement() {
  const [exportQueued, setExportQueued] = reactExports.useState(false);
  const [logoutSuccess, setLogoutSuccess] = reactExports.useState(false);
  function handleExport() {
    setExportQueued(true);
    ue.success(
      "Data export queued. You will receive a notification when ready."
    );
    setTimeout(() => setExportQueued(false), 5e3);
  }
  function handleLogout() {
    setLogoutSuccess(true);
    ue.success("All other sessions have been logged out.");
    setTimeout(() => setLogoutSuccess(false), 5e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "settings.data_management.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-1", children: "Request Data Export" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Export all company data including employee records, payroll history, and audit logs as a ZIP archive." }),
      exportQueued && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-3 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm",
          "data-ocid": "settings.export.success_state",
          children: "✓ Export queued. You will be notified when the file is ready."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleExport,
          "data-ocid": "settings.export.button",
          children: "Request Data Export"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/20 bg-destructive/5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm text-destructive mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
        " Logout All Sessions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Immediately invalidates all active sessions across all devices. You will remain logged in on this device." }),
      logoutSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-3 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm",
          "data-ocid": "settings.logout_all.success_state",
          children: "✓ All other sessions logged out."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: handleLogout,
          "data-ocid": "settings.logout_all.button",
          children: "Logout All Sessions"
        }
      )
    ] })
  ] });
}
function SettingsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("company");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsNav,
      {
        tabs: SETTINGS_TABS,
        activeTab,
        onTabChange: setActiveTab,
        className: "flex-wrap",
        "data-ocid": "settings.tabs"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { children: [
      activeTab === "company" && /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyProfileForm, {}),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UserManagement, {}),
      activeTab === "alerts" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertThresholds, {}),
      activeTab === "wps" && /* @__PURE__ */ jsxRuntimeExports.jsx(WpsConfiguration, {}),
      activeTab === "whatsapp" && /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppNotificationSettings, {}),
      activeTab === "preferences" && /* @__PURE__ */ jsxRuntimeExports.jsx(Preferences, {}),
      activeTab === "data" && /* @__PURE__ */ jsxRuntimeExports.jsx(DataManagement, {})
    ] })
  ] }) });
}
export {
  SettingsPage as default
};
