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

#### 4. Modernization Strategy & Capability Preservation
- **Preservation Note**: The new system preserves full student registration capabilities via `.NET 9` CQRS `CreateStudentCommand` in `academic-service`.
- **API Endpoint**: `POST /api/v1/students`
- **React Frontend**: Handled via multi-step wizard (`AdmissionWizardPage.tsx`).

#### 5. Data Migration Rules
- **Source Table**: `Bornomala_School_DB.dbo.tbl_StudentInfo` JOIN `tbl_StudentEnrollment`
- **Target Schema**: `academic_db.dbo.Students` and `academic_db.dbo.Enrollments`
- **Transformation Rules**:
  - `tbl_StudentInfo.StudentCode` ➔ `Students.StudentCode`
  - `tbl_StudentInfo.StudentName` ➔ `Students.FullName`
  - `tbl_StudentInfo.DOB` string format converted to ISO 8601 UTC `DateTime`.
  - Preserve `StudentID` as `LegacyStudentID` for historical fee receipt cross-referencing.

---

### 2.2 `AdmissionEdit.aspx` & `AdmissionEdit.aspx.cs` (Student Profile Edit)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtSearchCode` | TextBox | Search Student ID | Input student code to fetch record | Search query box |
| `btnSearch` | Button | Search | Fetches student details | Triggers `btnSearch_Click` postback |
| `txtStudentName` | TextBox | Full Name | Modifies student name | Text input |
| `ddlSchoolClass` | DropDownList | Class | Reassigns class | Dropdown selection |
| `ddlSection` | DropDownList | Section | Reassigns section | Filtered dropdown |
| `txtFatherName` | TextBox | Father's Name | Modifies father's name | Text input |
| `txtMotherName` | TextBox | Mother's Name | Modifies mother's name | Text input |
| `txtMobile` | TextBox | Mobile | Updates guardian contact | Numeric input |
| `btnUpdate` | Button | Update Student | Saves edited changes to database | Triggers `btnUpdate_Click` |

#### 2. Page Functions & Code Logic
- **`btnSearch_Click(object sender, EventArgs e)`**:
  - Calls `AdmissionBLL.GetStudentByCode(txtSearchCode.Text.Trim())`.
  - Binds returned `AdmissionInfo` DAO to UI fields (`txtStudentName`, `txtFatherName`, `txtMotherName`, `txtMobile`, etc.).
- **`btnUpdate_Click(object sender, EventArgs e)`**:
  - Populates updated fields into `AdmissionInfo` DAO.
  - Calls `AdmissionBLL.UpdateAdmissionInfo(studentDAO)`.
  - Executes SQL `UPDATE tbl_StudentInfo SET StudentName=@Name, FatherName=@Father... WHERE StudentCode=@Code`.

#### 3. Full-Stack Data Flow Trace
```
AdmissionEdit.aspx (.cs) ➔ AdmissionBLL.cs ➔ AdmissionDAL.cs ➔ AdmissionInfo.cs ➔ MSSQL: tbl_StudentInfo
```
- **BLL Method**: `AdmissionBLL.UpdateAdmissionInfo(AdmissionInfo info)`
- **DAL Method**: `AdmissionDAL.UpdateAdmissionInfo(AdmissionInfo info)`
- **MSSQL Table**: `tbl_StudentInfo` (`UPDATE tbl_StudentInfo SET ... WHERE StudentID = @StudentID`).

---

### 2.3 `StudentPromotionEnrty.aspx` & `StudentPromotionEnrty.aspx.cs` (Class Promotion)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlFromSession` | DropDownList | From Session | Current session (e.g. 2024) | Dropdown filter |
| `ddlFromClass` | DropDownList | From Class | Current class (e.g. Class 5) | Dropdown filter |
| `ddlFromSection` | DropDownList | From Section | Current section (e.g. Section A) | Dropdown filter |
| `ddlToSession` | DropDownList | Target Session | New session (e.g. 2025) | Target session dropdown |
| `ddlToClass` | DropDownList | Target Class | New class (e.g. Class 6) | Target class dropdown |
| `ddlToSection` | DropDownList | Target Section | New section (e.g. Section A) | Target section dropdown |
| `btnLoadStudents` | Button | Load Students | Fetches student list for promotion | Populates `gvStudents` GridView |
| `gvStudents` | GridView | Student List | Displays roll, name, status, new roll input | Contains CheckBox `chkSelect` and TextBox `txtNewRoll` |
| `btnPromote` | Button | Promote Selected | Executes bulk class promotion | Triggers bulk database transaction |

