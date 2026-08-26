# Legacy System Technical Specification: Academic Module
## UI, Full-Stack Architecture Tracing & Data Migration Specification

**Prepared by**: Creatrix Soft Tech Ltd  
**Target System**: Academi School Management System (.NET 9 Clean Architecture + React 18 Paces Suite)  
**Source System**: Bornomala_School ASP.NET WebForms Legacy Codebase (`Solution.Web/Academic_UI`)  

---

## 1. Executive Technical Overview & Architecture Tracing Pattern

This document provides a granular, page-by-page specification of the legacy **Academic Module** ASP.NET WebForms application (`Solution.Web/Academic_UI`). 

### Full-Stack Layer Mapping Standard
For every page in the legacy system, input data and user operations travel through 5 discrete layers:
1. **Presentation Layer (`UI`)**: `.aspx` layout markup and `.aspx.cs` code-behind event handlers.
2. **Business Logic Layer (`BLL`)**: `Library.BLL.Academic_BLL` classes executing domain validation and business rules.
3. **Data Access Layer (`DAL`)**: `Library.DAL` classes constructing SQL queries/stored procedures via ADO.NET `SqlCommand` and `SqlDataReader`.
4. **Data Access Object / Entities (`DAO`)**: `Library.DAO.Academic_Entities` strongly-typed data transfer structs.
5. **Database (`MSSQL`)**: Microsoft SQL Server tables, columns, indexes, and primary/foreign key constraints.

---

## 2. Admission & Student Management Sub-Module

---

### 2.1 `Admission.aspx` & `Admission.aspx.cs` (New Student Admission)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtStudentCode` | TextBox | Student Code | Auto-generated unique student registration ID | Read-only / auto-filled on page load |
| `txtStudentName` | TextBox | Full Name | Captures student's full official name | Mandatory input, max 100 chars |
| `ddlSchoolClass` | DropDownList | Class | Selects class to enroll student into | Triggers `SelectedIndexChanged` to reload `ddlSection` and `ddlSession` |
| `ddlSection` | DropDownList | Section | Selects section (A, B, C) | Filtered dynamically by selected ClassID |
| `ddlSession` | DropDownList | Session | Selects academic year (e.g. 2025, 2026) | Binds active sessions |
| `ddlShift` | DropDownList | Shift | Morning / Day / Evening shift selection | Populates available school shifts |
| `ddlDepartment` | DropDownList | Group / Dept | Science / Business / Humanities / General | Required for Class 9 and 10 |
| `txtFatherName` | TextBox | Father's Name | Captures father's name | Text input, max 100 chars |
| `txtMotherName` | TextBox | Mother's Name | Captures mother's name | Text input, max 100 chars |
| `txtDOB` | TextBox | Date of Birth | Selects student date of birth | Calendar popup extender (`yyyy-MM-dd`) |
| `ddlGender` | DropDownList | Gender | Male / Female / Other | Dropdown selection |
| `txtMobile` | TextBox | Guardian Mobile | Contact phone number for SMS alerts | Regex numeric validation (11 digits) |
| `txtAddress` | TextBox | Present Address | Student residence address | Multi-line text input |
| `fileStudentImg` | FileUpload | Student Photo | Uploads passport size photograph | Saves image file to `/StuImage/` directory |
| `btnSave` | Button | Save Admission | Submits new student admission record | Triggers `btnSave_Click` postback |
| `btnClear` | Button | Clear Form | Resets all input fields | Resets form state |

#### 2. Page Functions & Code Logic
- **`Page_Load(object sender, EventArgs e)`**:
  - Checks user session authentication (`Session["UserName"]`).
  - If `!IsPostBack`, calls `GenerateStudentCode()`, `BindClassDropDown()`, `BindSessionDropDown()`, `BindShiftDropDown()`, `BindDepartmentDropDown()`.
- **`ddlSchoolClass_SelectedIndexChanged(object sender, EventArgs e)`**:
  - Fetches selected `ClassID`.
  - Invokes `SectionBLL.GetSectionByClassID(classID)` and rebinds `ddlSection`.
- **`btnSave_Click(object sender, EventArgs e)`**:
  - **Step 1**: Validates mandatory fields (`txtStudentName`, `ddlSchoolClass`, `ddlSession`, `txtMobile`).
  - **Step 2**: If file uploaded, validates file extension (`.jpg`, `.png`), generates filename `{StudentCode}.jpg`, and saves to `Server.MapPath("~/StuImage/")`.
  - **Step 3**: Instantiates `StudentInfo` DAO object and populates properties (`StudentCode`, `StudentName`, `ClassID`, `SectionID`, `SessionID`, `ShiftID`, `DepartmentID`, `FatherName`, `MotherName`, `DOB`, `Gender`, `MobileNo`, `Address`, `PhotoPath`).
  - **Step 4**: Calls `AdmissionBLL.InsertAdmissionInfo(studentDAO)`.
  - **Step 5**: Displays success alert script `ScriptManager.RegisterStartupScript(...)` and clears form.

