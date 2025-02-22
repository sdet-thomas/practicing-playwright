import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByTestId('page-title');
    }

    /**
     * Navigates to the account page.
     * @returns {Promise<void>}
     */
    override async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/account');
    }

    /**
     * Waits for the account page to be fully loaded by checking the visibility and text of the page title.
     * @returns {Promise<boolean>} True if the page title is 'My account' or 'Sales over the years' and visible, false otherwise.
     */
    override async loaded(): Promise<boolean> {
        try {
            await this.pageTitle.waitFor({ state: 'visible' });
            const titleText = await this.pageTitle.textContent();
            return titleText?.trim() === 'My account' || titleText?.trim() === 'Sales over the years';
        } catch {
            return false;
        }
    }
}