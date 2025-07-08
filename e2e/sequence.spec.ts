import { test } from '@playwright/test';

test('sequence creation', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('domcontentloaded');
});
