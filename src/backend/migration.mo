import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  type OldContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type OldActor = {
    nextId : Nat;
    submissions : Map.Map<Nat, OldContactSubmission>;
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

  type NewActor = {
    contactSubmissions : Map.Map<Nat, OldContactSubmission>;
    nextContactId : Nat;
    admissionApplications : Map.Map<Text, AdmissionApplication>;
    nextApplicationNumber : Nat;
    studentResults : Map.Map<Nat, StudentResult>;
    adminList : List.List<Principal>;
  };

  public func run(old : OldActor) : NewActor {
    {
      contactSubmissions = old.submissions;
      nextContactId = old.nextId;
      admissionApplications = Map.empty<Text, AdmissionApplication>();
      nextApplicationNumber = 1;
      studentResults = Map.empty<Nat, StudentResult>();
      adminList = List.empty<Principal>();
    };
  };
};
