# Central Business Rules & Domain Formulas Registry
## Academi School Management System

**Prepared by**: Creatrix Soft Tech Ltd  
**Document Version**: v1.0.0  
**Status**: ✅ Mandatory Domain Enforcement Rules  
**Target System**: Academi School Management System (.NET 9 Clean Architecture + React 18 Paces Suite)  

---

## 1. Executive Rule Registry Purpose

This document serves as the **Single Source of Truth (SSOT)** for all business logic, grading algorithms, fee waiver rules, financial double-entry accounting constraints, and domain operational rules across the **Academic Module** and **Accounts Module**. 

All software developers, AI coding assistants, and microservice backend handlers must strictly enforce these rules without alteration.

---

## 2. Academic Module — Domain Rules & Formulas

### 2.1 Official National Exam Grading Scale
Every subject score (computed as $\text{Total} = \text{Written} + \text{MCQ} + \text{Practical}$) must be mapped to Grade Points (GP) and Letter Grades using the official scale:

| Score Range (%) | Grade Point (GP) | Letter Grade | Grade Evaluation |
|---|---|---|---|
| **80% - 100%** | `5.00` | `A+` | Outstanding |
| **70% - 79%** | `4.00` | `A` | Excellent |
| **60% - 69%** | `3.50` | `A-` | Very Good |
| **50% - 59%** | `3.00` | `B` | Good |
| **40% - 49%** | `2.00` | `C` | Satisfactory |
| **33% - 39%** | `1.00` | `D` | Pass |
| **0% - 32%** | `0.00` | `F` | Fail |

---

### 2.2 Compulsory Subject Fail Rule (Mandatory Rule)
- **Rule**: If a student receives a Grade Point of `0.00` (`F`) in **ANY** compulsory/main subject:
  - The student **FAILS THE ENTIRE EXAMINATION**.
  - Overall Cumulative GPA is set to `0.00`.
  - Overall Letter Grade is set to `'F'`.
  - Result Status is marked `IsPassed = false`.

---

### 2.3 Optional 4th Subject Bonus Calculation Formula
For Class 9 and 10 students with an optional 4th subject (`SubjectType == 'O'` e.g. Higher Math, Biology, Agriculture):
- **Bonus Grade Point Rule**: Only Grade Points above `2.00` contribute to Cumulative GPA:
  $$\text{Bonus GP} = \max(0.00, \text{GPoint} - 2.00)$$
- **Bonus Total Marks Rule**: Only Marks above `80` contribute to Total Marks:
  $$\text{Bonus Marks} = \max(0, \text{Total} - 80)$$

---

### 2.4 Cumulative GPA & Class Merit Rank Calculation

#### Cumulative GPA Formula:
$$\text{Final CGPA} = \min\left(5.00, \frac{\sum_{\text{Compulsory}} \text{GPoint} + \text{Bonus GP}}{\text{Count}(\text{Compulsory Subjects})}\right)$$

#### Class Merit Rank / Position Ordering Rule:
All passing students (`IsPassed = true`) within a class are ranked by:
1. `FinalCGPA DESC`
2. `GrandTotalMarks DESC`
3. `RollNo ASC` (tie-breaker)

---

### 2.5 Competency & Indicator Assessment Rules (BI & PI Indicators)
In the new competency-based curriculum, performance is evaluated using 3 indicator symbols:

| Indicator Symbol | Symbol Code | Score Level | Competency Level |
|---|---|---|---|
| **Square (⬛)** | `SQUARE` | Level 3 | High Competency / Outstanding |
| **Circle (🔴)** | `CIRCLE` | Level 2 | Medium Competency / Proficient |
| **Triangle (🔺)** | `TRIANGLE` | Level 1 | Basic Competency / Developing |

---

### 2.6 Student Fee Collection & Waiver Rules
- **Payable Dues Formula**:
  $$\text{Net Payable} = \text{Gross Fee Heads} - \text{Discounts/Waivers}$$
- **Waiver Categories**:
  - `Full Free (100%)`: 100% tuition discount for orphan/merit scholarship holders.
  - `Half Free (50%)`: 50% tuition discount for staff wards/hardship.
  - `Custom %`: Fixed percentage or amount waiver.
- **Receipt Void Authorization Rule**:
  - Money receipts (`MV-YYYY-XXXX`) can only be voided by a user with Admin credentials.
  - Receipt voiding reverses fee payment entries, restores student dues, and logs audit record in `tbl_CollectionVoidLock`.

---

## 3. Accounts Module — Domain Rules & Formulas

### 3.1 Double-Entry Accounting Enforcement Rule (Mandatory Rule)
- **Rule**: Every accounting voucher (Payment, Receipt, Journal, Contra) MUST satisfy the fundamental double-entry equation before posting:
  $$\sum \text{Debit Amount} = \sum \text{Credit Amount}$$

---

### 3.2 Voucher Types & Ledger Posting Rules

| Voucher Type | Code | Purpose | Debit Ledger | Credit Ledger |
|---|---|---|---|---|
| **Payment Voucher** | `DV` | Cash / Bank disbursements for expenses | Expense / Payable Account | Cash Counter / Bank Account |
| **Receipt Voucher** | `CV` | Cash / Bank receipts for tuition & income | Cash Counter / Bank Account | Revenue / Income Account |
| **Journal Voucher** | `JV` | Non-cash adjustments & accrued liabilities | Expense / Adjustment Account | Accrued Liability / Vendor Account |
| **Contra Voucher** | `CV` | Fund movement between Cash and Bank | Destination Account (Cash/Bank) | Source Account (Bank/Cash) |

---

### 3.3 Petty Cash Daily Expense Rules
- Daily operational petty cash expenses (Utilities, Supplies, Refreshments) post a Debit Payment Voucher (`DV`) deducting cash from `tbl_CashAccount` and debiting GL Expense Head.

---

### 3.4 POS Counter Control Lockout Rule
- When `FeeCollectionStartStop` is set to `Closed` for a specific session/month, the POS Cash Counter system MUST block cashiers from taking fee payments for that period.

---

## 4. System Governance & Compliance

- **Audit Logging**: All financial voucher postings, receipt voiding, and exam result processing runs log timestamp, user ID, and client IP address.
- **Microservices Enforcement**: Backend CQRS command validators (`FluentValidation`) must check these business rules before executing database transactions.
