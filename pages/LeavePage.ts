import { expect, Page } from '@playwright/test';

export class LeavePage {
  constructor(private readonly page: Page) {}

  private group(label: string) {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .first();
  }

  async openApply() {
    await this.page
      .getByRole('link', { name: 'Apply' })
      .click();

    await expect(this.page).toHaveURL(
      /leave\/applyLeave/
    );
  }

  async chooseLeaveType() {
    const select = this.group('Leave Type')
      .locator('.oxd-select-text');

    await expect(select).toBeVisible();

    await select.click();

    const options = this.page.locator(
      '.oxd-select-option'
    );

    await expect(options.first()).toBeVisible();

    const optionTexts = await options.allInnerTexts();

    console.log(
      'AVAILABLE LEAVE TYPES:',
      optionTexts
    );

    const personalLeave = options
      .filter({
        hasText: 'CAN - Personal',
      })
      .first();

    if (
      await personalLeave
        .isVisible()
        .catch(() => false)
    ) {
      await personalLeave.click();
    } else {
      await options.first().click();
    }
  }

  private async enterDate(
    input: ReturnType<Page['locator']>,
    date: string
  ) {
    await expect(input).toBeVisible();

    await input.click();

   
    await input.press('Control+A');
    await input.press('Backspace');

   
    await input.pressSequentially(date, {
      delay: 30,
    });

   
    await input.press('Tab');

    await this.page.waitForTimeout(300);

    console.log(
      'DATE INPUT VALUE:',
      await input.inputValue()
    );
  }

  async apply(
    fromDate: string,
    toDate: string
  ) {
    await this.chooseLeaveType();

    const fromInput = this.group('From Date')
      .locator('input');

    const toInput = this.group('To Date')
      .locator('input');

    console.log('FROM DATE:', fromDate);
    console.log('TO DATE:', toDate);

    await this.enterDate(
      fromInput,
      fromDate
    );

   
    await this.enterDate(
      toInput,
      toDate
    );

    console.log(
      'FINAL FROM:',
      await fromInput.inputValue()
    );

    console.log(
      'FINAL TO:',
      await toInput.inputValue()
    );

   
    const errors = this.page.locator(
      '.oxd-input-field-error-message'
    );

    if (await errors.count() > 0) {
      console.log(
        'DATE/FORM ERRORS:',
        await errors.allInnerTexts()
      );
    }

    await this.page
      .getByRole('button', {
        name: 'Apply',
      })
      .click();

    await this.page.waitForTimeout(2000);

   
    const toast = this.page.locator(
      '.oxd-toast'
    );

    if (await toast.isVisible().catch(() => false)) {
      console.log(
        'TOAST:',
        await toast.innerText()
      );
    }
  }

  async openMyLeave() {
    await this.page
      .getByRole('link', {
        name: 'My Leave',
      })
      .click();

    await expect(this.page).toHaveURL(
      /leave\/viewMyLeaveList/
    );

    await this.page.waitForTimeout(1500);
  }

  async expectPendingApproval() {
    const pageText = this.page.locator('body');

    await expect
      .poll(
        async () => {
          return await pageText.innerText();
        },
        {
          timeout: 10000,
          intervals: [500, 1000],
        }
      )
      .toContain('Pending Approval');
  }

  async cancelPendingRequest() {
    const row = this.page
      .locator('.oxd-table-row')
      .filter({
        hasText: 'Pending Approval',
      })
      .first();

    await expect(row).toBeVisible();

    const cancelButton = row.getByRole(
      'button',
      {
        name: /Cancel/i,
      }
    );

    await expect(cancelButton).toBeVisible();

    await cancelButton.click();

    const confirmButton =
      this.page.getByRole('button', {
        name: /Confirm/i,
      });

    if (
      await confirmButton
        .isVisible()
        .catch(() => false)
    ) {
      await confirmButton.click();
    }

    await this.page.waitForTimeout(1500);
  }

  async expectCancelled() {
    await expect
      .poll(
        async () => {
          return await this.page
            .locator('body')
            .innerText();
        },
        {
          timeout: 10000,
          intervals: [500, 1000],
        }
      )
      .toContain('Cancelled');
  }
}