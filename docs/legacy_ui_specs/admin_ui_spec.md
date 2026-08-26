# Legacy System Technical Specification: Infrastructure, Authentication & Permissions
## Technical Architecture, Session Management & Security Specification

**Prepared by**: Creatrix Soft Tech Ltd  
**Target System**: Academi School Management System (.NET 9 Clean Architecture + Keycloak Auth + React 18 Paces Suite)  
**Source System**: Bornomala_School ASP.NET WebForms Legacy Codebase (`Solution.Web/CommonUI`, `MasterPages`, `Login.aspx`)  

---

## 1. Authentication & Security Sub-Module

---

### 1.1 `Login.aspx` & `Login.aspx.cs` (Legacy Authentication System)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `txtUserName` | TextBox | User ID / Login Name | Captures system login ID | Required text input |
| `txtPassword` | TextBox | Password | Captures secret password | Masked input (`TextMode="Password"`) |
| `btnLogin` | Button | Sign In | Submits credentials for authentication | Triggers `btnLogin_Click` postback |
| `lblError` | Label | Error Message | Displays invalid login alerts | Red alert text label |

#### 2. Page Functions & Code Logic
- **`btnLogin_Click(object sender, EventArgs e)`**:
  - Validates `txtUserName` and `txtPassword`.
  - Calls `UserBLL.GetUserLogin(userName, password)`.
  - Executes SQL query `SELECT UserID, UserName, RoleID, SchoolID FROM tbl_User WHERE UserName=@User AND Password=@Pass AND IsActive=1`.
  - If valid user record returned:
    - Sets Session Variables: `Session["UserID"]`, `Session["UserName"]`, `Session["RoleID"]`, `Session["SchoolID"]`.
    - Redirects user to home page: `Response.Redirect("~/CommonUI/AdminMenuPanal.aspx")`.
  - If invalid, sets `lblError.Text = "Invalid Username or Password!"`.

#### 3. Full-Stack Data Flow Trace
```
Login.aspx (.cs) ➔ UserBLL.cs ➔ UserDAL.cs ➔ UserInformation.cs ➔ MSSQL: tbl_User / tbl_Role
```
- **BLL Class & Method**: `Library.BLL.Panal_BLL.UserBLL.GetUserLogin(string userName, string password)`
- **DAO Entity**: `Library.DAO.Panal_Entities.UserInformation` (`int UserID`, `string UserName`, `string Password`, `int RoleID`, `int SchoolID`, `bool IsActive`).
- **MSSQL Tables**:
  - `tbl_User` (`UserID` INT PK IDENTITY, `UserName` VARCHAR(50) UNIQUE, `Password` VARCHAR(100), `RoleID` INT FK, `SchoolID` INT FK, `IsActive` BIT).
  - `tbl_Role` (`RoleID` INT PK IDENTITY, `RoleName` VARCHAR(50)).

---

### 1.2 `UserPermission.aspx` & `UserPermission.aspx.cs` (Role-Based Access Control)

#### 1. UI Elements, Purpose & Effects
| Control ID | Type | Caption / Label | Purpose & User Operation | Client/Server Effect |
|---|---|---|---|---|
| `ddlRole` | DropDownList | Select User Role | Admin / Principal / Accountant / Teacher / Staff | Select role to configure |
| `gvMenuPermissions` | GridView | Menu & Page Access Matrix | Lists all modules, pages, and permission checkboxes (CanView, CanCreate, CanEdit, CanDelete) | Permission matrix grid |
| `btnSavePermissions` | Button | Save Access Control | Persists user role permissions | Updates permission tables |

#### 2. Page Functions & Code Logic
- **`btnSavePermissions_Click(object sender, EventArgs e)`**:
  - Loops through `gvMenuPermissions` rows.
  - Reads selected role ID and checked permissions.
  - Calls `UserBLL.SaveRolePermissions(roleID, menuPermissionsList)`.
  - Clears menu cache to enforce new permissions dynamically.

#### 3. Full-Stack Data Flow Trace
```
UserPermission.aspx (.cs) ➔ UserBLL.cs ➔ UserDAL.cs ➔ MSSQL: tbl_UserPermission / tbl_AdminMenu
```
- **MSSQL Tables**:
  - `tbl_AdminMenu` (`MenuID` INT PK IDENTITY, `MenuTitle` VARCHAR(100), `PageUrl` VARCHAR(200), `ParentMenuID` INT, `Module` VARCHAR(50)).
  - `tbl_UserPermission` (`PermissionID` INT PK IDENTITY, `RoleID` INT FK, `MenuID` INT FK, `CanView` BIT, `CanCreate` BIT, `CanEdit` BIT, `CanDelete` BIT).

---

## 2. Navigation & Layout Infrastructure

---

### 2.1 `MasterPage.master` (Legacy ASP.NET WebForms Master Page)

- **Header Region**: School Name logo, active academic session indicator, logged-in username display, Logout link button (`btnLogout_Click` clearing `Session.Abandon()`).
- **Left Navigation Accordion**: Dynamically renders sidebar menu items from `tbl_AdminMenu` filtered by `Session["RoleID"]`.
- **ContentBody Region**: `asp:ContentPlaceHolder ID="ContentPlaceHolder1"` wrapping module ASPX content pages.

---

## 3. Modern Security Architecture Mapping

### Keycloak SSO & Role Access Control Migration

| Legacy WebForms Security Component | Target Modern System Equivalent | Security & Governance Rules |
|---|---|---|
| ASP.NET In-Proc Session (`Session["UserID"]`) | Keycloak OAuth2 / OpenID Connect JWT Bearer Token | Stateless JWT authentication handled via YARP API Gateway. |
| Custom `tbl_User` Table | Keycloak User Directory & Realm Management | Single Sign-On across Academic and Accounts microservices. |
| Custom `tbl_UserPermission` Table | Keycloak Realm Roles (`admin`, `teacher`, `accountant`, `cashier`) | Microservice endpoints protected via `.NET 9` `[Authorize(Roles = "...")]`. |
