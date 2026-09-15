# 🏛️ Digital Subsidy & Grant Administration Platform

[![Java](https://img.shields.io/badge/Java-17%20%7C%2021%20%7C%2024-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring_Security-JWT_RBAC-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![Spring Data JPA](https://img.shields.io/badge/Hibernate-JPA_ORM-59666C?style=for-the-badge&logo=hibernate&logoColor=white)](https://hibernate.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Dialect-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Swagger OpenAPI](https://img.shields.io/badge/OpenAPI_3.0-Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Analytics-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Apache POI](https://img.shields.io/badge/Apache_POI-Excel_Export-D22128?style=for-the-badge&logo=apache&logoColor=white)](https://poi.apache.org/)
[![OpenPDF](https://img.shields.io/badge/OpenPDF-PDF_Reports-EC1C24?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://github.com/LibrePDF/OpenPDF)

A production-grade, enterprise e-Governance solution for administering central government subsidies, direct benefit transfers (DBT), automated eligibility scoring, and multi-stage workflow verification.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend Framework** | ![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.3.3-6DB33F?logo=springboot&logoColor=white) | REST API microservices architecture |
| **Language** | ![Java](https://img.shields.io/badge/Java_17+-ED8B00?logo=openjdk&logoColor=white) | Core enterprise business logic |
| **Security & Auth** | ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?logo=springsecurity&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white) | Stateless JWT authentication & Role-Based Access Control (RBAC) |
| **Persistence / ORM** | ![Hibernate](https://img.shields.io/badge/Hibernate_6-59666C?logo=hibernate&logoColor=white) ![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?logo=spring&logoColor=white) | Entity-relational mapping & repository layer |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL_Mode-4479A1?logo=mysql&logoColor=white) ![H2](https://img.shields.io/badge/H2_Database-003B57?logo=databricks&logoColor=white) | Embedded in-memory DB with pre-seeded demo data |
| **API Documentation** | ![Swagger](https://img.shields.io/badge/Swagger_OpenAPI_3.0-85EA2D?logo=swagger&logoColor=black) | Interactive REST endpoint playground |
| **Document Generation** | ![PDF](https://img.shields.io/badge/OpenPDF-EC1C24?logo=adobeacrobatreader&logoColor=white) ![Excel](https://img.shields.io/badge/Apache_POI-D22128?logo=apache&logoColor=white) | Dynamic generation of executive PDF and Excel (.xlsx) financial reports |
| **Frontend UI** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white) | Single-page interactive administration portal |

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Client Layer
        WebUI["Interactive Web Dashboard (Tailwind/Chart.js)"]
        Swagger["OpenAPI 3 / Swagger Explorer"]
    end

    subgraph Security Layer
        JWTFilter["JWT Authentication Filter"]
        RBAC["Role-Based Access Control (RBAC)"]
    end

    subgraph Core Business Modules
        M1["Module 1: Master Data Management<br/>(Schemes, Beneficiaries, Budgets)"]
        M2["Module 2: Eligibility Scoring & Workflow Engine<br/>(0-100 Score, 3-Stage Verification)"]
        M3["Module 3: Staged Disbursement & Milestones<br/>(Tranches, Proofs, DBT Payouts)"]
        M4["Module 4: Fund Utilization & Analytics<br/>(KPIs, OpenPDF & Excel POI Reports)"]
        M5["Module 5: Integrations & Audit Ledger<br/>(Treasury DBT, UIDAI KYC, Audit Logs)"]
    end

    subgraph Persistence Layer
        DB[("Relational Database (MySQL / H2 Mode)")]
    end

    WebUI --> JWTFilter
    Swagger --> JWTFilter
    JWTFilter --> RBAC
    RBAC --> M1 & M2 & M3 & M4 & M5
    M1 & M2 & M3 & M4 & M5 --> DB
```

---

## 📦 Module Breakdown

### 🔹 Module 1: Beneficiary & Scheme Master Data Management
* **Beneficiary Registry**: 12-digit Aadhaar regex validation, demographic records, bank account/IFSC details, and socio-economic category mapping (`SC`, `ST`, `OBC`, `GENERAL`, `MARGINAL_FARMER`, `WOMEN_HEADED`).
* **Scheme Catalog**: Multi-sectoral schemes (*PM Kisan*, *PM Awas*, *PM Surya Ghar*), category rules, age constraints, income ceilings, and grant amount slabs.
* **Regional Budget Allocation**: District and State-level quota caps and utilization tracking.

### 🔹 Module 2: Eligibility Scoring & 3-Level Verification Workflow Engine
* **Automated Scoring Algorithm**: Evaluates applicants from **0 to 100** based on Age (20 pts), Income ratio (25 pts), Social category (25 pts), Landholding compliance (20 pts), and KYC documentation (10 pts).
* **Decision Rules**: >= 70 -> `ELIGIBLE`, 50-69 -> `BORDERLINE_REVIEW`, < 50 -> `INELIGIBLE`.
* **Sequential 3-Stage Pipeline**:
  1. **Field Officer**: Ground inspection & asset verification notes.
  2. **District Collector**: District quota check and policy compliance review.
  3. **Finance Approver**: Grant sanction & automated trigger for tranche schedule generation.

### 🔹 Module 3: Staged Disbursement & Milestone Compliance Tracking
* **Milestone Tranche Model**: Splits grants into progressive releases (e.g., *Tranche 1: 30% Advance*, *Tranche 2: 40% Mid-Stage*, *Tranche 3: 30% Final Utilization*).
* **Direct Benefit Transfer (DBT)**: Real-time Treasury transfer simulation with unique UTR number generation.
* **Non-Compliance Alerts**: Automated audit sweeps detecting overdue milestones and issuing reminder alerts.

### 🔹 Module 4: Fund Utilization & Regional Analytics
* **Interactive Dashboards**: High-level KPIs, scheme budget bar charts, and demographic pie charts.
* **Regional Utilization Ledger**: District-wise budget allocation vs. expenditure.
* **One-Click Document Export**:
  * **Executive PDF Report**: Built on-the-fly using **OpenPDF**.
  * **Multi-Sheet Financial Ledger**: Built with **Apache POI (.xlsx)**.

### 🔹 Module 5: Security, Integrations & Immutable Audit Logging
* **Enterprise Security**: Stateless JWT authentication with `@PreAuthorize` method protection.
* **External Mock Gateways**:
  * **Treasury DBT Gateway**: PFMS bank payout simulator.
  * **UIDAI & Bank KYC**: Instant Aadhaar validation and account seeding check.
* **Compliance Audit Trail**: Immutable AOP ledger capturing timestamp, actor, role, entity, state transitions, and remarks for CAG audits.

---

## 👥 Seed Test Users & Personas

All accounts use the default password: **`password123`**

| Username | Role | Full Name & Title | Assigned Region |
| :--- | :--- | :--- | :--- |
| `admin` | `ROLE_ADMIN` | Platform Administrator | NATIONAL |
| `field_officer` | `ROLE_FIELD_OFFICER` | Rajesh Verma (Field Officer) | Pune District |
| `district_officer` | `ROLE_DISTRICT_OFFICER` | Dr. Sunita Sharma (District Collector) | Pune District |
| `finance_officer` | `ROLE_FINANCE_OFFICER` | Amitabh Sen (Finance Director) | Central Treasury |
| `auditor` | `ROLE_AUDITOR` | Pooja Hegde (CAG Auditor) | NATIONAL |
| `ramesh_kumar` | `ROLE_BENEFICIARY` | Ramesh Kumar (Citizen) | Pune District |

> 💡 **Tip**: Use the **1-Click Persona Switcher** at the top-right of the dashboard to instantly change roles without manual login!

---

## 🚀 Quick Start & Installation

### Prerequisites
* **Java JDK 17, 21, or 24** installed (`java -version`)
* **Maven** (optional, wrapper/executable JAR included)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Run the Application

#### Option A: Run Pre-Built Executable JAR (Fastest)
```powershell
java -jar target/digital-subsidy-platform-1.0.0.jar
```

#### Option B: Run via Maven
```powershell
mvn spring-boot:run
```

### 3. Open in Browser
* **Interactive Web Dashboard**: http://localhost:8080

---

## 🧪 Running Automated Tests

Run the full test suite verifying scoring algorithms, workflow state machines, and disbursement logic:
```bash
mvn test
```

---

## 📄 License
This project is licensed under the MIT License.
