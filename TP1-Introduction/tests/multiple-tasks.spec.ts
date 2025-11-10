import { test, expect } from '@playwright/test';

test('ajouter et supprimer plusieurs tâches', async ({ page }) => {
  // 1. Ouvre la page TodoMVC
  await page.goto('https://demo.playwright.dev/todomvc');

  // 2. Ajoute deux tâches
  await page.getByPlaceholder('What needs to be done?').fill('Acheter du pain');
  await page.keyboard.press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Aller courir');
  await page.keyboard.press('Enter');

  // 3. Supprime la tâche "Acheter du pain"
  await page.hover('text=Acheter du pain');
  await page.click('.destroy', { force: true });

  // 4. Vérifie les résultats
  await expect(page.getByText('Aller courir')).toBeVisible();      // doit rester
  await expect(page.getByText('Acheter du pain')).not.toBeVisible(); // doit disparaître
});
