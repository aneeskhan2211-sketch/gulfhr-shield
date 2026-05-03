import { EmployeeStatus, WorkLocation } from "@/backend";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

const NATIONALITIES = [
  "UAE",
  "Oman",
  "Saudi Arabia",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "India",
  "Pakistan",
  "Philippines",
  "Bangladesh",
  "Egypt",
  "Jordan",
  "UK",
  "USA",
  "Other",
];

const DEPARTMENTS = [
  "Engineering",
  "Operations",
  "Finance",
  "HR",
  "Sales",
  "Marketing",
  "Legal",
  "IT",
  "Procurement",
  "Administration",
  "Security",
  "Facilities",
];

export interface EmployeeFilterState {
  search: string;
  nationality: string;
  department: string;
  status: string;
}

interface EmployeeFiltersProps {
  filters: EmployeeFilterState;
  onChange: (filters: EmployeeFilterState) => void;
  onReset: () => void;
}

export default function EmployeeFilters({
  filters,
  onChange,
  onReset,
}: EmployeeFiltersProps) {
  const hasActiveFilters =
    filters.nationality !== "all" ||
    filters.department !== "all" ||
    filters.status !== "all" ||
    filters.search !== "";

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by name or code…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9"
          data-ocid="employees.search_input"
        />
      </div>

      <Select
        value={filters.nationality}
        onValueChange={(v) => onChange({ ...filters, nationality: v })}
      >
        <SelectTrigger
          className="w-[160px]"
          data-ocid="employees.nationality.select"
        >
          <SelectValue placeholder="Nationality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Nationalities</SelectItem>
          {NATIONALITIES.map((n) => (
            <SelectItem key={n} value={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.department}
        onValueChange={(v) => onChange({ ...filters, department: v })}
      >
        <SelectTrigger
          className="w-[160px]"
          data-ocid="employees.department.select"
        >
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {DEPARTMENTS.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v })}
      >
        <SelectTrigger
          className="w-[140px]"
          data-ocid="employees.status.select"
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value={EmployeeStatus.Active}>Active</SelectItem>
          <SelectItem value={EmployeeStatus.OnLeave}>On Leave</SelectItem>
          <SelectItem value={EmployeeStatus.Separated}>Separated</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          data-ocid="employees.reset_filters.button"
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-muted transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}

export { NATIONALITIES, DEPARTMENTS };
