import { test, expect } from '@playwright/test';

test('mock des différentes routes du swagger ReqRes', async ({ page }) => {
  await page.route('**/api/users?page=2', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          { id: 1, first_name: 'Rafik', last_name: 'Djebarni', email: 'rafik@example.com' },
          { id: 2, first_name: 'Nora', last_name: 'Benali', email: 'nora@example.com' }
        ]
      })
    });
  });

  await page.route('**/api/users', async route => {
    const body = await route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 999,
        createdAt: new Date().toISOString(),
        ...body
      })
    });
  });

  await page.route('**/api/users/2', async route => {
    await route.fulfill({
      status: 204,
      body: ''
    });
  });

  await page.goto('https://reqres.in/api-docs/');
  await expect(page).toHaveTitle(/Swagger/);

  await page.pause();

  await page.unroute('**/api/users?page=2');
  await page.unroute('**/api/users');
  await page.unroute('**/api/users/2');
});
