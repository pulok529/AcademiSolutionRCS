# Legacy Bornomala_School System Visual Map

This document provides visual Mermaid diagrams representing the architecture, module hierarchy, process flows, and entities of the legacy Bornomala_School school management system.

## Section 1: System Module Hierarchy

```mermaid
mindmap
  root((School System))
    Academic
      Admission
      StudentInfo
      ExamMarks
      FeeCollection
      Promotion
    HRM
      EmployeeInfo
      Attendance
      Leave
      Payroll
      JobDescription
    Accounts
      ChartOfAccounts
      Transactions
      BalanceTransfer
      Assets
    Admin
      Authentication
      UserPermissions
      MenuManagement
```

## Section 2: User Role & Permission Map

```mermaid
flowchart LR
    A[Super Admin] -->|UserId = 1| B(All Modules)
    
    C[System Admin] --> D[Admin Module]
    D --> D1[User Permissions]
    D --> D2[Menu Management]
    
    E[HR Manager] --> F[HRM Module]
    F --> F1[Employee Management]
    F --> F2[Payroll & Leave]
    
    G[Accountant] --> H[Accounts Module]
    H --> H1[Vouchers & Transactions]
    H --> H2[Financial Reports]
    H --> H3[Fee Collection]
    
    I[Teacher / Academic Staff] --> J[Academic Module]
    J --> J1[Student Admission]
    J --> J2[Exam Marks Entry]
    J --> J3[Attendance]
```

## Section 3: Authentication & Session Flow

```mermaid
flowchart TD
    A[User accesses Login.aspx] --> B{Is current date < 30-Jun-2028?}
    B -- No --> C[Show Copyright Expiry Error]
    B -- Yes --> D[Enter Username & Password]
    D --> E[PanalBLL.Login]
    E --> F{Credentials Valid?}
    F -- No --> G[Show Invalid Login Message]
    F -- Yes --> H[Populate Session & Cookies]
    H --> H1[UserId]
    H --> H2[LoginName]
    H --> H3[UserType]
    H --> H4[SchoolId]
    H1 & H2 & H3 & H4 --> I[Redirect to CommonUI/HomePage.aspx]
    I --> J[MainMasterPage.master validates Session]
    J --> K{Is Session Valid?}
    K -- No --> L[Redirect to Default.aspx]
    K -- Yes --> M{Is UserId == 1?}
    M -- Yes --> N[Load All Menus]
    M -- No --> O[Load Permitted Menus Only]
    N & O --> P[Render Dynamic Menu HTML]
```

## Section 4: Navigation Menu Tree

```mermaid
graph TD
    Root[Main Menu] --> Academic[Academic]
    Root --> HR[HRM]
    Root --> Acc[Accounts]
    Root --> Admin[Admin]

    Academic --> Adm[Admission]
    Academic --> Stu[Student Info]
    Academic --> Promo[Promotion]
    Academic --> AcadRpt[Reports]

    HR --> EmpGeneral[Employee General Info]
    HR --> EmpEdu[Employee Education]
    HR --> EmpDesig[Designation & Dept]
    HR --> HRRpt[HR Reports]

    Acc --> AccType[Account Types]
    Acc --> Assets[Assets]
    Acc --> BalTransfer[Balance Transfer]
    Acc --> AccRpt[Accounts Reports]

    Admin --> MenuMgt[Menu Management]
    Admin --> UserPerm[User Permissions]
```

## Section 5: Academic Module Process Flows

### Student Admission Flow
```mermaid
flowchart TD
    A[Admission.aspx] --> B[Fill Student & Fee Data]
    B --> C[Select Main & Optional Subjects]
    C --> D[Submit]
    D --> E[AdmissionBLL.SaveDataForAdmissionInfo]
    E --> F[AdmissionInfoDAL.SaveData]
    F --> G[(Database)]
    G --> H[Update Fee Map]
```

### Exam Marks Entry & Result Processing Flow
```mermaid
flowchart TD
    A[Exam Marks Page] --> B[Select Class, Session, Subject]
    B --> C[Load Students List]
    C --> D[Enter Marks]
    D --> E[Save via ExamMarksBLL]
    E --> F[(Database)]
    F --> G[Result Processing Engine]
    G --> H[Generate Marksheet Reports]
```

### Fee Collection Flow
```mermaid
flowchart TD
    A[Fee Collection Entry] --> B[Enter Student Roll/Code]
    B --> C[Load Due Fees from FeeRule Table]
    C --> D[Enter Collection Amount]
    D --> E[Submit via FeeCollectionBLL]
    E --> F[(Database)]
    F --> G[Generate Money Receipt]
```

### Student Promotion/Transfer Flow
```mermaid
flowchart TD
    A[PromotionAdmission.aspx] --> B[Load Current Class Data]
    B --> C[Select Eligible Students]
    C --> D[Promote via AdmissionBLL.PromotionProcess]
    D --> E[Update ClassId and SessionId]
    E --> F[(Database)]
```

### Attendance Recording Flow
```mermaid
flowchart TD
    A[Attendance Entry Page] --> B[Select Class & Date]
    B --> C[Load Enrolled Students]
    C --> D[Mark Present/Absent]
    D --> E[Save to Database via AttendanceBLL]
```

## Section 6: HRM Module Process Flows

### Employee Registration Flow
```mermaid
flowchart TD
    A[EmpGeneralInfo.aspx] --> B[Enter Personal Info]
    B --> C[Add Education History]
    C --> D[Add Job Experience]
    D --> E[Submit via EmpGeneralInfoBLL]
    E --> F[EmpMasterCodeGenerator]
    F --> G[(Database)]
```

