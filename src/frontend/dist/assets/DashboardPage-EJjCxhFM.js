const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DashboardContent-D03dqBkc.js","assets/index-DqipwkTD.js","assets/index-D60mcsrX.css","assets/AppShell-CUGPoZlf.js","assets/attendance-BHJK1AGJ.js","assets/generateCategoricalChart-FZbN6Ag_.js","assets/employees-CUvviRBY.js","assets/payroll-BT2KpQag.js","assets/visa-DRv2T8_7.js","assets/SkeletonLoader-BW78e9tY.js","assets/button-B4kMrH3h.js","assets/index-DzTulS2Y.js","assets/info-zGkwlnOj.js","assets/trending-down-BHvE2-0E.js","assets/circle-check-big-B7EgiPXR.js","assets/audit-C2N5k9eD.js","assets/shield-check-Chn_N5_O.js","assets/CardContainer-BlAWtbPm.js","assets/minus-DnstMq2X.js","assets/StatusBadge-BbDJ5iJT.js","assets/download-BXuxgTcz.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, L as LoadingSpinner, _ as __vitePreload } from "./index-DqipwkTD.js";
import { A as AppShell } from "./AppShell-CUGPoZlf.js";
const DashboardContent = reactExports.lazy(() => __vitePreload(() => import("./DashboardContent-D03dqBkc.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) : void 0));
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "HR Compliance Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    reactExports.Suspense,
    {
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading dashboard..." }) }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {})
    }
  ) });
}
export {
  DashboardPage as default
};
