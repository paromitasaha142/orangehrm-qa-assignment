# OrangeHRM UI Automation - Part A

Playwright + TypeScript + Page Object Model implementation for the four UI automation scenarios in the assignment.

## What is covered

- **Q1:** Invalid login and error-message validation.
- **Q2:** Login, PIM, randomly generated employee, search verification, logout.
- **Q3:** Admin user search, role change, save, refresh/persistence check, and restoration of the original role.
- **Q4:** Leave application with future dates, My Leave verification, cancellation, and Cancelled status verification.

## Tools

- Playwright
- TypeScript
- Faker
- Allure Playwright reporter
- Playwright HTML reporter

## Setup

Install Node.js LTS first.

Then:

```bash
npm install
npx playwright install chromium
```

If you want the Allure CLI:

```bash
npm install -g allure-commandline
```

The Allure CLI requires Java.

## Run tests separately

```bash
npm run q1
npm run q2
npm run q3
npm run q4
```

## Run all four sequentially

```bash
npm test
```

The Playwright configuration uses one worker and disables parallel execution.

## Reports

Every Playwright run creates the HTML report in:

```text
playwright-report/
```

It also writes Allure result files to:

```text
allure-results/
```

Open the Playwright report:

```bash
npm run report
```

Generate the Allure HTML report:

```bash
npm run allure:generate
```

Open the Allure report:

```bash
npm run allure:open
```

## Credentials

The public OrangeHRM demo currently uses the standard demo credentials in this assignment:

```text
Username: Admin
Password: admin123
```

The code also supports environment variables:

```text
ORANGEHRM_USERNAME
ORANGEHRM_PASSWORD
```

## Important note

OrangeHRM is a shared public demo site. Test data can change and the Leave scenario depends on the current demo user's leave configuration. Q3 restores the original Admin role after checking persistence so repeated runs do not intentionally leave the shared account modified.

## Submission

Push the source code, package files, README, manual-testing artifacts from Part B, and the requested test reports to the public GitHub repository.

Do not commit `node_modules/`.

