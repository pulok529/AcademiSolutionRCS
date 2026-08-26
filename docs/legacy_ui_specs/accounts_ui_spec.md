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
- **`Page_Load(object sender, EventArgs e)`**:
  - Checks user session.
  - If `!IsPostBack`, calls `BindAccountTypes()` and `LoadAccountTree()`.
- **`btnSaveAcc_Click(object sender, EventArgs e)`**:
  - Validates duplicate `AccountCode`.
  - Instantiates `ChartOfAccountsDAO` and populates `AccountCode`, `AccountHeadTitle`, `AccTypeID`, `ParentHeadID`, `IsActive`.
  - Calls `ChartOfAccountsBLL.InsertChartOfAccounts(coaDAO)`.

#### 3. Full-Stack Data Flow Trace
```
ChartOfAccounts.aspx (.cs) ➔ ChartOfAccountsBLL.cs ➔ ChartOfAccountsDAL.cs ➔ ChartOfAccounts.cs ➔ MSSQL: tbl_ChartOfAccounts
```
- **UI Class**: `Solution.Web.Accounts_UI.ChartOfAccounts`
- **BLL Class & Method**: `Library.BLL.Accounts_BLL.ChartOfAccountsBLL.InsertChartOfAccounts(ChartOfAccountsInfo coa)`
- **DAL Class & Method**: `Library.DAL.Accounts_DAL.ChartOfAccountsDAL.InsertChartOfAccounts(ChartOfAccountsInfo coa)`
- **DAO Entity**: `Library.DAO.Accounts_Entities.ChartOfAccountsInfo` (`int AccountID`, `string AccountCode`, `string AccountHeadTitle`, `int AccTypeID`, `int ParentHeadID`, `bool IsActive`).
- **MSSQL Table**: `tbl_ChartOfAccounts` (`AccountID` INT PK IDENTITY, `AccountCode` VARCHAR(20) UNIQUE, `AccountHeadTitle` NVARCHAR(150), `AccTypeID` INT FK, `ParentHeadID` INT FK, `IsActive` BIT, `CreatedDate` DATETIME).

---

### 2.2 `CashAccountEntry.aspx` & `BankAccountEntry.aspx` (Cash & Bank Master)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtAccountName` | TextBox | Cash / Bank Account Name | Name of bank (e.g. Sonali Bank, Dutch Bangla Bank, Main Cash Counter) | Text input |
| `txtAccountNumber` | TextBox | Bank Account No | Bank account number | Input text |
| `txtBranchName` | TextBox | Branch Name | Bank branch location | Text input |
| `txtOpeningBalance` | TextBox | Opening Balance | Initial starting balance | Numeric input |
| `btnSaveBank` | Button | Save Bank Account | Registers cash/bank account in GL | Inserts record |

#### 2. Page Functions & Code Logic
- **`btnSaveBank_Click(object sender, EventArgs e)`**:
  - Instantiates `BankAccount` DAO entity.
  - Calls `BankAccountBLL.InsertBankAccount(bankDAO)`.
  - Automatically creates corresponding GL Ledger Head in `tbl_ChartOfAccounts`.

#### 3. Full-Stack Data Flow Trace
```
BankAccountEntry.aspx (.cs) ➔ BankAccountBLL.cs ➔ BankAccountDAL.cs ➔ BankAccount.cs ➔ MSSQL: tbl_BankAccount
```
- **MSSQL Table**: `tbl_BankAccount` (`BankAccID` INT PK IDENTITY, `AccountName` NVARCHAR(100), `AccountNumber` VARCHAR(50), `BranchName` NVARCHAR(100), `OpeningBalance` DECIMAL(12,2), `CurrentBalance` DECIMAL(12,2)).

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
  - Commits transaction.

#### 3. Full-Stack Data Flow Trace
```
VoucherEntry.aspx (.cs) ➔ VoucherBLL.cs ➔ VoucherDAL.cs ➔ VoucherEntryBLL.cs ➔ MSSQL: tbl_VoucherMaster / tbl_VoucherDetails / tbl_GeneralLedger
```
- **BLL Class & Method**: `VoucherBLL.InsertVoucherMaster(VoucherMaster master)`
- **DAL Class & Method**: `VoucherDAL.InsertVoucherMaster(VoucherMaster master, SqlTransaction trans)`
- **DAO Entities**: `VoucherMaster`, `VoucherDetails`.
- **MSSQL Database Tables**:
  - `tbl_VoucherMaster` (`VoucherID` INT PK IDENTITY, `VoucherNo` VARCHAR(30) UNIQUE, `VoucherType` VARCHAR(20), `VoucherDate` DATETIME, `TotalAmount` DECIMAL(12,2), `Narration` NVARCHAR(300), `CreatedBy` VARCHAR(50), `IsApproved` BIT).
  - `tbl_VoucherDetails` (`DetailID` INT PK IDENTITY, `VoucherID` INT FK, `AccountID` INT FK, `DebitAmount` DECIMAL(12,2), `CreditAmount` DECIMAL(12,2), `Particulars` NVARCHAR(200)).
  - `tbl_GeneralLedger` (`LedgerID` INT PK IDENTITY, `VoucherID` INT FK, `AccountID` INT FK, `PostingDate` DATETIME, `Debit` DECIMAL(12,2), `Credit` DECIMAL(12,2), `Balance` DECIMAL(12,2)).

