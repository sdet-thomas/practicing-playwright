import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { searchTerms, categoriesFilters, sortOptions } from './data';

test.describe('Home Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    // Test search functionality with different search terms
    // Data source: ./data/searchTerms.json
    searchTerms.forEach(({ term, expectedCount }) => {
        test(`can search for ${term}`, async () => {
            await homePage.searchFor(term);
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    // Test filtering functionality with different categories
    // Data source: ./data/categoriesFilters.json
    categoriesFilters.forEach(({ categories, expectedCount }) => {
        test(`can filter by categories ${categories.join(', ')}`, async () => {
            for (const element of categories) {
                await homePage.filterByCategory(element);
            }
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    // Test sorting functionality with different sort options
    // Data source: ./data/sortOptions.json
    sortOptions.forEach(({ option, expectedFirstItem }) => {
        test(`can sort by ${option}`, async () => {
            await homePage.sortProducts(option);
            const products = await homePage.getProducts();
            expect(products[0].name).toEqual(expectedFirstItem);
        });
    });
})