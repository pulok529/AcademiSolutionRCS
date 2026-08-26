# Legacy System Technical Specification: Accounts Module
## UI, Full-Stack Architecture Tracing & Data Migration Specification

**Prepared by**: Creatrix Soft Tech Ltd  
**Target System**: Academi School Management System (.NET 9 Clean Architecture + React 18 Paces Suite)  
**Source System**: Bornomala_School ASP.NET WebForms Legacy Codebase (`Solution.Web/Accounts_UI`)  

---

## 1. Executive Technical Overview & Architecture Tracing Pattern

This document provides a granular, page-by-page technical specification of the legacy **Accounts Module** (`Solution.Web/Accounts_UI`).

### Full-Stack Layer Mapping Standard
For every page in the Accounts module, data travels through 5 discrete layers:
1. **Presentation Layer (`UI`)**: `.aspx` layout markup and `.aspx.cs` code-behind event handlers.
2. **Business Logic Layer (`BLL`)**: `Library.BLL.Accounts_BLL` classes executing financial validation, double-entry balance checks, and voucher accounting.
3. **Data Access Layer (`DAL`)**: `Library.DAL.Accounts_DAL` executing SQL queries and stored procedures via ADO.NET.
4. **Data Access Object / Entities (`DAO`)**: `Library.DAO.Accounts_Entities` strongly-typed data structures.
5. **Database (`MSSQL`)**: Microsoft SQL Server financial tables, chart of accounts, vouchers, and ledger history.

---

## 2. Chart of Accounts & Financial Setup Sub-Module

---

### 2.1 `ChartOfAccounts.aspx` & `ChartOfAccounts.aspx.cs` (Chart of Accounts Master)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlAccType` | DropDownList | Account Type | Assets / Liabilities / Income / Expenses | Selects primary account head category |
| `txtAccountCode` | TextBox | Account Code | Unique GL Account Code (e.g. `1001`, `2001`, `3001`, `4001`) | Input numeric code |
| `txtAccountHead` | TextBox | Account Head Title | Name of GL account (e.g. Cash in Hand, Bank Account, Tuition Income) | Text input |
| `ddlParentHead` | DropDownList | Parent Account | Hierarchical parent GL account for sub-ledgers | Dynamic tree dropdown |
| `chkIsActive` | CheckBox | Is Active | Enable / Disable GL account | Checkbox state |
| `btnSaveAcc` | Button | Save Account | Creates new Chart of Accounts entry | Inserts GL record |
| `tvAccounts` | TreeView / Grid | COA Hierarchy Tree | Visual tree view of entire school chart of accounts | Expandable tree control |

#### 2. Page Functions & Code Logic
- **`btnSaveAcc_Click(object sender, EventArgs e)`**:
  - Validates duplicate `AccountCode`.
  - Instantiates `ChartOfAccountsDAO` and populates `AccountCode`, `AccountHeadTitle`, `AccTypeID`, `ParentHeadID`, `IsActive`.
  - Calls `ChartOfAccountsBLL.InsertChartOfAccounts(coaDAO)`.

#### 3. Full-Stack Data Flow Trace
```
ChartOfAccounts.aspx (.cs) ➔ ChartOfAccountsBLL.cs ➔ ChartOfAccountsDAL.cs ➔ ChartOfAccounts.cs ➔ MSSQL: tbl_ChartOfAccounts
```
- **MSSQL Table**: `tbl_ChartOfAccounts` (`AccountID` INT PK IDENTITY, `AccountCode` VARCHAR(20) UNIQUE, `AccountHeadTitle` NVARCHAR(150), `AccTypeID` INT FK, `ParentHeadID` INT FK, `IsActive` BIT, `CreatedDate` DATETIME).

---

## 3. Financial Transactions & Vouchers Sub-Module

---

### 3.1 `VoucherEntry.aspx` & `PaymentVoucherEntry.aspx` (Journal, Debit & Credit Vouchers)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlVoucherType` | DropDownList | Voucher Type | Payment (Debit) / Receipt (Credit) / Journal / Contra | Dropdown selection |
| `txtVoucherDate` | TextBox | Voucher Date | Transaction date | Calendar extender |
| `txtVoucherNo` | TextBox | Voucher No | Auto-generated voucher number (e.g. `DV-2026-0001`) | Read-only |
| `ddlDebitAccount` | DropDownList | Debit Account Head | Select GL Account to Debit | Dropdown from COA |
| `ddlCreditAccount` | DropDownList | Credit Account Head | Select GL Account to Credit | Dropdown from COA |
| `txtAmount` | TextBox | Amount (৳) | Transaction amount | Numeric decimal input |
| `txtNarration` | TextBox | Particulars / Narration | Detailed transaction description | Multi-line text input |
| `btnSaveVoucher` | Button | Save & Post Voucher | Posts voucher to General Ledger | Triggers double-entry accounting transaction |

