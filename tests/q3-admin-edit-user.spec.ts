import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenu } from '../pages/SideMenu';
import { AdminPage } from '../pages/AdminPage';
import { credentials } from '../utils/credentials';

test('Q3 - edit a user role and verify it remains after refresh', async ({ page }) => {
  const login = new LoginPage(page);
  const menu = new SideMenu(page);
  const admin = new AdminPage(page);

  await login.open();
  await login.login(credentials.username, credentials.password);
  await login.expectDashboard();

  await menu.admin();
  await admin.search('Admin');
  await admin.expectUser('Admin');

  await admin.editUser('Admin');

  const originalRole = await admin.currentRole();
  const newRole = originalRole === 'Admin' ? 'ESS' : 'Admin';

  await admin.setRole(newRole);
  await admin.save();

  // Search again and confirm the value was saved.
  await admin.search('Admin');
  await admin.editUser('Admin');
  await expect.poll(() => admin.currentRole()).toBe(newRole);

  // Refresh the edit page and check persistence.
  await page.reload();
  await expect.poll(() => admin.currentRole()).toBe(newRole);

  // Leave the shared demo account as we found it.
  await admin.setRole(originalRole as 'Admin' | 'ESS');
  await admin.save();
});
