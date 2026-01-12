import {test, expect} from '@playwright/test';

test.describe('ログイン画面のテスト', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173/');
    });

    test('フォームが空の状態でログインボランを押すとバリデーションエラーが表示される', async ({page}) => {
        await expect(page.getByText('メールアドレスとパスワードを入力してください。')).not.toBeVisible();
        await page.getByRole('button', { name: 'submit button' }).click();

        await expect(page.getByText('メールアドレスとパスワードを入力してください。')).toBeVisible();
    });

    test('入力項目が満たされている場合はバリデーションエラーが表示されない', async ({page}) => {
        await page.getByPlaceholder('Email').fill('test@example.com');
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'submit button' }).click();

        await expect(page.getByText('メールアドレスとパスワードを入力してください。')).not.toBeVisible();
    });

}) ;