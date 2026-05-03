import { cn } from "@/lib/utils";
import React from "react";

interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TabsNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
  "data-ocid"?: string;
}

export default function TabsNav({
  tabs,
  activeTab,
  onTabChange,
  className,
  "data-ocid": ocid,
}: TabsNavProps) {
  return (
    <div
      className={cn("flex gap-1 bg-muted/50 p-1 rounded-lg", className)}
      role="tablist"
      data-ocid={ocid}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
          data-ocid={ocid ? `${ocid}.${tab.key}.tab` : `${tab.key}.tab`}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-smooth",
            activeTab === tab.key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "px-1.5 py-0.5 text-xs rounded-full font-medium",
                activeTab === tab.key
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