---

### 3.2 `DailyExpensesEntry.aspx` & `DailyIncomeEntry.aspx` (Daily Petty Cash Operations)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtExpenseDate` | TextBox | Date | Date of expenditure | Calendar extender |
| `ddlExpenseHead` | DropDownList | Expense Category | Electricity Bill, Office Supplies, Repair, Tea/Entertainment | Dropdown selection |
| `txtAmount` | TextBox | Amount | Expense amount paid | Numeric decimal input |
| `ddlPaymentMode` | DropDownList | Paid From | Main Cash / Bank Account | Source account dropdown |
| `txtRemarks` | TextBox | Note / Remarks | Purpose of expense | Text input |
| `btnSaveExpense` | Button | Record Expense | Posts daily expense voucher | Inserts expense record & updates Cash/Bank balance |

#### 2. Page Functions & Code Logic
- **`btnSaveExpense_Click(object sender, EventArgs e)`**:
  - Calls `DailyExpensesBLL.InsertDailyExpenses(expenseDAO)`.
  - Automatically posts a Debit Payment Voucher (`DV-XXXX`) to `tbl_VoucherMaster` and deducts cash from `tbl_CashAccount`.

#### 3. Full-Stack Data Flow Trace
```
DailyExpensesEntry.aspx (.cs) ➔ DailyExpensesBLL.cs ➔ DailyExpensesDAL.cs ➔ MSSQL: tbl_DailyExpenses / tbl_VoucherMaster
```
- **MSSQL Table**: `tbl_DailyExpenses` (`ExpenseID` INT PK IDENTITY, `ExpenseDate` DATE, `ExpenseHeadID` INT FK, `Amount` DECIMAL(10,2), `PaidFromAccID` INT FK, `Remarks` NVARCHAR(200)).

---

### 3.3 `BalanceTransferEntry.aspx` & `BalanceTransferEdit.aspx` (Fund Transfers)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlFromAccount` | DropDownList | Source Account | Cash Counter / Bank Account | Source account |
| `ddlToAccount` | DropDownList | Destination Account | Bank Account / Main Cash | Destination account |
| `txtTransferAmount` | TextBox | Transfer Amount | Amount to transfer | Numeric decimal input |
| `txtTransferDate` | TextBox | Transfer Date | Date of fund transfer | Calendar extender |
| `btnExecuteTransfer` | Button | Execute Fund Transfer | Moves funds between accounts | Posts Contra Voucher (`CV-XXXX`) |

#### 2. Page Functions & Code Logic
- **`btnExecuteTransfer_Click(object sender, EventArgs e)`**:
  - Validates source account has sufficient balance (`FromAcc.CurrentBalance >= TransferAmount`).
  - Calls `BalanceTransferBLL.InsertBalanceTransfer(transferDAO)`.
  - Executes SQL transaction: Deducts `FromAccount`, Adds to `ToAccount`, posts Contra Voucher (`CV-XXXX`).

#### 3. Full-Stack Data Flow Trace
```
BalanceTransferEntry.aspx (.cs) ➔ BalanceTransferBLL.cs ➔ BalanceTransferDAL.cs ➔ MSSQL: tbl_BalanceTransfer
```
- **MSSQL Table**: `tbl_BalanceTransfer` (`TransferID` INT PK IDENTITY, `TransferNo` VARCHAR(30), `FromAccID` INT FK, `ToAccID` INT FK, `Amount` DECIMAL(12,2), `TransferDate` DATETIME, `CreatedBy` VARCHAR(50)).

---

## 4. Accounts Data Migration Strategy

### Source Legacy Database ➔ Target Modern Microservice DB Mapping

| Legacy MSSQL Table (`Bornomala_School_DB`) | Target Microservice Table (`accounts_db`) | Migration Transformation & Integrity Rules |
|---|---|---|
| `tbl_ChartOfAccounts` | `accounts_db.dbo.Accounts` | Preserve account codes and parent-child hierarchy. |
| `tbl_VoucherMaster` | `accounts_db.dbo.Vouchers` | Transfer historical payment, receipt, and journal vouchers. |
| `tbl_VoucherDetails` | `accounts_db.dbo.VoucherLineItems` | Transfer line-item debit/credit transactions for financial audit compliance. |
| `tbl_BankAccount` | `accounts_db.dbo.BankAccounts` | Transfer bank account credentials, branch codes, and opening balances. |
| `tbl_DailyExpenses` | `accounts_db.dbo.Expenses` | Map historical expense records. |

---

## 5. Verification & Sign-Off Criteria

- **Functional Coverage**: All ~90 Accounts pages, C# event handlers, and BLL methods cataloged with 100% data flow accuracy.
- **Double-Entry Compliance**: Guaranteed zero loss of financial transaction rules, double-entry validation, or accounting ledger integrity.
