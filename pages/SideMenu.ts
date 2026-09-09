import { expect, Page } from '@playwright/test';

export class SideMenu {
  constructor(private readonly page: Page) {}

  async pim() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
  }

  async admin() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
  }

  async leave() {
    await this.page.getByRole('link', { name: 'Leave' }).click();
    await expect(this.page).toHaveURL(/leave\/viewLeaveList/);
  }

  async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL(/auth\/login/);
  }
}
