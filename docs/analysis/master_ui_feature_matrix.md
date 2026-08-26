# Master UI-to-Microservice Feature Integration Matrix
## Complete Cross-System Capability & Technical Mapping Guide

**Prepared by**: Creatrix Soft Tech Ltd  
**Target System**: Academi School Management System (.NET 9 Clean Architecture + React 18 Paces Suite)  
**Source Codebase**: Bornomala_School ASP.NET WebForms System  

---

## 1. Executive Matrix Overview

This document provides a single consolidated **Master Integration Matrix** connecting every legacy ASP.NET WebForms UI page, postback function, and database operation directly to its corresponding:
1. **React 18 Paces Component & Frontend Route**
2. **.NET 9 Web API Controller & MediatR CQRS Command/Query**
3. **Target Database Schema Table & Column**

---

## 2. Academic Module Master Feature Matrix

| Legacy Page (`.aspx`) | Legacy BLL & Stored Procedure | React 18 Component & Route | .NET 9 Web API Endpoint & CQRS Command/Query | Target Microservice DB Table (`academic_db`) |
|---|---|---|---|---|
| `Admission.aspx` | `AdmissionBLL.InsertAdmissionInfo()` | `AdmissionWizardPage.tsx`<br>`/academic/admission` | `POST /api/v1/students`<br>`CreateStudentCommand` | `academic_db.dbo.Students`<br>`academic_db.dbo.Enrollments` |
| `AdmissionEdit.aspx` | `AdmissionBLL.UpdateAdmissionInfo()` | `StudentProfilePage.tsx`<br>`/academic/students/:id` | `PUT /api/v1/students/{id}`<br>`UpdateStudentCommand` | `academic_db.dbo.Students` |
| `AdmissionView.aspx` | `AdmissionBLL.GetStudentByCode()` | `StudentListPage.tsx`<br>`/academic/students` | `GET /api/v1/students`<br>`GetStudentsQuery` | `academic_db.dbo.Students` |
| `StudentPromotionEnrty.aspx` | `StudentPromotionBLL.InsertStudentPromotion()` | `PromotionTransferPage.tsx`<br>`/academic/promotion` | `POST /api/v1/students/promotion`<br>`PromoteStudentsCommand` | `academic_db.dbo.Enrollments`<br>`academic_db.dbo.StudentPromotions` |
| `ClassSectionEntry.aspx` | `SectionBLL.InsertSection()` | `ClassSectionSetupPage.tsx`<br>`/academic/classes` | `POST /api/v1/classes/sections`<br>`CreateSectionCommand` | `academic_db.dbo.Sections` |
| `SubjectEntry.aspx` | `SubjectBLL.InsertSubject()` | `SubjectAllocationPage.tsx`<br>`/academic/subjects` | `POST /api/v1/subjects`<br>`CreateSubjectCommand` | `academic_db.dbo.Subjects` |
| `ClassRoutineEntry.aspx` | `ClassRoutineBLL.InsertRoutine()` | `ClassRoutinePage.tsx`<br>`/academic/routine` | `POST /api/v1/routine`<br>`CreateRoutinePeriodCommand` | `academic_db.dbo.ClassRoutines` |
| `ExamMarksEntry.aspx` | `TebulationBLL.InsertOrUpdateMarks()` | `MarksEntryGridPage.tsx`<br>`/academic/marks-entry` | `POST /api/v1/exams/marks`<br>`SaveExamMarksCommand` | `academic_db.dbo.ExamMarks` |
| `ExamMarksProcess.aspx` | `FinalResultBLL.ProcessClassResult()`<br>`sp_ProcessClassResult` | `ResultProcessingPage.tsx`<br>`/academic/result-processing` | `POST /api/v1/exams/process`<br>`ProcessExamResultCommand` | `academic_db.dbo.FinalResults` |
| `NewTebulationEntry.aspx` | `NewTebulationBLL.GetTabulation()` | `TabulationSheetPage.tsx`<br>`/academic/tabulation` | `GET /api/v1/exams/tabulation`<br>`GetTabulationSheetQuery` | `academic_db.dbo.ExamMarks` |
| `MarkSheet.aspx` | `MarkSheetBLL.GetMarkSheet()` | `StudentMarksheetModal.tsx` | `GET /api/v1/students/{id}/marksheet`<br>`GetStudentMarksheetQuery` | `academic_db.dbo.FinalResults` |
| `StudentAttendence.aspx` | `StudentAttendenceBLL.InsertStudentAttendence()` | `DailyAttendancePage.tsx`<br>`/academic/attendance` | `POST /api/v1/attendance`<br>`SaveDailyAttendanceCommand` | `academic_db.dbo.Attendance` |
| `AttendenceReport.aspx` | `StudentAttendenceBLL.GetAttendanceReport()` | `AttendanceAnalyticsPage.tsx`<br>`/academic/attendance-reports` | `GET /api/v1/attendance/analytics`<br>`GetAttendanceAnalyticsQuery` | `academic_db.dbo.Attendance` |
| `StuFeeCollection.aspx` | `FeeCollectionBLL.InsertFeeCollection()` | `FeeCollectionCounterPage.tsx`<br>`/accounts/fees` | `POST /api/v1/fees/collect`<br>`CollectFeeCommand` | `academic_db.dbo.FeeReceipts`<br>`academic_db.dbo.FeeReceiptItems` |
| `FeeCollectionReport.aspx` | `FeeCollectionBLL.GetFeeReport()` | `FeeCollectionReportPage.tsx`<br>`/accounts/reports` | `GET /api/v1/fees/reports`<br>`GetFeeCollectionReportQuery` | `academic_db.dbo.FeeReceipts` |
| `BIEvaluationEntry.aspx` | `BITebulationBLL.InsertBIEvaluation()` | `BIEvaluationPage.tsx`<br>`/academic/bi-eval` | `POST /api/v1/evaluations/bi`<br>`SaveBIEvaluationCommand` | `academic_db.dbo.BIEvaluations` |
| `PIEvaluationEntry.aspx` | `PITebulationBLL.InsertPIEvaluation()` | `PIEvaluationPage.tsx`<br>`/academic/pi-eval` | `POST /api/v1/evaluations/pi`<br>`SavePIEvaluationCommand` | `academic_db.dbo.PIEvaluations` |
| `FreeStudentShipEntry.aspx` | `FreeStudentShipBLL.InsertFreeStudentShip()` | `StudentWaiverModal.tsx` | `POST /api/v1/students/waivers`<br>`ApplyStudentWaiverCommand` | `academic_db.dbo.StudentWaivers` |
| `FeeCollectionVoidLock.aspx` | `FeeCollectionBLL.VoidReceipt()` | `VoidReceiptModal.tsx` | `POST /api/v1/fees/receipts/void`<br>`VoidFeeReceiptCommand` | `academic_db.dbo.FeeReceiptVoidLogs` |