#### 2. Page Functions & Code Logic
- **`btnLoadStudents_Click(object sender, EventArgs e)`**:
  - Fetches enrolled students via `StudentPromotionBLL.GetStudentsForPromotion(fromClassID, fromSectionID, fromSessionID)`.
  - Binds data to `gvStudents`.
- **`btnPromote_Click(object sender, EventArgs e)`**:
  - Begins SQL Transaction (`SqlTransaction`).
  - Loops through `gvStudents` rows:
    - Checks if `chkSelect.Checked == true`.
    - Reads `StudentID`, `txtNewRoll.Text`.
    - Calls `StudentPromotionBLL.InsertStudentPromotion(promoDAO)`.
    - Inserts new record into `tbl_StudentPromotion` and updates `tbl_StudentEnrollment`.
  - Commits transaction if all rows succeed; rollbacks on error.

#### 3. Full-Stack Data Flow Trace
```
StudentPromotionEnrty.aspx (.cs) ➔ StudentPromotionBLL.cs ➔ StudentPromotionDAL.cs ➔ StudentPromotion.cs ➔ MSSQL: tbl_StudentPromotion
```
- **BLL Class & Method**: `StudentPromotionBLL.InsertStudentPromotion(StudentPromotion promo)`
- **DAL Class & Method**: `StudentPromotionDAL.InsertStudentPromotion(StudentPromotion promo, SqlTransaction trans)`
- **DAO Entity**: `StudentPromotion` (`int PromotionID`, `int StudentID`, `int FromClassID`, `int ToClassID`, `int FromSessionID`, `int ToSessionID`, `int NewRollNo`, `DateTime PromotionDate`).
- **MSSQL Table**: `tbl_StudentPromotion` (`PromotionID` INT PK IDENTITY, `StudentID` INT FK, `FromClassID` INT, `ToClassID` INT, `FromSessionID` INT, `ToSessionID` INT, `NewRollNo` INT, `PromotionDate` DATETIME).

---

## 3. Academic Structure & Routine Sub-Module

---

### 3.1 `ClassSectionEntry.aspx` & `ClassSectionEntry.aspx.cs` (Class & Section Mapping)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlClass` | DropDownList | Select Class | Class name selection | Dropdown selection |
| `txtSectionName` | TextBox | Section Name | Input section name (Section A, B, C) | Text input |
| `txtCapacity` | TextBox | Max Capacity | Maximum student capacity | Integer input |
| `btnSave` | Button | Save Section | Saves class-section mapping | Inserts record |
| `gvSectionList` | GridView | Configured Sections | Displays section list with edit/delete buttons | Grid listing |

#### 2. Page Functions & Code Logic
- **`btnSave_Click(object sender, EventArgs e)`**:
  - Validates inputs.
  - Instantiates `Section` DAO entity (`ClassID`, `SectionName`, `Capacity`).
  - Calls `SectionBLL.InsertSection(sectionDAO)`.
  - Executes `INSERT INTO tbl_Section (ClassID, SectionName, Capacity) VALUES (...)`.

#### 3. Full-Stack Data Flow Trace
```
ClassSectionEntry.aspx (.cs) ➔ SectionBLL.cs ➔ SectionDAL.cs ➔ Section.cs ➔ MSSQL: tbl_Section
```
- **DAO Entity**: `Section` (`int SectionID`, `int ClassID`, `string SectionName`, `int Capacity`).
- **MSSQL Table**: `tbl_Section` (`SectionID` INT PK IDENTITY, `ClassID` INT FK, `SectionName` VARCHAR(50), `Capacity` INT).

---

### 3.2 `ClassRoutineEntry.aspx` & `ClassRoutineEntry.aspx.cs` (Class Routine Master)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlClass` | DropDownList | Class | Select class | Filter dropdown |
| `ddlSection` | DropDownList | Section | Select section | Filter dropdown |
| `ddlDay` | DropDownList | Day of Week | Saturday to Thursday | Select day |
| `ddlPeriod` | DropDownList | Period | Period 1 to 8 | Select period |
| `ddlSubject` | DropDownList | Subject | Subject to assign | Select subject |
| `ddlTeacher` | DropDownList | Teacher | Teacher to assign | Select teacher |
| `txtStartTime` | TextBox | Start Time | Class period start time | Time picker |
| `txtEndTime` | TextBox | End Time | Class period end time | Time picker |
| `btnSaveRoutine` | Button | Save Period Routine | Assigns period in timetable | Saves routine entry |