#### 2. Page Functions & Code Logic
- **`btnSaveVoucher_Click(object sender, EventArgs e)`**:
  - Validates Double-Entry Rule: `Total Debit Amount MUST Equal Total Credit Amount`.
  - Begins SQL Transaction (`SqlTransaction`).
  - Calls `VoucherBLL.InsertVoucherMaster(voucherMasterDAO)`.
  - Inserts master voucher record into `tbl_VoucherMaster`.
  - Loops through ledger line items and calls `VoucherBLL.InsertVoucherDetails(voucherDetailDAO)`.
  - Updates account balances in `tbl_ChartOfAccounts` and posts to `tbl_GeneralLedger`.

#### 3. Full-Stack Data Flow Trace
```
VoucherEntry.aspx (.cs) ➔ VoucherBLL.cs ➔ VoucherDAL.cs ➔ VoucherEntryBLL.cs ➔ MSSQL: tbl_VoucherMaster / tbl_VoucherDetails / tbl_GeneralLedger
```
- **MSSQL Database Tables**: `tbl_VoucherMaster`, `tbl_VoucherDetails`, `tbl_GeneralLedger`.

---

### 3.2 `BankBookEntry.aspx` & `BankBookEntry.aspx.cs` (Bank Reconciliation & Book Statement)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlBankAccount` | DropDownList | Bank Account | Select bank account | Filter dropdown |
| `txtChequeNo` | TextBox | Cheque Number | Check number for deposit / payment | Text input |
| `txtChequeDate` | TextBox | Cheque Date | Date on check | Calendar extender |
| `ddlStatus` | DropDownList | Clearing Status | Cleared / Uncleared / Bounced | Select status |
| `btnReconcile` | Button | Update Bank Book | Updates bank reconciliation status | Updates `tbl_BankBook` |

#### 2. Page Functions & Code Logic
- **`btnReconcile_Click(object sender, EventArgs e)`**:
  - Calls `BankBookBLL.UpdateBankReconciliation(bankBookDAO)`.
  - If status is set to `Cleared`, updates `tbl_BankAccount.CurrentBalance`.

---

### 3.3 `LiabilityExpenceEntry.aspx` & `LiabilityExpensesEdit.aspx` (Accrued Liabilities & Vendor Payables)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlVendor` | DropDownList | Vendor / Supplier | Select vendor for payable liability | Dropdown selection |
| `ddlLiabilityHead` | DropDownList | Liability Account | Accrued Rent, Audit Fees, Supplier Payable | Dropdown from COA |
| `txtAmount` | TextBox | Payable Amount | Accrued liability amount | Numeric input |
| `txtDueDate` | TextBox | Payment Due Date | Expected payment deadline | Calendar extender |
| `btnSaveLiability` | Button | Post Liability | Posts accrued liability voucher | Inserts liability record |

#### 2. Page Functions & Code Logic
- **`btnSaveLiability_Click(object sender, EventArgs e)`**:
  - Instantiates `LiabilityExpenses` DAO entity.
  - Calls `LiabilityExpensesBLL.InsertLiabilityExpenses(liabilityDAO)`.
  - Posts Journal Voucher (`JV-XXXX`) crediting `tbl_Liability` and debiting Expense Account.

---

### 3.4 `FeeCollectionStartStopEntry.aspx` (Counter Lock & Collection Control)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlSession` | DropDownList | Session | Academic year | Filter dropdown |
| `ddlMonth` | DropDownList | Fee Month | Select month to open/close fee collection | Select month |
| `rblStatus` | RadioButtonList | Collection Status | Open (Start) / Closed (Stop) | Radio selection |
| `btnSaveStatus` | Button | Update Control Lock | Enables/disables POS fee collection counter | Updates `tbl_FeeCollectionStartStop` |

#### 2. Page Functions & Code Logic
- **`btnSaveStatus_Click(object sender, EventArgs e)`**:
  - Updates `tbl_FeeCollectionStartStop` setting `IsCollectionOpen = (rblStatus.SelectedValue == "Open")`.
  - If `IsCollectionOpen == false`, `StuFeeCollection.aspx` blocks counter cashiers from accepting payments for that month.

---

## 4. Accounts Data Migration Strategy

| Legacy MSSQL Table | Target Microservice Table (`accounts_db`) | Migration Rules |
|---|---|---|
| `tbl_ChartOfAccounts` | `accounts_db.dbo.Accounts` | Preserve GL codes and parent-child hierarchy. |
| `tbl_VoucherMaster` | `accounts_db.dbo.Vouchers` | Transfer payment, receipt, and journal vouchers. |
| `tbl_VoucherDetails` | `accounts_db.dbo.VoucherLineItems` | Transfer line-item debit/credit transactions. |
| `tbl_BankAccount` | `accounts_db.dbo.BankAccounts` | Transfer bank balances and branch codes. |
| `tbl_BankBook` | `accounts_db.dbo.BankReconciliations` | Transfer check clearing history. |
| `tbl_LiabilityExpenses` | `accounts_db.dbo.VendorPayables` | Transfer accrued supplier liabilities. |
