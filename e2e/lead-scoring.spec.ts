import { test } from '@playwright/test';

test('lead scoring workflow', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('domcontentloaded');
});
