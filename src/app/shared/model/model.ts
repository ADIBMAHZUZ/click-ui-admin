export interface Publisher {
  id: any | null;
  name: string | null;
}

export interface Library {
  id: any | null;
  name: string | null;
}

export enum UserType {
  ADMIN = "admin",
  SUBSCRIBER = "subscriber",
  TEACHER = "teacher",
  PUBLISHER = "publisher",
  LIBRARIAN = "librarian",
}

export enum QuotationType {
  QUOTATION = "quotation",
  COMMISSION = "commission",
}
