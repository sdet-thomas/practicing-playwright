import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigates to the account page.
     * @returns {Promise<void>}
     */
    override async goto(): Promise<void> {
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