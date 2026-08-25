# Bornomala School Management System
## Complete Reference Documentation
**Prepared by**: Creatrix Soft Tech Ltd  
**Date**: 2025  
**Version**: Legacy System Analysis v1.0  

---

## 1. Executive Summary
The **Bornomala School Management System** is a comprehensive software platform designed to manage the end-to-end operations of an educational institution. It provides an integrated environment where various school departments can collaborate effectively. 

**Who uses it?**
- **School Administrators**: To oversee operations, assign permissions, and view high-level reports.
- **Teachers & Academics**: To manage student admissions, enter exam marks, and track student attendance.
- **Accountants**: To manage school finances, fee collections, daily income/expenses, and generate balance sheets.
- **HR Staff**: To manage employee records, track staff attendance, process leave, and generate payroll.

**Scope of the System**
The system is divided into four main modules: Academic, Accounts, HRM (Human Resources), and Admin. It features hundreds of pages and forms, offering a vast array of reports and complex operational workflows to solve the daily challenges of school management.

---

## 2. System Modules at a Glance

| Module Name | Description | Key Areas Covered |
|---|---|---|
| **Academic** | The core student and school management engine. | Admissions, Promotions, Exams, Student Attendance, Fee Setup, Routines |
| **Accounts** | A complete financial accounting system. | Chart of Accounts, Incomes/Expenses, Bank Transfers, Balance Sheets |
| **HRM** | Staff management and payroll processing. | Employee Profiles, Attendance, Leaves, Salary Generation |
| **Admin** | System configuration and security management. | Login Security, Role Permissions, Menu Assignments |

---

## 3. User Roles & What They Can Do

* **Super Admin / Principal**: Has unrestricted access to all modules. Can create users, assign menu permissions, and view all financial and academic reports.
* **Academic Coordinator / Teacher**: Can access the Academic module to enroll students, process promotions, create class routines, take attendance, and input exam marks.
* **Accountant / Cashier**: Has access to the Accounts module and Academic Fee Collection. They can collect student fees, record daily expenses, manage bank accounts, and run ledgers.
* **HR Manager**: Has access to the HRM module. They can add new employees, process daily staff attendance, approve leaves, and generate monthly salary slips.

---

## 4. Academic Module — Full Feature Guide

### Admission & Student Management
* **What is it?** The module to enroll new students and manage their personal information.
* **Who uses it?** Admissions Office, Teachers, Academic Admins.
* **How it works**: A staff member enters the student's demographic details, assigns them to a Class, Department, Section, and Shift, and records their previous educational background. The system generates a unique Student Code.
* **Information recorded**: Personal details, guardian info, contact numbers, assigned class/roll, and optional subjects.
* **Reports**: Student Admission Report, All Student Demographics.

### Student Promotion & Transfer
* **What is it?** Moves students to the next academic session or another school.
* **Who uses it?** Academic Admins.
* **How it works**: The system evaluates the student's exam results (CGPA/Total marks) and allows the admin to auto-promote them to the next class or session. If a student leaves, a transfer record is generated.

### Exam System & Results
* **What is it?** Manages exam marks and generates report cards.
* **Who uses it?** Teachers and Exam Controllers.
* **How it works**: Staff configure exams, map subjects to classes, and enter marks for students. The system calculates grades and CGPA based on predefined rules. 

### Class Routine & Admit Cards
* **What is it?** Schedules classes and generates exam entry passes.
* **Who uses it?** Academic Admins.
* **How it works**: Generates printable Admit Cards for exams. Organizes class schedules by day, teacher, and subject.

### Fee Collection (Academic)
* **What is it?** Collects monthly or yearly school fees from students.
* **Who uses it?** Accountants, Cashiers.
* **How it works**: Staff maps fee rules to a class. When a student pays, the staff selects the student, sees the dues, and processes the payment, which prints a receipt.

---

## 5. Accounts Module — Full Feature Guide

### Chart of Accounts & Financial Setup
* **What is it?** The backbone of the accounting module mapping out all ledgers.
* **Who uses it?** Chief Accountant.
* **How it works**: Staff creates account heads (Income, Expense, Assets, Liabilities) and configures the financial year.

### Daily Income & Expenses
* **What is it?** Tracks day-to-day cash flow outside of student fees.
* **Who uses it?** Accountants.
* **How it works**: Whenever money is spent (e.g., buying supplies) or received (e.g., donations), the accountant records a voucher mapping to the correct account head.

### Bank & Cash Accounts (Balance Transfers)
* **What is it?** Manages physical cash and bank balances.
* **Who uses it?** Accountants.
* **How it works**: Records deposits, withdrawals, and bank-to-bank transfers to keep system balances aligned with real-world bank statements.

---

## 6. HRM Module — Full Feature Guide

