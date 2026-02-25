import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
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

  // State variables
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  let admissionApplications = Map.empty<Text, AdmissionApplication>();
  var nextApplicationNumber = 1;

  let studentResults = Map.empty<Nat, StudentResult>();

  let adminList = List.empty<Principal>();

  // CONTACT FORM LOGIC
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
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
    let applicationId = "BSS/2026/" # applicationNumber.toText();

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

  public query ({ caller }) func getAdmissionApplication(applicationId : Text) : async ?AdmissionApplication {
    admissionApplications.get(applicationId);
  };

  public query ({ caller }) func getAllAdmissionApplications() : async [AdmissionApplication] {
    admissionApplications.values().toArray();
  };

  public shared ({ caller }) func updateApplicationStatus(applicationId : Text, status : ApplicationStatus) : async () {
    switch (admissionApplications.get(applicationId)) {
      case (?application) {
        let updatedApplication = { application with status };
        admissionApplications.add(applicationId, updatedApplication);
      };
      case (null) {
        Runtime.trap("Application not found : " # applicationId);
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

  public query ({ caller }) func getStudentResult(rollNumber : Nat) : async ?StudentResult {
    studentResults.get(rollNumber);
  };

  public query ({ caller }) func getAllStudentResults() : async [StudentResult] {
    studentResults.values().toArray();
  };

  // ADMIN LOGIC
  public shared ({ caller }) func addAdmin(principalId : Principal) : async () {
    let isCallerAdmin = await isAdmin(caller);
    if (isCallerAdmin) {
      let isExist = adminList.any(func(p) { Principal.equal(p, principalId) });
      if (isExist) {
        Runtime.trap("Principal " # principalId.toText() # " is already admin!");
      } else {
        adminList.add(principalId);
      };
    } else {
      Runtime.trap("Unauthorized : Caller " # caller.toText() # " is not an admin");
    };
  };

  public shared ({ caller }) func removeAdmin(principalId : Principal) : async () {
    let isCallerAdmin = await isAdmin(caller);
    if (isCallerAdmin) {
      let mapList = adminList.map(func(p) { p });
      for (p in mapList.values()) {
        if (Principal.equal(p, principalId)) {
          Runtime.trap("Cannot remove the last admin!");
        };
      };
      let filteredList = adminList.filter(func(p) { not Principal.equal(p, principalId) });
      adminList.clear();
      let valuesIter = filteredList.values();
      switch (valuesIter.next()) {
        case (null) { adminList.clear() };
        case (?value) {
          adminList.add(value);
          for (p in valuesIter) { adminList.add(p) };
        };
      };
    } else {
      Runtime.trap("Unauthorized : " # caller.toText() # " is not admin");
    };
  };

  public query ({ caller }) func isAdmin(principalId : Principal) : async Bool {
    adminList.any(func(p) { Principal.equal(p, principalId) });
  };

  public shared ({ caller }) func resetSystem(c : Principal) : async () {
    let isCallerAdmin = await isAdmin(c);
    if (not isCallerAdmin) {
      Runtime.trap("Unauthorized : " # c.toText() # " is not admin");
    };

    contactSubmissions.clear();
    admissionApplications.clear();
    studentResults.clear();
    adminList.clear();

    let defaultAdmin = c;
    adminList.add(defaultAdmin);

    nextContactId := 1;
    nextApplicationNumber := 1;
  };
};
