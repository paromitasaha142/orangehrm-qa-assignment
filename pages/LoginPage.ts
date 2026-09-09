import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(
      '/web/index.php/auth/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );

    await expect(
      this.page.locator('input[name="username"]')
    ).toBeVisible({
      timeout: 30000,
    });
  }

  async login(
    username: string,
    password: string
  ) {
    await this.page
      .locator('input[name="username"]')
      .fill(username);

    await this.page
      .locator('input[name="password"]')
      .fill(password);

    await this.page
      .getByRole('button', {
        name: 'Login',
      })
      .click();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(
      /dashboard/,
      {
        timeout: 30000,
      }
    );
  }

  async expectInvalidCredentials() {
    await expect(
      this.page.getByText(
        'Invalid credentials',
        {
          exact: true,
        }
      )
    ).toBeVisible({
      timeout: 10000,
    });
  }
}