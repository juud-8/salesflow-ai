import { test } from '@playwright/test';

test('billing upgrade flow', async ({ page }) => {
  await page.goto('/pricing');
  await page.waitForLoadState('domcontentloaded');
});