#### 3. Full-Stack Data Flow Trace
```
Admission.aspx (.cs) ➔ AdmissionBLL.cs ➔ AdmissionDAL.cs ➔ AdmissionInfo.cs ➔ MSSQL: tbl_StudentInfo / tbl_Admission
```
- **UI Class**: `Solution.Web.Academic_UI.Admission`
- **BLL Class & Method**: `Library.BLL.Academic_BLL.AdmissionBLL.InsertAdmissionInfo(AdmissionInfo info)`
- **DAL Class & Method**: `Library.DAL.Academic_DAL.AdmissionDAL.InsertAdmissionInfo(AdmissionInfo info)`
- **DAO Entity**: `Library.DAO.Academic_Entities.AdmissionInfo`
  - Properties: `int StudentID`, `string StudentCode`, `string StudentName`, `int ClassID`, `int SectionID`, `int SessionID`, `int ShiftID`, `int DepartmentID`, `string FatherName`, `string MotherName`, `DateTime DOB`, `string Gender`, `string MobileNo`, `string Address`, `string ImagePath`.
- **MSSQL Database Tables & Columns**:
  - Primary Table: `tbl_StudentInfo` (`StudentID` INT PK IDENTITY, `StudentCode` VARCHAR(20) UNIQUE, `StudentName` NVARCHAR(100), `FatherName` NVARCHAR(100), `MotherName` NVARCHAR(100), `DOB` DATETIME, `Gender` VARCHAR(10), `MobileNo` VARCHAR(15), `Address` NVARCHAR(250), `ImagePath` VARCHAR(200), `IsActive` BIT, `CreateDate` DATETIME).
  - Enrollment Mapping: `tbl_StudentEnrollment` (`EnrollmentID` INT PK, `StudentID` INT FK, `ClassID` INT FK, `SectionID` INT FK, `SessionID` INT FK, `ShiftID` INT FK, `DepartmentID` INT FK, `RollNo` INT).

---

### 2.2 `FreeStudentShipEntry.aspx` & `FreeStudentShipEdit.aspx` (Tuition Waivers & Scholarships)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtStudentCode` | TextBox | Student Code | Captures student ID for scholarship waiver | Auto-loads student info |
| `ddlFeeHead` | DropDownList | Fee Head | Select tuition fee head for discount | Dropdown selection |
| `ddlWaiverType` | DropDownList | Waiver Type | Full Free (100%), Half Free (50%), Custom % | Selects discount category |
| `txtDiscountPercent` | TextBox | Discount (%) | Discount percentage value (e.g. 50%, 100%) | Numeric input (0 to 100) |
| `txtReason` | TextBox | Reason / Category | Orphan, Merit Scholarship, Financial Hardship | Multi-line text input |
| `btnSaveWaiver` | Button | Apply Scholarship | Saves student fee discount rule | Inserts waiver rule |

#### 2. Page Functions & Code Logic
- **`btnSaveWaiver_Click(object sender, EventArgs e)`**:
  - Validates student existence and discount percentage.
  - Instantiates `FreeStudentShip` DAO entity.
  - Calls `FreeStudentShipBLL.InsertFreeStudentShip(waiverDAO)`.
  - Executes SQL `INSERT INTO tbl_FreeStudentShip (StudentID, FeeHeadID, WaiverType, DiscountPercent, Reason) VALUES (...)`.

#### 3. Full-Stack Data Flow Trace
```
FreeStudentShipEntry.aspx (.cs) ➔ FreeStudentShipBLL.cs ➔ FreeStudentShipDAL.cs ➔ FreeStudentShip.cs ➔ MSSQL: tbl_FreeStudentShip
```
- **DAO Entity**: `FreeStudentShip` (`int WaiverID`, `int StudentID`, `int FeeHeadID`, `string WaiverType`, `decimal DiscountPercent`, `string Reason`).
- **MSSQL Table**: `tbl_FreeStudentShip` (`WaiverID` INT PK IDENTITY, `StudentID` INT FK, `FeeHeadID` INT FK, `WaiverType` VARCHAR(30), `DiscountPercent` DECIMAL(5,2), `Reason` NVARCHAR(200), `IsActive` BIT).

---

## 3. Exam & Curriculum Competency System Sub-Module

---

### 3.1 `BIEvaluationEntry.aspx` & `PIEvaluationEntry.aspx` (New Competency Assessment System)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlClass` | DropDownList | Class | Select class | Filter dropdown |
| `ddlSection` | DropDownList | Section | Select section | Filter dropdown |
| `ddlSubject` | DropDownList | Subject | Select subject | Filter dropdown |
| `ddlCompetency` | DropDownList | PI / BI Indicator | Select performance/behavior indicator | Populates 7-level scale |
| `gvEvaluations` | GridView | Student Competency Sheet | Grid of students with Square, Circle, Triangle indicator rating | Interactive 3-symbol rating selector |
| `btnSaveEvaluation` | Button | Save Assessment | Saves competency evaluation records | Inserts BI/PI records |

