export enum UserStatus {
    Active = "Active",
    Banned = "Banned",
    Deleted = "Deleted",
}
  
export enum RoleName {
    Admin = "Admin",
    Volunteer = "Volunteer",
}
  
  // src/models/types.ts
export enum VolunteerStatus {
    Active = 'Active',
    Deleted = 'Deleted',
    Banned = 'Banned',
}

export enum Gender {
Male = 'Male',
Female = 'Female',
Other = 'Other',
}

export enum CitizenshipType {
Singaporean = 'Singaporean',
SingaporePermanentResident = 'Singapore Permanent Resident',
LongTermVisitPass = 'Long Term Visit Pass',
EmploymentPass = 'Employment Pass / S Pass',
}

export enum EmploymentStatus {
Employed = 'Employed / Self- Employed',
Unemployed = 'Unemployed',
Student = 'Student',
Retired = 'Retired',
Other = 'Other', // Use this with a free text field
}

export enum DrivingLicence {
Yes = 'Yes',
No = 'No',
}

export enum AttendanceStatus {
    Present = 'Present',
    Absent = 'Absent',
    Unconfirmed = 'Unconfirmed',
}

export enum CertificateType {
Completion = 'Completion',
Milestone = 'Milestone',
Special = 'Special',
}