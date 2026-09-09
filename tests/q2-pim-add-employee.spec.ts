import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenu } from '../pages/SideMenu';
import { PimPage } from '../pages/PimPage';
import { credentials } from '../utils/credentials';
import { newEmployee } from '../utils/employeeData';

test('Q2 - create and search a randomly generated employee', async ({ page }) => {
  const login = new LoginPage(page);
  const menu = new SideMenu(page);
  const pim = new PimPage(page);
  const employee = newEmployee();

  await login.open();
  await login.login(credentials.username, credentials.password);
  await login.expectDashboard();

  await menu.pim();
  await pim.addEmployee(employee);
  await pim.searchEmployee(employee.firstName, employee.lastName);
  await pim.expectEmployee(employee.firstName, employee.lastName);

  await menu.logout();
});
