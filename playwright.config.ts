import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  workers: 1,

  timeout: 60000,

  expect: {
    timeout: 15000,
  },

  use: {
    baseURL:
      'https://opensource-demo.orangehrmlive.com',

    navigationTimeout: 60000,

    actionTimeout: 30000,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    reporter: [
      ['html', { open: 'never' }],
    ],
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});