### Daily Attendance Processing Flow
```mermaid
flowchart TD
    A[Punch Data Input] --> B[Map to Employee Codes]
    B --> C[Calculate In/Out Times]
    C --> D[Determine Late/Absence/Leave]
    D --> E[(Attendance Records)]
```

### Payroll/Salary Calculation Flow
```mermaid
flowchart TD
    A[Payroll Processing] --> B[Fetch Basic Salary & GradeType]
    B --> C[Add Allowances]
    C --> D[Calculate Deductions from Attendance & Advance]
    D --> E[Compute Net Payable Salary]
    E --> F[(Salary Ledger)]
```

### Leave Management Flow
```mermaid
flowchart TD
    A[Leave Application] --> B[Check Leave Balance]
    B --> C[Submit Application]
    C --> D[Manager Approval]
    D --> E[Update Leave Register]
```

### Advance Salary Approval Flow
```mermaid
flowchart TD
    A[Advance Request] --> B[HR Review]
    B --> C[Approval Routing]
    C --> D[Disbursement]
    D --> E[Map to Next Payroll Deduction]
```

## Section 7: Accounts Module Process Flows

### Chart of Accounts Setup Flow
```mermaid
flowchart TD
    A[AccTypeEntry.aspx] --> B[Define Account Heads]
    B --> C[Set Assets/Liabilities/Income/Expense]
    C --> D[(Accounts DB)]
```

### Payment/Transaction Entry Flow
```mermaid
flowchart TD
    A[Voucher Entry] --> B[Select Debit/Credit Accounts]
    B --> C[Enter Amount & Description]
    C --> D[Submit via TransactionBLL]
    D --> E[(Ledger Update)]
```

### Balance Transfer Flow
```mermaid
flowchart TD
    A[BalanceTransferEntry.aspx] --> B[Select Source Account]
    B --> C[Select Destination Account]
    C --> D[Enter Amount]
    D --> E[Transfer Funds via BLL]
    E --> F[(Double Entry Ledger Update)]
```

### Financial Reporting Flow
```mermaid
flowchart TD
    A[Report Viewer Selection] --> B[Provide Parameters]
    B --> C[BLL generates Summary DataTables]
    C --> D[Crystal Reports Document Binding]
    D --> E[Render PDF/HTML]
```

## Section 8: Entity Relationship Diagram

```mermaid
erDiagram
    STUDENT {
        int StudentId PK
        string StudentCode
        string StudentName
        int ClassId FK
    }
    CLASS {
        int ClassId PK
        string ClassName
    }
    SECTION {
        int SectionId PK
        int ClassId FK
    }
    DEPARTMENT {
        int DeptId PK
    }
    FEE_COLLECTION {
        int CollectionId PK
        int StudentId FK
        decimal Amount
    }
    EMPLOYEE {
        int EmpInfoId PK
        string EmpMasterCode
        string EmpName
        int DeptId FK
        int DesigId FK
    }
    SALARY {
        int SalaryId PK
        int EmpInfoId FK
        decimal NetPay
    }
    ACCOUNT {
        int AccountId PK
        string AccountType
    }
    TRANSACTION {
        int TransId PK
        int AccountId FK
        decimal Amount
    }
    USER {
        int UserId PK
        string LoginName
    }
    MENU {
        int MenuId PK
        string MenuName
    }
    PERMISSION {
        int PermissionId PK
        int UserId FK
        int MenuId FK
    }

    STUDENT }|--|| CLASS : enrolled_in
    STUDENT }|--|| SECTION : belongs_to
    STUDENT }|--|| DEPARTMENT : belongs_to
    STUDENT ||--o{ FEE_COLLECTION : pays
    EMPLOYEE }|--|| DEPARTMENT : belongs_to
    EMPLOYEE ||--o{ SALARY : receives
    ACCOUNT ||--o{ TRANSACTION : tracks
    USER ||--o{ PERMISSION : has
    PERMISSION }|--|| MENU : allows
```

## Section 9: Page Navigation Map

```mermaid
flowchart LR
    A([Entry Page]) -->|Save Data| B[(Database)]
    B -->|Load Grid| C([View Page])
    C -->|Select Record| D([Edit Page])
    D -->|Update Data| B
    C -->|Generate| E([Report Viewer Page])
```

## Section 10: Crystal Reports Architecture

```mermaid
flowchart TD
    UI[Report Viewer UI .aspx] -->|QueryString / Form Params| Param(User Parameters)
    Param --> BLL[BLL Method]
    BLL --> DAL[DAL Method]
    DAL --> DB[(MSSQL Database)]
    DB -->|SQL Queries / SPs| DAL
    DAL -->|DataTable| BLL
    BLL -->|SetDataSource| CR[Crystal Report Document .rpt]
    CR --> Viewer[CrystalReportViewer Control]
```

## Section 11: Legacy Architecture Overview

```mermaid
flowchart TD
    UI[UI Layer - WebForms .aspx / .aspx.cs]
    BLL[Business Logic Layer - .cs]
    DAL[Data Access Layer - .cs]
    DB[(MSSQL Database - Stored Procedures)]

    UI -->|DTO / Entity Objects| BLL
    BLL -->|DTO / Entity Objects| DAL
    DAL -->|ADO.NET SqlClient| DB
    DB -->|SqlDataReader / SqlDataAdapter| DAL
    DAL -->|DataTables / Lists| BLL
    BLL -->|Data Binding| UI
```
