import { Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly nav: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;
        this.nav = {
            logo: this.page.locator('.navbar-brand'),
            home: this.page.getByTestId('nav-home'),
            categories: this.page.getByTestId('nav-categories'),
            handTools: this.page.getByTestId('nav-hand-tools'),
            powerTools: this.page.getByTestId('nav-power-tools'),
            other: this.page.getByTestId('nav-other'),
            specialTools: this.page.getByTestId('nav-special-tools'),
            rentals: this.page.getByTestId('nav-rentals'),
            contact: this.page.getByTestId('nav-contact'),
            signIn: this.page.getByTestId('nav-sign-in'),

            // After login
            name: this.page.getByTestId('nav-menu'),
            signOut: this.page.getByTestId('nav-sign-out')
        };
    }

    /**
     * Navigates to the home page.
     * @returns {Promise<void>}
     */
    async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    /**
     * Waits for the page to be fully loaded by checking the visibility of the logo.
     * @returns {Promise<boolean>} True if the logo is visible, false otherwise.
     */
    async loaded(): Promise<boolean> {
        try {
            await this.nav.logo.waitFor({ state: 'visible' });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Navigates to the login page by clicking the sign-in link.
     * @returns {Promise<void>}
     */
    async navToLoginPage(): Promise<void> {
        await this.nav.signIn.click();
    }

    /**
     * Signs out the currently logged-in user by clicking the sign-out link.
     * @returns {Promise<void>}
     */
    async signOut(): Promise<void> {
        await this.nav.name.click();
        await this.nav.signOut.click();
    }

    /**
     * Gets the currently logged-in user's display name from the navigation menu.
     * This getter accesses the nav-menu element which is only visible after login.
     * @returns {Promise<string>} The trimmed display name, or empty string if not found.
     */
    get name(): Promise<string> {
        return this.nav.name.textContent().then(text => text?.trim() ?? '');
    }

    /**
     * Waits for a test ID to be visible.
     * @param {string} testId - The test ID to wait for.
     * @returns {Promise<void>}
     */
    protected async waitForTestId(testId: string): Promise<void> {
        await this.page.getByTestId(testId).waitFor({ state: 'visible' });
    }
}