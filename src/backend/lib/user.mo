import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import T "../types/user";

module {
  public func create(
    users : List.List<T.User>,
    counter : Nat,
    companyId : Common.CompanyId,
    principal : Principal,
    input : T.UserInput,
  ) : T.User {
    let user : T.User = {
      id = counter;
      companyId;
      principal;
      email = input.email;
      fullName = input.fullName;
      role = input.role;
      status = #Active;
      lastLogin = null;
      createdAt = Time.now();
    };
    users.add(user);
    user;
  };

  public func getByPrincipal(
    users : List.List<T.User>,
    principal : Principal,
  ) : ?T.User {
    users.find(func(u) { u.principal == principal });
  };

  public func getByCompany(
    users : List.List<T.User>,
    companyId : Common.CompanyId,
  ) : [T.User] {
    users.filter(func(u) { u.companyId == companyId }).toArray();
  };

  public func getById(
    users : List.List<T.User>,
    id : Common.UserId,
  ) : ?T.User {
    users.find(func(u) { u.id == id });
  };

  public func updateRole(
    users : List.List<T.User>,
    id : Common.UserId,
    role : T.UserRole,
  ) : Bool {
    var found = false;
    users.mapInPlace(
      func(u) {
        if (u.id == id) {
          found := true;
          { u with role };
        } else { u };
      }
    );
    found;
  };

  public func updateStatus(
    users : List.List<T.User>,
    id : Common.UserId,
    status : T.UserStatus,
  ) : Bool {
    var found = false;
    users.mapInPlace(
      func(u) {
        if (u.id == id) {
          found := true;
          { u with status };
        } else { u };
      }
    );
    found;
  };

  public func recordLogin(
    users : List.List<T.User>,
    id : Common.UserId,
    timestamp : Common.Timestamp,
  ) : () {
    users.mapInPlace(
      func(u) {
        if (u.id == id) { { u with lastLogin = ?timestamp } } else { u };
      }
    );
  };

  // Role hierarchy: SuperAdmin > CompanyOwner > HRManager > Accountant > BranchManager > Employee
  public func roleLevel(role : T.UserRole) : Nat {
    switch (role) {
      case (#SuperAdmin) { 6 };
      case (#CompanyOwner) { 5 };
      case (#HRManager) { 4 };
      case (#Accountant) { 3 };
      case (#BranchManager) { 2 };
      case (#Employee) { 1 };
    };
  };

  public func hasRole(
    user : T.User,
    requiredRole : T.UserRole,
  ) : Bool {
    roleLevel(user.role) >= roleLevel(requiredRole);
  };

  public func requireUser(
    users : List.List<T.User>,
    principal : Principal,
  ) : T.User {
    switch (getByPrincipal(users, principal)) {
      case (?u) { u };
      case null { Runtime.trap("User not found for principal") };
    };
  };

  public func requireRole(
    users : List.List<T.User>,
    principal : Principal,
    companyId : Common.CompanyId,
    requiredRole : T.UserRole,
  ) : T.User {
    let user = requireUser(users, principal);
    if (user.companyId != companyId) {
      Runtime.trap("User does not belong to this company");
    };
    if (not hasRole(user, requiredRole)) {
      Runtime.trap("Insufficient role: required " # debug_show(requiredRole));
    };
    user;
  };
};
