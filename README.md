# Practicing Playwright

This project demonstrates automated testing with Playwright for a sample e-commerce application. It includes tests for product search, filtering, sorting, and user authentication.

## Live Reports
- [Allure Report](https://sdet-thomas.github.io/practicing-playwright) - View detailed test execution results

## Project Structure

- `tests/`: Test specifications (.spec.ts) and feature files (.feature)
- `pages/`: Page Object Models implementing the Page Object Pattern
- `tests/data/`: Test data files in JSON format
- `allure-results/`: Raw Allure test result files
- `playwright.config.ts`: Playwright configuration

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sdet-thomas/practicing-playwright.git
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

Run all tests:
```sh
npx playwright test
```

Run specific tests:
```sh
npx playwright test login.spec.ts
```

Run tests with UI Mode:
```sh
npx playwright test --ui
```

Generate and open Allure report locally:
```sh
npx allure generate allure-results --clean && npx allure open
```

## Features Tested

- **User Authentication**
  - Login with valid credentials
  - Login failure with invalid credentials
  - User logout functionality

- **Product Search & Filter**
  - Search products with different terms
  - Filter products by categories
  - Sort products by name and price

## Continuous Integration

Tests are automatically run on GitHub Actions with each push and pull request to the main branch. The workflow:

1. Sets up the environment
2. Installs dependencies
3. Runs tests
4. Generates reports
5. Publishes the Allure report to GitHub Pages

## Tech Stack

- **Playwright**: Test automation framework
- **TypeScript**: Programming language
- **Allure**: Test reporting
- **GitHub Actions**: CI/CD
- **Page Object Model**: Design pattern for test structure

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.
