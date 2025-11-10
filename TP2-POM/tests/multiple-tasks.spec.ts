import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('ajouter et supprimer plusieurs tâches (POM)', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTask('Acheter du pain');
  await todoPage.addTask('Aller courir');
  await todoPage.deleteTask('Acheter du pain');
  await todoPage.isTaskVisible('Aller courir');
  await expect(page.getByText('Acheter du pain')).not.toBeVisible();
});
