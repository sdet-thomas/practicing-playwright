import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import homeData from './data/homeData.json';

const { categoriesFilters, searchTerms, sortOptions } = homeData;

test.describe('Home Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    /**
     * Test search functionality with different search terms.
     * @param {string} term - The search term to use.
     * @param {number} expectedCount - The expected number of results.
     */
    searchTerms.forEach(({ term, expectedCount }) => {
        test(`can search for ${term}`, async () => {
            await homePage.searchFor(term);
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    /**
     * Test filtering functionality with different categories.
     * @param {string[]} categories - The categories to filter by.
     * @param {number} expectedCount - The expected number of results.
     */
    categoriesFilters.forEach(({ categories, expectedCount }) => {
        test(`can filter by categories ${categories.join(', ')}`, async () => {
            for (const element of categories) {
                await homePage.filterByCategory(element);
            }
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    /**
     * Test sorting functionality with different sort options.
     * @param {string} option - The sort option to use.
     * @param {string} expectedFirstItem - The expected first item after sorting.
     */
    sortOptions.forEach(({ option, expectedFirstItem }) => {
        test(`can sort by ${option}`, async () => {
            await homePage.sortProducts(option);
            const products = await homePage.getProducts();
            expect(products[0].name).toEqual(expectedFirstItem);
        });
    });
});