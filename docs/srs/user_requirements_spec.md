# User Requirements Specification (SRS)
## Academic & Accounts School Management System

**Prepared by**: Creatrix Soft Tech Ltd  
**Document Version**: v1.0.0  
**Target System**: Academi School Management System (.NET 9 Clean Architecture Microservices + React 18 Paces Suite)  
**Source Legacy Codebase**: Bornomala_School ASP.NET WebForms Project  

---

## 1. Executive Requirements Overview

### 1.1 Purpose & Target Audience
This System Requirements Specification (SRS) defines the complete functional, business rule, and operational capability requirements for the new **Academi School Management System**. This document is generated strictly from the business logic, formulas, algorithms, and workflows extracted from the legacy WebForms codebase.

### 1.2 System Scope
The system scope covers two core microservices:
1. **Academic Management Module**: Student Admissions, Student Directory & 360° Profile, Class & Section Management, Subject Allocations, Class Routine Timetable, Daily Attendance, Exam Terms, Spreadsheet Marks Entry, Automated GPA & Result Processing Engine, Tabulation Sheets, Admit Cards, and Fee Rules.
2. **Financial Accounts Module**: Chart of Accounts, Cash Accounts, Bank Accounts, Voucher Entry (Journal, Payment Debit, Receipt Credit, Contra), Daily Petty Cash Expenses & Incomes, Balance Transfers, Assets, Liabilities, Customer & Supplier Master, and Financial Ledgers & Reports.

*(Note: HRM & Payroll Module is explicitly excluded from current scope per user mandate).*

---

## 2. Academic Module — Functional Requirements & Capabilities

### 2.1 Student Admission & Enrollment
- **FR-ACAD-01**: System shall generate a unique 11-digit Student Registration Code (`STU-YYYY-XXXXX`) for every new admission.
- **FR-ACAD-02**: System shall record full student personal data (Name, DOB, Gender, Religion, Blood Group, Father's Name, Mother's Name, Guardian Contact Mobile, Present Address, Permanent Address, Student Photograph).
- **FR-ACAD-03**: System shall map each student to an active Session (Academic Year), Class, Section, Shift, and Department (Science/Business/Humanities for Class 9-10).
- **FR-ACAD-04**: System shall support bulk student promotion from current session/class/section to target session/class/section with new roll number assignments.

### 2.2 Academic Structure & Timetable
- **FR-ACAD-05**: System shall manage multi-class and section configurations with defined student capacity limits.
- **FR-ACAD-06**: System shall allow subject mapping to classes, defining full marks, pass marks, written weightage, MCQ weightage, and practical weightage per subject.
- **FR-ACAD-07**: System shall provide an interactive weekly Class Routine Timetable generator with automated teacher conflict detection to prevent double-booking teachers across classes in the same period.

### 2.3 Exam Marks Entry & Automated GPA Processing Engine
- **FR-ACAD-08**: System shall provide a spreadsheet-style marks entry grid for teachers to input Written, MCQ, and Practical marks per subject.
- **FR-ACAD-09**: System shall calculate subject GPA (0.00 to 5.00) and Letter Grade (A+, A, A-, B, C, D, F) based on the official school grading scale:
  - `80% - 100%`: GPA 5.00 (`A+`)
  - `70% - 79%`: GPA 4.00 (`A`)
  - `60% - 69%`: GPA 3.50 (`A-`)
  - `50% - 59%`: GPA 3.00 (`B`)
  - `40% - 49%`: GPA 2.00 (`C`)
  - `33% - 39%`: GPA 1.00 (`D`)
  - `0% - 32%`: GPA 0.00 (`F`)
- **FR-ACAD-10**: System shall execute 1-Click Automated Result Processing:
  - If a student receives GPA 0.00 (`F`) in ANY mandatory subject, overall Cumulative GPA is set to `0.00` and Result Status is marked `FAIL`.
  - Calculate Cumulative GPA = `Sum(Passed Subject GPAs) / Total Subjects`.
  - Assign Merit Ranks / Class Position ordered by `Cumulative GPA DESC` and `Total Marks DESC`.