### Employee General Information
* **What is it?** The central database for all school staff (teachers, guards, admins).
* **Who uses it?** HR Manager.
* **How it works**: HR creates a profile capturing personal details, educational history, job experience, and banking information. The employee is assigned to a Department and Designation.

### Attendance Management
* **What is it?** Tracks staff in-times and out-times.
* **Who uses it?** HR Manager.
* **How it works**: Employees are assigned to Shifts (which define start/end times and late buffers). The system calculates late arrivals, early departures, and overtime based on punch data.

### Leave Management
* **What is it?** Handles employee time off.
* **Who uses it?** HR Manager, Employees.
* **How it works**: Every year, a Leave Inventory is created for staff (e.g., 10 Sick Days, 15 Casual Days). Employees request leave, and managers approve it, deducting from the inventory.

### Payroll & Salary Generation
* **What is it?** Calculates monthly paychecks.
* **Who uses it?** HR Manager, Accounts.
* **How it works**: The system looks at the employee's Grade and Designation to find their basic pay and allowances. It then calculates deductions (absences, late penalties, provident fund) to generate the net payable salary.
* **Salary Rules**: Salary calculation factors in Govt MPO (Monthly Pay Orders), overtime rates, night bills, and tiffin allowances depending on the employee type.

---

## 7. Admin & System Features

* **Login & Authentication**: Users log in with a username and password. The system checks their role and a built-in software expiration date to permit access.
* **Role Permissions**: The Super Admin can dynamically assign access. They select a user and check off exactly which menus and sub-menus that user is allowed to see.
* **System Settings**: Database configurations and Crystal Reports settings are managed by IT administrators in the background.

---

## 8. Complete Reports Catalogue

| Report Name | Module | What It Shows | Who Uses It | Filters/Parameters |
|---|---|---|---|---|
| **All Student Report** | Academic | Complete list of students and demographics | Admin, Teachers | Class, Section, Session |
| **Exam Marks Result** | Academic | Detailed student report cards and marksheets | Teachers, Parents | Class, Semester, Roll |
| **Daily Fee Collection** | Academic | Total fees collected on a given day/month | Accountant | Date Range, Month |
| **Balance Sheet** | Accounts | Assets, liabilities, and equity | Admin, Accountant | Date, Cash/Bank Account |
| **Student Due Report** | Accounts | List of students with unpaid fee balances | Accountant | Class, Section, Due Date |
| **General Ledger** | Accounts | Detailed debit/credit history of any account | Accountant | Account Code, Date Range |
| **Monthly Attendance** | HRM | Staff present/absent/late tallies | HR Manager | Date Range, Employee |
| **Employee Pay Slip** | HRM | Detailed salary breakdown for an employee | HR Manager | Month, Employee Code |
| **Leave Report** | HRM | Remaining vs. utilized leaves per employee | HR Manager | Year, Employee Code |

---

## 9. Business Rules Reference

* **Fee Calculation Rules**: Fees are predefined by Class and Section. The system automatically creates dues for every student based on the fee map. Dues become payable immediately after the designated due date.
* **Exam Grading Rules**: Grades and CGPAs are calculated based on a threshold matrix (e.g., 80-100 = A+ = 5.0). Main subjects heavily impact the GPA, while optional subjects have different weightings.
* **Payroll Rules**: An employee's gross salary consists of Basic Pay + Housing + Medical. If an employee is late beyond the allowed threshold, deductions may occur. Overtime is paid out by multiplying OT hours by the designation's specific OT Rate.
* **Leave Rules**: Leaves must be allocated to an employee's annual inventory before they can be taken. Unapproved leaves are marked as absences, resulting in pay deduction.

---

## 10. Data Dictionary

| Term | What It Means |
|---|---|
| **Student Code / Emp Code** | The unique identification number given to a student or employee. |
| **Session** | The academic year (e.g., 2024-2025). |
| **Shift** | The specific time block a class runs (Morning/Day) or an employee works. |
| **MPO (Monthly Pay Order)** | A government system in Bangladesh where the state pays a portion of a teacher's salary. |
| **Voucher** | A recorded document in the accounting system proving an income, expense, or journal entry. |
| **Ledger / Account Head** | A specific category for tracking money (e.g., "Electricity Bill", "Tuition Fees"). |
| **CGPA** | Cumulative Grade Point Average; the standardized metric of student performance. |

---

## 11. Known Limitations & Improvement Areas

* **Hardcoded Expiration Check**: The system relies on a hardcoded date (`30-Jun-2028`) to lock the system, which poses a risk for long-term uninterrupted usage.
* **Lack of Global Error Handling**: The system does not gracefully handle unexpected errors, which can result in crashes or blank screens for end-users.
* **Complex UI Workflows**: Pages like Admission and Payroll require many manual steps and clicks, slowing down data entry during busy periods.
* **Tightly Coupled Components**: The current structure makes it difficult to upgrade one module without impacting the others. A modernized system should decouple these features for better performance and maintainability.
