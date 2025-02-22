import { Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the login page.
     * @returns {Promise<void>}
     */
    async goto(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    /**
     * Wait for a test ID to be visible.
     * @param {string} testId - The test ID to wait for.
     */
    protected async waitForTestId(testId: string) {
        await this.page.getByTestId(testId).waitFor({ state: 'visible' });
    }
} 