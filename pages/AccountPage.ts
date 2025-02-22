import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('page-title');
    }

    /**
     * Navigates to the account page.
     * @returns {Promise<void>}
     */
    async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/account');
    }

    /**
     * Retrieves the username from the navigation menu.
     * @returns {Promise<string>} The username text.
     */
    async userName(): Promise<string> {
        const username = await this.page.locator('[data-test="nav-menu"]').textContent();
        return username ? username.trim() : '';
    }
}