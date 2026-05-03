import Common "common";
module {
  public type WpsCountryFormat = {
    #UAESIF;
    #OmanMOL;
    #QatarTemplate;
    #SaudiTemplate;
  };

  public type WpsExportStatus = {
    #Generated;
    #Submitted;
    #Failed;
  };

  public type WpsExport = {
    id : Common.WpsExportId;
    companyId : Common.CompanyId;
    countryFormat : WpsCountryFormat;
    payrollRunId : Common.PayrollRunId;
    fileName : Text;
    employeeCount : Nat;
    exportedBy : Common.UserId;
    createdAt : Common.Timestamp;
    status : WpsExportStatus;
  };

  public type WpsExportInput = {
    payrollRunId : Common.PayrollRunId;
    countryFormat : WpsCountryFormat;
  };
};