#### 2. Page Functions & Code Logic
- **`btnSaveEvaluation_Click(object sender, EventArgs e)`**:
  - Loops through `gvEvaluations` rows.
  - Reads selected indicator rating symbol:
    - **Square (⬛)**: High Competency (Level 3 / Outstanding).
    - **Circle (🔴)**: Medium Competency (Level 2 / Proficient).
    - **Triangle (🔺)**: Basic Competency (Level 1 / Developing).
  - Instantiates `BITebulation` / `PITebulation` DAO entities.
  - Calls `BITebulationBLL.InsertBIEvaluation(biDAO)` / `PITebulationBLL.InsertPIEvaluation(piDAO)`.

#### 3. Full-Stack Data Flow Trace
```
BIEvaluationEntry.aspx (.cs) ➔ BITebulationBLL.cs ➔ BITebulationDAL.cs ➔ BITebulation.cs ➔ MSSQL: tbl_BITebulation / tbl_PITebulation
```
- **DAO Entities**: `BITebulation`, `PITebulation`.
- **MSSQL Tables**:
  - `tbl_BITebulation` (`BIID` INT PK IDENTITY, `StudentID` INT FK, `ClassID` INT FK, `SectionID` INT FK, `SubjectID` INT FK, `IndicatorID` INT, `RatingSymbol` VARCHAR(10), `ScoreLevel` INT).
  - `tbl_PITebulation` (`PIID` INT PK IDENTITY, `StudentID` INT FK, `ClassID` INT FK, `SectionID` INT FK, `SubjectID` INT FK, `IndicatorID` INT, `RatingSymbol` VARCHAR(10), `ScoreLevel` INT).

---

### 3.2 `AdmitCard.aspx` & `AdmitCard.aspx.cs` (Exam Admit Card Generator)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlExamTerm` | DropDownList | Exam Term | Select exam term (Mid-Term, Final) | Select term |
| `ddlClass` | DropDownList | Class | Select class | Filter dropdown |
| `ddlSection` | DropDownList | Section | Select section | Filter dropdown |
| `btnPrintAdmitCards` | Button | Generate PDF Admit Cards | Generates bulk printable admit cards | Launches Crystal Report Viewer |

#### 2. Page Functions & Code Logic
- **`btnPrintAdmitCards_Click(object sender, EventArgs e)`**:
  - Fetches enrolled students in selected class/section via `AdmissionBLL.GetAdmitCardData(examID, classID, sectionID)`.
  - Verifies fee dues status: If student has unpaid exam fees and `BlockAdmitOnDue == true`, excludes student or prints warning watermark.
  - Launches Crystal Report viewer `Academic_RptView/AdmitCardReport.aspx`.

---

## 4. Fee Counter Control & Void Sub-Module

---

### 4.1 `FeeCollectionVoidLock.aspx` & `FeeCollectionVoidLock.aspx.cs` (Receipt Voiding & Authorization)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtReceiptNo` | TextBox | Receipt Voucher No | Enter receipt number to void (`MV-2026-XXXX`) | Fetches receipt details |
| `txtVoidReason` | TextBox | Void Reason | Mandatory justification for receipt cancellation | Text input |
| `txtAdminPassword` | TextBox | Admin Authorization | Master admin password for void override | Masked password input |
| `btnVoidReceipt` | Button | Void & Cancel Receipt | Voids receipt and reverses financial transaction | Triggers SQL transaction & audit log |

#### 2. Page Functions & Code Logic
- **`btnVoidReceipt_Click(object sender, EventArgs e)`**:
  - Validates Admin Password against `tbl_User`.
  - Begins SQL Transaction (`SqlTransaction`).
  - Updates `tbl_FeeCollection` setting `IsVoid = 1`, `VoidReason = txtVoidReason.Text`, `VoidedBy = Session["UserName"]`.
  - Reverses payment entries in `tbl_FeeCollectionHistory` and restores student fee dues.
  - Writes audit log to `tbl_CollectionVoidLock`.

#### 3. Full-Stack Data Flow Trace
```
FeeCollectionVoidLock.aspx (.cs) ➔ FeeCollectionBLL.cs ➔ FeeCollectionDAL.cs ➔ CollectionVoidLock.cs ➔ MSSQL: tbl_CollectionVoidLock
```
- **MSSQL Table**: `tbl_CollectionVoidLock` (`VoidLogID` INT PK IDENTITY, `ReceiptNo` VARCHAR(30), `StudentID` INT FK, `VoidAmount` DECIMAL(10,2), `VoidReason` NVARCHAR(250), `VoidedBy` VARCHAR(50), `VoidTimestamp` DATETIME).
