import Common "common";
module {
  public type UserRole = {
    #SuperAdmin;
    #CompanyOwner;
    #HRManager;
    #Accountant;
    #BranchManager;
    #Employee;
  };

  public type UserStatus = {
    #Active;
    #Inactive;
    #Suspended;
  };

  public type User = {
    id : Common.UserId;
    companyId : Common.CompanyId;
    principal : Principal;
    email : Text;
    fullName : Text;
    role : UserRole;
    status : UserStatus;
    lastLogin : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type UserInput = {
    email : Text;
    fullName : Text;
    role : UserRole;
  };
};
