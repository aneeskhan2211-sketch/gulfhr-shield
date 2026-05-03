import {
  useDeactivateUser,
  useInviteUser,
  useListUsers,
  useUpdateUserRole,
} from "@/api/company";
import { UserRole, UserStatus } from "@/backend";
import type { UserId } from "@/backend";
import StatusBadge from "@/components/ui/StatusBadge";
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
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROLES: { value: UserRole; label: string }[] = [
  { value: UserRole.SuperAdmin, label: "Super Admin" },
  { value: UserRole.CompanyOwner, label: "Company Owner" },
  { value: UserRole.HRManager, label: "HR Manager" },
  { value: UserRole.Accountant, label: "Accountant" },
  { value: UserRole.BranchManager, label: "Branch Manager" },
  { value: UserRole.Employee, label: "Employee" },
];

const DEMO_USERS = [
  {
    id: 1n,
    fullName: "Ahmed Al-Farsi",
    email: "ahmed@gulftech.ae",
    role: UserRole.CompanyOwner,
    status: UserStatus.Active,
  },
  {
    id: 2n,
    fullName: "Sarah Johnson",
    email: "sarah.hr@gulftech.ae",
    role: UserRole.HRManager,
    status: UserStatus.Active,
  },
  {
    id: 3n,
    fullName: "Rajan Mehta",
    email: "rajan.acct@gulftech.ae",
    role: UserRole.Accountant,
    status: UserStatus.Active,
  },
  {
    id: 4n,
    fullName: "Fatima Rashid",
    email: "fatima@gulftech.ae",
    role: UserRole.BranchManager,
    status: UserStatus.Active,
  },
  {
    id: 5n,
    fullName: "John Smith",
    email: "john.s@gulftech.ae",
    role: UserRole.Employee,
    status: UserStatus.Inactive,
  },
];

export default function UserManagement() {
  const { data: users, isLoading } = useListUsers();
  const inviteMutation = useInviteUser();
  const deactivateMutation = useDeactivateUser();
  const updateRoleMutation = useUpdateUserRole();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("Employee");
  const [inviteSent, setInviteSent] = useState(false);

  const displayUsers = users?.length ? users : DEMO_USERS;

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      await inviteMutation.mutateAsync({
        fullName: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole as UserRole,
      });
      setInviteSent(true);
      setInviteEmail("");
      setTimeout(() => setInviteSent(false), 4000);
    } catch {
      toast.error("Failed to send invite.");
    }
  }

  async function handleDeactivate(userId: bigint) {
    try {
      await deactivateMutation.mutateAsync(userId as UserId);
      toast.success("User deactivated.");
    } catch {
      toast.error("Failed to deactivate user.");
    }
  }

  async function handleRoleChange(userId: bigint, role: string) {
    try {
      await updateRoleMutation.mutateAsync({
        userId: userId as UserId,
        role: role as UserRole,
      });
      toast.success("Role updated.");
    } catch {
      toast.error("Failed to update role.");
    }
  }

  return (
    <div className="space-y-6" data-ocid="settings.user_management.section">
      {/* User table */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Team Members ({displayUsers.length})
        </h4>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [1, 2, 3].map((n) => (
                    <tr key={n}>
                      {[1, 2, 3, 4, 5].map((c) => (
                        <td key={c}>
                          <div className="h-4 bg-muted rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : displayUsers.map((user, i) => (
                    <tr
                      key={String(user.id)}
                      data-ocid={`settings.user.item.${i + 1}`}
                    >
                      <td className="font-medium">{user.fullName}</td>
                      <td className="text-muted-foreground">{user.email}</td>
                      <td>
                        <Select
                          defaultValue={user.role}
                          onValueChange={(v) => handleRoleChange(user.id, v)}
                        >
                          <SelectTrigger
                            className="h-7 text-xs w-40"
                            data-ocid={`settings.user_role_${i + 1}.select`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLES.map((r) => (
                              <SelectItem key={r.value} value={r.value}>
                                {r.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td>
                        <StatusBadge status={user.status} size="sm" />
                      </td>
                      <td className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeactivate(user.id)}
                          data-ocid={`settings.deactivate_user.button.${i + 1}`}
                        >
                          Deactivate
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite form */}
      <div className="rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite New User
        </h4>
        {inviteSent && (
          <div
            className="mb-4 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm"
            data-ocid="settings.invite.success_state"
          >
            ✓ Invitation sent successfully!
          </div>
        )}
        <form
          onSubmit={handleInvite}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 space-y-1">
            <Label htmlFor="invite-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="colleague@company.ae"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              data-ocid="settings.invite_email.input"
            />
          </div>
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger
              className="w-44"
              data-ocid="settings.invite_role.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={inviteMutation.isPending}
            data-ocid="settings.invite.submit_button"
          >
            {inviteMutation.isPending ? "Sending…" : "Send Invite"}
          </Button>
        </form>
      </div>
    </div>
  );
}
