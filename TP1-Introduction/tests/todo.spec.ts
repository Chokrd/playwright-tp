import { test, expect } from '@playwright/test';

test('ajouter une tâche dans TodoMVC', async ({ page }) => {
  // 1. Ouvre le site du TP
  await page.goto('https://demo.playwright.dev/todomvc');

  // 2. Ajoute une tâche
  await page.getByPlaceholder('What needs to be done?').fill('Acheter du pain');

  // 3. Appuie sur Entrée
  await page.keyboard.press('Enter');

  // 4. Vérifie que la tâche apparaît dans la liste
  await expect(page.getByText('Acheter du pain')).toBeVisible();
});
