import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productGrid: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.productGrid = page.locator(".col-md-9");
    }

    /**
     * Get the count of products displayed in the grid.
     * @returns {Promise<number>} The number of products in the grid.
     */
    async gridCount(): Promise<number> {
        return await this.productGrid.getByRole("link").count();
    }

    /**
     * Perform a search with the given term.
     * @param {string} term - The search term to use.
     */
    async searchFor(term: string) {
        await this.searchInput.click();
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.waitForTestId('search_completed');
    }
    
    /**
     * Get the list of products displayed in the grid.
     * @returns {Promise<{ name: string; price: string }[]>} The list of products with their names and prices.
     */
    async getProducts(): Promise<{ name: string; price: string }[]> {
        const products: { name: string; price: string }[] = [];
        const productElements = await this.productGrid.getByRole("link").elementHandles();
        
        for (const productElement of productElements) {
            const name = await productElement.$eval('[data-test="product-name"]', el => el.textContent?.trim() || '');
            const price = await productElement.$eval('[data-test="product-price"]', el => el.textContent?.trim() || '');
            products.push({ name, price });
        }
        
        return products;
    }

    /**
     * Filter products by the given category.
     * @param {string} categoryName - The name of the category to filter by.
     */
    async filterByCategory(categoryName: string) {
        const categoryFilter = this.page.locator(`label:has-text("${categoryName}") input[type="checkbox"]`);
        await categoryFilter.click();
        await this.waitForTestId('filter_completed');
    }

    /**
     * Sort products by the given sort option.
     * @param {string} sortOption - The sort option to use.
     */
    async sortProducts(sortOption: string) {
        const sortSelect = this.page.locator('[data-test="sort"]');
        await sortSelect.selectOption(sortOption);
        await this.waitForTestId('sorting_completed');
    }
}