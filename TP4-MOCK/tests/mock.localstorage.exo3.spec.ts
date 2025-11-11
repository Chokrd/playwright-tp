import { test, expect } from '@playwright/test';

test('exercice 3 - mock localStorage avec suppression et tâche terminée', async ({ page }) => {

  await page.addInitScript(() => {
    const mockedTodos = [
      { title: 'Faire les courses', completed: false },
      { title: 'Appeler le plombier', completed: false },
      { title: 'Réviser le TP Playwright', completed: true },
      { title: 'Aller courir', completed: false }
    ];


    mockedTodos.shift();

    localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
  });


  await page.goto('https://demo.playwright.dev/todomvc');

  await expect(page.getByText('Appeler le plombier')).toBeVisible();
  await expect(page.getByText('Réviser le TP Playwright')).toBeVisible();
  await expect(page.getByText('Aller courir')).toBeVisible();

  const completedTask = page.locator(`xpath=//label[text()="Réviser le TP Playwright"]/../..`);
  await expect(completedTask).toHaveClass(/completed/);
});
