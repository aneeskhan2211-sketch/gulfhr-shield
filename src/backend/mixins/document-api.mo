import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/document";
import TUser "../types/user";
import TAudit "../types/audit";
import DocumentLib "../lib/document";
import UserLib "../lib/user";
import AuditLib "../lib/audit";

mixin (
  accessControlState : AccessControl.AccessControlState,
  documents : List.List<T.EmployeeDocument>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listDocuments(employeeId : Common.EmployeeId) : async Common.Result<[T.EmployeeDocument]> {
    let user = UserLib.requireUser(users, caller);
    #ok(DocumentLib.getByEmployee(documents, employeeId, user.companyId));
  };

  public query ({ caller }) func getDocument(id : Common.DocumentId) : async Common.Result<T.EmployeeDocument> {
    let user = UserLib.requireUser(users, caller);
    switch (DocumentLib.getById(documents, id)) {
      case null { #err(#notFound("Document not found")) };
      case (?doc) {
        if (doc.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
        // Employee role can only view their own documents (match by userId == employeeId linkage)
        // Higher roles can view all
        if (user.role == #Employee) {
          // Employees can access documents but we just check companyId (no direct employee<>user link in types)
        };
        #ok(doc);
      };
    };
  };

  public shared ({ caller }) func uploadDocument(input : T.DocumentInput) : async Common.Result<T.EmployeeDocument> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    counters.document += 1;
    let doc = DocumentLib.create(documents, counters.document, user.companyId, user.id, input);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #DocumentUploaded; affectedResourceType = "Document";
        affectedResourceId = debug_show(doc.id); affectedResourceName = doc.fileName;
        oldValue = null; newValue = null; status = #Success }, Time.now());
    #ok(doc);
  };

  public shared ({ caller }) func deleteDocument(id : Common.DocumentId) : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    switch (DocumentLib.remove(documents, id, user.companyId)) {
      case null { #err(#notFound("Document not found")) };
      case (?doc) {
        counters.auditLog += 1;
        ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
          { actionType = #DocumentDeleted; affectedResourceType = "Document";
            affectedResourceId = debug_show(id); affectedResourceName = doc.fileName;
            oldValue = null; newValue = null; status = #Success }, Time.now());
        #ok(true);
      };
    };
  };

  public query ({ caller }) func listAllDocuments() : async Common.Result<[T.EmployeeDocument]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(DocumentLib.getByCompany(documents, user.companyId));
  };

  // Log document download event
  public shared ({ caller }) func logDocumentDownload(id : Common.DocumentId) : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    switch (DocumentLib.getById(documents, id)) {
      case null { #err(#notFound("Document not found")) };
      case (?doc) {
        if (doc.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
        counters.auditLog += 1;
        ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
          { actionType = #DocumentDownloaded; affectedResourceType = "Document";
            affectedResourceId = debug_show(id); affectedResourceName = doc.fileName;
            oldValue = null; newValue = null; status = #Success }, Time.now());
        #ok(true);
      };
    };
  };
};
