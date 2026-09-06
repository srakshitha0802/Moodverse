import { test, expect } from '@playwright/test';

test('Home and Yoga and Music smoke tests', async ({ page }) => {
  // Home
  await page.goto('/');
  await expect(page.getByText('Evening Yoga')).toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/home.png', fullPage: true });

  // Yoga
  await page.goto('/yoga');
  await expect(page.getByText('Step-by-step Yoga Sequence')).toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/yoga.png', fullPage: true });

  // Music
  await page.goto('/music');
  await expect(page.locator('iframe[src*="youtube.com/embed"]').first()).toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/music.png', fullPage: true });

  // Sample VR scene
  await page.goto('/vr?scene=' + encodeURIComponent('https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg'));
  // Wait a short while for A-Frame to initialize
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'e2e/screenshots/vr-sechelt.png', fullPage: true });
});
