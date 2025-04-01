Feature: Home Page Functionality
  As a user
  I want to search, filter, and sort products
  So that I can find the products I want to purchase

  Background:
    Given I am on the home page

  # Test search functionality with different search terms
  Scenario Outline: Search products using different terms
    When I search for "<term>"
    Then I should see <expectedCount> products in the search results

    Examples:
      | term        | expectedCount |
      | hammer      | 7             |
      | nail        | 0             |
      | screw       | 5             |
      | thor hammer | 1             |
      | pliers      | 4             |

  # Test filtering functionality with different categories
  Scenario Outline: Filter products by single category
    When I filter products by category "<category>"
    Then I should see <expectedCount> products in the results

    Examples:
      | category    | expectedCount |
      | Hammer      | 7             |
      | Hand Saw    | 1             |
      | Wrench      | 3             |
      | Power Tools | 5             |

  Scenario: Filter products by multiple categories
    When I filter products by category "Screwdriver"
    And I filter products by category "Chisels"
    Then I should see 5 products in the results

  Scenario: Filter products by multiple categories
    When I filter products by category "Sander"
    And I filter products by category "Drill"
    And I filter products by category "Tool Belts"
    And I filter products by category "Storage Solutions"
    Then I should see 7 products in the results

  # Test sorting functionality with different sort options
  Scenario Outline: Sort products using different options
    When I sort products by "<option>"
    Then the first product should be "<expectedFirstItem>"

    Examples:
      | option            | expectedFirstItem      |
      | Name (A - Z)      | Adjustable Wrench      |
      | Name (Z - A)      | Wood Saw               |
      | Price (Low - High)| Washers                |
      | Price (High - Low)| Drawer Tool Cabinet    |
