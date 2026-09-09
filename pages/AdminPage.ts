import { expect, Page } from '@playwright/test';

export class AdminPage {
  constructor(private readonly page: Page) {}

  private group(label: string) {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .first();
  }

  private row(username: string) {
    return this.page
      .locator('.oxd-table-row')
      .filter({ hasText: username })
      .first();
  }

  async search(username: string) {
    await this.group('Username').locator('input').fill(username);
    await this.page.getByRole('button', { name: 'Search' }).click();

    await expect(this.page.locator('.oxd-table-body')).toBeVisible();
  }

  async expectUser(username: string) {
    await expect(this.row(username)).toBeVisible();
    await expect(this.row(username)).toContainText(username);
  }

  async editUser(username: string) {
    const row = this.row(username);

    await expect(row).toBeVisible();


    const editButton = row.locator(
      'button:has(i.bi-pencil-fill)'
    );

    await expect(editButton).toBeVisible();
    await editButton.click();

    await expect(this.page).toHaveURL(/admin\/saveSystemUser/);
  }

  async currentRole() {
    return (
      await this.group('User Role')
        .locator('.oxd-select-text')
        .innerText()
    ).trim();
  }

  async setRole(role: 'Admin' | 'ESS') {
    await this.group('User Role')
      .locator('.oxd-select-text')
      .click();

    await this.page
      .getByRole('option', { name: role, exact: true })
      .click();
  }

  async save() {
  await this.page
    .getByRole('button', { name: 'Save' })
    .click();


  await this.page.waitForTimeout(2000);


  await this.page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'
  );

  await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
}
}