import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import usersData from './data/usersData.json';

const { validUsers, invalidUsers } = usersData;

test.describe('Login Page', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // Test valid users
    validUsers.forEach(({ username, password, expectedUserName }) => {
        test(`should login with valid credentials for ${username}`, async ({ page }) => {
            await loginPage.login(username, password);
            
            // Check if the user is redirected to the My Account page
            const accountPage = new AccountPage(page);
            expect(await accountPage.userName()).toBe(expectedUserName);
        });
    });

    // Test invalid users
    invalidUsers.forEach(({ username, password }) => {
        test(`should not login with invalid credentials for ${username}`, async ({ page }) => {
            await loginPage.login(username, password);
            
            // For security, the error message is generic for invalid username or password
            await expect(await loginPage.loginErrorMsg()).toBe('Invalid email or password');
        });
    });
});