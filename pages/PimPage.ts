import { expect, Page } from '@playwright/test';

export class PimPage {
  constructor(private readonly page: Page) {}

  private group(label: string) {
    return this.page.locator('.oxd-input-group').filter({ hasText: label }).first();
  }

  async addEmployee(data: { firstName: string; lastName: string; employeeId: string }) {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(this.page).toHaveURL(/pim\/addEmployee/);

    await this.page.getByPlaceholder('First Name').fill(data.firstName);
    await this.page.getByPlaceholder('Last Name').fill(data.lastName);

    const idInput = this.group('Employee Id').locator('input');
    if (await idInput.count()) {
      await idInput.fill(data.employeeId);
    }

    await this.page.getByRole('button', { name: 'Save' }).click();

    await expect(
  this.page.getByRole('heading', { name: 'Personal Details', exact: true })
).toBeVisible();
  }

  async searchEmployee(firstName: string, lastName: string) {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);

    const nameInput = this.group('Employee Name').locator('input');
    await nameInput.fill(`${firstName} ${lastName}`);

    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async expectEmployee(firstName: string, lastName: string) {
    const row = this.page.locator('.oxd-table-row')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });

    await expect(row).toBeVisible();
  }
}
