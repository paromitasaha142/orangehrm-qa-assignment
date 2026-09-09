# OrangeHRM QA Automation Assignment

Playwright + TypeScript automation project for the OrangeHRM QA assignment.

## Project Overview

This project contains:

- Part A — UI Automation
- Part B — Manual Testing
- Part D — API Automation
- Playwright HTML reporting
- Page Object Model (POM)
- Git-based version control

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Faker
- Playwright HTML Reporter
- Allure Playwright Reporter

## Project Structure

```text
orangehrm-qa-assignment/
├── pages/
│   ├── AdminPage.ts
│   ├── LeavePage.ts
│   ├── LoginPage.ts
│   ├── PimPage.ts
│   └── SideMenu.ts
├── tests/
│   ├── api/
│   │   └── users.spec.ts
│   ├── q1-invalid-login.spec.ts
│   ├── q2-pim-add-employee.spec.ts
│   ├── q3-admin-edit-user.spec.ts
│   └── q4-leave-apply-cancel.spec.ts
├── utils/
├── manual-testing/
│   └── OrangeHRM_Part_B_Manual_Test_Cases.xlsx
├── reports/
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md

## Test Execution

All UI and API automation tests have been executed successfully.

- Q1 — Passed
- Q2 — Passed
- Q3 — Passed
- Q4 — Passed
- Part D API — Passed

Full suite:

```bash
npx playwright test