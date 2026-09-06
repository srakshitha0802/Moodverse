import { test, expect } from '@playwright/test';

test('header responsive behavior', async ({ page }) => {
  await page.goto('http://localhost:5175/');

  // Desktop checks
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator('.site-nav')).toBeVisible();
  await expect(page.locator('.menu-toggle')).toBeHidden();

  const brandColor = await page.locator('.brand-logo').evaluate((el: Element) => getComputedStyle(el as Element).color);
  expect(brandColor).toBe('rgb(255, 255, 255)');

  // Mobile checks
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.site-nav')).toBeHidden();
  await expect(page.locator('.menu-toggle')).toBeVisible();

  // Open mobile menu and verify items
  await page.click('.menu-toggle');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await expect(page.locator('#mobile-navigation .nav-link', { hasText: 'Home' })).toBeVisible();

  // Click Home link and check menu closes
  await page.click('#mobile-navigation .nav-link:has-text("Home")');
  await expect(page.locator('#mobile-navigation')).toBeHidden();
});