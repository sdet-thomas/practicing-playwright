import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import usersData from './data/usersData.json';
import { HomePage } from '../pages/HomePage';

const { validUsers, invalidUsers } = usersData;

test.describe('Login Page', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
        await homePage.navToLoginPage();
        loginPage = new LoginPage(page);
    });

    /**
     * Test valid users
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     * @param {string} expectedUserName - The expected username after login.
     */
    validUsers.forEach(({ username, password, expectedUserName }) => {
        test(`should login with valid credentials for ${username}`, async ({ page }) => {
            await loginPage.login(username, password);
            
            // Check if the user is redirected to the My Account page
            const accountPage = new AccountPage(page);
            expect(await accountPage.loaded()).toBe(true);
            expect(await accountPage.name).toBe(expectedUserName);
        });
    });

    /**
     * Test invalid users
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     */
    invalidUsers.forEach(({ username, password }) => {
        test(`should not login with invalid credentials for ${username}`, async ({ page }) => {
            await loginPage.login(username, password);
            
            // For security, the error message is generic for invalid username or password
            await expect(await loginPage.loginErrorMsg()).toBe('Invalid email or password');
        });
    });

    /**
     * Test successful sign out
     */
    test('should successfully sign out', async ({ page }) => {
        const { username, password } = validUsers[0];
        await loginPage.login(username, password);
        
        const accountPage = new AccountPage(page);
        await accountPage.signOut();

        // Verify the user is redirected to the login page
        expect(await loginPage.loaded()).toBe(true);
    });
});