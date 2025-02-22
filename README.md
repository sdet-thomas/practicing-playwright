# Practicing Playwright

This project is a sample Playwright test suite for practicing automated testing with Playwright.

## Project Structure

- `tests/`: Contains the test files.
- `pages/`: Contains the page object models.
- `tests/data/`: Contains the test data in JSON format.
- `tests-examples/`: Contains example tests provided by Playwright.
- `playwright.config.ts`: Playwright configuration file.
- `.github/workflows/`: Contains GitHub Actions workflows for CI.

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/practicing-playwright.git
    cd practicing-playwright
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Install Playwright browsers:
    ```sh
    npx playwright install --with-deps
    ```

## Running Tests

To run the tests, use the following command:
```sh
npx playwright test
```

## Running Tests in CI

This project includes a GitHub Actions workflow to run the tests on every push and pull request. The workflow is defined in `.github/workflows/playwright.yml`.

## Writing Tests

Tests are written using the Playwright test runner. Here is an example test located in `tests/home.spec.ts`:

```typescript
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
    searchTerms.forEach(({ term, expectedCount }) => {
        test(`can search for ${term}`, async () => {
            await homePage.searchFor(term);
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    // Test filtering functionality with different categories
    categoriesFilters.forEach(({ categories, expectedCount }) => {
        test(`can filter by categories ${categories.join(', ')}`, async () => {
            for (const element of categories) {
                await homePage.filterByCategory(element);
            }
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    // Test sorting functionality with different sort options
    sortOptions.forEach(({ option, expectedFirstItem }) => {
        test(`can sort by ${option}`, async () => {
            await homePage.sortProducts(option);
            const products = await homePage.getProducts();
            expect(products[0].name).toEqual(expectedFirstItem);
        });
    });
});
```

## License

This project is licensed under the MIT License.