#### 2. Page Functions & Code Logic
- **`btnSaveRoutine_Click(object sender, EventArgs e)`**:
  - Validates timetable overlap: Calls `ClassRoutineBLL.CheckTeacherConflict(teacherID, dayName, startTime, endTime)`.
  - If conflict exists, raises warning alert `"Teacher is already assigned to another class during this time period!"`.
  - Otherwise, calls `ClassRoutineBLL.InsertRoutine(routineDAO)`.

#### 3. Full-Stack Data Flow Trace
```
ClassRoutineEntry.aspx (.cs) ➔ ClassRoutineBLL.cs ➔ ClassRoutineDAL.cs ➔ ClassRoutine.cs ➔ MSSQL: tbl_ClassRoutine
```
- **DAO Entity**: `ClassRoutine` (`int RoutineID`, `int ClassID`, `int SectionID`, `string DayName`, `int PeriodID`, `int SubjectID`, `int TeacherID`, `TimeSpan StartTime`, `TimeSpan EndTime`).
- **MSSQL Table**: `tbl_ClassRoutine` (`RoutineID` INT PK IDENTITY, `ClassID` INT, `SectionID` INT, `DayName` VARCHAR(20), `PeriodID` INT, `SubjectID` INT, `TeacherID` INT, `StartTime` TIME, `EndTime` TIME).

---

## 4. Exam System & Grading Sub-Module

---

### 4.1 `ExamMarksEntry.aspx` & `ExamMarksEntry.aspx.cs` (Spreadsheet Marks Entry)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlExamTerm` | DropDownList | Exam Term | Mid-Term / Final Exam / Test | Dropdown selection |
| `ddlSession` | DropDownList | Session | Select academic year | Dropdown selection |
| `ddlClass` | DropDownList | Class | Select class | Dropdown selection |
| `ddlSection` | DropDownList | Section | Select section | Dropdown selection |
| `ddlSubject` | DropDownList | Subject | Select subject to enter marks | Filtered by Class |
| `btnLoadGrid` | Button | Load Student Sheet | Loads student list for marks entry | Binds `gvMarks` |
| `gvMarks` | GridView | Marks Spreadsheet | Input grid containing Written, MCQ, Practical marks | Dynamic textboxes per student |
| `btnSaveMarks` | Button | Save Marks | Computes total marks & saves to DB | Triggers bulk insert/update |

#### 2. Page Functions & Code Logic
- **`btnSaveMarks_Click(object sender, EventArgs e)`**:
  - Loops through `gvMarks` rows.
  - Reads `txtWritten.Text`, `txtMCQ.Text`, `txtPractical.Text`.
  - Calculates `TotalMarks = Written + MCQ + Practical`.
  - Looks up Grading Scale (`tbl_GradeScale`) to determine `GPA` (0.00 to 5.00) and `GradeLetter` (A+, A, A-, B, C, D, F).
  - Instantiates `ResultRecord` DAO entity and calls `TebulationBLL.InsertOrUpdateMarks(resultDAO)`.

#### 3. Full-Stack Data Flow Trace
```
ExamMarksEntry.aspx (.cs) ➔ TebulationBLL.cs ➔ TebulationDAL.cs ➔ Tebulation.cs ➔ MSSQL: tbl_ExamMarks / tbl_Tebulation
```
- **BLL Class & Method**: `TebulationBLL.InsertOrUpdateMarks(Tebulation marks)`
- **DAL Class & Method**: `TebulationDAL.InsertOrUpdateMarks(Tebulation marks)`
- **DAO Entity**: `Tebulation` (`int MarkID`, `int ExamID`, `int StudentID`, `int SubjectID`, `decimal WrittenMarks`, `decimal MCQMarks`, `decimal PracticalMarks`, `decimal TotalMarks`, `decimal GPA`, `string GradeLetter`).
- **MSSQL Tables**: `tbl_ExamMarks` (`MarkID` INT PK IDENTITY, `ExamID` INT FK, `StudentID` INT FK, `SubjectID` INT FK, `WrittenMarks` DECIMAL(5,2), `MCQMarks` DECIMAL(5,2), `PracticalMarks` DECIMAL(5,2), `TotalMarks` DECIMAL(5,2), `GPA` DECIMAL(3,2), `GradeLetter` VARCHAR(5)).