- **FR-ACAD-11**: System shall generate PDF Tabulation Sheets, Report Cards, and Exam Admit Cards.

### 2.4 Daily Attendance Tracking
- **FR-ACAD-12**: System shall allow daily class register entry marking students `Present`, `Absent`, or `Late`.
- **FR-ACAD-13**: System shall calculate monthly attendance percentages and generate absent student alert reports.

### 2.5 Student Fee Collection Counter (POS)
- **FR-ACAD-14**: System shall compute student fee dues based on Session Fee Rules, Monthly Tuition, Exam Fees, and Special Freestudentship/Waiver discounts.
- **FR-ACAD-15**: System shall process real-time cash/bank fee collections at the counter, generate a unique Money Receipt Voucher (`MV-YYYY-XXXX`), update student due ledgers, and print PDF money receipts.

---

## 3. Financial Accounts Module — Functional Requirements & Capabilities

### 3.1 Chart of Accounts & General Ledger
- **FR-ACC-01**: System shall maintain a 4-tier hierarchical Chart of Accounts (Assets, Liabilities, Income, Expenses) with custom account codes.
- **FR-ACC-02**: System shall manage cash counters and bank accounts with branch codes and real-time balance tracking.

### 3.2 Double-Entry Voucher Accounting
- **FR-ACC-03**: System shall enforce strict Double-Entry Accounting validation (`Total Debit Amount MUST equal Total Credit Amount`) before posting any voucher.
- **FR-ACC-04**: System shall support 4 primary voucher types:
  - **Payment Voucher (Debit)**: Cash/Bank disbursements for expenses.
  - **Receipt Voucher (Credit)**: Cash/Bank receipts for tuition and income.
  - **Journal Voucher**: Non-cash adjustments, depreciation, and liability entries.
  - **Contra Voucher**: Cash-to-Bank and Bank-to-Cash internal balance transfers.

### 3.3 Daily Expenses & Income Tracking
- **FR-ACC-05**: System shall record petty cash daily operational expenses (Utility bills, office supplies, repairs) and update main cash ledgers.
- **FR-ACC-06**: System shall record miscellaneous school income items (Form sales, canteen rent, hall rent).

### 3.4 Financial Reporting & Audit
- **FR-ACC-07**: System shall generate General Ledgers, Daily Cash Books, Bank Books, Trial Balance, Income-Expenditure Statements, and Balance Sheet Reports.

---

## 4. User Roles & Permission Matrix

| User Role | Academic Management | Exam Marks & Processing | Fee Collection (POS) | Accounts & Vouchers | Financial Reports |
|---|---|---|---|---|---|
| **Super Admin** | Full Control | Full Control | Full Control | Full Control | Full Control |
| **Principal / Headmaster** | View / Approve | View / Approve | View | View | Full Control |
| **Teacher** | Attendance / Routine | Marks Entry Only | No Access | No Access | No Access |
| **Accountant / Cashier** | View Students | No Access | Full Collection | Full Voucher Entry | Reports Only |
| **Data Entry Staff** | Admission Entry | Entry Only | Counter Only | No Access | No Access |

---

## 5. Non-Functional Requirements & Performance Standards

- **NFR-01 (Performance)**: Exam result processing engine must calculate GPAs and class ranks for 2,000 students in under 5 seconds.
- **NFR-02 (Availability)**: System must maintain 99.9% uptime inside Docker container environment.
- **NFR-03 (Security)**: Keycloak OAuth2 / OpenID Connect SSO authentication with JWT token validation at YARP API Gateway.
- **NFR-04 (Data Integrity)**: Database transactions (`SqlTransaction` / EF Core `IDbContextTransaction`) must enforce ACID compliance across master-detail entries.
