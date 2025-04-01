Feature: User Authentication
  As a user
  I want to be able to log in and out
  So that I can access my account and keep it secure

  Background: 
    Given I am on the home page
    And I navigate to the login page

  # Test valid users
  Scenario Outline: Log in with valid credentials
    When I enter email "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should be redirected to my account page
    And I should see my name as "<expectedUserName>"

    Examples:
      | username                             | password   | expectedUserName |
      | admin@practicesoftwaretesting.com    | welcome01  | John Doe         |
      | customer@practicesoftwaretesting.com | welcome01  | Jane Doe         |
      | customer2@practicesoftwaretesting.com| welcome01  | Jack Howe        |

  # Test invalid users
  Scenario Outline: Cannot log in with invalid credentials
    When I enter email "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should see an error message "Invalid email or password"
    And I should remain on the login page

    Examples:
      | username                             | password       |
      | admin@practicesoftwaretesting.com    | wrongPassword  |
      | wrongUsername@practicesoftwaretesting.com | welcome01 |

  # Test sign out functionality
  Scenario: Successfully sign out after login
    When I enter email "admin@practicesoftwaretesting.com"
    And I enter password "welcome01"
    And I click the login button
    Then I should be redirected to my account page
    When I sign out
    Then I should be redirected to the login page
