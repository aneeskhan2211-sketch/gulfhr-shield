import { useGetMyCompany, useUpdateCompanyProfile } from "@/api/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const COUNTRIES = [
  { value: "AE", label: "United Arab Emirates" },
  { value: "OM", label: "Oman" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "QA", label: "Qatar" },
  { value: "BH", label: "Bahrain" },
  { value: "KW", label: "Kuwait" },
];

export default function CompanyProfileForm() {
  const { data: company, isLoading } = useGetMyCompany();
  const updateMutation = useUpdateCompanyProfile();

  const [form, setForm] = useState({
    name: company?.name ?? "Gulf Tech Solutions LLC",
    registrationNumber: company?.registrationNumber ?? "CN-2021-UAE-00492",
    vatNumber: company?.vatNumber ?? "100245678900003",
    address: company?.address ?? "Business Bay, Dubai, UAE",
    country: company?.country ?? "AE",
    phone: company?.phone ?? "+971 4 234 5678",
    billingEmail: company?.billingEmail ?? "billing@gulftech.ae",
  });

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        name: form.name,
        registrationNumber: form.registrationNumber,
        vatNumber: form.vatNumber,
        address: form.address,
        country: form.country,
        phone: form.phone,
        billingEmail: form.billingEmail,
      });
      toast.success("Company profile updated successfully.");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-10 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="settings.company_profile.section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="cp-name">Company Name</Label>
          <Input
            id="cp-name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            data-ocid="settings.company_name.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cp-reg">Registration Number</Label>
          <Input
            id="cp-reg"
            value={form.registrationNumber}
            onChange={(e) => handleChange("registrationNumber", e.target.value)}
            data-ocid="settings.reg_number.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cp-vat">VAT Number</Label>
          <Input
            id="cp-vat"
            value={form.vatNumber}
            onChange={(e) => handleChange("vatNumber", e.target.value)}
            data-ocid="settings.vat_number.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cp-phone">Phone Number</Label>
          <Input
            id="cp-phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            data-ocid="settings.phone.input"
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="cp-address">Office Address</Label>
          <Input
            id="cp-address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            data-ocid="settings.address.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cp-country">Country</Label>
          <Select
            value={form.country}
            onValueChange={(v) => handleChange("country", v)}
          >
            <SelectTrigger id="cp-country" data-ocid="settings.country.select">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cp-billing-email">Billing Email</Label>
          <Input
            id="cp-billing-email"
            type="email"
            value={form.billingEmail}
            onChange={(e) => handleChange("billingEmail", e.target.value)}
            data-ocid="settings.billing_email.input"
          />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          data-ocid="settings.company_profile.submit_button"
        >
          {updateMutation.isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
