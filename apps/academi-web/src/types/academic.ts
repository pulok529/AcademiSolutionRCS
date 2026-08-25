export interface Student {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  contactNo: string;
  address: string;
  photoPath?: string;
  admissionDate: string;
  isActive: boolean;
  classId?: string;
  className?: string;
  sectionId?: string;
  sectionName?: string;
  rollNo?: number;
  academicYear?: number;
}

export interface ClassItem {
  id: string;
  className: string;
  code: string;
  orderNo: number;
  sections: SectionItem[];
}

export interface SectionItem {
  id: string;
  sectionName: string;
  capacity: number;
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CreateStudentRequest {
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: number; // 1 = Male, 2 = Female
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  contactNo: string;
  address: string;
  classId: string;
  sectionId: string;
  shift: number;
  academicYear: number;
  rollNo: number;
}
