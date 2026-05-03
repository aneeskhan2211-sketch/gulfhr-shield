import { j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
function TabsNav({
  tabs,
  activeTab,
  onTabChange,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex gap-1 bg-muted/50 p-1 rounded-lg", className),
      role: "tablist",
      "data-ocid": ocid,
      children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": activeTab === tab.key,
          onClick: () => onTabChange(tab.key),
          "data-ocid": ocid ? `${ocid}.${tab.key}.tab` : `${tab.key}.tab`,
          className: cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-smooth",
            activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          ),
          children: [
            tab.label,
            tab.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "px-1.5 py-0.5 text-xs rounded-full font-medium",
                  activeTab === tab.key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                ),
                children: tab.count
              }
            )
          ]
        },
        tab.key
      ))
    }
  );
}
export {
  TabsNav as T
};
