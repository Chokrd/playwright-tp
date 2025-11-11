import { test, expect } from '@playwright/test';

test('mock de la liste des utilisateurs sur ReqRes', async ({ page }) => {
  await page.route('**/api/users?page=2', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          { id: 1, first_name: 'Jean', last_name: 'Dupont', email: 'jean.dupont@example.com' },
          { id: 2, first_name: 'Claire', last_name: 'Martin', email: 'claire.martin@example.com' }
        ]
      })
    });
  });

  await page.goto('https://reqres.in/');

  await page.getByText('List Users').click();

  await expect(page.getByText('Jean')).toBeVisible();
  await expect(page.getByText('Claire')).toBeVisible();

  await page.unroute('**/api/users?page=2');
});