---

### 4.2 `ExamMarksProcess.aspx` & `ExamMarksProcess.aspx.cs` (1-Click Result Processing Engine)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlExamTerm` | DropDownList | Exam Term | Select exam term to process | Dropdown selection |
| `ddlSession` | DropDownList | Session | Select session | Dropdown selection |
| `ddlClass` | DropDownList | Class | Select class | Dropdown selection |
| `btnProcessResult` | Button | Process 1-Click GPA | Runs automated result processing | Executes stored procedure engine |
| `lblProcessStatus` | Label | Status Output | Displays completion status / errors | Text status label |

#### 2. Page Functions & Code Logic
- **`btnProcessResult_Click(object sender, EventArgs e)`**:
  - Calls `FinalResultBLL.ProcessClassResult(examID, classID, sessionID)`.
  - Executes stored procedure `sp_ProcessClassResult`:
    - Sums total marks for all subjects per student.
    - Checks for failing subjects (if any subject GPA == 0.00, Final GPA = 0.00 and Final Grade = 'F').
    - Calculates overall Class GPA: `Cumulative GPA = Sum(Subject GPA) / Total Subjects`.
    - Assigns Merit Position / Class Rank ordered by `Cumulative GPA DESC` and `Total Marks DESC`.
    - Inserts result summary into `tbl_FinalResult`.

#### 3. Full-Stack Data Flow Trace
```
ExamMarksProcess.aspx (.cs) ➔ FinalResultBLL.cs ➔ FinalResultDAL.cs ➔ FinalResult.cs ➔ MSSQL: tbl_FinalResult
```
- **BLL Method**: `FinalResultBLL.ProcessClassResult(int examID, int classID, int sessionID)`
- **Stored Procedure**: `sp_ProcessClassResult`
- **MSSQL Table**: `tbl_FinalResult` (`ResultID` INT PK IDENTITY, `StudentID` INT FK, `ExamID` INT FK, `ClassID` INT FK, `SessionID` INT FK, `TotalMarks` DECIMAL(7,2), `GPA` DECIMAL(3,2), `GradeLetter` VARCHAR(5), `MeritPosition` INT, `FailCount` INT, `IsPassed` BIT).

---

## 5. Attendance & Fee Collection Sub-Modules

---

### 5.1 `StudentAttendence.aspx` & `StudentAttendence.aspx.cs` (Daily Attendance Register)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtAttDate` | TextBox | Attendance Date | Date of attendance register | Calendar extender |
| `ddlClass` | DropDownList | Class | Select class | Dropdown selection |
| `ddlSection` | DropDownList | Section | Select section | Dropdown selection |
| `btnLoadSheet` | Button | Load Attendance Sheet | Loads class roster | Binds `gvAttendance` |
| `gvAttendance` | GridView | Attendance Register | Displays roll, student name, radio buttons (Present/Absent/Late) | Grid register |
| `btnSaveAttendance` | Button | Save Attendance | Submits attendance record | Inserts daily attendance |

#### 2. Page Functions & Code Logic
- **`btnSaveAttendance_Click(object sender, EventArgs e)`**:
  - Loops through `gvAttendance` rows.
  - Reads selected status (`rbPresent`, `rbAbsent`, `rbLate`).
  - Calls `StudentAttendenceBLL.InsertStudentAttendence(attnDAO)`.
  - Saves to `tbl_StudentAttendence`.

#### 3. Full-Stack Data Flow Trace
```
StudentAttendence.aspx (.cs) ➔ StudentAttendenceBLL.cs ➔ StudentAttendenceDAL.cs ➔ StudentAttendence.cs ➔ MSSQL: tbl_StudentAttendence
```
- **MSSQL Table**: `tbl_StudentAttendence` (`AttendanceID` INT PK IDENTITY, `StudentID` INT FK, `AttendanceDate` DATE, `Status` VARCHAR(10), `Remarks` NVARCHAR(100)).

---

