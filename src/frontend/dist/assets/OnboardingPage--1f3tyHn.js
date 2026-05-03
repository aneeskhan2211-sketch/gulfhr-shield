import { c as createLucideIcon, u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor, k as useNavigate, r as reactExports, j as jsxRuntimeExports, H as ArrowRight, X, a as cn, U as Users, h as CircleCheck, b as ChevronRight } from "./index-DqipwkTD.js";
import { A as AppShell, F as FileText, a as CreditCard } from "./AppShell-CUGPoZlf.js";
import { a as SkeletonKPI, b as SkeletonCard } from "./SkeletonLoader-BW78e9tY.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { B as Building2 } from "./building-2-BF9ey7Ou.js";
import "./index-DzTulS2Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function useGetOnboardingProgress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["onboardingProgress"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getOnboardingProgress());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useUpdateOnboardingProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (step) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateOnboardingProgress(step));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["onboardingProgress"] })
  });
}
const STEPS = [
  {
    label: "Create Company",
    description: "Set up your company profile, country, and currency for Gulf compliance.",
    icon: Building2,
    path: "/settings",
    cta: "Set Up Company",
    ctaSecondary: "Go to Settings",
    hint: "Add your company name, region, and billing info to activate compliance tracking."
  },
  {
    label: "Add Employees",
    description: "Import via CSV or add employees one by one. Supports bulk upload.",
    icon: Users,
    path: "/employees",
    cta: "Add Employees",
    ctaSecondary: "Manage Employees",
    hint: "Add at least one employee to enable payroll processing and visa expiry tracking."
  },
  {
    label: "Upload Documents",
    description: "Upload visa copies, passports, and employment contracts securely.",
    icon: FileText,
    path: "/documents",
    cta: "Upload Documents",
    ctaSecondary: "Manage Documents",
    hint: "Upload required documents to avoid compliance fines. Encrypted & secure."
  },
  {
    label: "Run First Payroll",
    description: "Process salaries, generate WPS files, and stay compliant.",
    icon: CreditCard,
    path: "/payroll",
    cta: "Run Payroll",
    ctaSecondary: "Go to Payroll",
    hint: "Run your first payroll to activate WPS compliance reporting and penalty prevention."
  }
];
function OnboardingPage() {
  const { data: progress, isLoading } = useGetOnboardingProgress();
  const updateProgress = useUpdateOnboardingProgress();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = reactExports.useState(0);
  const [skipped, setSkipped] = reactExports.useState(false);
  const currentStep = progress ? Number(progress.currentStep) : 0;
  const completedSteps = (progress == null ? void 0 : progress.stepsCompleted) ?? [
    false,
    false,
    false,
    false
  ];
  const completedCount = completedSteps.filter(Boolean).length;
  const percentComplete = Math.round(completedCount / STEPS.length * 100);
  const isAllDone = completedCount === STEPS.length;
  function handleAdvance(idx) {
    const nextStep = Math.min(idx + 1, STEPS.length - 1);
    updateProgress.mutate(BigInt(nextStep));
    setActiveStep(Math.min(activeStep + 1, STEPS.length - 1));
  }
  function handleNavigateToStep(path) {
    navigate(path);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Setup Checklist", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonKPI, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) })
    ] }) });
  }
  if (isAllDone) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Setup Complete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[70vh] flex items-center justify-center p-6",
        "data-ocid": "onboarding.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-emerald-400/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "You're All Set!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Your compliance system is active. Start monitoring fines, managing payroll, and keeping your team compliant." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "font-semibold px-8",
                onClick: () => navigate("/dashboard"),
                "data-ocid": "onboarding.get_started_button",
                children: [
                  "Go to Dashboard ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate("/payroll"),
                "data-ocid": "onboarding.run_payroll_button",
                children: "Run Payroll Now"
              }
            )
          ] })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Setup Checklist", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 max-w-3xl mx-auto space-y-6",
      "data-ocid": "onboarding.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Get Started in 4 Steps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Complete setup to activate Gulf compliance protection and avoid fines." })
          ] }),
          !skipped && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSkipped(true),
              "data-ocid": "onboarding.skip_button",
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                " Skip for now"
              ]
            }
          ),
          skipped && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate("/dashboard"),
              "data-ocid": "onboarding.go_dashboard_button",
              className: "text-xs text-primary hover:underline flex items-center gap-1 mt-1",
              children: [
                "Back to Dashboard ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-5 space-y-4",
            "data-ocid": "onboarding.progress_bar",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Overall Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "text-sm font-bold",
                      percentComplete === 100 ? "text-emerald-400" : "text-primary"
                    ),
                    children: [
                      percentComplete,
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-full rounded-full transition-all duration-500",
                    percentComplete === 100 ? "bg-emerald-400" : "bg-primary"
                  ),
                  style: { width: `${percentComplete}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: STEPS.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveStep(idx),
                  "data-ocid": `onboarding.step_label.${idx + 1}`,
                  className: cn(
                    "flex flex-col items-center gap-1 text-xs transition-colors cursor-pointer",
                    completedSteps[idx] ? "text-emerald-400 font-semibold" : idx === currentStep ? "text-primary font-semibold" : "text-muted-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                          completedSteps[idx] ? "bg-emerald-400 border-emerald-400 text-white" : idx === currentStep ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
                        ),
                        children: completedSteps[idx] ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : idx + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block max-w-[80px] text-center leading-tight", children: step.label })
                  ]
                },
                step.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                completedCount,
                " of ",
                STEPS.length,
                " steps completed"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border border-primary/30 bg-primary/5 ring-1 ring-primary/20 p-6 space-y-4",
            "data-ocid": "onboarding.active_step",
            children: (() => {
              const step = STEPS[activeStep];
              const Icon = step.icon;
              const isDone = completedSteps[activeStep] ?? false;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        isDone ? "bg-emerald-400/20 text-emerald-400" : "bg-primary/20 text-primary"
                      ),
                      children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
                        "Step ",
                        activeStep + 1,
                        " of ",
                        STEPS.length
                      ] }),
                      isDone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold", children: "Completed" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: step.label })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: step.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/60 border border-border rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "💡 ",
                  step.hint
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                  !isDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      className: "font-semibold flex-1",
                      "data-ocid": `onboarding.step.${activeStep + 1}.primary_button`,
                      onClick: () => {
                        handleAdvance(activeStep);
                        handleNavigateToStep(step.path);
                      },
                      children: [
                        step.cta,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: isDone ? "default" : "outline",
                      className: "flex-1",
                      "data-ocid": `onboarding.step.${activeStep + 1}.secondary_button`,
                      onClick: () => handleNavigateToStep(step.path),
                      children: [
                        isDone ? step.ctaSecondary : "Preview",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      disabled: activeStep === 0,
                      onClick: () => setActiveStep(activeStep - 1),
                      "data-ocid": "onboarding.back_button",
                      children: "← Back"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    activeStep + 1,
                    " / ",
                    STEPS.length
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      disabled: activeStep === STEPS.length - 1,
                      onClick: () => setActiveStep(activeStep + 1),
                      "data-ocid": "onboarding.next_button",
                      children: "Next →"
                    }
                  )
                ] })
              ] });
            })()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = completedSteps[idx] ?? false;
          const isActive = idx === activeStep;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `onboarding.step.${idx + 1}`,
              onClick: () => setActiveStep(idx),
              className: cn(
                "rounded-xl border p-4 flex items-center gap-3 transition-all text-left w-full",
                isDone ? "border-emerald-400/30 bg-emerald-400/5" : isActive ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card hover:bg-muted/30"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                      isDone ? "bg-emerald-400/20 text-emerald-400" : isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    ),
                    children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "text-sm font-semibold",
                        isDone ? "text-emerald-400" : isActive ? "text-primary" : "text-foreground"
                      ),
                      children: step.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: step.description })
                ] }),
                isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" })
              ]
            },
            step.label
          );
        }) })
      ]
    }
  ) });
}
export {
  OnboardingPage as default
};