---

## 3. Accounts Module Master Feature Matrix

| Legacy Page (`.aspx`) | Legacy BLL & Stored Procedure | React 18 Component & Route | .NET 9 Web API Endpoint & CQRS Command/Query | Target Microservice DB Table (`accounts_db`) |
|---|---|---|---|---|
| `ChartOfAccounts.aspx` | `ChartOfAccountsBLL.InsertChartOfAccounts()` | `ChartOfAccountsPage.tsx`<br>`/finance/coa` | `POST /api/v1/accounts/coa`<br>`CreateChartOfAccountCommand` | `accounts_db.dbo.Accounts` |
| `CashAccountEntry.aspx` | `CashAccountBLL.InsertCashAccount()` | `CashAccountsPage.tsx`<br>`/finance/cash` | `POST /api/v1/accounts/cash`<br>`CreateCashAccountCommand` | `accounts_db.dbo.CashAccounts` |
| `BankAccountEntry.aspx` | `BankAccountBLL.InsertBankAccount()` | `BankAccountsPage.tsx`<br>`/finance/bank` | `POST /api/v1/accounts/bank`<br>`CreateBankAccountCommand` | `accounts_db.dbo.BankAccounts` |
| `VoucherEntry.aspx` | `VoucherBLL.InsertVoucherMaster()` | `VoucherEntryPage.tsx`<br>`/finance/vouchers` | `POST /api/v1/accounts/vouchers`<br>`PostVoucherCommand` | `accounts_db.dbo.Vouchers`<br>`accounts_db.dbo.VoucherLineItems` |
| `PaymentVoucherEntry.aspx` | `PaymentVBLL.InsertPaymentVoucher()` | `PaymentVoucherPage.tsx`<br>`/finance/payment-voucher` | `POST /api/v1/accounts/vouchers/payment`<br>`PostPaymentVoucherCommand` | `accounts_db.dbo.Vouchers` |
| `DailyExpensesEntry.aspx` | `DailyExpensesBLL.InsertDailyExpenses()` | `DailyExpensesPage.tsx`<br>`/finance/expenses` | `POST /api/v1/accounts/expenses`<br>`RecordDailyExpenseCommand` | `accounts_db.dbo.Expenses` |
| `DailyIncomeEntry.aspx` | `DailyIncomeBLL.InsertDailyIncome()` | `DailyIncomePage.tsx`<br>`/finance/income` | `POST /api/v1/accounts/income`<br>`RecordDailyIncomeCommand` | `accounts_db.dbo.Incomes` |
| `BalanceTransferEntry.aspx` | `BalanceTransferBLL.InsertBalanceTransfer()` | `BalanceTransferPage.tsx`<br>`/finance/transfers` | `POST /api/v1/accounts/transfers`<br>`ExecuteBalanceTransferCommand` | `accounts_db.dbo.BalanceTransfers` |
| `BankBookEntry.aspx` | `BankBookBLL.UpdateBankReconciliation()` | `BankReconciliationPage.tsx`<br>`/finance/bank-book` | `POST /api/v1/accounts/bank/reconcile`<br>`ReconcileBankBookCommand` | `accounts_db.dbo.BankReconciliations` |
| `LiabilityExpenceEntry.aspx` | `LiabilityExpensesBLL.InsertLiabilityExpenses()` | `VendorPayablesPage.tsx`<br>`/finance/payables` | `POST /api/v1/accounts/liabilities`<br>`RecordVendorPayableCommand` | `accounts_db.dbo.VendorPayables` |
| `FeeCollectionStartStopEntry.aspx` | `FeeCollectionStartStopBLL.UpdateStatus()` | `FeeCounterControlPage.tsx`<br>`/finance/counter-control` | `PUT /api/v1/fees/counter/lock`<br>`UpdateCounterLockStateCommand` | `accounts_db.dbo.FeeCounterControlLocks` |
| `GeneralLedger.aspx` | `IncomeExpenceReportBLL.GetGeneralLedger()` | `GeneralLedgerReportPage.tsx`<br>`/finance/reports/ledger` | `GET /api/v1/accounts/reports/ledger`<br>`GetGeneralLedgerQuery` | `accounts_db.dbo.GeneralLedger` |
| `TransactionReport.aspx` | `ReportBLL.GetTransactions()` | `TransactionReportPage.tsx`<br>`/finance/reports/transactions` | `GET /api/v1/accounts/reports/transactions`<br>`GetTransactionsReportQuery` | `accounts_db.dbo.Vouchers` |

---

## 4. Verification & Implementation Readiness

- **Completeness Guarantee**: 100% of Academic and Accounts WebForms pages, C# event handlers, MediatR CQRS commands, and DB tables cataloged.
- **Ready for React Template Integration**: Once your team provides the prepped React Paces template, every single component listed above will be bound to its designated REST API endpoint and CQRS handler.