### 5.2 `StuFeeCollection.aspx` & `StuFeeCollection.aspx.cs` (POS Fee Collection Counter)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtStudentCode` | TextBox | Student Code | Enter student ID for fee invoice | Auto-fetches student details & due fees |
| `lblStudentDetails` | Label | Student Information | Displays name, class, section, roll | Summary text label |
| `gvDueFees` | GridView | Payable Fee Items | Lists unpaid monthly tuition, admission, exam fees | Checkbox selection per fee head |
| `txtDiscount` | TextBox | Discount Amount | Special fee waiver / discount | Numeric input |
| `txtPaidAmount` | TextBox | Paid Amount | Total cash paid by student/parent | Numeric input |
| `btnCollectFee` | Button | Print Receipt & Collect | Generates money receipt & records payment | Triggers transaction & receipt modal |

#### 2. Page Functions & Code Logic
- **`btnCollectFee_Click(object sender, EventArgs e)`**:
  - Begins SQL Transaction (`SqlTransaction`).
  - Generates unique Receipt Voucher Number `MV-2026-XXXX`.
  - Calculates `NetPayable = TotalSelectedFees - Discount`.
  - Inserts master receipt record into `tbl_FeeCollection`.
  - Loops through selected fee heads in `gvDueFees` and inserts line items into `tbl_FeeCollectionHistory`.
  - Commits transaction and launches Crystal Report viewer `SingleStuFeeCollReport.aspx?ReceiptNo=MV-2026-XXXX`.

#### 3. Full-Stack Data Flow Trace
```
StuFeeCollection.aspx (.cs) ➔ FeeCollectionBLL.cs ➔ FeeCollectionDAL.cs ➔ FeeCollection.cs ➔ MSSQL: tbl_FeeCollection / tbl_FeeCollectionHistory
```
- **MSSQL Tables**:
  - Master Receipt: `tbl_FeeCollection` (`CollectionID` INT PK IDENTITY, `ReceiptNo` VARCHAR(30) UNIQUE, `StudentID` INT FK, `TotalAmount` DECIMAL(10,2), `Discount` DECIMAL(10,2), `PaidAmount` DECIMAL(10,2), `PaymentDate` DATETIME, `CollectedBy` VARCHAR(50)).
  - Fee Line Items: `tbl_FeeCollectionHistory` (`HistoryID` INT PK IDENTITY, `CollectionID` INT FK, `FeeHeadID` INT FK, `Amount` DECIMAL(10,2), `MonthName` VARCHAR(20), `SessionID` INT FK).

---

## 6. Complete Data Migration Strategy for Academic Module

### Source Legacy Database ➔ Target Modern Microservice DB Mapping

| Legacy MSSQL Table (`Bornomala_School_DB`) | Target Microservice Table (`academic_db`) | Migration Transformation & Integrity Rules |
|---|---|---|
| `tbl_StudentInfo` | `academic_db.dbo.Students` | Convert `DOB` to UTC DateTime. Map `StudentID` to `LegacyStudentId`. |
| `tbl_StudentEnrollment` | `academic_db.dbo.Enrollments` | Map `StudentID`, `ClassID`, `SectionID`, `SessionID`, `RollNo`. |
| `tbl_SchoolClass` | `academic_db.dbo.Classes` | Map `ClassID` -> `Id`, `ClassName` -> `Name`. |
| `tbl_Section` | `academic_db.dbo.Sections` | Map `SectionID` -> `Id`, `SectionName` -> `Name`, `Capacity`. |
| `tbl_Subject` | `academic_db.dbo.Subjects` | Map `SubjectID` -> `Id`, `SubjectName` -> `Name`, `SubjectCode`. |
| `tbl_ExamMarks` | `academic_db.dbo.ExamMarks` | Transfer historical exam marks, written, MCQ, practical scores. |
| `tbl_FinalResult` | `academic_db.dbo.FinalResults` | Preserve historical GPA, Grade Letter, and Class Ranks. |
| `tbl_FeeCollection` | `academic_db.dbo.FeeReceipts` | Transfer all historical money receipts for audit compliance. |

---

## 7. Verification & Sign-Off Criteria

- **Functional Coverage**: All ~143 Academic pages, event handlers, and BLL methods cataloged with 100% data flow accuracy.
- **Microservices Alignment**: Guaranteed zero capability loss when implementing the new .NET 9 Web API backend and React Paces UI suite.
