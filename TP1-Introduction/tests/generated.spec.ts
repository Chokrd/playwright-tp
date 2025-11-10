import { test, expect } from '@playwright/test';

test('ajout d’une tâche', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Acheter le jus à Joël');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Acheter le jus à Joël')).toBeVisible();
}); 
