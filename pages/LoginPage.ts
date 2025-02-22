import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
    }

    /**
     * Navigates to the login page.
     * @returns {Promise<void>}
     */
    override async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    /**
     * Waits for the login page to be fully loaded by checking the visibility of the login button.
     * @returns {Promise<boolean>} True if the login button is visible, false otherwise.
     */
    override async loaded(): Promise<boolean> {
        try {
            await this.loginButton.waitFor({ state: 'visible' });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Logs in with the provided username and password.
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     * @returns {Promise<void>}
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Retrieves the login error message.
     * @returns {Promise<string | null>} The login error message text.
     */
    async loginErrorMsg(): Promise<string | null> {
        return await this.loginError.textContent();
    }
}