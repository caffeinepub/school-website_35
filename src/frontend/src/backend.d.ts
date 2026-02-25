import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdmissionApplication {
    id: string;
    status: ApplicationStatus;
    documentUrls: Array<string>;
    studentName: string;
    previousSchool: string;
    dateOfBirth: string;
    motherName: string;
    email: string;
    fatherName: string;
    address: string;
    timestamp: bigint;
    mobile: string;
    className: string;
}
export interface SubjectMark {
    marks: bigint;
    subject: string;
}
export interface StudentResult {
    totalMarks: bigint;
    studentName: string;
    subjects: Array<SubjectMark>;
    rollNumber: bigint;
    timestamp: bigint;
    className: string;
    percentage: bigint;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum ApplicationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addAdmin(principalId: Principal): Promise<void>;
    getAdmissionApplication(applicationId: string): Promise<AdmissionApplication | null>;
    getAllAdmissionApplications(): Promise<Array<AdmissionApplication>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllStudentResults(): Promise<Array<StudentResult>>;
    getStudentResult(rollNumber: bigint): Promise<StudentResult | null>;
    isAdmin(principalId: Principal): Promise<boolean>;
    removeAdmin(principalId: Principal): Promise<void>;
    resetSystem(c: Principal): Promise<void>;
    submitAdmissionApplication(studentName: string, fatherName: string, motherName: string, dateOfBirth: string, mobile: string, address: string, email: string, previousSchool: string, className: string, documentUrls: Array<string>): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
    submitStudentResult(rollNumber: bigint, studentName: string, className: string, subjects: Array<SubjectMark>): Promise<void>;
    updateApplicationStatus(applicationId: string, status: ApplicationStatus): Promise<void>;
}
