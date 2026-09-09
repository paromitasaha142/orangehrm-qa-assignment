import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenu } from '../pages/SideMenu';
import { LeavePage } from '../pages/LeavePage';
import { credentials } from '../utils/credentials';
import { dateFromToday } from '../utils/dateUtils';

test(
  'Q4 - apply leave, verify pending approval, then cancel it',
  async ({ page }) => {

    const login = new LoginPage(page);
    const menu = new SideMenu(page);
    const leave = new LeavePage(page);

    const fromDate = dateFromToday(14);
    const toDate = dateFromToday(14);

    console.log(
      'TEST FROM DATE:',
      fromDate
    );

    console.log(
      'TEST TO DATE:',
      toDate
    );

    // Login
    await login.open();

    await login.login(
      credentials.username,
      credentials.password
    );

    await login.expectDashboard();

    // Leave
    await menu.leave();

    // Apply leave
    await leave.openApply();

    await leave.apply(
      fromDate,
      toDate
    );

    // My Leave
    await leave.openMyLeave();

    // Verify Pending Approval
    await leave.expectPendingApproval();

    // Cancel
    await leave.cancelPendingRequest();

    // Verify Cancelled
    await leave.expectCancelled();
  }
);