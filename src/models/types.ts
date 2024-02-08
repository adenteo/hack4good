export enum UserStatus {
  Active = 'Active',
  Banned = 'Banned',
  Deleted = 'Deleted',
}

export enum RoleName {
  Admin = 'Admin',
  Volunteer = 'Volunteer',
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

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Unconfirmed = 'Unconfirmed',
}

export enum ActivityStatus {
  Upcoming = 'Upcoming',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum CertificateType {
  Completion = 'Completion',
  Milestone = 'Milestone',
  Special = 'Special',
}

export enum volunteerTheme {
  Elderly = 'Elderly',
  Teaching = 'Teaching',
  Environment = 'Environment',
  Animals = 'Animals',
  Plants = 'Plants',
  Heritage = 'Heritage',
  Health = 'Health',
  Literacy = 'Literacy',
  Refugees = 'Refugees',
  Food = 'Food',
  Cooking = 'Cooking',
  Children = 'Children',
  Education = 'Education',
  Rescue = 'Rescue',
  Arts = 'Arts',
  Accessibility = 'Accessibility',
  Sports = 'Sports',
  Medical = 'Medical',
  Legal = 'Legal',
  Income = 'Income',
  Water = 'Water',
  Energy = 'Energy',
  Parenting = 'Parenting',
  Finance = 'Finance',
  Recovery = 'Recovery',
  Rehabilitation = 'Rehabilitation',
  Digital = 'Digital',
  Charity = 'Charity',
  Overseas = 'Overseas',
}

// export enum ProfilePictureUrl {
//   Portrait = 'https://loremflickr.com/1920/1080/portrait',
//   People = 'https://loremflickr.com/1920/1080/people',
//   Face = 'https://loremflickr.com/1920/1080/face',
//   Selfie = 'https://loremflickr.com/1920/1080/selfie',
//   Smile = 'https://loremflickr.com/1920/1080/smile',
// }
