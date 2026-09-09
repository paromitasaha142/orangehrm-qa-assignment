import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Q1 - invalid login shows the correct error', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login('wrong_user_123', 'wrong_password_123');
  await login.expectInvalidCredentials();
});
