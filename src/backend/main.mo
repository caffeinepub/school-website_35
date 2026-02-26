import Map "mo:core/Map";
import Principal "mo:core/Principal";
import RunTime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";

import TextUtil "textUtil";


actor {
  // Type Definitions
  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type ApplicationStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type AdmissionApplication = {
    id : Text;
    studentName : Text;
    fatherName : Text;
    motherName : Text;
    dateOfBirth : Text;
    mobile : Text;
    address : Text;
    email : Text;
    previousSchool : Text;
    className : Text;
    documentUrls : [Text];
    status : ApplicationStatus;
    timestamp : Int;
  };

  type SubjectMark = {
    subject : Text;
    marks : Nat;
  };

  type StudentResult = {
    rollNumber : Nat;
    studentName : Text;
    className : Text;
    subjects : [SubjectMark];
    totalMarks : Nat;
    percentage : Nat;
    timestamp : Int;
  };

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  let admissionApplications = Map.empty<Text, AdmissionApplication>();
  var nextApplicationNumber = 1;

  let studentResults = Map.empty<Nat, StudentResult>();
  var superAdmin : ?Principal = null;
  let admins = List.empty<Principal>();

  // CONTACT FORM LOGIC
  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async () {
    let submission : ContactSubmission = {
      id = nextContactId;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(nextContactId, submission);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  // ADMISSION APPLICATIONS LOGIC
  public shared ({ caller }) func submitAdmissionApplication(
    studentName : Text,
    fatherName : Text,
    motherName : Text,
    dateOfBirth : Text,
    mobile : Text,
    address : Text,
    email : Text,
    previousSchool : Text,
    className : Text,
    documentUrls : [Text],
  ) : async () {
    let applicationNumber = nextApplicationNumber;
    let applicationId = "BSS/2026/" # TextUtil.padLeft(applicationNumber.toText(), 3, '0');

    let application : AdmissionApplication = {
      id = applicationId;
      studentName;
      fatherName;
      motherName;
      dateOfBirth;
      mobile;
      address;
      email;
      previousSchool;
      className;
      documentUrls;
      status = #pending;
      timestamp = Time.now();
    };

    nextApplicationNumber += 1;
    admissionApplications.add(applicationId, application);
  };

  public query ({ caller }) func getAdmissionApplication(
    applicationId : Text,
  ) : async ?AdmissionApplication {
    admissionApplications.get(applicationId);
  };

  public query ({ caller }) func getAllAdmissionApplications() : async [AdmissionApplication] {
    admissionApplications.values().toArray();
  };

  public query ({ caller }) func getAdmissionApplicationsByStatus(
    status : ApplicationStatus,
  ) : async [AdmissionApplication] {
    let iter = admissionApplications.values();
    let filteredIter = iter.filter(
      func(application) {
        application.status == status;
      }
    );
    filteredIter.toArray();
  };

  public shared ({ caller }) func updateApplicationStatus(
    applicationId : Text,
    status : ApplicationStatus,
  ) : async () {
    switch (admissionApplications.get(applicationId)) {
      case (?application) {
        let updatedApplication = { application with status };
        admissionApplications.add(applicationId, updatedApplication);
      };
      case (null) {
        RunTime.trap("Application not found : " # applicationId);
      };
    };
  };

  public shared ({ caller }) func updateApplicationField(
    applicationId : Text,
    field : Text,
    value : Text,
  ) : async () {
    switch (admissionApplications.get(applicationId)) {
      case (?application) {
        switch (field) {
          case ("studentName") {
            admissionApplications.add(applicationId, { application with studentName = value });
          };
          case ("fatherName") {
            admissionApplications.add(applicationId, { application with fatherName = value });
          };
          case ("motherName") {
            admissionApplications.add(applicationId, { application with motherName = value });
          };
          case ("dateOfBirth") {
            admissionApplications.add(applicationId, { application with dateOfBirth = value });
          };
          case ("mobile") {
            admissionApplications.add(applicationId, { application with mobile = value });
          };
          case ("address") {
            admissionApplications.add(applicationId, { application with address = value });
          };
          case ("email") {
            admissionApplications.add(applicationId, { application with email = value });
          };
          case ("previousSchool") {
            admissionApplications.add(applicationId, { application with previousSchool = value });
          };
          case ("className") {
            admissionApplications.add(applicationId, { application with className = value });
          };
          case (_) {
            RunTime.trap("Invalid field name: " # field);
          };
        };
      };
      case (null) {
        RunTime.trap("Application not found: " # applicationId);
      };
    };
  };

  public shared ({ caller }) func updateApplicationDocumentUrls(
    applicationId : Text,
    documentUrls : [Text],
  ) : async () {
    switch (admissionApplications.get(applicationId)) {
      case (?application) {
        let updatedApplication = { application with documentUrls };
        admissionApplications.add(applicationId, updatedApplication);
      };
      case (null) {
        RunTime.trap("Application not found: " # applicationId);
      };
    };
  };

  public query ({ caller }) func searchApplicationsByStudentName(
    searchTerm : Text,
  ) : async [AdmissionApplication] {
    let iter = admissionApplications.values();
    let filteredIter = iter.filter(
      func(application) {
        application.studentName.contains(
          #text searchTerm,
        );
      }
    );
    filteredIter.toArray();
  };

  func compareApplicationsByTimestamp(
    a : AdmissionApplication,
    b : AdmissionApplication,
  ) : Order.Order {
    let aTimestamp : Nat = a.timestamp.toNat();
    let bTimestamp : Nat = b.timestamp.toNat();
    Nat.compare(bTimestamp, aTimestamp);
  };

  public query ({ caller }) func getAllApplicationsSortedByTimestamp() : async [AdmissionApplication] {
    let applicationsArray = admissionApplications.values().toArray();
    applicationsArray.sort(
      compareApplicationsByTimestamp
    );
  };

  // ADMIN ONLY DELETE APPLICATION
  public shared ({ caller }) func deleteAdmissionApplication(applicationId : Text) : async () {
    let isAdminCheck = await isAdmin(caller);
    if (not isAdminCheck) {
      RunTime.trap("Unauthorized : " # caller.toText() # " is not admin");
    };

    switch (admissionApplications.get(applicationId)) {
      case (?_) {
        admissionApplications.remove(applicationId);
      };
      case (null) {
        RunTime.trap("Application not found: " # applicationId);
      };
    };
  };

  // STUDENT RESULTS LOGIC
  public shared ({ caller }) func submitStudentResult(
    rollNumber : Nat,
    studentName : Text,
    className : Text,
    subjects : [SubjectMark],
  ) : async () {
    let totalMarks = subjects.foldLeft(
      0,
      func(acc, subject) {
        acc + subject.marks;
      },
    );

    let numberOfSubjects = Nat.max(1, subjects.size());
    let percentage = totalMarks / numberOfSubjects;

    let result : StudentResult = {
      rollNumber;
      studentName;
      className;
      subjects;
      totalMarks;
      percentage;
      timestamp = Time.now();
    };

    studentResults.add(rollNumber, result);
  };

  public query ({ caller }) func getStudentResult(
    rollNumber : Nat,
  ) : async ?StudentResult {
    studentResults.get(rollNumber);
  };

  public query ({ caller }) func getAllStudentResults() : async [StudentResult] {
    studentResults.values().toArray();
  };

  public query ({ caller }) func getStudentResultsByClass(
    className : Text,
  ) : async [StudentResult] {
    let iter = studentResults.values();
    let filteredIter = iter.filter(
      func(result) {
        result.className == className;
      }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getStudentResultsBySubject(
    subjectName : Text,
  ) : async [StudentResult] {
    let iter = studentResults.values();
    let filteredIter = iter.filter(
      func(result) {
        let hasSubject = result.subjects.find(
          func(subject) {
            subject.subject == subjectName;
          }
        );
        switch (hasSubject) {
          case (?_) { true };
          case (null) { false };
        };
      }
    );
    filteredIter.toArray();
  };

  func compareResultsByPercentage(
    a : StudentResult,
    b : StudentResult,
  ) : Order.Order {
    Nat.compare(b.percentage, a.percentage);
  };

  public query ({ caller }) func getAllResultsSortedByPercentage() : async [StudentResult] {
    let resultsArray = studentResults.values().toArray();
    resultsArray.sort(
      compareResultsByPercentage
    );
  };

  // ADMIN ONLY DELETE RESULT
  public shared ({ caller }) func deleteStudentResult(rollNumber : Nat) : async () {
    let isAdminCheck = await isAdmin(caller);
    if (not isAdminCheck) {
      RunTime.trap("Unauthorized : " # caller.toText() # " is not admin");
    };

    switch (studentResults.get(rollNumber)) {
      case (?_) {
        studentResults.remove(rollNumber);
      };
      case (null) {
        RunTime.trap("Result not found: " # rollNumber.toText());
      };
    };
  };

  // ADMIN LOGIC
  public shared ({ caller }) func initializeFirstAdmin() : async Bool {
    if (admins.isEmpty()) {
      admins.add(caller);
      superAdmin := ?caller;
      true;
    } else {
      await isAdmin(caller);
    };
  };

  public shared ({ caller }) func addAdmin(principalId : Principal) : async () {
    let isCallerAdmin = await isAdmin(caller);
    if (isCallerAdmin) {
      let exist = admins.any(func(p) { Principal.equal(p, principalId) });
      if (exist) {
        RunTime.trap("Admin already present!");
      };
      admins.add(principalId);
    } else {
      RunTime.trap("Unauthorized : " # caller.toText() # " is not admin");
    };
  };

  public shared ({ caller }) func removeAdmin(principalId : Principal) : async () {
    let isAdminCheck = await isAdmin(caller);
    if (not isAdminCheck) {
      RunTime.trap("Unauthorized : " # caller.toText() # " is not admin");
    };

    let filteredList = admins.filter(
      func(p) { not Principal.equal(p, principalId) }
    );
    admins.clear();
    let valuesIter = filteredList.values();
    switch (valuesIter.next()) {
      case (null) { admins.clear() };
      case (?value) {
        admins.add(value);
        for (p in valuesIter) { admins.add(p) };
      };
    };
  };

  public shared ({ caller }) func removeAdminBySuperAdmin(principalId : Principal) : async () {
    switch (superAdmin) {
      case (?admin) if (Principal.equal(admin, caller)) {
        let filteredList = admins.filter(
          func(p) { not Principal.equal(p, principalId) }
        );
        admins.clear();
        let valuesIter = filteredList.values();
        switch (valuesIter.next()) {
          case (null) { admins.clear() };
          case (?value) {
            admins.add(value);
            for (p in valuesIter) {
              admins.add(p);
            };
          };
        };
      };
      case (_) {
        RunTime.trap("Unauthorized : " # caller.toText() # " is not super admin");
      };
    };
  };

  public query ({ caller }) func isAdmin(principalId : Principal) : async Bool {
    admins.any(func(p) { Principal.equal(p, principalId) });
  };

  public query ({ caller }) func isSuperAdmin(principalId : Principal) : async Bool {
    switch (superAdmin) {
      case (?admin) { Principal.equal(admin, principalId) };
      case (null) { false };
    };
  };

  public query ({ caller }) func getAllAdmins() : async [Principal] {
    admins.toArray();
  };

  public shared ({ caller }) func resetSystem(
    c : Principal,
  ) : async () {
    let isAdminCheck = await isAdmin(c);
    if (not isAdminCheck) {
      RunTime.trap("Unauthorized : " # c.toText() # " is not admin");
    };

    contactSubmissions.clear();
    admissionApplications.clear();
    studentResults.clear();
    admins.clear();

    let defaultAdmin = c;
    admins.add(defaultAdmin);

    nextContactId := 1;
    nextApplicationNumber := 1;
  };
};

